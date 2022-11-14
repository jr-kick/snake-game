import loadLevel from './components/loadLevel';
import engine from './components/engine';
import loadMenu from './components/menu';

window.addEventListener('load', loadMenu.defaultMenu);


const muteBtn = document.querySelector('#mute-button');
muteBtn.onclick = engine.setMusic;

const kiddingText = document.querySelector('#kidding');
const clickMeBtn = document.querySelector('#clickme');
clickMeBtn.onclick = () => {
  clickMeBtn.style.display = 'none';
  kiddingText.style.display = 'block';
};