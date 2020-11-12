<template>
    <div class="Show">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Show Class</h1>
            <p>The <span class="highlight">Show</span> class is used to maintain and retrieve data from Spotify's API for a given show.</p>
            <p>If you are handling <span class="highlight">multiple shows</span>, use the <a href="http://EnhancedSpotifyAPI.com/container/shows">Shows</a> container class for better efficiency and functionality.</p>
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
                    var Show = EnhancedSpotifyAPI.Show;
                    </pre></highlight-code>
                    <p>Or just the Show class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Show } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Show.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>Creating a new <span class="highlight">Show</span> instance requires the passing in of a <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify Show ID</a>.</p>
                    <p>You have the choice of either passing in the ID directly:</p>
                    <highlight-code lang="javascript"><pre>
                    // String as a Parameter
                    var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                    var myShow = new Show( myFavoriteShow );
                    </pre></highlight-code>
                    <p>Or as a property within an object:</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter
                    var myFavoriteShow = {
                        id: "2mTUnDkuKUkhiueKcVWoP0"
                    };
                    var myShow = new Show( myFavoriteShow );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Pre-Loading Data</h2>
                    <p>If you've already retrieved some show data, you can pass it into the constructor to be pre-loaded.</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter with Additional Data
                    var myFavoriteShow = {
                        id: "2mTUnDkuKUkhiueKcVWoP0",
                        name: "Up First",
                        // Some other good stuff
                    };
                    var myShow = new Show( myFavoriteShow );
                    </pre></highlight-code>
                    <p>The data will be loaded in if it is valid to the show object.</p>
                    <p>Show instances will only make requests if the needed data is absent. Passing in what you have at construction could save you from unnessisary requests.</p>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Working with Instances</h2>
                    <p>Once you have a <span class="highlight">Show</span> instance, you can work with any of its member functions!</p>
                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myShow = new Show( myFavoriteShow );

                    console.log( await myShow.getFullObject() );

                    var episodes = await myShow.getEpisodes();
                    episodes.play();
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Show</span> class.</p>
                            <p>The new instance will represent that show for all subsequent member functions called.</p>
                            <p>If you've loaded any data on the show prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = new Show( myFavoriteShow );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = {
                                id: "2mTUnDkuKUkhiueKcVWoP0"
                            };
                            var myShow = new Show( myFavoriteShow );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = {
                                id: "2mTUnDkuKUkhiueKcVWoP0",
                                name: "Up First",
                            };
                            var myShow = new Show( myFavoriteShow );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Show}
                        </pre>
                        <pre slot="src">
                        function Show(data) {
                            try {
                                if (typeof(data) == 'string') {
                                    this.id = data;
                                    this._episodes = new Models.Episodes();
                                } else if (typeof(data) == 'object') {
                                    if (data.hasOwnProperty('id')) {
                                        this.id = data.id; 
                                    } else {
                                        throw new Error("Show.constructor: No ID Provided");
                                    }
                                    this._episodes = data.hasOwnProperty('_episodes') ? data._episodes : new Models.Episodes();
                                    this.loadConditionally(data);
                                } else {
                                    throw new Error("Show.constructor: Invalid Data");
                                }
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getShow.docs" :name="getShow.name" :staticMethod="true" :code="getShow.code" :returns="getShow.returns" :parameters="getShow.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Show</span> class.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/shows/get-a-show/">Get an Show</a>, except it returns an instance of the Show class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrieveFullObject</span></p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Show}
                        </pre>
                        <pre slot="src">
                        Show.getShow = async function(showID) {
                            try {
                                let response = await Models.wrapperInstance.getShow(showID);
                                return new Models.Show(response.body);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Playback</v-subheader>
                    </v-row>
                    <MethodListItem :docs="play.docs" :name="play.name" :code="play.code" :returns="play.returns" :parameters="play.parameters">
                        <div slot="overview">
                            <p>Plays show on user's current playback device.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            var response = await myShow.play();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        play: async function(options) {
                            try {
                                let _options = options ? options : {};
                                _options.context_uri = 'spotify:show:' + this.id;
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
                            <p>Returns <span class="highlight">Boolean</span> whether or not show is saved to current User's library.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            var savedStatus = await myShow.isLiked();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        isLiked: async function() {
                            try {
                                let response = await Models.wrapperInstance.containsMySavedShows([this.id]);
                                return response.body[0];
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="like.docs" :name="like.name" :code="like.code" :returns="like.returns" :parameters="like.parameters">
                        <div slot="overview">
                            <p>Saves a show to current User's library.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            if ( !await myShow.isLiked() ) {
                                await myShow.like();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        like: async function() {
                            try {
                                return await Models.wrapperInstance.addToMySavedShows([this.id]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="unlike.docs" :name="unlike.name" :code="unlike.code" :returns="unlike.returns" :parameters="unlike.parameters">
                        <div slot="overview">
                            <p>Removes a show from current User's library.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            if ( await myShow.isLiked() ) {
                                await myShow.like();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        unlike: async function() {
                            try {
                                return await Models.wrapperInstance.removeFromMySavedShows([this.id]);
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
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#show-object-full">Show Object (Full)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            console.log( await myShow.getFullObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Object}
                        {
                            id: String,
                            name: String,
                            available_markets: Array,
                            copyrights: Array,
                            description: String,
                            explicit: Boolean,
                            episodes: Object,
                            external_urls: Object,
                            href: String,
                            images: Array,
                            is_externally_hosted: Boolean,
                            languages: Array,
                            media_type: String,
                            publisher: String,
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
                                    available_markets: this.available_markets,
                                    copyrights: this.copyrights,
                                    description: this.description,
                                    explicit: this.explicit,
                                    episodes: this.episodes,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    images: this.images,
                                    is_externally_hosted: this.is_externally_hosted,
                                    languages: this.languages,
                                    media_type: this.media_type,
                                    publisher: this.publisher,
                                    uri: this.uri,
                                    type: 'show',
                                };
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getSimplifiedObject.docs" :name="getSimplifiedObject.name" :code="getSimplifiedObject.code" :returns="getSimplifiedObject.returns" :parameters="getSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#show-object-simplified">Show Object (Simplified)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            console.log( await myShow.getSimplifiedObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Object}
                        {
                            id: String,
                            name: String,
                            available_markets: Array,
                            copyrights: Array,
                            description: String,
                            explicit: Boolean,
                            external_urls: Object,
                            href: String,
                            images: Array,
                            is_externally_hosted: Boolean,
                            languages: Array,
                            media_type: String,
                            publisher: String,
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
                                    available_markets: this.available_markets,
                                    copyrights: this.copyrights,
                                    description: this.description,
                                    explicit: this.explicit,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    images: this.images,
                                    is_externally_hosted: this.is_externally_hosted,
                                    languages: this.languages,
                                    media_type: this.media_type,
                                    publisher: this.publisher,
                                    uri: this.uri,
                                    type: 'show',
                                };
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
                            <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the Show instance.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = {
                                id: "2mTUnDkuKUkhiueKcVWoP0",
                                name: "Up First",
                            };
                            var myShow = new Show( myFavoriteShow );
                            console.log( "Just give me what ya got");
                            console.log( myShow.getCurrentData() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Object}
                        {
                            // Varies
                        }
                        </pre>
                        <pre slot="src">
                        getCurrentData: () => {
                            try {
                                let data = { id: this.id, type: 'show' };
                                let properties = ['name', 'available_markets', 'copyrights', 'description', 'explicit', 'episodes', 'external_urls', 'href', 'images', 'is_externally_hosted', 'languages', 'media_type', 'publisher', 'uri', '_episodes'];
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
                    <MethodListItem :docs="getEpisodes.docs" :options="getEpisodes.options" :name="getEpisodes.name" :code="getEpisodes.code" :returns="getEpisodes.returns" :parameters="getEpisodes.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/episodes">Episodes</a> container instance of the show's episodes.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );

                            // Get the first 20 episodes
                            var showEpisodes = await myShow.getEpisodes();
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );

                            // Get episodes 5 through 15
                            var options = { limit: 10, offset: 5 };
                            var showEpisodes = await myShow.getEpisodes(options);
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Episodes}
                        </pre>
                        <pre slot="src">
                        getEpisodes: async function(options) {
                            try {
                                if (options != null && typeof(options) != 'object') {
                                    throw new Error("Show.getEpisodes: Invalid Parameter \"options\"");
                                }
                                let response = await Models.wrapperInstance.getShowEpisodes(this.id, options ? options : {});
                                let episodes = new Models.Episodes(response.body.items);
                                await this.loadEpisodes(episodes);
                                return episodes;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAllEpisodes.docs" :name="getAllEpisodes.name" :code="getAllEpisodes.code" :returns="getAllEpisodes.returns" :parameters="getAllEpisodes.parameters">
                        <div slot="overview">
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/episodes"><span class="highlight">Episodes</span></a> instance containing all of the show's episodes.</p>
                            <p>This method retrieves all the show's episodes with as many requests as it takes (Limited to 50 episodes per request by Spotify).</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );

                            // Get all show's episodes
                            var showEpisodes = await myShow.getAllEpisodes();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Episodes}
                        </pre>
                        <pre slot="src">
                        getAllEpisodes: async function() {
                            try {
                                await this.retrieveEpisodes();
                                return this._episodes;
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
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#show-object-full">Show Object (Full)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            
                            if ( myShow.containsFullObject() ) {
                                await myShow.retrieveFullObject();
                            }

                            console.log( 'Lanuages:', myShow.languages.join(',') );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );

                            console.log( 'Lanuages:', ( await myShow.getFullObject() ).languages.join(',') );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsFullObject: function() {
                            return ((this.name != null) && (this.available_markets != null) && (this.copyrights) && (this.description != null) && (this.explicit != null) && (this.episodes) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.languages != null) && (this.media_type != null) && (this.publisher != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsSimplifiedObject.docs" :name="containsSimplifiedObject.name" :code="containsSimplifiedObject.code" :returns="containsSimplifiedObject.returns" :parameters="containsSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#show-object-simplified">Show Object (Simplified)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            
                            if ( myShow.containsSimplifiedObject() ) {
                                await myShow.retrieveFullObject();
                            }

                            console.log( 'Lanuages:', myShow.languages.join(',') );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );

                            console.log( 'Lanuages:', ( await myShow.getSimplifiedObject() ).languages.join(',') );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                        // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsSimplifiedObject: function() {
                            return ((this.name != null) && (this.available_markets != null) && (this.copyrights) && (this.description != null) && (this.explicit != null) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.languages != null) && (this.media_type != null) && (this.publisher != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Load Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="loadFullObject.docs" :name="loadFullObject.name" :code="loadFullObject.code" :returns="loadFullObject.returns" :parameters="loadFullObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#show-object-full">Show Object (Full)</a> and saves it's properties to the Show Instance.</p>
                            <p>The constructor already takes care of loading all types of show data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Show methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            myShow.loadFullObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myShow = new Show( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                       loadFullObject: async function(data) {
                            try {
                                this.name = data.name;
                                this.available_markets = data.available_markets;
                                this.copyrights = data.copyrights;
                                this.description = data.description;
                                this.explicit = data.explicit;
                                this.episodes = data.episodes;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.images = data.images;
                                this.is_externally_hosted = data.is_externally_hosted;
                                this.languages = data.languages;
                                this.media_type = data.media_type;
                                this.publisher = data.publisher;
                                this.uri = data.uri;
                                if (data.hasOwnProperty('episodes')) {
                                    if (typeof(data.episodes) == 'object' && data.episodes.hasOwnProperty('items')) {
                                        this.loadEpisodes(data.episodes.items);
                                    } else if (data.episodes instanceof Array) {
                                        this.loadEpisodes(data.episodes);
                                    }
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadSimplifiedObject.docs" :name="loadSimplifiedObject.name" :code="loadSimplifiedObject.code" :returns="loadSimplifiedObject.returns" :parameters="loadSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#show-object-simplified">Show Object (Simplified)</a> and saves it's properties to the Show Instance.</p>
                            <p>The constructor already takes care of loading all types of show data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Show methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            myShow.loadSimplifiedObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myShow = new Show( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadSimplifiedObject: async function(data) {
                            try {
                                this.name = data.name;
                                this.available_markets = data.available_markets;
                                this.copyrights = data.copyrights;
                                this.description = data.description;
                                this.explicit = data.explicit;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.images = data.images;
                                this.is_externally_hosted = data.is_externally_hosted;
                                this.languages = data.languages;
                                this.media_type = data.media_type;
                                this.publisher = data.publisher;
                                this.uri = data.uri;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadConditionally.docs" :name="loadConditionally.name" :code="loadConditionally.code" :returns="loadConditionally.returns" :parameters="loadConditionally.parameters">
                        <div slot="overview">
                            <p>Takes <span class="highlight">any show data</span> and saves it's properties to the Show Instance.</p>
                            <p>The constructor already takes care of loading all types of show data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Show methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            myShow.loadConditionally( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myShow = new Show( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadConditionally: function(data) {
                            try {
                                let properties = ['name', 'available_markets', 'copyrights', 'description', 'explicit', 'episodes', 'external_urls', 'href', 'images', 'is_externally_hosted', 'languages', 'media_type', 'publisher', 'uri'];
                                for (let i = 0; i &lt; properties.length; i++) {
                                    if (data.hasOwnProperty(properties[i])) {
                                        this[properties[i]] = data[properties[i]];
                                    }
                                }
                                if (data.hasOwnProperty('episodes')) {
                                    if (typeof(data.episodes) == 'object' && data.episodes.hasOwnProperty('items')) {
                                        this.loadEpisodes(data.episodes.items);
                                    } else if (data.episodes instanceof Array) {
                                        this.loadEpisodes(data.episodes);
                                    }
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadEpisodes.docs" :name="loadEpisodes.name" :code="loadEpisodes.code" :returns="loadEpisodes.returns" :parameters="loadEpisodes.parameters">
                        <div slot="overview">
                            <p>Helper function for loading episodes into internal <span class="highlight">Episodes</span> object.</p>
                            <p>You really shouldn't have any need to use this!</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // Helper Function only.
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadEpisodes: async function(episodes) {
                            try {
                                if (episodes instanceof Show.Episodes || episodes instanceof Array) {
                                    this._episodes.concat(episodes);
                                } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                                    this._episodes.push(episodes);
                                } else {
                                    throw new Error("Show.loadEpisodes: Invalid Parameter \"episodes\"");
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
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#show-object-full">Show Object (Full)</a> for this show.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );
                            
                            if ( myShow.containsSimplifiedObject() ) {
                                await myShow.retrieveFullObject();
                            }

                            console.log( 'Lanuages:', myShow.languages.join(',') );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteShow = '2mTUnDkuKUkhiueKcVWoP0';
                            var myShow = await Show.getShow( myFavoriteShow );

                            console.log( 'Lanuages:', ( await myShow.getSimplifiedObject() ).languages.join(',') );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveFullObject: async function() {
                            try {
                                let response = await Models.wrapperInstance.getShow(this.id);
                                await this.loadFullObject(response.body);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="retrieveEpisodes.docs" :name="retrieveEpisodes.name" :code="retrieveEpisodes.code" :returns="retrieveEpisodes.returns" :parameters="retrieveEpisodes.parameters">
                        <div slot="overview">
                            <p>Retrieves all episodes for this show.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // Helper Function only.
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveEpisodes: async function() {
                            try {
                                let options = { limit: 50, offset: 0 };
                                let response;
                                do {
                                    response = await Models.wrapperInstance.getShowEpisodes(this.id, options);
                                    await this.loadEpisodes(response.body.items);
                                    options.offset += 50;
                                } while (!(response.body.items.length &lt; 50));
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                </v-expansion-panels>
                <div slot="examples-content">
                    <highlight-code lang="javascript"><pre>
                    COMING SOON
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
    name: 'Show',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'Show', disabled: true },
        ],
        properties: {
            instance: [
                {name: "id", type: "String", description: "The Spotify ID for the show"},
                {name: "name", type: "String", description: "The name of the show"},
                {name: "available_markets", type: "Array", description: "A list of the countries in which the show can be played"},
                {name: "copyrights", type: "Array", description: "The copyright statements of the show"},
                {name: "description", type: "String", description: "A description of the show"},
                {name: "explicit", type: "Boolean", description: "Whether or not the show has explicit content"},
                {name: "episodes", type: "Object", description: "A list of the show’s episodes (Paging Object)"},
                {name: "external_urls", type: "Object", description: "Known external URLs for this show"},
                {name: "href", type: "String", description: "A link to the Web API endpoint providing full details of the show"},
                {name: "images", type: "Array", description: "The cover art for the show in various sizes"},
                {name: "is_externally_hosted", type: "Boolean", description: "True if all of the show’s episodes are hosted outside of Spotify’s CDN"},
                {name: "languages", type: "Array", description: "A list of the languages used in the show"},
                {name: "media_type", type: "String", description: "The media type of the show"},
                {name: "publisher", type: "String", description: "The publisher of the show"},
                {name: "uri", type: "String", description: "The Spotify URI for the show"},
                {name: "isLiked", type: "Function", description: "Returns whether a show is saved to the user's library"},
                {name: "like", type: "Function", description: "Adds show to the user's library"},
                {name: "unlike", type: "Function", description: "Removes show from the user's library"},
                {name: "getFullObject", type: "Function", description: "Returns full show data. Retrieves from Spotify API if nessisary"},
                {name: "getSimplifiedObject", type: "Function", description: "Returns simplified show data. Retrieves from Spotify API if nessisary"},
                {name: "getCurrentData", type: "Function", description: "Just returns whatever the show object currently holds"},
                {name: "getEpisodes", type: "Function", description: "Returns Episodes object of show's episodes"},
                {name: "getAllEpisodes", type: "Function", description: "Returns Episodes object of all show's episodes"},
                {name: "containsFullObject", type: "Function", description: "Returns boolean whether full object data is present"},
                {name: "containsSimplifiedObject", type: "Function", description: "Returns boolean whether simplified object data is present"},
                {name: "retrieveFullObject", type: "Function", description: "Retrieves full show data from Spotify API"},
                {name: "retrieveEpisodes", type: "Function", description: "Retrieves all episodes in show from Spotify API"},
                {name: "loadFullObject", type: "Function", description: "Sets full data (outside constructor)"},
                {name: "loadSimplifiedObject", type: "Function", description: "Sets simplified data (outside constructor)"},
                {name: "loadConditionally", type: "Function", description: "Sets any show data (outside constructor)"},
                {name: "loadEpisodes", type: "Function", description: "Helper method to add episodes to shows's internal Episodes item"}
            ],
            static: [
                {name: "Show.prototype", type: "Object", description: "Instance of Show"},
                {name: "Show.getShow", type: "Function", description: "Returns Show instance of ID"},
                {name: "Show.addMethods", type: "Function", description: "Adds methods to show prototype"},
                {name: "Show.override", type: "Function", description: "Overrides methods in show prototype"},
                {name: "Show.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Show.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Show(data)",
            returns: "Show",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Data to be preloaded. Must either be a string of the Show ID or contain an `id` property."},
            ],
        },
        getShow: {
            name: "Get Show",
            docs: "https://developer.spotify.com/documentation/web-api/reference/shows/get-a-show/",
            code: "Show.getShow(showId)",
            returns: "Show",
            parameters: [
                {name: "showId", types: ["String"], optional: false, description: "Show Spotify ID."},
            ],
        },
        play: {
            name: "Play Show",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/",
            code: "play(options)",
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
            name: "Is Show Liked?",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-shows/",
            code: "isLiked()",
            returns: "Boolean",
            parameters: [
            ],
        },
        like: {
            name: "Like Show",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/save-shows-user/",
            code: "like()",
            returns: "Object",
            parameters: [
            ],
        },
        unlike: {
            name: "Unlike Show",
            docs: "https://developer.spotify.com/documentation/web-api/reference/library/remove-shows-user/",
            code: "unlike()",
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
            docs: "https://developer.spotify.com/documentation/web-api/reference/shows/get-a-show/",
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
        getEpisodes: {
            name: "Get Show Episodes",
            docs: "https://developer.spotify.com/documentation/web-api/reference/shows/get-shows-episodes/",
            code: "getEpisodes(options)",
            returns: "Episodes",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional Options."},
            ],
            options: [
                {name: "limit", types: ["Number"], description: "Number of episodes to retrieve (Minimum: 1, Max: 50).", default: "20"},
                {name: "offset", types: ["Number"], description: "The index of the first episode to return.", default: "0"},
                {name: "market", types: ["String"], description: "Country code (ISO code).", default: "from_token"},
            ],
        },
        getAllEpisodes: {
            name: "Get All Show Episodes",
            docs: "https://developer.spotify.com/documentation/web-api/reference/shows/get-shows-episodes/",
            code: "getAllEpisodes()",
            returns: "Episodes",
            parameters: [
            ],
        },
        retrieveFullObject: {
            name: "Retrieve Full Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/shows/get-a-show/",
            code: "retrieveFullObject()",
            returns: "void",
            parameters: [
            ],
        },
        retrieveEpisodes: {
            name: "Retrieve All Episodes",
            docs: "https://developer.spotify.com/documentation/web-api/reference/shows/get-shows-episodes/",
            code: "retrieveEpisodes()",
            returns: "void",
            parameters: [
            ],
        },
        loadFullObject: {
            name: "Load Full Object",
            code: "loadFullObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with show full object data."},
            ],
        },
        loadSimplifiedObject: {
            name: "Load Simplified Object",
            code: "loadSimplifiedObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with show simplified object data."},
            ],
        },
        loadConditionally: {
            name: "Load Conditionally",
            code: "loadConditionally(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object"], optional: false, description: "Object with any show data."},
            ],
        },
        loadEpisodes: {
            name: "Load Episodes",
            code: "loadEpisodes(episodes)",
            returns: "void",
            parameters: [
                {name: "episodes", types: ["Episodes", "Array", "Episode", "Object", "String"], optional: false, description: "Episodes to be added."},
            ],
        }
    }),
}
</script>