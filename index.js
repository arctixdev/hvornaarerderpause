function getTime() {
    var today = new Date();
    var day = today.getDay()
    var nextMonday = new Date();

    if (day != 1) {
        nextMonday.setDate(today.getDate() + (1 - day + 7) % 7);
    }

    const date_future = nextMonday.setHours(18,00,00,00);

    let seconds = Math.floor((date_future - today) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    return {
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days
    };
}

function updateTime() {
    let t = getTime();

    console.log(t.days.toString() + " " + t.hours.toString() + " " + t.minutes.toString());

    if (t.hours == 22 && t.days == -1 && t.minutes == 10) {
        now.classList.remove("hidden")
        time.classList.add("hidden")
        over.classList.add("hidden")
    } else if (t.hours > 18 | t.days > 0) {
        now.classList.add("hidden")
        time.classList.add("hidden")
        over.classList.remove("hidden")
    }
    if (t.hours < 23 & t.days == -1 & t.minutes < 50) {
        now.classList.add("hidden")
        over.classList.add("hidden")
        time.classList.remove("hidden")
        hours.innerHTML = t.minutes
        minutes.innerHTML = t.seconds
    }
    setTimeout(updateTime, 1000)
}

hours = document.querySelector('#hours');
minutes = document.querySelector('#minutes');
now = document.getElementById("now");
time = document.getElementById("time");
over = document.getElementById("over");

updateTime()