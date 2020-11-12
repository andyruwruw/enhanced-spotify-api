<template>
    <div>
        <div class="Album">
            <div class="page-content padding-off">
                <v-breadcrumbs :items="path"></v-breadcrumbs>
            </div>
            <div class="page-content">
                <h1 class="display-1">Endpoint Index</h1>
                <p>Here you'll find a full index of every Spotify API endpoint.</p>
                <p>Provided is a map to the correct class and method to invoke that endpoint.</p>
                <v-expansion-panels accordion multiple>
                    <v-expansion-panel v-for="(section, i) in sections" :key="i">
                        <v-expansion-panel-header class="title highlight">{{section.name}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div v-for="(endpoint, i) in section.endpoints" :key="section.name + i">
                                <h1 class="subtitle-1" style="font-weight: bolder; margin: 24px 0px 12px 0px;">{{endpoint.name}}</h1>
                                <v-simple-table fixed-header>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Class</th>
                                                <th class="text-left">Type</th>
                                                <th class="text-left">Method</th>
                                                <th class="text-left">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(method, i) in endpoint.locations" :key="'endpoint-' + i">
                                                <td class="highlight">{{method.class}}</td>
                                                <td>{{method.static ? 'Static' : 'Instance'}}</td>
                                                <td><highlight-code lang="javascript" class="no-padding">{{method.method}}</highlight-code></td>
                                                <td>{{method.description}}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "EndpointIndex",
    data: () => ({
        path: [
            { text: 'Introduction', disabled: true },
            { text: 'Endpoint Index', disabled: true },
        ],
        sections: [
            {
                name: "Albums",
                endpoints: [
                    {
                        name: "Get an Album",
                        description: "",
                        locations: [
                            { class: "Album", static: true, method: "Album.getAlbum(albumID)", description: "" },
                            { class: "Album", static: false, method: "getFullObject()", description: "" }
                        ]
                    },
                    {
                        name: "Get an Album's Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get several Albums",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    }
                ]
            },
            {
                name: "Artists",
                endpoints: [
                    {
                        name: "Get an Artist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get an Artist's Albums",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get an Artist's Top Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get an Artist's Related Artists",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Several Artists",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    }
                ]
            },
            {
                name: "Browse",
                endpoints: [
                    {
                        name: "Get a Category",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a Category's Playlist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a List of Categories",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a List of Featured Playlists",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a List of New Releases",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Recommendations",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    }
                ]
            },
            {
                name: "Episodes",
                endpoints: [
                    {
                        name: "Get an Episode",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Several Episodes",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    }
                ]
            },
            {
                name: "Follow",
                endpoints: [
                    {
                        name: "Check if Current User Follows Artists or Users",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Check if Users Follow a PLaylist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Follow Artists or Users",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Follow a Playlist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get User's Followed Artists",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Unfollow Artists or Users",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Unfollow a Playlist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    }
                ]
            },
            {
                name: "Library",
                endpoints: [
                    {
                        name: "Check User's Saved Albums",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Check User's Saved Shows",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Check User's Saved Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Current User's Saved Albums",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get User's Saved Shows",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a User's Saved Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Remove Albums for Current User",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Remove User's Saved Shows",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Remove User's Saved Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Save Albums for Current User",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Save Shows for Current User",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Save Tracks for User",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    }
                ]
            },
            {
                name: "Personalization",
                endpoints: [
                    {
                        name: "Get a User's Top Artists and Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                ]
            },
            {
                name: "Player",
                endpoints: [
                    {
                        name: "Get a User's Available Devices",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Information About The User's Current Playback",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Current User's Recently Played Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get the User's Currently Playing Track",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Pause a User's Playback",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Seek To Position In Currently Playing Track",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Set Repeat Mode On User’s Playback ",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Set Volume For User's Playback",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Skip User’s Playback To Next Track",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Skip User’s Playback To Previous Track",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Start/Resume a User's Playback",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Toggle Shuffle For User’s Playback",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Transfer a User's Playback ",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    }
                ]
            },
            {
                name: "Playlists",
                endpoints: [
                    {
                        name: "Add Items to a Playlist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Change a Playlist's Details",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Create a Playlist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a List of Current User's Playlists",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a List of a User's Playlists",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a Playlist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a Playlist Cover Image",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a Playlist's Items",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Remove Items from a Playlist",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Reorder a Playlist's Items",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Replace a Playlist's Items",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Upload a Custom Playlist Cover Image",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                ]
            },
            {
                name: "Search",
                endpoints: [
                    {
                        name: "Search",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                ]
            },
            {
                name: "Shows",
                endpoints: [
                    {
                        name: "Get a Show",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Several Shows",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a Show's Episodes",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                ]
            },
            {
                name: "Tracks",
                endpoints: [
                    {
                        name: "Get Audio Analysis for a Track",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Audio Features for a Track",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Audio Features for Several Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get Several Tracks",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a Track",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                ]
            },
            {
                name: "Users Profile",
                endpoints: [
                    {
                        name: "Get Current User's Profile",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                    {
                        name: "Get a User's Profile",
                        description: "",
                        locations: [
                            { class: "", static: false, method: "", description: "" }
                        ]
                    },
                ]
            },
        ],
    }),
}
</script>