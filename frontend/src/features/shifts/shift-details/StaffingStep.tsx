import { TextField } from '@/ui';
import { StyleSheet, View } from 'react-native';

type StaffingStepProps = {
  value: string;
  onChangeStaffingRequirement?: (value: string) => void;
};

export function StaffingStep({ value, onChangeStaffingRequirement }: StaffingStepProps) {
  function handleChangeText(text: string) {
    const digitsOnly = text.replace(/[^0-9]/g, '');
    onChangeStaffingRequirement?.(digitsOnly);
  }
  return (
    <View style={styles.container}>
      <TextField
        label={'Staffing Requirement'}
        inputMode="numeric"
        keyboardType="number-pad"
        inputStyleType="numeric"
        maxLength={2}
        onChangeText={handleChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
