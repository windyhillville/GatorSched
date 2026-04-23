import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProfileRowProps = {
  icon?: React.ReactNode;
  label: string;
  value: string;
  rightIcon?: React.ReactNode;
};

export function ProfileRow({ icon, label, value, rightIcon }: ProfileRowProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}

      <Text style={styles.label}>{label}:</Text>

      <Text style={styles.value}>{value}</Text>

      {rightIcon && <View style={styles.right}>{rightIcon}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  value: {
    flexShrink: 1,
    fontSize: 16,
  },
  right: {
    marginLeft: 8,
  },
});
