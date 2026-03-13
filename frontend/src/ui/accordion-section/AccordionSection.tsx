import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Chevron } from '../chevron';

type AccordionSectionProps = {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  right?: React.ReactNode;
};

export function AccordionSection({
  title,
  expanded,
  onToggle,
  children,
  right,
}: AccordionSectionProps) {
  return (
    <View style={styles.accordionWrapper}>
      <View style={styles.topRow}>
        <Pressable style={styles.pressable} onPress={onToggle}>
          <Text style={styles.titleText}>{title}</Text>
          <View
            style={[styles.iconWrapper, { transform: [{ rotate: expanded ? '180deg' : '0deg' }] }]}
          >
            <Chevron direction="down" size={16} />
          </View>
          {right}
        </Pressable>
      </View>

      {expanded && <View style={styles.childrenWrapper}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  accordionWrapper: {
    width: '100%',
    gap: 8,
  },
  topRow: {
    paddingHorizontal: 12,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 24,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  childrenWrapper: {
    alignItems: 'center',
    gap: 12,
  },
});
