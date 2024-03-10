document.addEventListener('DOMContentLoaded', function() {
    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const stopAlarmButton = document.getElementById('stop-alarm');
    let alarmTimeout;
  
    setAlarmButton.addEventListener('click', function() {
      const alarmTime = alarmTimeInput.value;
      if (!alarmTime) {
        alert('Please select a valid alarm time.');
        return;
      }
  
      const now = new Date();
      const hours = parseInt(alarmTime.split(':')[0]);
      const minutes = parseInt(alarmTime.split(':')[1]);
  
      const alarmDateTime = new Date();
      alarmDateTime.setHours(hours);
      alarmDateTime.setMinutes(minutes);
      alarmDateTime.setSeconds(0);
  
      const timeUntilAlarm = alarmDateTime.getTime() - now.getTime();
  
      if (timeUntilAlarm <= 0) {
        alert('Please select a future time for the alarm.');
        return;
      }
  
      alarmTimeout = setTimeout(function() {
        alert('Alarm!');
        stopAlarmButton.classList.add('d-none');
        setAlarmButton.classList.remove('d-none');
      }, timeUntilAlarm);
  
      setAlarmButton.classList.add('d-none');
      stopAlarmButton.classList.remove('d-none');
    });
  
    stopAlarmButton.addEventListener('click', function() {
      clearTimeout(alarmTimeout);
      stopAlarmButton.classList.add('d-none');
      setAlarmButton.classList.remove('d-none');
    });
  });