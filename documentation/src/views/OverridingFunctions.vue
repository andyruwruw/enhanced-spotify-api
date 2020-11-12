<template>
    <div class="OverridingFunctions page-content">
        <v-breadcrumbs :items="path"></v-breadcrumbs>
        <div style="padding-left: 24px">
            <h1 class="display-1">Overriding Functions</h1>

            <p>Guide for overriding any methods of the included classes.</p>

            <p><code>Override</code> is a static method available in each Data Access Objects that allows you to rewrite class methods.</p>

            <p>You could honestly do this yourself pretty easily. But here's a method.</p>

            <MethodBlock :name="override.name" :code="override.code" :returns="override.returns" :parameters="override.parameters" style="margin-top: 32px">
                <div slot="overview">
                    <div style="padding: 0px 24px">
                        <p>Static method contained in every class in the library. Replaces functionality to the class.</p>
                        <p>This will not add new functions. Instead visit <a href="http://enhancedspotifyapi.com/customization/adding-functionality">Adding Functionality</a> instead if you wish to write new methods.</p>
                        <p>Visit class pages for implimented methods and properties.</p>
                        <h3 class="headline" style="margin-top: 24px;">Contributions</h3>
                        <p>Did I write something poorly? Send a <a href="https://github.com/andyruwruw/enhanced-spotify-api/pulls">pull request</a>!</p>
                    </div>
                </div>
                <pre slot="example">
                // Importing the Album Object
                var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
                var Album = EnhancedSpotifyAPI.Track;

                // Overriding 
                Album.override('play', (wrapper, options) => {
                    try {
                        let _options = options ? options : {};
                        let tracks = await this.retrieveTracks(wrapper);
                        _options.offset = Math.round(Math.random() * (tracks.size() - 1));
                        _options.context_uri = 'spotify:album:' + this.id;
                        return await wrapper.play(_options);
                    } catch (error) {
                        throw error;
                    }
                });

                // Force all other classes to return our new Track Object
                EnhancedSpotifyAPI.use(Album);

                // Export an edited version of the library.
                module.exports = EnhancedSpotifyAPI;
                // Or use the new Album class here!
                var album = new Album( '0GaYG9L1sXHQZZ7BTk0hGY' );
                </pre>
                <pre slot="src">
               Class.override = function(name, method) {
                    if (this.prototype.hasOwnProperty(name)) {
                        this.prototype[name] = method;
                    } else {
                        throw new Error("Episode.override: \"name\" does not exist.");
                    }
                };
                </pre>
            </MethodBlock>

            <v-divider style="margin: 40px 0px;"></v-divider>

            <h1 class="display-1" style="margin-top: 40px">Finalizing Edits</h1>

            <p><span class="highlight">This is a needed step</span> if you plan on using multiple classes and adding functionality.</p>

            <p>After making changes to a class, you need to inform the library of your changes.</p>

            <MethodBlock :name="use.name" :code="use.code" :returns="use.returns" :parameters="use.parameters" style="margin-top: 32px">
                <div slot="overview">
                    <div style="padding: 0px 24px">
                        <p>Ensures all other classes will return an instance of your edited class.</p>

                        <p>This is a <span class="highlight">required step</span> if you plan on using multiple classes and adding functionality.</p>

                        <p>For example if you edit the <span class="highlight">Album</span> class, unless you inform the library of your changes, the <span class="highlight">Track</span> class' method <span class="highlight">getAlbum()</span> will return an un-edited instance of the <span class="highlight">Album</span> class.</p>
                    </div>
                </div>
                <pre slot="example">
                // Importing the Track Object
                var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
                var Track = EnhancedSpotifyAPI.Track;

                // Make your edits to the Track Class
                Track.addMethods({
                    sayHello: function() {
                        console.log( "hello" );
                    }
                });
                
                // Force all other classes to use your edited Track Class
                EnhancedSpotifyAPI.use(Track);

                // Export from here!
                module.exports = EnhancedSpotifyAPI;
                // Or use directly
                var track = new Track( "1J9iVCaEriyoMXpj2XszhU" );
                </pre>
                <pre slot="src">
               EnhancedSpotifyAPI.use = function(model) {
                    try {
                        if (typeof(model) != 'function') {
                            throw new Error("enhanced-spotify-api.use: Invalid parameter \"model\".");
                        }
                        this.__defineGetter__(model.constructor.name, model);
                    } catch (error) {
                        throw error;
                    }
                };
                </pre>
            </MethodBlock>

        </div>
    </div>
</template>

<script>
import MethodBlock from '@/components/MethodBlock.vue'

export default {
    name: 'OverridingFunctions',
    components: {
        MethodBlock
    },
    data: () => ({
        path: [
            { text: 'Customization', disabled: true },
            { text: 'Overriding Functions', disabled: true },
        ],
        override: {
            name: "Override",
            code: "override(name, method)",
            classes: ['Wrapper','Track','Tracks','Artist','Artists','Album','Albums','Playlist','Playlists','Category','Categories','Show','Shows','Episode','Episodes','Playback','User'],
            returns: "void",
            parameters: [
                { name: "name", types: ["string"], description: "Name of method to replace."},
                { name: "method", types: ["function"], description: "Function to replace old method with."},
            ]
        },
        use: {
            name: "Use Override",
            code: "use(model)",
            returns: "void",
            parameters: [
                { name: "model", types: ["Function"], description: "Edited class of an Enhanced Spotify API class."},
            ]
        }
    }),
}
</script>