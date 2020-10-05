import { gql } from "apollo-boost";

export const addUserMutation = gql`
  mutation addUserMutation(
    $name: String!
    $login: String!
    $password: String!
    $photos: [String]!
  ) {
    addUser(name: $name, login: $login, password: $password, photos: $photos) {
      id
      name
      photos
    }
  }
`;

export const updatePhotosMutation = gql`
  mutation addUserMutation($id: ID, $photos: [String]!) {
    updatePhotos(id: $id, photos: $photos) {
      id
      name
      photos
    }
  }
`;

