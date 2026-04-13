import { ShiftsDetailsForm } from '@/features';
import { Header, Screen } from '@/ui';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function Shifts() {
  const [isModalPressed, setIsModalPressed] = useState(false);
  // const [activeView, setActiveView] = useState<ActiveViewOption>('day');

  return (
    <Screen insetTop>
      <Header title={'Shifts'} />
      {/* <View style={styles.container}>
        <Pressable onPress={() => setIsModalPressed(!isModalPressed)}>
          <View style={styles.button}>
            <Text>Get Modal</Text>
          </View>
        </Pressable>
      </View> */}

      <ShiftsDetailsForm editButtonPressed={true} />
      {/* <ShiftModalShell isActivated={isModalPressed}>
        <Header title="What would you like to change?" type={'small'} />
        <ShiftModalNavigator />
        <View style={styles.innerModalContainer}>
          <Pressable onPress={() => setIsModalPressed(false)}>
            <View style={styles.button}>
              <Text>Close Modal</Text>
            </View>
          </Pressable>
        </View>
      </ShiftModalShell> */}
      {/* <Text>This is the Shifts Screen!</Text> */}
    </Screen>
  );
}

{
  /* <Pressable onPress={() => setIsModalPressed(false)}>
<View style={styles.button}>
  <Text>Close Modal</Text>
</View>
</Pressable> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 250,
    backgroundColor: 'lightblue',
    marginBottom: 32,
  },
  innerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
