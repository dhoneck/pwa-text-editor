import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

export const putDb = async function (content) {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ value: content });
  const result = await request;
};

export const getDb = async function () {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;

  if (result.length == 0) { // Returns false if no results are found
    console.log('No previous edits - show JATE header');
    return false;
  } else { // Returns the last item if results are found
    console.log('Previous edit found - show results');
    return result[result.length - 1].value;
  }
};

initdb();
