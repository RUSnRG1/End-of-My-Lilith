window.textdata = []; //問題文テキストを格納する配列
window.textLevel = [];
window.textFlag = [];
window.textMax = [];
window.imageElements = []; //ボタン用の画像オブジェクトを格納する配列
window.gameImageElements = [];//出力用の画像のMapオブジェクトを格納

sceneElements = document.querySelectorAll('.scene');



// ここで showLoadingScreen, preloadAllResources, hideLoadingScreen, showTitleScreen 関数を定義
function parseCSV(text) {
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const data = line.split(',');
    return headers.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index];
      return obj;
    }, {});
  });
}





function animateUFO() {
  const ufo1 = document.getElementById('ufo1');
  const ufo2 = document.getElementById('ufo2');
  const ufo3 = document.getElementById('ufo3');

  const radius = 100;
  let centerX = 465;
  let centerY = 450;
  let angle1 = 0;
  let angle2 = 120 * Math.PI / 180;
  let angle3 = 240 * Math.PI / 180;

  function update() {
    // 角度を更新
    angle1 += 0.04; // 速度調整
    angle2 += 0.04; // 速度調整
    angle3 += 0.04; // 速度調整

    // 新しい位置を計算
    const x1 = centerX + radius * Math.cos(angle1);
    const y1 = centerY + radius * Math.sin(angle1);

    // UFOの位置を更新
    ufo1.style.left = `${x1 * scale}px`;
    ufo1.style.top = `${y1 * scale}px`;

    const x2 = centerX + radius * Math.cos(angle2);
    const y2 = centerY + radius * Math.sin(angle2);

    // UFOの位置を更新
    ufo2.style.left = `${x2 * scale}px`;
    ufo2.style.top = `${y2 * scale}px`;

    const x3 = centerX + radius * Math.cos(angle3);
    const y3 = centerY + radius * Math.sin(angle3);

    // UFOの位置を更新
    ufo3.style.left = `${x3 * scale}px`;
    ufo3.style.top = `${y3 * scale}px`;



    // 次のフレームのために自身を呼び出す
    requestAnimationFrame(update);
  }

  update();
}


function showLoadingScreen() {
  //document.getElementById('loadingScreen').style.display = 'block';
  //animateUFO();

}

function hideLoadingScreen() {
  //document.getElementById('loadingScreen').style.display = 'none';
}

function preloadAllResources(callback) {
  //preloadImages(() => {
    //preloadTexts(() => {
      //preloadSound(() => {
        //callback();
      //})
    //})
  //})
}

function preloadImages(callback) {
  fetch("buttons.csv")
    .then(response => response.text())
    .then(text => {
      const buttons = parseCSV(text);
      buttons.forEach(buttonData => {
        const buttonimg = new Image();
        buttonimg.classList.add('imageButton');
        buttonimg.src = buttonData.src;
        buttonimg.folder = buttonData.folder;
        buttonimg.alt = buttonData.alt;
        buttonimg.setAttribute('data-folder', buttonimg.folder);
        window.imageElements.push(buttonimg);
        let map = new Map();
        for (let i = 0; i < buttonimg.alt.length; i++) {
          const gameimg = new Image();
          gameimg.src = `images/${buttonimg.folder}/${i.toString().padStart(2, '0')}.png`;
          gameimg.alt = buttonimg.alt[i];
          map.set(gameimg.alt, gameimg.src);
        }
        window.gameImageElements.push(map);
      });
      callback();
    })
    .catch(error => console.error("CSVの読み込みに失敗", error));
}


function preloadGameImages() {
  //alert(window.imageElements[0]);
  imageElements.forEach(buttonImage => {
    let map = new Map();

    for (let i = 0; i < buttonImage.alt.length; i++) {
      const img = new Image();
      img.src = `images/${buttonImage.folder}/${i.toString().padStart(2, '0')}.png`;
      img.alt = buttonImage.alt[i];
      map.set(img.alt, img.src);
    }
    gameImage.push(map);
  })
}

function preloadTexts(callback) {
  fetch("text_Koryudo.csv")
    .then(response => response.text())
    .then(data => {
      const text = parseCSV(data);
      text.forEach(t => {
        window.textdata.push(t.text.trim());
        window.textLevel.push(t.level);
        window.textFlag.push(!!Number(t.flag));
        window.textMax.push(t.max);
      });
    })
    .catch(error => console.error("CSVの読み込みに失敗", error));
  callback();
}

function preloadSound() {
  let soundsToLoad = ["sounds/jump.mp3", "sounds/eat.mp3", "sounds/over.mp3", "sounds/score.mp3"];
  document.getElementById("jumpSound").src = soundsToLoad[0];
  document.getElementById("eatSound").src = soundsToLoad[1];
  document.getElementById("overSound").src = soundsToLoad[2];
  document.getElementById("scoreSound").src = soundsToLoad[3];
}





