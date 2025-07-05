import {call, put, takeLatest} from 'redux-saga/effects';
import {apiRequest} from '../../services/api';
import {setProducts} from '../reducers/productReducer';
import {hideLoader, showLoader} from '../reducers/uiReducer';
import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';

function* fetchProducts(action: PayloadAction<any>): SagaIterator {
  //need to change any to interface when payload be known
  try {
    yield put(showLoader());
    let response = yield call(apiRequest, {
      url: 'products',
    });
    yield put(setProducts(response?.products));
  } catch (error) {
    console.log('error while fetching', error);
  } finally {
    yield put(hideLoader());
  }
}

export default function* watchProducts() {
  yield takeLatest('product/fetchProducts', fetchProducts);
}
