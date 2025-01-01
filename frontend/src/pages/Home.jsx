import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note.jsx";
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Use effect can be executed when the page is loaded the [] brackets tell that the code is to be executed only once , but you can also type a timer that is in milliseconds that could cause the function to run multiple times according to the timer that you have set
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      // Here res is the response that is sent by the api
      // then in this case works similiar to the async function that awaits the response from the function first and then it performs the next task
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("The note was deleted");
        else alert("Failed to delete the note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  // Here e is entered because the creation would be done with the help of a form so e is used so that we can prevent the form from being submitted without adding any values
  const createNote = (e) => {
    e.preventDefault();
    api
      // Passing the content and title from the form to the api so that it can be sent to the backend
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to create note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title : </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content: </label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />{" "}
        <br />
        <button type="submit" value="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
