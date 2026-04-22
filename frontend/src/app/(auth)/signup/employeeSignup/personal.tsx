import { Platform, StyleSheet } from 'react-native';
import { Chevron, Header, Screen, TextField } from '@/ui';
import { AuthForm } from '@/features';
import { useRouter } from 'expo-router';
import { useSignup } from '@/hooks';

export default function SignUp() {
  const router = useRouter();
  const { data, updateSignupData } = useSignup();
  const stepEmployee = () => {
    // ensure fields are not blank
    const isBlank = (str: string) => str.trim().length === 0;
    if (isBlank(data.name) || isBlank(data.dob) || isBlank(data.phone) || isBlank(data.email)) {
      alert('Please fill out all fields with valid information.');
    }
    // navigate to account screen
    else {
      router.push('/signup/employeeSignup/account');
    }
  };

  return (
    <Screen insetTop>
      <Header
        title="Personal Info"
        left={<Chevron direction="left" onPress={() => router.back()} />}
        style={styles.header}
      />
      <AuthForm onSubmit={stepEmployee} buttonText="Continue to Account Info">
        <TextField
          label={'Legal Name'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={50}
          placeholder="Ron Don"
          onChangeText={(text) => updateSignupData({ name: text })}
          value={data.name}
        />
        <TextField
          label={'Date of Birth'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={20}
          placeholder="01/01/1990"
          onChangeText={(text) => updateSignupData({ dob: text })}
          value={data.dob}
        />
        <TextField
          label={'Phone Number'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={20}
          placeholder="(123) 456-7890"
          onChangeText={(text) => updateSignupData({ phone: text })}
          value={data.phone}
        />
        <TextField
          label={'Email Address'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={50}
          placeholder="rdon@gmail.com"
          onChangeText={(text) => updateSignupData({ email: text })}
          value={data.email}
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
