import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Card, Text, Divider } from 'react-native-paper';
import ProfileCard from 'app/components/ProfileCard';

const ProfileCardJob: React.FC = ({ takenJob, finishedJob }) => {
  return (
    <Card style={styles.card}>
      <ProfileCard />
      <Divider />
      <Card.Content>
        <View style={styles.statsContainer}>
          <List.Subheader style={[styles.dashboardText]}>
            Job Dashboard
          </List.Subheader>
        </View>
        <View style={styles.statsContainer}>
          {/* <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>{availableJob}</Text>
            <Text style={[styles.text, styles.subText]}>Available</Text>
          </View> */}
          <View
            style={[
              styles.statsBox,
              {
                borderColor: '#DFD8C8',
                borderRightWidth: 1,
                // borderLeftWidth: 1,
              },
            ]}>
            <Text style={[styles.text, { fontSize: 24 }]}>{takenJob}</Text>
            <Text style={[styles.text, styles.subText]}>On-Work</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>{finishedJob}</Text>
            <Text style={[styles.text, styles.subText]}>Done</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontFamily: 'HelveticaNeue',
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  dashboardText: {
    fontSize: 16,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
});

export default ProfileCardJob;
