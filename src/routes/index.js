const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const uploadRoute = require('./upload.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
