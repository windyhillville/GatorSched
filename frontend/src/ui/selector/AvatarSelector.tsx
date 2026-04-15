import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Avatar } from '../avatar';
import { SelectionRow } from './SelectionRow';

export type AvatarOption = {
  id: string;
  name: string;
  avatarUrl: string | null;
  color: string;
};

type AvatarSelectorProps = {
  avatars: AvatarOption[];
  selectionType?: 'single' | 'multiple';
  selectedId?: string;
  selectedIds?: Record<string, boolean>;
  disabled?: boolean;
  onChangeSelectedId?: (id: string) => void;
  onChangeSelectedIds?: (ids: Record<string, boolean>) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function AvatarSelector({
  avatars,
  selectionType = 'multiple',
  selectedId,
  selectedIds = {},
  disabled = false,
  onChangeSelectedId,
  onChangeSelectedIds,
  contentContainerStyle,
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
        <View style={styles.avatarIconContainer}>
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
            <Avatar name={avatar.name} color={avatar.color} img={null} size={'verySmall'} />
          </View>
          <Text>{avatar.name}</Text>
        </View>
      )}
      disabled={disabled}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  avatarIconContainer: {
    alignItems: 'center',
    gap: 12,
  },
  text: {},
});
