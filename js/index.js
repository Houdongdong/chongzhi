(function(){

var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

s=window.innerHeight/500;
ss=250*(1-s);

$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 4) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
})

//$(document).swipeLeft(function(){
//	if (isAnimating) return;
//	last.row = now.row;
//	last.col = now.col;
//	if (last.row>1 && last.row<5 && last.col==1) { now.row = last.row; now.col = 2; pageMove(towards.left);}	
//})
//
//$(document).swipeRight(function(){
//	if (isAnimating) return;
//	last.row = now.row;
//	last.col = now.col;
//	if (last.row>1 && last.row<5 && last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}	
//})

function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		nowPage = ".page-"+now.row+"-"+now.col;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}

	 $(document).on('focus','.textarea',function(){
        var val = $(this).val();
        if(val == '写出你和TA当年拉过勾的约定'){
          $(this).val("");
        }
    })
  $(document).on('blur','.textarea',function(){
          var val = $(this).val();
          if(!val){
            $(this).val("写出你和TA当年拉过勾的约定");
          }
      })	

})();
//ping
var pop_up_note_mode = true;
        var note_id = 1;

        function $$(name) {
            return document.getElementById(name);
        }
        function switchsound() {
            au = $$('bgsound');
            ai = $$('sound_image');
            if (au.paused) {
                au.play();
                ai.src = "img/music_note_big.png";
                pop_up_note_mode = true;
                popup_note();
                $$("music_txt").innerHTML = "打开";
                $$("music_txt").style.visibility = "visible";
                setTimeout(function () { $$("music_txt").style.visibility = "hidden" }, 2500);
            }
            else {
                pop_up_note_mode = false;
                au.pause();
                ai.src = "img/music_note_big.png";
                $$("music_txt").innerHTML = "关闭";
                $$("music_txt").style.visibility = "visible";
                setTimeout(function () { $$("music_txt").style.visibility = "hidden" }, 2500);
            }
        }

        function on_pop_note_end(event) {
            note = event.target;

            if (note.parentNode == $$("note_box")) {
                $$("note_box").removeChild(note);
             }
        }

        function popup_note() {
            box = $$("note_box");

            note = document.createElement("span");
            note.style.cssText = "visibility:visible;position:absolute;background-image:url('img/music_note_small.png');width:15px;height:25px";
            note.style.left = Math.random() * 20 + 20;
            note.style.top = "75px";
            this_node = "music_note_" + note_id;
            note.setAttribute("ID", this_node);
            note_id += 1;
            scale = Math.random() * 0.4 + 0.4;
            note.style.webkitTransform = "rotate(" + Math.floor(360 * Math.random()) + "deg) scale(" + scale + "," + scale + ")";
            note.style.webkitTransition = "top 2s ease-in, opacity 2s ease-in, left 2s ease-in";
            note.addEventListener("webkitTransitionEnd", on_pop_note_end);
            box.appendChild(note);

            setTimeout("document.getElementById('" + this_node + "').style.left = '0px';", 100);
            setTimeout("document.getElementById('" + this_node + "').style.top = '0px';", 100);
            setTimeout("document.getElementById('" + this_node + "').style.opacity = '0';", 100);

            if (pop_up_note_mode) {
                setTimeout("popup_note()", 600);
            }
        }    
        // 选择背景图片   
        function changebgFn (){
        	var _this = $(this);
        	$(document).on("touchend",".tab-nav a",function(){
                var bgId = $(this).attr("munber");
        		$(".tab-nav a").removeClass("on");	
        		$(this).addClass("on");
        		var url = $(this).attr("bgurl");
        		$(".page-4-1").css("background-image", "url("+url+")");
                $("input[name=bg_id]").val(bgId);
        	})
        }
        // 上传图片
		function uoloadImg(){
		 $('input[name="uploadImg"]').on('change', function () {
                if (typeof this.files == 'undefined') {
                    return;
                }
                var img = this.files[0];//获取图片信息
                var type = img.type;//获取图片类型，判断使用
                var url = getObjectURL(this.files[0]);//使用自定义函数，获取图片本地url
                var fd = new FormData();//实例化表单，提交数据使用
                fd.append('img', img);//将img追加进去
                if (url)
                    $('#uplad-img').attr('src', url).show();//展示图片
                    var imgWidth = $('#uplad-img').width();
                    $('#uplad-img').css({"height":imgWidth});
                    console.log(imgWidth); 
                if (type.substr(0, 5) != 'image') {//无效的类型过滤
                    alert('非图片类型，无法上传！');
                    return;
                }
                //开始ajax请求，后台用的tp
                $.ajax({
                    type: 'post',
                    url: 'js/json/upload.json',
                    data: fd,
                    processData: false, // tell jQuery not to process the data  ，这个是必须的，否则会报错
                    contentType: false, // tell jQuery not to set contentType  
                    dataType: 'text',
                    xhr: function () {//这个是重点，获取到原始的xhr对象，进而绑定upload.onprogress
                        var xhr = $.ajaxSettings.xhr();
                        xhr.upload.onprogress = function (ev) {
                            //这边开始计算百分比
                            var parcent = 0;
                            if (ev.lengthComputable) {
                                percent = 100 * ev.loaded / ev.total;
                                percent = parseFloat(percent).toFixed(2);
                                $('.bgpro').css('width', percent + '%').html(percent + '%');
                            }
                        };
                        return xhr;
                    },
                });

            });
		}
        //自定义获取图片路径函数
        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }