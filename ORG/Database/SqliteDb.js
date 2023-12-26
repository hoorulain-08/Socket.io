import * as SQLite from 'expo-sqlite';

const databaseName = 'Tes.db';
const databaseVersion = '1.0';


const db = SQLite.openDatabase(
  databaseName,
  databaseVersion,

);
const fb = SQLite.openDatabase(
  databaseName,
  databaseVersion,

);




export default db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
  );
});
fb.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS InMessage (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
  );
});

  
// export default {db,fb} ;
