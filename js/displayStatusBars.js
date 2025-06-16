const statusBars = document.getElementById('statusBars');

export function displayStatusBars(STATUS) {
  const els = [];
  for (let key in STATUS) {
    const { balance, color } = STATUS[key];
    els.push(createStatBar(key, balance, color));
  }
  statusBars.innerHTML = '';
  statusBars.append(...els);
}

function createStatBar(name, val, color) {
  const el = document.createElement('div');
  const overlay = document.createElement('div');
  const label = document.createElement('div');
  el.appendChild(overlay);
  el.appendChild(label);
  el.style.width = '100px';
  el.style.height = '10px';
  el.style.margin = '10px';
  el.style.outline = '1px solid black';
  el.style.position = 'relative';
  overlay.style.width = `${val}%`;
  overlay.style.height = '100%';
  overlay.style.backgroundColor = color;
  overlay.style.position = 'absolute';
  overlay.style.top = 0;
  overlay.style.left = 0;

  label.style.height = '100%';
  label.style.position = 'absolute';
  label.style.top = '-.3rem';
  label.style.left = '105%';
  label.innerHTML = name;
  return el;
}
