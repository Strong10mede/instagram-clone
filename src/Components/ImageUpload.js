import { Button } from "@mui/material";
import React, { useState } from "react";
import { storage, db } from "../firebase";
import firebase from "firebase";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    //uploading image
    //accessing storage functionality from firebase then creating a folder called images which will contain image with image.name and storing image into it by the help of put
    //uploadTask contains the reference to image file
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    console.log(uploadTask);

    uploadTask.on(
      //state changed means here the new file's percentage uploading
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error function...
        alert(error.message);
      },
      () => {
        //complete function...
        //getting the uploaded image url and sending it to the firebase database
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image into the database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setImage(null);
            setCaption("");
          });
      }
    );
  };
  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a Caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
