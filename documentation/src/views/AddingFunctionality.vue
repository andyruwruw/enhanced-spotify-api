<template>
    <div class="AddingFunctionality page-content">
        <v-breadcrumbs :items="path"></v-breadcrumbs>
        <div style="padding-left: 24px">
            <h1 class="display-1">Adding Functionality</h1>

            <p>Guide for writing additional functionality for any of the included classes.</p>

            <p>For my own project, I needed to have the Data Access Objects connected to a <a href="https://www.mongodb.com/">Mongo Database</a>. Retrieving data from the Database as often as possible as opposed to
            making requests to Spotify's API</p>

            <p><code>Add Methods</code> is a static method available in each Data Access Objects that allows you to add functionality.</p>

            <MethodBlock :name="addMethods.name" :code="addMethods.code" :returns="addMethods.returns" :parameters="addMethods.parameters" style="margin-top: 32px">
                <div slot="overview">
                    <div style="padding: 0px 24px">
                        <p>Static method contained in every class in the library. Adds functionality to the class.</p>

                        <p>Visit class pages for implimented methods and properties.</p>

                        <h3 class="headline" style="margin-top: 24px;">Contributions</h3>

                        <p>If you have any super cool additions you think should be apart of this package, send a pull request!</p>
                    </div>
                </div>
                <pre slot="example">
                // Importing the Track Object
                var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
                var Track = EnhancedSpotifyAPI.Track;

                // Passing in object with functions as properties.
                Track.addMethods({
                    containsDatabaseObject: () => {
                        return ((this.name != null) && (this.artists != null) && (this.album != null));
                    },

                    saveToDatabase: async (wrapper) => {
                        try {
                            if (!this.containsDatabaseObject()) {
                                this.retrieveFullObject(wrapper);
                            }
                            let track = new TrackModel({
                                _id: this.id,
                                name: this.name,
                                artists: this.artists,
                                album: this.album
                            });
                            await track.save();
                        } catch (error) {
                            throw error;
                        }
                    }
                });

                // Force all other classes to return our new Track Object
                EnhancedSpotifyAPI.use(Track);

                // You can now import an edited version of the library.
                module.exports = EnhancedSpotifyAPI;
                </pre>
                <pre slot="src">
               Class.addMethods = function(methods) {
                    for (let method in methods) {
                        this.prototype[method] = methods[method];
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
                var track = new Track( '1J9iVCaEriyoMXpj2XszhU' );
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
    name: 'AddingFunctionality',
    components: {
        MethodBlock
    },
    data: () => ({
        path: [
            { text: 'Customization', disabled: true },
            { text: 'Adding Functionality', disabled: true },
        ],
        addMethods: {
            name: "Add Methods",
            code: "addMethods(methods)",
            returns: "void",
            parameters: [
                { name: "methods", types: ["Object"], description: "Object containing new methods to be added as properties."},
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
