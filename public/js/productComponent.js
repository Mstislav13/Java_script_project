Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],                   
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(outcome => {
                for (let el of outcome) {
                    this.filtered.push(el);
                    this.products.push(el);
                }
            });
    },
    methods: {
        filter(value) {
            let findIt = new RegExp(value, 'i');
            this.filtered = this.products.filter(prod => findIt.test(prod.product_name));
        }
    },
    template: `
            <div class="products">
                <product-item v-for="item of filtered"
                    :key="item.id_product"
                    :img="item.imgCart"
                    :product-item="item"></product-item>                    
            </div>                
            `
});

Vue.component('product-item', {
    props: ['productItem', 'img'],
    template: `
            <div class="product-item">
                <img class="img-prod-item" :src="img" alt="Картинка товара">
                <h3 class="title-prod-item">{{ productItem.product_name }}</h3>
                <p class="price-prod-item">цена: {{ productItem.price }} у.е.</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(productItem)">Купить</button>
            </div>
            `
})


// Vue.component('products', {
//     props: ['products', 'img'],
//     template: `<div class="products">
//                     <product v-for="thing of products"
//                     :key="thing.id_product"
//                     :img="img"
//                     :product="thing"></product>
//                 </div>
//                 `
// });

// Vue.component('product', {
//     props: ['product', 'img'],
//     template: `<div class="product-item">
//                     <img class="img-product-item" :src="img" alt="Картинка товара">
//                     <h3 class="title-product-item">{{product.product_name}}</h3>
//                     <p class="price-product-item">цена: {{product.price}} у.е.</p>
//                     <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
//                 `
// });