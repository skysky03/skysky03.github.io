// 自动检测系统语言，默认英文
const userLang = navigator.language || navigator.userLanguage;
// const lang = userLang.startsWith('zh') ? 'zh' : 'en';
const lang = 'zh';

// 定义多语言文本资源
const resources = {
    zh: {
        pageTitle: "可以成为我的恋人吗？",
        greeting: "你希望我怎么称呼你呢？(*>﹏<*)′",
        subGreeting: "不想告诉我的话也可以留空哦",
        usernamePlaceholder: "请输入你的名字",
        confirmButton: "是这个名字呢",
        xiaohongshuLinkText: "",
        douyinLinkText: "",
        repoLinkText: "",
        questionTemplate: (username) => `可以成为我的恋人吗？${username}`,
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
    },
    en: {
        pageTitle: "Will you be my sweetheart?",
        greeting: "What nickname can I call you? (´• ω •`) ♡",
        subGreeting: "It's okay to keep it secret~",
        usernamePlaceholder: "Type your cute name here...",
        confirmButton: "Confirm ( ˘ ³˘)♥",
        xiaohongshuLinkText: "Little Red Book ヾ(☆▽☆)",
        douyinLinkText: "Douyin/TikTok ( •̀ ω •́ )",
        repoLinkText: "Source Repo (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
        questionTemplate: (username) =>
            username ? `Will you be my forever ${username}? (ﾉ>ω<)ﾉ :♡`
                : "Be my special one? (⁄ ⁄•⁄ω⁄•⁄ ⁄)",
        loveMessage: (username) =>
            `LOVE EXPLOSION!!! ♡⸜(˶˃ ᵕ ˂˶)⸝♡\n${username ? `My dearest ${username},\nYou stole my heart! (灬º‿º灬)`
                : "You're my destiny! (๑>ᴗ<๑)"
            }`,
        yesButton: "Yes",
        noButton: "No",
        noTexts: [
            "Wait really?",
            "My heart is cracking...",
            "Please think again!",
            "I'll cry a river...",
            "Final answer? (눈‸눈)"
        ]
    }

};
const texts = resources[lang];

// 更新 HTML 文本内容
document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
document.title = texts.pageTitle;

document.getElementById('greeting').innerText = texts.greeting;
document.getElementById('subGreeting').innerText = texts.subGreeting;
document.getElementById('usernameInput').placeholder = texts.usernamePlaceholder;
document.getElementById('confirmNameButton').innerText = texts.confirmButton;
document.getElementById('xiaohongshuLink').innerText = texts.xiaohongshuLinkText;
document.getElementById('douyinLink').innerText = texts.douyinLinkText;
document.getElementById('repoLink').innerText = texts.repoLinkText;
document.getElementById('question').innerText = texts.questionTemplate("");
document.getElementById('yes').innerText = texts.yesButton;
document.getElementById('no').innerText = texts.noButton;

// 获取元素
const nameInput = document.getElementById('usernameInput');
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

// 显示名字输入框
nameInputContainer.style.display = 'block';

// 保存用户名，避免重复解析
let safeUsername = "";

// 确认名字按钮点击事件
confirmNameButton.addEventListener('click', function () {
    let username = nameInput.value;
    // 限制用户名长度，避免页面样式崩坏
    const maxLength = 20;
    safeUsername = username ? username.substring(0, maxLength) : "";
    // 隐藏名字输入框，显示表白内容
    nameInputContainer.style.display = 'none';
    // 隐藏新增的链接元素
    xiaohongshuLink.style.display = 'none';
    douyinLink.style.display = 'none';
    repoLink.style.display = 'none';
    confessionContainer.style.display = 'block';
    // 给按钮容器添加动画类名
    buttonsContainer.classList.add('slide-up-fade-in');
    // 使用多语言文本资源更新问题文本
    questionText.innerText = texts.questionTemplate(safeUsername);
});

let clickCount = 0; // 记录点击 No 的次数

// No 按钮点击事件
noButton.addEventListener('click', function () {
    clickCount++;
    // 让 Yes 变大，每次放大 2 倍
    let yesSize = 1 + clickCount * 1.2;
    yesButton.style.transform = `scale(${yesSize})`;
    // 挤压 No 按钮，每次右移 50px
    let noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;
    // 让图片和文字往上移动
    let moveUp = clickCount * 25;
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;
    // 更新 No 按钮文字（前 5 次）
    if (clickCount <= texts.noTexts.length) {
        noButton.innerText = texts.noTexts[clickCount - 1];
    }
    // 使用映射更新图片
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

// Yes 按钮点击事件，进入表白成功页面
const loveTest = (username) => texts.loveMessage(username);
yesButton.addEventListener('click', function () {
    const username = safeUsername;
    // 先创建基础 HTML 结构
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text"></h1>
            <img src="assets/images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;
    // 确保用户名安全地插入
    document.querySelector(".yes-text").innerText = loveTest(username);
    // 禁止滚动，保持页面美观
    document.body.style.overflow = "hidden";
    // 给表白成功页面添加慢慢浮现动画类名
    document.querySelector('.yes-screen').classList.add('fade-in');
});
