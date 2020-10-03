/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  // artist_albums,
  artist_full_object,
  artist_is_followed,
  artist_simple,
  // artist_top_tracks,
} = require('./fixtures');

const {
  // Album,
  // Albums,
  Artist,
  // Tracks,
  // Track,
} = EnhancedSpotifyAPI;

describe('Artist Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Artist class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Artist: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Artist.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/artists/${artist_simple.id}`)
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, {}];
      });

    const artist = new Artist(artist_simple.id);
    await artist.retrieveFullObject();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verfies the ability to add methods to the Artist prototype.
   */
  it('Artist: Add Methods', () => {
    const method = jest.fn();

    Artist.addMethods({
      test: method,
    });

    const artist = new Artist(artist_simple.id);
    artist.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Artist prototype.
   */
  it('Artist: Override', () => {
    const method = jest.fn();
    const { follow } = Artist.prototype;
    Artist.override('follow', method);

    const artist = new Artist(artist_simple.id);
    artist.follow();

    expect(method).toHaveBeenCalled();

    Artist.override('follow', follow);
  });
});

describe('Artist Instantiation', () => {
  /**
   * Verifies that using Artist constructor sets artist ID.
   */
  it('Artist: Instantiating with String', () => {
    const artist = new Artist(artist_simple.id);
    expect(artist.id).toBe(artist_simple.id);
  });

  /**
   * Verifies that using Artist constructor sets artist ID.
   */
  it('Artist: Instantiating with Object', () => {
    const artist = new Artist({ id: artist_simple.id });
    expect(artist.id).toBe(artist_simple.id);
  });

  /**
   * Verifies that using Artist constructor without ID throws correct error.
   */
  it('Artist: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const artist = new Artist({});
    }).toThrow('Artist.constructor: No ID Provided');
  });

  /**
   * Verifies that the lack of a valid argument passed to the Artist
   * constructor throws correct error.
   */
  it('Artist: Instantiating with Invalid Argument', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const artist = new Artist();
    }).toThrow('Artist.constructor: Invalid Data');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('Track: Instantiating with Data', () => {
    const artist = new Artist(artist_simple);

    expect(artist.id).toBe(artist_simple.id);
    expect(artist.name).toBe(artist_simple.name);
    expect(artist.uri).toBe(artist_simple.uri);
  });

  /**
   * Verifies that static get artist method returns a Artist instance
   * and loads in full object data.
   */
  it('Artist: Static Get Artist', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/artists/${artist_simple.id}`)
      .reply(200, artist_full_object);

    const artist = await Artist.getArtist(artist_simple.id);

    expect(artist.external_urls).toStrictEqual(artist_full_object.external_urls);
    expect(artist.followers).toStrictEqual(artist_full_object.followers);
    expect(artist.genres).toStrictEqual(artist_full_object.genres);
    expect(artist.href).toBe(artist_full_object.href);
    expect(artist.images).toStrictEqual(artist_full_object.images);
    expect(artist.name).toBe(artist_full_object.name);
    expect(artist.popularity).toBe(artist_full_object.popularity);
    expect(artist.type).toBe(artist_full_object.type);
    expect(artist.uri).toBe(artist_full_object.uri);
  });
});

describe('Artist Instance Methods ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies functionality of play method.
   */
  it('Play: Play', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .persist()
      .put('/me/player/play')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const artist = new Artist(artist_simple.id);
    await artist.play();

    expect(req).toBeDefined();
    let body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.context_uri).toBe(artist_full_object.uri);

    req = undefined;

    await artist.play({
      position_ms: 1000,
      offset: {
        position: 1,
      },
    });

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.context_uri).toBe(artist_full_object.uri);
    expect(body.position_ms).toBe(1000);
    expect(body.offset).toStrictEqual({
      position: 1,
    });
  });

  /**
   * Verifies functionality of isFollowed to check if Artist is
   * followed by the current user.
   */
  it('Artist: Is Liked', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .get('/me/following/contains')
      .query({
        ids: artist_simple.id,
        type: 'artist',
      })
      .reply(function () {
        req = this.req;
        return [200, artist_is_followed];
      });

    const artist = new Artist(artist_simple.id);
    const response = await artist.isFollowed();

    expect(req).toBeDefined();
    expect(req.options.path).toContain(artist_simple.id);
    expect(response).toBe(true);
  });

  /**
   * Verifies functionality of follow to add a artist to the user's
   * library.
   */
  it('Artist: Follow', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put('/me/following')
      .query({
        ids: artist_simple.id,
        type: 'artist',
      })
      .reply(function () {
        req = this.req;
        return [200];
      });

    const artist = new Artist(artist_simple.id);
    await artist.follow();

    expect(req).toBeDefined();
  });

  /**
   * Verifies functionality of unfollow to remove a artist to the user's
   * library.
   */
  it('Artist: Unfollow', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .delete('/me/following')
      .query({
        ids: artist_simple.id,
        type: 'artist',
      })
      .reply(function () {
        req = this.req;
        return [200];
      });

    const artist = new Artist(artist_simple.id);
    await artist.unfollow();

    expect(req).toBeDefined();
  });

  /**
   * Verifies functionality of retrieving artist information and
   * populating the artist object.
   */
  it('Artist: Retrieve Full Object', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/artists/${artist_simple.id}`)
      .reply(200, artist_full_object);

    const artist = new Artist(artist_simple.id);

    await artist.retrieveFullObject();

    expect(artist.external_urls).toStrictEqual(artist_full_object.external_urls);
    expect(artist.followers).toStrictEqual(artist_full_object.followers);
    expect(artist.genres).toStrictEqual(artist_full_object.genres);
    expect(artist.href).toBe(artist_full_object.href);
    expect(artist.images).toStrictEqual(artist_full_object.images);
    expect(artist.name).toBe(artist_full_object.name);
    expect(artist.popularity).toBe(artist_full_object.popularity);
    expect(artist.type).toBe(artist_full_object.type);
    expect(artist.uri).toBe(artist_full_object.uri);
  });

  /**
   * Verifies checking whether full object data is present
   * works accurately.
   */
  it('Artist: Contains Full Object', () => {
    const artist = new Artist(artist_simple.id);
    expect(artist.containsFullObject()).toBe(false);

    artist.loadFullObject(artist_full_object);
    expect(artist.containsFullObject()).toBe(true);
  });

  /**
   * Verifies checking whether simplified object data is
   * present works accurately.
   */
  it('Artist: Contains Simplified Object', () => {
    const artist = new Artist(artist_simple.id);
    expect(artist.containsSimplifiedObject()).toBe(false);

    artist.loadSimplifiedObject(artist_full_object);
    expect(artist.containsSimplifiedObject()).toBe(true);
  });

  /**
   * Verifies functionality of get artist data method. Tests
   * whether it returns the correct info and makes an API
   * call when without the data needed.
   */
  it('Artist: Get Full Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/artists/${artist_simple.id}`)
      .reply(200, artist_full_object);

    const artist = new Artist(artist_simple.id);
    const data = await artist.getFullObject();

    expect(data.external_urls).toStrictEqual(artist_full_object.external_urls);
    expect(data.followers).toStrictEqual(artist_full_object.followers);
    expect(data.genres).toStrictEqual(artist_full_object.genres);
    expect(data.href).toBe(artist_full_object.href);
    expect(data.id).toBe(artist_full_object.id);
    expect(data.images).toStrictEqual(artist_full_object.images);
    expect(data.name).toBe(artist_full_object.name);
    expect(data.popularity).toBe(artist_full_object.popularity);
    expect(data.type).toBe(artist_full_object.type);
    expect(data.uri).toBe(artist_full_object.uri);
  });

  /**
   * Verifies functionality of get artist data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Artist: Get Full Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Artist.prototype;
    Artist.override('retrieveFullObject', method);

    const artist = new Artist(artist_full_object);
    const data = await artist.getFullObject();

    expect(data.external_urls).toStrictEqual(artist_full_object.external_urls);
    expect(data.followers).toStrictEqual(artist_full_object.followers);
    expect(data.genres).toStrictEqual(artist_full_object.genres);
    expect(data.href).toBe(artist_full_object.href);
    expect(data.id).toBe(artist_full_object.id);
    expect(data.images).toStrictEqual(artist_full_object.images);
    expect(data.name).toBe(artist_full_object.name);
    expect(data.popularity).toBe(artist_full_object.popularity);
    expect(data.type).toBe(artist_full_object.type);
    expect(data.uri).toBe(artist_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Artist.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get simplified artist data
   * method. Tests whether it returns the correct info
   * and makes an API call when without the data needed.
   */
  it('Artist: Get Simplified Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/artists/${artist_simple.id}`)
      .reply(200, artist_full_object);

    const artist = new Artist(artist_simple.id);
    const data = await artist.getSimplifiedObject();

    expect(data.external_urls).toStrictEqual(artist_full_object.external_urls);
    expect(data.href).toBe(artist_full_object.href);
    expect(data.id).toBe(artist_full_object.id);
    expect(data.name).toBe(artist_full_object.name);
    expect(data.type).toBe(artist_full_object.type);
    expect(data.uri).toBe(artist_full_object.uri);
  });

  /**
   * Verifies functionality of get simplified data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Artist: Get Simplified Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Artist.prototype;
    Artist.override('retrieveFullObject', method);

    const artist = new Artist(artist_full_object);
    const data = await artist.getSimplifiedObject();

    expect(data.external_urls).toStrictEqual(artist_full_object.external_urls);
    expect(data.href).toBe(artist_full_object.href);
    expect(data.id).toBe(artist_full_object.id);
    expect(data.name).toBe(artist_full_object.name);
    expect(data.type).toBe(artist_full_object.type);
    expect(data.uri).toBe(artist_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Artist.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies get top tracks returns a Tracks instance with the
   * correct data.
   */
  // it('Artist: Get Top Tracks', async () => {
  //   nock('https://api.spotify.com/v1')
  //     .get(`/artists/${artist_simple.id}/top-tracks`)
  //     .query({
  //       country: 'US',
  //     })
  //     .reply(200, artist_top_tracks);

  //   const artist = new Artist(artist_simple.id);
  //   const tracks = await artist.getTopTracks();

  //   expect(tracks).toBeInstanceOf(Tracks);
  //   expect(tracks.size()).toBe(artist_top_tracks.tracks.length);

  //   const track = tracks.get(0);

  //   expect(track).toBeInstanceOf(Track);
  //   expect(track.artists).toStrictEqual(artist_top_tracks.tracks[0].artists);
  //   expect(track.album).toStrictEqual(artist_top_tracks.tracks[0].album);
  //   expect(track.available_markets).toStrictEqual(artist_top_tracks.tracks[0].available_markets);
  //   expect(track.disc_number).toBe(artist_top_tracks.tracks[0].disc_number);
  //   expect(track.duration_ms).toBe(artist_top_tracks.tracks[0].duration_ms);
  //   expect(track.explicit).toBe(artist_top_tracks.tracks[0].explicit);
  //   expect(track.external_ids).toStrictEqual(artist_top_tracks.tracks[0].external_ids);
  //   expect(track.external_urls).toStrictEqual(artist_top_tracks.tracks[0].external_urls);
  //   expect(track.href).toBe(artist_top_tracks.tracks[0].href);
  //   expect(track.id).toBe(artist_top_tracks.tracks[0].id);
  //   expect(track.is_local).toBe(artist_top_tracks.tracks[0].is_local);
  //   expect(track.name).toBe(artist_top_tracks.tracks[0].name);
  //   expect(track.popularity).toBe(artist_top_tracks.tracks[0].popularity);
  //   expect(track.preview_url).toBe(artist_top_tracks.tracks[0].preview_url);
  //   expect(track.track_number).toBe(artist_top_tracks.tracks[0].track_number);
  //   expect(track.type).toBe(artist_top_tracks.tracks[0].type);
  //   expect(track.uri).toBe(artist_top_tracks.tracks[0].uri);
  // });

  /**
   * Verifies get albums returns an Albums instance with the
   * correct data.
   */
  // it('Artist: Get Albums', async () => {
  //   nock('https://api.spotify.com/v1')
  //     .get(`/artists/${artist_simple.id}/albums`)
  //     .query({
  //       limit: 1,
  //       offset: 0,
  //     })
  //     .reply(200, artist_albums);

  //   const artist = new Artist(artist_simple.id);
  //   const albums = await artist.getAlbums({
  //     limit: 1,
  //     offset: 0,
  //   });

  //   expect(albums).toBeInstanceOf(Albums);
  //   expect(albums.size()).toBe(artist_albums.items.length);

  //   const album = albums.get(0);

  //   expect(album).toBeInstanceOf(Album);
  //   expect(album.album_type).toBe(artist_albums.items[2].album_type);
  //   expect(album.artists).toStrictEqual(artist_albums.items[2].artists);
  //   expect(album.available_markets).toBeInstanceOf(artist_albums.items[2].available_markets);
  //   expect(album.copyrights).toStrictEqual(artist_albums.items[2].copyrights);
  //   expect(album.external_ids).toStrictEqual(artist_albums.items[2].external_ids);
  //   expect(album.external_urls).toStrictEqual(artist_albums.items[2].external_urls);
  //   expect(album.genres).toStrictEqual(artist_albums.items[2].genres);
  //   expect(album.href).toBe(artist_albums.items[2].href);
  //   expect(album.id).toBe(artist_albums.items[2].id);
  //   expect(album.images).toStrictEqual(artist_albums.items[2].images);
  //   expect(album.label).toBe(artist_albums.items[2].label);
  //   expect(album.name).toBe(artist_albums.items[2].name);
  //   expect(album.popularity).toBe(artist_albums.items[2].popularity);
  //   expect(album.release_date).toBe(artist_albums.items[2].release_date);
  //   expect(album.release_date_precision).toBe(artist_albums.items[2].release_date_precision);
  //   expect(album.tracks).toStrictEqual(artist_albums.items[2].tracks);
  //   expect(album.type).toBe(artist_albums.items[2].type);
  //   expect(album.uri).toBe(artist_albums.items[2].uri);
  // });
});
