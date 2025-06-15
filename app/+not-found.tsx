import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} data-oid="4q48st:" />
      <View style={styles.container} data-oid="odswi6m">
        <Text style={styles.text} data-oid="rnogmzx">
          This screen doesn't exist.
        </Text>
        <Link href="/" style={styles.link} data-oid=".q9jffp">
          <Text data-oid="sihwi_h">Go to home screen!</Text>
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
