import engine from "./engine";

const defaultLoad = () => {
  const gameboard = document.querySelector('#gameboard');
  
  for (let i = 1; i <= 12*12; i++) {
    const div = document.createElement('div');
    if (i % 12 == 0 || (i <= 12 && i > 0) || (i > 12*12-12 && i <= 12*12) || (i - 1) % 12 == 0) {
      div.classList.add('border');
      div.style.backgroundColor = 'orange';
    };
    div.slot = i - 1;
    gameboard.appendChild(div);
  };
  
  const grids = Array.from(gameboard.children);

  const startBtn = document.querySelector('#start');
  startBtn.addEventListener('click', () => engine.startGame(grids));
};

export default defaultLoad;