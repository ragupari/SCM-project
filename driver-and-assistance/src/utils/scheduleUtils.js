export const timeStringToDate = (timeStr) => {
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
    return new Date(`${today}T${timeStr}`);
  };
  
  export const getScheduleStatus = (startTime, endTime) => {
    const now = new Date();
    const startDate = timeStringToDate(startTime);
    const endDate = timeStringToDate(endTime);
  
    if (now >= startDate && now <= endDate) {
      return 'Active';
    } else if (now < startDate) {
      return 'Upcoming';
    } else {
      return 'Completed';
    }
  };