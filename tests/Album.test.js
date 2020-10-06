/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  album_full_object,
  album_simple,
  album_is_liked,
  album_tracks,
} = require('./fixtures');

const {
  Album,
  Artist,
  Artists,
  Track,
  Tracks,
} = EnhancedSpotifyAPI;

describe('Album Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Album class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Album: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Album.setAccessToken(token);

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
   * Verfies the ability to add methods to the Album prototype.
   */
  it('Album: Add Methods', () => {
    const method = jest.fn();

    Album.addMethods({
      test: method,
    });

    const album = new Album(album_simple.id);
    album.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Album prototype.
   */
  it('Album: Override', () => {
    const method = jest.fn();
    const { like } = Album.prototype;
    Album.override('like', method);

    const album = new Album(album_simple.id);
    album.like();

    expect(method).toHaveBeenCalled();

    Album.override('like', like);
  });
});

describe('Album Instantiation', () => {
  /**
   * Verifies that using Album constructor sets album ID.
   */
  it('Album: Instantiating with String', () => {
    const album = new Album(album_simple.id);
    expect(album.id).toBe(album_simple.id);
  });

  /**
   * Verifies that using Album constructor sets album ID.
   */
  it('Album: Instantiating with Object', () => {
    const album = new Album({ id: album_simple.id });
    expect(album.id).toBe(album_simple.id);
  });

  /**
   * Verifies that using Album constructor without ID throws correct error.
   */
  it('Album: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const album = new Album({});
    }).toThrow('Album.constructor: No ID Provided');
  });

  /**
   * Verifies that the lack of a valid argument passed to the Album
   * constructor throws correct error.
   */
  it('Album: Instantiating with Invalid Argument', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const album = new Album();
    }).toThrow('Album.constructor: Invalid Data');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('Album: Instantiating with Data', () => {
    const album = new Album(album_simple);

    expect(album.id).toBe(album_simple.id);
    expect(album.name).toBe(album_simple.name);
    expect(album.uri).toBe(album_simple.uri);
  });

  /**
   * Verifies that static get album method returns a Album instance
   * and loads in full object data.
   */
  it('Album: Static Get Album', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${album_simple.id}`)
      .reply(200, album_full_object);

    const album = await Album.getAlbum(album_simple.id);

    expect(album.album_type).toBe(album_full_object.album_type);
    expect(album.artists).toStrictEqual(album_full_object.artists);
    expect(album.available_markets).toStrictEqual(album_full_object.available_markets);
    expect(album.copyrights).toStrictEqual(album_full_object.copyrights);
    expect(album.external_ids).toStrictEqual(album_full_object.external_ids);
    expect(album.external_urls).toStrictEqual(album_full_object.external_urls);
    expect(album.genres).toStrictEqual(album_full_object.genres);
    expect(album.href).toBe(album_full_object.href);
    expect(album.id).toBe(album_full_object.id);
    expect(album.images).toStrictEqual(album_full_object.images);
    expect(album.label).toBe(album_full_object.label);
    expect(album.name).toBe(album_full_object.name);
    expect(album.popularity).toBe(album_full_object.popularity);
    expect(album.release_date).toBe(album_full_object.release_date);
    expect(album.release_date_precision).toBe(album_full_object.release_date_precision);
    expect(album.total_tracks).toBe(album_full_object.total_tracks);
    expect(album.tracks).toStrictEqual(album_full_object.tracks);
    expect(album.type).toBe(album_full_object.type);
    expect(album.uri).toBe(album_full_object.uri);
  });
});

describe('Album Instance Methods ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies functionality of play method.
   */
  it('Album: Play', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .persist()
      .put('/me/player/play')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const album = new Album(album_simple.id);
    await album.play();

    expect(req).toBeDefined();
    let body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.context_uri).toBe(album_full_object.uri);

    req = undefined;

    await album.play({
      position_ms: 1000,
      offset: {
        position: 1,
      },
    });

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.context_uri).toBe(album_full_object.uri);
    expect(body.position_ms).toBe(1000);
    expect(body.offset).toStrictEqual({
      position: 1,
    });
  });

  /**
   * Verifies functionality of isLiked to check if Album is in the
   * user's library.
   */
  it('Album: Is Liked', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .get('/me/albums/contains')
      .query({ ids: album_simple.id })
      .reply(function () {
        req = this.req;
        return [200, album_is_liked];
      });

    const album = new Album(album_simple.id);
    const response = await album.isLiked();

    expect(req).toBeDefined();
    expect(req.options.path).toContain(album_simple.id);
    expect(response).toBe(true);
  });

  /**
   * Verifies functionality of like to add a album to the user's
   * library.
   */
  it('Album: Like', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put('/me/albums')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const album = new Album(album_simple.id);
    await album.like();

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body).toStrictEqual([album_simple.id]);
  });

  /**
   * Verifies functionality of unlike to remove a album to the user's
   * library.
   */
  it('Album: Unlike', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .delete('/me/albums')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const album = new Album(album_simple.id);
    await album.unlike();

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body).toStrictEqual([album_simple.id]);
  });

  /**
   * Verifies functionality of retrieving album information and
   * populating the album object.
   */
  it('Album: Retrieve Full Object', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${album_simple.id}`)
      .reply(200, album_full_object);

    const album = new Album(album_simple.id);

    await album.retrieveFullObject();

    expect(album.album_type).toBe(album_full_object.album_type);
    expect(album.artists).toStrictEqual(album_full_object.artists);
    expect(album.available_markets).toStrictEqual(album_full_object.available_markets);
    expect(album.copyrights).toStrictEqual(album_full_object.copyrights);
    expect(album.external_ids).toStrictEqual(album_full_object.external_ids);
    expect(album.external_urls).toStrictEqual(album_full_object.external_urls);
    expect(album.genres).toStrictEqual(album_full_object.genres);
    expect(album.href).toBe(album_full_object.href);
    expect(album.id).toBe(album_full_object.id);
    expect(album.images).toStrictEqual(album_full_object.images);
    expect(album.label).toBe(album_full_object.label);
    expect(album.name).toBe(album_full_object.name);
    expect(album.popularity).toBe(album_full_object.popularity);
    expect(album.release_date).toBe(album_full_object.release_date);
    expect(album.release_date_precision).toBe(album_full_object.release_date_precision);
    expect(album.tracks).toStrictEqual(album_full_object.tracks);
    expect(album.type).toBe(album_full_object.type);
    expect(album.uri).toBe(album_full_object.uri);
  });

  /**
   * Verifies functionality of retrieving album track
   * information and populating the album tracks object.
   */
  it('Album: Retrieve Tracks', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${album_simple.id}/tracks`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, album_tracks);

    const album = new Album(album_simple.id);
    await album.retrieveTracks();

    expect(album.tracksRetrieved).toBe(true);
    expect(album._tracks).toBeInstanceOf(Tracks);
    expect(album._tracks.size()).toBe(album_tracks.items.length);

    const track = album._tracks.get(0);

    expect(track).toBeInstanceOf(Track);
    expect(track.artists).toStrictEqual(album_tracks.items[0].artists);
    expect(track.album).toStrictEqual(album_tracks.items[0].album);
    expect(track.available_markets).toStrictEqual(album_tracks.items[0].available_markets);
    expect(track.disc_number).toBe(album_tracks.items[0].disc_number);
    expect(track.duration_ms).toBe(album_tracks.items[0].duration_ms);
    expect(track.explicit).toBe(album_tracks.items[0].explicit);
    expect(track.external_ids).toStrictEqual(album_tracks.items[0].external_ids);
    expect(track.external_urls).toStrictEqual(album_tracks.items[0].external_urls);
    expect(track.href).toBe(album_tracks.items[0].href);
    expect(track.id).toBe(album_tracks.items[0].id);
    expect(track.is_local).toBe(album_tracks.items[0].is_local);
    expect(track.name).toBe(album_tracks.items[0].name);
    expect(track.popularity).toBe(album_tracks.items[0].popularity);
    expect(track.preview_url).toBe(album_tracks.items[0].preview_url);
    expect(track.track_number).toBe(album_tracks.items[0].track_number);
    expect(track.type).toBe(album_tracks.items[0].type);
    expect(track.uri).toBe(album_tracks.items[0].uri);
  });

  /**
   * Verifies checking whether full object data is present
   * works accurately.
   */
  it('Album: Contains Full Object', () => {
    const album = new Album(album_simple.id);
    expect(album.containsFullObject()).toBe(false);

    album.loadFullObject(album_full_object);
    expect(album.containsFullObject()).toBe(true);
  });

  /**
   * Verifies checking whether simplified object data is
   * present works accurately.
   */
  it('Album: Contains Simplified Object', () => {
    const album = new Album(album_simple.id);
    expect(album.containsSimplifiedObject()).toBe(false);

    album.loadSimplifiedObject(album_full_object);
    expect(album.containsSimplifiedObject()).toBe(true);
  });

  /**
   * Verifies functionality of get album data method. Tests
   * whether it returns the correct info and makes an API
   * call when without the data needed.
   */
  it('Album: Get Full Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${album_simple.id}`)
      .reply(200, album_full_object);

    const album = new Album(album_simple.id);
    const data = await album.getFullObject();

    expect(data.album_type).toBe(album_full_object.album_type);
    expect(data.artists).toStrictEqual(album_full_object.artists);
    expect(data.available_markets).toStrictEqual(album_full_object.available_markets);
    expect(data.copyrights).toStrictEqual(album_full_object.copyrights);
    expect(data.external_ids).toStrictEqual(album_full_object.external_ids);
    expect(data.external_urls).toStrictEqual(album_full_object.external_urls);
    expect(data.genres).toStrictEqual(album_full_object.genres);
    expect(data.href).toBe(album_full_object.href);
    expect(data.id).toBe(album_full_object.id);
    expect(data.images).toStrictEqual(album_full_object.images);
    expect(data.label).toBe(album_full_object.label);
    expect(data.name).toBe(album_full_object.name);
    expect(data.popularity).toBe(album_full_object.popularity);
    expect(data.release_date).toBe(album_full_object.release_date);
    expect(data.release_date_precision).toBe(album_full_object.release_date_precision);
    expect(data.tracks).toStrictEqual(album_full_object.tracks);
    expect(data.type).toBe(album_full_object.type);
    expect(data.uri).toBe(album_full_object.uri);
  });

  /**
   * Verifies functionality of get album data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Album: Get Full Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Album.prototype;
    Album.override('retrieveFullObject', method);

    const album = new Album(album_full_object);
    const data = await album.getFullObject();

    expect(data.album_type).toBe(album_full_object.album_type);
    expect(data.artists).toStrictEqual(album_full_object.artists);
    expect(data.available_markets).toStrictEqual(album_full_object.available_markets);
    expect(data.copyrights).toStrictEqual(album_full_object.copyrights);
    expect(data.external_ids).toStrictEqual(album_full_object.external_ids);
    expect(data.external_urls).toStrictEqual(album_full_object.external_urls);
    expect(data.genres).toStrictEqual(album_full_object.genres);
    expect(data.href).toBe(album_full_object.href);
    expect(data.id).toBe(album_full_object.id);
    expect(data.images).toStrictEqual(album_full_object.images);
    expect(data.label).toBe(album_full_object.label);
    expect(data.name).toBe(album_full_object.name);
    expect(data.popularity).toBe(album_full_object.popularity);
    expect(data.release_date).toBe(album_full_object.release_date);
    expect(data.release_date_precision).toBe(album_full_object.release_date_precision);
    expect(data.tracks).toStrictEqual(album_full_object.tracks);
    expect(data.type).toBe(album_full_object.type);
    expect(data.uri).toBe(album_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Album.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get simplified album data
   * method. Tests whether it returns the correct info
   * and makes an API call when without the data needed.
   */
  it('Album: Get Simplified Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${album_simple.id}`)
      .reply(200, album_full_object);

    const album = new Album(album_simple.id);
    const data = await album.getSimplifiedObject();

    expect(data.album_type).toBe(album_full_object.album_type);
    expect(data.artists).toStrictEqual(album_full_object.artists);
    expect(data.available_markets).toStrictEqual(album_full_object.available_markets);
    expect(data.external_urls).toStrictEqual(album_full_object.external_urls);
    expect(data.href).toBe(album_full_object.href);
    expect(data.id).toBe(album_full_object.id);
    expect(data.images).toStrictEqual(album_full_object.images);
    expect(data.release_date).toBe(album_full_object.release_date);
    expect(data.release_date_precision).toBe(album_full_object.release_date_precision);
    expect(data.uri).toBe(album_full_object.uri);
  });

  /**
   * Verifies functionality of get simplified data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Album: Get Simplified Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Album.prototype;
    Album.override('retrieveFullObject', method);

    const album = new Album(album_full_object);
    const data = await album.getSimplifiedObject();

    expect(data.album_type).toBe(album_full_object.album_type);
    expect(data.artists).toStrictEqual(album_full_object.artists);
    expect(data.available_markets).toStrictEqual(album_full_object.available_markets);
    expect(data.external_urls).toStrictEqual(album_full_object.external_urls);
    expect(data.href).toBe(album_full_object.href);
    expect(data.id).toBe(album_full_object.id);
    expect(data.images).toStrictEqual(album_full_object.images);
    expect(data.release_date).toBe(album_full_object.release_date);
    expect(data.release_date_precision).toBe(album_full_object.release_date_precision);
    expect(data.uri).toBe(album_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Album.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get current data method.
   * Tests whether it returns the correct info and doesn't
   * make an API call.
   */
  it('Album: Get Current Data Object', async () => {
    const album = new Album(album_simple);
    const data = await album.getCurrentData();

    expect(data.id).toBe(album_full_object.id);
    expect(data.name).toBe(album_full_object.name);
    expect(data.uri).toBe(album_full_object.uri);
  });

  /**
   * Verifies get tracks returns a Tracks instance with the
   * correct data, retrieving when absent.
   */
  it('Album: Get Tracks (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${album_simple.id}/tracks`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, album_tracks);

    const album = new Album(album_simple.id);
    const tracks = await album.getTracks();

    expect(tracks).toBeInstanceOf(Tracks);
    expect(tracks.size()).toBe(album_full_object.total_tracks);

    const track = tracks.get(0);

    expect(track).toBeInstanceOf(Track);
    expect(track.artists).toStrictEqual(album_tracks.items[0].artists);
    expect(track.album).toStrictEqual(album_tracks.items[0].album);
    expect(track.available_markets).toStrictEqual(album_tracks.items[0].available_markets);
    expect(track.disc_number).toBe(album_tracks.items[0].disc_number);
    expect(track.duration_ms).toBe(album_tracks.items[0].duration_ms);
    expect(track.explicit).toBe(album_tracks.items[0].explicit);
    expect(track.external_ids).toStrictEqual(album_tracks.items[0].external_ids);
    expect(track.external_urls).toStrictEqual(album_tracks.items[0].external_urls);
    expect(track.href).toBe(album_tracks.items[0].href);
    expect(track.id).toBe(album_tracks.items[0].id);
    expect(track.is_local).toBe(album_tracks.items[0].is_local);
    expect(track.name).toBe(album_tracks.items[0].name);
    expect(track.popularity).toBe(album_tracks.items[0].popularity);
    expect(track.preview_url).toBe(album_tracks.items[0].preview_url);
    expect(track.track_number).toBe(album_tracks.items[0].track_number);
    expect(track.type).toBe(album_tracks.items[0].type);
    expect(track.uri).toBe(album_tracks.items[0].uri);
  });

  /**
   * Verifies get tracks returns a Tracks instance with the
   * correct data, not retrieving when data is present.
   */
  it('Album: Get Tracks (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveTracks } = Album.prototype;
    Album.override('retrieveTracks', method);

    const album = new Album(album_simple.id);
    album.loadTracks(album_tracks);
    album.tracksRetrieved = true;
    const tracks = await album.getTracks();

    expect(tracks).toBeInstanceOf(Tracks);
    expect(tracks.size()).toBe(album_full_object.total_tracks);

    const track = tracks.get(0);

    expect(track).toBeInstanceOf(Track);
    expect(track.artists).toStrictEqual(album_tracks.items[0].artists);
    expect(track.album).toStrictEqual(album_tracks.items[0].album);
    expect(track.available_markets).toStrictEqual(album_tracks.items[0].available_markets);
    expect(track.disc_number).toBe(album_tracks.items[0].disc_number);
    expect(track.duration_ms).toBe(album_tracks.items[0].duration_ms);
    expect(track.explicit).toBe(album_tracks.items[0].explicit);
    expect(track.external_ids).toStrictEqual(album_tracks.items[0].external_ids);
    expect(track.external_urls).toStrictEqual(album_tracks.items[0].external_urls);
    expect(track.href).toBe(album_tracks.items[0].href);
    expect(track.id).toBe(album_tracks.items[0].id);
    expect(track.is_local).toBe(album_tracks.items[0].is_local);
    expect(track.name).toBe(album_tracks.items[0].name);
    expect(track.popularity).toBe(album_tracks.items[0].popularity);
    expect(track.preview_url).toBe(album_tracks.items[0].preview_url);
    expect(track.track_number).toBe(album_tracks.items[0].track_number);
    expect(track.type).toBe(album_tracks.items[0].type);
    expect(track.uri).toBe(album_tracks.items[0].uri);

    expect(method).not.toHaveBeenCalled();

    Album.override('retrieveTracks', retrieveTracks);
  });

  /**
   * Verifies get artist returns an Artist instance with the
   * correct data, retrieving when absent.
   */
  it('Album: Get Artists (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${album_simple.id}`)
      .reply(200, album_full_object);

    const album = new Album(album_simple.id);
    const artists = await album.getArtists();

    expect(artists).toBeInstanceOf(Artists);

    const artist = artists.get(0);

    expect(artist).toBeInstanceOf(Artist);
    expect(artist.external_urls).toStrictEqual(album_full_object.artists[0].external_urls);
    expect(artist.href).toBe(album_full_object.artists[0].href);
    expect(artist.id).toBe(album_full_object.artists[0].id);
    expect(artist.name).toBe(album_full_object.artists[0].name);
    expect(artist.uri).toBe(album_full_object.artists[0].uri);
  });

  /**
   * Verifies get artist returns an Artist instance with the
   * correct data, not retrieving when data is present.
   */
  it('Album: Get Artists (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Album.prototype;
    Album.override('retrieveFullObject', method);

    const album = new Album(album_full_object);
    const artists = await album.getArtists();

    expect(artists).toBeInstanceOf(Artists);

    const artist = artists.get(0);

    expect(artist).toBeInstanceOf(Artist);
    expect(artist.external_urls).toStrictEqual(album_full_object.artists[0].external_urls);
    expect(artist.href).toBe(album_full_object.artists[0].href);
    expect(artist.id).toBe(album_full_object.artists[0].id);
    expect(artist.name).toBe(album_full_object.artists[0].name);
    expect(artist.uri).toBe(album_full_object.artists[0].uri);

    expect(method).not.toHaveBeenCalled();

    Album.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies load full object populates correct data.
   */
  it('Album: Load Full Object', () => {
    const album = new Album(album_simple.id);
    expect(album.containsFullObject()).toBe(false);
    album.loadFullObject(album_full_object);
    expect(album.containsFullObject()).toBe(true);
  });

  /**
   * Verifies load simplified object populates correct data.
   */
  it('Album: Load Simplified Object', () => {
    const album = new Album(album_simple.id);
    expect(album.containsSimplifiedObject()).toBe(false);
    album.loadSimplifiedObject(album_full_object);
    expect(album.containsSimplifiedObject()).toBe(true);
  });

  /**
   * Verifies load conditionally populates correct data.
   */
  it('Album: Load Conditionally', () => {
    const album = new Album(album_simple.id);
    expect(album.containsFullObject()).toBe(false);
    album.loadConditionally(album_simple);
    expect(album.containsFullObject()).toBe(false);
    expect(album.name).toBe(album_simple.name);
    expect(album.uri).toBe(album_simple.uri);
  });
});
