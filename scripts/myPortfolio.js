const authModal = document.getElementById('authModal');
const authStatus = document.getElementById('authStatus');
const formMessage = document.getElementById('formMessage');
const modeButtons = document.querySelectorAll('.mode-btn');
const authForms = document.querySelectorAll('.auth-form');
const demoBtn = document.getElementById('demoBtn');
const pitch = document.getElementById('pitch');

const openModalButtons = document.querySelectorAll('[data-open-modal]');
const closeModalButton = document.querySelector('.modal-close');

const STORAGE_KEY = 'goalrush-user';

function getStoredUser() {
  const storedUser = localStorage.getItem(STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

function updateAuthStatus(user) {
  if (user) {
    authStatus.textContent = `Welcome back, ${user.name}`;
  } else {
    authStatus.textContent = 'Kick off as a guest';
  }
}

function openModal(mode = 'login') {
  authModal.classList.add('active');
  document.body.classList.add('modal-open');
  authModal.setAttribute('aria-hidden', 'false');

  modeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });

  authForms.forEach((form) => {
    form.classList.toggle('active', form.id === `${mode}Form`);
  });

  formMessage.textContent = '';
}

function closeModal() {
  authModal.classList.remove('active');
  document.body.classList.remove('modal-open');
  authModal.setAttribute('aria-hidden', 'true');
}

function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!name || !email || !password) {
    formMessage.textContent = 'Please complete every field to create an account.';
    return;
  }

  const user = { name, email, password };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  updateAuthStatus(user);
  formMessage.textContent = 'Account created! You are now signed in.';
  setTimeout(closeModal, 900);
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const user = getStoredUser();

  if (!user) {
    formMessage.textContent = 'No account found yet. Sign up first.';
    return;
  }

  if (user.email === email && user.password === password) {
    updateAuthStatus(user);
    formMessage.textContent = 'Login successful. Welcome to the pitch!';
    setTimeout(closeModal, 900);
  } else {
    formMessage.textContent = 'Email or password was incorrect.';
  }
}

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.openModal));
});

modeButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.mode));
});

closeModalButton.addEventListener('click', closeModal);
authModal.addEventListener('click', (event) => {
  if (event.target === authModal) {
    closeModal();
  }
});

document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('signupForm').addEventListener('submit', handleSignup);

demoBtn.addEventListener('click', () => {
  pitch.classList.add('is-boosted');
  setTimeout(() => pitch.classList.remove('is-boosted'), 1000);
});

window.addEventListener('DOMContentLoaded', () => {
  const currentUser = getStoredUser();
  updateAuthStatus(currentUser);
});
