import { useEffect, useRef } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { TimeSlot } from './TimeSlot';
import { ITEM_SIZE, ROWS_ABOVE_SELECTED, VIEWPORT_HEIGHT } from './constants';

type TimeColumnProps = {
  values: string[];
  selectedValue?: string;
  onSelectValue?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function TimeColumn({ values, selectedValue, onSelectValue, style }: TimeColumnProps) {
  const flatListRef = useRef<FlatList<string>>(null);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(offsetY / ITEM_SIZE);
    const value = values[selectedIndex];

    if (value && onSelectValue) {
      onSelectValue(value);
    }

    flatListRef.current?.scrollToOffset({
      offset: selectedIndex * ITEM_SIZE,
      animated: true,
    });
  };

  useEffect(() => {
    const selectedIndex = values.indexOf(selectedValue ?? values[0]);
    const clampedIndex = Math.max(0, selectedIndex);

    flatListRef.current?.scrollToOffset({
      offset: clampedIndex * ITEM_SIZE,
      animated: false,
    });
  }, [selectedValue, values]);

  return (
    <View style={[styles.viewport, style]}>
      <FlatList
        ref={flatListRef}
        data={values}
        keyExtractor={(item, index) => item ?? `empty-${index}`}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <TimeSlot timeLabel={item} selected={item === selectedValue} />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        nestedScrollEnabled
        onMomentumScrollEnd={handleScrollEnd}
        // onScrollEndDrag={handleScrollEnd}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={(_, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    height: VIEWPORT_HEIGHT,
    overflow: 'hidden',
  },
  itemContainer: {
    height: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: ROWS_ABOVE_SELECTED * ITEM_SIZE,
    paddingBottom: ROWS_ABOVE_SELECTED * ITEM_SIZE,
  },
});
