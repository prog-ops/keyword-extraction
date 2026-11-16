import { useMemo } from 'react'
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Switch,
  Text,
  Textarea,
  Tooltip,
  useToast,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { SAMPLE_TEXTS } from '@/config/constants'

const Input = ({
  text,
  onChangeText,
  localOnly = false,
  onToggleLocalOnly,
  onStart,
  onReset,
  isLoading = false,
  isSplit = false,
}) => {
  const toast = useToast()

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/).length : 0
    const chars = text.length
    return { words, chars }
  }, [text])

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast({
        title: 'Kolom teks tidak boleh kosong',
        description:
          'Ketik atau paste teks bahasa Inggris terlebih dahulu sebelum menekan Start.',
        status: 'error',
        duration: 3500,
        isClosable: true,
        position: 'top',
      })
      return
    }

    await onStart(text)
  }

  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Box
      bg="purple.800"
      borderWidth="1px"
      borderColor="purple.500"
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
          <Text fontWeight="semibold" fontSize="sm" color="purple.100">
            Original English Text
          </Text>
          <HStack spacing={3} fontSize="xs" color="purple.200">
            <Text>{stats.words} words</Text>
            <Text>•</Text>
            <Text>{stats.chars} chars</Text>
          </HStack>
        </Flex>

        <Wrap spacing={2} marginBottom={3}>
          <WrapItem alignItems="center">
            <Text fontSize="xs" color="purple.200" mr={1}>
              Try sample:
            </Text>
          </WrapItem>
          {SAMPLE_TEXTS.map((sample) => (
            <WrapItem key={sample.id}>
              <Button
                size="xs"
                variant="outline"
                colorScheme="purple"
                color="purple.100"
                borderColor="purple.400"
                _hover={{ bg: 'purple.600', color: 'white' }}
                onClick={() => onChangeText(sample.text)}
              >
                {sample.label}
              </Button>
            </WrapItem>
          ))}
        </Wrap>

        <Textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or paste English sentences here (e.g., 'i goes to school yesterday and recieve many informations...')"
          color="white"
          _placeholder={{ color: 'purple.200' }}
          padding={4}
          minHeight={isSplit ? '260px' : '210px'}
          bg="purple.900"
          borderColor="purple.500"
          _hover={{ borderColor: 'purple.300' }}
          _focus={{
            borderColor: 'purple.200',
            boxShadow: '0 0 0 1px var(--chakra-colors-purple-200)',
          }}
          fontSize="md"
          lineHeight="tall"
          resize="vertical"
        />

        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginTop={3}
          flexWrap="wrap"
          gap={2}
        >
          <Tooltip
            label={
              localOnly
                ? '100% offline: text never leaves your browser.'
                : 'Hybrid mode: combines local rules with LanguageTool public API (auto-falls back offline).'
            }
            hasArrow
            placement="top"
            bg="gray.900"
            color="white"
            fontSize="xs"
          >
            <FormControl display="flex" alignItems="center" width="auto">
              <Switch
                id="local-only-toggle"
                size="sm"
                colorScheme="green"
                isChecked={localOnly}
                onChange={(e) => onToggleLocalOnly?.(e.target.checked)}
                mr={2}
              />
              <FormLabel
                htmlFor="local-only-toggle"
                mb="0"
                fontSize="xs"
                color="purple.100"
                cursor="pointer"
                userSelect="none"
              >
                Local-Only Mode
              </FormLabel>
            </FormControl>
          </Tooltip>

          <Badge
            colorScheme={localOnly ? 'green' : 'purple'}
            variant="subtle"
            fontSize="0.65rem"
            px={2}
            py={0.5}
            borderRadius="full"
          >
            {localOnly ? 'Offline • Private' : 'Hybrid • Local + API'}
          </Badge>
        </Flex>
      </Box>

      <HStack spacing={3} marginTop={4}>
        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          loadingText="Checking Grammar..."
          color="white"
          width="100%"
          size="lg"
          bg="purple.500"
          _hover={{ bg: 'purple.400' }}
          _active={{ bg: 'purple.600' }}
          fontWeight="bold"
          boxShadow="md"
        >
          Start
        </Button>

        {isSplit && (
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            color="purple.100"
            borderColor="purple.400"
            _hover={{ bg: 'purple.700', color: 'white' }}
            flexShrink={0}
          >
            Reset
          </Button>
        )}
      </HStack>
    </Box>
  )
}

export default Input
