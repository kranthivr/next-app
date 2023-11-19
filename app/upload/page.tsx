"use client";

interface CloudinaryResult {
  public_id: string;
}

import { CldUploadWidget, CldImage } from "next-cloudinary";
import React, { useState } from "react";

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={180}
          alt="A Laptop Image"
        />
      )}
      <CldUploadWidget
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
        uploadPreset="riytaukh"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
          styles: {},
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
