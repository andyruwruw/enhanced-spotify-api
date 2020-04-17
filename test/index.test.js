var EnhancedSpotifyAPI = require('../src/index');
const authToken = require('./authentication.json').authToken;
EnhancedSpotifyAPI.setAccessToken(authToken);
const { Track, Tracks, Artist, Artists, Album, Albums, Playlist, Playlists } = EnhancedSpotifyAPI;

test('Testing Wrapper.getMe()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    expect(await wrapper.getMe().body).toStrictEqual(await spotifyWebAPI.getMe().body);
});

test('Testing Wrapper.getMySavedTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 5, offset: 0 };
    expect(await wrapper.getMySavedTracks(options).body).toStrictEqual(await spotifyWebAPI.getMySavedTracks(options).body);
});

test('Testing Wrapper.getTrack()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleSong = "5NF2n5zIR3t2P6p44ieyI8";
    expect(await wrapper.getTrack(horribleSong).body).toStrictEqual(await spotifyWebAPI.getTrack(horribleSong).body);
});

test('Testing Wrapper.getTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleSong = ["5NF2n5zIR3t2P6p44ieyI8", "7lJcrjIYDoq8TpaEadRSlb"];
    expect(await wrapper.getTracks(horribleSong).body).toStrictEqual(await spotifyWebAPI.getTracks(horribleSong).body);
});

test('Testing Wrapper.addToMySavedTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleSong = "5NF2n5zIR3t2P6p44ieyI8";
    expect(await wrapper.addToMySavedTracks([horribleSong]).body).toStrictEqual(await spotifyWebAPI.addToMySavedTracks([horribleSong]).body);
});

test('Testing Wrapper.containsMySavedTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleSong = "5NF2n5zIR3t2P6p44ieyI8";
    expect(await wrapper.containsMySavedTracks([horribleSong]).body).toStrictEqual(await spotifyWebAPI.containsMySavedTracks([horribleSong]).body);
});

test('Testing Wrapper.removeFromMySavedTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleSong = "5NF2n5zIR3t2P6p44ieyI8";
    expect(await wrapper.removeFromMySavedTracks([horribleSong]).body).toStrictEqual(await spotifyWebAPI.removeFromMySavedTracks([horribleSong]).body);
});

test('Testing Wrapper.getMySavedAlbums()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 5, offset: 0 };
    expect(await wrapper.getMySavedAlbums(options).body).toStrictEqual(await spotifyWebAPI.getMySavedAlbums(options).body);
});

test('Testing Wrapper.getAlbum()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleAlbum = "1uNFoZAHBGtllmzznpCI3s";
    expect(await wrapper.getAlbum(horribleAlbum).body).toStrictEqual(await spotifyWebAPI.getAlbum(horribleAlbum).body);
});

test('Testing Wrapper.getAlbumTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleAlbum = "1uNFoZAHBGtllmzznpCI3s";
    expect(await wrapper.getAlbumTracks(horribleAlbum).body).toStrictEqual(await spotifyWebAPI.getAlbumTracks(horribleAlbum).body);
});

test('Testing Wrapper.addToMySavedAlbums()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleAlbum = "1uNFoZAHBGtllmzznpCI3s";
    expect(await wrapper.addToMySavedAlbums([horribleAlbum]).body).toStrictEqual(await spotifyWebAPI.addToMySavedAlbums([horribleAlbum]).body);
});

test('Testing Wrapper.containsMySavedAlbums()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleAlbum = "1uNFoZAHBGtllmzznpCI3s";
    expect(await wrapper.containsMySavedAlbums([horribleAlbum]).body).toStrictEqual(await spotifyWebAPI.containsMySavedAlbums([horribleAlbum]).body);
});

test('Testing Wrapper.removeFromMySavedAlbums()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleAlbum = "1uNFoZAHBGtllmzznpCI3s";
    expect(await wrapper.removeFromMySavedAlbums([horribleAlbum]).body).toStrictEqual(await spotifyWebAPI.removeFromMySavedAlbums([horribleAlbum]).body);
});

test('Testing Wrapper.getAlbums()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleAlbums = ["1uNFoZAHBGtllmzznpCI3s", "7qjDLUd8je5MicHciSEaH4"];
    expect(await wrapper.getAlbums(horribleAlbums).body).toStrictEqual(await spotifyWebAPI.getAlbums(horribleAlbums).body);
});

test('Testing Wrapper.getMyTopArtists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 5, offset: 0, time_range: 'long_term' };
    expect(await wrapper.getMyTopArtists(options).body).toStrictEqual(await spotifyWebAPI.getMyTopArtists(options).body);
});

test('Testing Wrapper.getMyTopTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 5, offset: 0, time_range: 'long_term' };
    expect(await wrapper.getMyTopTracks(options).body).toStrictEqual(await spotifyWebAPI.getMyTopTracks(options).body);
});

test('Testing Wrapper.getMyRecentlyPlayedTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 5 };
    expect(await wrapper.getMyRecentlyPlayedTracks(options).body).toStrictEqual(await spotifyWebAPI.getMyRecentlyPlayedTracks(options).body);
});

test('Testing Wrapper.getUser()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let randomPerson = "12131702277";
    expect(await wrapper.getUser(randomPerson).body).toStrictEqual(await spotifyWebAPI.getUser(randomPerson).body);
});

test('Testing Wrapper.followUsers()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let randomPerson = "12131702277";
    expect(await wrapper.followUsers([randomPerson]).body).toStrictEqual(await spotifyWebAPI.followUsers([randomPerson]).body);
});

