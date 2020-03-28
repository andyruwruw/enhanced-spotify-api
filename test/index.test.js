const { Track, Tracks, Artist, Artists, Album, Albums, Playlist, Playlists } = require('../src/index');
const CorrectTrack = require('../src/structures/Track');
const CorrectTracks = require('../src/structures/Tracks');
const CorrectArtist = require('../src/structures/Artist');
const CorrectArtists = require('../src/structures/Artists');
const CorrectAlbum = require('../src/structures/Album');
const CorrectAlbums = require('../src/structures/Albums');
const CorrectPlaylist = require('../src/structures/Playlist');
const CorrectPlaylists = require('../src/structures/Playlists');

test('Importing Track from index.js', () => {
    expect(Track).toBe(CorrectTrack);
});

test('Importing Tracks from index.js', () => {
    expect(Tracks).toBe(CorrectTracks);
});

test('Importing Artist from index.js', () => {
    expect(Artist).toBe(CorrectArtist);
});

test('Importing Artists from index.js', () => {
    expect(Artists).toBe(CorrectArtists);
});

test('Importing Album from index.js', () => {
    expect(Album).toBe(CorrectAlbum);
});

test('Importing Albums from index.js', () => {
    expect(Albums).toBe(CorrectAlbums);
});

test('Importing Playlist from index.js', () => {
    expect(Playlist).toBe(CorrectPlaylist);
});

test('Importing Playlists from index.js', () => {
    expect(Playlists).toBe(CorrectPlaylists);
});