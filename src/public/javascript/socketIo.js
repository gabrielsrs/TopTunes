const socket = io();

const searchArtist = document.querySelector("#artist")
const formArtist = document.querySelector("#find-artists")
const foundedArtistsContent = document.querySelector("#found-artists")
let foundedArtists = document.querySelectorAll("#found-artists > li") || []
let topMusics = document.querySelectorAll(".top-musics")
let toggleArtists = document.querySelectorAll(".toggle-artists")
let upArrow = document.querySelectorAll(".up-arrow")
let downArrow = document.querySelectorAll(".down-arrow")

searchArtist.addEventListener("input", async (event) => {
    const artistName = event.currentTarget.value

    if (!artistName) {
        errorMessage("Please fill out the artist input field.")
        return null
    }

    socket.emit("searchingArtists", artistName)

    await socket.once("searchResponse", (artists) => {
        console.log(artists)
        foundedArtistsHTMLElement(artists)
    })
})

formArtist.addEventListener("submit", (event) => {
    event.preventDefault()

    const artistName = event.currentTarget.children[0].value

    if (!artistName) {
        errorMessage("Artist search submitted, but not filled.")
        return null
    }

    getArtist(artistName)
})

function searchArtistClicked() {
    foundedArtists.forEach(item => {
        item.addEventListener("click", (event) => {
            const artistName = event.currentTarget.children[1].textContent
            console.log(artistName)
    
            getArtist(artistName)
        })
    })
}

function getArtist(artistName) {
    socket.emit("getArtist", artistName)

    socket.once("topTracks", ({ artistInfos, topTracks, albumImg }) => {
        artistTopTrackHTMLElement(artistInfos, topTracks, albumImg)
        console.log(artistInfos)
        console.log(topTracks)
        console.log(albumImg)
    })
}

function toggleArtistsUpdate() {
    const newItem = Array.from(toggleArtists).slice(-1)[0]
    const index = toggleArtists.length - 1
    
    newItem.addEventListener("click", () => {
        upArrow[index].toggleAttribute("hidden")
        downArrow[index].toggleAttribute("hidden")
        topMusics[index].classList.toggle("hiddenTopMusics")
    })

}

socket.on("searchError", (errorMsg) => errorMessage(errorMsg.message))

function errorMessage(errorMessage) {
    foundedArtistsContent.innerHTML = ""
    foundedArtistsContent.insertAdjacentHTML("beforeend", `
        <span id="error-submit">${errorMessage}</span>
    `)
}

function foundedArtistsHTMLElement(artistsInfo) {
    foundedArtistsContent.innerHTML = ""
    
    for (let artistInfo of artistsInfo) {
        foundedArtistsContent.insertAdjacentHTML("beforeend", `
            <li>
                <img src="${artistInfo.images.length ? artistInfo.images[2].url : ""}" alt="${artistInfo.name}">
                <span title="${artistInfo.name}">${artistInfo.name}</span>
                <a href="${artistInfo.spotifyUrl}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="var(--second-clr)" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/></svg>
                </a>
            </li>
        `)
    }

    foundedArtists = document.querySelectorAll("#found-artists > li")
    searchArtistClicked()
}

function artistTopTrackHTMLElement(artistInfos, topTracks, albumImg) {
    const artistsSearched = document.querySelector("#artists-searched")

    if (artistsSearched.children.length === 0) {
        document.querySelector("main").classList.add('main-start');
    } 

    artistsSearched.insertAdjacentHTML("beforeend", `
        <hr class="hr-style small-hr">
        <div class="artist-infos">
            <div class="artist-infos-content">
                <div class="background-album-mask" style="background-image: url(${albumImg[0].url})"></div>
                <div class="main-artist-info">
                    <div>
                        <img src="${artistInfos[0].images[1].url}" alt="${artistInfos[0].name}">
                    </div>
                    <div class="text-info">
                        <h3 title="${artistInfos[0].name}">${artistInfos[0].name}</h3>
                        <span title="${artistInfos[0].followers} Followers">${artistInfos[0].followers} Followers</span>
                    </div>
                    <a href="${artistInfos[0].spotifyUrl}" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="var(--second-clr)" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/></svg>
                    </a>
                    <div class="toggle-artists">
                        <div class="up-arrow" hidden>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#555555" d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
                        </div>
                        <div class="down-arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#555555" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                        </div>
                    </div>
                </div>
                <ul class="top-musics">
                    ${consolidateTracks(topTracks)}
                </ul>
            </div>
        </div>    
    `)
    
    topMusics = document.querySelectorAll(".top-musics")
    toggleArtists = document.querySelectorAll(".toggle-artists")
    upArrow = document.querySelectorAll(".up-arrow")
    downArrow = document.querySelectorAll(".down-arrow")
    toggleArtistsUpdate()
}

function consolidateTracks(topTracks) {
    return topTracks.map((track, index) => {
        return `
            <li>
                <img src="${track.trackImages[2].url}" alt="${track.name}">
                <span title="${track.name}">${index+1}. ${track.name}</span>
                <a href="${track.spotifyTrackLink}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="var(--second-clr)" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/></svg>
                </a>
            </li>
        `
    }).join("")
}