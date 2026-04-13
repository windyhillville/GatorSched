import React from 'react';
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type ShiftModalShellProps = {
  children: React.ReactNode;
  isActivated: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ShiftModalShell({ children, isActivated, style }: ShiftModalShellProps) {
  return (
    <Modal
      visible={isActivated}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
    >
      {/* 1. This View dims the ENTIRE background */}
      <View style={styles.overlay}>
        {/* 2. This View is your actual styled Modal box */}
        <View style={[styles.modalContainer, style]}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, // Fills the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Dim effect
  },
  modalContainer: {
    width: '90%', // Now only the box is 90% width
    height: '65%',
    backgroundColor: 'white', // Give the box its own color
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#A5B6F4',
    // Add shadow/elevation here if you want it to "pop"
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
