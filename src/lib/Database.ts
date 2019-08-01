import pako from 'pako';
import initSqlJs from 'sql.js';

// A database that will, when queried: load the db, execute the query, and then
// write it back out.  Expects a persistence mechanism with `read()`, `write(data)`,
// and `canFit(data)` methods.
interface Persistence {
  write: (db: string) => void;
  canFit: (db: string) => boolean;
  read: () => string;
}
export default class Database {
  persistence: Persistence;
  sqlite: any;
  constructor(persistence: any) {
    this.persistence = persistence;
    this.sqlite = null;
    // TODO: actually wait for this to load.
    initSqlJs().then(sqlite => { this.sqlite = sqlite; });
  }
  runQuery(query: string) {
    const db = this.readDB();
    const result = db.exec(query);
    this.writeDB(db);
    // TODO: free db
    return result;
  }
  writeDB(dbObject: any) {
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
      interface Foo {
        requiredCharacters: (x: any) => number;
        availableCharacters: () => number;
      };
      const pers = this.persistence as unknown as Foo;
      throw new Error(`Not enough space to execute that query.  We'd need ${pers} characters of space, but we only have ${pers}.  Open more tabs to increase space!`);
    }
  }

  readDB() {
    const base64Data = this.persistence.read();
    // If we read nothing from the tabs, create a new db.
    if (base64Data == null) { return new this.sqlite.Database() }

    const compressedString = atob(base64Data)
    const dbDataArray = pako.inflate(this.toBinArray(compressedString))
    return new this.sqlite.Database(dbDataArray);
  }

  // From https://github.com/kripken/sql.js/wiki/Persisting-a-Modified-Database
  toBinString(arr: Uint8Array) {
    var uarr = new Uint8Array(arr);
    var strings = [], chunksize = 0xffff;
    // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
    for (var i=0; i*chunksize < uarr.length; i++){
      const subarr = uarr.subarray(i*chunksize, (i+1)*chunksize);
      strings.push(String.fromCharCode.apply(null, subarr as unknown as number[]));
    }
    return strings.join('');
  }

  toBinArray(str: string) {
    var l = str.length,
      arr = new Uint8Array(l);
    for (var i=0; i<l; i++) arr[i] = str.charCodeAt(i);
    return arr;
  }
}
