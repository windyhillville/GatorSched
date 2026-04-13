import { RoleSelector } from '@/ui';
import { StyleSheet, Text, View } from 'react-native';

// MOCK
const roles = [
  { id: '1', label: 'Server', color: '#7c7cbc' },
  { id: '2', label: 'Cook', color: '#bc7c7c' },
  { id: '3', label: 'Busser', color: '#7cbcb8' },
  { id: '4', label: 'Manager', color: '#93bc7c' },
  { id: '5', label: 'Food Runner', color: '#bcab7c' },
  { id: '6', label: 'Bartender', color: '#bc9b7c' },
];

type RoleStepProps = {
  selectedRoleId?: string;
  onChangeId?: (id: string) => void;
};

export function RoleStep({ selectedRoleId, onChangeId }: RoleStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.roleSelectorContainer}>
        <Text style={styles.subHeaderText}>Role</Text>
        <RoleSelector roles={roles} selectedId={selectedRoleId} onChangeSelectedId={onChangeId} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  roleSelectorContainer: {
    width: '90%',
    marginTop: 16,
    alignItems: 'center',
    gap: 12,
    // backgroundColor: 'blue',
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: '500',
  },
});
