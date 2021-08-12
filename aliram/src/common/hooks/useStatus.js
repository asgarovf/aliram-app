import { useState } from "react";

const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const FAIL = "FAIL";

/**
 * @typedef {('PENDING'|'SUCCESS'|'FAIL')} statuses
 */

/**
 * Callback for checking status state
 *
 * @callback statusState
 * @returns {boolean}
 */

/**
 * Callback for updating status state
 *
 * @callback updateStatus
 */

/**
 * Status object with useful methods and payload
 *
 * @typedef {Object} statusObject
 * @property {statusState} isPending
 * @property {statusState} isSuccess
 * @property {statusState} isFail
 * @property {updateStatus} pending
 * @property {updateStatus} success
 * @property {updateStatus} fail
 * @property {*} payload
 */

/**
 * Get an object that will reflect the status
 *
 * @param {statuses} initialState
 * @returns {statusObject}
 */
export function useStatus(initialState = "") {
  const [payload, setPayload] = useState("");
  const [status, setStatus] = useState(initialState);

  const statusObj = {
    isPending: () => status === PENDING,
    isSuccess: () => status === SUCCESS,
    isFail: () => status === FAIL,
    pending: (data) => {
      setStatus(PENDING);
      if (data) setPayload(data);
    },
    success: (data) => {
      setStatus(SUCCESS);
      if (data) setPayload(data);
    },
    fail: (data) => {
      setStatus(FAIL);
      if (data) setPayload(data);
    },
    payload,
  };

  return statusObj;
}
