( function ( window, document, undefined ) {
	"use strict";
	let __instance;
	let defaults = {
		scale:0.95,
		maxItem:5,
		initialIndex:2
	}
	let portraitDefault ={
		hidePercentage:7.5,
		orientation:"potrait",
		swipeThrosold:100
	}
	let landscapeDefault = {
		hidePercentage:30,
		maxItem:5,
		orientation:"landscape"
	}
	class GallaryHandler{
		#list;
		#observer; 
		constructor(...arg){
			__instance = this;
			this.#list = [];
			this.#observer = new IntersectionObserver(this.#handleIntersection.bind(this),{threshold:0.8});
			this.add(...arg);
		}
		#chackGallaryParameters = function(item){
			if(!item.container){
				console.error("Error: Element is not present in DOM structur");
				return false;
			}
			return true;
		};
		add = (...arg)=>{
			for(let item of arg){
				if(Array.isArray(item)||(typeof item ==="object"&&item!==null)){
					if(this.#chackGallaryParameters(item)){
						this.#observer.observe(item.container);
					}	
				}
				else{
					console.error("Error: Wron Arument is passed. Object,Objects or Array of Objects are Expacted");
				}
			}
		}
		getList(){
			return this.#list;
		}
		#handleIntersection(entries,observer){
			entries.forEach((entry)=>{
				let gallaryObj = new Gallary(entry.target,{});
				this.#list.push(gallaryObj);
				if(entry.isIntersecting){
					gallaryObj.init();
					observer.unobserve(entry.target);
				}
			})
		}		
	}
	class Gallary{
		constructor(element,options){
			this.container = typeof(element)==='string'?document.querySelector(element):element;
			this.list = this.container.getElementsByClassName('item');
			this.userOption = options;
			if(window.matchMedia("(orientation:landscape)").matches){
				defaults.initialIndex = parseInt(this.list.length/2);
				this.options = Object.assign( {}, defaults, landscapeDefault, this.userOption);
			}
			else{
				defaults.initialIndex = 0;
				this.options = Object.assign( {}, defaults, portraitDefault, this.userOption);
			}
			this.index = this.options.initialIndex;
			this.activeLeftPos = this.list[this.index].offsetLeft;
			this.isEvenCorrection = ((this.list.length+1)%2)*(this.options.hidePercentage*Math.pow(this.options.scale,this.index))/2;
			this.touchHandler = new Swipe(this.container);
			this.gotoUtil = this.gotoUtil.bind(this).bind(event);
			window.addEventListener('resize',function(){
				this.init();
			}.bind(this));
		}
		init(){
			this.setEventHandler();
			this.goto(this.index,0);
		}
		gotoUtil(event){
			let ele = event.currentTarget;
			for(let i = 0; i<this.list.length;++i){
				if(this.list[i]==ele){
					this.goto(i);
					return;
				}
			}
		}
		setEventHandler(){
			if(window.matchMedia("(orientation:landscape)").matches){
				for(i=0;i<this.list.length;++i){
					this.list[i].addEventListener('mouseover',this.gotoUtil);
					this.list[i].style.left="50%";
					this.list[i].style.opacity="1";
				}
				this.touchHandler.delete();
				this.activeLeftPos = this.list[this.index].offsetLeft;
				this.options = Object.assign( {}, defaults, landscapeDefault, this.userOption);
			}
			else{
				for(i=0;i<this.list.length;++i){
					this.list[i].removeEventListener('mouseover',this.gotoUtil);
					this.list[i].style.left="10%";
				}
				this.touchHandler.run();
				this.activeLeftPos = this.list[this.index].offsetLeft;
				this.options = Object.assign( {}, defaults, portraitDefault, this.userOption);
			}
			this.touchHandler.setOnDrag(function(xDis){
				this.portraitGallaryHandle(this.index,Math.min(1,xDis/this.options.swipeThrosold));
			}.bind(this));
			this.touchHandler.setOnStart(function(dis){
				for(let i = 0;i<this.list.length;++i){
					this.list[i].style.transition="none";
				}
				this.activeLeftPos = this.list[this.index].offsetLeft;
			}.bind(this));
			this.touchHandler.setOnEnd(function(dis){
				this.list[this.index].style.left = this.activeLeftPos+"px";
				for(let i = 0;i<this.list.length;++i){
					this.list[i].style.transition="filter 500ms, transform 500ms,opacity 200ms";
				}
				if(Math.abs(dis)>=this.options.swipeThrosold){
					this.goto((this.index+1)%this.list.length,0);
				}
				else{
					this.goto((this.index)%this.list.length,0);
				}
			}.bind(this));
		}
		run(){
			this.varInterval = setInterval(this.prev.bind(this),2000);
		}
		next(){
			this.goto((this.index+1)%this.list.length,0);	
		}
		prev(){
			this.goto((this.index+this.list.length-1)%this.list.length,0);
		}
		goto(index,value){
			if(this.options.orientation.toLowerCase()==="landscape"){
				this.landscapeGallaryHandle(index);
			}
			else{
				this.portraitGallaryHandle(index,value);
			}
		}
		landscapeGallaryHandle(index){
			for(let i = 0; i<this.list.length;++i){
				this.list[i].className= this.list[i].className.replace(" active","");
				this.list[i].style.zIndex=this.list.length-Math.abs(i-index);
				let adjustment = (1-Math.pow(this.options.scale,Math.abs(i-index)))*50;
				adjustment = index>i?-1*adjustment:adjustment;
				this.list[i].style.transform = 'translate('+((i-parseInt(this.list.length/2))*this.options.hidePercentage-50+this.isEvenCorrection+adjustment)+'%, -50%) scale('+Math.pow(this.options.scale,Math.abs(i-index))+')';
			}
			this.index = index;
			this.list[index].className+=" active";
		}
		portraitGallaryHandle(index,value){
			value = Math.min(1,Math.max(-1,value));
			this.list[this.index].style.left = (this.activeLeftPos-(value*this.options.swipeThrosold))+"px";
			value = Math.abs(value);
			for(let i = 0; i<this.list.length;++i){
				this.list[i].className= this.list[i].className.replace(" active","");
				let parser = (i-index+this.list.length)%this.list.length;	
				this.list[i].style.zIndex=this.list.length-parser;
				if(parser==0){
					this.list[i].style.opacity = 1-value;
					this.list[i].style.transform = 'translate('+((parser)*this.options.hidePercentage)+'%, -50%)';			
				}
				else{
					this.list[i].style.opacity = parser>=this.options.maxItem?parser==this.options.maxItem?value:0:1;
					this.list[i].style.transform = 'translate('+((parser-value)*this.options.hidePercentage)+'%, -50%) scale('+Math.pow(this.options.scale,Math.abs(parser-value))+')';		
				}
			}
			this.index = index;
			this.list[index].className+=" active";	
		}
		stop(){
			clearInterval(this.varInterval);
		}
	}
	let Swipe = class{
		#handleTouchMoveUtil;
		#handleTouchEndUtil;
		#handleTouchStartUtil;
		#handleTapUtil;
		#onStart;
		#onEnd;
		#onTap;
		#onDrag;
		#xEnd;
		#yEnd;
		#xStart;
		#yStart;
		#element;
		constructor(element){
			this.#element = typeof(element)==='string'?document.querySelector(element):element;
			this.#onStart =function(){console.log("Touch Started")};
			this.#onEnd =function(){console.log("Touch Ended")};
			this.#onDrag =function(){console.log("Dragging Start")};
			this.#onTap =function(){console.log("Element has been tapped")};
			this.#handleTouchMoveUtil = this.#handleTouchMove.bind(this);
			this.#handleTouchEndUtil = this.#handleTouchEnd.bind(this);
			this.#handleTouchStartUtil = this.#handleTouchStart.bind(this);
			this.#handleTapUtil = this.#handleTap.bind(this);
		}
		setOnStart(callback){
			if(callback)
				this.#onStart = callback;
			return this;
		}
		setOnEnd(callback){
			if(callback)
				this.#onEnd = callback
			return this;
		}
		setOnTap(callback){
			if(callback)
				this.#onTap = callback;
			return this;
		}
		setOnDrag(callback){
			if(callback)
				this.#onDrag = callback;
			return this;
		}
		#handleTouchMove(evt){
			if(!this.#xStart||!this.#yStart) return this;
			let xCurr = evt.touches[0].clientX;
			let yCurr = evt.touches[0].clientY;
			let xDiff = 	this.#xEnd - xCurr;
			let yDiff = this.#yEnd - yCurr;
			this.#onDrag(this.#xStart-xCurr,this.#yStart-yCurr)
			this.#xEnd = xCurr;
			this.#yEnd = yCurr;
		}
		#handleTouchStart(evt){
			this.#xStart = evt.touches[0].clientX;
			this.#yStart = evt.touches[0].clientY;
			this.xEnd =this.#xStart;
			this.#yEnd =this.#yStart;
			this.#onStart();
		}
		#handleTouchEnd(evt){
			this.#onEnd(this.#xStart-this.#xEnd,this.#yStart-this.#yEnd);
		}
		#handleTap(evt){
			this.#onTap();
		}
		run(){
			this.#element.addEventListener('touchmove',this.#handleTouchMoveUtil);
			this.#element.addEventListener('touchend',this.#handleTouchEndUtil);
			this.#element.addEventListener('touchstart',this.#handleTouchStartUtil);
			this.#element.addEventListener('click',this.#handleTapUtil);
		}
		delete(){
			this.#element.removeEventListener('touchmove',this.#handleTouchMoveUtil);
			this.#element.removeEventListener('touchend',this.#handleTouchEndUtil);
			this.#element.removeEventListener('touchstart',this.#handleTouchStartUtil);
			this.#element.removeEventListener('click',this.#handleTapUtil);
		}
	}
	window.GallaryHandler = GallaryHandler;
} )( window, document );