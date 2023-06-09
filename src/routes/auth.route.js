const express = require('express');
const validate = require('../middlewares/validate');
const {
  authValidation: { validateRegister, validateLogin, validateRefreshTokens },
} = require('../validations');
const {
  authController: { register, login, logout, refreshTokens },
} = require('../controllers');

const router = express.Router();

router.post('/register', validate(validateRegister), register);
router.post('/login', validate(validateLogin), login);
router.post('/logout', validate(validateRefreshTokens), logout);
router.post('/refresh-tokens', validate(validateRefreshTokens), refreshTokens);

module.exports = router;
