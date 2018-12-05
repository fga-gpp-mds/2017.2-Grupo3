// this class is not being used!
export default class GetVisitScheduleContentError extends Error {
  constructor(response, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GetVisitScheduleContentError);
    }

    this.response = response;
  }
}
