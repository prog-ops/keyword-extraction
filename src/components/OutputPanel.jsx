import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SkeletonText,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react'
import CorrectionItem from '@/components/CorrectionItem'

const OutputPanel = ({ result, isLoading }) => {
  const toast = useToast()

  const handleCopy = async (content, label) => {
    if (!content) return
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: `${label} copied`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } catch {
      toast({
        title: 'Failed to copy text',
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <Box
      bg="purple.800"
      borderWidth="1px"
      borderColor="purple.400"
      borderRadius="xl"
      p={5}
      boxShadow="xl"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom={3}
          flexWrap="wrap"
          gap={2}
        >
          <HStack spacing={2}>
            <Text fontWeight="semibold" fontSize="sm" color="purple.100">
              Corrected Version
            </Text>
            {result && !isLoading && (
              <Badge
                colorScheme={result.correctionCount > 0 ? 'green' : 'teal'}
                variant="subtle"
                borderRadius="full"
                px={2.5}
                py={0.5}
                fontSize="xs"
              >
                {result.correctionCount === 0
                  ? 'No errors found'
                  : `${result.correctionCount} ${
                      result.correctionCount === 1
                        ? 'correction'
                        : 'corrections'
                    } (bold)`}
              </Badge>
            )}
          </HStack>

          {result && !isLoading && (
            <HStack spacing={2}>
              <Button
                size="xs"
                variant="outline"
                color="purple.100"
                borderColor="purple.400"
                _hover={{ bg: 'purple.600', color: 'white' }}
                onClick={() => handleCopy(result.correctedText, 'Corrected text')}
              >
                Copy Text
              </Button>
              <Button
                size="xs"
                variant="outline"
                color="purple.100"
                borderColor="purple.400"
                _hover={{ bg: 'purple.600', color: 'white' }}
                onClick={() =>
                  handleCopy(result.markdownText, 'Markdown with bold')
                }
              >
                Copy **Bold**
              </Button>
            </HStack>
          )}
        </Flex>

        {/* Main Corrected Output Container */}
        <Box
          bg="purple.900"
          borderWidth="1px"
          borderColor="purple.500"
          borderRadius="md"
          padding={4}
          minHeight="210px"
          fontSize="md"
          lineHeight="tall"
          whiteSpace="pre-wrap"
        >
          {isLoading ? (
            <SkeletonText
              mt="2"
              noOfLines={6}
              spacing="4"
              skeletonHeight="3"
              startColor="purple.700"
              endColor="purple.500"
            />
          ) : result ? (
            <Text as="div" color="purple.50">
              {result.segments.map((segment) => {
                if (!segment.isCorrected) {
                  return (
                    <Text as="span" key={segment.id}>
                      {segment.text}
                    </Text>
                  )
                }

                const tooltipLabel = segment.original
                  ? `"${segment.original}" → "${segment.text}" (${segment.category})`
                  : segment.explanation

                return (
                  <Tooltip
                    key={segment.id}
                    label={tooltipLabel}
                    hasArrow
                    placement="top"
                    bg="gray.900"
                    color="white"
                    fontSize="xs"
                  >
                    <Text
                      as="strong"
                      fontWeight="extrabold"
                      color="white"
                      bg="whiteAlpha.200"
                      px={1.5}
                      py={0.5}
                      borderRadius="sm"
                      borderBottom="2px solid"
                      borderColor="green.300"
                      cursor="help"
                    >
                      {segment.text}
                    </Text>
                  </Tooltip>
                )
              })}
            </Text>
          ) : (
            <Text color="purple.300" fontSize="sm">
              Corrected output will appear here.
            </Text>
          )}
        </Box>

        {/* Corrections Breakdown List */}
        {result && !isLoading && (
          <Box marginTop={4}>
            <Divider borderColor="purple.600" marginBottom={3} />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Text fontSize="xs" fontWeight="semibold" color="purple.200">
                {result.correctionCount > 0
                  ? 'Applied Corrections (Hover bold words above or review below)'
                  : 'Your English text looks grammatically sound!'}
              </Text>
              <Text fontSize="xs" color="purple.300">
                {result.engineUsed} • {result.durationMs}ms
              </Text>
            </Flex>

            {result.corrections.length > 0 && (
              <VStack
                spacing={2}
                align="stretch"
                maxHeight="190px"
                overflowY="auto"
                pr={1}
              >
                {result.corrections.map((item) => (
                  <CorrectionItem key={item.id} item={item} />
                ))}
              </VStack>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default OutputPanel

