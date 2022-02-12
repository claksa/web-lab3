$(document).ready(function () {
    const K = 67,
        AXIS = 110,
        Y_MIN = -5,
        X_MIN = -3,
        MAX = 5;

    let x, y, radius,
        alert = $(".error"),
        colour = "green",
        canvas = $("#canvas");

    function isCorrectInput(number) {
        return (typeof number == "number") && !isNaN(number);
    }

    function validateX() {
        x = $("#my_form\\:x_value").val().replace(',', '.');
        if (isCorrectInput(x)) {
            alert.textContent = "";
            alert.className = "error";
            return true;
        } else {
            alert.textContent = "Введите значение X в диапазоне от " + X_MIN + " до " + MAX;
            alert.className = "error active";
            return false;
        }
    }

    function validateY() {
        y = parseFloat($("#my_form\\:y_value").val().replace(',', '.'));
        if (isCorrectInput(y)) {
            alert.textContent = "";
            alert.className = "error";
            return true;
        } else {
            alert.textContent = "Введите значение Y в диапазоне от " + Y_MIN + " до " + MAX;
            alert.className = "error active";
            return false;
        }
    }

    function validateR() {
        radius = $("#my_form\\:r_value").val().replace(',', '.');
        if (isCorrectInput(radius)) {
            alert.textContent = "";
            alert.className = "error";
            return true;
        } else {
            alert.textContent = "Введите значение R!"
            alert.className = "error active";
            return false;
        }
    }

    function validateAllInputs() {
        return validateX() || validateY() || validateR();
    }

    function checkQuarters(_x, _y, _r) {
        return _x >= 0 && _y <= 0 && _x * _x + _y * _y <= _r / 2
            || _x <= 0 && _y >= 0 && _y <= _x + _r
            || _x >= 0 && _y >= 0 && _x <= _r && _y <= _r / 2;
    }

    function clearCanvas() {
        canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
    }

    function drawPoint(x, y, color) {
        clearCanvas();
        let axes = canvas[0].getContext('2d');
        if (x > canvas.width() || x < -canvas.width() || y > canvas.height() || y < -canvas.height()) {
            return;
        }
        axes.setLineDash([2, 2]);
        axes.beginPath();
        axes.moveTo(x, 110);
        axes.lineTo(x, y);
        axes.moveTo(110, y);
        axes.lineTo(x, y);
        axes.stroke();
        axes.fillStyle = color;
        axes.arc(x, y, 2, 0, 2 * Math.PI);
        axes.fill();
    }

    function redrawFromInput() {
        if (!validateAllInputs()) {
            console.log("validation in redrawing failed...");
            clearCanvas();
            return;
        }
        console.log("coordinates:" + " x: " + x + " y: " + y + " r: " + radius);
        if (!checkQuarters(x,y,radius)) {
            colour = "red";
        }
        drawPoint(x * K / radius + AXIS, -(y / radius * K - AXIS), colour);
    }

    canvas.on("click", function (event) {
        // if (!validateR()) {
        //     return;
        // }
        let x_value = (event.offsetX - AXIS) / K * radius;
        if (x_value < X_MIN) x_value = X_MIN;
        if (x_value > MAX) x_value = MAX;

        let y_value = (-event.offsetY + AXIS) / K * radius;
        if (y_value < Y_MIN) y_value = Y_MIN;
        if (y_value > MAX) y_value = MAX;

        if (!checkQuarters(x_value, y_value, radius)) {
            colour = "red";
        }
        drawPoint(K * x_value / radius + AXIS, -(y_value / radius * K - AXIS), colour);
    });

    $("#my_form\\:r_value").on("input", function () {
        radius = $(this).val();
        let svgGraph = document.querySelector(".result-graph").getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-radius).toString();
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-radius).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-radius / 2).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-radius / 2).toString();
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (radius).toString();
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (radius).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (radius / 2).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (radius / 2).toString();
        redrawFromInput();
    });

    $("#my_form\\:form_button").on("click", function (event) {
        if (!validateAllInputs()) {
            event.preventDefault();
        }
    })

    $("#my_form\\:x_value").on("input", function (event) {
        redrawFromInput();
    })

    $("#my_form\\:y_value").on("input", function (event) {
        redrawFromInput();
    })

});