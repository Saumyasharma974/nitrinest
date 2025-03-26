import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1f2937, #4b5563);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 1100px;
  background: rgba(31, 41, 55, 0.95);
  border-radius: 1rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  color: #fff;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  color: #10b981;
  margin-bottom: 1.5rem;
`;

const SubTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: #10b981;
  margin-bottom: 1rem;
`;

const Form = styled(motion.form)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  background: #1f2937;
  border: 1px solid #374151;
  color: #fff;
  border-radius: 0.375rem 0 0 0.375rem;
  outline: none;
  width: 200px;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background: ${(props) => props.bg || "#10b981"};
  color: #fff;
  border: none;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: ${(props) => props.hover || "#059669"};
  }
`;

const Section = styled(motion.div)`
  background: #374151;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Box = styled(motion.div)`
  border: 1px solid #4b5563;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #1f2937;
`;

// Static plans for different BMI ranges
const mealPlans = {
  underweight: {
    morning: "Banana smoothie with peanut butter",
    afternoon: "Avocado toast with eggs",
    evening: "Nut butter sandwich",
    dinner: "Pasta with creamy sauce",
  },
  normal: {
    morning: "Oatmeal with fruits and nuts",
    afternoon: "Grilled chicken salad with quinoa",
    evening: "Veggie wrap with hummus",
    dinner: "Steamed fish with mixed vegetables",
  },
  overweight: {
    morning: "Green smoothie with spinach",
    afternoon: "Quinoa salad with grilled vegetables",
    evening: "Mixed vegetable soup",
    dinner: "Baked salmon with steamed broccoli",
  },
};

const workoutPlans = {
  underweight: {
    Monday: "Light strength training (focus on form)",
    Tuesday: "Yoga and stretching",
    Wednesday: "Pilates session",
    Thursday: "Rest day",
    Friday: "Strength training focusing on lower body",
    Saturday: "Light cardio (walking or cycling)",
    Sunday: "Rest day",
  },
  normal: {
    Monday: "30 min cardio + stretching",
    Tuesday: "Upper body strength training",
    Wednesday: "Yoga and core exercises",
    Thursday: "HIIT session (20 min)",
    Friday: "Lower body strength training",
    Saturday: "Pilates or moderate cardio",
    Sunday: "Rest and recovery",
  },
  overweight: {
    Monday: "30 min brisk walking",
    Tuesday: "Low-impact aerobics",
    Wednesday: "Swimming",
    Thursday: "Cycling (light to moderate)",
    Friday: "Yoga for flexibility",
    Saturday: "Interval walking",
    Sunday: "Rest day",
  },
};

// Function to select plan based on BMI
const getPlanByBmi = (bmi) => {
  if (bmi < 18.5) {
    return { meals: mealPlans.underweight, workouts: workoutPlans.underweight };
  } else if (bmi < 25) {
    return { meals: mealPlans.normal, workouts: workoutPlans.normal };
  } else {
    return { meals: mealPlans.overweight, workouts: workoutPlans.overweight };
  }
};

// Function to get a time-based greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  else if (hour < 18) return "Good Afternoon";
  else return "Good Evening";
};

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bmi, setBmi] = useState(null);
  const [plan, setPlan] = useState(null);
  const [manualBmi, setManualBmi] = useState("");
  const [waterIntake, setWaterIntake] = useState(0);
  const [calorieIntake, setCalorieIntake] = useState(0);
  const [newWater, setNewWater] = useState("");
  const [newCalories, setNewCalories] = useState("");

  // Calculate BMI from backend data on mount or when user changes
  useEffect(() => {
    if (user && user.weight && user.height) {
      const heightInMeters = user.height / 100;
      const calculatedBmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(calculatedBmi);
      setPlan(getPlanByBmi(parseFloat(calculatedBmi)));
    }
  }, [user]);

  const updatePlan = (newBmi) => {
    const parsedBmi = parseFloat(newBmi);
    if (!isNaN(parsedBmi)) {
      setBmi(parsedBmi.toFixed(1));
      setPlan(getPlanByBmi(parsedBmi));
    }
  };

  const handleBmiUpdate = (e) => {
    e.preventDefault();
    updatePlan(manualBmi);
    setManualBmi("");
  };

  const handleWaterUpdate = (e) => {
    e.preventDefault();
    if (!isNaN(newWater) && newWater > 0) {
      setWaterIntake((prev) => prev + parseFloat(newWater));
      setNewWater("");
    }
  };

  const handleCalorieUpdate = (e) => {
    e.preventDefault();
    if (!isNaN(newCalories) && newCalories > 0) {
      setCalorieIntake((prev) => prev + parseFloat(newCalories));
      setNewCalories("");
    }
  };

  return (
    <Container>
      <Card>
        <Title initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Dashboard
        </Title>
        {user ? (
          <>
            <motion.p
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontSize: "1.5rem" }}
            >
              {getGreeting()}, <strong>{user.name}</strong>!
            </motion.p>
            <motion.p
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ fontSize: "1.25rem", color: "#9ca3af" }}
            >
              Your BMI is: {bmi ? bmi : "Calculating..."}
            </motion.p>
            <Form onSubmit={handleBmiUpdate} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={manualBmi}
                onChange={(e) => setManualBmi(e.target.value)}
                placeholder="Enter new BMI"
              />
              <Button type="submit">Update BMI</Button>
            </Form>

            {/* Combined Water & Calorie Intake Section as Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Water Intake */}
              <Section>
                <SubTitle>Water Intake</SubTitle>
                <p style={{ textAlign: "center", fontSize: "1.25rem", color: "#d1d5db" }}>
                  Total: {waterIntake} Liters
                </p>
                <Form onSubmit={handleWaterUpdate}>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={newWater}
                    onChange={(e) => setNewWater(e.target.value)}
                    placeholder="Add water (L)"
                  />
                  <Button type="submit" bg="#3b82f6" hover="#2563eb">
                    Update
                  </Button>
                </Form>
              </Section>

              {/* Calorie Intake */}
              <Section>
                <SubTitle>Calorie Intake</SubTitle>
                <p style={{ textAlign: "center", fontSize: "1.25rem", color: "#d1d5db" }}>
                  Total: {calorieIntake} kcal
                </p>
                <Form onSubmit={handleCalorieUpdate}>
                  <Input
                    type="number"
                    min="0"
                    value={newCalories}
                    onChange={(e) => setNewCalories(e.target.value)}
                    placeholder="Add calories"
                  />
                  <Button type="submit" bg="#ef4444" hover="#dc2626">
                    Update
                  </Button>
                </Form>
              </Section>
            </motion.div>

            {/* Daily Meal Plan Section */}
            <Section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.6 }}>
              <SubTitle>Daily Meal Plan</SubTitle>
              {plan && plan.meals ? (
                <Grid>
                  {Object.entries(plan.meals).map(([mealTime, mealDescription]) => (
                    <Box key={mealTime} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#10b981", textTransform: "capitalize", marginBottom: "0.5rem" }}>
                        {mealTime}
                      </h3>
                      <p style={{ color: "#d1d5db", fontSize: "1rem" }}>{mealDescription}</p>
                    </Box>
                  ))}
                </Grid>
              ) : (
                <p style={{ textAlign: "center", color: "#9ca3af" }}>No meal recommendations available.</p>
              )}
            </Section>

            {/* Weekly Workout Plan Section */}
            <Section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.75, duration: 0.6 }}>
              <SubTitle>Weekly Workout Plan</SubTitle>
              {plan && plan.workouts ? (
                <Grid>
                  {Object.entries(plan.workouts).map(([day, workout]) => (
                    <Box key={day} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#10b981", marginBottom: "0.5rem" }}>{day}</h3>
                      <p style={{ color: "#d1d5db", fontSize: "1rem" }}>{workout}</p>
                    </Box>
                  ))}
                </Grid>
              ) : (
                <p style={{ textAlign: "center", color: "#9ca3af" }}>No workout recommendations available.</p>
              )}
            </Section>
          </>
        ) : (
          <p className="text-center text-gray-400">Please login to see your dashboard details.</p>
        )}
      </Card>
    </Container>
  );
}

export default Dashboard;
