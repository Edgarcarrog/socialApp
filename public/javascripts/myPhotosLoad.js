"use strict";

const buttonPhoto = document.getElementById("upload_widget");
const userPhoto = document.querySelector("#user-photo");
const myphotoUrl = document.querySelector("#myphotoUrl");

var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "edcrgs",
    uploadPreset: "preset_edgc",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      userPhoto.src = result.info.secure_url;
      myphotoUrl.value = result.info.secure_url;
      console.log(myphotoUrl.value);
    }
  }
);

buttonPhoto.addEventListener("click", () => {
    myWidget.open();
  }, false);
