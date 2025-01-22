// Add event listener to prevent error logging
window.addEventListener('error', (event) => {
    event.preventDefault();
});

// Rest of your code here...

let currentSong = new Audio();
let play = document.querySelector("#play")
let previous = document.querySelector("#previous");
let forward = document.querySelector("#next");
let songs;
let currfolder;
const current_url = window.location.href.split("index.html")[0];


async function getSongs(folder) {
    currfolder = folder;
    try {
        let a = await fetch(`${current_url}${currfolder}`);
        let response = await a.text()

        let div = document.createElement("div");
        div.innerHTML = response;

        let lis = div.getElementsByTagName("li");
        songs = [];

        for (let i = 0; i < lis.length; i++) {
            let one_lis = lis[i];
            let anchorElement = one_lis.getElementsByTagName("a")[0]; // Access the first <a> element

            if (anchorElement && anchorElement.href.endsWith(".mp3")) {
                const filename = anchorElement.href.split(`/${currfolder}/`)[1];
                if (!filename) {
                    songs.push(anchorElement.href.split(`${current_url}`)[1]);
                } else {
                    songs.push(filename);
                }
            }

        }

        //Show all the songs in the playlist
        let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
        songUl.innerHTML = "";
        for (const song of songs) {
            songUl.innerHTML = songUl.innerHTML + `<li>
                        <img class="invert" src="/img/music.svg" alt="">
                        <div class="info">
                            <div class="song-name">${song.replaceAll("%20", " ")}</div>
                            <div class="song-artist">Kunal</div>
                        </div>
                        <div class="play-now flex justify-center item-center">
                            <span>Play Now</span>
                            <img class="invert" src="/img/play.svg" alt="">
                        </div></li>`
        }

        // Attach an eventListner to each song
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
            e.addEventListener("click", (element) => {
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            })
        })

        return songs

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

function secondsToMinuteSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const mintues = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formttedMinutes = String(mintues).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formttedMinutes}:${formattedSeconds}`
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    currentSong.src = `/${currfolder}/` + track;
    currentSong.volume = 0.5;
    document.querySelector(".range").getElementsByTagName("input")[0].value = 50;


    if (!pause) {
        currentSong.play()
        play.src = "/img/pause.svg";
    }
    document.querySelector(".song-info").innerHTML = decodeURI(track).replace(".mp3", "");
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
}

// Function for auto play
const autoNext = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            // Handle changes to the div's content
            mutation.addedNodes.forEach(addedNode => {
                if (currentSong.duration === currentSong.currentTime) {
                    let currentIndex = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
                    let lastIndex = songs.length - 1;
                    if (currentIndex !== lastIndex) {
                        playMusic(songs[currentIndex + 1])
                    } else if (currentIndex === lastIndex) {
                        playMusic(songs[0])
                    } else {
                        console.log(error)
                    }
                }
            });

        }
    }


}

async function displayAlbums() {
    let a = await fetch(`${current_url}songs`);
    let response = await a.text();

    let div = document.createElement("div");

    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a");

    let cardContainer = document.querySelector(".card-container");

    let anchor_array = Array.from(anchors)
    for (let index = 0; index < anchor_array.length; index++) {
        const e = anchor_array[index];

        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-1)[0];
            //Get the meta data of the folder
            let metaData = await fetch(`${current_url}songs/${folder}/info.json`, { silent: true });
            let metaResponse = await metaData.json();
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-name="${folder}" class="card">
            <div class="play">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"
                    fill="none">
                    <rect width="100%" height="100%" fill="#1ed760" rx="50%" />
                    <path
                        d="M28.8906 20.846C28.5371 22.189 26.8667 23.138 23.5257 25.0361C20.296 26.8709 18.6812 27.7884 17.37983 27.4196C16.8418 27.2671 16.35159 26.9776 15.95624 26.5787C15 25.6139 15 23.7426 15 20C15 16.2574 15 14.3861 15.95624 13.42132C16.35159 13.02245 16.8418 12.73288 17.37983 12.58042C18.6812 12.21165 20.296 13.12907 23.5257 14.96393C26.8667 16.86197 28.5371 17.811 28.8906 19.154C29.0365 19.7084 29.0365 20.2916 28.8906 20.846Z"
                        fill="#000000" />
                </svg>
            </div>
            <img src="/songs/${folder}/cover.jpg" alt="">
            <h2>${metaResponse.heading}</h2>
            <p>${metaResponse.description}</p>
        </div>`
        } else {
            let folder = e.href.split(current_url)[1];
            //Get the meta data of the folder
            try {
                let metaData = await fetch(`${current_url}songs/${folder}/info.json`, { silent: true });
                if (!metaData.ok) {
                    throw new Error('Failed to fetch meta data');
                }
                let metaResponse = await metaData.json();
                cardContainer.innerHTML = cardContainer.innerHTML + `<div data-name="${folder}" class="card">
                <div class="play">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"
                    fill="none">
                    <rect width="100%" height="100%" fill="#1ed760" rx="50%" />
                    <path
                    d="M28.8906 20.846C28.5371 22.189 26.8667 23.138 23.5257 25.0361C20.296 26.8709 18.6812 27.7884 17.37983 27.4196C16.8418 27.2671 16.35159 26.9776 15.95624 26.5787C15 25.6139 15 23.7426 15 20C15 16.2574 15 14.3861 15.95624 13.42132C16.35159 13.02245 16.8418 12.73288 17.37983 12.58042C18.6812 12.21165 20.296 13.12907 23.5257 14.96393C26.8667 16.86197 28.5371 17.811 28.8906 19.154C29.0365 19.7084 29.0365 20.2916 28.8906 20.846Z"
                    fill="#000000" />
                </svg>
                </div>
                <img src="/songs/${folder}/cover.jpg" alt="">
                <h2>${metaResponse.heading}</h2>
                <p>${metaResponse.description}</p>
            </div>`
            } catch (error) {
                console.error(`Error fetching metadata for ${folder}: ${error.message}`);
            }
        }

    }


    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async (items) => {
            let path = items.currentTarget.dataset.name;
            songs = await getSongs(`songs/${path}`);
            playMusic(songs[0])
        })
    })

}

