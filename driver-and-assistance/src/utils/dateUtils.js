export const formatTime = (timeString) => {
  return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export const isCurrentDay = (dateString) => {
  const today = new Date();
  const checkDate = new Date(dateString);
  return (
    today.getFullYear() === checkDate.getFullYear() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getDate() === checkDate.getDate()
  );
};
