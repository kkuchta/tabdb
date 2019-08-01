import RootWindowManager from './RootWindowManager'

export default class DataWindowManager {
  run() {
    window.document.body.style.display = 'none';
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
