$(document).ready(function () {
    var position = false,
        buttons = document.getElementsByClassName("btn-switch");
    // btnHolder = document.getElementsByClassName("switch-holder");
    for (var x = 0; x < buttons.length; x++) {
        buttons[x].addEventListener("click", clickEvents, false)
    }

    function clickEvents() {
        var element = document.getElementById(this.id);
        element.style.float = (position == false) ? "right" : "left";
        if (position == false) {
            element.parentElement.style.backgroundColor = "#5cb85c";
            element.innerText = "ON";
        } else {
            element.parentElement.style.backgroundColor = "#eee";
            element.innerText= "OFF";
        }
        position = (position == false) ? true : false;
    }
});