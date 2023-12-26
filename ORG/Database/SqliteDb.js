import * as SQLite from 'expo-sqlite';

const databaseName = 'TestInk.db';
const databaseVersion = '1.0';


const db = SQLite.openDatabase(
  databaseName,
  databaseVersion,

);



 db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
  );
});


  
export default db
