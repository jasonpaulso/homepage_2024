// utils.ts
export const typeWriter = (text: string, onComplete: () => void, headlineElement: HTMLElement, cursorElement: HTMLElement) => {
  let currentText = '';
  const interval = setInterval(() => {
    const headerLineHeight = getComputedStyle(headlineElement).getPropertyValue('line-height');
    cursorElement.style.height = headerLineHeight;

    if (currentText.length === text.length) {
      clearInterval(interval);
      onComplete();
    } else {
      currentText = text.slice(0, currentText.length + 1);
      headlineElement.textContent = currentText;
      headlineElement.appendChild(cursorElement);
    }
  }, 100);
};

export const selectAndDeleteHeadline = (headlineElement: HTMLElement, cursorElement: HTMLElement) => {
  return new Promise<void>((resolve) => {
    const range = document.createRange();
    range.selectNodeContents(headlineElement);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    headlineElement.removeChild(cursorElement);
    selection?.addRange(range);

    setTimeout(() => {
      while (headlineElement.firstChild) {
        headlineElement.removeChild(headlineElement.firstChild);
      }
      selection?.removeAllRanges();
      resolve();
    }, 1000);
  });
};
