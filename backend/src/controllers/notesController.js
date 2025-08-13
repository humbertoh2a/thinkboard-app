import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send();
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (error) {
    console.log("createNote error");
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!newNote) return res.json("note not found");
    res.status(200).json(newNote);
  } catch (error) {
    res.json({ message: "failed to update note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.json("note not found");
    res.status(200).json("note deleted");
  } catch (error) {
    res.json({ message: "failed to delete note" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const noteFound = await Note.findById(req.params.id);
    if (!noteFound) return res.json("note not found");
    res.status(200).json(noteFound);
  } catch (error) {
    res.json({ message: "failed to find note (server error)" });
  }
};
