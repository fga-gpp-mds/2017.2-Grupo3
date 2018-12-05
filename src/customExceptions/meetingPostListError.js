export default class GetMeetingPostListError extends Error {
  constructor(response, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GetMeetingPostListError);
    }

    this.response = response;
  }
}
