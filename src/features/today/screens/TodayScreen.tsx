import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './TodayScreen.styles';

export function TodayScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.content}>
          <Text style={styles.eyebrow}>HABITFLOW</Text>
          <Text style={styles.heading}>A little progress every day.</Text>
          <Text style={styles.intro}>
            Build a rhythm that feels good and keep your daily intentions in view.
          </Text>
          <View style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>TODAY’S FOCUS</Text>
            </View>
            <Text style={styles.cardTitle}>Your habits, your pace</Text>
            <Text style={styles.cardBody}>
              Small steps add up. Come back each day to see how far you’ve gone.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
