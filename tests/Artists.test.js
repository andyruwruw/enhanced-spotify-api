/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  artists_search,
  artists_simple,
  artists_full_object,
} = require('./fixtures');

const {
  Artist,
  Artists,
} = EnhancedSpotifyAPI;

describe('Artists Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Artists class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Artists: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Artists.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/artists`)
      .query({
        ids: artists_simple.map(artist => artist.id).join(','),
      })
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, artists_full_object];
      });

    const artists = new Artists(artists_simple.map(artist => artist.id));
    await artists.retrieveFullObjects();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verfies the ability to add methods to the Artists prototype.
   */
  it('Artists: Add Methods', () => {
    const method = jest.fn();

    Artists.addMethods({
      test: method,
    });

    const artists = new Artists(artists_simple.map(artist => artist.id));
    artists.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Artists prototype.
   */
  it('Artists: Override', () => {
    const method = jest.fn();
    const { areFollowed } = Artists.prototype;
    Artists.override('areFollowed', method);

    const artists = new Artists(artists_simple.map(artist => artist.id));
    artists.areFollowed();

    expect(method).toHaveBeenCalled();

    Artists.override('areFollowed', areFollowed);
  });
});

describe('Artists Instantiation', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies that using Artists constructor sets artist ID.
   */
  it('Artists: Instantiating with String', () => {
    const artists = new Artists(artists_simple[0].id);
    expect(artists.get(0).id).toBe(artists_simple[0].id);
  });

  /**
   * Verifies that using Artists constructor sets artist ID.
   */
  it('Artists: Instantiating with Object', () => {
    const artists = new Artists({ id: artists_simple[0].id });
    expect(artists.get(0).id).toBe(artists_simple[0].id);
  });

  /**
   * Verifies that using Artists constructor sets artist ID.
   */
  it('Artists: Instantiating with Instance', () => {
    const artist = new Artist({ id: artists_simple[0].id });
    const artists = new Artists(artist);
    expect(artists.get(0).id).toBe(artists_simple[0].id);
  });

  /**
   * Verifies that using Artists constructor sets artist IDs.
   */
  it('Artists: Instantiating with Array of Strings', () => {
    const artists = new Artists(artists_simple.map(artist => artist.id));
    expect(artists.get(0).id).toBe(artists_simple[0].id);
    expect(artists.get(1).id).toBe(artists_simple[1].id);
  });

  /**
   * Verifies that using Artists constructor sets artist IDs.
   */
  it('Artists: Instantiating with Array of Objects', () => {
    const artists = new Artists(artists_simple.map((artist) => {
      return {
        id: artist.id,
      };
    }));
    expect(artists.get(0).id).toBe(artists_simple[0].id);
    expect(artists.get(1).id).toBe(artists_simple[1].id);
  });

  /**
   * Verifies that using Artists constructor sets artist IDs.
   */
  it('Artists: Instantiating with Array of Instances', () => {
    const artists = new Artists(artists_simple.map((artist) => {
      return new Artist(artist.id);
    }));
    expect(artists.get(0).id).toBe(artists_simple[0].id);
    expect(artists.get(1).id).toBe(artists_simple[1].id);
  });

  /**
   * Verifies that using Artists constructor without ID throws correct error.
   */
  it('Artists: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const artists = new Artists({});
    }).toThrow('Artists.push: Invalid Parameter "item"');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('Artists: Instantiating with Data', () => {
    const artists = new Artists(artists_simple);

    expect(artists.get(0).id).toBe(artists_simple[0].id);
    expect(artists.get(0).name).toBe(artists_simple[0].name);
    expect(artists.get(0).uri).toBe(artists_simple[0].uri);
    expect(artists.get(1).id).toBe(artists_simple[1].id);
    expect(artists.get(1).name).toBe(artists_simple[1].name);
    expect(artists.get(1).uri).toBe(artists_simple[1].uri);
  });

  /**
   * Verifies search returns Albums instance of search results.
   */
  it('Albums: Search', async () => {
    const query = 'Glass Animals';
    nock('https://api.spotify.com/v1')
      .get(`/search/`)
      .query({
        q: query,
        type: 'artist',
      })
      .reply(200, artists_search);
    
    const artists = await Artists.search(query);

    expect(artists).toBeInstanceOf(Artists);
    expect(artists.size()).toBe(2);

    const artist = artists.get(0);

    expect(artist).toBeInstanceOf(Artist);
    expect(artist.album_type).toBe(artists_search.artists.items[0].album_type);
    expect(artist.artists).toStrictEqual(artists_search.artists.items[0].artists);
    expect(artist.available_markets).toStrictEqual(artists_search.artists.items[0].available_markets);
    expect(artist.copyrights).toStrictEqual(artists_search.artists.items[0].copyrights);
    expect(artist.external_ids).toStrictEqual(artists_search.artists.items[0].external_ids);
    expect(artist.external_urls).toStrictEqual(artists_search.artists.items[0].external_urls);
    expect(artist.genres).toStrictEqual(artists_search.artists.items[0].genres);
    expect(artist.href).toBe(artists_search.artists.items[0].href);
    expect(artist.id).toBe(artists_search.artists.items[0].id);
    expect(artist.images).toStrictEqual(artists_search.artists.items[0].images);
    expect(artist.label).toBe(artists_search.artists.items[0].label);
    expect(artist.name).toBe(artists_search.artists.items[0].name);
    expect(artist.popularity).toBe(artists_search.artists.items[0].popularity);
    expect(artist.release_date).toBe(artists_search.artists.items[0].release_date);
    expect(artist.release_date_precision).toBe(artists_search.artists.items[0].release_date_precision);
    expect(artist.total_tracks).toBe(artists_search.artists.items[0].total_tracks);
    expect(artist.tracks).toStrictEqual(artists_search.artists.items[0].tracks);
    expect(artist.type).toBe(artists_search.artists.items[0].type);
    expect(artist.uri).toBe(artists_search.artists.items[0].uri);
  });

  /**
   * Verifies get artists returns Artists instance of results.
   */
  it('Artists: Get Artists', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/artists`)
      .query({
        ids: artists_simple.map(album => album.id).join(','),
      })
      .reply(200, artists_full_object);
    
    const artists = await Artists.getArtists(artists_simple.map(album => album.id));

    expect(artists).toBeInstanceOf(Artists);
    expect(artists.size()).toBe(2);

    const artist = artists.get(0);
  });
});