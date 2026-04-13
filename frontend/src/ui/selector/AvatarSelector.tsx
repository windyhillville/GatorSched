import { StyleSheet, View } from 'react-native';
import { Avatar } from '../avatar';
import { SelectionRow } from './SelectionRow';

type AvatarOption = {
  id: string;
  name: string;
  avatarUrl?: string;
  color: string;
};

type AvatarSelectorProps = {
  avatars: AvatarOption[];
  selectionType?: 'single' | 'multiple';
  selectedId?: string;
  selectedIds?: Record<string, boolean>;
  onChangeSelectedId: (id: string) => void;
  onChangeSelectedIds: (ids: Record<string, boolean>) => void;
};

export function AvatarSelector({
  avatars,
  selectionType = 'multiple',
  selectedId,
  selectedIds = {},
  onChangeSelectedId,
  onChangeSelectedIds,
}: AvatarSelectorProps) {
  return (
    <SelectionRow
      data={avatars}
      keyExtractor={(avatar) => avatar.id}
      isSelected={(avatar) =>
        selectionType === 'single' ? avatar.id === selectedId : !!selectedIds[avatar.id]
      }
      onPressItem={(avatar) => {
        if (selectionType === 'single') {
          onChangeSelectedId?.(avatar.id);
          return;
        }

        const nextSelectedIds = { ...selectedIds };

        if (nextSelectedIds[avatar.id]) {
          delete nextSelectedIds[avatar.id];
        } else {
          nextSelectedIds[avatar.id] = true;
        }

        onChangeSelectedIds?.(nextSelectedIds);
      }}
      renderItemContent={(avatar, selected) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: selected ? '#4A7DFF' : avatar.color, // '#E5E5E7'
          }}
        >
          <Avatar name={avatar.name} color={avatar.color} img={null} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  text: {},
});
