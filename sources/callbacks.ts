/*
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

/// <reference path="./externs/node.d.ts" />
/// <reference path="common.d.ts" />

import logging = require('./logging');

export class CallbackManager {

  _allCallbacks: common.Callback0[] = [];

  /**
   * Register a callback which will be invoked when invokeAllCallbacks is called.
   * Returns whether there is an ongoing request already.
   * If so, the caller should continue with its execution. Otherwise, since the caller
   * already parked the callback, it should return and when the ongoing request is done,
   * the caller's callback will be invoked.
   */
  checkOngoingAndRegisterCallback(cb: common.Callback0): boolean {
    this._allCallbacks.push(cb);
    return (this._allCallbacks.length == 1);
  }

  /**
   * All registered callbacks will be invoked and cleaned up.
   */
  invokeAllCallbacks(err: Error) {
    for(var cb of this._allCallbacks) {
      cb && cb(err);
    }
    this._allCallbacks = [];
  }

}
