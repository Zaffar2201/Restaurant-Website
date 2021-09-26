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
    setVisible('.page', true);
    setVisible('#loading', false);
    main();
});

function moveRight(){
	var width = $(window).width();
	var right = document.getElementById('right');
	var left = document.getElementById('left');
	right.style.left = "0px";
	left.style.left = width*-1 + "px";
}

function moveLeft(){
    var width = $(window).width();
    var right = document.getElementById('right');
    var left = document.getElementById('left');
    left.style.left = "0px";
    right.style.left = width + "px";
}

function main(){
    console.log("ready");
    carousselIndicator();
    $(".section").click(function(){
        document.getElementById("right").scrollTo(0, 0);
        var elem = $(this)[0].children;
        var parent = document.getElementById('rightContent');
        parent.innerHTML = "";

        document.getElementById("rightImage").src=elem[0].getAttribute('src');

        var bottom = $(elem[1])[0].children;
        document.getElementById("rightTitle").innerHTML= treatString(bottom[0].textContent);

        var image = elem[2].getAttribute('img').split(' ');
        document.getElementById("rightImage1").src = "res/" + image[0] + ".jpg";
        document.getElementById("rightImage2").src = "res/" + image[1] + ".jpg";
        console.log(image);

        var child = $(elem[3])[0].children;

        for (var i = 0; i < child.length; i++) {
            var child1 = child[i].children;

            var rightSection = document.createElement('div');
            rightSection.className = "rightSection";

            var rightSectionTitle = document.createElement('div');
            rightSectionTitle.className = "rightSectionTitle";
            rightSectionTitle.innerHTML = treatString(child1[0].innerHTML);

            var rightSectionDesription = document.createElement('div');
            rightSectionDesription.className = "rightSectionDesription";  
            rightSectionDesription.innerHTML = treatString(child1[1].innerHTML);  

            var rightSectionPrice = document.createElement('div');
            rightSectionPrice.className = "rightSectionPrice"; 
            rightSectionPrice.innerHTML = treatString(child1[2].innerHTML); 

            rightSection.appendChild(rightSectionTitle);
            rightSection.appendChild(rightSectionDesription);
            rightSection.appendChild(rightSectionPrice);
            parent.appendChild(rightSection);
        }

        var rightSection = document.createElement('div');
        rightSection.className = "rightSection";

        var rightSectionTitle = document.createElement('div');
        rightSectionTitle.className = "rightSectionTitle";
        rightSectionTitle.innerHTML = "Back";
        rightSection.id="back";

        rightSection.appendChild(rightSectionTitle);
        parent.appendChild(rightSection);
        var height = (document.getElementById("rightImage").offsetHeight - 80) + "px";
        document.getElementById("rightCaroussel").style.height = height;
        $(".rightCarousselImage").each(function(i, val){
            val.style.height = height;
        });

        $("#back").unbind().click(function(){
            console.log("back");
            document.getElementById("left").scrollTo(0, 0);
            moveLeft();
        });
        moveRight();
    });

    setHeight();
}

function carousselIndicator(){
    var indicator = document.createElement("div");
    var tip = ["Home", "Goal", "Contact Details", "Menu"];
    setAttributes(indicator, {"class":"carousselIndicator", "id":"carousselIndicator"});
    document.getElementById("page").appendChild(indicator);
    for(i = 0; i < 4; i++){
        console.log(i);
        var item = document.createElement("div");
        setAttributes(item,{"class":"carousselIndicatorItem tooltip" + (i == 4 ? " active" : ""),"id":"carousselIndicatorItem-" + (i + 1)});
        var span = document.createElement('span');
        span.innerHTML = tip[i];
        span.className = "tooltiptext";
        item.appendChild(span);
        indicator.appendChild(item);
    }
    console.log("done");

    $('.carousselIndicatorItem').click(function(){
        var to = parseInt(this.id.replace("carousselIndicatorItem-", ""));
        if(to != 4){
            window.location.href = "index.html";
            localStorage.setItem("scroll",to);
        }
    });
}

function treatString(input){
    var spl = input.split(" ");
    var ret = ""
    for(i = 0; i < spl.length; i++){
        spl[i] = spl[i].toLowerCase();
        ret += spl[i].charAt(0).toString().toUpperCase() + spl[i].substring(1, spl[i].length) + " ";
    }
    return ret; 
}

function setHeight(){
    var max = 0;
    var top = 0;
    var elem = $(".section");
    var title = $(".sectionBottom");
    for (var i = 0; i < elem.length; i++) {
        max = elem[i].offsetHeight > max ? elem[i].offsetHeight : max;
        top = title[i].offsetTop > top ? title[i].offsetTop : top;
    }
    for (var i = 0; i < elem.length; i++) {
        elem[i].style.height = max + "px";
        title[i].style.top = (top - title[i].offsetTop)+ "px";
    }
}
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
