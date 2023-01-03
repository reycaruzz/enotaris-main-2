import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
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
    color: '#52575D',
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  profileScene: {
    backgroundColor: '#41444B',
  },
  badgeCounter: {
    position: 'absolute',
    top: 5,
    right: 0,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
