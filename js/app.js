"use strict";
let appData = {
	userChoice:{
		darkMode:false,
	},
	currURL:location.href,
	currPAGE:null,
	online:true,
	scrollPos:{
		top:0,
		left:0
	}
}
let lazyloadImgOvserver = new IntersectionObserver((entries,observer)=>{
	//console.log(entries);
	entries.forEach((entry)=>{
		if(entry.isIntersecting){
			let img = entry.target;
			if(img.dataset.src)
				img.src = img.dataset.src;
			img.srcset = img.dataset.srcset;
			observer.unobserve(img);
		}
	})
},{threshold:0.8})
let dataFromServer ={
	/*drives:{
		numberOfDrive:0,
		totalMonetaryValueOfSErvices:0,
		numberOfCities:0,
		numberOfpeople:0,co
		drivesArr:[
		]
	}*/
}
$(window).on('load','.placeol img',function(){
	console.log('load');
});
$('document').ready(function(){
	/*if('serviceWorker' in navigator ){
		navigator.serviceWorker.register('/sw.js').then((registration)=>{
			console.log('serviceWorker Reistered successfully wit scope : '+registration.scope);
		},(err)=>{
			console.log('serviceWorker Reistered Failed : '+err);
		});
	}
	else{
		console.log('serviceWorker not supported');
	}*/
	init();
	lazyLoadImage("start");
	$(document).on('click','a.internal',function(e){
		e.preventDefault();
		appData.currURL = this.href;
		document.documentElement.scrollTop = "0px";
		window.history.pushState(appData,'',appData.currURL);
		routeToUrl(appData);
	});

	$(document).on('click','li.subNavLink',function(e){
		e.preventDefault();
		let  url = new URL(appData.currURL);
		appData.currURL = e.target.href;
		window.history.pushState(appData,'',appData.currURL);
		gotoPos(e.target.hash.substr(1));
	});

	$(window).on('resize',function(){
		setUI();
	})

	$('.pannel-link').click(function(){
		$('[data-pannelId="'+this.dataset.pannelref+'"]').toggleClass('active');
	})
	$('.subNav .overlay').click(function(){
		$(this).parent().removeClass('active');
	});
	$('.subNav').hover(function(){
		$('.subNav').toggleClass('show');
	});
	$(document).on('click','.subNavLink',function(){
		$('.subNav').removeClass('active');
	})
	var subNavSwipe = new Swipe($('.subNav>.container')[0]);
	subNavSwipe.setOnStart(function(){
		subNavSwipe.getElement().style.setProperty('transition','unset');
	})
	subNavSwipe.setOnDrag((xDis,yDis)=>{
		subNavSwipe.getElement().style.left = Math.min(0,(0-xDis))+"px";
	})
	subNavSwipe.setOnEnd(function(xDis,yDis){
		if(xDis>100){
			$(subNavSwipe.getElement()).parent().removeClass('active');
		}
		subNavSwipe.getElement().style.setProperty('transition','left 500ms');
		subNavSwipe.getElement().style.removeProperty('left');
	})
	subNavSwipe.run();
	window.onpopstate = function(evt){
		if(evt.state)
			appData = evt.state,routeToUrl(appData);
	}
})
function lazyLoadImage(str){
	console.log(str);
	let t = document.querySelectorAll(".lazyLoad");
	console.log(t.length);
	t.forEach((img)=>{
		lazyloadImgOvserver.observe(img);
	})
}
function init(){
	setUI();
	appData.currURL = location.href;
	history.replaceState(appData,"",location.href);
	routeToUrl(appData);
}
function getUrlQueryParams(url) {
  var queryString = url.split("?")[1];
  var keyValuePairs = queryString.split("&");
  var keyValue = [];
  var queryParams = {};
  keyValuePairs.forEach(function(pair) {
    keyValue = pair.split("=");
    queryParams[keyValue[0]] = decodeURIComponent(keyValue[1]).replace(/\+/g, " ");
  });
  return queryParams;
}
function setUI(){
	var headerHeight = $('.app-header').css('height');
	let footerHeight = $('nav').css('height');
	$('#behindHeader').css('height',headerHeight);
	$('#behindFooter').css('height',footerHeight);
	/*if(!media.matches){
		var footerHeight = parseInt($('nav').css('height'));	
		$('.page-content').css('paddingBottom',footerHeight+10);
	}
	else{
		//$('.subNav').css('top',headerHeight);
		$('.page-content').css('paddingBottom','0');
	}*/
}
function routeToUrl(appData){
	let urlPara=[], url = new URL(appData.currURL);
	$('.menu.active').removeClass('active');
	if(location.search){
		urlPara = getUrlQueryParams(url.search);
	}
    $('link.pageCss').remove();
    let list = document.getElementsByTagName('html')[0].classList
    list.remove("theme-B");
    list.add("theme-A");
    $(window).off('scroll');
	switch (urlPara["page"]) {
		case 'home':
		case undefined:
		case 'index.html':
			appData.currPAGE= "home";
			$('title').text("home");
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/css/home.css">');
			document.getElementById("home").parentElement.className+=(" active");
			$('.page-content').load('/src/home.html',processPage);
			//document.getElementsByTagName('html')[0].className="theme-A";
			break;
		case 'profile':
			$('title').text("profile");
			appData.currPAGE= "profile";
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/profile/css/profile.css">');
			$('.page-content').load('/profile/index.html',processPage);
			document.getElementById("profile").parentElement.className+=(" active");
			//document.getElementsByTagName('html')[0].className="theme-A";
			break;
		case 'charity':
			$('title').text("smile");
			appData.currPAGE= "smile";
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/smile/css/smile.css">');
			$('.page-content').load('/smile/index.html',processPage);
			document.getElementById("smile").parentElement.className+=(" active");
			//document.getElementsByTagName('html')[0].className="theme-B";
			break;
		case 'contact':
			$('title').text("contact");
			appData.currPAGE= "contact";
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/css/contact.css">');
			$('.page-content').load('/src/contact.html',processPage);
			document.getElementById("contact").parentElement.className+=(" active");
			//document.getElementsByTagName('html')[0].className="theme-A";
			break;
		default:
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/css/error.css">');
			$('.page-content').load('/src/error/404.html');
			//document.getElementsByTagName('html')[0].className="theme-A";
	}
	
}
function gotoPos(id){
	let ele = document.getElementById(id);
	if(ele){
		let pos = ele.offsetTop;
		window.scrollTo(0,pos);
	}
}
function processPage(){
	let fla = false;
	var list = $('ul.menuList');
	list.empty();
	$.ajax({
		url:'/'+appData.currPAGE+'/structure.json',
		success:(result,str,xf)=>{
			let navList = result.subnaviationList;
			if(navList.length){
				fla = true 
			}
			$.each(navList,(item,value)=>{
				list.append('<li class="subNavLink"><a href="#'+value.href+'">'+value.name+'</a></li>');
			})
		},
		error:(e)=>{
			console.log('error: '+e.xhr);
		},
		complete:(xhr)=>{
			if(!fla){
				$('.subNav-header-content-title>p').text(' ');
				$('.subNavIcon').css('display','none');
				$('.subNav').css('display','none');
			}
			else{
				$('.subNav-header-content-title>p').text(xhr.responseJSON.title||'');
				//if(window.innerWidth<768)
				$('.subNavIcon').css('display','block');
				$('.subNav').css('display','block');
			}
		}
	})
	let url = new URL(appData.currURL);
	//document.getElementsByClassName('.lazyLoad');
	if(url.hash){
		gotoPos(url.hash.substr(1));
	}
	
}
function toggleDarkMode(element){
	if(!appData.userChoice.darkMode){
		element.firstElementChild.className='fas fa-sun';
		document.getElementsByTagName('html')[0].className+=" theme-dark";
		appData.userChoice.darkMode=true;
	}
	else{
		element.firstElementChild.className='fas fa-moon';
		document.getElementsByTagName('html')[0].classList.remove("theme-dark");
		appData.userChoice.darkMode=false;
	}
}
function toggleOnlineMode(element){
	if(appData.online){
		element.firstElementChild.className='fas fa-sun';
		document.getElementsByTagName('html')[0].className+=" offline";
		appData.online=false;
	}
	else{
		element.firstElementChild.className='fas fa-moon';
		document.getElementsByTagName('html')[0].classList.remove("offline");
		appData.online=true;
	}
}