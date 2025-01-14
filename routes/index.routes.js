const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { 
        title: 'Home', 
        carouselImages: [
            '/Images/Impresion3d.png',
            '/Images/Cartas.png',
            '/Images/Hobby.png'
        ],
        productImages: [
            { src: '/Images/digital.png', alt: 'Productos Digitales', title: 'Productos Digitales' },
            { src: '/Images/Juegos de mesa.png', alt: 'Productos Físicos', title: 'Productos Físicos' }
        ],
        products: [
            { link: '/Product/1', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto', title: 'Producto', label: 'Etiqueta', price: 9000 },
            { link: '/Product/2', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 2', title: 'Producto 2', label: 'Etiqueta 2', price: 8500 },
            { link: '/Product/3', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 3', title: 'Producto 3', label: 'Etiqueta 3', price: 7500 },
            { link: '/Product/4', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 4', title: 'Producto 4', label: 'Etiqueta 4', price: 6500 },
            { link: '/Product/1', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto', title: 'Producto', label: 'Etiqueta', price: 9000 },
            { link: '/Product/2', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 2', title: 'Producto 2', label: 'Etiqueta 2', price: 8500 },
            { link: '/Product/3', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 3', title: 'Producto 3', label: 'Etiqueta 3', price: 7500 },
            { link: '/Product/4', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 4', title: 'Producto 4', label: 'Etiqueta 4', price: 6500 },
            { link: '/Product/1', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto', title: 'Producto', label: 'Etiqueta', price: 9000 },
            { link: '/Product/2', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 2', title: 'Producto 2', label: 'Etiqueta 2', price: 8500 },
            { link: '/Product/3', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 3', title: 'Producto 3', label: 'Etiqueta 3', price: 7500 },
            { link: '/Product/4', img: '/Images/Exportar provisorio.png', imgAlt: 'Producto 4', title: 'Producto 4', label: 'Etiqueta 4', price: 6500 },
        ]
    });
});

module.exports = router;
