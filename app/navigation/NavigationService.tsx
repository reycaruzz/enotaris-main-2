import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function canGoBack() {
  return navigationRef.current?.canGoBack();
}

function currentRoute() {
  return navigationRef.current;
}

export default {
  navigate,
  goBack,
  canGoBack,
  currentRoute,
};
