const Subscription = require("../Models/Subscription");
const User = require("../Models/User Model");

// CREATE subscription
async function createSubscription(req, res) {
  const userId = req.user.id; // jay mn uthentication middleware
  const { plan, price } = req.body;

  try {
    const activeSub = await Subscription.findOne({ userId, status: "active" });
    if (activeSub) {
      return res
        .status(400)
        .json({ message: "You already have an active subscription" });
    }

    const startDate = new Date();
    let endDate = new Date(startDate);

    if (plan === "monthly") {
      endDate.setDate(endDate.getDate() + 30);
    } else if (plan === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const newSub = await Subscription.create({
      userId,
      plan,
      price,
      startDate,
      endDate,
      status: "active",
    });

    res.status(201).json({
      message: "Subscription created successfully",
      subscription: newSub,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET all subscriptions for the authenticated user
async function getMySubscriptions(req, res) {
  const userId = req.user.id;
  try {
    const subs = await Subscription.find({ userId });
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE subscription (optional: only user's own subscriptions)
async function updateSubscription(req, res) {
  const userId = req.user.id;
  try {
    const updatedSub = await Subscription.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true },
    );

    if (!updatedSub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res
      .status(200)
      .json({ message: "Subscription updated", subscription: updatedSub });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE subscription (only user's own)
async function deleteSubscription(req, res) {
  const userId = req.user.id;
  try {
    const deletedSub = await Subscription.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!deletedSub) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res
      .status(200)
      .json({ message: "Subscription deleted", subscription: deletedSub });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUsers(req, res) {
  try {
    console.log(req.user);
    const users = await User.find(); // kayjib kul users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createSubscription,
  getMySubscriptions,
  updateSubscription,
  deleteSubscription,
  getUsers,
};
