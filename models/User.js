const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  info: { type: String, default: "Sobre mí..." },
  myPhotosUrl: {
    type: [String],
    default: 'https://res.cloudinary.com/edcrgs/image/upload/v1598508255/socialApp/pexels-eberhard-grossgasteiger-1004665_vbhkhg.jpg',
  },
  photoUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/edgarcg/image/upload/v1597900707/socialApp/user_jb7rdt.png",
  },
  friendsId: [Schema.Types.ObjectId],
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = model("User", userSchema);
