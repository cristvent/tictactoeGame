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
            for (var x = 0; x < buttons.length; x++) {
            var tempName = document.getElementById(buttons[x].id);
            if (tempName.innerText == "OFF") {
                tempName.style.color = "grey";
                tempName.style.pointerEvents = "none";
            }
        }
        } else {
            element.parentElement.style.backgroundColor = "#eee";
            element.innerText = "OFF";
            for (var x = 0; x < buttons.length; x++) {
            var tempName = document.getElementById(buttons[x].id);
            if (tempName.innerText == "OFF") {
                tempName.style.color = "black";
                tempName.style.pointerEvents = "auto";
            }
        }
        }

        position = (position == false) ? true : false;
    }
});