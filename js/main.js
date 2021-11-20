let products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'img/zz.jpg' },
    { id: 2, title: 'Mouse', price: 20, img: 'img/zz.jpg' },
    { id: 3, title: 'Keyboard', price: 200, img: 'img/zz.jpg' },
    { id: 4, title: 'Gamepad', price: 50, img: 'img/zz.jpg' },
];

let renderProduct = (item) => {
    return `<div class="product-item">
                <img class="img-product-item" src = "${item.img}">
                <h3 class="title-product-item">${item.title}</h3>
                <p class="price-product-item">цена: ${item.price} у.е.</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};
let renderPage = list => {
    let productsList = list.map(item => renderProduct(item));
    document.querySelector('.products').insertAdjacentHTML('beforeend', productsList.join(" "));
};
renderPage(products);