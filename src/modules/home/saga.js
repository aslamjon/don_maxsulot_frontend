import { all, call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import Actions from "./actions";
import ApiService from "./api";
import { showError } from "../../utils";

function* loginRequest(action) {
  const {
      payload: {
          attributes,
          formMethods: { setLoading, setError },
          cb = {
              success: () => {
              },
              fail: () => {
              },
          },
      },
  } = action;

  try {
      const { data } = yield call(ApiService.Login, attributes);
      yield put({ type: Actions.LOGIN.SUCCESS, payload: { data } });
      setLoading(false);
      yield call(cb.success, { ...data });
  } catch (e) {
      yield put({ type: Actions.LOGIN.FAILURE });
      setLoading(false);
      yield call(cb.fail, {...e.response.data, status: e.response.status});
      showError(e, setError);
  }
}

export default function* sagas() {
  yield all([
    takeLatest(Actions.LOGIN.REQUEST, loginRequest),
  ]);
}