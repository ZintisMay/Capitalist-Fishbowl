const WARNING_DIV = document.getElementById('warnings');

export function warning(text) {
  const el = document.createElement('div');
  el.innerHTML = text;
  el.style.backgroundColor = 'red';
  el.style.borderRadius = '8px';
  el.style.paddingTop = '8px';
  el.style.paddingBottom = '8px';
  el.style.width = '100%';
  el.style.transition = '1s';
  WARNING_DIV.appendChild(el);
  setTimeout(() => {
    el.style.opacity = 0;
  }, 4000);
  setTimeout(() => {
    WARNING_DIV.removeChild(el);
  }, 5000);
}
