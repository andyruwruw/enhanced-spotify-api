<template>
  <div class="Home">
      <img class="logo" src="../assets/logo.svg"/>
      <h3 class="display-3" style="margin: 0 auto; margin-top: 8px; display: block; text-align: center;">Enhanced Spotify API</h3>
      <vue-typer class="headline" :text='text' :shuffle="false" style="margin: 0 auto; display: block; margin-top: 32px; margin-bottom: 18px; text-align: center;"></vue-typer>
      <highlight-code lang="bash" class="main padding-off" style="width: calc(100% - 10px); max-width: 400px; margin: 0px auto;">
      npm install enhanced-spotify-api
      </highlight-code>
    <p style="color: rgba(0,0,0,0)">Uriyah I love you!</p>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
  name: 'Home',
  components: {
    VueTyper
  },
  data: () => ({
    text: [
      "Object Oriented Spotify API Wrapper.",
      "var track = new Track(id);",
      "Automatic retrieval of missing data.",
      "var artists = track.getArtists(spotifyAPI);",
      "Spend more time coding cool projects-",
      "And less time scrolling through documentation.",
      "artists.play(spotifyAPI);",
      "No more paging objects or simplified objects.",
      "var albums = artist.getAllAlbums(spotifyAPI);",
      "Retrieves data in as few requests as possible.",
      "var tracks = albums.getTracks(spotifyAPI);",
      "Simple and easy to use!",
      "var playlist = tracks.createPlaylist(spotifyAPI);",
      "Customize and override to get exactly what you need.",
      "playlist.play(spotifyAPI);"
    ],
  }),
  created() {
    this.appear = true;
  }
}
</script>

<style scoped>
.Home {
  display: block;
  min-width: 100%;
  min-height: calc(100vh - 64px);
  background: rgb(252, 252, 252) !important;
  background-image: linear-gradient(0deg, hsla(240, 41%, 97%, 0.137), var(--gradient1-light)) !important;
  
}

#hook {
  margin: 0 auto; 
  padding-top: 15vh; 
  text-align: center; 
  margin-bottom: 20px;
  font-weight: normal;
}

img.logo {
  display: block;
  width: 80%;
  max-width: 300px;
  margin: 0 auto;
  padding-top: 45px;
}

img.title {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 690px;
}
</style>

<style>
pre.main code.hljs {
  width: auto;
  margin: 15px auto;
  font-weight: normal !important;
  background: #f7f7f7 !important;
  color: rgba(19, 19, 19, 0.993) !important;
  font-size: 1.2rem !important;
}
</style>
