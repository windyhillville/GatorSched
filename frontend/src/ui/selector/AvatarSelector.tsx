import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Avatar, AvatarSize } from '../avatar';
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
  size?: AvatarSize;
  onChangeSelectedId?: (id: string) => void;
  onChangeSelectedIds?: (ids: Record<string, boolean>) => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function AvatarSelector({
  avatars,
  selectionType = 'multiple',
  selectedId,
  selectedIds = {},
  disabled = false,
  size = 'xxSmall',
  onChangeSelectedId,
  onChangeSelectedIds,
  style,
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
              backgroundColor: selected ? avatar.color : disabled ? avatar.color : 'transparent', // '#E5E5E7'
              borderWidth: disabled ? 0 : 2,
              borderColor: avatar.color,
            }}
          >
            <Avatar
              name={avatar.name}
              color={disabled ? avatar.color : '#ffffff'}
              img={null}
              size={size}
              borderColor={disabled ? undefined : avatar.color}
              style={style}
            />
          </View>
          <Text>{avatar.name}</Text>
        </View>
      )}
      disabled={disabled}
      contentContainerStyle={[styles.containerStyle, contentContainerStyle]}
    />
  );
}

const styles = StyleSheet.create({
  avatarIconContainer: {
    alignItems: 'center',
    gap: 12,
  },
  containerStyle: {
    width: '98%',
    justifyContent: 'center',
  },
  text: {},
});
