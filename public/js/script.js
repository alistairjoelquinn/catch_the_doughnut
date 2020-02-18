(function() {
    let score = 0;
    let scoreBox = document.getElementById('score');

    const trolley = {
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

    const foodMove = () => {
        let foods = $('section>div');
        for(let x = 0; x < foods.length; x++) {
            newHeight = parseInt(((foods.eq(x).css('top')).split('px')[0]), 10) + 4;
            itemLeft = foods.eq(x).offset().left;
            if(((newHeight > (window.innerHeight - 100))) && itemLeft > trolley.x && itemLeft < (trolley.x + 80) && foods.eq(x).text() == '🍩') {
                score++;
                foods.eq(x).remove();
                scoreBox.innerText = score;
            }
            foods.eq(x).css({top: `${newHeight}px`});
            if(newHeight > window.innerHeight) {
                foods.eq(x).remove();
            };
        }
    }

    const makeFood = () => {
        if(Math.random() > 0.96) {
            let elem = document.createElement('div');
            let text = food[Math.floor(Math.random() * food.length)];
            elem.innerText = text;
            elem.style.top = '-60px';
            elem.style.transform = `translateX(${Math.random() * window.innerWidth}px)`;
            document.getElementById('waiting').appendChild(elem);
        }
    }

    const basketCheck = () => {
        if (keyPress[37]) trolley.x -= 4;
        if (keyPress[39]) trolley.x += 4;
    }
    
    const init = () => {
        foodMove();
        basketCheck();
        trolley.move();
        makeFood();
        requestAnimationFrame(init);
    }
    
    document.addEventListener('keydown', keyPress.check);
    document.addEventListener('keyup', keyPress.check);
    
    init();
})();