import * as SQLite from 'expo-sqlite';

const databaseName = 'TestNew.db';
const databaseVersion = '1.0';


const fb = SQLite.openDatabase(
  databaseName,
  databaseVersion,

);


export default fb.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS InMessage (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
  );
});

  