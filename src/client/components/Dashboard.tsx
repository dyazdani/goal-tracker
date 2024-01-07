import { Box } from "@chakra-ui/react";
import RightDrawer from "./RightDrawer.js";
import MyHabits from "./MyHabits.js";

const Dashboard = () => {
  return (
    <>
      <RightDrawer />
      <Box as="div" 
      w="100vw"
      >
        <MyHabits />
      </Box>
    </>
  );
};

export default Dashboard;
