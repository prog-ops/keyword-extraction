import { Box, Flex, Text } from '@chakra-ui/react'
import { APP_CONFIG } from '@/config/constants'

const Footer = () => {
  return (
    <Box as="footer" marginTop={10} paddingBottom={6}>
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="sm" color="purple.200">
          {APP_CONFIG.footerText}
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
