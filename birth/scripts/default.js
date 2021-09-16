var endDate = new Date(2021,11,11);
var pageStartDate=new Date(2017,11,28);
var pageEndDate =new Date(2018,1,3);
//var imgLengthArray=[8,2,2,2,2,2,2];
var today=new Date();
var noOfDays =parseInt((today.getTime()-pageStartDate.getTime())/86400000);
var dateArray=[28,29,30,31,01,02,03];
var monthArray=["DEC","DEC","DEC","DEC","JAN","JAN","JAN"];
var photoIndex=0;
var ANIINDEX=0;
var intervalVar,vartime;
var t=new PhotoFrame();
var photoText=[
				//first part
			  	[
			  		"This is the First Part of the Story </br></br> The Bigning...",
			  		"so on 13/07/20111 , You praposes Me",
			  		"You always dreamed of flying with me",
			  		"but our journey not begins here,it is start from Navodaya",
			  		"I came Your home on 22/06/2011",
			  		"after that I met with your family",
			  		"and your friends",
			  		"Yes, i made you sad many times",
			  		"But I wanted that you become mother of my baby.",
			  		"Thank You for Watching This</br></br> visit tomorrow for Next Part",
			  	],
			  	[
			  		"Previously You had seen ",
			  		"PART II</br></br>First Meeting",
			  		"You came to Kota when I left it",
			  		"Then you started to be beautiful for me",
			  		"you had tried new outfits",
			  		"new hair styles",
			  		"whenever you had felt loneliness",
			  		"you had liked to visit mall",
			  		"developed your love for teddy",
			  		"and you hugged it by assuming it as me.",
			  		"After leaving home you had made new friends",
			  		"visited new places",
			  		"enjoy every festival",
			  		"On 26/12/2012 I and our friend",
			  		"had come to meet my innocent",
			  		"and cute girlfriend",
			  		"and also to meet with your di",
			  		"and your jeeju",
			  		"That time I spent some lovely",
			  		"and unforgetable moment with you",
			  		"Thank You for Watching This</br></br> visit tomorrow for Next Part",
			  	],
			  	[
			  		"Priviously You had seen",
			  		"PART III</br></br>Garba Nights",
			  		"Your destiny took you",
			  		"from Kota",
			  		"to Vadodra",
			  		"in my view",
			  		"in the time you spent in vododra",
			  		"you had changed alot",
			  		"from a simple looking girl",
			  		"to a beautiful girl",
			  		"from a संस्कारी girl",
			  		"to moder sexy girl",
			  		"you had got the title of Miss fresher",
			  		"did you know baby",
			  		"this is the pic which my mom saw in my phone",
			  		"This shopping loving girl",
			  		"also participates in running",
			  		"and in garba and in others events",
			  		"You were looking so cute",
			  		"and slim that",
			  		"I couldn't wait to meet my sweatheart",
			  		"to enjoy some moments with you",
			  		"although i looks very bad",
			  		"but this beautiful",
			  		"and amazing girl",
			  		"danceed with me in garba.",
			  		"In this outfit",
			  		"you were looking so beautiful",
			  		"sooo sexy ",
			  		"soo innocent and cute altogether that",
			  		"this pic of yours became my favourite.",
			  		"Here we kissed first time",
			  		"After this we meet",
			  		"again in kota",
			  		"and in surat also",
			  		"Thank You for Watching This</br></br> visit tomorrow for Next Part",
			  	],
			  	[
			  		"Priviously You had seen",
			  		"PART IV</br></br>Birth Day",
			  		"Although you are not too healthy",
			  		"but you know how to look beautiful",
			  		"Your every pic is attractive",
			  		"no matter you are ready for pic",
			  		"or not.",
			  		"You and your family",
			  		"frequently plans for a trip",
			  		"like this naturally beautiful",
			  		"religious imortant place Keadarnath.",
			  		"Where you clicked some awesome pics",
			  		"like playing with ice",
			  		"enjoying the water etc.",
			  		"actully this pic is looked like a perfect wallpaper.",
			  		"We again met in Indore",
			  		"where you take your best hair cut",
			  		"we had visited malls",
			  		"and parks of Indore",
			  		"and Most Importantly",
			  		"first time we celebrated your bdy together.",
			  		"We also visited Khajuraho",
			  		"and had taken lunch and some rest",
			  		"where I had eaten most costly food of my life",
			  		"and we had clicked beautiful pictures of ourself.",
			  		"Thank You for Watching This</br></br> visit tomorrow for Next Part",
			  	],
			  	[
			  		"Priviously You had seen",
			  		"PART V</br></br>Di Annivarsary",
			  		"There is two hobbies of my beautiful girlfriend",
			  		"first is shopping",
			  		"and second is hangout with friends",
			  		"wherever you  go",
			  		"you clicks many pictures",
			  		"whether it is shopping mall.",
			  		"or a historical place like Dhubela",
			  		"and whether you are wearing a traditional salwar suit",
			  		"or some modern fashioned outfits like shorts.",
			  		"Nither I spent much time with",
			  		"my always frustated girlfriend",
			  		"nor I celebrated festival",
			  		"like diwali with you.",
			  		"But every moment which I",
			  		"spent with you is",
			  		"memorable for my life.",
			  		"No matter where we are",
			  		"whether we are in your home",
			  		"or whether we are in our friends home",
			  		"and whether we are far away from each other",
			  		"or too close",
			  		"whether it is morning",
			  		"or noon",
			  		"or evening",
			  		"we,both of us",
			  		"love each other.",
			  		"Every time whwn i see this environmentalist",
			  		"wearing a sari like a",
			  		"young and mature lady",
			  		"I fantasize you",
			  		"as my future wife",
			  		"Thank You for Watching This</br></br> visit tomorrow for Next Part",
			  	],
			  	[
			  		"Priviously You had seen",
			  		"PART VI</br></br>Hotal",
			  		"As time passes",
			  		"Your image of cute and innocent girl",
			  		"is changed into sexy and",
			  		"young lady in my mind.",
			  		"when you reached Amarkantak",
			  		"you became more stylish",
			  		"and more cooperative.",
			  		"Even the communication between us decreases",
			  		"Our relation continues",
			  		"even our relation become more strong than before",
			  		"I become sleeping pill of this girl",
			  		"and she takes away my sleep.",
			  		"Now as you have your own car",
			  		"your trips with friends",
			  		"increasing day by day.",
			  		"Your fashion sense",
			  		"and your beautiful face",
			  		"make me crazy for you.",
			  		"Room No.-127, Hotal Hari Piorke",
			  		"Our first stay in hotal.",
			  		"you are too happy those days",
			  		"I enjoyed every moment of those days with you",
			  		"whether it is day or night.",
			  		"I take my best sleep ever",
			  		"and also ready for many night without sleep",
			  		"for such a moment</br>(My loving baby in my arms).",
			  		"You looks very sexy in my Shirt",
			  		"You eat my brain more than the food.",
			  		"You always want to try somthing new with your look",
			  		"aren't you..?",
			  		"Thank You for Watching This</br></br> visit tomorrow for Next Part",
			  	],
			  	[
			  		"Priviously You had seen",
			  		"PART VII</br></br>Live In",
			  		"First of all happy bdy my love",
			  		"As you already know that",
			  		"i like two things in body the most",
			  		"first is your beautiful face",
			  		"and other is your long silky hairs",
			  		"You looks beautiful",
			  		"but together be are awesome",
			  		"No matter how thin or fat you are",
			  		"no matter you shorter or taller than me",
			  		"I am alwys able to lift you up in my arms",
			  		"As today you are with me",
			  		"I promise you that",
			  		"no matter how you looks",
			  		"no matter what you become in future",
			  		"I always try to keep you happy",
			  		"and love you from the bottom of my heart",
			  		"and in my all life I am with you",
			  		"Do you notice that these 7 part consist our 7 year story.One yaer in each Part",
			  		"but some good images are still left there so now its time of showing them",
			  		"my loving Photographer",
			  		"my phone screen",
			  		"pic full of cuteness",
			  		"your creativity",
			  		"one of the best pic of us",
			  		"the sexy one",
			  		"your pics in sari in home",
			  		"in amarkantak",
			  		"in vadodara",
			  		"pic at your di annivarsary",
			  		"your wedding dress",
			  		"effects od photo editor",
			  		"pic of my kota visit",
			  		"your jabalpur trip",
			  		"the innocent pic",
			  		"and the last one</br>मेरी प्यारी अर्धांगनी",
			  		"thank you for watching this.</br>Love you always baby..:)",
			  	]
			  ]

