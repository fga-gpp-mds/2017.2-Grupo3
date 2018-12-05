// this class is not being used!
export default class GetVisitSchedulePostListError extends Error {
  constructor(response, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GetVisitSchedulePostListError);
    }

    this.response = response;
  }
}
