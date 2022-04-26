
const { Router, response } = require('express');
const order = require('../controllers/OrderController');

const router = Router();

//router.get('/', order.home)
//router.get('/order/create',  order.create);
router.get('/order/list',  order.list);
router.post('/order/save',  order.save);
router.get('/order/show/:id',  order.show);
router.put('/order/update/:id',  order.update);
//router.get('/order/edit/:id', order.edit);
router.delete('/order/delete/:id', order.remove);
router.get('/order/convert/', order.convert);


module.exports = router;

