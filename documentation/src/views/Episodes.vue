<template>
    <div class="Episodes">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Episodes Container</h1>
            <p>The <span class="highlight">Episodes</span> container class is used to retrieve and maintain data from Spotify's API on a list of episodes.</p>
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
                </div>
                <div slot="methods-content">
                    <v-expansion-panels accordion multiple slot="methods-content">
                        <MethodListItem :docs="constructor.docs" :name="constructor.name" :code="constructor.code" :returns="constructor.returns" :parameters="constructor.parameters">
                            <div slot="overview">
                                <p>Creates new instance of <code>Episodes</code> class.</p>


                                <p>If you've loaded any data on the artist prior, you can pass it in as well to be preloaded: avoiding future requests.</p>
                            </div>
                            <div slot="example">
                                <highlight-code lang="javascript"><pre>
                                var myFavoriteArtist = '0bZCak2tcRMY1dzEIuwF42';
                                var myArtist = new Artist( myFavoriteArtist );
                                </pre></highlight-code>
                                <highlight-code lang="javascript"><pre>
                                var myFavoriteArtist = {
                                    id: "0bZCak2tcRMY1dzEIuwF42"
                                };
                                var myArtist = new Artist( myFavoriteArtist );
                                </pre></highlight-code>
                                <highlight-code lang="javascript"><pre>
                                var myFavoriteArtist = {
                                    id: "0bZCak2tcRMY1dzEIuwF42",
                                    name: "The Heavy",
                                };
                                var myArtist = new Artist( myFavoriteArtist );
                                </pre></highlight-code>
                            </div>
                            <pre slot="return">
                                // @ returns {Artist}
                            </pre>
                            <pre slot="src">

                            </pre>
                        </MethodListItem>
                    </v-expansion-panels>
                    
                    <ContainerMethods container="Episodes" contents="Episode"/>

                    <v-expansion-panels accordion multiple>
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
    name: 'Episodes',
    components: {
        DataObject,
        MethodListItem,
        ContainerMethods
    },
    data: () => ({
        path: [
            { text: 'Containers', disabled: true },
            { text: 'Episodes', disabled: true },
        ],
        properties: {
            instance: [
            
            ],
            static: [

            ]
        },
        constructor: {
            name: "Constructor",
            code: "new Episodes(data)",
            returns: "Episodes",
            parameters: [
                {name: "data", types: ["Array", "Episode", "Object", "String"], optional: true, description: "Data to be preloaded. Single or multiple Episodes."},
            ],
        },
        push: {
            name: "Push",
            code: "push(item)",
            returns: "void",
            parameters: [
                {name: "item", types: ["Episode", "Object", "String"], optional: false, description: "Item Instance, item object or item ID to add. "},
            ],
        },
        concat: {
            name: "Concatenate",
            code: "concat(items)",
            returns: "void",
            parameters: [
                {name: "items", types: ["Episodes", "Array"], optional: false, description: "Another Items instance or array of Item instances, item objects, or item IDs to concat."},
            ],
        },
        size: {
            name: "Size",
            code: "size()",
            returns: "Number",
            parameters: [],
        },
        includes: {
            name: "Includes",
            code: "includes(item)",
            returns: "Boolean",
            parameters: [
                {name: "item", types: ["Episode", "Object", "String"], optional: false, description: "Item instance, item data, or item ID to remove."},
            ],
        },
        indexOf: {
            name: "Index Of",
            code: "indexOf(item, start)",
            returns: "Number",
            parameters: [
                {name: "item", types: ["Episode", "Object", "String"], optional: false, description: "Item instance, item data, or item ID to remove."},
                {name: "start", types: ["Number"], optional: true, description: "Where to start searching from (Inclusive)."},
            ],
        },
        get: {
            name: "Get",
            code: "get(index)",
            returns: "Episode",
            parameters: [
                {name: "index", types: ["Number"], optional: false, description: "Index of the item desired."},
            ],
        },
        getIDs: {
            name: "Get IDs",
            code: "getIDs()",
            returns: "Array",
            parameters: [],
        },
        getIDsNoRepeats: {
            name: "Get IDs No Repeat",
            code: "getIDsNoRepeats()",
            returns: "Array",
            parameters: [],
        },
        getURIs: {
            name: "Get URIs",
            code: "getURIs()",
            returns: "Array",
            parameters: [],
        },
        getURIsNoRepeats: {
            name: "Get URIs No Repeat",
            code: "getURIsNoRepeats()",
            returns: "Array",
            parameters: [],
        },
        pop: {
            name: "Pop",
            code: "pop()",
            returns: "Episode",
            parameters: [],
        },
        shift: {
            name: "Shift",
            code: "shift()",
            returns: "Episode",
            parameters: [],
        },
        slice: {
            name: "Slice",
            code: "slice(start, end)",
            returns: "Episodes",
            parameters: [
                {name: "start", types: ["Number"], optional: false, description: "Start of removal."},
                {name: "end", types: ["Number"], optional: true, description: "End of removal (Exclusive). Defaults to end of list."},
            ],
        },
        remove: {
            name: "Remove",
            code: "remove(item)",
            returns: "Episode",
            parameters: [
                {name: "item", types: ["Episode", "Object", "String"], optional: false, description: "Item instance, item data, or item ID to remove."},
            ],
        },
        removeIndexes: {
            name: "Remove Indexes",
            code: "removeIndexes(indexes)",
            returns: "Episodes",
            parameters: [
                {name: "indexes", types: ["Array"], optional: false, description: "Indexes to be removed."},
            ],
        },
        forEach: {
            name: "For Each",
            code: "forEach(method, thisArg)",
            returns: "void",
            parameters: [
                {name: "method", types: ["Function"], optional: false, description: "Function to be run on each item."},
                {name: "thisArg", types: ["Function"], optional: true, description: "Value to use as \"this\" when executing callback."},
            ],
        },
        filter: {
            name: "Filter",
            code: "filter(method, thisArg)",
            returns: "Episodes",
            parameters: [
                {name: "method", types: ["Function"], optional: false, description: "Function to be run on each item."},
                {name: "thisArg", types: ["Function"], optional: true, description: "Value to use as \"this\" when executing callback."},
            ],
        },
        sort: {
            name: "Sort",
            code: "sort(compareFunction)",
            returns: "void",
            parameters: [
                {name: "compareFunction", types: ["Function"], optional: false, description: "Sorting method."},
            ],
        },
        reverse: {
            name: "Reverse",
            code: "reverse()",
            returns: "void",
            parameters: [],
        },
        setProperty: {
            name: "Set Property",
            code: "setProperty(id, field, value)",
            returns: "void",
            parameters: [
                {name: "id", types: ["String"], optional: false, description: "ID of item to alter."},
                {name: "field", types: ["String"], optional: false, description: "Field to set value to."},
                {name: "value", types: ["Any"], optional: false, description: "Value to set."},
            ],
        },
    }),
}
</script>