import { Screen } from '@/ui';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <>
      <Screen centered insetBottom={false}>
        <View style={styles.buttonsContainer}>
          <Link href="/(employee)/schedule" asChild>
            <Pressable style={styles.employeeButton}>
              <Text>Go to Employee App</Text>
            </Pressable>
          </Link>
          <Link href="/(manager)/scheduler" asChild>
            <Pressable style={styles.managerButton}>
              <Text>Go to Manager App</Text>
            </Pressable>
          </Link>

          <Link href="/(auth)" asChild>
            <Pressable style={styles.authButton}>
              <Text>Go to Auth</Text>
            </Pressable>
          </Link>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  employeeButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'pink',
  },
  managerButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'lightgreen',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
    height: '80%',
    gap: 32,
  },
  authButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'lightblue',
  },
});
