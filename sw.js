/* Cache files for offline mode */

let staticCacheName = 'restaurant-review-app';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(
        [
          'index.html',
          'restaurant.html',
          'css/styles.css',
          'data/restaurants.json',
          'js/dbhelper.js',
          'js/main.js',
          'js/restaurant_info.js',
     		  'img/1.jpg',
     		  'img/2.jpg',
     		  'img/3.jpg',
     		  'img/4.jpg',
     		  'img/5.jpg',
     		  'img/6.jpg',
     		  'img/7.jpg',
     		  'img/8.jpg',
     		  'img/9.jpg',
     		  'img/10.jpg'
        ]
      );
    })
  );
});

/* Delete old caches */

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

/* Respond with an entry from the cache if there is one 
   If there isn`t, fetch from the network. */

self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});