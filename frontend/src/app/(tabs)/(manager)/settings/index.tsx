import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import {
  Avatar,
  ProfileRow,
  Screen,
  Person,
  Clipboard,
  Phone,
  Email,
  Lock,
  EyeOpen,
  EyeShut,
} from '@/ui';
import { useAuth } from '@/hooks';
import { Colors } from '@/styles';
import { getUserInfo, ProfileScreenResponse } from '@/services';

export default function Profile() {
  const { logOut } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState<ProfileScreenResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUserInfo('1');

        setUser(data); // or data.user depending on shape
      } catch (err) {
        setError('Failed to retrieve user information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!user) return null;

  return (
    <Screen style={{ alignItems: 'center' }}>
      {/* Avatar section (still centered) */}
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar img={user.avatarUrl} name={user.name} size="xLarge" color={user.color} />
        </View>

        <View style={styles.largeDivider} />

        {/* Rows container */}
        <View style={styles.rows}>
          <ProfileRow icon={<Person />} label="Name" value={user.name} />
          <ProfileRow icon={<Clipboard />} label="Role" value={user.role} />
          <ProfileRow icon={<Phone />} label="Phone Number" value={user.phone ?? 'Not Provided'} />

          <View style={styles.smallDivider} />

          <ProfileRow icon={<Email />} label="Email Address" value={user.email} />
          <ProfileRow
            icon={<Lock />}
            label="Password"
            value={showPassword ? (user.name ?? 'Not Provided') : '********'}
            rightIcon={
              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOpen /> : <EyeShut />}
              </Pressable>
            }
          />
        </View>

        <View style={styles.largeDivider} />
      </View>

      <View style={styles.linksContainer}>
        <Text style={styles.link} onPress={logOut}>
          Log Out
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  largeDivider: {
    height: 2,
    width: '95%',
    backgroundColor: 'black',
    marginVertical: 16,
  },
  smallDivider: {
    height: 1,
    width: '95%',
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  rows: {
    width: '100%',
    paddingHorizontal: 20,
  },
  linksContainer: {
    marginBottom: 30,
    alignItems: 'center',
    gap: 20,
  },
  link: {
    color: 'black',
    fontSize: 20,
  },
});
