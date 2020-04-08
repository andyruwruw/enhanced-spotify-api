const { Track } = require('../../src/index');
const { generateSpotifyWebAPI, generateWrapper } = require('../TestFunctions');

test('Track: Test Playback', async () => {
    try {
    let wrapper = await generateWrapper();
    let track = new Track("0No1Mcz6DJ9HlPAICTqI2v");
    let response = await track.play(wrapper);
    expect(response.statusCode).toBe(204);
    } catch (error) {
        throw error;
    }
});

test('Track: Is Liked', async () => {
    try {
    let wrapper = await generateWrapper();
    let track = new Track("0No1Mcz6DJ9HlPAICTqI2v");
    let response = await track.isLiked(wrapper);
    expect(typeof(response)).toBe('boolean');
    } catch (error) {
        throw error;
    }
});

test('Track: Liking / Unliking', async () => {
    try {
    let wrapper = await generateWrapper();
    let track = new Track("0No1Mcz6DJ9HlPAICTqI2v");
    let isLiked = await track.isLiked(wrapper);
    if (isLiked) {
        await track.unlike(wrapper);
    } else {
        await track.like(wrapper);
    }
    let after = await track.isLiked(wrapper);
    if (isLiked) {
        await track.like(wrapper);
    } else {
        await track.unlike(wrapper);
    }
    let returned = await track.isLiked(wrapper);
    let result = (isLiked == returned && isLiked != after);
    expect(result).toBe(true);
    } catch (error) {
        throw error;
    }
});

test('Track: Contains', async () => {
    try {
    let emptyTrack = new Track("FILLER");
    let fullTrack = new Track({
        id: "FILLER",
        name: "FILLER",
        album: {},
        artists: [],
        available_markets: "FILLER",
        disc_number: 5,
        duration_ms: 10,
        explicit: true,
        external_ids: {},
        external_urls: {},
        href: "FILLER",
        is_playable: true,
        linked_from: {},
        restrictions: [],
        popularity: 10,
        preview_url: "FILLER",
        track_number: 5,
        uri: "FILLER",
        is_local: false,
    });
    let simplifiedTrack = new Track({
        id: "FILLER",
        name: "FILLER",
        artists: [],
        available_markets: "FILLER",
        disc_number: 5,
        duration_ms: 10,
        explicit: true,
        external_urls: {},
        href: "FILLER",
        is_playable: true,
        linked_from: {},
        restrictions: [],
        preview_url: "FILLER",
        track_number: 5,
        uri: "FILLER",
        is_local: false,
    });
    let linkTrack = new Track({
        id: "FILLER",
        external_urls: {},
        href: "FILLER",
        uri: "FILLER",
    });
    let audioFeaturesTrack = new Track({
        id: "FILLER",
        duration_ms: 100,
        key: 100,
        mode: 100,
        time_signature: 100,
        acousticness: 100,
        danceability: 100,
        energy: 100,
        instrumentalness: 100,
        liveness: 100,
        loudness: 100,
        speechiness: 100,
        valence: 100,
        tempo: 100,
        uri: 100,
        track_href: "FILLER",
        analysis_url: "FILLER",
    });
    let audioAnalysisTrack = new Track({
        id: "FILLER",
        bars: [],
        beats: [],
        sections: [],
        segments: [],
        tatums: [],
        track: {},
    });
    let emptyResult = (!emptyTrack.containsFullObject() && !emptyTrack.containsSimplifiedObject() && !emptyTrack.containsLinkObject() && !emptyTrack.containsAudioFeatures() && !emptyTrack.containsAudioAnalysis());
    let fullResult = (fullTrack.containsFullObject() && fullTrack.containsSimplifiedObject() && fullTrack.containsLinkObject() && !fullTrack.containsAudioFeatures() && !fullTrack.containsAudioAnalysis());
    let simplifiedResult = (!simplifiedTrack.containsFullObject() && simplifiedTrack.containsSimplifiedObject() && simplifiedTrack.containsLinkObject() && !simplifiedTrack.containsAudioFeatures() && !simplifiedTrack.containsAudioAnalysis());
    let linkResult = (!linkTrack.containsFullObject() && !linkTrack.containsSimplifiedObject() && linkTrack.containsLinkObject() && !linkTrack.containsAudioFeatures() && !linkTrack.containsAudioAnalysis());
    let audioFeaturesResult = (!audioFeaturesTrack.containsFullObject() && !audioFeaturesTrack.containsSimplifiedObject() && !audioFeaturesTrack.containsLinkObject() && audioFeaturesTrack.containsAudioFeatures() && !audioFeaturesTrack.containsAudioAnalysis());
    let audioAnalysisResult = (!audioAnalysisTrack.containsFullObject() && !audioAnalysisTrack.containsSimplifiedObject() && !audioAnalysisTrack.containsLinkObject() && !audioAnalysisTrack.containsAudioFeatures() && audioAnalysisTrack.containsAudioAnalysis());
    let result = (emptyResult && fullResult && simplifiedResult && linkResult && audioFeaturesResult && audioAnalysisResult);
    expect(result).toBe(true);
    } catch (error) {
        throw error;
    }
});

test('Track: Get Full Object', async () => {
    try {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let trackId = "0No1Mcz6DJ9HlPAICTqI2v";
    let track = new Track(trackId);
    expect(await track.getFullObject(wrapper)).toStrictEqual((await spotifyWebAPI.getTrack(trackId)).body);
    } catch (error) {
        throw error;
    }
});

test('Track: Get Audio Features', async () => {
    try {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let trackId = "0No1Mcz6DJ9HlPAICTqI2v";
    let track = new Track(trackId);
    expect(await track.getAudioFeatures(wrapper)).toStrictEqual((await spotifyWebAPI.getAudioFeaturesForTrack(trackId)).body);
    } catch (error) {
        throw error;
    }
});

test('Track: Get Audio Analysis', async () => {
    try {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let trackId = "0No1Mcz6DJ9HlPAICTqI2v";
    let track = new Track(trackId);
    expect(await track.getAudioAnalysis(wrapper)).toStrictEqual((await spotifyWebAPI.getAudioAnalysisForTrack(trackId)).body);
    } catch (error) {
        throw error;
    }
});

test('Track: Get All', async () => {
    try {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let trackId = "0No1Mcz6DJ9HlPAICTqI2v";
    let track = new Track(trackId);
    let fullTrack = (await spotifyWebAPI.getTrack(trackId)).body;
    let audioFeatures = (await spotifyWebAPI.getAudioFeaturesForTrack(trackId)).body;
    let audioAnalysis = (await spotifyWebAPI.getAudioAnalysisForTrack(trackId)).body;
    let full = {};
    for (field in fullTrack) {
        full[field] = fullTrack[field];
    }
    for (field in audioFeatures) {
        if (!full.hasOwnProperty(field)) {
            full[field] = fullTrack[field];
        }
    }
    for (field in audioAnalysis) {
        if (!full.hasOwnProperty(field)) {
            full[field] = fullTrack[field];
        }
    }
    expect(Object.keys(full).sort()).toStrictEqual(Object.keys(await track.getAllData(wrapper)).sort());
    } catch (error) {
        throw error;
    }
});

test('Track: Get Current', async () => {
    try {
    let data = {
        id: "0No1Mcz6DJ9HlPAICTqI2v",
        name: "Stranger",
        album: {},
        type: 'track'
    }
    let track = new Track(data);
    expect(track.getCurrentData()).toStrictEqual(data);
    } catch (error) {
        throw error;
    }
});
