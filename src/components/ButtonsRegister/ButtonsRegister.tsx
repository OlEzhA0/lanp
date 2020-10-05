import React from "react";
import "./ButtonsRegister.scss";

interface Props {
  setIsLogin: (status: boolean) => void;
  status: boolean;
  submitName: string;
  hint: string;
  additional: string;
  onSubmit: () => void;
  disabled: boolean;
}

export const ButtonsRegister: React.FC<Props> = ({
  setIsLogin,
  status,
  submitName,
  additional,
  hint,
  onSubmit,
  disabled,
}) => (
  <>
    <button
      className="ButtonsRegister__Btn"
      type="submit"
      onClick={onSubmit}
      disabled={disabled}
    >
      {submitName}
    </button>
    <p>{hint}</p>
    <button
      className="ButtonsRegister__Btn"
      type="submit"
      onClick={() => setIsLogin(status)}
    >
      {additional}
    </button>
  </>
);
