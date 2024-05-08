const express = require('express')
const router = express.Router()
const { getSingleRecruiter, updateRecruiter } = require('../controllers/recruiterController')
const multer = require("multer")
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = `./public/profile_img/`
      fs.mkdirSync(path, { recursive: true })
      return cb(null, path)
      // cb(null, "public/profile_img/");
    },
    filename: function (req, file, cb) {
      req.body.companyLogo =  `/profile_img/` +req?.body?.email + "-" + file.originalname
      cb(null,  req?.body?.email + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });


//  Auth Routes
router.route('/').get(getSingleRecruiter)
router.route('/').put(upload.single("companyLogo"), updateRecruiter)


module.exports = router