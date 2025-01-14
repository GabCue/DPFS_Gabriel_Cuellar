const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const products = [
        { name: 'Producto 1', image: '/Images/Exportar provisorio.png', price: 1555, quantity: 2 },
        { name: 'Producto 2', image: '/Images/Exportar provisorio.png', price: 505, quantity: 1 },
        { name: 'Producto 3', image: '/Images/Exportar provisorio.png', price: 1555, quantity: 2 }
    ];
    const totalPrice = 3615;
    res.render('cart', { title: 'Carrito de Compras', products, totalPrice });
});

module.exports = router;
