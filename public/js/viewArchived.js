const renderDataArchivedAsHtml = (data) => {
    let cards = ``;
    let ordered = {};
    Object.keys(data).sort(function(a, b) {
        return data[a].title.localeCompare(data[b].title); }).forEach(function(key) {
        ordered[key] = data[key];
    });
    for (const noteItem in ordered) {
    const note = ordered[noteItem];
    // For each note create an HTML card
    if(note.archive){
    cards += createCard(note, noteItem)
    }
    };
  // Inject our string of HTML into our viewNotes.html page
    document.querySelector('#archiveapp').innerHTML = cards;
};
