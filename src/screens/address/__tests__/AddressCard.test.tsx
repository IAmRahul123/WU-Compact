import {fireEvent, render} from '@testing-library/react-native';
import AddressCard from '../AddressCard';
import React from 'react';

const mockAddress = {
  id: '1',
  name: 'Home',
  address: 'IND',
  isDefault: true,
};
describe('AddressCard', () => {
  it('render correctly', () => {
    const {getByTestId} = render(
      <AddressCard
        address={mockAddress}
        onSelect={() => {}}
        selectedId={'1'}
      />,
    );
    const card = getByTestId('Address-card');
    expect(card).toBeTruthy();
    expect(card).toHaveTextContent(/common.default/);
  });
  it('calls onSelect with correct id when pressed', () => {
    const onSelectMock = jest.fn();

    const {getByTestId} = render(
      <AddressCard
        address={mockAddress}
        onSelect={onSelectMock}
        selectedId={null}
      />,
    );

    const card = getByTestId('Address-card');
    fireEvent.press(card);

    expect(onSelectMock).toHaveBeenCalledWith('1');
  });
});
