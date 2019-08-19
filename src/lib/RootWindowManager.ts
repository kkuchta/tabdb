import TabManager from './TabManager'
import Database, { QueryResult } from './Database'
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
  submitSQL(sql: string): QueryResult {
    //const sqlArea = document.getElementById('sqlTextArea') as HTMLTextAreaElement
    let result: QueryResult;
    try {
      result = this.database.runQuery(sql);
    } catch(err) {
      result = { error: err.message };
    }
    //if (result.rows == 0) return {};
    //let resultText = result[0].columns.join("\t") + "\n";
    //resultText += result[0].values.map((row: string[]) => row.join("\t")).join("\n");
    //console.log(resultText);

    //document.getElementById('sqlTextArea').value = resultText;

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
  }

  createNewTab() {
    console.log("this.tabs = ", this.tabs);
    const newWindow = window.open('#', WINDOW_NAME_PREFIX + this.tabs.length);
    if (newWindow == null) {
      alert("Couldn't open new tab for some reason?");
      return;
    }

    const sqlTextArea = document.getElementsByTagName('textarea')[0]
    const sqlTextAreaText = sqlTextArea == null ? '' : sqlTextArea.value;

    // TODO: handle tab closing - remove from tabarray and update stats
    // TODO: do we actually need to pass tabs here?  Could just always recover
    // tabs.
    newWindow.lastWindowData = {
      textAreaText: sqlTextAreaText,
    }
    window.name = newWindow.name;
    newWindow.name = WINDOW_ROOT_NAME;
    // This window is now a data window.
    (window.windowManager = new DataWindowManager()).run();
  }
}
