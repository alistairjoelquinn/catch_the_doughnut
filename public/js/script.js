(function() {
    console.log('script.js is connected');

    const basket = {
        el: document.getElementById('player'),
        x: 0,
        y: 0,
        move() {
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    };
    
    const keyPress = {
        fn(e) {
            const x = e.which;
            if (x >= 37 && x <= 40) {
                e.preventDefault();
                keyPress[x] = e.type === "keydown"; 
            }
        }
    };
    
    const update = () => {
        if (keyPress[37]) basket.x -= 2;
        if (keyPress[39]) basket.x += 2;
        basket.move();
    }
    
    document.addEventListener('keydown', keyPress.fn);
    document.addEventListener('keyup', keyPress.fn);
    
    (function init() {
        update();
        window.requestAnimationFrame(init);
    })();
})();