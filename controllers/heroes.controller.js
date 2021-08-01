const createError = require('http-errors');
const { Superhero } = require('../models');

module.exports.createHero = async (req, res, next) => {
  try {
    const { body } = req;
    const createdHero = await Superhero.create(body);

    console.log(createdHero);
    res.status(200).send({
      data: createdHero,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllHeroes = async (req, res, next) => {
  try {
    const {
      count: rowsCount,
      rows: heroes,
    } = await Superhero.findAndCountAll();
    if (rowsCount === 0) {
      const err = createError(404, 'No heroes');
      return next(err);
    }
    res.status(200).send({ data: heroes });
  } catch (err) {
    next(err);
  }
};

module.exports.getHeroById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const superhero = await Superhero.findByPk(id);
    if (!superhero) {
      const err = createError(404, 'Hero not found');
      return next(err);
    }
    res.status(200).send(superhero);
  } catch (err) {
    next(err);
  }
};

module.exports.updateHero = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const [rowsCount, updatedHero] = await Superhero.update(body, {
      where: { id },
      returning: true,
    });
    if (rowsCount !== 1) {
      return next(createError(400, "Hero can't be updated"));
    }
    res.send({
      data: updatedHero,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteHeroById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const rowsCount = await Superhero.destroy({
      where: { id },
      returning: true,
    });
    if (rowsCount !== 1) {
      return next(createError(404, 'Hero not found'));
    }
    res.send({
      data: rowsCount,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { id },
    } = req;

    const [rowsCount, [updatedSuperhero]] = await Superhero.update(
      { imagePath: filename },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    if (rowsCount !== 1) {
      return next(createError(404, 'Superhero not found'));
    }
    res.send(updatedSuperhero);
  } catch (err) {
    next(err);
  }
};
