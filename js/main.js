const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: "#app",
    data: {
        title: 'Мой магазин',
        show: false,
        catalogUrl: '/catalogData.json',
        items: [],
        sieve: [],
        imgCatalog: 'img/zz.jpg',
        userSearch: ''
    },
    
    methods: {
        separation(value) {
            let findIt = new RegExp(value, 'i');
            this.sieve = this.items.separ(prod => findIt.test(prod.product_name));
        },
        _getJson(url) {
            return fetch(url)
                .then(outcome => outcome.json())
                .catch(mistacke => {
                    console.log(mistacke);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        }
    },
    created() {
        this._getJson(`${API + this.catalogUrl}`)
            .then(outcome => {
                for (let el of outcome) {
                    this.items.push(el);
                }
            })
    },
    mounted() {
        this._getJson(`getProducts.json`)
            .then(outcome => {
                for (let el of outcome) {
                    this.items.push(el);
                }
            })
    }
})
// // ПРОДУКТЫ
// class Products {
//     constructor(url, container, list = list2) {
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.sorted = [];
//         this._init();
//     }

//     _getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then(outcome => outcome.json())
//             .catch(mistacke => {
//                 console.log(mistacke);
//             });
//     }

//     dataCollection(data) {
//         this.goods = [...data];
//         this.render();
//     }

//     sumPriceItems() {
//         let sum = 0;
//         this.goods.forEach(prod => { sum += prod.price });
//         return sum;
//     }

//     render() {
//         let block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             let item = new this.list[this.constructor.name](product);
//             this.allProducts.push(item);
//             block.insertAdjacentHTML('beforeend', item.render());
//         }
//     }

//     // ФИЛЬТРАЦИЯ ТОВАРА ПРИ ПОИСКЕ
//     separation(value) {
//         let regexp = new RegExp(value, 'i');
//         this.sorted = this.allProducts.filter(prod => regexp.test(prod.product_name));
//         this.allProducts.forEach(_elem => {
//             let block = document.querySelector(`.product-item[data-id="${_elem.id_product}"]`);
//             if (!this.sorted.includes(_elem)) {
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//     _init() {
//         return false
//     }
// }
// // КАРТОЧКА ПРОДУКТА
// class ProductCard {
//     constructor(product, img = 'img/zz.jpg') {
//         this.id_product = product.id_product;
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.img = img;
//     }

//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                     <img class="img-product-item" src = "${this.img}" alt="Картинка товара">
//                     <h3 class="title-product-item">${this.product_name}</h3>
//                     <p class="price-product-item">цена: ${this.price} у.е.</p>
//                     <button class="buy-btn"
//                     data-id="${this.id_product}"
//                     data-name="${this.product_name}"
//                     data-price="${this.price}">Купить</button>
//                     </div>`
//     }
// }

// // СПИСОК ПРОДУКТОВ
// class ProductsList extends Products {
//     constructor(card, container = '.products', url = "/catalogData.json") {
//         super(url, container);
//         this.card = card;
//         this._getJson()
//             .then(data => this.dataCollection(data));
//     }
//     // ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ ПРИ НАЖАТИ НА КНОПКУ КУПИТЬ
//     _init() {
//         document.querySelector(this.container).addEventListener('click', push => {
//             if (push.target.classList.contains('buy-btn')) {
//                 this.card._getBasketProducts(push.target);
//             }
//         });
//         // ПОИСК ТОВАРА НА СТРАНИЦЕ
//         document.querySelector('.search-form').addEventListener('submit', push => {
//             push.preventDefault();
//             this.separation(document.querySelector('.search-field').value)
//         })
//     }
// }

// class CatalogProducts extends ProductCard { }

// // КОРЗИНА
// class Basket extends Products {
//     constructor(container = '.basket', url = "/getBasket.json") {
//         super(url, container);
//         this._getJson()
//             .then(data => {
//                 this.dataCollection(data.contents);
//             });
//     }
//     // ДОБАВЛЕНИЕ В КОРЗИНУ СПИСКА ТОВАРОВ
//     _getBasketProducts(thing) {
//         this._getJson(`${API}/addToBasket.json`)
//             .then(outcome => {
//                 if (outcome.result === 1) {
//                     let prodId = +thing.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === prodId);
//                     if (find) {
//                         find.quantity++;
//                         this._upCard(find);
//                     } else {
//                         let product = {
//                             id_product: prodId,
//                             price: +thing.dataset['price'],
//                             product_name: thing.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('ERROR');
//                 }
//             })
//     }

//     // УДАЛЕНИЕ ТОВАРА ИЗ КОРЗИНЫ ПРИ НАЖАТИИ КНОПКИ 'УДАЛИТЬ'(В КОРЗИНЕ)
//     delItem(item) {
//         this._getJson(`${API}/deleteFromBasket.json`)
//             .then(outcome => {
//                 if (outcome.result === 1) {
//                     let prodId = +item.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === prodId);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this._upCard(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.basket-product[data-id="${prodId}"]`).remove();
//                     }
//                 } else {
//                     alert('ERROR');
//                 }
//             })
//     }

//     // ОБНОВЛЕНИЕ ИНФОРМАЦИИ В КОРЗИНЕ
//     _upCard(item) {
//         let block = document.querySelector(`.basket-product[data-id="${item.id_product}"]`);
//         block.querySelector('.basket-quantity-product').textContent = `количество: ${item.quantity} шт.`;
//         block.querySelector('.product-sum').textContent = `Итого: ${item.quantity * item.price} у.е.`;
//     }

//     _init() {        
//         document.querySelector(this.container).addEventListener('click', push => {
//             if (push.target.classList.contains('delete')) {
//                 this.delItem(push.target);
//             }
//         })
//     }
// }

// // КАРТОЧКА ТОВАРА В КОРЗИНЕ
// class BasketProducts extends ProductCard {
//     constructor(item, img = 'img/zz.jpg') {
//         super(item, img);
//         this.quantity = item.quantity;
//     }
//     render() {
//         return `<div class="basket-product" data-id="${this.id_product}">
//             <img class="basket-img-product" src = "${this.img}">
//             <p class="basket-title-product">${this.product_name}</p>
//             <p class="basket-price-product">цена: ${this.price} у.е.</p>
//             <p class="basket-quantity-product">количество: ${this.quantity} шт.</p> 
//             <p class="product-sum">Итого: $${this.quantity * this.price} у.е.</p>
//             <button class="delete" data-id="${this.id_product}">Удалить</button>                   
//             </div>`
//     }
// }

// let list2 = {
//     ProductsList: CatalogProducts,
//     Basket: BasketProducts
// };

// let basket = new Basket();
// let products = new ProductsList(basket);
// products.getJson(`getProducts.json`).then(data => products.handleData(data));