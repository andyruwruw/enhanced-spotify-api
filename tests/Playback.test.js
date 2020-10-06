/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  album_simple,
  playback_curr_playing_track,
  playback_get_devices,
  playback_state,
  tracks_recently_played,
} = require('./fixtures');

const {
  Playback,
  Track,
  Tracks,
  Playlist,
} = EnhancedSpotifyAPI;

describe('Playback Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Playback class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Playback: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Playback.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/me/player/currently-playing`)
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, {}];
      });

    await Playback.getCurrentlyPlaying();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verifies that get currently playing returns proper data.
   */
  it('Playback: Get Currently Playing', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/me/player/currently-playing`)
      .reply(200, playback_curr_playing_track);

    const response = await Playback.getCurrentlyPlaying();

    expect(response).toStrictEqual(playback_curr_playing_track);
  });

  /**
   * Verifies that get currently playing track / episode returns proper data in
   * the instance of the right object.
   */
  it('Playback: Get Currently Playing Track / Episode', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/me/player/currently-playing`)
      .query({
        additional_types: 'track,episode',
      })
      .reply(200, playback_curr_playing_track);

    const track = await Playback.getCurrentlyPlayingTrackOrEpisode();

    expect(track).toBeInstanceOf(Track);

    expect(track.artists).toStrictEqual(playback_curr_playing_track.item.artists);
    expect(track.available_markets).toStrictEqual(playback_curr_playing_track.item.available_markets);
    expect(track.disc_number).toBe(playback_curr_playing_track.item.disc_number);
    expect(track.duration_ms).toBe(playback_curr_playing_track.item.duration_ms);
    expect(track.explicit).toBe(playback_curr_playing_track.item.explicit);
    expect(track.external_urls).toStrictEqual(playback_curr_playing_track.item.external_urls);
    expect(track.href).toBe(playback_curr_playing_track.item.href);
    expect(track.id).toBe(playback_curr_playing_track.item.id);
    expect(track.is_local).toBe(playback_curr_playing_track.item.is_local);
    expect(track.name).toBe(playback_curr_playing_track.item.name);
    expect(track.preview_url).toBe(playback_curr_playing_track.item.preview_url);
    expect(track.track_number).toBe(playback_curr_playing_track.item.track_number);
    expect(track.type).toBe(playback_curr_playing_track.item.type);
    expect(track.uri).toBe(playback_curr_playing_track.item.uri);
  });

  /**
   * Verifies that get currently playing context returns proper data in
   * the instance of the right object.
   */
  it('Playback: Get Currently Playing Context', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/me/player/currently-playing`)
      .query({
        additional_types: 'track,episode',
      })
      .reply(200, playback_curr_playing_track);

    const playlist = await Playback.getCurrentlyPlayingContext();

    expect(playlist).toBeInstanceOf(Playlist);
    expect(playlist.id).toBe(playback_curr_playing_track.context.uri.split(':')[2]);
  });

  /**
   * Verifies that transfer playback makes proper request.
   */
  it('Playback: Transfer Playback', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put(`/me/player`)
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    await Playback.transferPlayback(playback_get_devices.devices[0].id);

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body.device_ids).toStrictEqual([playback_get_devices.devices[0].id]);
  });

  /**
   * Verifies that play makes proper request.
   */
  it('Playback: Play', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put(`/me/player/play`)
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    const options = {
      context_uri: album_simple.uri,
      offset: {
        position: 1,
        position_ms: 100,
      },
    };
    await Playback.play(options);

    

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body.context_uri).toBe(album_simple.uri);
    expect(body.offset.position).toBe(1);
    expect(body.offset.position_ms).toBe(100);
  });

  /**
   * Verifies that pause makes proper request.
   */
  it('Playback: Pause', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put(`/me/player/pause`)
      .query({
        device_id: playback_get_devices.devices[0].id,
      })
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    const options = {
      device_id: playback_get_devices.devices[0].id,
    };
    await Playback.pause(options);

    expect(req).toBeDefined();
  });

  /**
   * Verifies that skip to next makes proper request.
   */
  it('Playback: Skip to Next', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .post(`/me/player/next`)
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    await Playback.skipToNext();

    expect(req).toBeDefined();
  });

  /**
   * Verifies that skip to previous makes proper request.
   */
  it('Playback: Skip to Previous', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .post(`/me/player/previous`)
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    await Playback.skipToPrevious();

    expect(req).toBeDefined();
  });

  /**
   * Verifies that seek makes proper request.
   */
  it('Playback: Seek', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put(`/me/player/seek`)
      .query({
        position_ms: 100,
        device_id: playback_get_devices.devices[0].id,
      })
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    const options = {
      device_id: playback_get_devices.devices[0].id,
    };
    await Playback.seek(100, options);

    expect(req).toBeDefined();
  });

  /**
   * Verifies that set repeat makes proper request.
   */
  it('Playback: Set Repeat', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put(`/me/player/repeat`)
      .query({
        state: 'track',
      })
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    const options = {
      state: 'track',
    };
    await Playback.setRepeat(options);

    expect(req).toBeDefined();
  });

  /**
   * Verifies that set shuffle makes proper request.
   */
  it('Playback: Set Shuffle', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put(`/me/player/shuffle`)
      .query({
        state: 'false',
      })
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    const options = {
      state: 'false',
    };
    await Playback.setShuffle(options);

    expect(req).toBeDefined();
  });

  /**
   * Verifies that set volume makes proper request.
   */
  it('Playback: Set Volume', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put(`/me/player/volume`)
      .query({
        volume_percent: 100,
        device_id: playback_get_devices.devices[0].id,
      })
      .reply(function () {
        req = this.req;
        return [200, {}];
      });

    const options = {
      device_id: playback_get_devices.devices[0].id,
    };
    await Playback.setVolume(100, options);

    expect(req).toBeDefined();
  });

  /**
   * Verifies that get devices returns an array of devices.
   */
  it('Playback: Get Devices', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/me/player/devices`)
      .reply(200, playback_get_devices);

    const devices = await Playback.getDevices();

    expect(devices.devices).toStrictEqual(playback_get_devices.devices);
  });

  /**
   * Verifies that get current playback state makes the proper
   * request.
   */
  it('Playback: Get Current Playback State', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/me/player`)
      .reply(200, playback_state);

    const state = await Playback.getCurrentPlaybackState();

    expect(state).toStrictEqual(playback_state);
  });

  /**
   * Verifies that get recently played tracks retrieves track list
   * and returns as a Tracks instance.
   */
  it('Playback: Get Recently Played Tracks', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/me/player/recently-played`)
      .reply(200, tracks_recently_played);

    const tracks = await Playback.getRecentlyPlayedTracks();

    expect(tracks).toBeInstanceOf(Tracks);

    const track = tracks.get(0);

    expect(track).toBeInstanceOf(Track);

    expect(track.artists).toStrictEqual(tracks_recently_played.items[0].track.artists);
    expect(track.album).toStrictEqual(tracks_recently_played.items[0].track.album);
    expect(track.available_markets).toStrictEqual(tracks_recently_played.items[0].track.available_markets);
    expect(track.disc_number).toBe(tracks_recently_played.items[0].track.disc_number);
    expect(track.duration_ms).toBe(tracks_recently_played.items[0].track.duration_ms);
    expect(track.explicit).toBe(tracks_recently_played.items[0].track.explicit);
    expect(track.external_ids).toStrictEqual(tracks_recently_played.items[0].track.external_ids);
    expect(track.external_urls).toStrictEqual(tracks_recently_played.items[0].track.external_urls);
    expect(track.href).toBe(tracks_recently_played.items[0].track.href);
    expect(track.id).toBe(tracks_recently_played.items[0].track.id);
    expect(track.is_local).toBe(tracks_recently_played.items[0].track.is_local);
    expect(track.name).toBe(tracks_recently_played.items[0].track.name);
    expect(track.popularity).toBe(tracks_recently_played.items[0].track.popularity);
    expect(track.preview_url).toBe(tracks_recently_played.items[0].track.preview_url);
    expect(track.track_number).toBe(tracks_recently_played.items[0].track.track_number);
    expect(track.type).toBe(tracks_recently_played.items[0].track.type);
    expect(track.uri).toBe(tracks_recently_played.items[0].track.uri);
  });
});
