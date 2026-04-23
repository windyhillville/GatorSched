import { useAuth } from '@/hooks';
import { getUserInfo, ProfileScreenResponse } from '@/services';
import {
  Avatar,
  Clipboard,
  Email,
  EyeOpen,
  EyeShut,
  Lock,
  Person,
  Phone,
  ProfileRow,
  Screen,
} from '@/ui';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  const { logOut, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [userInfo, setUserInfo] = useState<ProfileScreenResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = user?.id;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!currentUserId) return;
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUserInfo(currentUserId);

        setUserInfo(data); // or data.user depending on shape
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

  if (!userInfo) return null;

  return (
    <Screen style={{ alignItems: 'center' }}>
      {/* Avatar section (still centered) */}
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            img={userInfo.avatarUrl}
            name={userInfo.name}
            size="xLarge"
            color={userInfo.color}
          />
        </View>

        <View style={styles.largeDivider} />

        {/* Rows container */}
        <View style={styles.rows}>
          <ProfileRow icon={<Person />} label="Name" value={userInfo.name} />
          <ProfileRow icon={<Clipboard />} label="Role" value={userInfo.role} />
          <ProfileRow
            icon={<Phone />}
            label="Phone Number"
            value={userInfo.phone ?? 'Not Provided'}
          />

          <View style={styles.smallDivider} />

          <ProfileRow icon={<Email />} label="Email Address" value={userInfo.email} />
          <ProfileRow
            icon={<Lock />}
            label="Password"
            value={showPassword ? (userInfo.name ?? 'Not Provided') : '********'}
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
