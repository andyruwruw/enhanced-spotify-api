/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  album_tracks,
  albums_are_liked,
  albums_full_object,
  albums_new_releases,
  albums_saved,
  albums_search,
  albums_simple,
  artist_albums,
} = require('./fixtures');

const {
  Album,
  Albums,
  Artist,
  Artists,
  Track,
  Tracks,
} = EnhancedSpotifyAPI;

describe('Albums Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Albums class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Albums: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Albums.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/albums`)
      .query({
        ids: albums_simple.map(album => album.id).join(','),
      })
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, albums_full_object];
      });

    const albums = new Albums(albums_simple.map(album => album.id));
    await albums.retrieveFullObjects();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verfies the ability to add methods to the Albums prototype.
   */
  it('Albums: Add Methods', () => {
    const method = jest.fn();

    Albums.addMethods({
      test: method,
    });

    const albums = new Albums(albums_simple.map(album => album.id));
    albums.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Albums prototype.
   */
  it('Albums: Override', () => {
    const method = jest.fn();
    const { areLiked } = Albums.prototype;
    Albums.override('areLiked', method);

    const albums = new Albums(albums_simple.map(album => album.id));
    albums.areLiked();

    expect(method).toHaveBeenCalled();

    Albums.override('areLiked', areLiked);
  });
});

