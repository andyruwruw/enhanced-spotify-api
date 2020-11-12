<template>
    <div class="ContainerMethods">
        <v-expansion-panels accordion multiple>
            <v-row style="margin-top: 18px">
                <v-subheader>Contents</v-subheader>
            </v-row>
            <MethodListItem :noExample="true" :docs="size.docs" :options="size.options" :name="size.name" :code="size.code" :returns="size.returns" :parameters="size.parameters">
                <div slot="overview">
                    <p>Returns the number of {{this.container.toLowerCase()}} in the container.</p>
                </div>
                <pre slot="return">
                    // @ returns {Number}
                </pre>
                <pre slot="src">    
                size: function() {
                    try {
                        return this.order.length;
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="get.docs" :options="get.options" :name="get.name" :code="get.code" :returns="get.returns" :parameters="get.parameters">
                <div slot="overview">
                    <p>Returns {{this.contents}} at a given index.</p>
                </div>
                <pre slot="return">
                    // @ returns { {{this.contents}} }
                </pre>
                <pre slot="src">
                get: function(index) {
                    try {
                        if (index > this.order.length - 1) {
                            throw new Error(this.name + ".get: Index out of range");
                        }
                        return this.items[this.order[index > 0 ? index : (this.order.length - 1) - index]];
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="includes.docs" :options="includes.options" :name="includes.name" :code="includes.code" :returns="includes.returns" :parameters="includes.parameters">
                <div slot="overview">
                    <p>Returns <span class="highlight">Boolean</span> whether or not {{this.contents.toLowerCase()}} is contained.</p>
                </div>
                <pre slot="return">
                    // @ returns {Boolean}
                </pre>
                <pre slot="src">
                includes: function(item) {
                    try {
                        let id = null;
                        if (typeof(item) == 'string') {
                            id = item;
                        } else if ((item instanceof Models[this.type] || typeof(item) == 'object') && item.hasOwnProperty('id')) {
                            id = item.id;  
                        } else {
                            throw new Error(this.name + ".includes: Invalid Parameter \"item\"");
                        }
                        return this.items.hasOwnProperty(id);
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="indexOf.docs" :options="indexOf.options" :name="indexOf.name" :code="indexOf.code" :returns="indexOf.returns" :parameters="indexOf.parameters">
                <div slot="overview">
                    <p>Returns the index of {{this.contents.toLowerCase()}} within the container. Returns -1 if the item is not contained.</p>
                </div>
                <pre slot="return">
                    // @ returns {Number}
                </pre>
                <pre slot="src">
                indexOf: function(item, start) {
                    try {
                        if (start > this.order.length - 1) {
                            throw new Error(this.name + ".findIndex: Invalid Parameter \"start\"");
                        } 
                        let id = null;
                        if (typeof(item) == 'string') {
                            id = item;
                        } else if ((item instanceof Models[this.type] || typeof(item) == 'object') && item.hasOwnProperty('id')) {
                            id = item.id;  
                        } else {
                            throw new Error(this.name + ".findIndex: Invalid Parameter \"item\"");
                        }
                        return this.order.indexOf(id, start);
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="getIDs.docs" :options="getIDs.options" :name="getIDs.name" :code="getIDs.code" :returns="getIDs.returns" :parameters="getIDs.parameters">
                <div slot="overview">
                    <p>Returns array of {{this.contents.toLowerCase()}} IDs in order.</p>
                </div>
                <pre slot="return">
                    // @ returns {Array}
                    [ String ]
                </pre>
                <pre slot="src">
                getIDs: function() {
                    return this.order;
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="getIDsNoRepeats.docs" :options="getIDsNoRepeats.options" :name="getIDsNoRepeats.name" :code="getIDsNoRepeats.code" :returns="getIDsNoRepeats.returns" :parameters="getIDsNoRepeats.parameters">
                <div slot="overview">
                    <p>Returns array of {{this.contents.toLowerCase()}} IDs in order, removing repeating elements.</p>
                </div>
                <pre slot="return">
                    // @ returns {Array}
                    [ String ]
                </pre>
                <pre slot="src">
                getIDsNoRepeats: function() {
                    try {
                        let ids = [];
                        for (let i = 0; i &lt; this.order.length; i++) {
                            if (!ids.includes(this.order[i])) {
                                ids.push(this.order[i]);
                            }
                        }
                        return ids;
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="getURIs.docs" :options="getURIs.options" :name="getURIs.name" :code="getURIs.code" :returns="getURIs.returns" :parameters="getURIs.parameters">
                <div slot="overview">
                    <p>Returns array of {{this.contents.toLowerCase()}} URIs in order.</p>
                </div>
                <pre slot="return">
                    // @ returns {Array}
                    [ String ]
                </pre>
                <pre slot="src">
                getURIs: async function() {
                    try {
                        return await this.order.map((id) => 'spotify:' + this.uri_type + ':' + id);
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="getURIsNoRepeats.docs" :options="getURIsNoRepeats.options" :name="getURIsNoRepeats.name" :code="getURIsNoRepeats.code" :returns="getURIsNoRepeats.returns" :parameters="getURIsNoRepeats.parameters">
                <div slot="overview">
                    <p>Returns array of {{this.contents.toLowerCase()}} URIs in order, removing repeating elements.</p>
                </div>
                <pre slot="return">
                    // @ returns {Array}
                    [ String ]
                </pre>
                <pre slot="src">
                getURIsNoRepeats: async function() {
                    try {
                        let ids = await this.getIDsNoRepeats();
                        return await ids.map((id) => 'spotify:' + this.uri_type + ':' + id);
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="forEach.docs" :options="forEach.options" :name="forEach.name" :code="forEach.code" :returns="forEach.returns" :parameters="forEach.parameters">
                <div slot="overview">
                    <p>Runs a provided method on each {{this.contents.toLowerCase()}}.</p>
                </div>
                <pre slot="src">
                forEach: async function(method, thisArg) {
                    try {
                        let items = await this.order.map((item) => {
                            return this.items[item];
                        });
                        await items.forEach(method, thisArg ? thisArg: this);
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <v-row style="margin-top: 18px">
                <v-subheader>Add</v-subheader>
            </v-row>
            <MethodListItem :noExample="true" :docs="push.docs" :options="push.options" :name="push.name" :code="push.code" :returns="push.returns" :parameters="push.parameters">
                <div slot="overview">
                    <p>Appends new {{this.contents.toLowerCase()}}.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="src">
                push: function(item) {
                    try {
                        if (item instanceof Models[this.type]) {
                            if (!this.items.hasOwnProperty(item.id)) {
                                this.items[item.id] = item;
                            }
                            this.order.push(item.id);
                        } else if (typeof(item) == 'object') {
                            if (item.hasOwnProperty('id')) {
                                if (!this.items.hasOwnProperty(item.id)) {
                                    this.items[item.id] = new Models[this.type](item);
                                }
                                this.order.push(item.id);
                            } else if (item.hasOwnProperty(this.uri_type)) {
                                if (!this.items.hasOwnProperty(item[this.uri_type].id)) {
                                    this.items[item[this.uri_type].id] = new Models[this.type](item[this.uri_type]);
                                    for (let key in item) {
                                        if (key != this.uri_type) {
                                            this.items[item[this.uri_type].id][key] = item[key];
                                        }
                                    }
                                }
                                this.order.push(item.track.id);
                            } else {
                                throw new Error(this.name + ".push: Invalid Parameter \"item\"");
                            }
                        } else if (typeof(item) == 'string') {
                            if (!this.items.hasOwnProperty(item)) {
                                this.items[item] = new Models[this.type](item);
                            }
                            this.order.push(item);
                        } else {
                            throw new Error(this.name + ".push: Invalid Parameter \"item\"");
                        }
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="concat.docs" :options="concat.options" :name="concat.name" :code="concat.code" :returns="concat.returns" :parameters="concat.parameters">
                <div slot="overview">
                    <p>Adds multiple new {{this.container.toLowerCase()}}.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="src">
                concat: function(items) {
                    try {
                        if (items instanceof Models[this.name]) {
                            for (let i = 0; i &lt; items.order.length; i++) {
                                if (!this.items.hasOwnProperty(items.order[i])) {
                                    this.items[items.order[i]] = items.items[items.order[i]];
                                }
                                this.order.push(items.order[i]);
                            }
                        } else if (items instanceof Array) {
                            for (let i = 0; i &lt; items.length; i++) {
                                this.push(items[i]);
                            }
                        } else {
                            throw new Error(this.name + ".concat: Invalid Parameter \"items\"");
                        }
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <v-row style="margin-top: 18px">
                <v-subheader>Remove</v-subheader>
            </v-row>
            <MethodListItem :noExample="true" :docs="pop.docs" :options="pop.options" :name="pop.name" :code="pop.code" :returns="pop.returns" :parameters="pop.parameters">
                <div slot="overview">
                    <p>Removes the last item from the container and returns it.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="return">
                    // @ returns { {{this.contents}} }
                </pre>
                <pre slot="src">
                pop: function() {
                    try {
                        let id = this.order.pop();
                        let item = this.items[id];
                        if (!(this.order.includes(id))) {
                            delete this.items[id];
                        }
                        return item;
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="shift.docs" :options="shift.options" :name="shift.name" :code="shift.code" :returns="shift.returns" :parameters="shift.parameters">
                <div slot="overview">
                    <p>Removes the first item from the container and returns it.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="return">
                    // @ returns { {{this.contents}} }
                </pre>
                <pre slot="src">
                shift: function() {
                    try {
                        let id = this.order.shift();
                        let item = this.items[id];
                        if (!(this.order.includes(id))) {
                            delete this.items[id];
                        }
                        return item;
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="slice.docs" :options="slice.options" :name="slice.name" :code="slice.code" :returns="slice.returns" :parameters="slice.parameters">
                <div slot="overview">
                    <p>Removes a range of elements and returns them as a new <span class="highlight">{{this.container}}</span> instance.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="return">
                    // @ returns { {{this.container}} }
                </pre>
                <pre slot="src">
                slice: async function(start, end) {
                    try {
                        let stop = (end != null) ? end : this.order.length;
                        let ids = this.order.splice(start, stop);
                        let items = new Models[this.name](await ids.map((id) => this.items[id]));
                        for (let i = 0; i &lt; ids.length; i++) {
                            if (!(this.order.includes(ids[i]))) {
                                delete this.items[ids[i]];
                            }
                        }
                        return items;
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="remove.docs" :options="remove.options" :name="remove.name" :code="remove.code" :returns="remove.returns" :parameters="remove.parameters">
                <div slot="overview">
                    <p>Removes an item by ID and returns it.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="return">
                    // @ returns { {{this.contents}} }
                </pre>
                <pre slot="src">
                remove: function(item) {
                    try {
                        let id = null;
                        if (item instanceof Models[this.type] || typeof(item) == 'object') {
                            id = item.id;
                        } else if (typeof(item) == 'string') {
                            id = item;
                        } else {
                            throw new Error(this.name + ".remove: Invalid Parameter \"item\"");
                        }
                        this.order = this.order.filter((item) => {
                            return item != id;
                        });
                        let deletedItem = this.items[id];
                        delete this.items[id];
                        return deletedItem;
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="removeIndexes.docs" :options="removeIndexes.options" :name="removeIndexes.name" :code="removeIndexes.code" :returns="removeIndexes.returns" :parameters="removeIndexes.parameters">
                <div slot="overview">
                    <p>Removes a set of elements by index and returns them as a new <span class="highlight">{{this.container}}</span> instance.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="return">
                    // @ returns { {{this.container}} }
                </pre>
                <pre slot="src">
                removeIndexes: function(indexes) {
                    try {
                        let sorted = indexes.sort((a, b) => b - a);
                        if (sorted[0] > (this.order.length - 1) || sorted[sorted.length - 1] &lt; 0) {
                            throw new Error(this.name + ".removeIndexes: Invalid Parameter \"indexes\", out of range.");
                        }
                        let deleted = new Models[this.name]();
                        for (let i = 0; i &lt; sorted.length; i++) {
                            let id = this.order[sorted[i]];
                            this.order.splice(sorted[i], 1);
                            deleted.push(this.items[id]);
                            if (!this.order.includes(id)) {
                                delete this.items[id];
                            }
                        }
                        return deleted;
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="filter.docs" :options="filter.options" :name="filter.name" :code="filter.code" :returns="filter.returns" :parameters="filter.parameters">
                <div slot="overview">
                    <p>Returns <span class="highlight">{{this.container}}</span> instance that has been filtered by a provided method.</p>
                    <p>Does not mutate the original container.</p>
                </div>
                <pre slot="return">
                    // @ returns { {{this.container}} }
                </pre>
                <pre slot="src">
                filter: async function(method, thisArg) {
                    try {
                        let newContainer = new Models[this.name]();
                        let items = await this.order.map((item) => {
                            return this.items[item];
                        });
                        let filteredItems = await Promise.all(await items.filter(method, thisArg ? thisArg: this));
                        await newContainer.concat(filteredItems);
                        return newContainer;
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <v-row style="margin-top: 18px">
                <v-subheader>Mutate</v-subheader>
            </v-row>
            <MethodListItem :noExample="true" :docs="reverse.docs" :options="reverse.options" :name="reverse.name" :code="reverse.code" :returns="reverse.returns" :parameters="reverse.parameters">
                <div slot="overview">
                    <p>Reverses the order of items within the container.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="src">
                reverse: function() {
                    try {
                        this.order.reverse();
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="sort.docs" :options="sort.options" :name="sort.name" :code="sort.code" :returns="sort.returns" :parameters="sort.parameters">
                <div slot="overview">
                    <p>Sorts {{this.container.toLowerCase()}} by a provided method.</p>
                    <p>Mutates the original container.</p>
                </div>
                <pre slot="src">
                sort: async function(compareFunction) {
                    try {
                        let items = await this.order.map((item) => {
                            return this.items[item];
                        });
                        let sortedItems = await Promise.all(await items.sort(compareFunction));
                        this.order = await sortedItems.map((item) => item.id);
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
            <MethodListItem :noExample="true" :docs="setProperty.docs" :options="setProperty.options" :name="setProperty.name" :code="setProperty.code" :returns="setProperty.returns" :parameters="setProperty.parameters">
                <div slot="overview">
                    <p>Applies a custom property to a given track within the <span class="highlight">{{this.container}}</span> instance.</p>
                </div>
                <pre slot="src">
                setProperty: function(id, field, value) {
                    try {
                        if (id in this.items) {
                            this.items[id][field] = value;
                        } else {
                            throw new Error(this.constructor.name + ".setProperty: ID does not exist.");
                        }
                    } catch (error) {
                        throw error;
                    }
                },
                </pre>
            </MethodListItem>
        </v-expansion-panels>
    </div>
</template>

<script>
import MethodListItem from './MethodListItem.vue'

export default {
    name: "ContainerMethods",
    components: {
        MethodListItem
    },
    props: {
        container: String,
        contents: String,
    },
    computed: {
        size() {
            return {
                name: "Size",
                code: "size()",
                returns: "Number",
                parameters: []
            };
        },
        push() {
            return {
                name: "Push",
                code: "push(item)",
                returns: "void",
                parameters: [
                    {name: "item", types: [this.contents, "Object", "String"], optional: false, description: this.container + " Instance, " + this.contents.toLowerCase() + " object or " + this.contents.toLowerCase() + " ID to add. "},
                ]
            };
        },
        concat() {
            return {
                name: "Concatenate",
                code: "concat(items)",
                returns: "void",
                parameters: [
                    {name: "items", types: [this.container, "Array"], optional: false, description: "Another " + this.container + " instance or array of " + this.contents + " instances, " + this.contents.toLowerCase() + " objects, or " + this.contents.toLowerCase() + " IDs to concat."},
                ]
            };
        },
        includes() {
            return {
                name: "Includes",
                code: "includes(item)",
                returns: "Boolean",
                parameters: [
                    {name: "item", types: [this.contents, "Object", "String"], optional: false, description: this.contents + " instance, " + this.contents.toLowerCase() + " data, or " + this.contents.toLowerCase() + " ID to remove."},
                ]
            };
        },
        indexOf() {
            return {
                name: "Index Of",
                code: "indexOf(item, start)",
                returns: "Number",
                parameters: [
                    {name: "item", types: [this.contents, "Object", "String"], optional: false, description: this.contents + " instance, " + this.contents.toLowerCase() + " data, or " + this.contents.toLowerCase() + " ID to remove."},
                    {name: "start", types: ["Number"], optional: true, description: "Where to start searching from (Inclusive)."},
                ]
            };
        },
        get() {
            return {
                name: "Get",
                code: "get(index)",
                returns: this.contents,
                parameters: [
                    {name: "index", types: ["Number"], optional: false, description: "Index of the " + this.contents.toLowerCase() + " desired."},
                ],
            };
        },
        getIDs() {
            return {
                name: "Get IDs",
                code: "getIDs()",
                returns: "Array",
                parameters: [],
            };
        },
        getIDsNoRepeats() {
            return {
                name: "Get IDs No Repeat",
                code: "getIDsNoRepeats()",
                returns: "Array",
                parameters: [],
            };
        },
        getURIs() {
            return {
                name: "Get URIs",
                code: "getURIs()",
                returns: "Array",
                parameters: []
            };
        },
        getURIsNoRepeats() { 
            return {
                name: "Get URIs No Repeat",
                code: "getURIsNoRepeats()",
                returns: "Array",
                parameters: []
            };
        },
        pop() { 
            return {
                name: "Pop",
                code: "pop()",
                returns: this.contents,
                parameters: []
            };
        },
        shift() {
            return {
                name: "Shift",
                code: "shift()",
                returns: this.contents,
                parameters: []
            }
        },
        slice() {
            return {
                name: "Slice",
                code: "slice(start, end)",
                returns: this.container,
                parameters: [
                    {name: "start", types: ["Number"], optional: false, description: "Start of removal."},
                    {name: "end", types: ["Number"], optional: true, description: "End of removal (Exclusive). Defaults to end of list."},
                ]
            }
        },
        remove() {
            return {
                name: "Remove",
                code: "remove(item)",
                returns: this.contents,
                parameters: [
                    {name: "item", types: [this.contents, "Object", "String"], optional: false, description: this.contents + " instance, " + this.contents.toLowerCase() + " data, or " + this.contents.toLowerCase() + " ID to remove."},
                ]
            };
        },
        removeIndexes() {
            return {
                name: "Remove Indexes",
                code: "removeIndexes(indexes)",
                returns: this.container,
                parameters: [
                    {name: "indexes", types: ["Array"], optional: false, description: "Indexes to be removed."},
                ]
            };
        },
        forEach() {
            return {
                name: "For Each",
                code: "forEach(method, thisArg)",
                returns: "void",
                parameters: [
                    {name: "method", types: ["Function"], optional: false, description: "Function to be run on each " + this.contents.toLowerCase() + "."},
                    {name: "thisArg", types: ["Function"], optional: true, description: "Value to use as \"this\" when executing callback."},
                ]
            }
        },
        filter() {
            return {
                name: "Filter",
                code: "filter(method, thisArg)",
                returns: this.container,
                parameters: [
                    {name: "method", types: ["Function"], optional: false, description: "Function to be run on each " + this.contents.toLowerCase() + "."},
                    {name: "thisArg", types: ["Function"], optional: true, description: "Value to use as \"this\" when executing callback."},
                ]
            };
        },
        sort() {
            return {
                name: "Sort",
                code: "sort(compareFunction)",
                returns: "void",
                parameters: [
                    {name: "compareFunction", types: ["Function"], optional: false, description: "Sorting method."},
                ]
            };
        },
        reverse() {
            return {
                name: "Reverse",
                code: "reverse()",
                returns: "void",
                parameters: []
            };
        },
        setProperty() {
            return {
                name: "Set Property",
                code: "setProperty(id, field, value)",
                returns: "void",
                parameters: [
                    {name: "id", types: ["String"], optional: false, description: "ID of " + this.contents.toLowerCase() + " to alter."},
                    {name: "field", types: ["String"], optional: false, description: "Field to set value to."},
                    {name: "value", types: ["Any"], optional: false, description: "Value to set."},
                ]
            };
        },
    },
}
</script>

<style scoped>
.ContainerMethods {
    width: 100%;
}
</style>