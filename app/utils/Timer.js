export default class Timer {
    constructor(time) {
        // TODO: Validate Time Input

        // splitting into [hh : mm : ss]
        const timeArray = time.split(':');
        this._hours = parseInt(timeArray[0]);
        this._minutes = parseInt(timeArray[1]);
        this._seconds = parseInt(timeArray[2]);
        this._validateTime();
    }

    setHours(hours) { this._hours = hours; }
    setMinutes(minutes) { this._minutes = minutes; }
    setSeconds(seconds) { this._seconds = seconds; }
    getHours() { return this._hours; }
    getMinutes() { return this._minutes; }
    getSeconds() { return this._seconds; }

    getTime() {
        return ({
            hours: this._hours,
            minutes: this._minutes,
            seconds: this._seconds
        });
    }

    getFormattedTime() {  // Returning 'hh : mm : ss'
        let hours = this._hours.toString();
        let minutes = this._minutes.toString();
        let seconds = this._seconds.toString();
        // changing {t} to {tt}
        if (hours.length < 2) { hours = '0' + hours }
        if (minutes.length < 2) { minutes = '0' + minutes }
        if (seconds.length < 2) {seconds = '0' + seconds }
        return `${hours} : ${minutes} : ${seconds}`;
    }

    start() {
        this._countingInterval = setInterval(() => {
            this.addSeconds(1);
        }, 1000);
    }

    stop() { clearInterval(this._countingInterval); }

    addTimer(newTimer) {
        this._seconds += newTimer.getSeconds();
        this._minutes += newTimer.getMinutes();
        this._hours += newTimer.getHours();
        this._validateTime();
    }

    addSeconds(offset) {
        this._seconds += offset;
        this._validateTime();
    }

    addMinutes(offset) {
        this._minutes += offset;
        this._validateTime();
    }

    addHours(offset) { this._hours += offset; }

    _validateTime() {  // Parsing the current time to a valid one
        this._minutes += Math.floor(this._seconds / 60);
        this._hours += Math.floor(this._minutes / 60);
        this._seconds %= 60;
    }
}
