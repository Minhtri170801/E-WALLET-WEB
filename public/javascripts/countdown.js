function countdown() {
    var seconds = 59;
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML =
            (seconds < 10 ? "0" : "") + String(seconds) + "s";
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            document.getElementById("reset-OTP").innerHTML = `Gửi lại mã`;
            document.getElementById("counter").innerHTML = "";
        }
    }
    tick();
}
countdown();