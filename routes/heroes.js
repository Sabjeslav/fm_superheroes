const { Router } = require('express');
const path = require('path');
const { STATIC_PATH } = require('../config/config');
const heroesController = require('../controllers/heroes.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});
const upload = multer({ storage });

const heroesRouter = Router();

heroesRouter.get('/', heroesController.getAllHeroes);
heroesRouter.get('/:id', heroesController.getHeroById);
heroesRouter.patch('/:id', heroesController.updateHero);
heroesRouter.post(
  '/:id/image',
  upload.single('image'),
  heroesController.createImage
);
heroesRouter.delete('/:id', heroesController.deleteHeroById);
heroesRouter.post('/', heroesController.createHero);

module.exports = heroesRouter;
