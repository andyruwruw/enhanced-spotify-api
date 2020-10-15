/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  user_simple,
  user_private_object,
  user_public_object,
} = require('./fixtures');

const {
  User,
} = EnhancedSpotifyAPI;

describe('User Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Applied access token via User class, verifies token is set and sent in
   * subsequent requests.
   */
  it('User: Set Authentication', async () => {
    const token = 'XXXXxxXxxXX';
    User.setAccessToken(token);

    expect(EnhancedSpotifyAPI.wrapperInstance._credentials.accessToken).toBe(token);

    let headers;

    nock('https://api.spotify.com/v1')
      .get(`/users/${user_simple.id}`)
      .reply(function () {
        headers = this.req.headers.authorization;
        return [200, {}];
      });

    const user = new User(user_simple.id);
    await user.retrievePublicObject();

    expect(headers).toBe(`Bearer ${token}`);
  });

  /**
   * Verfies the ability to add methods to the User prototype.
   */
  it('User: Add Methods', () => {
    const method = jest.fn();

    User.addMethods({
      test: method,
    });

    const user = new User(user_simple.id);
    user.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the User prototype.
   */
  it('User: Override', () => {
    const method = jest.fn();
    const { follow } = User.prototype;
    User.override('follow', method);

    const user = new User(user_simple.id);
    user.follow();

    expect(method).toHaveBeenCalled();

    User.override('follow', follow);
  });
});

describe('User Instantiation', () => {
  /**
   * Verifies that using User constructor sets user ID.
   */
  it('User: Instantiating with String', () => {
    const user = new User(user_simple.id);
    expect(user.id).toBe(user_simple.id);
  });

  /**
   * Verifies that using User constructor sets user ID.
   */
  it('User: Instantiating with Object', () => {
    const user = new User({ id: user_simple.id });
    expect(user.id).toBe(user_simple.id);
  });

  /**
   * Verifies that using User constructor without ID throws correct error.
   */
  it('User: Instantiating with Missing ID', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const user = new User({});
    }).toThrow('User.constructor: No ID Provided');
  });

  /**
   * Verifies that the lack of a valid argument passed to the User
   * constructor throws correct error.
   */
  it('User: Instantiating with Invalid Argument', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const user = new User();
    }).toThrow('User.constructor: Invalid Data');
  });

  /**
   * Verifies the loading of data through constructor sets found data.
   */
  it('User: Instantiating with Data', () => {
    const user = new User(user_simple);

    expect(user.id).toBe(user_simple.id);
    expect(user.name).toBe(user_simple.name);
    expect(user.uri).toBe(user_simple.uri);
  });

  /**
   * Verifies that static get me method returns a User instance
   * and loads in full object data.
   */
  it('User: Static Get Me', async () => {
    nock('https://api.spotify.com/v1')
      .get('/me')
      .reply(200, user_private_object);

    const user = await User.getMe();

    expect(user.country).toBe(user_private_object.country);
    expect(user.display_name).toBe(user_private_object.display_name);
    expect(user.email).toBe(user_private_object.email);
    expect(user.explicit_content).toStrictEqual(user_private_object.explicit_content);
    expect(user.external_urls).toStrictEqual(user_private_object.external_urls);
    expect(user.followers).toStrictEqual(user_private_object.followers);
    expect(user.href).toBe(user_private_object.href);
    expect(user.id).toBe(user_private_object.id);
    expect(user.images).toStrictEqual(user_private_object.images);
    expect(user.product).toBe(user_private_object.product);
    expect(user.type).toBe(user_private_object.type);
    expect(user.uri).toBe(user_private_object.uri);
  });

  /**
   * Verifies that static get user method returns a User instance
   * and loads in full object data.
   */
  it('User: Static Get User', async () => {
    nock('https://api.spotify.com/v1')
      .get(`/users/${user_simple.id}`)
      .reply(200, user_public_object);

    const user = await User.getUser(user_simple.id);

    expect(user.display_name).toBe(user_public_object.display_name);
    expect(user.external_urls).toStrictEqual(user_public_object.external_urls);
    expect(user.followers).toStrictEqual(user_public_object.followers);
    expect(user.href).toBe(user_public_object.href);
    expect(user.id).toBe(user_public_object.id);
    expect(user.images).toStrictEqual(user_public_object.images);
    expect(user.type).toBe(user_public_object.type);
    expect(user.uri).toBe(user_public_object.uri);
  });
});

describe('User Instance Methods ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verifies functionality of isMe, checking if user object is
   * current logged in user.
   */
  it('User: Is Me', async () => {
    nock('https://api.spotify.com/v1')
      .persist()
      .get('/me')
      .reply(200, user_private_object);

    const user = new User('wizzer');
    const userIsMe = await user.isMe();

    expect(userIsMe).toBe(false);

    const me = new User(user_simple.id);
    const meIsMe = await me.isMe();

    expect(meIsMe).toBe(true);
  });
});
