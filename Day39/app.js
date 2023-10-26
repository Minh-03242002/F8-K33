


import { client } from "./client.js";
import { requestRefresh } from "./token.js";




client.setUrl("https://api-auth-two.vercel.app");
let currentPage = 1;
let isFetching = false;
let hasMore = true;

function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText;
}

// cuộn tải bài viết 
  
window.addEventListener("scroll", () => {
  if (isFetching || !hasMore) {
    return;
  }

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + windowHeight >= documentHeight - 100) {
    // Cuộn đến cuối trang, tải thêm bài viết
    currentPage++;
    alert("Bạn muốn xem bài viết cũ hơn ? ")
    app.loadPreLoginPosts();
  }
});



const app = {
  render: async function () {
    const root = document.querySelector("#root");
    if (this.isLogin()) {
      root.innerHTML = `<div class="container py-3">
        <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
        <hr/>
        <ul class="list-unstyled d-flex gap-3 profile">
          <li>Chào bạn: <b class="name"></b></li>
          <li><a href="#" class="logout">Đăng xuất</a></li>
        </ul>
      </div>
      <form  class = "post-form"  style="width: 70%;display: flex;flex-direction: column; ">
                 <span>
                  Tiêu đề 
                </span>
                <input class="title" type="text" style="width: 500px;" placeholder="Nhập tiêu đề bài viết">
                <span> Nôi dung</span>
                <input class="content" type="text" style="width: 500px;height: 100px;" placeholder="Nhập nội dung">
                <button class="post-btn" type="submit" style="width: 500px;margin-top: 20px;"> Post</button>
                    </form>
          
      
                 
            <h1>Bài viết</h1>
            <div class="post-list">
             
              <ul id="preLoginPostList" style="list-style-type:none;" >
              </ul>
            </div>
             </div>
      `;
      const profileName = document.querySelector(".profile .name");
      this.getProfile(profileName);
      this.eventLogout();
      this.loadPreLoginPosts();
      this.eventPost();
    } else {
      root.innerHTML = `<div class="container py-3">
                <div class="row justify-content-center">
                  <div class="col-7">
                    <h2 class="text-center">Đăng nhập</h2>
                    <form class="login">
                      <div class="mb-3">
                        <label for="">Email</label>
                        <input value = "a@gmail.com" type="email" class="form-control email" placeholder="Email...">
                      </div>
                      <div class="mb-3">
                        <label for="">Mật khẩu</label>
                        <input value = "12345678" type="password" class="form-control password" placeholder="Mật khẩu...">
                      </div>
                      <div class="d-grid">
                        <button type="submit" class="btn btn-primary">Đăng nhập</button>
                      </div>
                    </form>
                    <div class="msg text-danger"></div>
                  </div>
                </div>
              </div>
              
              <h1>Bài viết</h1>
              <div class="post-list">
               
                <ul id="preLoginPostList" style="list-style-type:none;" >
                </ul>
              </div>
              
              <form class="login">
                <!-- Form đăng nhập -->
              </form>
           
            
              `;

      await this.loadPreLoginPosts();
      this.eventLogin();
      this.handlePosts();
    }
  },

  eventPost: function () {
    const form = document.querySelector(".post-form");
    const titleEl = document.querySelector(".title");
    const contentEl = form.querySelector(".content");
    const postBtn = form.querySelector(".post-btn");
    
    postBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const title = titleEl.value;
      const content = contentEl.value;
  // Xử lý nội dung bài viết
      console.log({ title, content});
      await this.handlePosts({ title, content});
    });
  },

  
  
  handlePosts: async function (data) {
    const { accessToken, refreshToken } = this.getToken();
    client.setToken(accessToken);
  console.log(accessToken);
    try {
      //  xử lý nội dung trước khi đăng
      const title = data.title;
      const content = data.content;
      const processedContent = this.processedContent(content);
  console.log(processedContent);
      const postData = { title, content: processedContent };

      const { response, data: responseData } = await client.post("/blogs", postData);
  
      if (response.ok) {
        alert("Bài viết đã được đăng thành công.");
        window.location.reload();
        
  
        this.loadPreLoginPosts();
      } else {
        console.error("Lỗi khi đăng bài viết:", responseData.error);
        
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài viết:", error);
     
    }
  },

  processedContent : function (content) {
   // Thay thế số điện thoại 
  content = content.replace(/((0|\+84)\d{9,10})/g, '<a href="tel:$1">$1</a>');
  
  // Thay thế địa chỉ email 
  content = content.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/g, '<a href="mailto:$1">$1</a>');
  
  // Thay thế video YouTube 
  content = content.replace(/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g, '<iframe width="500" height="300" src="https://www.youtube.com/embed/$1" frameborder="0" ></iframe>');
  
  // Thay thế liên kết bằng thẻ a với target=_blank
  content = content.replace(/^https:\/\/[a-z-_0-9\.]+\.[a-z]{2,}$/g, '<a href="$1" target="_blank">$1</a>');

  
  // Chuẩn hóa văn bản
  content = content.replace(/\s+/g, ' ');  
  content = content.replace(/\n{2,}/g, '\n');  

  return content;
  },
  



  
 
  
