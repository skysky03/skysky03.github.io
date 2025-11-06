const photos = window.photos;

let index = 0;
let switching = false; // 防止连点把动画打爆

function setContent(p) {
    document.getElementById("photo-title").textContent = p.title;
    document.getElementById("photo-date").textContent = p.date;
    document.getElementById("photo-img").src = p.src;
    document.getElementById("photo-desc").textContent = p.desc || "";
}

function updatePhoto(animated = true) {
    const p = photos[index];
    if (!animated) { setContent(p); return; }
    if (switching) return;
    switching = true;
    const pre = new Image();
    pre.onload = () => {
        const els = [
            document.getElementById("photo-title"),
            document.getElementById("photo-date"),
            document.getElementById("photo-img"),
            document.getElementById("photo-desc")
        ];
        els.forEach(el => el.classList.add("fade-out"));
        setTimeout(() => {
            setContent(p);
            void document.getElementById("photo-img").offsetWidth;
            els.forEach(el => el.classList.remove("fade-out"));
            setTimeout(() => switching = false, 300);
        }, 250);
    };
    pre.onerror = () => { setContent(p); switching = false; };
    pre.src = p.src;
}

function prevPhoto() {
    index = (index - 1 + photos.length) % photos.length;
    updatePhoto();
}

function nextPhoto() {
    index = (index + 1) % photos.length;
    updatePhoto();
}

document.addEventListener("DOMContentLoaded", () => {
    updatePhoto(false);
});

// 你的相册代码保持不动，上面那段就是

document.addEventListener("DOMContentLoaded", () => {
    updatePhoto(false);
    setupAudioPlayer();
});

function setupAudioPlayer() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('audio-toggle');
    const icon = document.getElementById('audio-icon');
    const range = document.getElementById('audio-progress');
    const curEl = document.getElementById('audio-current');
    const durEl = document.getElementById('audio-duration');

    let seeking = false;

    // 尝试自动播放，失败就等第一次用户点击
    tryAutoplay(audio);

    // 获取时长
    audio.addEventListener('loadedmetadata', () => {
        durEl.textContent = fmtTime(audio.duration);
    });

    // 播放状态切换
    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => { }); // 有些环境仍需手势，这里已是手势
        } else {
            audio.pause();
        }
    });

    // 根据播放状态更新图标
    audio.addEventListener('play', () => {
        icon.src = 'assets/images/playsong.png';
    });

    audio.addEventListener('pause', () => {
        icon.src = 'assets/images/pausesong.png';
    });


    // 进度更新
    audio.addEventListener('timeupdate', () => {
        if (seeking) return;
        const pct = audio.currentTime / (audio.duration || 1) * 100;
        range.value = pct;
        range.style.setProperty('--fill', pct + '%');
        curEl.textContent = fmtTime(audio.currentTime);
        if (!Number.isFinite(audio.duration)) durEl.textContent = '0:00';
    });

    // 拖动进度
    const seekTo = pct => {
        const t = (pct / 100) * (audio.duration || 0);
        audio.currentTime = t;
    };
    range.addEventListener('input', e => {
        seeking = true;
        const pct = parseFloat(e.target.value || '0');
        range.style.setProperty('--fill', pct + '%');
        curEl.textContent = fmtTime((pct / 100) * (audio.duration || 0));
    });
    range.addEventListener('change', e => {
        const pct = parseFloat(e.target.value || '0');
        seekTo(pct);
        seeking = false;
    });

    // 点击页面任意处，若之前自动播放被拦截，则开始播放一次
    document.addEventListener('pointerdown', onceStart, { once: true });

    function onceStart() {
        if (audio.paused) audio.play().catch(() => { /* 用户禁了声音也无能为力 */ });
    }
}

function fmtTime(s) {
    s = Math.max(0, Math.floor(s || 0));
    const m = Math.floor(s / 60);
    const ss = String(s % 60).padStart(2, '0');
    return `${m}:${ss}`;
}

// 自动播放尝试，失败静默
function tryAutoplay(audio) {
    // 有些浏览器要求 muted 才能自动播，先静音播起，再在首次用户交互时恢复音量
    const restore = () => {
        audio.muted = false;
        document.removeEventListener('pointerdown', restore);
    };
    audio.muted = true;
    audio.play()
        .then(() => {
            // 自动播成功，等待用户第一次交互再取消静音
            document.addEventListener('pointerdown', restore, { once: true });
        })
        .catch(() => {
            // 自动播失败，保持暂停，等用户第一下点击时播放
            audio.pause();
            audio.currentTime = 0;
            document.addEventListener('pointerdown', () => audio.play().catch(() => { }), { once: true });
            // 取消静音以免奇怪
            audio.muted = false;
        });
}

