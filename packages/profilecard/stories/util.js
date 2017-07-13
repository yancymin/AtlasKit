export const random = int => Math.floor(Math.random() * (int + 1));

export const getWeekday = () => {
  const array = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const index = random(6);

  return {
    index,
    string: array[index],
  };
};

export const getTimeString = () => {
  const minFormat = new Intl.NumberFormat('us-EN', { minimumIntegerDigits: 2 });
  const hours = random(23);
  const minutes = random(59);
  const meridiem = ['am', 'pm'][Math.floor(hours / 12)];

  return `${hours === 0 ? 12 : hours % 12}:${minFormat.format(minutes)}${meridiem}`;
};
