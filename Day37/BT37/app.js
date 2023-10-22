


// import { client } from "./client.js";
// import { requestRefresh } from "./token.js";
// client.setUrl("https://api-auth-two.vercel.app");
// let currentPage = 1;
// let isFetching = false;
// let hasMore = true;
// const showLoading = () => {
//   document.getElementById("loading").style.display = "block";
// };
// const hideLoading = () => {
//   document.getElementById("loading").style.display = "none";
// };
// const fetchData = async function () {
//   showLoading();
//   const list = document.querySelector(".block-list");
//   isFetching = true;
//   try {
//     const { response, data: _data } = await client.get(
//       `/blogs?page=${currentPage}`
//     );
//     currentPage++;
//     const data = _data.data;
//     console.log(data);
//     const stripHtml = (html) => {
//       return html.replace(/(<([^>]+)>)/gi, "");
//     };
//     isFetching = false;
//     if (data === undefined) {
//       hasMore = false;
//       hideLoading();
//       return;
//     }
//     for (let post of data) {
//       const div = document.createElement("div");
//       const separate = document.createElement("hr");
//       const { createdAt } = post;
//       const date = new Date(createdAt);
//       const dateString = `${date.getDate()} - ${
//         date.getMonth() + 1
//       } - ${date.getFullYear()} || ${date.getHours()}:${
//         date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
//       }`;
//       div.innerHTML = `
//           <h2>${stripHtml(post.userId.name)}</h2>
//           <h4>${stripHtml(post.title)}</h4>
//           <p>${stripHtml(post.content)}</p>
//           <p class="date">${stripHtml(dateString)}</p>
//           `;
//       list.appendChild(separate);
//       list.appendChild(div);
//     }
//     hideLoading();
//     window.addEventListener("scroll", () => {
//       if (isFetching || !hasMore) {
//         return;
//       } else if (
//         window.innerHeight + window.scrollY >=
//         document.body.offsetHeight - 100
//       ) {
//         fetchData();
//       }
//     });
//   } catch {
//     return;
//   }
// };
// const renderDefault = () => {
//   root.innerHTML = `<h1>Blogger</h1><button type="submit" class="btn btn-primary">Đăng nhập</button>
//       <div class="block-list"></div>`;
//   currentPage = 1;
//   fetchData();
// };
// const renderRegister = () => {
//   root.innerHTML = `<div class="container py-3">
//   <div class="row justify-content-center">
//     <div class="col-7">
//       <form class="register">
//       <div class="mb-3">
//       <label for="">Tên</label>
//       <input
//         type="text"
//         class="form-control name"
//         placeholder="Name..."
//       />
//     </div>
//       <div class="mb-3">
//         <label for="">Email</label>
//         <input
//           type="email"
//           class="form-control email"
//           placeholder="Email..."
//         />
//       </div>
//       <div class="mb-3">
//         <label for="">Mật khẩu</label>
//         <input
//           type="password"
//           class="form-control password"
//           placeholder="Mật khẩu..."
//         />
//       </div>
//       <div class="d-grid">
//         <button type="submit" class="btn btn-primary">Đăng kí</button>
//       </div>
//       </form>
//       <div class ="msg text-danger"></div>
//       <div>
//       <span>Bạn đã có tài khoản?</span> <a class="login-button" href="#!">Đăng nhập</a>
//       </div>
//       <a class="default" href="#!">Quay lại trang chủ</a>
//     </div>
//   </div>
// </div>`;
//   const login = document.querySelector(".login-button");
//   login.addEventListener("click", function (e) {
//     e.preventDefault;
//     renderLogin();
//     app.eventLogin();
//   });
//   const defaultButton = document.querySelector(".default");
//   defaultButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     app.render();
//   });
// };
// const renderLogin = () => {
//   root.innerHTML = `<div class="container py-3">
//   <div class="row justify-content-center">
//     <div class="col-7">
//       <form class="login">
//       <div class="mb-3">
//         <label for="">Email</label>
//         <input
//           type="email"
//           class="form-control email"
//           placeholder="Email..."
//           value="vuongtridong1995@yahoo.com"
//         />
//       </div>
//       <div class="mb-3">
//         <label for="">Mật khẩu</label>
//         <input
//           type="password"
//           class="form-control password"
//           placeholder="Mật khẩu..."
//           value="dong6395"
//         />
//       </div>
//       <div class="d-grid">
//         <button type="submit" class="btn btn-primary">Đăng nhập</button>
//       </div>
//       </form>
//       <div class ="msg text-danger"></div>
//       <div>
//       <span>Tạo tài khoản?</span> <a class="register-button" href="#!">Đăng Ký</a>
//       </div>
//       <a class="default" href="#!">Quay lại trang chủ</a>
//     </div>
//   </div>
// </div>`;
//   const register = document.querySelector(".register-button");
//   register.addEventListener("click", function (e) {
//     e.preventDefault;
//     renderRegister();
//     app.eventRegister();
//   });
//   const defaultButton = document.querySelector(".default");
//   defaultButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     app.render();
//   });
// };
// const app = {
//   render: function () {
//     const root = document.querySelector("#root");
//     if (this.isLogin()) {
//       root.innerHTML = `<div class="container py-3">
//         <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
//         <hr/>
//         <ul class="list-unstyled d-flex gap-3 profile">
//           <li>Chào bạn: <b class="name">Loading...</b></li>
//           <li><a href="#"class="logout">Đăng xuất</a></li>
//         </ul>
//         <form class=" post container w-90">
//       <div class="form-group text-left">
//           <label class="w-100" for="title" class="label-form">Tiêu đề bài viết</label>
//           <input class="w-100" id="title" placeholder="Nhập tiêu đề bài viết"/>
//       </div>
//       <div class="form-group text-left">
//           <label class="w-100" for="content" class="label-form">Nhập nội dung bài viết</label>
//           <textarea class="w-100" name="" id="content" cols="30" rows="10"></textarea>
//       </div>
//       <div class="form-group text-left" style="display: none">
//           <label class="w-100" for="content" class="label-form">Chọn thời gian đăng bài</label>
//           <input class="w-100" id="date" type="date">
//       </div>
//       <button class="btn btn-warning text-left w-100 my-3">Đăng bài</button>
//   </form>
//   <div class ="msgTwo text-danger"></div>
//       </div>
//       <div class="block-list"></div>`;
//       currentPage = 1;
//       fetchData();
//       const profileName = document.querySelector(".profile .name");
//       this.getProfile(profileName);
//       this.eventLogout();
//       this.eventPost();
//     } else {
//       renderDefault();
//       const btn = root.querySelector("button");
//       btn.addEventListener("click", function () {
//         renderLogin();
//         app.eventLogin();
//       });
//     }
//   },
//   isLogin: function () {
//     if (localStorage.getItem("login_tokens")) {
//       return true;
//     }
//     return false;
//   },
//   handleLogin: async function (data, msg) {
//     msg.innerText = "";
//     this.addLoading();
//     const { data: tokens, response } = await client.post("/auth/login", data);
//     // console.log(response);
//     // console.log(tokens);
//     this.removeLoading();
//     if (!response.ok) {
//       msg.innerText = `${tokens.message}`;
//     } else {
//       //neu thanh cong thi luu token vao storage
//       //local storage: luu vinh vien
//       //session storage: luu theo phien
//       localStorage.setItem(`login_tokens`, JSON.stringify(tokens));
//       this.render();
//     }
//   },
//   handleRegister: async function (data, msg) {
//     msg.innerText = "";
//     this.addLoadingRegister();
//     const { data: tokens, response } = await client.post(
//       "/auth/register",
//       data
//     );
//     this.removeLoadingRegister();
//     if (!response.ok) {
//       msg.innerText = `${tokens.message}`;
//     } else {
//       this.render();
//     }
//   },
//   getToken: function () {
//     let loginTokens = localStorage.getItem(`login_tokens`);
//     loginTokens = JSON.parse(loginTokens);
//     const { data: _data } = loginTokens;
//     if (_data.accessToken === undefined) {
//       const { token } = _data;
//       const { accessToken, refreshToken } = token;
//       return { accessToken, refreshToken };
//     } else {
//       const { accessToken, refreshToken } = _data;
//       return { accessToken, refreshToken };
//     }
//   },
//   getProfile: async function (el) {
//     const { accessToken, refreshToken } = this.getToken();
//     client.setToken(accessToken);
//     const { response, data } = await client.get("/users/profile");
//     if (response.ok) {
//       el.innerText = data.data.name;
//     } else {
//       const newToken = await requestRefresh(refreshToken);
//       if (!newToken) {
//         // xu ly logout
//         this.handleLogout();
//       } else {
//         //cap nhat token moi vao local storage
//         // console.log(newToken);
//         localStorage.setItem(`login_tokens`, JSON.stringify(newToken));
//       }
//       this.render();
//     }
//   },
//   addLoading: function () {
//     const form = document.querySelector(".login");
//     const btn = form.querySelector(".btn");
//     btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
//     btn.disabled = true;
//   },
//   removeLoading: function () {
//     const form = document.querySelector(".login");
//     const btn = form.querySelector(".btn");
//     btn.innerHTML = `Đăng nhập`;
//     btn.disabled = false;
//   },
//   addLoadingRegister: function () {
//     const form = document.querySelector(".register");
//     const btn = form.querySelector(".btn");
//     btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
//     btn.disabled = true;
//   },
//   removeLoadingRegister: function () {
//     const form = document.querySelector(".register");
//     const btn = form.querySelector(".btn");
//     btn.innerHTML = `Đăng kí`;
//     btn.disabled = false;
//   },
//   addLoadingPost: function () {
//     const form = document.querySelector(".post");
//     const btn = form.querySelector(".btn");
//     btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
//     btn.disabled = true;
//   },
//   removeLoadingPost: function () {
//     const form = document.querySelector(".post");
//     const btn = form.querySelector(".btn");
//     btn.innerHTML = `Đăng bài`;
//     btn.disabled = false;
//   },
//   eventLogin: function () {
//     const form = document.querySelector(".login");
//     const msg = document.querySelector(".msg");
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const emailEl = e.target.querySelector(".email");
//       const passwordEl = e.target.querySelector(".password");
//       const email = emailEl.value;
//       const password = passwordEl.value;
//       this.handleLogin({ email, password }, msg);
//     });
//   },
//   eventRegister: function () {
//     const form = document.querySelector(".register");
//     const msg = document.querySelector(".msg");
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const nameEl = e.target.querySelector(".name");
//       const emailEl = e.target.querySelector(".email");
//       const passwordEl = e.target.querySelector(".password");
//       const name = nameEl.value;
//       const email = emailEl.value;
//       const password = passwordEl.value;
//       console.log({ name, email, password });
//       this.handleRegister({ name, email, password }, msg);
//     });
//   },
//   handleLogout: async function (data) {
//     const { data: tokens, response } = await client.post("/auth/logout", data);
//     localStorage.removeItem("login_tokens");
//     console.log(tokens);
//     console.log(response);
//     this.render();
//   },
//   eventLogout: function () {
//     const logout = document.querySelector(".profile .logout");
//     logout.addEventListener("click", (e) => {
//       e.preventDefault();
//       let loginTokens = localStorage.getItem(`login_tokens`);
//       loginTokens = JSON.parse(loginTokens);
//       const { data: _data } = loginTokens;
//       const { accessToken, refreshToken } = _data;
//       this.handleLogout({ accessToken, refreshToken });
//     });
//   },
//   handlePost: async function (data, msg) {
//     msg.innerText = "";
//     app.addLoadingPost();
//     const { data: tokens, response } = await client.post("/blogs", data);
//     if (!response.ok && response.status != 400) {
//       msg.innerText = "refresh token";
//       const { refreshToken } = this.getToken();
//       const newToken = await requestRefresh(refreshToken);
//       if (!newToken) {
//         // xu ly logout
//         this.handleLogout();
//       } else {
//         //cap nhat token moi vao local storage
//         localStorage.setItem(`login_tokens`, JSON.stringify(newToken));
//         const { accessToken } = this.getToken();
//         client.setToken(accessToken);
//         this.handlePost(data, msg);
//         app.removeLoadingPost();
//       }
//     } else if (!response.ok && response.status === 400) {
//       msg.innerText = "Mời nhập tiêu đề và nội dung cần post";
//       app.removeLoadingPost();
//     } else {
//       msg.innerText = "post bài thành công! Đang làm mới";
//       setTimeout(() => {
//         app.removeLoadingPost();
//         app.render();
//       }, 2000);
//     }
//   },
//   eventPost: function () {
//     const post = document.querySelector(".post");
//     const titleEl = post.querySelector("#title");
//     const contentEl = post.querySelector("#content");
//     const msg = document.querySelector(".msgTwo");
//     post.addEventListener("submit", function (e) {
//       e.preventDefault();
//       const title = titleEl.value;
//       const content = contentEl.value;
//       // console.log({ title, content }, msg);
//       app.handlePost({ title, content }, msg);
//     });
//   },
// };

// app.render();
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
        currentPage = 1;
      
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
      this.handlePosts()
    }
  },
  
  handlePost: async function (data) {
    const { data: tokens,response } = await client.post("/blogs", data);
    
  },
  
    eventPost: function () {
      const post = document.querySelector(".post-form");
      const titleEl = post.querySelector(".title");
      const contentEl = post.querySelector(".content");
      const postBtn = post.querySelector(".post-btn")
      // const msg = document.querySelector(".msgTwo");
      postBtn.addEventListener("click", function (e) {
      
        const title = titleEl.value;
        const content = contentEl.value;
        console.log({ title, content } );
        app.handlePost({ title, content } );
     
      });
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
      //Token hợp lệ
      el.innerText = data.name;
    } else {
      //Gọi request refresh token
      const newToken = await requestRefresh(refreshToken);
      //Không lấy được token mới -> Đăng xuất
      if (!newToken) {
        //Xử lý logout
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
