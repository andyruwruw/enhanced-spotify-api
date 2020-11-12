<template>
    <div class="User page-content">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div style="padding-left: 24px">
            <h1 class="display-1">User Class</h1>
            <p>The <span class="highlight">User</span> class is used to maintain and retrieve data from Spotify's API for a given user.</p>
            <p>There is no container class for the user class, given that there are no endpoints for the retrieval of multiple users.</p>
            <DataObject :properties="properties" style="margin-top: 30px;">
                <div slot="overview-content">
                    <h3 class="headline" style="margin-top: 12px">Importing User Class</h3>
                    <highlight-code lang="javascript"><pre>
                   var EnhancedSpotifyAPI = require( 'enhanced-spotify-api' );
                    var User = EnhancedSpotifyAPI.User;
                    // Or
                    var { User } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h3 class="headline" style="margin-top: 12px">What does it do?</h3>
                    <p>The <code>User</code> Data Access Object is used to maintain and retrieve data from <a href="https://developer.spotify.com/documentation/web-api">Spotify's API</a> for a given user.</p>
                    <ul>
                        <li class="subtitle-1">Member functions for all user endpoints.</li>
                        <li class="subtitle-1">Automatic retrieval of data (if needed).</li>
                        <li class="subtitle-1">Retrieves data in as few requests as possible!</li>
                    </ul>
                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h3 class="headline" style="margin-top: 32px">Let's do this.</h3>
                    <p>You can either create your own <code>User</code> objects, or use <code>User</code> static methods to create instances.</p>
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
                    var User = EnhancedSpotifyAPI.User;
                    </pre></highlight-code>
                    <p>Or just the User class:</p>
                    <highlight-code lang="javascript"><pre>
                    var { User } = require( 'enhanced-spotify-api' );
                    </pre></highlight-code>
                    <p>From either, pass in your access token to authorize requests.</p>
                    <highlight-code lang="javascript"><pre>
                    EnhancedSpotifyAPI.setAccessToken( token );
                    // or
                    User.setAccessToken( token );
                    </pre></highlight-code>

                    <v-divider style="margin: 30px 0px;"></v-divider>
                    <h2 class="display-1">Creating New Instances</h2>
                    <p>Creating a new <span class="highlight">User</span> instance requires the passing in of a <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify User ID</a>.</p>
                    <p>You have the choice of either passing in the ID directly:</p>
                    <highlight-code lang="javascript"><pre>
                    // String as a Parameter
                    var friendID = '1280297326';
                    var myFriend = new User( myFriend );
                    </pre></highlight-code>
                    <p>Or as a property within an object:</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter
                    var friend = {
                        id: '1280297326'
                    };
                    var myFriend = new User( myFriend );
                    </pre></highlight-code>

                    <v-divider style="margin: 40px 0px;"></v-divider>
                    <h2 class="display-1">Pre-Loading Data</h2>
                    <p>If you've already retrieved some user data, you can pass it into the constructor to be pre-loaded.</p>
                    <highlight-code lang="javascript"><pre>
                    // Object as a Parameter with Additional Data
                    var friend = {
                        id: '1280297326',
                        name: 'Chris Tabaska',
                        // Some other good stuff
                    };
                    var myFriend = new User( friend );
                    </pre></highlight-code>
                    <p>The data will be loaded in if it is valid to the user object.</p>
                    <p>User instances will only make requests if the needed data is absent. Passing in what you have at construction could save you from unnessisary requests.</p>
                </div>
                <v-expansion-panels accordion multiple slot="methods-content">
                    <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                        <div slot="overview"> 
                            <p>Creates new instance of <span class="highlight">User</span> class.</p>

                            <p>The new instance will represent that user for all subsequent member functions called.</p>

                            <p>If you've loaded any data on the user prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friendID = '1280297326';
                            var myFriend = new User( myFriend );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                           var friend = {
                                id: '1280297326'
                            };
                            var myFriend = new User( myFriend );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                           var friend = {
                                id: '1280297326',
                                name: 'Chris Tabaska',
                                // Some other good stuff
                            };
                            var myFriend = new User( friend );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {User}
                        </pre>
                        <pre slot="src">
                        function User(data) {
                            try {
                                if (typeof(data) == 'string') {
                                    this.id = data;
                                } else if (typeof(data) == 'object') {
                                    if (data.hasOwnProperty('id')) {
                                        this.id = data.id; 
                                    } else {
                                        throw new Error("User.constructor: No ID Provided");
                                    }
                                    this.loadConditionally(data);
                                } else {
                                    throw new Error("User.constructor: Invalid Data");
                                }
                            } catch (error) {
                                throw error;
                            }
                        }
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getMe.docs" :staticMethod="true" :name="getMe.name" :code="getMe.code" :returns="getMe.returns" :parameters="getMe.parameters">
                        <div slot="overview"> 
                            <p>Creates new instance of <span class="highlight">User</span> class of current user.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/">Get Current User's Profile</a>, except it returns an instance of the User class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrievePrivateObject</span></p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myProfile = await User.getMe();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {User}
                        </pre>
                        <pre slot="src">
                        User.getMe = async function() {
                            try {
                                let response = await Models.wrapperInstance.getMe();
                                return new Models.User(response.body);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getUser.docs" :staticMethod="true" :name="getUser.name" :code="getUser.code" :returns="getUser.returns" :parameters="getUser.parameters">
                        <div slot="overview"> 
                            <p>Creates new instance of <span class="highlight">User</span> class.</p>
                            <p>Resembles the Spotify endpoint <a href="https://developer.spotify.com/documentation/web-api/reference/users-profile/get-users-profile/">Get User's Profile</a>, except it returns an instance of the User class.</p>
                            <p>This is the equivolent of using the <span class="highlight">Constructor</span> and then running <span class="highlight">retrievePublicObject</span></p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friendID = '1280297326';
                            var myFriend = await User.getUser( myFriend );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {User}
                        </pre>
                        <pre slot="src">
                        User.getUser = async function(userID) {
                            try {
                                let response = await Models.wrapperInstance.getUser(userID);
                                return new Models.User(response.body);
                            } catch (error) {
                                throw error;
                            }
                        };
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Me</v-subheader>
                    </v-row>
                    <MethodListItem :docs="isMe.docs" :name="isMe.name" :code="isMe.code" :returns="isMe.returns" :parameters="isMe.parameters">
                        <div slot="overview"> 
                            <p>Returns <span class="highlight">Boolean</span> whether or not user instance is current user.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var friendID = '1280297326';
                            var myFriend = new User( myFriend );
                            if ( !await myFriend.isMe() ) {
                                console.log( 'This isn't me!' );
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        isMe: async function() {
                            try {
                                if (this.meStatus == null) {
                                    let response = await Models.wrapperInstance.getMe();
                                    this.meStatus = (response.body.id == this.id);
                                } 
                                return this.meStatus;
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
                            <p>Returns <span class="highlight">Boolean</span> whether or not user is followed by current user.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friendID = '1280297326';
                            var myFriend = new User( myFriend );
                            if ( !await myFriend.isFollowed() ) {
                                var response = await myFriend.follow();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        isFollowed: async function() {
                            try {
                                let response = await Models.wrapperInstance.isFollowingUsers([this.id]);
                                return response.body[0];
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="follow.docs" :name="follow.name" :code="follow.code" :returns="follow.returns" :parameters="follow.parameters">
                        <div slot="overview"> 
                            <p>Follows user.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friendID = '1280297326';
                            var myFriend = new User( myFriend );
                            if ( !await myFriend.isFollowed() ) {
                                var response = await myFriend.follow();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                        </pre>
                        <pre slot="src">
                        follow: async function() {
                            try {
                                return await Models.wrapperInstance.followUsers([this.id]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="unfollow.docs" :name="unfollow.name" :code="unfollow.code" :returns="unfollow.returns" :parameters="unfollow.parameters">
                        <div slot="overview"> 
                            <p>Unfollows user.</p>
                            <p>Returns the response from the request.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friendID = '1280297326';
                            var myFriend = new User( myFriend );
                            if ( await myFriend.isFollowed() ) {
                                var response = await myFriend.unfollow();
                            }
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                        </pre>
                        <pre slot="src">
                        unfollow: async function() {
                            try {
                                return await Models.wrapperInstance.unfollowUsers([this.id]);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="getPrivateObject.docs" :name="getPrivateObject.name" :code="getPrivateObject.code" :returns="getPrivateObject.returns" :parameters="getPrivateObject.parameters">
                        <div slot="overview"> 
                            <p>Only valid if <span class="highlight">User instance is current user.</span> Use <span class="highlight">Is Me?</span> method.</p>
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-private">User Object (Private)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            var myProfile = await User.getMe();
                            console.log( await myFriend.getPrivateObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                            {
                                id: String,
                                display_name: String,
                                external_urls: Object,
                                followers: Object,
                                href: String,
                                images: Array,
                                uri: String,
                                country: String,
                                email: String,
                                product: String,
                                type: String,
                            }
                        </pre>
                        <pre slot="src">
                        getPrivateObject: async function() {
                            try {
                                if (!(await this.containsPrivateObject())) {
                                    await this.retrievePrivateObject();
                                }
                                return {
                                    id: this.id,
                                    display_name: this.display_name,
                                    external_urls: this.external_urls,
                                    followers: this.followers,
                                    href: this.href,
                                    images: this.images,
                                    uri: this.uri,
                                    country: this.country,
                                    email: this.email,
                                    product: this.product,
                                    type: 'user',
                                };
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getPublicObject.docs" :name="getPublicObject.name" :code="getPublicObject.code" :returns="getPublicObject.returns" :parameters="getPublicObject.parameters">
                        <div slot="overview"> 
                            <p>Returns <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-public">User Object (Public)</a>. Retrieves from Spotify API if necessary.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friendID = '1280297326';
                            var myFriend = new User( myFriend );
                            console.log( await myFriend.getPublicObject() );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Object}
                            {
                                id: String,
                                display_name: String,
                                external_urls: Object,
                                followers: Object,
                                href: String,
                                images: Array,
                                uri: String,
                                type: String,
                            }
                        </pre>
                        <pre slot="src">
                        getPublicObject: async function() {
                            try {
                                if (!(await this.containsPublicObject())) {
                                    await this.retrievePublicObject();
                                }
                                return {
                                    id: this.id,
                                    display_name: this.display_name,
                                    external_urls: this.external_urls,
                                    followers: this.followers,
                                    href: this.href,
                                    images: this.images,
                                    uri: this.uri,
                                    type: 'user',
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
                            <p>Just <span class="highlight">return whatever has already been retrieved</span> and is currently in the User instance.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friend = {
                                id: '1280297326',
                                name: 'Chris Tabaska',
                            };
                            var myFriend = new User( friend );
                            console.log( "Just give me what ya got");
                            console.log( myFriend.getCurrentData() );
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
                                let data = { id: this.id, type: 'user' };
                                let properties = ['display_name', 'external_urls', 'followers', 'href', 'images', 'uri', 'country', 'email', 'product'];
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
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/playlists">Playlists</a> container instance of the user's playlists.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friendID = '1280297326';
                            var myFriend = new User( myFriend );

                            var hisPlaylists = await myFriend.getPlaylists();
                            await hisPlaylists.follow();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Playlists}
                        </pre>
                        <pre slot="src">
                            getPlaylists: async function(options) {
                                try {
                                    if (await this.isMe()) {
                                        return await Models.Playlists.getMyPlaylists(options);
                                    } else {
                                        return await Models.Playlists.getUserPlaylists(this.id, options);
                                    }
                                } catch (error) {
                                    throw error;
                                }
                            },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="getAllPlaylists.docs" :name="getAllPlaylists.name" :code="getAllPlaylists.code" :returns="getAllPlaylists.returns" :parameters="getAllPlaylists.parameters">
                        <div slot="overview"> 
                            <p>Returns <a href="http://enhancedspotifyapi.com/container/playlists">Playlists</a> container instance of all the user's playlists.</p>
                            <p>This method retrieves all the user's playlists with as many requests as it takes (Limited to 50 playlists per request by Spotify).</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                           var friendID = '1280297326';
                            var myFriend = new User( myFriend );

                            var hisPlaylists = await myFriend.getAllPlaylists();
                            var tracks = await hisPlaylists.getTracks();
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Playlists}
                        </pre>
                        <pre slot="src">
                        getAllPlaylists: async function() {
                            try {
                                if (await this.isMe()) {
                                    return await Models.Playlists.getAllMyPlaylists();
                                } else {
                                    return await Models.Playlists.getAllUserPlaylists(this.id);
                                }
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Retrieval Status</v-subheader>
                    </v-row>
                    <MethodListItem :docs="containsPrivateObject.docs" :name="containsPrivateObject.name" :code="containsPrivateObject.code" :returns="containsPrivateObject.returns" :parameters="containsPrivateObject.parameters">
                        <div slot="overview"> 
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-private">User Object (Private)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myProfile = await User.getMe();
                            
                            if ( myProfile.containsPrivateObject() ) {
                                await myProfile.retrievePrivateObject();
                            }

                            console.log( 'My Email:', myProfile.email );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myProfile = await User.getMe();

                            console.log( 'My Email:', ( await myProfile.getPrivateObject() ).email );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsPrivateObject: function() {
                            return ((this.country != null) && (this.email != null) && (this.product != null) && (this.display_name != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="containsPublicObject.docs" :name="containsPublicObject.name" :code="containsPublicObject.code" :returns="containsPublicObject.returns" :parameters="containsPublicObject.parameters">
                        <div slot="overview"> 
                            <p>Returns <span class="highlight">Boolean</span> whether <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-public">User Object (Public)</a> has been retrieved from Spotify API.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var friendID = '1280297326';
                            var myFriend = new User( friendID );
                            
                            if ( myFriend.containsPublicObject() ) {
                                await myFriend.retrievePublicObject();
                            }

                            console.log( 'My Friend:', myFriend.display_name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var friendID = '1280297326';
                            var myFriend = new User( friendID );

                            console.log( 'My Email:', ( await myFriend.getPublicObject() ).display_name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="return">
                            // @ returns {Boolean}
                        </pre>
                        <pre slot="src">
                        containsPublicObject: function() {
                            return ((this.display_name != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.uri != null));
                        },
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Load Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="loadPrivateObject.docs" :name="loadPrivateObject.name" :code="loadPrivateObject.code" :returns="loadPrivateObject.returns" :parameters="loadPrivateObject.parameters">
                        <div slot="overview"> 
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-private">User Object (Private)</a> and saves it's properties to the User Instance.</p>
                            <p>The constructor already takes care of loading all types of user data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own User methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myID = '12146574234';
                            var myProfile = new User( myID );
                            myProfile.loadPrivateObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myProfile = new User( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadPublicObject.docs" :name="loadPublicObject.name" :code="loadPublicObject.code" :returns="loadPublicObject.returns" :parameters="loadPublicObject.parameters">
                        <div slot="overview"> 
                            <p>Takes a <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-public">User Object (Public)</a> and saves it's properties to the User Instance.</p>
                            <p>The constructor already takes care of loading all types of user data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own User methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var friendID = '1280297326';
                            var myFriend = new User( friendID );
                            myFriend.loadPublicObject( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myFriend = new User( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="loadConditionally.docs" :name="loadConditionally.name" :code="loadConditionally.code" :returns="loadConditionally.returns" :parameters="loadConditionally.parameters">
                        <div slot="overview"> 
                            <p>Takes <span class="highlight">any user data</span> and saves it's properties to the User Instance.</p>
                            <p>The constructor already takes care of loading all types of user data.</p>
                            <p>You shouldn't have to ever use this unless you're writing your own User methods.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myID = '12146574234';
                            var myProfile = new User( myID );
                            myProfile.loadConditionally( alreadyRetrievedData );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myProfile = new User( alreadyRetrievedData );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        
                        </pre>
                    </MethodListItem>
                    <v-row style="margin-top: 18px">
                        <v-subheader>Retrieve Data</v-subheader>
                    </v-row>
                    <MethodListItem :docs="retrievePrivateObject.docs" :name="retrievePrivateObject.name" :code="retrievePrivateObject.code" :returns="retrievePrivateObject.returns" :parameters="retrievePrivateObject.parameters">
                        <div slot="overview"> 
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-private">User Object (Private)</a> for this user.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var myProfile = await User.getMe();
                            
                            if ( myProfile.containsPrivateObject() ) {
                                await myProfile.retrievePrivateObject();
                            }

                            console.log( 'My Email:', myProfile.email );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var myProfile = await User.getMe();

                            console.log( 'My Email:', ( await myProfile.getPrivateObject() ).email );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrievePrivateObject: async function() {
                            try {
                                let response = await Models.wrapperInstance.getMe();
                                if (response.body.id != this.id) {
                                    throw new Error("User.retrievePrivateObject: Cannot Retrieve Private Data for Non-Current User")
                                }
                                await this.loadPrivateObject(response.body);
                            } catch (error) {
                                throw error;
                            }
                        },
                        </pre>
                    </MethodListItem>
                    <MethodListItem :docs="retrievePublicObject.docs" :name="retrievePublicObject.name" :code="retrievePublicObject.code" :returns="retrievePublicObject.returns" :parameters="retrievePublicObject.parameters">
                        <div slot="overview"> 
                            <p>Retrieves the <a href="https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-public">User Object (Public)</a> for this user.</p>
                            <p>Does not check if the data is present yet.</p>
                            <p>Used mostly as a helper function.</p>
                        </div>
                        <div slot="example">
                            <highlight-code lang="javascript"><pre>
                            // This is bad practice and only used as an example.
                            // See the second example for how to properly implement this same code.
                            var friendID = '1280297326';
                            var myFriend = new User( friendID );
                            
                            if ( myFriend.containsPublicObject() ) {
                                await myFriend.retrievePublicObject();
                            }

                            console.log( 'My Friend:', myFriend.display_name );
                            </pre></highlight-code>
                            <highlight-code lang="javascript"><pre>
                            // Proper Example
                            var friendID = '1280297326';
                            var myFriend = new User( friendID );

                            console.log( 'My Email:', ( await myFriend.getPublicObject() ).display_name );
                            </pre></highlight-code>
                        </div>
                        <pre slot="src">
                        retrievePublicObject: async function() {
                            try {
                                let response = await Models.wrapperInstance.getUser(this.id);
                                await this.loadPublicObject(response.body);
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
    name: 'User',
    components: {
        DataObject,
        MethodListItem,
    },
    data: () => ({
        path: [
            { text: 'Classes', disabled: true },
            { text: 'User', disabled: true },
        ],
        properties: {
            instance: [
                {name: "id", type: "String", description: "The Spotify ID for the user"},
                {name: "display_name", type: "String", description: "Display name for the user."},
                {name: "external_urls", type: "Object", description: "Known external URLs for this user"},
                {name: "followers", type: "Object", description: "Information about the followers of the user"},
                {name: "href", type: "String", description: "A link to the Web API endpoint providing full details of the user"},
                {name: "images", type: "Array", description: "Images of the user"},
                {name: "uri", type: "String", description: "The Spotify URI for the user"},
                {name: "country", type: "String", description: "Country code (ISO)."},
                {name: "email", type: "String", description: "The user’s email address"},
                {name: "product", type: "String", description: "The user’s Spotify subscription level"},

                {name: "isMe", type: "Function", description: "Returns whether the user is current user"},
                {name: "isFollowed", type: "Function", description: "Returns whether the user is followed by the current user"},
                {name: "follow", type: "Function", description: "Follows the user"},
                {name: "unfollow", type: "Function", description: "Unfollows the user"},
                {name: "containsPrivateObject", type: "Function", description: "Returns boolean whether private object data is present"},
                {name: "containsPublicObject", type: "Function", description: "Returns boolean whether public object data is present"},
                {name: "getPrivateObject", type: "Function", description: "Returns private user data. Retrieves from Spotify API if necessary"},
                {name: "getPublicObject", type: "Function", description: "Returns public user data. Retrieves from Spotify API if necessary"},
                {name: "getCurrentData", type: "Function", description: "Just returns whatever the user object currently holds"},
                {name: "getPlaylists", type: "Function", description: "Returns Playlists instance of the user's playlists"},
                {name: "getAllPlaylists", type: "Function", description: "Returns Playlists instance of all the user's playlists"},
                {name: "loadPrivateObject", type: "Function", description: "Sets private data (outside constructor)"},
                {name: "loadPublicObject", type: "Function", description: "Sets public data (outside constructor)"},
                {name: "loadConditionally", type: "Function", description: "Sets any user data (outside constructor)"},
                {name: "retrievePrivateObject", type: "Function", description: "Retrieves private user data from Spotify API"},
                {name: "retrievePublicObject", type: "Function", description: "Retrieves public user data from Spotify API"},
            ],
            static: [
                {name: "User.prototype", type: "Object", description: "Instance of User"},
                {name: "User.getMe", type: "Function", description: "Returns User instance of current User"},
                {name: "User.getUser", type: "Function", description: "Returns User instance of ID"},
                {name: "User.addMethods", type: "Function", description: "Adds methods to User prototype"},
                {name: "User.override", type: "Function", description: "Overrides methods in User prototype"},
                {name: "User.setCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.getCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.resetCredentials", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.setClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.setClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.setAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.setRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.setRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.getRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.getClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.getClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.getAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.getRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.resetClientId", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.resetClientSecret", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.resetAccessToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.resetRefreshToken", type: "Function", description: "spotify-web-api-node function for authentication."},
                {name: "User.resetRedirectURI", type: "Function", description: "spotify-web-api-node function for authentication."},
            ]
        },
        constructor: {
            name: "Constructor",
            code: "new User(data)",
            returns: "User",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Data to be preloaded. Must either be a string of the User ID or contain an `id` property."},
            ],
        },
        isMe: {
            name: "Is Me?",
            code: "isMe()",
            returns: "Boolean",
            parameters: [],
        },
        isFollowed: {
            name: "Is User Followed?",
            code: "isFollowed()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/follow/check-current-user-follows/",
            returns: "Boolean",
            parameters: [],
        },
        follow: {
            name: "Follow User",
            code: "follow()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/",
            returns: "Object",
            parameters: [],
        },
        unfollow: {
            name: "Unfollow User",
            code: "unfollow()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-artists-users/",
            returns: "Object",
            parameters: [],
        },
        containsPrivateObject: {
            name: "Contains Private Object",
            code: "containsPrivateObject()",
            returns: "Boolean",
            parameters: [],
        },
        containsPublicObject: {
            name: "Contains Public Object",
            code: "containsPublicObject()",
            returns: "Boolean",
            parameters: [],
        },
        getPrivateObject: {
            name: "Get Private Object",
            code: "getPrivateObject()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/",
            returns: "Object",
            parameters: [],
        },
        getPublicObject: {
            name: "Get Public Object",
            code: "getPublicObject()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/users-profile/get-users-profile/",
            returns: "Object",
            parameters: [],
        },
        getCurrentData: {
            name: "Get Current Data",
            code: "getCurrentData()",
            returns: "Object",
            parameters: [],
        },
        getPlaylists: {
            name: "Get User Playlists",
            code: "getPlaylists(options)",
            returns: "Playlists",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/get-list-users-playlists/",
            parameters: [
                {name: "options", types: ["Object"], optional: true, description: "Additional options."},
            ],
            options: [
                {name: "limit", types: ["Number"], description: "Number of playlists to retrieve (Minimum: 1, Max: 50).", default: "20"},
                {name: "offset", types: ["Number"], description: "The index of the first playlists to return.", default: "0"},
            ],
        },
        getAllPlaylists: {
            name: "Get All User Playlists",
            code: "getAllPlaylists()",
            returns: "Playlists",
            docs: "https://developer.spotify.com/documentation/web-api/reference/playlists/get-list-users-playlists/",
            parameters: [],
        },
        loadPrivateObject: {
            name: "Load Private Object",
            code: "loadPrivateObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Object with user private object data."},
            ],
        },
        loadPublicObject: {
            name: "Load Public Object",
            code: "loadPublicObject(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Object with user public object data."},
            ],
        },
        loadConditionally: {
            name: "Load Conditionally",
            code: "loadConditionally(data)",
            returns: "void",
            parameters: [
                {name: "data", types: ["Object", "String"], optional: true, description: "Object with user data."},
            ],
        },
        retrievePrivateObject: {
            name: "Retrieve Private Object",
            code: "retrievePrivateObject()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/",
            returns: "void",
            parameters: [],
        },
        retrievePublicObject: {
            name: "Retrieve Public Object",
            code: "retrievePublicObject()",
            docs: "https://developer.spotify.com/documentation/web-api/reference/users-profile/get-users-profile/",
            returns: "void",
            parameters: [],
        },
        getMe: {
            name: "Get Me",
            docs: "https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/",
            code: "getMe()",
            returns: "User",
            parameters: [],
        },
        getUser: {
            name: "Get User",
            docs: "https://developer.spotify.com/documentation/web-api/reference/users-profile/get-users-profile/",
            code: "getUser(userID)",
            returns: "User",
            parameters: [
                {name: "userID", types: ["String"], optional: false, description: "Id of user to be retrieved."},
            ],
        },
    }),
}
</script>