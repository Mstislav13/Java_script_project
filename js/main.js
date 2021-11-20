const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class ProductList {
    constructor(container = '.products') { // в каком элементе вёрстки нужно вывести результат (.products) 
        this.container = container;
        this.goods = [];                   // массив товаров из JSON документа
        this._getProducts()
            .then(items => {               // items - объект JS, полученный из json строки
                this.goods = items;
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(outcome => outcome.json())
            .catch(mistacke => {
                console.log(mistacke);
            });
    }

    sumPriceItems() {
        let sum = 0;
        this.goods.forEach(prod => {
            sum += prod.price;
        })
    }

    render() {
        let block = document.querySelector(this.container); // (block)-блок в котором нужно вывести наши товары из массива (goods)
        for (let product of this.goods) {
            let item = new ProductItem(product);            // объект (item) наполняем свойствами объекта (goods)            
            block.insertAdjacentHTML('beforeend', item.render()); //(block) заполняем товарами со свойствами
        }
    }


}

class ProductItem {
    constructor(product, img = 'img/zz.jpg') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img class="img-product-item" src = "${this.img}">
                    <h3 class="title-product-item">${this.title}</h3>
                    <p class="price-product-item">цена: ${this.price} у.е.</p>
                    <button class="buy-btn">Купить</button>
                    </div>`
    }
}

let list = new ProductList();

class Basket {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this._getBasketProducts()
            .then(items => {
                this.goods = [...items.contents];
                this.render()
            });
    }

    _getBasketProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(outcome => outcome.json())
            .catch(mistacke => {
                console.log(mistacke);
            })
    }

    render() {
        let block = document.querySelector(this.container);
        for (let my_product of this.goods) {
            let item = new BasketProducts();
            block.insertAdjacentHTML('beforeend', item.render(my_product));
        }
    }
}

class BasketProducts {
    render(my_product, img = 'img/zz.jpg') {
        return `<div class="basket-product" data-id="${my_product.id_product}">
                    <img class="basket-img-product" src = "${img}">
                    <p class="basket-title-product">${my_product.product_name}</p>
                    <p class="basket-price-product">цена: ${my_product.price} у.е.</p>
                    <p class="basket-quantity-product">количество: ${my_product.quantity} шт.</p>                    
                    </div>`
    }
}

let my_basket = new Basket();