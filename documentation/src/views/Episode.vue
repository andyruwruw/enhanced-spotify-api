<template>
    <div class="Episode">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Episode Class</h1>
            <p>The <span class="highlight">Episode</span> class is used to maintain and retrieve data from Spotify's API for a given episode.</p>
            <p>If you are handling <span class="highlight">multiple episodes</span>, use the <a href="http://EnhancedSpotifyAPI.com/container/episodes">Episodes</a> container class for better efficiency and functionality.</p>
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
                    var Episode = EnhancedSpotifyAPI.Episode;
                    </pre></highlight-code>
                    <p>Or just the Episode class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { Episode } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    Episode.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>Creating a new <span class="highlight">Episode</span> instance requires the passing in of a <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify Episode ID</a>.</p>
                    <p>You have the choice of either passing in the ID directly:</p>
                    <highlight-code lang="javascript"><pre>
                    // String as a Parameter
                    var myFavoriteEpisode = '0C2se8cWO7WDgPXSxms4kv';
                    var myEpisode = new Episode( myFavoriteEpisode );
                    </pre></highlight-code>
                    <p>Or as a property within an object:</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter
                    var myFavoriteEpisode = {
                        id: "0C2se8cWO7WDgPXSxms4kv"
                    };
                    var myEpisode = new Episode( myFavoriteEpisode );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Pre-Loading Data</h2>
                    <p>If you've already retrieved some episode data, you can pass it into the constructor to be pre-loaded.</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter with Additional Data
                    var myFavoriteEpisode = {
                        id: "0C2se8cWO7WDgPXSxms4kv",
                        name: "Saturday, April 11, 2020",
                        // Some other good stuff
                    };
                    var myEpisode = new Episode( myFavoriteEpisode );
                    </pre></highlight-code>
                    <p>The data will be loaded in if it is valid to the episode object.</p>
                    <p>Episode instances will only make requests if the needed data is absent. Passing in what you have at construction could save you from unnessisary requests.</p>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Working with Instances</h2>
                    <p>Once you have a Episode instance, you can work with any of its member functions!</p>
                    <highlight-code lang="javascript"><pre>
                    // ...Creating new instance.
                    var myEpisode = new Episode( myFavoriteEpisode );

                    console.log( "Episode:", ( await myEpisode.getFullObject() ).name );

                    var show = await myEpisode.getShow();

                    var episodes = await show.getAllEpisodes();
                    </pre></highlight-code>
                    <p>Continue to the next tab to see all available methods.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Episode</span> class.</p>
                            <p>The new instance will represent that episode for all subsequent member functions called.</p>
                            <p>If you've loaded any data on the episode prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = '0C2se8cWO7WDgPXSxms4kv';
                            var myEpisode = new Episode( myFavoriteEpisode );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = {
                                id: "0C2se8cWO7WDgPXSxms4kv",
                            };
                            var myEpisode = new Episode( myFavoriteEpisode );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = {
                                id: "0C2se8cWO7WDgPXSxms4kv",
                                name: "Saturday, April 11, 2020",
                            };
                            var myEpisode = new Episode( myFavoriteEpisode );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Episode}
                        </pre>
                        <pre slot="src">
                        function Episode(data) {
                            try {
                                if (typeof(data) == 'string') {
                                    this.id = data;
                                } else if (typeof(data) == 'object') {
                                    if ('id' in data) {
                                        this.id = data.id; 
                                    } else {
                                        throw new Error("Episode.constructor: No ID Provided");
                                    }
                                    this.loadConditionally(data);
                                } else {
                                    throw new Error("Episode.constructor: Invalid Data");
                                }
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getEpisode.docs" :staticMethod="true" :name="getEpisode.name" :code="getEpisode.code" :returns="getEpisode.returns" :parameters="getEpisode.parameters">
                        <div slot="overview">
                            <p>Creates new instance of <span class="highlight">Episode</span> class.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/episodes/get-an-episode/">Get an Episode</a>, except it returns an instance of the Episode class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrieveFullObject</span>.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = '0C2se8cWO7WDgPXSxms4kv';
                            var myEpisode = await Episode.getEpisode( myFavoriteEpisode );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Episode}
                        </pre>
                        <pre slot="src">
                        Episode.getEpisode = async function(episodeId) {
                            try {
                                let response = await Models.wrapperInstance.getEpisode(episodeId);
                                return new Models.Episode(response.body);
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
                            <p>Plays episode on user's current playback device.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = await Episode.getEpisode( myFavoriteEpisode );
                            var response = myEpisode.play();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object} Response from Request
                        </pre>
                        <pre slot="src">
                        play: async function(options) {
                            try {
                                let _options = options ? options : {};
                                _options.uris = [ 'spotify:episode:' + this.id ];
                                return await Models.wrapperInstance.play(_options);
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
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#episode-object-full">Episode Object (Full)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = await Episode.getEpisode( myFavoriteEpisode );
                            console.log( await myEpisode.getFullObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                            {
                                id: String,
                                name: String,
                                audio_preview_url: String,
                                description: String,
                                duration_ms: Number,
                                explicit: Boolean,
                                external_urls: Object,
                                href: String,
                                images: Array,
                                is_externally_hosted: Boolean,
                                is_playable: Boolean,
                                languages: Array,
                                release_date: String,
                                release_date_precision: String,
                                show: Object,
                                uri: String,
                                type: String,
                                resume_point: Object, // Conditional
                                language: String, // Depreciated
                            }
                        </pre>
                        <pre slot="src">
                        getFullObject: async function() {
                            try {
                                if (!(await this.containsFullObject())) {
                                    await this.retrieveFullObject();
                                }
                                let result = {
                                    id: this.id,
                                    name: this.name,
                                    audio_preview_url: this.audio_preview_url,
                                    description: this.description,
                                    duration_ms: this.duration_ms,
                                    explicit: this.explicit,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    images: this.images,
                                    is_externally_hosted: this.is_externally_hosted,
                                    is_playable: this.is_playable,
                                    languages: this.languages,
                                    release_date: this.release_date,
                                    release_date_precision: this.release_date_precision,
                                    show: this.show,
                                    uri: this.uri,
                                    type: "episode",
                                };
                                if (this.resume_point != null) {
                                    result.resume_point = this.resume_point;
                                }
                                if (this.language != null) {
                                    result.language = this.language;
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
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#episode-object-simplified">Episode Object (Simplified)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = await Episode.getEpisode( myFavoriteEpisode );
                            console.log( await myEpisode.getSimplifiedObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                            {
                                id: String,
                                name: String,
                                audio_preview_url: String,
                                description: String,
                                duration_ms: Number,
                                explicit: Boolean,
                                external_urls: Object,
                                href: String,
                                images: Array,
                                is_externally_hosted: Boolean,
                                is_playable: Boolean,
                                languages: Array,
                                release_date: String,
                                release_date_precision: String,
                                uri: String,
                                type: String,
                                resume_point: Object, // Conditional
                                language: String, // Depreciated
                            }
                        </pre>
                        <pre slot="src">
                        getSimplifiedObject: async function() {
                            try {
                                if (!(await this.containsSimplifiedObject())) {
                                    await this.retrieveFullObject();
                                }
                                let result = {
                                    id: this.id,
                                    name: this.name,
                                    audio_preview_url: this.audio_preview_url,
                                    description: this.description,
                                    duration_ms: this.duration_ms,
                                    explicit: this.explicit,
                                    external_urls: this.external_urls,
                                    href: this.href,
                                    images: this.images,
                                    is_externally_hosted: this.is_externally_hosted,
                                    is_playable: this.is_playable,
                                    languages: this.languages,
                                    release_date: this.release_date,
                                    release_date_precision: this.release_date_precision,
                                    uri: this.uri,
                                    type: 'episode',
                                };
                                if (this.resume_point != null) {
                                    result.resume_point = this.resume_point;
                                }
                                if (this.language != null) {
                                    result.language = this.language;
                                }
                                return result;
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
                            <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the Episode instance.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = {
                                id: '3yoZOYghBerMYUb8bnowAO',
                                name: 'Would You Drink a Mug of Human Oil? - #592'
                            };
                            var myEpisode = await Episode.getEpisode( myFavoriteEpisode );
                            console.log( "Just give me what ya got");
                            console.log( myEpisode.getCurrentData() );
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
                                let data = { id: this.id, type: 'episode' };
                                let properties = ['name', 'audio_preview_url', 'description', 'duration_ms', 'explicit', 'external_urls', 'href', 'images', 'is_externally_hosted', 'is_playable', 'language', 'languages', 'release_date', 'release_date_precision', 'resume_point', 'uri'];
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
                    <MethodListItem :docs="getShow.docs" :name="getShow.name" :code="getShow.code" :returns="getShow.returns" :parameters="getShow.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Show</span> instance of the episode's show.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = await Episode.getEpisode( myFavoriteEpisode );
                            var show = await myEpisode.getShow();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Show}
                        </pre>
                        <pre slot="src">
                        getShow: async function() {
                            try {
                                if (!(await this.containsFullObject())) {
                                    await this.retrieveFullObject();
                                }
                                return new Models.Show(this.show);
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
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#episode-object-full">Episode Object (Full)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteEpisode );
                            
                            if ( myEpisode.containsFullObject() ) {
                                await myEpisode.retrieveFullObject();
                            }

                            console.log( 'Episode Show:', myEpisode.show.name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteEpisode );

                            console.log( 'Episode Show:', ( await myEpisode.getFullObject() ).show.name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsFullObject: function() {
                            return ((this.name != null) && (this.audio_preview_url != null) && (this.description != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.is_externally_hosted != null) && (this.is_playable != null) && (this.languages != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.show) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsSimplifiedObject.docs" :name="containsSimplifiedObject.name" :code="containsSimplifiedObject.code" :returns="containsSimplifiedObject.returns" :parameters="containsSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#episode-object-simplified">Episode Object (Simplified)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteEpisode );
                            
                            if ( myEpisode.containsSimplifiedObject() ) {
                                await myEpisode.retrieveFullObject();
                            }

                            console.log( 'Episode:', myEpisode.name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteEpisode );

                            console.log( 'Episode:', ( await myEpisode.getFullObject() ).name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsSimplifiedObject: function() {
                            return ((this.name != null) && (this.audio_preview_url != null) && (this.description != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.is_externally_hosted != null) && (this.is_playable != null) && (this.languages != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Load Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="loadFullObject.docs" :name="loadFullObject.name" :code="loadFullObject.code" :returns="loadFullObject.returns" :parameters="loadFullObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#episode-object-full">Episode Object (Full)</a> and saves it's properties to the Episode Instance.</p>
                            <p>The constructor already takes care of loading all types of episode data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Episode methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteTrack );
                            myEpisode.loadFullObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myEpisode = new Episode( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadFullObject: function(data) {
                            try {
                                this.name = data.name;
                                this.audio_preview_url = data.audio_preview_url;
                                this.description = data.description;
                                this.duration_ms = data.duration_ms;
                                this.explicit = data.explicit;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.images = data.images;
                                this.is_externally_hosted = data.is_externally_hosted;
                                this.is_playable = data.is_playable;
                                this.language = data.language;
                                this.languages = data.languages;
                                this.release_date = data.release_date;
                                this.release_date_precision = data.release_date_precision;
                                this.resume_point = data.resume_point;
                                this.show = data.show;
                                this.uri = data.uri;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadSimplifiedObject.docs" :name="loadSimplifiedObject.name" :code="loadSimplifiedObject.code" :returns="loadSimplifiedObject.returns" :parameters="loadSimplifiedObject.parameters">
                        <div slot="overview">
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#episode-object-simplified">Episode Object (Simplified)</a> and saves it's properties to the Episode Instance.</p>
                            <p>The constructor already takes care of loading all types of episode data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Episode methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteTrack );
                            myEpisode.loadSimplifiedObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myEpisode = new Episode( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadSimplifiedObject: function(data) {
                            try {
                                this.name = data.name;
                                this.audio_preview_url = data.audio_preview_url;
                                this.description = data.description;
                                this.duration_ms = data.duration_ms;
                                this.explicit = data.explicit;
                                this.external_urls = data.external_urls;
                                this.href = data.href;
                                this.images = data.images;
                                this.is_externally_hosted = data.is_externally_hosted;
                                this.is_playable = data.is_playable;
                                this.language = data.language;
                                this.languages = data.languages;
                                this.release_date = data.release_date;
                                this.release_date_precision = data.release_date_precision;
                                this.resume_point = data.resume_point;
                                this.uri = data.uri;
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadConditionally.docs" :name="loadConditionally.name" :code="loadConditionally.code" :returns="loadConditionally.returns" :parameters="loadConditionally.parameters">
                        <div slot="overview">
                            <p>Takes <span class="highlight">any episode data</span> and saves it's properties to the Episode Instance.</p>
                            <p>The constructor already takes care of loading all types of episode data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own Episode methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteTrack );
                            myEpisode.loadConditionally( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myEpisode = new Episode( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        loadConditionally: function(data) {
                            try {
                                let properties = ["name", "audio_preview_url", "description", "duration_ms", "explicit", "external_urls", "href", "images", "is_externally_hosted", "is_playable", "language", "languages", "release_date", "release_date_precision", "resume_point", "show", "uri"];
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
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#episode-object-full">Episode Object (Full)</a> for this episode.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteEpisode );
                            
                            if ( myEpisode.containsFullObject() ) {
                                await myEpisode.retrieveFullObject();
                            }

                            console.log( 'Episode Show:', myEpisode.show.name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFavoriteEpisode = '3yoZOYghBerMYUb8bnowAO';
                            var myEpisode = new Episode( myFavoriteEpisode );

                            console.log( 'Episode Show:', ( await myEpisode.getFullObject() ).show.name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrieveFullObject: async function() {
                            try {
                                let response = await Models.wrapperInstance.getEpisode(this.id);
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
    name: 'Episode',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'Episode', disabled: true },
        ],
        properties: {
            instance: [
                {name: "id", type: "String", description: "The Spotify ID for the track"},
                {name: "name", type: "String", description: "The name of the track"},
                {name: "audio_preview_url", type: "String", description: "A URL to a 30 second preview (MP3 format) of the episode"},
                {name: "description", type: "String", description: "A description of the episode"},
                {name: "duration_ms", type: "Number", description: "The episode length in milliseconds"},
                {name: "explicit", type: "Boolean", description: "Whether or not the episode has explicit content"},
                {name: "external_urls", type: "Object", description: "External URLs for this episode"},
                {name: "href", type: "String", description: "A link to the Web API endpoint providing full details"},
                {name: "images", type: "Array", description: "Images of the episode in various sizes, widest first"},
                {name: "is_externally_hosted", type: "Boolean", description: "True if the episode is hosted outside of Spotify’s CDN"},
                {name: "is_playable", type: "Boolean", description: "True if the episode is playable in the given market"},
                {name: "language", type: "String", description: "This field is deprecated and might be removed in the future"},
                {name: "languages", type: "Array", description: "A list of the languages used in the episode (ISO code)"},
                {name: "release_date", type: "String", description: "The date the episode was first released"},
                {name: "release_date_precision", type: "String", description: "The precision with which release_date value is known"},
                {name: "resume_point", type: "Object", description: "The user’s most recent position in the episode"},
                {name: "show", type: "Object", description: "The show on which the episode appears"},
                {name: "uri", type: "String", description: "The Spotify URI for the episode"},
                {name: "play", type: "Function", description: "Plays episode on user's active device"},
                {name: "containsFullObject", type: "Function", description: "Returns boolean whether full object data is present"},
                {name: "containsSimplifiedObject", type: "Function", description: "Returns boolean whether simplified object data is present"},
                {name: "getFullObject", type: "Function", description: "Returns full episode data. Retrieves from Spotify API if necessary"},
                {name: "getSimplifiedObject", type: "Function", description: "Returns simplified episode data. Retrieves from Spotify API if necessary"},
                {name: "getCurrentData", type: "Function", description: "Just returns whatever the episode object currently holds"},
                {name: "getShow", type: "Function", description: "Returns Show instance for episode show"},
                {name: "loadFullObject", type: "Function", description: "Sets full data (outside constructor)"},
                {name: "loadSimplifiedObject", type: "Function", description: "Sets simplified data (outside constructor)"},
                {name: "loadConditionally", type: "Function", description: "Sets any episode data (outside constructor)"},
                {name: "retrieveFullObject", type: "Function", description: "Retrieves full episode data from Spotify API"},
            ],
            static: [
                {name: "Episode.prototype", type: "Object", description: "Instance of Episode"},
                {name: "Episode.getEpisode", type: "Function", description: "Returns Episode instance of ID"},
                {name: "Episode.addMethods", type: "Function", description: "Adds methods to episode prototype"},
                {name: "Episode.override", type: "Function", description: "Overrides methods in episode prototype"},
                {name: "Episode.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "Episode.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Episode(data)",
            returns: "Episode",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Data to be preloaded. Must either be a string of the Episode ID or contain an `id` property."},
            ],
        },
        play: {
            name: "Play Episode",
            code: "play()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/",
            returns: "Object",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options"},
            ],
            options: [
                {name: "position_ms", types: ["Number"], description: "Position to start playback (Milliseconds).", default: "0"},
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
            docs: "https://developer.spotify.com/documentation/web-api/reference/episodes/get-an-episode/",
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
        getShow: {
            name: "Get Show",
            code: "getShow()",
            returns: "Show",
            parameters: [
            ],
        },
        loadFullObject: {
            name: "Load Full Object",
            code: "loadFullObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Object with episode full object data."},
            ],
        },
        loadSimplifiedObject: {
            name: "Load Simplified Object",
            code: "loadSimplifiedObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Object with episode simplified object data."},
            ],
        },
        loadConditionally: {
            name: "Load Conditionally",
            code: "loadConditionally(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Object with any episode data."},
            ],
        },
        retrieveFullObject: {
            name: "Retrieve Full Object",
            docs: "https://developer.spotify.com/documentation/web-api/reference/episodes/get-an-episode/",
            code: "retrieveFullObject()",
            returns: "void",
            parameters: [
            ],
        },
        getEpisode: {
            name: "Get Episode",
            docs: "https://developer.spotify.com/documentation/web-api/reference/episodes/get-an-episode/",
            code: "Episode.getEpisode(episodeID)",
            returns: "Episode",
            parameters: [
                {name: "episodeID", types: ["String"], optional: false, description: "ID of Episode."}
            ],
        },
    }),
}
</script>