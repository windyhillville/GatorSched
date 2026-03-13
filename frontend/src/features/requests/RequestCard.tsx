import { Avatar, Button, DayGrid, DayIcon, DayItem } from '@/ui';
import { Colors } from '@/styles';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

const dummyDays: DayItem[] = [
  { key: 'sun', label: 'Su', timeRange: '7 AM - 3 PM' },
  { key: 'mon', label: 'Mo', timeRange: '9 AM - 5 PM' },
  { key: 'tue', label: 'Tu', timeRange: '9 AM - 5 PM' },
  { key: 'wed', label: 'We', timeRange: '9 AM - 5 PM' },
  { key: 'thur', label: 'Th', timeRange: '9 AM - 5 PM' },
  { key: 'fri', label: 'Fr', timeRange: '6 PM - 2 AM' },
  { key: 'sat', label: 'Sa', timeRange: '12 PM - 8 PM' },
];

interface PersonData {
  name: string;
  pfpImg?: any;
  pfpSize?: number;
  pfpColor?: string;
}

interface CardProps {
  purpose: 'info' | 'callout-in' | 'callout-out' | 'swap-in' | 'swap-out';
  user: PersonData;
  other?: PersonData; // optional second person for swaps
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function CalloutExpansion({ purpose, user, textStyle }: CardProps) {
  return (
    // expanded content
    <View key="expanded" style={styles.expandedContainer}>
      <View style={styles.shiftWrapper}>
        <Avatar
          name={user.name}
          img={user.pfpImg}
          size={user.pfpSize}
          backgroundColor={user.pfpColor}
        />
        <Text style={[styles.text, textStyle]}>{user.name}</Text>
        <DayIcon day="Mo" timeRange="9 AM - 5 PM" size="small" />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          {purpose === 'callout-in' ? (
            <>
              <Button title="Accept" onPress={() => {}} shape="rounded" color="accept" />
              <Button title="Decline" onPress={() => {}} shape="rounded" color="reject" />
            </>
          ) : (
            <>
              <Button title="Cancel" onPress={() => {}} shape="rounded" color="reject" />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

function SwapExpansion({ purpose, user, other, textStyle }: CardProps) {
  return (
    // expanded content
    <View key="expanded" style={styles.expandedContainer}>
      <View style={styles.multishiftWrapper}>
        <View style={styles.shiftWrapper}>
          <Avatar
            name={user.name}
            img={user.pfpImg}
            size={user.pfpSize}
            backgroundColor={user.pfpColor}
          />
          <Text style={[styles.multiText, textStyle]}>{user.name}</Text>
          <DayIcon day="Mo" timeRange="9 AM - 5 PM" size="small" />
        </View>
        <View style={styles.multishiftSpacer} />
        <View style={styles.shiftWrapper}>
          <Avatar
            name={other?.name}
            img={other?.pfpImg}
            size={other?.pfpSize}
            backgroundColor={other?.pfpColor}
          />
          <Text style={[styles.multiText, textStyle]}>{other?.name}</Text>
          <DayIcon day="Su" timeRange="9 AM - 5 PM" size="small" />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          {purpose === 'swap-in' ? (
            <>
              <Button title="Accept" onPress={() => {}} shape="rounded" color="accept" />
              <Button title="Decline" onPress={() => {}} shape="rounded" color="reject" />
            </>
          ) : (
            <>
              <Button title="Cancel" onPress={() => {}} shape="rounded" color="reject" />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

function InfoExpansion({ purpose, user, textStyle }: CardProps) {
  return (
    // expanded content
    <View key="expanded" style={[styles.expandedContainer, { marginTop: 5 }]}>
      <View style={styles.row}>
        <View style={styles.pfpWrapper}>
          {/* Profile Picture */}
          <Avatar
            name={user.name}
            img={user.pfpImg}
            size={user.pfpSize}
            backgroundColor={user.pfpColor}
          />
        </View>
        {/* Employee Name */}
        <View style={styles.nameWrapper}>
          <Text style={[styles.text, textStyle]}>{user.name}</Text>
        </View>
        {/* Spacer */}
        <View style={styles.spacer} />
      </View>
      <View style={styles.dayGridWrapper}>
        <DayGrid days={dummyDays} size="small" onDayPress={(d) => console.log(d)} />
      </View>
      <Text style={styles.totalHours}>{'56 Hrs'}</Text>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <Button title="View Full Schedule" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

function RenderExpansion({ purpose, user, other, textStyle }: CardProps) {
  switch (purpose) {
    case 'callout-in':
    case 'callout-out':
      return <CalloutExpansion purpose={purpose} user={user} textStyle={textStyle} />;

    case 'swap-in':
    case 'swap-out':
      return <SwapExpansion purpose={purpose} user={user} other={other} textStyle={textStyle} />;

    case 'info':
      return <InfoExpansion purpose={purpose} user={user} textStyle={textStyle} />;

    default:
      return null;
  }
}

export function RequestCard({ purpose, user, other, style, textStyle }: CardProps) {
  const [expanded, setExpanded] = useState(false); // initial state: collapsed

  return (
    <View style={styles.shadowWrapper}>
      <View style={[styles.container, style]}>
        <Pressable onPress={() => setExpanded(!expanded)} style={styles.pressable}>
          {expanded ? (
            <RenderExpansion
              key="expanded"
              purpose={purpose}
              user={user}
              other={other}
              textStyle={textStyle}
            />
          ) : (
            // collapsed content
            <View key="collapsed" style={styles.row}>
              <View style={styles.pfpWrapper}>
                {/* Placeholder for profile picture */}
                <Avatar
                  name={user.name}
                  img={user.pfpImg}
                  size={user.pfpSize}
                  backgroundColor={user.pfpColor}
                />
              </View>
              {/* Employee Name */}
              <View style={styles.nameWrapper}>
                <Text style={[styles.text, textStyle]}>{user.name}</Text>
              </View>
              {/* Spacer */}
              <View style={styles.spacer} />
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    backgroundColor: Colors.baseWhite,
    borderRadius: 60,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5, // 5 is the magic number I guess
      },
    }),
  },
  container: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 60,
    minHeight: 48,
    minWidth: 64,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  text: {
    fontSize: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  pfpWrapper: {
    flex: 1,
  },
  pfp: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  nameWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  expandedContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    gap: 50,
  },
  shiftWrapper: {
    alignItems: 'center',
    gap: 30,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 10,
    ...Platform.select({
      ios: {
        paddingBottom: 40,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },
  multishiftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  multishiftSpacer: {
    flex: 0.8,
    alignItems: 'center',
  },
  multiText: {
    fontSize: 14,
  },
  dayGridWrapper: {
    flexDirection: 'column',
  },
  totalHours: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
  },
});
