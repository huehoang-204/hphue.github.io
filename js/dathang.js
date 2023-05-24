let openShopping = document.querySelector('.shopping');
let OpenShopping = document.querySelector('.shop');
let closeShopping = document.querySelector('.closeShopping');
let closeShop = document.querySelector('.closeshop');
let list = document.querySelector('.list1');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
OpenShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShop.addEventListener('click', ()=>{
  body.classList.remove('active');});
  
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
    // Chuyển hướng sang trang "checkout.html" và truyền dữ liệu qua URL
  const checkoutURL = `checkout.html?data=${encodeURIComponent(JSON.stringify(listCards))}`;
  window.location.href = checkoutURL;
});


let products = [
    {
        id: 1,
        name: 'Suất đặc biệt',
        image: '1.PNG',
        price: 250000
    },
    {
        id: 2,
        name: 'Gà chiên sốt thái',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'Salat cá hồi',
        image: 'caesar.jpg',
        price: 220000
    },
    {
        id: 4,
        name: 'Gà rán khoai tây chiên',
        image: 'chicken leg.png',
        price: 125000
    },
    {
        id: 5,
        name: 'Salat',
        image: '5.PNG',
        price: 50000
    },
    {
        id: 6,
        name: 'Pizza phô mai',
        image: '6.PNG',
        price: 120000
    },
    {
      id: 7,
      name: 'Mỳ trộn thập cẩm',
      image: 'pasta.png',
      price: 279000
  },
  {
    id: 8,
    name: 'Cá hồi sốt tiêu',
    image: 'white fish.png',
    price: 500000 
},
{
  id: 9,
  name: 'Nước ép chanh leo',
  image: 'ncchanh.jfif',
  price: 45000
},
{
  id: 10,
  name: 'Sinh tố bơ',
  image: 'sinhto.jfif',
  price: 45000
},
{
  id: 11,
  name: 'Chè',
  image: 'che.jfif',
  price: 45000
},
{
  id: 12,
  name: 'Gà xào',
  image: 'gaxao.jfif',
  price: 150000
}

];
let listCards = [];

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
      <img src="image/${value.image}">
      <div class="title">${value.name}</div>
      <div class="price">${value.price.toLocaleString()}</div>
      <button onclick="addToCard(${key})">Add To Card</button>`;
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
  let count = 0;
  let totalPrice = 0;
  const data = localStorage.getItem('cartItems');
  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice += value.price;
      count += value.quantity;

      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="image/${value.image}"/></div>
        <div>${value.name}</div>
        <div>${value.price.toLocaleString()}</div>
        <div>
          <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>`;
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
  const data = localStorage.getItem('cartItems');
  if (data) {
    listCards = JSON.parse(data);
    reloadCard();
  }
}

// Gọi hàm initApp khi tải xong trang
window.addEventListener('load', initApp);
// Gọi hàm restoreData khi tải lại trang web
window.addEventListener('load', restoreData);

