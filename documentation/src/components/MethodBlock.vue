<template>
    <v-card class="MethodBlock">
        <v-card-title>
            <v-row style="padding: 0px 12px">
                <h3 class="highlight">{{name}}</h3>
                <v-spacer></v-spacer>
                <code style="margin-right: 24px;">{{code}}</code>
                <v-chip :color="returnColor(returns)" text-color="white" style="transform: translateY(-1px);" class="elevation-1">
                    <v-avatar left>
                        <v-icon>mdi-keyboard-return</v-icon>
                    </v-avatar>
                    {{returns}}
                </v-chip>
            </v-row>
        </v-card-title>
        <v-tabs color="background" background-color="#6252a324" show-arrows>
            <v-tab>
                Overview
            </v-tab>
            <v-tab>
                Parameters
            </v-tab>
            <v-tab>
                Example
            </v-tab>
            <v-tab>
                Source Code
            </v-tab>
            <v-tab-item style="padding: 12px;">
                <slot name="overview"></slot>
            </v-tab-item>
            <v-tab-item>
                <v-simple-table fixed-header>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">Type</th>
                                <th class="text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(parameter, i) in parameters" :key="name + '-parameter-' + i">
                                <td>{{parameter.name}}</td>
                                <td>
                                    <v-chip v-for="type in parameter.types" :key="name + '-parameter-' + i + '-' + type" :color="returnColor(type)" text-color="white" style="transform: translateY(-1px);" class="elevation-1">
                                        {{type}}
                                    </v-chip>
                                </td>
                                <td>{{parameter.description}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-tab-item>
            <v-tab-item>
                <highlight-code class="padding-off" lang="javascript"><slot name="example">
                </slot></highlight-code>
            </v-tab-item>
            <v-tab-item>
                <highlight-code class="padding-off" lang="javascript"><slot name="src">
                </slot></highlight-code>
            </v-tab-item>
        </v-tabs>
        
    </v-card>
</template>
<script>
export default {
    name: "MethodBlock",
    props: {
        name: String,
        code: String,
        returns: String,
        parameters: Array,
    },
    methods: {
        returnColor(type) {
            switch (type) {
                case "void": 
                    return "#9e9e9e";
                case "Track":
                case "Tracks":
                case "Artist":
                case "Artists":
                case "Album":
                case "Albums":
                case "Playlist":
                case "Playlists":
                case "Episode":
                case "Episodes":
                case "Show":
                case "Shows":
                case "Category":
                case "Categories":
                case "User":
                    return "#0dbd5c";
                case "Boolean": 
                    return "#fca232";
                case "Array":
                    return "#d13a34";
                case "String":
                    return "#027eeb";
                case "Object":
                    return "#4f37ac";
                default:
                    return "black";
            }
        }
    }
}
</script>