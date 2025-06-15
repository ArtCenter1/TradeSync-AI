import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} data-oid="a6wmz_2" />
      <View style={styles.container} data-oid="fi.zsoj">
        <Text style={styles.text} data-oid="lgersf8">
          This screen doesn't exist.
        </Text>
        <Link href="/" style={styles.link} data-oid="pm8hx53">
          <Text data-oid="myk3v.q">Go to home screen!</Text>
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
