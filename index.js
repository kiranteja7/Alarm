document.addEventListener('DOMContentLoaded', function() {
  const alarmTimeInput = document.getElementById('alarm-time');
  const setAlarmButton = document.getElementById('set-alarm');
  const alarmsList = document.getElementById('alarms-list');
  const currentTimeElement = document.getElementById('current-time');
  let alarmIntervals = [];
  let alarms = JSON.parse(localStorage.getItem('alarms')) || [];

  // Update the clock every second
  function updateClock() {
      const now = new Date();
      const currentTimeString = now.toLocaleTimeString();

      // Display current time
      currentTimeElement.textContent = currentTimeString;
  }

  // Start the clock
  function startClock() {
      setInterval(updateClock, 1000);
      updateClock(); // Update immediately to avoid initial delay
  }

  // Set Alarm button click event
  setAlarmButton.addEventListener('click', function() {
      const alarmTime = alarmTimeInput.value;
      if (!alarmTime) {
          alert('Please select a valid alarm time.');
          return;
      }

      const now = new Date();
      const alarmDateTime = new Date(now.toDateString() + ' ' + alarmTime);

      const timeUntilAlarm = alarmDateTime.getTime() - now.getTime();

      if (timeUntilAlarm <= 0) {
          alert('Please select a future time for the alarm.');
          return;
      }

      // Create alarm element
      const alarmListItem = document.createElement('li');
      alarmListItem.classList.add('list-group-item');
      alarmListItem.textContent = 'Alarm set for ' + alarmDateTime.toLocaleTimeString();

      // Create delete button for the alarm
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
      deleteButton.addEventListener('click', function() {
          const index = alarms.indexOf(alarmDateTime.getTime());
          if (index !== -1) {
              alarms.splice(index, 1);
              localStorage.setItem('alarms', JSON.stringify(alarms));

              // Remove the alarm from the list
              alarmsList.removeChild(alarmListItem);

              // Clear the corresponding interval
              clearInterval(alarmIntervals[index]);
              alarmIntervals.splice(index, 1);
          }
      });
      alarmListItem.appendChild(deleteButton);

      // Add alarm to the list
      alarmsList.appendChild(alarmListItem);

      // Schedule the alarm
      const intervalId = setTimeout(function() {
          const index = alarms.indexOf(alarmDateTime.getTime());
          if (index !== -1) {
              alarms.splice(index, 1);
              localStorage.setItem('alarms', JSON.stringify(alarms));

              // Remove the alarm from the list
              alarmsList.removeChild(alarmListItem);

              // Clear the corresponding interval
              clearInterval(alarmIntervals[index]);
              alarmIntervals.splice(index, 1);

              // Trigger the alarm only if it's still in the alarms list
              alert('Alarm!');
          }
      }, timeUntilAlarm);

      alarmIntervals.push(intervalId);
      alarms.push(alarmDateTime.getTime());
      localStorage.setItem('alarms', JSON.stringify(alarms));
  });

  // Load saved alarms from local storage
  function loadAlarms() {
      alarms.forEach(function(alarm, index) {
          const alarmDateTime = new Date(alarm);
          const now = new Date();
          const timeUntilAlarm = alarmDateTime.getTime() - now.getTime();
          if (timeUntilAlarm > 0) {
              const alarmListItem = document.createElement('li');
              alarmListItem.classList.add('list-group-item');
              alarmListItem.textContent = 'Alarm set for ' + alarmDateTime.toLocaleTimeString();

              // Create delete button for the alarm
              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
              deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
              deleteButton.addEventListener('click', function() {
                  const index = alarms.indexOf(alarmDateTime.getTime());
                  if (index !== -1) {
                      alarms.splice(index, 1);
                      localStorage.setItem('alarms', JSON.stringify(alarms));

                      // Remove the alarm from the list
                      alarmsList.removeChild(alarmListItem);

                      // Clear the corresponding interval
                      clearInterval(alarmIntervals[index]);
                      alarmIntervals.splice(index, 1);
                  }
              });
              alarmListItem.appendChild(deleteButton);

              // Add alarm to the list
              alarmsList.appendChild(alarmListItem);

              // Schedule the alarm
              const intervalId = setTimeout(function() {
                  const index = alarms.indexOf(alarmDateTime.getTime());
                  if (index !== -1) {
                      alarms.splice(index, 1);
                      localStorage.setItem('alarms', JSON.stringify(alarms));

                      // Remove the alarm from the list
                      alarmsList.removeChild(alarmListItem);

                      // Clear the corresponding interval
                      clearInterval(alarmIntervals[index]);
                      alarmIntervals.splice(index, 1);

                      // Trigger the alarm only if it's still in the alarms list
                      alert('Alarm!');
                  }
              }, timeUntilAlarm);

              alarmIntervals.push(intervalId);
          }
      });
  }

  // Start the clock when the page loads
  startClock();
  loadAlarms();
});
