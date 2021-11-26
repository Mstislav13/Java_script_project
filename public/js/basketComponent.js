Vue.component('cart', {
    data() {
        return {           
            cartItems: [],            
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(outcome => {
                for (let el of outcome.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${ product.product_name }`, {quantity: 1})
                    .then(outcome => {
                        if (outcome.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`/api/cart/${ product.id_product }/${ product.product_name }`, prod)
                    .then(outcome => {
                        if(outcome.result) {
                            this.cartItems.push(prod);
                        }
                    })
            }                
        },
        remove(product){
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, {quantity: -1})
                    .then( data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product)
                    .then( data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    } )
            }
        },
    },
    template: `
            <div>
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart" v-show="showCart">
                    <p v-if="cartItems.length == 0" class="empty-bask">Корзина пуста</p>
                    <p v-else="cartItems.length" class="empty-bask">В корзине есть товары</p>                    
                    <cart-item v-for="item of cartItems" 
                        :key="item.id_product"
                        :img="item.imgCart"
                        :cart-item="item"                                                                            
                        @remove="remove">
                    </cart-item>
                </div>
            </div>
            `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
            <div class="cart-item">
                <img class="cart-img-product" :src="img" alt="Картинка">
                <p class="cart-title-product">{{ cartItem.product_name }}</p>
                <p class="cart-price-product">цена: {{ cartItem.price }} у.е.</p>
                <p class="cart-quantity-product">количество: {{ cartItem.quantity }} шт.</p>
                <p class="product-sum">Итого: {{ cartItem.quantity * cartItem.price }} у.е.</p>
                <button class="delete" @click="$emit('remove', cartItem)">Удалить</button>
            </div>
            `
})

// Vue.component('basket', {
//     props: ['basketItem', 'img', 'visibility'],
//     template: `
        // <div class="basket" v-show="visibility">
        //     <basket-prod v-for="thing of basketItem" :key="thing.id_product" :img="img" :basket-prod="thing">
        //     </basket-prod>
        // </div>
//     `
// });

// Vue.component('basket-prod', {
//     props: ['img', 'basketProd'],
//     template: `
//         <div class="basket-product">
//             <img class="basket-img-product" :src="img" alt="Картинка">
//             <p class="basket-title-product">{{ basketProd.product_name }}</p>
//             <p class="basket-price-product">цена: {{ basketProd.price }} у.е.</p>
//             <p class="basket-quantity-product">количество: {{ basketProd.quantity }} шт.</p>
//             <p class="product-sum">Итого: {{ basketProd.quantity * basketProd.price }} у.е.</p>
//             <button class="delete" @click="$root.delItem(basketProd)">Удалить</button>
//         </div>
//     `
// })