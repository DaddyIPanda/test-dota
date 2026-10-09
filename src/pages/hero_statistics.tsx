import { Heading, Button, Box, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HeroStatistics() {
    return(
    <Box minH="100vh" bgGradient="to-l" gradientFrom="#09203F" gradientTo="#537895">

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
    </Box>
    );
}