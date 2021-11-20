class Basket {
    constructor() {
        this.name();                  // Имя заказчика (если зарегистрирован)
        this.date();                  // Дата покупки
        this.productsInBasket = [];   // Список всех выбранных товаров в корзине
        this.addToBasket();           // Добавить товар в корзину
        this.removeFromBasket();      // Удалить товар из корзины
        this.render();                // Вывод товаров на страницу корзины
    }
}

class BasketProducts {                // Карточка товара
    constructor(product, quantity) {
        this.img = product.img;       // (не обязательно) Изображение
        this.id = product.id;         // Порядковый номер в заказе
        this.title = product.title;   // Наименование товара
        this.price = product.price;   // Цена товара
        this.quantity = quantity;     // Количество товара
    }
}