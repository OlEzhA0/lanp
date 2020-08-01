import React, { useState, useContext, useCallback } from "react";
import "./LoadImg.scss";
import cn from "classnames";
import { postData } from "../../helpers/api";
import { useMutation } from "react-apollo";
import { updatePhotosMutation } from "../../helpers/gqlMutations";
import { AppContext } from "../../context/appContext";
import { getUserQuery } from "../../helpers/gqlQuery";
import { SpinnerLoader } from "../SpinnerLoader";
import { debounce } from "../../helpers/debounce";

interface Props {
  src: string;
  onChange: (file: File) => void;
  errorLoad: boolean;
  validateFile: (file: File) => boolean;
  resetFields: () => void;
  loading: boolean;
  setLoading: (st: boolean) => void;
}

export const LoadImg: React.FC<Props> = ({
  src,
  onChange,
  errorLoad,
  validateFile,
  resetFields,
  loading,
  setLoading,
}) => {
  const [updatePhoto] = useMutation(updatePhotosMutation);

  const { userInfo } = useContext(AppContext);

  const [isDragged, setIsDragged] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const stopEvents = (e: React.DragEvent<HTMLFormElement>, status: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragged(status);
  };

  const dropFile = (e: React.DragEvent<HTMLFormElement>) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files[0] && validateFile(files[0])) {
      setFile(files[0]);
      startDebounce(files[0]);
    }
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && validateFile(files[0])) {
      setFile(files[0]);
      startDebounce(files[0]);
    }
  };

  const addToCollection = async () => {
    if (file) {
      const formData = new FormData();
      formData.set("file", file);

      await postData(formData).then(
        async (res) =>
          await updatePhoto({
            variables: { id: userInfo.id, photos: [...userInfo.photos, res] },
            refetchQueries: [
              {
                query: getUserQuery,
                variables: { id: userInfo.id },
              },
            ],
          }).then(() => {
            setFile(null);
            resetFields();
          })
      );
    }
  };

  const onDebounced = (file: File[]) => {
    if (file) {
      onChange(file[0]);
      setFile(file[0])
    }
  };

  const debounceWrapper = useCallback(
    debounce((photo: File[]) => onDebounced(photo), 2000),
    []
  );

  const startDebounce = (file: File) => {
    debounceWrapper(file);
    setFile(null);
    resetFields();
    setLoading(true);
  };

  const stopDebounce = () => {
    resetFields();
    debounceWrapper(null);
  };

  return (
    <form
      className={cn({
        LoadImg__InfoContainer: true,
        "LoadImg__InfoContainer--active": isDragged,
        "LoadImg__InfoContainer--error": errorLoad,
      })}
      onDragEnter={(e) => stopEvents(e, true)}
      onDragOver={(e) => stopEvents(e, true)}
      onDragLeave={(e) => stopEvents(e, false)}
      onDrop={(e) => {
        stopEvents(e, false);
        dropFile(e);
      }}
    >
      {src && (
        <div className="LoadImg__ImgContainer">
          <img src={src} alt="file" className="LoadImg__InfoImgNew" />
        </div>
      )}
      {!src && (
        <div className="LoadImg__ImgDefault">
          <img src="images/logo.svg" alt="logo" className="LoadImg__InfoImg" />
          {loading && <SpinnerLoader />}
        </div>
      )}
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
          {!loading && src && "Select file to replace"}
          {!loading && !src && "Select file to upload"}
        </span>
      </label>
      <span className="LoadImg__FileInputSpan" onClick={addToCollection}>
        {!loading && src && "Add to your collection"}
      </span>
      {loading && (
        <span className="LoadImg__FileInputSpan" onClick={stopDebounce}>
          cancel
        </span>
      )}
    </form>
  );
};
