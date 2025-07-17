import {apiRequest} from '../api';
import apiClient from '../apiClient';

jest.mock('../apiClient', () => ({
  request: jest.fn(),
}));

describe('apiRequest', () => {
  it('should call apiClient.request with correct config and return response data', async () => {
    const mockData = {success: true};
    (apiClient.request as jest.Mock).mockResolvedValue({data: mockData});

    const response = await apiRequest({
      url: '/test-endpoint',
      method: 'POST',
      data: {foo: 'bar'},
    });

    expect(apiClient.request).toHaveBeenCalledWith({
      url: '/test-endpoint',
      method: 'POST',
      headers: {},
      data: {foo: 'bar'},
      params: undefined,
      baseURL: undefined,
    });
    expect(response).toEqual(mockData);
  });

  it('should throw response error if API fails', async () => {
    const errorResponse = {
      response: {
        data: {message: 'Error occurred'},
      },
    };
    (apiClient.request as jest.Mock).mockRejectedValue(errorResponse);

    await expect(
      apiRequest({
        url: '/error',
      }),
    ).rejects.toEqual({message: 'Error occurred'});
  });

  it('should throw default error if no response in error', async () => {
    (apiClient.request as jest.Mock).mockRejectedValue(
      new Error('Network Error'),
    );

    await expect(
      apiRequest({
        url: '/network-fail',
      }),
    ).rejects.toEqual({message: 'Unexpected error occurred'});
  });
});
