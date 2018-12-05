export default class GetMeetingContentError extends Error {
  constructor(response, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GetMeetingContentError);
    }

    this.response = response;
  }
}
