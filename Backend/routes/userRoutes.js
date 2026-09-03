const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../config/multer");

const {

getEcoRank

}=require("../controllers/userController");

const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/userController");

const requireSameUser = (req, res, next) => {
    const requestedId = Number(req.params.id);
    const loggedInUserId = Number(req.user.id);

    if (requestedId !== loggedInUserId) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    next();
};

router.get("/:id", authMiddleware, requireSameUser, getProfile);

router.get(

"/ecorank/:id",

authMiddleware,

getEcoRank

);

router.put("/:id", updateProfile);

router.post(
  "/upload/:id",
  authMiddleware,
  requireSameUser,
  upload.single("profile"),
  uploadProfileImage
);

module.exports = router;