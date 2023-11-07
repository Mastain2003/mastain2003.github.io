"use strict";
var POSTOBJECT;
var USERNAME;
Object.prototype.empty=function(){
	while(this.firstChild)
		this.removeChild(this.firstChild);
	return this;
}
Object.prototype.attachEventType=function(evt,func){
	if(document.body.addEventListener)
		this.addEventListener(evt,func);
	else
		this.attachEvent(evt,func);
	return this;
}
Object.prototype.removeEventType=function(evt,func){
	if(document.body.addEventListener)
		this.removeEventListener(evt,func);
	else
		this.detachEvent(evt,func);
	return this;
}
var lamps,contentBox,switches,coins,win,dispCoins,hoverHiddenCoins,light,hoverCoins,images;
/*window.attachEventType("contextmenu",function(e){
	//e.preventDefault(); /to prevent right click
})*/
window.attachEventType("load",function() {
    lamps = document.getElementsByClassName('lamp');
    contentBox = document.getElementById("mainContentBox");
    switches = document.getElementsByClassName("lightSwitches");
    coins = document.getElementsByClassName("coin");
    win = document.getElementsByClassName("coinPopUp");
    dispCoins = document.getElementsByClassName("dispCoin");
    hoverHiddenCoins = document.getElementsByClassName("hoverHiddenCoin");
    light = document.getElementsByClassName("content");
    hoverCoins = document.getElementsByClassName("hoverCoin");
    images = document.images;

    checkcooki();
    offSwitch(document.getElementById('switch'));

    document.getElementById('switch').attachEventType("click", function() {
    	console.log("clicked");
    	setTimeout(function(){
    		document.getElementById('lightOff').style.display='none';
    		switchOnLamp(lamps[1]);
		},800)
	})
    var i,len;

    len = images.length;
    for (i = 0; i < len; i++) {
    	images[i].attachEventType("contextmenu",function(e){e.preventDefault()});
        images[i].attachEventType("load", imagload);
    }

	//function for coin clicking
	len = coins.length;
	for (i = 0; i < len; i++) {
		coins[i].attachEventType("click", function(event) {
			event.stopPropagation();
			var action = this.getAttribute('action');
			if(action === "window")
				onClickCoin(this);
			else if(action === "ref") {
				var coinRef = document.getElementById(this.getAttribute("coinRef"));
				switchOffLamp(coinRef);
				setTimeout(function(){
					switchOnLamp(coinRef);
				}, 1)
				var element = this;
				var arr = element.className.split(" ");
				while(arr[0]!=="content") {	
					element = element.parentElement;
					arr = element.className.split(" ");
				}
				switchOffLamp(document.getElementsByClassName(element.className.split(" ")[1])[0].firstElementChild);
			}
		})
	}
	if(screen.width>360){
		len = hoverCoins.length;
		for (i = 0; i < len ; i++) {
			hoverCoins[i].attachEventType("mouseover",function() {
				document.getElementsByClassName(findPopUpClass(this))[2].querySelector(".lightHiddenContentShadowContainer").style.display = "block";
			});

			hoverCoins[i].attachEventType("mouseout",function() {
				document.getElementsByClassName(findPopUpClass(this))[2].querySelector(".lightHiddenContentShadowContainer").style.display = "none";
			});
		}

		len = dispCoins.length;
		for (i = 0; i < len; i++) {
			dispCoins[i].attachEventType("mouseover", function() {
				this.style.transform = "rotateX(30deg) rotateY(180deg)";
				this.style.oTransform = "rotateX(30deg) rotateY(180deg)";
				this.style.webkitTransform = "rotateX(30deg) rotateY(180deg)";
				this.style.msTransform = "rotateX(30deg) rotateY(180deg)";
				this.style.mozTransform = "rotateX(30deg) rotateY(180deg)";
				this.querySelector("div.coinBack").style.borderColor = "#1ba003";
				document.querySelector('[shadowRef=' + this.id + ']').style.transform = "rotateX(3deg) rotateY(180deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.oTransform = "rotateX(3deg) rotateY(180deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.webkitTransform = "rotateX(3deg) rotateY(180deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.msTransform = "rotateX(3deg) rotateY(180deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.mozTransform = "rotateX(3deg) rotateY(180deg)";
			})

			dispCoins[i].attachEventType("mouseout", function() {
				this.style.transform = "rotateX(30deg)";
				this.style.oTransform = "rotateX(30deg)";
				this.style.webkitTransform = "rotateX(30deg)";
				this.style.msTransform = "rotateX(30deg)";
				this.style.mozTransform = "rotateX(30deg)";
				this.querySelector("div.coinBack").style.borderColor = "cyan";
				document.querySelector('[shadowRef=' + this.id +']').style.transform = "rotateX(3deg)";
				document.querySelector('[shadowRef=' + this.id +']').style.oTransform = "rotateX(3deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.webkitTransform = "rotateX(3deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.msTransform = "rotateX(3deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.mozTransform = "rotateX(3deg)";
			})
		}

		len = hoverHiddenCoins.length;
		for (i = 0; i < len; i++) {
			hoverHiddenCoins[i].attachEventType("mouseover", function() {
				this.style.transform = "rotateY(360deg)";
				this.style.oTransform = "rotateY(360deg)";
				this.style.webkitTransform = "rotateY(360deg)";
				this.style.msTransform = "rotateY(360deg)";
				this.style.mozTransform = "rotateY(360deg)";
				this.querySelector("div.coinBack").style.borderColor = "#1ba003";
				document.querySelector('[shadowRef=' + this.id + ']').style.transform = "rotateY(360deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.oTransform = "rotateY(360deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.webkitTransform = "rotateY(360deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.msTransform = "rotateY(360deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.mozTransform = "rotateY(360deg)";
			})

			hoverHiddenCoins[i].attachEventType("mouseout", function() {
				this.style.transform = "rotateY(180deg)";
				this.style.oTransform = "rotateY(180deg)";
				this.style.webkitTransform = "rotateY(180deg)";
				this.style.msTransform = "rotateY(180deg)";
				this.style.mozTransform = "rotateY(180deg)";
				this.querySelector("div.coinBack").style.borderColor = "cyan";
				document.querySelector('[shadowRef=' + this.id + ']').style.transform = "rotateY(180deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.oTransform = "rotateY(180deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.webkitTransform = "rotateY(180deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.msTransform = "rotateY(180deg)";
				document.querySelector('[shadowRef=' + this.id + ']').style.mozTransform = "rotateY(180deg)";
			})
		}
	}
})
function addAjaxEventHandlers() {
	var linkPanelHead = document.getElementsByClassName("linkPanelHead");
	var hoverContent = document.getElementsByClassName("contentShowOnHover"); 
	var win = document.getElementsByClassName("hoverWindow");
	var formButton = document.getElementById("feedbackSubmitButton");
	var albums = document.getElementsByClassName("album");
	var images = document.getElementsByTagName("img");
	var fullWindows = document.getElementsByClassName("fullWindow");
	var inputFields=document.getElementsByClassName("feedbackInputField");
	var len,i;

	len = inputFields.length;
	for(i=0;i<len;++i)inputFields[i].attachEventType("focus",function(){document.getElementById("errorField").parentElement.parentElement.style.display="none"});

	len = images.length;
	for (i = 0; i < len; i++) {
		images[i].attachEventType("contextmenu",function(e){e.preventDefault()});
		images[i].attachEventType("load", imagload);
	}

	len = hoverContent.length;
	for (i = 0; i < len; i++) {
		hoverContent[i].attachEventType("mouseenter", showWindowBluePrint); 			//////////desktop/////////
		hoverContent[i].attachEventType("mouseleave", hideWindowBluePrint);

		hoverContent[i].addEventListener("touchstart",showWindowBluePrint);				/////////mobile//////////
		hoverContent[i].addEventListener("touchend",hideWindowBluePrint);

		hoverContent[i].attachEventType("click", function(){
			contentBudgeClicked(this);
		})
	}

	if(win.length) {
		len = win.length;
		for (i = 0; i < len; i++) {
			win[i].attachEventType("mouseleave", hideWindowBluePrint);					
			win[i].attachEventType("click", function() {
				contentBudgeClicked(document.getElementById(this.getAttribute('winsrc')));
			});
		}
	}
 
    len = linkPanelHead.length
	for (i = 0; i < len; i++) {
		var temp = linkPanelHead[i].nextElementSibling;
		temp.style.height = "0px";//temp.firstElementChild.clientHeight+"px";     Default value
		linkPanelHead[i].lastElementChild.empty().appendChild(document.createTextNode("\u25bc")); //default value
		linkPanelHead[i].attachEventType("click", function() {
			var linkPanel = this.nextElementSibling;
			var height = linkPanel.clientHeight;   //because auto height is not working in transition
			var style = getComputedStyle(this);
			
			if(height) {
				linkPanel.style.height = "0px";
				this.lastElementChild.empty().appendChild(document.createTextNode("\u25bc"));
			}
			else {
				linkPanel.style.height = linkPanel.firstElementChild.clientHeight + "px";
				this.lastElementChild.empty().appendChild(document.createTextNode("\u25b2"));
				var rect = this.getBoundingClientRect();
				var parent = getScrollParent(this, true);
				var rectParent = parent.getBoundingClientRect();
				var offset = linkPanel.firstElementChild.clientHeight;
				
				//show bug when scroleble parent height is changing
				if(rectParent.bottom < ( rect.bottom + offset )){
					parent.scrollTop += (rect.top - rectParent.top - 50);
				}			
			}
		});
	}

	if(formButton)
		formButton.attachEventType("click", feedbackSubmit);

	len = albums.length
	for (i = 0; i < len; i++) {
		albums[i].attachEventType("click", function(){
   			var fullWindow = this.parentElement.parentElement.parentElement.lastElementChild;// nextElementSibling;
   			var id = this.id;
   			if(fullWindow.getAttribute('winsrc') !== id){
   				var xhttp = new XMLHttpRequest();
   				xhttp.onreadystatechange = function(){
   					if(this.readyState == 4 && this.status == 200){
   						var data = xhttp.responseXML;
   						var album = data.getElementById(id);
   						POSTOBJECT = new FullWindowPosts(album.lastElementChild.children);
   						POSTOBJECT.box = fullWindow.querySelector(".postContent");
   						POSTOBJECT.moveFunc = showImages;
   						POSTOBJECT.box.firstElementChild.empty().appendChild(album.firstElementChild.firstChild.cloneNode(true));
   						showPost();
   					}
   				}
   				xhttp.open('get', 'album.xml');
   				xhttp.send();
   			}
   			fullWindow.setAttribute('winsrc', id);
   			fullWindow.tabIndex = -1;
   			fullWindow.focus();
   			fullWindow.style.transform = "scale(1)";
   			fullWindow.style.oTransform = "scale(1)";
   			fullWindow.style.mozTransform = "scale(1)";
   			fullWindow.style.msTransform = "scale(1)";
   			fullWindow.style.webkitTransform = "scale(1)";
		})
	}

	len = fullWindows.length
	for (i = 0; i < len; i++) {
		var x1=0,x2=0,y1=0,y2=0;
		fullWindows[i].attachEventType("keydown",function(e){
			var code = e.keyCode;
			if(code == 39){
				showPost('next');
			}
			else if(code == 37){
				showPost('prev');
			}
			else if(code == 40){
				this.querySelector(".postContent").scrollTop+=5;
			}
			else if(code == 38){
				this.querySelector(".postContent").scrollTop-=5;
			}
		})
		fullWindows[i].addEventListener("touchstart",function(e){
			var obj = e.changedTouches[0];
			x1= obj.clientX;
			y1= obj.clientY;
		});
		fullWindows[i].addEventListener("touchend",function(e){
			var obj = e.changedTouches[0];
			x2= obj.clientX;
			y2= obj.clientY;
			if(Math.abs(x2-x1)>Math.abs(y2-y1)){
				if(x2>x1){
					showPost('prev');
				}
				else{
					showPost('next');
				}
			}
		});
	}
}
function checkcooki() {
	USERNAME = getCooki("username");
	if(USERNAME == "") {
		USERNAME = prompt("Please Enter Your name");
		while( !USERNAME || USERNAME.trim() == "") {
			USERNAME = prompt("Your Name is required for Your better experience.<br/>Please Enter Your Name");
		}
		USERNAME = ( " " + USERNAME + " " ).toLocaleLowerCase().replace(/ [a-z]/gi, function myFunction(x){return x.toLocaleUpperCase()}).trim();
		setCooki("username", USERNAME,7);
		customAlert("<b>Hi " + USERNAME + ",</b><br/>Welcome as a Guest in my Blog cum Room.<br/>Room will be best visible in Chrome Desktop/Laptop.<br/>Please switch on the light to view and also remember to switch off all the lights before leaving my room.<br/><span style='color:green;'><b>SAVE ENERGY SAVE FUTURE</b></span>");
	}
	else{
		customAlert("<b>Hi " + USERNAME + ",</b><br/>Welcome once again in my Room.<br/>Room will be best visible in Chrome Desktop/Laptop.<br/>Please switch on the light to view and also remember to switch off all the lights before leaving my room.<br/><span style='color:green;'><b>SAVE ENERGY SAVE FUTURE</b></span>");
	}
	document.getElementById("visitorNo").firstElementChild.querySelector("span").textContent = USERNAME.trim();
	var lightSwitch = document.getElementById("switch");
	lightSwitch.style.display = "block";
	lightSwitch.previousElementSibling.style.opacity = "0.98";
	lightSwitch.previousElementSibling.style.filter = "Alpha(opacity=98)";
}

function getCooki(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0) === " "){
			c = c.substring(1);
		}
		if(c.indexOf(name) === 0){
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setCooki(cname,cvalue,cexpiryInDays) {
	var d = new Date();
	d.setTime(d.getTime() + ( cexpiryInDays * 24 * 60 * 60 * 1000 ));
	var expire = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expire;
}

function onSwitch(element){
	element.querySelector("input").checked = true;
}
function offSwitch(element){
	element.querySelector("input").checked = false;
}
function imagload() {
	var item = this;
	var res = this.src.split("_");
	var imgName = res[0];
	var imgFinal = new Image();
	if(res[1]) {
		res = res[1].split(".");
		imgFinal.src = imgName + "." + res[1];
		if(res[0] == "low"){
			var imgMediam = new Image();
			imgMediam.src = imgName + "_mediam." + res[1];
			imgMediam.onload = function() {
			    item.src = this.src;
			}
		}
		imgFinal.onload = function() {
			item.src = this.src;
		}
	}
}

function FullWindowPosts(arr) {
	this.post = [];
	this.index = 0;
	this.addPost = function(element) {
		this.post.push(element);
	};
	this.next = function() {
		this.index = ( this.index + 1) % this.post.length;
	};
	this.prev = function() {
		this.index = ( this.index - 1 + this.post.length ) % this.post.length;
	};
	this.getIndexedPost = function() {
		return this.post[this.index];
	};
	var i;
	var len = arr.length; 
	for (i= 0; i < len; i++)
	    this.addPost(arr[i]);
}

//switch on lamp
function switchOnLamp(lamp) {
	var i;
	var len = lamps.length;
	for (i = 0; i < len; i++) {
		switchOffLamp(lamps[i]);
	}
	var c = lamp.lastElementChild;
	c.firstElementChild.firstElementChild.style.backgroundImage = "radial-gradient(closest-corner at 50% 80%, gray 10%, #43210a)";
	c.firstElementChild.firstElementChild.style.backgroundImage = "-moz-radial-gradient(closest-corner at 50% 80%, gray 10%, #43210a)";
	c.firstElementChild.firstElementChild.style.backgroundImage = "-webkit-radial-gradient(closest-corner at 50% 80%, gray 10%, #43210a)";
	c.firstElementChild.firstElementChild.style.backgroundImage = "-oradial-gradient(closest-corner at 50% 80%, gray 10%, #43210a)";
	var b = c.lastElementChild;
	b.style.backgroundImage = "linear-gradient(to top, lightgray 10%, gray)";
	b.style.backgroundImage = "-o-linear-gradient(to top, lightgray 10%, gray)";
	b.style.backgroundImage = "-moz-linear-gradient(to top, lightgray 10%, gray)";
	b.style.backgroundImage = "-webkit-linear-gradient(to top, lightgray 10%, gray)";
	b.style.borderBottom = "none";
	b.lastElementChild.style.backgroundColor = "white";
	b.lastElementChild.style.boxShadow = "0 0 50px 10px white";
	b.lastElementChild.style.webkitBoxShadow = "0 0 50px 10px white";
	b.lastElementChild.style.mozBoxShadow = "0 0 50px 10px white";
	lamp.nextElementSibling.style.display = "block";
	var lampName = lamp.parentElement.className.split(" ")[1];
	document.getElementsByClassName(lampName)[2].style.display = "block";
	contentBox.querySelector("." + lampName).style.display = "block";
	lamp.setAttribute("status", "on");
	document.documentElement.querySelector("input[lampRef='"+lamp.id+"']").checked=true;
	lampsOpacity(lamps);
}

//switch off lamp
function switchOffLamp(lamp) {
	var c = lamp.lastElementChild;
	c.firstElementChild.firstElementChild.style.backgroundImage = "linear-gradient(to left, #43210a, #864313, #43210a)";
	c.firstElementChild.firstElementChild.style.backgroundImage = "-o-linear-gradient(to left, #43210a, #864313, #43210a)";
	c.firstElementChild.firstElementChild.style.backgroundImage = "-moz-linear-gradient(to left, #43210a, #864313, #43210a)";
	c.firstElementChild.firstElementChild.style.backgroundImage = "-webkit-linear-gradient(to left, #43210a, #864313, #43210a)";
	var b = c.lastElementChild;
	b.style.backgroundImage = "none";
	b.style.borderBottom = "2px solid white";
	b.lastElementChild.style.backgroundColor = "transparent";
	b.lastElementChild.style.boxShadow = "none";
	lamp.nextElementSibling.style.display = "none";
	var lampName = lamp.parentElement.className.split(" ")[1];
	document.getElementsByClassName(lampName)[2].style.display = "none";
	document.getElementById(lampName + "PopUp").style.display = "none";
	contentBox.querySelector("." + lampName).style.display = "none";
	lamp.setAttribute("status", "off");
	document.documentElement.querySelector("input[lampRef='" + lamp.id + "']").checked = false;
	lampsOpacity(lamps);
}

function lampsOpacity(lamps) {
	var opac = [
				 lamps[0].getAttribute("status"),
				 lamps[1].getAttribute("status"),
				 lamps[2].getAttribute("status")
				]
	var lampShadowContainer = document.getElementById("lampShadowContainer");
	lampShadowContainer.empty();

	var lampShadow = document.createElement("div");
	var img = document.createElement("img");
	img.src = "img/center.jpg";
	img.style.width = "100%";
	img.style.height = "100%";
	lampShadow.appendChild(img);
	lampShadow.className = "lampShadow";
	lampShadow.style.width = screen.width>360?"50%":"57.8%";

	if(opac[2] === "on") {
		lamps[0].style.opacity = "0.3";
		lamps[0].style.filter = "Alpha(opacity=30)";
		lamps[1].style.opacity = "0.5";
		lamps[1].style.filter = "Alpha(opacity=50)";
		lamps[2].style.opacity = "1";
		lamps[2].style.filter = "Alpha(opacity=100)";
		lampShadow.style.left = screen.width>360?"58.8%":"55.8%";
		lampShadowContainer.appendChild(lampShadow);
	}
	else if(opac[1] === "on") {
		lamps[0].style.opacity = "0.5";
		lamps[0].style.filter = "Alpha(opacity=50)";
		lamps[1].style.opacity = "1";
		lamps[1].style.filter = "Alpha(opacity=100)";
		lamps[2].style.opacity = "0.5";
		lamps[2].style.filter = "Alpha(opacity=50)";
		lampShadow.style.left = screen.width>360?"25.5%":"22.1%";
		lampShadowContainer.appendChild(lampShadow);
	}
	else if(opac[0] === "on") {
		lamps[0].style.opacity = "1";
		lamps[0].style.filter = "Alpha(opacity=100)";
		lamps[1].style.opacity = "0.5";
		lamps[1].style.filter = "Alpha(opacity=50)";
		lamps[2].style.opacity = "0.3";
		lamps[2].style.filter = "Alpha(opacity=30)";
		lampShadow.style.left = screen.width>360?"-7.9%":"-11.8%";
		lampShadowContainer.appendChild(lampShadow);
	}
	else{
		lamps[0].style.opacity = "0.1";
		lamps[0].style.filter = "Alpha(opacity=10)";
		lamps[1].style.opacity = "0.1";
		lamps[1].style.filter = "Alpha(opacity=10)";
		lamps[2].style.opacity = "0.1";
		lamps[2].style.filter = "Alpha(opacity=10)";
	}
}

function onClickCoin(element) {
	event.stopPropagation();
	var windowClass = findPopUpClass(element);
	var popup = document.getElementById(windowClass + "PopUp");

	if(popup.getAttribute("status") === "unloaded"){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var data = xhttp.responseXML;
				var xpath = "data/window[@name='" + windowClass + "']";
				var nodes = data.evaluate(xpath, data, null, XPathResult.ANY_TYPE, null);
				var result  = nodes.iterateNext();
				var links = result.lastElementChild.children;
				var ul = popup.querySelector("ul");
				var content = popup.querySelector(".coinPopUpRightPart");
				var temp1 = popup.lastElementChild.firstElementChild.firstElementChild;
				temp1.firstElementChild.innerHTML = result.firstElementChild.innerHTML;
				temp1.lastElementChild.appendChild(result.firstElementChild.nextElementSibling.firstElementChild);
				ul.empty();
				var len = links.length;
				for (var i = 0; i < len; i++) {
					var linkhref = links[i].firstElementChild;
					var newnode = document.createElement("li");
					newnode.setAttribute("onclick", "linkClicked(this)");
					newnode.appendChild(linkhref.firstElementChild);
					var sublinksContainer = linkhref.querySelectorAll("sublinks");
					if(sublinksContainer.length){
						var sublinks = sublinksContainer[0].children;
						var sublist = document.createElement("ul");
						for (var j = 0; j < sublinks.length; j++) {
							var newlistItem = document.createElement("li");
							newlistItem.appendChild(sublinks[j].firstElementChild.firstElementChild);
							newlistItem.className = "contentLink";
							newlistItem.setAttribute("onclick","linkClicked(this)");
							newlistItem.setAttribute("href", sublinks[j].getAttribute("id"));
							sublist.appendChild(newlistItem);
						}
						newnode.appendChild(sublist);
					}
					newnode.className = "contentLink";
					newnode.setAttribute("href", links[i].getAttribute("id"));
					ul.appendChild(newnode);
				}
				popup.setAttribute("status","loaded");
				linkClicked(document.documentElement.querySelector("[href='" + element.id + "Link']"));
			}
		}
		xhttp.open("GET", "data.xml");
		xhttp.send();
	}
	else{
		linkClicked(document.documentElement.querySelector("[href='" + element.id + "Link']"));
	}
	popup.style.display = "block";
	popup.querySelector(".lightSwitchCheckBOx").checked = true;
}

function findPopUpClass(element) {
	var arr = element.className.split(" ");
	while(arr[0] !== "content") {	
		element = element.parentElement;
		arr = element.className.split(" ");
	}
	return arr[1];
}

function closePopUp(element) {
	setTimeout(function() {
		element.parentElement.parentElement.parentElement.parentElement.style.display = "none";
	}, 250)
}

function closeParent(element) {
	element.parentElement.style.transform = "scale(0)";
	element.parentElement.style.oTransform = "scale(0)";
	element.parentElement.style.mozTransform = "scale(0)";
	element.parentElement.style.msTransform = "scale(0)";
	element.parentElement.style.webkitTransform = "scale(0)";
}

function lightSwitchClicked(index) {
	console.log(Notification.permission);
	if('Notification' in window && navigator.serviceWorker &&Notification.permission=='default'){
		console.log(Notification.permission)
		Notification.requestPermission(function(status){
			if(status=='granted') 
				displayNotification("Thank You","Your request for notification has been accepted, Now you wiil get all important notification regarding updates and latest content from This blog","img/defaults/handShake/handShake@405.png")
		})
	}
	lampSwitch(lamps[parseInt(index)]);
}

function lampSwitch(lamp) {
	lamp.getAttribute("status") === "off" ? switchOnLamp(lamp) : switchOffLamp(lamp);
}

function linkClicked(element) {
	event.stopPropagation();
	var id = element.getAttribute("href");
	var arr = element.className.split(" ");
	while(arr[0] !== "coinPopUp"){	
		element = element.parentElement;
		arr = element.className.split(" ");
	}
	var win = element.querySelector(".fullWindow");
	if(win){
		win.style.transform = "scale(0)";
		win.style.oTransform = "scale(0)";
		win.style.msTransform = "scale(0)";
		win.style.mozTransform = "scale(0)";
		win.style.webkitTransform = "scale(0)";
		
	}
	var content = element.querySelector(".coinPopUpRightPart");
	if(!content.hasAttribute("srcLink") || content.getAttribute('srcLink') != id ) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(xhttp.readyState == 4 && xhttp.status == 200){
				var data = xhttp.responseXML;
				var result;
				var xpath = "data//*[@id='" + id + "']";
				var nodes = data.evaluate(xpath,data,null,XPathResult.ANY_TYPE, null);
				result  = nodes.iterateNext();
				var temp = result.lastElementChild.innerHTML;
				if(id === "contactByMailLink"){
					content.innerHTML = temp.replace(/&gt;/g,">").replace(/&lt;/g,"<");
					document.getElementById("viewerName").value = USERNAME;
				}
				else{
					content.innerHTML = temp;
				}
				if(id=="homeLatestUpdateLink"){
					var xpath = "data//*[@postType='latestPost']";
					var nodes = data.evaluate(xpath,data,null,XPathResult.ANY_TYPE, null);
					var arr = [];
					while(result = nodes.iterateNext()){
						arr.push(createPostNode(result));
					}
					arr.sort(function(a,b){
						return parseInt(b.getAttribute("postorder"))-parseInt(a.getAttribute("postorder"));
					})
					var len = arr.length;
					var temp = content.querySelector(".postsContainer");
					var win = temp.removeChild(temp.firstElementChild);
					for (var i = 0; i < len; i++) {
						temp.appendChild(arr[i]);
					}
					temp.appendChild(win);
				}
				content.setAttribute("srcLink", id);
				content.firstElementChild.tabIndex = -1;
				content.firstElementChild.focus();
				addAjaxEventHandlers();
			}
		}
		xhttp.open("GET", "data.xml", true);
		xhttp.send();
	}
}
function createPostNode(posts){
	var postBody = document.createElement("div");
	postBody.className = "post";
	postBody.setAttribute("postorder",posts.getAttribute("postorder"));
	var h = document.createElement("h4");
	h.appendChild(posts.firstElementChild.firstChild.cloneNode());
	postBody.appendChild(h);
	var postContainer = document.createElement("div");
	postContainer.className = "postImgContainer";
	postContainer.innerHTML = posts.children[1].innerHTML;
	postBody.appendChild(postContainer);
	var description = document.createElement("div");
	description.className = "description";
	description.innerHTML=posts.lastElementChild.innerHTML;
	postBody.appendChild(description);
	return postBody;
}
/*function createFullWindow(){
	var win = document.createElement("div");
	div.className = "fullWindow";
	var back = document.createElement('span');
	back.className = "back";
	back.onclick = "closeParent(this)";
	//back.appendChild(document.createTextNode('\u&#x21E6;'));
	win.appendChild(back);
	var prev = document.createElement('span');
	prev.className = "prev";
	prev.onclick = "showPost(prev)";
	//prev.appendChild(document.createTextNode('\u&#x2770;'));
	win.appendChild(prev);
}*/
function socialMediaLinkClicked(href){
	linkClicked(document.documentElement.querySelector("li[href='"+href+"']"));
}

function showImages(){
	var item = POSTOBJECT.getIndexedPost();
	var temp = POSTOBJECT.box.lastElementChild;
	temp.firstElementChild.src = item.firstElementChild.innerHTML;
	var p = document.createElement("p");
	p.appendChild(item.lastElementChild.firstChild.cloneNode(true));
	temp.lastElementChild.empty().appendChild(p);
}
function showWindowBluePrint(){
	var win = this.parentElement.lastElementChild;
	var id = this.id;
	var rect = this.getBoundingClientRect();
	var parentRect = this.parentElement.parentElement.getBoundingClientRect();
	if(screen.width > 450){
		win.style.transform="scale(0.9)";
		win.style.oTransform="scale(0.9)";
		win.style.msTransform="scale(0.9)";
		win.style.mozTransform="scale(0.9)";
		win.style.webkitTransform="scale(0.9)";
		if((" " + this.className + " ").replace(/[\n\t]/g, " ").indexOf(" poemLink ") <= -1){
			win.style.left = (rect.left - (win.clientWidth - this.clientWidth)/2 )+ "px";
			win.style.top = (rect.top - (win.clientHeight - this.clientHeight)/2 )+ "px";
			if(parseInt(win.style.top)<parentRect.top){
				win.style.top = (parentRect.top+5)+"px";
			}
			else if(parseInt(win.style.top)+win.clientHeight>parentRect.bottom){
				win.style.top = (parentRect.bottom-5-win.clientHeight)+"px";
			}
			if(parseInt(win.style.left)<parentRect.left){
				win.style.left = (parentRect.left+5)+"px";
			}
			else if(parseInt(win.style.left)+win.clientWidth>parentRect.right){
				win.style.left = (parentRect.right-5-win.clientWidth)+"px";
			}
		}
		else{
			win.style.top = (parentRect.bottom-5-win.clientHeight)+"px";
			win.style.left = (parentRect.right-5-win.clientWidth)+"px";
		}
	}
	else{
		win.style.transform="scale(1)";
		win.style.oTransform="scale(1)";
		win.style.msTransform="scale(1)";
		win.style.mozTransform="scale(1)";
		win.style.webkitTransform="scale(1)";

	}
	win.setAttribute("winsrc",id);
	if(this.nodeName=="A"){
		win.firstElementChild.empty().appendChild(this.firstElementChild.firstElementChild.cloneNode(true));
	}
	else
		win.firstElementChild.empty().appendChild(this.firstElementChild.firstChild.cloneNode(true));
	win.children[1].empty().appendChild(this.children[1].firstElementChild.cloneNode(true));
	win.href = this.href;
}
function hideWindowBluePrint(e){
	var x = e.clientX,y= e.clientY;
	var win = this.parentElement.lastElementChild;
	var rect = win.getBoundingClientRect();
	if(x <= rect.right && x >= rect.left && y >= rect.top && y <= rect.bottom){
		return;
	}
	win.style.transform="scale(0)";
	win.style.oTransform="scale(0)";
	win.style.mozTransform="scale(0)";
	win.style.webkitTransform="scale(0)";
	win.style.msTransform="scale(0)";
}

function contentBudgeClicked(element){
	if(element.nodeName=="A")
		return;
	var win= element.parentElement.lastElementChild;
	win.style.transform="scale(0)";
	win.style.oTransform="scale(0)";
	win.style.mozTransform="scale(0)";
	win.style.webkitTransform="scale(0)";
	win.style.msTransform="scale(0)";
	var panting = element;
	POSTOBJECT = new FullWindowPosts(element.parentElement.querySelectorAll(".contentShowOnHover"));
	
	var arr = element.className.split(" ");
	while(arr[0]!="coinPopUp"){	
		element = element.parentElement;
		arr = element.className.split(" ");
	}
	var content = element.querySelector(".coinPopUpRightPart").querySelector(".fullWindow");
	content.tabIndex = -1;
	content.focus();
	content.style.transform="scale(1)";
	content.style.oTransform="scale(1)";
	content.style.msTransform="scale(1)";
	content.style.mozTransform="scale(1)";
	content.style.webkitTransform="scale(1)";

	content = content.querySelector(".postContent");
	POSTOBJECT.box = content;
	POSTOBJECT.moveFunc = displaySketchOrPoem;

	POSTOBJECT.index = parseInt(panting.id.split("_")[1])-1;
	showPost("curr");
}

function showPost(dir){
	if(dir&&dir=="next"){
		POSTOBJECT.next();
	}
	else if(dir&&dir=="prev")
		POSTOBJECT.prev();
	POSTOBJECT.moveFunc();
}

function displaySketchOrPoem(){
	var item =  POSTOBJECT.getIndexedPost();
	POSTOBJECT.box.firstElementChild.empty().appendChild(item.firstElementChild.firstChild.cloneNode(true));
	POSTOBJECT.box.lastElementChild.empty().appendChild(item.lastElementChild.firstElementChild.cloneNode(true));
	if(item.id.split("_")[0]=="poemLink"){
		POSTOBJECT.box.children[1].empty().appendChild(item.children[1].firstElementChild.cloneNode(true));
	}
	else
		POSTOBJECT.box.children[1].empty().appendChild(item.children[1].cloneNode(true));
}

function feedbackSubmit(e){
	e.preventDefault();
	var form = document.getElementById("feedbackForm");
	var td = form.querySelectorAll("td");
	var name = td[1].firstElementChild.value.trim();
	var email = td[2].firstElementChild.value.trim();
	var feedback = td[3].firstElementChild.value.trim();
	var regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	var field = document.getElementById("errorField");
	field.firstElementChild.empty().appendChild(document.createTextNode("Sending..."));
	field.parentElement.parentElement.style.display="block";
	if(name==""||email==""||feedback==""){
		field.firstElementChild.style.color="red";
		field.firstElementChild.empty().appendChild(document.createTextNode("All fields are necessary"));
	}
 	else if(!regex.test(email)){
		field.firstElementChild.style.color="red";
		field.firstElementChild.empty().appendChild(document.createTextNode("Please Provide a valid Email address"));
	}
	else{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var data = JSON.parse(this.responseText);
				field.firstElementChild.empty().appendChild(document.createTextNode(data.response));
				if(data.status)
					field.firstElementChild.style.color="red";
				else{
					field.firstElementChild.style.color="green";
					form.reset();
				}
			}
		}
		xhttp.open("get","feedback.php?name="+name+"&email="+email+"&feedback="+feedback+"&submit=feedbackForm");
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();
	}
}

