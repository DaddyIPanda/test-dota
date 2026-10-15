import { useEffect, useState } from "react";
import axios from "axios";
import Input_field from "../components/input_field";
import { Box, Heading, Text, Card, Stack, Image, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function SearchPlayers() {

  // useState создаёт состояние
  // <any[]> означает, что это массив, элементы которого не проверяются строго TypeScript
  // players хранит героев, найденных по поисковому запросу
  // setPlayers изменяет значение players

  const [players, setPlayers] = useState<any[]>([]);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [steamError, setSteamError] = useState<string | null>(null);
  const [matchesError, setMatchesError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submit, setSubmit] = useState("");

  // Позволяет выполнять побочные эффекты в функциональных компонентах
  useEffect(() => {
    // Если account_id ещё не введён, запрос не выполняем
    if (!submit) {
      return;
    }

    // Подберание данных о игроках из OpenDota API
    // async обозначает асинхронную функцию
    // Она позволяет использовать await для ожидания результата запроса
    const PlayerData = async () => {
      setSteamError(null);
      setMatchesError(null);
      setLoading(true);

      try {
        // Получаем данные игрока
        const response = await axios.get(
            `https://api.opendota.com/api/players/${submit}`
        );

        const data = response.data;
        setPlayers([data]);
      
      // Если запрос не удался, то в catch попадет ошибка. Она показывается в консоли и в интерфейсе, а массив игроков очищается  
      } catch (steamError: any) {
          console.log(steamError);
          setSteamError(steamError.message);
          setPlayers([]);
      }

      try {
          // Получаем последние матчи игрока
          const response1 = await axios.get(
              `https://api.opendota.com/api/players/${submit}/recentMatches`
          );

          const data1 = response1.data;

          // Сначала происходит проверка формат ответа API, затем, есть ли матчи:
          // Если массив пустой, то пишется ощибка,
          // Если матчи есть, то сохроняется первые пять и удаляется ошибка.
          // Если ответ имеет неправильный формат, то очищается список и показывается сообщение о недоступности данных
          if (Array.isArray(data1)) {
              setRecentMatches(data1.slice(0, 5));
            if (data1.length === 0) { // Это называется строгое сравнение. '===' сравнивает и значение, и тип данных
              setMatchesError("No recent matches found. The player may not have played recently.");
            } else {
              setMatchesError(null);
            }
          } else {
              setMatchesError("Recent matches data is unavailable.");
              setRecentMatches([]);
          }

      } catch (matchesError: any) {
          console.log(matchesError);
          setMatchesError(matchesError.message);
          setRecentMatches([]);

      } finally {
          setLoading(false);
      }
    };

    PlayerData();
  }, [submit]); // useEffect будет срабатывать каждый раз, когда submit изменяется

  return (
    <Box minH="100vh" bgGradient="to-br" gradientFrom="#09203F" gradientTo="#537895">

       {/* maxW- насколько широкий может быть элемент,
       mx- внешний отступ слева/справа,
       p- внутренний отступ со всех сторон, 
       display- как элемент будет отображаться,
       justifyContent- элемент выравнивается по горизонтали, 
       alignItems- элемент выравнивается по вертикали, 
       gap- расстояние между элементами.
       mb- внешний отступ снизу
       mt- внешний отступ сверху*/}

      <Heading maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" gap="2">
        Player Profile Search by Steam ID3
      </Heading>
      <HStack mt="6" mb="6" justifyContent="center" gap="5" display="flex">
        <Button>
          <Link to="/home">Home</Link>
        </Button>
        <Button>
          <Link to="/search_players">Search Players</Link>
        </Button>
        <Button>
          <Link to="/hero_statistics">Hero Statistics</Link>
        </Button>
      </HStack>
      <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" mb= "6">
        Find players instantly. Type in a Steam ID3 to explore their profile.
      </Text>

      {/* Передача компоненту поля поиска необходимые значения и функции*/}
      <Input_field
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSubmit={setSubmit}
      />

      {loading && <Text mx="auto" display="flex" justifyContent="center" mt="6">Loading...</Text>}

      {/* Используется тернарный оператор, где спрашивается,
      есть ли в ошибке определенный код ошибки
      если есть 400 (?), то показываем "Error: Please enter a valid Steam ID3. The Steam ID3 should be a numeric value."
      если есть 404 (?), то показываем "Error: Player not found. Please check the Steam ID3 and try again."
      если есть другая ошибка (:), то показываем "Error: {error}" */}
      {steamError && (
        steamError.includes("400") 
        ? ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: Please enter a valid Steam ID3. The Steam ID3 should be a numeric value.
          </Text> )
        : steamError.includes("404")
        ? ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: Player not found. Please check the Steam ID3 and try again.
          </Text> )
        : ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: {steamError}
          </Text> )
      )}

      { /* map перебирает массив players и создаёт карточку для каждого пользователя Steam
      key={player.profile.account_id} помогает React различать карточки разных пользователей*/}
      {players.map((player) => (
        <Card.Root key={player.profile.account_id} maxW="800px" mx="auto" mt="6">
          <Card.Body>
            <Stack direction="row" gap="6" align="center">

              <Image
                src={player.profile.avatarfull}
                alt={player.profile.personaname}
                boxSize="120px"
                borderRadius="full"
              />

              <Box>
                <Heading size="md">
                  {player.profile.personaname}
                </Heading>

                <Text>
                  ID: {player.profile.account_id}
                </Text>

                <Text>
                  Country: {player.profile.loccountrycode
                  ? player.profile.loccountrycode
                  : "No data"}
                </Text>

                <Text>
                    {/* Используется тернарный оператор, где спрашивается,
                      есть ли дата последнего входа
                      если дата есть (?), то преобразуем её в эстонский формат
                      если даты нет (:), то показываем "No data" */}
                  Last login: {player.profile.last_login
                  ? new Date(player.profile.last_login).toLocaleString("et-EE")
                  : "No data"}
                </Text>

                <Text>
                  MMR: {player.computed_mmr
                  ? player.computed_mmr
                  : "No data"}
                </Text>

                <Text>
                  Player level: {player.rank_tier
                  ? player.rank_tier
                  : "No data"}
                </Text>
              </Box>
            </Stack>
          </Card.Body>

          <Card.Body>
          <Heading size="md">Recent matches:</Heading>
          
          {matchesError && (
            <Text color="red.500" mt="4">
              Error: {matchesError}
            </Text>
          )}

            <HStack gap="4" mt="4" align="start">
              {recentMatches.map((match) => (
                <Box key={match.match_id}>

                  <Text>
                    Match ID: {match.match_id 
                    ? match.match_id 
                    : "No data"}
                  </Text>

                  <Text>
                    Match date: {match.duration 
                    ? new Date(match.start_time * 1000).toLocaleString("et-EE")
                    : "No data"} 
                  </Text>

                  <Text>
                    Match duration: {match.duration 
                    ? Math.round(match.duration / 60) + " minutes" 
                    : "No data"}
                  </Text>

                  <Text>
                    Result: {match.radiant_win 
                     ? "Won"
                     : "Lost"}
                  </Text>

                </Box>
              ))}
            </HStack>
          </Card.Body>

        </Card.Root>
      ))}
    </Box>
  );
}