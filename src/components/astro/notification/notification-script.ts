const emailLink = document.querySelector('a[href^="mailto:"]') as HTMLAnchorElement;
const notificationContainer = document.querySelector('.notification-container') as HTMLDivElement;
const notification = document.querySelector('.notification') as HTMLDivElement;
const yesBtn = document.querySelector('.yes-btn') as HTMLButtonElement;
const noBtn = document.querySelector('.no-btn') as HTMLButtonElement;

const emailClickHandler = (event: { preventDefault: () => void }) => {
  event.preventDefault();
  copyEmailToClipboard();
  showNotification();
};

const yesClickHandler = () => {
  window.location.href = emailLink.getAttribute('href') ?? '';
  hideNotification();
};

const noClickHandler = () => {
  hideNotification();
};

const windowClickHandler = (event: MouseEvent) => {
  if (!notification.contains(event.target as Node) && !emailLink.contains(event.target as Node)) {
    hideNotification();
  }
};

const keydownHandler = (e: { key: string }) => {
  if (e.key === 'Escape') {
    hideNotification();
  }
};

const scrollHandler = () => {
  hideNotification();
};

emailLink.addEventListener('click', emailClickHandler);
yesBtn.addEventListener('click', yesClickHandler);
noBtn.addEventListener('click', noClickHandler);
window.addEventListener('click', windowClickHandler as EventListener);
window.addEventListener('keydown', keydownHandler);
window.addEventListener('scroll', scrollHandler);

function copyEmailToClipboard() {
  const email = emailLink.getAttribute('href')?.replace('mailto:', '');
  navigator.clipboard.writeText(email ?? '');
}

function showNotification() {
  notificationContainer.style.display = 'flex';
  setTimeout(() => {
    notificationContainer.style.opacity = '1';
  }, 100);
}

function hideNotification() {
  notificationContainer.style.opacity = '0';
  setTimeout(() => {
    notificationContainer.style.display = 'none';
  }, 300);
}

window.addEventListener('beforeunload', function () {
  emailLink.removeEventListener('click', emailClickHandler);
  yesBtn.removeEventListener('click', yesClickHandler);
  noBtn.removeEventListener('click', noClickHandler);
  window.removeEventListener('click', windowClickHandler);
  window.removeEventListener('keydown', keydownHandler);
  window.removeEventListener('scroll', scrollHandler);
});
