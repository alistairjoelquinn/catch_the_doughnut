(function() {
    let score = 0;
    let scoreBox = document.getElementById('score');

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
        scoreBox.innerText = score;
        let foods = $('section>div');
        for(let x = 0; x < foods.length; x++) {
            newHeight = parseInt(((foods.eq(x).css('top')).split('px')[0]), 10) + 2;
            itemLeft = foods.eq(x).offset().left;
            if(((newHeight > (window.innerHeight - 100))) && itemLeft > basket.x && itemLeft < (basket.x + 80) && foods.eq(x).text() == '🍩') {
                score++;
                foods.eq(x).remove();
            }
            foods.eq(x).css({
                top: `${newHeight}px`
            });
            if(newHeight > window.innerHeight) {
                foods.eq(x).remove();
            };
        }
        if (keyPress[37]) basket.x -= 4;
        if (keyPress[39]) basket.x += 4;
        basket.move();
        if(Math.random() > 0.96) {
            let elem = document.createElement('div');
            let text = food[Math.floor(Math.random() * 24)];
            elem.innerText = text;
            elem.style.top = '-60px';
            elem.style.transform = `translateX(${Math.random()*1200}px)`;
            document.getElementById('waiting').appendChild(elem);
        }
        requestAnimationFrame(init);
    }
    
    document.addEventListener('keydown', keyPress.check);
    document.addEventListener('keyup', keyPress.check);
    
    init();
})();