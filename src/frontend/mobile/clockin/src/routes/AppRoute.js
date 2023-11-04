import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Paychecks from "../pages/Paychecks";
import Paycheck from "../pages/Paycheck";
import TimeLogs from "../pages/TimeLogs";
import Home from "../pages/Home";
import User from "../pages/User";
import { AuthenticationProvider } from "../hooks/useAuthentication";

const Stack = createNativeStackNavigator();
export default function AppRoute() {
  return (
    <AuthenticationProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Paychecks" component={Paychecks} />
          <Stack.Screen name="Paycheck" component={Paycheck} />
          <Stack.Screen name="TimeLogs" component={TimeLogs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticationProvider>
  );
}
