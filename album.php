<?php
require __DIR__ . '/config.php';
ensure_authed(); // 没登录就跳回登录页
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>黄森凯 ❤ 李锦程</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="album.css">
    <link rel="shortcut icon" href="assets/images/favicon.ico" type="image/x-icon">
    <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">
</head>
<body>
    <div class="album-container">
        <div class="title-row">
            <span id="photo-title">第一天见面</span>
            <span id="photo-date">2023.05.10</span>
        </div>

        <div class="photo">
            <img id="photo-img" src="album/photo1.jpg" alt="Image">
        </div>

        <div class="desc" id="photo-desc">那天阳光很好，我们第一次见面。</div>

        <button class="arrow left flat-arrow" onclick="prevPhoto()"></button>
        <button class="arrow right flat-arrow" onclick="nextPhoto()"></button>
    </div>

    <script src="album.js"></script>
</body>
</html>
