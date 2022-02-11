$(document).ready(function () {
    const K = 67,
        AXIS = 110,
        Y_MIN = -5,
        X_MIN = -3,
        MAX = 5;

    let x, y, radius,
        result_style = $("#res-block").style,
        alert = $(".error"),
        colour = "green",
        canvas = $("#canvas");

    function isCorrectInput(number) {
        return number instanceof Number && !isNaN(number);
    }

    function validateX() {
        x = $("#x_value").val().replace(',', '.');
        console.log("x: ${x}");
        if (isCorrectInput(x)) {
            alert.textContent = "";
            alert.className = "error";
            return true;
        } else {
            alert.textContent = "Введите значение X в диапазоне от ${X_MIN} до ${MAX}!"
            alert.className = "error active";
            return false;
        }
    }

    function validateY() {
        y = parseFloat($("#y_value").val().replace(',', '.'));
        console.log("y: ${y}");
        if (isCorrectInput(y)) {
            alert.textContent = "";
            alert.className = "error";
            return true;
        } else {
            alert.textContent = "Введите значение Y в диапазоне от ${Y_MIN} до ${MAX}!"
            alert.className = "error active";
            return false;
        }
    }

    function validateR() {
        radius = $("#r_value").val().replace(',', '.');
        console.log("radius: ${radius}")
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

    function checkQuarters(x, y) {
        return x >= 0 && y <= 0 && x * x + y * y <= radius / 2
            || x <= 0 && y >= 0 && y <= x + radius
            || x >= 0 && y >= 0 && x <= radius && y <= radius / 2;
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
        if (!checkQuarters(x, y)) colour = "red";
        drawPoint(x * K / radius + AXIS, -(y / radius * K - AXIS), colour);
    }

    canvas.on("click", function (event) {
        if (!validateR()) return;
        let x = (event.offsetX - AXIS) / K * radius;
        if (x < X_MIN) x = X_MIN;
        if (x > MAX) x = MAX;

        let y = (-event.offsetY + AXIS) / K * radius;
        if (y < Y_MIN) y = Y_MIN;
        if (y > MAX) y = MAX;

        if (!checkQuarters(x, y)) colour = "red";
        drawPoint(K * x / radius + AXIS, -(y / radius * K - AXIS), colour);
    });

    $("#r_value").on("input", function () {
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

    // $("#my_form").on("submit", function () {
    //     result_style.display = "inline-block";
    // })
});