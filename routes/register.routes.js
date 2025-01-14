const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('User/register', { 
        title: 'Register' 
    });
});

module.exports = router;
