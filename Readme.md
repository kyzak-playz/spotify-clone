# **Spotify Clone: The Ultimate Vanilla JS Challenge**

[![Personal Project](https://img.shields.io/badge/Personal%20Project-Web%20Development-orange.svg)](https://github.com/kyzak-playz/spotify-clone)

## **A Labor of Love, Built from Scratch**

No external libraries, no frameworks. Just pure, unadulterated Vanilla JavaScript.

**Features:**

- Playlist management
- Album art display
- Audio playback
- Music Player

## **Why?**

To practice, to learn, and to push the boundaries of what's possible with Vanilla JavaScript.

## **Get Started**

Don't just open `index.html`. Create a local server with:

- XAMP
- Python (`python -m http.server 3000`)
- Live Server extension in VS Code



Here is the formatted text:


## File Structure

To ensure consistency and organization, please follow the file structure guidelines below:

- **Root**
  - `css/`
  - `js/`
  - `img/`
  - `songs/`
  - `index.html`

- **img/**
  - `.svg` (all SVG files)

- **songs/**
  - `cs/` (playlist folder)
    - `info.json` (required)
    - `cover.jpg` (required)
    - `.mp3`    (all songs)
  - `ncs/` (playlist folder)
    - `info.json` (required)
    - `cover.jpg` (required)
    - `.mp3`    (all songs)
  - ... (add more playlist folders as needed)

## Notes

- Make sure to keep all SVG files in the `img/` folder.
- Each playlist folder (e.g. `cs/`, `ncs/`) must contain an `info.json` file and a `cover.jpg` file and then add songs. 
- `info.json` should contain a `heading` and a `description` for the playlist. And `cover.jpg` will be the album art for the playlist.

```json
{
    "heading": "copyright songs",
    "description": "Songs for you"  # An example of info.json 
}
```
- Each song name should contain the artist name followed by the song name. Ex- Alan Walker -  The Spectre.mp3
- Keep the `index.html` file in the root directory.

By following this file structure, we can ensure that our project remains organized and easy to maintain.

## **Contribute**

Suggestions and feedback welcome! Open a pull request or submit an issue.

## **License**

Spotify clone is licensed under the Creative Commons Zero v1.0 Universal License. See [LICENSE](LICENSE) for details.

## **About the Author**

Check out my [bio](https://github.com/kyzak-playz) for more info.
