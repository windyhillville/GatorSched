import { Platform, StyleSheet, Text, View } from 'react-native';
import { Header, Screen, TextField } from '@/ui';
import { AuthForm } from '@/features';
import { useState } from 'react';
import { Link } from 'expo-router';
import { Colors } from '@/styles/colors';
import { useAuth } from '@/hooks';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

  const handleLogin = () => {
    if (true) {
      logIn();
    } else {
      alert('Invalid username / password');
    }
  };

  return (
    <Screen insetTop>
      <Header title="GatorSched" style={styles.header} />

      <AuthForm onSubmit={handleLogin} buttonText="Log In">
        <TextField
          label={'Username'}
          inputMode="text"
          inputStyleType="text"
          style={{ height: 70 }}
          maxLength={30}
          placeholder="TheRealRonDon"
          onChangeText={setUsername}
          value={username}
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