function scrollToView(element){
	var rect = element.getBoundingClientRect();
	var parent = getScrollParent(element,true);
	var rectParent = parent.getBoundingClientRect();
	console.log(rect.bottom+" "+rectParent.bottom);
	if(rectParent.bottom<rect.bottom){
		parent.scrollTop+=(rect.bottom-rectParent.bottom+1);
	}
}

function getScrollParent(element, includeHidden) {
    var style = getComputedStyle(element);
    var excludeStaticParent = style.position === "absolute";
    var overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

    if (style.position === "fixed") return document.body;
    for (var parent = element; (parent = parent.parentElement);) {
        style = getComputedStyle(parent);
        if (excludeStaticParent && style.position === "static") {
            continue;
        }
        if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
    }

    return document.body;
}
var customAlertArray = [] ;
createCssForCustom();
function createCssForCustom() {
	var style = document.createElement("style");
	style.rel ="stylesheet";
	style.type="text/css";
	style.id = "customStyleSheet";
	style.innerHTML = ("div#customPromptBox{\
			width: 100vw;\
			height: 100vh;\
			position:fixed;\
			top:0;\
			left:0;\
			z-index: 9999999999;\
		}\
		div#customPromptBox>div#customPromptBox_blurBack{\
			width: 100%;\
			height: 100%;\
			position: absolute;\
			top:0;\
			left:0;\
			background-color: black;\
			opacity: 0.8;\
			filter: alpha(opacity = 80)\
		}\
		#customPromptBox_box{\
			width:90%;\
			max-width:410px;\
			height: auto;\
			min-height:5em;\
			max-height:90%;\
			position: absolute;\
			top:50%;\
			left:50%;\
			padding:10px;\
			transform: translate(-50%,-50%);\
			-o-transform: translate(-50%,-50%);\
			-webkit-transform: translate(-50%,-50%);\
			-ms-transform: translate(-50%,-50%);\
			-moz-transform: translate(-50%,-50%);\
			background-color: white;\
			overflow: hidden;\
		}\
		#customPromptBox_box>header,#customPromptBox_box>footer{\
			width: 100%;\
			height:auto;\
			position: relative;\
			top:0;\
			left:0;\
			overflow: hidden;\
			background-color: black;\
			text-align: center;\
			font-size:1em;\
		}\
		div#customPromptBox>div#customPromptBox_box>footer{\
			background-color: unset;\
		}\
		div#customPromptBox>div#customPromptBox_box>header>h2{\
			width: 100%;\
			height:auto;\
			color: white;\
			background-color: black;\
			padding: 1%;\
			overflow: hidden;\
			text-overflow: ellipsis;\
			white-space: nowrap;\
			text-align: center;\
		}\
		#customPromptBox_box>div{\
			width:100%;\
			max-height:45vh;\
			height:auto;\
			overflow:hidden;\
			min-height:80px;\
			padding:10px\
		}\
		#customPromptBox_submitButton,#customPromptBox_CancelButton{\
			width:30%;\
			min-width:124px;\
			font-size:1.5em;\
			height:auto;\
			position: relative;\
			margin:0 1%;\
			float:right\
		}").trim();
	return style;
}

