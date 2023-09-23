export default {
    manifest: {
        name: "ChaPy",
        short_name: "ChaPy",
        icons: [
            {
                src: "./src/assets/chapy.png",
                sizes: "396x396",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
        start_url: "/",
        scope: "/",
        background_color: "#441300",
        theme_color: "#441300",
        display: "standalone",
        shortcuts: [
            {
                "name": "New random chat",
                "short_name": "New chat",
                "description": "Enter chat with random id",
                "url": "/new_chat",
            },
        ],
    },
    workbox: {
        runtimeCaching: [
            {
                urlPattern: ({ url }) => url.pathname.startsWith("/"),
                handler: "CacheFirst",
            },
        ],
    },
}