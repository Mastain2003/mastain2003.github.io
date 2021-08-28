let prevScrollPos = window.pageYOffset;
let darkMode = false;
let media = window.matchMedia("(orientation:landscape)");
/*var TypeWritter = {
	container:null,
	list:[],
	listIndex:0,
	wordIndex:0,
	state:true,
	flag:true,
	varInterval:null,
	time:300,
	set:function(){
		this.container.innerHTML=this.list[this.listIndex];
		this.container.style.width=this.wordIndex+"ch";
		this.flag=true;
	},
	stop:function(){
		clearTimeout(this.varInterval);
		this.state=false;
	},
	run:function(){
		this.state=true;
		var obj = this;
		if(obj.wordIndex<=obj.list[obj.listIndex].length&&obj.wordIndex>=0){
			if(obj.flag){
				obj.time=300;
				obj.varInterval = setTimeout(function(){
					obj.container.style.width=(obj.wordIndex*1.2)+"ch";
					++obj.wordIndex;
					obj.run();
				},obj.time);
			}
			else{
				obj.time=100;
				obj.varInterval = setTimeout(function(){
					obj.container.style.width=(obj.wordIndex*1.2)+"ch";
					--obj.wordIndex;
					obj.run();
				},obj.time);
			}
		}
		else{
			if(obj.flag){
				obj.time=1500;
				--obj.wordIndex;
				obj.flag = false;
			}
			else{
				obj.time=100;
				obj.flag =true;
				obj.listIndex=(obj.listIndex+1)%obj.list.length;
				obj.container.innerHTML=obj.list[obj.listIndex];
				obj.wordIndex=0;
			}
			obj.varInterval = setTimeout(function(){
				obj.run();
			},obj.time);
		}
	}
}*/	
/*state = {
	loc:location.href,
	scrollTop:0
}*/

