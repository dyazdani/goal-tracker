import { 
    CloseIcon, 
    HamburgerIcon 
} from "@chakra-ui/icons";
import { 
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Badge,
    Box,
    Button,
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Flex, 
    HStack, 
    Heading, 
    Menu,
    MenuButton,
    MenuList,
    Spacer,
    Text
} from "@chakra-ui/react";
import HabitCard from "./HabitCard.js";
import { MilestoneWithDetails } from "../../types/index.js";
import UpdateMilestoneButton from "./UpdateMilestoneButton.js";
import DeleteMilestoneButton from "./DeleteMilestoneButton.js";
import CompleteMilestoneButton from "./CompleteMilestoneButton.js";
import CancelMilestoneButton from "./CancelMilestoneButton.js";
import CreateHabitButton from "./CreateHabitButton.js";
import areDatesSameDayMonthYear from "../utils/areDatesSameDayMonthYear.js";

export interface MilestoneProps {
    milestone: MilestoneWithDetails
}

const Milestone = ({milestone}: MilestoneProps) => {


    return (
        <Card
        w="50vw"
        minW="570px"
        bg={
            milestone.isCompleted ? "rgba(249, 199, 64, 0.4)" :
            milestone.isCanceled ? "rgba(212, 211, 212, 1)" :
            `rgb(247, 197, 59)`
        }
        borderRadius="20px"
      >
        <CardHeader>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            gap="1vw"
          >
            <Heading 
                size="xl"
                color={milestone.isCanceled || milestone.isCompleted ? "gray" : ""}
                as="h2"
                textAlign="center"
            >
             {milestone.name}
            </Heading>
            {
                areDatesSameDayMonthYear(new Date(), new Date(milestone.dueDate)) ? 
                <Text 
                    textAlign="center" 
                    fontSize="lg"
                >
                    Due {new Date(milestone.dueDate).toLocaleDateString()} <Badge colorScheme="yellow" variant="solid">TODAY!</Badge>
                </Text> : 
                new Date().getTime() > new Date(milestone.dueDate).setHours(23, 59, 59, 999) ?
                <Text  
                    textAlign="center"
                    fontSize="lg"
                >
                    Due {new Date(milestone.dueDate).toLocaleDateString()} <Badge colorScheme="red" variant="solid">OVERDUE!</Badge>
                </Text> : 
                <Text 
                    textAlign="center"
                    fontSize="lg"
                >
                    Due {new Date(milestone.dueDate).toLocaleDateString()}
                </Text>
            }
            <Spacer
                minWidth="20px"
            />
            <Menu
                isLazy
                closeOnSelect={false}
                closeOnBlur={false}
            >
                {({ isOpen }) => 
                    <>
                        <MenuButton
                            as={Button}
                            aria-label="Open Goal options menu"
                            rightIcon={isOpen ? <CloseIcon/> :<HamburgerIcon/>}
                            variant={isOpen ? "solid" : "outline"}
                            colorScheme="blue"
                            flexShrink="0"
                            isActive={isOpen}
                        >Menu</MenuButton>
                        <MenuList>
                            <UpdateMilestoneButton milestone={milestone}/>
                            <DeleteMilestoneButton milestone={milestone}/>
                            <CancelMilestoneButton milestone={milestone}/>
                        </MenuList>
                    </>
                }
            </Menu>
            <CompleteMilestoneButton
                milestone={milestone}
            />
          </Flex>
        </CardHeader>
        <Flex 
            direction={"column"} 
            align={"center"}
            >
          <CardBody>
            {
                milestone.habits.length ?
                <Heading 
                    as="h3"
                    size="lg"
                    mb=".5vw"
                >
                    Habits
                </Heading> : 
                ""
            }
            
            {
                !milestone.habits.length ?
                <Text fontSize="xl">You currently have no Habits for this Goal.</Text> : 
                ""
              }
            <Accordion
                allowMultiple
            >
                {[...milestone.habits].sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
                    .map(habit => {
                    return (
                        <AccordionItem
                            key={habit.id}
                            bgColor={"rgba(255, 255, 255, .2)"}
                            border="none"
                            width="42vw"
                            minWidth="450px"
                            mb=".5vw"
                        >
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                    <AccordionButton>
                                        <Box 
                                            as="span" 
                                            flex='1' 
                                            textAlign='left'
                                            color={milestone.isCanceled || milestone.isCompleted ? "gray" : ""}
                                        >
                                            {isExpanded ? "" : habit.name}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <HabitCard 
                                            habit={habit}
                                            milestone={milestone}
                                        />
                                    </AccordionPanel>
                                </>
                            )}    
                </AccordionItem>
                    )
                })}     
            </Accordion>
          </CardBody>
          <CardFooter>
            <CreateHabitButton milestone={milestone}/>
          </CardFooter>
        </Flex>
      </Card>
    )
}

export default Milestone;