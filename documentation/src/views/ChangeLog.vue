<template>
    <div class="ChangeLog">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1" >Change Log</h1>
            <v-card style="margin: 24px 0px; padding: 10px;" color="rgba(100,100,100,.05)" v-for='version in versions' :key="version.version">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline highlight">Version {{version.version}}</v-list-item-title>
                        <v-list-item-subtitle>{{version.date}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-treeview v-model="version.tree" :open="version.open" :items="version.items" activatable item-key="name" open-on-click>
                    <template v-slot:prepend="{ item }">
                        <v-icon v-if="!item.type">
                        </v-icon>
                        <v-icon v-else>
                            {{ types[item.type] }}
                        </v-icon>
                    </template>
                </v-treeview>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangeLog',
    components: {
    },
    data: () => ({
        path: [
            { text: 'Introduction', disabled: true },
            { text: 'Change Log', disabled: true },
        ],
        types: {
            newFeatures: 'mdi-rocket',
            bugs: 'mdi-bug',
            break: 'mdi-nuke',
            doc: 'mdi-file-edit',
            polish: 'mdi-star'
        },
        versions: [
            { 
                version: "1.1.3",
                date: "April 20, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'Bug Fix',
                        type: 'bugs',
                        children: [
                            {
                                name: 'User Class',
                                children: [
                                    {
                                        name: 'Fixed broken get data methods.'
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Polish',
                        type: 'polish',
                        children: [
                            {
                                name: 'Playlists Container',
                                children: [
                                    {
                                        name: 'Utilizes both Get My Playlists and Get User\'s Playlists.'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.1.2",
                date: "April 20, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'New Feature',
                        type: 'newFeatures',
                        children: [
                            {
                                name: 'Playlist Class',
                                children: [
                                    {
                                        name: 'Added sort method to playlist class!'
                                    },
                                    {
                                        name: 'Added filter method to playlist class!'
                                    },
                                ]
                            },
                            {
                                name: 'Playback Class',
                                children: [
                                    {
                                        name: 'Added Get Recently Played Method.'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Polish',
                        type: 'polish',
                        children: [
                            {
                                name: 'Container Class',
                                children: [
                                    {
                                        name: 'Now supports all types for arrays of nested objects with additional details.'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.1.1",
                date: "April 18, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'Breaking Change',
                        type: 'break',
                        children: [
                            {
                                name: 'Playback Class',
                                children: [
                                    {
                                        name: 'Made all methods static.'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'New Feature',
                        type: 'newFeatures',
                        children: [
                            {
                                name: 'Episode and Show Classes',
                                children: [
                                    {
                                        name: 'Added play methods which are undocumented by Spotify but work!'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Polish',
                        type: 'polish',
                        children: [
                            {
                                name: 'Various Classes',
                                children: [
                                    {
                                        name: 'Added Missing loadConditionally methods.'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Documentation',
                        type: 'doc',
                        children: [
                            {
                                name: 'CHANGELOG.md Added',
                                children: [
                                    {
                                        name: 'Hello'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.1.0",
                date: "April 17, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'Breaking Change',
                        type: 'break',
                        children: [
                            {
                                name: 'All Classes',
                                children: [
                                    {
                                        name: 'Removed requirement to pass in Wrapper Instance to methods requiring authenticated requests.'
                                    },
                                    {
                                        name: 'A static wrapper instance will be maintained and shared by all classes.'
                                    },
                                    {
                                        name: 'Authentication can be passed in through the imported library, or by any of the classes.'
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.0.7",
                date: "April 10, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'New Feature',
                        type: 'newFeatures',
                        children: [
                            {
                                name: 'Playlist Class',
                                children: [
                                    {
                                        name: 'Added create playlist as a static method.'
                                    },
                                ]
                            },
                            {
                                name: 'User Class',
                                children: [
                                    {
                                        name: 'Added areFollowingPlaylist method.'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Bug Fix',
                        type: 'bugs',
                        children: [
                            {
                                name: 'Container Classes',
                                children: [
                                    {
                                        name: 'Fixed issue of reused variable.'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Polish',
                        type: 'polish',
                        children: [
                            {
                                name: 'Tracks Container',
                                children: [
                                    {
                                        name: 'I suppose plural for Analysis is Analyses.'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.0.6",
                date: "April 10, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'Polish',
                        type: 'polish',
                        children: [
                            {
                                name: 'Container Classes',
                                children: [
                                    {
                                        name: 'Replaced array methods with for loops for improved efficiency.'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.0.5",
                date: "April 10, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'Bug Fix',
                        type: 'bugs',
                        children: [
                            {
                                name: 'Wrapper Class',
                                children: [
                                    {
                                        name: 'Fixed Broken spotify-web-api-node play endpoint parameter position_ms.'
                                    },
                                    {
                                        name: 'Added references to dependent files in endpoints for Shows and Episodes.'
                                    },
                                ]
                            },
                            {
                                name: 'Various Classes',
                                children: [
                                    {
                                        name: 'Fixed references to related classes.'
                                    },
                                    {
                                        name: 'Depreciated method add, bumped to push.'
                                    },
                                    {
                                        name: 'Fixed static get methods to request from Spotify, then construct.'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Polish',
                        type: 'polish',
                        children: [
                            {
                                name: 'CONTRIBUTING.md',
                                children: [
                                    {
                                        name: 'Added Contribution notes.'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.0.4",
                date: "April 8, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'Breaking Change',
                        type: 'break',
                        children: [
                            {
                                name: 'Playlist Class',
                                children: [
                                    {
                                        name: 'Remodeled to Commit Changes as made.'
                                    },
                                ]
                            },
                            {
                                name: 'All Containers',
                                children: [
                                    {
                                        name: 'All containers now inherit from a `Container` class.'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Bug Fix',
                        type: 'bugs',
                        children: [
                            {
                                name: 'Wrapper Class',
                                children: [
                                    {
                                        name: 'Fixed Arrow Functions in Show and Episode endpoints.'
                                    },
                                ]
                            },
                            {
                                name: 'Various Containers',
                                children: [
                                    {
                                        name: 'Fixed references to related classes.'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Polish',
                        type: 'polish',
                        children: [
                            {
                                name: 'All Containers',
                                children: [
                                    {
                                        name: 'Replaced array methods with for loops for improved efficiency.'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.0.3",
                date: "April 7, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'New Feature',
                        type: 'newFeatures',
                        children: [
                            {
                                name: 'All Classes',
                                children: [
                                    {
                                        name: 'Lazy load other related classes.'
                                    },
                                    {
                                        name: 'Load Conditionally method added to all classes.'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Bug Fix',
                        type: 'bugs',
                        children: [
                            {
                                name: 'All Classes',
                                children: [
                                    {
                                        name: 'Fixed bug where classes recursively imported one another due to need to maintain overridable references to one another.'
                                    },
                                ]
                            },
                            {
                                name: 'index.js',
                                children: [
                                    {
                                        name: 'Added custom importing of files as Getters'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.0.2",
                date: "April 5, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'Bug Fix',
                        type: 'bugs',
                        children: [
                            {
                                name: 'Various Classes',
                                children: [
                                    {
                                        name: 'Depreciated method add, bumped to push'
                                    },
                                    {
                                        name: 'Fixed Improper handling of result data.'
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },
            { 
                version: "1.0.1",
                date: "April 5, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'Breaking Change',
                        type: 'break',
                        children: [
                            {
                                name: 'Playlist Class',
                                children: [
                                    {
                                        name: 'Refactored Playlist Class to Resemble Track Class'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name: 'New Feature',
                        type: 'newFeatures',
                        children: [
                            {
                                name: 'Wrapper Class',
                                children: [
                                    {
                                        name: 'Added Customization Methods to Wrapper Class'
                                    }
                                ]
                            },
                            {
                                name: 'Show Class',
                                children: [
                                    {
                                        name: 'Added Method to Retrieve Some Episodes and not All'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Bug Fix',
                        type: 'bugs',
                        children: [
                            {
                                name: 'All Classes',
                                children: [
                                    {
                                        name: 'Fixed Arrow Function Issue'
                                    },
                                    {
                                        name: 'Added References to Related Classes for Override'
                                    }
                                ]
                            },
                            {
                                name: 'Track Class',
                                children: [
                                    {
                                        name: 'Fixed Checking of Conditional Values'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Documentation',
                        type: 'doc',
                        children: [
                            {
                                name: 'Various Classes',
                                children: [
                                    {
                                        name: 'Fixed Documentation Typos'
                                    },
                                    {
                                        name: 'Fixed Incorrect Error Messages'
                                    }
                                ]
                            },
                        ]
                    },
                ]
                
            },
            { 
                version: "1.0.0",
                date: "April 1, 2020",
                tree: [],
                open: [],
                items: [
                    {
                        name: 'New Feature',
                        type: 'newFeatures',
                        children: [
                            {
                                name: 'Classes',
                                children: [
                                    {
                                        name: 'Track Class'
                                    },
                                    {
                                        name: 'Artist Class'
                                    },
                                    {
                                        name: 'Album Class'
                                    },
                                    {
                                        name: 'Playlist Class'
                                    },
                                    {
                                        name: 'Episode Class'
                                    },
                                    {
                                        name: 'Show Class'
                                    },
                                    {
                                        name: 'Category Class'
                                    },
                                    {
                                        name: 'Playback Class'
                                    },
                                    {
                                        name: 'User Class'
                                    },
                                    {
                                        name: 'Wrapper Class'
                                    }
                                ]
                            },
                            {
                                name: 'Containers',
                                children: [
                                    {
                                        name: 'Tracks Container'
                                    },
                                    {
                                        name: 'Artists Container'
                                    },
                                    {
                                        name: 'Albums Container'
                                    },
                                    {
                                        name: 'Playlists Container'
                                    },
                                    {
                                        name: 'Episodes Container'
                                    },
                                    {
                                        name: 'Shows Container'
                                    },
                                    {
                                        name: 'Categories Container'
                                    },
                                ]
                            }
                        ]
                    }
                ]
                
            }
        ]
    })
}
</script>

<style scoped>
ul {
    margin-left: 24px !important;
}
li {
    margin: 8px 0px !important;
}
</style>