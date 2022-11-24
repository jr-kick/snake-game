import engine from "./engine";

const ll = () => {
  const gameboard = document.querySelector('#gameboard');
  const pressKey = document.querySelector('#press-key');
  const scoreCounter = document.querySelector('#score>p');
  const arrows = document.querySelectorAll('.arrows button');
  let pack = {};

  const load = (level, difNum) => {
    pack.difficulty = difNum;
    switch(level) {
      case 0:
        pack.newLevel = 0;
        You();
        break;
        
      case 1:
        pack.newLevel = 1;
        Are();
        break;
        
      case 2:
        pack.newLevel = 2;
        Beautiful();
        break;
    }
  };

  const You = () => {
    pack.newUnit = 12;

    gameboard.innerHTML = '';
    pack.obsticles = [27, 28, 33, 34, 39, 46, 53, 56, 89, 92, 99, 106, 111, 112, 117, 118];

    pack.initialSnake = [{num: 64, dir: 'right'}, {num: 63, dir: 'right'}, {num: 62, dir: 'right'}, {num: 61, dir: 'right'}];

    pack.initialDirection = 'right';

    if (pack.difficulty <= 1) {
      pack.newMaxScore = 20;
    };

    if (pack.difficulty > 1) {
      pack.newMaxScore = 25;
    };

    for (let i = 1; i <= pack.newUnit*pack.newUnit; i++) {
      const div = document.createElement('div');
      if ((i <= pack.newUnit && i > 0) || (i > pack.newUnit*pack.newUnit-pack.newUnit && i <= pack.newUnit*pack.newUnit) || i % pack.newUnit == 0 || (i - 1) % pack.newUnit == 0 || pack.obsticles.some(obsticle => obsticle == i)) {
        div.classList.add('border');
        div.style.backgroundColor = 'orange';
      } else if (!pack.initialSnake.some(piece => piece.num == i - 1)){
        div.classList.add('inside');
        div.style.backgroundColor = 'white';
      } else if (pack.initialSnake[0].num == i - 1) {
        div.style.backgroundColor = 'rgb(0, 187, 0)';
      } else {
        div.style.backgroundColor = 'rgb(0, 97, 0)';
      };
      div.slot = i - 1;
      gameboard.appendChild(div);
    };

    gameboard.style.cssText = `
      display: grid;
      grid-template-columns: repeat(${pack.newUnit}, 1fr);
      grid-template-rows: repeat(${pack.newUnit}, 1fr);
    `;

    scoreCounter.textContent = `Score: ${pack.newMaxScore}/0`;

    pressKey.style.display = 'block';

    window.addEventListener('keydown', keyPressed);
    arrows.forEach(arrow => {
      arrow.addEventListener('click', keyPressed);
    });
  };

  const Are = () => {
    pack.newUnit = 13;

    gameboard.innerHTML = '';
    pack.obsticles = [70, 71, 73, 74, 58, 60, 96, 97, 99, 100, 110, 112, 15, 25, 145, 155, 42, 30, 36, 50, 120, 134, 140, 128, 67, 80, 81, 93, 77, 90, 89, 103, 151, 150, 149, 137, 19, 20, 21, 33];

    pack.initialSnake = [{num: 86, dir: 'right'}, {num: 85, dir: 'right'}, {num: 84, dir: 'right'}, {num: 83, dir: 'right'}, {num: 82, dir: 'right'}];

    pack.initialDirection = 'right';

    if (pack.difficulty <= 1) {
      pack.newMaxScore = 20;
    };

    if (pack.difficulty > 1) {
      pack.newMaxScore = 25;
    };

    for (let i = 1; i <= pack.newUnit*pack.newUnit; i++) {
      const div = document.createElement('div');
      if ((i <= pack.newUnit && i > 0) || (i > pack.newUnit*pack.newUnit-pack.newUnit && i <= pack.newUnit*pack.newUnit) || i % pack.newUnit == 0 || (i - 1) % pack.newUnit == 0 || pack.obsticles.some(obsticle => obsticle == i)) {
        div.classList.add('border');
        div.style.backgroundColor = 'orange';
      } else if (!pack.initialSnake.some(piece => piece.num == i - 1)){
        div.classList.add('inside');
        div.style.backgroundColor = 'white';
      } else if (pack.initialSnake[0].num == i - 1) {
        div.style.backgroundColor = 'rgb(0, 187, 0)';
      } else {
        div.style.backgroundColor = 'rgb(0, 97, 0)';
      };
      div.slot = i - 1;
      gameboard.appendChild(div);
    };

    gameboard.style.cssText = `
      display: grid;
      grid-template-columns: repeat(${pack.newUnit}, 1fr);
      grid-template-rows: repeat(${pack.newUnit}, 1fr);
    `;

    scoreCounter.textContent = `Score: ${pack.newMaxScore}/0`;

    pressKey.style.display = 'block';

    window.addEventListener('keydown', keyPressed);
    arrows.forEach(arrow => {
      arrow.addEventListener('click', keyPressed);
    });
  };

  const Beautiful = () => {
    pack.newUnit = 16;

    gameboard.innerHTML = '';
    pack.obsticles = [86, 91, 166, 171, 35, 46, 211, 222, 21, 28, 66, 79, 178, 229, 236, 191, 52, 53, 68, 60, 61, 77, 180, 196, 197, 204, 205, 189, 71, 87, 101, 102, 74, 90, 107, 108, 155, 156, 170, 186, 183, 167, 150, 149, 120, 121, 136, 137, 40, 41, 115, 131, 126, 142, 216, 217];

    pack.initialSnake = [{num: 87, dir: 'up'}, {num: 103, dir: 'up'}, {num: 102, dir: 'right'}, {num: 118, dir: 'up'}, {num: 134, dir: 'up'}, {num: 150, dir: 'up'}];

    pack.initialTurnPoints = [{num: 2, dir: 'right'}, {num: 1, dir: 'up'}];

    pack.initialDirection = 'up';

    if (pack.difficulty <= 1) {
      pack.newMaxScore = 25;
    };

    if (pack.difficulty > 1) {
      pack.newMaxScore = 30;
    };

    for (let i = 1; i <= pack.newUnit*pack.newUnit; i++) {
      const div = document.createElement('div');
      if ((i <= pack.newUnit && i > 0) || (i > pack.newUnit*pack.newUnit-pack.newUnit && i <= pack.newUnit*pack.newUnit) || i % pack.newUnit == 0 || (i - 1) % pack.newUnit == 0 || pack.obsticles.some(obsticle => obsticle == i)) {
        div.classList.add('border');
        div.style.backgroundColor = 'orange';
      } else if (!pack.initialSnake.some(piece => piece.num == i - 1)){
        div.classList.add('inside');
        div.style.backgroundColor = 'white';
      } else if (pack.initialSnake[0].num == i - 1) {
        div.style.backgroundColor = 'rgb(0, 187, 0)';
      } else {
        div.style.backgroundColor = 'rgb(0, 97, 0)';
      };
      div.slot = i - 1;
      gameboard.appendChild(div);
    };

    gameboard.style.cssText = `
      display: grid;
      grid-template-columns: repeat(${pack.newUnit}, 1fr);
      grid-template-rows: repeat(${pack.newUnit}, 1fr);
    `;

    scoreCounter.textContent = `Score: ${pack.newMaxScore}/0`;

    pressKey.style.display = 'block';

    window.addEventListener('keydown', keyPressed);
    arrows.forEach(arrow => {
      arrow.addEventListener('click', keyPressed);
    });
  };

  function keyPressed() {
    window.removeEventListener('keydown', keyPressed);
    arrows.forEach(arrow => {
      arrow.removeEventListener('click', keyPressed);
    });
    pressKey.style.display = 'none';
    engine.startGame({newLevel: pack.newLevel, initialSnake: pack.initialSnake, initialDirection: pack.initialDirection, newUnit: pack.newUnit, initialTurnPoints: pack.initialTurnPoints, newMaxScore: pack.newMaxScore});
  };

  return {
    load,
    You,
    Are,
    Beautiful
  }
};

const loadLevel = ll();

export default loadLevel;