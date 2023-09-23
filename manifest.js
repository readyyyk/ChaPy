export default {
    manifest: {
        name: 'ChaPy',
        short_name: 'ChaPy',
        icons: [
            {
                src: '/chapy512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                "src": "/chapy192.png",
                "type": "image/png",
                "sizes": "192x192"
            },
            {
                "src": "/favicon.ico",
                "type": "image/x-icon",
                "sizes": "16x16"
            },
        ],
        start_url: '/',
        scope: '/',
        'background_color': '#441300',
        'theme_color': '#441300',
        display: 'standalone',
        shortcuts: [
            {
                'name': 'Random chat',
                'short_name': 'Random chat',
                'description': 'Enter chat with random id',
                'url': '/new_chat',
                'icons': [{ 'src': '/plus.png', 'sizes': '96x96' }],
            },
        ],
    },
    workbox: {
        runtimeCaching: [
            {
                urlPattern: ({ url }) => url.pathname.startsWith('/'),
                handler: 'CacheFirst',
            },
        ],
    },
}