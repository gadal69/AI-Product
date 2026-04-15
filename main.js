document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const numbersContainer = document.getElementById('lotto-numbers');
  const themeBtn = document.getElementById('theme-btn');
  const body = document.body;

  // 테마 초기화
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  themeBtn.innerText = savedTheme === 'light' ? '🌙' : '☀️';

  // 테마 토글 함수
  themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    themeBtn.innerText = newTheme === 'light' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
  });

  function getBallColor(number) {
    if (number <= 10) return 'color1';
    if (number <= 20) return 'color2';
    if (number <= 30) return 'color3';
    if (number <= 40) return 'color4';
    return 'color5';
  }

  function generateLottoNumbers() {
    generateBtn.disabled = true;
    generateBtn.innerText = '추첨 중...';
    
    const numbers = [];
    while (numbers.length < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    numbers.sort((a, b) => a - b);

    numbersContainer.innerHTML = '';

    numbers.forEach((num, index) => {
      setTimeout(() => {
        const ball = document.createElement('div');
        ball.className = `ball ${getBallColor(num)}`;
        ball.innerText = num;
        numbersContainer.appendChild(ball);

        if (index === 5) {
          generateBtn.disabled = false;
          generateBtn.innerText = '번호 생성하기';
        }
      }, index * 150);
    });
  }

  generateBtn.addEventListener('click', generateLottoNumbers);
});