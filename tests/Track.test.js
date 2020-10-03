/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  track_full_object,
  track_audio_features,
  track_audio_analysis,
  track_is_liked,
  track_simple,
  track_recommendations,
} = require('./fixtures');

const {
  Album,
  Artist,
  Artists,
  Track,
  Tracks,
} = EnhancedSpotifyAPI;

describe('Track Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Track class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Track: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Track.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, {}];
      });

    const track = new Track(track_simple.id);
    await track.retrieveFullObject();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verfies the ability to add methods to the Track prototype.
   */
  it('Track: Add Methods', () => {
    const method = jest.fn();

    Track.addMethods({
      test: method,
    });

    const track = new Track(track_simple.id);
    track.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Track prototype.
   */
  it('Track: Override', () => {
    const method = jest.fn();
    const { like } = Track.prototype;
    Track.override('like', method);

    const track = new Track(track_simple.id);
    track.like();

    expect(method).toHaveBeenCalled();

    Track.override('like', like);
  });
});

describe('Track Instantiation', () => {
  /**
   * Verifies that using Track constructor sets track ID.
   */
  it('Track: Instantiating with String', () => {
    const track = new Track(track_simple.id);
    expect(track.id).toBe(track_simple.id);
  });

  /**
   * Verifies that using Track constructor sets track ID.
   */
  it('Track: Instantiating with Object', () => {
    const track = new Track({ id: track_simple.id });
    expect(track.id).toBe(track_simple.id);
  });

  /**
   * Verifies that using Track constructor without ID throws correct error.
   */
  it('Track: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const track = new Track({});
    }).toThrow('Track.constructor: No ID Provided');
  });

  /**
   * Verifies that the lack of a valid argument passed to the Track
   * constructor throws correct error.
   */
  it('Track: Instantiating with Invalid Argument', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const track = new Track();
    }).toThrow('Track.constructor: Invalid Data');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('Track: Instantiating with Data', () => {
    const track = new Track(track_simple);

    expect(track.id).toBe(track_simple.id);
    expect(track.name).toBe(track_simple.name);
    expect(track.uri).toBe(track_simple.uri);
  });

  /**
   * Verifies that static get track method returns a Track instance
   * and loads in full object data.
   */
  it('Track: Static Get Track', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(200, track_full_object);

    const track = await Track.getTrack(track_simple.id);

    expect(track.artists).toStrictEqual(track_full_object.artists);
    expect(track.album).toStrictEqual(track_full_object.album);
    expect(track.available_markets).toStrictEqual(track_full_object.available_markets);
    expect(track.disc_number).toBe(track_full_object.disc_number);
    expect(track.duration_ms).toBe(track_full_object.duration_ms);
    expect(track.explicit).toBe(track_full_object.explicit);
    expect(track.external_ids).toStrictEqual(track_full_object.external_ids);
    expect(track.external_urls).toStrictEqual(track_full_object.external_urls);
    expect(track.href).toBe(track_full_object.href);
    expect(track.id).toBe(track_full_object.id);
    expect(track.is_local).toBe(track_full_object.is_local);
    expect(track.name).toBe(track_full_object.name);
    expect(track.popularity).toBe(track_full_object.popularity);
    expect(track.preview_url).toBe(track_full_object.preview_url);
    expect(track.track_number).toBe(track_full_object.track_number);
    expect(track.type).toBe(track_full_object.type);
    expect(track.uri).toBe(track_full_object.uri);
  });
});

