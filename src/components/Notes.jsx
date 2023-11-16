import React, { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, user might not be logged in');
          return;
        }

        const response = await fetch('https://bookapp-backend-zph0.onrender.com/api/notes', {
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, user might not be logged in');
        return;
      }

      const response = await fetch('https://bookapp-backend-zph0.onrender.com/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ content: newNote })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const addedNote = await response.json();
      setNotes([...notes, addedNote]);
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, user might not be logged in');
        return;
      }

      const response = await fetch(`https://bookapp-backend-zph0.onrender.com/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const startEditing = (note) => {
    setEditingNoteId(note._id);
    setEditingContent(note.content);
  };

  const handleUpdateNote = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, user might not be logged in');
        return;
      }

      const response = await fetch(`https://bookapp-backend-zph0.onrender.com/api/notes/${editingNoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ content: editingContent })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedNote = await response.json();
      setNotes(notes.map(note => note._id === editingNoteId ? updatedNote : note));
      setEditingNoteId(null);
      setEditingContent('');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="container" >
      <h2>My Notes</h2>
      <div>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              {editingNoteId === note._id ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <button onClick={handleUpdateNote}>Save</button>
                  <button onClick={() => setEditingNoteId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{note.content}</p>
                  <button onClick={() => startEditing(note)}>Edit</button>
                  <button onClick={() => deleteNote(note._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes added yet.</p>
      )}
    </div>
  );
};

export default Notes;
