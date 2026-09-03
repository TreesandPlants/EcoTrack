const express=require("express");

const router=express.Router();

const auth=require("../middleware/authMiddleware");

const {

getUserAchievements

}=require("../controllers/achievementController");

router.get("/",auth,getUserAchievements);

module.exports=router;