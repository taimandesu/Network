var
cursor = $(".cursor"),
poo = $(".poo"),
cWidth = 20, //カーソルの大きさ
pWidth = 10, //うんちの大きさ
mouseX = 0, //マウスのX座標
mouseY = 0; //マウスのY座標
posX = 0, //フォロワーのX座標
posY = 0; //フォロワーのX座標
screenY = 0,

windowWidth = window.innerWidth,
windowHeight = window.innerHeight,
birdSpeedX = 2.0,
birdSpeedY = 5.0,
	time = 0.0,
birdPosX = windowWidth / 2.0,
birdPosY0 = windowHeight / 5.0;

var $wrapper = document.querySelector('#js-wrapper');

requestAnimationFrame(update);


function update(){
	
	
	birdPosX += birdSpeedX;
	if(birdPosX > windowWidth || birdPosX < 0){
		birdSpeedX = -birdSpeedX;
	}
	
	time += 0.01;
	var birdPosY = birdPosY0 + Math.sin(time) * 50;
	
	cursor.css({
    left: birdPosX - (cWidth / 2),
    top: birdPosY - (cWidth / 2)
    })
	
	poo.css({
    left: birdPosX - (pWidth / 2),
    top: birdPosY + pWidth * 4
    })
	
	requestAnimationFrame(update);
}

var $cloneItem = document.querySelector('.poo'); //クローン元っぽい

$(document).on('click', function(){
  const $clone = $cloneItem.cloneNode(true);

  $wrapper.appendChild($clone);

    TweenMax.to($clone, 2, {top:windowHeight - 100});
    TweenMax.to($clone, 0.5, {alpha:1});

    console.log($clone)

});

/*
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

  $(document).on('click', function(){
    //var $clone = poo.cloneNode(true);
    //poo.appendChild($clone);
    TweenMax.to(poo, 2, {top:'500px'});
  });


});
*/


  //var $clone = $poo.cloneNode(true);
  //poo.appendChild($clone);
  //の部分が起動させられず困ってます。