var slideShowAnimationArray=[
							["slideUp","fade"],
							["zoomOut","zoomIn"],
							["zoomIn","slideUp"],
							["fade","slideUp"],
							["fade","rotateZomm"],
							["rotateZomm","rotateZomm"]
					   ]
var layoutArray= [
				"lower",
				"upper",
				"left",
				"right",
				"topRight",
				"topLeft",
				"bottomRight",
				"bottomLeft",
				"none"
			]
var photoFrameArray=[
						"round",
						"border",
						"mettalic",
						"outline",
						"leftTilted",
						"rightTilted"
					]
$(document).ready(function(){
	if(today.getTime()<pageStartDate.getTime())
	{
		$("div[data-role='main'] p").html("Please come after <b>"+pageStartDate.toDateString()+"</br><br/></br/><b>Thank You</b>");
		return;
	}
	else if(today.getTime()>endDate.getTime())
	{
		$("div[data-role='main'] p").html("This website had been closed on <b>"+endDate.toDateString()+"</br><br/></br/><b>Thank You</b>");
		return;
	}
	
	$("body").empty();
	createPages();
	createNavigationBar();
	createMainProgram();
	bdyPage();
	initilization();
	securityQuestions();
	swipeFunction();
	//var imgs = document.getElementsByClassName("slideShow");
	//alert(imgs.length);
	//imgs.forEach(setImegeDimention);
	/*$("img.slideShow").each(function(){
		$(this).css("clientheight");
	});*/
	$("div[id^='page-']").on("pagebeforeshow",function(){
		$("[data-role='navbar'] a.ui-btn-active").removeClass("ui-btn-active");
		var id="#"+$(this).attr("id");
		$("a[href='"+id+"']").addClass("ui-btn-active");
	});
	$(".cancel").click(function(){
		$(this).parents("div[data-role='popup']").popup("close");
	});
	$("form").submit(function(){
		var value=$(this).find("input.securityQues").val();
		var id=$(this).parents("div[data-role='popup']").attr("id");
		var formNo=$(this).attr("class").split("-")[1];
		var cAns;
		switch (formNo)
		{
			case "0":cAns="2011-07-13";break;
			case "1":cAns="VADODARA";break;
			case "2":cAns="PRAYOG@2003";break;
			case "3":cAns="1993-03-20";break;
			case "4":cAns="SURAT";break;
			case "5":cAns="PANIPURI";break;
			case "6":cAns="COCKTAIL";break;
		}
		if(value.toUpperCase()==cAns)
		{
			var lock=$(this).parents("div[data-role='page']").find("a[href='#"+id+"']").find("div.icon-lock").css("opacity","0");
			var lock=$(this).parents("div[data-role='page']").find("a[href='#"+id+"']").attr("href","#"+id+"-second");
			$(this).parents("div[data-role='page']").find("a[href='#"+id+"-second'] span ").css("animationPlayState","running");
			$(this).parents("div[data-role='popup']").popup("close");
		}
		else
		{
			$(this).find("p").css("display","block");
			return false;
		}
	});
	$( "div.firstPopUp" ).on( "popupafterclose", function( event, ui ) {
		$(this).find("p").css("display","none");
	} );
	$( "div[id$='second']" ).on( "popupafterclose", function( event, ui ) {
		var id=$(this).attr("id").split("-");
		var aid=$(this).attr("id");
		$("div#page-"+id[2]).find("a[href='#"+aid+"'] span").css("animationPlayState","paused");
		t.playState=false;
		t.index=0;
		t.empty();
		clearInterval(vartime);

	} );
	$( window ).on( "orientationchange", function( event ) {
  		orientationSattings();
	});
	$( "div[id$='second']" ).on("popupafteropen",function(event,ui){
		var id=parseInt($(this).attr("id").split("-")[1])+1;
		t.loc=$(this).find("div.photoFrame");

		t.empty();
		for(i=1;i<=photoText[id-1].length;++i)
		{
			
			t.addSlide("img/day "+id+"/image ("+i+").jpg",photoText[id-1][i-1]);
		}
		//var imgs = document.getElementsByClassName("slideShow");
		//imgs.forEach(setImegeDimention);
		//$("img.slideShow").each(setImegeDimention);
		var song="<audio autoplay >";
  		song+="<source src='audio/first.mp3' type='audio/mp3'>";
		song+="Your browser does not support the audio element.";
		song+="</audio>";
		//t.loc.append(song);
		t.play();
	});
	$( "div.firstPopUp" ).on("popupafteropen",function(event,ui){
		$(this).find("input.securityQues").focus();
	});
	$("")
	$("#wish").bind('oanimationend animationend webkitAnimationEnd', function() { 
   		$(this).fadeOut(3000);
   		nextBdyAnimation();
	});
	var id=pageEndDate.getDate();
	$("div#page-"+id).find("div.pageCenter").find("div.grid").bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e)
	{
		if(ANIINDEX==10)
			animationComplete();
		else
			temprary();
  	});

});
function setImegeDimention()
{
	//alert("hi");
	var myImage=$(this);
	var img = new Image();
	img.onload = function() {
  		if(parseInt(this.height)>parseInt(this.width))
  		{
  			//myImage.css({"height":"100%","width":"auto"});
  			
  			alert("hi "+this.height+"x"+myImage.height());
  		}
  		else
  		{
  			//myImage.css({"width":"100%","height":"auto"});
  			alert("hi "+this.height+"x"+myImage.clientHeight);
  		}
	}
	img.src = this.src;
	//this.onload=function(){
	//		alert(this.height);
	//	};
}
function swipeFunction()
{
	$( document ).on( "pageinit", "[data-role='page']", function() {
    	var page = "#" + $( this ).attr( "id" ),
	        next = "index.html#page-"+$( this ).jqmData( "next" ),
        	prev = "index.html#page-"+$( this ).jqmData( "prev" );
    	if ( next ) 
    	{
	        $.mobile.loadPage( next + ".html" );
        	$( document ).on( "swipeleft", page, function() {
        	    $.mobile.changePage( next , { transition: "slide" });
	        });
	    }
    	if ( prev ) 
    	{
        	$( document ).on( "swiperight", page, function() {
            	$.mobile.changePage( prev, { transition: "slide", reverse: true } );
        	});
    	}
	});
}

