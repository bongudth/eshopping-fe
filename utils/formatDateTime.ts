const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.getDate()} ${date.toLocaleString('en', {
    month: 'short',
  })}, ${date.getHours()}:${date.getMinutes()}`;
};

export default formatDateTime;
