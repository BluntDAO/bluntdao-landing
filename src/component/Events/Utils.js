const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function getHours(d) {
  var hours =
    d.getHours() == 0
      ? "12"
      : d.getHours() > 12
      ? d.getHours() - 12
      : d.getHours();
  var minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  var ampm = d.getHours() < 12 ? " AM" : " PM";
  var formattedTime = hours + ":" + minutes + " " + ampm;
  return formattedTime;
}
export const getFormattedDate = (date, address = true) => {
  const d = new Date(date);
  const dayName = days[d.getDay()];
  const dayMonth = d.getDate();
  let monthName = month[d.getMonth()];
  let yaer = d.getFullYear();
  return address
    ? `${dayName}, ${monthName} ${dayMonth}, ${yaer}, ${getHours(d)} UTC`
    : `${dayName}, ${monthName} ${dayMonth}, ${yaer} | ${getHours(d)} UTC`;
};
export const getFormattedDateTweets = (date, address = true) => {
  const d = new Date(date);
  const dayName = days[d.getDay()];
  const dayMonth = d.getDate();
  let monthName = month[d.getMonth()];
  let yaer = d.getFullYear();
  return `${getHours(d)}, ${monthName} ${dayMonth}, ${yaer}`;
};
export const getFormattedDateMeduimBlog = (date, address = true) => {
  const d = new Date(date);
  const dayName = days[d.getDay()];
  const dayMonth = d.getDate();
  let monthName = month[d.getMonth()];
  let yaer = d.getFullYear();
  return `${monthName} ${dayMonth},${yaer} ${getHours(d)}`;
};
