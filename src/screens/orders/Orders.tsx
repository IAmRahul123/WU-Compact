import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {colors} from '../../config/themeManager';
import {spacing} from '../../utils/responsiveSpacing';
import fonts from '../../config/fonts';
import {t} from 'i18next';
import {Order} from '../../store/reducers/@types/orders';

const OrderScreen: React.FC = () => {
  const orders = useSelector((state: RootState) => state.order.list);

  const renderItem = ({item}: {item: Order}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {t(item.status)}
        </Text>
      </View>
    </View>
  );

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return {color: 'green'};
      case 'pending':
        return {color: 'orange'};
      case 'cancelled':
        return {color: 'red'};
      default:
        return {color: colors.textPrimary};
    }
  };

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View>
          <Text>{t('orders.noItems')}</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing(16),
  },
  list: {
    paddingBottom: spacing(32),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderWidth: 0.7,
    borderColor: colors.border_grey,
    borderRadius: 8,
    padding: spacing(12),
    marginBottom: spacing(12),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: spacing(12),
  },
  details: {
    flex: 1,
  },
  title: {
    ...fonts.titleMedium,
    color: colors.textPrimary,
  },
  date: {
    ...fonts.textRegular,
    color: colors.placeholder_grey,
    marginVertical: spacing(4),
  },
  status: {
    ...fonts.labelMedium,
  },
});
