// var user ={ 
//     name: "Hoang An",
//     email : " hoangan.web@gmail.com",
//     combine : function(...args){
//         var curent = this;
//         if(args.length){ 
//             return args.map(function(key){
//                return curent[key];

//             });
//         }
//     }
// };
// var results = user.combine("name","email");
// log(results1);


Object.prototype.combine = function( ... args){
    var curent = this;
    if(args.length){ 
        return args.map(function(key){
           return curent[key];

        });
    };
}
;
//thêm thuộc tính vào prototype
Object.prototype.message = " F8";
var user= { 
    name: "Hoàng An",
    email : "hoangan.web@gmail.com",

};
var customer = { 
    name : "Nguyễn Dương",

}