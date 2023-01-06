import React, { useRef, useState } from "react";
import style from "./signIn.module.css";
import { ReactComponent as IconLock } from "../../assets/imgs/icon-lock.svg";
import { SHA256 } from "crypto-js";

const SignIn = (props) => {
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const { setToggle } = props;
  console.log(password);
  const componentRef = useRef();

  const hashed =
    "6ac0acd7387bf88cd0b70021a796c09af17a460b92f6b9ce436bd7573e3993d7";

  const submitPassword = () => {
    const ciphertext = SHA256(password).toString();

    if (ciphertext === hashed) {
      setToggle(false);
    } else {
      setWrongPass(true);
    }
  };
  return (
    <div className={`${style.selectContainer} ${style.active}`}>
      <div className={`${style.container}`}>
        <div className={style.card} ref={componentRef}>
          <div className={style.Icon}>
            <IconLock />
          </div>
          <div className={style.title}>This link is password protected</div>
          <div className={style.text}>
            Please enter the password to view this link
          </div>
          <div className={style.inputWrapper}>
            {wrongPass && <p>Password Incorrect</p>}
            <input
              type="password"
              className={style.passInput}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.line}></div>
          <div onClick={submitPassword} className={style.btn}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
