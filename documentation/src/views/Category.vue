<template>
    <div class="Category page-content">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div style="padding-left: 24px">
            <h1 class="display-1">Category Class</h1>
            <p>The <span class="highlight">Category</span> class is used to maintain and retrieve data from Spotify's API for a given category.</p>
            <p>Spotify categories are use to tag items in Spotify.</p>
            <p>These include items such as: Top Lists, Indie Alt, Rock, Workout, and more.</p>
            <p>If you are handling <span class="highlight">multiple categories</span>, use the <a href="http://EnhancedSpotifyAPI.com/container/categories">Categories</a> container class for better efficiency and functionality.</p>
            <DataObject :properties="properties" style="margin-top: 30px;">
                <div slot="overview-content">
                    <h3 class="headline" style="margin-top: 12px">Importing Category Class</h3>
                    <highlight-code lang="javascript"><pre>
                   var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
                    var Category = EnhancedSpotifyAPI.Category;
                    // Or
                    var { Category } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h3 class="headline" style="margin-top: 12px">What does it do?</h3>
                    <p>The <code>Category</code> Data Access Object is used to maintain and retrieve data from <a href="https://developer.spotify.com/documentation/web-api">Spotify's API</a> for a given category.</p>
                    <ul>
                        <li class="subtitle-1">Member functions for all category endpoints.</li>
                        <li class="subtitle-1">Automatic retrieval of data (if needed).</li>
                        <li class="subtitle-1">Retrieves data in as few requests as possible!</li>
                    </ul>
                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h3 class="headline" style="margin-top: 32px">Multiple Category</h3>
                    <p>If you are handling <span class="highlight">multiple category</span>, use the <a href="http://EnhancedSpotifyAPI.com/dao-managers/categories"><code>Categories</code></a> object manager class for better efficiency and more functionality.</p>
                    <p>This class is only for working with a single category.</p>
                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h3 class="headline" style="margin-top: 32px">Let's do this.</h3>
                    <p>You can either create your own <code>Category</code> objects, or use <code>Category</code> static methods to create instances.</p>
                    <p>See the next tab, <span class="highlight">Usage</span> for more information.</p>
                </div>
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
                    var Category = EnhancedSpotifyAPI.Category;
                    </pre></highlight-code>
                    <p>Or just the Category class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Category } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Category.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>Creating a new <span class="highlight">Category</span> instance requires the passing in of a <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify Category ID</a>.</p>
                    <p>You have the choice of either passing in the ID directly:</p>
                    <highlight-code lang="javascript"><pre>
                    // String as a Parameter
                    var myFavoriteCategory = 'chill';
                    var myCategory = new Category( myFavoriteCategory );
                    </pre></highlight-code>
                    <p>Or as a property within an object:</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter
                    var myFavoriteCategory = {
                        id: "chill"
                    };
                    var myCategory = new Category( myFavoriteCategory );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Pre-Loading Data</h2>
                    <p>If you've already retrieved some category data, you can pass it into the constructor to be pre-loaded.</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter with Additional Data
                    var myFavoriteCategory = {
                        id: '0GaYG9L1sXHQZZ7BTk0hGY',
                        name: 'Chill',
                        icons: [
                            {
                                height: 274,
                                url: 'https://t.scdn.co/media/derived/chill-274x274_4c46374f007813dd10b37e8d8fd35b4b_0_0_274_274.jpg',
                                width: 274
                            }
                        ]
                    };
                    var myCategory = new Category( myFavoriteCategory );
                    </pre></highlight-code>
                    <p>The data will be loaded in if it is valid to the category object.</p>
                    <p>Category instances will only make requests if the needed data is absent. Passing in what you have at construction could save you from unnessisary requests.</p>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Working with Instances</h2>
                    <p>Once you have a Category instance, you can work with any of its member functions!</p>
                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myCategory = new Category( myFavoriteCategory );

                    var playlists = myCategory.getPlaylists();

                    var tracks = playlists.getTracks();
                    var newPlaylist = tracks.createPlaylist();

                    newPlaylist.play();
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                        <div slot="overview">   
                            <p>Creates new instance of <code>Category</code> class.</p>
                            <p>The new instance will represent that category for all subsequent member functions called.</p>
                            <p>If you've loaded any data on the category prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteCategory = {
                                id: "chill"
                            };
                            var myCategory = new Category( myFavoriteCategory );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteCategory = {
                                id: "chill",
                                name: "Chill"
                            };
                            var myCategory = new Category( myFavoriteCategory );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Category}
                        </pre>
                        <pre slot="src">
                        function Category(data) {
                            try {
                                if (typeof(data) == 'string') {
                                    this.id = data;
                                } else if (typeof(data) == 'object') {
                                    if ('id' in data) {
                                        this.id = data.id; 
                                    } else {
                                        throw new Error("Category.constructor: No ID Provided");
                                    }
                                    this.loadConditionally(data);
                                } else {
                                    throw new Error("Category.constructor: Invalid Data");
                                }
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getCategory.docs" :options="getCategory.options" :name="getCategory.name" :code="getCategory.code" :returns="getCategory.returns" :parameters="getCategory.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Cateogory</span> class.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/browse/get-category/">Get a Category</a>, except it returns an instance of the Cateogory class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrieveFullObject</span></p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteCategory = 'chill';
                            var myCategory = await Category.getCategory( myFavoriteCategory );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Category}
                        </pre>
                        <pre slot="src">
                        Category.getCategory = async function(categoryId, options) {
                            try {
                                if (options != null && typeof(options) != 'object') {
                                    throw new Error("Category.getCategory: Invalid Parameter \"options\"");
                                }
                                let response = await Models.wrapperInstance.getCategory(categoryId, options ? options : {});
                                return new Models.Category(response.body);
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Playback</v-subheader>
                    </v-row>
                    <MethodListItem :docs="play.docs" :name="play.name" :code="play.code" :returns="play.returns" :parameters="play.parameters">
                        <div slot="overview">
                            <p>Plays album on user's current playback device.</p>
                            <p>It should be noted this method is only retrieving the first playlist with <span class="highlight">getPlaylists</span> and playing it.</p>
                            <p><span class="highlight">options</span> are passed into <span class="highlight">Playlists</span> container play method. Visit there for options.</p>
                            <p>Returns the response from the request.</p>
                        </div>    
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );
                            var response = await myCategory.play();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        play: async function(options) {
                            try {
                                return await (await (await this.getCategoryPlaylists({ limit: 1 })).get(0)).play(options);
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
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#category-object">Category Object</a>. Retrieves from Spotify API if necessary.</p>
                        </div>    
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );
                            console.log( await myCategory.getFullObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} 
                            {
                                id: String,
                                name: String,
                                href: String,
                                icons: Array,
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
                                    href: this.href,
                                    icons: this.icons,
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
                            <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the Category instance.</p>
                        </div>    
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteCategory = {
                                id: "chill",
                                name: "Chill"
                            };
                            var myCategory = new Category( myFavoriteCategory );
                            console.log( "Just give me what ya got");
                            console.log( myCategory.getCurrentData() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} 
                            {
                                // Varies
                            }
                        </pre>
                        <pre slot="src">
                        getCurrentData: function() {
                            try {
                                let data = { id: this.id };
                                let properties = ['id', 'name', 'href', 'icons'];
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
                    <MethodListItem :docs="getPlaylists.docs" :options="getPlaylists.options" :name="getPlaylists.name" :code="getPlaylists.code" :returns="getPlaylists.returns" :parameters="getPlaylists.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/playlists">Playlists</a> container instance of the category's playlists.</p>
                        </div>    
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );

                            var chillPlaylists = await myCategory.getPlaylists();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Playlists}
                        </pre>
                        <pre slot="src">
                        getPlaylists: async function(options) {
                            try {
                                if (options != null && typeof(options) != 'object') {
                                    throw new Error("Category.getPlaylists: Invalid Parameter \"options\"");
                                }
                                let _options = options ? options : {};
                                let response = await Models.wrapperInstance.getCategoryPlaylists(this.id, _options);
                                return new Models.Playlists(response.body.playlists);
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
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#category-object">Category Object</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>    
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );
                            
                            if ( myCategory.containsFullObject() ) {
                                await myCategory.retrieveFullObject();
                            }

                            console.log( 'Name:', myCategory.name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );

                            console.log( 'Name:', ( await myCategory.getFullObject() ).name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsFullObject: function() {
                            return ((this.name != null && this.href != null && this.icons != null));
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Load Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="loadFullObject.docs" :name="loadFullObject.name" :code="loadFullObject.code" :returns="loadFullObject.returns" :parameters="loadFullObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#category-object">Category Object</a> and saves it's properties to the Category Instance.</p>
                            <p>The constructor already takes care of loading all types of category data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Category methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>    
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );
                            myCategory.loadFullObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myCategory = new Category( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadFullObject: function(data) {
                            try {
                                this.name = data.name;
                                this.href = data.href;
                                this.icons = data.icons;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadConditionally.docs" :name="loadConditionally.name" :code="loadConditionally.code" :returns="loadConditionally.returns" :parameters="loadConditionally.parameters">
                        <div slot="overview">
                            <p>Takes <span class="highlight">any category data</span> and saves it's properties to the Category Instance.</p>
                            <p>The constructor already takes care of loading all types of category data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Category methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>    
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );
                            myCategory.loadConditionally( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myCategory = new Category( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadConditionally: function(data) {
                            try {
                                let properties = ['name', 'href', 'icons'];
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
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#category-object">Category Object</a> for this category.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>    
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );
                            
                            if ( myCategory.containsFullObject() ) {
                                await myCategory.retrieveFullObject();
                            }

                            console.log( 'Name:', myCategory.name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteCategory = 'chill';
                            var myCategory = new Category( myFavoriteCategory );

                            console.log( 'Name:', ( await myCategory.getFullObject() ).name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveFullObject: async function() {
                            try {
                                let response = await Models.wrapperInstance.getCategory(this.id, {});
                                await this.loadFullObject(response.body);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                </v-expansion-panels>
                <div slot="examples-content">
                    <highlight-code lang="javascript"><pre>
                    // COMING SOON
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
    name: 'Category',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'Category', disabled: true },
        ],
        properties: {
            instance: [
                {name: "id", type: "String", description: "The Spotify ID for the category"},
                {name: "name", type: "String", description: "The name of the category"},
                {name: "href", type: "String", description: "	A link to the Web API endpoint returning full details"},
                {name: "icons", type: "Array", description: " objects	The category icon, in various sizes"},
                {name: "play", type: "Function", description: "Plays category on user's active device"},
                {name: "getFullObject", type: "Function", description: "Returns full category data. Retrieves from Spotify API if nessisary"},
                {name: "getCurrentData", type: "Function", description: "Just returns whatever the category object currently holds"},
                {name: "getPlaylists", type: "Function", description: "Returns Playlists object of category playlists"},
                {name: "containsFullObject", type: "Function", description: "Returns boolean whether full object data is present"},
                {name: "loadFullObject", type: "Function", description: "Sets full data (outside constructor)"},
                {name: "loadConditionally", type: "Function", description: "Sets any category data (outside constructor)"},
                {name: "retrieveFullObject", type: "Function", description: "Retrieves full category data from Spotify API"},
            ],
            static: [
                {name: "Category.prototype", type: "Object", description: "Instance of Category"},
                {name: "Category.getCategory", type: "Function", description: "Returns Category instance of ID"},
                {name: "Category.addMethods", type: "Function", description: "Adds methods to Category prototype"},
                {name: "Category.override", type: "Function", description: "Overrides methods in Category prototype"},
                {name: "Category.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Category.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Category(data)",
            returns: "Category",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Data to be preloaded. Must either be a string of the Category ID or contain an `id` property."},
            ],
        },
        play: {
            name: "Play Category",
            code: "play(options)",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
        },
        containsFullObject: {
            name: "Contains Full Object?",
            code: "containsFullObject()",
            returns: "Boolean",
            parameters: [],
        },
        getFullObject: {
            name: "Get Full Object",
            code: "getFullObject()",
            docs: "https://developer.spotify.com/console/get-browse-category/",
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
        getPlaylists: {
            name: "Get Category Playlists",
            code: "getPlaylists()",
            docs: "https://developer.spotify.com/console/get-category-playlists/",
            returns: "Playlists",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "limit", types: ["Number"], description: "Number of playlists to retrieve (Minimum: 1, Max: 50).", default: "20"},
                {name: "offset", types: ["Number"], description: "The index of the first playlist to return.", default: "0"},
                {name: "country", types: ["String"], description: "Country code. (ISO code)", default: "from_token"},
            ]
        },
        loadFullObject: {
            name: "Load Full Object",
            code: "loadFullObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Object with category full object data."},
            ],
        },
        loadConditionally: {
            name: "Load Conditionally",
            code: "loadConditionally(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Object with category data."},
            ],
        },
        retrieveFullObject: {
            name: "Retrieve Full Object",
            code: "retrieveFullObject()",
            docs: "https://developer.spotify.com/console/get-browse-category/",
            returns: "void",
            parameters: [
            ],
        },
        getCategory: {
            name: "Get Category",
            code: "Category.getCategory(categoryID)",
            docs: "https://developer.spotify.com/console/get-browse-category/",
            returns: "Category",
            parameters: [
                {name: "categoryID", types: ["String"], optional: false, description: "Category Spotify ID."},
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "country", types: ["String"], description: "Country Code (ISO Code)", default: "Unset"},
                {name: "locale", types: ["String"], description: "Desired Language (ISO Code)", default: "American English"},
            ],
        }
    }),
}
</script>