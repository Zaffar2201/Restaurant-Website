var lastScrollTop = 0;
var currentPos = 1;
var totalPos = 0;
var carousselFunc = [];
var scroll = true;

document.onmousemove = handleMouseMove;
function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('.caroussel', true);
  setVisible('#loading', false);
});
function handleMouseMove(event) {

    event = event || window.event;

    document.getElementById('chair').style.top = (event.pageY*0.025) +"px";
    document.getElementById('table').style.top = (event.pageY*0.05) +"px";
    document.getElementById('background').style.top = (event.pageY*0.02*-1) +"px";
    document.getElementById('chair').style.left = (event.pageX*0.0125) + "px";
    document.getElementById('table').style.left = (event.pageX*0.0250) + "px";
    document.getElementById('background').style.left = (event.pageX*0.015*-1) + "px";
}

$(document).ready(main);

function main(){   
    totalPos = $(".carousselItem").length;
    carousselIndicator();
    var to = localStorage.getItem("scroll");
    console.log(to);
    if(to != null){
        if(to != 1){
            scrollDown(to - 1);
            localStorage.removeItem("scroll");
        }
    }
    // scroll slides on mouse scroll 
    $('#caroussel').bind('mousewheel DOMMouseScroll', function(e){
        
        if(e.deltaY != undefined){
            //console.log("scroll", e.deltaY);
            if(e.deltaY > 0) {
                scrollUp(1);      
            }
            else{
               scrollDown(1);        
            }
        }
                
    });

    //scroll slides on swipe for touch enabled devices 
    $("#caroussel").on("touchstart", function(event){
 
        var yClick = event.originalEvent.touches[0].pageY;
        $(this).one("touchmove", function(event){

            var yMove = event.originalEvent.touches[0].pageY;
            if( Math.floor(yClick - yMove) > 1 ){
                scrollDown(1);
            }
            else if( Math.floor(yClick - yMove) < -1 ){
                scrollUp(1);
            }
        });

        $("#mainCarousel").on("touchend", function(){
                $(this).off("touchmove");
        });
    });

    $(".scrollDown").click(function(){
        scrollDown(1);
    });

}
    
function carousselIndicator(){
    var indicator = document.createElement("div");
    var tip = ["Home", "Goal", "Contact Details", "Menu"];
    setAttributes(indicator, {"class":"carousselIndicator", "id":"carousselIndicator"});
    document.getElementById("caroussel").appendChild(indicator);
    for(i = 0; i < totalPos; i++){
        var item = document.createElement("div");
        setAttributes(item,{"class":"carousselIndicatorItem tooltip" + (i == 0 ? " active" : ""),"id":"carousselIndicatorItem-" + (i + 1)});
        var span = document.createElement('span');
        span.innerHTML = tip[i];
        span.className = "tooltiptext";
        item.appendChild(span);
        indicator.appendChild(item);
    }

    $('.carousselIndicatorItem').click(function(){
        console.log("scrolling", currentPos);
        var to = parseInt(this.id.replace("carousselIndicatorItem-", ""));
        var times = to-currentPos;
        if(times < 0){
            scrollUp(times*-1);
        }else{
            scrollDown(times);
        }
    });
}
function scrollUp(times){
    if(scroll){
        if(currentPos > 1){
            scrollIt(1000);
            console.log("up");
            var height = $(window).height();
            var elem = $(".carousselItem");
            var indicator = $(".carousselIndicatorItem");

            for(i = 0; i < elem.length; i++){
                elem[i].style.top = parseInt(elem[i].style.top.replace("px", "") || 0) + height*times + "px";
                $(indicator[i]).removeClass("active");
            }

            currentPos -= times;
            $(indicator[currentPos - 1]).addClass("active");
            carousselFunc[currentPos]();
        }
    }
    
}

function scrollDown(times){
    if(scroll){
        if(currentPos + times == 4){
            scrollIt(5000);
            console.log("there");
            var height = $(window).height();
            var width = $(window).width();
            var elem = $(".carousselItem");
            var indicator = $(".carousselIndicatorItem");
            console.log(parseInt(elem[3].style.left.replace("px", "") || 0) + width + "px");
            elem[3].style.left = parseInt(elem[3].style.left.replace("px", "") || 0) + width + "px";
            
            setTimeout(function(){
                elem[3].style.transition = "none";
                elem[3].style.top = (height*-3) + "px";
                
                setTimeout(function(){
                    elem[3].style.transition = "top 1000ms ease-out, left 1000ms ease-out";
                    elem[3].style.left = "0px";
                    elem[currentPos - 1].style.left =  -1 * width + "px";
                    setTimeout(function(){
                        window.location.href = "menu.xml";
                    }, 1500);
                }, 1000);
            }, 1);

            for(i = 0; i < elem.length; i++){
                $(indicator[i]).removeClass("active");
            }
            
            $(indicator[3]).addClass("active");
            

        }else if(currentPos < totalPos){
            scrollIt(1000);
            console.log("down");
            var height = $(window).height();
            var elem = $(".carousselItem");
            var indicator = $(".carousselIndicatorItem");

            for(i = 0; i < elem.length; i++){
                elem[i].style.top = parseInt(elem[i].style.top.replace("px", "") || 0) - height*times + "px";
                $(indicator[i]).removeClass("active");
            }

            currentPos += times;
            $(indicator[currentPos - 1]).addClass("active");
            carousselFunc[currentPos]();
        }
    }
    

}
function scrollIt(duration){
    scroll = false;
    setTimeout(function(){
        scroll = true;
    }, duration);
}
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

carousselFunc[1] = function(){
    $("#spoonImage").removeClass("active");
    $("#descriptionCover").removeClass("active");
    $('#thirdDescription').removeClass("active");
    $('#bannerImage').removeClass("active");
}
carousselFunc[2] = function(){
    $("#spoonImage").addClass("active");
    $("#descriptionCover").addClass("active");
    $('#bannerImage').removeClass("active");
    $('#thirdDescription').removeClass("active");
}
carousselFunc[3] = function(){
    $("#spoonImage").removeClass("active");
    $("#descriptionCover").removeClass("active");
    $('#bannerImage').addClass("active");
    $('#thirdDescription').addClass("active");
}
