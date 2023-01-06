import classes from "./calendar.module.css";

const Calendar = () => {
  return (
    <div className={classes.container}>
      <iframe
        src="https://calendar.google.com/calendar/u/0/embed?src=qn47430n82i0qfhpmnq3ljjc3k@group.calendar.google.com&ctz=America/New_York&pli=1"
        scrolling="yes"
      ></iframe>
    </div>
  );
};

export default Calendar;
