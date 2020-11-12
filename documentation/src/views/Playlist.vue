<template>
    <div class="Playlist page-content">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div style="padding-left: 24px">
            <h1 class="display-1">Playlist Class</h1>
            <p>The <span class="highlight">Playlist</span> class is used to maintain and retrieve data from Spotify's API for a given playlist.</p>
            <p>If you are handling <span class="highlight">multiple playlists</span>, use the <a href="http://enhancedwrapper.com/container/playlists">Playlists</a> container class for better efficiency and functionality.</p>
            <p>Because of its simularities, the Playlist class has a lot of the same functionality of the <a href="http://enhancedwrapper.com/container/tracks">Tracks</a> container class. The main difference being that each method <span class="highlight">Commits changes</span> to Spotify, altering the Playlist.</p>
            <p>Spotify provides a small set of endpoints for editing playlists, this class offers vanilla array methods that use those endpoints.</p>
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
                    var Playlist = EnhancedSpotifyAPI.Playlist;
                    </pre></highlight-code>
                    <p>Or just the Playlist class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Playlist } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                   EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Playlist.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>There are two ways to create a new  <span class="highlight">Playlist</span> instance. You can either bind the Playlist instance to an existing playlist, or create a new Playlist.</p>
                    <h2 class="headline" style="margin-top: 30px">Bind to Existing Playlist</h2>
                    <p>Creating a new Playlist instance bound to an existing playlist requires the passing in of a <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids" class="highlight">Spotify Playlist ID</a>.</p>
                    <p>You have the choice of either passing in the ID directly:</p>
                    <highlight-code lang="javascript"><pre>
                    // String as a Parameter
                    var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                    var myPlaylist = new Playlist( myFavoritePlaylist );
                    </pre></highlight-code>
                    <p>Or as a property within an object:</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter
                    var myFavoritePlaylist = {
                        id: "6Ibg2aBUp5NP0lAujEGa6p"
                    };
                    var myPlaylist = new Playlist( myFavoritePlaylist );
                    </pre></highlight-code>
                    <h2 class="headline" style="margin-top: 30px">Creating a New Playlist</h2>
                    <p>To create a new Playlist, use the <span class="highlight">create</span> static method.</p>
                    <highlight-code lang="javascript"><pre>
                   var name = "My New Playlist";
                    var options = { public: false };
                    var myPlaylist = await Playlist.create( name, options );
                    </pre></highlight-code>
                    <p>The create static method requires you pass in a name. Additional options can be passed in from the second parameter. See the methods tab for more details on all possible options.</p>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Pre-Loading Data</h2>
                    <p>If you've already retrieved some playlist data, you can pass it into the constructor to be pre-loaded.</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter with Additional Data
                    var myFavoritePlaylist = {
                        id: "6Ibg2aBUp5NP0lAujEGa6p",
                        name: "ALL TIME FAVORITES",
                        // Some other good stuff
                    };
                    var myPlaylist = new Playlist( myFavoritePlaylist );
                    </pre></highlight-code>
                    <p>The data will be loaded in if it is valid to the playlist object.</p>
                    <p>Playlist instances will only make requests if the needed data is absent. Passing in what you have at construction could save you from unnessisary requests.</p>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Working with Instances</h2>
                    <p>Once you have a Playlist instance, you can work with any of its member functions!</p>
                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myPlaylist = new Playlist( myFavoritePlaylist );

                    var tracks = await myPlaylist.getTracks();
                    var averages = await tracks.getAudioFeatureAverages();
                    
                    var artists = await myPlaylist.getArtists();
                    var otherArtists = await artists.getRelatedArtists();
                    otherArtists.play();
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <MethodListItem :docs="constructor.docs" :options="constructor.options" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Playlist</span> class.</p>
                            <p>The new instance will represent that playlist for all subsequent member functions called.</p>
                            <p>If you've loaded any data on the playlist prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = {
                                id: "6Ibg2aBUp5NP0lAujEGa6p"
                            };
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = {
                                id: "6Ibg2aBUp5NP0lAujEGa6p",
                                name: "ALL TIME FAVORITES",
                                // Some other good stuff
                            };
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Playlist}
                        </pre>
                        <pre slot="src">
                        function Playlist(data) {
                            try {
                                if (typeof(data) == 'string') {
                                    this.id = data;
                                    this._tracks = new Models.Tracks();
                                } else if (typeof(data) == 'object') {
                                    if (data.hasOwnProperty('id')) {
                                        this.id = data.id;
                                    } else {
                                        throw new Error("Playlist.constructor: No ID Provided");
                                    }
                                    this.loadConditionally(data);
                                } else {
                                    throw new Error("Playlist.constructor: Invalid Parameter \"data\"");
                                }
                                this.retrieved = false;
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getPlaylist.docs" :staticMethod="true" :options="getPlaylist.options" :name="getPlaylist.name" :code="getPlaylist.code" :returns="getPlaylist.returns" :parameters="getPlaylist.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Playlist</span> class.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/">Get a Playlist</a>, except it returns an instance of the Playlist class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrieveFullObject</span></p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = await Playlist.getPlaylist( myFavoritePlaylist );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Playlist}
                        </pre>
                        <pre slot="src">
                        Playlist.getPlaylist = async function(playlistID) {
                            try {
                                let response = await Models.wrapperInstance.getPlaylist(playlistID);
                                return new Models.Playlist(response.body);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="create.docs" :staticMethod="true" :options="create.options" :name="create.name" :code="create.code" :returns="create.returns" :parameters="create.parameters">
                        <div slot="overview">
                            <p>Creates a new playlist with a given name and returns a <span class="highlight">Playlist</span> instance bound to it.</p>
                            <p>Other options such as public status, collaborative status and description can be optionally set.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // New playlist with your top tracks.
                            var newPlaylist = await Playlist.create( "My Favorite Tracks" );
                            var topTracks = await Tracks.getMyTopTracks();
                            await newPlaylist.concat( topTracks );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // New private playlist with your top tracks.
                            var options = { public: false, description: "IM TOO EMBARASSED TO SHARE MY TOP TRACKS" };
                            var newPlaylist = await Playlist.create( "EMBARASSING", options );
                            var topTracks = await Tracks.getMyTopTracks();
                            await newPlaylist.concat( topTracks );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Playlist}
                        </pre>
                        <pre slot="src">
                        Playlist.create = async function(name, options) {
                            try {
                                if (options != null && typeof(options != 'object')) {
                                    throw new Error("Playlist.create: Invalid Parameter \"options\"");
                                }
                                let userID = await (await Models.wrapperInstance.getMe()).body.id;
                                let _options = options ? options : {};
                                _options.name = name;
                                let response = await Models.wrapperInstance.createPlaylist(userID, _options);
                                return new Models.Playlist(response.body);
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
                            <p>Plays playlist on user's current playback device.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            await myPlaylist.play();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        play: async function(options)  {
                            try {
                                let _options = options ? options : {};
                                _options.context_uri = 'spotify:playlist:' + this.id;
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
                    <MethodListItem :docs="isFollowed.docs" :options="isFollowed.options" :name="isFollowed.name" :code="isFollowed.code" :returns="isFollowed.returns" :parameters="isFollowed.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether current User is following this playlist.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var followStatus = await myPlaylist.isLiked();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        isFollowed: async function() {
                            try {
                                let userID = await (await Models.wrapperInstance.getMe()).body.id;
                                let response = await Models.wrapperInstance.areFollowingPlaylist(this.id, [userID]);
                                return response.body[0];
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="areFollowing.docs" :options="areFollowing.options" :name="areFollowing.name" :code="areFollowing.code" :returns="areFollowing.returns" :parameters="areFollowing.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Array of Booleans</span> whether a set of Users are following this playlist.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var myFriendsIDs = ["g8zb9y9m96q2rokxvyp2v5orq", "1246732761"];
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var areTheyFollowing = await myPlaylist.areFollowing( myFriendsIDs );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Array}
                            [ true | false ]
                        </pre>
                        <pre slot="src">
                        areFollowing: async function(userIds) {
                            try {
                                let response = await Models.wrapperInstance.areFollowingPlaylist(this.id, userIds);
                                return response.body;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="follow.docs" :options="follow.options" :name="follow.name" :code="follow.code" :returns="follow.returns" :parameters="follow.parameters">
                        <div slot="overview">
                            <p>Follows playlist.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            if (!await myPlaylist.isFollowed()) {
                                myPlaylist.follow();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        follow: async function() {
                            try {
                                return await Models.wrapperInstance.followPlaylist(this.id);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="unfollow.docs" :options="unfollow.options" :name="unfollow.name" :code="unfollow.code" :returns="unfollow.returns" :parameters="unfollow.parameters">
                        <div slot="overview">
                            <p>Unfollows playlist.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            if (await myPlaylist.isFollowed()) {
                                myPlaylist.unfollow();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        unfollow: async function() {
                            try {
                                return await Models.wrapperInstance.unfollowPlaylist(this.id);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="getFullObject.docs" :options="getFullObject.options" :name="getFullObject.name" :code="getFullObject.code" :returns="getFullObject.returns" :parameters="getFullObject.parameters">
                        <div slot="overview">
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#playlist-object-full">Playlist Object (Full)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            console.log( await myPlaylist.getFullObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                            {
                                id: String,
                                name: String,
                                description: String,
                                owner: Object,
                                public: Boolean,
                                collaborative: Boolean,
                                images: Array,
                                followers: Object,
                                snapshot_id: String,
                                external_urls: Object,
                                href: String,
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
                                    collaborative: this.collaborative,
                                    description: this.description,
                                    external_urls: this.external_urls,
                                    followers: this.followers,
                                    href: this.href,
                                    images: this.images,
                                    name: this.name,
                                    owner: this.owner,
                                    public: this.public,
                                    snapshot_id: this.snapshot_id,
                                    tracks: this.tracks,
                                    uri: this.uri,
                                    type: 'playlist',
                                };
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getSimplifiedObject.docs" :options="getSimplifiedObject.options" :name="getSimplifiedObject.name" :code="getSimplifiedObject.code" :returns="getSimplifiedObject.returns" :parameters="getSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#playlist-object-simplified">Playlist Object (Simplified)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            console.log( await myPlaylist.getSimplifiedObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                            {
                                id: String,
                                name: String,
                                description: String,
                                owner: Object,
                                public: Boolean,
                                collaborative: Boolean,
                                images: Array,
                                snapshot_id: String,
                                external_urls: Object,
                                href: String,
                                tracks: Object,
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
                                    collaborative: this.collaborative,
                                    description: this.description,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    images: this.images,
                                    name: this.name,
                                    owner: this.owner,
                                    public: this.public,
                                    snapshot_id: this.snapshot_id,
                                    tracks: this.tracks,
                                    uri: this.uri,
                                    type: 'playlist',
                                };
                                return data; 
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getCurrentData.docs" :options="getCurrentData.options" :name="getCurrentData.name" :code="getCurrentData.code" :returns="getCurrentData.returns" :parameters="getCurrentData.parameters">
                        <div slot="overview">
                            <p>Not looking to waste more time with another request?</p>
                            <p>Already know the data you need is present?</p>
                            <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the Playlist instance.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = {
                                id: "6Ibg2aBUp5NP0lAujEGa6p",
                                name: "ALL TIME FAVORITES",
                            };
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            console.log( "Just give me what ya got");
                            console.log( myPlaylist.getCurrentData() );
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
                                let data = { id: this.id, type: 'playlist' };
                                let properties = ['collaborative', 'description', 'external_urls', 'followers', 'href', 'images', 'name', 'owner', 'public', 'snapshot_id', 'tracks', 'uri', '_tracks'];
                                for (let i = 0; i &lt; properties.length; i++) {
                                    if (this[properties[i]] != null) {
                                        data[properties[i]] = this[properties[i]];
                                    }
                                }
                                data._tracks = this._tracks;
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
                    <MethodListItem :docs="getTracks.docs" :options="getTracks.options" :name="getTracks.name" :code="getTracks.code" :returns="getTracks.returns" :parameters="getTracks.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/tracks">Tracks</a> container instance of the playlist's tracks.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var playlistTracks = await myPlaylist.getTracks();
                            var distributions = await playlistTracks.getAudioFeatureDistributions( 21 );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Tracks}
                        </pre>
                        <pre slot="src">
                        getTracks: async function() {
                            try {
                                await this.retrieveTracks();
                                return await this._tracks;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getArtists.docs" :options="getArtists.options" :name="getArtists.name" :code="getArtists.code" :returns="getArtists.returns" :parameters="getArtists.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/artists">Artists</a> container instance of the playlist's artists.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var playlistArtists = await myPlaylist.getTracks();
                            await playlistArtists.follow();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Artists}
                        </pre>
                        <pre slot="src">
                        getArtists: async function() {
                            try {
                                await this.retrieveTracks();
                                return await this._tracks.getArtists();
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAlbums.docs" :options="getAlbums.options" :name="getAlbums.name" :code="getAlbums.code" :returns="getAlbums.returns" :parameters="getAlbums.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/albums">Albums</a> container instance of the playlist's albums.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var playlistAlbums = await myPlaylist.getAlbums();
                            await playlistAlbums.like();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Albums}
                        </pre>
                        <pre slot="src">
                        getAlbums: async function() {
                            try {
                                await this.retrieveTracks();
                                return await this._tracks.getAlbums();
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Contents</v-subheader>
                    </v-row>
                    <MethodListItem :docs="size.docs" :options="size.options" :name="size.name" :code="size.code" :returns="size.returns" :parameters="size.parameters">
                        <div slot="overview">
                            <p>Returns number of tracks in Playlist.</p>
                            <p>If tracks havn't already been retrieved, this method will make requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var trackNum = await myPlaylist.size();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Number}
                        </pre>
                        <pre slot="src">
                        size: async function() {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                return await this._tracks.size();
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="includes.docs" :options="includes.options" :name="includes.name" :code="includes.code" :returns="includes.returns" :parameters="includes.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> of whether track is in playlist.</p>
                            <p>If tracks havn't already been retrieved, this method will make requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            if (!await myPlaylist.includes( myFavoriteTrack )) {
                                await myPlaylist.push( myFavoriteTrack );
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        includes: async function(track) {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                return this._tracks.includes(track);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="get.docs" :options="get.options" :name="get.name" :code="get.code" :returns="get.returns" :parameters="get.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Track</span> instance of track at a given index in the playlist.</p>
                            <p>If tracks havn't already been retrieved, this method will make requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var secondTrack = await myPlaylist.get( 1 );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Track}
                        </pre>
                        <pre slot="src">
                        get: async function(index) {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                return this._tracks.get(index);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="indexOf.docs" :options="indexOf.options" :name="indexOf.name" :code="indexOf.code" :returns="indexOf.returns" :parameters="indexOf.parameters">
                        <div slot="overview">
                            <p>Returns index of a track within the playlist. -1 if not found.</p>
                            <p>If tracks havn't already been retrieved, this method will make requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var indexInPlaylist = await myPlaylist.indexOf( myFavoriteTrack );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Number}
                        </pre>
                        <pre slot="src">
                        indexOf: async function(track, start) {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                return await this._tracks.indexOf(track, start);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getIDs.docs" :options="getIDs.options" :name="getIDs.name" :code="getIDs.code" :returns="getIDs.returns" :parameters="getIDs.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Array of IDs</span> in order.</p>
                            <p>If tracks havn't already been retrieved, this method will make requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var playlistTrackIDs = await myPlaylist.getIDs();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Array}
                            [ String ]
                        </pre>
                        <pre slot="src">
                        getIDs: async function() {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                return this._tracks.getIDs();
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getIDsNoRepeats.docs" :options="getIDsNoRepeats.options" :name="getIDsNoRepeats.name" :code="getIDsNoRepeats.code" :returns="getIDsNoRepeats.returns" :parameters="getIDsNoRepeats.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Array of IDs</span> in order, removing duplicate items.</p>
                            <p>If tracks havn't already been retrieved, this method will make requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var uniqueIDs = await myPlaylist.getIDsNoRepeats();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Array}
                            [ String ]
                        </pre>
                        <pre slot="src">
                        getIDsNoRepeats: async function() {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                return this._tracks.getIDsNoRepeats();
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getURIs.docs" :options="getURIs.options" :name="getURIs.name" :code="getURIs.code" :returns="getURIs.returns" :parameters="getURIs.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Array of URIs</span> in order.</p>
                            <p>If tracks havn't already been retrieved, this method will make requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var playlistTrackURIs = await myPlaylist.getURIs();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Array}
                            [ String ]
                        </pre>
                        <pre slot="src">
                        getURIs: async function() {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                return this._tracks.getURIs();
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getURIsNoRepeats.docs" :options="getURIsNoRepeats.options" :name="getURIsNoRepeats.name" :code="getURIsNoRepeats.code" :returns="getURIsNoRepeats.returns" :parameters="getURIsNoRepeats.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Array of URIs</span> in order, removing duplicate items.</p>
                            <p>If tracks havn't already been retrieved, this method will make requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var uniqueURIs = await myPlaylist.getURIsNoRepeats();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Array}
                            [ String ]
                        </pre>
                        <pre slot="src">
                        getURIsNoRepeats: async function() {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                return this._tracks.getURIsNoRepeats();
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Add</v-subheader>
                    </v-row>
                    <MethodListItem :docs="push.docs" :options="push.options" :name="push.name" :code="push.code" :returns="push.returns" :parameters="push.parameters">
                        <div slot="overview">
                            <p><span class="highlight">Appends a track</span> to the playlist and commits changes to Spotify.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            if (!await myPlaylist.includes( myFavoriteTrack )) {
                                await myPlaylist.push( myFavoriteTrack );
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        push: async function(track) {
                            try {
                                return await this.addTracks([track]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="concat.docs" :options="concat.options" :name="concat.name" :code="concat.code" :returns="concat.returns" :parameters="concat.parameters">
                        <div slot="overview">
                            <p><span class="highlight">Appends multiple track</span> to the playlist and commits changes to Spotify.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var myAlbum = new Album( myFavoriteAlbum );

                            await myPlaylist.concat( await myAlbum.getTracks() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        concat: async function(tracks) {
                            try {
                                return await this.addTracks(tracks);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="addTracks.docs" :options="addTracks.options" :name="addTracks.name" :code="addTracks.code" :returns="addTracks.returns" :parameters="addTracks.parameters">
                        <div slot="overview">
                            <p>Spotify endpoint for adding tracks to a playlist. Allows for more options such as positioning. Updates internal tracks container to avoid future requests.</p>
                            <p>Returns the response from the request.</p>
                            <p>Helper function used by all add methods.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            // Add my favorite track at the start of the playlist
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var options = { position: 0 };
                            await myPlaylist.addTracks( myFavoriteTrack, options );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        addTracks: async function(tracks, options) {
                            try {
                                let uris = [];
                                if (tracks instanceof Models.Tracks) {
                                    uris = await tracks.getURIs();
                                } else if (tracks instanceof Array) {
                                    for (let i = 0; i &lt; tracks.length; i++) {
                                        if (((tracks[i] instanceof Models.Track || typeof(tracks[i]) == 'object')) && tracks[i].hasOwnProperty('id')) {
                                            uris.push('spotify:track:' + tracks[i].id);
                                        } else if (typeof(tracks[i]) == 'string') {
                                            uris.push('spotify:track:' + tracks[i]);
                                        }
                                    }
                                } else if (tracks instanceof Models.Track || typeof(tracks) == 'object') {
                                    if (tracks.hasOwnProperty('id')) {
                                        uris = ['spotify:track:' + tracks.id];
                                    } else {
                                        throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
                                    }
                                } else if (typeof(tracks) == 'string') {
                                    uris = ['spotify:track:' + tracks];
                                } else {
                                    throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
                                }
                                let response = await Models.wrapperInstance.addTracksToPlaylist(this.id, uris, options ? options : {});
                                if (this.retrieved) {
                                    this._tracks.concat(tracks);
                                    if (options && options.hasOwnProperty('position')) {
                                        let order = this._tracks.getIDs();
                                        order.splice(options.position, 0, ...order.splice(order.length - uris.length + 1, order.length));
                                        this._tracks.order = order;
                                    }
                                }
                                this.snapshot_id = response.body.snapshot_id;
                                return response;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Remove</v-subheader>
                    </v-row>
                    <MethodListItem :docs="pop.docs" :options="pop.options" :name="pop.name" :code="pop.code" :returns="pop.returns" :parameters="pop.parameters">
                        <div slot="overview">
                            <p>Removes the <span class="highlight">last track</span> from the playlist and commits changes to Spotify.</p>
                            <p>Returns removed item.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var removedTrack = await myPlaylist.pop();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Track}
                        </pre>
                        <pre slot="src">
                        pop: async function() {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                await this.removeTrackIndexes([(await this.size()) - 1]);
                                let track = await this._tracks.pop();
                                return track;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="shift.docs" :options="shift.options" :name="shift.name" :code="shift.code" :returns="shift.returns" :parameters="shift.parameters">
                        <div slot="overview">
                            <p>Removes the <span class="highlight">first track</span> from the playlist and commits changes to Spotify.</p>
                            <p>Returns removed item.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var removedTrack = await myPlaylist.shift();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Track}
                        </pre>
                        <pre slot="src">
                        shift: async function() {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                let track = await this._tracks.shift();
                                await this.removeTrackIndexes([0]);
                                return track;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="remove.docs" :options="remove.options" :name="remove.name" :code="remove.code" :returns="remove.returns" :parameters="remove.parameters">
                        <div slot="overview">
                            <p>Removes a track from the playlist and commits changes to Spotify.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var response = await myPlaylist.remove( myFavoriteTrack );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        remove: async function(track) {
                            try {
                                return await this.removeTracks([track]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="removeTracks.docs" :options="removeTracks.options" :name="removeTracks.name" :code="removeTracks.code" :returns="removeTracks.returns" :parameters="removeTracks.parameters">
                        <div slot="overview">
                            <p>Spotify endpoint for removing tracks from a playlist. Updates internal tracks container to avoid future requests.</p>
                            <p>Returns the response from the request.</p>
                            <p>Helper function used by remove methods.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var response = await myPlaylist.removeTracks( myFavoriteTrack );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        removeTracks: async function(tracks) {
                            try {
                                let uris = [];
                                if (tracks instanceof Models.Tracks) {
                                    uris = await tracks.getURIs();
                                } else if (tracks instanceof Array) {
                                    for (let i = 0; i &lt; tracks.length; i++) {
                                        if (typeof(tracks[i]) == 'object' && tracks[i].hasOwnProperty('uri')) {
                                            uris.push(tracks[i]);
                                        } else if (((tracks[i] instanceof Models.Track || typeof(tracks[i]) == 'object')) && tracks[i].hasOwnProperty('id')) {
                                            uris.push('spotify:track:' + tracks[i].id);
                                        } else if (typeof(tracks[i]) == 'string') {
                                            if (tracks[i].substring(0, 7) == 'spotify') {
                                                uris.push(tracks[i]);
                                            } else {
                                                uris.push('spotify:track:' + tracks[i]);
                                            }
                                        }
                                    }
                                } else if (typeof(tracks) == 'object' && tracks[i].hasOwnProperty('uri')) {
                                    uris.push(tracks)
                                } else if ((tracks instanceof Models.Track || typeof(tracks) == 'object') && tracks.hasOwnProperty('id')) {
                                    uris.push('spotify:track:' + tracks.id);
                                } else if (typeof(tracks) == 'string') {
                                    if (tracks.substring(0, 7) == 'spotify') {
                                        uris.push(tracks);
                                    } else {
                                        uris.push('spotify:track:' + tracks);
                                    }
                                } else {
                                    throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
                                }
                                let response = await Models.wrapperInstance.removeTracksFromPlaylistWithSnapshotId(this.id, uris, this.snapshot_id);
                                if (this.retrieved) {
                                    if (!(uris instanceof Array)) {
                                        uris = [uris];
                                    }
                                    for (let i = 0; i &lt; uris.length; i++) {
                                        if (typeof(uris[i]) == 'object' && uris[i].hasOwnProperty('uri')) {
                                            if (uris[i].hasOwnProperty('positions')) {
                                                await this._tracks.removeIndexes(uris[i].positions);
                                            } else {
                                                await this._tracks.remove(uris[i].uri.substring(14, uris[i].uri.length));
                                            }
                                        } else {
                                            await this._tracks.remove(uris[i].substring(14, uris[i].length));
                                        }
                                    }
                                }
                                this.snapshot_id = response.body.snapshot_id;
                                return response;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="removeTrackIndexes.docs" :options="removeTrackIndexes.options" :name="removeTrackIndexes.name" :code="removeTrackIndexes.code" :returns="removeTrackIndexes.returns" :parameters="removeTrackIndexes.parameters">
                        <div slot="overview">
                            <p>Spotify endpoint for removing tracks from a playlist by indexes. Updates internal tracks container to avoid future requests.</p>
                            <p>Returns the response from the request.</p>
                            <p>Helper function used by remove methods.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var indexes = [ 0, 5, 8 ];
                            var response = await myPlaylist.removeTrackIndexes( indexes );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        removeTrackIndexes: async function(positions) {
                            try {
                                if (this.snapshot_id == null) {
                                    await this.retrieveFullObject();
                                }
                                let response = await Models.wrapperInstance.removeTracksFromPlaylistByPosition(this.id, positions instanceof Array ? positions : [positions], this.snapshot_id);
                                if (this.retrieved) {
                                    if (positions instanceof Array) {
                                        await this._tracks.removeIndexes(positions);
                                    } else {
                                        await this._tracks.removeIndexes([positions]);
                                    }
                                }
                                this.snapshot_id = response.body.snapshot_id;
                                return response;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Mutate</v-subheader>
                    </v-row>
                    <MethodListItem :docs="changeDetails.docs" :options="changeDetails.options" :name="changeDetails.name" :code="changeDetails.code" :returns="changeDetails.returns" :parameters="changeDetails.parameters">
                        <div slot="overview">
                            <p>Changes playlist details: name, public status, collaborative status or description.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var options = { name: "New Playlist Name" };
                            var response = await myPlaylist.changeDetails( options );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        changeDetails: async function(options) {
                            try {
                                return await Models.wrapperInstance.changePlaylistDetails(this.id, options);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="uploadCoverImage.docs" :options="uploadCoverImage.options" :name="uploadCoverImage.name" :code="uploadCoverImage.code" :returns="uploadCoverImage.returns" :parameters="uploadCoverImage.parameters">
                        <div slot="overview">
                            <p>Updates playlist custom cover image.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var response = await myPlaylist.uploadCoverImage( imageData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        uploadCoverImage: async function(imageData) {
                            try {
                                return await Models.wrapperInstance.uploadCustomPlaylistCoverImage(this.id, imageData);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="reverse.docs" :options="reverse.options" :name="reverse.name" :code="reverse.code" :returns="reverse.returns" :parameters="reverse.parameters">
                        <div slot="overview">
                            <p>Reverses the order of all tracks in the Playlist.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var response = await myPlaylist.reverse();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        reverse: async function() {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                await this._tracks.reverse();
                                return await this.replaceTracks(this._tracks.getIDs());
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="filter.docs" :options="filter.options" :name="filter.name" :code="filter.code" :returns="filter.returns" :parameters="filter.parameters">
                        <div slot="overview">
                            <p>Filters all tracks in the Playlist. Removing all tracks that don't return true for passed in filter method.</p>
                            <p>Acts just like <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">javascript array filter method</a>.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var filterMethod = async function(track) {
                                return ( await track.getAudioFeatures() ).energy &lt; .5;
                            };
                            var response = await myPlaylist.filter(filterMethod);
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        filter: async function(method, thisArg) {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                this._tracks = await this._tracks.filter(method, thisArg);
                                return await this.replaceTracks(this._tracks);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="sort.docs" :options="sort.options" :name="sort.name" :code="sort.code" :returns="sort.returns" :parameters="sort.parameters">
                        <div slot="overview">
                            <p>Sorts tracks in Playlist.</p>
                            <p>Acts just like <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">javascript array sort method</a>.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var response = await myPlaylist.reverse();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        sort: async function(compareFunction) {
                            try {
                                if (!this.retrieved) {
                                    await this.retrieveTracks();
                                }
                                await this._tracks.sort(compareFunction);
                                return await this.replaceTracks(this._tracks.getIDs());
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="replaceTracks.docs" :options="replaceTracks.options" :name="replaceTracks.name" :code="replaceTracks.code" :returns="replaceTracks.returns" :parameters="replaceTracks.parameters">
                        <div slot="overview">
                            <p>Spotify endpoint for replacing all the tracks from a playlist with new ones. Updates internal tracks container to avoid future requests.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            var topTracks = await Tracks.getMyTopTracks();
                            var response = await myPlaylist.replaceTracks( topTracks );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        replaceTracks: async function(tracks) {
                            try {
                                let uris = [];
                                if (tracks instanceof Models.Tracks) {
                                    uris = await tracks.getURIs();
                                } else if (tracks instanceof Array) {
                                    for (let i = 0; i &lt; tracks.length; i++) {
                                        if (((tracks[i] instanceof Models.Track || typeof(tracks[i]) == 'object')) && tracks[i].hasOwnProperty('id')) {
                                            uris.push('spotify:track:' + tracks[i].id);
                                        } else if (typeof(tracks[i]) == 'string') {
                                            uris.push('spotify:track:' + tracks[i]);
                                        }
                                    }
                                } else if (tracks instanceof Models.Track || typeof(tracks) == 'object') {
                                    if (tracks.hasOwnProperty('id')) {
                                        uris = ['spotify:track:' + tracks.id];
                                    } else {
                                        throw new Error("Playlist.replaceTracks: Invalid Parameter \"tracks\"");
                                    }
                                } else if (typeof(tracks) == 'string') {
                                    uris = ['spotify:track:' + tracks];
                                } else {
                                    throw new Error("Playlist.replaceTracks: Invalid Parameter \"tracks\"");
                                }
                                let response = await Models.wrapperInstance.replaceTracksInPlaylist(this.id, uris);
                                this._tracks = new Models.Tracks(tracks);
                                this.retrieved = true;
                                this.snapshot_id = response.body.snapshot_id;
                                return response;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="reorderTracks.docs" :options="reorderTracks.options" :name="reorderTracks.name" :code="reorderTracks.code" :returns="reorderTracks.returns" :parameters="reorderTracks.parameters">
                        <div slot="overview">
                            <p>Spotify endpoint for reordering tracks from a playlist. Updates internal tracks container to avoid future requests.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // Put the first track at the end.
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var response = myPlaylist.reorderTracks(0, await myPlaylist.size() );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Swap both halves of the playlist
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            var options = { range_length: await myPlaylist.size() / 2 }
                            var response = myPlaylist.reorderTracks(0, (await myPlaylist.size() / 2) + 1, options );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        reorderTracks: async function(range_start, insert_before, options) {
                            try {
                                let response = await Models.wrapperInstance.reorderTracksInPlaylist(this.id, range_start, insert_before, options ? options : {}, this.snapshot_id);
                                if (this.retrieved) {
                                    let order = this._tracks.getIDs();
                                    let range_length = (options && options.hasOwnProperty('range_length') ? options.range_length : 1);
                                    let selection = order.filter((item, index) => {
                                        return (index >= range_start && index &lt; range_start +  range_length);
                                    });
                                    order.splice(insert_before, 0, ...selection);
                                    if (insert_before > range_start) {
                                        order.splice(range_start, range_length);
                                    } else {
                                        order.splice(range_start + range_length, range_length);
                                    }
                                    this._tracks.order = order;
                                }
                                this.snapshot_id = response.body.snapshot_id;
                                return response;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Retrieval Status</v-subheader>
                    </v-row>
                    <MethodListItem :docs="containsFullObject.docs" :options="containsFullObject.options" :name="containsFullObject.name" :code="containsFullObject.code" :returns="containsFullObject.returns" :parameters="containsFullObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#playlist-object-full">Playlist Object (Full)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            
                            if ( myPlaylist.containsFullObject() ) {
                                await myPlaylist.retrieveFullObject();
                            }

                            console.log( 'Playlist Name:', myPlaylist.name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            console.log( 'Playlist Name:', ( await myPlaylist.getFullObejct() ).name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsFullObject: function() {
                            return ((this.name != null) && (this.collaborative != null) && (this.description != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.owner) && (this.public != null) && (this.snapshot_id != null) && (this.tracks != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsSimplifiedObject.docs" :options="containsSimplifiedObject.options" :name="containsSimplifiedObject.name" :code="containsSimplifiedObject.code" :returns="containsSimplifiedObject.returns" :parameters="containsSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#playlist-object-simplified">Playlist Object (Simplified)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            
                            if ( myPlaylist.containsFullObject() ) {
                                await myPlaylist.retrieveFullObject();
                            }

                            console.log( 'Playlist Name:', myPlaylist.name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            console.log( 'Playlist Name:', ( await myPlaylist.getFullObejct() ).name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsSimplifiedObject: function() {
                            return ((this.name != null) && (this.collaborative != null) && (this.description != null) && (this.external_urls) && (this.href != null) && (this.images != null) && (this.owner) && (this.public != null) && (this.snapshot_id != null) && (this.tracks != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Load Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="loadFullObject.docs" :options="loadFullObject.options" :name="loadFullObject.name" :code="loadFullObject.code" :returns="loadFullObject.returns" :parameters="loadFullObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#playlist-object-full">Playlist Object (Full)</a> and saves it's properties to the Playlist Instance.</p>
                            <p>The constructor already takes care of loading all types of playlist data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Playlist methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            myPlaylist.loadFullObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myPlaylist = new Playlist( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadFullObject: async function(data) {
                            try {
                                this.collaborative = data.collaborative;
                                this.description = data.description;
                                this.external_urls = data.external_urls;
                                this.followers = data.followers;
                                this.href = data.href;
                                this.images = data.images;
                                this.name = data.name;
                                this.owner = data.owner;
                                this.public = data.public;
                                this.snapshot_id = data.snapshot_id;
                                this.uri = data.uri;
                                if ('tracks' in data) {
                                    this.tracks = data.tracks;
                                    if ('items' in data.tracks) {
                                        await this.loadTracks(data.tracks.items);
                                    } else {
                                        await this.loadTracks(data.tracks);
                                    }
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadSimplifiedObject.docs" :options="loadSimplifiedObject.options" :name="loadSimplifiedObject.name" :code="loadSimplifiedObject.code" :returns="loadSimplifiedObject.returns" :parameters="loadSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#playlist-object-simplified">Playlist Object (Simplified)</a> and saves it's properties to the Playlist Instance.</p>
                            <p>The constructor already takes care of loading all types of playlist data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Playlist methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            myPlaylist.loadSimplifiedObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myPlaylist = new Playlist( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadSimplifiedObject: async function(data) {
                            try {
                                this.collaborative = data.collaborative;
                                this.description = data.description;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.images = data.images;
                                this.name = data.name;
                                this.owner = data.owner;
                                this.public = data.public;
                                this.snapshot_id = data.snapshot_id;
                                this.tracks = data.tracks;
                                this.uri = data.uri;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadConditionally.docs" :options="loadConditionally.options" :name="loadConditionally.name" :code="loadConditionally.code" :returns="loadConditionally.returns" :parameters="loadConditionally.parameters">
                        <div slot="overview">
                            <p>Takes <span class="highlight">any playlist data</span> and saves it's properties to the Playlist Instance.</p>
                            <p>The constructor already takes care of loading all types of playlist data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Playlist methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            myPlaylist.loadConditionally( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myPlaylist = new Playlist( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadConditionally: function(data) {
                            try {
                                let properties = ['name', 'collaborative', 'description', 'external_urls', 'followers', 'href', 'images', 'owner', 'public', 'snapshot_id', 'tracks', 'uri'];
                                for (let i = 0; i &lt; properties.length; i++) {
                                    if (data.hasOwnProperty(properties[i])) {
                                        this[properties[i]] = data[properties[i]];
                                    }
                                }
                                this._tracks = '_tracks' in data ? data._tracks : new Models.Tracks();
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
                    <MethodListItem :docs="loadTracks.docs" :options="loadTracks.options" :name="loadTracks.name" :code="loadTracks.code" :returns="loadTracks.returns" :parameters="loadTracks.parameters">
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
                                    throw new Error("Playlist.loadTracks: Invalid Parameter \"tracks\"");
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
                    <MethodListItem :docs="retrieveFullObject.docs" :options="retrieveFullObject.options" :name="retrieveFullObject.name" :code="retrieveFullObject.code" :returns="retrieveFullObject.returns" :parameters="retrieveFullObject.parameters">
                        <div slot="overview">
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#playlist-object-full">Playlist Object (Full)</a> for this playlist.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            
                            if ( myPlaylist.containsFullObject() ) {
                                await myPlaylist.retrieveFullObject();
                            }

                            console.log( 'Playlist Name:', myPlaylist.name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );

                            console.log( 'Playlist Name:', ( await myPlaylist.getFullObejct() ).name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveFullObject: async function() {
                            try {
                                let response = await Models.wrapperInstance.getPlaylist(this.id);
                                await this.loadFullObject(response.body);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="retrieveTracks.docs" :options="retrieveTracks.options" :name="retrieveTracks.name" :code="retrieveTracks.code" :returns="retrieveTracks.returns" :parameters="retrieveTracks.parameters">
                        <div slot="overview">
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/">Playlist's Tracks</a>.</p>
                            <p>This method retrieves all the playlist's tracks with as many requests as it takes (Limited to 100 tracks per request by Spotify).</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            
                            await myPlaylist.retrieveTracks();
                            var tracks = myPlaylist._tracks;
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoritePlaylist = '6Ibg2aBUp5NP0lAujEGa6p';
                            var myPlaylist = new Playlist( myFavoritePlaylist );
                            
                            var tracks = await myPlaylist.getTracks();
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveTracks: async function() {
                            try {
                                this._tracks = new Models.Tracks();
                                let options = { offset: 0 };
                                let response;
                                do {
                                    response = await Models.wrapperInstance.getPlaylistTracks(this.id, options);
                                    await this.loadTracks(response.body.items);
                                    options.offset += 100;
                                } while (!(response.body.items.length &lt; 100));
                                this.retrieved = true;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                </v-expansion-panels>
                <div slot="examples-content">
                    <highlight-code lang="javascript"><pre>
                    // Coming Soon
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
    name: 'Playlist',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'Playlist', disabled: true },
        ],
        properties: {
            instance: [
                {name: "id", type: "String", description: "The Spotify ID for the playlist"},
                {name: "name", type: "String", description: "The name of the playlist"},
                {name: "description", type: "String", description: "The desciption of the playlist"},
                {name: "images", type: "Array", description: "The cover art for the playlist in various sizes"},
                {name: "owner", type: "Object", description: "Owner of the playlist"},
                {name: "public", type: "Boolean", description: "Public status of the playlist"},
                {name: "collaborative", type: "Boolean", description: "Collaborative status of the playlist"},
                {name: "followers", type: "Object", description: "Followers object containing number of followers of playlist"},
                {name: "external_urls", type: "Object", description: "Known external URLs for this playlist"},
                {name: "href", type: "String", description: "A link to the Web API endpoint providing full details of the playlist"},
                {name: "snapshot_id", type: "String", description: "	The version identifier for the current playlist"},
                {name: "tracks", type: "Object", description: "The tracks of the playlist (Paging Object)"},
                {name: "uri", type: "String", description: "The Spotify URI for the album"},
                {name: "_tracks", type: "Tracks", description: "Instance of Tracks"},
                {name: "retrieved", type: "Boolean", description: "Boolean whether tracks have been retrieved"},
                {name: "play", type: "Function", description: "Plays playlist on user's active device"},
                {name: "isFollowed", type: "Function", description: "Returns whether an playlist is followed by current user"},
                {name: "areFollowing", type: "Function", description: "Returns whether an playlist is followed by a set of user"},
                {name: "follow", type: "Function", description: "Follows playlist"},
                {name: "unfollow", type: "Function", description: "Unfollows playlist"},
                {name: "getFullObject", type: "Function", description: "Returns full playlist data. Retrieves from Spotify API if nessisary"},
                {name: "getSimplifiedObject", type: "Function", description: "Returns simplified playlist data. Retrieves from Spotify API if nessisary"},
                {name: "getCurrentData", type: "Function", description: "Just returns whatever the playlist object currently holds"},
                {name: "getTracks", type: "Function", description: "Returns Tracks object of playlist tracks"},
                {name: "getArtists", type: "Function", description: "Returns Artists object of playlist artists"},
                {name: "getAlbums", type: "Function", description: "Returns Albums object of playlist albums"},
                {name: "containsFullObject", type: "Function", description: "Returns boolean whether full object data is present"},
                {name: "containsSimplifiedObject", type: "Function", description: "Returns boolean whether simplified object data is present"},
                {name: "retrieveFullObject", type: "Function", description: "Retrieves full playlist data from Spotify API"},
                {name: "retrieveTracks", type: "Function", description: "Retrieves all tracks in playlist from Spotify API"},
                {name: "loadFullObject", type: "Function", description: "Sets full data (outside constructor)"},
                {name: "loadSimplifiedObject", type: "Function", description: "Sets simplified data (outside constructor)"},
                {name: "loadConditionally", type: "Function", description: "Sets any playlist data (outside constructor)"},
                {name: "loadTracks", type: "Function", description: "Helper method to add tracks to playlist's internal Tracks item"},
                {name: "uploadCoverImage", type: "Function", description: "Updates playlist cover image"},
                {name: "removeTrackIndexes", type: "Function", description: "Removes tracks from playlist by index"},
                {name: "removeTracks", type: "Function", description: "Removes tracks from playlist"},
                {name: "reorderTracks", type: "Function", description: "Reorders tracks in playlist"},
                {name: "replaceTracks", type: "Function", description: "Replaces all tracks in playlist with new tracks"},
                {name: "addTracks", type: "Function", description: "Adds tracks to playlist"},
                {name: "shift", type: "Function", description: "Removes first track from playlist"},
                {name: "pop", type: "Function", description: "Removes last track from playlist"},
                {name: "reverse", type: "Function", description: "Reverses order of tracks in playlist"},
                {name: "getURIsNoRepeats", type: "Function", description: "Returns array of URIs of tracks in playlist in order, removing duplicates"},
                {name: "getURIs", type: "Function", description: "Returns array of URIs of tracks in playlist in order"},
                {name: "getIDsNoRepeats", type: "Function", description: "Returns array of IDs of tracks in playlist in order, removing duplicates"},
                {name: "getIDs", type: "Function", description: "Returns array of IDs of tracks in playlist in order"},
                {name: "get", type: "Function", description: "Returns track at a given index in playlist"},
                {name: "includes", type: "Function", description: "Returns Boolean whether track is present in playlist"},
                {name: "indexOf", type: "Function", description: "Returns index of track in a playlist"},
                {name: "size", type: "Function", description: "Returns number of tracks in the playlist"},
                {name: "remove", type: "Function", description: "Revmoves a track from the playlist"},
                {name: "concat", type: "Function", description: "Adds multiple tracks to the playlist"},
                {name: "push", type: "Function", description: "Adds a single track to the playlist"},
                {name: "changeDetails", type: "Function", description: "Updates playlist details"},
            ],
            static: [
                {name: "Playlist.prototype", type: "Object", description: "Instance of Playlist"},
                {name: "Playlist.getPlaylist", type: "Function", description: "Returns Playlist instance of ID"},
                {name: "Playlist.create", type: "Function", description: "Creates a new Playlist and returns a Playlist instance."},
                {name: "Playlist.addMethods", type: "Function", description: "Adds methods to Playlist prototype"},
                {name: "Playlist.override", type: "Function", description: "Overrides methods in Playlist prototype"},
                {name: "Playlist.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playlist.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Playlist(data)",
            returns: "Playlist",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Data to be preloaded. Must either be a string of the Playlist ID or contain an `id` property."},
            ],
        },
        play: {
            name: "Play Playlist",
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
        isFollowed: {
            name: "Is Following Playlist?",
            code: "isFollowed()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/follow/check-user-following-playlist/",
            returns: "Boolean",
            parameters: [
            ],
        },
        areFollowing: {
            name: "Are Following Playlist?",
            code: "areFollowing(userIDs)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/follow/check-user-following-playlist/",
            returns: "Array",
            parameters: [
                {name: "userIDs", types: ["Array"], optional: false, description: "User IDs to check followship of given playlist."},
            ],
        },
        follow: {
            name: "Follow Playlist",
            code: "follow()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/",
            returns: "Object",
            parameters: [
            ],
        },
        unfollow: {
            name: "Unfollow Playlist",
            code: "unfollow()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-playlist/",
            returns: "Object",
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
        getFullObject: {
            name: "Get Full Object",
            code: "getFullObject()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/",
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
            name: "Get Tracks",
            code: "getTracks()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/",
            returns: "Tracks",
            parameters: [
            ],
        },
        getArtists: {
            name: "Get Artists",
            code: "getArtists()",
            returns: "Artists",
            parameters: [
            ],
        },
        getAlbums: {
            name: "Get Albums",
            code: "getAlbums()",
            returns: "Albums",
            parameters: [
            ],
        },
        changeDetails: {
            name: "Change Details",
            code: "changeDetails(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/change-playlist-details/",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "name", types: ["String"], description: "New name for playlist."},
                {name: "description", types: ["String"], description: "New description for playlist."},
                {name: "public", types: ["Boolean"], description: "New public status of playlist."},
                {name: "collaborative", types: ["Boolean"], description: "New collaborative status of playlist."},

            ],
        },
        push: {
            name: "Push",
            code: "push(track)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/",
            parameters: [
                {name: "track", types: ["Track", "Object", "String"], optional: false, description: "Track Instance, track ID, or object with track ID to add."},
            ],
        },
        concat: {
            name: "Concatenate",
            code: "concat(tracks)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/",
            parameters: [
                {name: "tracks", types: ["Tracks", "Array"], optional: false, description: "Another Tracks instance or Array of: Track instances, track IDs, or objects with track IDs, to concatenate."},
            ],
        },
        remove: {
            name: "Remove",
            code: "remove(track)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/",
            returns: "Object",
            parameters: [
                {name: "track", types: ["Track", "Object", "String"], optional: false, description: "Track Instance, track ID, or object with track ID to remove."},
            ],
        },
        size: {
            name: "Size",
            code: "size()",
            returns: "Number",
            parameters: [
            ],
        },
        indexOf: {
            name: "Index Of",
            code: "indexOf(track, start)",
            returns: "Number",
            parameters: [
                {name: "track", types: ["Track", "Object", "String"], optional: false, description: "Track Instance, track ID, or object with track ID to remove."},
                {name: "start", types: ["Number"], optional: true, description: "Index to start searching from."},
            ],
        },
        includes: {
            name: "Includes",
            code: "includes(track)",
            returns: "Boolean",
            parameters: [
                {name: "track", types: ["Track", "Object", "String"], optional: false, description: "Track Instance, track ID, or object with track ID to remove."},
            ],
        },
        get: {
            name: "Get",
            code: "get(index)",
            returns: "Track",
            parameters: [
                {name: "index", types: ["Number"], optional: false, description: "Index of the item desired."},
            ],
        },
        getIDs: {
            name: "Get IDs",
            code: "getIDs()",
            returns: "Array",
            parameters: [
            ],
        },
        getIDsNoRepeats: {
            name: "Get IDs with No Repeats",
            code: "getIDsNoRepeats()",
            returns: "Array",
            parameters: [
            ],
        },
        getURIs: {
            name: "Get URIs",
            code: "getURIs()",
            returns: "Array",
            parameters: [
            ],
        },
        getURIsNoRepeats: {
            name: "Get URIs with No Repeats",
            code: "getURIsNoRepeats()",
            returns: "Array",
            parameters: [
            ],
        },
        reverse: {
            name: "Reverse",
            code: "reverse()",
            returns: "Object",
            parameters: [
            ],
        },
        filter: {
            name: "Filter",
            code: "filter(method, thisArg)",
            returns: "Object",
            parameters: [
                {name: "method", types: ["Function"], optional: false, description: "Method to filter by. Parameters element[, index, [array]])"},
                {name: "thisArg", types: ["Object"], optional: true, description: "Value to use as this when executing callback."}
            ],
        },
        sort: {
            name: "Sort",
            code: "sort(compareFunction)",
            returns: "Object",
            parameters: [
                {name: "compareFunction", types: ["Function"], optional: false, description: "Sorting method. Takes two elements and returns integer."}
            ],
        },
        pop: {
            name: "Pop",
            code: "pop()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/",
            returns: "Track",
            parameters: [
            ],
        },
        shift: {
            name: "Shift",
            code: "shift()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/",
            returns: "Track",
            parameters: [
            ],
        },
        addTracks: {
            name: "Add Tracks",
            code: "addTracks(tracks, options)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/",
            parameters: [
                {name: "tracks", types: ["Tracks", "Array", "Track", "Object", "String"], optional: false, description: "Tracks instance, Array, Track Instance, track ID, or object with track ID to add."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "position", types: ["Number"], description: "Position to insert the tracks (0 based index)", default: "Append"},
            ],
        },
        replaceTracks: {
            name: "Replace Tracks",
            code: "replaceTracks(tracks)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/replace-playlists-tracks/",
            parameters: [
                {name: "tracks", types: ["Tracks", "Array", "Track", "Object", "String"], optional: false, description: "Tracks instance, Array, Track Instance, track ID, or object with track ID to add."},
            ],
        },
        reorderTracks: {
            name: "Re-Order Tracks",
            code: "reorderTracks(range_start, insert_before, options)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/reorder-playlists-tracks/",
            parameters: [
                {name: "range_start", types: ["Number"], optional: false, description: "Where to select."},
                {name: "insert_before", types: ["Number"], optional: false, description: "Where to place."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "range_length", types: ["Number"], description: "The amount of tracks to be reordered.", default: "1"},
            ],
        },
        removeTracks: {
            name: "Remove Tracks",
            code: "removeTracks(tracks)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/",
            returns: "Object",
            parameters: [
                {name: "tracks", types: ["Tracks", "Array", "Track", "Object", "String"], optional: false, description: "Tracks instance, Array, Track Instance, track ID, or object with track ID to add."},
            ],
        },
        removeTrackIndexes: {
            name: "Remove Tracks by Indexes",
            code: "removeTrackIndexes(positions)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/",
            returns: "Object",
            parameters: [
                {name: "positions", types: ["Array"], optional: false, description: "Indexes to be removed."},
            ],
        },
        uploadCoverImage: {
            name: "Upload Cover Image",
            code: "uploadCoverImage(imageData)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/upload-custom-playlist-cover/",
            returns: "Object",
            parameters: [
                {name: "imageData", types: ["String"], optional: false, description: "New image. Base64 encoded JPEG image data, maximum payload size is 256 KB."},
            ],
        },
        retrieveFullObject: {
            name: "Retrieve Full Object",
            code: "retrieveFullObject()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/",
            returns: "void",
            parameters: [
            ],
        },
        retrieveTracks: {
            name: "Retrieve Tracks",
            code: "retrieveTracks()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/",
            returns: "void",
            parameters: [
            ],
        },
        loadFullObject: {
            name: "Load Full Object",
            code: "loadFullObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with playlist full object data."},
            ],
        },
        loadSimplifiedObject: {
            name: "Load Simplified Object",
            code: "loadSimplifiedObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with playlist simplified object data."},
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
        loadConditionally: {
            name: "Load Conditionally",
            code: "loadConditionally(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with any playlist data."},
            ],
        },
        getPlaylist: {
            name: "Get Playlist",
            code: "Playlist.getPlaylist(playlistID)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/",
            returns: "Playlist",
            parameters: [
                {name: "playlistID", types: ["String"], optional: false, description: "Playlist Spotify ID."},
            ],
        },
        create: {
            name: "Create Playlist",
            code: "Playlist.create(name, options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/",
            returns: "Playlist",
            parameters: [
                {name: "name", types: ["String"], optional: false, description: "Name of new playlist."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "description", types: ["String"], description: "Description for playlist.", default: "Empty"},
                {name: "public", types: ["Boolean"], description: "Public status of playlist.", default: "true"},
                {name: "collaborative", types: ["Boolean"], description: "Collaborative status of playlist.", default: "false"},
            ],
        },
    }),
}
</script>