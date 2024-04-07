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
   notificationMessage: {
      type: String,
      required: true,
   },
   notificationType: {
      type: String,
      required: true,
   },
});

const UserNotification = mongoose.model("UserNotification", userNotificationSchema);

export default UserNotification;
