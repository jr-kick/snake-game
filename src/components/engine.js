const e = () => {
  let snake = [{num: 97, dir: 'right'}, {num: 98, dir: 'right'}, {num: 99, dir: 'right'}, {num: 100, dir: 'right'}, {num: 101, dir: 'right'}, {num: 102, dir: 'right'}, {num: 103, dir: 'right'}];

  let direction = 'right';
  let prevDirection = 'up';

  const apple = document.createElement('img');
  apple.src = './apple-icon.svg';
  apple.setAttribute('id', 'apple');


  const tossApple = () => {
    const inside = Array.from(document.querySelectorAll('.inside'));
    let num = parseInt(Math.random() * 196)
    if (snake.every(piece => piece.num != num)) {
      apple.slot = num;
      inside[num].appendChild(apple);
      return
    } else {
      console.log('new apple!');
      tossApple();
      return
    };
  };

  const foundApple = (grids) => {
    let num = snake[0].num;
    let dir = snake[0].dir;
    switch(dir) {
      case 'up':
        num = num + 16;
        break;
        
      case 'right':
        num--;
        break;
        
      case 'down':
        num = num - 16;
        break;
        
      case 'left':
        num++;
        break;
    };
    grids[num].style.backgroundColor = 'black';
    snake.unshift({num: num, dir: dir});
  };

  const startGame = (grids) => {
    window.addEventListener('keydown', switchDirection);
    const borderGrids = Array.from(document.querySelectorAll('.border'));
    const inside = Array.from(document.querySelectorAll('.inside'));

    snake.forEach(piece => {
      grids[piece.num].style.backgroundColor = 'black';
      grids[snake[snake.length - 1].num].style.backgroundColor = 'red';
    });

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
              let appleGrid = grids[snake[snake.length - 1].num];
        
              if (inside[apple.slot] == appleGrid) {
                tossApple(grids);
                foundApple(grids);
              };
              
              if (borderGrids.some(grid => grid.slot == piece.num)) {
                clearInterval(move);
                console.log('you lost');
              };
            };
            break;
            
          case 'up':
            piece.num = piece.num - 16;
            if (piece == snake[snake.length - 1]) {
              let appleGrid = grids[snake[snake.length - 1].num];
        
              if (inside[apple.slot] == appleGrid) {
                tossApple(grids);
                foundApple(grids);
              };
              
              if (borderGrids.some(grid => grid.slot == piece.num)) {
                clearInterval(move);
                console.log('you lost');
              };
            };
            break;
            
          case 'right':
            piece.num++;
            if (piece == snake[snake.length - 1]) {
              let appleGrid = grids[snake[snake.length - 1].num];
        
              if (inside[apple.slot] == appleGrid) {
                tossApple(grids);
                foundApple(grids);
              };
              
              if (borderGrids.some(grid => grid.slot == piece.num)) {
                clearInterval(move);
                console.log('you lost');
              };
            };
            break;
            
          case 'down':
            piece.num = piece.num + 16;
            if (piece == snake[snake.length - 1]) {
              let appleGrid = grids[snake[snake.length - 1].num];
        
              if (inside[apple.slot] == appleGrid) {
                tossApple(grids);
                foundApple(grids);
              };

              if (borderGrids.some(grid => grid.slot == piece.num)) {
                clearInterval(move);
                console.log('you lost');
              };
            };
            break;
        }

        grids[piece.num].style.backgroundColor = 'black';

        let index = snake.indexOf(piece);

        if (piece != snake[snake.length - 1]) {
          piece.dir = snake[index + 1].dir;
        };
      });

      grids[snake[snake.length - 1].num].style.backgroundColor = 'red';
      prevDirection = direction;
    }, 100);
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