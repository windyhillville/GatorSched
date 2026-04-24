import { AuthForm } from '@/features';
import { useAuth } from '@/hooks';
import { login } from '@/services';
import { Colors } from '@/styles/colors';
import { Header, Screen, TextField } from '@/ui';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

  async function handleLogin() {
    try {
      const response = await login({ email: email, password: password });

      logIn({ accessToken: response.accessToken, user: response.user });
    } catch (err) {
      console.error(err);
    }
    // if (true) {
    //   logIn();
    // } else {
    //   alert('Invalid username / password');
    // }
  }

  return (
    <Screen insetTop>
      <Header title="GatorSched" style={styles.header} />

      <AuthForm onSubmit={handleLogin} buttonText="Log In">
        <TextField
          label={'Email'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="rdon@gmail.com"
          onChangeText={setEmail}
          value={email}
        />
        <TextField
          label={'Password'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="reallyStrongPassword123"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </AuthForm>
      <View style={styles.linksContainer}>
        <Link href="/(auth)/signup" asChild>
          <Text style={styles.link}>Create Account</Text>
        </Link>

        {/* <Link href="/(auth)/forgotpassword" asChild>
          <Text style={styles.link}>Forgot password?</Text>
        </Link> */}
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
  linksContainer: {
    marginBottom: 60,
    alignItems: 'center',
    gap: 20,
  },
  link: {
    color: Colors.textSecondary,
    fontSize: 20,
  },
});
