import { CallOutRequestCard, SwapRequestCard } from '@/features';
import { Header, Screen } from '@/ui';
import { Platform, StyleSheet, View } from 'react-native';

export default function Requests() {
  function handleCardToggle() {}
  return (
    <Screen insetTop>
      <Header title="Requests" style={styles.header} />
      <View style={styles.cardWrapper}>
        <View style={styles.cardContainer}>
          {/* <RequestCard purpose="callout-out" user={{ name: 'John Doe', pfpImg: JohnDoe }} /> */}
          {/* <RequestCard
            purpose="swap-in"
            user={{ name: 'Jane Smith', pfpColor: 'rgba(251, 191, 36, 1)' }}
            other={{ name: 'John Doe', pfpImg: JohnDoe }}
          /> */}
          {/* <ScheduleInfoCard
            user={{ name: 'Joe Bo', avatarUrl: null, color: "#d48eda" }}
            expanded={false}
            totalHours={56}
            onToggle={handleCardToggle}
          /> */}
          <SwapRequestCard
            purpose="swap-in"
            fromUser={{ name: 'Joe Smo', avatarUrl: null, color: '#9598c3' }}
            toUser={{ name: 'Johnny Roe', avatarUrl: null, color: '#a859c7' }}
            expanded={false}
            onToggle={handleCardToggle}
          />
          <CallOutRequestCard
            purpose="callout-in"
            user={{ name: 'Roe Moe', avatarUrl: null, color: '#68c174' }}
            expanded={false}
            onToggle={handleCardToggle}
          />
          {/* <RequestCard purpose="info" user={{ name: 'Jim Bo', pfpColor: 'rgba(40, 167, 69, 1)' }} /> */}
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
