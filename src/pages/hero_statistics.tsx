import { Heading, Button, Box, Text, HStack, Card } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Input_field from "../components/input_field";

export default function HeroStatistics() {

  // useState создает состояние
  // <any[]> означает, что это массив, элементы которого не проверяются строго TypeScript
  // heroes хранит героев, найденных по поисковому запросу
  // setHeroes изменяет значение heroes

  const [heroes, setHeroes] = useState<any[]>([]);
  const [allHeroes, setAllHeroes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [steamError, setSteamError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submit, setSubmit] = useState("");

  // Позволяет выполнять код при открытии страницы или изменении зависимостей
  useEffect(() => {

    // async обозначает асинхронную функцию
    // Она позволяет использовать await для ожидания результата запроса
    const HeroData = async () => {
      setSteamError(null);
      setLoading(true);

      try {
        // Список героев из OpenDota API
        const response = await axios.get(
          "https://api.opendota.com/api/heroes"
        );

        const data = response.data;
        setAllHeroes(data)

      // Если запрос не удался, то в catch попадет ошибка. Она показывается в консоли и в интерфейсе, а массив игроков очищается
      } catch (error: any) {
        console.log(error);
        setSteamError(error.message);
        setHeroes([]);
      } finally {
        setLoading(false);
      }
    };

    HeroData();
  }, []);

  // Этот useEffect выполняет поиск по уже загруженному списку героев
  // Он запускается, когда меняется submit или allHeroes
  useEffect(() => {

    // Если поисковый запрос пустой, очищение найденных героев и сообщение об ошибке
    if (!submit) {
      setHeroes([]);
      setSteamError(null);
      return;
    }

    // === означает строгое равенство, то есть сравниваются значение и тип
    // Если список пустой, поиск пока не выполняется
    if (allHeroes.length === 0) {
      return;
    }

    // filter создает новый массив только из подходящих элементов
    // item обзночает текущий герой, которого проверяет filter
    // includes проверяет, содержится ли введённый текст в имени героя
    const hero = allHeroes.filter(
      (item: any) =>
        item.localized_name.toLowerCase().includes(
          submit.trim().toLowerCase()
        )
    );

    setHeroes(hero);

    // Если герой не найден
    if (hero.length === 0) {
      setSteamError("Hero not found. Please check the hero name.");
    } else {
      setSteamError(null);
    }
  }, [submit, allHeroes]);

  return (
    <Box minH="100vh" bgGradient="to-l" gradientFrom="#09203F" gradientTo="#537895">

      { /* maxW- насколько широкий может быть элемент,
       mx- внешний отступ слева/справа,
       p- внутренний отступ со всех сторон, 
       display- как элемент будет отображаться,
       justifyContent- элемент выравнивается по горизонтали, 
       alignItems- элемент выравнивается по вертикали, 
       gap- расстояние между элементами.
       mb- внешний отступ снизу
       mt- внешний отступ сверху*/ }

      <Heading maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" gap="2">
        Hero Search by Their Name
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
      <Text maxW="800px" mx="auto" mb="6">
        Here you can find your hero in Dota 2 and what are their statistics are
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
      если есть 400 (?), то показываем "Error: Please enter a valid hero name."
      если есть 404 (?), то показываем "Error: Hero not found. Please check the hero name and try again."
      если есть другая ошибка (:), то показываем "Error: {error}" */}
      {steamError && (
        steamError.includes("400") 
        ? ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: Please enter a valid hero name.
          </Text> )
        : steamError.includes("404")
        ? ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: Hero not found. Please check the hero name and try again.
          </Text> )
        : ( <Text maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" color="red.500">
            Error: {steamError}
          </Text> )
      )}

      { /* map перебирает массив heroes и создаёт карточку для каждого героя
      key={hero.id} помогает React различать карточки разных героев*/}
      {heroes.map((hero) => (
        <Card.Root key={hero.id} maxW="800px" mx="auto" mt="6"> 
        <HStack direction="row" gap="6" align="center">

          <Box>
            <Heading>
              {hero.localized_name
              ? hero.localized_name
              : "No data"}
            </Heading>
          
            <Box>
              <Heading size="md">
                Attributes:
              </Heading>

              <Text>
                Attack type: {hero.attack_type
                ? hero.attack_type
                : "No data"}
              </Text>

              <Text>
                Roles: {hero.roles
                ? hero.roles.join(", ")
                : "No data"}
              </Text>

              <Text>
                Primary attribute: {hero.primary_attr
                ? hero.primary_attr
                : "No data"}
              </Text>
            </Box>
          </Box>
        </HStack>
        </Card.Root>
      ))}
    </Box>  
  );
}