function addStyleInHTML(file) {
	document.head.appendChild(file);
}

function createPrompt(element) {
	var container = document.createElement("div");
	container.id = "customPromptBox";

	var blurBack = document.createElement("div");
	blurBack.id = "customPromptBox_blurBack";
	container.appendChild(blurBack);

	var box = document.createElement("div");
	box.id = "customPromptBox_box";

	var header = document.createElement("header");
	var heading = document.createElement("h2");
	if(location.hostname)
		heading.innerHTML = "From : " + location.hostname;
	else
		heading.innerHTML = "From : This Page";
	header.appendChild(heading);
	box.appendChild(header);
	
	var content = document.createElement("div");
	content.appendChild(element);
	box.appendChild(content);

	var footer = document.createElement("footer");
	var button = document.createElement("button");
	var button2 = document.createElement("button");
	button.id = "customPromptBox_submitButton";
	button2.id = "customPromptBox_CancelButton";
	button.innerHTML = "OK";
	button2.innerHTML = "CANCEL";
	footer.appendChild(button);
	footer.appendChild(button2);

	box.appendChild(footer);
	container.appendChild(box);
	return container;
}
function customAlert(text,func) {
	var str = "trying function";
	if(document.getElementById("customPromptBox")) {
		var temp = [text, func];
		customAlertArray.push(temp);
	}
	else{
		var p = document.createElement("p");
		p.innerHTML = text;

		if(!document.getElementById("customStyleSheet"))
			addStyleInHTML(createCssForCustom());
		var box = createPrompt(p);
		document.getElementsByTagName('body')[0].appendChild(box);
		box.lastElementChild.lastElementChild.firstElementChild.focus();
		box.lastElementChild.lastElementChild.removeChild(document.getElementById("customPromptBox_CancelButton"));
	}
	document.getElementById("customPromptBox_submitButton").onclick = function() {
		document.getElementsByTagName('body')[0].removeChild(document.getElementById("customPromptBox"));
		if(func)
			func();
		if(customAlertArray.length){
			var alt = customAlertArray.shift();
			customAlert(alt[0], alt[1]);
		}
	}
}
var thikness = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--coin_thikness'));
var edgeparts =parseInt(getComputedStyle(document.documentElement).getPropertyValue('--coin_edgePart'));
var borderColor =getComputedStyle(document.documentElement).getPropertyValue('--coin_edgePart');
var coinColor =getComputedStyle(document.documentElement).getPropertyValue('--coin_color');
var coins = document.getElementsByClassName('coin');
for (var i = 0; i < coins.length; i++) {
	var diameter = parseInt(getComputedStyle(coins[i]).getPropertyValue("width"))/document.documentElement.clientWidth*100;
	var edgelength = 3.14*diameter/edgeparts;
	var coinEdge = coins[i].firstElementChild.nextElementSibling;    
	for (var j = 0; j < edgeparts; j++) {
		var node = document.createElement("div");
		node.className="coinEdgeParts";
		node.style.height=edgelength+"vw";
		node.style.width = thikness+"vw";
		node.style.position="absolute";
		node.style.backgroundColor="#522203";
		node.style.border="1px solid "+borderColor;
		node.style.transform="translateY("+(diameter/2 - edgelength/2) +"vw) translateX("+(diameter/2-thikness/2)+"vw) rotateZ("+(((360/edgeparts)*j)+90)+"deg) translateX("+(diameter/2)+"vw) rotateY(90deg)";
		node.style.oTransform="translateY("+(diameter/2 - edgelength/2) +"vw) translateX("+(diameter/2-thikness/2)+"vw) rotateZ("+(((360/edgeparts)*j)+90)+"deg) translateX("+(diameter/2)+"vw) rotateY(90deg)";
		node.style.msTransform="translateY("+(diameter/2 - edgelength/2) +"vw) translateX("+(diameter/2-thikness/2)+"vw) rotateZ("+(((360/edgeparts)*j)+90)+"deg) translateX("+(diameter/2)+"vw) rotateY(90deg)";
		node.style.mozTransform="translateY("+(diameter/2 - edgelength/2) +"vw) translateX("+(diameter/2-thikness/2)+"vw) rotateZ("+(((360/edgeparts)*j)+90)+"deg) translateX("+(diameter/2)+"vw) rotateY(90deg)";
		node.style.webkitTransform="translateY("+(diameter/2 - edgelength/2) +"vw) translateX("+(diameter/2-thikness/2)+"vw) rotateZ("+(((360/edgeparts)*j)+90)+"deg) translateX("+(diameter/2)+"vw) rotateY(90deg)";
		node.style.filter="brightness("+(100-Math.abs(75*(edgeparts/2-j)/(edgeparts/2)))+"%)";
		node.style.webkitFilter="brightness("+(100-Math.abs(75*(edgeparts/2-j)/(edgeparts/2)))+"%)";
		coinEdge.appendChild(node);
	}
}
