class RootWindowManager {
  constructor(tabList = []) {
    console.log("constructing with ", tabList);
    this.tabManager = new TabManager();
    this.database = new Database(this.tabManager);
    this.setTabList(tabList);
  }
  run() {
    console.log("running");
    if (this.tabs == null) this.setTabList([]);
  }
  submitSQL(event) {
    console.log("event = ", event);
    const sql = document.getElementById('sqlTextArea').value;
    const result = this.database.runQuery(sql);
    window.result = result;
    let resultText = result[0].columns.join("\t") + "\n";
    resultText += result[0].values.map((row) => row.join("\t")).join("\n");

    document.getElementById('sqlTextArea').value = resultText;

    // TODO: catch exceptions ^
    console.log("result=", result);
  }
  recoverTabs() {
    console.log("recovering tabs");
    let win = window;
    const recoveredTabs = [];
    while(win = win.opener) {
      console.log("win = ", win.name);
      recoveredTabs.unshift(win);
    }
    console.log("recovered ", recoveredTabs);
    this.setTabList(recoveredTabs);
    //this.tabs = recoveredTabs;
  }
  setTabList(tabList) {
    this.tabs = tabList;
    this.tabManager.setTabs(tabList);
    document.getElementById('spaceAvailable').innerText = this.tabManager.availableCharacters();
  }

  createNewTab() {
    console.log("this.tabs = ", this.tabs);
    const newWindow = window.open('#', WINDOW_NAME_PREFIX + this.tabs.length);
    newWindow.preExisting = true;
    window.preExisting = true;

     //newWindow is now the prime window
    //newWindow.tabs = window.tabs.concat([window]);

    // TODO: handle tab closing - remove from tabarray and update stats
    newWindow.addEventListener('load', () => {
      newWindow.windowManager.reroot({
        textAreaText: document.getElementById('sqlTextArea').value,
        tabs: this.tabs.concat([window])
      });
      window.name = newWindow.name;
      newWindow.name = WINDOW_ROOT_NAME;
      // Copy over state
      //const oldSqlTextArea = document.getElementById('sqlTextArea');
      //const newSqlTextArea = newWindow.document.getElementById('sqlTextArea');
      //newSqlTextArea.value = oldSqlTextArea.value;

      // This window is now a data window.
      //document.body.innerHTML = '';
      (window.windowManager = new DataWindowManager()).run();
    }, true);
  }
}
