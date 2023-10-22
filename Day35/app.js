
import { client } from "./client.js";
const render = (posts) => {
  const postsEL = document.querySelector(".posts");

  let postHtml = ``;
  posts.forEach(({ name,title,image,content }) => {
    postHtml += `<div class="item"> 
  <div class="header"> 
<img class="avt" src="https://vcdn1-giaitri.vnecdn.net/2023/04/28/doraemon4-1682675790-8961-1682675801.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=EAxUAFcakJsi4GQW0mYsCQ">
  <h2 class="name"> ${name}</h2>
</div>
<h3 class="title-item">
${title}
</h3>
<img class="img" src="${image}">
<div class="content">${content}</div>

    </div>
  </div>`;
  });

  postsEL.innerHTML = `<div class="container"><h1 class="title">Demo Code Pagination</h1>${postHtml} </div>`;
};

const getPosts = async () => {
  const { data: posts } = await client.get("/posts");
 render(posts)
};
getPosts();





  /* <div class="container">
<h1 class="title">Demo Code Pagination</h1>
    <div class="item">
<div class="header"> 
<img class="avt" src="https://vcdn1-giaitri.vnecdn.net/2023/04/28/doraemon4-1682675790-8961-1682675801.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=EAxUAFcakJsi4GQW0mYsCQ" alt="">
  <h2 class="name"> Hoang an</h2>
</div>
<h3 class="title-item">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, cumque.
</h3>
<img class="img" src="https://i1-vnexpress.vnecdn.net/2023/10/12/doi-giay-phep-9757-1697092638-1441-8458-1697093249.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=GmqRRQvstsyod_31rrMjyw" alt="">
<div class="content"></div>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Et est accusamus nihil voluptatibus. Dicta iusto unde ipsum dolor nostrum, quidem, maiores natus magnam itaque nisi ipsam officia, aut fugit repellat?
    </div>
  </div> */

