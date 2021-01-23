<template>
    <div>
        <v-tabs
            v-model="tab"
            :class="$style.tabs"
            color="background"
            background-color="#6252a324"
            fixed-tabs
            show-arrows>
            <v-tab>
                Usage
            </v-tab>

            <v-tab>
                Methods
            </v-tab>

            <v-tab>
                Properties
            </v-tab>

            <v-tab>
                Examples
            </v-tab>
        </v-tabs>

        <v-tabs-items
            v-model="tab"
            touchless>
            <v-tab-item
                :transition="false"
                :reverse-transition="false">
                <v-card
                    style="padding: 24px; margin-bottom: 42px;"
                    color="white">
                    <slot name="usage-toc" />
                </v-card>
                <slot name="usage-content" />
            </v-tab-item>

            <v-tab-item
                :transition="false"
                :reverse-transition="false">
                <slot name="methods-content" />
            </v-tab-item>

            <v-tab-item
                :transition="false"
                :reverse-transition="false">
                <v-card
                    style="padding: 24px"
                    color="white">
                    <h1
                        v-if="properties.instance.length"
                        class="headline highlight"
                        style="margin: 24px 0px 12px 0px;">
                        Instance Properties
                    </h1>

                    <v-simple-table
                        v-if="properties.instance.length"
                        fixed-header>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Name
                                    </th>

                                    <th class="text-left">
                                        Type
                                    </th>

                                    <th class="text-left">
                                        Description
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr
                                    v-for="(property, i) in properties.instance"
                                    :key="'instance-property-' + i">
                                    <td>
                                        {{property.name}}
                                    </td>

                                    <td>
                                        <v-chip
                                            :color="returnColor(property.type)"
                                            text-color="white"
                                            style="transform: translateY(-1px);"
                                            class="elevation-1">
                                            {{property.type}}
                                        </v-chip>
                                    </td>

                                    <td>
                                        {{property.description}}
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <h1
                        v-if="properties.static.length"
                        class="headline highlight"
                        style="margin: 24px 0px 12px 0px;">
                        Static Properties
                    </h1>

                    <v-simple-table
                        v-if="properties.static.length"
                        fixed-header>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Name
                                    </th>

                                    <th class="text-left">
                                        Type
                                    </th>

                                    <th class="text-left">
                                        Description
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr
                                    v-for="(property, i) in properties.static"
                                    :key="'instance-property-' + i">
                                    <td>
                                        {{property.name}}
                                    </td>

                                    <td>
                                        <v-chip
                                            :color="returnColor(property.type)"
                                            text-color="white"
                                            style="transform: translateY(-1px);"
                                            class="elevation-1">
                                            {{property.type}}
                                        </v-chip>
                                    </td>

                                    <td>
                                        {{property.description}}
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-tab-item>

            <v-tab-item
                :transition="false"
                :reverse-transition="false">
                <v-card
                    style="padding: 24px"
                    color="white">
                    <slot name="examples-content" />
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
export default {
    name: 'DataObject',
    props: {
        properties: Object,
    },
    data: () => ({
        tab: 0,
    }),
    methods: {
        returnColor(type) {
            switch (type) {
                case 'void': 
                    return '#9e9e9e';
                case 'Track':
                case 'Tracks':
                case 'Artist':
                case 'Artists':
                case 'Album':
                case 'Albums':
                case 'Playlist':
                case 'Playlists':
                case 'Episode':
                case 'Episodes':
                case 'Show':
                case 'Shows':
                case 'Category':
                case 'Categories':
                case 'User':
                    return '#0dbd5c';
                case 'boolean': 
                case 'Boolean': 
                    return '#fca232';
                case 'Array':
                case 'array':
                    return '#d13a34';
                case 'string':
                case 'String':
                    return '#027eeb';
                case 'object':
                case 'Object':
                    return '#4f37ac';
                case 'number':
                case 'Number':
                    return '#d56ad9';
                default:
                    return 'black';
            }
        }
    }
}
</script>

<style module>
.tabs {
    padding-top: 6px !important;
}
</style>