test('Testing Wrapper.isFollowingUsers()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let randomPerson = "12131702277";
    expect(await wrapper.isFollowingUsers([randomPerson]).body).toStrictEqual(await spotifyWebAPI.isFollowingUsers([randomPerson]).body);
});

test('Testing Wrapper.unfollowUsers()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let randomPerson = "12131702277";
    expect(await wrapper.unfollowUsers([randomPerson]).body).toStrictEqual(await spotifyWebAPI.unfollowUsers([randomPerson]).body);
});

test('Testing Wrapper.getFollowedArtists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { type: 'artist', limit: 5 };
    expect(await wrapper.getFollowedArtists(options).body).toStrictEqual(await spotifyWebAPI.getFollowedArtists(options).body);
});

test('Testing Wrapper.getArtist()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleArtist = "5Qg28lkcyNB4n2GVPnBhWV";
    expect(await wrapper.getArtist(horribleArtist).body).toStrictEqual(await spotifyWebAPI.getArtist(horribleArtist).body);
});

test('Testing Wrapper.getArtists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleArtists = ["5Qg28lkcyNB4n2GVPnBhWV", "4yVx1jvTF11PHTo6XEklK7"];
    expect(await wrapper.getArtists(horribleArtists).body).toStrictEqual(await spotifyWebAPI.getArtists(horribleArtists).body);
});

test('Testing Wrapper.getArtistAlbums()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleArtist = "5Qg28lkcyNB4n2GVPnBhWV";
    let options = { limit: 2, offset: 0 };
    expect(await wrapper.getArtistAlbums(horribleArtist, options).body).toStrictEqual(await spotifyWebAPI.getArtistAlbums(horribleArtist, options).body);
});

test('Testing Wrapper.getArtistTopTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleArtist = "5Qg28lkcyNB4n2GVPnBhWV";
    expect(await wrapper.getArtistTopTracks(horribleArtist, "US").body).toStrictEqual(await spotifyWebAPI.getArtistTopTracks(horribleArtist, "US").body);
});

test('Testing Wrapper.getArtistRelatedArtists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleArtist = "5Qg28lkcyNB4n2GVPnBhWV";
    expect(await wrapper.getArtistRelatedArtists(horribleArtist).body).toStrictEqual(await spotifyWebAPI.getArtistRelatedArtists(horribleArtist).body);
});

test('Testing Wrapper.followArtists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleArtist = "5Qg28lkcyNB4n2GVPnBhWV";
    expect(await wrapper.followArtists([horribleArtist]).body).toStrictEqual(await spotifyWebAPI.followArtists([horribleArtist]).body);
});

test('Testing Wrapper.isFollowingArtists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleArtist = "5Qg28lkcyNB4n2GVPnBhWV";
    expect(await wrapper.isFollowingArtists([horribleArtist]).body).toStrictEqual(await spotifyWebAPI.isFollowingArtists([horribleArtist]).body);
});

test('Testing Wrapper.unfollowArtists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horribleArtist = "5Qg28lkcyNB4n2GVPnBhWV";
    expect(await wrapper.unfollowArtists([horribleArtist]).body).toStrictEqual(await spotifyWebAPI.unfollowArtists([horribleArtist]).body);
});

test('Testing Wrapper.getPlaylist()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horriblePlaylist = "0o35sgyW01kRW1bsGG1VX0";
    expect(await wrapper.getPlaylist(horriblePlaylist).body).toStrictEqual(await spotifyWebAPI.getPlaylist(horriblePlaylist).body);
});

test('Testing Wrapper.getPlaylistTracks()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horriblePlaylist = "0o35sgyW01kRW1bsGG1VX0";
    expect(await wrapper.getPlaylistTracks(horriblePlaylist).body).toStrictEqual(await spotifyWebAPI.getPlaylistTracks(horriblePlaylist).body);
});

test('Testing Wrapper.getArtistRelatedArtists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 2 };
    expect(await wrapper.getFeaturedPlaylists(options).body).toStrictEqual(await spotifyWebAPI.getFeaturedPlaylists(options).body);
});

test('Testing Wrapper.followPlaylist()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horriblePlaylist = "0o35sgyW01kRW1bsGG1VX0";
    expect(await wrapper.followPlaylist(horriblePlaylist).body).toStrictEqual(await spotifyWebAPI.followPlaylist(horriblePlaylist).body);
});

test('Testing Wrapper.unfollowPlaylist()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let horriblePlaylist = "0o35sgyW01kRW1bsGG1VX0";
    expect(await wrapper.unfollowPlaylist(horriblePlaylist).body).toStrictEqual(await spotifyWebAPI.unfollowPlaylist(horriblePlaylist).body);
});

test('Testing Wrapper.getUserPlaylists()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 3, offset: 0 };
    expect(await wrapper.getUserPlaylists(options).body).toStrictEqual(await spotifyWebAPI.getUserPlaylists(options).body);
});

test('Testing Wrapper.getNewReleases()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 5 };
    expect(await wrapper.getNewReleases(options).body).toStrictEqual(await spotifyWebAPI.getNewReleases(options).body);
});

test('Testing Wrapper.getCategories()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 5 };
    expect(await wrapper.getCategories(options).body).toStrictEqual(await spotifyWebAPI.getCategories(options).body);
});

test('Testing Wrapper.search()', async () => {
    let wrapper = await generateWrapper();
    let spotifyWebAPI = await generateSpotifyWebAPI();
    let options = { limit: 5 };
    expect(await wrapper.search("a good song", ['track'], options).body).toStrictEqual(await spotifyWebAPI.search("a good song", ['track'], options).body);
});



