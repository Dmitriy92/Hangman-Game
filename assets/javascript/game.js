$(document).ready(function () {

   var random = 0;
   var words = []; // array of words
   var lettersBlock = $('.letters');
   var allLetters = undefined; // html of letters
   var letters = []; // array of letter of current word
   var wrongLetters = $('.wrong-let');
   var alreadyGuessedLetters = [];
   var currentWord = '';
   var currentTitle = '';
   var re = /[a-z A-Z]/gi; // regular - only en letters
   var spanBlock = '<span class="let hide-let">_</span> ';
   var guessesCounter = $('.guesses-counter');
   var wins = $('.wins');
   var winsCounter = 0;
   var resetCounter = 12; // default guesses
   var currentCounter = resetCounter; // current count of guesses
   var titleText = $('.hang-title');
   var haveGuess = false; // for counter. Decrease or not
   var audio = $('.audio');
   var image = $('.hang-img-wrap img');

   // for creating new word
   function createWord(word,title){
      words.push({
         'word' : word,
         'title' : title
      });
   }

   function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   // return html with span * count of letters
   function lettersHtml(num){
      var result = '';
      for(var i = 0; i < num; i++){
         result = result + spanBlock;
      }
      return result;
   }

   // start new game
   function startGame(){
      if(words.length <= 0){
         alert('no words');
      }
      else{
         // get random word
         random = getRandom(0,words.length);
         currentWord = words[random].word;
         currentTitle = words[random].title;
         // get values of letters
         letters = currentWord.match(re);
         // add spans with dashes
         lettersBlock.html(lettersHtml(letters.length));
         // get letters
         allLetters = $('.letters .let');
         // reset counter
         guessesCounter.text(resetCounter);
         // reset guesses
         wrongLetters.text('');
         currentCounter = resetCounter;
         alreadyGuessedLetters = [];
         audio.html();
      }
   }

   // if this letter has already guessed
   function checkGuesses(currentLetter){
      for(var i = 0; i < alreadyGuessedLetters.length; i++){
         if(alreadyGuessedLetters[i] == currentLetter){
            return true;
         }
      }
   }

   function checkGame(e){
      var currentLetter = String.fromCharCode(e.keyCode).toLowerCase();
      // if this letter has already guessed
      if(checkGuesses(currentLetter)){
         return;
      }
      // if pressed key is letter
      if (e.keyCode >= 65 && e.keyCode <= 90) {
         for(var i = 0; i < letters.length; i++){
            // if is right letter
            if(letters[i] == currentLetter){
               haveGuess = true;
               allLetters.eq(i)
                   .removeClass('hide-let')
                   .text(currentLetter);
            }
         }
         if(!haveGuess){
            if(currentCounter === 0){
               youLose();
               return;
            }
            // decrease counter
            guessesCounter.text(--currentCounter);
            alreadyGuessedLetters.push(currentLetter);
            wrongLetters.append('<span>' + currentLetter + '</span> ')
         }
         haveGuess = false;
      }
      if(!allLetters.hasClass('hide-let')){
         gameOver();
      }
   }

   function gameOver(){
      // play audio
      audio.html('<source src="assets/audio/' + currentWord +'.wav">')
          .attr('src','assets/audio/' + currentWord +'.wav');
      audio[0].play();
      // set wins counter
      wins.text(++winsCounter);
      // set right img
      image.attr('src','assets/images/' + currentWord + '.jpg');
      titleText.text(currentTitle);
      startGame();
   }

   function youLose() {
      titleText.text('You lose the game');
      startGame();
   }

   createWord('blondie','call me by blondie');
   createWord('genesis','illegal alien by genesis');
   createWord('music','I am fond of classic music');
   createWord('london','big and beautiful city');
   createWord('musician','My friend is a good musician');
   createWord('hobbies','interesting things to do');
   createWord('crossword','a way to learn a lot of new words');
   createWord('jazz','contribution to American music');
   createWord('composer','Beethoven is a great composer');
   createWord('traditions','Britain has good traditions of folk music');
   createWord('popularity','Modern music is of great popularity');
   createWord('famous','The Beatles is the most famous group');
   createWord('singers','Pop singers are known throughout the world');
   createWord('conductor','The most important figure in the orchestra');
   createWord('morning','all the day is ahead');
   createWord('breakfast','a cup of coffee and sandwich');
   createWord('vacation','a lot of travelling');
   createWord('museums','There are a lot of museums in Paris');
   createWord('education','University provides you with higher education');
   createWord('weather','The weather gets warmer in spring');
   createWord('restaurant','A lot of delicious dishes');

   document.onkeydown = checkGame;

   startGame();

});