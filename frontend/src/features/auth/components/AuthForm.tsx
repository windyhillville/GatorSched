import { Platform, StyleSheet, View } from 'react-native';
import { Button } from '@/ui';
import { PropsWithChildren } from 'react';

export function AuthForm({
  children,
  onSubmit,
  buttonText,
}: PropsWithChildren<{ onSubmit: () => void; buttonText: string }>) {
  return (
    <View style={styles.container}>
      <View style={styles.fieldsContainer}>{children}</View>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <Button title={buttonText} onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fieldsContainer: {
    flex: 2.5,
    width: '100%',
    maxWidth: 315,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  buttonWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  buttonContainer: {
    width: '100%',
    maxWidth: 280,
    ...Platform.select({
      ios: {
        paddingBottom: 40,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },
});
