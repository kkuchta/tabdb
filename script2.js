console.log("name = ", window.name);
window.i = 0;
function openInBackground() {
  console.log("opening foo", i);
  //window.name = Math.random().toString(36).substring(3);;
  const win = open('#', 'foo' + i);
  win.manually_opened = true;
  console.log("win = ", win);
  i++;
}

function recover() {
  for(let j = 0; j < 10; j++) {
    console.log("Checking ", j);
    const win = open('#', 'foo' + j);
    if (!win || !win.manually_opened) {
      console.log(`Window ${j} does not exist.`);
      if (win) win.close();
      break;
    } else {

    }
    console.log(`Window ${j} exists!`);
  }
}

//window.document.title = Math.random().toString(36).substring(7);
window.document.title = window.name;
if (window.name == '' || window.name == 'root') {
  window.name == 'root'
  recover();
} else {
}
//ROOT_WINDOW_NAME = 'tabdb_root';

//console.log("herey");
//if (window.name === '') { window.name = ROOT_WINDOW_NAME }

//if (window.name === ROOT_WINDOW_NAME) {
  //window.i = 0;
  //function createNewTab() {
    //window.open('#', `tabdb_${i}`)
    //i++;
  //}
//} else {
  //document.body.innerHTML = null;
  //// Return focus to the root window
  //setTimeout(() => {
    //console.log("herex");
    //window.open('#', ROOT_WINDOW_NAME);
  //}, 3000);
//}
//console.log("window.name=", window.name);
