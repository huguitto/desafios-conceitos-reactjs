import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  function allRepositories() {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }
  //Load all repositories
  useEffect(() => {
    allRepositories();
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: "New Repository",
      url: "https://www.github.com/new",
      techs: ["ReactJS", "NodeJS"],
    });

    setRepositories([...repositories, response.data]); //Mucha atencion .data
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((item) => item.id !== id)); //muito massa isso aqui, a gente nao faz splice faz filter
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
