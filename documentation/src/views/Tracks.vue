<template>
    <div class="Tracks">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Tracks Container</h1>
            <p>The <span class="highlight">Tracks</span> container class is used to retrieve and maintain data from Spotify's API on a list of tracks.</p>
            <p>Containers act like array's but use bulk requests when possible to retreive data for greater effeciency.</p>

            <DataObject :properties="properties">
                <div slot="usage-toc">
                    <ul>
                        <li class="subtitle-1">Importing</li>
                        <li class="subtitle-1">Creating New Instances</li>
                        <li class="subtitle-1">Working with Instances</li>
                    </ul>
                </div>
                <div slot="usage-content">
                    <h3 class="display-1" style="margin-top: 12px">Importing</h3>
                    <p>You can either import the whole library:
                    <highlight-code lang="javascript"><pre>
                   var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
                    var Tracks = EnhancedSpotifyAPI.Tracks;
                    </pre></highlight-code>
                    <p>Or just the Tracks class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Tracks } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Tracks.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>When creating a <span class="highlight">Tracks</span> container instance, you can either leave it empty or load in tracks. You have the choice of using Spotify's requests to load in data, or directly through IDs.</p>
                    <h2 class="headline" style="margin-top: 32px !important;">Initializing Empty</h2>
                    <highlight-code lang="javascript"><pre>
                    var myTracks = new Tracks();
                    </pre></highlight-code>
                    <h2 class="headline" style="margin-top: 32px !important;">Static Methods</h2>
                    <p>There are several static methods which function exactly like Spotify's requests, but return <span class="highlight">Tracks</span> instances with the response.</p>
                    <highlight-code lang="javascript"><pre>
                    // Tracks instance with search results.
                    var searchResults = await Tracks.search( 'The Heavy' );
                    // Tracks instance with recommendation results.
                    var recommendations = await Tracks.getRecommendations( { seed_artists: '0bZCak2tcRMY1dzEIuwF42' } );
                    // Tracks instance with my top played tracks.
                    var topPlayed = await Tracks.getMyTopTracks();
                    // Tracks instance with my saved tracks.
                    var savedTracks = await Tracks.getMySavedTracks();
                    // Tracks instance with all my saved tracks.
                    var allSavedTracks = await Tracks.getAllMySavedTracks();
                    // Tracks instance with all tracks from playlist
                    var playlistTracks = await Tracks.getPlaylistTracks( '6Ibg2aBUp5NP0lAujEGa6p' );
                    // Tracks instance with all tracks from album
                    var albumTracks = await Tracks.getAlbumTracks( '0sKcuounq52lm9hmFwEZN5' );
                    // Tracks instance with artist's top tracks.
                    var artistTop = await Tracks.getAlbumTracks( '0bZCak2tcRMY1dzEIuwF42' );
                    // Tracks instance with my recently played.
                    var recentPlayed = await Tracks.getMyRecentlyPlayedTracks();
                    </pre></highlight-code>
                    
                    <h2 class="headline" style="margin-top: 32px !important;">Initializing with Multiple Tracks</h2>
                    <highlight-code lang="javascript"><pre>
                    var trackIDs = [ '0bZCak2tcRMY1dzEIuwF42', '74Csq5DMaOBShLUhI6NU5A', '50M2QjfSM82wkJ1d0iV4mh' ];
                    var myTracks = new Tracks( trackIDs );
                    </pre></highlight-code>
                    <highlight-code lang="javascript"><pre>
                    var trackObjects = [ { id: '0bZCak2tcRMY1dzEIuwF42' }, { id: '74Csq5DMaOBShLUhI6NU5A' }, { id: '50M2QjfSM82wkJ1d0iV4mh' } ];
                    var myTracks = new Tracks( trackObjects );
                    </pre></highlight-code>
                    <highlight-code lang="javascript"><pre>
                    var tracks = [ new Track( '0bZCak2tcRMY1dzEIuwF42' ), new Track( '74Csq5DMaOBShLUhI6NU5A' ), new Track( '50M2QjfSM82wkJ1d0iV4mh' ) ];
                    var myTracks = new Tracks( tracks );
                    </pre></highlight-code>
                    <h2 class="headline" style="margin-top: 32px !important;">Initializing with a Single Track</h2>
                    <highlight-code lang="javascript"><pre>
                    var trackID = '0bZCak2tcRMY1dzEIuwF42';
                    var myTracks = new Tracks( trackID );
                    </pre></highlight-code>
                    <highlight-code lang="javascript"><pre>
                    var trackObject = { id: '0bZCak2tcRMY1dzEIuwF42' };
                    var myTracks = new Tracks( trackObject );
                    </pre></highlight-code>
                    <highlight-code lang="javascript"><pre>
                    var track = new Track( '0bZCak2tcRMY1dzEIuwF42' );
                    var myTracks = new Tracks( track );
                    </pre></highlight-code>
                    
                    <v-divider style="margin: 40px 0px;"></v-divider>
                     <h2 class="display-1">Working with Instances</h2>
                    <p>Once you have an Tracks instance, you can work with any of its member functions!</p>
                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myTracks = new Tracks( trackIDs );

                    await myTracks.play();

                    var audioFeatures = await myTracks.getAudioFeatureAverages();
                    console.log( "The average energy is:", (audioFeatures.energy * 100 ), '%');

                    var artists = await myTracks.getArtists();
                    console.log( "Artists:", await artists.getFullObjects.map(artist => artist.name).join(', ') );
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>

                </div>
                <div slot="methods-content">
                    <v-expansion-panels accordion multiple>
                        <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> container class.</p>
                                <p>The new instance will represent a group of tracks for all subsequent member functions called.</p>
                                <p>You can add tracks when creating a new <span class="highlight">Tracks</span> instance, or add them in later.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var trackIDs = [ '0bZCak2tcRMY1dzEIuwF42', '74Csq5DMaOBShLUhI6NU5A', '50M2QjfSM82wkJ1d0iV4mh' ];
                                var myTracks = new Tracks( trackIDs );
                                </pre></highlight-code>
                                <highlight-code lang="javascript"><pre>
                                var trackObjects = [ { id: '0bZCak2tcRMY1dzEIuwF42' }, { id: '74Csq5DMaOBShLUhI6NU5A' }, { id: '50M2QjfSM82wkJ1d0iV4mh' } ];
                                var myTracks = new Tracks( trackObjects );
                                </pre></highlight-code>
                                <highlight-code lang="javascript"><pre>
                                var myTracks = new Tracks();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            function Tracks(items) {
                                try {
                                    this.name = 'Tracks';
                                    this.type = 'Track';
                                    this.uri_type = 'track';
                                    Models.Container.call(this, items);
                                } catch (error) {
                                    throw error;
                                }
                            }
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getTracks.docs" :staticMethod="true" :options="getTracks.options" :name="getTracks.name" :code="getTracks.code" :returns="getTracks.returns" :parameters="getTracks.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/">Get Several Tracks</a>, except it returns an instance of the Tracks class.</p>
                                <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrieveFullObjects</span>.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var myTracks = await Tracks.getTracks( [ '0bZCak2tcRMY1dzEIuwF42', '74Csq5DMaOBShLUhI6NU5A', '50M2QjfSM82wkJ1d0iV4mh' ] );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getTracks = async function(trackIds) {
                                try {
                                    let tracks = new Models.Tracks(trackIds);
                                    await tracks.retrieveFullObjects();
                                    return tracks;
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="search.docs" :staticMethod="true" :options="search.options" :name="search.name" :code="search.code" :returns="search.returns" :parameters="search.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/search/search/">Search for an Item</a>, except it returns an instance of the Tracks class.</p>
                                <p>The search requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Objects (Full)</a> who's data will be preloaded.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var searchResults = await Tracks.search('Can I Change My Mind');
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.search = async function(query, options) {
                                try {
                                    if (options != null && typeof(options) != 'object') {
                                        throw new Error("Tracks.search: Invalid Parameter \"options\"");
                                    }
                                    let response = await Models.wrapperInstance.searchTracks(query, options ? options : {});
                                    return new Models.Tracks(response.body.tracks.items);
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getMyTopTracks.docs" :staticMethod="true" :options="getMyTopTracks.options" :name="getMyTopTracks.name" :code="getMyTopTracks.code" :returns="getMyTopTracks.returns" :parameters="getMyTopTracks.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/">Get a User's Top Artists and Tracks</a>, except it returns an instance of the Tracks class.</p>
                                <p>The recommend requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Objects (Full)</a> who's data will be preloaded.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var topTracks = await Tracks.getMyTopTracks();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getMyTopTracks = async function(options) {
                                try {
                                    if (options != null && typeof(options) != 'object') {
                                        throw new Error("Tracks.getMyTopTracks: Invalid Parameter \"options\"");
                                    }
                                    let response = await Models.wrapperInstance.getMyTopTracks(options ? options : {});
                                    return new Models.Tracks(response.body.items);
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getMySavedTracks.docs" :staticMethod="true" :options="getMySavedTracks.options" :name="getMySavedTracks.name" :code="getMySavedTracks.code" :returns="getMySavedTracks.returns" :parameters="getMySavedTracks.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/">Get a User's Saved Tracks</a>, except it returns an instance of the Tracks class.</p>
                                <p>The recommend requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Objects (Full)</a> who's data will be preloaded.</p>
                                <p>The request also provides an additional field, <span class="highlight">added_at</span> which will be loaded and accessable via property accessors (dot or bracket notation).</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var savedTracks = await Tracks.getMySavedTracks( { limit: 10 } );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getMySavedTracks = async function(options) {
                                try {
                                    if (options != null && typeof(options) != 'object') {
                                        throw new Error("Tracks.getMySavedTracks: Invalid Parameter \"options\"");
                                    }
                                    let response = await Models.wrapperInstance.getMySavedTracks(options ? options : {});
                                    return new Models.Tracks(response.body.items);
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAllMySavedTracks.docs" :staticMethod="true" :options="getAllMySavedTracks.options" :name="getAllMySavedTracks.name" :code="getAllMySavedTracks.code" :returns="getAllMySavedTracks.returns" :parameters="getAllMySavedTracks.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/">Get a User's Saved Tracks</a>, except it returns an instance of the Tracks class.</p>
                                <p>The recommend requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Objects (Full)</a> who's data will be preloaded.</p>
                                <p>The request also provides an additional field, <span class="highlight">added_at</span> which will be loaded and accessable via property accessors (dot or bracket notation).</p>
                                <p>This method retrieves all the user's saved tracks with as many requests as it takes (Limited to 50 tracks per request by Spotify).</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var savedTracks = await Tracks.getAllMySavedTracks();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getAllMySavedTracks = async function() {
                                try {
                                    let _options = { limit: 50, offset: 0 };
                                    let tracks = new Models.Tracks();
                                    let response;
                                    do {
                                        response = await Models.wrapperInstance.getMySavedTracks(_options);
                                        await tracks.concat(response.body.items);
                                        _options.offset += 50;
                                    } while (!(response.items.length &lt; 50));
                                    return tracks;
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getMyRecentlyPlayedTracks.docs" :staticMethod="true" :options="getMyRecentlyPlayedTracks.options" :name="getMyRecentlyPlayedTracks.name" :code="getMyRecentlyPlayedTracks.code" :returns="getMyRecentlyPlayedTracks.returns" :parameters="getMyRecentlyPlayedTracks.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/">Get Current User's Recently Played Tracks</a>, except it returns an instance of the Tracks class.</p>
                                <p>The recommend requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-simplified">Track Objects (Simplified)</a> who's data will be preloaded.</p>
                                <p>The request also provides to additional fields, <span class="highlight">played_at</span>, and <span class="highlight">context</span>. Which will be loaded and accessable via property accessors (dot or bracket notation).</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var recentlyPlayed = await Tracks.getMyRecentlyPlayedTracks();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getMyRecentlyPlayedTracks = async function(options) {
                                try {
                                    if (options != null && typeof(options) != 'object') {
                                        throw new Error("Tracks.getMyRecentlyPlayedTracks: Invalid Parameter \"options\"");
                                    }
                                    let response = await Models.wrapperInstance.getMyRecentlyPlayedTracks(options ? options : {});
                                    return new Models.Tracks(response.body.items);
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getRecommendationsStatic.docs" :staticMethod="true" :options="getRecommendationsStatic.options" :name="getRecommendationsStatic.name" :code="getRecommendationsStatic.code" :returns="getRecommendationsStatic.returns" :parameters="getRecommendationsStatic.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/">Get Recommendations</a>, except it returns an instance of the Tracks class.</p>
                                <p>The recommend requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-simplified">Track Objects (Simplified)</a> who's data will be preloaded.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var options = { seed_tracks: '0bZCak2tcRMY1dzEIuwF42', target_energy: .6 };
                                var recommendations = await Tracks.getRecommendations( options );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getRecommendations = async function(options) {
                                try {
                                    if (options == null || typeof(options) != 'object') {
                                        throw new Error("Tracks.getRecommendations: Invalid Parameter \"options\"");
                                    }
                                    let response = await Models.wrapperInstance.getRecommendations(options ? options : {});
                                    return new Models.Tracks(response.body.tracks);
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getPlaylistTracks.docs" :staticMethod="true" :options="getPlaylistTracks.options" :name="getPlaylistTracks.name" :code="getPlaylistTracks.code" :returns="getPlaylistTracks.returns" :parameters="getPlaylistTracks.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/">Get a Playlist's Items</a>, except it returns an instance of the Tracks class.</p>
                                <p>The recommend requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Objects (Full)</a> who's data will be preloaded.</p>
                                <p>The request also provides an additional field, <span class="highlight">added_at</span>, <span class="highlight">added_by</span>, and <span class="highlight">is_local</span> which will be loaded and accessable via property accessors (dot or bracket notation).</p>
                                <p>This method retrieves all the playlist's tracks with as many requests as it takes (Limited to 100 tracks per request by Spotify).</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var playlistTracks = await Tracks.getPlaylistTracks( '6Ibg2aBUp5NP0lAujEGa6p' );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getPlaylistTracks = async function(id) {
                                try {
                                    let playlist = new Models.Playlist(id);
                                    return await playlist.getTracks();
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAlbumTracks.docs" :staticMethod="true" :options="getAlbumTracks.options" :name="getAlbumTracks.name" :code="getAlbumTracks.code" :returns="getAlbumTracks.returns" :parameters="getAlbumTracks.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/">Get an Album's Items</a>, except it returns an instance of the Tracks class.</p>
                                <p>The recommend requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-simplified">Track Objects (Simplified)</a> who's data will be preloaded.</p>
                                <p>This method retrieves all the album's tracks with as many requests as it takes (Limited to 50 tracks per request by Spotify).</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getAlbumTracks = async function(id) {
                                try {
                                    let album = new Models.Album(id);
                                    return await album.getTracks();
                                } catch (error) {
                                    throw error;
                                }
                            };
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getArtistTopTracks.docs" :staticMethod="true" :options="getArtistTopTracks.options" :name="getArtistTopTracks.name" :code="getArtistTopTracks.code" :returns="getArtistTopTracks.returns" :parameters="getArtistTopTracks.parameters"> 
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Tracks</span> class.</p>
                                <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/">Get an Artist's Top Tracks</a>, except it returns an instance of the Tracks class.</p>
                                <p>The recommend requests returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Objects (Full)</a> who's data will be preloaded.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var artistTop = await Tracks.getArtistTopTracks( '0augulkuXFx1qPfb590w2C' );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">
                            Tracks.getArtistTopTracks = async function(id) {
                                try {
                                    let artist = new Models.Artist(id);
                                    return await artist.getTopTracks();
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
                                <p>Plays tracks on user's current playback device.</p>
                                <p>Returns the response from the request.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var savedTracks = await Tracks.getMySavedTracks( { limit: 10 } );
                                var response = await savedTracks.play();
                                </pre></highlight-code>
                                <highlight-code lang="javascript"><pre>
                                // Play the second track
                                var savedTracks = await Tracks.getMySavedTracks( { limit: 10 } );
                                var response = await savedTracks.play( { offset: { position: 1 } } );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object} Response from Request
                            </pre>
                            <pre slot="src">
                            play: async function(options) {
                                try {
                                    if (options != null && typeof(options) != 'object') {
                                        throw new Error("Tracks.search: Invalid Parameter \"options\"");
                                    }
                                    let _options = options ? options : {};
                                    _options.uris = [];
                                    let offset = 0;
                                    if (offset.hasOwnProperty('offset')) {
                                        if (offset.hasOwnProperty('position')) {
                                            offset = options.offset.position;
                                        } else if (offset.hasOwnProperty('uri') && typeof(offset.uri) == 'string') {
                                            let index = this.order.indexOf(options.offset.uri);
                                            if (index != -1) {
                                                offset = this.order.indexOf(options.offset.uri);
                                            }
                                        }
                                    }
                                    for (let i = 0; i &lt; this.order.length && i &lt; 25; i++) {
                                        _options.uris.push('spotify:track:' + this.order[(i + offset) % this.order.length]);
                                    }
                                    return await Models.wrapperInstance.play(_options);
                                } catch (error) {
                                    console.log(error);
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Library</v-subheader>
                        </v-row>
                        <MethodListItem :docs="areLiked.docs" :options="areLiked.options" :name="areLiked.name" :code="areLiked.code" :returns="areLiked.returns" :parameters="areLiked.parameters">
                            <div slot="overview">
                                <p>Returns array of <span class="highlight">Boolean</span> whether or not tracks are saved to current User's library.</p>
                                <p>Each boolean cooresponds by index to the tracks in the container.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                var savedStatus = await albumTracks.areLiked();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Array}
                                [ true | false ]
                            </pre>
                            <pre slot="src">
                            areLiked: async function() {
                                try {
                                    let response = await Models.wrapperInstance.containsMySavedTracks(this.order);
                                    return response.body;
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="likeAll.docs" :options="likeAll.options" :name="likeAll.name" :code="likeAll.code" :returns="likeAll.returns" :parameters="likeAll.parameters">
                            <div slot="overview">
                                <p>Saves all tracks to current User's library.</p>
                                <p>Returns the response from the request.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                var response = await albumTracks.likeAll();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object} Response from Request
                            </pre>
                            <pre slot="src">
                            likeAll: async function() {
                                try {
                                    return await Models.wrapperInstance.addToMySavedTracks(Object.keys(this.items));
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="unlikeAll.docs" :options="unlikeAll.options" :name="unlikeAll.name" :code="unlikeAll.code" :returns="unlikeAll.returns" :parameters="unlikeAll.parameters">
                            <div slot="overview">
                                <p>Removes all tracks from current User's library.</p>
                                <p>Returns the response from the request.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                var response = await albumTracks.unlikeAll();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object} Response from Request
                            </pre>
                            <pre slot="src">
                            unlikeAll: async function() {
                                try {
                                    return await Models.wrapperInstance.removeFromMySavedTracks(Object.keys(this.items));
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Data</v-subheader>
                        </v-row>
                        <MethodListItem :docs="getFullObjects.docs" :options="getFullObjects.options" :name="getFullObjects.name" :code="getFullObjects.code" :returns="getFullObjects.returns" :parameters="getFullObjects.parameters">
                            <div slot="overview">
                                <p>Returns an array of <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Objects (Full)</a>. Retrieves from Spotify API if necessary.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getFullObjects() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Array}
                                [
                                    { // Full Objects
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
                                    },
                                    ...
                                ]
                            </pre>
                            <pre slot="src">
                            getFullObjects: async function() {
                                try {
                                    await this.retrieveFullObjects('full');
                                    let result = [];
                                    for (let i = 0; i &lt; this.order.length; i++) {
                                        await result.push(await this.items[this.order[i]].getFullObject());
                                    }
                                    return result;
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getSimplifiedObjects.docs" :options="getSimplifiedObjects.options" :name="getSimplifiedObjects.name" :code="getSimplifiedObjects.code" :returns="getSimplifiedObjects.returns" :parameters="getSimplifiedObjects.parameters">
                            <div slot="overview">
                                <p>Returns an array of <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-simplified">Track Objects (Simplified)</a>. Retrieves from Spotify API if necessary.</p>                    
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getSimplifiedObjects() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Array}
                                [
                                    { // Simplified Objects
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
                                    },
                                    ...
                                ]
                            </pre>
                            <pre slot="src">
                            getSimplifiedObjects: async function() {
                                try {
                                    await this.retrieveFullObjects('simplified');
                                    let result = [];
                                    for (let i = 0; i &lt; this.order.length; i++) {
                                        await result.push(await this.items[this.order[i]].getSimplifiedObject());
                                    }
                                    return result;
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getLinkObjects.docs" :options="getLinkObjects.options" :name="getLinkObjects.name" :code="getLinkObjects.code" :returns="getLinkObjects.returns" :parameters="getLinkObjects.parameters">
                            <div slot="overview">
                                <p>Returns an array of <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-link">Track Links</a>. Retrieves from Spotify API if necessary.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getLinkObjects() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Array}
                                [
                                    { // Link Objects
                                        id: String,
                                        external_urls: Object,
                                        href: String,
                                        uri: String,
                                        type: String
                                    },
                                    ...
                                ]
                            </pre>
                            <pre slot="src">
                            getLinkObjects: async function() {
                                try {
                                    await this.retrieveFullObjects('link');
                                    let result = [];
                                    for (let i = 0; i &lt; this.order.length; i++) {
                                        await result.push(await this.items[this.order[i]].getLinkObject());
                                    }
                                    return result;
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAudioFeatures.docs" :options="getAudioFeatures.options" :name="getAudioFeatures.name" :code="getAudioFeatures.code" :returns="getAudioFeatures.returns" :parameters="getAudioFeatures.parameters">
                            <div slot="overview">
                                <p>Returns an array of track <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature Objects</a>. Retrieves from Spotify API if necessary.</p>
                                <p>Track Audio Features include numerical values for happiness (valence), danceability, energy, tempo and more!</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getAudioFeatures() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Array}
                                [
                                    { // Audio Feature Object
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
                                    },
                                    ...
                                ]
                            </pre>
                            <pre slot="src">
                            getAudioFeatures: async function() {
                                try {
                                    await this.retrieveAudioFeatures();
                                    let result = [];
                                    for (let i = 0; i &lt; this.order.length; i++) {
                                        await result.push(await this.items[this.order[i]].getAudioFeatures());
                                    }
                                    return result;
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAudioFeatureAverages.docs" :options="getAudioFeatureAverages.options" :name="getAudioFeatureAverages.name" :code="getAudioFeatureAverages.code" :returns="getAudioFeatureAverages.returns" :parameters="getAudioFeatureAverages.parameters">
                            <div slot="overview">
                                <p>Returns an array of track <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/#audio-analysis-object">Audio Analysis Objects</a>. Retrieves from Spotify API if necessary.</p>
                                <p>Returns a low-level audio analysis of the track's audio.</p>                    
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getAudioFeatureAverages() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object} 
                                {
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
                                }
                            </pre>
                            <pre slot="src">

                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAudioFeatureDistributions.docs" :options="getAudioFeatureDistributions.options" :name="getAudioFeatureDistributions.name" :code="getAudioFeatureDistributions.code" :returns="getAudioFeatureDistributions.returns" :parameters="getAudioFeatureDistributions.parameters">
                            <div slot="overview">
                        
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getAudioFeatureDistributions() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object} 
                                {
                                    acousticness: Array,
                                    danceability: Array,
                                    energy: Array,
                                    instrumentalness: Array,
                                    liveness: Array,
                                    loudness: Array,
                                    speechiness: Array,
                                    valence: Array,
                                    tempo: Array,
                                }
                            </pre>
                            <pre slot="src">

                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAudioAnalyses.docs" :options="getAudioAnalyses.options" :name="getAudioAnalyses.name" :code="getAudioAnalyses.code" :returns="getAudioAnalyses.returns" :parameters="getAudioAnalyses.parameters">
                            <div slot="overview">
                        
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getAudioAnalyses() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Array}
                                [
                                    { // Audio Analysis Object
                                        id: String,
                                        bars: Array,
                                        beats: Array,
                                        sections: Array,
                                        segments: Array,
                                        tatums: Array,
                                        track: Object
                                    },
                                    ...
                                ]
                            </pre>
                            <pre slot="src">
                            getAudioAnalyses: async function() {
                                try {
                                    let result = [];
                                    for (let i = 0; i &lt; this.order.length; i++) {
                                        await result.push(await this.items[this.order[i]].getAudioAnalysis());
                                    }
                                    return result;
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAllData.docs" :options="getAllData.options" :name="getAllData.name" :code="getAllData.code" :returns="getAllData.returns" :parameters="getAllData.parameters">
                            <div slot="overview">
                                <p> Returns an array of objects containing all data from track <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Object (Full)</a>, <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature Object</a>, and <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/#audio-analysis-object">Audio Analysis Object</a>.</p>
                                <p>Big whooping combo of all three.</p>
                                <p>Retrieves from Spotify API if necessary (probably will be).</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getAllData() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @returns {Array}
                                [
                                    { // All Data Objects
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
                                    },
                                    ...
                                ]
                            </pre>
                            <pre slot="src">

                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getCurrentData.docs" :options="getCurrentData.options" :name="getCurrentData.name" :code="getCurrentData.code" :returns="getCurrentData.returns" :parameters="getCurrentData.parameters">
                            <div slot="overview">
                                <p>Not looking to waste more time with another request?</p>
                                <p>Already know the data you need is present?</p>
                                <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the Tracks instance.</p>
                                <p>Returns an array of objects containing whatever data is currently held within the tracks.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var albumTracks = await Tracks.getAlbumTracks( '4YT7aZsiaWo3KBEVNpCzrE' );
                                console.log( await albumTracks.getCurrentData() );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Array}
                                [
                                    { // Current Data Objects
                                        // Varies
                                    },
                                    ...
                                ]
                            </pre>
                            <pre slot="src">

                            </pre>
                        </MethodListItem>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Related Data</v-subheader>
                        </v-row>
                        <MethodListItem :docs="getArtists.docs" :options="getArtists.options" :name="getArtists.name" :code="getArtists.code" :returns="getArtists.returns" :parameters="getArtists.parameters">
                            <div slot="overview">
                                <p>Returns <span class="highlight">Artists</span> container instance of all of the track's artists.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var savedTracks = await Tracks.getMySavedTracks();
                                var savedArtists = await savedTracks.getArtists();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Artists}
                            </pre>
                            <pre slot="src">

                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAlbums.docs" :options="getAlbums.options" :name="getAlbums.name" :code="getAlbums.code" :returns="getAlbums.returns" :parameters="getAlbums.parameters">
                            <div slot="overview">
                                <p>Returns <span class="highlight">Albums</span> instance of the track's albums.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var savedTracks = await Tracks.getMySavedTracks();
                                var savedAlbums = await savedTracks.getAlbums();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Albums}
                            </pre>
                            <pre slot="src">

                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getRecommendations.docs" :options="getRecommendations.options" :name="getRecommendations.name" :code="getRecommendations.code" :returns="getRecommendations.returns" :parameters="getRecommendations.parameters">
                            <div slot="overview">
                                <p>Returns <span class="highlight">Tracks</span> container instance with Spotify Recommendations based on random tracks from this instance.</p>
                                <p>Any other seeds passed in through the options parameter will be deleted.</p>
                                <p>If you want to pick your own seeds, visit the <a href="http://EnhancedSpotifyAPI.com/container/tracks">Tracks</a> container class static methods for full Recommendation Requests.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var savedTracks = await Tracks.getMySavedTracks();
                                var simularTracks = await savedTracks.getRecommendations();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Tracks}
                            </pre>
                            <pre slot="src">

                            </pre>
                        </MethodListItem>
                    </v-expansion-panels>
                        <ContainerMethods container="Tracks" contents="Track"/>
                    <v-expansion-panels accordion multiple>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Retrieve Data</v-subheader>
                        </v-row>
                        <MethodListItem :docs="retrieveFullObjects.docs" :options="retrieveFullObjects.options" :name="retrieveFullObjects.name" :code="retrieveFullObjects.code" :returns="retrieveFullObjects.returns" :parameters="retrieveFullObjects.parameters">
                            <div slot="overview">
                                <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full">Track Objects (Full)</a> for every track.</p>
                                <p>Checks if the data is present yet for each element.</p>
                                <p>This method retrieves all track objects with as many requests as it takes (Limited to 50 tracks per request by Spotify).</p>
                                <p>Used mostly as a helper function.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                
                                </pre></highlight-code>
                            </div>
                            <pre slot="src">
                            retrieveFullObjects: async function(objectType) {
                                try {
                                    let ids = [];
                                    for (let track in this.items) {
                                        if (objectType == 'simplified') {
                                            if (!(await this.items[track].containsSimplifiedObject())) {
                                                ids.push(track);
                                            }
                                        } else if (objectType == 'link') {
                                            if (!(await this.items[track].containsLinkObject())) {
                                                ids.push(track);
                                            }
                                        } else {
                                            if (!(await this.items[track].containsFullObject())) {
                                                ids.push(track);
                                            }
                                        }
                                    }
                                    if (ids.length) {
                                        let response;
                                        do {
                                            response = await Models.wrapperInstance.getTracks(ids.splice(0, 50));
                                            for (let i = 0; i &lt; response.body.tracks.length; i++) {
                                                if (response.body.tracks[i] == null) continue;
                                                this.items[response.body.tracks[i].id].loadFullObject(response.body.tracks[i]);
                                            }
                                        } while (ids.length > 0);
                                    }
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="retrieveAudioFeatures.docs" :options="retrieveAudioFeatures.options" :name="retrieveAudioFeatures.name" :code="retrieveAudioFeatures.code" :returns="retrieveAudioFeatures.returns" :parameters="retrieveAudioFeatures.parameters">
                            <div slot="overview">
                                <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#audio-features-object">Audio Feature Objects</a> for every track.</p>
                                <p>Checks if the data is present yet for each element.</p>
                                <p>This method retrieves all audio feature objects with as many requests as it takes (Limited to 100 tracks per request by Spotify).</p>
                                <p>Used mostly as a helper function.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                
                                </pre></highlight-code>
                            </div>
                            <pre slot="src">
                            retrieveAudioFeatures: async function() {
                                try {
                                    let ids = [];
                                    for (let track in this.items) {
                                        if (!(await this.items[track].containsAudioFeatures())) {
                                            ids.push(track);
                                        }
                                    }
                                    if (ids.length) {
                                        let response;
                                        do {
                                            response = await Models.wrapperInstance.getAudioFeaturesForTracks(ids.splice(0, 100));
                                            for (let i = 0; i &lt; response.body.tracks.length; i++) {
                                                if (response.body.tracks[i] == null) continue;
                                                this.items[response.body.tracks[i].id].loadAudioFeatures(response.body.tracks[i]);
                                            }
                                        } while (ids.length > 0);
                                    }
                                } catch (error) {
                                    throw error;
                                }
                            },
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="retrieveAudioAnalyses.docs" :options="retrieveAudioAnalyses.options" :name="retrieveAudioAnalyses.name" :code="retrieveAudioAnalyses.code" :returns="retrieveAudioAnalyses.returns" :parameters="retrieveAudioAnalyses.parameters">
                            <div slot="overview">
                                <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/">Audio Analeses</a> for every track.</p>
                                <p>Checks if the data is present yet for each element.</p>
                                <p>This method retrieves all audio analeses with as many requests as it takes (Limited to 1 tracks per request by Spotify).</p>
                                <p>Used mostly as a helper function.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                
                                </pre></highlight-code>
                            </div>
                            <pre slot="src">
                            retrieveAudioAnalyses: async function() {
                                try {
                                    for (let track in this.items) {
                                        if (!(await this.items[track].containsAudioAnalysis())) {
                                            response = await Models.wrapperInstance.getAudioAnalysisForTrack(track);
                                            this.items[track].loadAudioAnalysis(response.body);
                                        }
                                    }
                                } catch (error) {
                                    throw error;
                                }
                            }
                            </pre>
                        </MethodListItem>
                    </v-expansion-panels>
                </div>
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
import ContainerMethods from '@/components/ContainerMethods.vue'

export default {
    name: 'Tracks',
    components: {
        DataObject,
        MethodListItem,
        ContainerMethods,
    },
    data: () => ({
        path: [
            { text: 'Containers', disabled: true },
            { text: 'Tracks', disabled: true },
        ],
        properties: {
            instance: [
                {name: "name", type: "String", description: "Name of the container."},
                {name: "type", type: "String", description: "Name of the container's contents."},
                {name: "uri_type", type: "String", description: "URI type of container's contents."},
                {name: "items", type: "Object", description: "Track data."},
                {name: "order", type: "Array", description: "Array of track IDs to maintain order."},
                {name: "play", type: "Function", description: "Start's tracks on user's current playback."},
                {name: "areLiked", type: "Function", description: "Returns whether tracks are liked by the current user."},
                {name: "likeAll", type: "Function", description: "Likes the tracks."},
                {name: "unlikeAll", type: "Function", description: "Unlikes the tracks."},
                {name: "getFullObjects", type: "Function", description: "Returns an array of track full objects."},
                {name: "getSimplifiedObjects", type: "Function", description: "Returns an array of track simplified objects."},
                {name: "getLinkObjects", type: "Function", description: "Returns an array of track link objects."},
                {name: "getAudioFeatures", type: "Function", description: "Returns an array of audio feature objects."},
                {name: "getAudioAnalyses", type: "Function", description: "Returns an array of audio analysis data."},
                {name: "getAllData", type: "Function", description: "Returns an array of all track's data"},
                {name: "getCurrentData", type: "Function", description: "Returns an array of objects that contain all currently loaded data."},
                {name: "getArtists", type: "Function", description: "Returns an Artists container instance of all the track's artists."},
                {name: "getAlbums", type: "Function", description: "Returns an Albums container instance of all the track's albums."},
                {name: "getAudioFeatureAverages", type: "Function", description: "Returns an object of averages of each audio feature."},
                {name: "getAudioFeatureDistributions", type: "Function", description: "Returns an object with distribution arrays of each audio feature."},
                {name: "getRecommendations", type: "Function", description: "Returns a new Tracks instance of recommendations based on tracks."},
                {name: "retrieveFullObjects", type: "Function", description: "Retrieves tracks full object data."},
                {name: "retrieveAudioFeatures", type: "Function", description: "Retrieves tracks audio feature data."},
                {name: "retrieveAudioAnalyses", type: "Function", description: "Retrieves tracks audio analysis feature data."},
                {name: "push", type: "Function", description: "Adds new item to Container Object."},
                {name: "concat", type: "Function", description: "Adds new items to Container Object."},
                {name: "size", type: "Function", description: "Returns number of items in Container."},
                {name: "includes", type: "Function", description: "Returns boolean if item is contained."},
                {name: "indexOf", type: "Function", description: "Find index of an item"},
                {name: "get", type: "Function", description: "Returns item at a given index"},
                {name: "getIDs", type: "Function", description: "Returns array of IDs in order."},
                {name: "getIDsNoRepeats", type: "Function", description: "Returns array of IDs in order with no repeats."},
                {name: "getURIs", type: "Function", description: "Returns array of URIs in order."},
                {name: "getURIsNoRepeats", type: "Function", description: "Returns array of URIs with no repeats."},
                {name: "pop", type: "Function", description: "Removes last item."},
                {name: "shift", type: "Function", description: "Removes first item."},
                {name: "slice", type: "Function", description: "Removes a range of elements."},
                {name: "remove", type: "Function", description: "Removes an item from the Container Object."},
                {name: "removeIndexes", type: "Function", description: "Removes multiple items by index from the Container Object."},
                {name: "forEach", type: "Function", description: "Runs a function on each item."},
                {name: "filter", type: "Function", description: "Returns Items object with filtered items."},
                {name: "sort", type: "Function", description: "Sort items."},
                {name: "reverse", type: "Function", description: "Reverses order of items."},
                {name: "setProperty", type: "Function", description: "Adds property with value to a given item."},
            ],
            static: [
                {name: "Tracks.prototype", type: "Object", description: "Instance of Tracks"},
                {name: "Tracks.getTracks", type: "Function", description: "Returns Tracks instance of array of IDs"},
                {name: "Tracks.getMyTopTracks", type: "Function", description: "Returns Tracks instance of user's top tracks."},
                {name: "Tracks.getMySavedTracks", type: "Function", description: "Returns Tracks instance of user's saved tracks."},
                {name: "Tracks.getAllMySavedTracks", type: "Function", description: "Returns Tracks instance of all user's saved tracks."},
                {name: "Tracks.getMyRecentlyPlayedTracks", type: "Function", description: "Returns Tracks instance of user's recently played."},
                {name: "Tracks.getRecommendations", type: "Function", description: "Returns Tracks instance of recommendations."},
                {name: "Tracks.getPlaylistTracks", type: "Function", description: "Returns Tracks instance of playlist's tracks."},
                {name: "Tracks.getAlbumTracks", type: "Function", description: "Returns Tracks instance of album's tracks."},
                {name: "Tracks.getArtistTopTracks", type: "Function", description: "Returns Tracks instance of artist's top tracks."},
                {name: "Tracks.addMethods", type: "Function", description: "Adds methods to track prototype"},
                {name: "Tracks.override", type: "Function", description: "Overrides methods in track prototype"},
                {name: "Tracks.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Tracks.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},

            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Tracks(items)",
            returns: "Tracks",
            parameters: [
                {name: "items", types: ["Array", "Track", "Object", "String"], optional: true, description: "Data to be preloaded. Single or multiple tracks."},
            ],
        },
        play: {
            name: "Play Tracks",
            code: "play(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "offset", types: ["Object"], description: "Which track to start with.", default: "0"},
                {name: "offset.position", types: ["Number"], description: "Index of item to start playing within tracks.", default: "0"},
                {name: "offset.uri", types: ["String"], description: "URI of item to start playing within tracks.", default: "Undefined"},
                {name: "position_ms", types: ["Number"], description: "Position to start playback (Milliseconds).", default: "0"},
            ],
        },
        areLiked: {
            name: "Are Tracks Liked?",
            code: "areLiked()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-tracks/",
            returns: "Array",
            parameters: [
            ],
        },
        likeAll: {
            name: "Like Tracks",
            code: "likeAll()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/save-tracks-user/",
            returns: "Object",
            parameters: [
            ],
        },
        unlikeAll: {
            name: "Unlike Tracks",
            code: "unlikeAll()",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/remove-tracks-user/",
            parameters: [
            ],
        },
        getFullObjects: {
            name: "Get Full Objects",
            code: "getFullObjects()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/",
            returns: "Array",
            parameters: [
            ],
        },
        getSimplifiedObjects: {
            name: "Get Simplified Objects",
            code: "getSimplifiedObjects()",
            returns: "Array",
            parameters: [
            ],
        },
        getLinkObjects: {
            name: "Get Link Objects",
            code: "getLinkObjects()",
            returns: "Array",
            parameters: [
            ],
        },
        getAudioFeatures: {
            name: "Get Audio Features",
            code: "getAudioFeatures()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/",
            returns: "Array",
            parameters: [
            ],
        },
        getAudioAnalyses: {
            name: "Get Audio Analyses",
            code: "getAudioAnalyses()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/",
            returns: "Array",
            parameters: [
            ],
        },
        getAllData: {
            name: "Get All Data",
            code: "getAllData()",
            returns: "Array",
            parameters: [
            ],
        },
        getCurrentData: {
            name: "Get Current Data",
            code: "getCurrentData()",
            returns: "Array",
            parameters: [],
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
        getAudioFeatureAverages: {
            name: "Get Audio Feature Averages",
            code: "getAudioFeatureAverages()",
            returns: "Object",
            parameters: [
            ],
        },
        getAudioFeatureDistributions: {
            name: "Get Audio Feature Distributions",
            code: "getAudioFeatureDistributions(size)",
            returns: "Object",
            parameters: [
                {name: "size", types: ["Number"], optional: false, description: "Size of distributions."},
            ],
        },
        getRecommendations: {
            name: "Get Recommendations",
            code: "getRecommendations(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/",
            returns: "Tracks",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
        },
        retrieveFullObjects: {
            name: "Retrieve Full Objects",
            code: "retrieveFullObjects()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/",
            returns: "void",
            parameters: [
            ],
        },
        retrieveAudioFeatures: {
            name: "Retrieve Audio Features",
            code: "retrieveAudioFeatures()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/",
            returns: "void",
            parameters: [
            ],
        },
        retrieveAudioAnalyses: {
            name: "Retrieve Audio Analyses",
            code: "retrieveAudioAnalyses()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/",
            returns: "void",
            parameters: [
            ],
        },
        search: {
            name: "Search for Tracks",
            code: "Tracks.search(query, options)",
            returns: "Tracks",
            parameters: [
                {name: "query", types: ["String"], optional: false, description: "ID of item to alter."},
                {name: "options", types: ["Object"], optional: true, description: "Additional Options."},
            ],
            options: [

            ],
        },
        getRecommendationsStatic: {
            name: "Get Recommendations",
            code: "Tracks.getRecommendations(options)",
            returns: "Tracks",
            parameters: [
                {name: "options", types: ["Object"], optional: false, description: "Request Options."},
            ],
        },
        getMyTopTracks: {
            name: "Get My Top Played Tracks",
            code: "Tracks.getMyTopTracks(options)",
            returns: "Tracks",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional Options."},
            ],
        },
        getMySavedTracks: {
            name: "Get My Saved Tracks",
            code: "Tracks.getMySavedTracks(options)",
            returns: "Tracks",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional Options."},
            ],
        },
        getAllMySavedTracks: {
            name: "Get All My Saved Tracks",
            code: "Tracks.getAllMySavedTracks()",
            returns: "Tracks",
            parameters: [],
        },
        getPlaylistTracks: {
            name: "Get Playlist Tracks",
            code: "Tracks.getPlaylistTracks(playlistID)",
            returns: "Tracks",
            parameters: [
                {name: "playlistID", types: ["String"], optional: false, description: "ID of Playlist."},
            ],
        },
        getAlbumTracks: {
            name: "Get Album Tracks",
            code: "Tracks.getAlbumTracks(albumID)",
            returns: "Tracks",
            parameters: [
                {name: "playlistID", types: ["String"], optional: false, description: "ID of Album."},
            ],
        },
        getTracks: {
            name: "Get Tracks",
            code: "Tracks.getTracks(trackIDs)",
            returns: "Tracks",
            parameters: [
                {name: "trackIDs", types: ["Array"], optional: false, description: "Array of Track IDs."},
            ],
        },
        getArtistTopTracks: {
            name: "Get Artist Top Tracks",
            code: "Tracks.getArtistTopTracks(artistID)",
            returns: "Tracks",
            parameters: [
                {name: "artistID", types: ["String"], optional: false, description: "ID of Artist."},
            ],
        },
        getMyRecentlyPlayedTracks: {
            name: "Get My Recently Played Tracks",
            code: "Tracks.getMyRecentlyPlayedTracks(options)",
            returns: "Tracks",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional Options."},
            ],
        },
    }),
}
</script>