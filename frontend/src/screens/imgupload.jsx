import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/auth";

const UploadProfileImagePage = () => {
  const [image, setImage] = useState(null);
  const { getToken, logout, SetImg } = useAuth(); //also set image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const logut = () => {
    logout();
  }

  const handleUpload = async () => {
    if (!image) return;

    try {
        const config = {
            headers: {
              "Content-type": "application/json"
            }
          };

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {

                const base64Image = reader.result.split(",")[1];

                const token = getToken();
                console.log(token);
                
                const response = await axios.post(
                    "http://127.0.0.1:5000/api/users/imgUpload", 
                    {
                    token: token,
                    Img: base64Image,
                    },
                    config
                );

                SetImg(base64Image)
            };
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div>
      <h1>Upload Profile Image</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
        <br />
      <button onClick={logut}>logout</button>
    </div>
  );
};

export default UploadProfileImagePage;
