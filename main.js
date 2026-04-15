document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const numbersContainer = document.getElementById('lotto-numbers');

  function getBallColor(number) {
    if (number <= 10) return 'color1';
    if (number <= 20) return 'color2';
    if (number <= 30) return 'color3';
    if (number <= 40) return 'color4';
    return 'color5';
  }

  function generateLottoNumbers() {
    // 버튼 비활성화 (생성 중 클릭 방지)
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

    // 기존 번호 삭제
    numbersContainer.innerHTML = '';

    // 순차적으로 공 생성 (100ms 간격)
    numbers.forEach((num, index) => {
      setTimeout(() => {
        const ball = document.createElement('div');
        ball.className = `ball ${getBallColor(num)}`;
        ball.innerText = num;
        numbersContainer.appendChild(ball);

        // 마지막 공까지 다 나오면 버튼 복구
        if (index === 5) {
          generateBtn.disabled = false;
          generateBtn.innerText = '번호 생성하기';
        }
      }, index * 150);
    });
  }

  generateBtn.addEventListener('click', generateLottoNumbers);
});