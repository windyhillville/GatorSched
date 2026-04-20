import DayIcon from '@/assets/images/icons/day.svg';
import StaffingIcon from '@/assets/images/icons/staffing.svg';
import { ShiftNavIcon } from '@/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SwapRequestActiveOption } from './types';

type SwapRequestModalNavProps = {
  selectedIcon: SwapRequestActiveOption;
  onSelectView: (icon: SwapRequestActiveOption) => void;
};

export function SwapRequestModalNav({ selectedIcon, onSelectView }: SwapRequestModalNavProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <Pressable onPress={() => onSelectView('shift')} style={styles.navItem}>
          <View style={[styles.navItemInner, selectedIcon === 'shift' && styles.highlight]}>
            <ShiftNavIcon Icon={DayIcon} />
            <Text style={styles.navIconText}>My Shift</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => onSelectView('teammate')} style={styles.navItem}>
          <View style={[styles.navItemInner, selectedIcon === 'teammate' && styles.highlight]}>
            <ShiftNavIcon Icon={StaffingIcon} />
            <Text style={styles.navIconText}>Teammate</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  navContainer: {
    gap: 12, // 24
    flexDirection: 'row',
    backgroundColor: '#f1f1f3',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#A5B6F4',
    // padding: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    // height: 78,
  },
  navIconText: {
    fontSize: 10,
  },
  navItem: {
    width: 72,
  },
  navItemInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  highlight: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },
});
