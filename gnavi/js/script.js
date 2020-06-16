      //ユーザーの現在の位置情報を取得
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      /***** ユーザーの現在の位置情報を取得 *****/
function successCallback(position) {
  var gl_text = "緯度：" + position.coords.latitude + "<br>";
      gl_text += "経度：" + position.coords.longitude + "<br>";
      lat = position.coords.latitude
      lon = position.coords.longitude
  document.getElementById("position_result").innerHTML = gl_text;
}

/***** 位置情報が取得できない場合 *****/
function errorCallback(error) {
  var err_msg = "";
  switch(error.code)
  {
    case 1:
      err_msg = "位置情報の利用が許可されていません";
      break;
    case 2:
      err_msg = "デバイスの位置が判定できません";
      break;
    case 3:
      err_msg = "タイムアウトしました";
      break;
  }
  document.getElementById("position_result").innerHTML = err_msg;
}

      //検索メニュースクロール
$(function() {
  var menu = $('#nav'),
  offset = menu.offset();
  $(window).scroll(function () {
    if($(window).scrollTop() > offset.top) {
      menu.addClass('fixed');
    } else {
      menu.removeClass('fixed');
    }
  });
});

      //検索条件指定
function gnaviHanni(offset, hit_per_page){
  var req = new XMLHttpRequest();
  keyid = "1cff0aeb7ea6e8be661c97d5768d2640";
  var latitude=lat
  var longitude=lon
  name = document.forms.mainform.elements['shop_name'].value
  range = document.forms.mainform.elements['range'].value
  freeword = document.forms.mainform.elements['freeword'].value
    url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${keyid}&name=${name}&latitude=${latitude}&longitude=${longitude}&range=${range}&freeword=${freeword}&offset=${offset}&hit_per_page=${hit_per_page}`
  
  req.responseType = 'json'

  req.open('GET', url, true)

      //表示関数
  req.onload = function(){
      //検索がヒットした時
  if(req.response.total_hit_count>=1){
    for(i = 0; i < hit_per_page; i++){
    //APIで取得した店の情報を表示
  document.getElementById("shops2").childNodes[i].innerHTML = `<a href = ${req.response.rest[i].url}>${req.response.rest[i].category}<br><h5><font size="+2">${req.response.rest[i].name}</font></h5><img src = ${req.response.rest[i].image_url.shop_image1} alt = "" width="175" height="127" align="left">${req.response.rest[i].address}<br>【Tel】${req.response.rest[i].tel}<br>【営業時間】${req.response.rest[i].opentime}<br>${req.response.rest[i].pr.pr_short}<br clear="left"><br></a>`
    //一覧表示
  document.getElementById("shops").childNodes[i].innerHTML = `<img src =${req.response.rest[i].image_url.shop_image1} alt = "" width="195" height="145"><br><font size="+1" color="blue">${req.response.rest[i].name}</font><br>${req.response.rest[i].access.line}${req.response.rest[i].access.station}${req.response.rest[i].access.station_exit}${req.response.rest[i].access.walk}分<br>`
      }
  }else{
      alert('データがありません');

      
  }
  };
    
  
  req.send();
    
}
