const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());  // HARUS ADA!

let tasks = [
  { id: 1, task: "Belajar Node.js", status: "In Progress", createdAt: "2025-02-16" },
  { id: 2, task: "Membuat REST API", status: "Completed", createdAt: "2025-02-15" },
  { id: 3, task: "Mengimplementasikan database", status: "Pending", createdAt: "2025-02-17" }
];


// GET: Ambil semua tugas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST: Tambah tugas baru
app.post("/tasks", (req, res) => {
  console.log("Request diterima:", req.body); // Debugging log
  if (!req.body.task) {
    return res.status(400).json({ message: "Task tidak boleh kosong!" });
  }
  const newTask = {
    id: tasks.length + 1,
    task: req.body.task
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE: Hapus tugas berdasarkan ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(200).json({ message: "Tugas berhasil dihapus" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
