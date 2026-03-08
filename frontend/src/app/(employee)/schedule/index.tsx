import { Button, Screen } from '@/ui';
import { Text } from 'react-native';

export default function Schedule() {
  return (
    <Screen centered>
      <Text>This is the Schedule Screen!</Text>
      <Button title="View Schedule" shape="rounded" color="reject" />
    </Screen>
  );
}
