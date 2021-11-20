class ProductList {
    constructor(container = '.products') { // в каком элементе вёрстки нужно вывести результат (.products) 
        this.container = container;
        this.goods = [];                   // массив товаров
        this._fetchProducts();             // для вывода метода в текущем классе (рекомендация)
        this.render();                     // вывод товаров на страницу
    }

    _fetchProducts() {                     // заполняем значениями массив (goods)
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, img: 'img/notebook.jpg' },
            { id: 2, title: 'Mouse', price: 20, img: 'img/mouse.jpg' },
            { id: 3, title: 'Keyboard', price: 200, img: 'img/keyboard.jpg' },
            { id: 4, title: 'Gamepad', price: 50, img: 'img/gamepad.jpg' },
        ];
    }

    render() {
        let block = document.querySelector(this.container);// (block)-блок в котором нужно вывести наши товары из массива (goods)
        for (let product of this.goods) {
            let item = new ProductItem(product);           // объект (item) наполняем свойствами объекта (goods)
            block.insertAdjacentHTML('beforeend', item.render()); //(block) заполняем товарами со свойствами
        }
    }

    sumPriceItems() {
        let sumPrice = document.querySelector('.sum_item');
        let sum = 0;
        this.goods.forEach(prod => { sum += prod.price });
        sumPrice.innerText = `Сумма всех товаров: ${this.sum} у.е.`
    }
}

class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
    }

    render() {
        return `<div class="product-item">
                    <img class="img-product-item" src = "${this.img}">
                    <h3 class="title-product-item">${this.title}</h3>
                    <p class="price-product-item">цена: ${this.price} у.е.</p>
                    <button class="buy-btn">Купить</button>
                    </div>`
    }
}

let list = new ProductList();