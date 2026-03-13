const express = require("express");
const router = express.Router();

const subscriptionController = require("../controllers/subsciption");
const authentication = require("../middlewares/authentication.middleware");
const role = require("../middlewares/authorizationLogin");

// CREATE a new subscription (user must be authenticated)
router.post("/post", subscriptionController.createSubscription);

// GET all subscriptions of the authenticated user
router.get("/my", subscriptionController.getMySubscriptions);

// UPDATE a subscription (only user's own)
router.put("/:id", subscriptionController.updateSubscription);

// DELETE a subscription (only user's own)
router.delete("/:id", subscriptionController.deleteSubscription);

router.get("/getusers", role("admin"), subscriptionController.getUsers);

module.exports = router;
