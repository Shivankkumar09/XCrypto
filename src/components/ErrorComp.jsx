import { Alert, AlertIcon } from "@chakra-ui/react"


const ErrorComp = ({message}) => {
  return <Alert status="error" position={"fixed"} bottom={"8"} left={"50%"} transform={"translate(-50%)"}
  w={"container.lg"}>
    <AlertIcon />
    {message}
  </Alert>
}

export default ErrorComp