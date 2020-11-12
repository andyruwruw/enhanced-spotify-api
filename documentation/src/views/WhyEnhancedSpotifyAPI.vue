<template>
    <div class="WhyEnhancedSpotifyAPI page-content">
        <v-breadcrumbs :items="path"></v-breadcrumbs>
        <div style="padding-left: 24px">
            <h1 class="display-1">Why Enhanced Spotify API?</h1>
            <p><a href="https://www.npmjs.com/package/enhanced-spotify-api">Enhanced Spotify API</a> allows developers to interact with <a href="https://developer.spotify.com/documentation/web-api/">Spotify's API</a> in a more intuitive manner.</p>
            <p>It does the work, so you can spend less time looking through documentation, and more time coding!</p>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h1 class="display-1">Object Oriented Wrapper</h1>
            <p>Spotify's API consists of grouped endpoints, allowing retrieval of metadata for a collection of objects.</p>
            <p>This library <span class="highlight">combines relevent endpoints into classes</span>.</p>
            <p>For example, all endpoints relevant to tracks are available as member functions within the <span class="highlight">Track</span> class.</p>
            <p>Once you've initialized an instance of the <span class="highlight">Track</span> class with a <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids" class="highlight">Spotify Track ID</a>, it's member functions will allow you to run any track related endpoints to gather its data.</p>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h1 class="display-1">Retrieves Data When You Need It</h1>
            <p><span class="highlight">Data is automatically retrieved</span> from Spotify's API when needed.</p>
            <p>Prior to making any requests, class instances ensure the data hasn't already been retrieved.</p>
            <p>Ensuring <span class="highlight">requests are never unnecessarily made multiple times</span>.</p>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h1 class="display-1">Minimal Requests</h1>
            <p>Spotify provides endpoints for retriving metadata for multiple items in one request.</p>
            <p>Enhanced Spotify API's <span class="highlight">container classes</span> take advantage of these endpoints and act as arrays.</p>
            <p>They contain the same methods as their singular counterparts but <span class="highlight">ensure the retrieval of metadata is done in as few requests as possible</span>.</p>
            <p>For example, if you wanted to retrieve data for a set of tracks, rather than running through an array of array of <span class="highlight">Track</span> instances, you should use the <span class="highlight">Tracks</span> container class takes advantage of Spotify's <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/">Get Several Tracks</a> endpoint to gather all the data in one request.</p>
            <p>Containers maintain the order by which items are inserted like a traditional array, but stores their data in a hashmap. Ensuring you're never storing or requesting the same track twice while still giving you the option to have duplate items.</p>
            <p>These containers also contain additional methods not available through Spotify API endpoints, such as the average audio features of a set of tracks.</p>
            <p>Many of the common javascript array functions have been implemented into the class.</p>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h1 class="display-1">All the Original Functionality of <a href="https://github.com/thelinmichael/spotify-web-api-node">spotify-web-api-node</a></h1>
            <p><a href="https://doxdox.org/jmperez/spotify-web-api-js">spotify-web-api</a> is a lightweight wrapper for Spotify's API, written by José Manuel Pérez, with member functions for every one of Spotify's endpoints.</p>
            <p>This library uses a customized version of <a href="https://github.com/thelinmichael/spotify-web-api-node">spotify-web-api-node</a> to make requests.</p>
            <p>I fixed all broken endpoints (pull requests the maintainers have yet to accept) and added Spotify's newest endpoints (pull request pending as well).</p>
            <p>The <span class="highlight">Wrapper</span> class inherits from spotify-web-api-node and can be used in the same way to make traditional requests without the additional classses.</p>
        </div>
    </div>
</template>

<script>
//import HelloWorld from '@/components/HelloWorld.vue'
export default {
    name: 'WhyEnhancedSpotifyAPI',
    components: {

    },
      data: () => ({
        path: [
            { text: 'Introduction', disabled: true },
            { text: 'Why Enhanced Spotify API?', disabled: true },
        ]
    }),
}
</script>