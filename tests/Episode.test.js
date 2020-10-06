/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  episode_full_object,
  episode_simple,
} = require('./fixtures');

const {
  Episode,
  Show,
} = EnhancedSpotifyAPI;

describe('Episode Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Episode class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Episode: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Episode.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/episodes/${episode_simple.id}`)
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, {}];
      });

    const episode = new Episode(episode_simple.id);
    await episode.retrieveFullObject();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verfies the ability to add methods to the Episode prototype.
   */
  it('Episode: Add Methods', () => {
    const method = jest.fn();

    Episode.addMethods({
      test: method,
    });

    const episode = new Episode(episode_simple.id);
    episode.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Episode prototype.
   */
  it('Episode: Override', () => {
    const method = jest.fn();
    const { play } = Episode.prototype;
    Episode.override('play', method);

    const episode = new Episode(episode_simple.id);
    episode.play();

    expect(method).toHaveBeenCalled();

    Episode.override('play', play);
  });
});

describe('Episode Instantiation', () => {
  /**
   * Verifies that using Episode constructor sets episode ID.
   */
  it('Episode: Instantiating with String', () => {
    const episode = new Episode(episode_simple.id);
    expect(episode.id).toBe(episode_simple.id);
  });

  /**
   * Verifies that using Episode constructor sets episode ID.
   */
  it('Episode: Instantiating with Object', () => {
    const episode = new Episode({ id: episode_simple.id });
    expect(episode.id).toBe(episode_simple.id);
  });

  /**
   * Verifies that using Episode constructor without ID throws correct error.
   */
  it('Episode: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const episode = new Episode({});
    }).toThrow('Episode.constructor: No ID Provided');
  });

  /**
   * Verifies that the lack of a valid argument passed to the Episode
   * constructor throws correct error.
   */
  it('Episode: Instantiating with Invalid Argument', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const episode = new Episode();
    }).toThrow('Episode.constructor: Invalid Data');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('Episode: Instantiating with Data', () => {
    const episode = new Episode(episode_simple);

    expect(episode.id).toBe(episode_simple.id);
    expect(episode.name).toBe(episode_simple.name);
    expect(episode.uri).toBe(episode_simple.uri);
  });

  /**
   * Verifies that static get episode method returns a episode instance
   * and loads in full object data.
   */
  it('Episode: Static Get Episode', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/episodes/${episode_simple.id}`)
      .reply(200, episode_full_object);

    const episode = await Episode.getEpisode(episode_simple.id);

    expect(episode.audio_preview_url).toBe(episode_full_object.audio_preview_url);
    expect(episode.description).toBe(episode_full_object.description);
    expect(episode.duration_ms).toBe(episode_full_object.duration_ms);
    expect(episode.explicit).toBe(episode_full_object.explicit);
    expect(episode.external_urls).toStrictEqual(episode_full_object.external_urls);
    expect(episode.href).toBe(episode_full_object.href);
    expect(episode.id).toBe(episode_full_object.id);
    expect(episode.images).toStrictEqual(episode_full_object.images);
    expect(episode.is_externally_hosted).toBe(episode_full_object.is_externally_hosted);
    expect(episode.is_playable).toBe(episode_full_object.is_playable);
    expect(episode.language).toBe(episode_full_object.language);
    expect(episode.languages).toStrictEqual(episode_full_object.languages);
    expect(episode.name).toBe(episode_full_object.name);
    expect(episode.release_date).toBe(episode_full_object.release_date);
    expect(episode.release_date_precision).toBe(episode_full_object.release_date_precision);
    expect(episode.resume_point).toStrictEqual(episode_full_object.resume_point);
    expect(episode.show).toStrictEqual(episode_full_object.show);
    expect(episode.type).toBe(episode_full_object.type);
    expect(episode.uri).toBe(episode_full_object.uri);
  });
});

describe('Episode Instance Methods ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies functionality of play method.
   */
  it('Episode: Play', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .persist()
      .put('/me/player/play')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const episode = new Episode(episode_simple.id);
    await episode.play();

    expect(req).toBeDefined();
    let body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.uris).toContain(episode_full_object.uri);

    req = undefined;

    await episode.play({
      position_ms: 1000,
    });

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.uris).toContain(episode_full_object.uri);
    expect(body.position_ms).toBe(1000);
  });

  /**
   * Verifies functionality of retrieving episode information and
   * populating the episode object.
   */
  it('Episode: Retrieve Full Object', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/episodes/${episode_simple.id}`)
      .reply(200, episode_full_object);

    const episode = new Episode(episode_simple.id);

    await episode.retrieveFullObject();

    expect(episode.audio_preview_url).toBe(episode_full_object.audio_preview_url);
    expect(episode.description).toBe(episode_full_object.description);
    expect(episode.duration_ms).toBe(episode_full_object.duration_ms);
    expect(episode.explicit).toBe(episode_full_object.explicit);
    expect(episode.external_urls).toStrictEqual(episode_full_object.external_urls);
    expect(episode.href).toBe(episode_full_object.href);
    expect(episode.id).toBe(episode_full_object.id);
    expect(episode.images).toStrictEqual(episode_full_object.images);
    expect(episode.is_externally_hosted).toBe(episode_full_object.is_externally_hosted);
    expect(episode.is_playable).toBe(episode_full_object.is_playable);
    expect(episode.language).toBe(episode_full_object.language);
    expect(episode.languages).toStrictEqual(episode_full_object.languages);
    expect(episode.name).toBe(episode_full_object.name);
    expect(episode.release_date).toBe(episode_full_object.release_date);
    expect(episode.release_date_precision).toBe(episode_full_object.release_date_precision);
    expect(episode.resume_point).toStrictEqual(episode_full_object.resume_point);
    expect(episode.show).toStrictEqual(episode_full_object.show);
    expect(episode.type).toBe(episode_full_object.type);
    expect(episode.uri).toBe(episode_full_object.uri);
  });

  /**
   * Verifies checking whether full object data is present
   * works accurately.
   */
  it('Episode: Contains Full Object', () => {
    const episode = new Episode(episode_simple.id);
    expect(episode.containsFullObject()).toBe(false);

    episode.loadFullObject(episode_full_object);
    expect(episode.containsFullObject()).toBe(true);
  });

  /**
   * Verifies checking whether simplified object data is
   * present works accurately.
   */
  it('Episode: Contains Simplified Object', () => {
    const episode = new Episode(episode_simple.id);
    expect(episode.containsSimplifiedObject()).toBe(false);

    episode.loadSimplifiedObject(episode_full_object);
    expect(episode.containsSimplifiedObject()).toBe(true);
  });

  /**
   * Verifies functionality of get episode data method. Tests
   * whether it returns the correct info and makes an API
   * call when without the data needed.
   */
  it('Episode: Get Full Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/episodes/${episode_simple.id}`)
      .reply(200, episode_full_object);

    const episode = new Episode(episode_simple.id);
    const data = await episode.getFullObject();

    expect(data.audio_preview_url).toBe(episode_full_object.audio_preview_url);
    expect(data.description).toBe(episode_full_object.description);
    expect(data.duration_ms).toBe(episode_full_object.duration_ms);
    expect(data.explicit).toBe(episode_full_object.explicit);
    expect(data.external_urls).toStrictEqual(episode_full_object.external_urls);
    expect(data.href).toBe(episode_full_object.href);
    expect(data.id).toBe(episode_full_object.id);
    expect(data.images).toStrictEqual(episode_full_object.images);
    expect(data.is_externally_hosted).toBe(episode_full_object.is_externally_hosted);
    expect(data.is_playable).toBe(episode_full_object.is_playable);
    expect(data.language).toBe(episode_full_object.language);
    expect(data.languages).toStrictEqual(episode_full_object.languages);
    expect(data.name).toBe(episode_full_object.name);
    expect(data.release_date).toBe(episode_full_object.release_date);
    expect(data.release_date_precision).toBe(episode_full_object.release_date_precision);
    expect(data.resume_point).toStrictEqual(episode_full_object.resume_point);
    expect(data.show).toStrictEqual(episode_full_object.show);
    expect(data.type).toBe(episode_full_object.type);
    expect(data.uri).toBe(episode_full_object.uri);
  });

  /**
   * Verifies functionality of get episode data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Episode: Get Full Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Episode.prototype;
    Episode.override('retrieveFullObject', method);

    const episode = new Episode(episode_full_object);
    const data = await episode.getFullObject();

    expect(data.audio_preview_url).toBe(episode_full_object.audio_preview_url);
    expect(data.description).toBe(episode_full_object.description);
    expect(data.duration_ms).toBe(episode_full_object.duration_ms);
    expect(data.explicit).toBe(episode_full_object.explicit);
    expect(data.external_urls).toStrictEqual(episode_full_object.external_urls);
    expect(data.href).toBe(episode_full_object.href);
    expect(data.id).toBe(episode_full_object.id);
    expect(data.images).toStrictEqual(episode_full_object.images);
    expect(data.is_externally_hosted).toBe(episode_full_object.is_externally_hosted);
    expect(data.is_playable).toBe(episode_full_object.is_playable);
    expect(data.language).toBe(episode_full_object.language);
    expect(data.languages).toStrictEqual(episode_full_object.languages);
    expect(data.name).toBe(episode_full_object.name);
    expect(data.release_date).toBe(episode_full_object.release_date);
    expect(data.release_date_precision).toBe(episode_full_object.release_date_precision);
    expect(data.resume_point).toStrictEqual(episode_full_object.resume_point);
    expect(data.show).toStrictEqual(episode_full_object.show);
    expect(data.type).toBe(episode_full_object.type);
    expect(data.uri).toBe(episode_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Episode.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get simplified episode data
   * method. Tests whether it returns the correct info
   * and makes an API call when without the data needed.
   */
  it('Episode: Get Simplified Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/episodes/${episode_simple.id}`)
      .reply(200, episode_full_object);

    const episode = new Episode(episode_simple.id);
    const data = await episode.getSimplifiedObject();

    expect(data.artists).toStrictEqual(episode_full_object.artists);
    expect(data.available_markets).toStrictEqual(episode_full_object.available_markets);
    expect(data.disc_number).toBe(episode_full_object.disc_number);
    expect(data.duration_ms).toBe(episode_full_object.duration_ms);
    expect(data.explicit).toBe(episode_full_object.explicit);
    expect(data.external_urls).toStrictEqual(episode_full_object.external_urls);
    expect(data.href).toBe(episode_full_object.href);
    expect(data.id).toBe(episode_full_object.id);
    expect(data.is_local).toBe(episode_full_object.is_local);
    expect(data.name).toBe(episode_full_object.name);
    expect(data.preview_url).toBe(episode_full_object.preview_url);
    expect(data.episode_number).toBe(episode_full_object.episode_number);
    expect(data.type).toBe(episode_full_object.type);
    expect(data.uri).toBe(episode_full_object.uri);
  });

  /**
   * Verifies functionality of get simplified data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Episode: Get Simplified Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Episode.prototype;
    Episode.override('retrieveFullObject', method);

    const episode = new Episode(episode_full_object);
    const data = await episode.getSimplifiedObject();

    expect(data.artists).toStrictEqual(episode_full_object.artists);
    expect(data.available_markets).toStrictEqual(episode_full_object.available_markets);
    expect(data.disc_number).toBe(episode_full_object.disc_number);
    expect(data.duration_ms).toBe(episode_full_object.duration_ms);
    expect(data.explicit).toBe(episode_full_object.explicit);
    expect(data.external_urls).toStrictEqual(episode_full_object.external_urls);
    expect(data.href).toBe(episode_full_object.href);
    expect(data.id).toBe(episode_full_object.id);
    expect(data.is_local).toBe(episode_full_object.is_local);
    expect(data.name).toBe(episode_full_object.name);
    expect(data.preview_url).toBe(episode_full_object.preview_url);
    expect(data.episode_number).toBe(episode_full_object.episode_number);
    expect(data.type).toBe(episode_full_object.type);
    expect(data.uri).toBe(episode_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Episode.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get current data method.
   * Tests whether it returns the correct info and doesn't
   * make an API call.
   */
  it('Episode: Get Current Data Object', async () => {
    const episode = new Episode(episode_simple);
    const data = await episode.getCurrentData();

    expect(data.id).toBe(episode_full_object.id);
    expect(data.name).toBe(episode_full_object.name);
    expect(data.uri).toBe(episode_full_object.uri);
  });

  /**
   * Verifies get show returns an Show instance with the
   * correct data, retrieving when absent.
   */
  it('Episode: Get Show (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/episodes/${episode_simple.id}`)
      .reply(200, episode_full_object);

    const episode = new Episode(episode_simple.id);
    const show = await episode.getShow();

    expect(show).toBeInstanceOf(Show);

    expect(show.available_markets).toStrictEqual(episode_full_object.show.available_markets);
    expect(show.copyrights).toStrictEqual(episode_full_object.show.copyrights);
    expect(show.description).toBe(episode_full_object.show.description);
    expect(show.explicit).toBe(episode_full_object.show.explicit);
    expect(show.external_urls).toStrictEqual(episode_full_object.show.external_urls);
    expect(show.href).toBe(episode_full_object.show.href);
    expect(show.id).toBe(episode_full_object.show.id);
    expect(show.images).toStrictEqual(episode_full_object.show.images);
    expect(show.is_externally_hosted).toBe(episode_full_object.show.is_externally_hosted);
    expect(show.languages).toStrictEqual(episode_full_object.show.languages);
    expect(show.media_type).toBe(episode_full_object.show.media_type);
    expect(show.name).toBe(episode_full_object.show.name);
    expect(show.publisher).toBe(episode_full_object.show.publisher);
    expect(show.type).toBe(episode_full_object.show.type);
    expect(show.uri).toBe(episode_full_object.show.uri);
  });

  /**
   * Verifies get show returns an Show instance with the
   * correct data, not retrieving when data is present.
   */
  it('Episode: Get Show (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Episode.prototype;
    Episode.override('retrieveFullObject', method);

    const episode = new Episode(episode_full_object);
    const show = await episode.getShow();

    expect(show).toBeInstanceOf(Show);

    expect(show.available_markets).toStrictEqual(episode_full_object.show.available_markets);
    expect(show.copyrights).toStrictEqual(episode_full_object.show.copyrights);
    expect(show.description).toBe(episode_full_object.show.description);
    expect(show.explicit).toBe(episode_full_object.show.explicit);
    expect(show.external_urls).toStrictEqual(episode_full_object.show.external_urls);
    expect(show.href).toBe(episode_full_object.show.href);
    expect(show.id).toBe(episode_full_object.show.id);
    expect(show.images).toStrictEqual(episode_full_object.show.images);
    expect(show.is_externally_hosted).toBe(episode_full_object.show.is_externally_hosted);
    expect(show.languages).toStrictEqual(episode_full_object.show.languages);
    expect(show.media_type).toBe(episode_full_object.show.media_type);
    expect(show.name).toBe(episode_full_object.show.name);
    expect(show.publisher).toBe(episode_full_object.show.publisher);
    expect(show.type).toBe(episode_full_object.show.type);
    expect(show.uri).toBe(episode_full_object.show.uri);

    expect(method).not.toHaveBeenCalled();

    Episode.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies load full object populates correct data.
   */
  it('Episode: Load Full Object', () => {
    const episode = new Episode(episode_simple.id);
    expect(episode.containsFullObject()).toBe(false);
    episode.loadFullObject(episode_full_object);
    expect(episode.containsFullObject()).toBe(true);
  });

  /**
   * Verifies load simplified object populates correct data.
   */
  it('Episode: Load Simplified Object', () => {
    const episode = new Episode(episode_simple.id);
    expect(episode.containsSimplifiedObject()).toBe(false);
    episode.loadSimplifiedObject(episode_full_object);
    expect(episode.containsSimplifiedObject()).toBe(true);
  });

  /**
   * Verifies load conditionally populates correct data.
   */
  it('Episode: Load Conditionally', () => {
    const episode = new Episode(episode_simple.id);
    expect(episode.containsFullObject()).toBe(false);
    expect(episode.containsSimplifiedObject()).toBe(false);
    episode.loadConditionally(episode_full_object);
    expect(episode.containsFullObject()).toBe(true);
    expect(episode.containsSimplifiedObject()).toBe(true);
  });
});
