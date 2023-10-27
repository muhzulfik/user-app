import { Box, Center, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer, 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import Nav from './Component/Organism/Navbar'
import Footer from './Component/Organism/Footer'
import { useEffect, useState } from 'react'
import axiosInstance from './utils/axios'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'

function App() {
  const { register, handleSubmit, reset } = useForm();
  const [dataUser, setDataUser] = useState([]);
  const [dataDetailUser, setDataDetailUser] = useState();
  const [show, setShow] = useState(false);
  const [triggerReq, setTriggerReq] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const onSubmit = (data) => {
    console.log("ini data", data);
    axiosInstance.post('setDataUser', data).then(() => {
      Swal.fire(
        'Success Add Data',
        '',
        'success'
      )
      setTriggerReq(!triggerReq)
      onClose();
      reset();
    })
  }

  const handleDeleteUser = (id) => {
    axiosInstance.delete(`delDataUser/${id}`).then(() => {
      Swal.fire(
        'Success Delete Data',
        '',
        'success'
      )
      setTriggerReq(!triggerReq)
    })
  }

  const handleDetailUser = (id) => {
    axiosInstance.get(`/getDataUser/${id}`).then((res) => {
      setDataDetailUser(res.data)
      console.log("merupakan data detail", res.data)
      onOpenDetail();
    })
  }
  
  useEffect(() => {
    axiosInstance.get('/getDataUser/all').then((res) => {
      setDataUser(res.data)
    })
  } , [triggerReq])

  const handleShowPass = () => setShow(!show)

  return (
    <>
    <Nav />
      <Box minH={"85vh"}>
        <Box marginTop={"10%"}>
          <Center>
          <Button onClick={onOpen}>Open Modal</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <Input placeholder='Nama Lengkap' {...register("namalengkap")}/>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input placeholder='Username' {...register("username")}/>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Password'
                      {...register("password")}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleShowPass}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Input placeholder='Status' {...register("status")}/>
                </FormControl>
                
              </ModalBody>

              <ModalFooter>
                <Button type="button" colorScheme='red' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" variant='solid' colorScheme='blue'>Submit</Button>
              </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          </Center>
        </Box>
        <Box marginTop={"20px"}>
        <Center>
        <TableContainer>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Nama Lengkap</Th>
                <Th>Username</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataUser.map((val) => (
                <>
                <Tr key={val.userid}>
                  <Td>{val.namalengkap}</Td>
                  <Td>{val.username}</Td>
                  <Td>{val.status}</Td>
                  <Td><Button colorScheme='red' variant={"solid"} type='button' onClick={() => handleDeleteUser(val.userid)}>Delete</Button></Td>
                  <Td><Button colorScheme='blue' variant={"solid"} type='button' onClick={() => handleDetailUser(val.userid)}>Detail</Button></Td>
                </Tr>
                </>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Modal isOpen={isOpenDetail} onClose={onCloseDetail}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <Input placeholder='Nama Lengkap' defaultValue={dataDetailUser?.namalengkap} disabled/>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input placeholder='Username' defaultValue={dataDetailUser?.username} disabled/>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Password'
                      defaultValue={dataDetailUser?.password} disabled
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleShowPass}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Input placeholder='Status' defaultValue={dataDetailUser?.status} disabled/>
                </FormControl>
                
              </ModalBody>

              <ModalFooter>
                <Button type="button" colorScheme='red' mr={3} onClick={onCloseDetail}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Center>
        </Box>
      </Box>
    <Footer />
    </>
  )
}

export default App
