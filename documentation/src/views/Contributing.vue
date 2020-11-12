<template>
    <div class="Contributing page-content">
        <div class="page-content padding-off">
            <v-breadcrumbs :items="path"></v-breadcrumbs>
        </div>
        <div style="padding-left: 24px">
            <h1 class="display-1">Contributing</h1>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h1 class="display-1">Pull Requests</h1>
            <p>If you see any way to improve the package, send over a pull request. I'll be keeping a close eye on it.</p>
            <p>Try to keep any new methods written documented and describe the issue solved.</p>
            <p>Let me know if you'd like to join as a maintainer of the library! It's a large project and I'd love to have some help keeping it progressive.</p>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h1 class="display-1">Issues</h1>
            <p>Please visit the <a href="https://github.com/andyruwruw/enhanced-spotify-api/issues">Issues Page</a> on the github repo for any issues you've encountered.</p>
            <v-divider style="margin: 40px 0px;"></v-divider>
            <h1 class="display-1">Suggestions</h1>
            <p>Any suggestions are very welcome. Features, errors, documentation mistakes, life choices.</p>
            <a href="andrew@youngshome.com">andrew@youngshome.com</a>
        </div>
    </div>
</template>

<script>
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Contributing',
  data: () => ({
      path: [
          { text: 'Introduction', disabled: true },
          { text: 'Contributing', disabled: true },
      ]
  }),
  components: {

  }
}
</script>