const CACHE_NAME = 'sub2-pwa-1';
const urlsToCache = [
	'/',
	'/index.html',
	'/manifest.json',
	'/nav.html',
	'/assets/css/main.css',
	'/assets/css/materialize.min.css',
	'/assets/img/fav.png',
	'/assets/img/icon-192.png',
	'/assets/img/icon-512.png',
	'/assets/img/loading.gif',
  	"/assets/js/api.js",
  	"/assets/js/db.js",
  	"/assets/js/helper.js",
  	"/assets/js/idb.js",
	'/assets/js/materialize.min.js',
	'/assets/js/script.js',
	'/assets/js/sw-register.js',
	'/pages/favorite.html',
	'/pages/home.html',
	'/pages/team.html'
];

self.addEventListener("install", event => {
	console.log("ServiceWorker: Menginstall..");
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
        	console.log("ServiceWorker: Membuka cache..");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
    );
});

self.addEventListener("fetch", event => {
	const base_url = "https://api.football-data.org/"

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("push", event => {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'icon-512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

