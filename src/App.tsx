import { useEffect, useState } from "react";
import axios from "axios";
import Input_field from "./components/Input_field";
import { BookOpenIcon } from "@phosphor-icons/react";
import { Box, Heading, Text, Card, Stack, Image } from "@chakra-ui/react";

function App() {

  // Функция, где переменная players, loading и тд хранит данные, а setPlayers, setLoading и тд их меняет
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submit, setSubmit] = useState("");

  // Позволяет выполнять побочные эффекты в функциональных компонентах
  useEffect(() => {
    // Если account_id ещё не введён, запрос не выполняем
    if (!submit) {
      return;
    }

    // Подберание данных о игроках из OpenDota API
    const PlayerData = async () => {
      try {
        setError(null);
        setLoading(true);

        // Отправить GET-запрос на OpenDota API, передав туда то, что пользователь ввёл в submit
        const response = await axios.get(`https://api.opendota.com/api/players/${submit}`);
        const data = response.data;

        setPlayers([data]);
  
      // Если запрос не удался, то в catch попадет ошибка. Она показывается в консоли и в интерфейсе, а массив игроков очищается
      } catch (error : any) { 
        console.log(error);
        setError(error.message);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    PlayerData();
  }, [submit]); // useEffect будет срабатывать каждый раз, когда submit изменяется

  return (
    <Box minH="100vh" bgGradient="to-r" gradientFrom="#09203F" gradientTo="#537895">

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
        Test Dota 2 <BookOpenIcon size={32} weight="duotone" />
      </Heading>
      <Text maxW="800px" mx="auto" mb="6">
        This application allows users to search for Dota 2 players by their Steam ID and view information about them.
        You can also explore hero statistics using data from the OpenDota API.
      </Text>

      <Input_field
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSubmit={setSubmit}
      />

      <br />
      <br />
      {loading && <Text mx="auto" display="flex" justifyContent="center">Loading...</Text>}

      {/* Используется тернарный оператор, где спрашивается,
      есть ли в ошибке определенный код ошибки
      если есть 400 (?), то показываем "Error: Please enter a valid Steam ID. The Steam ID should be a numeric value."
      если есть 404 (?), то показываем "Error: Player not found. Please check the Steam ID and try again"
      если есть другая ошибка (:), то показываем "Error: {error}" */}
      {error && (
        error.includes("400") 
        ? ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: Please enter a valid Steam ID. The Steam ID should be a numeric value.
          </Text> )
        : error.includes("404")
        ? ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: Player not found. Please check the Steam ID and try again
          </Text> )
        : ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: {error}
          </Text> )
      )}

      {/* Перебор массива players и создание карточек для каждого игрока */}
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
        </Card.Root>
      ))}
  </Box >
  );
}

export default App;