const express = require('express');
const path = require('path'); 
const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Home.html'));
});


app.get('/Product', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Product.html'));
});

app.get('/Cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Cart.html'));
});

app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Login.html'));
});

app.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Register.html'));
});

app.listen(port, () => 
console.log('Servidor corriendo en http://localhost:' + port));