import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const [file, setFile] = useState(null);

  //画像のUP構成
  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    },
  };

  const handleClick = async (event) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/upload_user_image", formData, config);
    console.log(response);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form>
      <input accept="image/*" type="file" name="file" onChange={handleChange} />
      <button type="button" onClick={handleClick}>送信</button>
    </form>
  );
};

export default SignUp;
