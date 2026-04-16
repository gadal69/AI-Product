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

  function generateOneSet() {
    const numbers = [];
    while (numbers.length < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    numbers.sort((a, b) => a - b);

    let bonusNumber;
    while (true) {
      bonusNumber = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(bonusNumber)) {
        break;
      }
    }
    
    return { numbers, bonusNumber };
  }

  function generateLottoNumbers() {
    generateBtn.disabled = true;
    generateBtn.innerText = '추첨 중...';
    
    numbersContainer.innerHTML = '';

    for (let i = 0; i < 5; i++) {
      const row = document.createElement('div');
      row.className = 'numbers-row';
      numbersContainer.appendChild(row);

      const { numbers, bonusNumber } = generateOneSet();
      
      // 메인 번호 6개 표시
      numbers.forEach((num, index) => {
        setTimeout(() => {
          const ball = document.createElement('div');
          ball.className = `ball ${getBallColor(num)}`;
          ball.innerText = num;
          row.appendChild(ball);
        }, (i * 7 + index) * 100);
      });

      // '+' 기호와 보너스 번호 표시
      setTimeout(() => {
        const plus = document.createElement('span');
        plus.className = 'bonus-plus';
        plus.innerText = '+';
        row.appendChild(plus);

        const bonusBall = document.createElement('div');
        bonusBall.className = `ball ${getBallColor(bonusNumber)}`;
        bonusBall.innerText = bonusNumber;
        row.appendChild(bonusBall);

        if (i === 4) {
          generateBtn.disabled = false;
          generateBtn.innerText = '번호 생성하기';
        }
      }, (i * 7 + 6) * 100);
    }
  }

  generateBtn.addEventListener('click', generateLottoNumbers);
});