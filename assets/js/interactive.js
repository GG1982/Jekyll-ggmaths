let a, b, n, x;
let currentStep = 'step';
let currentQuestion = 0;
let currentLevel = 1; // 1: ax = n, 2: 1/a x = n
let stars = 0;
const starElements = document.querySelectorAll('.star');

function generateEquation() {
  if (currentLevel === 1) {
    // ax = n
    a = Math.floor(Math.random() * 9) + 2;
    n = a * (Math.floor(Math.random() * 9) + 1);
    x = n / a;
    document.getElementById('equation').innerHTML = `\(${a}x = ${n}\)`;
  } else if (currentLevel === 2) {
      // 1/a x = n
      a = Math.floor(Math.random() * 9) + 2;
      n = Math.floor(Math.random() * 9) + 1;
      x = n * a;
      document.getElementById('equation').innerHTML = `\(\\frac{1}{${a}}x = ${n}\)`;
  }
  if (window.hasOwnProperty('katex')) {
    const equationElement = document.getElementById('equation');
    try {
      katex.render(equationElement.textContent, equationElement, {
        throwOnError: false
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
    }
  }
}

function generateStepOptions() {
    let options = [];
    let correctStep = '';
    if (currentLevel === 1) {
      options = ['\\( \\times ' + a + ' \\)', '\\( \\div ' + a + ' \\)', '\\( + ' + a + ' \\)', '\\( - ' + a + ' \\)'];
      correctStep = '\\( \\div ' + a + ' \\)';
      // Shuffle the options array
      options.sort(() => Math.random() - 0.5);
    } else if (currentLevel === 2) {
      options = ['\\( \\times ' + a + ' \\)', '\\( \\div ' + a + ' \\)', '\\( + ' + a + ' \\)', '\\( - ' + a + ' \\)'];
      correctStep = '\\( \\times ' + a + ' \\)';
        // Shuffle the options array
        options.sort(() => Math.random() - 0.5);
    }
  
  
    document.getElementById('step-options').innerHTML = options.map(option =>
        `<button onclick="checkStep('${option}', '${correctStep}')">${option}</button>`
      ).join('');
  
    const stepButtons = document.querySelectorAll('#step-options button');
    stepButtons.forEach(button => {
      try {
        katex.render(button.textContent, button, {
          throwOnError: false
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
      }
    });
  }

function generateAnswerOptions() {
const answers = [x, x + 1, x - 1, x + 2];
answers.sort(() => Math.random() - 0.5); // Shuffle answers

document.getElementById('answer-options').innerHTML = answers.map(answer =>
    `<button onclick="checkAnswer(${answer}, ${x})">${answer}</button>`
).join('');
}

function checkStep(selectedStep, correctStep) {
    if (selectedStep === correctStep) {
      currentStep = 'answer';
      document.getElementById('steps-container').style.display = 'none';
      document.getElementById('answer-container').style.display = 'block';
      generateAnswerOptions();
    } else {
      document.getElementById('feedback-message').textContent = 'Incorrect step. Try again!';
      document.getElementById('feedback-container').style.display = 'block';
      document.getElementById('try-again').style.display = 'block';

      // Disable all step buttons
      const stepButtons = document.querySelectorAll('#step-options button');
      stepButtons.forEach(button => {
        button.disabled = true;
      });

      document.getElementById('try-again').onclick = () => {
        document.getElementById('feedback-container').style.display = 'none';
        document.getElementById('try-again').style.display = 'none';

        // Re-enable step buttons
        stepButtons.forEach(button => {
          button.disabled = false;
        });

        generateEquation();
        generateStepOptions();
      };
    }
  }

  

  function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      stars++;
      if (stars <= starElements.length) {
        starElements[stars - 1].classList.add('filled');
      }
  
      if (stars === starElements.length) {
        document.getElementById('answer-container').style.display = 'none';
        document.getElementById('level-complete').style.display = 'block';
      } else {
        // Correct Answer, but level not complete
        document.getElementById('answer-container').style.display = 'none';
        document.getElementById('next-question').style.display = 'block';
        currentQuestion++;
      }
    } else {
      // Incorrect Answer
      document.getElementById('feedback-message').textContent = 'Incorrect answer. Try again!';
      document.getElementById('feedback-container').style.display = 'block';
      document.getElementById('try-again').style.display = 'block';
  
      // Disable all answer buttons
      const answerButtons = document.querySelectorAll('#answer-options button');
      answerButtons.forEach(button => {
        button.disabled = true;
      });
  
      document.getElementById('try-again').onclick = () => {
        document.getElementById('feedback-container').style.display = 'none';
        document.getElementById('try-again').style.display = 'none';
  
        // Re-enable answer buttons
        answerButtons.forEach(button => {
          button.disabled = false;
        });
  
        generateAnswerOptions();
      };
    }
  }

  function nextQuestion() {
    console.log("nextQuestion() - currentLevel:", currentLevel, "currentQuestion:", currentQuestion);
    generateEquation();
    generateStepOptions();
  }
  
  function updateLevelDisplay() {
    document.getElementById('current-level-display').textContent = currentLevel;
  }
  
  document.getElementById('next-question').addEventListener('click', nextQuestion);
  
  document.getElementById('next-level').addEventListener('click', function() {
    stars = 0;
    starElements.forEach(star => star.classList.remove('filled'));
    document.getElementById('level-complete').style.display = 'none';
    currentLevel++;
    if (currentLevel > 2) {
      currentLevel = 1;
    }
    currentQuestion = 0;
    updateLevelDisplay();
    nextQuestion();
  });
  
  // Simplified Test Buttons (Move before initial nextQuestion())
  document.getElementById('level1-test').addEventListener('click', function() {
    currentLevel = 1;
    currentQuestion = 0;
    updateLevelDisplay();
    nextQuestion();
  });
  
  document.getElementById('level2-test').addEventListener('click', function() {
    currentLevel = 2;
    currentQuestion = 0;
    updateLevelDisplay();
    nextQuestion();
  });