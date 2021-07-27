const { Router } = require('express');
const heroesRouter = require('./heroes');
const powersRouter = require('./powers');

const router = Router();

router.use('/heroes', heroesRouter);
// router.use('/powers', powersRouter);

module.exports = router;
