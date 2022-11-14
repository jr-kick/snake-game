import loadLevel from "./loadLevel";
import loadMenu from "./menu";

const e = () => {
  const chill = [new Audio('./chill/1.mp3'), new Audio('./chill/2.mp3'), new Audio('./chill/3.mp3'), new Audio('./chill/4.mp3'), new Audio('./chill/5.mp3'), new Audio('./chill/6.mp3'), new Audio('./chill/7.mp3'), new Audio('./chill/8.mp3'), new Audio('./chill/9.mp3'), new Audio('./chill/10.mp3'), new Audio('./chill/11.mp3'), new Audio('./chill/12.mp3')];

  const manlyTunes = [new Audio('./manly-tunes/1.mp3'), new Audio('./manly-tunes/2.mp3'), new Audio('./manly-tunes/3.mp3'), new Audio('./manly-tunes/4.mp3')];

  let prevSong;
  let music = 'ON';
  let musicPlaying = false;

  let currentLevel;
  let difficulty = 0;

  let snake = 'empty';
  let turnPoints = [];
  let unit;

  let score = 0;

  let direction;
  let prevDirection;

  let speed = 350;

  let maxScore;

  const apple = document.createElement('img');
  apple.src = './apple-icon.svg';
  apple.setAttribute('id', 'apple');

  const gameLostBox = document.querySelector('#game-lost');
  const gameWonBox = document.querySelector('#game-won');
  const restartBtn = document.querySelector('#restart');
  const backToMenuBtn = Array.from(document.querySelectorAll('.back-to-menu'));
  const scoreCounter = document.querySelector('#score>p');
  const continueBtn = document.querySelector('#continue');
  const muteBtn = document.querySelector('#mute-button');

  continueBtn.onclick = () => {
    snake = 'empty';
    turnPoints = [];
  
    score = 0;
    scoreCounter.textContent = 'Score: 0';
    
    gameWonBox.style.display = 'none';
    loadLevel.load(currentLevel + 1);
  };

  function keydownFn(e) {
    if (e.keyCode == 82) {
      restart();
    };
  };

  function restart() {
    snake = 'empty';
    turnPoints = [];
  
    score = 0;
    scoreCounter.textContent = 'Score: 0';
  
    window.removeEventListener('keydown', keydownFn);
    gameLostBox.style.display = 'none';
    loadLevel.load(currentLevel);
  };

  restartBtn.onclick = restart;

  backToMenuBtn.forEach(btn => {
    btn.onclick = () => {
      snake = 'empty';
      turnPoints = [];
    
      score = 0;
      scoreCounter.textContent = 'Score: 0';
      
      gameWonBox.style.display = 'none';
      gameLostBox.style.display = 'none';
      stopMusic();
      loadMenu.defaultMenu();
    };
  });


  const tossApple = () => {
    let num = Number(parseInt(Math.random() * unit*unit));
    const grids = Array.from(document.querySelectorAll('#gameboard>div'));
    if (snake.every(piece => piece.num != num) && !grids[num].classList.contains('border')) {
      apple.slot = num;
      grids[num].appendChild(apple);
      return
    } else {
      tossApple();
      return
    };
  };

  const startGame = ({newLevel, initialSnake, initialDirection, newUnit, initialTurnPoints, newMaxScore}) => {
    maxScore = newMaxScore;
    currentLevel = newLevel;
    snake = initialSnake;
    direction = initialDirection;
    unit = newUnit;
    if (initialTurnPoints) {
      turnPoints = initialTurnPoints;
    };
    window.addEventListener('keydown', switchDirection);

    const grids = Array.from(document.querySelectorAll('#gameboard>div'));
    const borderGrids = Array.from(document.querySelectorAll('.border'));

    if (music == 'ON' && !musicPlaying) {
      let allMusic = chill.concat(manlyTunes);
      allMusic.forEach(song => {
        song.addEventListener('ended', startMusic);
      });
      window.addEventListener('keydown', skipMusic);
      window.addEventListener('keydown', playDaBeast);
      startMusic();
    };

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
            piece.num = piece.num - unit;
            break;
            
          case 'right':
            piece.num++;
            break;
            
          case 'down':
            piece.num = piece.num + unit;
            break;
        };
      });

      if (snake.some(piece => {
        if (piece != snake[0]) {
          return piece.num == snake[0].num
        }
      }) || borderGrids.some(grid => grid.slot == snake[0].num)) {
        clearInterval(move);
        gameLost();
        return
      };

      if (grids[snake[0].num] == grids[apple.slot]) {
        score++;
        scoreCounter.textContent = `Score: ${maxScore}/${score}`;
        grids[apple.slot].removeChild(apple);

        if (maxScore == score) {
          clearInterval(move);
          gameWon();
          return
        };

        snake.push({num: lastNum, dir: lastDir});

        if (turnPoints.length > 0 && turnPoints[0].num == snake.length - 1) {
          snake[snake.length - 1].dir = turnPoints[0].dir;
          turnPoints[0].num++;
        };

        tossApple();
      };
      
      if (turnPoints.length > 0 && turnPoints[0].num > snake.length - 1) {
        turnPoints = turnPoints.slice(1, turnPoints.length);
      };
      
      grids.forEach(grid => {
        grid.style.backgroundColor = 'white';
      });
      borderGrids.forEach(grid => grid.style.backgroundColor = 'orange');

      snake.forEach(piece => {
        grids[piece.num].style.backgroundColor = 'rgb(0, 97, 0)';
      });
      grids[snake[0].num].style.backgroundColor = 'rgb(0, 187, 0)';

      prevDirection = direction;
    }, speed);
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

  const setMusic = () => {
    if (music == 'ON') {
      music = 'OFF';
      if (musicPlaying) {
        prevSong.pause();
        prevSong.currentTime = 0;
        prevSong = '';
        musicPlaying = false;
        window.removeEventListener('keydown', skipMusic);
        window.removeEventListener('keydown', playDaBeast);
      };
      muteBtn.style.backgroundColor = '#950000';
    } else {
      music = 'ON';
      if (snake != 'empty') {
        window.addEventListener('keydown', skipMusic);
        window.addEventListener('keydown', playDaBeast);
        startMusic();
      };
      muteBtn.style.backgroundColor = '';
    };
  };

  const playDaBeast = (e) => {
    if (e.keyCode == 81 && difficulty > 1 && prevSong != manlyTunes[1]) {
      prevSong.pause();
      prevSong.currentTime = 0;
      prevSong = manlyTunes[1];
      manlyTunes[1].play();
    };
  };

  const stopMusic = () => {
    prevSong.pause();
    prevSong.currentTime = 0;
    prevSong = '';
    musicPlaying = false;
    window.removeEventListener('keydown', skipMusic);
    window.removeEventListener('keydown', playDaBeast);
  };

  const skipMusic = (e) => {
    if (e.keyCode == 77 && prevSong) {
      prevSong.pause();
      prevSong.currentTime = 0;
      startMusic();
    };
  };

  const startMusic = () => {
    let num;
    if (difficulty <= 1) {
      num = Number(parseInt(Math.random() * 12));
      if (prevSong != chill[num]) {
        chill[num].play();
        prevSong = chill[num];
      } else {
        startMusic();
      }
    } else if (difficulty > 1) {
      num = Number(parseInt(Math.random() * 4));
      if (prevSong != manlyTunes[num]) {
        manlyTunes[num].play();
        prevSong = manlyTunes[num];
      } else {
        startMusic();
      }
    };
    musicPlaying = true;
  };

  const setDifficulty = (newDifficulty) => {
    difficulty = newDifficulty;
  };

  const setSpeed = (newSpeed) => {
    speed = newSpeed;
  };

  const gameWon = () => {
    gameWonBox.style.display = 'flex';
    window.removeEventListener('keydown', switchDirection);
    loadMenu.unlockLevels(currentLevel);
  };

  const gameLost = () => {
    gameLostBox.style.display = 'flex';
    window.removeEventListener('keydown', switchDirection);
    window.addEventListener('keydown', keydownFn);
  };

  return {
    startGame,
    setSpeed,
    setDifficulty,
    setMusic
  }
};

const engine = e();

export default engine;