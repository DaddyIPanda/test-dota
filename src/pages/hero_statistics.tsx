import { Heading, Button, Box, Text } from "@chakra-ui/react";


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
      <Text maxW="800px" mx="auto" mb="6">
        Here you can find your hero in Dota 2 and what are their statistics are
      </Text>
    </Box>
    );
}