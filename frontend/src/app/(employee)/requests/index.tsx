import { RequestCard } from '@/features';
import { Header, Screen } from '@/ui';
import JohnDoe from '@/assets/images/avatars/john-doe.png';
import { Platform, StyleSheet, View } from 'react-native';

export default function Requests() {
  return (
    <Screen insetTop>
      <Header title="Requests" style={styles.header} />
      <View style={styles.cardWrapper}>
        <View style={styles.cardContainer}>
          <RequestCard purpose="info" user={{ name: 'Jim Bo', pfpColor: 'rgba(40, 167, 69, 1)' }} />
          <RequestCard
            purpose="swap-in"
            user={{ name: 'Jane Smith', pfpColor: 'rgba(251, 191, 36, 1)' }}
            other={{ name: 'John Doe', pfpImg: JohnDoe }}
          />
          <RequestCard purpose="callout-out" user={{ name: 'John Doe', pfpImg: JohnDoe }} />
        </View>
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
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
    ...Platform.select({
      ios: {
        paddingBottom: 40,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },
});
