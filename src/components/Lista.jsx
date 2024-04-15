import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const Lista = () => {
  const [pokemons, setPokemons] = useState([]); // estado para almacenar la lista de pokemones
  const [loading, setLoading] = useState(false); // estado para controlar el estado de carga
  const [loaded, setLoaded] = useState(false); // estado para controlar si se ha cargado la lista

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      setPokemons(response.data.results);
      setLoaded(true); // marcamos que la lista se ha cargado correctamente
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (name) => {
    setPokemons(pokemons.filter((pokemon) => pokemon.name !== name));
  };

  return (
    <>
      <div className=" d-flex justify-content-start flex-column w-100 h-100">
        <button
          className="btn btn-primary mb-3"
          onClick={fetchData}
          disabled={loading || loaded} // deshabilitar el botón si se está cargando o si la lista ya se ha cargado
        >
          Cargar Lista
        </button>
        {loaded && ( // mostrar la lista solo si se ha cargado
          <div className="  d-flex justify-content-start flex-column w-100 h-100 ">
            <h3 className="text-center">Listado de pokemones</h3>
            <ul className="list-group w-100">
              {pokemons.map((pokemon) => (
                <li className="list-group-item" key={pokemon.name}>
                  {pokemon.name}
                  <button
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => handleDelete(pokemon.name)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {loading &&
          !loaded && ( // mostrar mensaje de carga solo si aún no se ha cargado la lista
            <p className="d-flex justify-content-center align-items-center">
              Cargando...
            </p>
          )}
      </div>
    </>
  );
};
