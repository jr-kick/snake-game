import loadLevel from "./loadLevel";
import engine from "./engine";

const lm = () => {
  const gameboard = document.querySelector('#gameboard');
  let newSpeed = 350;
  let difNum = 0;
  let levels = [{name: 'You', difficulty: ['unlocked', 'unlocked', 'unlocked', 'unlocked']}, {name: 'Are'}, {name: 'Beautiful'}];
  levels.forEach(level => {
    if (level != levels[0]) {
      level.difficulty = ['locked', 'locked', 'locked', 'locked'];
    };
  });

  const unlockLevels = (currentLevel) => {
    let nextLevel = currentLevel + 1;
    if (levels[nextLevel]) {
      for (let i = 0; i <= difNum; i++) {
        levels[nextLevel].difficulty[i] = 'unlocked';
      };
    };
    console.log(levels);
  };

  const defaultMenu = () => {
    gameboard.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
    `;
    gameboard.innerHTML = '';

    const title = document.createElement('h1');
    const newGameBtn = document.createElement('button');
    const chooseLevelBtn = document.createElement('button');
    const setDifficultyBtn = document.createElement('button');

    title.textContent = 'Sneaky Snake Snack';

    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', () => {
      loadLevel.load(0, difNum);
    });
    
    chooseLevelBtn.textContent = 'Levels';
    chooseLevelBtn.addEventListener('click', () => {
      chooseLevel();
    });

    setDifficultyBtn.textContent = 'Difficulty';
    setDifficultyBtn.addEventListener('click', () => {
      setDifficulty();
    });

    gameboard.appendChild(title);
    gameboard.appendChild(newGameBtn);
    gameboard.appendChild(chooseLevelBtn);
    gameboard.appendChild(setDifficultyBtn);
  };

  const chooseLevel = () => {
    gameboard.innerHTML = '';

    const youBtn = document.createElement('button');
    const areBtn = document.createElement('button');
    const beautifulBtn = document.createElement('button');
    const backToMenuBtn = document.createElement('button');

    backToMenuBtn.textContent = 'Back To Menu';

    const levelArray = [];
    levelArray.push(youBtn, areBtn, beautifulBtn);
    
    for (let i = 0; i < levelArray.length; i++) {
      if (levels[i].difficulty[difNum] != 'locked') {
        levelArray[i].textContent = levels[i].name;
        levelArray[i].addEventListener('click', () => {
          loadLevel.load(i, difNum);
        });
      } else {
        levelArray[i].textContent = 'Locked';
      };
    };

    if (levels[2].difficulty[3] == 'unlocked') {
      beautifulBtn.textContent = 'Crazy';
    };

    backToMenuBtn.addEventListener('click', () => {
      defaultMenu();
    });

    gameboard.appendChild(youBtn);
    gameboard.appendChild(areBtn);
    gameboard.appendChild(beautifulBtn);
    gameboard.appendChild(backToMenuBtn);
  };

  const setDifficulty = () => {
    gameboard.innerHTML = '';

    const easyBtn = document.createElement('button');
    const normalBtn = document.createElement('button');
    const hardBtn = document.createElement('button');
    const hardcoreBtn = document.createElement('button');
    const okBtn = document.createElement('button');

    easyBtn.textContent = 'Easy';
    normalBtn.textContent = 'Normal';
    hardBtn.textContent = 'Hard';
    hardcoreBtn.textContent = 'Hardcore';
    okBtn.textContent = 'Ok';

    easyBtn.onclick = () => {
      newSpeed = 350;
      difNum = 0;
      buttonArray.forEach(button => button.style.outline = '');
      easyBtn.style.outline = '2px solid black';
    };
    normalBtn.onclick = () => {
      newSpeed = 300;
      difNum = 1;
      buttonArray.forEach(button => button.style.outline = '');
      normalBtn.style.outline = '2px solid black';
    };
    hardBtn.onclick = () => {
      newSpeed = 250;
      difNum = 2;
      buttonArray.forEach(button => button.style.outline = '');
      hardBtn.style.outline = '2px solid black';
    };
    hardcoreBtn.onclick = () => {
      newSpeed = 200;
      difNum = 3;
      buttonArray.forEach(button => button.style.outline = '');
      hardcoreBtn.style.outline = '2px solid black';
    };
    okBtn.onclick = () => {
      engine.setSpeed(newSpeed);
      defaultMenu();
    };

    const buttonArray = [];
    buttonArray.push(easyBtn, normalBtn, hardBtn, hardcoreBtn);

    gameboard.appendChild(easyBtn);
    gameboard.appendChild(normalBtn);
    gameboard.appendChild(hardBtn);
    gameboard.appendChild(hardcoreBtn);
    gameboard.appendChild(okBtn);
    
    switch(difNum) {
      case 0:
        easyBtn.style.outline = '2px solid black';
        break;
        
      case 1:
        normalBtn.style.outline = '2px solid black';
        break;
        
      case 2:
        hardBtn.style.outline = '2px solid black';
        break;
        
      case 3:
        hardcoreBtn.style.outline = '2px solid black';
        break;
    };
  };

  return {
    defaultMenu,
    unlockLevels
  }
}

const loadMenu = lm();

export default loadMenu;