$(document).ready(() => {
    //Chỉ cho phép nhập số
    $('.number-only').keyup(function (event) {
        if (event.which !== 8 && event.which !== 0 && event.which < 48 || event.which > 57) {
            // 0 for null value
            // 8 for backspace
            // 48-57 for 0-9 numbers
            this.value = this.value.replace(/\D/g, "");
        }
    });
});

function clickEvent(first, last) {
    if (first.value.length) {
        document.getElementById(last).focus();
    }
}

