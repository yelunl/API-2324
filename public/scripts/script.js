const outputDiv = document.getElementById('output');
const startButton = document.querySelectorAll('.startButton');

// Check if browser supports the SpeechRecognition API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    // Set recognition options if needed
    // recognition.continuous = true;
    // recognition.interimResults = true;
  
    // Event handler for when speech recognition starts
    recognition.onstart = () => {
      outputDiv.textContent = 'Listening...';
    };
  
    // Event handler for when speech recognition ends
    recognition.onend = () => {
      // outputDiv.textContent = 'Speech recognition ended.';
    };
  
    // Event handler for speech recognition results
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      outputDiv.textContent = 'You said: ' + transcript;
    };
  
    // Event handler for errors
    recognition.onerror = (event) => {
      outputDiv.textContent = 'Error occurred: ' + event.error;
    };
  
    // Event listener for button click to start recognition
    startButton.forEach(item => {
      item.addEventListener('click', () => {
        recognition.start();
      });

    })
  } else {
    // outputDiv.textContent = 'Speech recognition not supported in this browser.';
    
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
    // console.log(window.location.href)
  
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

// info.addEventListener("mousemove", (e) => {
//   // image.style.objectPositionX = -e.offsetX + "px";
//   // image.style.objectPositionY = -e.offsetY + "px";
//   const height = window.innerHeight
//   const width = window.innerWidth
//   console.log(-e.offsetX)
//   console.log(-e.offsetY)
//   image.style.objectPosition = `${-e.offsetX / 8}px ${-e.offsetY / 8}px`;
// });

const posterImage = document.querySelector('#detail .poster img');

document.addEventListener("mousemove", (e) => {
  // image.style.objectPositionX = -e.offsetX + "px";
  // image.style.objectPositionY = -e.offsetY + "px";
  const height = window.innerHeight
  const width = window.innerWidth
  // console.log('X: ' + e.target)
  // console.log('X: ' + -e.offsetX)
  // console.log('Y: ' + -e.offsetY)
  posterImage.style.top = `${e.clientY / 80}px`;
  posterImage.style.left = `${e.clientX / 80}px`;
});