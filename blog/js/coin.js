
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
