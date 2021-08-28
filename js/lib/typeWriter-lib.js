(function(window, document, undefined){
	"use strict"
var defaults = {
	typewritterList:["no value available"],
	forwardSpeed:300,
	backwardSpeed:100,
	wordShowDuration:1500,
	newWordDelay:3000,
	playState:"true",
	handleElementId:null
}
class TypeWritter{
	constructor(element,list,options){
		this.element = typeof(element)==='string'?document.querySelector(element):element;
		this.list = typeof(list)==='object'?list:["No value available"];
		this.options = Object.assign( {}, defaults, options );
	}
	init(){
		this.listItem=0;
		this.letterIndex =0;
		this.state=true;
		this.flag=true;
		this.varInterval=null;
		this.element.innerHTML = this.list[this.listItem];
		this.element.style.width = this.letterIndex+"ch";
		if(this.options.playState.toLowerCase()==String(true)){
			this.run();
		}
		if(this.options.handleElementId){
			document.getElementById(this.options.handleElementId).addEventListener('click',(function(){
				if(this.options.playState.toLowerCase()==String(true)){
					this.options.playState = 'false';
					this.stop();
				}
				else{
					this.options.playState = 'true';	
					this.run();
				}
			}).bind(this));
		}
	}
	run(){
		var obj = this;
		if(this.letterIndex<this.list[this.listItem].length&&this.letterIndex>=0){
			if(this.flag){
				this.element.style.width=(this.letterIndex+1)+"ch";
				++this.letterIndex;
				this.varInterval = setTimeout(this.run.bind(this),this.options.forwardSpeed);
			}
			else{
				this.element.style.width=this.letterIndex+"ch";
				--this.letterIndex;
				this.varInterval = setTimeout(this.run.bind(this),this.options.backwardSpeed);
			}
		}
		else{
			if(this.flag){
				this.flag = false;
				--this.letterIndex;
				this.varInterval = setTimeout(this.run.bind(this),this.options.wordShowDuration);
			}
			else{
				this.flag = true;
				++this.letterIndex;
				this.listItem = (this.listItem+1)%this.list.length;
				this.element.innerHTML = this.list[this.listItem];
				this.varInterval = setTimeout(this.run.bind(this),this.options.newWordDelay);
			}
			
		}
	}
	stop(){
		clearTimeout(this.varInterval);
	}
}
/*var total = document.getElementsByClassName('typeWritter');

for (var i = total.length - 1; i >= 0; i--) {
	console.log('iii');
	let curr = new TypeWritter(total[i],total[i].dataset.typewritterList.split('-'),total[i].dataset);
	curr.init();
}*/
	window.TypeWritter = TypeWritter;
})(window,document);