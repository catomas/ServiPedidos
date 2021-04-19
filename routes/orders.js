
const { Router } = require('express');
const orders = require('../controllers/orders');

const router = Router();

router.get('/',  orders.list);

router.put('/:id',  orders.update);

router.post('/',  orders.create);

router.delete('/:id', orders.remove);


module.exports = router;

