import './style.css';

const form = document.querySelector('.my-form');
const scores = document.querySelector('.scores');
const refreshButton = document.querySelector('.refresh-button');
const url =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/YEAvQ6zG03AQr1KuppzL/scores';

const sendScore = async (game) => {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name');
  const score = document.querySelector('#score');
  const game = {
    user: name.value,
    score: score.value,
  };
  sendScore(game);
  form.reset();
});

// id = YEAvQ6zG03AQr1KuppzL

const fetchScores = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const result = data.result;
  const scoresList = result.map((item) => {
    const { user, score } = item;
    return `<div class='score-wrapper'>
              <div class='score'>
                <p>${user}:</p><p>${score}</p>
              </div>
            </div>`;
  });
  scores.innerHTML = scoresList.join(' ');
};

refreshButton.addEventListener('click', fetchScores);
