const htmlEl      = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const homeSection = document.getElementById('homeSection');
const formSection = document.getElementById('formSection');
const proceedBtn  = document.getElementById('proceedBtn');
const backBtn     = document.getElementById('backBtn');
const form        = document.getElementById('voidMailForm');
const feedback    = document.getElementById('feedback');

let saved = localStorage.getItem('vmTheme');
if (saved !== 'dark' && saved !== 'light') {
  saved = 'dark';
  localStorage.setItem('vmTheme', 'dark');
}
applyTheme(saved);

const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  const current = localStorage.getItem('vmTheme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('vmTheme', next);
  applyTheme(next);
});

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
}

const saved = localStorage.getItem('vmTheme') || 'dark';
applyTheme(saved);
if (saved === 'dark') {
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('vmTheme', next);
});

function applyTheme(mode) {
  htmlEl.setAttribute('data-theme', mode);
  themeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
}

proceedBtn.addEventListener('click', () => {
  homeSection.classList.add('hidden');
  formSection.classList.remove('hidden');
  formSection.classList.add('fade-in');
});
backBtn.addEventListener('click', () => {
  formSection.classList.add('hidden');
  homeSection.classList.remove('hidden');
  homeSection.classList.add('fade-in');
  feedback.classList.add('hidden');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const email = form.email.value.trim();
  const msg   = form.message.value.trim();
  const time  = form.sendTime.value;
  if (!email || !msg || !time) {
    showFeedback('The void rejected your message—try again.', 'error');
  } else {
    showFeedback('Your message has been sent to the void!', 'success');
    form.reset();
  }
});

function showFeedback(text, type) {
  feedback.textContent = text;
  feedback.className   = `feedback ${type}`;
  feedback.classList.remove('hidden');
}
