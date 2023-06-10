const express = require('express');

const { uploadFileMiddleware, uploadBulkMiddleware } = require('../middlewares/uploadFile');

const {
  uploadController: { upload, bulkUpload, getImage },
} = require('../controllers');

const router = express.Router();

router.route('/').post(uploadFileMiddleware, upload);
router.route('/bulk-upload').post(uploadBulkMiddleware, bulkUpload);
router.route('/uploads/:filename').get(getImage);


module.exports = router;