function securityQuestions()
{
	$("div[id^=myPopup-0-]").find("label").text(("On which date you had praposed me..?").toUpperCase());
	$("div[id^=myPopup-0-]").find("input.securityQues").attr("type","DATE");
	$("div[id^=myPopup-0-]").find("input.securityQues").attr("value","2011-07-13");

	$("div[id^=myPopup-1-]").find("label").text(("city where we kissed first time?").toUpperCase());
	$("div[id^=myPopup-1-]").find("input.securityQues").attr("type","text");
	$("div[id^=myPopup-1-]").find("input.securityQues").attr("value","VADODARA");

	$("div[id^=myPopup-2-]").find("label").text(("My common password of almost everything?").toUpperCase());
	$("div[id^=myPopup-2-]").find("input.securityQues").attr("type","PASSWORD");
	$("div[id^=myPopup-2-]").find("input.securityQues").attr("value","Prayog@2003");

	$("div[id^=myPopup-3-]").find("label").text(("DOB OF YOUR BOYFRIEND?").toUpperCase());
	$("div[id^=myPopup-3-]").find("input.securityQues").attr("type","DATE");
	$("div[id^=myPopup-3-]").find("input.securityQues").attr("value","1993-03-20");

	$("div[id^=myPopup-4-]").find("label").text(("City where we spent OUR FIRST NIGHT?").toUpperCase());
	$("div[id^=myPopup-4-]").find("input.securityQues").attr("type","text");
	$("div[id^=myPopup-4-]").find("input.securityQues").attr("value","SURAT");

	$("div[id^=myPopup-5-]").find("label").text(("favourite dish of your boy friend").toUpperCase());
	$("div[id^=myPopup-5-]").find("input.securityQues").attr("type","text");
	$("div[id^=myPopup-5-]").find("input.securityQues").attr("value","PANIPURI");
	
	$("div[id^=myPopup-6-]").find("label").text(("First movie we had watched together").toUpperCase());
	$("div[id^=myPopup-6-]").find("input.securityQues").attr("type","text");
	$("div[id^=myPopup-6-]").find("input.securityQues").attr("value","COCKTAIL");
}
function bdyPage()
{
	var id=pageEndDate.getDate();
	var cont=$("div#page-"+id).find("div[data-role='main']");
	cont.append($("<div id='myOverlay'></div>"));
	cont.append($("<h1 id='wish'></h1>").text("Happy Birth Day Sweatheart"));
	cont.find("div.grid").css({"backgroundColor":"transparent","border":"none"});
	cont.find("div#centerPopup a").prepend("<img id='imageGift' src='img/giftImage.jpg' alt='click me'/>");
	popUptext='<div class="ui-content ui-body-b"><form method="post" action="#" class="form-6">';
	popUptext+='<label for="securityQues"></label><input name="securityQues" class="securityQues" autofocus="on" autocomplete="off"/>';
	popUptext+='<p style="display:none">Incorrect Answer</br>Answer is case insensitive.</p>';
  	popUptext+='<div class="buttonPannel" >';
  	popUptext+='<input type="button" name="cancel" data-inline="true" class="cancel ui-btn ui-btn-b"  value="Cancel"/>';
  	popUptext+='<input type="submit" name="submit" data-inline="true" class="submit ui-btn ui-btn-b"  value="SUBMIT"/></div></form></div>';
	cont.find("div#centerPopup div#myPopup-6").append(popUptext);
	popUp2=$("<div data-role='popup' class='ui-content photoPopUp' id='myPopup-6-second' data-theme='b' data-transition='slideup' data-overlay-theme='a' data-dismissible='false'></div>");
	popUptext2='<a href="#" data-rel="back"  class="ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>';
	popUp2.append("<div class='photoFrame ui-content'></div>");
	popUp2.append(popUptext2);
	cont.find("div.centerDiv").append(popUp2);
}
function nextBdyAnimation()
{
	var id=pageEndDate.getDate();
	var cont=$("div#page-"+id).find("div.pageCenter");
	cont.find("div.grid").css("transform","translateY(-50%) translateX(-50%) scale(0.25)");
}
function temprary()
{
	ANIINDEX++;
	var id=pageEndDate.getDate();
	if(ANIINDEX==1)
	{
		$("div#page-"+id).find("div.pageCenter").find("div.grid").css({"transitionDuration":"100ms","transitionDelay":"50ms"});
		$("div#page-"+id).find("div.pageCenter").find("div.grid").css("transform","translateY(-50%) translateX(-50%) scale(1.25)");
	}
	else if(ANIINDEX==2)
	{
		//ANIINDEX++;
		$("div#page-"+id).find("div.pageCenter").find("div.grid").css({"transitionDuration":"2000ms","transitionDelay":"500ms"});
		$("div#page-"+id).find("div.pageCenter").find("div.grid").css("transform","translateY(-50%) translateX(-50%) scale(1.25) rotateZ(180deg)");
	}
	else if(ANIINDEX==3)
	{
		//ANIINDEX++;
		$("div#page-"+id).find("div.pageCenter").find("div.grid").css({"transitionDuration":"2000ms","transitionDelay":"1000ms"});
		$("div#page-"+id).find("div.pageCenter").find("div.centerDiv").css({"transition":"all 2s ease-in-out 1s","transform":"translateY(-50%) translateX(-50%) rotate("+180+"deg)"});
		$("div#page-"+id).find("div.pageCenter").find("div.grid").css("transform","translateY(-50%) translateX(-50%) scale(0.8) rotateZ(180deg)");
	}
	else if(ANIINDEX==4)
	{
		//ANIINDEX++;

		$("div#page-"+id).find("div.pageCenter").find("div.grid").find("div[class^='myBlock-']").css({"transitionDuration":"3000ms","transitionDelay":"500ms"});
		$("div#page-"+id).find("div.pageCenter").find("div.grid").find("div[class^='myBlock-']").css("border","10px dashed black");
	}
	else if(ANIINDEX==5)
	{
		var now=0;
		$("div#page-"+id).find("div.pageCenter").find("div.grid").css({"transitionDuration":"5000ms","transitionDelay":"2000ms"});
		$("div#page-"+id).find("div.pageCenter").find("div.centerDiv").css({"transition":"all 5s ease-in-out 2s","transform":"translateY(-50%) translateX(-50%) rotate("+now+"deg)"});
		$("div#page-"+id).find("div.pageCenter").find("div.grid").css("transform","translateY(-50%) translateX(-50%) scale(0) rotateZ(360deg)");
		//animationComplete();
	}
	
}
function animationComplete()
{
	$("#myOverlay").remove();
	$("img#imageGift").css("transform","scale(1)");
}
function PhotoFrame( loc,transitionDuration,standByDuration)
{

	var mySelf=this;
	mySelf.loc=loc||$("div.photoFrame");
	mySelf.tDur=transitionDuration||2000;
	mySelf.sDur=standByDuration||2000;
	mySelf.index="0";
	mySelf.playState=false;

	mySelf.addSlide=function(url,text){
		if(!url&&!text)
		{	
			return alert("no any image");
		}
		else
		{ 
			var div,div2,div3,img,p,check=true;
			div=$("<div class='slideContainer'></div>");
			div4=$("<div></div>");
			div2=$("<div class='imageContainer'></div>");
			div3=$("<div class='textContainer'></div>");
			img=$("<img class='slideShow'></img>");
			img.attr("src",url);
			div2.append(img);
			img.error(function(){
				div2.empty();
			});
			div4.append(div2);
			p=$("<p class='photoDescription'></p>").html(text);
			div3.append(p);
			div.append(div4);
			if(text)
				div.append(div3);
			mySelf.loc.append(div);	
		}
	};
	
	mySelf.empty=function(){
		mySelf.loc.empty();
	};
	mySelf.next=function(){
		var timeTextIn=10,timeImgIn=5,timeImgOut=5,timeTextOut=3,timeTotal;
		mySelf.loc.find("div[class*='photoanimation'],p[class*='photoanimation']").removeClass(function(index, className) {
    		return (className.match(/(^|\s)photoanimation-\S+/g) || []).join(' ');
		});
		var len=mySelf.loc.children().length;
		var anim=slideShowAnimationArray[genertaeRandomNumber(slideShowAnimationArray.length)];
		var layout=layoutArray[genertaeRandomNumber(layoutArray.length)];
		var frame=photoFrameArray[genertaeRandomNumber(photoFrameArray.length)];
		//layout="topLeft";
		if(frame=="round")
			anim=slideShowAnimationArray[0];
		if(mySelf.loc.parents("[data-role='popup']").attr("id").split("-")[1]=="0"&&mySelf.index==0)
		{
			layout="none";
			mySelf.loc.children().eq(mySelf.index).find("p").css({"fontFamily":"rye"});
		}
		
		if(!mySelf.playState)
		{	
			clearInterval(intervalVar);
			mySelf.loc.children().eq(mySelf.index).addClass("layout-"+layout+"Half");
			mySelf.loc.children().eq(mySelf.index).find("p").addClass("photoanimation-"+anim[0]+"-In");
			mySelf.loc.children().eq(mySelf.index).find("img").addClass("photoFrame-"+frame);
			mySelf.loc.children().eq(mySelf.index).find("div.imageContainer").addClass("photoanimation-"+anim[1]+"-In");
			mySelf.playState=true;
			timeTextIn=parseInt($(".photoanimation-"+anim[0]+"-In").css("animation").split(" ")[1])*1000;
			timeImgIn=parseInt($(".photoanimation-"+anim[1]+"-In").css("animation").split(" ")[1])*1000;
			ttotal=timeTextIn>timeImgIn?timeTextIn:timeImgIn;
			vartime=setTimeout(function(){ mySelf.next(); },ttotal+mySelf.sDur);
			return;
		}
		mySelf.loc.children().eq(mySelf.index).find("p").addClass("photoanimation-"+anim[0]+"-Out");
		mySelf.loc.children().eq(mySelf.index).find("div.imageContainer").addClass("photoanimation-"+anim[1]+"-Out");
		timeTextOut=parseInt($(".photoanimation-"+anim[0]+"-Out").css("animation").split(" ")[1])*1000;
		timeImgOut= parseInt($(".photoanimation-"+anim[1]+"-Out").css("animation").split(" ")[1])*1000;
		timeTotal=timeTextOut>timeImgOut?timeTextOut:timeImgOut;
		//var len=mySelf.loc.children().length-1;
		mySelf.index+=1;
		if(mySelf.index==len)
		{
			intervalVar=setTimeout( function() {
				clearInterval(intervalVar);
				mySelf.loc.parents("div[data-role='popup']").popup("close");
       		},timeTotal);
		}
		mySelf.index%=len;
		if((mySelf.loc.parents("[data-role='popup']").attr("id").split("-")[1]!=="0"&&mySelf.index==1)||(mySelf.loc.parents("[data-role='popup']").attr("id").split("-")[1]=="6"&&mySelf.index==20)||mySelf.index==len-1)
		{
			layout="none";
			mySelf.loc.children().eq(mySelf.index).find("p").css({"fontFamily":"rye"});
		}
		intervalVar=setTimeout( function() {
			mySelf.loc.find("div[class*='layout']").removeClass(function(index, className) {
    			return (className.match(/(^|\s)layout-\S+/g) || []).join(' ');
			});
			mySelf.loc.find("img[class*='photoFrame']").removeClass(function(index, className) {
    			return (className.match(/(^|\s)photoFrame-\S+/g) || []).join(' ');
			});
			mySelf.loc.children().eq(mySelf.index).addClass("layout-"+layout+"Half");
			mySelf.loc.children().eq(mySelf.index).find("p").addClass("photoanimation-"+anim[0]+"-In");
			mySelf.loc.children().eq(mySelf.index).find("img").addClass("photoFrame-"+frame);
            mySelf.loc.children().eq(mySelf.index).find("div.imageContainer").addClass("photoanimation-"+anim[1]+"-In");
            timeTextIn=parseInt($(".photoanimation-"+anim[0]+"-In").css("animation").split(" ")[1])*1000;
            timeImgIn= parseInt($(".photoanimation-"+anim[1]+"-In").css("animation").split(" ")[1])*1000;
            var ttotal=timeTextIn>timeImgIn?timeTextIn:timeImgIn;
           	vartime=setTimeout(function(){ mySelf.next(); },ttotal+mySelf.sDur);
       	}, timeTotal); 	
	};
	mySelf.play=function(){
		mySelf.next();
	};

}
function initilization()
{
	$( "div[id$='second']" ).popup({
  		afteropen: function( event, ui ) {}
	});
	$(  "div[id$='second']" ).popup({
  		afterclose: function( event, ui ) {}
	});
	if(window.matchMedia("(orientation: portrait)").matches)
	{
		$( "div[id$='second']" ).popup({
  			transition: "slideup"
		});
	}

	if (window.matchMedia("(orientation: landscape)").matches)
	{
		$( "div[id$='second']" ).popup({
  			transition: "slide"
		});
	}
}
function orientationSattings()
{
	if(window.matchMedia("(orientation: portrait)").matches)
	{
		$( "div[id$='second']" ).popup( "option", "transition", "slideup" );
	}

	if (window.matchMedia("(orientation: landscape)").matches)
	{
		$( "div[id$='second']" ).popup( "option", "transition", "slide" );
	}
}

