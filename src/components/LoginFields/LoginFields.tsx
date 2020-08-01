import React from "react";
import "./LoginFields.scss";
import { AUTH_FIELDS } from "../../helpers/config";
import cn from "classnames";

interface Props {
  isLogin: boolean;
  newUserDataErr: UserDataErr;
  newUserData: UserData;
  onChange: (name: string, value: string) => void;
}

export const LoginFields: React.FC<Props> = ({
  onChange,
  newUserData,
  isLogin,
  newUserDataErr,
}) => (
  <>
    {AUTH_FIELDS.map(({ name, type, placeholder }) => {
      if (name === "name" && !isLogin) {
        return (
          <input
            key={name}
            type={type}
            className={cn({
              LoginFields__Input: true,
              "LoginFields__Input--err": newUserDataErr[name],
            })}
            placeholder={placeholder}
            name={name}
            value={newUserData[name]}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        );
      } else if (name !== "name") {
        return (
          <input
            key={name}
            type={type}
            className={cn({
              LoginFields__Input: true,
              "LoginFields__Input--err": newUserDataErr[name],
            })}
            placeholder={placeholder}
            name={name}
            value={newUserData[name]}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        );
      }

      return <div key={name} />;
    })}
  </>
);
