$(document).ready(function () {
    let x, y, radius,
        alert = $("#message .error"),
        colour = "red", //default
        res_block = $("#res-block"),
        canvas = $("#canvas");

    const K = 68,
        Y_MIN = -5,
        AXIS = canvas.width() / 2,
        X_MIN = -3,
        R_MIN = 2,
        MAX = 5;

    function isCorrectInput(number) {
        return !isNaN(number);
    }

    function validateX() {
        x = $("#my_form\\:x_value").val().replace(',', '.');
        if (isCorrectInput(x) && x <= MAX && x >= X_MIN) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text("Введите значение X в диапазоне от " + X_MIN + " до " + MAX);
            alert.addClass("active");
            return false;
        }
    }

    function validateY() {
        y = $("#my_form\\:y_value").val().replace(',', '.');
        if (isCorrectInput(y) && y <= MAX && y >= Y_MIN) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text("Введите значение Y в диапазоне от " + Y_MIN + " до " + MAX);
            alert.addClass("active");
            return false;
        }
    }

    function validateR() {
        radius = $("#my_form\\:r_value").val().replace(',', '.');
        if (isCorrectInput(radius) && radius <= MAX && radius >= R_MIN) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text("Введите значение R в диапазоне от " + R_MIN + " до " + MAX);
            alert.addClass("active");
            return false;
        }
    }

    function validateAllInputs() {
        return validateX() && validateY() && validateR();
    }

    function checkFirstQuarter(_x, _y, _r) {
        return _x <= 0 && _y >= 0 && _y <= _x + _r;
    }

    function checkSecondQuarter(_x, _y, _r) {
        return _x >= 0 && _y >= 0 && _x <= _r && _y <= _r / 2;
    }

    function checkFourthQuarter(_x, _y, _r) {
        return _x >= 0 && _y <= 0 && _x * _x + _y * _y <= radius / 2;
    }

    function checkQuarters(new_x, new_y, new_r) {
        return checkFirstQuarter(new_x, new_y, new_r) || checkSecondQuarter(new_x, new_y, new_r) || checkFourthQuarter(new_x, new_y, new_r);
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

    function drawRowPoint(x, y, r, colour) {
        let ctxPoints = canvas[0].getContext('2d');
        ctxPoints.fillStyle = colour;
        ctxPoints.beginPath();
        ctxPoints.arc(x / r * K + AXIS, -y / r * K + AXIS, 2, 0, 2 * Math.PI);
        ctxPoints.fill();
    }

    function redrawAllPointers() {
        $("#allResults tr").each(function (index) {
            let data = $(this).find('td');
            let new_x = data.eq(0).text().trim();
            let new_y = data.eq(1).text().trim();
            // if (radius !== new_r) {
            //     new_r = data.eq(2).text().trim();
            // }
            console.log(index + "row-coordinates: x ( " + new_x + " ), y ( " + new_y + " ), r ( " + radius + " )");
            colour = checkQuarters(new_x, new_y, radius) ? "green" : "red";
            drawRowPoint(new_x, new_y, radius, colour);
        })
    }

    function redrawFromInput() {
        if (!validateAllInputs()) {
            clearCanvas();
            return;
        }
        colour = checkQuarters(x, y, radius) ? "green" : "red";
        drawPoint(x * K / radius + AXIS, -(y / radius * K - AXIS), colour);
    }

    canvas.on("click", function (event) {
        if (!validateR()) {
            return;
        }
        let x_value = (event.offsetX - AXIS) / K * radius;
        if (x_value < X_MIN) x_value = X_MIN;
        if (x_value > MAX) x_value = MAX;

        let y_value = (-event.offsetY + AXIS) / K * radius;
        if (y_value < Y_MIN) y_value = Y_MIN;
        if (y_value > MAX) y_value = MAX;

        colour = checkQuarters(x_value, y_value, radius) ? "green" : "red";
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
    });

    $("#my_form\\:form_button").on("click", function (event) {
        event.preventDefault();
        res_block.css("visibility", "visible");
        if (!validateAllInputs()) {
            console.log("fail validation after click!")
        } else {
            redrawFromInput();
            console.log("coordinates:" + " x: " + x + " y: " + y + " r: " + radius);
        }
    })

    // $("#my_form\\:x_value").on("input", () => redrawFromInput());

    // $("#my_form\\:y_value").on("input", () => redrawFromInput());

    setInterval(redrawAllPointers, 600);
});
