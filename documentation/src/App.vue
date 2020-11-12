<template>
  <v-app>
    <v-navigation-drawer width="300" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app style="min-height: 100vh;">
      <v-list style="margin-bottom: 80px;">
        <v-list-item style="padding: 0px;" v-for="item in items" :key="item.text">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center" >
              <a href="#!" class="body-2 black--text" >EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group sub-group color="gradient2" style="width: 100%;" v-else-if="item.children" v-model="item.model" :prepend-icon="item.icon">
            <template v-slot:activator>
              <v-list-item-title class="subtitle-1">{{ item.text }}</v-list-item-title>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i"  @click="route(child.path)" link>
              <v-list-item-icon></v-list-item-icon>
              <v-list-item-title class="subtitle-2">{{ child.text }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="background darken-3" dark id="app-bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="margin-right: 10px;"></v-app-bar-nav-icon>
      <span class="headline" id="title" @click="route('/')">Enhanced Spotify API</span>
      <v-spacer></v-spacer>
      <a href="https://github.com/andyruwruw/enhanced-spotify-api">
        <v-btn icon>
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </a>
      <a href="https://www.npmjs.com/package/enhanced-spotify-api">
        <v-btn icon style="margin-right: 15px;">
          <v-icon size="40">mdi-npm</v-icon>
        </v-btn>
      </a>
    </v-app-bar>

    <v-content>
      <v-slide-x-transition hide-on-leave>
      <router-view></router-view>
      </v-slide-x-transition>
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: null,
    items: [
      { 
        icon: 'mdi-book-open-page-variant', 
        text: 'Introduction',
        model: true,
        children: [
          {
            text: 'Why Enhanced Spotify API?', 
            path: '/introduction/why-enhanced-spotify-api'
          },
          {
            text: 'Quick Start',
            path: '/introduction/quick-start'
          },
          {
            text: 'Endpoint Index',
            path: '/introduction/endpoint-index'
          },
        ]
      },
      { 
        icon: 'mdi-music-box', 
        text: 'Classes',
        model: false,
        children: [
          {
            text: 'Track',
            path: '/class/track'
          },
          {
            text: 'Artist',
            path: '/class/artist'
          },
          {
            text: 'Album',
            path: '/class/album'
          },
          {
            text: 'Playlist',
            path: '/class/playlist'
          },
          {
            text: 'Show',
            path: '/class/show'
          },
          {
            text: 'Episode',
            path: '/class/episode'
          },
          {
            text: 'Category',
            path: '/class/category'
          },
          {
            text: 'Playback',
            path: '/class/playback'
          },
          {
            text: 'User',
            path: '/class/user'
          },
        ]
      },
      { 
        icon: 'mdi-music-box-multiple', 
        text: 'Containers',
        model: false,
        children: [
          {
            text: 'Tracks',
            path: '/container/tracks'
          },
          {
            text: 'Artists',
            path: '/container/artists'
          },
          {
            text: 'Albums',
            path: '/container/albums'
          },
          {
            text: 'Playlists',
            path: '/container/playlists'
          },
          {
            text: 'Shows',
            path: '/container/shows'
          },
          {
            text: 'Episodes',
            path: '/container/episodes'
          },
        ]
      },
      { 
        icon: 'mdi-cog', 
        text: 'Customization',
        model: false,
        children: [
          {
            text: 'Adding Functionality',
            path: '/customization/adding-functionality'
          },
          {
            text: 'Overriding Functions',
            path: '/customization/overriding-functions'
          },
          {
            text: 'Pre-Made Customizations',
            path: '/customization/pre-made-customizations'
          },
        ]
      },
      { 
        icon: 'mdi-book', 
        text: 'References',
        model: false,
        children: [
          {
            text: 'Change Log',
            path: '/reference/change-log'
          },
          {
            text: 'Contributing',
            path: '/reference/contributing'
          },
        ]
      },
    ],
  }),
  methods: {
    documentation() {
      this.$router.push('/documentation');
    },
    route(path) {
      if (this.$route.path == path) return;
      this.$router.push(path);
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');

:root {
  --primary: #222;
  --secondary: #333;
  --background: #4f37ac;
  --gradient1: #0854a9;
  --gradient2: #4f37ac;
  --gradient1-light: #0853a934;
  --gradient2-light: #4f37ac34;
}

.v-navigation-drawer__content::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.027);
    background-color: #5454b600;
}
.v-navigation-drawer__content::-webkit-scrollbar
{
    width: 7px;
    background-color: rgba(253, 253, 253, 0)
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px var(--gradient2-light);
    background-color: #b29fffc5;
}

