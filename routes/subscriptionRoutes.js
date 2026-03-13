const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication.middleware");
const subscriptionController = require("../controllers/subsciption");

// CREATE a new subscription (user must be authenticated)
router.post(
  "/",
  authentication,
  subscriptionController.createSubscription
);

// GET all subscriptions of the authenticated user
router.get(
  "/my",
  authentication,
  subscriptionController.getMySubscriptions
);

// UPDATE a subscription (only user's own)
router.put(
  "/:id",
  authentication,
  subscriptionController.updateSubscription
);

// DELETE a subscription (only user's own)
router.delete(
  "/:id",
  authentication,
  subscriptionController.deleteSubscription
);

module.exports = router;
