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
import { getTimePickerMetrics } from './metrics';

type TimeColumnProps = {
  values: string[];
  compact?: boolean;
  selectedValue?: string;
  isAvailable?: boolean;
  onSelectValue?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function TimeColumn({
  values,
  compact,
  selectedValue,
  isAvailable,
  onSelectValue,
  style,
}: TimeColumnProps) {
  const { itemSize, rowsAboveSelected, viewportHeight } = getTimePickerMetrics(
    compact ? 'compact' : 'regular',
  );

  const flatListRef = useRef<FlatList<string>>(null);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(offsetY / itemSize);
    const value = values[selectedIndex];

    if (value && onSelectValue) {
      onSelectValue(value);
    }

    flatListRef.current?.scrollToOffset({
      offset: selectedIndex * itemSize,
      animated: true,
    });
  };

  useEffect(() => {
    const selectedIndex = values.indexOf(selectedValue ?? values[0]);
    const clampedIndex = Math.max(0, selectedIndex);

    flatListRef.current?.scrollToOffset({
      offset: clampedIndex * itemSize,
      animated: false,
    });
  }, [selectedValue, values]);

  return (
    <View style={[styles.viewport, { height: viewportHeight }, style]}>
      <FlatList
        ref={flatListRef}
        data={values}
        keyExtractor={(item, index) => item ?? `empty-${index}`}
        renderItem={({ item }) => {
          return (
            <View style={[styles.itemContainer, { height: itemSize }]}>
              <TimeSlot timeLabel={item} compact={compact} selected={item === selectedValue} />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemSize}
        decelerationRate="fast"
        nestedScrollEnabled
        onMomentumScrollEnd={handleScrollEnd}
        // onScrollEndDrag={handleScrollEnd}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: rowsAboveSelected * itemSize, paddingBottom: rowsAboveSelected * itemSize },
        ]}
        getItemLayout={(_, index) => ({
          length: itemSize,
          offset: itemSize * index,
          index,
        })}
        scrollEnabled={!!isAvailable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    // height: VIEWPORT_HEIGHT,
    overflow: 'hidden',
  },
  itemContainer: {
    // height: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    // paddingTop: ROWS_ABOVE_SELECTED * ITEM_SIZE,
    // paddingBottom: ROWS_ABOVE_SELECTED * ITEM_SIZE,
  },
});
