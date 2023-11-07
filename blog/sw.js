/*comments*/////
var CACHE_NAME="PM-Blog-offline-v1";
var urlsToCache=["index.html","data.xml","album.xml","offline.html","img/defaults/logoIcon.png","img/defaults/logo.svg"];

self.addEventListener("install",function(event){
	console.log('new Serivice worker installed');
	event.waitUntil(caches.open(CACHE_NAME).then(function(cache){
		return cache.addAll(urlsToCache)
	}).catch(function(error){
		console.log("error: "+error)
	}))
});


self.addEventListener('activate', function(event){ 
  var cacheKeeplist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.matchAll().then(function(clents){
  	clents.forEach(function(client){
 		client.postMessage('reload');
 	})
  })
  self.clients.claim()
});

self.addEventListener('message',function(e){
	if(e.data==="skipWaiting"){
		e.target.skipWaiting();
	}
});
self.addEventListener('notificationclose',function(e){
	var notification = e.notification;
	var pKey = notification.data.primaryKey;
	console.log('notification closed: '+pKey);
})
self.addEventListener('notificationclick',function(e){
	var notification = e.notification;
	var pKey = notification.data.primaryKey;
	var action = e.action;
	if(action==='close'){
		console.log('notification closed by action');
		notification.close();
	}
	else{
		console.log('new Window');
		clients.openWindow('http://localhost/timePass/');
	}
})
self.addEventListener('fetch',function(e){
	e.respondWith(
		caches.open(CACHE_NAME).then(function(cache){
			return  cache.match(e.request).then(function(r){
				return r||fetch(e.request).then(function(r){ 
					cache.put(e.request,r.clone());
					return r;
				})
			}).catch(function(){
				console.log("offline.html");
			})
		})
	)
});















