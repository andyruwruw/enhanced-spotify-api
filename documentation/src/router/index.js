import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/introduction/why-enhanced-spotify-api',
    name: 'why-enhanced-spotify-api',
    component: () => import('../views/WhyEnhancedSpotifyAPI.vue')
  },
  {
    path: '/introduction/quick-start',
    name: 'quick-start',
    component: () => import('../views/QuickStart.vue')
  },
  {
    path: '/introduction/endpoint-index',
    name: 'endpoint-index',
    component: () => import('../views/EndpointIndex.vue')
  },
  {
    path: '/reference/contributing',
    name: 'contributing',
    component: () => import('../views/Contributing.vue')
  },
  {
    path: '/reference/change-log',
    name: 'changelog',
    component: () => import('../views/ChangeLog.vue')
  },
  {
    path: '/customization/adding-functionality',
    name: 'adding-functionality',
    component: () => import('../views/AddingFunctionality.vue')
  },
  {
    path: '/customization/overriding-functions',
    name: 'overriding-functions',
    component: () => import('../views/OverridingFunctions.vue')
  },
  {
    path: '/customization/pre-made-customizations',
    name: 'pre-made-customizations',
    component: () => import('../views/PreMadeCustomizations.vue')
  },
  {
    path: '/class/track',
    name: 'track',
    component: () => import('../views/Track.vue')
  },
  {
    path: '/class/artist',
    name: 'artist',
    component: () => import('../views/Artist.vue')
  },
  {
    path: '/class/album',
    name: 'album',
    component: () => import('../views/Album.vue')
  },
  {
    path: '/class/playlist',
    name: 'playlist',
    component: () => import('../views/Playlist.vue')
  },
  {
    path: '/class/show',
    name: 'show',
    component: () => import('../views/Show.vue')
  },
  {
    path: '/class/episode',
    name: 'episode',
    component: () => import('../views/Episode.vue')
  },
  {
    path: '/class/category',
    name: 'category',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/class/playback',
    name: 'playback',
    component: () => import('../views/Playback.vue')
  },
  {
    path: '/class/user',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/container/tracks',
    name: 'tracks',
    component: () => import('../views/Tracks.vue')
  },
  {
    path: '/container/artists',
    name: 'artists',
    component: () => import('../views/Artists.vue')
  },
  {
    path: '/container/albums',
    name: 'albums',
    component: () => import('../views/Albums.vue')
  },
  {
    path: '/container/playlists',
    name: 'playlists',
    component: () => import('../views/Playlists.vue')
  },
  {
    path: '/container/shows',
    name: 'shows',
    component: () => import('../views/Shows.vue')
  },
  {
    path: '/container/episodes',
    name: 'episodes',
    component: () => import('../views/Episodes.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
