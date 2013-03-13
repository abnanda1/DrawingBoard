$(function () {
    var canvas = $("#canvas");
    var buttonPressed = false;

    canvas.mousedown(function () {
        buttonPressed = true;
    }).mouseup(function () {
        buttonPressed = false;
    }).mousemove(function (e) {
        if (buttonPressed) {
            setPoint(e.offsetX, e.offsetY, $("#color").val());
        }
    });

    var ctx = canvas[0].getContext("2d");

    function setPoint(x, y, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function clearPoints() {
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
    }

    //SignalR functions

    $("#clear").click(function () {
        clearPoints();
        hub.server.broadcastClear();
    });

    var hub = $.connection.drawingServer;
    hub.state.color = $("#color").val();
    var connected = false;

    // function to send the coordinates to the server

    // function to receive the message from the server and trace out the drawing

    canvas.mousemove(function (e) {
        if (buttonPressed && connected) {
            hub.server.sendDrawing(e.offsetX, e.offsetY, $("#color").val());
        }
    });

    hub.client.receiveDrawing = function (x, y, color) {
        if (connected) {
            setPoint(x, y, color);
        }
    }

    hub.client.clear = function () {
        clearPoints();
    }

    $.connection.hub.start().done(function () {
        connected = true;
    });
});