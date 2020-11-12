<template>
    <div class="PreMadeCustomizations page-content">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div style="padding-left: 24px">
            <h1 class="display-1">Pre-Made Customizations</h1>
            <h1 class="display-4" style="margin: 0 auto; margin-top: 104px; text-align: center; color: rgb(220,220,220); font-size: 10rem !important;">\ (•◡•) /</h1>
            <h1 class="headline" style="margin: 86px auto; text-align: center; color: rgb(200,200,200); font-size: 3rem !important;">Coming Soon</h1>
        </div>
    </div>
</template>

<script>

//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'PreMadeCustomizations',
    components: {

    },
    data: () => ({
        path: [
            { text: 'Customization', disabled: true },
            { text: 'Pre-Made Customizations', disabled: true },
        ]
    }),
}
</script>