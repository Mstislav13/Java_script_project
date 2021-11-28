module.exports = {
    mode: 'development',
    entry: ['./public/js/main.js', './public/js/basketComponent.js', './public/js/errorComponent.js', './public/js/searchComponent.js', './public/js/productComponent.js'],
    output: {
        filename: "./build.js"
    },    
}
