# enhanced-spotify-api

<p style="margin-top: 15px; max-width: 600px">
    <a href="https://melophile.org"><img src="https://img.shields.io/npm/v/enhanced-spotify-api"></a>
    <a href="#"><img src="https://img.shields.io/npm/dt/enhanced-spotify-api"/></a>
    <a href="https://melophile.org"><img src="https://img.shields.io/github/issues-raw/andyruwruw/enhanced-spotify-api"></a>
</p>

## **Under Development**

### [Documentation](https://github.com/andyruwruw/enhanced-spotify-api/wiki)

**enhanced-spotify-api** aims to **expand available endpoints for Spotify's API** namely by **grouping relevent requests together** into more complicated requests.

Requests such as **AVERAGE DANCEABILITY FOR USER'S WHOLE LIBRARY** will be available through member functions of the enhanced-spotify-api instance.

In addition to additional possible queries, enhanced-spotify-api provides **simple and easy to use classes for data objects**.

Data Objects:
- Track
- Artist
- Album
- Playlist

Plural Data Objects:
- Tracks (Multiple Tracks)
- Artists (Multiple Tracks)
- Albums (Multiple Tracks)

Each with their own set of member functions to save you the expense of figuring out what requests to make.

For example, an endpoint you're interested might only return **simplified track objects** but you need **full track objects**. 

Using the **Tracks** object you can load in the track data you recieved and run **Tracks.getFullObjects** and be returned an array of full track objects using the minimum amount of requests for fastest time.

Built upon [spotify-web-api-js](https://github.com/JMPerez/spotify-web-api-js).

---

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
