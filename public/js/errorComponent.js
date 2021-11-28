Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        comeText(value){
            this.text = value;
        }
    },
    template: `
        <div class="err" v-if="text">
            <p><button class="close-btn" @click="comeText('')">&times;</button>
            {{ text }}
            </p>
        </div>`
});

// data() {
//     return {
//         message: 'СЕРВЕР НЕ ДОСТУПЕН!'
//     }
// },
// template:`
//     <div>
//         <div>
//             <h2 class="err">{{ message }}</h2>
//         </div>
//     </div>`
