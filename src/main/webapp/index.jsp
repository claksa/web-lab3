<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>lab2</title>
    <link rel="shortcut icon" href="img/favicon.png" type="image/png">
    <link href="${pageContext.request.contextPath}/css/styles.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>
    <script src="js/validation.js"></script>
</head>
<body>
<div class="container">
    <header>
        <h4>Лабораторная работа №2. Вариант 15114</h4>
        <h5>Павлова Полина Дмитриевна, P3215</h5>
    </header>
    <table class="my_table">
        <thead>
        <tr>
            <td class="graph">
                <object class="result-graph" type="image/svg+xml"
                        data="${pageContext.request.contextPath}/img/mygraph.svg">
                    <img src="${pageContext.request.contextPath}/img/graph.png" width="220" height="220" alt="graph"/>
                </object>
                <canvas id="canvas">Ваш браузер не поддерживает канву</canvas>
            </td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th id="name" colspan="2">
                Введите значения:
            </th>
        </tr>
        <form action="controller" id="form" method="POST" novalidate>
            <tr>
                <td>X:</td>
                <td class="coordinate">
                    <label for="1">-2</label>
                    <input type="radio" id="1" name="x_value" class="set_X" value="-2">
                    <label for="2">-1.5</label>
                    <input type="radio" id="2" name="x_value" class="set_X" value="-1.5">
                    <label for="3">-1</label>
                    <input type="radio" id="3" name="x_value" class="set_X" value="-1">
                    <label for="4">-0.5</label>
                    <input type="radio" id="4" name="x_value" class="set_X" value="-0.5">
                    <label for="5">0</label>
                    <input type="radio" id="5" name="x_value" class="set_X" value="0">
                    <label for="6">0.5</label>
                    <input type="radio" id="6" name="x_value" class="set_X" value="0.5">
                    <label for="7">1</label>
                    <input type="radio" id="7" name="x_value" class="set_X" value="1">
                    <label for="8">1.5</label>
                    <input type="radio" id="8" name="x_value" class="set_X" value="1.5">
                    <label for="9">2</label>
                    <input type="radio" id="9" name="x_value" class="set_X" value="2">
                </td>
            </tr>
            <tr>
                <td>Y:</td>
                <td class="y_coordinate">
                    <label for="y_val"></label>
                    <input id="y_val" name="y_value" type="number" step="1" placeholder="-3..3" min="-3" max="3">
                    <span class="error" aria-live="polite"></span>
                </td>
            </tr>
            <tr>
                <td>R:</td>
                <td class="coordinate">
                    <label class="r_container" for="R1"></label>
                    <input class="set_r" type="button" id="R1" name="r_value" value="1">
                    <label class="r_container" for="R2"></label>
                    <input class="set_r" type="button" id="R2" name="r_value" value="2">
                    <label class="r_container" for="R3"></label>
                    <input class="set_r" type="button" id="R3" name="r_value" value="3">
                    <label class="r_container" for="R4"></label>
                    <input class="set_r" type="button" id="R4" name="r_value" value="4">
                    <label class="r_container" for="R5"></label>
                    <input class="set_r" type="button" id="R5" name="r_value" value="5">
                </td>
                <td><span id="radio-error"></span></td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="submit" value="проверить" class="form_button" id="subbtn">
                    <br>
                    <input type="reset" value="сброс" class="form_button" name="msg">
                </td>
            </tr>
        </form>
        </tbody>
    </table>
    <table id="row" class="result-table" style="display:none;">
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Время</th>
            <th>Время работы, нс</th>
            <th>Результат</th>
        </tr>
        </thead>
        <tbody id="receiver"></tbody>
    </table>
</div>
</body>
</html>
