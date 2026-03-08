import { useState } from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/styles';

type ButtonShape = 'pill' | 'rounded';
type ButtonColor = 'default' | 'accept' | 'reject';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  shape?: ButtonShape;
  color?: ButtonColor;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  title,
  shape = 'pill',
  color = 'default',
  style,
  textStyle,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={[styles.shadowWrapper, styles[shape]]}>
      <View
        style={[
          styles.container,
          styles[shape],
          styles[`${color}Container`],
          isPressed && styles[`${color}Pressed`],
          style,
        ]}
      >
        <Pressable
          onPressIn={(e) => {
            setIsPressed(true);
            onPressIn?.(e);
          }}
          onPressOut={(e) => {
            setIsPressed(false);
            onPressOut?.(e);
          }}
          android_ripple={{
            borderless: false,
            color:
              color === 'default'
                ? 'rgba(169, 212, 255, 0.15)'
                : color === 'accept'
                  ? 'rgba(40, 167, 69, 0.20)'
                  : 'rgba(227, 51, 51, 0.20)',
            foreground: true,
          }}
          style={styles.pressable}
          {...props}
        >
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    backgroundColor: Colors.baseWhite,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5, // The magic number for Android shadows
      },
    }),
  },
  container: {
    overflow: 'hidden',
    borderWidth: 1,
    // backgroundColor: 'transparent',
    minHeight: 48,
    minWidth: 64,
  },
  pill: {
    borderRadius: 999,
  },
  rounded: {
    borderRadius: 12,
  },
  defaultContainer: {
    borderColor: Colors.buttonPillBorder,
  },
  acceptContainer: {
    borderColor: Colors.buttonAcceptBorder,
  },
  rejectContainer: {
    borderColor: Colors.buttonRejectBorder,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  defaultPressed: {
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(169, 212, 255, 0.20)',
        borderColor: 'rgba(0, 33, 165, .9)',
      },
      android: { borderColor: '#0021A5BF' },
    }),
  },
  acceptPressed: {
    ...Platform.select({
      ios: { backgroundColor: 'rgba(40, 167, 69, 0.15)', borderColor: 'rgba(40, 167, 69, 0.5)' },
      android: {
        borderColor: 'rgba(40, 167, 69, 0.5)',
      },
    }),
  },
  rejectPressed: {
    ...Platform.select({
      ios: { backgroundColor: 'rgba(227, 51, 51, 0.20)', borderColor: 'rgba(227, 51, 51, 0.5)' },
      android: {
        borderColor: 'rgba(227, 51, 51, 0.5)',
      },
    }),
  },
  text: {
    fontSize: 18,
  },
});
