import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Input from '@/components/Input'
import OutputPanel from '@/components/OutputPanel'
import { useGrammarChecker } from '@/hooks/useGrammarChecker'

const MotionBox = motion(Box)

const App = () => {
  const {
    text,
    setText,
    localOnly,
    setLocalOnly,
    isSplit,
    isLoading,
    result,
    startCheck,
    resetWorkspace,
  } = useGrammarChecker()

  return (
    <Box
      bgGradient="linear(to-b, purple.700, purple.900)"
      color="white"
      minHeight="100vh"
      paddingTop={{ base: 8, md: isSplit ? 10 : 20 }}
      paddingBottom={8}
      paddingX={4}
      transition="padding-top 0.3s ease"
    >
      <Container
        maxW={isSplit ? '7xl' : '3xl'}
        centerContent
        transition="max-width 0.35s ease"
      >
        <Header isSplit={isSplit} />

        <SimpleGrid
          columns={{ base: 1, lg: isSplit ? 2 : 1 }}
          spacing={6}
          width="100%"
          alignItems="stretch"
        >
          <MotionBox
            layout
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            display="flex"
          >
            <Input
              text={text}
              onChangeText={setText}
              localOnly={localOnly}
              onToggleLocalOnly={setLocalOnly}
              onStart={startCheck}
              onReset={resetWorkspace}
              isLoading={isLoading}
              isSplit={isSplit}
            />
          </MotionBox>

          <AnimatePresence mode="wait">
            {isSplit && (
              <MotionBox
                key="output-pane"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                display="flex"
              >
                <OutputPanel result={result} isLoading={isLoading} />
              </MotionBox>
            )}
          </AnimatePresence>
        </SimpleGrid>

        <Footer />
      </Container>
    </Box>
  )
}

export default App
