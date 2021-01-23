<template>
    <div>
        <v-card
            style="padding: 24px; margin-bottom: 42px;"
            color="white">
            <slot name="usage-toc" />
        </v-card>
        <slot name="usage-content" />
    </div>
</template>