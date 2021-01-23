<template>
    <div class="Artists">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Artists Container</h1>
            <p>The <span class="highlight">Artists</span> container class is used to retrieve and maintain data from Spotify's API on a list of artists.</p>
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
                    var Artists = EnhancedSpotifyAPI.Artists;
                    </pre></highlight-code>
                    <p>Or just the Artists class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Artists } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                   EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Artists.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>When creating a <span class="highlight">Artists</span> container instance, you can either leave it empty or load in artists. You have the choice of using Spotify's requests to load in data, or directly through IDs.</p>
                    <h2 class="headline" style="margin-top: 32px !important;">Initializing Empty</h2>
                    <highlight-code lang="javascript"><pre>
                    var myArtists = new Artists();
                    </pre></highlight-code>
                    <h2 class="headline" style="margin-top: 32px !important;">Static Methods</h2>
                    <p>There are several static methods which function exactly like Spotify's requests, but return <span class="highlight">Artists</span> instances with the response.</p>
                    <highlight-code lang="javascript"><pre>
                    // Artists instance with search results.
                    var searchResults = await Artists.search( 'The Heavy' );
                    // Artists instance of related artists.
                    var relatedArtists = await Artists.getRelatedArtists( '0bZCak2tcRMY1dzEIuwF42' );
                    // Artists instance with my top played artists.
                    var topPlayed = await Artists.getMyTopArtists();
                    </pre></highlight-code>
                    
                    <h2 class="headline" style="margin-top: 32px !important;">Initializing with Multiple Artists</h2>
                    <highlight-code lang="javascript"><pre>
                    var artistIDs = [ '22bE4uQ6baNwSHPVcDxLCe', '4kI8Ie27vjvonwaB2ePh8T', '4LG4Bs1Gadht7TCrMytQUO' ];
                    var myArtists = new Artists( artistIDs );
                    </pre></highlight-code>
                    <highlight-code lang="javascript"><pre>
                    var artistObjects = [ { id: '22bE4uQ6baNwSHPVcDxLCe' }, { id: '4kI8Ie27vjvonwaB2ePh8T' }, { id: '4LG4Bs1Gadht7TCrMytQUO' } ];
                    var myArtists = new Artists( artistObjects );
                    </pre></highlight-code>
                    <highlight-code lang="javascript"><pre>
                    var artists = [ new Artist( '22bE4uQ6baNwSHPVcDxLCe' ), new Artist( '4kI8Ie27vjvonwaB2ePh8T' ), new Artist( '4LG4Bs1Gadht7TCrMytQUO' ) ];
                    var myArtists = new Artists( artists );
                    </pre></highlight-code>
                    <h2 class="headline" style="margin-top: 32px !important;">Initializing with a Single Artist</h2>
                    <highlight-code lang="javascript"><pre>
                    var artistID = '22bE4uQ6baNwSHPVcDxLCe';
                    var myArtists = new Artists( artistID );
                    </pre></highlight-code>
                    <highlight-code lang="javascript"><pre>
                    var artistObject = { id: '22bE4uQ6baNwSHPVcDxLCe' };
                    var myArtists = new Artists( artistObject );
                    </pre></highlight-code>
                    <highlight-code lang="javascript"><pre>
                    var artist = new Artist( '22bE4uQ6baNwSHPVcDxLCe' );
                    var myArtists = new Artists( artist );
                    </pre></highlight-code>
                    
                    <v-divider style="margin: 40px 0px;"></v-divider>
                     <h2 class="display-1">Working with Instances</h2>
                    <p>Once you have an Artists instance, you can work with any of its member functions!</p>
                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myArtists = new Artists( artistIDs );

                    var artists = await myArtists.getFullObjects();
                    console.log( "Artists:", await artists.getFullObjects.map(artist => artist.name).join(', ') );

                    await myArtists.play();

                    await myArtists.follow();
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <div slot="methods-content">
                    <v-expansion-panels accordion multiple>
                        <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <span class="highlight">Artists</span> container class.</p>
                                <p>The new instance will represent a group of artists for all subsequent member functions called.</p>
                                <p>You can add artists when creating a new <span class="highlight">Artists</span> instance, or add them in later.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var artistIDs = [ '22bE4uQ6baNwSHPVcDxLCe', '4kI8Ie27vjvonwaB2ePh8T', '4LG4Bs1Gadht7TCrMytQUO' ];
                                var myArtists = new Artists( artistIDs );
                                </pre></highlight-code>
                                <highlight-code lang="javascript"><pre>
                                var artistObjects = [ { id: '22bE4uQ6baNwSHPVcDxLCe' }, { id: '4kI8Ie27vjvonwaB2ePh8T' }, { id: '4LG4Bs1Gadht7TCrMytQUO' } ];
                                var myArtists = new Artists( artistObjects );
                                </pre></highlight-code>
                                <highlight-code lang="javascript"><pre>
                                var myArtists = new Artists();
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Artists}
                            </pre>
                            <pre slot="src">
                            function Artists(items) {
                                try {
                                    this.name = 'Artists';
                                    this.type = 'Artist';
                                    this.uri_type = 'artist';
                                    Models.Container.call(this, items);
                                } catch (error) {
                                    throw error;
                                }
                            }
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getArtists.docs" :name="getArtists.name" :code="getArtists.code" :returns="getArtists.returns" :parameters="getArtists.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Artists}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="search.docs" :name="search.name" :code="search.code" :returns="search.returns" :parameters="search.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Artists}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getRelatedArtists.docs" :name="getRelatedArtists.name" :code="getRelatedArtists.code" :returns="getRelatedArtists.returns" :parameters="getRelatedArtists.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Artists}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getMyTopArtists.docs" :name="getMyTopArtists.name" :code="getMyTopArtists.code" :returns="getMyTopArtists.returns" :parameters="getMyTopArtists.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Artists}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Playback</v-subheader>
                        </v-row>
                        <MethodListItem :docs="play.docs" :name="play.name" :code="play.code" :returns="play.returns" :parameters="play.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Followship</v-subheader>
                        </v-row>
                        <MethodListItem :docs="areFollowed.docs" :name="areFollowed.name" :code="areFollowed.code" :returns="areFollowed.returns" :parameters="areFollowed.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="followAll.docs" :name="followAll.name" :code="followAll.code" :returns="followAll.returns" :parameters="followAll.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="unfollowAll.docs" :name="unfollowAll.name" :code="unfollowAll.code" :returns="unfollowAll.returns" :parameters="unfollowAll.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Data</v-subheader>
                        </v-row>
                        <MethodListItem :docs="getFullObjects.docs" :name="getFullObjects.name" :code="getFullObjects.code" :returns="getFullObjects.returns" :parameters="getFullObjects.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getSimplifiedObjects.docs" :name="getSimplifiedObjects.name" :code="getSimplifiedObjects.code" :returns="getSimplifiedObjects.returns" :parameters="getSimplifiedObjects.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getCurrentData.docs" :name="getCurrentData.name" :code="getCurrentData.code" :returns="getCurrentData.returns" :parameters="getCurrentData.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Related Data</v-subheader>
                        </v-row>
                        <MethodListItem :docs="getTopTracks.docs" :name="getTopTracks.name" :code="getTopTracks.code" :returns="getTopTracks.returns" :parameters="getTopTracks.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAllTracks.docs" :name="getAllTracks.name" :code="getAllTracks.code" :returns="getAllTracks.returns" :parameters="getAllTracks.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getRecommendations.docs" :name="getRecommendations.name" :code="getRecommendations.code" :returns="getRecommendations.returns" :parameters="getRecommendations.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAlbums.docs" :name="getAlbums.name" :code="getAlbums.code" :returns="getAlbums.returns" :parameters="getAlbums.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                        <MethodListItem :docs="getAllAlbums.docs" :name="getAllAlbums.name" :code="getAllAlbums.code" :returns="getAllAlbums.returns" :parameters="getAllAlbums.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                    </v-expansion-panels>
                    
                    <ContainerMethods container="Artists" contents="Artist"/>

                    <v-expansion-panels accordion multiple>
                        <v-row style="margin-top: 18px">
                            <v-subheader>Retrieve Data</v-subheader>
                        </v-row>
                        <MethodListItem :docs="retrieveFullObjects.docs" :name="retrieveFullObjects.name" :code="retrieveFullObjects.code" :returns="retrieveFullObjects.returns" :parameters="retrieveFullObjects.parameters">
                            <div slot="overview">
                                
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                               
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Object}
                            </pre>
                            <pre slot="src">
                           
                            </pre>
                        </MethodListItem>
                    </v-expansion-panels>
                </div>
                <div slot="examples-content">
                    <highlight-code lang="javascript"><pre>
                    
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
    name: 'Artists',
    components: {
        DataObject,
        MethodListItem,
        ContainerMethods
    },
    data: () => ({
        path: [
            { text: 'Containers', disabled: true },
            { text: 'Artists', disabled: true },
        ],
        properties: {
            instance: [
            
            ],
            static: [

            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Artists(data)",
            returns: "Artists",
            parameters: [
                {name: "data", types: ["Array", "Track", "Object", "String"], optional: true, description: "Data to be preloaded. Single or multiple tracks."},
            ],
        },
        play: {
            name: "Play Artists",
            code: "play(options)",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "position_ms", types: ["Number"], description: "Position to start playback (Milliseconds).", default: "0"},
            ],
        },
        areFollowed: {
            name: "Are Artists Followed?",
            code: "areFollowed()",
            returns: "Array",
            parameters: [],
        },
        followAll: {
            name: "Follow Artists",
            code: "followAll()",
            returns: "Object",
            parameters: [],
        },
        unfollowAll: {
            name: "Unfollow Artists",
            code: "unfollow()",
            returns: "Object",
            parameters: [],
        },
        getFullObjects: {
            name: "Get Full Objects",
            code: "getFullObjects()",
            returns: "Array",
            parameters: [],
        },
        getSimplifiedObjects: {
            name: "Get Simplified Objects",
            code: "getSimplifiedObjects()",
            returns: "Array",
            parameters: [],
        },
        getCurrentData: {
            name: "Get Current Data",
            code: "getCurrentData()",
            returns: "Array",
            parameters: [],
        },
        getTopTracks: {
            name: "Get Top Tracks",
            code: "getTopTracks(countryCode)",
            returns: "Tracks",
            parameters: [
                {name: "countryCode", types: ["String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
        getAllTracks: {
            name: "Push",
            code: "push(item)",
            returns: "void",
            parameters: [
                {name: "item", types: ["Track", "Object", "String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
        getAlbums: {
            name: "Push",
            code: "push(item)",
            returns: "void",
            parameters: [
                {name: "item", types: ["Track", "Object", "String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
        getAllAlbums: {
            name: "Push",
            code: "push(item)",
            returns: "void",
            parameters: [
                {name: "item", types: ["Track", "Object", "String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
        getRecommendations: {
            name: "Push",
            code: "push(item)",
            returns: "void",
            parameters: [
                {name: "item", types: ["Track", "Object", "String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
        retrieveFullObjects: {
            name: "Push",
            code: "push(item)",
            returns: "void",
            parameters: [
                {name: "item", types: ["Track", "Object", "String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
        search: {
            name: "Search for Artists",
            code: "Artists.search(query, options)",
            returns: "Artists",
            parameters: [
                {name: "query", types: ["String"], optional: false, description: "Search query string."},
                {name: "options", types: ["Object"], optional: true, description: "Additional Options."},
            ],
            options: [
                {name: 'limit', types: ['Number'], description: 'Number of results to return.', default: '20'},
                {name: 'offset', types: ['Number'], description: 'Index of first result to return.', default: '0'},
                {name: 'include_external', types: ['String'], description: 'Whether to include audio content hosted externally.', default: '0'},
            ],
        },
        getArtists: {
            name: "Get Artists",
            code: "Artist.getArtists(artistIDs)",
            returns: "Artists",
            parameters: [
                {name: "artistIDs", types: ["Array"], optional: false, description: "Array of Artist IDs."},
            ],
        },
        getRelatedArtists: {
            name: "Get Related Artists",
            code: "Artist.getRelatedArtists(artistID)",
            returns: "Artists",
            parameters: [
                {name: "artistID", types: ["Track", "Object", "String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
        getMyTopArtists: {
            name: "Push",
            code: "push(item)",
            returns: "Artists",
            parameters: [
                {name: "item", types: ["Track", "Object", "String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
    }),
}
</script>