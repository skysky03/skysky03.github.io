const photos = [
    {
        title: "第一天见面",
        date: "2023.05.10",
        src: "album/photo1.jpg",
        desc: "那天阳光很好，我们第一次见面。"
    },
    {
        title: "第一次旅行",
        date: "2023.07.02",
        src: "album/photo2.jpg",
        desc: "去海边玩的一天，很开心。"
    },
    {
        title: "生日快乐",
        date: "2024.04.16",
        src: "album/photo3.jpg",
        desc: ""
    }
];

let index = 0;

function updatePhoto() {
    const p = photos[index];
    document.getElementById("photo-title").textContent = p.title;
    document.getElementById("photo-date").textContent = p.date;
    document.getElementById("photo-img").src = p.src;
    document.getElementById("photo-desc").textContent = p.desc;
}

function prevPhoto() {
    index = (index - 1 + photos.length) % photos.length;
    updatePhoto();
}

function nextPhoto() {
    index = (index + 1) % photos.length;
    updatePhoto();
}
