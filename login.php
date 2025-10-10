<?php
require __DIR__ . '/config.php';

// 已登录的直接走
if (is_authed()) {
    header('Location: album.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 基础限速，别太嚣张
    usleep(200000); // 0.2 秒

    $csrf = $_POST['csrf'] ?? '';
    if (!hash_equals($_SESSION['csrf'], $csrf)) {
        $error = '会话失效，请刷新后重试';
    } else {
        $user = trim($_POST['user'] ?? '');
        $pass = $_POST['pass'] ?? '';
        if ($user !== ALBUM_USER) {
            $error = '用户名或密码错误';
        } elseif (!password_verify($pass, PASSWORD_HASH)) {
            $error = '用户名或密码错误';
        } else {
            session_regenerate_id(true); // 防固定会话
            $_SESSION['authed'] = true;
            header('Location: album.php');
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>登录</title>
<link rel="stylesheet" href="album.css">
<link rel="stylesheet" href="style.css">
<style>
/* 复用你页面的暗色弹窗风格，单页版 */
body{background:#f4cdd0;margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center}
.dlg{width:360px;padding:18px;border-radius:14px;background:#1f2430;color:#dbe1ea;box-shadow:0 20px 60px rgba(0,0,0,0.5);border:1px solid #2b3242}
.dlg-url{font-size:12px;color:#9aa7bd;margin-bottom:6px}
h2{margin:0 0 8px 0;font-size:18px;color:#e6ecf5}
.field{display:flex;flex-direction:column;gap:6px;margin:10px 0}
.field span{font-size:12px;color:#b6c2d6}
input{height:40px;padding:0 12px;border-radius:8px;border:1px solid #3a4358;background:#161a23;color:#e6ecf5;outline:none}
input:focus{border-color:#6ea8ff;box-shadow:0 0 0 3px rgba(110,168,255,0.25)}
.actions{display:flex;gap:10px;margin-top:8px}
.btn{height:36px;padding:0 14px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-weight:600}
.primary{background:#a9b8ff;color:#1b2130}
.primary:hover{background:#9aa9ff}
.ghost{background:#2a3141;color:#e6ecf5;border-color:#3a4358}
.err{min-height:16px;margin:6px 0 2px;font-size:12px;color:#ff7b87}
</style>
</head>
<body>
  <form class="dlg" method="post" autocomplete="off">
    <div class="dlg-url"><?= htmlspecialchars((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']==='on'?'https':'http').'://'.($_SERVER['HTTP_HOST'] ?? '')) ?></div>
    <h2>请登录</h2>

    <div class="field">
      <span>名字</span>
      <input name="user" value="<?= htmlspecialchars(ALBUM_USER) ?>" autofocus>
    </div>
    <div class="field">
      <span>密码</span>
      <input type="password" name="pass" placeholder="••••••••">
    </div>
    <div class="err"><?= htmlspecialchars($error) ?></div>
    <input type="hidden" name="csrf" value="<?= htmlspecialchars($_SESSION['csrf']) ?>">

    <div class="actions">
      <button class="btn primary" type="submit">登录</button>
      <a class="btn ghost" href="login.php">取消</a>
    </div>
  </form>
</body>
</html>
