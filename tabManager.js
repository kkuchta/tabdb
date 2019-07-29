// Reads and writes data from a list of tabs
class TabManager {

  constructor(tabs) {
    this.tabs = tabs;
  }

  setTabs(tabs) {
    this.tabs = tabs;
  }
  canFit(data) {
    return this.requiredCharacters(data) < this.availableCharacters();
  }

  requiredCharacters(data) { return JSON.stringify(data).length }
  availableCharacters() { return this.tabs.length * MAX_TAB_CHARS }

  write(data) {
    let dataString = JSON.stringify(data);

    // Split data into to N chunks, as evenly as possible.
    const length = dataString.length;
    const chunks = this.tabs.length;
    const shortChunkSize = Math.floor(length / chunks);
    let longChunks = length % chunks;
    for (let i = 0; i < chunks; i++) {
      const chunkLength = longChunks > 0 ? shortChunkSize + 1 : shortChunkSize;
      longChunks--;
      const chunk = dataString.slice(0, chunkLength);
      dataString = dataString.slice(chunkLength);
      this.tabs[i].document.title = chunk === "" ? document.title : chunk;
    }
  }

  read() {
    // Filter out empty dbs
    const dataStrings = this.tabs
      .filter((tab) => tab.document.title !== window.document.title)
      .map((tab) => tab.document.title);
    if (dataStrings.length == 0) { return null }
    const json = dataStrings.join('');
    console.log("json=", json);
    return JSON.parse(json);
  }

}
