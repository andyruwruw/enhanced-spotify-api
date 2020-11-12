<template>
    <div class="Artist">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Artist Class</h1>
            <p>The <span class="highlight">Artist</span> class is used to maintain and retrieve data from Spotify's API for a given artist.</p>
            <p>If you are handling <span class="highlight">multiple aritsts</span>, use the <a href="http://EnhancedSpotifyAPI.com/container/artists"><span class="highlight">Artists</span></a> container class for better efficiency and functionality.</p>
            <DataObject :properties="properties"  style="margin-top: 30px;">
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
                    var Artist = EnhancedSpotifyAPI.Artist;
                    </pre></highlight-code>
                    <p>Or just the Artist class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Artist } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Artist.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>Creating a new <span class="highlight">Artist</span> instance requires the passing in of a
                    <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids" class="highlight">Spotify Artist ID</a>.</p>
                    <p>You have the choice of either passing in the ID directly:</p>
                    <highlight-code lang="javascript"><pre>
                    // String as a Parameter
                    var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                    var myArtist = new Artist( myFavoriteArtist );
                    </pre></highlight-code>
                    <p>Or as a property within an object:</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter
                    var myFavoriteArtist = {
                        id: '0bZCak2tcRMY1dzEIuwF42'
                    };
                    var myArtist = new Artist( myFavoriteArtist );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Pre-Loading Data</h2>
                    <p>If you've already retrieved some artist data, you can pass it into the constructor to be pre-loaded.</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter with Additional Data
                    var myFavoriteArtist = {
                        id: '0bZCak2tcRMY1dzEIuwF42',
                        name: "The Heavy",
                        // Some other good stuff
                    };
                    var myArtist = new Artist( myFavoriteArtist );
                    </pre></highlight-code>
                    <p>The data will be loaded in if it is valid to the artist object.</p>
                    <p>Artist instances will only make requests if the needed data is absent. Passing in what you have at construction could save you from unnessisary requests.</p>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                     <h2 class="display-1">Working with Instances</h2>

                    <p>Once you have an Artist instance, you can work with any of its member functions!</p>

                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myArtist = new Artist( myFavoriteArtist );

                    var topTracks = await myArtist.getTopTracks();
                    topTracks.createPlaylist();
                    
                    var otherArtists = await myArtist.getRelatedArtists();
                    otherArtists.play();
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Artist</span> class.</p>

                            <p>The new instance will represent that artist for all subsequent member functions called.</p>

                            <p>If you've loaded any data on the artist prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = {
                                id: '0bZCak2tcRMY1dzEIuwF42'
                            };
                            var myArtist = new Artist( myFavoriteArtist );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = {
                                id: '0bZCak2tcRMY1dzEIuwF42',
                                name: "The Heavy",
                            };
                            var myArtist = new Artist( myFavoriteArtist );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Artist}
                        </pre>
                        <pre slot="src">
                        function Artist(data) {
                            try {
                                if (typeof(data) == 'string') {
                                    this.id = data;
                                } else if (typeof(data) == 'object') {
                                    if ('id' in data) {
                                        this.id = data.id; 
                                    } else {
                                        throw new Error("Artist.constructor: No ID Provided");
                                    }
                                    this.loadConditionally(data);
                                } else {
                                    throw new Error("Artist.constructor: Invalid Data");
                                }
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getArtist.docs" :staticMethod="true" :name="getArtist.name" :code="getArtist.code" :returns="getArtist.returns" :parameters="getArtist.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Artist</span> class.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/">Get an Artist</a>, except it returns an instance of the Artist class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrieveFullObject</span></p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = await Artist.getArtist( myFavoriteTrack );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Artist}
                        </pre>
                        <pre slot="src">
                       Artist.getArtist = async function(artistID) {
                            try {
                                let response = await Models.wrapperInstance.getArtist(artistID);
                                return new Models.Artist(response.body);
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
                            <p>Plays artist on user's current playback device.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            myArtist.play();
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            // Start Track 1 Second (1000 milliseconds) in.
                            myArtist.play( { position_ms: 1000 } );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                       play: async function(options) {
                            try {
                                let _options = options ? options : {};
                                _options.context_uri = 'spotify:artist:' + this.id;
                                return await Models.wrapperInstance.play(_options);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Followship</v-subheader>
                    </v-row>
                    <MethodListItem :docs="isFollowed.docs" :name="isFollowed.name" :code="isFollowed.code" :returns="isFollowed.returns" :parameters="isFollowed.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether or not artist is followed by current user.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            var followStatus = await myArtist.isFollowed();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Boolean}
                        </pre>
                        <pre slot="src">
                       isFollowed: async function() {
                            try {
                                let response = await Models.wrapperInstance.isFollowingArtists([this.id]);
                                return response.body[0];
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="follow.docs" :name="follow.name" :code="follow.code" :returns="follow.returns" :parameters="follow.parameters">
                        <div slot="overview">
                            <p>Follows artist.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            if (!await myArtist.isFollowed()) {
                                myArtist.follow();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       follow: async function() {
                            try {
                                return await Models.wrapperInstance.followArtists([this.id]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="unfollow.docs" :name="unfollow.name" :code="unfollow.code" :returns="unfollow.returns" :parameters="unfollow.parameters">
                        <div slot="overview">
                            <p>Unfollows artist.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            if (await myArtist.isFollowed()) {
                                myArtist.unfollow();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       unfollow: async function() {
                            try {
                                return await Models.wrapperInstance.unfollowArtists([this.id]);
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
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-full">Artist Object (Full)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            console.log( await myArtist.getFullObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Object}
                        {
                            id: String,
                            name: String,
                            external_urls: Object,
                            followers: Object,
                            genres: Array,
                            href: String,
                            images: Array,
                            popularity: Number,
                            type: String,
                            uri: String
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
                                    external_urls: this.external_urls,
                                    followers: this.followers,
                                    genres: this.genres,
                                    href: this.href,
                                    images: this.images,
                                    popularity: this.popularity,
                                    uri: this.uri,
                                    type: 'artist',
                                };
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getSimplifiedObject.docs" :name="getSimplifiedObject.name" :code="getSimplifiedObject.code" :returns="getSimplifiedObject.returns" :parameters="getSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-simplified">Artist Object (Simplified)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            console.log( await myArtist.getSimplifiedObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Object}
                        {
                            id: String,
                            name: String,
                            external_urls: Object,
                            href: String,
                            type: String,
                            uri: String
                        }
                        </pre>
                        <pre slot="src">
                       getSimplifiedObject: async function() {
                            try {
                                if (!(await this.containsSimplifiedObject())) {
                                    await this.retrieveFullObject();
                                }
                                return {
                                    id: this.id,
                                    name: this.name,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    uri: this.uri,
                                    type: 'artist',
                                };
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
                            <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the Artist instance.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = {
                                id: '0bZCak2tcRMY1dzEIuwF42',
                                name: "The Heavy",
                            };
                            var myArtist = new Artist( myFavoriteArtist );
                            console.log( "Just give me what ya got");
                            console.log( myArtist.getCurrentData() );
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
                                let data = { id: this.id, type: 'artist' };
                                let properties = ['name', 'external_urls', 'followers', 'genres', 'href', 'images', 'popularity', 'uri'];
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
                    <MethodListItem :docs="getTopTracks.docs" :name="getTopTracks.name" :code="getTopTracks.code" :returns="getTopTracks.returns" :parameters="getTopTracks.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/tracks">Tracks</a> container instance of the artist's top tracks.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );

                            var topTracks = await myArtist.getTopTracks("US");
                            topTracks.play();    
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Tracks}
                        </pre>
                        <pre slot="src">
                       getTopTracks: async function(countryCode) {
                            try {
                                let response =  await Models.wrapperInstance.getArtistTopTracks(this.id, countryCode ? countryCode : "US");
                                return new Models.Tracks(response.body.tracks);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAllTracks.docs" :name="getAllTracks.name" :code="getAllTracks.code" :returns="getAllTracks.returns" :parameters="getAllTracks.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/tracks">Tracks</a> container instance of all the artist's tracks.</p>
                            <p>This method retrieves all the artist's albums with as many requests as it takes (Limited to 50 albums per request by Spotify).</p>
                            <p>Then going through each album and requesting all their tracks with as many requests as it takes (Limited to 50 tracks per request by Spotify).</p>
                            <p>It won't be fast.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );

                            var artistTracks = await myArtist.getAllTracks();
                            artistTracks.like();  
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Tracks}
                        </pre>
                        <pre slot="src">
                       getAllTracks: async function() {
                            try {
                                let tracks = new Models.Tracks();
                                let options = { limit: 50, offset: 0 };
                                let response;
                                do {
                                    response = await Models.wrapperInstance.getArtistAlbums(this.id, options);
                                    let albums = new Models.Albums(response.body.items);
                                    await tracks.concat(await albums.getTracks());
                                    options.offset += 50;
                                } while (!(response.body.items.length &lt; 50));
                                return tracks;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAlbums.docs" :options="getAlbums.options" :name="getAlbums.name" :code="getAlbums.code" :returns="getAlbums.returns" :parameters="getAlbums.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/albums">Albums</a> container instance of the artist's albums.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );

                            var artistAlbums = await myArtist.getAlbums();
                            artistAlbums.like(); 
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Albums}
                        </pre>
                        <pre slot="src">
                       getAlbums: async function(options) {
                            try {
                                if (options != null && typeof(options) != 'object') {
                                    throw new Error("Artist.getAlbums: Invalid Parameter \"options\"");
                                }
                                let response = await Models.wrapperInstance.getArtistAlbums(this.id, options ? options : {});
                                return new Models.Albums(response.body.items);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAllAlbums.docs" :name="getAllAlbums.name" :code="getAllAlbums.code" :returns="getAllAlbums.returns" :parameters="getAllAlbums.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/albums"><span class="highlight">Albums</span></a> instance containing all of the artist's albums.</p>
                            <p>This method retrieves all the artist's albums with as many requests as it takes (Limited to 50 albums per request by Spotify).</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );

                            var artistAlbums = await myArtist.getAllAlbums();
                            artistAlbums.like(); 
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Albums}
                        </pre>
                        <pre slot="src">
                       getAllAlbums: async function() {
                            try {
                                let albums = new Models.Albums();
                                let options = { limit: 50, offset: 0 };
                                let response;
                                do {
                                    response = await Models.wrapperInstance.getArtistAlbums(this.id, options);
                                    await albums.concat(response.body.items);
                                    options.offset += 50;
                                } while (!(response.body.items.length &lt; 50));
                                return albums;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getRelatedArtists.docs" :name="getRelatedArtists.name" :code="getRelatedArtists.code" :returns="getRelatedArtists.returns" :parameters="getRelatedArtists.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/artists"><span class="highlight">Artists</span></a> instance containing related artists.</p>
                            <p>Endpoint will return up to 20 artists. (Spotify doesn't give options here)</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );

                            var otherArtists = await myArtist.getRelatedArtists();
                            otherArtists.play(); 
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Artists}
                        </pre>
                        <pre slot="src">
                       getRelatedArtists: async function() {
                            try {
                                let response = await Models.wrapperInstance.getArtistRelatedArtists(this.id);
                                return new Models.Artists(response.body.artists);
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
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-full">Artist Object (Full)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            
                            if ( myArtist.containsFullObject() ) {
                                await myArtist.retrieveFullObject();
                            }

                            console.log( 'Popularity:', myArtist.popularity, '%' );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );

                            console.log( 'Popularity:', ( await myArtist.getFullObject() ).popularity, '%' );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Boolean}
                        </pre>
                        <pre slot="src">
                       containsFullObject: function() {
                            return ((this.name != null) && (this.external_urls) && (this.followers) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.popularity != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsSimplifiedObject.docs" :name="containsSimplifiedObject.name" :code="containsSimplifiedObject.code" :returns="containsSimplifiedObject.returns" :parameters="containsSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-simplified">Artist Object (Simplified)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            
                            if ( myArtist.containsSimplifiedObject() ) {
                                await myArtist.retrieveFullObject();
                            }

                            console.log( 'For More Info:', myArtist.href );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );

                            console.log( 'For More Info:', ( await myArtist.getSimplifiedObject() ).href );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @returns {Boolean}
                        </pre>
                        <pre slot="src">
                       containsSimplifiedObject: function() {
                            return ((this.name != null) && (this.external_urls) && (this.href != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Load Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="loadFullObject.docs" :name="loadFullObject.name" :code="loadFullObject.code" :returns="loadFullObject.returns" :parameters="loadFullObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-full">Artist Object (Full)</a> and saves it's properties to the Artist Instance.</p>
                            <p>The constructor already takes care of loading all types of artist data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Artist methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            myTrack.loadFullObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myArtist = new Artist( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       loadFullObject: function(data) {
                            try {
                                this.name = data.name;
                                this.external_urls = data.external_urls;
                                this.followers = data.followers;
                                this.genres = data.genres;
                                this.href = data.href;
                                this.images = data.images;
                                this.popularity = data.popularity;
                                this.uri = data.uri;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadSimplifiedObject.docs" :name="loadSimplifiedObject.name" :code="loadSimplifiedObject.code" :returns="loadSimplifiedObject.returns" :parameters="loadSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-simplified">Artist Object (Simplified)</a> and saves it's properties to the Artist Instance.</p>
                            <p>The constructor already takes care of loading all types of artist data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Artist methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            myTrack.loadSimplifiedObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myArtist = new Artist( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       loadSimplifiedObject: function(data) {
                            try {
                                this.name = data.name;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.uri = data.uri;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadConditionally.docs" :name="loadConditionally.name" :code="loadConditionally.code" :returns="loadConditionally.returns" :parameters="loadConditionally.parameters">
                        <div slot="overview">
                            <p>Takes <span class="highlight">any artist data</span> and saves it's properties to the Artist Instance.</p>
                            <p>The constructor already takes care of loading all types of artist data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Artist methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            myTrack.loadConditionally( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myArtist = new Artist( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       loadSimplifiedObject: function(data) {
                            try {
                                this.name = data.name;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.uri = data.uri;
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
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#artist-object-full">Artist Object (Full)</a> for this artist.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );
                            
                            if ( myArtist.containsFullObject() ) {
                                await myArtist.retrieveFullObject();
                            }

                            console.log( 'Popularity:', myArtist.popularity, '%' );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var myArtist = new Artist( myFavoriteArtist );

                            console.log( 'Popularity:', ( await myArtist.getFullObject() ).popularity, '%' );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       retrieveFullObject: async function() {
                            try {
                                let response = await Models.wrapperInstance.getArtist(this.id);
                                await this.loadFullObject(response.body);
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                </v-expansion-panels>
                <div slot="examples-content">
                    <highlight-code lang="javascript"><pre>
                    // Let's get some good information on my favorite artist!
                    // Import the Artist Class
                    var { Artist } = require( 'enhanced-spotify-api' );
                    Artist.setAccessToken( myAccessToken );

                    // Get My Favorite Artist
                    var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                    var myArtist = new Artist( myFavoriteArtist );

                    var fullObject = await myArtist.getFullObject();
                    console.log( "Information on", fullObject.name );

                    var topTracks = await myArtist.getTopTracks();
                    var fullDataSet = topTracks.getFullObjects();

                    console.log( "Their most popular track is:", fullDataSet[0].name);
                    console.log( "Here it is now." );
                    topTracks.play();

                    var albums = await myArtist.getAllAlbums();
                    console.log( fullObject.name, "has released", albums.size(), "albums.");

                    if (!await myArtist.isFollowed()) {
                        console.log( "Following them now." );
                        await myArtist.follow();
                    } else {
                        console.log( "Good to see you're following them!" );
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
    name: 'Artist',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'Artist', disabled: true },
        ],
        properties: {
            instance: [
                {name: "id", type: "String", description: "The Spotify ID for the artist"},
                {name: "name", type: "String", description: "The name of the artist"},
                {name: "external_urls", type: "Object", description: "Known external URLs for this artist"},
                {name: "followers", type: "Object", description: "Information about the followers of the artist"},
                {name: "genres", type: "Array", description: "A list of the genres the artist is associated with"},
                {name: "href", type: "String", description: "A link to the Web API endpoint providing full details of the artist"},
                {name: "images", type: "Array", description: "Images of the artist in various sizes, widest first"},
                {name: "popularity", type: "Number", description: "	The popularity of the artist. The value will be between 0 and 100"},
                {name: "uri", type: "String", description: "The Spotify URI for the artist"},
                {name: "play", type: "Function", description: "Plays artist on user's active device"},
                {name: "isFollowed", type: "Function", description: "Returns whether the artist is followed by the user"},
                {name: "follow", type: "Function", description: "Follows the artist"},
                {name: "unfollow", type: "Function", description: "Unfollows the artist"},
                {name: "getFullObject", type: "Function", description: "Returns full artist data. Retrieves from Spotify API if necessary"},
                {name: "getSimplifiedObject", type: "Function", description: "Returns simplified artist data. Retrieves from Spotify API if necessary"},
                {name: "getCurrentData", type: "Function", description: "Just returns whatever the artist object currently holds"},
                {name: "getTopTracks", type: "Function", description: "Returns Tracks instance of artist's top tracks"},
                {name: "getAllTracks", type: "Function", description: "Returns Tracks instance of all artist's tracks"},
                {name: "getAlbums", type: "Function", description: "Returns Albums instance of artist's albums"},
                {name: "getAllAlbums", type: "Function", description: "Returns Albums instance of all artist's albums"},
                {name: "getRelatedArtists", type: "Function", description: "Returns Artists instance of related artists"},
                {name: "containsFullObject", type: "Function", description: "Returns boolean whether full object data is present"},
                {name: "containsSimplifiedObject", type: "Function", description: "Returns boolean whether simplified object data is present"},
                {name: "loadFullObject", type: "Function", description: "Sets full data (outside constructor)"},
                {name: "loadSimplifiedObject", type: "Function", description: "Sets simplified data (outside constructor)"},
                {name: "loadConditionally", type: "Function", description: "Sets any artist data (outside constructor)"},
                {name: "retrieveFullObject", type: "Function", description: "Retrieves full artist data from Spotify API"},
            ],
            static: [
                {name: "Artist.prototype", type: "Object", description: "Instance of Artist"},
                {name: "Artist.getArtist", type: "Function", description: "Returns Artist instance of ID"},
                {name: "Artist.addMethods", type: "Function", description: "Adds methods to artist prototype"},
                {name: "Artist.override", type: "Function", description: "Overrides methods in artist prototype"},
                {name: "Artist.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Artist.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Artist(data)",
            returns: "Artist",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Data to be preloaded. Must either be a string of the artist ID or contain an `id` property."},
            ],
        },
        play: {
            name: "Play Artist",
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
        isFollowed: {
            name: "Is Artist Followed?",
            docs: "https://developer.spotify.com/console/get-following-contains/",
            code: "isFollowed()",
            returns: "Boolean",
            parameters: [
            ],
        },
        follow: {
            name: "Follow Artist",
            docs: "https://developer.spotify.com/console/put-following/",
            code: "follow()",
            returns: "Object",
            parameters: [
            ],
        },
        unfollow: {
            name: "Unfollow Artist",
            docs: "https://developer.spotify.com/console/delete-following/",
            code: "unfollow()",
            returns: "Object",
            parameters: [
            ],
        },
        getFullObject: {
            name: "Get Full Object",
            docs: "https://developer.spotify.com/console/get-artist/",
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
        getCurrentData: {
            name: "Get Current Data",
            code: "getCurrentData()",
            returns: "Object",
            parameters: [],
        },
        getTopTracks: {
            name: "Get Artist's Top Tracks",
            docs: "https://developer.spotify.com/console/get-artist-top-tracks/",
            code: "getTopTracks(countryCode)",
            returns: "Tracks",
            parameters: [
                {name: "countryCode", types: ["String"], optional: true, description: "Country code (ISO code)."},
            ],
        },
        getAllTracks: {
            name: "Get All Artist's Tracks",
            docs: "https://developer.spotify.com/console/get-artist-albums/",
            code: "getAllTracks()",
            returns: "Tracks",
            parameters: [
            ],
        },
        getAlbums: {
            name: "Get Artist's Albums",
            docs: "https://developer.spotify.com/console/get-artist-albums/",
            code: "getAlbums(options)",
            returns: "Albums",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "limit", types: ["Number"], description: "Number of albums to retrieve (Minimum: 1, Max: 50).", default: "20"},
                {name: "offset", types: ["Number"], description: "The index of the first album to return.", default: "0"},
                {name: "country", types: ["String"], description: "Country code (ISO code).", default: "from_token"},
                {name: "include_groups", types: ["String"], description: "Comma-separated list of filters: album, single, appears_on, compilation.", default: "All"},
            ],
        },
        getAllAlbums: {
            name: "Get All Artist's Albums",
            docs: "https://developer.spotify.com/console/get-artist-albums/",
            code: "getAllAlbums()",
            returns: "Albums",
            parameters: [
            ],
        },
        getRelatedArtists: {
            name: "Get Related Artists",
            docs: "https://developer.spotify.com/console/get-artist-related-artists/",
            code: "getRelatedArtists()",
            returns: "Artists",
            parameters: [
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
        loadFullObject: {
            name: "Load Full Object",
            code: "loadFullObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with artist full object data."},
            ],
        },
        loadSimplifiedObject: {
            name: "Load Simplified Object",
            code: "loadSimplifiedObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with artist simplified object data."},
            ],
        },
        loadConditionally: {
            name: "Load Conditionally",
            code: "loadConditionally(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with artist data."},
            ],
        },
        retrieveFullObject: {
            name: "Retrieve Full Object",
            docs: "https://developer.spotify.com/console/get-artist/",
            code: "retrieveFullObject()",
            returns: "void",
            parameters: [
            ],
        },
        getArtist: {
            name: "Get Artist",
            docs: "https://developer.spotify.com/console/get-artist/",
            code: "Artist.getArtist(artistID)",
            returns: "Artist",
            parameters: [
                {name: "artistID", types: ["String"], optional: false, description: "Artist Spotify ID."},
            ],
        },
    }),
}
</script>
