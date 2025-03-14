function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem('lastVisit');
    const pdfClicked = localStorage.getItem('pdfClicked') === 'true';
    let streak = parseInt(localStorage.getItem('streak')) || 0;
  
    if (lastVisit === today && pdfClicked) {
      displayStreak(streak);
      return;
    }
  
    if (lastVisit) {
      const lastVisitDate = new Date(lastVisit);
      const currentDate = new Date(today);
      const timeDiff = currentDate.getTime() - lastVisitDate.getTime();
      const dayDiff = timeDiff / (1000 * 3600 * 24);
  
      if (dayDiff > 1) {
        streak = 0;
      }
    }
  
    if(pdfClicked){
      if (lastVisit !== today){
        streak++;
      }
      localStorage.setItem('streak', streak);
      localStorage.setItem('lastVisit', today);
      localStorage.setItem('pdfClicked', 'false');
    }
  
    displayStreak(streak);
  }

function displayStreak(streak) {
    const streakDisplay = document.getElementById('streakDisplay');
    if (streakDisplay) {
      const emojis = ['🌱', '🌤️', '🔥', '🌟', '💥', '✨', '🚀', '💯', '🏆', '🏅', '💎', '👑', '🌌',]; // Array of emojis
      const emojiIndex = Math.min(streak, emojis.length - 1); // Limit to available emojis
      const emoji = emojis[emojiIndex];
      streakDisplay.textContent = `Streak: ${streak} ${emoji}`;
    }
  }

function pdfLinkClicked() {
    localStorage.setItem('pdfClicked', 'true');
    updateStreak();
  }

  // Add event listeners to all PDF links
  document.addEventListener('DOMContentLoaded', function() {
    const pdfLinks = document.querySelectorAll('a[href$=".pdf"]'); // Select all links ending with .pdf
    pdfLinks.forEach(link => {
      link.addEventListener('click', pdfLinkClicked);
    });
    updateStreak();
  });

