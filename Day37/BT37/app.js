

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
const app = {
  render: async function () {
    const root = document.querySelector("#root");
    if (this.isLogin()) {
      root.innerHTML = `<div class="container py-3">
          <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
          <hr/>
          <ul class="list-unstyled d-flex gap-3 profile">
            <li>Chào bạn: <b class="name">Loading...</b></li>
            <li><a href="#" class="logout">Đăng xuất</a></li>
          </ul>
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
        </div>`;
       
      
      const profileName = document.querySelector(".profile .name");
      this.getProfile(profileName);
      this.eventLogout(); 
      this.loadPreLoginPosts();
      this.eventPost()
    } else {
      root.innerHTML = `<div class="container py-3">
        <div class="row justify-content-center">
          <div class="col-7">
            <h2 class="text-center">Đăng nhập</h2>
            <form class="login">
              <div class="mb-3">
                <label for="">Email</label>
                <input type="email" class="form-control email" placeholder="Email...">
              </div>
              <div class="mb-3">
                <label for="">Mật khẩu</label>
                <input type="password" class="form-control password" placeholder="Mật khẩu...">
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
      this.eventPost()
    }
  },

  eventPost: function () {
   
    const titleEl = document.querySelector(".title");
    const contentEl = document.querySelector(".content");
    const postBtn = document.querySelector(".post-btn")
  
    postBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const title = titleEl.value;
      const content = contentEl.value;
      console.log({ title, content } );
      app.handlePost({ title, content } );
   
    });
  },
  
  
  handlePost: async function (data) {
const { data: tokens, response } = await client.post("/blogs", data);

    this.handlePost(data);

  
  },
  
  loadPreLoginPosts: async function () {
    const preLoginPostList = document.getElementById("preLoginPostList");
    try {
      const { response, data: _data } = await client.get(`/blogs?page=${currentPage}`);
      const data = _data.data;
    
      if (data) {
        for (let post of data) {
          const li = document.createElement("li");
          li.innerHTML = `
          <h2>${stripHtml(post.userId.name)}</h2>
            <h3>${stripHtml(post.title)}</h3>
            <p>${stripHtml(post.content)}</p>
            <p>${stripHtml(post.timeUp)}</p>
            <hr>
          `;
          preLoginPostList.appendChild(li);
        }
      }
    } catch (error) {
      console.error("Error loading pre-login posts:", error);
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
  getProfile: async function (el) {
    let loginTokens = localStorage.getItem("login_tokens");
    loginTokens = JSON.parse(loginTokens);

    const { access_token: accessToken, refresh_token: refreshToken } =
      loginTokens;

    //Thêm token vào request header
    client.setToken(accessToken);
    const { response, data } = await client.get("/auth/profile");

    if (response.ok) {
    
      el.innerText = data.name;
    } else {
     
      const newToken = await requestRefresh(refreshToken);
      //Không lấy được token mới -> Đăng xuất
      if (!newToken) {
        // logout
        this.handleLogout();
      } else {
        //Cập nhật token mới vào localStorage
        localStorage.setItem("login_tokens", JSON.stringify(newToken));

        //Render
        this.render();
      }
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