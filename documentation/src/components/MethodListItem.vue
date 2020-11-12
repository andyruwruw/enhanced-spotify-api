<template>
    <v-expansion-panel name="MethodListItem">
        <v-expansion-panel-header>
            <v-row style="padding: 0px 12px">
                <h3 class="subtitle-1 method-title">{{name}}</h3>
                <v-spacer></v-spacer>
                <v-chip v-if="typeof(returns) == 'string'" class="elevation-1" :color="returnColor(returns)" text-color="white"  style="margin-right: 12px">
                    <v-avatar left><v-icon>mdi-keyboard-return</v-icon></v-avatar>
                    {{returns}}
                </v-chip>
                <div style="display: flex;" v-else >
                    <v-chip class="elevation-1" v-for="(item, i) in returns" :key="name + 'return' + i" :color="returnColor(item)" text-color="white"  style="margin-right: 12px">
                        <v-avatar left><v-icon>mdi-keyboard-return</v-icon></v-avatar>
                        {{item}}
                </v-chip>
                </div>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-tabs color="background" background-color="#6252a324" show-arrows v-model="tabs">
                <v-tab>Overview</v-tab>
                <v-tab>Parameters</v-tab>
                <v-tab v-if="returns != 'void'">Returns</v-tab>
                <v-tab  v-if="!noExample">Example</v-tab>
                <v-tab>Source Code</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs" touchless>
                <v-tab-item  :transition="false" :reverse-transition="false" style="padding: 12px 0px;">
                    <highlight-code lang="javascript">{{code}}</highlight-code>
                    <h3 class="headline">{{name}}<span v-if="staticMethod" style="margin-left: 12px; opacity: .5;" class="highlight">Static Method</span></h3>
                    <slot name="overview"></slot>
                    <v-btn v-if="docs != null" :href="docs" color="background" style="color: white !important; margin-top: 12px;">Cooresponding Spotify Endpoint</v-btn>
                </v-tab-item>
                <v-tab-item :transition="false" :reverse-transition="false">
                    <div v-if="parameters.length">
                        <p style="margin-left: 8px; margin-bottom: 0px; opacity: .5;">Parameters</p>
                        <v-simple-table fixed-header>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Name</th>
                                        <th class="text-left">Type</th>
                                        <th class="text-left">Description</th>
                                        <th class="text-left">Presence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(parameter, i) in parameters" :key="name + '-parameter-' + i">
                                        <td>{{parameter.name}}</td>
                                        <td>
                                            <v-chip v-for="type in parameter.types" :key="name + '-parameter-' + i + '-' + type" :color="returnColor(type)" text-color="white" style="transform: translateY(-1px); margin-right: 5px;" class="elevation-1">{{type}}</v-chip>
                                        </td>
                                        <td>{{parameter.description}}</td>
                                        <td :class="{optional : parameter.optional}">{{parameter.optional ? 'Optional' : 'Required'}}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <div v-if="options != null">
                            <p style="margin-left: 8px; margin-bottom: 0px; margin-top: 30px; opacity: .5;">Additional Options</p>
                            <v-simple-table fixed-header>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">Property</th>
                                            <th class="text-left">Type</th>
                                            <th class="text-left">Description</th>
                                            <th class="text-left">Default</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(parameter, i) in options" :key="name + '-option-' + i">
                                            <td><span style="color: #BBBBBB">options.</span>{{parameter.name}}</td>
                                            <td>
                                                <v-chip v-for="type in parameter.types" :key="name + '-parameter-' + i + '-' + type" :color="returnColor(type)" text-color="white" style="transform: translateY(-1px); margin-right: 5px;" class="elevation-1">{{type}}</v-chip>
                                            </td>
                                            <td>{{parameter.description}}</td>
                                            <td>{{parameter.default}}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </div>
                    </div>
                    <p v-else>No Parameters</p>
                </v-tab-item>
                <v-tab-item v-if="returns != 'void'"  :transition="false" :reverse-transition="false">
                    <highlight-code lang="javascript"><slot name="return">
                    </slot></highlight-code>
                </v-tab-item>
                <v-tab-item :transition="false" :reverse-transition="false" v-if="!noExample">
                    <slot name="example">
                    </slot>
                </v-tab-item>
                <v-tab-item :transition="false" :reverse-transition="false">
                    <highlight-code lang="javascript"><slot name="src">
                    </slot></highlight-code>
                </v-tab-item>
            </v-tabs-items>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
    name: "MethodListItem",
    props: {
        name: String,
        code: String,
        returns: String,
        parameters: Array,
        docs: String,
        staticMethod: Boolean,
        options: Array,
        noExample: Boolean,
    },
    data: () => ({
        tabs: 0,
    }),
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
                case "Wrapper":
                    return "#0dbd5c";
                case "boolean": 
                case "Boolean": 
                    return "#fca232";
                case "Array":
                    return "#d13a34";
                case "string":
                case "String":
                    return "#027eeb";
                case "object":
                case "Object":
                    return "#4f37ac";
                case "number":
                case "Number":
                    return "#d56ad9";
                default:
                    return "black";
            }
        }
    }
}
</script>

<style scoped>
.method-title {
    color: var(--gradient2);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.075);
}
.optional {
    color: rgba(2, 2, 2, 0.295);
}
</style>