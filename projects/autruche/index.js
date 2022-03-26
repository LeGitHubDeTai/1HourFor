/*-------------------------------------------------------------------------------------------------------------\
|  _______    _    _____ _             _ _           ________     ___   ___ ___  __     _____   ___ ___  ___   |
| |__   __|  (_)  / ____| |           | (_)         /  ____  \   |__ \ / _ \__ \/_ |   / /__ \ / _ \__ \|__ \  |
|    | | __ _ _  | (___ | |_ _   _  __| |_  ___    /  / ___|  \     ) | | | | ) || |  / /   ) | | | | ) |  ) | |
|    | |/ _` | |  \___ \| __| | | |/ _` | |/ _ \  |  | |       |   / /| | | |/ / | | / /   / /| | | |/ /  / /  |
|    | | (_| | |  ____) | |_| |_| | (_| | | (_) | |  | |___    |  / /_| |_| / /_ | |/ /   / /_| |_| / /_ / /_  |
|    |_|\__,_|_| |_____/ \__|\__,_|\__,_|_|\___/   \  \____|  /  |____|\___/____||_/_/   |____|\___/____|____| |
|                                                   \________/                                                 |
\-------------------------------------------------------------------------------------------------------------*/

const colors = ["blue", "red", "green", "yellow"];

const ctx = canvas.getContext("2d");

const lookat = {x: 150, y: 85};

const eye = {
  radius: 50,
  iris: 30,
  limMin: -0.1,
  limMax: 1.1,
};

addEventListener("mousemove",e => {

    const bounds = canvas.getBoundingClientRect();
    lookat.x = e.pageX - bounds.left;
    lookat.y = e.pageY - bounds.top;
   
    ctx.clearRect(0, 0, 300, 150);
    drawEyes(lookat);
});


drawEyes(lookat);
function drawEyes(lookat) {
  var {x,y} = lookat;
  
  x /= canvas.width;
  y /= canvas.height;
  
  x = x < eye.limMin ? eye.limMin : x > eye.limMax ? eye.limMax : x;  
  y = y < eye.limMin ? eye.limMin : y > eye.limMax ? eye.limMax : y;  
  
  x -= 0.5;
  y -= 0.5;
  
  const range = (eye.radius - eye.iris) * 2;
  
  x *= range;
  y *= range;
  
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(50, 85, eye.radius, 0, Math.PI * 2, false);
  ctx.moveTo(275 + eye.radius, 85);
  ctx.arc(275, 85, eye.radius, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fill();

  ctx.save();
  ctx.clip();

  ctx.fillStyle = colors[random()] || "blue";
  ctx.beginPath();
  ctx.arc(50 + x, 85 + y, eye.iris, 0, Math.PI * 2, false);
  ctx.moveTo(275 + x + eye.iris, 85 + y);
  ctx.arc(275 + x, 85 + y, eye.iris, 0, Math.PI * 2, false);
  ctx.fill();  
  
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(50 + x, 85 + y, 15, 0, Math.PI * 2, false);
  ctx.moveTo(275 + x + 15, 85 + y);
  ctx.arc(275 + x, 85 + y, 15, 0, Math.PI * 2, false);
  ctx.fill();
  
  ctx.restore();
}

function random(){
    return Math.ceil(Math.random() * colors.length);
}