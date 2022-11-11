const e = () => {
  let snake = [{num: 100, dir: 'right'}, {num: 101, dir: 'right'}, {num: 102, dir: 'right'}, {num: 103, dir: 'right'}, {num: 104, dir: 'right'}, {num: 105, dir: 'right'}, {num: 106, dir: 'right'}];

  let direction = 'right';
  let prevDirection = 'up';

  const apple = document.createElement('img');
  apple.src = './apple-icon.svg';

  const tossApple = () => {
    const inside = Array.from(document.querySelectorAll('.inside'));
    let num = parseInt(Math.random() * )
    if (snake.some(piece => piece.num == num)) {
      tossApple();
    } else {
      
    }
  }

  const startGame = (grids) => {
    window.addEventListener('keydown', switchDirection);
    const borderGrids = Array.from(document.querySelectorAll('.border'));

    tossApple();

    let move = setInterval(() => {

      grids.forEach(grid => grid.style.backgroundColor = '');
      borderGrids.forEach(grid => grid.style.backgroundColor = 'orange');

      snake[snake.length - 1].dir = direction;

      snake.forEach(piece => {

        switch(piece.dir) {
          case 'left':
            piece.num--;
            if (piece == snake[snake.length - 1]) {
              if (borderGrids.some(grid => grid.slot == piece.num)) {
                clearInterval(move);
                console.log('you lost');
              };
            };
            grids[piece.num].style.backgroundColor = 'black';
            break;
            
          case 'up':
            piece.num = piece.num - 16;
            if (piece == snake[snake.length - 1]) {
              if (borderGrids.some(grid => grid.slot == piece.num)) {
                clearInterval(move);
                console.log('you lost');
              };
            };
            grids[piece.num].style.backgroundColor = 'black';
            break;
            
          case 'right':
            piece.num++;
            if (piece == snake[snake.length - 1]) {
              if (borderGrids.some(grid => grid.slot == piece.num)) {
                clearInterval(move);
                console.log('you lost');
              };
            };
            grids[piece.num].style.backgroundColor = 'black';
            break;
            
          case 'down':
            piece.num = piece.num + 16;
            if (piece == snake[snake.length - 1]) {
              if (borderGrids.some(grid => grid.slot == piece.num)) {
                clearInterval(move);
                console.log('you lost');
              };
            };
            grids[piece.num].style.backgroundColor = 'black';
            break;
        }

        let index = snake.indexOf(piece);

        if (piece != snake[snake.length - 1]) {
          piece.dir = snake[index + 1].dir;
        };
      });

      grids[snake[snake.length - 1].num].style.backgroundColor = 'red';
      prevDirection = direction;
    }, 500);
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