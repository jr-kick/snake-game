import engine from "./engine";

const defaultLoad = () => {
  const gameboard = document.querySelector('#gameboard');
  
  for (let i = 1; i <= 256; i++) {
    const div = document.createElement('div');
    if (i % 16 == 0 || (i <= 16 && i > 0) || (i > 240 && i <= 256) || (i - 1) % 16 == 0) {
      div.classList.add('border');
      div.style.backgroundColor = 'orange';
      div.slot = i - 1;
    } else div.classList.add('inside');
    gameboard.appendChild(div);
  };
  const inside = Array.from(document.querySelectorAll('.inside'));
  inside.forEach((grid) => {
    if (inside[inside.indexOf(grid) - 1] == undefined) {
      grid.slot = 0;
    } else {
      grid.slot = Number(inside[inside.indexOf(grid) - 1].slot) + 1;
    }
  })

  const grids = Array.from(gameboard.children);

  const startBtn = document.querySelector('#start');
  startBtn.addEventListener('click', () => engine.startGame(grids));
};

export default defaultLoad;