var snake = (function(window) {
  //贪吃蛇的js文件
  var move = document.getElementsByClassName("move")[0];
  var fooddiv = document.getElementsByClassName("food")[0];
  var score = document.getElementsByClassName("score")[0];
  var content = document.getElementsByClassName("content")[0];
  //手动控制暂停开始游戏
  var snakeState = 0;
  score.addEventListener("click", (function() {
      function control(e) {
        if (snakeState == 1) {
          init(false);
        } else if(snakeState == 0) {
          init(true);
        }
      }
      return control;
    })(), false);
  function removeClass(className,index) {
    var ele = document.getElementsByClassName(className);
    if(ele && index == undefined){
      while (ele.length > 0) {
        //调用父节点删除自己
        ele[0].parentNode.removeChild(ele[0]);
      }
    }else if(ele){
      ele[index].parentNode.removeChild(ele[index]);
    }
  }
  var geziW = Math.floor(parseInt(window.getComputedStyle(move, null).width) / 40),
    geziH = Math.floor(parseInt(window.getComputedStyle(move, null).height) / 40),
    direction = "right",
    right = true,
    left = false,
    top = false,
    bottom = true,
    scorenum = 0,
    speet = 150,
    time = 0,
    snake = [],
    foodbox = [[0,0,'ming'],[0,0,'zuo'],[0,0,'ai']],
    foods = [];


  //随机生成食物
  function food() {
    removeClass("food");
    for(var i = 0; i < foodbox.length; i++){
      var fooddiv = document.createElement("div");
      fooddiv.classList.add(foodbox[i][2], "food");
      var foodX = Math.floor(geziW * Math.random());
      var foodY = Math.floor(geziH * Math.random());
      foodbox[i][0] = foodX;
      foodbox[i][1] = foodY;
      fooddiv.style.left = foodX * 40 + "px";
      fooddiv.style.top = foodY * 40 + "px";
      move.appendChild(fooddiv);
      foods[i] = fooddiv;
    }
  }
  // 重新生成食物坐标
  function foodxy(i){
    var foodX = Math.floor(geziW * Math.random());
    var foodY = Math.floor(geziH * Math.random());
    foodbox[i][0] = foodX;
    foodbox[i][1] = foodY;
    foods[i].style.left = foodbox[i][0] * 40 + "px";
    foods[i].style.top = foodbox[i][1] * 40 + "px";
  }
   //判断吃到食物
  function boolfood() {
    for(var i = 0; i < foodbox.length; i++){
      if (foodbox[i][0] == snake[0][0] && foodbox[i][1] == snake[0][1]) {
        foodxy(i);
        //取出蛇最后一位
        var weiba = snake[snake.length - 1];
        switch (direction) {
          case "left":
            snake.push([weiba[0] + 1, weiba[1], "body"]);
            break;
          case "right":
            snake.push([weiba[0] - 1, weiba[1], "body"]);
            break;
          case "top":
            snake.push([weiba[0], weiba[1] + 1, "body"]);
            break;
          case "bottom":
            snake.push([weiba[0], weiba[1] - 1, "body"]);
            break;
        }
        scorenum += 1;
        score.innerHTML = "分数：" + scorenum;
        removeClass("head");
        removeClass("body");
        snakeBody();
        break;
      }
    }
  }

  //生成蛇身体
  function snakeBody() {
    for (var i = 0; i < snake.length; i++) {
      var snakediv = document.createElement("div");
      snakediv.className = snake[i][2];
      snakediv.style.left = snake[i][0] * 40 + "px";
      snakediv.style.top = snake[i][1] * 40 + "px";
      move.appendChild(snakediv);
    }
  }

  //蛇移动方法
  function snakeMove(e) {
    console.log(e.keyCode);
      switch (e.keyCode) {
        case 39: //右
          if (right) {
            removeClass("head");
            removeClass("body");
            for (var i = snake.length - 1; i >= 1; i--) {
              snake[i][0] = snake[i - 1][0];
              snake[i][1] = snake[i - 1][1];
            }
            snake[0][0] += 1;
            direction = "right";
            snakeBody();
            right = true;
            left = false;
            top = true;
            bottom = true;
          }
          break;
        case 37: //左
          if (left) {
            removeClass("head");
            removeClass("body");
            for (var i = snake.length - 1; i >= 1; i--) {
              snake[i][0] = snake[i - 1][0];
              snake[i][1] = snake[i - 1][1];
            }
            snake[0][0] -= 1;
            direction = "left";
            snakeBody();
            right = false;
            left = true;
            top = true;
            bottom = true;
          }
          break;
        case 38: //上
          if (top) {
            removeClass("head");
            removeClass("body");
            for (var i = snake.length - 1; i >= 1; i--) {
              snake[i][0] = snake[i - 1][0];
              snake[i][1] = snake[i - 1][1];
            }
            snake[0][1] -= 1;
            snakeBody();
            direction = "top";
            right = true;
            left = true;
            top = true;
            bottom = false;
          }
          break;
        case 40: //下
          if (bottom) {
            removeClass("head");
            removeClass("body");
            for (var i = snake.length - 1; i >= 1; i--) {
              snake[i][0] = snake[i - 1][0];
              snake[i][1] = snake[i - 1][1];
            }
            snake[0][1] += 1;
            snakeBody();
            direction = "bottom";
            right = true;
            left = true;
            top = false;
            bottom = true;
          }
          break;
      }
    movekey = false;
    boolfood();
    gameover();
  }
  

  //蛇自动移动
  function selfmove() {
    switch (direction) {
      case "right": //右
        removeClass("head");
        removeClass("body");
        for (var i = snake.length - 1; i >= 1; i--) {
          snake[i][0] = snake[i - 1][0];
          snake[i][1] = snake[i - 1][1];
        }
        snake[0][0] += 1;
        direction = "right";
        snakeBody();
        break;

      case "left": //左
        removeClass("head");
        removeClass("body");
        for (var i = snake.length - 1; i >= 1; i--) {
          snake[i][0] = snake[i - 1][0];
          snake[i][1] = snake[i - 1][1];
        }
        snake[0][0] -= 1;
        direction = "left";
        snakeBody();
        break;
      case "top": //上
        removeClass("head");
        removeClass("body");
        for (var i = snake.length - 1; i >= 1; i--) {
          snake[i][0] = snake[i - 1][0];
          snake[i][1] = snake[i - 1][1];
        }
        snake[0][1] -= 1;
        snakeBody();
        direction = "top";
        break;
      case "bottom": //下
        removeClass("head");
        removeClass("body");
        for (var i = snake.length - 1; i >= 1; i--) {
          snake[i][0] = snake[i - 1][0];
          snake[i][1] = snake[i - 1][1];
        }
        snake[0][1] += 1;
        snakeBody();
        direction = "bottom";
        break;
    }
    boolfood();
    gameover();
  }
  //判断死没死
  var gameover = function() {
    var onekey = true;
    // 吃到自己
    for (var i = snake.length - 1; i >= 1; i--) {
      if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
        var head = document.getElementsByClassName("head")[0];
        onekey = false;
        clearInterval(time);
        // document.onkeydown = null;
        document.removeEventListener("keydown", snakeMove);
        head.style.backgroundColor = "#000";
        head.style.opacity = "0.5";
        content.style.border = "2px solid rgba(255,0,0,0.5)";
        setTimeout(function(){
          init(false);
          init(true);
        },1000);
        // console.log("吃到第" + i + "节身体");
        break;
      }
    }
    if (onekey && snake[0][0] >= geziW || snake[0][1] >= geziH || snake[0][0] < 0 || snake[0][1] < 0) {
      var head = document.getElementsByClassName("head")[0];
      clearInterval(time);
      // document.onkeydown = null;
      document.removeEventListener("keydown", snakeMove);
      head.style.backgroundColor = "#000";
      head.style.opacity = "0.5";
      content.style.border = "2px solid rgba(255,0,0,0.5)";
      setTimeout(function(){
        init(false);
        init(true);
      },1000);
    }
  };
  function isPC() {
      // 设备判断函数
      var sUserAgent = window.navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          return false;
      } else {
          return true;
      }
  }

  if (isPC()) {
    document.getElementsByClassName('btns')[0].style.display = 'none';
  }else{
    speet = 300;
    window.document.getElementsByClassName('top-wrap')[0].addEventListener('touchstart',function () {
      snakeMove({keyCode:38});
    },false);
    window.document.getElementsByClassName('left-wrap')[0].addEventListener('touchstart',function () {
      snakeMove({keyCode:37});
    },false);
    window.document.getElementsByClassName('right-wrap')[0].addEventListener('touchstart',function () {
      snakeMove({keyCode:39});
    },false);
    window.document.getElementsByClassName('bottom-wrap')[0].addEventListener('touchstart',function () {
      snakeMove({keyCode:40});
    },false);
  }
  function init(key) {
    if(key){
      console.log("init");
      content.style.border = "2px solid green";
      right = true;
      left = false;
      top = false;
      bottom = true;
      direction = "right";
      scorenum = 0;
      //初始化一条蛇
      snake = [[2, 0, "head"], [1, 0, "body"], [0, 0, "body"]];
      score.innerText = "分数：" + scorenum;
      // clearInterval(time);
      time = window.setInterval(selfmove, speet);
      removeClass("food");
      food();
      document.addEventListener("keydown", snakeMove);
      snakeBody();
      snakeState = 1;
      //移动端
    }else{
      console.log("initclear");
      // document.onkeydown = null;
      clearInterval(time);
      document.removeEventListener("keydown", snakeMove);
      removeClass("head");
      removeClass("body");
      removeClass("food");
      snakeState = 0;
    }
  }
  return init;
}(window));
snake(true);