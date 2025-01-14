const express = require('express');
const path = require('path'); 
const app = express();
const port = 4000;

const homeRoutes = require('./routes/index.routes');
const productRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');
const loginRoutes = require('./routes/login.routes');
const registerRoutes = require('./routes/register.routes');
const loadRoutes = require('./routes/load.routes');
const editRoutes = require('./routes/edit.routes'); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/load', loadRoutes);
app.use('/edit', editRoutes); 

app.listen(port, () => 
    console.log(`Servidor corriendo en http://localhost:${port}`));