loadPreLoginPosts: async function () {
  const preLoginPostList = document.getElementById("preLoginPostList");
  isFetching = true;

  try {
    const { response, data: _data } = await client.get(`/blogs?page=${currentPage}`);
    const data = _data.data;

    if (data) {
      for (let post of data) {
        const li = document.createElement("li");
        const title = stripHtml(post.title);
        const content = this.processedContent(post.content); // Xử lý nội dung trước khi hiển thị

        li.innerHTML = `
          <h2>${stripHtml(post.userId.name)}</h2>
          <h3>${title}</h3>
          <p>${content}</p>
          <p>${stripHtml(post.timeUp)}</p>
          <hr>
        `;
        preLoginPostList.appendChild(li);
      }
    }
  } catch (error) {
    console.error("Error loading pre-login posts:", error);
  } finally {
    isFetching = false;
  }
},

  

  isLogin: function () {
    if (localStorage.getItem("login_tokens")) {
      return true;
    }
    return false;
  },
  handleLogin: async function (data, msg) {
    msg.innerText = "";
    this.addLoading();
    const { data: tokens, response } = await client.post("/auth/login", data);
    this.removeLoading();
    if (!response.ok) {
      msg.innerText = "Email hoặc mật khẩu không chính xác";
    } else {
      //Nếu thành công -> Lưu token vào Storage
      localStorage.setItem("login_tokens", JSON.stringify(tokens));
      this.render();
    }
  },

  getToken: function () {
    let loginTokens = localStorage.getItem(`login_tokens`);
    loginTokens = JSON.parse(loginTokens);
    const { data: _data } = loginTokens;
    if (_data.accessToken === undefined) {
      const { token } = _data;
      const { accessToken, refreshToken } = token;
      return { accessToken, refreshToken };
    } else {
      const { accessToken, refreshToken } = _data;
      return { accessToken, refreshToken };
    }
  },

  getProfile: async function (el) {
    const { accessToken, refreshToken } = this.getToken();
    client.setToken(accessToken);
    const { response, data } = await client.get("/users/profile");
    if (response.ok) {
      el.innerText = data.data.name;
    } else {
      const newToken = await requestRefresh(refreshToken);

      if (!newToken) {
        // xu ly logout
        this.handleLogout();
      } else {
        //cap nhat token moi vao local storage
        // console.log(newToken);
        localStorage.setItem(`login_tokens`, JSON.stringify(newToken));
      }
      this.render();
      console.log(newToken);
    }
  },
  handleLogout: function () {
    localStorage.removeItem("login_tokens");
    this.render();
  },
  addLoading: function () {
    const form = document.querySelector(".login");
    const btn = form.querySelector(".btn");

    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading`;
    btn.disabled = true;
  },
  removeLoading: function () {
    const form = document.querySelector(".login");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Đăng nhập`;
    btn.disabled = false;
  },
  eventLogin: function () {
    const form = document.querySelector(".login");
    const msg = document.querySelector(".msg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailEl = e.target.querySelector(".email");
      const passwordEl = e.target.querySelector(".password");
      const email = emailEl.value;
      const password = passwordEl.value;
      this.handleLogin({ email, password }, msg);
    });
  },
  eventLogout: function () {
    const logout = document.querySelector(".profile .logout");
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleLogout();
    });
  },
};

app.render();

