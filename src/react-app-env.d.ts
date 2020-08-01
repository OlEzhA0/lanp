/// <reference types="react-scripts" />

interface UserData {
  login: string;
  password: string;
  name: string;
  [key: string]: string
}

interface UserDataErr {
  login: boolean;
  password: boolean;
  name: boolean;
  [key: string]: boolean

}

type Names = "login" | "password" | "name";

interface AuthFields {
  type: string;
  name: Names;
  placeholder: string;
}

interface UserInfo {
  id: string;
  name: string;
  photos: string[];
}