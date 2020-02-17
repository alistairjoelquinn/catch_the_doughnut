(function() {
    console.log('how much food is there? ', food.length, ' items, no need to panic!');

    const basket = {
        target: document.getElementById('player'),
        x: 0,
        move() {
            this.target.style.transform = `translate(${this.x}px)`;
        }
    };
    
    const keyPress = {
        check(e) {
            e.preventDefault();
            keyPress[e.keyCode] = e.type === "keydown"; 
        }
    };
    
    const init = () => {
        if (keyPress[37]) {
            basket.x -= 2;
        }
        if (keyPress[39]) {
            basket.x += 2;
        }
        basket.move();
        if(Math.random() > 0.8) {
            let elem = document.createElement('div');
            document.getElementById('waiting').appendChild(elem);
        }
        requestAnimationFrame(init);
    }
    
    document.addEventListener('keydown', keyPress.check);
    document.addEventListener('keyup', keyPress.check);
    
    init();
})();