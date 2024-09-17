function fetchJSON() {
  fetch("./pokedex.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json;
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Unable to fetch data", error));
}
fetchJSON();

const inputElement = document.getElementById("campo-pesquisa");

inputElement.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    pesquisar();
  }
});

function pesquisar() {
  // Obtém a seção HTML onde os resultados da pesquisa serão exibidos
  let section = document.getElementById("resultados-pesquisa");

  let campoPesquisa = document.getElementById("campo-pesquisa").value;

  if (campoPesquisa == "") {
    section.innerHTML = "Nada foi encontrado";
    return;
  }
  // Inicializa uma string vazia para armazenar os resultados formatados
  let resultados = "";

  // Itera sobre cada elemento (dado) do array de dados
  for (let dado of dados) {
    if (
      dado.nome.includes(campoPesquisa) ||
      dado.nome.toLowerCase().includes(campoPesquisa) ||
      dado.id.toString().includes(campoPesquisa)
    ) {
      // Constrói o HTML para cada resultado, formatando os dados do objeto
      resultados += `
        <div class="item-resultado">
            <h2>${dado.nome}</h2>
            <p> 
                <strong>id:</strong> ${dado.id}<br>
                <strong>tipo:</strong> ${dado.tipo}<br>
                <strong>Descrição:</strong> ${dado.desc}
            </p>
            <a href="https://www.pokemon.com/br/pokedex/${dado.nome}" target="_blank">Mais informações</a>
        </div>
    `;
    }
  }
  // Atribui o HTML gerado à seção de resultados, atualizando a página
  section.innerHTML = resultados;
}
