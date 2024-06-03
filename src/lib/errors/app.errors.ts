export const AppErrors = {
  ValidationError: {
    errorCode: 'ValidationError',
    statusCode: 400,
    message: 'Validation failed',
  },

  AccessDenied: {
    errorCode: 'AccessDenied',
    statusCode: 403,
    message: 'Access to this resource is forbidden',
  },

  RateLimitError: {
    errorCode: 'TooManyRequestError',
    statusCode: 429,
    message: 'You hit the rate limit! Slow down please!.',
  },

  InvalidAuthCredentials: {
    errorCode: 'AuthError',
    statusCode: 400,
    message: 'Username or password are invalid',
  },

  InvalidToken: {
    errorCode: 'SessionError',
    statusCode: 400,
    message: 'Auth credentials are invalid',
  },

  InvalidHash: {
    errorCode: 'ValidationError',
    statusCode: 400,
    message: 'Invalid hash',
  },

  tokenExpired: {
    errorCode: 'SessionError',
    statusCode: 400,
    message: 'Session has expired. Please login again',
  },

  UnAuthorised: {
    errorCode: 'PermissionsError',
    statusCode: 401,
    message: 'You are not authorized to perform this action.',
  },

  NotFound: {
    errorCode: 'NotFoundError',
    statusCode: 404,
    message: 'Not Found',
  },

  MissingHeaders: {
    errorCode: 'AuthError',
    statusCode: 412,
    message: 'Missing Required headers',
  },

  InvalidHeaders: {
    errorCode: 'AuthError',
    statusCode: 412,
    message: 'Invalid Credentials',
  },

  InternalError: {
    errorCode: 'InternalError',
    statusCode: 500,
    message: 'Something went wrong.',
  },

  ForbiddenError: {
    errorCode: 'Forbidden',
    statusCode: 403,
    message: 'Forbidden',
  },

  userNotActive: {
    errorCode: 'AccountSuspendedError',
    statusCode: 401,
    message:
      'Action cannot be completed. Please contact Admin for further support',
  },

  FileSizeError: {
    errorCode: 'InvalidAttachment',
    statusCode: 400,
    message: 'Invalid file',
  },
};
