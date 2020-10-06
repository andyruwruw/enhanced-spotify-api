/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  category_full_object,
  category_playlists,
  category_simple,
} = require('./fixtures');

const {
  Category
} = EnhancedSpotifyAPI;

describe('Category Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via Category class, verifies token is set and sent in
   * subsequent requests.
   */
  it('Category: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    Category.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/browse/categories/${category_simple.id}`)
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, {}];
      });

    const category = new Category(category_simple.id);
    await category.retrieveFullObject();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verfies the ability to add methods to the Category prototype.
   */
  it('Category: Add Methods', () => {
    const method = jest.fn();

    Category.addMethods({
      test: method,
    });

    const category = new Category(category_simple.id);
    category.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Category prototype.
   */
  it('Category: Override', () => {
    const method = jest.fn();
    const { play } = Category.prototype;
    Category.override('play', method);

    const category = new Category(category_simple.id);
    category.play();

    expect(method).toHaveBeenCalled();

    Category.override('play', play);
  });
});

describe('Category Instantiation', () => {
  /**
   * Verifies that using Category constructor sets category ID.
   */
  it('Category: Instantiating with String', () => {
    const category = new Category(category_simple.id);
    expect(category.id).toBe(category_simple.id);
  });

  /**
   * Verifies that using Category constructor sets category ID.
   */
  it('Category: Instantiating with Object', () => {
    const category = new Category({ id: category_simple.id });
    expect(category.id).toBe(category_simple.id);
  });

  /**
   * Verifies that using Category constructor without ID throws correct error.
   */
  it('Category: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const category = new Category({});
    }).toThrow('Category.constructor: No ID Provided');
  });

  /**
   * Verifies that the lack of a valid argument passed to the Category
   * constructor throws correct error.
   */
  it('Category: Instantiating with Invalid Argument', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const category = new Category();
    }).toThrow('Category.constructor: Invalid Data');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('Category: Instantiating with Data', () => {
    const category = new Category(category_simple);

    expect(category.id).toBe(category_simple.id);
    expect(category.name).toBe(category_simple.name);
    expect(category.href).toBe(category_simple.href);
  });

  /**
   * Verifies that static get category method returns a Category instance
   * and loads in full object data.
   */
  it('Category: Static Get Category', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/browse/categories/${category_simple.id}`)
      .reply(200, category_full_object);

    const category = await Category.getCategory(category_simple.id);

    expect(category.href).toBe(category_full_object.href);
    expect(category.icons).toStrictEqual(category_full_object.icons);
    expect(category.id).toBe(category_full_object.id);
    expect(category.name).toBe(category_full_object.name);
  });
});

describe('Category Instance Methods ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies functionality of play method.
   */
  it('Category: Play', async () => {
    let req;
    nock('https://api.spotify.com/v1')
      .persist()
      .get(`/browse/categories/${category_simple.id}/playlists`)
      .query({
        limit: 1,
      })
      .reply(200, category_playlists);

    nock('https://api.spotify.com/v1')
      .persist()
      .put('/me/player/play')
      .reply(function () {
        req = this.req;
        return [200];
      });

    const category = new Category(category_simple.id);
    await category.play();

    expect(req).toBeDefined();
    let body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.context_uri).toBe(category_playlists.playlists.items[0].uri);

    req = undefined;

    await category.play({
      position_ms: 1000,
      offset: {
        position: 1,
      },
    });

    expect(req).toBeDefined();
    body = JSON.parse(req.requestBodyBuffers[0].toString('utf8'));
    expect(body.context_uri).toBe(category_playlists.playlists.items[0].uri);
    expect(body.position_ms).toBe(1000);
    expect(body.offset).toStrictEqual({
      position: 1,
    });
  });
});
