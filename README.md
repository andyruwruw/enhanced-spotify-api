# enhanced-spotify-api

## **Under Development**

This library is aimed at *expanding the endpoints for Spotify's API* by *grouping relevent requests together* in various classes and methods.

Built upon [spotify-web-api-js](https://github.com/JMPerez/spotify-web-api-js).

Requests that are not available, such as *AVERAGE DANCEABILITY FOR USER'S WHOLE LIBRARY* will be available through this library.

I'll be building a **node** version as well.

See below for coming features.

*Audio Features:*
- *Happiness (valence)*
- *Danceability*
- *Energy*
- *Liveness*
- *Acousticness*
- *Instrumentalness*
- *Speechiness*
- *Tempo*
- *Key*
- *Mode*
- *Loudness*

# Coming Features
- All Functionality of **spotify-web-api**
- Node Version
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
    
        
- Data Access Objects for Ease of Requests
    - Track DAO
    - Tracks DAO (Multiple Tracks)
    - Artist DAO
    - Artists DAO
    - Genre DAO
    - Playlist DAO
    - Album DAO
    - Profile DAO (User Data)
