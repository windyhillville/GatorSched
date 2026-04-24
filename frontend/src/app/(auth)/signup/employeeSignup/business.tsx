import { AuthForm } from '@/features';
import { useAuth, useSignup } from '@/hooks';
import { createEmployeeAccount, login } from '@/services';
import { Chevron, Header, Screen, TextField } from '@/ui';
import { useRouter } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

export default function SignUp() {
  const router = useRouter();
  const { data, resetSignup, updateSignupData } = useSignup();
  const { logIn } = useAuth();

  async function createAccount() {
    // ensure fields are not blank
    const isBlank = (str: string) => str.trim().length === 0;

    if (isBlank(data.business) || isBlank(data.location) || isBlank(data.role)) {
      alert('Please fill out all fields with valid information.');
      return;
    }

    try {
      const accountCreationResponse = await createEmployeeAccount({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        avatarUrl: null,
        roleName: data.role,
      });

      if (!accountCreationResponse.success) {
        throw new Error('Failed to create employee account');
      }

      const loginResponse = await login({ email: data.email, password: data.password });
      logIn({ accessToken: loginResponse.accessToken, user: loginResponse.user });

      resetSignup();
    } catch (err) {
      console.error(err);
    }
  }

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
        <TextField
          label={'Role'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="Server"
          onChangeText={(text) => updateSignupData({ role: text })}
          value={data.role}
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
