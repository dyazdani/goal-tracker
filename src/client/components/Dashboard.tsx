import { Box } from "@chakra-ui/react";
import RightDrawer from "./RightDrawer.js";
import UpdateHabitButton from "./UpdateHabitButton.js";
import ToggleButton from "./ToggleButton.js";
import { 
    useGetHabitsByUserQuery, 
    useGetHabitByIdQuery 
} from "../features/api.js";
import { useAppSelector } from "../app/hooks.js";

const Dashboard = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  // TODO: Will need to remove habit variable when cleaning up code and finalizing dshboard
  let habits;
  let habit
  if (currentUser) {
    const { data } = useGetHabitsByUserQuery(currentUser.id);
    habits = data?.habits || [];
    
    const { data: habitData } = useGetHabitByIdQuery({
        id: 2,
        habitId: 5
    })
    habit = habitData?.habit

    console.log(habit)
  }

    return (
        <Box
            as="div"
            h="100vh"
            w="100vw"
        >
          {habits &&
        habits.map((habit) => (
          <div key={habit.id}>
            
            <p>{habit.name}</p>
            {habit.checkIn && (
            <p>Check in day: {habit.checkIn.dayOfTheWeek}</p>
          )}
          </div>
        ))}
            <RightDrawer />
            {/* <UpdateHabitButton/> */}
        </Box>
    )
}

export default Dashboard;
