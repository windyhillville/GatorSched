import { useEffect } from 'react';

import { useRouter } from 'expo-router';

import { useAuth } from '@/hooks';

import { View } from 'react-native';

export default function Index() {
  const { isLoggedIn, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/(auth)');

      return;
    }

    if (user?.accessLevel === 'manager') {
      router.replace('/(tabs)/(manager)/scheduler');
    } else {
      router.replace('/(tabs)/(employee)/schedule');
    }
  }, [isLoggedIn, user]);

  return <View />; // blank screen while redirecting
}

// import { Screen } from '@/ui';
// import { Link } from 'expo-router';
// import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { useAuth } from '@/hooks';

// export default function Index() {
//   const { logOut } = useAuth();

//   return (
//     <>
//       <Screen centered insetBottom={false}>
//         <View style={styles.buttonsContainer}>
//           <Link href="/(tabs)/(employee)/schedule" asChild>
//             <Pressable style={styles.employeeButton}>
//               <Text>Go to Employee App</Text>
//             </Pressable>
//           </Link>
//           <Link href="/(tabs)/(manager)/scheduler" asChild>
//             <Pressable style={styles.managerButton}>
//               <Text>Go to Manager App</Text>
//             </Pressable>
//           </Link>

//           <Pressable style={styles.authButton} onPress={logOut}>
//             <Text>Log Out</Text>
//           </Pressable>
//         </View>
//       </Screen>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   employeeButton: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 32,
//     paddingHorizontal: 8,
//     borderRadius: 16,
//     backgroundColor: 'pink',
//   },
//   managerButton: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 32,
//     paddingHorizontal: 8,
//     borderRadius: 16,
//     backgroundColor: 'lightgreen',
//   },
//   buttonsContainer: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     width: '80%',
//     height: '80%',
//     gap: 32,
//   },
//   authButton: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 32,
//     paddingHorizontal: 8,
//     borderRadius: 16,
//     backgroundColor: 'lightblue',
//   },
// });
