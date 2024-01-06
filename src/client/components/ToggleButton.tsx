import { 
    Button,
    Box,
    useBoolean
 } from "@chakra-ui/react";
 import isDateToday from "../../utils/isDateToday.js";

 export interface ToggleButtonProps {
    date: Date
 }

const ToggleButton = ({date}: ToggleButtonProps) => {
    const [flag, setFlag] = useBoolean();

    const isToday = isDateToday(date);
    const outlineColor = isToday ? ".3vw solid purple" : ".3vw solid black";

    return (
        <Box>
            <Button
        onClick={setFlag.toggle}
        w="1.5vw"
        h="1.5vw"
        minW="1.5vw"
        px="0"
        border="2px solid white"
        borderRadius="50%"
        outline={outlineColor}
        backgroundColor="white"
        colorScheme="teal"
        top="50px"
        left="50px"
        >
            { flag && <Box 
                position="absolute"
                w="1.2vw"
                h="1.2vw"
                minW="1.2vw"
                top="50%"
                left= "50%"
                transform="translate(-50%, -50%)"
                backgroundColor="teal"
                borderRadius="50%"
            /> }

        </Button>
        </Box>
        
        
    )

}

export default ToggleButton;