/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {clientsClaim} from 'workbox-core';
import {ExpirationPlugin} from 'workbox-expiration';
import {createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

clientsClaim();

/**
 * We are not wrapping it in a 'message' event as per the new update.
 * @see https://developers.google.com/web/tools/workbox/modules/workbox-core
 */
self.skipWaiting();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
// @see https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    }),
);

// Cache the underlying font files with a cache-first strategy for 1 year.
// @see https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    }),
);
// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
    // Return false to exempt requests from being fulfilled by index.html.
    ({request, url}) => {
        // If this isn't a navigation, skip.
        if (request.mode !== 'navigate') {
            return false;
        }

        // If this is a URL that starts with /_, skip.
        if (url.pathname.startsWith('/_')) {
            return false;
        }

        // If this looks like a URL for a resource, because it contains // a file extension, skip.
        if (url.pathname.match(fileExtensionRegexp)) {
            return false;
        }

        // Return true to signal that we want to use the handler.
        return true;
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'),
);

registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({url}) =>
        url.pathname.endsWith('.ico') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.jpeg') ||
        url.pathname.endsWith('.jpg') ||
        url.pathname.endsWith('.webp'),
    new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            // Ensure that once this runtime cache reaches a maximum size the
            // least-recently used images are removed.
            new ExpirationPlugin({maxEntries: 250}),
        ],
    }),
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
// self.addEventListener('message', (event) => {
//     if (event.data && event.data.type === 'SKIP_WAITING') {
//         self.skipWaiting();
//     }
// });

const debugOrInspectorRegexp = /\/debug|inspect\//i;
self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.mode === 'navigate') {
        return;
    }

    if (request.url.match(fileExtensionRegexp)) {
        return;
    }

    if (request.url.match(debugOrInspectorRegexp)) {
        return;
    }

    event.respondWith(
        fetch(event.request).then((response) => {
            notify(event.clientId, request, response);

            return response;
        }),
    );
});

function notify(clientId, request, response) {
    // console.log('notify', request, response);
    const events = [
        {
            type: 'FETCH',
            payload: {
                headers: Object.fromEntries(response.headers),
                url: request.url,
                method: request.method,
                status: request.status,
            },
        },
    ];
    events.map((event) => {
        self.clients.get(clientId).then((client) => {
            // console.log('client', client);
            client.postMessage(event);
        });
        // self.clients.matchAll().then((all) => {
        //     all.map((client) => client.postMessage(eventToSend));
        // });
    });
}
