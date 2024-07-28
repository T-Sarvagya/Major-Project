const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

//  /listings = /
router.route("/")
    .get(validateListing, wrapAsync(listingController.index))
    .post(isLoggedIn ,upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));
    


//New Route
router.get("/new", isLoggedIn , validateListing, listingController.renderNewForm);

router.route("/:id")
.get(validateListing, wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner ,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner ,validateListing, wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner ,validateListing,  wrapAsync(listingController.renderEditForm));

module.exports = router;