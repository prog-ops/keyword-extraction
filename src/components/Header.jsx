import {Heading, Image, Text} from "@chakra-ui/react";
import extract from '../assets/extract.svg'

const Header = () => {
  return (
      <>
        <Image
            src={extract}
            alt='extract'
            width={100}
            marginBottom='1rem'
        />
        <Heading color='white' marginBottom='1rem'>
          Keyword Extraction
        </Heading>
        <Text fontSize={25} textAlign='center'>
          Paste in your text below and let it extract the keywords
        </Text>
      </>
  )
}
export default Header
