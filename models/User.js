const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  lastname: { type: String },
  photoUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/edgarcg/image/upload/v1597900707/socialApp/user_jb7rdt.png",
  },
  friendsId: [Schema.Types.ObjectId],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
