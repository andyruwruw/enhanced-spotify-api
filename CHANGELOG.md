# Changelog

> **Tags:**
> - :boom:       [Breaking Change]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :memo:       [Documentation]
> - :nail_care:  [Polish]

## v1.1.7 (8/25/2020)
#### :bug: [Bug Fix]
- `Container Class`
    - Depreciated variable removed.

## v1.1.6 (8/24/2020)
#### :bug: [Bug Fix]
- `Tracks Container`
    - Incorrect key used for retrieval of audio features.
#### :nail_care: [Polish]
- `All Classes`
    - Now abiding AirBnB eslint standards.

## v1.1.5 (4/26/2020)
#### :rocket: [New Feature]
- `Artists Container`
    - Get User Top Artists
    - Follow and Unfollow name standardized.

## v1.1.4 (4/24/2020)
#### :nail_care: [Polish]
- `Tracks Container`
    - I suppose plural for Analysis is Analyses

## v1.1.3 (4/20/2020)
#### :bug: [Bug Fix]
- `User Class`
    - Fixed broken get data methods.
#### :nail_care: [Polish]
- `Playlists Container`
    - Utilizes both `Get My Playlists` and `Get User's Playlists`.
- `Tracks Container`
    - I suppose plural for Analysis is Analyses

## v1.1.2 (4/20/2020)
#### :rocket: [New Feature]
-  `Playlist Class`
    - Added `sort` method to playlist class!
    - Added `filter` method to playlist class!
- `Playback Class`
    - Added Get Recently Played Method.
#### :nail_care: [Polish]
- `Container Class`
    - Now supports all types for arrays of nested objects with additional details.

## v1.1.1 (4/18/2020)
#### :boom: [Breaking Change]
- `Playback Class`
    - Made all methods static. Due to the constantly changing state of the user's playback and the lack of a need for multiple instances, methods were moved to being static. Giving them the same access to make requests through prior authentication, but removing the need to create instances or pass them around.
#### :rocket: [New Feature]
-  `Episode and Show Classes`
    - Added `play` methods which are undocumented by Spotify but work!
#### :nail_care: [Polish]
- `Various Classes`
    - Added Missing `loadConditionally` methods.
#### :memo: [Documentation]
- `CHANGELOG.md Added`
    - Hello

## v1.1.0 (4/17/2020)
#### :boom: [Breaking Change]
- `All Classes`
    - Removed requirement to pass in Wrapper Instance to methods requiring authenticated requests. A static wrapper instance will be maintained and shared by all classes. Authentication can be passed in through the imported library, or by any of the classes.

## v1.0.7 (4/10/2020)
#### :rocket: [New Feature]
-  `Playlist Class`
    - Added `create` playlist as a static method.
- `User Class`
    - Added `areFollowingPlaylist` method.
#### :bug: [Bug Fix]
- `Container Classes`
    - Fixed issue of reused variable.
#### :nail_care: [Polish]
- `Tracks Container`
    - I suppose plural for Analysis is Analyses

## v1.0.6 (4/10/2020)
#### :nail_care: [Polish]
- `Container Classes`
    - Replaced array methods with for loops for improved efficiency.

## v1.0.5 (4/10/2020)
#### :bug: [Bug Fix]
- `Wrapper Class`
    - Fixed Broken spotify-web-api-node `play` endpoint parameter `position_ms`.
    - Added references to dependent files in endpoints for Shows and Episodes
- `Various Classes`
    - Fixed references to related classes
    - Depreciated method `add`, bumped to `push`
    - Fixed static `get` methods to request from Spotify, then construct
#### :nail_care: [Polish]
- `CONTRIBUTING.md`
    - Added Contribution notes.

## v1.0.4 (4/8/2020)
#### :boom: [Breaking Change]
- `Playlist Class`
    - Remodeled to Commit Changes as made.
- `Container Classes`
    - All containers now inherit from a `Container` class.
#### :bug: [Bug Fix]
- `Wrapper Class`
    - Fixed Arrow Functions in Show and Episode endpoints.
- `Various Containers`
    - Fixed references to related classes
#### :nail_care: [Polish]
- `Container Classes`
    - Replaced array methods with for loops for improved efficiency.

## v1.0.3 (4/7/2020)
#### :rocket: [New Feature]
- `All Classes`
    - Lazy load other related classes.
    - Load Conditionally method added to all classes.
#### :bug: [Bug Fix]
- `All Classes`
    - Fixed bug where classes recursively imported one another due to need to maintain overridable references to one another.
- `index.js`
    - Added custom importing of files as Getters

## v1.0.2 (4/5/2020)
#### :bug: [Bug Fix]
- `Various Classes`
    - Depreciated method `add`, bumped to `push`
    - Fixed Improper handling of result data.

## v1.0.1 (4/5/2020)
#### :boom: [Breaking Change]
- `Playlist Class`
    Refactored Playlist Class to Resemble Track Class
#### :rocket: [New Feature]
- `Wrapper Class`
    - Added Customization Methods to Wrapper Class
- `Show Class`
    - Added Method to Retrieve Some Episodes and not All
#### :bug: [Bug Fix]
- `All Classes`
    - Fixed Arrow Function Issue
    - Added References to Related Classes for Override
- `Track Class`
    - Fixed Checking of Conditional Values
#### :memo: [Documentation]
- `Various Classes`
    - Fixed Documentation Typos
    - Fixed Incorrect Error Messages

## v1.0.0 (4/1/2020)
#### :rocket: [New Feature]
- Classes
    - `Track Class`
    - `Artist Class`
    - `Album Class`
    - `Playlist Class`
    - `Episode Class`
    - `Show Class`
    - `Category Class`
    - `Playback Class`
    - `User Class`
    - `Wrapper Class`
        - Inherits from spotify-web-api-node
        - Added Missing Show and Episode Endpoints
- Containers
    - `Tracks Container`
    - `Artists Container`
    - `Albums Container`
    - `Playlists Container`
    - `Episodes Container`
    - `Shows Container`
    - `Categories Container`
    
