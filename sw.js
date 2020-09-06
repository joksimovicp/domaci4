const staticAssets = [
  './index.html',
  './',
  './css/style.css',
  './index.js',
  './cars.html',
  './drivers.html',
  './login.html',
  './signup.html',
  './js/indexScripts.js',
  './js/jquery-3.2.1.js',
  './img/antp.jpg',
  './img/brazil.jpg',
  './img/brazil1.jpg',
  './img/brazil2.jpg',
  './img/carsback.jpg',
  './img/enzo.jpg',
  './img/f1.png',
  './img/favicon.ico',
  './img/favicon1.ico',
  './img/formback.jpg',
  './img/inst.png',
  './img/italia.jpg',
  './img/kimi.jpg',
  './img/logo.png',
  './img/maurizio.jpg',
  './img/mexico1.jpg',
  './img/mexico2.jpg',
  './img/mexico3.jpg',
  './img/seb.jpg',
  './img/sebp.jpg',
  './img/sf15t1.jpg',
  './img/sf15t2.jpg',
  './img/sf16h1.jpg',
  './img/sf16h2.jpg',
  './img/sf70h1.jpg',
  './img/sf70h2.jpg',
  './img/sf2007.jpg',
  './img/sfbanner.jpg',
  './img/sumi.jpg',
  './img/team.jpg',
  './img/tradition.png',
  './img/twit.png',
  './offline.html',
  './css/animate.css',
  './js/offlineMode.js',
  './manifest.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
  'https://code.jquery.com/ui/1.12.1/jquery-ui.js',
];

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('static-assets').then(cache => {
      return cache.addAll(staticAssets)
    }).catch(function(message){
      console.log('Error opening cache', message);
      
    })
  )
})

this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (resp) {
      return resp || fetch(event.request).then(function (response) {
        return caches.open('static-assets').then(function (cache) {
          cache.put(event.request, response.clone())
          return response
        })
      }).catch(() => {
         console.log('Fetch failed; returning offline page instead.');
        return caches.open('static-assets').then(function (cache) {
          cache.match('offlne.html').then(function (cachedResponse) {
            return cachedResponse
          })
        });
     
      })
    })
  )
})
