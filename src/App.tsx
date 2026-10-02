import React, { useEffect, useState } from "react";
import axios from "axios";
import Input_field from "./components/Input_field";
import { BookOpenIcon } from "@phosphor-icons/react";

function App() {
  // Функция, где переменная players, loading и тд хранит данные, а setPlayers, setLoading и тд их меняет
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submit, setSubmit] = useState("");

  // Позволяет выполнять побочные эффекты в функциональных компонентах
  useEffect(() => {
    // Если account_id ещё не введён, запрос не выполняем
    if (!submit) {
      return;
    }

    // Подберание данных о герое из OpenDota API
    const PlayerData = async () => {
      try {
        setError(false);
        setLoading(false);
        // Отправить GET-запрос на OpenDota API, передав туда то, что пользователь ввёл в submit
        const response = await axios.get(`https://api.opendota.com/api/players/${submit}`);
        const data = response.data;

        setPlayers([data]);
  
      } catch (error) {
        console.log(error);
        setError(true);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    PlayerData();
  }, [submit]); // useEffect будет срабатывать каждый раз, когда submit изменяется

  return (
    <div className="App">
      <h1> Test Dota 2 <BookOpenIcon size={32} weight="duotone" /> </h1>
      <p>
        This application allows users to search for Dota 2 players by their Steam ID and view information about them.
        You can also explore hero statistics using data from the OpenDota API.
      </p>
      <Input_field searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSubmit={setSubmit} />
      <br />
      <br />
      {/* Перебор массива players и создание карточек для каждого игрока */}
      {players.map((player) => ( //map - метод массива, который позволяет перебрать все элементы массива и выполнить для каждого элемента определенную функцию
        <div key={player.profile.account_id}>
          <img src={player.profile.avatarfull} alt={player.profile.personaname} />
            <p>
              {player.profile.personaname}<br />
              ID: {player.profile.account_id}<br />
              Country: {player.profile.loccountrycode}<br />
              Last login: {player.profile.last_login}<br />
              MMR (Matchmaking Rating): {player.computed_mmr}<br />
              Player level: {player.rank_tier}
            </p>
        </div>
      ))}
  </div>
  );
}

export default App;
