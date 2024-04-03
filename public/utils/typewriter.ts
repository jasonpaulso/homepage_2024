export const typeWriter = async (parentElement: HTMLElement, cursor: Node, text: string): Promise<void> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const currentText = parentElement.textContent!;
      if (currentText.length === text.length) {
        clearInterval(interval);
        resolve();
      } else {
        parentElement.textContent = text.slice(0, currentText.length + 1);
        parentElement.appendChild(cursor);
      }
    }, 100);
  });
};

export const deleteSelectedText = async (headlineElement: HTMLElement | null, cursor: Node): Promise<void> => {
  if (headlineElement) {
    const range = document.createRange();
    range.selectNodeContents(headlineElement);
    const selection = window.getSelection();
    selection!.removeAllRanges();
    headlineElement.removeChild(cursor);
    selection!.addRange(range);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    while (headlineElement.firstChild && headlineElement.firstChild !== cursor) {
      headlineElement.removeChild(headlineElement.firstChild);
    }

    selection!.removeAllRanges();
  }
};
