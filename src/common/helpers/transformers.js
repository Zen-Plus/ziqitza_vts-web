export function convertMilliSeconds(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minute = Math.floor(seconds / 60);
  seconds %= 60;
  let hour = Math.floor(minute / 60);
  minute %= 60;
  const day = Math.floor(hour / 24);
  hour %= 24;
  return {
    day,
    hour,
    minute,
    seconds,
  };
}
export default {
  convertMilliSeconds,
};
