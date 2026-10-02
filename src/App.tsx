import React, { useState } from "react";
//import logo from "./logo.svg";
//import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  // Функция, где переменная heroes, loading, error хранит данные, а setHeroes, setLoading, setError их меняет
  const [heroes, setHeroes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    // Подберание данных о героях из OpenDota API
    const HeroData = async () => {
      const response = await axios.get("https://api.opendota.com/api/heroes");
      const data = response.data;
      setHeroes(data);
      if (!data){
        setError(true);
      } else {
        setError(false);
      }
      setLoading(false);
    };
    HeroData();
  }, []);

  return (
    <div className="App">
      <h1>Test Dota 2</h1>
      <p>
        This application allows users to search for Dota 2 players by their Steam ID and view information about them.
        You can also explore hero statistics using data from the OpenDota API.
        
        {/* Превращение JavaScript-объекта в текстовую строку */}
        {JSON.stringify(heroes)}
      </p>
    </div>
  );
}

export default App;
