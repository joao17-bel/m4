async function consultarIDH() {
  const id = document.getElementById("municipioId").value.trim();
  const resultado = document.getElementById("resultado");

  if (!id) {
    alert("Digite o código do município!");
    return;
  }

  try {
    const response = await fetch("dados.json"); // Lê o JSON local
    const dadosJson = await response.json();

    // Busca o município pelo ID dentro do array
    const dados = dadosJson.municipios.find((m) => m.id === id);

    if (!dados) {
      resultado.style.display = "block";
      resultado.innerHTML = `<p><strong>Município não encontrado.</strong></p>`;
      return;
    }

    resultado.style.display = "block";
    resultado.innerHTML = `
      <h3>${dados.nome} - ${dados.uf}</h3>
      <p><strong>IDH:</strong> ${dados.idh.valor} (${dados.idh.classificacao})</p>
      <p><strong>Ano:</strong> ${dados.idh.ano}</p>
      <p><strong>Ranking Nacional:</strong> ${dados.ranking_nacional}º</p>
    `;
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    resultado.style.display = "block";
    resultado.innerHTML = `<p><strong>Erro ao consultar os dados.</strong></p>`;
  }
}
