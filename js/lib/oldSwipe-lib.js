(function(window, document, undefined){
	"use strict";
	let Swipe = class{
		constructor(element){
			__instance = this;
			this.element = typeof(element)==='string'?document.querySelector(element):element;
			this.onLeft =function(){console.log("Swiped Left")};
			this.onRight =function(){console.log("Swiped Right")};
			this.onUp =function(){console.log("Swiped Up")};
			this.onDown =function(){console.log("Swiped Down")};
			this.onStart =function(){console.log("Touch Started")};
			this.onEnd =function(){console.log("Touch Ended")};
			this.onDrag =function(){console.log("Dragging Start")};
			this.onTap =function(){console.log("Element has been tapped")};
			this.handleTouchMove = this.handleTouchMove.bind(this);
			this.handleTouchEnd = this.handleTouchEnd.bind(this);
			this.handleTouchStart = this.handleTouchStart.bind(this);
			this.handleTap = this.handleTap.bind(this);
		}
		setOnLeft(callback){
			if(callback)
				this.onLeft =callback;
			return this;
		}
		setOnRight(callback){
			if(callback)
				this.onRight = callback;
			return this;
		}
		setOnUp(callback){
			if(callback)
				this.onUp = callback;
			return this;
		}
		setOnDown(callback){
			if(callback)
				this.onDown = callback;
			return this;
		}
		setOnStart(callback){
			if(callback)
				this.onStart = callback;
			return this;
		}
		setOnEnd(callback){
			if(callback)
				this.onEnd = callback
			return this;
		}
		setOnTap(callback){
			if(callback)
				this.onTap = callback;
			return this;
		}
		setOnDrag(callback){
			if(callback)
				this.onDrag = callback;
			return this;
		}
		handleTouchMove(evt){
			if(!this.xStart||!this.yStart) return this;
			this.xCurr = evt.touches[0].clientX;
			this.yCurr = evt.touches[0].clientY;
			this.xDiff = 	this.xEnd - this.xCurr;
			this.yDiff = this.yEnd - this.yCurr;
			if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) {
			    if ( this.xDiff > 0 ) {
			        this.onLeft(this.xStart-this.xCurr);
			    } else {
			        this.onRight(this.xStart-this.xCurr);
			    }
			} else {
			    if ( this.yDiff > 0 ) {
			        this.onUp(this.yStart-this.yCurr);
			    } else {
			       this.onDown(this.yStart-this.yCurr);
			    }
			}
			this.xEnd = this.xCurr;
			this.yEnd = this.yCurr;
		}
		handleTouchStart(evt){
			this.xStart = evt.touches[0].clientX;
			this.yStart = evt.touches[0].clientY;
			this.xEnd =this.xStart;
			this.yEnd =this.yStart;
			this.onStart();
		}
		handleTouchEnd(evt){
			this.onEnd(this.xStart-this.xEnd,this.yStart-this.yEnd);
		}
		handleTap(evt){
			this.onTap();
		}
		run(){
			this.element.addEventListener('touchmove',this.handleTouchMove);
			this.element.addEventListener('touchend',this.handleTouchEnd);
			this.element.addEventListener('touchstart',this.handleTouchStart);
			this.element.addEventListener('click',this.handleTap);
		}
		delete(){
			this.element.removeEventListener('touchmove',this.handleTouchMove);
			this.element.removeEventListener('touchend',this.handleTouchEnd);
			this.element.removeEventListener('touchstart',this.handleTouchStart);
			this.element.removeEventListener('click',this.handleTap);
		}
	}
	//Expose to te world
	window.Swipe = Swipe;
})(window,document);