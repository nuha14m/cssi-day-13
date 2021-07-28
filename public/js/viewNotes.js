let googleUserId;
const editNoteModal = document.querySelector("#editNoteModal");

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    };
  });
};


const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};

const renderDataAsHtml = (data) => {
  let cards = ``;
  for (const noteItem in data) {
    const note = data[noteItem];
    // For each note create an HTML card
    cards += createCard(note, noteItem)
  };
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};

const createCard = (note, noteId) => {
  return `
    <div class="column is-one-quarter">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">${note.title}</p>
        </header>
        <div class="card-content">
          <div class="content">${note.text}</div>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item" onclick="editNote('${noteId}')">Edit</a>
            <a href="#" class="card-footer-item" onclick="deleteNote('${noteId}')">Delete</a>
        </footer>
      </div>
    </div>
  `;
}

const deleteNote = (noteId) => {
    console.log(noteId)
    if (confirm('Are you sure you want to delete that note?')) {
         firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
         console.log('Note deleted.');
    } else {
        console.log('Delete canceled.');
    }
    
};

const editNote = (noteId) => {
    editNoteModal.classList.toggle('is-active')
};

const closeEditModal = (noteId) => {
    editNoteModal.classList.toggle('is-active')

};

const saveEditedNote = (noteId) => {
    editNoteModal.classList.toggle('is-active')

};
