const calculateExpectedTimes = (startTime, endTime, orderCount) => {
    // Convert input times to today's date in local timezone
    const today = new Date().toLocaleDateString('en-US');
    const start = new Date(`${today} ${startTime}`);
    const end = new Date(`${today} ${endTime}`);
    
    const totalMinutes = (end - start) / (1000 * 60);
    const intervalMinutes = Math.floor(totalMinutes / (orderCount + 1));
    
    return function(orderIndex) {
        const expectedTime = new Date(start.getTime() + (intervalMinutes * (orderIndex + 1)) * 60000);
        return expectedTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
  };
  

  
  module.exports = {
    calculateExpectedTimes
    
  };