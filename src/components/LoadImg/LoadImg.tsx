import React, { useState } from "react";
import "./LoadImg.scss";
import cn from "classnames";

interface Props {
  src: string;
  onChange: (file: File) => void;
  errorLoad: boolean;
  validateFile: (file: File) => boolean;
}

export const LoadImg: React.FC<Props> = ({
  src,
  onChange,
  errorLoad,
  validateFile,
}) => {
  const [isDragged, setIsDragged] = useState(false);

  const stopEvents = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dropFile = (e: React.DragEvent<HTMLFormElement>) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files[0] && validateFile(files[0])) {
      onChange(files[0]);
    }
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && validateFile(files[0])) {
      onChange(files[0]);
    }
  };

  return (
    <form
      className={cn({
        Form__InfoContainer: true,
        "Form__InfoContainer--active": isDragged,
        "Form__InfoContainer--error": errorLoad,
      })}
      onDragEnter={(e) => {
        stopEvents(e);
        setIsDragged(true);
      }}
      onDragOver={(e) => {
        stopEvents(e);
        setIsDragged(true);
      }}
      onDragLeave={(e) => {
        stopEvents(e);
        setIsDragged(false);
      }}
      onDrop={(e) => {
        stopEvents(e);
        setIsDragged(false);
        dropFile(e);
      }}
    >
      {src && (
        <div className="Form__ImgContainer">
          <img src={src} alt="file" className="Form__InfoImgNew" />
        </div>
      )}
      {!src && (
        <img src="images/logo.svg" alt="logo" className="Form__InfoImg" />
      )}
      <p className="Form__Choose">
        {src ? `Drag & drop here to replace` : `Drag & drop here`}
      </p>
      <p className="Form__Or">- or -</p>

      <label>
        <input type="file" className="Form__FileInput" onChange={uploadFile} />
        <span className="Form__FileInputSpan">
          {src && "Select file to replace"}
          {!src && "Select file to upload"}
        </span>
      </label>
    </form>
  );
};
