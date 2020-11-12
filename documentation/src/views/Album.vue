<template>
    <div class="Album">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Album Class</h1>
            <p>The <span class="highlight">Album</span> class is used to maintain and retrieve data from Spotify's API for a given album.</p>
            <p>If you are handling <span class="highlight">multiple albums</span>, use the <a href="http://EnhancedSpotifyAPI.com/container/albums">Albums</a> container class for better efficiency and functionality.</p>
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
                    var Album = EnhancedSpotifyAPI.Album;
                    </pre></highlight-code>
                    <p>Or just the Album class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Album } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Album.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>Creating a new <span class="highlight">Album</span> instance requires the passing in of a <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify Album ID</a>.</p>
                    <p>You have the choice of either passing in the ID directly:</p>
                    <highlight-code lang="javascript"><pre>
                    // String as a Parameter
                    var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                    var myAlbum = new Album( myFavoriteAlbum );
                    </pre></highlight-code>
                    <p>Or as a property within an object:</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter
                    var myFavoriteAlbum = {
                        id: "0GaYG9L1sXHQZZ7BTk0hGY"
                    };
                    var myAlbum = new Album( myFavoriteAlbum );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Pre-Loading Data</h2>
                    <p>If you've already retrieved some album data, you can pass it into the constructor to be pre-loaded.</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter with Additional Data
                    var myFavoriteAlbum = {
                        id: "0GaYG9L1sXHQZZ7BTk0hGY",
                        name: "Sound & Color",
                        // Some other good stuff
                    };
                    var myAlbum = new Album( myFavoriteAlbum );
                    </pre></highlight-code>
                    <p>The data will be loaded in if it is valid to the album object.</p>
                    <p>Album instances will only make requests if the needed data is absent. Passing in what you have at construction could save you from unnessisary requests.</p>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Working with Instances</h2>
                    <p>Once you have a Album instance, you can work with any of its member functions!</p>
                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myAlbum = new Album( myFavoriteAlbum );

                    var tracks = await myAlbum.getTracks();
                    var audioFeatures = await tracks.getAudioFeatureDistributions( 20 );
                    
                    var artists = await myAlbum.getArtists();
                    artists.play();
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Album</span> class.</p>
                            <p>The new instance will represent that album for all subsequent member functions called.</p>
                            <p>If you've loaded any data on the album prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = {
                                id: "0GaYG9L1sXHQZZ7BTk0hGY"
                            };
                            var myAlbum = new Album( myFavoriteAlbum );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = {
                                id: "0GaYG9L1sXHQZZ7BTk0hGY",
                                name: "Sound & Color",
                                // Some other good stuff
                            };
                            var myAlbum = new Album( myFavoriteAlbum );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Album}
                        </pre>
                        <pre slot="src">
                       function Album(data) {
                            try {
                                if (typeof(data) == 'string') {
                                    this.id = data;
                                    this._tracks = new Models.Tracks();
                                } else if (typeof(data) == 'object') {
                                    if (data.hasOwnProperty('id')) {
                                        this.id = data.id; 
                                    } else {
                                        throw new Error("Album.constructor: No ID Provided");
                                    }
                                    this._tracks = '_tracks' in data ? data._tracks : new Models.Tracks();
                                    this.loadConditionally(data);
                                } else {
                                    throw new Error("Album.constructor: Invalid Data");
                                }
                                this.tracksRetrieved = false;
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAlbum.docs" :staticMethod="true" :options="getAlbum.options" :name="getAlbum.name" :code="getAlbum.code" :returns="getAlbum.returns" :parameters="getAlbum.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Album</span> class.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/albums/get-album/">Get a Album</a>, except it returns an instance of the Album class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrieveFullObject</span></p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = await Album.getAlbum( myFavoriteAlbum );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Album}
                        </pre>
                        <pre slot="src">
                       Album.getAlbum = async function(albumID, options) {
                            try {
                                let response = await Models.wrapperInstance.getAlbum(albumID, options ? options : {});
                                return new Models.Album(response.body);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Playback</v-subheader>
                    </v-row>
                    <MethodListItem :docs="play.docs" :name="play.name" :options="play.options" :code="play.code" :returns="play.returns" :parameters="play.parameters">
                        <div slot="overview">
                            <p>Plays album on user's current playback device.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            myAlbum.play();
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            // Start On 3rd Track
                            myAlbum.play( { offset: 2 });
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            // Start Track 1 Second (1000 milliseconds) in.
                            myAlbum.play( { position_ms: 1000 });
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                       play: async function(options) {
                            try {
                                let _options = options ? options : {};
                                _options.context_uri = 'spotify:album:' + this.id;
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
                            <p>Returns <span class="highlight">Boolean</span> whether or not album is saved to current User's library.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            var savedStatus = await myAlbum.isLiked();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <pre slot="src">
                       isLiked: async function() {
                            try {
                                let response = await Models.wrapperInstance.containsMySavedAlbums([this.id]);
                                return response.body[0];
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="like.docs" :name="like.name" :code="like.code" :returns="like.returns" :parameters="like.parameters">
                        <div slot="overview">
                            <p>Saves a album to current User's library.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            if ( !await myAlbum.isLiked() ) {
                                myAlbum.like();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                       like: async function() {
                            try {
                                return await Models.wrapperInstance.addToMySavedAlbums([this.id]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="unlike.docs" :name="unlike.name" :code="unlike.code" :returns="unlike.returns" :parameters="unlike.parameters">
                        <div slot="overview">
                            <p>Removes a album from current User's library.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            if ( await myAlbum.isLiked() ) {
                                myAlbum.unlike();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                       unlike: async function() {
                            try {
                                return await Models.wrapperInstance.removeFromMySavedAlbums([this.id]);
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
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-full">Album Object (Full)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            console.log( await myAlbum.getFullObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                id: String,
                                name: String,
                                album_type: String,
                                artists: Array,
                                available_markets: Array,
                                copyrights: Object,
                                external_ids: Object,
                                external_urls: Object,
                                genres: Array,
                                href: String,
                                images: Object,
                                label: String,
                                popularity: Number,
                                release_date: String,
                                release_date_precision: String,
                                restrictions: Object,
                                tracks: Object,
                                uri: String,
                                type: String,
                            }
                        </pre>
                        <pre slot="src">
                       getFullObject: async function() {
                            try {
                                if (!(await this.containsFullObject())) {
                                    await this.retrieveFullObject();
                                }
                                return {
                                    id: this.id,
                                    name: this.name,
                                    album_type: this.album_type,
                                    artists: this.artists,
                                    available_markets: this.available_markets,
                                    copyrights: this.copyrights,
                                    external_ids: this.external_ids,
                                    external_urls: this.external_urls,
                                    genres: this.genres,
                                    href: this.href,
                                    images: this.images,
                                    label: this.label,
                                    popularity: this.popularity,
                                    release_date: this.release_date,
                                    release_date_precision: this.release_date_precision,
                                    restrictions: this.restrictions,
                                    tracks: this.tracks,
                                    uri: this.uri,
                                    type: 'album',
                                };
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getSimplifiedObject.docs" :name="getSimplifiedObject.name" :code="getSimplifiedObject.code" :returns="getSimplifiedObject.returns" :parameters="getSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-simplified">Album Object (Simplified)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            console.log( await myAlbum.getSimplifiedObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                id: String,
                                name: String,
                                album_type: String,
                                artists: Array,
                                available_markets: Array,
                                external_urls: Object,
                                href: String,
                                images: Object,
                                release_date: String,
                                release_date_precision: String,
                                restrictions: Object,
                                uri: String,
                                type: String,
                            }
                        </pre>
                        <pre slot="src">
                       getSimplifiedObject: async function() {
                            try {
                                if (!(await this.containsSimplifiedObject())) {
                                    await this.retrieveFullObject();
                                }
                                let data = {
                                    id: this.id,
                                    name: this.name,
                                    album_type: this.album_type,
                                    artists: this.artists,
                                    available_markets: this.available_markets,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    images: this.images,
                                    release_date: this.release_date,
                                    release_date_precision: this.release_date_precision,
                                    restrictions: this.restrictions,
                                    uri: this.uri,
                                    type: 'album',
                                };
                                if (this.album_group != null) {
                                    data.album_group = this.album_group;
                                }
                                return data; 
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
                            <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the Album instance.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = {
                                id: "0GaYG9L1sXHQZZ7BTk0hGY",
                                name: "Sound & Color",
                            };
                            var myAlbum = new Album( myFavoriteAlbum );
                            console.log( "Just give me what ya got");
                            console.log( myAlbum.getCurrentData() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object}
                            {
                                // Varies
                            }
                        </pre>
                        <pre slot="src">
                       getCurrentData: function() {
                            try {
                                let data = { id: this.id, type: 'album' };
                                let properties = ['name', 'album_type', 'artists', 'available_markets', 'copyrights', 'external_ids', 'external_urls', 'genres', 'href', 'images', 'label', 'popularity', 'release_date', 'release_date_precision', 'restrictions', 'tracks', 'uri', '_tracks'];
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
                    <MethodListItem :docs="getTracks.docs" :name="getTracks.name" :code="getTracks.code" :returns="getTracks.returns" :parameters="getTracks.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/tracks">Tracks</a> container instance of the album's tracks.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );

                            var albumTracks = await myAlbum.getTracks();
                            var distributions = await albumTracks.getAudioFeatureDistributions( 21 );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Tracks}
                        </pre>
                        <pre slot="src">
                       getTracks: async function() {
                            try {
                                if (!this.tracksRetrieved) {
                                    await this.retrieveTracks();
                                }
                                return this._tracks;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getArtists.docs" :name="getArtists.name" :code="getArtists.code" :returns="getArtists.returns" :parameters="getArtists.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/artists">Artists</a> container instance of the album's artists.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );

                            var albumArtists = await myAlbum.getArtists();
                            await albumArtists.follow();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Artists}
                        </pre>
                        <pre slot="src">
                       getArtists: async function() {
                            try {
                                if (!(await this.containsSimplifiedObject())) {
                                    await this.retrieveFullObject();
                                }
                                return new Models.Artists(this.artists);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Retrieval Status</v-subheader>
                    </v-row>
                    <MethodListItem :docs="containsFullObject.docs" :name="containsFullObject.name" :code="containsFullObject.code" :returns="containsFullObject.returns" :parameters="containsFullObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-full">Album Object (Full)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            
                            if ( myAlbum.containsFullObject() ) {
                                await myAlbum.retrieveFullObject();
                            }

                            console.log( 'Genres:', myAlbum.genres.join(', '), '%' );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );

                            console.log( 'Genres:', ( await myAlbum.getFullObejct() ).genres.join(', '), '%' );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <pre slot="src">
                       containsFullObject: function() {
                            return ((this.name != null) && (this.album_type != null) && (this.artists != null) && (this.available_markets != null) && (this.copyrights != null) && (this.external_ids) && (this.external_urls) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.label != null) && (this.popularity != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.restrictions) && (this.tracks != null) && (this.uri != null) );
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsSimplifiedObject.docs" :name="containsSimplifiedObject.name" :code="containsSimplifiedObject.code" :returns="containsSimplifiedObject.returns" :parameters="containsSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-simplified">Album Object (Simplified)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            
                            if ( myAlbum.containsSimplifiedObject() ) {
                                await myAlbum.retrieveFullObject();
                            }

                            console.log( 'More info at:', myAlbum.href );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );

                            console.log( 'More info at:', ( await myAlbum.getSimplifiedObject() ).href );

                            console.log( 'Genres:', .genres.join(', '), '%' );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <pre slot="src">
                       containsSimplifiedObject: function() {
                            return ((this.name != null) && (this.album_type != null) && (this.artists != null) && (this.available_markets != null) && (this.external_urls) && (this.href != null) && (this.images != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.restrictions) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Load Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="loadFullObject.docs" :name="loadFullObject.name" :code="loadFullObject.code" :returns="loadFullObject.returns" :parameters="loadFullObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-full">Album Object (Full)</a> and saves it's properties to the Album Instance.</p>
                            <p>The constructor already takes care of loading all types of album data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Album methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            myAlbum.loadFullObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myAlbum = new Album( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       loadFullObject: async function(data) {
                            try {
                                this.name = data.name;
                                this.album_type = data.album_type;
                                this.artists = data.artists;
                                this.available_markets = data.available_markets;
                                this.copyrights = data.copyrights;
                                this.external_ids = data.external_ids;
                                this.external_urls = data.external_urls;
                                this.genres = data.genres;
                                this.href = data.href;
                                this.images = data.images;
                                this.label = data.label;
                                this.popularity = data.popularity;
                                this.release_date = data.release_date;
                                this.release_date_precision = data.release_date_precision;
                                this.restrictions = data.restrictions;
                                this.uri = data.uri;
                                this.tracks = data.tracks;
                                if ('items' in data.tracks) {
                                    await this.loadTracks(data.tracks.items);
                                } else {
                                    await this.loadTracks(data.tracks);
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadSimplifiedObject.docs" :name="loadSimplifiedObject.name" :code="loadSimplifiedObject.code" :returns="loadSimplifiedObject.returns" :parameters="loadSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-simplified">Album Object (Simplified)</a> and saves it's properties to the Album Instance.</p>
                            <p>The constructor already takes care of loading all types of album data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Album methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            myAlbum.loadSimplifiedObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myAlbum = new Album( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       loadSimplifiedObject: async function(data) {
                            try {
                                this.id = data.id;
                                this.name = data.name;
                                this.album_type = data.album_type;
                                this.artists = data.artists;
                                this.available_markets = data.available_markets;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.images = data.images;
                                this.release_date = data.release_date;
                                this.release_date_precision = data.release_date_precision;
                                this.restrictions = data.restrictions;
                                this.uri = data.uri;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadConditionally.docs" :name="loadConditionally.name" :code="loadConditionally.code" :returns="loadConditionally.returns" :parameters="loadConditionally.parameters">
                        <div slot="overview">
                            <p>Takes <span class="highlight">any album data</span> and saves it's properties to the Album Instance.</p>
                            <p>The constructor already takes care of loading all types of album data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Album methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            myAlbum.loadConditionally( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myAlbum = new Album( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       loadConditionally: function(data) {
                            try {
                                let properties = ['name', 'album_type', 'artists', 'available_markets', 'copyrights', 'external_ids', 'external_urls', 'genres', 'href', 'images', 'label', 'popularity', 'release_date', 'release_date_precision', 'restrictions', 'tracks', 'uri', 'album_group'];
                                for (let i = 0; i &lt; properties.length; i++) {
                                    if (data.hasOwnProperty(properties[i])) {
                                        this[properties[i]] = data[properties[i]];
                                    }
                                }
                                if ('tracks' in data) {
                                    if ('items' in data.tracks) {
                                        this.loadTracks(data.tracks.items);
                                    } else if (data.tracks instanceof Array) {
                                        this.loadTracks(data.tracks);
                                    }
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadTracks.docs" :name="loadTracks.name" :code="loadTracks.code" :returns="loadTracks.returns" :parameters="loadTracks.parameters">
                        <div slot="overview">
                            <p>Helper function for loading tracks into internal <span class="highlight">Tracks</span> instance.</p>
                            <p>You really shouldn't have any need to use this!</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // Helper Function only.
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       loadTracks: async function(tracks) {
                            try {
                                if (tracks instanceof Models.Tracks || tracks instanceof Array) {
                                    this._tracks.concat(tracks);
                                } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                                    this._tracks.add(tracks);
                                } else {
                                    throw new Error("Album.loadTracks: Invalid Parameter \"tracks\"");
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Retrieve Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="retrieveFullObject.docs" :name="retrieveFullObject.name" :code="retrieveFullObject.code" :returns="retrieveFullObject.returns" :parameters="retrieveFullObject.parameters">
                        <div slot="overview">
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-full">Album Object (Full)</a> for this album.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            
                            if ( myAlbum.containsFullObject() ) {
                                await myAlbum.retrieveFullObject();
                            }

                            console.log( 'Genres:', myAlbum.genres.join(', '), '%' );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );

                            console.log( 'Genres:', ( await myAlbum.getFullObejct() ).genres.join(', '), '%' );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       retrieveFullObject: async function() {
                            try {
                                let response = await Models.wrapperInstance.getAlbum(this.id);
                                await this.loadFullObject(response.body);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="retrieveTracks.docs" :name="retrieveTracks.name" :code="retrieveTracks.code" :returns="retrieveTracks.returns" :parameters="retrieveTracks.parameters">
                        <div slot="overview">
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/">Album's Tracks</a>.</p>
                            <p>This method retrieves all the album's tracks with as many requests as it takes (Limited to 50 tracks per request by Spotify).</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            
                            await myAlbum.retrieveTracks();
                            var tracks = myAlbum._tracks;
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );
                            
                            var tracks = await myAlbum.getTracks();
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveTracks: async function() {
                            try {
                                let options = { limit: 50, offset: 0 };
                                let response;
                                do {
                                    response = await Models.wrapperInstance.getAlbumTracks(this.id, options);
                                    await this.loadTracks(response.body.items);
                                    options.offset += 50;
                                } while (!(response.body.items.length &lt; 50));
                                this.tracksRetrieved = true;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                </v-expansion-panels>
                <div slot="examples-content">
                    <highlight-code lang="javascript"><pre>
                    // Don't run this script unless you love an album so much you'd die for it.
                    // Import the Album Class
                    var { Album } = require( 'enhanced-spotify-api' );
                    Album.setAccessToken( myAccessToken );

                    var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                    var myAlbum = new Album( myFavoriteAlbum );

                    // Like all of the tracks
                    var tracks = await myAlbum.getTracks();
                    tracks.play();
                    tracks.like();

                    // Follow all the playlists
                    var artists = await myAlbum.getArtists();
                    artists.follow();
                    
                    // Like all of their albums
                    var theirAlbums = await artists.getAllAlbums();
                    theirAlbums.like();

                    // Like all the tracks in those albums and create a playlist
                    var thoseTracks = theirAlbums.getTracks();
                    thoseTracks.like();
                    thoseTracks.createPlaylist();
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
    name: 'Album',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'Album', disabled: true },
        ],
        properties: {
            instance: [
                {name: "id", type: "String", description: "The Spotify ID for the album"},
                {name: "name", type: "String", description: "The name of the album"},
                {name: "album_type", type: "String", description: "The type of the album:"},
                {name: "artists", type: "Array", description: "The artists of the album"},
                {name: "available_markets", type: "Array", description: "The markets in which the album is available"},
                {name: "copyrights", type: "Object", description: "The copyright statements of the album"},
                {name: "external_ids", type: "Object", description: "Known external IDs for the album"},
                {name: "external_urls", type: "Object", description: "Known external URLs for this album"},
                {name: "genres", type: "Array", description: "A list of the genres used to classify the album"},
                {name: "href", type: "String", description: "A link to the Web API endpoint providing full details of the album"},
                {name: "images", type: "Array", description: "The cover art for the album in various sizes"},
                {name: "label", type: "String", description: "The label for the album"},
                {name: "popularity", type: "Number", description: "The popularity of the album. The value will be between 0 and 100"},
                {name: "release_date", type: "String", description: "The date the album was first released"},
                {name: "release_date_precision", type: "String", description: "The precision with which release_date value is known"},
                {name: "restrictions", type: "Object", description: "Contains the reason why the track is not available"},
                {name: "tracks", type: "Object", description: "The tracks of the album (Paging Object)"},
                {name: "uri", type: "String", description: "The Spotify URI for the album"},
                {name: "_tracks", type: "Tracks", description: "Instance of Tracks"},
                {name: "tracksRetrieved", type: "Boolean", description: "Boolean whether tracks have been retrieved"},
                {name: "play", type: "Function", description: "Plays album on user's active device"},
                {name: "isLiked", type: "Function", description: "Returns whether an album is saved to the user's library"},
                {name: "like", type: "Function", description: "Adds album to the user's library"},
                {name: "unlike", type: "Function", description: "Removes album from the user's library"},
                {name: "getFullObject", type: "Function", description: "Returns full album data. Retrieves from Spotify API if nessisary"},
                {name: "getSimplifiedObject", type: "Function", description: "Returns simplified album data. Retrieves from Spotify API if nessisary"},
                {name: "getCurrentData", type: "Function", description: "Just returns whatever the album object currently holds"},
                {name: "getTracks", type: "Function", description: "Returns Tracks object of album tracks"},
                {name: "getArtists", type: "Function", description: "Returns Artists object of album artists"},
                {name: "retrieveFullObject", type: "Function", description: "Retrieves full album data from Spotify API"},
                {name: "retrieveTracks", type: "Function", description: "Retrieves all tracks in album from Spotify API"},
                {name: "loadFullObject", type: "Function", description: "Sets full data (outside constructor)"},
                {name: "loadSimplifiedObject", type: "Function", description: "Sets simplified data (outside constructor)"},
                {name: "loadConditionally", type: "Function", description: "Sets any album data (outside constructor)"},
                {name: "loadTracks", type: "Function", description: "Helper method to add tracks to album's internal Tracks item"},
                {name: "containsFullObject", type: "Function", description: "Returns boolean whether full object data is present"},
                {name: "containsSimplifiedObject", type: "Function", description: "Returns boolean whether simplified object data is present"},
            ],
            static: [
                {name: "Album.prototype", type: "Object", description: "Instance of Album"},
                {name: "Album.getAlbum", type: "Function", description: "Returns Album instance of ID"},
                {name: "Album.addMethods", type: "Function", description: "Adds methods to album prototype"},
                {name: "Album.override", type: "Function", description: "Overrides methods in album prototype"},
                {name: "Album.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Album.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Album(data)",
            returns: "Album",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Data to be preloaded. Must either be a string of the album ID or contain an `id` property."},
            ],
        },
        getAlbum: {
            name: "Get Album",
            code: "Album.getAlbum(albumID)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/albums/get-album/",
            returns: "Album",
            parameters: [
                {name: "albumID", types: ["String"], optional: false, description: "Id of album to be retrieved."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "market", types: ["String"], description: "Country code (ISO code).", default: "from_token"},
            ]
        },
        play: {
            name: "Play Album",
            code: "play(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "offset", types: ["Object"], description: "Where from the album to play.", default: "0"},
                {name: "offset.position", types: ["Number"], description: "Index of item to start playing within album.", default: "0"},
                {name: "offset.uri", types: ["String"], description: "URI of item to start playing within album.", default: "Undefined"},
                {name: "position_ms", types: ["Number"], description: "Position to start playback (Milliseconds).", default: "0"},
            ],
        },
        isLiked: {
            name: "Is Album Liked?",
            code: "isLiked",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-albums/",
            returns: "Boolean",
            parameters: [
            ],
        },
        like: {
            name: "Like Album",
            code: "like()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/save-albums-user/",
            returns: "Object",
            parameters: [
            ],
        },
        unlike: {
            name: "Unlike Album",
            code: "unlike()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/remove-albums-user/",
            returns: "Object",
            parameters: [
            ],
        },
        getFullObject: {
            name: "Get Full Object",
            code: "getFullObject()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/albums/get-album/",
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
        getCurrentData: {
            name: "Get Current Data",
            code: "getCurrentData()",
            returns: "Object",
            parameters: [],
        },
        getTracks: {
            name: "Get Album Tracks",
            code: "getTracks()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/",
            returns: "Tracks",
            parameters: [
            ],
        },
        getArtists: {
            name: "Get Album Artists",
            code: "getArtists()",
            returns: "Artists",
            parameters: [
            ],
        },
        retrieveFullObject: {
            name: "Retrieve Full Object",
            code: "retrieveFullObject()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/albums/get-album/",
            returns: "void",
            parameters: [
            ],
        },
        retrieveTracks: {
            name: "Retrieve Tracks",
            code: "retrieveTracks()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/",
            returns: "void",
            parameters: [
            ],
        },
        loadFullObject: {
            name: "Load Full Object",
            code: "loadFullObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with album full object data."},
            ],
        },
        loadSimplifiedObject: {
            name: "Load Simplified Object",
            code: "loadSimplifiedObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with album simplified object data."},
            ],
        },
        loadConditionally: {
            name: "Load Conditionally",
            code: "loadConditionally(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with any album data."},
            ],
        },
        loadTracks: {
            name: "Load Tracks",
            code: "loadTracks(tracks)",
            returns: "void",
            parameters: [
                {name: "tracks", types: ["Tracks", "Array", "Track", "Object", "String"], optional: false, description: "Tracks to be added."},
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
    }),
}
</script>