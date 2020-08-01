import React, { useState } from "react";
import "./Form.scss";
import { LoadImg } from "../LoadImg";

const allowedTypes = ["png", "jpeg"];

export const Form = () => {
  const [fileSrc, setFileSrc] = useState("");
  const [errorLoad, setErrorLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetFields = () => {
    setFileSrc("");
    setErrorLoad(false);
  };

  const validateFile = (file: File) => {
    if (file && file.type.startsWith("image")) {
      const type = file.type.split("/")[1];

      if (allowedTypes.some((allowed) => allowed === type)) {
        return true;
      }
    }

    setErrorLoad(true);
    setTimeout(() => setErrorLoad(false), 600);
    setFileSrc("");
    return false;
  };

  const handleReadFile = (file: File) => {
    if (!file) {
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const readerRes = reader.result;
        setLoading(false);
        setFileSrc(readerRes);
      }
    };
  };

  return (
    <div className="Form">
      <div className="Form__TitleWrap">
        <h1 className="Form__Title">Company Logo</h1>
        <p className="Form__Descr">
          Logo should be square, 100px size and in png, jpeg file format.
        </p>
      </div>

      <div className="Form__ImgForm">
        <LoadImg
          src={fileSrc}
          onChange={handleReadFile}
          errorLoad={errorLoad}
          validateFile={validateFile}
          resetFields={resetFields}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};
