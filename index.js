function getTime() {
	const date_future = new Date(2023, 0, 1);
	const date_now = new Date();

	let seconds = Math.floor((date_future - date_now) / 1000);
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
    const time = document.getElementsByClassName("time");
}
