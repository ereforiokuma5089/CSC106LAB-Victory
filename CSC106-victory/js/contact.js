// COS 106 Contact Form: client-side validation only (no backend).
const contactForm = document.getElementById('contact-form');

const fields = [
  { input: document.getElementById('contact-name'), error: document.getElementById('name-error') },
  { input: document.getElementById('contact-email'), error: document.getElementById('email-error') },
  { input: document.getElementById('contact-phone'), error: document.getElementById('phone-error') },
  { input: document.getElementById('contact-message'), error: document.getElementById('message-error') }
];

function validateField(input) {
  const value = input.value.trim();
  if (value === '') return 'This field is required.';
  if (input.id === 'contact-email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address.';
  }
  if (input.id === 'contact-phone' && !/^\d+$/.test(value)) {
    return 'Phone number must contain digits only.';
  }
  return '';
}

function showError(field, message) {
  field.error.textContent = message;
  field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

// Keep the phone input digits-only even when someone pastes text.
const phoneInput = document.getElementById('contact-phone');
phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, '');
});

fields.forEach(field => {
  field.input.addEventListener('input', () => {
    showError(field, '');
  });
});

contactForm.addEventListener('submit', event => {
  event.preventDefault(); // Do not navigate or send anything to a server.
  let firstInvalid = null;

  fields.forEach(field => {
    const error = validateField(field.input);
    showError(field, error);
    if (error && !firstInvalid) firstInvalid = field.input;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  contactForm.reset();
  fields.forEach(field => showError(field, ''));
  window.alert('Form submitted!');
  window.location.href = 'index.html';
});
