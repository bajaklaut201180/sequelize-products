const router = require('express').Router();
const Controller = require('../controllers/index');

router.get('/', Controller.home);
router.get('/login', Controller.login);
router.post('/login', Controller.login);
router.get('/logout', Controller.logout);
router.get('/dashboard', Controller.dashboard);
router.get('/edit/:id', Controller.editProduct);
router.post('/edit/:id', Controller.editProduct);
router.get('/add/', Controller.addProduct);
router.post('/add', Controller.addProduct);
router.get('/delete/:id', Controller.deleteProduct);


module.exports = router