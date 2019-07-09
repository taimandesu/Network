<!-- https://greensock.com/gsap -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js"></script>
$ npm install gsap
import 'gsap/TweenMax';

// 増殖させるボタン
var $btn = document.querySelector('#js-btn');

// 増殖する場所
var $wrapper = document.querySelector('#js-wrapper');

// 増殖用の画像
var $originalItem = document.querySelectorAll('.original__item');


// 増殖アニメーション用のイージング
// https://greensock.com/ease-visualizer
var easingName = [
  'Back.easeInOut.config(1.7)',
  'Elastic.easeInOut.config(1, 0.3)',
  'Bounce.easeInOut',
  'ease: Circ.easeInOut'
];


$btn.addEventListener('click', function() {
  
  // ランダムで１つ、要素が選ばれて複製する
  const randNum = Math.floor(Math.random() * $originalItem.length);
  const $clone = $originalItem[ randNum ].cloneNode(true);
  
  // 要素を挿入する
  $wrapper.appendChild($clone);
  
  // 要素を拡散する
  // ---------------------------------------------------------------
  var expandAnime = {
    x: Math.floor(Math.random() * window.innerWidth - window.innerWidth / 2),
    y: Math.floor(Math.random() * window.innerHeight - window.innerHeight / 2),
    rotation: Math.floor(Math.random() * 720 - 360),
    scale: 0.2 + Math.random(),
    duration: 0.5 + Math.random() * 2.0,
    ease : easingName[Math.floor(Math.random() * easingName.length)]
  };
  
  TweenMax.to($clone, expandAnime.duration, {
    x: expandAnime.x,
    y: expandAnime.y,
    rotation: expandAnime.rotation,
    ease: expandAnime.ease,
    scale: expandAnime.scale
  });
  
  return false;
});