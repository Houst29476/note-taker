const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// ----- activeNote keeps track of notes in text area ----- //
const activeNote = {};

// ----- getNotes retrieves notes from db ------ //
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// ----- saveNote saves notes to the db ----- //
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// ----- deleteNote deletes a note from the db ----- //
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

// ---- If an activeNote exists, display it, otherwise render empty inputs ---- //
const renderActiveNote = () => {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// ----- handleNoteSave saves note input data to db, updates view ----- //
const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote (newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// ----- Deletes clicked Note ------ //
const handleNoteDelete = function (event) {
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// ----- Sets the activeNote and displays it ----- //
const handleNewNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// ---- Sets the activeNote to an empty object and allows user to enter new note ----- //
const handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// ----- Hide Save button if Notes title or text are emtpy ----- //
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

