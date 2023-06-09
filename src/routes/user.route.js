const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
  userValidation: { validateCreateUser, validateGetUser, validateGetUsers, validateUpdateUser },
} = require('../validations');
const {
  userController: { createUser, getUsers, getUser, updateUser, deleteUser },
} = require('../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(validateCreateUser), createUser)
  .get(auth('getUsers'), validate(validateGetUser), getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(validateGetUsers), getUser)
  .patch(auth('manageUsers'), validate(validateUpdateUser), updateUser)
  .delete(auth('manageUsers'), validate(validateGetUsers), deleteUser);

module.exports = router;
