const createError = require('http-errors');
const { Image } = require('../models');

module.exports.uploadImage = async (req, res, next) => {
  try {
    const {
      params: { id },
      file: { filename },
    } = req;
    const createdImage = await Image.create(
      { imagePath: filename, heroId: id },
      {
        returning: true,
      }
    );
    if (!createdImage) {
      return next(createError(404, 'Superhero not found'));
    }
    res.send(createdImage);
  } catch (err) {
    next(err);
  }
};

module.exports.getHeroImages = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const { count: rowsCount, rows: images } = await Image.findAndCountAll({
      where: { heroId: id },
    });
    if (rowsCount <= 0) {
      return next(createError(404, 'No images found'));
    }
    res.send({ images });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteHeroImageByImageId = async (req, res, next) => {
  try {
    const {
      params: { imageId },
    } = req;
    const deletedImage = await Image.destroy({
      where: { id: imageId },
    });
    if (!deletedImage) {
      return next(createError(404, 'Image does not exist'));
    }
    res.send({ data: deletedImage });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAllHeroImages = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const deletedImages = await Image.destroy({
      where: { heroId: id },
    });
    if (!deletedImages) {
      return next(createError(404, 'Superhero does not have images'));
    }
    res.send({ data: deletedImages });
  } catch (err) {
    next(err);
  }
};
