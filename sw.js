// Define el nombre de la caché para la aplicación
const CACHE_NAME = 'cronoseries-cache-v1';

// Lista de archivos y rutas a cachear cuando el Service Worker se instala
const urlsToCache = [
    './' // Cachea la página principal (index.html)
];

// Evento 'install': Se dispara cuando el Service Worker se instala por primera vez.
self.addEventListener('install', event => {
    // Espera hasta que la promesa dentro de waitUntil se complete.
    event.waitUntil(
        // Abre la caché con el nombre especificado.
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierta');
                // Añade todos los archivos de la lista a la caché.
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento 'fetch': Se dispara cada vez que la página realiza una petición de red (ej. cargar una imagen, un script, etc.).
self.addEventListener('fetch', event => {
    // Responde a la petición con una promesa.
    event.respondWith(
        // Busca si la petición ya existe en la caché.
        caches.match(event.request)
            .then(response => {
                // Si se encuentra una respuesta en la caché, la devuelve.
                if (response) {
                    return response;
                }
                // Si no se encuentra en la caché, realiza la petición a la red.
                return fetch(event.request);
            }
        )
    );
});
