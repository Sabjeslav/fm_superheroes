const { Router } = require('express');
const path = require('path');
const { STATIC_PATH } = require('../config/config');
const heroesController = require('../controllers/heroes.controller');
const imageController = require('../controllers/images.controller');
const multer = require('multer');
const paginate = require('../middlewares/paginate.mw');
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

heroesRouter.post('/', heroesController.createHero);
heroesRouter.get('/', paginate, heroesController.getAllHeroes);
heroesRouter.get('/:id', heroesController.getHeroById);
heroesRouter.patch('/:id', heroesController.updateHero);
heroesRouter.delete('/:id', heroesController.deleteHeroById);

heroesRouter.get('/:id/powers', heroesController.getHeroPowers);
heroesRouter.post('/:id/powers', heroesController.addPowerToHero);

heroesRouter.post(
  '/:id/image',
  upload.single('image'),
  imageController.uploadImage
);
heroesRouter.get('/:id/image', imageController.getHeroImages);
heroesRouter.delete(
  '/:id/image/:imageId',
  imageController.deleteHeroImageByImageId
);
heroesRouter.delete('/:id/image/', imageController.deleteAllHeroImages);

module.exports = heroesRouter;
