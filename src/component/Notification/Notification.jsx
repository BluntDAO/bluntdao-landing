import React, { useEffect, useRef, useContext, useState } from "react";
import { setNotification } from "../../gen-state/gen.actions";
import { GenContext } from "../../gen-state/gen.context";
import styles from "./Notification.module.css";
import warningIcon from "../../assets/imgs/icon-warning.svg";
import successIcon from "../../assets/imgs/icon-success.svg";
import errorIcon from "../../assets/imgs/icon-error.svg";
import blankIcon from "../../assets/imgs/blank.png";
import { ReactComponent as CloseIcon } from "../../assets/imgs/icon-close.svg";

const Notification = () => {
  const feedbackRef = useRef(null);
  const { notification, loaderMessage, dispatch } = useContext(GenContext);
  const [state, setState] = useState({
    toggleFeedback: false,
    timerId: null,
  });
  const { toggleFeedback, timerId } = state;
  const handleSetState = (payload) => {
    setState((states) => ({ ...states, ...payload }));
  };

  const notificationIcon = {
    warning: warningIcon,
    error: errorIcon,
    success: successIcon,
    default: blankIcon,
  };

  const handleStop = () => {
    handleSetState({ toggleFeedback: false });
    clearTimeout(timerId);
  };

  useEffect(() => {
    if (!notification.message) return;
    handleSetState({ toggleFeedback: true });
    let timerId = setTimeout(() => {
      handleSetState({ toggleFeedback: false });
    }, 5000);
    handleSetState({ timerId });
  }, [notification]);

  useEffect(() => {
    feedbackRef.current.onanimationend = (e) => {
      if (e.animationName.includes("slide-out")) {
        dispatch(
          setNotification({
            message: "",
            type: "success",
          })
        );
      }
    };
  }, []);

  return (
    <div
      style={{ top: loaderMessage ? "9em" : "5em" }}
      className={`${styles.container} ${toggleFeedback && styles.active}`}
    >
      <div
        ref={feedbackRef}
        className={`${styles.notification} ${styles[notification.type]}`}
      >
        <div className={styles.message}>
          {notification.message.charAt(0).toUpperCase() +
            notification.message.substring(1)}
        </div>
        <CloseIcon onClick={handleStop} className={styles.closeIcon} />
      </div>
    </div>
  );
};

export default Notification;
