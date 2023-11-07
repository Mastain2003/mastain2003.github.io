if('serviceWorker' in navigator){
	navigator.serviceWorker.register('sw.js',{scope:"./"}).then(function(reg){
		console.log("Service Worker registering. Scope is : "+reg.scope)
		reg.addEventListener('updatefound',function(){
			reg.installing.addEventListener('statechange',function(e){
				if(reg.active&&e.target.state==="installed"){
					const updatePopUp = document.getElementsByClassName('updateNoti');
					if(updatePopUp.length){
						const body =document.getElementsByTagName('body')[0];
						var i =0;
						while(updatePopUp.length)
							body.removeChild(updatePopUp[i++]);
							reg.getNotifications({tag:1}).then(function(list){
								console.log('list');
								list.forEach(function(item){
									item.close();
								})
							})
					}
					displayNotification('Updated recieved',"Content Has been updated, To view latest content open your app again.","img/defaults/handShake/handShake@405.png");
					updateNotification(e.target);
				}
			})
		})
		if(reg.waiting){
			displayNotification('Updated recieved',"Content Has been updated, To view latest content open your app again.","img/defaults/handShake/handShake@405.png");
			updateNotification(reg.waiting);
		}
	})
	navigator.serviceWorker.addEventListener('message',function(e){
		if(e.data==='reload') window.location.reload();
	})													
}
function displayNotification(title,body,img){
	if(Notification.permission=='granted'){
		navigator.serviceWorker.getRegistration().then(function(reg){
			var date = new Date();
			var t = date.getTime();
			var nTitle = title||"Message From PM Blog";
			var image = img||'img/defaults/handShake/handShake@405.png';
			var nbody = body||'This is Notifiaction From Prakhar Mastain, View It to see updates.';
			var options ={
				body:nbody,
				icon:'img/defaults/logo192.png',
				vibrate:[100, 30, 100, 30, 100],
				data: {
					dateOfArrival: Date.now(),
					primaryKey:1
				},
				actions: [
					{
						action:'view',
						title:'VIEW',
						icon:'img/defaults/logo192.png'
					},
					{
						action:'close',
						title:'VIEW',
						icon:'img/defaults/logo192.png'
					}
				],
				timestamp:t,
				badge:'img/defaults/logo192.png',
				image:image,
			};
			reg.showNotification(nTitle,options);
		})
	}
}
function updateNotification(sw){
	var n  = document.createElement('div');
	n.className = "showModelContainer updateNoti";
	const notiPattern =`<div class="overlay"></div><div class="modelBox"><div class="wrapper"><div style="max-width:300px"><p style="text-align:justify;font-size:1.4rem">Please Relaod the Page</p></div><div style="margin-top:5%;text-align:right"><button style="margin:auto; margin-right:5%;display:inline-block;width:auto;padding:1%;font-size:1.35rem" onclick="this.parentElement.parentElement.parentElement.parentElement.style.display='none';">Close</button><button class="buttonLinkWrapper" style="margin:auto;display:inline-block;width:auto;padding:1%;font-size:1.35rem">Update</button></div></div><div class="closeModel" onclick="this.parentElement.parentElement.style.display='none';"><span>X</span></div></div>`;
	n.innerHTML = notiPattern;
	n.lastElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML=window.matchMedia('(display-mode:standalone)').matches?"Content has been changed. to view the latest content please close the app and reopen it again":"Content has been changed. to view the latest content press Update";
	n.querySelectorAll('button')[1].addEventListener('click',function(){
		sw.postMessage('skipWaiting');
	})
	document.getElementsByTagName('body')[0].appendChild(n);
	n.style.display="block";
}