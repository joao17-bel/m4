const resultadoDiv = document.getElementById("resultado");

// Função para buscar município por ID
async function consultarPorId() {
  const id = document.getElementById("municipioId").value.trim();
  if (!id) {
    alert("Informe o código do município.");
    return;
  }
  try {
    const res = await fetch(`/api/municipio/${id}`);
    if (!res.ok) throw new Error("Município não encontrado.");
    const data = await res.json();
    mostrarResultado(formatarMunicipio(data));
  } catch (error) {
    mostrarResultado(`<p style="color:red">${error.message}</p>`);
  }
}

// Função para listar municípios por UF
async function consultarPorUF() {
  const uf = document.getElementById("ufSelect").value;
  if (!uf) {
    alert("Selecione uma UF.");
    return;
  }
  try {
    const res = await fetch(`/api/municipios/uf/${uf}`);
    if (!res.ok) throw new Error("Nenhum município encontrado para esta UF.");
    const dados = await res.json();
    const html = dados.map(formatarMunicipio).join("<hr>");
    mostrarResultado(html);
  } catch (error) {
    mostrarResultado(`<p style="color:red">${error.message}</p>`);
  }
}

// Função para mostrar top 10 municípios por IDH
async function consultarTop10() {
  try {
    const res = await fetch("/api/ranking/top10");
    if (!res.ok) throw new Error("Erro ao buscar ranking.");
    const dados = await res.json();
    const html = dados.map(formatarMunicipio).join("<hr>");
    mostrarResultado(html);
  } catch (error) {
    mostrarResultado(`<p style="color:red">${error.message}</p>`);
  }
}

// Helper: monta o HTML com os dados do município
function formatarMunicipio(m) {
  return `
    <h3>${m.nome} - ${m.uf}</h3>
    <p><strong>IDH (${m.idh.ano}):</strong> ${m.idh.valor} (${m.idh.classificacao})</p>
    <p><strong>Ranking Nacional:</strong> ${m.ranking_nacional}</p>
    <p><strong>Educação:</strong> Básico ${m.educacao.ensino_basico}%, Médio ${m.educacao.ensino_medio}%, Superior ${m.educacao.ensino_superior}%</p>
    <p><strong>Saneamento:</strong> ${m.saneamento}</p>
    <p><strong>Saúde:</strong> ${m.saude}</p>
  `;
}

// Helper: exibe resultado na página
function mostrarResultado(html) {
  resultadoDiv.style.display = "block";
  resultadoDiv.innerHTML = html;
}

// Expor as funções para uso no HTML
window.consultarPorId = consultarPorId;
window.consultarPorUF = consultarPorUF;
window.consultarTop10 = consultarTop10;
