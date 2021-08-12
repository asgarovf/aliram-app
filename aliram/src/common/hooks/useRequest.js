import { useEffect } from "react";
import { useRef } from "react";
import { useStatus } from "./useStatus";

/**
 * @param {import("./useStateFetch").promiseCallback} promiseCb
 * @param {Object} params
 * @param params.onStart
 * @param params.onSuccess
 * @param params.onFail
 * @param params.status
 * @param {Boolean} params.waitFinish - true: if you want to not run request while previous is pending
 * @returns {{exec: Function, status: import("./useStatus").statusObject}}
 */
export function useRequest(
  promiseCb,
  { onStart, onSuccess, onFail, status: statusProp, waitFinish } = {}
) {
  const mountedRef = useRef(false);
  const statusLoc = useStatus();

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const status = statusProp ?? statusLoc;

  const executeRequest = (...args) => {
    if (waitFinish && status.isPending()) return Promise.reject();

    const promise = promiseCb?.(...args);

    if (promise instanceof Promise) {
      status.pending();
      onStart?.();
      return promise?.then?.(
        (res) => {
          if (mountedRef.current === true) {
            status.success(res);
          }
          onSuccess?.(res, ...args);
        },
        (err) => {
          if (mountedRef.current === true) {
            status.fail(err);
          }
          onFail?.(err, ...args);
        }
      );
    }

    return Promise.reject();
  };

  return { exec: executeRequest, status };
}
