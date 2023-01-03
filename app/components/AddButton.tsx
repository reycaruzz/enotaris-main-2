import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { IconButton } from 'react-native-paper';
import NavigationService from 'app/navigation/NavigationService';
import { theme } from 'app/core/theme';

export default class AddButton extends React.Component {
  //navigation services
  onRequestList = () => NavigationService.navigate('CreateRequest');

  mode = new Animated.Value(0);
  buttonSize = new Animated.Value(1);

  handlePress = (id) => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 10,
        useNativeDriver: true,
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0,
        useNativeDriver: true,
      }),
    ]).start();
    NavigationService.navigate('CreateRequest', { item: null });
  };

  render() {
    const sizeStyle = {
      transform: [{ scale: this.buttonSize }],
    };

    return (
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => this.handlePress()}
          underlayColor="#ffffff"
          style={[styles.button, sizeStyle]}>
          <Animated.View>
            <IconButton icon="plus" color={theme.colors.primary} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    backgroundColor: '#ffffff',
    shadowColor: 'white',
    shadowRadius: 2,
    shadowOffset: { height: -3 },
    shadowOpacity: 0.6,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    elevation: 17,
  },
  secondaryButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F99823',
  },
});
