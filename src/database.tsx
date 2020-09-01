import { Title } from './interfaces';

export const saveNominationList = (nominationsList: Title[]) => {
  const req = indexedDB.open('Shoppies');

  req.onsuccess = () => {
    const db = req.result;
    const tx = db.transaction('nominations', 'readwrite');
    const store = tx.objectStore('nominations');
    store.clear();

    nominationsList.forEach((nomination) => {
      store.add(nomination);
    });
  }
}

export const loadNominationList = (callback: Function) => {
  const req = indexedDB.open('Shoppies', 1);

  req.onupgradeneeded = () => {
    const db = req.result;
    if (!db.objectStoreNames.contains('nominations')) {
      db.createObjectStore('nominations', { keyPath: 'imdbID' });
    }
  }

  req.onsuccess = () => {
    const db = req.result;
    const tx = db.transaction('nominations', 'readonly');
    const store = tx.objectStore('nominations');
    const data = store.getAll();

    data.onsuccess = () => {
      const nominationList = data.result as Title[];
      callback(nominationList);
    }
  }
}