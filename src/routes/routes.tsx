import React from "react";
import { Switch, Route } from "react-router-dom";
import { LoginPage } from "../components/LoginPage";
import { Header } from "../components/Header";
import { PhotoCollection } from "../components/PhotoCollection";
import { Form } from "../components/Form";

export const useRoutes = (isAuth: boolean) =>
  isAuth ? (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/collection" exact component={PhotoCollection} />
        <Route path="/new" exact component={Form} />
      </Switch>
    </div>
  ) : (
    <Switch>
      <Route path="/" component={LoginPage} />
    </Switch>
  );
