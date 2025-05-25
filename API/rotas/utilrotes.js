const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "..","..")));

// Função para ler os dados do arquivo JSON
function lerDados() {
  const filePath = path.join(__dirname,"..","dados.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(rawData);
}

// Rota 1 - GET /api/municipio/:id
app.get("/api/municipio/:id", (req, res) => {
  const id = req.params.id;
  const dadosJson = lerDados();

  const municipio = dadosJson.municipios.find((m) => m.id === id);

  if (!municipio) {
    return res.status(404).json({ erro: "Município não encontrado." });
  }

  res.json(municipio);
});

// Rota 2 - GET /api/municipios (lista todos municípios)
app.get("/api/municipios", (req, res) => {
  const dadosJson = lerDados();
  res.json(dadosJson.municipios);
});

// Rota 3 - GET /api/municipios/uf/:uf (lista municípios por estado UF)
app.get("/api/municipios/uf/:uf", (req, res) => {
  const uf = req.params.uf.toUpperCase();
  const dadosJson = lerDados();

  const lista = dadosJson.municipios.filter((m) => m.uf === uf);

  if (lista.length === 0) {
    return res.status(404).json({ erro: "Nenhum município encontrado para esta UF." });
  }

  res.json(lista);
});

// Rota 4 - GET /api/ranking/top10 (top 10 municípios por IDH)
app.get("/api/ranking/top10", (req, res) => {
  const dadosJson = lerDados();

  const top10 = dadosJson.municipios
    .slice() // para não alterar o array original
    .sort((a, b) => b.idh.valor - a.idh.valor)
    .slice(0, 10);

  res.json(top10);
});

// Rota fallback para rotas inválidas
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
