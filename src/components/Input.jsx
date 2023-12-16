import {useState} from "react";
import {Button, Textarea} from "@chakra-ui/react";

const Input = () => {
  const [text, setText] = useState('');

  const submit = () => {
    console.log(text)
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
