window.document.title = Math.random();

class tabManager {
  constructor() {
    this.tabs = {};
  }

  // Note: only works when called from a user action (eg a button-press).
  // Otherwise browser anti-popup rules prevent this.
  create = (title) => {
    const win = window.open('#data', Math.random());
  }
}

function mainWindow() {
  console.log("mainWindow");
  const body = document.getElementsByTagName('body')[0];
  const button = document.createElement('button');
  button.setAttribute('onClick', 'mainOnClick()');
  button.innerText = 'foo';
  body.append(button)
}

function mainOnClick() {
  const win1 = window.open('#dataa', '_blank');
  //(new tabManager()).create('foobar');
  //window.focus();
  //setTimeout(() => {
    //(new tabManager()).create('foobar2');
  //}, 1000);
  //const win = window.open('#data', '_blank');
  //Window.newin = win;
  //console.log("here");
}

function dataWindow() {
  console.log("dataWindow");
}

if (location.hash.startsWith('#data')) { dataWindow() } else { mainWindow() }
