<?php
// 严格会话设置
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'Lax'); // 如需跨站再改 Strict 或 None
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
    ini_set('session.cookie_secure', 1);
}
session_start();

// 账号配置
const ALBUM_USER = '脆皮鸡翅';
// 用 password_hash 生成的哈希，示例密码是 5201314，上线请替换
const PASSWORD_HASH = '$2y$10$gJg2yJtOe2m0b3i4cC0RDeC1i7l3k5Qj4x8b2Uj1b5o7b0mYyM3h2';

// 生成或获取 CSRF token
if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}

// 小工具
function is_authed(): bool {
    return !empty($_SESSION['authed']) && $_SESSION['authed'] === true;
}
function ensure_authed() {
    if (!is_authed()) {
        header('Location: login.php');
        exit;
    }
}
