import _ from "lodash";
import { REHYDRADE } from "redux-persist";
import { LIKE_JOB, CLEAR_LIKED_JOBS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRADE:
      return action.payload.likeJobs || [];
    case LIKE_JOB:
      return _.unionBy([action.payload, ...state], "jobkey");
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}
