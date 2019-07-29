class DataWindowManager {
  run() {
    window.document.body.style = 'display: none;'
  }
  reroot({textAreaText, tabs}) {
    console.log("rerooting - new tabs = ", tabs);
    window.document.getElementById('sqlTextArea').value = textAreaText;
    window.document.body.style = 'display: block';
    (window.windowManager = new RootWindowManager(tabs))
    windowManager.run();
  }
  submitSQL() {
    console.log("submitSQL is a no-op on data pages (UI should be hidden anyway)");
  }
}
