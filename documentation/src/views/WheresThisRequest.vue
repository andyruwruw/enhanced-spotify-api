<template>
    <div class="WheresThisRequest">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div class="page-content">
            <h1 class="display-1">Where's This Request?</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WheresThisRequest',
    data: () => ({
        path: [
            
        ]
    }),
}
</script>