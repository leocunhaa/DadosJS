const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// Conectando ao mongoDB usando Mongoose
mongoose.connect('mongodb://localhost/checklist', { useNewUrlParser: true, useUnifiedTopology: true });

// Definindo modelo para 'task'
const Task = mongoose.model('task', {
  Nome: String,
  Idade: Number
});

// Rota para adicionar uma nova tarefa
app.post('/adicionar-tarefa', async (req, res) => {
  try {
    const { Nome, Idade } = req.body;
    const novaTarefa = new Task({ Nome, Idade });
    await novaTarefa.save();
    res.json({ mensagem: 'Tarefa adicionada com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Ocorreu um erro ao adicionar a tarefa.' });
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
