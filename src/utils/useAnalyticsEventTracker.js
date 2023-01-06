import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category) => {
  const eventTracker = (action = "action", label = "label") => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
