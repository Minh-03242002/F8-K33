var products = [
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 1000,
  },

  {
    id: 2,
    name: "Sản phẩm 2",
    price: 2000,
  },

  {
    id: 3,
    name: "Sản phẩm 3",
    price: 3000,
  },

  {
    id: 4,
    name: "Sản phẩm 4",
    price: 4000,
  },
];

var carts = [];
var getProduct =function(id){ 
  return products.find(function(product){ 
    return +product.id === +id
  })
};
var deleteCartItem = function(id){ 
  if(confirm('bạn có chắc chắn'))
carts = carts.filter(function(cartItem){ 
return +cartItem.productId !== +id
})
renderCart()
};
var handleUpdateCart= function(){ 
  var cartEl = document.querySelector(".carts");
var indexDelete;
  var quantityInputList = cartEl.querySelectorAll(".quantity")
quantityInputList.forEach(function(quantityInput){ 
quantityInputList.forEach(function(quantityInput,index){ 
if(quantityInput.value>0){ 
  carts[index].quantity =quantityInput.value;

}  else{
  indexDelete=index
}
});
if(indexDelete){ 
carts.splice(indexDelete,1);
}
renderCart()
});
};

var renderCart = function() {
  var cartEl = document.querySelector(".carts");
  var table = `
    <table cellpadding="0" cellspacing="0" width="100%" border="1" id="cart_table">
      <thead>
        <tr>
          <th width="5%">STT</th>
          <th>Tên sản phẩm</th>
          <th width="20%">Giá</th>
          <th width="20%">Số lượng</th>
          <th width="20%">Thành tiền</th>
          <th width="5%">Xoá</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  cartEl.innerHTML = table;
  var tbody = cartEl.querySelector('tbody');
  var totalAmount= 0;
  var totalQuantity = 0;

  carts.forEach(function(cartItem, index) {
    var product = getProduct(cartItem.productId);
    var tr = document.createElement("tr");
    
    var tdNo = document.createElement("td");
    tdNo.innerText = index + 1;
    tr.appendChild(tdNo);

    var tdName = document.createElement("td");
    tdName.innerText = product.name;
    tr.appendChild(tdName);

    var tdPrice = document.createElement('td');
    tdPrice.innerText = product.price.toLocaleString();
    tr.appendChild(tdPrice);

    var tdQuantity = document.createElement('td');
    var quantityInput = document.createElement("input");
    quantityInput.type = 'number';
    quantityInput.value = cartItem.quantity;
    quantityInput.classList.add("quantity");
    tdQuantity.appendChild(quantityInput);
    tr.appendChild(tdQuantity);

    var tdAmount = document.createElement('td');
    tdAmount.innerText = (product.price * cartItem.quantity).toLocaleString();
    tr.appendChild(tdAmount);

    var tdRemove = document.createElement('td');
    var removeBtn = document.createElement('button');
    removeBtn.innerText = "Xóa";
    removeBtn.addEventListener("click",function(){ 
      deleteCartItem(cartItem.productId);
    })
    tdRemove.appendChild(removeBtn);
    tr.appendChild(tdRemove);

    tbody.appendChild(tr);

    totalAmount +=product.price * cartItem.quantity;
    totalQuantity += +cartItem.quantity
  });

  // thống kê
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.innerText = `Tổng`;
  td.setAttribute("colspan",3);
  tr.append(td);
  
  var td = document.createElement('td');
  td.innerText = totalQuantity.toLocaleString();
  tr.append(td); 

  var td = document.createElement('td');
  td.innerText = totalAmount.toLocaleString() ;
  td.setAttribute("colspan",2);
  tr.append(td);

  tbody.append(tr)
  //thêm nút
  var updateCartBtn = document.createElement("button");

  updateCartBtn.innerText=("Cập nhật giỏ hàng");
  updateCartBtn.addEventListener("click",handleUpdateCart

  )
  cartEl.append(updateCartBtn)
  var deleteCarBtn=  document.createElement("button");
  deleteCarBtn.innerText=("xóa giỏ hàng")
  cartEl.append(deleteCarBtn);

};


var addCart = function(cartItem){ 
 var index = carts.findIndex(function(item){ 
  return item.productId === +cartItem.productId
});
if(index=== -1){
  carts.push(cartItem)
}else{ 
  carts[index].quantity +=cartItem.quantity
}

}
var handleAddCart = function(product,quantity){ 

  if(quantity<0|Number.isNaN(quantity)){ 
quantity =1
  }
var productId = product.id;
addCart({
  productId,quantity,
});
renderCart()
}
var tableProducts = document.querySelector(".products tbody");


products.forEach(function (product, index) {
  
  var tr = document.createElement("tr");
  var tdNo = document.createElement("td");
  tdNo.innerText = index + 1;
  tr.append(tdNo);

  var tdName = document.createElement("td");
  tdName.innerText = product.name;
  tr.append(tdName);
  var tdPrice = document.createElement('td');
  tdPrice.innerText = product.price.toLocaleString();
  tr.append(tdPrice);
  var tdAction = document.createElement("td");
  var quantityInput = document.createElement("input");
  quantityInput.style = `width: 90%; display: block; margin: 0 auto;`
  quantityInput.value =1
  quantityInput.type="Number"

  tdAction.append(quantityInput);
  var button = document.createElement("button");
  button.style= `width = 100%;`;


  button.addEventListener('click',function(){ 
    var quantity = quantityInput.value
    handleAddCart(product,+quantity)
  })



  button.innerText= `Thêm vào giỏ`;

  tdAction.append(button)
tr.append(tdAction);

tableProducts.append(tr)
});



