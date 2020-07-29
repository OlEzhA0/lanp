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
        LoadImg__InfoContainer: true,
        "LoadImg__InfoContainer--active": isDragged,
        "LoadImg__InfoContainer--error": errorLoad,
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
        <div className="LoadImg__ImgContainer">
          <img src={src} alt="file" className="LoadImg__InfoImgNew" />
        </div>
      )}
      {!src && <img src="images/logo.svg" alt="logo" className="LoadImg__InfoImg" />}
      <p className="LoadImg__Choose">
        {src ? `Drag & drop here to replace` : `Drag & drop here`}
      </p>
      <p className="LoadImg__Or">- or -</p>

      <label>
        <input
          type="file"
          className="LoadImg__FileInput"
          onChange={uploadFile}
        />
        <span className="LoadImg__FileInputSpan">
          {src && "Select file to replace"}
          {!src && "Select file to upload"}
        </span>
      </label>
    </form>
  );
};
