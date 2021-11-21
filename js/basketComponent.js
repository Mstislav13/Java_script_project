Vue.component('basket', {
    props: ['basketItem', 'img', 'visibility'],
    template: `
        <div class="basket" v-show="visibility">
            <basket-prod v-for="thing of basketItem" :key="thing.id_product" :img="img" :basket-prod="thing">
            </basket-prod>
        </div>
    `
});

Vue.component('basket-prod', {
    props: ['img', 'basketProd'],
    template: `
        <div class="basket-product">
            <img class="basket-img-product" :src="img" alt="Картинка">
            <p class="basket-title-product">{{ basketProd.product_name }}</p>
            <p class="basket-price-product">цена: {{ basketProd.price }} у.е.</p>
            <p class="basket-quantity-product">количество: {{ basketProd.quantity }} шт.</p>
            <p class="product-sum">Итого: {{ basketProd.quantity * basketProd.price }} у.е.</p>
            <button class="delete" @click="$root.delItem(basketProd)">Удалить</button>
        </div>
    `
})