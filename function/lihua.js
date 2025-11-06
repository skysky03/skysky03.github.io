(function () {
  const myConfetti = confetti.create(null, { resize: true, useWorker: true });

  function sideCannon(side) {
    const isLeft = side === 'left';
    myConfetti({
      particleCount: 120,
      startVelocity: 55,
      spread: 70,
      angle: isLeft ? 60 : 120,
      gravity: 0.9,
      ticks: 280,
      scalar: 1.0,
      origin: { x: isLeft ? 0 : 1, y: 0.8 },
      colors: ['#ffffff', '#ffd1dc', '#f6a5c0', '#cc8aae', '#9e6f8e']
    });
  }

  function volley() {
    sideCannon('left');
    sideCannon('right');
    setTimeout(() => { sideCannon('left'); sideCannon('right'); }, 200);
    setTimeout(() => { sideCannon('left'); sideCannon('right'); }, 400);
  }

  // 绑定按钮事件
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('fireworks-btn');
    if (btn) btn.addEventListener('click', volley);
  });
})();
