import {CartItem} from './product';

export interface Order extends Omit<CartItem, 'id'> {
  id: string;
  title: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface OrderState {
  list: Order[];
}
