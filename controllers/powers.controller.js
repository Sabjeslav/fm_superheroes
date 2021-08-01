const createError = require('http-errors');
const { superpowers } = require('../models');

module.exports.getAllPowers = async (req, res, next) => {
  try {
    const {
      count: powersAmount,
      rows: powers,
    } = await superpowers.findAndCountAll();
    if (powersAmount === 0) {
      const err = createError(404, 'No powers found');
      return next(err);
    }
    res.send({
      data: { powers },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createPower = async (req, res, next) => {
  try {
    const { body } = req;
    const createdPower = await superpowers.create(body);
    res.status(201).send({ data: createdPower });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePower = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const deletedTask = await superpowers.destroy({
      where: {
        id,
      },
      limit: 1,
    });
    if (!deletedTask) {
      const err = createError(404, 'Task not found!');
      return next(err);
    }
    res.send({ data: deletedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePower = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const [rowsCount, updatedPower] = await superpowers.update(body, {
      where: { id },
      returning: true,
    });
    if (rowsCount !== 1) {
      const err = createError(404, "Can't update power!");
      return next(err);
    }
    res.status(200).send({
      data: updatedPower,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPowerById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const power = await superpowers.findByPk(id);
    if (!power) {
      const err = createError(404, 'Power not found');
      return next(err);
    }
    res.status(200).send({
      data: power,
    });
  } catch (err) {
    next(err);
  }
};

