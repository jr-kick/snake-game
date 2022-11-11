import engine from "./engine";

const defaultLoad = () => {
  const gameboard = document.querySelector('#gameboard');
  
  for (let i = 1; i <= 256; i++) {
    const div = document.createElement('div');
    if (i % 16 == 0 || (i <= 16 && i > 0) || (i > 240 && i <= 256) || (i - 1) % 16 == 0) {
      div.classList.add('border');
      div.style.backgroundColor = 'orange';
    } else div.classList.add('inside');
    div.slot = i - 1;
    gameboard.appendChild(div);
  };

  const grids = Array.from(gameboard.children);

  const startBtn = document.querySelector('#start');
  startBtn.addEventListener('click', () => engine.startGame(grids));
};

export default defaultLoad;