import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { s, color } from '../../libs/styles';

const IconWithBadge = ({ name, color, badgeCount }) => {
  return (
    <View>
      <FontAwesome name={name} style={s.tabIcons} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badgeStyle}>
          <Text style={styles.count}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};
export default IconWithBadge;

const styles = StyleSheet.create({
  badgeStyle: {
    borderWidth: 0.5,
    borderColor: color.white,
    position: 'absolute',
    right: -8,
    top: '15%',
    backgroundColor: color.brandRed,
    borderRadius: 7.5,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: color.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
