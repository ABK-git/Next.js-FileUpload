import axios from "axios";
import React, { useState } from "react";
import Image from 'next/image'

const SignUp = () => {
  let [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);

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

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("/api/upload_user_image", formData, config).then((response) => {
      const path = response.data.file_name.replaceAll("\\","/").slice(6);
      setFilePath(path);
    });
  };

  const handleChange = (event) => {
    let file = event.target.files[0];
    console.log(file);

    setFile(event.target.files[0]);
  };

  return (
    <div>
      <form>
        <input
          accept="image/*"
          type="file"
          name="file"
          onChange={handleChange}
        />
        <button type="button" onClick={handleClick}>
          送信
        </button>
      </form>
      {filePath ? <Image alt="Sample" src={filePath} width={200} height={200}/> : ""}
    </div>
  );
};

export default SignUp;
