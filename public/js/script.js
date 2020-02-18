(function() {
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
        let foods = $('section>div');
        for(let x = 0; x < foods.length; x++) {
            console.log(foods.eq(x).offset());
        }
        if (keyPress[37]) {
            basket.x -= 2;
        }
        if (keyPress[39]) {
            basket.x += 2;
        }
        basket.move();
        if(Math.random() > 0.96) {
            let elem = document.createElement('div');
            let text = food[Math.floor(Math.random() * 24)];
            elem.innerText = text;
            elem.style.transform = `translate(${Math.random()*1000}px)`;
            document.getElementById('waiting').appendChild(elem);
        }
        requestAnimationFrame(init);
    }
    
    document.addEventListener('keydown', keyPress.check);
    document.addEventListener('keyup', keyPress.check);
    
    init();
})();