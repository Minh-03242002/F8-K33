// var user = { 
//     name: "Hoang An",
//     email: "hoangan.web@gmai.com",
//     getName: function(){
//         return this.name;
//     },
// };
// var customer= { 

// }
// > tạo ra 1 bản thiết kế cho Object 
// trong js > hàm tạo ;
// viết tên hàm tạo theo cú pháp pascalCase


// var Person = function(name, email){
//     this.name= name;
//     this.email = email;
//     this.getName=function(){
//         return this.name;

//     };
// };
// //tạo đối tượng từ hàm tạo 
// var person = new Person("hoang an", "Hoangan.web@gamil.com");
// console.log(person);

// var user = new Person("duong nguyen","duon@gmail.com")

// console.log(user);

// Array.prototype.first= function(){
//     return this[0];

// }
// var a =['An' , "Dương", "vương"];
// console.log(a.first());

// String.prototype.end =function(){
//     return this.slice(-1);

// };
// var b = " Tạ Hoàng An";
// console.log(b.end());

//kiẻm tra object thuộc hàm tạo nào ? 
// console.log(a.constructor.name);
// var a =10;
// var b = 10
// console.log(b.constructor.name);

// if(a === 0 || (a&& a.constructor.name === 'Number')){
//     console.log("number");
// }



// xây dựng 1 hàm nôi bộ từ hàm tạo 
// var getMgs =function(){
//     console.log("xin chào F8");
// };
// getMgs();



// Person.isPerson = function(variable){
//     return variable && variable.constructor.name==="Person";

// };
// if (Person.isPerson(person)){
//     console.log("đây là person");
// }
// else{
//     console.log("không phải");
// }



// var a = { 
//     name : "hoang an ",
//     email : "hoangan.web@gmail.com",

// };

// var b = { 
//     teacher : "hoang an ",
//     salary : 500000,

// };
// for( key in b ){
//     // console.log(key);
//     // console.log(b[key]);

//     a[key] = b[key];
// }
// console.log(a );



// // bài 2
// var query = { 
//     name: "hoang an",
//     keyword : "fullstack",
//     catagory:1,

// };
// // chuyển đổi Object tren thành dạng query 
// // 
// console.log(Object.entries(query));
// var queryString = Object.entries(query).map(function(item){
//     return item.join("=");

// })
// .join("&")
// .replaceAll(" ", "+");
// console.log(queryString);


//  bài 2
// var a = { 
//     name : "hoang an ",
//     email : "hoangan.web@gmail.com",

// };

// var b = { 
//     teacher : "hoang an ",
//     salary : 500000,
// }
// var result =Object.assign(a,b);
// console.log(a);
// console.log(result);

// bài 3
//  Object.create(null) > tạo Object k có prototype


// var a = Object.create(null);
// console.log(a);


// var a ={ 
//     name : "hoang an",
//     email: " hoangan.web",


// };
// var b = Object.assign({},a);
// b.name = "hoang an F8";
// console.log(a);
// console.log(b);






//optinal chaining (?.)
