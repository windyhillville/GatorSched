import { FlatList, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type SelectionRowProps<T> = {
  data: T[];
  disabled?: boolean;
  keyExtractor: (item: T) => string;
  isSelected: (item: T) => boolean;
  onPressItem: (item: T) => void;
  renderItemContent: (item: T, selected: boolean) => React.ReactNode;
  extraData?: unknown;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function SelectionRow<T>({
  data,
  disabled = false,
  keyExtractor,
  isSelected,
  onPressItem,
  renderItemContent,
  extraData,
  contentContainerStyle,
}: SelectionRowProps<T>) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        extraData={extraData}
        keyExtractor={(item) => keyExtractor(item)}
        renderItem={({ item }) => {
          const selected = isSelected(item);
          return (
            <Pressable
              onPress={() => onPressItem(item)}
              style={styles.itemPressable}
              disabled={disabled}
            >
              {renderItemContent(item, selected)}
            </Pressable>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  itemPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 24,
  },
});
