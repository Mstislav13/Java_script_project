Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" placeholder="Поиск товаров" v-model="userSearch">
                <button class="btn-search" type="submit">Нажми</button>
                </form>`
}) 


// data() {
//     return {
//         userSearch: ''
//     }
// },
// template: `<form action = "#" class="search-form" @submit.prevent="$parent.separation">
//             <input type="text" class="search-field" placeholder="Поиск товаров" v-model="$parent.userSearch">
//             <button class="btn-search" type="submit">Нажми</button>
//             </form>
//             `