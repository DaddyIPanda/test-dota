import { Heading, Button, Box, Text, HStack } from "@chakra-ui/react";
import { BookOpenIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Main() {
    return(
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

      <Heading mb="6" maxW="800px" mx="auto" display="flex" justifyContent="center" alignItems="center" gap="2">
        Test Dota 2 <BookOpenIcon size={32} weight="duotone" />
      </Heading>
       <HStack mb="6" justifyContent="center" gap="5" display="flex">
        <Button>
          <Link to="/home">Home</Link>
        </Button>
        <Button>
          <a href="/search_players">Search Players</a>
        </Button>
        <Button>
          <a href="/hero_statistics">Hero Statistics</a>
        </Button>
      </HStack>
      <Text maxW="800px" mx="auto">
        This application allows users to search for Dota 2 players by their Steam ID and view information about them.
        You can also explore hero statistics using data from the OpenDota API.
      </Text>
    </Box>
    );
}