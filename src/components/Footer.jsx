import {Box, Flex, Image, Text} from "@chakra-ui/react";
import icon from '../assets/openai.svg'

const Footer = () => {
  return (
      <Box marginTop={50}>
        <Flex justifyContent='center' alignItems='center'>
          <Text>
            This project is built using Vite and React
          </Text>
        </Flex>
      </Box>
  )
}
export default Footer
