<template>
    <div class="Playback page-content">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div style="padding-left: 24px">
            <h1 class="display-1">Playback Class</h1>
            <p>The <span class="highlight">Playback</span> class is used to maintain and retrieve data from Spotify's API for the current users playback.</p>
            <p>Because of the constantly changing state of the user's playback, these endpoints are available as a set of <span class="highlight">static methods</span>.</p>
            <DataObject :properties="properties">
                <div slot="usage-toc">
                    <ul>
                        <li class="subtitle-1">Importing</li>
                        <li class="subtitle-1">Working with the Class</li>
                    </ul>
                </div>
                <div slot="usage-content">
                    <h3 class="display-1" style="margin-top: 12px">Importing</h3>
                    <p>You can either import the whole library:
                    <highlight-code lang="javascript"><pre>
                   var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
                    var Playback = EnhancedSpotifyAPI.Playback;
                    </pre></highlight-code>
                    <p>Or just the Playback class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Playback } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Playback.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                     <h2 class="display-1">Working with the Class</h2>
                    <p>Once you have the Playback class, you can work with any of its static functions!</p>

                    <highlight-code lang="javascript"><pre>
                    var state = await Playback.getCurrentPlaybackState();

                    if ( state.is_playing ) {
                        console.log( "Currently playing:", state.item.name );

                        await Playback.setShuffle( true );

                        await Playback.skipToNext();
                        
                        await Playback.setVolume( 100 );

                        var playing = await Playback.getCurrentlyPlayingTrackOrEpisode();
                    }
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <v-row style="margin-top: 18px">
                        <v-subheader>Playback</v-subheader>
                    </v-row>
                    <MethodListItem :staticMethod="true" :docs="play.docs" :options="play.options" :name="play.name" :code="play.code" :returns="play.returns" :parameters="play.parameters">
                        <div slot="overview">
                            <p>Start / Resume user's playback on their active device.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           // Play a track
                            var myFavoriteTrack = '3HKpZgez8S4TS2F0sWLvAR';
                            var options = { uris: [ myFavoriteTrack ] };
                            var response = await Playback.play( options );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                           // Play an artist
                            var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                            var options = { context_uri: myFavoriteArtist };
                            var response = await Playback.play( options );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                           // Play an Album's 3rd Track
                            var myFavoriteAlbum = '0GaYG9L1sXHQZZ7BTk0hGY';
                            var options = { context_uri: myFavoriteAlbum, offset: { position: 2 } };
                            var response = await Playback.play( options );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.play = async function(options) {
                            try {
                                return await Models.wrapperInstance.play(options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="pause.docs" :options="pause.options" :name="pause.name" :code="pause.code" :returns="pause.returns" :parameters="pause.parameters">
                        <div slot="overview">
                            <p>Pause user's playback.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var response = await Playback.pause();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.pause = async function(options) {
                            try {
                                return await Models.wrapperInstance.pause(options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="seek.docs" :options="seek.options" :name="seek.name" :code="seek.code" :returns="seek.returns" :parameters="seek.parameters">
                        <div slot="overview">
                            <p>Moves user's playback to new position within currently playing item.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           // Move 10 seconds (10,000 milliseconds) in.
                            var response = await Playback.seek( 10000 );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.seek = async function(position, options) {
                            try {
                                return await Models.wrapperInstance.seek(position, options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="skipToNext.docs" :options="skipToNext.options" :name="skipToNext.name" :code="skipToNext.code" :returns="skipToNext.returns" :parameters="skipToNext.parameters">
                        <div slot="overview">
                            <p>Moves user's playback to next item.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var response = await Playback.skipToNext();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.skipToNext = async function(options) {
                            try {
                                return await Models.wrapperInstance.skipToNext(options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="skipToPrevious.docs" :options="skipToPrevious.options" :name="skipToPrevious.name" :code="skipToPrevious.code" :returns="skipToPrevious.returns" :parameters="skipToPrevious.parameters">
                        <div slot="overview">
                            <p>Moves user's playback to previous item.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var response = await Playback.skipToPrevious();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.skipToPrevious = async function(options) {
                            try {
                                return await Models.wrapperInstance.skipToPrevious(options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="setVolume.docs" :options="setVolume.options" :name="setVolume.name" :code="setVolume.code" :returns="setVolume.returns" :parameters="setVolume.parameters">
                        <div slot="overview">
                            <p>Sets volume on user's active device.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           // Turn volume all the way up.
                            var response = await Playback.setVolume( 100 );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.setVolume = async function(percent, options) {
                            try {
                                return await Models.wrapperInstance.setVolume(percent, options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="setRepeat.docs" :options="setRepeat.options" :name="setRepeat.name" :code="setRepeat.code" :returns="setRepeat.returns" :parameters="setRepeat.parameters">
                        <div slot="overview">
                            <p>Sets repeat state on user's active device.</p>
                            <p>Valid states include:</p>
                            <ul>
                                <li><span class="highlight">track</span>: Repeat current track.</li>
                                <li><span class="highlight">context</span>: Repeat current context.</li>
                                <li><span class="highlight">off</span>: Do not repeat.</li>
                            </ul>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           // Repeat the track.
                            var response = await Playback.setRepeat( track );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.setRepeat = async function(state, options) {
                            try {
                                return await Models.wrapperInstance.setRepeat(state, options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="setShuffle.docs" :options="setShuffle.options" :name="setShuffle.name" :code="setShuffle.code" :returns="setShuffle.returns" :parameters="setShuffle.parameters">
                        <div slot="overview">
                            <p>Sets shuffle state on user's active device.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           // Turn shuffle on.
                            var response = await Playback.setShuffle( true );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.setShuffle = async function(state, options) {
                            try {
                                return await Models.wrapperInstance.setShuffle(state, options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="transferPlayback.docs" :options="transferPlayback.options" :name="transferPlayback.name" :code="transferPlayback.code" :returns="transferPlayback.returns" :parameters="transferPlayback.parameters">
                        <div slot="overview">
                            <p>Transfer user's playback to a new device.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           // Change to another device.
                            var devices = await Playback.getDevices();
                            var response = await Playback.transferPlayback( devices[2].id );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        Playback.transferPlayback = async function(deviceID, options) {
                            try {
                                let _options = options ? options : {};
                                _options.deviceIDs = [deviceID];
                                return await Models.wrapperInstance.transferMyPlayback(_options);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <v-row style="margin-top: 18px">
                        <v-subheader>Data</v-subheader>
                    </v-row>
                    <MethodListItem :staticMethod="true" :docs="getCurrentPlaybackState.docs" :options="getCurrentPlaybackState.options" :name="getCurrentPlaybackState.name" :code="getCurrentPlaybackState.code" :returns="getCurrentPlaybackState.returns" :parameters="getCurrentPlaybackState.parameters">
                        <div slot="overview">
                            <p>Get information on the user's current playback state.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           // Being creepy
                            var state = await Playback.getCurrentPlaybackState();
                            if (state.is_playing) {
                                console.log( "I see you're listening to", state.item.name );
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                            {
                                device: Object,
                                repeat_state: String,
                                shuffle_state: Boolean,
                                context: Object || Null,
                                timestamp: Number,
                                progress_ms: Number || Null,
                                is_playing: Boolean,
                                item: Object || Null,
                                currently_playing_type: String,
                                actions: Object
                            }
                        </pre>
                        <pre slot="src">
                        Playback.getCurrentPlaybackState = async function(options) {
                            try {
                                let response = await Models.wrapperInstance.getMyCurrentPlaybackState(options != null ? options : {});
                                return response.body;
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="getCurrentlyPlaying.docs" :options="getCurrentlyPlaying.options" :name="getCurrentlyPlaying.name" :code="getCurrentlyPlaying.code" :returns="getCurrentlyPlaying.returns" :parameters="getCurrentlyPlaying.parameters">
                        <div slot="overview">
                            <p>Get information on the item currently playing on the user's playback.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           // Being creepy
                            var state = await Playback.getCurrentPlaybackState();
                            if (state.is_playing) {
                                console.log( "I see you're listening to", state.item.name );
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} 
                            {
                                context: Object || Null,
                                timestamp: Number,
                                progress_ms: Number || Null,
                                is_playing: Boolean,
                                item: Object || Null,
                                currently_playing_type: String,
                                actions: Object
                            }
                        </pre>
                        <pre slot="src">
                        Playback.getCurrentlyPlaying = async function(options) {
                            try {
                                let _options = options ? options : {};
                                let response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
                                return response.body;
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="getDevices.docs" :options="getDevices.options" :name="getDevices.name" :code="getDevices.code" :returns="getDevices.returns" :parameters="getDevices.parameters">
                        <div slot="overview">
                            <p>Get a list of the user's available devices.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var devices = await Playback.getDevices();
                            console.log( "Your devices:", devices.map(device => device.name).join(', ') );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Array}
                            [
                                { // Device Objects
                                    id: String,
                                    is_active: Boolean,
                                    is_private_session: Boolean,
                                    is_restricted : Boolean,
                                    name : String,
                                    type : String,
                                    volume_percent : Number
                                }
                                // Possibly More...
                            ]
                        </pre>
                        <pre slot="src">
                        Playback.getDevices = async function() {
                            try {
                                let response = await Models.wrapperInstance.getMyDevices();
                                return response.body.devices;
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <v-row style="margin-top: 18px">
                        <v-subheader>Related Data</v-subheader>
                    </v-row>
                     <MethodListItem :staticMethod="true" :docs="getCurrentlyPlayingTrackOrEpisode.docs" :options="getCurrentlyPlayingTrackOrEpisode.options" :name="getCurrentlyPlayingTrackOrEpisode.name" :code="getCurrentlyPlayingTrackOrEpisode.code" :returns="getCurrentlyPlayingTrackOrEpisode.returns" :parameters="getCurrentlyPlayingTrackOrEpisode.parameters">
                        <div slot="overview">
                            <p>Get information on the item currently playing on the user's playback.</p>
                            <p>Returns either <a href="">Track</a> or <a href="">Episode</a> class instance with currently playing item.</p>
                            <p>Could return null.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var track = await Playback.getCurrentlyPlayingTrackOrEpisode();
                            var audioFeatures = await track.getAudioFeatures();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Track | Episode}
                        </pre>
                        <pre slot="src">
                        Playback.getCurrentlyPlayingTrackOrEpisode = async function(options) {
                            try {
                                let _options = options ? options : {};
                                _options.additional_types = "track,episode";
                                let response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
                                if (response.body.currently_playing_type == 'track') {
                                    return new Models.Track(response.body.item);
                                } else if (response.body.currently_playing_type == 'episode') {
                                    return new Models.Episode(response.body.item);
                                }
                                return null;
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="getCurrentlyPlayingContext.docs" :options="getCurrentlyPlayingContext.options" :name="getCurrentlyPlayingContext.name" :code="getCurrentlyPlayingContext.code" :returns="getCurrentlyPlayingContext.returns" :parameters="getCurrentlyPlayingContext.parameters">
                        <div slot="overview">
                            <p>Get information on the item currently playing on the user's playback.</p>
                            <p>Returns either <a href="">Artist</a>, <a href="">Album</a>, <a href="">Playlist</a>, or <a href="">Show</a> class instance with currently playing context.</p>
                            <p>Could return null.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var album = await Playback.getCurrentlyPlayingContext();
                            var tracks = await album.getTracks();
                            var response = await tracks.like();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Artist | Album | Playlist | Show}
                        </pre>
                        <pre slot="src">
                        Playback.getCurrentlyPlayingContext = async function(options) {
                            try {
                                let _options = options ? options : {};
                                _options.additional_types = "track,episode";
                                let response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
                                if (response.body.context == null) {
                                    return null;
                                } else if (response.body.context.type == 'artist') {
                                    return new Models.Artist(response.body.context.uri.split(':').reverse()[0]);
                                } else if (response.body.currently_playing_type == 'playlist') {
                                    return new Models.Playlist(response.body.context.uri.split(':').reverse()[0]);
                                } else if (response.body.currently_playing_type == 'show') {
                                    return new Models.Show(response.body.context.uri.split(':').reverse()[0]);
                                } else if (response.body.currently_playing_type == 'album') {
                                    return new Models.Album(response.body.context.uri.split(':').reverse()[0]);
                                }
                                return null;
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem> 
                    <MethodListItem :staticMethod="true" :docs="getRecentlyPlayed.docs" :options="getRecentlyPlayed.options" :name="getRecentlyPlayed.name" :code="getRecentlyPlayed.code" :returns="getRecentlyPlayed.returns" :parameters="getRecentlyPlayed.parameters">
                        <div slot="overview">
                            <p>Get <a href="">Tracks</a> instance of recently played tracks.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var tracks = await Playback.getCurrentlyPlayingContext();
                            var playlist = await tracks.createPlaylist();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Tracks}
                        </pre>
                        <pre slot="src">
                        Playback.getRecentlyPlayedTracks = async function(options) {
                            try {
                                let response = await Models.wrapperInstance.getMyRecentlyPlayedTracks(options != null ? options : {});
                                return new Models.Tracks(response.body.items);
                            } catch (error) {
                                throw error;
                            }
                        };
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
    name: 'Playback',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'Playback', disabled: true },
        ],
        properties: {
            instance: [],
            static: [
                {name: "Playback.getCurrentlyPlaying", type: "Function", description: "Returns data on currently playing item."},
                {name: "Playback.getCurrentlyPlayingTrackOrEpisode", type: "Function", description: "Returns Track or Episode instance of currently playing item.."},
                {name: "Playback.getCurrentlyPlayingContext", type: "Function", description: "Returns Artist, Album, Playlist or Show instance of current context.."},
                {name: "Playback.getRecentlyPlayed", type: "Function", description: "Returns Tracks instance of recently played tracks."},
                {name: "Playback.transferPlayback", type: "Function", description: "Transfers user's playback to a new device."},
                {name: "Playback.play", type: "Function", description: "Start / Resumes playback on user's active device."},
                {name: "Playback.pause", type: "Function", description: "Pauses playback on user's active device."},
                {name: "Playback.skipToNext", type: "Function", description: "Skips to the next item."},
                {name: "Playback.skipToPrevious", type: "Function", description: "Skips to the previous item."},
                {name: "Playback.seek", type: "Function", description: "Skips within an item."},
                {name: "Playback.setRepeat", type: "Function", description: "Sets repeat state for user's current playback."},
                {name: "Playback.setVolume", type: "Function", description: "Sets volume for user's current playback."},
                {name: "Playback.setShuffle", type: "Function", description: "Sets shuffle state for user's current playback."},
                {name: "Playback.getDevices", type: "Function", description: "Returns array of user's current devices."},
                {name: "Playback.getCurrentPlaybackState", type: "Function", description: "Returns data on the user's current playback."},
                {name: "Playback.addMethods", type: "Function", description: "Adds methods to playback prototype"},
                {name: "Playback.override", type: "Function", description: "Overrides methods in playback prototype"},
                {name: "Playback.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Playback.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ]
        },
        getCurrentlyPlaying: {
            name: "Get Currently Playing",
            code: "Playback.getCurrentlyPlaying(options)",
            docs: "",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "market", types: ["String"], description: "Country code (ISO Code).", default: "from_token"},
                {name: "additional_types", types: ["String"], description: "A comma-separated list of item types.", default: "track"},
            ],
        },
        getCurrentlyPlayingTrackOrEpisode: {
            name: "Get Currently Playing Track or Episode",
            code: "Playback.getCurrentlyPlayingTrackOrEpisode(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/",
            returns: ["Track", "Episode"],
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "market", types: ["String"], description: "Country code (ISO Code).", default: "from_token"},
            ],
        },
        getRecentlyPlayed: {
            name: "Get Recently Played Tracks",
            code: "Playback.getRecentlyPlayed(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/",
            returns: "Tracks",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "limit", types: ["Number"], description: "Number of tracks to retrieve (Minimum: 1, Max: 50).", default: "20"},
                {name: "after", types: ["Number"], description: "Unix timestamp in milliseconds. Returns all played tracks after (Can't use 'before').", default: "Undefined"},
                {name: "before", types: ["Number"], description: "Unix timestamp in milliseconds. Returns all played tracks before (Can't use 'after').", default: "Undefined"},
            ],
        },
        getCurrentlyPlayingContext: {
            name: "Get Currently Playing Context",
            code: "Playback.getCurrentlyPlayingContext(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/",
            returns: ["Album", "Artist", "Playlist", "Show"],
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "market", types: ["String"], description: "Country code (ISO Code).", default: "from_token"},
            ],
        },
        transferPlayback: {
            name: "Transfer Playback",
            code: "Playback.transferPlayback(deviceID, options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/",
            returns: "Object",
            parameters: [
                {name: "deviceID", types: ["String"], optional: true, description: "Device for playback to be switched to."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "play", types: ["Boolean"], description: "Ensures playback happens on new device.", default: "false"},
            ],
        },
        play: {
            name: "Play",
            code: "Playback.play(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "context_uri", types: ["String"], description: "Spotify URI of artist, album, playlist or show to play.", default: "null"},
                {name: "uris", types: ["Array"], description: "Array of Track / Episode URIs to play.", default: "null"},
                {name: "offset", types: ["Object"], description: "Where from in the context to play.", default: "{ position: 0 }"},
                {name: "offset.position", types: ["Number"], description: "Index of item to start playing within context.", default: "0"},
                {name: "offset.uri", types: ["String"], description: "URI of item to start playing within context.", default: "Undefined"},
                {name: "position_ms", types: ["Number"], description: "Position to start playback (Milliseconds).", default: "0"},
            ],
        },
        pause: {
            name: "Pause",
            code: "Playback.pause(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "device_id", types: ["String"], description: "Specify the ID to target.", default: "Current Active Device"},
            ],
        },
        skipToNext: {
            name: "Skip to Next",
            code: "Playback.skipToNext(options)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/skip-users-playback-to-next-track/",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "device_id", types: ["String"], description: "Specify the ID to target.", default: "Current Active Device"},
            ],
        },
        skipToPrevious: {
            name: "Skip to Previous",
            code: "Playback.skipToPrevious(options)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/skip-users-playback-to-previous-track/",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "device_id", types: ["String"], description: "Specify the ID to target.", default: "Current Active Device"},
            ],
        },
        seek: {
            name: "Seek",
            code: "Playback.seek(position, options)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/seek-to-position-in-currently-playing-track/",
            parameters: [
                {name: "position", types: ["Number"], optional: false, description: "Position to start playback (Milliseconds)."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "device_id", types: ["String"], description: "Specify the ID to target.", default: "Current Active Device"},
            ],
        },
        setRepeat: {
            name: "Set Repeat",
            code: "Playback.setRepeat(state, options)",
            returns: "Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/set-repeat-mode-on-users-playback/",
            parameters: [
                {name: "state", types: ["String"], optional: false, description: "New repeat state (track, context or off)."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "device_id", types: ["String"], description: "Specify the ID to target.", default: "Current Active Device"},
            ],
        },
        setVolume: {
            name: "Set Volume",
            code: "Playback.setVolume(percent, options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/set-volume-for-users-playback/",
            returns: "Object",
            parameters: [
                {name: "percent", types: ["Number"], optional: false, description: "New volume."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "device_id", types: ["String"], description: "Specify the ID to target.", default: "Current Active Device"},
            ],
        },
        setShuffle: {
            name: "Set Shuffle",
            code: "Playback.setShuffle(state, options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/toggle-shuffle-for-users-playback/",
            returns: "Object",
            parameters: [
                {name: "state", types: ["Boolean"], optional: false, description: "New shuffle state."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "device_id", types: ["String"], description: "Specify the ID to target.", default: "Current Active Device"},
            ],
        },
        getDevices: {
            name: "Get Devices",
            code: "Playback.getDevices()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/get-a-users-available-devices/",
            returns: "Array",
            parameters: [],
        },
        getCurrentPlaybackState: {
            name: "Get Playback State",
            code: "Playback.getCurrentPlaybackState(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "market", types: ["String"], description: "Country code (ISO Code).", default: "from_token"},
            ],
        },
    }),
}
</script>