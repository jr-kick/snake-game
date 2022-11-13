import loadLevel from "./loadLevel";
import engine from "./engine";

const lm = () => {
  const gameboard = document.querySelector('#gameboard');
  let newSpeed = 350;

  const defaultMenu = () => {
    gameboard.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
    `;
    gameboard.innerHTML = '';

    const newGameBtn = document.createElement('button');
    const chooseLevelBtn = document.createElement('button');
    const setDifficultyBtn = document.createElement('button');

    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', () => {
      loadLevel.load('levelOne');
    });
    
    chooseLevelBtn.textContent = 'Levels';
    chooseLevelBtn.addEventListener('click', () => {
      chooseLevel();
    });

    setDifficultyBtn.textContent = 'Difficulty';
    setDifficultyBtn.addEventListener('click', () => {
      setDifficulty();
    });

    gameboard.appendChild(newGameBtn);
    gameboard.appendChild(chooseLevelBtn);
    gameboard.appendChild(setDifficultyBtn);
  };

  const chooseLevel = () => {
    gameboard.innerHTML = '';

    const levelOneBtn = document.createElement('button');
    const levelTwoBtn = document.createElement('button');
    const levelThreeBtn = document.createElement('button');
    const backToMenuBtn = document.createElement('button');

    levelOneBtn.textContent = 'You';
    levelTwoBtn.textContent = 'Are';
    levelThreeBtn.textContent = 'Beautiful';
    backToMenuBtn.textContent = 'Back To Menu';

    levelOneBtn.addEventListener('click', () => {
      loadLevel.load('levelOne');
    });

    levelTwoBtn.addEventListener('click', () => {
      loadLevel.load('levelTwo');
    });

    levelThreeBtn.addEventListener('click', () => {
      loadLevel.load('levelThree');
    });

    backToMenuBtn.addEventListener('click', () => {
      defaultMenu();
    });

    gameboard.appendChild(levelOneBtn);
    gameboard.appendChild(levelTwoBtn);
    gameboard.appendChild(levelThreeBtn);
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
      buttonArray.forEach(button => button.style.outline = '');
      easyBtn.style.outline = '2px solid black';
    };
    normalBtn.onclick = () => {
      newSpeed = 300;
      buttonArray.forEach(button => button.style.outline = '');
      normalBtn.style.outline = '2px solid black';
    };
    hardBtn.onclick = () => {
      newSpeed = 250;
      buttonArray.forEach(button => button.style.outline = '');
      hardBtn.style.outline = '2px solid black';
    };
    hardcoreBtn.onclick = () => {
      newSpeed = 200;
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
    
    switch(newSpeed) {
      case 350:
        easyBtn.style.outline = '2px solid black';
        break;
        
      case 300:
        normalBtn.style.outline = '2px solid black';
        break;
        
      case 200:
        hardBtn.style.outline = '2px solid black';
        break;
        
      case 150:
        hardcoreBtn.style.outline = '2px solid black';
        break;
    };
  };

  return {
    defaultMenu
  }
}

const loadMenu = lm();

export default loadMenu;