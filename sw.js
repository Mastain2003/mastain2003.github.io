var CACHE_NAME = 'portFolio-v1';
var FilesToCache = [
					'/',
					'index.html',
					'/video/webApp_Animation_poster.webp',
					'/video/webApp_Animation.webm'

				];
self.addEventListener('install',(event)=>{
	console.log('Reistering Service worker..');
	self.skipWaiting();
	console.log("skipped");
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache)=>{
			console.log('caching files..');
			return cache.addAll(FilesToCache);
		}).catch(function(error){
			console.log("error: "+error)
		})
	)
})
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
  event.waitUntil(clients.claim());
});
self.addEventListener('fetch',function(e){
if (e.request.url.substr(-5,5) != '.json'){
	//console.log(""+e.request.url.substr(-5,5)+" "+e.request.destination);	
	e.respondWith(
		caches.open(CACHE_NAME).then(function(cache){
			return cache.match(e.request).then(function(r){
			    return r || fetch(e.request).then(function(response){
			          cache.put(e.request, response.clone());
			          return response;
			    });
			}).catch(function(error){
					return cache.match("offline.html")
			})
		})
	)
}else{
	//console.log("qwerty"+e.request.destination)
	return fetch(e.request)
}	
});
/*

//Stale while revalidate
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
  } else {
    return;
  }
});


self.addEventListener('fetch', async (event) => {
  // Is this a request for an image?
  if (event.request.destination === 'image') {
    // Open the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Respond with the image from the cache or from the network
      return cache.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
          // Add the network response to the cache for future visits.
          // Note: we need to make a copy of the response to save it in
          // the cache and use the original as the request response.
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});
*/
/*self.addEventListener('fetch',(event)=>{
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
})*/