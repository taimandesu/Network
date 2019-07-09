var
cursor = $(".cursor"),
poo = $("#poo"),
cWidth = 20, //カーソルの大きさ
pWidth = 10, //うんちの大きさ
mouseX = 0, //マウスのX座標
mouseY = 0; //マウスのY座標
posX = 0, //フォロワーのX座標
posY = 0; //フォロワーのX座標

$(document).on('mousemove', function(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  cursor.css({
    //カーソルの真ん中に座標軸が来るよう、
    //カーソルの大きさの半分を引きます
    left: mouseX - (cWidth / 2),
    top: mouseY - (cWidth / 2)
  })
  poo.css({
    //カーソルの真ん中に座標軸が来るよう、
    //カーソルの大きさの半分を引きます
    left: mouseX - (pWidth / 2),
    top: mouseY - (pWidth / 2)
  })
});


$(document).on('click', function(){
  TweenMax.to('#poo', 2, {bottom:'0px'});
});