import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface TextFieldProps extends TextInputProps {
  label: string;
  placeholder?: string;
  inputStyleType: 'numeric' | 'text';
  containerStyle?: StyleProp<ViewStyle>;
}

export function TextField({
  label,
  inputStyleType,
  containerStyle,
  style,
  ...rest
}: TextFieldProps) {
  return (
    <View style={[styles[`${inputStyleType}OuterContainer`], containerStyle]}>
      <Text style={styles[`${inputStyleType}Label`]}>{label}</Text>
      <View style={styles[`${inputStyleType}Container`]}>
        <TextInput style={[styles[`${inputStyleType}Input`], style]} {...rest} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  numericLabel: {
    fontSize: 24, // 18
    textAlign: 'center',
  },
  textOuterContainer: {
    gap: 8,
    width: 315,
  },
  numericOuterContainer: {
    gap: 16,
    alignItems: 'center',
  },
  textContainer: {
    borderWidth: 1,
    borderColor: '#a3a3a3',
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  numericContainer: {
    width: 75, // 50
    height: 75, // 50
    backgroundColor: '#E5F3FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {},
  numericInput: {
    fontSize: 24,
    width: '100%', // Fills the 50px box
    height: '100%', // Fills the 50px box
    textAlign: 'center', // Centers the actual text cursor/characters
    padding: 0,
  },
});
