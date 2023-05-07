import React, { useState } from "react";
import "./privateNote.css";

function PrivateNote() {
  const [note, setNote] = useState("");
  const [panelVisible, setPanelVisible] = useState(false);
  const [previousNote, setPreviousNote] = useState("");

  function saveNote() {
    // Save the note to local storage
    localStorage.setItem("privateNote", note);
    
    // Show a confirmation message
    alert("Note saved successfully!");
  }

  function togglePanel() {
    // Get the previous note from local storage
    const savedNote = localStorage.getItem("privateNote");
    
    // Update the state with the previous note and toggle the panel visibility
    setPreviousNote(savedNote);
    setPanelVisible(!panelVisible);
  }

  return (
    <div className="note-container">
      <h1>Create Private Note</h1>
      <textarea
        id="note"
        placeholder="Write your private note here"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button onClick={saveNote}>Save Note</button>
      <button className="panel-toggle" onClick={togglePanel}>
        {panelVisible ? "Hide Previous Note" : "Show Previous Note"}
      </button>
      {panelVisible && (
        <div className="panel">
          <h2>Previous Notes</h2>
          <p>{previousNote}</p>
        </div>
      )}
    </div>
  );
}

export default PrivateNote;
