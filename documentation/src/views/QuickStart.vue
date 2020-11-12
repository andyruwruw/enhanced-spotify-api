<template>
    <div class="QuickStart page-content">
        <v-breadcrumbs :items="path"></v-breadcrumbs>
        <div style="padding-left: 24px">
            <h1 class="display-1">Quick Start</h1>
            <p>Get started with using <a href="https://developer.spotify.com/documentation/web-api/">Spotify's API</a> with the help of the <a href="https://www.npmjs.com/package/enhanced-spotify-api">Enhanced Spotify API library</a>.</p>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h2 class="display-1">Installation</h2>
            <p>Install via npm:</p>
            <highlight-code lang="bash">
            $ npm install enhanced-spotify-api
            </highlight-code>
            <p>Once you've installed the library into your project you can import all the classes or just the ones you need.</p>
            <p>Import the entire library:</p>
            <highlight-code lang="javascript"><pre>
            var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
            </pre></highlight-code>
            <p>or import specific classes:</p>
            <highlight-code lang="javascript"><pre>
            var { Track, Tracks, Artist } = require( 'enhanced-spotify-api' );
            </pre></highlight-code>
            <p>YAY! But before you go to town, you need to authenticate your requests.</p>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h2 class="display-1">Authentication</h2>
            <p>Spotify's API requires that you authenticate prior to making any requests. They've written a guide on <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/">how to retrieve an access token</a>.</p>
            <p>You can pass your access token directly into the imported library through it's set method:</p>
            <highlight-code lang="javascript"><pre>
           var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
            var Track = EnhancedSpotifyAPI.Track;

            // Pass in the access token
            EnhancedSpotifyAPI.setAccessToken(accessToken);

            // This will be authorized.
            var track = new Track("1J9iVCaEriyoMXpj2XszhU");
            await track.play();
            </pre></highlight-code>
            <p>All classes instatiated will be authenticated and work as long as their requests are within scope.</p>
            <p>If you chose to import specific classes, you only need to pass and access token into one of the imported class's set methods:</p>
            <highlight-code lang="javascript"><pre>
           var { Track, Tracks, Artist } = require( 'enhanced-spotify-api' );

            // Pass in the access token
            Track.setAccessToken(accessToken);

            // This will be authorized.
            var artist = new Artist("3WrFJ7ztbogyGnTHbHJFl2");
            await artist.play();
            </pre></highlight-code>
            <p>Setting an access token through a specific class will set it for all other classes.</p>
            <p>From here you're free to read class specific documentation.</p>
            <p>Happy coding.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuickStart',
    components: {
        
    },
    data: () => ({
        path: [
            { text: 'Introduction', disabled: true },
            { text: 'Quick Start', disabled: true },
        ]
    }),
}
</script>

<style scoped> 
.class-link {
    margin: 10px;
}
</style>