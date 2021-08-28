(function(window, document, undefined){
	"use strict";
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
			this.#onStart =()=>console.log("Touch Started");
			this.#onEnd =()=>console.log("Touch Ended");
			this.#onDrag =()=>console.log("Dragging Start");
			this.#onTap =()=>console.log("Element has been tapped");
			this.#handleTouchMoveUtil = this.#handleTouchMove.bind(this);
			this.#handleTouchEndUtil = this.#handleTouchEnd.bind(this);
			this.#handleTouchStartUtil = this.#handleTouchStart.bind(this);
			this.#handleTapUtil = this.#handleTap.bind(this);
		}
		getElement = () => this.#element;
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
	//Expose to te world
	window.Swipe = Swipe;
})(window,document);