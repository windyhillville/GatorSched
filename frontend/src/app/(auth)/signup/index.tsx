import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button, Chevron, Header, Screen } from '@/ui';
import { useRouter } from 'expo-router';
import { useSignup } from '@/hooks';

export default function SignUp() {
  const router = useRouter();
  const { updateSignupData } = useSignup();

  const handleSelectRole = (job: 'employee' | 'manager') => {
    updateSignupData({ usage: job });
    router.push(
      job === 'employee' ? '/signup/employeeSignup/personal' : '/signup/managerSignup/personal',
    );
  };

  return (
    <Screen insetTop>
      <Header
        title="Create Account"
        left={<Chevron direction="left" onPress={() => router.back()} />}
        style={styles.header}
      />
      <View style={styles.buttonWrapper}>
        <Text style={styles.text}>Who are you?</Text>
        <View style={styles.buttonContainer}>
          <Button title="Employee" onPress={() => handleSelectRole('employee')} />
          <Button title="Manager" onPress={() => handleSelectRole('manager')} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        paddingTop: 25,
      },
      android: {
        paddingTop: 40,
      },
    }),
  },
  text: {
    fontSize: 30,
  },
  buttonWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 280,
    gap: 30,
    ...Platform.select({
      ios: {
        paddingBottom: 40,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },
});
