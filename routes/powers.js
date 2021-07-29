const { Router } = require('express');
const powersController = require('../controllers/powers.controller');

const powersRouter = Router();

powersRouter.get('/', powersController.getAllPowers);
powersRouter.get('/:id', powersController.getPowerById);
powersRouter.post('/', powersController.createPower);
powersRouter.delete('/:id', powersController.deletePower);
powersRouter.patch('/:id', powersController.updatePower);

module.exports = powersRouter;
