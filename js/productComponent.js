Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="products">
                    <product v-for="thing of products"
                    :key="thing.id_product"
                    :img="img"
                    :product="thing"></product>
                </div>
                `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item">
                    <img class="img-product-item" :src="img" alt="Картинка товара">
                    <h3 class="title-product-item">{{product.product_name}}</h3>
                    <p class="price-product-item">цена: {{product.price}} у.е.</p>
                    <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                `
});