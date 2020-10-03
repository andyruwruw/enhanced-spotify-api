/* eslint-disable no-undef */
const nock = require('nock');

// const EnhancedSpotifyAPI = require('../src/index');
// const {
//   track_full_object,
//   track_audio_features,
//   track_audio_analysis,
//   track_is_liked,
//   track_simple,
//   track_recommendations,
// } = require('./fixtures');

// const {
//   Album,
//   Artist,
//   Artists,
//   Track,
//   Tracks,
// } = EnhancedSpotifyAPI;

describe('Shows Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(': Set Authentication', async () => {
    expect(1).toBe(1);
  });
});
