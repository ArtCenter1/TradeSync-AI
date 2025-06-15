import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} data-oid="mmtib31" />
      <View style={styles.container} data-oid="q-h4dsd">
        <Text style={styles.text} data-oid="04mi44x">
          This screen doesn't exist.
        </Text>
        <Link href="/" style={styles.link} data-oid="458t53.">
          <Text data-oid="doy..rx">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
