"use strict";

const buttonPhoto = document.getElementById("upload_widget");
const userPhoto = document.querySelector("#user-photo");
const photoUrl = document.querySelector("#photoUrl");

var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "cloud-name",
    uploadPreset: "preset_name",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      userPhoto.src = result.info.secure_url;
      photoUrl.value = result.info.secure_url;
    }
  }
);

buttonPhoto.addEventListener("click", () => {
    myWidget.open();
  }, false);
