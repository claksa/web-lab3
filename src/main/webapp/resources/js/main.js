$(document).ready(function () {
    let x, y, radius,
        alert = $("#message .error"),
        colour = "red",
        res_block = $("#res-block"),
        canvas = $("#canvas");

    const K = 68,
        Y_MIN = -3,
        Y_MAX = 3,
        AXIS = canvas.width() / 2,
        X_VALUES = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'],
        R_VALUES = ['1', '2', '3', '4', '5'];

    function isCorrectInput(number) {
        return !isNaN(number);
    }

    function validateX() {
        x = $("#my_form\\:x_value").val().replace(',','.');
        if (isCorrectInput(x) && X_VALUES.includes(x)) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text("Введите значение X!");
            alert.addClass("active");
            return false;
        }
    }

    function validateY() {
        y = $("#my_form\\:y_value").val().replace(',','.');
        if (isCorrectInput(y) && y <= Y_MAX && y >= Y_MIN) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text(`Введите значение Y в диапазоне от ${Y_MIN} до ${Y_MAX}`);
            alert.addClass("active");
            return false;
        }
    }

    function validateR() {
        radius = $('input[name="my_form:r_value"]:checked').val();
        if (isCorrectInput(radius) && R_VALUES.includes(radius)) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text("Введите значение R!");
            alert.addClass("active");
            return false;
        }
    }

    function validateAllInputs() {
        return validateX() && validateY() && validateR();
    }

    function checkFirstQuarter(_x, _y, _r) {
        return _x <= 0 && _y >= 0 && _x * _x + _y * _y <= radius * radius;
    }

    function checkSecondQuarter(_x, _y, _r) {
        return _x >= 0 && _y >= 0 && _x <= radius && _y <= radius / 2;
    }

    function checkThirdQuarter(_x, _y, _r) {
        return _x <= 0 && _y <= 0 && _y >= -_x - radius / 2;
    }

    function checkQuarters(new_x, new_y, new_r) {
        return checkFirstQuarter(new_x, new_y, new_r) || checkSecondQuarter(new_x, new_y, new_r) || checkThirdQuarter(new_x, new_y, new_r);
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
            if (!index) {
                return;
            }
            let data = $(this).find('td');
            let new_x = data.eq(0).text().trim();
            let new_y = data.eq(1).text().trim();
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
        let minDiff = Infinity;
        let nearestXValue;
        for (let i = 0; i < X_VALUES.length; ++i) {
            if (Math.abs(x_value - X_VALUES[i]) < minDiff) {
                minDiff = Math.abs(x_value - X_VALUES[i]);
                nearestXValue = X_VALUES[i];
            }
        }

        let y_value = (-event.offsetY + AXIS) / K * radius;
        if (y_value < Y_MIN) y_value = Y_MIN;
        if (y_value > Y_MAX) y_value = Y_MAX;

        colour = checkQuarters(nearestXValue, y_value, radius) ? "green" : "red";
        $("#my_form\\:x_value").val(nearestXValue);
        $("#my_form\\:y_value").val(y_value);
        $("#my_form\\:form_button").trigger('click');
        drawPoint(K * nearestXValue / radius + AXIS, -(y_value / radius * K - AXIS), colour);
    });

    $('input[name="my_form:r_value"]').on("change", function () {
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
        redrawFromInput(x, y, radius);
    });

    $('#my_form\\:y_value').on('input', () => redrawFromInput(x, y, radius));
    $('my_form\\:x_value').on('change', () => redrawFromInput(x, y, radius));

    $("#my_form\\:form_button").on("click", function (event) {
        event.preventDefault();
        res_block.css("visibility", "visible");
        if (!validateAllInputs()) {
            console.log("fail validation after click!")
        } else {
            console.log("coordinates:" + " x: " + x + " y: " + y + " r: " + radius);
        }
    })

    $("#my_form\\:reset_button").on("click", function () {
        $("#my_form\\:x_value").val(0);
        $("#my_form\\:y_value").val(0);
        Array.from(document.querySelectorAll('input[name="my_form:r_value"]:checked'), input => input.checked = false);
        radius = '';
        clearCanvas();
        res_block.css("visibility", "hidden");
    })

    setInterval(redrawAllPointers, 600);
});
