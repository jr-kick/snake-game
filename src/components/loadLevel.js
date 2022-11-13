import engine from "./engine";

const ll = () => {
  const gameboard = document.querySelector('#gameboard');
  const pressKey = document.querySelector('#press-key');
  let newLevel;

  const load = (level) => {
    switch(level) {
      case 'levelOne':
        newLevel = 'levelOne';
        levelOne();
        break;
        
      case 'levelTwo':
        newLevel = 'levelTwo';
        levelTwo();
        break;
        
      case 'levelThree':
        newLevel = 'levelThree';
        levelThree();
        break;
    }
  };

  const levelOne = () => {
    const unit = 12;

    gameboard.innerHTML = '';
    const obsticles = [27, 28, 33, 34, 39, 46, 53, 56, 89, 92, 99, 106, 111, 112, 117, 118];

    const initialSnake = [{num: 64, dir: 'right'}, {num: 63, dir: 'right'}, {num: 62, dir: 'right'}, {num: 61, dir: 'right'}];

    const initialDirection = 'right';

    for (let i = 1; i <= unit*unit; i++) {
      const div = document.createElement('div');
      if ((i <= unit && i > 0) || (i > unit*unit-unit && i <= unit*unit) || i % unit == 0 || (i - 1) % unit == 0 || obsticles.some(obsticle => obsticle == i)) {
        div.classList.add('border');
        div.style.backgroundColor = 'orange';
      } else if (!initialSnake.some(piece => piece.num == i - 1)){
        div.classList.add('inside');
        div.style.backgroundColor = 'white';
      } else if (initialSnake[0].num == i - 1) {
        div.style.backgroundColor = 'rgb(0, 187, 0)';
      } else {
        div.style.backgroundColor = 'rgb(0, 97, 0)';
      };
      div.slot = i - 1;
      gameboard.appendChild(div);
    };

    gameboard.style.cssText = `
      display: grid;
      grid-template-columns: repeat(${unit}, 1fr);
      grid-template-rows: repeat(${unit}, 1fr);
    `;

    pressKey.style.display = 'block';

    window.addEventListener('keydown', keyPressed);

    function keyPressed() {
      window.removeEventListener('keydown', keyPressed);
      pressKey.style.display = 'none';
      engine.startGame(newLevel, initialSnake, initialDirection, unit);
    };
  };

  const levelTwo = () => {
    const unit = 13;

    gameboard.innerHTML = '';
    const obsticles = [70, 71, 73, 74, 58, 60, 96, 97, 99, 100, 110, 112, 15, 25, 145, 155, 42, 30, 36, 50, 120, 134, 140, 128, 67, 80, 81, 93, 77, 90, 89, 103, 151, 150, 149, 137, 19, 20, 21, 33];

    const initialSnake = [{num: 86, dir: 'right'}, {num: 85, dir: 'right'}, {num: 84, dir: 'right'}, {num: 83, dir: 'right'}, {num: 82, dir: 'right'}];

    const initialDirection = 'right';

    for (let i = 1; i <= unit*unit; i++) {
      const div = document.createElement('div');
      if ((i <= unit && i > 0) || (i > unit*unit-unit && i <= unit*unit) || i % unit == 0 || (i - 1) % unit == 0 || obsticles.some(obsticle => obsticle == i)) {
        div.classList.add('border');
        div.style.backgroundColor = 'orange';
      } else if (!initialSnake.some(piece => piece.num == i - 1)){
        div.classList.add('inside');
        div.style.backgroundColor = 'white';
      } else if (initialSnake[0].num == i - 1) {
        div.style.backgroundColor = 'rgb(0, 187, 0)';
      } else {
        div.style.backgroundColor = 'rgb(0, 97, 0)';
      };
      div.slot = i - 1;
      gameboard.appendChild(div);
    };

    gameboard.style.cssText = `
      display: grid;
      grid-template-columns: repeat(${unit}, 1fr);
      grid-template-rows: repeat(${unit}, 1fr);
    `;

    pressKey.style.display = 'block';

    window.addEventListener('keydown', keyPressed);

    function keyPressed() {
      window.removeEventListener('keydown', keyPressed);
      pressKey.style.display = 'none';
      engine.startGame(newLevel, initialSnake, initialDirection, unit);
    };
  };

  const levelThree = () => {
    const unit = 16;

    gameboard.innerHTML = '';
    const obsticles = [86, 91, 166, 171, 35, 46, 211, 222, 21, 28, 66, 79, 178, 229, 236, 191, 52, 53, 68, 60, 61, 77, 180, 196, 197, 204, 205, 189, 71, 87, 101, 102, 74, 90, 107, 108, 155, 156, 170, 186, 183, 167, 150, 149, 120, 121, 136, 137, 40, 41, 115, 131, 126, 142, 216, 217];

    const initialSnake = [{num: 87, dir: 'up'}, {num: 103, dir: 'up'}, {num: 102, dir: 'right'}, {num: 118, dir: 'up'}, {num: 134, dir: 'up'}, {num: 150, dir: 'up'}];

    const initialTurnPoints = [{num: 2, dir: 'right'}, {num: 1, dir: 'up'}];

    const initialDirection = 'up';

    for (let i = 1; i <= unit*unit; i++) {
      const div = document.createElement('div');
      if ((i <= unit && i > 0) || (i > unit*unit-unit && i <= unit*unit) || i % unit == 0 || (i - 1) % unit == 0 || obsticles.some(obsticle => obsticle == i)) {
        div.classList.add('border');
        div.style.backgroundColor = 'orange';
      } else if (!initialSnake.some(piece => piece.num == i - 1)){
        div.classList.add('inside');
        div.style.backgroundColor = 'white';
      } else if (initialSnake[0].num == i - 1) {
        div.style.backgroundColor = 'rgb(0, 187, 0)';
      } else {
        div.style.backgroundColor = 'rgb(0, 97, 0)';
      };
      div.slot = i - 1;
      gameboard.appendChild(div);
    };

    gameboard.style.cssText = `
      display: grid;
      grid-template-columns: repeat(${unit}, 1fr);
      grid-template-rows: repeat(${unit}, 1fr);
    `;

    pressKey.style.display = 'block';

    window.addEventListener('keydown', keyPressed);

    function keyPressed() {
      window.removeEventListener('keydown', keyPressed);
      pressKey.style.display = 'none';
      engine.startGame(newLevel, initialSnake, initialDirection, unit, initialTurnPoints);
    };
  };

  return {
    load,
    levelOne,
    levelTwo,
    levelThree
  }
};

const loadLevel = ll();

export default loadLevel;