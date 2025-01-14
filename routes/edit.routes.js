const express = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {
    const product = {
        name: "Nombre de ejemplo",
        description: "Descripción de ejemplo",
        category: "Fisico",
        colors: "Cartas, Modelado, STL",
        price: 100.00,
        userStories: "Descripción de ejemplo"
    }; 
    res.render('products/edit', { product: product }); 
});


router.post('/', (req, res) => {
    res.redirect('/success'); 
});

module.exports = router;
