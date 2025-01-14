const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    try {
        const productId = req.params.id;

        if (isNaN(productId)) {
            return res.status(400).send('ID de producto no válido.');
        }

        const productData = {
            id: productId,
            title: `Producto ${productId}`,
            img: '/Images/Exportar provisorio.png',
            imgAlt: `Imagen del Producto ${productId}`,
            label: `Etiqueta ${productId}`,
            price: 9000 + parseInt(productId) * 500,
            description: `Descripción del producto ${productId}. Este producto es único y tiene características sobresalientes.`,
        };

        if (!productData) {
            return res.status(404).send('Producto no encontrado.');
        }

        const user = {
            profileLink: '#',
            img: '/Images/Usuario.png',
            imgAlt: 'Imagen del usuario',
            name: 'Nombre',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        };

        const products = [
            [
                { link: 'tu-enlace.html', img: '/Images/Exportar provisorio.png', imgAlt: '...', title: 'Producto', label: 'Etiqueta', price: '9000' },
                { link: 'tu-enlace.html', img: '/Images/Exportar provisorio.png', imgAlt: '...', title: 'Producto', label: 'Etiqueta', price: '9000' },
                { link: 'tu-enlace.html', img: '/Images/Exportar provisorio.png', imgAlt: '...', title: 'Producto', label: 'Etiqueta', price: '9000' },
                { link: 'tu-enlace.html', img: '/Images/Exportar provisorio.png', imgAlt: '...', title: 'Producto', label: 'Etiqueta', price: '9000' }
            ],
            [
                { link: 'tu-enlace.html', img: '/Images/Exportar provisorio.png', imgAlt: '...', title: 'Producto', label: 'Etiqueta', price: '9000' },
                { link: 'tu-enlace.html', img: '/Images/Exportar provisorio.png', imgAlt: '...', title: 'Producto', label: 'Etiqueta', price: '9000' },
                { link: 'tu-enlace.html', img: '/Images/Exportar provisorio.png', imgAlt: '...', title: 'Producto', label: 'Etiqueta', price: '9000' },
                { link: 'tu-enlace.html', img: '/Images/Exportar provisorio.png', imgAlt: '...', title: 'Producto', label: 'Etiqueta', price: '9000' }
            ]
        ];

        res.render('Products/product', {  
            title: `Detalles del Producto ${productId}`,
            product: productData,
            user: user,
            products: products
        });
    } catch (error) {
        console.error('Error en la ruta /Product/:id:', error);
        res.status(500).send('Hubo un error en el servidor');
    }
});

module.exports = router;
