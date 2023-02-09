var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/cart', mainController.cart);
router.get('/products', mainController.products);
router.get('/register', mainController.register);
router.get('/login', mainController.login);


module.exports = router;