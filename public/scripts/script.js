const outputDiv = document.getElementById('output');
const startButton = document.querySelectorAll('.startButton');
const micImg = document.querySelector('.startButton img');

// Check if browser supports the SpeechRecognition API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    // recognition.continuous = true;
    recognition.interimResults = true;
  
    // Event handler for when speech recognition starts
    recognition.onstart = () => {
      console.log('Listening...');
    };

    recognition.onspeechend = () => {
      recognition.stop();
      console.log("Speech recognition has stopped.");
    };
  
    // Event handler for when speech recognition ends
    recognition.onend = () => {
      console.log('Speech recognition ended');
    };
  
    // Event handler for speech recognition results
    recognition.onresult = (event) => {
      console.log('Speech recognition result');
      const transcript = event.results[0][0].transcript;
      searchSiblings.inputElement.value = transcript;
    };
  
    // Event handler for errors
    recognition.onerror = (event) => {
      console.log(event)
    };
  
    let searchSiblings;

    // Event listener for button click to start recognition
    startButton.forEach(item => {
      item.addEventListener('click', (e) => {
        searchSiblings = {inputElement: e.target.offsetParent.nextElementSibling}
        recognition.start();
        console.log(recognition);
      });

    })
  } else {    
    startButton.forEach(item => {
      item.hidden = true;
    })

  }

  // ///////////// //
  // web share API //
  // ///////////// //

  if(navigator.share) {
    const shareData = {
      title: 'MovieDB',
      text: 'Check out this awesome website!',
      url: '',
    };
  
    const butt = document.querySelector('#butt')
  
    butt.addEventListener('click', (e) => {
        navigator.share(shareData)
          .then(() => console.log('Successfully shared'))
          .catch((error) => console.error('Error sharing:', error));
  
    })

  } else {
    butt.style.display = 'none';
  }
  

  // ///////////////////////////////////// //
  // little poster follow cursor animation //
  // ///////////////////////////////////// //

const image = document.querySelector('#detail .backdrop img');
const info = document.querySelector('.info');

const posterImage = document.querySelector('#detail .poster img');

document.addEventListener("mousemove", (e) => {
  posterImage.style.top = `${e.clientY / 80}px`;
  posterImage.style.left = `${e.clientX / 80}px`;
});