import { StyleSheet, View } from 'react-native';
import { Avatar } from '../avatar';
import { SelectionRow } from './SelectionRow';
// import { SIZES } from '@/styles';

type RoleOption = {
  id: string;
  label: string;
  color: string;
};

type RoleSelectorProps = {
  roles: RoleOption[];
  selectionType?: 'single' | 'multiple';
  selectedId?: string; // will need to add multiple selection option
  selectedIds?: Record<string, boolean>;
  onChangeSelectedId?: (id: string) => void;
  onChangeSelectedIds?: (ids: Record<string, boolean>) => void;
};

export function RoleSelector({
  roles,
  selectionType = 'single',
  selectedId,
  selectedIds = {},
  onChangeSelectedId,
  onChangeSelectedIds,
}: RoleSelectorProps) {
  return (
    <SelectionRow
      data={roles}
      extraData={selectionType === 'single' ? selectedId : selectedIds}
      keyExtractor={(role) => role.id}
      isSelected={(role) =>
        selectionType === 'single' ? role.id === selectedId : !!selectedIds[role.id]
      }
      onPressItem={(role) => {
        if (selectionType === 'single') {
          onChangeSelectedId?.(role.id);
          return;
        }

        const nextSelectedIds = { ...selectedIds };

        if (nextSelectedIds[role.id]) {
          delete nextSelectedIds[role.id];
        } else {
          nextSelectedIds[role.id] = true;
        }

        onChangeSelectedIds?.(nextSelectedIds);
      }}
      renderItemContent={(role, selected) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 76,
            height: 76,
            borderRadius: 38,
            backgroundColor: selected ? `${role.color}20` : 'transparent', // 👈 subtle tint
            borderWidth: selected ? 3 : 1,
            borderColor: role.color,
          }}
        >
          <Avatar
            label={role.label}
            color={'#ffffff'}
            borderColor={role.color}
            size={'verySmall'}
            textStyle={styles.text}
            img={null}
          />
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
