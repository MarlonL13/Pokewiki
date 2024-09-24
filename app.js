let pokeData = null; // Global variable to store the fetched Pokémon data

/*
 Fetches JSON data from the Pokedex API and stores it in the pokeData variable.
 */
async function fetchJSON() {
  try {
    const res = await fetch("./pokedex.json"); // Fetch the JSON file
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`); // Throw an error if response is not OK
    }
    pokeData = await res.json(); // Parse and store the JSON data
  } catch (error) {
    console.error("Unable to fetch data", error); // Log any errors during the fetch
  }
}
// Immediately invoke the fetchJSON function to load data
fetchJSON();

// Get references to input and results section elements from the DOM
const inputElement = document.getElementById("campo-pesquisa");
const section = document.getElementById("resultados-pesquisa");

// Add event listener for the "keydown" event on the input element
inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    pesquisar(); // Call the search function if Enter is pressed
  }
});

/*
 Searches for Pokémon based on the user's input and displays the results.
 */
function pesquisar() {
  const campoPesquisa = inputElement.value.trim(); // Get and trim the search input
  section.innerHTML = ""; // Clear previous results displayed in the section

  // Check if the search input is empty
  if (campoPesquisa === "") {
    section.innerHTML = "Nada foi encontrado"; // Display message if no input
    return; // Exit the function early
  }

  // Filter pokeData to find matching Pokémon based on name or ID
  const resultados = pokeData.filter((poke) => {
    const name = poke.name.english.toLowerCase(); // Get the Pokémon's English name in lowercase
    const id = poke.id.toString(); // Convert the Pokémon's ID to a string
    return (
      name.includes(campoPesquisa.toLowerCase()) || // Check if name includes the search term
      id.includes(campoPesquisa) // Check if ID includes the search term
    );
  });

  // Check if any results were found
  if (resultados.length === 0) {
    section.innerHTML = "Nada foi encontrado"; // Display message if no matches found
  } else {
    // Map over the results to generate HTML for each Pokémon
    section.innerHTML = resultados
      .map(
        (poke) => `
      <div class="item-resultado">
          <h2>${poke.name.english}</h2>
          <p>
              <strong>id:</strong> ${poke.id}<br>
              <strong>tipo:</strong> ${poke.type.join(", ")}<br>
          </p>
          <a href="https://www.pokemon.com/br/pokedex/${
            poke.name.english
          }" target="_blank">Mais informações</a>
      </div>
    `
      )
      .join(""); // Join results into a single HTML string
  }
}
