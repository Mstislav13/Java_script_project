// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {        
        title: 'Мой магазин',
        copyRight: "Copyright 	© " + new Date().getFullYear() + ". All rights reserved.",
        // userSearch: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
            .then(outcome => outcome.json())
            .catch(error => {this.$refs.error.text = error;
            })
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {this.$refs.error.text = error;
                })
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {this.$refs.error.text = error;
                })
        },       
    },    
});


    // data: {
    //     title: 'Мой магазин',
    //     show: false,
    //     catalogUrl: '/catalogData.json',
    //     items: [],
    //     sieve: [],
    //     imgCatalog: 'img/zz.jpg',
    //     userSearch: '',
    //     basketUrl: '/getBasket.json',
    //     basketItem: [],
    //     copyRight: "Copyright 	© " + new Date().getFullYear() + ". All rights reserved.",
    //     error: false
    // },

    // methods: {
        // separation() {
        //     let findIt = new RegExp(this.userSearch, 'i');
        //     this.sieve = this.items.filter(prod => findIt.test(prod.product_name));
        // },
    //     _getJson(url) {
    //         return fetch(url)
    //             .then(outcome => outcome.json())
    //             .catch(mistacke => {
    //                 console.log(mistacke);
    //                 this.error = true;
    //             })
    //     },
        // addProduct(thing) {
        //     this._getJson(`${API}/addToBasket.json`)
        //         .then(outcome => {
        //             if (outcome.result === 1) {
        //                 let find = this.basketItem.find(product => product.id_product === thing.id_product);
        //                 if (find) {
        //                     find.quantity++;
        //                 } else {
        //                     let newThing = Object.assign({ quantity: 1 }, thing);
        //                     this.basketItem.push(newThing)
        //                 }
        //             }
        //         })
        // },
        // delItem(thing) {
        //     this._getJson(`${API}/addToBasket.json`)
        //         .then(outcome => {
        //             if (outcome.result === 1) {
        //                 if (thing.quantity > 1) {
        //                     thing.quantity--;
        //                 } else {
        //                     this.basketItem.splice(this.basketItem.indexOf(thing), 1);
        //                 }
        //             }
        //         })
        // },
    // },
    // mounted() {
    //     this._getJson(`${API + this.catalogUrl}`)
            // .then(outcome => {
            //     for (let el of outcome) {
            //         this.items.push(el);
            //         this.sieve.push(el);
            //     }
    //         });
    //     this._getJson(`getProducts.json`)
    //         .then(outcome => {
    //             for (let el of outcome) {
    //                 this.items.push(el);
    //                 this.sieve.push(el);
    //             }
    //         });
    //     this._getJson(`${API + this.basketUrl}`)
    //         .then(outcome => {
    //             for (let el of outcome.contents) {
    //                 this.basketItem.push(el);
    //             }
    //         });
    // },