setInterval(() => {
    [].slice.call(document.querySelectorAll('[data-click-id="media"]'))
        .filter(x => x.querySelector('video') && x.querySelector('source')).forEach((oldVideo, i) => {
            try {
                const id = oldVideo.querySelector('source').src.split('.it/')[1].split('/')[0]
                const player = oldVideo.parentNode
                player.innerHTML =
                    `<video controls onclick="event.stopPropagation();" preload="auto" src="https://v.redd.it/${id}/DASH_720.mp4" style="width:100%!important;"></video>`
                    + `<audio preload="none" src="https://v.redd.it/${id}/DASH_audio.mp4"></audio>`
                let video = player.querySelector('video')
                let audio = player.querySelector('audio')
                video.onplay = function () {
                    audio.currentTime = video.currentTime
                    audio.play();
                }
                video.onpause = function () { audio.pause(); }
                console.log(`Fixed the fucking reddit video with ID#`, id)
            } catch (err) {
                console.warn('Error while fixing the fucking reddit videos, fuck reddit', oldVideo, i)
            }
        })
}, 42)
