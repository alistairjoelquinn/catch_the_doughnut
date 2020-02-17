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
            e.preventDefault();
            console.log("type: ", e.type);
            keyPress[x] = e.type === "keydown"; 
        }
    };
    
    const init = () => {
        if (keyPress[37]) basket.x -= 2;
        if (keyPress[39]) basket.x += 2;
        basket.move();
        requestAnimationFrame(init);
    }
    
    document.addEventListener('keydown', keyPress.fn);
    document.addEventListener('keyup', keyPress.fn);
    
    init();
})();