describe('Albums Instantiation', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies that using Albums constructor sets album ID.
   */
  it('Albums: Instantiating with String', () => {
    const albums = new Albums(albums_simple[0].id);
    expect(albums.get(0).id).toBe(albums_simple[0].id);
  });

  /**
   * Verifies that using Albums constructor sets album ID.
   */
  it('Albums: Instantiating with Object', () => {
    const albums = new Albums({ id: albums_simple[0].id });
    expect(albums.get(0).id).toBe(albums_simple[0].id);
  });

  /**
   * Verifies that using Albums constructor sets album ID.
   */
  it('Albums: Instantiating with Instance', () => {
    const album = new Album({ id: albums_simple[0].id });
    const albums = new Albums(album);
    expect(albums.get(0).id).toBe(albums_simple[0].id);
  });

  /**
   * Verifies that using Albums constructor sets album IDs.
   */
  it('Albums: Instantiating with Array of Strings', () => {
    const albums = new Albums(albums_simple.map(album => album.id));
    expect(albums.get(0).id).toBe(albums_simple[0].id);
    expect(albums.get(1).id).toBe(albums_simple[1].id);
    expect(albums.get(2).id).toBe(albums_simple[2].id);
  });

  /**
   * Verifies that using Albums constructor sets album IDs.
   */
  it('Albums: Instantiating with Array of Objects', () => {
    const albums = new Albums(albums_simple.map((album) => {
      return {
        id: album.id,
      };
    }));
    expect(albums.get(0).id).toBe(albums_simple[0].id);
    expect(albums.get(1).id).toBe(albums_simple[1].id);
    expect(albums.get(2).id).toBe(albums_simple[2].id);
  });

  /**
   * Verifies that using Albums constructor sets album IDs.
   */
  it('Albums: Instantiating with Array of Instances', () => {
    const albums = new Albums(albums_simple.map((album) => {
      return new Album(album.id);
    }));
    expect(albums.get(0).id).toBe(albums_simple[0].id);
    expect(albums.get(1).id).toBe(albums_simple[1].id);
    expect(albums.get(2).id).toBe(albums_simple[2].id);
  });

  /**
   * Verifies that using Albums constructor without ID throws correct error.
   */
  it('Albums: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const albums = new Albums({});
    }).toThrow('Albums.push: Invalid Parameter "item"');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('Albums: Instantiating with Data', () => {
    const albums = new Albums(albums_simple);

    expect(albums.get(0).id).toBe(albums_simple[0].id);
    expect(albums.get(0).name).toBe(albums_simple[0].name);
    expect(albums.get(0).uri).toBe(albums_simple[0].uri);
    expect(albums.get(1).id).toBe(albums_simple[1].id);
    expect(albums.get(1).name).toBe(albums_simple[1].name);
    expect(albums.get(1).uri).toBe(albums_simple[1].uri);
    expect(albums.get(2).id).toBe(albums_simple[2].id);
    expect(albums.get(2).name).toBe(albums_simple[2].name);
    expect(albums.get(2).uri).toBe(albums_simple[2].uri);
  });

  /**
   * Verifies search returns Albums instance of search results.
   */
  it('Albums: Search', async () => {
    const query = 'El Camino';
    nock('https://api.spotify.com/v1')
      .get(`/search/`)
      .query({
        q: query,
        type: 'album',
      })
      .reply(200, albums_search);
    
    const albums = await Albums.search(query);

    expect(albums).toBeInstanceOf(Albums);
    expect(albums.size()).toBe(20);

    const album = albums.get(0);

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(albums_search.albums.items[0].album_type);
    expect(album.artists).toStrictEqual(albums_search.albums.items[0].artists);
    expect(album.available_markets).toStrictEqual(albums_search.albums.items[0].available_markets);
    expect(album.copyrights).toStrictEqual(albums_search.albums.items[0].copyrights);
    expect(album.external_ids).toStrictEqual(albums_search.albums.items[0].external_ids);
    expect(album.external_urls).toStrictEqual(albums_search.albums.items[0].external_urls);
    expect(album.genres).toStrictEqual(albums_search.albums.items[0].genres);
    expect(album.href).toBe(albums_search.albums.items[0].href);
    expect(album.id).toBe(albums_search.albums.items[0].id);
    expect(album.images).toStrictEqual(albums_search.albums.items[0].images);
    expect(album.label).toBe(albums_search.albums.items[0].label);
    expect(album.name).toBe(albums_search.albums.items[0].name);
    expect(album.popularity).toBe(albums_search.albums.items[0].popularity);
    expect(album.release_date).toBe(albums_search.albums.items[0].release_date);
    expect(album.release_date_precision).toBe(albums_search.albums.items[0].release_date_precision);
    expect(album.total_tracks).toBe(albums_search.albums.items[0].total_tracks);
    expect(album.tracks).toStrictEqual(albums_search.albums.items[0].tracks);
    expect(album.type).toBe(albums_search.albums.items[0].type);
    expect(album.uri).toBe(albums_search.albums.items[0].uri);
  });

  /**
   * Verifies get saved albums returns Albums instance of results.
   */
  it('Albums: Get User\'s Saved Albums', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/me/albums`)
      .reply(200, albums_saved);
    
    const albums = await Albums.getMySavedAlbums();

    expect(albums).toBeInstanceOf(Albums);
    expect(albums.size()).toBe(3);

    const album = albums.get(0);

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(albums_saved.items[0].album.album_type);
    expect(album.artists).toStrictEqual(albums_saved.items[0].album.artists);
    expect(album.available_markets).toStrictEqual(albums_saved.items[0].album.available_markets);
    expect(album.copyrights).toStrictEqual(albums_saved.items[0].album.copyrights);
    expect(album.external_ids).toStrictEqual(albums_saved.items[0].album.external_ids);
    expect(album.external_urls).toStrictEqual(albums_saved.items[0].album.external_urls);
    expect(album.genres).toStrictEqual(albums_saved.items[0].album.genres);
    expect(album.href).toBe(albums_saved.items[0].album.href);
    expect(album.id).toBe(albums_saved.items[0].album.id);
    expect(album.images).toStrictEqual(albums_saved.items[0].album.images);
    expect(album.label).toBe(albums_saved.items[0].album.label);
    expect(album.name).toBe(albums_saved.items[0].album.name);
    expect(album.popularity).toBe(albums_saved.items[0].album.popularity);
    expect(album.release_date).toBe(albums_saved.items[0].album.release_date);
    expect(album.release_date_precision).toBe(albums_saved.items[0].album.release_date_precision);
    expect(album.total_tracks).toBe(albums_saved.items[0].album.total_tracks);
    expect(album.tracks).toStrictEqual(albums_saved.items[0].album.tracks);
    expect(album.type).toBe(albums_saved.items[0].album.type);
    expect(album.uri).toBe(albums_saved.items[0].album.uri);
  });

  /**
   * Verifies get all saved albums returns Albums instance of results.
   */
  it('Albums: Get All User\'s Saved Albums', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/me/albums`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, albums_saved);
    
    const albums = await Albums.getAllMySavedAlbums();

    expect(albums).toBeInstanceOf(Albums);
    expect(albums.size()).toBe(3);

    const album = albums.get(0);

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(albums_saved.items[0].album.album_type);
    expect(album.artists).toStrictEqual(albums_saved.items[0].album.artists);
    expect(album.available_markets).toStrictEqual(albums_saved.items[0].album.available_markets);
    expect(album.copyrights).toStrictEqual(albums_saved.items[0].album.copyrights);
    expect(album.external_ids).toStrictEqual(albums_saved.items[0].album.external_ids);
    expect(album.external_urls).toStrictEqual(albums_saved.items[0].album.external_urls);
    expect(album.genres).toStrictEqual(albums_saved.items[0].album.genres);
    expect(album.href).toBe(albums_saved.items[0].album.href);
    expect(album.id).toBe(albums_saved.items[0].album.id);
    expect(album.images).toStrictEqual(albums_saved.items[0].album.images);
    expect(album.label).toBe(albums_saved.items[0].album.label);
    expect(album.name).toBe(albums_saved.items[0].album.name);
    expect(album.popularity).toBe(albums_saved.items[0].album.popularity);
    expect(album.release_date).toBe(albums_saved.items[0].album.release_date);
    expect(album.release_date_precision).toBe(albums_saved.items[0].album.release_date_precision);
    expect(album.total_tracks).toBe(albums_saved.items[0].album.total_tracks);
    expect(album.tracks).toStrictEqual(albums_saved.items[0].album.tracks);
    expect(album.type).toBe(albums_saved.items[0].album.type);
    expect(album.uri).toBe(albums_saved.items[0].album.uri);
  });

  /**
   * Verifies get albums returns Albums instance of results.
   */
  it('Albums: Get Albums', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums`)
      .query({
        ids: albums_simple.map(album => album.id).join(','),
      })
      .reply(200, albums_full_object);
    
    const albums = await Albums.getAlbums(albums_simple.map(album => album.id));

    expect(albums).toBeInstanceOf(Albums);
    expect(albums.size()).toBe(3);

    const album = albums.get(0);

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(albums_full_object.albums[0].album_type);
    expect(album.artists).toStrictEqual(albums_full_object.albums[0].artists);
    expect(album.available_markets).toStrictEqual(albums_full_object.albums[0].available_markets);
    expect(album.copyrights).toStrictEqual(albums_full_object.albums[0].copyrights);
    expect(album.external_ids).toStrictEqual(albums_full_object.albums[0].external_ids);
    expect(album.external_urls).toStrictEqual(albums_full_object.albums[0].external_urls);
    expect(album.genres).toStrictEqual(albums_full_object.albums[0].genres);
    expect(album.href).toBe(albums_full_object.albums[0].href);
    expect(album.id).toBe(albums_full_object.albums[0].id);
    expect(album.images).toStrictEqual(albums_full_object.albums[0].images);
    expect(album.label).toBe(albums_full_object.albums[0].label);
    expect(album.name).toBe(albums_full_object.albums[0].name);
    expect(album.popularity).toBe(albums_full_object.albums[0].popularity);
    expect(album.release_date).toBe(albums_full_object.albums[0].release_date);
    expect(album.release_date_precision).toBe(albums_full_object.albums[0].release_date_precision);
    expect(album.tracks).toStrictEqual(albums_full_object.albums[0].tracks);
    expect(album.type).toBe(albums_full_object.albums[0].type);
    expect(album.uri).toBe(albums_full_object.albums[0].uri);
  });

  /**
   * Verifies get artist albums returns Albums instance of results.
   */
  it('Albums: Get Artist Albums', async () => {
    const artist = '4yvcSjfu4PC0CYQyLy4wSq';
    nock('https://api.spotify.com/v1')
      .get(`/artists/${artist}/albums`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, artist_albums);
    
    const albums = await Albums.getArtistAlbums(artist);

    expect(albums).toBeInstanceOf(Albums);
    expect(albums.size()).toBe(3);

    const album = albums.get(0);

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(artist_albums.items[0].album_type);
    expect(album.artists).toStrictEqual(artist_albums.items[0].artists);
    expect(album.available_markets).toStrictEqual(artist_albums.items[0].available_markets);
    expect(album.copyrights).toStrictEqual(artist_albums.items[0].copyrights);
    expect(album.external_ids).toStrictEqual(artist_albums.items[0].external_ids);
    expect(album.external_urls).toStrictEqual(artist_albums.items[0].external_urls);
    expect(album.genres).toStrictEqual(artist_albums.items[0].genres);
    expect(album.href).toBe(artist_albums.items[0].href);
    expect(album.id).toBe(artist_albums.items[0].id);
    expect(album.images).toStrictEqual(artist_albums.items[0].images);
    expect(album.label).toBe(artist_albums.items[0].label);
    expect(album.name).toBe(artist_albums.items[0].name);
    expect(album.popularity).toBe(artist_albums.items[0].popularity);
    expect(album.release_date).toBe(artist_albums.items[0].release_date);
    expect(album.release_date_precision).toBe(artist_albums.items[0].release_date_precision);
    expect(album.tracks).toStrictEqual(artist_albums.items[0].tracks);
    expect(album.type).toBe(artist_albums.items[0].type);
    expect(album.uri).toBe(artist_albums.items[0].uri);
  });

  /**
   * Verifies get new releases returns Albums instance of results.
   */
  it('Albums: Get New Releases', async () => {
    const artist = '4yvcSjfu4PC0CYQyLy4wSq';
    nock('https://api.spotify.com/v1')
      .get(`/browse/new-releases`)
      .reply(200, albums_new_releases);
    
    const albums = await Albums.getNewReleases();

    expect(albums).toBeInstanceOf(Albums);
    expect(albums.size()).toBe(3);

    const album = albums.get(0);

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(albums_new_releases.albums.items[0].album_type);
    expect(album.artists).toStrictEqual(albums_new_releases.albums.items[0].artists);
    expect(album.available_markets).toStrictEqual(albums_new_releases.albums.items[0].available_markets);
    expect(album.copyrights).toStrictEqual(albums_new_releases.albums.items[0].copyrights);
    expect(album.external_ids).toStrictEqual(albums_new_releases.albums.items[0].external_ids);
    expect(album.external_urls).toStrictEqual(albums_new_releases.albums.items[0].external_urls);
    expect(album.genres).toStrictEqual(albums_new_releases.albums.items[0].genres);
    expect(album.href).toBe(albums_new_releases.albums.items[0].href);
    expect(album.id).toBe(albums_new_releases.albums.items[0].id);
    expect(album.images).toStrictEqual(albums_new_releases.albums.items[0].images);
    expect(album.label).toBe(albums_new_releases.albums.items[0].label);
    expect(album.name).toBe(albums_new_releases.albums.items[0].name);
    expect(album.popularity).toBe(albums_new_releases.albums.items[0].popularity);
    expect(album.release_date).toBe(albums_new_releases.albums.items[0].release_date);
    expect(album.release_date_precision).toBe(albums_new_releases.albums.items[0].release_date_precision);
    expect(album.tracks).toStrictEqual(albums_new_releases.albums.items[0].tracks);
    expect(album.type).toBe(albums_new_releases.albums.items[0].type);
    expect(album.uri).toBe(albums_new_releases.albums.items[0].uri);
  });
});

describe('Albums Instance Methods ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies functionality of play method.
   */
  it('Albums: Play', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${albums_simple[0].id}/tracks`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, album_tracks);

    nock('https://api.spotify.com/v1')
      .get(`/albums/${albums_simple[1].id}/tracks`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, album_tracks);

    nock('https://api.spotify.com/v1')
      .get(`/albums/${albums_simple[2].id}/tracks`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, album_tracks);

    let req;
    nock('https://api.spotify.com/v1')
      .persist()
      .put('/me/player/play')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const trackURIs = album_tracks.items.map(track => track.uri)
      .concat(album_tracks.items.map(track => track.uri)
      .concat(album_tracks.items.map(track => track.uri)));
    trackURIs.length = 25;

    const albums = new Albums(albums_simple);
    await albums.play();

    expect(req).toBeDefined();
    let body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.uris).toStrictEqual(trackURIs);

    req = undefined;

    await albums.play({
      album_index: 1,
      position_ms: 1000,
      offset: {
        position: 1,
      },
    });

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.uris).toStrictEqual(trackURIs);
    expect(body.position_ms).toBe(1000);
    expect(body.offset).toStrictEqual({
      position: 1,
    });
  });

  /**
   * Verifies functionality of areLiked to check if Albums are in the
   * user's library.
   */
  it('Albums: Are Liked', async () => {
    nock('https://api.spotify.com/v1')
      .get('/me/albums/contains')
      .query({
        ids: albums_simple.map(album => album.id).join(','),
      })
      .reply(200, albums_are_liked);

    const albums = new Albums(albums_simple);
    const response = await albums.areLiked();

    expect(response).toStrictEqual(albums_are_liked);
  });

  /**
   * Verifies functionality of likeAll to add albums to the user's
   * library.
   */
  it('Albums: Like All', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put('/me/albums')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const albums = new Albums(albums_simple);
    await albums.likeAll();

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body).toStrictEqual(albums_simple.map(album => album.id));
  });

  /**
   * Verifies functionality of unlikeAll to remove albums to the user's
   * library.
   */
  it('Albums: Unlike All', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .delete('/me/albums')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const albums = new Albums(albums_simple);
    await albums.unlikeAll();

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body).toStrictEqual(albums_simple.map(album => album.id));
  });

  /**
   * Verifies functionality of retrieving albums information and
   * populating the album objects.
   */
  it('Albums: Retrieve Full Objects', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums`)
      .query({
        ids: albums_simple.map(album => album.id).join(','),
      })
      .reply(200, albums_full_object);

    const albums = new Albums(albums_simple);

    await albums.retrieveFullObjects();

    const album = albums.get(0);

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(albums_full_object.albums[0].album_type);
    expect(album.artists).toStrictEqual(albums_full_object.albums[0].artists);
    expect(album.available_markets).toStrictEqual(albums_full_object.albums[0].available_markets);
    expect(album.copyrights).toStrictEqual(albums_full_object.albums[0].copyrights);
    expect(album.external_ids).toStrictEqual(albums_full_object.albums[0].external_ids);
    expect(album.external_urls).toStrictEqual(albums_full_object.albums[0].external_urls);
    expect(album.genres).toStrictEqual(albums_full_object.albums[0].genres);
    expect(album.href).toBe(albums_full_object.albums[0].href);
    expect(album.id).toBe(albums_full_object.albums[0].id);
    expect(album.images).toStrictEqual(albums_full_object.albums[0].images);
    expect(album.label).toBe(albums_full_object.albums[0].label);
    expect(album.name).toBe(albums_full_object.albums[0].name);
    expect(album.popularity).toBe(albums_full_object.albums[0].popularity);
    expect(album.release_date).toBe(albums_full_object.albums[0].release_date);
    expect(album.release_date_precision).toBe(albums_full_object.albums[0].release_date_precision);
    expect(album.tracks).toStrictEqual(albums_full_object.albums[0].tracks);
    expect(album.type).toBe(albums_full_object.albums[0].type);
    expect(album.uri).toBe(albums_full_object.albums[0].uri);
  });

  /**
   * Verifies functionality of returning full objects
   * of albums.
   */
  it('Albums: Get Full Objects (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums`)
      .query({
        ids: albums_simple.map(album => album.id).join(','),
      })
      .reply(200, albums_full_object);

    const albums = new Albums(albums_simple);

    const data = await albums.getFullObjects();

    expect(data).toBeInstanceOf(Array);
    expect(data[0].album_type).toBe(albums_full_object.albums[0].album_type);
    expect(data[0].artists).toStrictEqual(albums_full_object.albums[0].artists);
    expect(data[0].available_markets).toStrictEqual(albums_full_object.albums[0].available_markets);
    expect(data[0].copyrights).toStrictEqual(albums_full_object.albums[0].copyrights);
    expect(data[0].external_ids).toStrictEqual(albums_full_object.albums[0].external_ids);
    expect(data[0].external_urls).toStrictEqual(albums_full_object.albums[0].external_urls);
    expect(data[0].genres).toStrictEqual(albums_full_object.albums[0].genres);
    expect(data[0].href).toBe(albums_full_object.albums[0].href);
    expect(data[0].id).toBe(albums_full_object.albums[0].id);
    expect(data[0].images).toStrictEqual(albums_full_object.albums[0].images);
    expect(data[0].label).toBe(albums_full_object.albums[0].label);
    expect(data[0].name).toBe(albums_full_object.albums[0].name);
    expect(data[0].popularity).toBe(albums_full_object.albums[0].popularity);
    expect(data[0].release_date).toBe(albums_full_object.albums[0].release_date);
    expect(data[0].release_date_precision).toBe(albums_full_object.albums[0].release_date_precision);
    expect(data[0].tracks).toStrictEqual(albums_full_object.albums[0].tracks);
    expect(data[0].type).toBe(albums_full_object.albums[0].type);
    expect(data[0].uri).toBe(albums_full_object.albums[0].uri);
  });

  /**
   * Verifies functionality of returning full objects
   * of albums.
   */
  it('Albums: Get Full Objects (Data Available)', async () => {
    const albums = new Albums(albums_full_object.albums);
    const data = await albums.getFullObjects();

    expect(data).toBeInstanceOf(Array);
    expect(data[0].album_type).toBe(albums_full_object.albums[0].album_type);
    expect(data[0].artists).toStrictEqual(albums_full_object.albums[0].artists);
    expect(data[0].available_markets).toStrictEqual(albums_full_object.albums[0].available_markets);
    expect(data[0].copyrights).toStrictEqual(albums_full_object.albums[0].copyrights);
    expect(data[0].external_ids).toStrictEqual(albums_full_object.albums[0].external_ids);
    expect(data[0].external_urls).toStrictEqual(albums_full_object.albums[0].external_urls);
    expect(data[0].genres).toStrictEqual(albums_full_object.albums[0].genres);
    expect(data[0].href).toBe(albums_full_object.albums[0].href);
    expect(data[0].id).toBe(albums_full_object.albums[0].id);
    expect(data[0].images).toStrictEqual(albums_full_object.albums[0].images);
    expect(data[0].label).toBe(albums_full_object.albums[0].label);
    expect(data[0].name).toBe(albums_full_object.albums[0].name);
    expect(data[0].popularity).toBe(albums_full_object.albums[0].popularity);
    expect(data[0].release_date).toBe(albums_full_object.albums[0].release_date);
    expect(data[0].release_date_precision).toBe(albums_full_object.albums[0].release_date_precision);
    expect(data[0].tracks).toStrictEqual(albums_full_object.albums[0].tracks);
    expect(data[0].type).toBe(albums_full_object.albums[0].type);
    expect(data[0].uri).toBe(albums_full_object.albums[0].uri);
  });

  /**
   * Verifies functionality of returning simplified objects
   * of albums.
   */
  it('Albums: Get Simplified Objects (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums`)
      .query({
        ids: albums_simple.map(album => album.id).join(','),
      })
      .reply(200, albums_full_object);

    const albums = new Albums(albums_simple);

    const data = await albums.getSimplifiedObjects();

    expect(data[0].album_type).toBe(albums_full_object.albums[0].album_type);
    expect(data[0].artists).toStrictEqual(albums_full_object.albums[0].artists);
    expect(data[0].available_markets).toStrictEqual(albums_full_object.albums[0].available_markets);
    expect(data[0].external_urls).toStrictEqual(albums_full_object.albums[0].external_urls);
    expect(data[0].href).toBe(albums_full_object.albums[0].href);
    expect(data[0].id).toBe(albums_full_object.albums[0].id);
    expect(data[0].images).toStrictEqual(albums_full_object.albums[0].images);
    expect(data[0].name).toBe(albums_full_object.albums[0].name);
    expect(data[0].release_date).toBe(albums_full_object.albums[0].release_date);
    expect(data[0].release_date_precision).toBe(albums_full_object.albums[0].release_date_precision);
    expect(data[0].uri).toBe(albums_full_object.albums[0].uri);
  });

  /**
   * Verifies functionality of returning simplified objects
   * of albums.
   */
  it('Albums: Get Simplified Objects (Data Available)', async () => {
    const albums = new Albums(albums_full_object.albums);
    const data = await albums.getSimplifiedObjects();

    expect(data[0].album_type).toBe(albums_full_object.albums[0].album_type);
    expect(data[0].artists).toStrictEqual(albums_full_object.albums[0].artists);
    expect(data[0].available_markets).toStrictEqual(albums_full_object.albums[0].available_markets);
    expect(data[0].external_urls).toStrictEqual(albums_full_object.albums[0].external_urls);
    expect(data[0].href).toBe(albums_full_object.albums[0].href);
    expect(data[0].id).toBe(albums_full_object.albums[0].id);
    expect(data[0].images).toStrictEqual(albums_full_object.albums[0].images);
    expect(data[0].name).toBe(albums_full_object.albums[0].name);
    expect(data[0].release_date).toBe(albums_full_object.albums[0].release_date);
    expect(data[0].release_date_precision).toBe(albums_full_object.albums[0].release_date_precision);
    expect(data[0].uri).toBe(albums_full_object.albums[0].uri);
  });

  /**
   * Verifies functionality of returning current objects
   * of albums.
   */
  it('Albums: Get Current Objects', async () => {
    const albums = new Albums(albums_simple);

    const data = await albums.getCurrentData();

    expect(data[0].id).toBe(albums_full_object.albums[0].id);
    expect(data[0].name).toBe(albums_full_object.albums[0].name);
    expect(data[0].uri).toBe(albums_full_object.albums[0].uri);
  });

  /**
   * Verifies get tracks returns a Tracks instance with the
   * correct data, retrieving when absent.
   */
  it('Albums: Get Tracks (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums/${albums_simple[0].id}/tracks`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, album_tracks);

    nock('https://api.spotify.com/v1')
      .get(`/albums/${albums_simple[1].id}/tracks`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, album_tracks);
    
    nock('https://api.spotify.com/v1')
      .get(`/albums/${albums_simple[2].id}/tracks`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, album_tracks);

    const albums = new Albums(albums_simple);
    const tracks = await albums.getTracks();

    expect(tracks).toBeInstanceOf(Tracks);
    expect(tracks.size()).toBe(30);

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
  it('Albums: Get Tracks (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveTracks } = Album.prototype;

    Album.override('retrieveTracks', method);
    EnhancedSpotifyAPI.use(Album);

    const albums = new Albums(albums_simple);

    for (let album of albums_simple) {
      albums.items[album.id].loadTracks(album_tracks);
      albums.items[album.id].tracksRetrieved = true;
    }

    const tracks = await albums.getTracks();

    expect(tracks).toBeInstanceOf(Tracks);
    expect(tracks.size()).toBe(30);

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
    EnhancedSpotifyAPI.use(Album);
  });

  /**
   * Verifies get artist returns an Artist instance with the
   * correct data, retrieving when absent.
   */
  it('Album: Get Artists (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/albums`)
      .query({
        ids: albums_simple.map(album => album.id).join(','),
      })
      .reply(200, albums_full_object);

    const albums = new Albums(albums_simple);
    const artists = await albums.getArtists();

    expect(artists).toBeInstanceOf(Artists);

    const artist = artists.get(0);

    expect(artist).toBeInstanceOf(Artist);
    expect(artist.external_urls).toStrictEqual(albums_full_object.albums[0].artists[0].external_urls);
    expect(artist.href).toBe(albums_full_object.albums[0].artists[0].href);
    expect(artist.id).toBe(albums_full_object.albums[0].artists[0].id);
    expect(artist.name).toBe(albums_full_object.albums[0].artists[0].name);
    expect(artist.uri).toBe(albums_full_object.albums[0].artists[0].uri);
  });

  /**
   * Verifies get artist returns an Artist instance with the
   * correct data, retrieving when absent.
   */
  it('Album: Get Artists (Data Available)', async () => {
    const albums = new Albums(albums_full_object.albums);
    const artists = await albums.getArtists();

    expect(artists).toBeInstanceOf(Artists);

    const artist = artists.get(0);

    expect(artist).toBeInstanceOf(Artist);
    expect(artist.external_urls).toStrictEqual(albums_full_object.albums[0].artists[0].external_urls);
    expect(artist.href).toBe(albums_full_object.albums[0].artists[0].href);
    expect(artist.id).toBe(albums_full_object.albums[0].artists[0].id);
    expect(artist.name).toBe(albums_full_object.albums[0].artists[0].name);
    expect(artist.uri).toBe(albums_full_object.albums[0].artists[0].uri);
  });
});
