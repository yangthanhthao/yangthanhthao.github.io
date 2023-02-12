var audio = document.querySelector('#audio');
var playBtn = document.querySelector('.playBtn');
var pauseBtn = document.querySelector('.pauseBtn');
var progress = document.getElementById('progress');
var imageSong = document.querySelector('#imageSong');
var rotateCD;
var songsApi = 'https://localhost:3000/songs';
var playlist = document.querySelector('.playlist');
var nextSong = document.querySelector('.songAfter');
var previousSong = document.querySelector('.songBefore');
var songPlayingID = 1;

function changePlayBtnStateTo(state) {
    if (state.toLowerCase() === 'play') {
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    } else if (state.toLowerCase() === 'pause') {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    } else {
        return;
    }
}

function createImgSong() {
    document.getElementById('imageSong').remove();
    var img = document.createElement('img');
    img.id = 'imageSong';
    rotateCD = img.animate([{ transform: 'rotate(360deg)' }], {
        duration: 10000,
        iterations: Infinity,
    });
    document.querySelector('.imgSong').appendChild(img);
}

nextSong.onclick = function () {
    var _nextSong = document.querySelector(`#songid${songPlayingID + 1}`);
    if (_nextSong) {
        _nextSong.click();
    }
};

previousSong.onclick = function () {
    var _previousSong = document.querySelector(`#songid${songPlayingID - 1}`);
    if (_previousSong) {
        _previousSong.click();
    }
};

playBtn.onclick = function () {
    changePlayBtnStateTo('pause');
    audio.play();
};

pauseBtn.onclick = function () {
    changePlayBtnStateTo('play');
    audio.pause();
};

var holdingMouse = false;

setInterval(() => {
    if (!holdingMouse) {
        if (audio.currentTime === 0) {
            progress.value = 0;
        } else {
            progress.value = Math.floor(
                (audio.currentTime / audio.duration) * 100,
            );
        }
    }
}, 1000);

//xu ly quay cd
rotateCD = document
    .querySelector('#imageSong')
    .animate([{ transform: 'rotate(360deg)' }], {
        duration: 10000,
        iterations: Infinity,
    });

rotateCD.pause();

//xu ly tua bai hat
progress.onchange = function (e) {
    audio.currentTime = (audio.duration / 100) * e.target.value;
};

progress.onmousedown = function () {
    holdingMouse = true;
    audio.pause();
};

progress.onmouseup = function () {
    holdingMouse = false;
    audio.play();
};

audio.onplay = function () {
    rotateCD.play();
};

audio.onpause = function () {
    rotateCD.pause();
};

audio.onplaying = function () {
    changePlayBtnStateTo('pause');
};

fetch(songsApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (songs) {
        audio.src = songs[0].source;

        var html = songs.map(function (song) {
            return `
            <div class="song1">
            <img src=${song.img}>
            <div class="contentSong">
                <h4>${song.name}</h4>
                <p>${song.author}</p>
            </div>
            </div>
            `;
        });

        // html.join('')
        playlist.innerHTML = html.join('');
        // console.log(playlist)
        var arrSong1 = document.querySelectorAll('.song1');
        arrSong1.forEach(function (song, i) {
            song.setAttribute('id', `songid${i + 1}`);
            // song.setAttribute('onclick', `onclickSong(this,${songs[i]})`)
            song.addEventListener('click', function () {
                onclickSong(songs[i]);
                // console.log(songs[i])
            });
        });
    });
var setTitle = document.getElementById('title');

function onclickSong(song) {
    createImgSong();
    setTitle.innerText = song.name;
    document.getElementById('imageSong').src = song.img;
    audio.setAttribute('src', `${song.source}`);
    progress.value = 0;
    audio.play();
    songPlayingID = song.id;
    changePlayBtnStateTo('pause');
}
