document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cards');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
    const totalPairs = cards.length / 2;

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
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

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
            setTimeout(() => {
                alert('Goodjob bro, but not that impressive tho lol');
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
        }, 1000);
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