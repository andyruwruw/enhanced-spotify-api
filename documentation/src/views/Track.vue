<template>
    <div class="Track">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Track Class</h1>
            <p>The <span class="highlight">Track</span> class is used to maintain and retrieve data from Spotify's API for a given track.</p>
            <p>If you are handling <span class="highlight">multiple tracks</span>, use the <a href="http://EnhancedSpotifyAPI.com/container/tracks">Tracks</a> container class for better efficiency and functionality.</p>
            <DataObject :properties="properties" style="margin-top: 30px;">
                <div slot="usage-toc">
                    <ul>
                        <li class="subtitle-1">Importing</li>
                        <li class="subtitle-1">Creating New Instances</li>
                        <li class="subtitle-1">Pre-Loading Data</li>
                        <li class="subtitle-1">Working with Instances</li>
                    </ul>
                </div>
                <div slot="usage-content">
                    <h3 class="display-1" style="margin-top: 12px">Importing</h3>
                    <p>You can either import the whole library:
                    <highlight-code lang="javascript"><pre>
                   var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
                    var Track = EnhancedSpotifyAPI.Track;
                    </pre></highlight-code>
                    <p>Or just the Track class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Track } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Track.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instance</h2>
                    <p>Creating a new <span class="highlight">Track</span> instance requires the passing in of a
                    <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids" class="highlight">Spotify Track ID</a>.</p>
                    <p>You have the choice of either passing in the ID directly:</p>
                    <highlight-code lang="javascript"><pre>
                    // String as a Parameter
                    var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                    var myTrack = new Track( myFavoriteTrack );
                    </pre></highlight-code>
                    <p>Or as a property within an object:</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter
                    var myFavoriteTrack = {
                        id: "3HKpZgez8S4TS2F0sWLvAR"
                    };
                    var myTrack = new Track( myFavoriteTrack );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Pre-Loading Data</h2>
                    <p>If you've already retrieved some track data, you can pass it into the constructor to be pre-loaded.</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter with Additional Data
                    var myFavoriteTrack = {
                        id: "3HKpZgez8S4TS2F0sWLvAR",
                        name: "Can I Change My Mind? (Live)",
                        // Some other good stuff
                    };
                    var myTrack = new Track( myFavoriteTrack );
                    </pre></highlight-code>
                    <p>The data will be loaded in if it is valid to the track object.</p>
                    <p>Track instances will only make requests if the needed data is absent. Passing in what you have at construction could save you from unnessisary requests.</p>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Working with Instances</h2>
                    <p>Once you have a Track instance, you can work with any of its member functions!</p>
                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myTrack = new Track( myFavoriteTrack );

                    var audioFeatures = await myTrack.getAudioFeatures();
                    var boringness = (audioFeatures.danceability + audioFeatures.energy) * audioFeatures.tempo;
                    
                    var otherTracks = await myTrack.getRecommendations();
                    otherTracks.play();
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Track</span> class.</p>
                            <p>The new instance will represent that track for all subsequent member functions called.</p>
                            <p>If you've loaded any data on the track prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = {
                                id: "3HKpZgez8S4TS2F0sWLvAR"
                            };
                            var myTrack = new Track( myFavoriteTrack );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = {
                                id: "3HKpZgez8S4TS2F0sWLvAR",
                                name: "Can I Change My Mind (Live)",
                            };
                            var myTrack = Track( myFavoriteTrack );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Track}
                        </pre>
                        <pre slot="src">
                        function Track(data) {
                            try {
                                if (typeof(data) == 'string') {
                                    this.id = data;
                                } else if (typeof(data) == 'object') {
                                    if (data.hasOwnProperty('id')) {
                                        this.id = data.id; 
                                    } else {
                                        throw new Error("Track.constructor: No ID Provided");
                                    }
                                    this.loadConditionally(data);
                                } else {
                                    throw new Error("Track.constructor: Invalid Data");
                                }
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <MethodListItem :staticMethod="true" :docs="getTrack.docs" :name="getTrack.name" :code="getTrack.code" :returns="getTrack.returns" :parameters="getTrack.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Track</span> class.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/">Get a Track</a>, except it returns an instance of the Track class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrieveFullObject</span>.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = await Track.getTrack( myFavoriteTrack );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Track}
                        </pre>
                        <pre slot="src">
                        Track.getTrack = async function(trackID) {
                            try {
                                let response = Models.wrapperInstance.getTrack(trackID);
                                return new Models.Track(response.body);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Playback</v-subheader>
                    </v-row>
                    <MethodListItem :docs="play.docs" :options="play.options" :name="play.name" :code="play.code" :returns="play.returns" :parameters="play.parameters">
                        <div slot="overview">
                            <p>Plays track on user's current playback device.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            myTrack.play();
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            // Start Track 1 Second (1000 milliseconds) in.
                            myTrack.play( { position_ms: 1000 } );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                       play: async function(options) {
                            try {
                                let _options = options ? options : {};
                                _options.uris = [ 'spotify:track:' + this.id ];
                                return await Models.wrapperInstance.play(_options);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Library</v-subheader>
                    </v-row>
                    <MethodListItem :docs="isLiked.docs" :name="isLiked.name" :code="isLiked.code" :returns="isLiked.returns" :parameters="isLiked.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether or not track is saved to current User's library.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            var savedStatus = await myTrack.isLiked();
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       isLiked: async function() {
                            try {
                                let response = await Models.wrapperInstance.containsMySavedTracks([this.id]);
                                return response.body[0];
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="like.docs" :name="like.name" :code="like.code" :returns="like.returns" :parameters="like.parameters">
                        <div slot="overview">
                            <p>Saves a track to current User's library.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            if (!await myTrack.isLiked()) {
                                myTrack.like(); 
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                       like: async function() {
                            try {
                                return await Models.wrapperInstance.addToMySavedTracks([this.id]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="unlike.docs" :name="unlike.name" :code="unlike.code" :returns="unlike.returns" :parameters="unlike.parameters">
                        <div slot="overview">
                            <p>Removes a track from current User's library.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var horribleSong = '6M14BiCN00nOsba4JaYsHW';
                            var myTrack = new Track( horribleSong );
                            if (await myTrack.isLiked()) {
                                myTrack.unlike(); 
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                       unlike: async function() {
                            try {
                                return await Models.wrapperInstance.removeFromMySavedTracks([this.id]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="getFullObject.docs" :name="getFullObject.name" :code="getFullObject.code" :returns="getFullObject.returns" :parameters="getFullObject.parameters">
                        <div slot="overview">
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Object (Full)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                id: String,
                                name: String,
                                album: Object,
                                artists: Array,
                                available_markets: Array,
                                disc_number: Number,
                                duration_ms: Number,
                                explicit: Boolean,
                                external_ids: Object,
                                external_urls: Object,
                                href: String,
                                is_playable: Boolean,
                                linked_from: Object,
                                restrictions: Object,
                                popularity: Number,
                                preview_url: String,
                                track_number: Number
                                uri: String,
                                is_local: Boolean,
                                type: String
                            }
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            console.log( await myTrack.getFullObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getFullObject: async function() {
                            try {
                                if (!(await this.containsFullObject())) {
                                    await this.retrieveFullObject();
                                }
                                let result = {
                                    id: this.id,
                                    name: this.name,
                                    album: this.album,
                                    artists: this.artists,
                                    available_markets: this.available_markets,
                                    disc_number: this.disc_number,
                                    duration_ms: this.duration_ms,
                                    explicit: this.explicit,
                                    external_ids: this.external_ids,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    popularity: this.popularity,
                                    preview_url: this.preview_url,
                                    track_number: this.track_number,
                                    uri: this.uri,
                                    is_local: this.is_local,
                                    type: 'track',
                                };
                                if (this.is_playable != null) {
                                    result.is_playable = this.is_playable;
                                }
                                if (this.linked_from != null) {
                                    result.linked_from = this.linked_from;
                                }
                                if (this.restrictions != null) {
                                    result.restrictions = this.restrictions;
                                }
                                return result;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getSimplifiedObject.docs" :name="getSimplifiedObject.name" :code="getSimplifiedObject.code" :returns="getSimplifiedObject.returns" :parameters="getSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-simplified">Track Object (Simplified)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                id: String,
                                name: String,
                                artists: Array,
                                available_markets: Array,
                                disc_number: Number,
                                duration_ms: Number,
                                explicit: Boolean,
                                external_urls: Object,
                                href: String,
                                is_playable: Boolean,
                                linked_from: Object,
                                restrictions: Object,
                                preview_url: String,
                                track_number: Number
                                uri: String,
                                is_local: Boolean,
                                type: String
                            }
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            console.log( await myTrack.getSimplifiedObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getSimplifiedObject: async function() {
                            try {
                                if (!(await this.containsSimplifiedObject())) {
                                    await this.retrieveFullObject();
                                }
                                let result = {
                                    id: this.id,
                                    name: this.name,
                                    artists: this.artists,
                                    available_markets: this.available_markets,
                                    disc_number: this.disc_number,
                                    duration_ms: this.duration_ms,
                                    explicit: this.explicit,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    preview_url: this.preview_url,
                                    track_number: this.track_number,
                                    uri: this.uri,
                                    is_local: this.is_local,
                                    type: 'track',
                                };
                                if (this.is_playable != null) {
                                    result.is_playable = this.is_playable;
                                }
                                if (this.linked_from != null) {
                                    result.linked_from = this.linked_from;
                                }
                                if (this.restrictions != null) {
                                    result.restrictions = this.restrictions;
                                }
                                return result;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getLinkObject.docs" :name="getLinkObject.name" :code="getLinkObject.code" :returns="getLinkObject.returns" :parameters="getLinkObject.parameters">
                        <div slot="overview">
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-link">Track Link</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                id: String,
                                external_urls: Object,
                                href: String,
                                uri: String,
                                type: String
                            }
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            console.log( await myTrack.getLinkObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getLinkObject: async function() {
                            try {
                                if (!(await this.containsLinkObject())) {
                                    await this.retrieveFullObject();
                                } 
                                return {
                                    id: this.id,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    uri: this.uri,
                                    type: 'track',
                                };
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAudioFeatures.docs" :name="getAudioFeatures.name" :code="getAudioFeatures.code" :returns="getAudioFeatures.returns" :parameters="getAudioFeatures.parameters">
                        <div slot="overview">
                            <p>Returns a track <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature Object</a>. Retrieves from Spotify API if necessary.</p>
                            <p>Track Audio Features include numerical values for happiness (valence), danceability, energy, tempo and more!</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                id: String,
                                duration_ms: Number,
                                key: Number,
                                mode: Number,
                                time_signature: Number,
                                acousticness: Number,
                                danceability: Number,
                                energy: Number,
                                instrumentalness: Number,
                                liveness: Number,
                                loudness: Number,
                                speechiness: Number,
                                valence: Number,
                                tempo: Number,
                                uri: String,
                                track_href: String,
                                analysis_url: String,
                                type: String
                            }
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            console.log( await myTrack.getAudioFeatures() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getAudioFeatures: async function() {
                            try {
                                if (!(await this.containsAudioFeatures())) {
                                    await this.retrieveAudioFeatures();
                                }
                                return {
                                    id: this.id,
                                    duration_ms: this.duration_ms,
                                    key: this.key,
                                    mode: this.mode,
                                    time_signature: this.time_signature,
                                    acousticness: this.acousticness,
                                    danceability: this.danceability,
                                    energy: this.energy,
                                    instrumentalness: this.instrumentalness,
                                    liveness: this.liveness,
                                    loudness: this.loudness,
                                    speechiness: this.speechiness,
                                    valence: this.valence,
                                    tempo: this.tempo,
                                    uri: this.uri,
                                    track_href: this.track_href,
                                    analysis_url: this.analysis_url,
                                    type: 'audio_features',
                                };
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAudioAnalysis.docs" :name="getAudioAnalysis.name" :code="getAudioAnalysis.code" :returns="getAudioAnalysis.returns" :parameters="getAudioAnalysis.parameters">
                        <div slot="overview">
                            <p>Returns a track <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/#audio-analysis-object">Audio Analysis Object</a>. Retrieves from Spotify API if necessary.</p>
                            <p>Returns a low-level audio analysis of the track's audio.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                id: String,
                                bars: Array,
                                beats: Array,
                                sections: Array,
                                segments: Array,
                                tatums: Array,
                                track: Object
                            }
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            console.log( await myTrack.getAudioAnalysis() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getAudioAnalysis: async function() {
                            try {
                                if (!(await this.containsAudioAnalysis())) {
                                    await this.retrieveAudioAnalysis();
                                }
                                let results = {
                                    bars: this.bars,
                                    beats: this.beats,
                                    sections: this.sections,
                                    segments: this.segments,
                                    tatums: this.tatums,
                                    track: this.track,
                                };
                                if (this.meta != null) {
                                    results.meta = this.meta;
                                }
                                return results;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAllData.docs" :name="getAllData.name" :code="getAllData.code" :returns="getAllData.returns" :parameters="getAllData.parameters">
                        <div slot="overview">
                            <p> Returns all data from track <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Object (Full)</a>, <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature Object</a>, and <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/#audio-analysis-object">Audio Analysis Object</a>.</p>
                            <p>Big whooping combo of all three.</p>
                            <p>Retrieves from Spotify API if necessary (probably will be).</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                id: String,
                                name: String,
                                album: Object,
                                artists: Array,
                                available_markets: Array,
                                disc_number: Number,
                                duration_ms: Number,
                                explicit: Boolean,
                                external_ids: Object,
                                external_urls: Object,
                                href: String,
                                is_playable: Boolean,
                                linked_from: Object,
                                restrictions: Object,
                                popularity: Number,
                                preview_url: String,
                                track_number: Number
                                uri: String,
                                is_local: Boolean,
                                duration_ms: Number,
                                key: Number,
                                mode: Number,
                                time_signature: Number,
                                acousticness: Number,
                                danceability: Number,
                                energy: Number,
                                instrumentalness: Number,
                                liveness: Number,
                                loudness: Number,
                                speechiness: Number,
                                valence: Number,
                                tempo: Number,
                                track_href: String,
                                analysis_url: String,
                                bars: Array,
                                beats: Array,
                                sections: Array,
                                segments: Array,
                                tatums: Array,
                                track: Object,
                                type: String
                            }
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            console.log( "GIMMI ALL OF IT");
                            console.log( await myTrack.getAllData() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getAllData: async function() {
                            try {
                                if (!(await this.containsAudioAnalysis())) {
                                    await this.retrieveAudioAnalysis();
                                }
                                if (!(await this.containsAudioFeatures())) {
                                    await this.retrieveAudioFeatures();
                                }
                                if (!(await this.containsFullObject())) {
                                    await this.retrieveFullObject();
                                }
                                let results = {
                                    id: this.id,
                                    name: this.name,
                                    album: this.album,
                                    artists: this.artists,
                                    available_markets: this.available_markets,
                                    disc_number: this.disc_number,
                                    explicit: this.explicit,
                                    external_ids: this.external_ids,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    popularity: this.popularity,
                                    preview_url: this.preview_url,
                                    track_number: this.track_number,
                                    type: "track",
                                    uri: this.uri,
                                    is_local: this.is_local,
                                    duration_ms: this.duration_ms,
                                    key: this.key,
                                    mode: this.mode,
                                    time_signature: this.time_signature,
                                    acousticness: this.acousticness,
                                    danceability: this.danceability,
                                    energy: this.energy,
                                    instrumentalness: this.instrumentalness,
                                    liveness: this.liveness,
                                    loudness: this.loudness,
                                    speechiness: this.speechiness,
                                    valence: this.valence,
                                    tempo: this.tempo,
                                    track_href: this.track_href,
                                    analysis_url: this.analysis_url,
                                    bars: this.bars,
                                    beats: this.beats,
                                    sections: this.sections,
                                    segments: this.segments,
                                    tatums: this.tatums,
                                    track: this.track,
                                };
                                if (this.meta != null) {
                                    results.meta = this.meta;
                                }
                                if (this.is_playable != null) {
                                    result.is_playable = this.is_playable;
                                }
                                if (this.linked_from != null) {
                                    result.linked_from = this.linked_from;
                                }
                                if (this.restrictions != null) {
                                    result.restrictions = this.restrictions;
                                }
                                return results;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getCurrentData.docs" :name="getCurrentData.name" :code="getCurrentData.code" :returns="getCurrentData.returns" :parameters="getCurrentData.parameters">
                        <div slot="overview">
                            <p>Not looking to waste more time with another request?</p>
                            <p>Already know the data you need is present?</p>
                            <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the Track instance.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                // Varies
                            }
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = {
                                id: '3HKpZgez8S4TS2F0sWLvAR',
                                name: 'Can I Change My Mind? (Live)'
                            };
                            var myTrack = new Track( myFavoriteTrack );
                            console.log( "Just give me what ya got");
                            console.log( myTrack.getCurrentData() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getCurrentData: function() {
                            try {
                                let data = { id: this.id, type: 'track' };
                                let properties = ['name', 'album', 'artists', 'available_markets', 'disc_number', 'explicit', 'external_ids', 'external_urls', 'href', 'is_playable', 'linked_from', 'restrictions', 'popularity', 'preview_url', 'track_number', 'uri', 'is_local', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'tempo', 'track_href', 'analysis_url', 'bars', 'beats', 'sections', 'segments', 'tatums', 'track', 'meta'];
                                for (let i = 0; i &lt; properties.length; i++) {
                                    if (this[properties[i]] != null) {
                                        data[properties[i]] = this[properties[i]];
                                    }
                                }
                                return data;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Related Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="getArtists.docs" :name="getArtists.name" :code="getArtists.code" :returns="getArtists.returns" :parameters="getArtists.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Artists</span> container instance of all of the track's artists.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Artists}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = { '3HKpZgez8S4TS2F0sWLvAR' };
                            var myTrack = new Track( myFavoriteTrack );

                            var artists = await myTrack.getArtists();
                            var theirTopTracks = await artists.getTopTracks();
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getArtists: async function() {
                            try {
                                if (!(this.artists != null)) {
                                    await this.retrieveFullObject();
                                }
                                return new Models.Artists(this.artists);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAlbum.docs" :name="getAlbum.name" :code="getAlbum.code" :returns="getAlbum.returns" :parameters="getAlbum.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Album</span> instance of the track's album.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Album}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = { '3HKpZgez8S4TS2F0sWLvAR' };
                            var myTrack = new Track( myFavoriteTrack );
                            
                            var album = await myTrack.getAlbum();
                            var albumTracks = await album.getTracks();
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getAlbum: async function() {
                            try {
                                if (!this.album) {
                                    await this.retrieveFullObject();
                                }
                                return new Models.Album(this.album);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getRecommendations.docs" :options="getRecommendations.options" :name="getRecommendations.name" :code="getRecommendations.code" :returns="getRecommendations.returns" :parameters="getRecommendations.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Tracks</span> container instance with Spotify Recommendations based on this track.</p>
                            <p>This will not allow other seeds to be used besides this track.</p>
                            <p>Any other seeds passed in through the options parameter will be deleted.</p>
                            <p>If you want to add more seeds, visit the <a href="http://EnhancedSpotifyAPI.com/container/tracks">Tracks</a> container class static methods for full Recommendation Requests.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Tracks}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            var recommendations = await myTrack.getRecommendations();
                            recommendations.play();
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            // Get 100 Tracks with energy less than .5
                            var options = { limit: 100, max_energy: .5 };
                            var recommendations = await myTrack.getRecommendations( options );
                            recommendations.play();
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getRecommendations: async function(options) {
                            try {
                                if (options != null && typeof(options) != 'object') {
                                    throw new Error("Track.getRecommendations: Invalid Parameter \"options\"");
                                }
                                let _options = options ? options : {};
                                if (_options.hasOwnProperty('seed_artists')) {
                                    delete _options.seed_artists;
                                }
                                if (_options.hasOwnProperty('seed_genres')) {
                                    delete _options.seed_artists;
                                }
                                _options.seed_tracks = this.id;
                                let response = await Models.wrapperInstance.getRecommendations(_options);
                                return new Models.Tracks(response.body.tracks);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getRecommendationWithAudioFeatures.docs" :options="getRecommendationWithAudioFeatures.options" :name="getRecommendationWithAudioFeatures.name" :code="getRecommendationWithAudioFeatures.code" :returns="getRecommendationWithAudioFeatures.returns" :parameters="getRecommendationWithAudioFeatures.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Tracks</span> container instance with Spotify Recommendations based on this track.</p>

                            <p>Targets the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature</a> values of this track as an additional parameter to the request.</p>

                            <p>This will not allow other seeds to be used besides this track.</p>

                            <p>Any other seeds passed in through the options parameter will be deleted.</p>

                            <p>If you want to add more seeds, visit the <a href="http://EnhancedSpotifyAPI.com/container/tracks">Tracks</a> container class static methods for full Recommendation Requests.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Tracks}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            var recommendations = await myTrack.getRecommendationWithAudioFeatures();
                            recommendations.play();
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            // Get 100 Tracks limited to the Antarctica market.
                            var options = { limit: 100, market: "AQ" };
                            var recommendations = await myTrack.getRecommendationWithAudioFeatures( options );
                            recommendations.play();
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       getRecommendationWithAudioFeatures: async function(options) {
                            try {
                                if (options != null && typeof(options) != 'object') {
                                    throw new Error("Track.getRecommendationWithAudioFeatures: Invalid Parameter \"options\"");
                                }
                                if (!(await this.containsAudioFeatures())) {
                                    await this.retrieveAudioFeatures();
                                }
                                let _options = options ? options : {};
                                if (_options.hasOwnProperty('seed_artists')) {
                                    delete _options.seed_artists;
                                }
                                if (_options.hasOwnProperty('seed_genres')) {
                                    delete _options.seed_artists;
                                }
                                _options.seed_tracks = this.id;
                                _options.target_acousticness = this.acousticness;
                                _options.target_danceability = this.danceability;
                                _options.target_energy = this.energy;
                                _options.target_instrumentalness = this.instrumentalness;
                                _options.target_liveness = this.liveness;
                                _options.target_mode = this.mode;
                                _options.target_speechiness = this.speechiness;
                                _options.target_tempo = this.tempo;
                                _options.target_valence = this.valence;
                                let response = await Models.wrapperInstance.getRecommendations(_options);
                                return new Models.Tracks(response.body.tracks);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Retreival Status</v-subheader>
                    </v-row>
                    <MethodListItem :docs="containsFullObject.docs" :name="containsFullObject.name" :code="containsFullObject.code" :returns="containsFullObject.returns" :parameters="containsFullObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Object (Full)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            if ( myTrack.containsFullObject() ) {
                                await myTrack.retrieveFullObject();
                            }

                            console.log( 'Popularity:', myTrack.popularity, '%' );
                            </pre></highlight-code>
                            
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            console.log( 'Popularity:', ( await myTrack.getFullObject() ).popularity, '%' );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       containsFullObject: function() {
                            return ((this.name != null) && (this.album) && (this.artists != null) && (this.available_markets != null) && (this.disc_number != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_ids) && (this.external_urls) && (this.href != null) && (this.popularity != null) && (this.preview_url != null) && (this.track_number != null) && (this.uri != null) && (this.is_local != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsSimplifiedObject.docs" :name="containsSimplifiedObject.name" :code="containsSimplifiedObject.code" :returns="containsSimplifiedObject.returns" :parameters="containsSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-simplified">Track Object (Simplified)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            if ( myTrack.containsSimplifiedObject() ) {
                                await myTrack.retrieveFullObject();
                            }
                            
                            console.log( 'My favorite track:', myTrack.name );
                            </pre></highlight-code>
        
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            console.log( 'My favorite track:', ( await myTrack.getSimplifiedObject() ).name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       containsSimplifiedObject: function() {
                            return ((this.name != null) && (this.artists != null) && (this.available_markets != null) && (this.disc_number != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls) && (this.href != null) && (this.preview_url != null) && (this.track_number != null) && (this.uri != null) && (this.is_local != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsLinkObject.docs" :name="containsLinkObject.name" :code="containsLinkObject.code" :returns="containsLinkObject.returns" :parameters="containsLinkObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-link">Track Link Data</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            if ( myTrack.containsLinkObject() ) {
                                await myTrack.retrieveFullObject();
                            }
                            
                            console.log( 'Visit here for full details:', myTrack.href );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            console.log( 'Visit here for full details:', ( await myTrack.getLinkObject() ).href );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        containsLinkObject: function() {
                            return ((this.external_urls != null) && (this.href != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsAudioFeatures.docs" :name="containsAudioFeatures.name" :code="containsAudioFeatures.code" :returns="containsAudioFeatures.returns" :parameters="containsAudioFeatures.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether track <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature Data</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            if ( myTrack.containsAudioFeatures() ) {
                                await myTrack.retrieveAudioFeatures();
                            }
                            
                            console.log( 'Track Happiness:', myTrack.valence );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            console.log( 'Track Happiness:', ( await myTrack.getAudioFeatures() ).valence );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       containsAudioFeatures: function() {
                            return ((this.duration_ms != null) && (this.key != null) && (this.mode != null) && (this.time_signature != null) && (this.acousticness != null) && (this.danceability != null) && (this.energy != null) && (this.instrumentalness != null) && (this.liveness != null) && (this.loudness != null) && (this.speechiness != null) && (this.valence != null) && (this.tempo != null) && (this.uri != null) && (this.track_href != null) && (this.analysis_url != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsAudioAnalysis.docs" :name="containsAudioAnalysis.name" :code="containsAudioAnalysis.code" :returns="containsAudioAnalysis.returns" :parameters="containsAudioAnalysis.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether track <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/">Audio Analysis Data</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            if ( myTrack.containsAudioAnalysis() ) {
                                await myTrack.retrieveAudioAnalysis();
                            }

                            console.log( 'Track loudness over time:' );
                            console.log( myTrack.segments.map( (segment) => segment.loudness_max ) );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            console.log( 'Track loudness over time:' );
                            console.log( ( await myTrack.getAudioAnalysis() ).segments.map( (segment) => segment.loudness_max ) );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       containsAudioAnalysis: function() {
                            return ((this.bars != null) && (this.beats != null) && (this.sections != null) && (this.segments != null) && (this.tatums != null) && (this.track != null));
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Load Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="loadFullObject.docs" :name="loadFullObject.name" :code="loadFullObject.code" :returns="loadFullObject.returns" :parameters="loadFullObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Object (Full)</a> and saves it's properties to the Track Instance.</p>
                            <p>The constructor already takes care of loading all types of track data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Track methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            myTrack.loadFullObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myTrack = new Track( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadFullObject: function(data) {
                            try {
                                this.name = data.name;
                                this.album = data.album;
                                this.artists = data.artists;
                                this.available_markets = data.available_markets;
                                this.disc_number = data.disc_number;
                                this.duration_ms = data.duration_ms;
                                this.explicit = data.explicit;
                                this.external_ids = data.external_ids;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.is_playable = data.is_playable;
                                this.linked_from = data.linked_from;
                                this.restrictions = data.restrictions;
                                this.popularity = data.popularity;
                                this.preview_url = data.preview_url;
                                this.track_number = data.track_number;
                                this.uri = data.uri;
                                this.is_local = data.is_local;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadSimplifiedObject.docs" :name="loadSimplifiedObject.name" :code="loadSimplifiedObject.code" :returns="loadSimplifiedObject.returns" :parameters="loadSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-simplified">Track Object (Simplified)</a> and saves it's properties to the Track Instance.</p>
                            <p>The constructor already takes care of loading all types of track data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Track methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            myTrack.loadSimplifiedObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myTrack = new Track( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadSimplifiedObject: function(data) {
                            try {
                                this.name = data.name;
                                this.artists = data.artists;
                                this.available_markets = data.available_markets;
                                this.disc_number = data.disc_number;
                                this.duration_ms = data.duration_ms;
                                this.explicit = data.explicit;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.is_playable = data.is_playable;
                                this.linked_from = data.linked_from;
                                this.restrictions = data.restrictions;
                                this.preview_url = data.preview_url;
                                this.track_number = data.track_number;
                                this.uri = data.uri;
                                this.is_local = data.is_local;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadLinkObject.docs" :name="loadLinkObject.name" :code="loadLinkObject.code" :returns="loadLinkObject.returns" :parameters="loadLinkObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-link">Track Link</a> and saves it's properties to the Track Instance.</p>
                            <p>The constructor already takes care of loading all types of track data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Track methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            myTrack.loadLinkObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myTrack = new Track( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadLinkObject: function(data) {
                            try {
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.uri = data.uri;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadAudioFeatures.docs" :name="loadAudioFeatures.name" :code="loadAudioFeatures.code" :returns="loadAudioFeatures.returns" :parameters="loadAudioFeatures.parameters">
                        <div slot="overview">
                            <p>Takes an <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature Object</a> and saves it's properties to the Track Instance.</p>
                            <p>The constructor already takes care of loading all types of track data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Track methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            myTrack.loadAudioFeatures( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myTrack = new Track( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadAudioFeatures: function(data) {
                            try {
                                this.duration_ms = data.duration_ms;
                                this.key = data.key;
                                this.mode = data.mode;
                                this.time_signature = data.time_signature;
                                this.acousticness = data.acousticness;
                                this.danceability = data.danceability;
                                this.energy = data.energy;
                                this.instrumentalness = data.instrumentalness;
                                this.liveness = data.liveness;
                                this.loudness = data.loudness;
                                this.speechiness = data.speechiness;
                                this.valence = data.valence;
                                this.tempo = data.tempo;
                                this.uri = data.uri;
                                this.track_href = data.track_href;
                                this.analysis_url = data.analysis_url;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadAudioAnalysis.docs" :name="loadAudioAnalysis.name" :code="loadAudioAnalysis.code" :returns="loadAudioAnalysis.returns" :parameters="loadAudioAnalysis.parameters">
                        <div slot="overview">
                            <p>Takes <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/">Audio Analysis Data</a> and saves it's properties to the Track Instance.</p>
                            <p>The constructor already takes care of loading all types of track data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Track methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            myTrack.loadAudioAnalysis( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myTrack = new Track( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadAudioAnalysis: function(data) {
                            try {
                                this.bars = data.bars;
                                this.beats = data.beats;
                                this.sections = data.sections;
                                this.segments = data.segments;
                                this.tatums = data.tatums;
                                this.track = data.track;
                                if (data.hasOwnProperty('meta')) {
                                    this.meta = data.meta;
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadConditionally.docs" :name="loadConditionally.name" :code="loadConditionally.code" :returns="loadConditionally.returns" :parameters="loadConditionally.parameters">
                        <div slot="overview">
                            <p>Takes <span class="highlight">any track data</span> and saves it's properties to the Track Instance.</p>
                            <p>The constructor already takes care of loading all types of track data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Track methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            myTrack.loadConditionally( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myTrack = new Track( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadConditionally: function(data) {
                            try {
                                let properties = ['name', 'album', 'artists', 'available_markets', 'disc_number', 'duration_ms', 'explicit', 'external_ids', 'external_urls', 'href', 'is_playable', 'linked_from', 'restrictions', 'popularity', 'preview_url', 'track_number', 'uri', 'is_local', 'key', 'mode', 'time_signature', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'tempo', 'track_href', 'analysis_url', 'bars', 'beats', 'sections', 'segments', 'tatums', 'track', 'meta'];
                                for (let i = 0; i &lt; properties.length; i++) {
                                    if (data.hasOwnProperty(properties[i])) {
                                        this[properties[i]] = data[properties[i]];
                                    }
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Retreive Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="retrieveFullObject.docs" :name="retrieveFullObject.name" :code="retrieveFullObject.code" :returns="retrieveFullObject.returns" :parameters="retrieveFullObject.parameters">
                        <div slot="overview">
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Object (Full)</a> for this track.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            if ( myTrack.containsFullObject() ) {
                                await myTrack.retrieveFullObject();
                            }

                            console.log( 'Popularity:', myTrack.popularity, '%' );
                            </pre></highlight-code>
                            
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            console.log( 'Popularity:', ( await myTrack.getFullObject() ).popularity, '%' );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveFullObject: async function() {
                            try {
                                if (this.hasOwnProperty('is_local') && this.is_local) {
                                    return;
                                }
                                let response = await Models.wrapperInstance.getTrack(this.id);
                                await this.loadFullObject(response.body);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="retrieveAudioFeatures.docs" :name="retrieveAudioFeatures.name" :code="retrieveAudioFeatures.code" :returns="retrieveAudioFeatures.returns" :parameters="retrieveAudioFeatures.parameters">
                        <div slot="overview">
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature Object</a> for this track.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            if ( myTrack.containsAudioFeatures() ) {
                                await myTrack.retrieveAudioFeatures();
                            }
                            
                            console.log( 'Track Happiness:', myTrack.valence );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            console.log( 'Track Happiness:', ( await myTrack.getAudioFeatures() ).valence );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveAudioFeatures: async function() {
                            try {
                                if (this.hasOwnProperty('is_local') && this.is_local) {
                                    return;
                                }
                                let response = await Models.wrapperInstance.getAudioFeaturesForTrack(this.id);
                                await this.loadAudioFeatures(response.body);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="retrieveAudioAnalysis.docs" :name="retrieveAudioAnalysis.name" :code="retrieveAudioAnalysis.code" :returns="retrieveAudioAnalysis.returns" :parameters="retrieveAudioAnalysis.parameters">
                        <div slot="overview">
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/">Audio Analysis Data</a> for this track.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );
                            
                            if ( myTrack.containsAudioAnalysis() ) {
                                await myTrack.retrieveAudioAnalysis();
                            }

                            console.log( 'Track loudness over time:' );
                            console.log( myTrack.segments.map( (segment) => segment.loudness_max ) );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var myTrack = new Track( myFavoriteTrack );

                            console.log( 'Track loudness over time:' );
                            console.log( ( await myTrack.getAudioAnalysis() ).segments.map( (segment) => segment.loudness_max ) );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveAudioAnalysis: async function() {
                            try {
                                if (this.hasOwnProperty('is_local') && this.is_local) {
                                    return;
                                }
                                let response = await Models.wrapperInstance.getAudioAnalysisForTrack(this.id);
                                await this.loadAudioAnalysis(response.body);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                </v-expansion-panels>
                <div slot="examples-content">
                    <highlight-code lang="javascript"><pre>
                    // Let's force the current user to love my favorite track.
                    // Import the Track Class
                    var { Track } = require( 'enhanced-spotify-api' );
                    Track.setAccessToken( myAccessToken );

                    // Get My Favorite Track
                    var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                    var myTrack = new Track( myFavoriteTrack );

                    console.log( "Hey, you like music? - whatever, that's great. You should check out this song." );
                    console.log( "Trust me your music is nothing compared to this." );

                    var fullObject = await myTrack.getFullObject();
                    console.log( "It's called", fullObject.name, "by", fullObject.artists[0].name );

                    console.log( "I'm turning it on for you" );
                    await myTrack.play();

                    console.log( "Pretty great right? Here go to my favorite part. Don't worry I'll do it for you." );
                    var audioAnalysis = await myTrack.getAudioAnalysis();
                    var loudestSection = audioAnalysis.sections.reduce((max, section) => {
                        return section.loudness > max.loudness ? section : max;
                    }, audioAnalysis.sections[0]);
                    await myTrack.play( { position_ms: loudestSection.start * 1000 } );

                    var audioFeatures = await myTrack.getAudioFeatures();
                    console.log( "Did you know it has a happiness rating of", (audioFeatures.valence * 100), "%" );

                    if (!await myTrack.isLiked()) {
                        console.log( "Oh, you don't have it saved yet? Let me fix that for you." );
                        await myTrack.like();
                    }
                    </pre></highlight-code>
                </div>
            </DataObject>    
        </div>
    </div>
</template>

<script>
import DataObject from '@/components/DataObject.vue'
import MethodListItem from '@/components/MethodListItem.vue'

export default {
    name: 'Track',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'Track', disabled: true },
        ],
        properties: {
            static: [
                {name: "Track.prototype", type: "Object", description: "Instance of Track"},
                {name: "Track.getTrack", type: "Function", description: "Returns Track instance of ID"},
                {name: "Track.addMethods", type: "Function", description: "Adds methods to track prototype"},
                {name: "Track.override", type: "Function", description: "Overrides methods in track prototype"},
                {name: "Track.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Track.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ],
            instance: [
                {name: "id", type: "String", description: "The Spotify ID for the track"},
                {name: "name", type: "String", description: "The name of the track"},
                {name: "album", type: "Object", description: "The album on which the track appears"},
                {name: "artists", type: "Array", description: "The artists who performed the track"},
                {name: "available_markets", type: "Array", description: "A list of the countries in which the track can be played"},
                {name: "disc_number", type: "Number", description: "The disc number"},
                {name: "explicit", type: "Boolean", description: "Whether or not the track has explicit lyrics"},
                {name: "external_ids", type: "Object", description: "Known external IDs for the track"},
                {name: "external_urls", type: "Object", description: "Known external URLs for this track"},
                {name: "href", type: "String", description: "A link to the Web API endpoint with full info"},
                {name: "is_playable", type: "Boolean", description: "If true, the track is playable in the given market"},
                {name: "linked_from", type: "Object", description: "Requested track has been replaced with different track"},
                {name: "restrictions", type: "Object", description: "Restrictions object containing the reason why the track is not available"},
                {name: "popularity", type: "Number", description: "The popularity of the track. The value will be between 0 and 100"},
                {name: "preview_url", type: "String", description: "A link to a 30 second preview"},
                {name: "track_number", type: "Number", description: "The number of the track"},
                {name: "uri", type: "String", description: "The Spotify URI for the track"},
                {name: "is_local", type: "Boolean", description: "Whether or not the track is from a local file"},
                {name: "duration_ms", type: "Number", description: "The duration of the track in milliseconds"},
                {name: "key", type: "Number", description: "The estimated overall key of the track"},
                {name: "mode", type: "Number", description: "Mode indicates the modality (major or minor)"},
                {name: "time_signature", type: "Number", description: "An estimated overall time signature of a track"},
                {name: "acousticness", type: "Number", description: "A confidence measure whether the track is acoustic"},
                {name: "danceability", type: "Number", description: "Danceability describes how suitable a track is for dancing"},
                {name: "energy", type: "Number", description: "A perceptual measure of intensity and activity."},
                {name: "instrumentalness", type: "Number", description: "Predicts whether a track contains no vocals"},
                {name: "liveness", type: "Number", description: "Detects the presence of an audience in the recording"},
                {name: "loudness", type: "Number", description: "The overall loudness of a track in decibels (dB)"},
                {name: "speechiness", type: "Number", description: "Speechiness detects the presence of spoken words in a track"},
                {name: "valence", type: "Number", description: "The musical positiveness conveyed by a track"},
                {name: "tempo", type: "Number", description: "The overall estimated tempo of a track in beats per minute (BPM)"},
                {name: "track_href", type: "String", description: "A link to the Web API endpoint with full info"},
                {name: "analysis_url", type: "String", description: "A link to the Web API endpoint with audio analysis"},
                {name: "bars", type: "Array", description: "The time intervals of the bars throughout the track"},
                {name: "beats", type: "Array", description: "The time intervals of beats throughout the track"},
                {name: "sections", type: "Array", description: "Sections defined by large variations in rhythm or timbre"},
                {name: "segments", type: "Array", description: "Segments containing a roughly consistent sound throughout its duration"},
                {name: "tatums", type: "Array", description: "Tatums represents the lowest regular pulse from perceived musical events"},
                {name: "track", type: "Object", description: "Other track data provided by Audio Analysis request"},
                {name: "play", type: "Function", description: "Plays track on user's active device"},
                {name: "isLiked", type: "Function", description: "Returns whether a track is saved to the user's library"},
                {name: "like", type: "Function", description: "Adds track to the user's library"},
                {name: "unlike", type: "Function", description: "Removes track from the user's library"},
                {name: "getFullObject", type: "Function", description: "Returns full track data. Retrieves from Spotify API if necessary"},
                {name: "getSimplifiedObject", type: "Function", description: "Returns simplified track data. Retrieves from Spotify API if necessary"},
                {name: "getLinkObject", type: "Function", description: "Returns track link data. Retrieves from Spotify API if necessary"},
                {name: "getAudioFeatures", type: "Function", description: "Returns audio feature data. Retrieves from Spotify API if necessary"},
                {name: "getAudioAnalysis", type: "Function", description: "Returns audio analysis data. Retrieves from Spotify API if necessary"},
                {name: "getAllData", type: "Function", description: "Returns all data. Retrieves from Spotify API if necessary"},
                {name: "getCurrentData", type: "Function", description: "Just returns whatever the track object currently holds"},
                {name: "getArtists", type: "Function", description: "Returns Artists instance with artists"},
                {name: "getAlbum", type: "Function", description: "Returns Album instance for track album"},
                {name: "getRecommendations", type: "Function", description: "Returns recommendations for track"},
                {name: "getRecommendationWithAudioFeatures", type: "Function", description: "Returns recommendations with added target on audio features"},
                {name: "containsFullObject", type: "Function", description: "Returns boolean whether full object data is present"},
                {name: "containsSimplifiedObject", type: "Function", description: "Returns boolean whether simplified object data is present"},
                {name: "containsLinkObject", type: "Function", description: "Returns boolean whether link object data is present"},
                {name: "containsAudioFeatures", type: "Function", description: "Returns boolean whether audio feature data is present"},
                {name: "containsAudioAnalysis", type: "Function", description: "Returns boolean whether audio analysis data is present"},
                {name: "loadFullObject", type: "Function", description: "Sets full data (outside constructor)"},
                {name: "loadSimplifiedObject", type: "Function", description: "Sets simplified data (outside constructor)"},
                {name: "loadLinkObject", type: "Function", description: "Sets link data (outside constructor)"},
                {name: "loadAudioFeatures", type: "Function", description: "Sets audio feature data (outside constructor)"},
                {name: "loadAudioAnalysis", type: "Function", description: "Sets audio analysis data (outside constructor)"},
                {name: "loadConditionally", type: "Function", description: "Sets any track data (outside constructor)"},
                {name: "retrieveFullObject", type: "Function", description: "Retrieves full track data from Spotify API"},
                {name: "retrieveAudioFeatures", type: "Function", description: "Retrieves audio feature data from Spotify API"},
                {name: "retrieveAudioAnalysis", type: "Function", description: "Retrieves audio analysis data from Spotify API"},
            ],
        },
        constructor: {
            name: "Constructor",
            code: "new Track(data)",
            returns: "Track",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Data to be preloaded. Must either be a string of the track ID or contain an `id` property."},
            ],
        },
        play: {
            name: "Play Track",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/",
            code: "play(options)",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "position_ms", types: ["Number"], description: "Position to start playback (Milliseconds).", default: "0"},
            ],
        },
        isLiked: {
            name: "Is Track Liked?",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-tracks/",
            code: "isLiked()",
            returns: "Boolean",
            parameters: [
            ],
        },
        like: {
            name: "Like Track",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/save-tracks-user/",
            code: "like()",
            returns: "Object",
            parameters: [
            ],
        },
        unlike: {
            name: "Unlike Track",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/remove-tracks-user/",
            code: "unlike()",
            returns: "Object",
            parameters: [
            ],
        },
        getFullObject: {
            name: "Get Full Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/",
            code: "getFullObject()",
            returns: "Object",
            parameters: [
            ],
        },
        getSimplifiedObject: {
            name: "Get Simplified Object",
            code: "getSimplifiedObject()",
            returns: "Object",
            parameters: [
            ],
        },
        getLinkObject: {
            name: "Get Link Object",
            code: "getLinkObject()",
            returns: "Object",
            parameters: [
            ],
        },
        getAudioFeatures: {
            name: "Get Audio Features",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/",
            code: "getAudioFeatures()",
            returns: "Object",
            parameters: [
            ],
        },
        getAudioAnalysis: {
            name: "Get Audio Analysis",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/",
            code: "getAudioAnalysis()",
            returns: "Object",
            parameters: [
            ],
        },
        getAllData: {
            name: "Get All Data",
            code: "getAllData()",
            returns: "Object",
            parameters: [
            ],
        },
        getCurrentData: {
            name: "Get Current Data",
            code: "getCurrentData()",
            returns: "Object",
            parameters: [
            ],
        },
        getArtists: {
            name: "Get Track Artists",
            code: "getArtists()",
            returns: "Artists",
            parameters: [
            ],
        },
        getAlbum: {
            name: "Get Track Album",
            code: "getAlbum()",
            returns: "Album",
            parameters: [
            ],
        },
        getRecommendations: {
            name: "Get Track Recommendations",
            docs: "https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/",
            code: "getRecommendations(options)",
            returns: "Tracks",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "limit", types: ["Number"], description: "Number of tracks to Retrieve", default: "20"},
                {name: "market", types: ["String"], description: "Country code (ISO code).", default: "from_token"},
                {name: "target_[audio_feature]", types: ["Number"], description: "Value to target for specific audio feature (Replace [audio_feature]).", default: "Unset"},
                {name: "min_[audio_feature]", types: ["Number"], description: "Minimum value for specific audio feature (Replace [audio_feature])..", default: "Unset"},
                {name: "max_[audio_feature]", types: ["Number"], description: "Maximum value for specific audio feature (Replace [audio_feature]).", default: "Unset"},
            ],
        },
        getRecommendationWithAudioFeatures: {
            name: "Get Track Recommendations with Audio Features",
            docs: "https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/",
            code: "getRecommendationWithAudioFeatures()",
            returns: "Tracks",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "limit", types: ["Number"], description: "Number of tracks to retrieve", default: "20"},
                {name: "market", types: ["String"], description: "Country code (ISO code).", default: "from_token"},
            ],
        },
        containsFullObject: {
            name: "Contains Full Object?",
            code: "containsFullObject()",
            returns: "Boolean",
            parameters: [],
        },
        containsSimplifiedObject: {
            name: "Contains Simplified Object?",
            code: "containsSimplifiedObject()",
            returns: "Boolean",
            parameters: [],
        },
        containsLinkObject: {
            name: "Contains Link Object?",
            code: "containsLinkObject()",
            returns: "Boolean",
            parameters: [],
        },
        containsAudioFeatures: {
            name: "Contains Audio Features?",
            code: "containsAudioFeatures()",
            returns: "Boolean",
            parameters: [],
        },
        containsAudioAnalysis: {
            name: "Contains Audio Analysis?",
            code: "containsAudioAnalysis()",
            returns: "Boolean",
            parameters: [],
        },
        loadFullObject: {
            name: "Load Full Object",
            code: "loadFullObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with track full object data."},
            ],
        },
        loadSimplifiedObject: {
            name: "Load Simplified Object",
            code: "loadSimplifiedObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with track simplified object data."},
            ],
        },
        loadLinkObject: {
            name: "Load Link Object",
            code: "loadLinkObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with track link data."},
            ],
        },
        loadAudioFeatures: {
            name: "Load Audio Features",
            code: "loadAudioFeatures(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with track audio feature data."},
            ],
        },
        loadAudioAnalysis: {
            name: "Load Audio Analysis",
            code: "loadAudioAnalysis(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with track audio analysis data."},
            ],
        },
        loadConditionally: {
            name: "Load Conditionally",
            code: "loadConditionally(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with track data."},
            ],
        },
        retrieveFullObject: {
            name: "Retreive Full Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/",
            code: "retrieveFullObject()",
            returns: "void",
            parameters: [
            ],
        },
        retrieveAudioFeatures: {
            name: "Retreive Audio Features",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/",
            code: "retrieveAudioFeatures()",
            returns: "void",
            parameters: [
            ],
        },
        retrieveAudioAnalysis: {
            name: "Retreive Audio Analysis",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/",
            code: "retrieveAudioAnalysis()",
            returns: "void",
            parameters: [
            ],
        },
        getTrack: {
            name: "Get a Track",
            static: true,
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/",
            code: "Track.getTrack(trackId)",
            returns: "Track",
            parameters: [
                {name: "trackID", types: ["String"], optional: false, description: "Track Spotify ID."},
            ],
        },

    }),
}
</script>