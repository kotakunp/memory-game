document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cards');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
    const totalPairs = cards.length / 2;

    let seconds = 0;
    let timerStarted = false;

    let moveCount = 0;

    function updateTimer() {
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        const timeString = `${minutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
        
        document.querySelector('.timer').textContent = `Timer: ${timeString}`;

        seconds++;
    }

    function updateMove() {
        moveCount++;
        const moveString = moveCount;
        document.querySelector('.move-count').textContent = `Moves: ${moveString}`;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        const frontImage = this.querySelector('.front');
        const backImage = this.querySelector('.back');

        frontImage.style.display = 'block';
        frontImage.style.opacity = '1';
        backImage.style.display = 'none';
        backImage.style.opacity = '0';

        if (!hasFlippedCard) {
            if (!timerStarted) {
                timerStarted = true;
                updateTimer();
                timerInterval = setInterval(updateTimer, 1000);
            }
            
            hasFlippedCard = true;
            firstCard = this;
            return;
}

            secondCard = this;
            lockBoard = true;
            
            updateMove();

        checkForMatch();
    }

    function checkForMatch() {
        const firstCardValue = firstCard.querySelector('.front').alt;
        const secondCardValue = secondCard.querySelector('.front').alt;

        let isMatch = firstCardValue === secondCardValue;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;

        resetBoard();

        if (matchedPairs === totalPairs) {
            clearInterval(timerInterval);

            const minutes = Math.floor(seconds / 60);
            const displaySeconds = seconds % 60;
            const formattedTime = `${minutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;

            setTimeout(() => {
                alert(`Goodjob bro, your final time is ${formattedTime} and ${moveCount} moves`);
            }, 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            const firstFront = firstCard.querySelector('.front');
            const firstBack = firstCard.querySelector('.back');
            const secondFront = secondCard.querySelector('.front');
            const secondBack = secondCard.querySelector('.back');

            firstFront.style.display = 'none';
            firstFront.style.opacity = '0';
            firstBack.style.display = 'block';
            firstBack.style.opacity = '1';

            secondFront.style.display = 'none';
            secondFront.style.opacity = '0';
            secondBack.style.display = 'block';
            secondBack.style.opacity = '1';

            resetBoard();
        }, 500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffleCards() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }

    shuffleCards();

    cards.forEach(card => card.addEventListener('click', flipCard));
});