async function main() {

    //get the list of all the songs
    await getSongs("songs/ncs");
    playMusic(songs[0], true);

    // Display all albums
    await displayAlbums();


    // Attach eventListner ot playbar elements
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "img/play.svg"
        }
    })

    // Listner for time update
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".song-time").innerHTML = `${secondsToMinuteSeconds(currentSong.currentTime)} / ${secondsToMinuteSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = currentSong.currentTime / currentSong.duration * 100 + "%";
    })

    // Add and eventListner on seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = e.offsetX / e.target.getBoundingClientRect().width * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration) * percent / 100;
    })

    // Add eventListner on hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left-part").style.left = 0;
    })

    // Add eventListner for closeing hamburger
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left-part").style.left = "-120%";
    })

    // Add eventListner on previous
    previous.addEventListener("click", () => {

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add eventListner on next
    forward.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    // Add eventListner on volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume === 0) {
            document.querySelector("#volume-icon").src = "img/mute.svg"
        } else {
            document.querySelector("#volume-icon").src = "img/volume.svg"
        }
    })

    // Add eventListner on volume-icon
    let vol = true;
    document.querySelector("#volume-icon").addEventListener("click", () => {
        if (vol === true) {
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
            document.querySelector("#volume-icon").src = "img/mute.svg"
            vol = false;
        } else {
            vol = true;
            currentSong.volume = 0.3;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 30;
            document.querySelector("#volume-icon").src = "img/volume.svg"
        }
    })

    // Logic for auto next
    const observer = new MutationObserver(autoNext);
    let targetElement = document.querySelector(".song-time");
    const config = {
        attributes: true, // Observe changes to attributes
        childList: true, // Observe changes in child nodes
        subtree: true,   // Observe changes in the entire subtree
        charaterData: true //Observe changed in the text content of the target element
    }
    observer.observe(targetElement, config);


}


main()

