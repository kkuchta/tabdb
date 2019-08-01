import TabManager from './TabManager'
import Database from './Database'
import DataWindowManager from './DataWindowManager'

const WINDOW_NAME_PREFIX = "tab_db_data_window_";
export const WINDOW_ROOT_NAME = WINDOW_NAME_PREFIX + 'root';

export default class RootWindowManager{
  tabManager: any;
  database: any;
  tabs: any;
  constructor(tabList = [] as Window[]) {
    console.log("constructing with ", tabList);
    this.tabManager = new TabManager();
    this.database = new Database(this.tabManager);
    this.setTabList(tabList);
  }
  run() {
    console.log("running");
    if (this.tabs == null) this.setTabList([]);
  }
  submitSQL(sql: string) {
    //const sqlArea = document.getElementById('sqlTextArea') as HTMLTextAreaElement
    const result = this.database.runQuery(sql);
    let resultText = result[0].columns.join("\t") + "\n";
    resultText += result[0].values.map((row: string[]) => row.join("\t")).join("\n");
    console.log(resultText);

    //document.getElementById('sqlTextArea').value = resultText;

    // TODO: catch exceptions ^
    console.log("result=", result);
    return result;
  }
  recoverTabs() {
    console.log("recovering tabs");
    let win = window;
    const recoveredTabs = [];
    while((win = win.opener) != null) {
      console.log("win = ", win.name);
      recoveredTabs.unshift(win);
    }
    console.log("recovered ", recoveredTabs);
    this.setTabList(recoveredTabs);
    //this.tabs = recoveredTabs;
  }
  setTabList(tabList: Window[]) {
    this.tabs = tabList;
    this.tabManager.setTabs(tabList);
    //document.getElementById('spaceAvailable').innerText = this.tabManager.availableCharacters();
  }

  createNewTab({ sqlTextAreaText } : {sqlTextAreaText: string} ) {
    console.log("this.tabs = ", this.tabs);
    const newWindow = window.open('#', WINDOW_NAME_PREFIX + this.tabs.length);
    if (newWindow == null) {
      alert("Couldn't open new tab for some reason?");
      return;
    }
    //newWindow.preExisting = true;
    //window.preExisting = true;

     //newWindow is now the prime window
    //newWindow.tabs = window.tabs.concat([window]);

    // TODO: handle tab closing - remove from tabarray and update stats
    //
    // OK, so tomorrow: rerooting and transferring state doesn't quite work
    // because now react is handling the dom.  Need to... idk, drop the new
    // state in a Window variable and have react wait for that to populate, then
    // put it in the right spot.
    newWindow.lastWindowData = {
      textAreaText: sqlTextAreaText,
      tabs: this.tabs.concat([window])
    }
    window.name = newWindow.name;
    newWindow.name = WINDOW_ROOT_NAME;
    // This window is now a data window.
    (window.windowManager = new DataWindowManager()).run();

    //newWindow.addEventListener('load', () => {
      //newWindow.windowManager.reroot({
        //textAreaText: document.getElementById('sqlTextArea').value,
        //tabs: this.tabs.concat([window])
      //});
      //window.name = newWindow.name;
      //newWindow.name = WINDOW_ROOT_NAME;
      //// Copy over state
      ////const oldSqlTextArea = document.getElementById('sqlTextArea');
      ////const newSqlTextArea = newWindow.document.getElementById('sqlTextArea');
      ////newSqlTextArea.value = oldSqlTextArea.value;

      //// This window is now a data window.
      ////document.body.innerHTML = '';
      //(window.windowManager = new DataWindowManager()).run();
    //}, true);
  }
}
