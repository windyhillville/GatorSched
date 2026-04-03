import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

type ExpandableCardHeaderProps = {
  title: string;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  trailingSpace?: 'standard' | 'compact';
};

export function ExpandableCardHeader({
  title,
  avatar,
  icon,
  textStyle,
  trailingSpace = 'standard',
}: ExpandableCardHeaderProps) {
  return (
    // <Pressable onPress={onToggle} style={styles.pressable}>
    <View style={styles.row}>
      <View style={styles.avatarWrapper}>
        {/* Placeholder for profile picture */}
        {avatar}
      </View>
      {/* Employee Name */}
      <View style={styles.nameWrapper}>
        <Text style={[styles.text, textStyle]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {/* Icon/Spacer */}
      <View style={[styles.iconWrapper, trailingSpace === 'compact' && styles.iconWrapperCompact]}>
        {icon}
      </View>
    </View>
    // </Pressable>
  );
}

const styles = StyleSheet.create({
  // pressable: {
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  //   // paddingHorizontal: 4,
  //   // paddingVertical: 5,

  //   width: '100%',
  //   paddingHorizontal: 8,
  //   paddingVertical: 8,
  // },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatarWrapper: {
    // flex: 1,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
  },
  iconWrapper: {
    // flex: 1,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperCompact: {
    width: 60,
  },
});
