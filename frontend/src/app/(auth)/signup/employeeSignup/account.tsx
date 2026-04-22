import { Platform, StyleSheet } from 'react-native';
import { Chevron, Header, Screen, TextField } from '@/ui';
import { AuthForm } from '@/features';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSignup } from '@/hooks';

export default function SignUp() {
  const router = useRouter();
  const { data, updateSignupData } = useSignup();
  const [confirmPassword, setConfirmPassword] = useState('');
  const stepEmployee = () => {
    // ensure fields are not blank
    const isBlank = (str: string) => str.trim().length === 0;
    if (isBlank(data.user) || isBlank(data.password)) {
      alert('Please fill out all fields with valid information.');
    }
    // ensure password and confirm password match
    else if (data.password !== confirmPassword) {
      alert('Confirm password does not match');
    }
    // navigate to business screen
    else {
      router.push('/signup/employeeSignup/business');
    }
  };

  return (
    <Screen insetTop>
      <Header
        title="Account Info"
        left={<Chevron direction="left" onPress={() => router.back()} />}
        style={styles.header}
      />
      <AuthForm onSubmit={stepEmployee} buttonText="Continue to Business Info">
        <TextField
          label={'Username'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="TheRealRonDon"
          onChangeText={(text) => updateSignupData({ user: text })}
          value={data.user}
        />
        <TextField
          label={'Password'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="reallyStrongPassword123"
          secureTextEntry={true}
          onChangeText={(text) => updateSignupData({ password: text })}
          value={data.password}
        />
        <TextField
          label={'Confirm Password'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="reallyStrongPassword123"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
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
