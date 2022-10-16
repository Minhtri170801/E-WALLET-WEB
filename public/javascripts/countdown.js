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
            document.getElementById("verifiBtn").innerHTML = `
            <div class="btn-resend" id="ResendBtn">
                <button type="submit">Gửi lại mã</button>
            </div>
        `;
            document.getElementById("counter").innerHTML = "";
        }
    }
    tick();
}
countdown();