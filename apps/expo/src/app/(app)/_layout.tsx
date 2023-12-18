import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/context/AuthContext';
import { PatientProvider } from '@/context/PatientContext';
import { palette } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  const { isLoading, patientId } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!patientId) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <PatientProvider patientId={patientId}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarStyle: { backgroundColor: palette.coolGray[700] },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={32}
                color={focused ? palette.pink[300] : palette.coolGray[300]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="chatbox-ellipses"
                size={32}
                color={focused ? palette.pink[300] : palette.coolGray[300]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="calendar"
                size={32}
                color={focused ? palette.pink[300] : palette.coolGray[300]}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-circle"
                size={32}
                color={focused ? palette.pink[300] : palette.coolGray[300]}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar />
    </PatientProvider>
  );
}
