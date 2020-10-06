/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  album_simple,
  track_simple,
  track_full_object,
} = require('./fixtures');

const {
  Album,
  Track,
} = EnhancedSpotifyAPI;

describe('EnhancedSpotifyAPI Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via EnhancedSpotifyAPI class, verifies token 
   * is set and sent in subsequent requests.
   */
  it('EnhancedSpotifyAPI: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    EnhancedSpotifyAPI.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/albums/${album_simple.id}`)
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, {}];
      });

    const album = new Album(album_simple.id);
    await album.retrieveFullObject();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verifies that use resets object used by all classes.
   */
  it('EnhancedSpotifyAPI: Use', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(200, track_full_object);

    const method = jest.fn();

    Album.addMethods({
      test: method,
    });

    const track = new Track(track_simple.id);
    album = await track.getAlbum();

    album.test();

    expect(method).toHaveBeenCalled();
  });
});

describe('EnhancedSpotifyAPI Properties', () => {
  /**
   * Verifies that EnhancedSpotifyAPI contains all objects.
   */
  it('EnhancedSpotifyAPI: Has All Objects', async () => {
    expect(EnhancedSpotifyAPI).toHaveProperty('Album');
    expect(EnhancedSpotifyAPI).toHaveProperty('Artist');
    expect(EnhancedSpotifyAPI).toHaveProperty('Category');
    expect(EnhancedSpotifyAPI).toHaveProperty('Episode');
    expect(EnhancedSpotifyAPI).toHaveProperty('Playback');
    expect(EnhancedSpotifyAPI).toHaveProperty('Playlist');
    expect(EnhancedSpotifyAPI).toHaveProperty('Show');
    expect(EnhancedSpotifyAPI).toHaveProperty('Track');
    expect(EnhancedSpotifyAPI).toHaveProperty('User');
    expect(EnhancedSpotifyAPI).toHaveProperty('Wrapper');
  });

  /**
   * Verifies that EnhancedSpotifyAPI contains all containers.
   */
  it('EnhancedSpotifyAPI: Has All Containers', async () => {
    expect(EnhancedSpotifyAPI).toHaveProperty('Albums');
    expect(EnhancedSpotifyAPI).toHaveProperty('Artists');
    expect(EnhancedSpotifyAPI).toHaveProperty('Categories');
    expect(EnhancedSpotifyAPI).toHaveProperty('Container');
    expect(EnhancedSpotifyAPI).toHaveProperty('Episodes');
    expect(EnhancedSpotifyAPI).toHaveProperty('Playlists');
    expect(EnhancedSpotifyAPI).toHaveProperty('Shows');
    expect(EnhancedSpotifyAPI).toHaveProperty('Tracks');
  });
});