function ImagesGallary(container){
	let instance =this;
	instance.container = container;
	instance.items = $(container.getElementsByClassName('imageGallaryItem'));
	instance.scale = 0.9;
	instance.curr=0;
	instance.items[instance.curr].className+=" active";
	instance.index = 0;
	instance.hidePercentage =95;
	instance.index = Math.floor((instance.items.length-1)/2);
	instance.correction = instance.items.length%2?0:(50-(50-(instance.hidePercentage)/2)*Math.pow(instance.scale,instance.items.length-1-instance.index));
	instance.items[instance.curr].style.zIndex=instance.items.length;
	instance.swipeThrosold = 100;
	instance.swipeOpecityThrosold=150;
	instance.correction = instance.items.length%2?0:(50-(50-(instance.hidePercentage)/2)*Math.pow(instance.scale,instance.items.length-1-instance.index));
	instance.items[instance.curr].style.zIndex=instance.items.length;
	instance.run = function(){
		if(window.matchMedia("(orientation:landscape)").matches){
			instance.move();
		}
		else{
			$(instance.items).css('transition','unset');
			instance.swiped();
		}
	}
	instance.move = function(){
		let currShift =0;
		for(let i =0;i<instance.items.length;++i){
			instance.items[i].className= instance.items[i].className.replace(" active","");
			if(instance.curr<i)
				currShift = instance.correction+50*(1-Math.pow(instance.scale,Math.abs(instance.curr-i)));
			else
				currShift = instance.correction+50*(Math.pow(instance.scale,Math.abs(instance.curr-i))-1);
			instance.items[i].style.zIndex=instance.items.length-Math.abs(instance.curr-i);
			instance.items[i].style.transform = "translateX("+(((instance.index-i)*instance.hidePercentage)+currShift)+"%) scale("+Math.pow(instance.scale,Math.abs(instance.curr-i))+")";
		}
		instance.items[instance.curr].className+=" active";
		/*instance.swipeer = new swipe(instance.items[instance.curr]);
		instance.swipeer.setOnLeft(instance.swipe);
		instance.swipeer.run(); */
	}
	instance.swiped =function(){
		for(let i =0;i<instance.items.length;++i){
			instance.items[i].className= instance.items[i].className.replace(" active","");
			currShift = instance.correction-(2.67*Math.min(3,instance.items.length-1))-50*(Math.pow(instance.scale,i)-1);
			let index = (instance.curr+i)%instance.items.length;
			instance.items[index].style.zIndex=instance.items.length-i;
			let translate = ((instance.index-index)*100+currShift+(100-instance.hidePercentage)*Math.min(i,instance.maxItems-1));
			instance.items[index].style.transform = "translateX("+translate+"%)  scale("+Math.pow(instance.scale,i)+")";
		}
		instance.items[instance.curr].className+=" active";
		//instance.swipeer.delete();
	}
	instance.swipe = function(dis){
		instance.items[instance.curr].style.left=-1*dis+"px";
		dis = Math.abs(dis);
		instance.items[instance.curr].style.opacity =1- Math.min(dis,instance.swipeThrosold)/instance.swipeThrosold;
		for(let i =1;i<Math.min(instance.items.length,instance.maxItems+1);++i){
			currShift = instance.correction-8-50*(Math.pow(instance.scale,i-Math.min(dis,instance.swipeThrosold)/instance.swipeThrosold)-1);
			let index = (instance.curr+i)%instance.items.length;
			instance.items[index].style.zIndex=instance.items.length-i;
			let translate = ((instance.index-index)*100+currShift-(100-instance.hidePercentage)*Math.min(dis+instance.swipeThrosold*Math.floor(i/instance.maxItems),instance.swipeThrosold)/instance.swipeThrosold+(100-instance.hidePercentage)*Math.min(i,instance.maxItems));
			instance.items[index].style.transform = "translateX("+translate+"%)  scale("+Math.pow(instance.scale,i-Math.min(dis,instance.swipeThrosold)/instance.swipeThrosold)+")";
		}
		//instance.items[(instance.curr+i)%instance.items.length].transform
	}
	instance.ini =function(){
		if(window.matchMedia("(orientation:landscape)").matches){
			instance.hidePercentage =65;
			instance.curr=instance.index;
			for(let i=0;i<instance.items.length;++i){
				instance.items[i].style.transform = "translateX("+((instance.index-i)*100+instance.correction)+"%)";
				setTimeout(function(){
					instance.items[i].style.transition="transform 200ms, z-index 100ms";
				},0);
				instance.items[i].addEventListener('mouseover',function(){
					instance.curr=i;
					instance.move()
				})
			}
		} else{
			instance.swipeThrosold = 100;
			instance.swipeOpecityThrosold=100;
			instance.correction =instance.items.length%2?0:(50-(50-(instance.hidePercentage)/2)*Math.pow(instance.scale,instance.items.length-1-instance.index));
			instance.swipeer = new swipe(instance.container);
			instance.maxItems = 4;
			instance.swipeer.setOnLeft(instance.swipe);
			instance.swipeer.setOnRight(instance.swipe);
			instance.swipeer.setOnEnd(function(dis){
				instance.items[instance.curr].style.left="0px";
				instance.items[instance.curr].style.opacity =1;
				if(dis>=instance.swipeThrosold){
					instance.curr = (instance.curr+1)%instance.items.length;
				}
				instance.swiped();
			})
			instance.swipeer.setOnTap(function(){
				instance.curr = (instance.curr+1)%instance.items.length;
				$(instance.items).css('transition','transform 200ms');
				instance.swiped();
				setTimeout(function(){
					$(instance.items).css('transition','unset');
				},0);
			})
			instance.swipeer.run();
			for(let i=0;i<instance.items.length;++i){
				instance.items[i].style.transform = "translateX("+((instance.index-i)*100+instance.correction)+"%)";
			}
		}
	}
	instance.ini();
	window.addEventListener('orientationchange',instance.ini);
}
function toggleDarkMode(element){
	if(!darkMode){
		element.firstElementChild.className='fas fa-sun';
		document.getElementsByTagName('html')[0].className="theme-dark-A";
		darkMode=true;
	}
	else{
		element.firstElementChild.className='fas fa-moon';
		document.getElementsByTagName('html')[0].className="theme-A";
		darkMode=false;	
	}
}
/*$('document').ready(function(){
	init();	
	$(document).on('click','a.internal',function(e){
		e.preventDefault();
		state.loc = this.href;
		document.documentElement.scrollTop = "0px";
		window.history.pushState(state,'',state.loc);
		routeToUrl(state);
	});
	$(window).on('hashchange',function(e){
		if(location.hash){
			let targetId = location.hash.substr(1);
			urlHash(targetId);
		}
	});
	$('.pannel-link').click(function(){
		$('[data-pannelId="'+this.dataset.pannelref+'"]').toggleClass('active');
	})
	$('.subNav .overlay').click(function(){
		$(this).parent().removeClass('active');
	});
	$('.subNav').hover(function(){
		$('.subNav').toggleClass('show');
	});
	var subNavSwipe = new swipe($('.subNav>.container')[0]);
	subNavSwipe.setOnStart(function(){
		subNavSwipe.element.style.setProperty('transition','unset');
	})
	subNavSwipe.setOnLeft(function(dis){
		subNavSwipe.element.style.left = Math.min(0,(0-80*dis/288))+"vw";
	})
	subNavSwipe.setOnRight(function(dis){
		subNavSwipe.element.style.left = Math.min(0,(0-80*dis/288))+"vw";
	})
	subNavSwipe.setOnEnd(function(dis){
		if(dis>100){
			$(subNavSwipe.element).parent().removeClass('active');
		}
		else{
		}
		subNavSwipe.element.style.setProperty('transition','left 500ms');
		subNavSwipe.element.style.removeProperty('left');
	})
	subNavSwipe.run();
	window.onpopstate = function(evt){
		if(evt.state)
			state = evt.state,routeToUrl(state);
	}
})	
function urlHash(hash){
	let top =document.getElementById(hash).offsetTop;
	let offset = $('.app-header').css('height'); 
	$('html, body').animate({
		scrollTop:(top-parseInt(offset))+"px"
	},'fast');
}
function routeToUrl(state){
	let url = new URL(state.loc);
	$('.menu.active').removeClass('active');
	let path =url.pathname;
	let arr = path.split("/");
     $('link.pageCss').remove();
	//setUI(media);
	switch (arr[1]) {
		case 'home':
		case '':
		case 'index.html':
			$('title').text("home");
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/css/home.css">');
			$('.page-content').load('/src/home.html',processPage("",""));
			document.getElementById("home").parentElement.className+=(" active");
			break;
		case 'profile':
			$('title').text("profile");
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/css/profile.css">');
			$('.page-content').load('/src/profile.html');
			document.getElementById("profile").parentElement.className+=(" active");
			break;
		case 'charity':
			$('title').text("smile");
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/css/smile.css">');
			$('.page-content').load('/src/smile.html',processPage("",""));
			document.getElementById("smile").parentElement.className+=(" active");
			break;
		case 'contact':
			$('title').text("contact");
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/css/contact.css">');
			$('.page-content').load('/src/contact.html',processPage("",""));
			document.getElementById("contact").parentElement.className+=(" active");
			break;
		default:
			$('head').append('<link rel="stylesheet" class="pageCss" type="text/css" href="/css/error.css">');
			$('.page-content').load('/src/error/404.html',processPage("",""));
	}
	$(document).ajaxComplete(processPage(location.hash,location.query));
}
function processPage(hash,query){
	let element = document.getElementById(hash.substr(1));
	if(element){
		element.scrollIntoView();
	}
	hash = null;
}
function init(){
	setUI(media);
	state.loc = location.href;
	history.replaceState(state,"",location.href);
	routeToUrl(state);
}
function getUrl(){
	var tempPrefix = "/portfolio/";
	let loc = window.location;
	let pathName = loc.pathname;
	if(pathName.startsWith(tempPrefix+'home/')){
		return '../inc/home.html';
	}
	else if(pathName.startsWith(tempPrefix+'profile/')){
		return '../inc/profile.html';
	}
	else if(pathName.startsWith(tempPrefix+'smile/')){
		return '../inc/smile.html';
	}
	else{
		return loc.origin+'/inc/home.html';
	}
}*/

