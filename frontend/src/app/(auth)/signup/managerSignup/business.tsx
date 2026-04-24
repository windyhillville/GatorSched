import { Button, Chevron, Header, Screen } from '@/ui';
import { useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function SignUp() {
  const router = useRouter();
  const stepJoin = () => {
    // navigate to employee sign up screen
    router.push('/signup/managerSignup/businessJoin');
  };
  const stepCreate = () => {
    // navigate to manager sign up screen
    router.push('/signup/managerSignup/businessCreate');
  };

  return (
    <Screen insetTop>
      <Header
        title="Business Info"
        left={<Chevron direction="left" onPress={() => router.back()} />}
        style={styles.header}
      />
      <View style={styles.buttonWrapper}>
        <Text style={styles.text}>How would you like to proceed?</Text>
        <View style={styles.buttonContainer}>
          <Button title={'Join Existing Business'} onPress={stepJoin} />
          <Button title={'Create New Business'} onPress={stepCreate} />
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
    fontSize: 25,
  },
  buttonWrapper: {
    flex: 1,
    width: '100%',
    // maxWidth: 400,
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
