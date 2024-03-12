forceShowTime = false;
forceMiliseconds = false;

function getTime() {
    var today = new Date();
    var thisDay = today.getDay()
    var nextMonday = new Date();

    // Make sure the date is actually a monday
    if (thisDay != 1) {
        nextMonday.setDate(today.getDate() + (1 - thisDay + 7) % 7);
    }

    // Set the time to 17:50
    const date_future = nextMonday.setHours(17,50,0,1);

    // Calculate the time left
    let miliseconds = date_future - today;
    let seconds = Math.floor(miliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    miliseconds = miliseconds - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000;
    
    // Add a leading zero if the number is less than 10
    if(seconds < 10) { seconds = "0" + seconds;}

    console.log(seconds)

    return {
        miliseconds: miliseconds,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days
    };
}

function updateTime() {
    // Get the time left
    let t = getTime();

    console.log(t.days.toString() + " " + t.hours.toString() + " " + t.minutes.toString());

    // Update the time left
    pauseNow.classList.add("hidden")
    pauseIncomming.classList.add("hidden")
    notAnymoreToday.classList.add("hidden")
    thatsItForNow.classList.add("hidden")
    preciseTimer.classList.add("hidden")
    let updateInterval = 100;
    if (forceShowTime) {
        pauseIncomming.classList.remove("hidden")
        minutes.innerHTML = t.minutes
        seconds.innerHTML = t.seconds
        if(t.seconds < 10 || forceMiliseconds)
        {
            updateInterval = 1;
            preciseTimer.classList.remove("hidden");
            preciseTimer.innerHTML = "." + Math.floor(t.miliseconds/10);
        }
    }
    else if (t.hours == 23 && t.days == -1 && t.minutes > 49) {
        pauseNow.classList.remove("hidden")
    } else if(t.days != -1) {
        thatsItForNow.classList.remove("hidden")
        NextTimeDays.innerHTML = t.days;
        NextTimeHours.innerHTML = t.hours;
        NextTimeMinutes.innerHTML = t.minutes;
        NextTimeSeconds.innerHTML = t.seconds;
    } else {
        notAnymoreToday.classList.remove("hidden")
    }
    if (t.hours < 24 && t.days == 0) {
        pauseIncomming.classList.remove("hidden")
        minutes.innerHTML = t.minutes
        seconds.innerHTML = t.seconds
        if(t.seconds < 10 || forceMiliseconds)
        {
            updateInterval = 1;
            preciseTimer.classList.remove("hidden");
            preciseTimer.innerHTML = "." + Math.floor(t.miliseconds/10);
        }
    }
    setTimeout(updateTime, updateInterval)
}

NextTimeDays = document.querySelector('#NextTimeDays');
NextTimeHours = document.querySelector('#NextTimeHours');
NextTimeMinutes = document.querySelector('#NextTimeMinutes');
NextTimeSeconds = document.querySelector('#NextTimeSeconds');

minutes = document.querySelector('#minutes');
seconds = document.querySelector('#seconds');
pauseNow = document.getElementById("pauseNow");
pauseIncomming = document.getElementById("pauseIncomming");
preciseTimer = document.getElementById("preciseTimer");
notAnymoreToday = document.getElementById("notAnymoreToday");
thatsItForNow = document.getElementById("thatsItForNow");

updateTime()