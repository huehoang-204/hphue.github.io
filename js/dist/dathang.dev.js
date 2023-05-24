"use strict";

var openShopping = document.querySelector('.shopping');
var OpenShopping = document.querySelector('.shop');
var closeShopping = document.querySelector('.closeShopping');
var closeShop = document.querySelector('.closeshop');
var list = document.querySelector('.list1');
var listCard = document.querySelector('.listCard');
var body = document.querySelector('body');
var total = document.querySelector('.total');
var quantity = document.querySelector('.quantity');
openShopping.addEventListener('click', function () {
  body.classList.add('active');
});
OpenShopping.addEventListener('click', function () {
  body.classList.add('active');
});
closeShop.addEventListener('click', function () {
  body.classList.remove('active');
});
closeShopping.addEventListener('click', function () {
  body.classList.remove('active'); // Chuyển hướng sang trang "checkout.html" và truyền dữ liệu qua URL

  var checkoutURL = "checkout.html?data=".concat(encodeURIComponent(JSON.stringify(listCards)));
  window.location.href = checkoutURL;
});
var products = [{
  id: 1,
  name: 'Suất đặc biệt',
  image: '1.PNG',
  price: 250000
}, {
  id: 2,
  name: 'Gà chiên sốt thái',
  image: '2.PNG',
  price: 120000
}, {
  id: 3,
  name: 'Salat cá hồi',
  image: 'caesar.jpg',
  price: 220000
}, {
  id: 4,
  name: 'Gà rán khoai tây chiên',
  image: 'chicken leg.png',
  price: 125000
}, {
  id: 5,
  name: 'Salat',
  image: '5.PNG',
  price: 50000
}, {
  id: 6,
  name: 'Pizza phô mai',
  image: '6.PNG',
  price: 120000
}, {
  id: 7,
  name: 'Mỳ trộn thập cẩm',
  image: 'pasta.png',
  price: 279000
}, {
  id: 8,
  name: 'Cá hồi sốt tiêu',
  image: 'white fish.png',
  price: 500000
}, {
  id: 9,
  name: 'Nước ép chanh leo',
  image: 'ncchanh.jfif',
  price: 45000
}, {
  id: 10,
  name: 'Sinh tố bơ',
  image: 'sinhto.jfif',
  price: 45000
}, {
  id: 11,
  name: 'Chè',
  image: 'che.jfif',
  price: 45000
}, {
  id: 12,
  name: 'Gà xào',
  image: 'gaxao.jfif',
  price: 150000
}];
var listCards = [];

function initApp() {
  products.forEach(function (value, key) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = "\n      <img src=\"image/".concat(value.image, "\">\n      <div class=\"title\">").concat(value.name, "</div>\n      <div class=\"price\">").concat(value.price.toLocaleString(), "</div>\n      <button onclick=\"addToCard(").concat(key, ")\">Add To Card</button>");
    list.appendChild(newDiv);
  });
}

function addToCard(key) {
  if (listCards[key] == null) {
    // Copy sản phẩm từ danh sách chính vào giỏ hàng
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }

  saveData();
  reloadCard();
}

function saveData() {
  localStorage.setItem('cartItems', JSON.stringify(listCards));
}

function reloadCard() {
  listCard.innerHTML = '';
  var count = 0;
  var totalPrice = 0;
  var data = localStorage.getItem('cartItems');
  listCards.forEach(function (value, key) {
    if (value != null) {
      totalPrice += value.price;
      count += value.quantity;
      var newDiv = document.createElement('li');
      newDiv.innerHTML = "\n        <div><img src=\"image/".concat(value.image, "\"/></div>\n        <div>").concat(value.name, "</div>\n        <div>").concat(value.price.toLocaleString(), "</div>\n        <div>\n          <button onclick=\"changeQuantity(").concat(key, ", ").concat(value.quantity - 1, ")\">-</button>\n          <div class=\"count\">").concat(value.quantity, "</div>\n          <button onclick=\"changeQuantity(").concat(key, ", ").concat(value.quantity + 1, ")\">+</button>\n        </div>");
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity === 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }

  saveData();
  reloadCard();
}

function restoreData() {
  var data = localStorage.getItem('cartItems');

  if (data) {
    listCards = JSON.parse(data);
    reloadCard();
  }
} // Gọi hàm initApp khi tải xong trang


window.addEventListener('load', initApp); // Gọi hàm restoreData khi tải lại trang web

window.addEventListener('load', restoreData);
//# sourceMappingURL=dathang.dev.js.map
