var CACE_NAME = 'prifile-v0';
var FiesToCache = [
					'/',
					'/partials/header.html',
				];
self.addEventListener('install',(event)=>{
	console.log('Reisterin Service worker');
	event.waitUntil(
		caches.open(CACE_NAME).then((cache)=>{
			console.log('cacin files');
			return cache.addAll(FiesToCache);
		})
	)
})
self.addEventListener('fetch',(event)=>{
	event.respondWith(
		caches.match(event.request).then((response)=>{
			if(response){
				console.log(response.text);
				return response;
			}
			if(event.request.mode == 'navigate' ){
				return caches.match('/partials/header.html');
			}
			else{
				console.log('non tml');
			}
			return fetch(event.request);
		})
	);
})