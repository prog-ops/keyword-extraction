import { Heading, Image, Text, VStack, Badge } from '@chakra-ui/react'
import extractLogo from '@/assets/extract.svg'
import { APP_CONFIG } from '@/config/constants'

const Header = ({ isSplit = false }) => {
  return (
    <VStack spacing={3} marginBottom={isSplit ? 6 : 8} textAlign="center">
      <Image
        src={extractLogo}
        alt="Grammar Checker Logo"
        width={isSplit ? '56px' : '84px'}
        transition="width 0.25s ease"
      />
      <Badge
        colorScheme="purple"
        variant="subtle"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        letterSpacing="wider"
        textTransform="uppercase"
      >
        English Grammar &amp; Style Engine
      </Badge>
      <Heading
        color="white"
        size={isSplit ? 'lg' : 'xl'}
        transition="font-size 0.25s ease"
      >
        {APP_CONFIG.title}
      </Heading>
      <Text
        fontSize={isSplit ? 'md' : 'lg'}
        color="purple.100"
        maxW="2xl"
        lineHeight="tall"
      >
        {APP_CONFIG.subtitle}
      </Text>
    </VStack>
  )
}

export default Header
