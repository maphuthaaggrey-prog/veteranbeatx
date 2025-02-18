
function scrollToLeft(button) {
    const scrollContainer = button.closest('.blog').querySelector('.scroll-container');
    scrollContainer.scrollBy({ left: -500, behavior: 'smooth' });
}

function scrollToRight(button) {
   const scrollContainer = button.closest('.blog').querySelector('.scroll-container');
    scrollContainer.scrollBy({ left: 500, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const targetSection = document.querySelector('.target-section');

    const sectionPosition = targetSection.getBoundingClientRect();

    if (sectionPosition.top <= 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const closeBtn = document.querySelector('.close-btn');
const contact = document.querySelector('.footer-cont');
const contactBtn = document.querySelectorAll('.contactButton');
const cancelBtn = document.querySelector('.cancelBtn');
const terms = document.querySelector('.terms');
const termBtn = document.querySelector('.termsButton');
const closeTerms = document.querySelector('.terms-agree button');
const searchBtn = document.querySelector('.search');
const search = document.querySelector('.search-bar');
const closeSearchBtn = document.querySelector('.search-bar .close-btn');
const logo =document.querySelector('.search-icon')

const menu = document.querySelector('.sidebar');
const menuBtn = document.querySelector('.menu-icon');
menuBtn.addEventListener('click', () => {
    menu.classList.add('open'); 
    logo.classList.add('slide-logo')
});
closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
    logo.classList.remove('slide-logo')
});


const contactScriptURL = 'https://script.google.com/macros/s/AKfycbxeTH7MzXUV4n-_trYR9PRESKrjjU7Ggt2ktLQc-VghrwIhMm8lOl8TUUx6HEbl3qz2Sg/exec';
const form = document.forms['message-to-google-sheet'];
const submitBtn = document.querySelector('.submit-btn');
const sendMsg = document.getElementById('sendmsg');
const loading = document.getElementById('subloading');

// Form validation and submission
form.addEventListener('submit', e => {
  document.querySelectorAll('.error-message').forEach(el => el.remove());

  const firstName = document.getElementById('first-name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');
  let valid = true;

  if (firstName.value.trim() === '') {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Name is required!';
    errorMessage.classList.add('error-message');
    firstName.after(errorMessage);
    valid = false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.value.trim().match(emailPattern)) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Valid email is required!';
    errorMessage.classList.add('error-message');
    email.after(errorMessage);
    valid = false;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phone.value.trim().match(phonePattern)) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'A valid 10-digit phone number is required.';
    errorMessage.classList.add('error-message');
    phone.after(errorMessage);
    valid = false;
  }

  if (message.value.trim() === '') {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Message is required.';
    errorMessage.classList.add('error-message');
    message.after(errorMessage);
    valid = false;
  }

  if (!valid) {
    e.preventDefault();
  } else {
    // Form is valid, submit data
    setLoadingState(true); // Set loading state
    e.preventDefault();

    fetch(contactScriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        sendMsg.innerHTML = "Thank You For Contacting Us!";
        setTimeout(() => { sendMsg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        sendMsg.innerHTML = "Something went wrong. Please try again.";
      })
      .finally(() => {
        setLoadingState(false); // Reset loading state
      });
  }
});

// Add loading state for contact form
function setLoadingState(isLoading) {
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.value = "Submitting...";
    document.body.style.cursor = 'wait';
  } else {
    submitBtn.disabled = false;
    submitBtn.value = "Submit";
    document.body.style.cursor = 'default';
  }
}
