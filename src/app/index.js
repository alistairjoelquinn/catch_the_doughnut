(function() {
    let score = 0;
    let scoreBox = document.getElementById('score');
    let countdown = 30;
    let timer = document.getElementById('timer');
    let button = document.querySelector('.play-again');
    const food = [ 
        '🍩', '🍪', '🌰', '🍦', '🍣', '🍤', '🍱', '🍩', '🍩', '🍩', '🍩', '🍩', '🍩', '🍔', '🌭', '🥪', '🍜', '🍖', '🍳', '🍩', '🧀', '🥨', '🥯', '🥐', '🥕', '🥦', '🌶', '🍩', '🌽', '🍅', '🍆', '🥑'
    ];
    timer.innerText = countdown;
    setInterval(() => {
        countdown--;
        timer.innerText = countdown;
    }, 1000);

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
                let donut = document.createElement('div');
                donut.innerText = '🍩';
                donut.style.left = `${score*5}px`
                $('#player').append(donut);
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

    const timeCheck = () => {
        if(score >= 10) {
            $('#waiting').addClass('hidden');
            $('.text').addClass('hidden');
            $('#winner').removeClass('hidden');
        }
        if(countdown <= 0 && score < 10) {
            $('#waiting').addClass('hidden');
            $('.text').addClass('hidden');
            $('#loser').removeClass('hidden');
        }
        if(countdown <= 0 && score >= 10) {
            $('#waiting').addClass('hidden');
            $('.text').addClass('hidden');
            $('#winner').removeClass('hidden');
        }
    }
    
    const init = () => {
        timeCheck();
        foodMove();
        basketCheck();
        trolley.move();
        makeFood();
        requestAnimationFrame(init);
    }
    
    document.addEventListener('keydown', keyPress.check);
    document.addEventListener('keyup', keyPress.check);
    button.addEventListener('click', () => {
        location.reload();
    });
    
    init(); 
})();