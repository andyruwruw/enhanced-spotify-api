/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  show_episodes,
  show_is_liked,
  show_full_object,
  show_simple,
} = require('./fixtures');

const {
  Episode,
  Episodes,
  Show,
} = EnhancedSpotifyAPI;

describe('Show Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Show class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Show: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Show.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/shows/${show_simple.id}`)
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, {}];
      });

    const show = new Show(show_simple.id);
    await show.retrieveFullObject();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verfies the ability to add methods to the Show prototype.
   */
  it('Show: Add Methods', () => {
    const method = jest.fn();

    Show.addMethods({
      test: method,
    });

    const show = new Show(show_simple.id);
    show.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Show prototype.
   */
  it('Show: Override', () => {
    const method = jest.fn();
    const { like } = Show.prototype;
    Show.override('like', method);

    const show = new Show(show_simple.id);
    show.like();

    expect(method).toHaveBeenCalled();

    Show.override('like', like);
  });
});

describe('Show Instantiation', () => {
  /**
   * Verifies that using Show constructor sets show ID.
   */
  it('Show: Instantiating with String', () => {
    const show = new Show(show_simple.id);
    expect(show.id).toBe(show_simple.id);
  });

  /**
   * Verifies that using Show constructor sets show ID.
   */
  it('Show: Instantiating with Object', () => {
    const show = new Show({ id: show_simple.id });
    expect(show.id).toBe(show_simple.id);
  });

  /**
   * Verifies that using Show constructor without ID throws correct error.
   */
  it('Show: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const show = new Show({});
    }).toThrow('Show.constructor: No ID Provided');
  });

  /**
   * Verifies that the lack of a valid argument passed to the Show
   * constructor throws correct error.
   */
  it('Show: Instantiating with Invalid Argument', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const show = new Show();
    }).toThrow('Show.constructor: Invalid Data');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('Show: Instantiating with Data', () => {
    const show = new Show(show_simple);

    expect(show.id).toBe(show_simple.id);
    expect(show.name).toBe(show_simple.name);
    expect(show.uri).toBe(show_simple.uri);
  });

  /**
   * Verifies that static get show method returns a Show instance
   * and loads in full object data.
   */
  it('Show: Static Get Show', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/shows/${show_simple.id}`)
      .reply(200, show_full_object);

    const show = await Show.getShow(show_simple.id);

    expect(show.name).toBe(show_full_object.name);
    expect(show.available_markets).toStrictEqual(show_full_object.available_markets);
    expect(show.copyrights).toStrictEqual(show_full_object.copyrights);
    expect(show.description).toBe(show_full_object.description);
    expect(show.explicit).toBe(show_full_object.explicit);
    expect(show.episodes).toStrictEqual(show_full_object.episodes);
    expect(show.external_urls).toStrictEqual(show_full_object.external_urls);
    expect(show.href).toBe(show_full_object.href);
    expect(show.images).toStrictEqual(show_full_object.images);
    expect(show.languages).toStrictEqual(show_full_object.languages);
    expect(show.media_type).toBe(show_full_object.media_type);
    expect(show.publisher).toBe(show_full_object.publisher);
    expect(show.uri).toBe(show_full_object.uri);
  });
});

describe('Show Instance Methods ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies functionality of play method.
   */
  it('Show: Play', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .persist()
      .put('/me/player/play')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const show = new Show(show_simple.id);
    await show.play();

    expect(req).toBeDefined();
    let body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.context_uri).toBe(show_full_object.uri);

    req = undefined;

    await show.play({
      position_ms: 1000,
      offset: {
        position: 1,
      },
    });

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.context_uri).toBe(show_full_object.uri);
    expect(body.position_ms).toBe(1000);
    expect(body.offset).toStrictEqual({
      position: 1,
    });
  });

  /**
   * Verifies functionality of isLiked to check if Show is in the
   * user's library.
   */
  it('Show: Is Liked', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .get('/me/shows/contains')
      .query({ ids: show_simple.id })
      .reply(function () {
        req = this.req;
        return [200, show_is_liked];
      });

    const show = new Show(show_simple.id);
    const response = await show.isLiked();

    expect(req).toBeDefined();
    expect(req.options.path).toContain(show_simple.id);
    expect(response).toBe(true);
  });

  /**
   * Verifies functionality of like to add a show to the user's
   * library.
   * 
   * Body params ? or query
   */
  it('Show: Like', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put('/me/shows')
      .reply(function () {
        req = this.req;
        return [200, [ true ]];
      });

    const show = new Show(show_simple.id);
    await show.like();

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));

    expect(body).toBeDefined();
    expect(body).toStrictEqual([show_simple.id]);
  });

  /**
   * Verifies functionality of unlike to remove a show to the user's
   * library.
   */
  it('Show: Unlike', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .delete('/me/shows')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const show = new Show(show_simple.id);
    await show.unlike();

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body).toStrictEqual([show_simple.id]);
  });

  /**
   * Verifies functionality of retrieving show information and
   * populating the show object.
   */
  it('Show: Retrieve Full Object', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/shows/${show_simple.id}`)
      .reply(200, show_full_object);

    const show = new Show(show_simple.id);

    await show.retrieveFullObject();

    expect(show.name).toBe(show_full_object.name);
    expect(show.available_markets).toStrictEqual(show_full_object.available_markets);
    expect(show.copyrights).toStrictEqual(show_full_object.copyrights);
    expect(show.description).toBe(show_full_object.description);
    expect(show.explicit).toBe(show_full_object.explicit);
    expect(show.episodes).toStrictEqual(show_full_object.episodes);
    expect(show.external_urls).toStrictEqual(show_full_object.external_urls);
    expect(show.href).toBe(show_full_object.href);
    expect(show.images).toStrictEqual(show_full_object.images);
    expect(show.languages).toStrictEqual(show_full_object.languages);
    expect(show.media_type).toBe(show_full_object.media_type);
    expect(show.publisher).toBe(show_full_object.publisher);
    expect(show.uri).toBe(show_full_object.uri);
  });

  /**
   * Verifies functionality of retrieving show track
   * information and populating the show episodes object.
   */
  it('Show: Retrieve Episodes', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/shows/${show_simple.id}/episodes`)
      .query({
        limit: 50,
        offset: 0,
      })
      .reply(200, show_episodes);

    const show = new Show(show_simple.id);
    await show.retrieveEpisodes();

    expect(show._episodes).toBeInstanceOf(Episodes);
    expect(show._episodes.size()).toBe(show_episodes.items.length);

    const episode = show._episodes.get(0);

    expect(episode).toBeInstanceOf(Episode);
    expect(episode.audio_preview_url).toBe(show_episodes.items[0].audio_preview_url);
    expect(episode.description).toBe(show_episodes.items[0].description);
    expect(episode.duration_ms).toBe(show_episodes.items[0].duration_ms);
    expect(episode.explicit).toBe(show_episodes.items[0].explicit);
    expect(episode.external_urls).toStrictEqual(show_episodes.items[0].external_urls);
    expect(episode.href).toBe(show_episodes.items[0].href);
    expect(episode.id).toBe(show_episodes.items[0].id);
    expect(episode.images).toStrictEqual(show_episodes.items[0].images);
    expect(episode.is_externally_hosted).toBe(show_episodes.items[0].is_externally_hosted);
    expect(episode.is_playable).toBe(show_episodes.items[0].is_playable);
    expect(episode.language).toBe(show_episodes.items[0].language);
    expect(episode.languages).toStrictEqual(show_episodes.items[0].languages);
    expect(episode.name).toBe(show_episodes.items[0].name);
    expect(episode.release_date).toBe(show_episodes.items[0].release_date);
    expect(episode.release_date_precision).toBe(show_episodes.items[0].release_date_precision);
    expect(episode.resume_point).toStrictEqual(show_episodes.items[0].resume_point);
    expect(episode.show).toStrictEqual(show_episodes.items[0].show);
    expect(episode.type).toBe(show_episodes.items[0].type);
    expect(episode.uri).toBe(show_episodes.items[0].uri);
  });

  /**
   * Verifies checking whether full object data is present
   * works accurately.
   */
  it('Show: Contains Full Object', () => {
    const show = new Show(show_simple.id);
    expect(show.containsFullObject()).toBe(false);

    show.loadFullObject(show_full_object);
    expect(show.containsFullObject()).toBe(true);
  });

  /**
   * Verifies checking whether simplified object data is
   * present works accurately.
   */
  it('Show: Contains Simplified Object', () => {
    const show = new Show(show_simple.id);
    expect(show.containsSimplifiedObject()).toBe(false);

    show.loadSimplifiedObject(show_full_object);
    expect(show.containsSimplifiedObject()).toBe(true);
  });

  /**
   * Verifies functionality of get show data method. Tests
   * whether it returns the correct info and makes an API
   * call when without the data needed.
   */
  it('Show: Get Full Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/shows/${show_simple.id}`)
      .reply(200, show_full_object);

    const show = new Show(show_simple.id);
    const data = await show.getFullObject();

    expect(data.name).toBe(show_full_object.name);
    expect(data.available_markets).toStrictEqual(show_full_object.available_markets);
    expect(data.copyrights).toStrictEqual(show_full_object.copyrights);
    expect(data.description).toBe(show_full_object.description);
    expect(data.explicit).toBe(show_full_object.explicit);
    expect(data.episodes).toStrictEqual(show_full_object.episodes);
    expect(data.external_urls).toStrictEqual(show_full_object.external_urls);
    expect(data.href).toBe(show_full_object.href);
    expect(data.id).toBe(show_full_object.id);
    expect(data.images).toStrictEqual(show_full_object.images);
    expect(data.languages).toStrictEqual(show_full_object.languages);
    expect(data.media_type).toBe(show_full_object.media_type);
    expect(data.publisher).toBe(show_full_object.publisher);
    expect(data.uri).toBe(show_full_object.uri);
  });

  /**
   * Verifies functionality of get show data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Show: Get Full Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Show.prototype;
    Show.override('retrieveFullObject', method);

    const show = new Show(show_full_object);
    const data = await show.getFullObject();

    expect(data.name).toBe(show_full_object.name);
    expect(data.available_markets).toStrictEqual(show_full_object.available_markets);
    expect(data.copyrights).toStrictEqual(show_full_object.copyrights);
    expect(data.description).toBe(show_full_object.description);
    expect(data.explicit).toBe(show_full_object.explicit);
    expect(data.episodes).toStrictEqual(show_full_object.episodes);
    expect(data.external_urls).toStrictEqual(show_full_object.external_urls);
    expect(data.href).toBe(show_full_object.href);
    expect(data.id).toBe(show_full_object.id);
    expect(data.images).toStrictEqual(show_full_object.images);
    expect(data.languages).toStrictEqual(show_full_object.languages);
    expect(data.media_type).toBe(show_full_object.media_type);
    expect(data.publisher).toBe(show_full_object.publisher);
    expect(data.uri).toBe(show_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Show.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get simplified show data
   * method. Tests whether it returns the correct info
   * and makes an API call when without the data needed.
   */
  it('Show: Get Simplified Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/shows/${show_simple.id}`)
      .reply(200, show_full_object);

    const show = new Show(show_simple.id);
    const data = await show.getSimplifiedObject();

    expect(data.name).toBe(show_full_object.name);
    expect(data.available_markets).toStrictEqual(show_full_object.available_markets);
    expect(data.copyrights).toStrictEqual(show_full_object.copyrights);
    expect(data.description).toBe(show_full_object.description);
    expect(data.explicit).toBe(show_full_object.explicit);
    expect(data.external_urls).toStrictEqual(show_full_object.external_urls);
    expect(data.href).toBe(show_full_object.href);
    expect(data.id).toBe(show_full_object.id);
    expect(data.images).toStrictEqual(show_full_object.images);
    expect(data.languages).toStrictEqual(show_full_object.languages);
    expect(data.media_type).toBe(show_full_object.media_type);
    expect(data.publisher).toBe(show_full_object.publisher);
    expect(data.uri).toBe(show_full_object.uri);
  });

  /**
   * Verifies functionality of get simplified data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Show: Get Simplified Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Show.prototype;
    Show.override('retrieveFullObject', method);

    const show = new Show(show_full_object);
    const data = await show.getSimplifiedObject();

    expect(data.name).toBe(show_full_object.name);
    expect(data.available_markets).toStrictEqual(show_full_object.available_markets);
    expect(data.copyrights).toStrictEqual(show_full_object.copyrights);
    expect(data.description).toBe(show_full_object.description);
    expect(data.explicit).toBe(show_full_object.explicit);
    expect(data.external_urls).toStrictEqual(show_full_object.external_urls);
    expect(data.href).toBe(show_full_object.href);
    expect(data.id).toBe(show_full_object.id);
    expect(data.images).toStrictEqual(show_full_object.images);
    expect(data.languages).toStrictEqual(show_full_object.languages);
    expect(data.media_type).toBe(show_full_object.media_type);
    expect(data.publisher).toBe(show_full_object.publisher);
    expect(data.uri).toBe(show_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Show.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get current data method.
   * Tests whether it returns the correct info and doesn't
   * make an API call.
   */
  it('Show: Get Current Data Object', async () => {
    const show = new Show(show_simple);
    const data = await show.getCurrentData();

    expect(data.id).toBe(show_full_object.id);
    expect(data.name).toBe(show_full_object.name);
    expect(data.uri).toBe(show_full_object.uri);
  });

  /**
   * Verifies get episodes returns a Episodes instance with the
   * correct data, retrieving when absent.
   */
  it('Show: Get Episodes (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/shows/${show_simple.id}/episodes`)
      .reply(200, show_episodes);

    const show = new Show(show_simple.id);
    const episodes = await show.getEpisodes();

    expect(episodes).toBeInstanceOf(Episodes);
    expect(episodes.size()).toBe(show_episodes.items.length);

    const episode = episodes.get(0);

    expect(episode).toBeInstanceOf(Episode);
    expect(episode.audio_preview_url).toBe(show_episodes.items[0].audio_preview_url);
    expect(episode.description).toBe(show_episodes.items[0].description);
    expect(episode.duration_ms).toBe(show_episodes.items[0].duration_ms);
    expect(episode.explicit).toBe(show_episodes.items[0].explicit);
    expect(episode.external_urls).toStrictEqual(show_episodes.items[0].external_urls);
    expect(episode.href).toBe(show_episodes.items[0].href);
    expect(episode.id).toBe(show_episodes.items[0].id);
    expect(episode.images).toStrictEqual(show_episodes.items[0].images);
    expect(episode.is_externally_hosted).toBe(show_episodes.items[0].is_externally_hosted);
    expect(episode.is_playable).toBe(show_episodes.items[0].is_playable);
    expect(episode.language).toBe(show_episodes.items[0].language);
    expect(episode.languages).toStrictEqual(show_episodes.items[0].languages);
    expect(episode.name).toBe(show_episodes.items[0].name);
    expect(episode.release_date).toBe(show_episodes.items[0].release_date);
    expect(episode.release_date_precision).toBe(show_episodes.items[0].release_date_precision);
    expect(episode.resume_point).toStrictEqual(show_episodes.items[0].resume_point);
    expect(episode.show).toStrictEqual(show_episodes.items[0].show);
    expect(episode.type).toBe(show_episodes.items[0].type);
    expect(episode.uri).toBe(show_episodes.items[0].uri);
  });

  /**
   * Verifies get episodes returns a Episodes instance with the
   * correct data, not retrieving when data is present.
   */
  it('Show: Get Episodes (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveEpisodes } = Show.prototype;
    Show.override('retrieveEpisodes', method);

    const show = new Show(show_simple.id);
    show.loadEpisodes(show_episodes.items);
    show.episodesRetrieved = true;
    const episodes = await show.getEpisodes();

    expect(episodes).toBeInstanceOf(Episodes);

    const episode = episodes.get(0);

    expect(episode).toBeInstanceOf(Episode);
    expect(episode.audio_preview_url).toBe(show_episodes.items[0].audio_preview_url);
    expect(episode.description).toBe(show_episodes.items[0].description);
    expect(episode.duration_ms).toBe(show_episodes.items[0].duration_ms);
    expect(episode.explicit).toBe(show_episodes.items[0].explicit);
    expect(episode.external_urls).toStrictEqual(show_episodes.items[0].external_urls);
    expect(episode.href).toBe(show_episodes.items[0].href);
    expect(episode.id).toBe(show_episodes.items[0].id);
    expect(episode.images).toStrictEqual(show_episodes.items[0].images);
    expect(episode.is_externally_hosted).toBe(show_episodes.items[0].is_externally_hosted);
    expect(episode.is_playable).toBe(show_episodes.items[0].is_playable);
    expect(episode.language).toBe(show_episodes.items[0].language);
    expect(episode.languages).toStrictEqual(show_episodes.items[0].languages);
    expect(episode.name).toBe(show_episodes.items[0].name);
    expect(episode.release_date).toBe(show_episodes.items[0].release_date);
    expect(episode.release_date_precision).toBe(show_episodes.items[0].release_date_precision);
    expect(episode.resume_point).toStrictEqual(show_episodes.items[0].resume_point);
    expect(episode.show).toStrictEqual(show_episodes.items[0].show);
    expect(episode.type).toBe(show_episodes.items[0].type);
    expect(episode.uri).toBe(show_episodes.items[0].uri);

    expect(method).not.toHaveBeenCalled();

    Show.override('retrieveEpisodes', retrieveEpisodes);
  });

  /**
   * Verifies load full object populates correct data.
   */
  it('Show: Load Full Object', () => {
    const show = new Show(show_simple.id);
    expect(show.containsFullObject()).toBe(false);
    show.loadFullObject(show_full_object);
    expect(show.containsFullObject()).toBe(true);
  });

  /**
   * Verifies load simplified object populates correct data.
   */
  it('Show: Load Simplified Object', () => {
    const show = new Show(show_simple.id);
    expect(show.containsSimplifiedObject()).toBe(false);
    show.loadSimplifiedObject(show_full_object);
    expect(show.containsSimplifiedObject()).toBe(true);
  });

  /**
   * Verifies load conditionally populates correct data.
   */
  it('Show: Load Conditionally', () => {
    const show = new Show(show_simple.id);
    expect(show.containsFullObject()).toBe(false);
    show.loadConditionally(show_simple);
    expect(show.containsFullObject()).toBe(false);
    expect(show.name).toBe(show_simple.name);
    expect(show.uri).toBe(show_simple.uri);
  });

  /**
   * Verifies load episodes populates correct data.
   */
  it('Show: Load Episodes', () => {
    const show = new Show(show_simple.id);
    expect(show._episodes.size()).toBe(0);
    show.loadEpisodes(show_episodes.items);
    expect(show._episodes.size()).toBe(49);
  });
});
