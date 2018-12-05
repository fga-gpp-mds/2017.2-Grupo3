import * as Toast from '../src/components/Toast';
import editConselorErrorHandler from '../src/customErrorTreatments/editConselorError';
import getUserProfileInLoginErrorHandler from '../src/customErrorTreatments/userProfileInLoginError';
import { LOGIN_PROFILE_ERROR } from '../src/constants/toastMessages';

const errorNumbers = [401, 403, 404, 500];

describe('Testing editConselorErrorHandler', () => {
  beforeAll(() => {
    Toast.default.Toast = jest.fn(() => ({}));
  });

  afterEach(() => {
    Toast.default.Toast.mockClear();
  });

  it('Testing all errors', () => {
    Toast.default.Toast = jest.fn(() => ({}));

    errorNumbers.forEach((error) => {
      editConselorErrorHandler(error);
      expect(Toast.default.Toast.mock.calls.length).toBe(1);
      Toast.default.Toast.mockClear();
    });
  });
});

describe('Testing getUserProfileInLoginErrorHandler', () => {
  it('Testing 404', () => {
    getUserProfileInLoginErrorHandler(errorNumbers[2]);
    expect(Toast.default.Toast.mock.calls.length).toBe(1);
    expect(Toast.default.Toast.mock.calls[0][0]).toBe(LOGIN_PROFILE_ERROR);
  });

  it('Testing remaining errors', () => {
    Toast.default.Toast = jest.fn(() => ({}));

    errorNumbers.forEach((error) => {
      editConselorErrorHandler(error);
      expect(Toast.default.Toast.mock.calls.length).toBe(1);
      Toast.default.Toast.mockClear();
    });
  });
});
