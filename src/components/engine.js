const e = () => {
  let snake = [{num: 64, dir: 'right'}, {num: 63, dir: 'right'}, {num: 62, dir: 'right'}, {num: 61, dir: 'right'}];
  let turnPoints = [];

  let direction = 'right';
  let prevDirection = 'right';

  const apple = document.createElement('img');
  apple.src = './apple-icon.svg';
  apple.setAttribute('id', 'apple');


  const tossApple = () => {
    let num = Number(parseInt(Math.random() * 12*12));
    const grids = Array.from(document.querySelectorAll('#gameboard>div'))
    if (snake.every(piece => piece.num != num) && !grids[num].classList.contains('border')) {
      apple.slot = num;
      grids[num].appendChild(apple);
      return
    } else {
      tossApple();
      return
    };
  };

  const startGame = (grids) => {
    window.addEventListener('keydown', switchDirection);
    const borderGrids = Array.from(document.querySelectorAll('.border'));

    snake.forEach(piece => {
      grids[piece.num].style.backgroundColor = 'black';
    });
    grids[snake[0].num].style.backgroundColor = 'red';

    tossApple();

    let move = setInterval(() => {
      if (prevDirection != direction) {
        turnPoints.push({num: 0, dir: direction});
      };

      const lastNum = snake[snake.length - 1].num;
      const lastDir = snake[snake.length - 1].dir;

      if (turnPoints.length > 0) {
        turnPoints.forEach(point => {
          snake[point.num].dir = point.dir;
          point.num++;
        });
      };

      snake.forEach(piece => {
        switch(piece.dir) {
          case 'left':
            piece.num--;
            break;
            
          case 'up':
            piece.num = piece.num - 12;
            break;
            
          case 'right':
            piece.num++;
            break;
            
          case 'down':
            piece.num = piece.num + 12;
            break;
        };
      });

      if (snake.some(piece => {
        if (piece != snake[0]) {
          return piece.num == snake[0].num
        }
      }) || borderGrids.some(grid => grid.slot == snake[0].num)) {
        clearInterval(move);
        console.log('you lost');
        return
      };

      if (grids[snake[0].num] == grids[apple.slot]) {
        grids[apple.slot].removeChild(apple);
        tossApple();
        snake.push({num: lastNum, dir: lastDir});

        if (turnPoints.length > 0 && turnPoints[0].num == snake.length - 1) {
          snake[snake.length - 1].dir = turnPoints[0].dir;
          turnPoints[0].num++;
        };
      };
      
      if (turnPoints.length > 0 && turnPoints[0].num > snake.length - 1) {
        turnPoints = turnPoints.slice(1, turnPoints.length);
      };
      
      grids.forEach(grid => {
        grid.style.backgroundColor = '';
      });
      borderGrids.forEach(grid => grid.style.backgroundColor = 'orange');

      snake.forEach(piece => {
        grids[piece.num].style.backgroundColor = 'black';
      });
      grids[snake[0].num].style.backgroundColor = 'red';

      prevDirection = direction;
    }, 200);
  };

  const switchDirection = (e) => {
    if ((prevDirection === 'down' || prevDirection === 'up') && e.keyCode === 37) {
      direction = 'left';
    }
    
    if ((prevDirection === 'down' || prevDirection === 'up') && e.keyCode === 39) {
      direction = 'right';
    }
    
    if ((prevDirection === 'left' || prevDirection === 'right') && e.keyCode === 38) {
      direction = 'up';
    }
    
    if ((prevDirection === 'left' || prevDirection === 'right') && e.keyCode === 40) {
      direction = 'down';
    }
  };

  return {
    startGame
  }
};

const engine = e();

export default engine;