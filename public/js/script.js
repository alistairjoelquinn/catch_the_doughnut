(function() {
    const basket = {
        target: document.getElementById('player'),
        x: 0,
        y: 0,
        move() {
        this.target.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    };
    
    const keyPress = {
        check(e) {
            e.preventDefault();
            keyPress[e.keyCode] = e.type === "keydown"; 
        }
    };
    
    const init = () => {
        if (keyPress[37]) basket.x -= 2;
        if (keyPress[39]) basket.x += 2;
        basket.move();
        requestAnimationFrame(init);
    }
    
    document.addEventListener('keydown', keyPress.check);
    document.addEventListener('keyup', keyPress.check);
    
    init();
})();