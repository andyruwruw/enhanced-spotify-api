<p align="center">
    <img width="200px" src="https://raw.githubusercontent.com/andyruwruw/enhanced-spotify-api/master/documentation/markdown/logo.svg?sanitize=true"/>
</p>
<p align="center" style="margin-bottom: 0px;">
    <img width="500px" src="https://raw.githubusercontent.com/andyruwruw/enhanced-spotify-api/master/documentation/markdown/title.svg?sanitize=true"/>
</p>
<p align="center" style="margin-top: 0px">Object-Oriented Spotify API Wrapper with Extended Functionality.<p>
<p align="center" style="margin: 0 auto; margin-top: 15px; max-width: 600px">
    <a href="https://melophile.org"><img src="https://img.shields.io/npm/v/enhanced-spotify-api?color=%23d400b0"></a>
    <a href="#"><img src="https://img.shields.io/npm/dt/enhanced-spotify-api?color=%238514e0"/></a>
    <a href="https://melophile.org"><img src="https://img.shields.io/github/issues-raw/andyruwruw/enhanced-spotify-api?color=%2300b4d4"></a>
</p>

# Overview

enhanced-spotify-api is an Object-Oriented API Wrapper aimed to make Spotify's API development fun and painless.

Spend more of your time coding something cool, and less time scouring over documentation.

# Table of Contents

[Official Website / Documentation](http://enhancedspotifyapi.com)

- [Features](#features)
- [Quick Start](#quick-start)
- [Example](#example)
- [Available Classes](#available-classes)

# Features

Object oriented wrapper with classes for tracks, artists, playlists, and more

- Member functions for all relevant endpoints
- Automatic retrieval of data when needed
- Minimizing requests made

Providing all the original functionality of [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node).

- Added missing endpoints for shows and episodes (Just released 3/2020)
- Fixed known bugs

Add and Override methods

- Customize to your hearts content
- I don't know what you need it for, so do your thing my dude.


# Quick Start

Via command line

```
$ npm i enhanced-spotify-api
```

Import either the entire library

```
var EnhancedSpotifyAPI = require('enhanced-spotify-api');
EnhancedSpotifyAPI.setAccessToken( myAccessToken );
```

Or deconstruct what you need

```
var { Track } = require('enhanced-spotify-api');
Track.setAccessToken( myAccessToken );
```
All classes have the same authorization methods.

Applying a Spotify access token to one class will authorize the *entire library* and will not need to be called again.

Instantiate and play!

```
var playlistID = '6Ibg2aBUp5NP0lAujEGa6p';
var playlist = new Playlist( playlistID );

var tracks = playlist.getTracks();
tracks.play();

var size = playlist.size();
```

See the [official website](http://enhancedspotifyapi.com) for more information.

# Example

```
var { Track } = require('enhanced-spotify-api');
Track.setAccessToken( myAccessToken );

var trackID = '3HKpZgez8S4TS2F0sWLvAR';
var track = new Track( trackID );

console.log('My favorite song is', ( await track.getFullObject() ).name);

track.play();

var artists = track.getArtists();

var artist = artists.get(0);

var topTracks = artist.getTopTracks();
```

# Available Classes

*Instance and static methods for all endpoints relevent to each item*

- Track
- Artist
- Album
- Playlist
- Show
- Episode
- User
- Playback
- Tracks
- Artists
- Albums
- Playlists
- Shows
- Episodes
- Categories


<p align="center">
    <img width="300px" src="https://media0.giphy.com/media/O1xeZ4AgSaNBS/giphy.gif"/>
</p>
<h2 align="center">Hope you make some cool stuff!</h2>


