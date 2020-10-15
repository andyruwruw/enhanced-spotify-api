const fs = require('fs');
const path = require('path');

function loadFixture(fixtureName) {
  return JSON.parse(fs.readFileSync(
    path.join(__dirname, `fixtures/${fixtureName}.json`),
    'UTF8',
  ));
}

module.exports = {
  album_full_object: loadFixture('album_full_object'),
  album_is_liked: loadFixture('album_is_liked'),
  album_simple: loadFixture('album_simple'),
  album_tracks: loadFixture('album_tracks'),

  albums_are_liked: loadFixture('albums_are_liked'),
  albums_full_object: loadFixture('albums_full_object'),
  albums_new_releases: loadFixture('albums_new_releases'),
  albums_saved: loadFixture('albums_saved'),
  albums_search: loadFixture('albums_search'),
  albums_simple: loadFixture('albums_simple'),

  artist_albums: loadFixture('artist_albums'),
  artist_albums_50_1: loadFixture('artist_albums_50_1'),
  artist_albums_50_2: loadFixture('artist_albums_50_2'),
  artist_full_object: loadFixture('artist_full_object'),
  artist_is_followed: loadFixture('artist_is_followed'),
  artist_simple: loadFixture('artist_simple'),
  artist_top_tracks: loadFixture('artist_top_tracks'),

  artists_full_object: loadFixture('artists_full_object'),
  artists_search: loadFixture('artists_search'),
  artists_simple: loadFixture('artists_simple'),

  category_full_object: loadFixture('category_full_object'),
  category_playlists: loadFixture('category_playlists'),
  category_simple: loadFixture('category_simple'),

  episode_simple: loadFixture('episode_simple'),
  episode_full_object: loadFixture('episode_full_object'),

  item_simple: loadFixture('item_simple'),
  items_repeats: loadFixture('items_repeats'),
  items_ten: loadFixture('items_ten'),
  items_ten_unsorted: loadFixture('items_ten_unsorted'),
  items_three: loadFixture('items_three'),
  items_three_extended: loadFixture('items_three_extended'),

  playback_curr_playing_track: loadFixture('playback_curr_playing_track'),
  playback_get_devices: loadFixture('playback_get_devices'),
  playback_state: loadFixture('playback_state'),

  show_episodes: loadFixture('show_episodes'),
  show_is_liked: loadFixture('show_is_liked'),
  show_simple: loadFixture('show_simple'),
  show_full_object: loadFixture('show_full_object'),

  track_audio_analysis: loadFixture('track_audio_analysis'),
  track_audio_features: loadFixture('track_audio_features'),
  track_full_object: loadFixture('track_full_object'),
  track_is_liked: loadFixture('track_is_liked'),
  track_recommendations: loadFixture('track_recommendations'),
  track_simple: loadFixture('track_simple'),

  tracks_recently_played: loadFixture('tracks_recently_played'),

  user_private_object: loadFixture('user_private_object'),
  user_public_object: loadFixture('user_public_object'),
  user_simple: loadFixture('user_simple'),
};
