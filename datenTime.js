function updateDateTime() {
    var dateTimeElement = document.getElementById("datetime");
    
    var now = new Date();
    var date = now.toDateString();
    var time = now.toLocaleTimeString();
    
    dateTimeElement.innerHTML = date + " " + time;
  }
      
  // Update date and time every second
  setInterval(updateDateTime, 1000);