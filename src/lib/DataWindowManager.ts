import RootWindowManager from './RootWindowManager'

export default class DataWindowManager {
  run() {
    document.body.innerHTML = "<p>TabDB data window. We're only using this tab's title to store data.  You probably want to be on the tab that's displaying some UI (the 'root' tab) instead of here.  If you've lost your root tab, try clicking <a href='' onClick='window.windowManager.forceRoot(event)'>here</a></p>.";
  }
  forceRoot(e: any) {
    e.preventDefault();
    window.name = '';
    window.location.reload();
  }
  reroot({ textAreaText, tabs }: { textAreaText: string; tabs: Window[] }) {
    console.log("rerooting - new tabs = ", tabs);
    const textArea = window.document.getElementById('sqlTextArea') as HTMLTextAreaElement
    textArea.value = textAreaText;
    window.document.body.style.display = 'black';
    (window.windowManager = new RootWindowManager(tabs))
    window.windowManager.run();
  }
  submitSQL() {
    console.log("submitSQL is a no-op on data pages (UI should be hidden anyway)");
  }
}
