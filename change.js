let nativeText = document.querySelector('.text');
let nextText = document.querySelector('.new-text');

let change = () => {
        let redText = nativeText.textContent;
        nextText.innerText = redText.replace(/\B'|'\B/g, '"');
}
//   /\B'|'\B/ - меняем все одинарные ковычки только которые в начале
//               или в конце слова(находятся на границах слов)
//    g - искать по всему тексту
//   '"' - на что меняем одинарные ковычки