describe('Track Instance Methods ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies functionality of play method.
   */
  it('Track: Play', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .persist()
      .put('/me/player/play')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const track = new Track(track_simple.id);
    await track.play();

    expect(req).toBeDefined();
    let body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.uris).toContain(track_full_object.uri);

    req = undefined;

    await track.play({
      position_ms: 1000,
    });

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.uris).toContain(track_full_object.uri);
    expect(body.position_ms).toBe(1000);
  });

  /**
   * Verifies functionality of isLiked to check if track is in the
   * user's library.
   */
  it('Track: Is Liked', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .get('/me/tracks/contains')
      .query({ ids: track_simple.id })
      .reply(function () {
        req = this.req;
        return [200, track_is_liked];
      });

    const track = new Track(track_simple.id);
    const response = await track.isLiked();

    expect(req).toBeDefined();
    expect(req.options.path).toContain(track_simple.id);
    expect(response).toBe(true);
  });

  /**
   * Verifies functionality of like to add a track to the user's
   * library.
   */
  it('Track: Like', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .put('/me/tracks')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const track = new Track(track_simple.id);
    await track.like();

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body.ids).toStrictEqual([track_simple.id]);
  });

  /**
   * Verifies functionality of unlike to remove a track to the user's
   * library.
   */
  it('Track: Unlike', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .delete('/me/tracks')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const track = new Track(track_simple.id);
    await track.unlike();

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body).toBeDefined();
    expect(body.ids).toStrictEqual([track_simple.id]);
  });

  /**
   * Verifies functionality of retrieving track information and
   * populating the track object.
   */
  it('Track: Retrieve Full Object', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(200, track_full_object);

    const track = new Track(track_simple.id);

    await track.retrieveFullObject();

    expect(track.artists).toStrictEqual(track_full_object.artists);
    expect(track.album).toStrictEqual(track_full_object.album);
    expect(track.available_markets).toStrictEqual(track_full_object.available_markets);
    expect(track.disc_number).toBe(track_full_object.disc_number);
    expect(track.duration_ms).toBe(track_full_object.duration_ms);
    expect(track.explicit).toBe(track_full_object.explicit);
    expect(track.external_ids).toStrictEqual(track_full_object.external_ids);
    expect(track.external_urls).toStrictEqual(track_full_object.external_urls);
    expect(track.href).toBe(track_full_object.href);
    expect(track.is_local).toBe(track_full_object.is_local);
    expect(track.name).toBe(track_full_object.name);
    expect(track.popularity).toBe(track_full_object.popularity);
    expect(track.preview_url).toBe(track_full_object.preview_url);
    expect(track.track_number).toBe(track_full_object.track_number);
    expect(track.type).toBe(track_full_object.type);
    expect(track.uri).toBe(track_full_object.uri);
  });

  /**
   * Verifies functionality of retrieving audio feature information
   * and populating the track object.
   */
  it('Track: Retrieve Audio Features Object', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/audio-features/${track_simple.id}`)
      .reply(200, track_audio_features);

    const track = new Track(track_simple.id);

    await track.retrieveAudioFeatures();

    expect(track.acousticness).toBe(track_audio_features.acousticness);
    expect(track.analysis_url).toBe(track_audio_features.analysis_url);
    expect(track.danceability).toBe(track_audio_features.danceability);
    expect(track.duration_ms).toBe(track_audio_features.duration_ms);
    expect(track.energy).toBe(track_audio_features.energy);
    expect(track.instrumentalness).toBe(track_audio_features.instrumentalness);
    expect(track.key).toBe(track_audio_features.key);
    expect(track.liveness).toBe(track_audio_features.liveness);
    expect(track.loudness).toBe(track_audio_features.loudness);
    expect(track.mode).toBe(track_audio_features.mode);
    expect(track.speechiness).toBe(track_audio_features.speechiness);
    expect(track.tempo).toBe(track_audio_features.tempo);
    expect(track.time_signature).toBe(track_audio_features.time_signature);
    expect(track.track_href).toBe(track_audio_features.track_href);
    expect(track.uri).toBe(track_audio_features.uri);
    expect(track.valence).toBe(track_audio_features.valence);
  });

  /**
   * Verifies functionality of retrieve audio analysis information
   * and populating the track object.
   */
  it('Track: Retrieve Audio Analysis Object', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/audio-analysis/${track_simple.id}`)
      .reply(200, track_audio_analysis);

    const track = new Track(track_simple.id);

    await track.retrieveAudioAnalysis();

    expect(track.meta).toStrictEqual(track_audio_analysis.meta);
    expect(track.track).toStrictEqual(track_audio_analysis.track);
    expect(track.bars).toStrictEqual(track_audio_analysis.bars);
    expect(track.beats).toStrictEqual(track_audio_analysis.beats);
    expect(track.sections).toStrictEqual(track_audio_analysis.sections);
    expect(track.segments).toStrictEqual(track_audio_analysis.segments);
    expect(track.tatums).toStrictEqual(track_audio_analysis.tatums);
  });

  /**
   * Verifies checking whether full object data is present
   * works accurately.
   */
  it('Track: Contains Full Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsFullObject()).toBe(false);

    track.loadFullObject(track_full_object);
    expect(track.containsFullObject()).toBe(true);
  });

  /**
   * Verifies checking whether simplified object data is
   * present works accurately.
   */
  it('Track: Contains Simplified Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsSimplifiedObject()).toBe(false);

    track.loadSimplifiedObject(track_full_object);
    expect(track.containsSimplifiedObject()).toBe(true);
  });

  /**
   * Verifies checking whether link object data is present
   * works accurately.
   */
  it('Track: Contains Link Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsLinkObject()).toBe(false);

    track.loadLinkObject(track_full_object);
    expect(track.containsLinkObject()).toBe(true);
  });

  /**
   * Verifies checking whether audio feature object data
   * is present works accurately.
   */
  it('Track: Contains Audio Features Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsAudioFeatures()).toBe(false);

    track.loadAudioFeatures(track_audio_features);
    expect(track.containsAudioFeatures()).toBe(true);
  });

  /**
   * Verifies checking whether audio analysis object data
   * is present works accurately.
   */
  it('Track: Contains Audio Analysis Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsAudioAnalysis()).toBe(false);
    track.loadAudioAnalysis(track_audio_analysis);
    expect(track.containsAudioAnalysis()).toBe(true);
  });

  /**
   * Verifies functionality of get track data method. Tests
   * whether it returns the correct info and makes an API
   * call when without the data needed.
   */
  it('Track: Get Full Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(200, track_full_object);

    const track = new Track(track_simple.id);
    const data = await track.getFullObject();

    expect(data.artists).toStrictEqual(track_full_object.artists);
    expect(data.album).toStrictEqual(track_full_object.album);
    expect(data.available_markets).toStrictEqual(track_full_object.available_markets);
    expect(data.disc_number).toBe(track_full_object.disc_number);
    expect(data.duration_ms).toBe(track_full_object.duration_ms);
    expect(data.explicit).toBe(track_full_object.explicit);
    expect(data.external_ids).toStrictEqual(track_full_object.external_ids);
    expect(data.external_urls).toStrictEqual(track_full_object.external_urls);
    expect(data.href).toBe(track_full_object.href);
    expect(data.id).toBe(track_full_object.id);
    expect(data.is_local).toBe(track_full_object.is_local);
    expect(data.name).toBe(track_full_object.name);
    expect(data.popularity).toBe(track_full_object.popularity);
    expect(data.preview_url).toBe(track_full_object.preview_url);
    expect(data.track_number).toBe(track_full_object.track_number);
    expect(data.type).toBe(track_full_object.type);
    expect(data.uri).toBe(track_full_object.uri);
  });

  /**
   * Verifies functionality of get track data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Track: Get Full Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Track.prototype;
    Track.override('retrieveFullObject', method);

    const track = new Track(track_full_object);
    const data = await track.getFullObject();

    expect(data.artists).toStrictEqual(track_full_object.artists);
    expect(data.album).toStrictEqual(track_full_object.album);
    expect(data.available_markets).toStrictEqual(track_full_object.available_markets);
    expect(data.disc_number).toBe(track_full_object.disc_number);
    expect(data.duration_ms).toBe(track_full_object.duration_ms);
    expect(data.explicit).toBe(track_full_object.explicit);
    expect(data.external_ids).toStrictEqual(track_full_object.external_ids);
    expect(data.external_urls).toStrictEqual(track_full_object.external_urls);
    expect(data.href).toBe(track_full_object.href);
    expect(data.id).toBe(track_full_object.id);
    expect(data.is_local).toBe(track_full_object.is_local);
    expect(data.name).toBe(track_full_object.name);
    expect(data.popularity).toBe(track_full_object.popularity);
    expect(data.preview_url).toBe(track_full_object.preview_url);
    expect(data.track_number).toBe(track_full_object.track_number);
    expect(data.type).toBe(track_full_object.type);
    expect(data.uri).toBe(track_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Track.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get simplified track data
   * method. Tests whether it returns the correct info
   * and makes an API call when without the data needed.
   */
  it('Track: Get Simplified Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(200, track_full_object);

    const track = new Track(track_simple.id);
    const data = await track.getSimplifiedObject();

    expect(data.artists).toStrictEqual(track_full_object.artists);
    expect(data.available_markets).toStrictEqual(track_full_object.available_markets);
    expect(data.disc_number).toBe(track_full_object.disc_number);
    expect(data.duration_ms).toBe(track_full_object.duration_ms);
    expect(data.explicit).toBe(track_full_object.explicit);
    expect(data.external_urls).toStrictEqual(track_full_object.external_urls);
    expect(data.href).toBe(track_full_object.href);
    expect(data.id).toBe(track_full_object.id);
    expect(data.is_local).toBe(track_full_object.is_local);
    expect(data.name).toBe(track_full_object.name);
    expect(data.preview_url).toBe(track_full_object.preview_url);
    expect(data.track_number).toBe(track_full_object.track_number);
    expect(data.type).toBe(track_full_object.type);
    expect(data.uri).toBe(track_full_object.uri);
  });

  /**
   * Verifies functionality of get simplified data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Track: Get Simplified Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Track.prototype;
    Track.override('retrieveFullObject', method);

    const track = new Track(track_full_object);
    const data = await track.getSimplifiedObject();

    expect(data.artists).toStrictEqual(track_full_object.artists);
    expect(data.available_markets).toStrictEqual(track_full_object.available_markets);
    expect(data.disc_number).toBe(track_full_object.disc_number);
    expect(data.duration_ms).toBe(track_full_object.duration_ms);
    expect(data.explicit).toBe(track_full_object.explicit);
    expect(data.external_urls).toStrictEqual(track_full_object.external_urls);
    expect(data.href).toBe(track_full_object.href);
    expect(data.id).toBe(track_full_object.id);
    expect(data.is_local).toBe(track_full_object.is_local);
    expect(data.name).toBe(track_full_object.name);
    expect(data.preview_url).toBe(track_full_object.preview_url);
    expect(data.track_number).toBe(track_full_object.track_number);
    expect(data.type).toBe(track_full_object.type);
    expect(data.uri).toBe(track_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Track.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get link data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Track: Get Link Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(200, track_full_object);

    const track = new Track(track_simple.id);
    const data = await track.getLinkObject();

    expect(data.external_urls).toStrictEqual(track_full_object.external_urls);
    expect(data.href).toBe(track_full_object.href);
    expect(data.id).toBe(track_full_object.id);
    expect(data.type).toBe(track_full_object.type);
    expect(data.uri).toBe(track_full_object.uri);
  });

  /**
   * Verifies functionality of get link data method. Tests
   * whether it returns the correct info and doesn't make an
   * API call when data is aleady present.
   */
  it('Track: Get Link Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Track.prototype;
    Track.override('retrieveFullObject', method);

    const track = new Track(track_full_object);
    const data = await track.getLinkObject();

    expect(data.external_urls).toStrictEqual(track_full_object.external_urls);
    expect(data.href).toBe(track_full_object.href);
    expect(data.id).toBe(track_full_object.id);
    expect(data.type).toBe(track_full_object.type);
    expect(data.uri).toBe(track_full_object.uri);

    expect(method).not.toHaveBeenCalled();

    Track.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies functionality of get audio feature data
   * method. Tests whether it returns the correct info
   * and makes an API call when without the data needed.
   */
  it('Track: Get Audio Features Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/audio-features/${track_simple.id}`)
      .reply(200, track_audio_features);

    const track = new Track(track_simple.id);
    const data = await track.getAudioFeatures();

    expect(data.acousticness).toBe(track_audio_features.acousticness);
    expect(data.analysis_url).toBe(track_audio_features.analysis_url);
    expect(data.danceability).toBe(track_audio_features.danceability);
    expect(data.duration_ms).toBe(track_audio_features.duration_ms);
    expect(data.energy).toBe(track_audio_features.energy);
    expect(data.id).toBe(track_audio_features.id);
    expect(data.instrumentalness).toBe(track_audio_features.instrumentalness);
    expect(data.key).toBe(track_audio_features.key);
    expect(data.liveness).toBe(track_audio_features.liveness);
    expect(data.loudness).toBe(track_audio_features.loudness);
    expect(data.mode).toBe(track_audio_features.mode);
    expect(data.speechiness).toBe(track_audio_features.speechiness);
    expect(data.tempo).toBe(track_audio_features.tempo);
    expect(data.time_signature).toBe(track_audio_features.time_signature);
    expect(data.track_href).toBe(track_audio_features.track_href);
    expect(data.uri).toBe(track_audio_features.uri);
    expect(data.valence).toBe(track_audio_features.valence);
  });

  /**
   * Verifies functionality of get audio feature data method.
   * Tests whether it returns the correct info and doesn't
   * make an API call when data is aleady present.
   */
  it('Track: Get Audio Features Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveAudioFeatures } = Track.prototype;
    Track.override('retrieveAudioFeatures', method);

    const track = new Track(track_audio_features);
    const data = await track.getAudioFeatures();

    expect(data.acousticness).toBe(track_audio_features.acousticness);
    expect(data.analysis_url).toBe(track_audio_features.analysis_url);
    expect(data.danceability).toBe(track_audio_features.danceability);
    expect(data.duration_ms).toBe(track_audio_features.duration_ms);
    expect(data.energy).toBe(track_audio_features.energy);
    expect(data.id).toBe(track_audio_features.id);
    expect(data.instrumentalness).toBe(track_audio_features.instrumentalness);
    expect(data.key).toBe(track_audio_features.key);
    expect(data.liveness).toBe(track_audio_features.liveness);
    expect(data.loudness).toBe(track_audio_features.loudness);
    expect(data.mode).toBe(track_audio_features.mode);
    expect(data.speechiness).toBe(track_audio_features.speechiness);
    expect(data.tempo).toBe(track_audio_features.tempo);
    expect(data.time_signature).toBe(track_audio_features.time_signature);
    expect(data.track_href).toBe(track_audio_features.track_href);
    expect(data.uri).toBe(track_audio_features.uri);
    expect(data.valence).toBe(track_audio_features.valence);

    expect(method).not.toHaveBeenCalled();

    Track.override('retrieveAudioFeatures', retrieveAudioFeatures);
  });

  /**
   * Verifies functionality of get audio analysis data
   * method. Tests whether it returns the correct info
   * and makes an API call when without the data needed.
   */
  it('Track: Get Audio Analysis Object (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/audio-analysis/${track_simple.id}`)
      .reply(200, track_audio_analysis);

    const track = new Track(track_simple.id);
    const data = await track.getAudioAnalysis();

    expect(data.meta).toStrictEqual(track_audio_analysis.meta);
    expect(data.track).toStrictEqual(track_audio_analysis.track);
    expect(data.bars).toStrictEqual(track_audio_analysis.bars);
    expect(data.beats).toStrictEqual(track_audio_analysis.beats);
    expect(data.sections).toStrictEqual(track_audio_analysis.sections);
    expect(data.segments).toStrictEqual(track_audio_analysis.segments);
    expect(data.tatums).toStrictEqual(track_audio_analysis.tatums);
  });

  /**
   * Verifies functionality of get audio analysis data method.
   * Tests whether it returns the correct info and doesn't
   * make an API call when data is aleady present.
   */
  it('Track: Get Audio Analysis Object (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveAudioAnalysis } = Track.prototype;
    Track.override('retrieveAudioAnalysis', method);

    const track = new Track({
      id: track_simple.id,
      ...track_audio_analysis,
    });
    const data = await track.getAudioAnalysis();

    expect(data.meta).toStrictEqual(track_audio_analysis.meta);
    expect(data.track).toStrictEqual(track_audio_analysis.track);
    expect(data.bars).toStrictEqual(track_audio_analysis.bars);
    expect(data.beats).toStrictEqual(track_audio_analysis.beats);
    expect(data.sections).toStrictEqual(track_audio_analysis.sections);
    expect(data.segments).toStrictEqual(track_audio_analysis.segments);
    expect(data.tatums).toStrictEqual(track_audio_analysis.tatums);

    expect(method).not.toHaveBeenCalled();

    Track.override('retrieveAudioAnalysis', retrieveAudioAnalysis);
  });

  /**
   * Verifies functionality of get current data method.
   * Tests whether it returns the correct info and doesn't
   * make an API call.
   */
  it('Track: Get Current Data Object', async () => {
    const track = new Track(track_simple);
    const data = await track.getCurrentData();

    expect(data.id).toBe(track_full_object.id);
    expect(data.name).toBe(track_full_object.name);
    expect(data.uri).toBe(track_full_object.uri);
  });

  /**
   * Verifies get artist returns an Artist instance with the
   * correct data, retrieving when absent.
   */
  it('Track: Get Artists (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(200, track_full_object);

    const track = new Track(track_simple.id);
    const artists = await track.getArtists();

    expect(artists).toBeInstanceOf(Artists);

    const artist = artists.get(0);

    expect(artist).toBeInstanceOf(Artist);
    expect(artist.external_urls).toStrictEqual(track_full_object.artists[0].external_urls);
    expect(artist.href).toBe(track_full_object.artists[0].href);
    expect(artist.id).toBe(track_full_object.artists[0].id);
    expect(artist.name).toBe(track_full_object.artists[0].name);
    expect(artist.uri).toBe(track_full_object.artists[0].uri);
  });

  /**
   * Verifies get artist returns an Artist instance with the
   * correct data, not retrieving when data is present.
   */
  it('Track: Get Artists (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Track.prototype;
    Track.override('retrieveFullObject', method);

    const track = new Track(track_full_object);
    const artists = await track.getArtists();

    expect(artists).toBeInstanceOf(Artists);

    const artist = artists.get(0);

    expect(artist).toBeInstanceOf(Artist);
    expect(artist.external_urls).toStrictEqual(track_full_object.artists[0].external_urls);
    expect(artist.href).toBe(track_full_object.artists[0].href);
    expect(artist.id).toBe(track_full_object.artists[0].id);
    expect(artist.name).toBe(track_full_object.artists[0].name);
    expect(artist.uri).toBe(track_full_object.artists[0].uri);

    expect(method).not.toHaveBeenCalled();

    Track.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies get album returns an Album instance with the
   * correct data, retrieving when absent.
   */
  it('Track: Get Album (Data Unavailable)', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/tracks/${track_simple.id}`)
      .reply(200, track_full_object);

    const track = new Track(track_simple.id);
    const album = await track.getAlbum();

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(track_full_object.album.album_type);
    expect(album.artists).toStrictEqual(track_full_object.album.artists);
    expect(album.available_markets).toStrictEqual(track_full_object.album.available_markets);
    expect(album.external_urls).toStrictEqual(track_full_object.album.external_urls);
    expect(album.href).toBe(track_full_object.album.href);
    expect(album.id).toBe(track_full_object.album.id);
    expect(album.images).toStrictEqual(track_full_object.album.images);
    expect(album.name).toBe(track_full_object.album.name);
    expect(album.release_date).toBe(track_full_object.album.release_date);
    expect(album.release_date_precision).toBe(track_full_object.album.release_date_precision);
  });

  /**
   * Verifies get album returns an Album instance with the
   * correct data, not retrieving when data is present.
   */
  it('Track: Get Album (Data Available)', async () => {
    const method = jest.fn();
    const { retrieveFullObject } = Track.prototype;
    Track.override('retrieveFullObject', method);

    const track = new Track(track_full_object);
    const album = await track.getAlbum();

    expect(album).toBeInstanceOf(Album);
    expect(album.album_type).toBe(track_full_object.album.album_type);
    expect(album.artists).toStrictEqual(track_full_object.album.artists);
    expect(album.available_markets).toStrictEqual(track_full_object.album.available_markets);
    expect(album.external_urls).toStrictEqual(track_full_object.album.external_urls);
    expect(album.href).toBe(track_full_object.album.href);
    expect(album.id).toBe(track_full_object.album.id);
    expect(album.images).toStrictEqual(track_full_object.album.images);
    expect(album.name).toBe(track_full_object.album.name);
    expect(album.release_date).toBe(track_full_object.album.release_date);
    expect(album.release_date_precision).toBe(track_full_object.album.release_date_precision);

    expect(method).not.toHaveBeenCalled();

    Track.override('retrieveFullObject', retrieveFullObject);
  });

  /**
   * Verifies get recommendations returns a Tracks instance
   * with the correct data
   */
  it('Track: Get Recommendations', async () => {
    nock('https://api.spotify.com/v1')
      .get('/recommendations')
      .query({ seed_tracks: track_simple.id })
      .reply(200, track_recommendations);

    const track = new Track(track_simple.id);
    const tracks = await track.getRecommendations();

    expect(tracks).toBeInstanceOf(Tracks);

    const recommendedTrack = tracks.get(0);
    const actualObject = track_recommendations.tracks[0];

    expect(recommendedTrack).toBeInstanceOf(Track);
    expect(recommendedTrack.artists).toStrictEqual(actualObject.artists);
    expect(recommendedTrack.album).toStrictEqual(actualObject.album);
    expect(recommendedTrack.available_markets).toStrictEqual(actualObject.available_markets);
    expect(recommendedTrack.disc_number).toBe(actualObject.disc_number);
    expect(recommendedTrack.duration_ms).toBe(actualObject.duration_ms);
    expect(recommendedTrack.explicit).toBe(actualObject.explicit);
    expect(recommendedTrack.external_ids).toStrictEqual(actualObject.external_ids);
    expect(recommendedTrack.external_urls).toStrictEqual(actualObject.external_urls);
    expect(recommendedTrack.href).toBe(actualObject.href);
    expect(recommendedTrack.id).toBe(actualObject.id);
    expect(recommendedTrack.is_local).toBe(actualObject.is_local);
    expect(recommendedTrack.name).toBe(actualObject.name);
    expect(recommendedTrack.popularity).toBe(actualObject.popularity);
    expect(recommendedTrack.preview_url).toBe(actualObject.preview_url);
    expect(recommendedTrack.track_number).toBe(actualObject.track_number);
    expect(recommendedTrack.type).toBe(actualObject.type);
    expect(recommendedTrack.uri).toBe(actualObject.uri);
  });

  /**
   * Verifies get recommendations returns a Tracks instance
   * with the correct data based on audio feature data.
   */
  it('Track: Get Recommendations with Audio Features', async () => {
    nock('https://api.spotify.com/v1')
      .get('/recommendations')
      .query({
        seed_tracks: track_simple.id,
        target_acousticness: '0.0782',
        target_danceability: '0.399',
        target_energy: '0.88',
        target_instrumentalness: '0.397',
        target_liveness: '0.947',
        target_mode: '1',
        target_speechiness: '0.0453',
        target_tempo: '102.859',
        target_valence: '0.932',
      })
      .reply(200, track_recommendations);

    const track = new Track(track_audio_features);
    const tracks = await track.getRecommendationWithAudioFeatures();

    expect(tracks).toBeInstanceOf(Tracks);

    const recommendedTrack = tracks.get(0);
    const actualObject = track_recommendations.tracks[0];

    expect(recommendedTrack).toBeInstanceOf(Track);
    expect(recommendedTrack.artists).toStrictEqual(actualObject.artists);
    expect(recommendedTrack.album).toStrictEqual(actualObject.album);
    expect(recommendedTrack.available_markets).toStrictEqual(actualObject.available_markets);
    expect(recommendedTrack.disc_number).toBe(actualObject.disc_number);
    expect(recommendedTrack.duration_ms).toBe(actualObject.duration_ms);
    expect(recommendedTrack.explicit).toBe(actualObject.explicit);
    expect(recommendedTrack.external_ids).toStrictEqual(actualObject.external_ids);
    expect(recommendedTrack.external_urls).toStrictEqual(actualObject.external_urls);
    expect(recommendedTrack.href).toBe(actualObject.href);
    expect(recommendedTrack.id).toBe(actualObject.id);
    expect(recommendedTrack.is_local).toBe(actualObject.is_local);
    expect(recommendedTrack.name).toBe(actualObject.name);
    expect(recommendedTrack.popularity).toBe(actualObject.popularity);
    expect(recommendedTrack.preview_url).toBe(actualObject.preview_url);
    expect(recommendedTrack.track_number).toBe(actualObject.track_number);
    expect(recommendedTrack.type).toBe(actualObject.type);
    expect(recommendedTrack.uri).toBe(actualObject.uri);
  });

  it('Track: Load Full Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsFullObject()).toBe(false);
    track.loadFullObject(track_full_object);
    expect(track.containsFullObject()).toBe(true);
  });

  it('Track: Load Simplified Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsSimplifiedObject()).toBe(false);
    track.loadSimplifiedObject(track_full_object);
    expect(track.containsSimplifiedObject()).toBe(true);
  });

  it('Track: Load Link Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsLinkObject()).toBe(false);
    track.loadLinkObject(track_full_object);
    expect(track.containsLinkObject()).toBe(true);
  });

  it('Track: Load Audio Features Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsAudioFeatures()).toBe(false);
    track.loadAudioFeatures(track_audio_features);
    expect(track.containsAudioFeatures()).toBe(true);
  });

  it('Track: Load Audio Analysis Object', () => {
    const track = new Track(track_simple.id);
    expect(track.containsAudioAnalysis()).toBe(false);
    track.loadAudioAnalysis(track_audio_analysis);
    expect(track.containsAudioAnalysis()).toBe(true);
  });

  it('Track: Load Conditionally', () => {
    const track = new Track(track_simple.id);
    expect(track.containsFullObject()).toBe(false);
    expect(track.containsAudioFeatures()).toBe(false);
    track.loadConditionally({
      ...track_full_object,
      ...track_audio_features,
    });
    expect(track.containsFullObject()).toBe(true);
    expect(track.containsAudioFeatures()).toBe(true);
  });
});
