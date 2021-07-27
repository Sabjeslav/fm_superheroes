const { Router } = require('express');
const heroesController = require('../controllers/heroes.controller');

const heroesRouter = Router();

heroesRouter.get('/', heroesController.getAllHeroes);
heroesRouter.get('/:id', heroesController.getHeroById);
heroesRouter.patch('/:id', heroesController.updateHero);
heroesRouter.delete('/:id', heroesController.deleteHeroById);
heroesRouter.post('/', heroesController.createHero);

module.exports = heroesRouter;