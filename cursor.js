document.addEventListener('DOMContentLoaded', function() {
    var cursor = document.createElement('img');
    cursor.src = 'Assets/LD_Bat_100px.png';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});