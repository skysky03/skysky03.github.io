const userLang = navigator.language || navigator.userLanguage;
const lang = 'zh';

const resources = {
    zh: {
        pageTitle: "可以成为我的恋人吗？",
        usernamePlaceholder: "请输入你的名字",
        confirmButton: "快点我快点我！",
        xiaohongshuLinkText: "",
        douyinLinkText: "",
        repoLinkText: "",
        questionTemplate: (username) => `锦程宝宝可以和sky永远在一起吗 ~`,
        loveMessage: (username) => `!!!喜欢你!! ( >᎑<)♡︎ᐝ  ${username ? `${username}  ♡︎ᐝ(>᎑< )` : ""}`,
        yesButton: "可以",
        noButton: "不要",
        noTexts: [
            "？你认真的吗…",
            "要不再想想？",
            "不许选这个！",
            "我会很伤心…",
            "不行:(",
        ]
    }
};
const texts = resources[lang];

document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
document.title = texts.pageTitle;

document.getElementById('confirmNameButton').innerText = texts.confirmButton;
document.getElementById('xiaohongshuLink').innerText = texts.xiaohongshuLinkText;
document.getElementById('douyinLink').innerText = texts.douyinLinkText;
document.getElementById('repoLink').innerText = texts.repoLinkText;
document.getElementById('question').innerText = texts.questionTemplate("");
document.getElementById('yes').innerText = texts.yesButton;
document.getElementById('no').innerText = texts.noButton;

const confirmNameButton = document.getElementById('confirmNameButton');
const questionText = document.getElementById('question');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const mainImage = document.getElementById('mainImage');
const nameInputContainer = document.getElementById('nameInputContainer');
const confessionContainer = document.getElementById('confessionContainer');
const buttonsContainer = document.querySelector('.buttons');
const xiaohongshuLink = document.getElementById('xiaohongshuLink');
const douyinLink = document.getElementById('douyinLink');
const repoLink = document.getElementById('repoLink');

nameInputContainer.style.display = 'block';

let safeUsername = "";

confirmNameButton.addEventListener('click', function () {
    let username = '李锦程';
    const maxLength = 20;
    safeUsername = username ? username.substring(0, maxLength) : "";
    nameInputContainer.style.display = 'none';
    xiaohongshuLink.style.display = 'none';
    douyinLink.style.display = 'none';
    repoLink.style.display = 'none';
    confessionContainer.style.display = 'block';
    buttonsContainer.classList.add('slide-up-fade-in');
    questionText.innerText = texts.questionTemplate(safeUsername);
});

let clickCount = 0;

noButton.addEventListener('click', function () {
    clickCount++;
    let yesSize = 1 + clickCount * 1.2;
    yesButton.style.transform = `scale(${yesSize})`;
    let noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;
    let moveUp = clickCount * 25;
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;
    if (clickCount <= texts.noTexts.length) {
        noButton.innerText = texts.noTexts[clickCount - 1];
    }
    const imageMap = {
        1: "assets/images/shocked.png",  // 震惊
        2: "assets/images/think.png",    // 思考
        3: "assets/images/angry.png",    // 生气
        4: "assets/images/crying.png",   // 哭
    };
    if (clickCount in imageMap) {
        mainImage.src = imageMap[clickCount];
    } else if (clickCount >= 5) {
        mainImage.src = "assets/images/crying.png";
    }
});

const loveTest = (username) => texts.loveMessage(username);
yesButton.addEventListener('click', function () {
    const username = safeUsername;
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text"></h1>
            <img src="assets/images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;
    document.querySelector(".yes-text").innerText = loveTest(username);
    document.body.style.overflow = "hidden";
    document.querySelector('.yes-screen').classList.add('fade-in');
});
