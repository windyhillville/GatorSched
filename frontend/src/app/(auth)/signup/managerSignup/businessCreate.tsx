import { AuthForm } from '@/features';
import { useAuth, useSignup } from '@/hooks';
import { createManagerAccount, login } from '@/services';
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

    if (isBlank(data.business) || isBlank(data.location) || isBlank(data.rolesRaw)) {
      alert('Please fill out all fields with valid information.');
      return;
    }

    // convert comma separated string into a list
    const rolesArray = data.rolesRaw
      .split(',')
      .map((role) => role.trim())
      .filter((role) => role !== '');

    // update manager role
    updateSignupData({ role: 'manager', roles: rolesArray });

    try {
      const accountCreationResponse = await createManagerAccount({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        avatarUrl: null,
        roles: rolesArray,
      });

      if (!accountCreationResponse.success) {
        throw new Error('Failed to create business account');
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
      <AuthForm onSubmit={createAccount} buttonText="Create Business & Account">
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
          label={'List the Roles'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="Server, Cook, Host, ..."
          onChangeText={(text) => updateSignupData({ rolesRaw: text })}
          value={data.rolesRaw}
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