html::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.027);
    background-color: #5454b600;
}
html::-webkit-scrollbar
{
    width: 7px;
    background-color: rgba(253, 253, 253, 0)
}
html::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px var(--gradient2-light);
    background-color: #6947eec5;
}

#app-bar {
  background-image: linear-gradient(0deg, var(--gradient2), var(--gradient1));
}

.theme--light.v-navigation-drawer {
  background: rgb(255, 255, 255) !important;
  background-image: linear-gradient(0deg, var(--gradient2-light), var(--gradient1-light)) !important;
}

#title {
  font-weight: normal;
  cursor: pointer;
  font-size: 1.2rem !important;
}

a {
  text-decoration: none;
  color: var(--background) !important;
  font-weight: bold;
}

p {
  margin: 20px 0px;
  font-size: 1.1rem;
  line-height: 2rem;
}

.highlight {
  color: var(--background) !important;
  font-weight: bold;
}

.v-application code {
  color: rgba(36, 36, 36, 0.993);
}

code:not(.hljs) {
  color: var(--background) !important;
  transform: translateY(-2px);
  margin: 0 3px;
}

code.hljs {
  overflow-x: auto;
  overflow: auto;
  min-width: 100%;
  padding: 16px 16px;
  font-weight: normal !important;
  line-height: 32px;
  letter-spacing: .3px;
  background: #ededed !important;
  color: rgba(36, 36, 36, 0.993) !important;
  font-size: .9rem !important;
}

.no-padding code.hljs {
  padding: 0px 5px !important;
}

pre.main {
  display: flex;
}

pre:not(.padding-off) .hljs {
  margin: 15px 0px !important;
}

.hljs-comment,
.hljs-quote {
  color: rgb(184, 184, 184);
}

/* Solarized Green */
.hljs-keyword,
.hljs-selector-tag,
.hljs-addition {
  color: rgb(255, 6, 110);
}

/* Solarized Cyan */
.hljs-number,
.hljs-string,
.hljs-meta .hljs-meta-string,
.hljs-literal,
.hljs-doctag,
.hljs-regexp {
  color: #2aa198;
}

/* Solarized Blue */
.hljs-title,
.hljs-section,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
  color: rgb(101, 4, 180);
}

/* Solarized Yellow */
.hljs-attribute,
.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-class .hljs-title,
.hljs-type {
  color: rgb(18, 175, 4);
}

/* Solarized Orange */
.hljs-symbol,
.hljs-bullet,
.hljs-subst,
.hljs-meta,
.hljs-meta .hljs-keyword,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-link {
  color: #cb4b16;
}

/* Solarized Red */
.hljs-built_in,
.hljs-deletion {
  color: rgb(37, 120, 214);
}

.hljs-formula {
  background: #073642;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}


.sub-title {
  margin: 16px 0px 16px 0px !important;
}

.page-content {
  display: block;
  margin: 0 auto;
  width: calc(100%);
  max-width: 1024px;
}

.page-content:not(.padding-off) {
  padding: 0 24px;
  padding-bottom: 200px;
}

@media only screen and (max-width: 600px) {
  .page-content {
    width: calc(100%);
    padding: 0 0px;
  }
}

</style>
