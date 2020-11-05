importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
    console.log(`Workbox dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/404.html', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/assets/css/main.css', revision: '1' },
        { url: '/assets/css/materialize.min.css', revision: '1' },
        { url: '/assets/img/fav.png', revision: '1' },
        { url: '/assets/img/icon-192.png', revision: '1' },
        { url: '/assets/img/icon-512.png', revision: '1' },
        { url: '/assets/img/icon.png', revision: '1' },
        { url: '/assets/img/loading.gif', revision: '1' },
        { url: '/assets/js/api.js', revision: '1' },
        { url: '/assets/js/db.js', revision: '1' },
        { url: '/assets/js/helper.js', revision: '1' },
        { url: '/assets/js/idb.js', revision: '1' },
        { url: '/assets/js/materialize.min.js', revision: '1' },
        { url: '/assets/js/script.js', revision: '1' },
        { url: '/assets/js/sw-register.js', revision: '1' },
        { url: '/pages/favorite.html', revision: '1' },
        { url: '/pages/home.html', revision: '1' },
        { url: '/pages/team.html', revision: '1' },
    ]);

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.networkFirst({
            cacheName: 'football-data',
        })
    );

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages',
        })
    );

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'image',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

    workbox.routing.registerRoute(
        /\.(?:js)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'js',
        })
    );

}else
    console.log(`Workbox gagal dimuat`);

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

