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
function customAlert(text, func) {
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