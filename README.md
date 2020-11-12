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

## [Visit the Official Website / Documentation](http://enhancedspotifyapi.com)

No more **Simplified Objects** when you need **Full Objects**

No more **Paging Objects** when you need **All Playlist Tracks**

enhanced-spotify-api is an **Object-Oriented API Wrapper** aimed to make Spotify's API development fun and painless, and to expand available endpoints.

Spend more of your time coding something cool, and less time scouring over documentation.

### Unique Features:

- Object Oriented Wrapper with Classes for `Track`, `Artist`, `Playlist`, and more.
    - Member functions for all endpoints relevent to each item.
    - Automatic loading of the data you need when you need it. 
    - Retrieving data in as few requests as possible.

- Add and Override Methods! Customize to your hearts content.
    - I don't know what you need it for, so do your thing my dude.

- Providing all the original functionality of [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node).
    - Added missing endpoints for shows and episodes (Just released 3/2020).
    - Fixed known bugs

- Grouping relevent requests together into more complicated requests. (Coming Soon)
    - *What's the average danceability of my whole library?*
    - *Re-order my playlist so it increases in energy over time.*
    - *(If you're gross) Get all my track's artist's album's songs and play them.*

# Why Use enhanced-spotify-api?

After months of working with Spotify's API and [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node), I found myself repeating code just to recieve the data I needed.

Sometimes I got a *Simplfied Track Object* from this request but needed a *Full Track Object*. 

Sometimes I needed all the tracks from an Album but had to run through a *Paging Object* with a while loop to retrieve them all.

I built these Data Access Classes and realized they could be really useful to the community. 

I had a lot of customizations only relevant to me (Attatching to Mongo Database) so I made it customizable as well!

# Detailed Features

### Data Access Classes:

*Instance and static methods for all endpoints relevent to each items*

- Track
- Artist
- Album
- Playlist
- Show
- Episode
- User
- Playback


### Manager Classes:

*Manager classes are built to retrieve multiple items in single requests to limit the amount of requests needed.*

- Tracks (Multiple Tracks) 
- Artists (Multiple Artists)
- Albums (Multiple Albums)
- Playlists (Multiple Playlists)
- Shows
- Episodes (Multiple Episodes)
- Categories (Multiple Categories)


# Coming Features
- Process User's Entire Library
    - Averages of Audio Features in Library
    - Distribution of Audio Features in Library
    - History Data
        - Timeline of Added
        - Tracks Liked in a Month
        - Tracks Liked in a Year
        - Timeline of most added Artists
        - Timeline of most added Genres
    - Charts (Enhanced)
        - Extremes
            - Your Libraries TOP / LEAST CHART of Audio Features
                - Example: Most Happy
                - Example: Least Energetic
        - Top Saved (Num of Liked Tracks) 
            - Artists
            - Genres
            - Distribution of Audio Features
            - Timeline of Additions
            - Playlists Included In
        - Top Played
            - Distribution of Audio Features
            - Average of Audio Features
            - Most Included Artists
            - Timeline of Addtions
            - Most Included Genres
            - Playlists Included In
    - Proximity Simular Tracks
        - Finds tracks WITHIN Library with Simular Audio Features (KD-Tree Search)
    - Tracks
        - Percentile Values of Audio Features compaired to Library
        - Pre-processed Audio Analysis for Waveform
        - Get Genres
    - Artists
        - Age of Relationship
        - Sort Tracks in Order of:
            - Date Added
            - Audio Feature
        - Get Top Songs
            - Average of Audio Features
        - Playlists Included In
    - Genres
        - All Liked Tracks from Genre
        - All Liked Artists from Genre
        - Timeline of Additions of Genre
        - Distribution of Audio Features
        - Timeline of Addition
        - Playlists Included In
        - Artist Images (For Display)
    - Playlists
        - Most Included Artists
        - Most Included Genres
        - Distribution of Audio Features
        - Timeline of Audio Features (If you listened from start)
        - Sort Tracks in Order of:
            - Actual Index
            - Date Added
            - Audio Feature Value
    - Album
        - Tracks
            - Distribution of Audio Features
            - Timeline of Audio Features (If you listened from start)
        - Playlists Included In

<p align="center">
    <img width="300px" src="https://media0.giphy.com/media/O1xeZ4AgSaNBS/giphy.gif"/>
</p>
<h2 align="center">Hope you make some cool stuff!</h2>


