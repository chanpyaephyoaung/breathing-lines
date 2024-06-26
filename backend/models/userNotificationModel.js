import mongoose from "mongoose";

const userNotificationSchema = new mongoose.Schema({
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   payload: {
      type: Object,
   },
   notificationMessage: {
      type: String,
      required: true,
   },
   notificationType: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: new Date(),
   },
});

const UserNotification = mongoose.model("UserNotification", userNotificationSchema);

export default UserNotification;
