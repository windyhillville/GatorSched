import { Platform, StyleSheet } from 'react-native';
import { Chevron, Header, Screen, TextField } from '@/ui';
import { AuthForm } from '@/features';
import { useRouter } from 'expo-router';
import { useAuth, useSignup } from '@/hooks';

export default function SignUp() {
  const router = useRouter();
  const { data, updateSignupData } = useSignup();
  const { logIn } = useAuth();
  const createAccount = () => {
    // ensure fields are not blank
    const isBlank = (str: string) => str.trim().length === 0;
    if (isBlank(data.business) || isBlank(data.location) || isBlank(data.role)) {
      alert('Please fill out all fields with valid information.');
    }
    // create account and log in
    else {
      // update manager role
      updateSignupData({ role: 'manager' });

      // logic for creating account

      // log in
      logIn();
    }
  };

  return (
    <Screen insetTop>
      <Header
        title="Business Info"
        left={<Chevron direction="left" onPress={() => router.back()} />}
        style={styles.header}
      />
      <AuthForm onSubmit={createAccount} buttonText="Create Account">
        <TextField
          label={'Business Name'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="John's Bar & Grill"
          onChangeText={(text) => updateSignupData({ business: text })}
          value={data.business}
        />
        <TextField
          label={'Business Location'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="222 Primary Rd, Spot, NC 112233"
          onChangeText={(text) => updateSignupData({ location: text })}
          value={data.location}
        />
      </AuthForm>
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
});
