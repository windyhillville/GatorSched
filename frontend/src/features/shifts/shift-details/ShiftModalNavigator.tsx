import DayIcon from '@/assets/images/icons/day.svg';
import RoleIcon from '@/assets/images/icons/role.svg';
import StaffingIcon from '@/assets/images/icons/staffing.svg';
import TimeIcon from '@/assets/images/icons/time.svg';
import { ShiftNavIcon } from '@/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActiveViewOption } from './ShiftsDetailsForm';

type ShiftModalNavigatorProps = {
  selectedIcon: ActiveViewOption;
  onSelectView: (icon: ActiveViewOption) => void;
};

export function ShiftModalNavigator({ selectedIcon, onSelectView }: ShiftModalNavigatorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <Pressable onPress={() => onSelectView('day')} style={styles.navItem}>
          <View style={[styles.navItemInner, selectedIcon === 'day' && styles.highlight]}>
            <ShiftNavIcon Icon={DayIcon} />
            <Text style={styles.navIconText}>Day</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => onSelectView('time')} style={styles.navItem}>
          <View style={[styles.navItemInner, selectedIcon === 'time' && styles.highlight]}>
            <ShiftNavIcon Icon={TimeIcon} />
            <Text style={styles.navIconText}>Time</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => onSelectView('staffing')} style={styles.navItem}>
          <View style={[styles.navItemInner, selectedIcon === 'staffing' && styles.highlight]}>
            <ShiftNavIcon Icon={StaffingIcon} />
            <Text style={styles.navIconText}>Staffing</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => onSelectView('role')} style={styles.navItem}>
          <View style={[styles.navItemInner, selectedIcon === 'role' && styles.highlight]}>
            <ShiftNavIcon Icon={RoleIcon} />
            <Text style={styles.navIconText}>Role</Text>
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
