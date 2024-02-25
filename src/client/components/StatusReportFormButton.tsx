import React, { useState } from 'react';
import { useGetStatusReportsByHabitIdQuery, useSendStatusReportMutation } from '../features/api.js';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Editable, EditableInput, EditablePreview, FormControl, FormLabel, Input, Stack, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { useAppSelector } from '../app/hooks.js';
import { HabitWithDetails } from '../../types/index.js';
import getDefaultStatusReportMessage from '..//utils/getDefaultStatusReportMessage.js';
import getMostRecentCheckInDayDate from '..//utils/getMostRecentCheckInDayDate.js';


export interface StatusReportFormButtonProps {
    habit: HabitWithDetails
}

const StatusReportFormButton = ({habit}: StatusReportFormButtonProps) => {
    const localStorageUser = localStorage.getItem("user")
    const appSelectorUser = useAppSelector(state => state.auth.user)
    const currentUser = localStorageUser ? JSON.parse(localStorageUser) : appSelectorUser
    
    if (currentUser) {
        const [emails, setEmails] = useState<string[]>([])
        const [message, setMessage] = useState(getDefaultStatusReportMessage(habit, currentUser.username))
        const { isOpen, onOpen, onClose } = useDisclosure()
        const inputRef = React.useRef<HTMLInputElement>(null);
        const toast = useToast();

        const [sendStatusReport] = useSendStatusReportMutation();
        
        const checkInDate = getMostRecentCheckInDayDate(habit);

        const handleSubmit = async () => {
            try {
                onClose();
                if (checkInDate) {
                    const response = await sendStatusReport({
                        id: currentUser?.id,
                        habitId: habit.id,
                        user: currentUser?.username,
                        habitName: habit.name,
                        emails,
                        message,
                        checkInDate
                    })
                if (response) {
                    toast({
                        title: 'Status Report Sent.',
                        description: `Your Status Report for ${habit.name} was sent.`,
                        status: 'success',
                        duration: 9000,
                        isClosable: true
                    })
                } else {
                    toast({
                        title: 'Sending Failed',
                        description: `Your Status Report for ${habit.name} failed to send. Please try again.`,
                        status: 'error',
                        duration: 9000,
                        isClosable: true
                    })
                }}
            } catch (error) {
                console.error(error)
            }
            
        }
        
        return (
            <>
            <Button
            variant={'solid'}
            colorScheme="yellow"
            aria-label='send-status-report-form'
            fontSize='20px'
            border="2mm ridge rgba(255,215,0, .6)"
            onClick={(e) => {
                e.preventDefault();
                if (!message) {
                    setMessage(getDefaultStatusReportMessage(habit, currentUser.username))
                }
                onOpen();
            }}
            >
                Send Status Report
            </Button>
            <Drawer 
                placement='right' 
                onClose={onClose} 
                isOpen={isOpen}
                closeOnEsc={false}
                closeOnOverlayClick={false}
                size="md"
                initialFocusRef={inputRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerHeader 
                    borderBottomWidth='1px'
                >
                    Send a Status Report
                </DrawerHeader>
                <DrawerBody>
                    <Stack
                        as="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit()
                        }}
                        id="status-report-form"
                        spacing="3vw"
                    >
                        <Box>
                            <FormControl isRequired>
                                <FormLabel
                                    htmlFor="emails"
                                >
                                    Send Status Report To:
                                </FormLabel>
                                <Input
                                    placeholder="Add emails, e.g., jack@hill.com, jill@hill.com"
                                    isRequired
                                    type="email"
                                    id="emails" 
                                    ref={inputRef}
                                    multiple
                                    onChange={(e) => {setEmails(e.target.value.split(","))}}
                                    value={emails}
                                    />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel
                                    htmlFor='status-report-message'
                                >
                                    Email Body:
                                </FormLabel>
                                <Textarea
                                    isRequired
                                    size="lg"
                                    value={message}
                                    onChange={(e) => {setMessage(e.target.value)}}
                                >

                                </Textarea>
                            </FormControl>
                        </Box>
                    </Stack>
                </DrawerBody>
                <DrawerFooter>
                    <ButtonGroup>
                        <Button 
                            variant="outline" 
                            colorScheme='teal' 
                            mr={3} 
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                setMessage("");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            mr={3}  
                            colorScheme='orange'
                            color="#000000" 
                            type="submit"
                            form="status-report-form"
                        >
                            Send
                        </Button>
                    </ButtonGroup>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
            </>
        )
    }
    
}

export default StatusReportFormButton;