function changeScene(sceneId) {
  // すべてのシーンを非表示にする
  document.querySelectorAll('.scene').forEach(scene => {
    scene.classList.remove('active');
  });

  // 指定されたシーンだけを表示する
  document.getElementById(sceneId).classList.add('active');
}



document.addEventListener('DOMContentLoaded', function () {
  showLoadingScreen();
  //var backimg = document.querySelector('.backImage');
  //backimg.style.backgroundImage = 'url(images/Back.jpg)';

  const titleimg = document.createElement('img');
  titleimg.src = `images/FlappyTotetsu.png`;
  document.getElementById("titleText").appendChild(titleimg);

  const onemoreimg = document.createElement('img');
  onemoreimg.src = `images/OneMore.png`;
  document.getElementById("oneMore").appendChild(onemoreimg);

  const tweetimg = document.createElement('img');
  tweetimg.src = `images/Tweet.png`;
  document.getElementById("Tweet").appendChild(tweetimg);

  const introimg = document.createElement('img');
  introimg.src = "images/intro.png";
  document.getElementById("introduction").appendChild(introimg);

  const resultimg = document.createElement('img');
  resultimg.src = "images/result.png";
  document.getElementById("result").appendChild(resultimg);

  const baseimg = document.createElement('img');
  baseimg.src = "images/base.png";
  document.getElementById("base").appendChild(baseimg);

  const waitimg = document.createElement('img');
  waitimg.src = "images/wait.png";
  document.getElementById("waitMotion").appendChild(waitimg);

  const chargeimg = document.createElement('img');
  chargeimg.src = "images/charge.png";
  document.getElementById("chargeMotion").appendChild(chargeimg);

  const backimg11 = document.createElement('img');
  backimg11.src = "images/back1.png";
  document.getElementById("background1-1").appendChild(backimg11);

  const backimg12 = document.createElement('img');
  backimg12.src = "images/back1.png";
  document.getElementById("background1-2").appendChild(backimg12);

  const backimg21 = document.createElement('img');
  backimg21.src = "images/back2.png";
  document.getElementById("background2-1").appendChild(backimg21);

  const backimg22 = document.createElement('img');
  backimg22.src = "images/back2.png";
  document.getElementById("background2-2").appendChild(backimg22);

  const headimg = document.createElement('img');
  headimg.src = "images/head.png";
  document.getElementById("totetsuHead").appendChild(headimg);

  const playimg = document.createElement('img');
  playimg.src = "images/start.png";
  document.getElementById("play").appendChild(playimg);

  const container = document.getElementById("totetsuBody");
  const rows = 5;
  const cols=6;
  let counter=0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const posX = -1000
      const posY = 300
      const sprite = document.createElement('div');
      sprite.classList.add('sprites');
      sprite.style.width = `30px`;
      sprite.style.height = `60px`;
      sprite.style.backgroundImage = `url('images/body.png')`;
      sprite.style.left = `${posX}px`; // 絶対位置X
      sprite.style.top = `${posY}px`; // 絶対位置Y
      sprite.style.backgroundPosition = `-${150-x * 30}px -${y * 60}px`;
      sprite.setAttribute("num",counter);
      sprite.style.zIndex = `${35-counter}`;
      container.appendChild(sprite);
      ++counter;
    }
  }

  const container2 = document.getElementById("hand");
  for (let i = 0; i < 6; ++i){
    for (let j = 0; j < 2; ++j){
      const sprite = document.createElement('div');
      sprite.classList.add('sprites');
      sprite.style.width = `50px`;
      sprite.style.height = `700px`;
      sprite.style.left = `${-1000}px`; // 絶対位置X
      sprite.style.top = `${0}px`; // 絶対位置Y
      const img = document.createElement('img');
      img.src = "images/hand.png";
      sprite.appendChild(img);
      sprite.setAttribute("num", i);
      sprite.setAttribute("updown", j);
      container2.appendChild(sprite);
    }
  }

  const container3 = document.getElementById("foods");
  for (let j = 0; j < 3; ++j) {
    const sprite = document.createElement('div');
    sprite.classList.add('sprites');
    sprite.style.width = `40px`;
    sprite.style.height = `40px`;
    sprite.style.left = `${-1000}px`; // 絶対位置X
    sprite.style.top = `${0}px`; // 絶対位置Y
    const img = document.createElement('img');
    img.src = `images/foods/0.png`;
    sprite.appendChild(img);
    sprite.setAttribute("num", j);
    container3.appendChild(sprite);
    
  }
  preloadSound();
  changeScene("gameScene");

  
  
  //preloadAllResources(() => {
    //setTimeout(() => {
      //displayImage();
      //hideLoadingScreen();
      //document.getElementById("titleImage").style.display = "block";
      
    //}, 3000);
  //});
});
