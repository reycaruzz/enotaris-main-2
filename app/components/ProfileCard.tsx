import React from 'react';
import { Avatar, IconButton, Card } from 'react-native-paper';
import NavigationService from 'app/navigation/NavigationService';
import { useSelector } from 'react-redux';

const ProfileCard: React.FC = () => {
  //fetch user data
  const userData = useSelector((state) => state.loginReducer.userData);
  const onProfile = () => NavigationService.navigate('Profile');
  return (
    <Card.Title
      title={userData.nama}
      subtitle={userData.email}
      left={(props: any) => (
        <Avatar.Image {...props} source={{ uri: userData.pic }} />
      )}
      right={(props: any) => (
        <IconButton {...props} icon="cog" onPress={onProfile} />
      )}
    />
  );
};

export default ProfileCard;
