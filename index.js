const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Produto = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configurar a conexão com o banco de dados
mongoose.connect('mongodb://localhost/mobile-api', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

// Definir as rotas

// obter produto por id
app.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// criar novo produto
app.post('/produtos', async (req, res) => {
  const produto = new Produto({
    nome: req.body.name,
    preco: req.body.preco,
    descricao: req.body.descricao
  });

  try {
    const novoProduto = await produto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// atualizar produto
app.put('/produtos/:id', async (req, res) => {
  try {
    const prudito = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado '});
    }

    produto.nome = req.body.nome;
    produto.descricao = req.body.descricao;

    const produtoAtualizado = await produto.save();
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// deletar um produto
app.delete('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado '});
    }

    await produto.remove();
    res.json({ message: 'Produto excluído com sucesso '});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
