// Game variables
let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;

// DOM elements
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

// Initialize game
function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    message.textContent = '';
    guessInput.value = '';
    guessInput.focus();
    console.log(`Target number: ${targetNumber}`); // For debugging
}

// Check the user's guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100';
        message.style.color = 'var(--warning)';
        return;
    }
    
    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    
    if (userGuess === targetNumber) {
        // Correct guess
        message.textContent = `🎉 Correct! You guessed it in ${attempts} attempts!`;
        message.style.color = 'var(--success)';
        guessInput.disabled = true;
        guessBtn.disabled = true;
    } else if (attempts >= maxAttempts) {
        // Game over
        message.textContent = `Game over! The number was ${targetNumber}.`;
        message.style.color = 'var(--error)';
        guessInput.disabled = true;
        guessBtn.disabled = true;
    } else {
        // Provide hint
        const hint = userGuess < targetNumber ? 'higher' : 'lower';
        message.textContent = `Wrong! Try a ${hint} number.`;
        message.style.color = 'var(--error)';
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
guessBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', initGame);

// Allow Enter key to submit guess
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Initialize the game when page loads
window.addEventListener('load', initGame);