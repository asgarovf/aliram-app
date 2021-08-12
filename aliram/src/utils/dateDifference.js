const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

export const dateDifference = (date) => {
  const formatYear = date?.substring(0, 4);
  const formatMonth = months[date?.substring(5, 7)];
  const formatDay = date?.substring(8, 10);

  const dateUnFormatted = new Date(
    `${formatMonth} ${formatDay}, ${formatYear}`
  );

  const rightNow = new Date();

  var msDiff = rightNow.getTime() - dateUnFormatted.getTime();
  var dayDifference = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  if (dayDifference >= 1) {
    return `${dayDifference} gün əvvəl`;
  }

  const hour = rightNow.getHours();
  const minutes = rightNow.getMinutes();
  const seconds = rightNow.getSeconds();

  const nextHour = (parseInt(date?.substring(11, 13), 10) + 4).toString();
  const nextMinute = date?.substring(14, 16);
  const nextSeconds = date?.substring(17, 19);

  if (hour - nextHour >= 1) {
    return `${hour - nextHour} saat əvvəl`;
  } else {
    if (minutes - nextMinute >= 1) {
      return `${minutes - nextMinute} dəqiqə əvvəl`;
    } else {
      return `${seconds + 1 - nextSeconds} saniyə əvvəl`;
    }
  }

  return hour + " " + nextHour;
};
