// A database that will, when queried: load the db, execute the query, and then
// write it back out.  Expects a persistence mechanism with `read()`, `write(data)`,
// and `canFit(data)` methods.
class Database {
  constructor(persistence) {
    this.persistence = persistence;
  }
  runQuery(query) {
    const db = this.readDB();
    const result = db.exec(query);
    this.writeDB(db);
    // TODO: free db
    return result;
  }
  writeDB(dbObject) {
    // Dump the entire db state.
    const dbDataArray = dbObject.export();

    // A db with 1 table and 2 rows is 8k long, mosty empty.  Let's compress it
    // before trying to save it to tabs.
    const compressedString = this.toBinString(pako.deflate(dbDataArray));

    // Base64 encode it because weird utf-8 characters won't save to the dom and
    // come back the same.
    const base64Data = btoa(compressedString);
    if (this.persistence.canFit(base64Data)) {
      this.persistence.write(base64Data);
    } else {
      // TODO: throw this from the persistence object, not from here.
      throw `Not enough space to execute that query.  We'd need ${this.persistence.requiredCharacters(base64Data)} characters of space, but we only have ${this.persistence.availableCharacters()}.  Open more tabs to increase space!`
    }
  }

  readDB() {
    const base64Data = this.persistence.read();
    // If we read nothing from the tabs, create a new db.
    if (base64Data == null) { return new SQL.Database() }

    const compressedString = atob(base64Data)
    const dbDataArray = pako.inflate(this.toBinArray(compressedString))
    return new SQL.Database(dbDataArray);
  }

  // From https://github.com/kripken/sql.js/wiki/Persisting-a-Modified-Database
  toBinString(arr) {
    var uarr = new Uint8Array(arr);
    var strings = [], chunksize = 0xffff;
    // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
    for (var i=0; i*chunksize < uarr.length; i++){
      strings.push(String.fromCharCode.apply(null, uarr.subarray(i*chunksize, (i+1)*chunksize)));
    }
    return strings.join('');
  }

  toBinArray(str) {
    var l = str.length,
      arr = new Uint8Array(l);
    for (var i=0; i<l; i++) arr[i] = str.charCodeAt(i);
    return arr;
  }
}
