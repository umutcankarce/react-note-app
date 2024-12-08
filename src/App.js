import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NoteList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';

const defaultNotes = [
  {
    id: nanoid(),
    text: 'This is my first note!',
    date: '09/12/2024',
  },
  {
    id: nanoid(),
    text: 'This is my second note!',
    date: '08/12/2024',
  },
  {
    id: nanoid(),
    text: 'This is my third note!',
    date: '14/12/2024',
  },
  {
    id: nanoid(),
    text: 'This is note innovacraft!',
    date: '22/12/2024',
  },
  {
    id: nanoid(),
    text: 'This is my new note!',
    date: '28/12/2024',
  },
  {
    id: nanoid(),
    text: 'This is my innovacraftcom!',
    date: '14/12/2024',
  },
];

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    setNotes(savedNotes || defaultNotes);
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem('react-notes-app-data', JSON.stringify(newNotes));
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem('react-notes-app-data', JSON.stringify(newNotes));
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}
