import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/react'

const CorrectionItem = ({ item }) => {
  return (
    <Box
      bg="purple.900"
      borderWidth="1px"
      borderColor="purple.600"
      borderRadius="lg"
      p={3}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        marginBottom={1}
      >
        <HStack spacing={2} flexWrap="wrap">
          <Text
            as="span"
            fontSize="sm"
            color="red.200"
            textDecoration="line-through"
          >
            {item.original}
          </Text>
          <Text as="span" fontSize="xs" color="purple.300">
            →
          </Text>
          <Text
            as="strong"
            fontSize="sm"
            fontWeight="extrabold"
            color="green.200"
          >
            {item.corrected}
          </Text>
        </HStack>

        <Badge colorScheme="purple" variant="solid" fontSize="0.65rem">
          {item.category}
        </Badge>
      </Flex>

      <Text fontSize="xs" color="purple.200">
        {item.explanation}
      </Text>
    </Box>
  )
}

export default CorrectionItem

