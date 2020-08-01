import React, { useState, useContext } from "react";
import "./LoginPage.scss";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import { ButtonsRegister } from "../ButtonsRegister";
import { hash } from "bcryptjs";
import { useMutation } from "react-apollo";
import { addUserMutation } from "../../helpers/gqlMutations";
import { LoginFields } from "../LoginFields";
import { useHistory } from "react-router-dom";

const defaultUserSettings: UserData = {
  login: "",
  password: "",
  name: "",
};

const defaultUserSettingsErrors: UserDataErr = {
  login: false,
  password: false,
  name: false,
};

export const LoginPage = () => {
  const history = useHistory();

  const [addNewUser] = useMutation(addUserMutation);

  const { login } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [newUserData, setNewUserData] = useState<UserData>(defaultUserSettings);
  const [newUserDataErr, setNewUserDataErr] = useState<UserDataErr>(
    defaultUserSettingsErrors
  );
  const [loadingRequest, setLoadingReques] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [logErr, setLogErr] = useState("");

  const onChange = (name: string, value: string) => {
    setNewUserData({ ...newUserData, [name]: value });
    setNewUserDataErr(defaultUserSettingsErrors);
    setLogErr("");
  };

  const validation = (name: string, value: string) => {
    if (!value! || value.trim().length < 3) {
      setNewUserDataErr({ ...newUserDataErr, [name]: true });

      return true;
    }

    return false;
  };

  const makeErrorsObj = (fields: string[]) =>
    fields.reduce((accum: any, value: string) => {
      accum[value] = validation(value, newUserData[value]);
      return accum;
    }, {});

  const addUser = async () => {
    const errors = makeErrorsObj(Object.keys(defaultUserSettingsErrors));

    setNewUserDataErr(errors);

    if (Object.keys(errors).every((err) => !errors[err])) {
      setLoadingReques(true);
      const hashedPass = await hash(newUserData.password, 12);
      const variables = {
        name: newUserData.name,
        login: newUserData.login,
        photos: [],
        password: hashedPass,
      };

      await addNewUser({ variables })
        .then(() => {
          setNewUserData(defaultUserSettings);
          setIsLogin(true);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoadingReques(false));
    }
  };

  const loginToSys = async () => {
    const errors = makeErrorsObj(["login", "password"]);
    setNewUserDataErr(errors);

    if (Object.keys(errors).every((err) => !errors[err])) {
      setLoadingReques(true);

      try {
        await request("/auth/login", "POST", {
          login: newUserData.login,
          password: newUserData.password,
        }).then((res) => {
          if (res === "Неверный логин или пароль") {
            setLogErr(res);
            setNewUserDataErr({
              ...newUserDataErr,
              login: true,
              password: true,
            });
            throw new Error(res);
          } else {
            login(res.token, res.userId);
            history.push({
              pathname: "/collection",
            });
          }
        });
      } catch (e) {
      } finally {
        setLoadingReques(false);
      }
    }
  };

  return (
    <div className="LoginPage">
      <h1 className="LoginPage__Title">
        {isLogin ? "Авторизируйтесь" : "Зарегестрируйтесь"}
      </h1>
      <form className="LoginPage__Form" onSubmit={(e) => e.preventDefault()}>
        <LoginFields
          isLogin={isLogin}
          newUserData={newUserData}
          newUserDataErr={newUserDataErr}
          onChange={onChange}
        />
        {isLogin && (
          <ButtonsRegister
            setIsLogin={setIsLogin}
            status={false}
            submitName="Вход"
            additional="Зарегистрировать"
            hint="Нету аккаунта?"
            onSubmit={loginToSys}
            disabled={
              loading ||
              loadingRequest ||
              Object.keys(newUserDataErr).some((err) => !!newUserDataErr[err])
            }
          />
        )}
        {!isLogin && (
          <ButtonsRegister
            setIsLogin={setIsLogin}
            status={true}
            submitName="Регистрация"
            additional="Обратно ко входу"
            hint="Уже есть аккаунт?"
            onSubmit={addUser}
            disabled={
              loading ||
              loadingRequest ||
              Object.keys(newUserDataErr).some((err) => !!newUserDataErr[err])
            }
          />
        )}
        {logErr && <p className="LoginPage__ErrMessage">{logErr}</p>}
      </form>
    </div>
  );
};
