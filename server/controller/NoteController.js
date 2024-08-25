const note = require("../model/note.model");
const appError = require("../utils/appError");

exports.getAllNote = async (req, res, next) => {
  try {
    const notes = await note.find().sort({
      createdAt: -1,
    });
    res.status(200).json({
      status: "success",
      results: notes.length,
      data: {
        notes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNote = async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide title and content",
    });
  }

  try {
    const newNote = await note.create({ title, description });

    res.status(201).json({
      status: "success",
      data: {
        note: newNote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to cretae",
      message: err.message,
    });
  }
};
exports.getNotesById = async (req, res, next) => {
  try {
    const notes = await note.findById(req.params.id);
    if (!notes) {
      return appError("No note found with that ID", 404);
    }
    res.status(200).json({
      status: "success",
      data: {
        note: notes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const notes = await note.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!notes) {
      return appError("No note found with that ID", 404);
    }
    res.status(200).json({
      status: "success",
      data: {
        notes,
      },
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const notes = await note.findByIdAndDelete(req.params.id);
    if (!notes) {
      return appError("No note found with that ID", 404);
    }
    res.status(204).json({
      status: "successFully Deleted!",
      data: null,
    });
  } catch {
    res.status(404).json({
      status: "fail to delete",
      message: err.message,
    });
  }
};
