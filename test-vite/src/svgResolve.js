import logo from './logo.svg';
import logoRaw from './logo.svg?raw';

// 第一种使用 SVG的方式
const img = document.createElement('img');
img.src = logo;
document.body.appendChild(img);

// 第二种使用 SVG的方式
document.body.innerHTML += logoRaw;