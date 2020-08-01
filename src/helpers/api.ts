const UPLOAD_URL = process.env.REACT_APP_UPLOAD_FILE;
const DELETE_PHOTO = process.env.REACT_APP_DELETE_PHOTOS3;

export async function postData(formData: any) {
  const res = await fetch(`${UPLOAD_URL}`, {
    method: "POST",
    headers: {
      ContentType: "text/html; charset: utf-8",
    },
    body: formData,
  });

  const json = await res.json();
  return json;
}

export const deletePhotoS3 = async (photo: string) => {
  const res = await fetch(`${DELETE_PHOTO}`, {
    method: "POST",
    body: JSON.stringify({ photo }),
  });
  const json = await res.json();

  return json;
};
