const WARNING_DIV = document.getElementById('warnings');

export function warning(text) {
  if (warningAlreadyActive(text)) return;
  const el = document.createElement('div');
  el.classList.add('warning');
  el.innerHTML = text;
  el.style.backgroundColor = 'orange';
  el.style.borderRadius = '5px';
  el.style.border = '2px solid black';
  el.style.paddingTop = '8px';
  el.style.paddingBottom = '8px';
  el.style.width = '100%';
  el.style.transition = '1s';
  el.style.marginBottom = '5px';
  WARNING_DIV.appendChild(el);
  setTimeout(() => {
    el.style.opacity = 0;
  }, 4000);
  setTimeout(() => {
    WARNING_DIV.removeChild(el);
  }, 5000);
}

function warningAlreadyActive(text) {
  let els = document.getElementsByClassName('warning');
  for (let el of els) {
    if (el.innerHTML === text) return true;
  }
  return false;
}
