/* Centryy script checks the position of the cursor upon the windowActivated call and executes
   window repositioning after a said timer has expired and if the cursor is outside the current active window */




workspace.windowActivated.connect(function(client) {
    if (!client || client.desktopWindow) {
        return;
    }

    var timer = new QTimer();
    timer.singleShot = true;
    timer.interval = 30;

    timer.timeout.connect(function() {

        if (!client) return;

        var area = client.frameGeometry;
        var mousePos = workspace.cursorPos;

        var centerX = area.x + (area.width / 2);
        var centerY = area.y + (area.height / 2);

        var isOutside = (
            mousePos.x < area.x ||
            mousePos.x > (area.x + area.width) ||
            mousePos.y < area.y ||
            mousePos.y > (area.y + area.height)
        );

        if (isOutside) {
            workspace.cursorPos = { x: centerX, y: centerY };
        }
    });

    timer.start();
});
