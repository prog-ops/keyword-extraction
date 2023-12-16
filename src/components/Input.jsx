import {useState} from "react";
import {Button, Textarea, useToast} from "@chakra-ui/react";

const Input = ({ extract }) => {
  const [text, setText] = useState('');

  const toast = useToast()

  const submit = () => {
    if (text === '') {
      toast({
        title: 'Kolom teks tidak boleh kosong',
        description: 'Ketik atau paste teks untuk mengekstrak keywords',
        status: 'error',
        duration: 4_000,
        isClosable: false,
      });
    } else {
      extract(text)
      console.log(text)
    }
  }

  return (
      <>
        <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            color='white'
            padding={4}
            marginTop={6}
            height={200}
            bg='purple.400'
        />
        <Button
            onClick={submit}
            color='white'
            marginTop={4}
            width='100%'
            _hover={{ bg: 'purple.700' }}
            bg='purple.500'>
          Extract!
        </Button>
      </>
  )
}
export default Input