$(document).on("pagechange",function(){
	var current = $(".ui-page-active").jqmData("title");
   	$("[data-role='navbar'] a.ui-btn-active").removeClass("ui-btn-active");
    $("[data-role='navbar'] a p span").each(function(){
   		if($(this).text()==current)
   			$(this).parents('a').addClass("ui-btn-active");
    });
});
function createPages()
{  

	var next,prev,total;
	total=noOfDays>6?6:noOfDays;
	for(i=0;i<=total;++i)
	{
		next=dateArray[(i+1)%(total+1)];
		prev=dateArray[(i-1+total+1)%(total+1)];
		var page='<div data-role="page" data-title="'+dateArray[i]+'" data-next="'+next+'"data-prev="'+prev+'" id="page-'+dateArray[i]+'">';
		page+='<div data-role="header" data-id="fixedHeader" data-theme="b" data-position="fixed" data-fullscreen="true">';
		page+='<div data-role="navbar" class="ui-body-b"></div></div>';
		page+='<div data-role="main" class="ui-content"><div class="pageCenter"><div class="centerDiv">';
		page+='<div id="centerPopup"><a href="#myPopup-'+i+'" data-rel="popup" class="ui-btn ui-btn-inline" ><div class="icon-lock"><div class="icon-lock-upperPart">';
		page+='<p class="icon-bin-cap-lower"></p></div><div class="icon-lock-lowerPart"><p class="vl"></p></div></div></a>';
		page+='<div data-role="popup" id="myPopup-'+i+'" data-dismissible="false"><p>HAPPY BIRTH DAY</p></div></div></div><div class="grid"></div></div></div>';		
		page+='<div data-role="footer" data-id="fixedFooter"  data-theme="b" data-position="fixed" data-fullscreen="true"><h1>Contact Me :  prakharmastain9@gmail.com</h1></div></div>';	
		$("body").append($(page));
		var id=i+1;	
		$("div#page-"+dateArray[i]).css("background","url('img/background/images ("+id+").jpg')");
	}
}
function createNavigationBar()
{
	var d = new Date();
	var nav=$('div[data-role="navbar"]');
	var list=$("<ul></ul>");
	for(i=0;i<=noOfDays&&i<=6;++i)
	{
			//alert(STARTDATE+7);
			var navli=$("<li></li>");
			var navLink=$("<a href='#page-"+dateArray[i]+"' data-transition='pop' class='ui-btn ui-btn-inline '></a>");
			var p=$("<p><span class='dateNo'>"+dateArray[i]+"</span>"+monthArray[i]+"</p>");
			navLink.append(p);
			navli.append(navLink);
			list.append(navli);
			var page='<div data-role="page" id="page-'+dateArray[i]+'">';
		}
		nav.append(list);
}
function createMainProgram()
{
	var str="PRAYOG",div,navlink,popUp,popUp2,popUptext2,popUptext,latter,lock;
	var d=new Date();
	for(i=0;i<=noOfDays&&i<=5;++i)
	{
		$(".grid").parents("[data-role='page']").each(function(){
			var id=$(this).attr('id');
			id=parseInt(id.substring(5,id.length));
			if(dateArray.indexOf(id)>=i)
			{	
				div=$("<div></div>");
				lock=$('<div class="icon-lock"><div class="icon-lock-upperPart"><p class="icon-bin-cap-lower"></p></div><div class="icon-lock-lowerPart"><p class="vl"></p></div></div>');
				navLink=$("<a href='#myPopup-"+i+"-"+id+"' data-rel='popup' data-position-to='window' class='ui-btn ui-btn-inline'></a>");
				latter=$("<span></span>").text(str[i]);
				popUp=$("<div data-role='popup' class='ui-content firstPopUp' id='myPopup-"+i+"-"+id+"' data-dismissible='false'></div>");
				popUp2=$("<div data-role='popup' class='ui-content photoPopUp' id='myPopup-"+i+"-"+id+"-second' data-theme='b' data-transition='slideup' data-overlay-theme='a' data-dismissible='false'></div>");
				popUptext2='<a href="#" data-rel="back"  class="ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>';
  				popUptext='<div class="ui-content ui-body-b"><form method="post" action="#" class="form-'+i+'">';
				popUptext+='<label for="securityQues">First name:</label><input type="text" name="securityQues" class="securityQues" autofocus="on" autocomplete="off"/>';
				popUptext+='<p style="display:none">Incorrect Answer</br>Answer is case insensitive</p>';
  				popUptext+='<div class="buttonPannel" >';
  				popUptext+='<input type="button" name="cancel" data-inline="true" class="cancel ui-btn ui-btn-b"  value="Cancel"/>';
  				popUptext+='<input type="submit" name="submit" data-inline="true" class="submit ui-btn ui-btn-b"  value="SUBMIT"/></div></form></div>';
				popUp.append(popUptext);
				navLink.append(latter);
				navLink.append(lock);
				div.append(navLink);
				div.append(popUp);
				popUp2.append("<div class='photoFrame ui-content'></div>");
				popUp2.append(popUptext2);
				div.append(popUp2);
				$(this).find(".grid").append(div);
			}
		});
	}
	$(".grid").gridding();
}
(function($, undefind)
{
	$.fn.gridding=function(){
		return this.each(function(){
			var grid=$(this),num,iterator;
			var kids=grid.children();
			if(kids.length)
			{if(kids.length>7)
			{
				iterator=String.fromCharCode(65+4-1);
				grid.addClass("myGrid-"+iterator);
			}
			else
			{
				iterator=String.fromCharCode(65+kids.length-1);
				grid.addClass("myGrid-"+iterator);
			}

			for(i=1;i<=iterator.charCodeAt(0)-65+1;++i)
			{
				kids.filter(":nth-child("+(iterator.charCodeAt(0)-65+1).toString()+"n+"+i+")").addClass("myBlock-"+String.fromCharCode(64+i));
			}}
		});	
	};
})(jQuery);
function genertaeRandomNumber(range,start)
{	
	if(start===undefined)
	{
		start=0;
	}
	return (parseInt(Math.random()*range)+start);
}