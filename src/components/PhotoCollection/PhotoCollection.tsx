import React, { useContext } from "react";
import "./PhotoCollection.scss";
import { AppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import { deletePhotoS3 } from "../../helpers/api";
import { useMutation } from "react-apollo";
import { updatePhotosMutation } from "../../helpers/gqlMutations";
import { getUserQuery } from "../../helpers/gqlQuery";

export const PhotoCollection = () => {
  const { userInfo } = useContext(AppContext);
  const [updatePhotos] = useMutation(updatePhotosMutation);

  const deletePhotos = async (photo: string) => {
    await updatePhotos({
      variables: {
        id: userInfo.id,
        photos: userInfo.photos.filter((ph) => ph !== photo),
      },
      refetchQueries: [{ query: getUserQuery }],
    }).then(() => {
      deletePhotoS3(photo);
    });
  };

  return (
    <div className="PhotoCollection">
      {userInfo.photos.length > 0 ? (
        <ul className="PhotoCollection__List">
          {userInfo.photos.map((photo) => (
            <li className="PhotoCollection__Item" key={photo}>
              <img
                src={photo}
                alt="loaded img"
                className="PhotoCollection__Img"
              />
              <label
                className="PhotoCollection__DeleteLabel"
                onClick={() => deletePhotos(photo)}
              >
                <img
                  src="images/trash.svg"
                  alt="trash"
                  className="PhotoCollection__Delete"
                />
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="PhotoCollection__NotPhotos">
          Not yet photos <br />
          Please, load your photos <Link to="/new">here</Link>
        </p>
      )}
    </div>
  );
};
