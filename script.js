// just for initial identification while testing
//window.document.title = Math.random().toString(36).substring(7);

// Just for debugging
//setInterval(() => window.document.title = window.name, 500);

const MAX_TABS = 100;

// TODO: figure this out
const MAX_TAB_CHARS = 100;

if (window.name === '') window.name = WINDOW_ROOT_NAME;

if (window.name === WINDOW_ROOT_NAME) {
  console.log("Starting as root");
  (window.windowManager = new RootWindowManager).run();
  windowManager.recoverTabs();
} else {
  console.log("Starting as data");
  (window.windowManager = new DataWindowManager).run();
}

//window.tabs = window.tabs || [];
//const tabMan = new TabManager(tabs);

//const foo = document.createElement('p')
//foo.innerText = `tabs = ${tabs.map((tab) => tab.document.title)} | Available Chars = ${tabMan.availableCharacters()}`;
//window.document.body.append(foo);


// TODO: actually make loading of UI dependent on this
initSqlJs().then(SQL => { window.SQL = SQL; });

//CREATE TABLE hello (a int, b char);
//INSERT INTO hello VALUES (0, 'hello')
//INSERT INTO hello VALUES (1, 'world')

//recoverTabs();
//window.open('#', 'foo1');
//window.open('#', 'foo2');
//setTimeout(() => {
  //window.foundTabs = recoverTabs();
//}, 1)
