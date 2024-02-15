"use client";
import Image from "next/image";
import React, { useState } from "react";
import cn from "classnames";

export const PictureInput = ({...props}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      props.uploadImageFile(file)
    } else {
      setSelectedImage(null);
    }
  };



  
  

  return (
    <div className="flex flex-col ">
      <div className="flex items-center">
        {selectedImage && (
          <div className={cn(selectedImage ? "inline-flex":"hidden","relative w-10 h-10 mr-2 rounded-md border border-gray-300 ")}>
            <Image
              fill
              src={selectedImage}
              alt="Service photo"
              className="p-0.5 object-cover rounded-md "
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          id="fileInput"
        />

        <label
          htmlFor="fileInput"
          className="border text-xs border-gray-400  text-gray-700 focus:ring-0 focus:ring-gray-700  rounded-full p-2 cursor-pointer"
        >
          {selectedImage ? "Change Picture" : "Choose picture"}
        </label>
      </div>
      <span className="text-xs mt-2 text-gray-400">
        PNG, JPG or GIF upto 10MB
      </span>
    </div>
  );
};
