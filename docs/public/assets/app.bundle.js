webpackJsonp([0],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchType; });
var FetchType;
(function (FetchType) {
    FetchType[FetchType["normal"] = 1] = "normal";
    FetchType[FetchType["refetch"] = 2] = "refetch";
    FetchType[FetchType["poll"] = 3] = "poll";
})(FetchType || (FetchType = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLError = GraphQLError;

var _printError = __webpack_require__(263);

var _location = __webpack_require__(264);

/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

function GraphQLError( // eslint-disable-line no-redeclare
message, nodes, source, positions, path, originalError, extensions) {
  // Compute list of blame nodes.
  var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined;

  // Compute locations in the source for the given nodes/positions.
  var _source = source;
  if (!_source && _nodes) {
    var node = _nodes[0];
    _source = node && node.loc && node.loc.source;
  }

  var _positions = positions;
  if (!_positions && _nodes) {
    _positions = _nodes.reduce(function (list, node) {
      if (node.loc) {
        list.push(node.loc.start);
      }
      return list;
    }, []);
  }
  if (_positions && _positions.length === 0) {
    _positions = undefined;
  }

  var _locations = void 0;
  if (positions && source) {
    _locations = positions.map(function (pos) {
      return (0, _location.getLocation)(source, pos);
    });
  } else if (_nodes) {
    _locations = _nodes.reduce(function (list, node) {
      if (node.loc) {
        list.push((0, _location.getLocation)(node.loc.source, node.loc.start));
      }
      return list;
    }, []);
  }

  Object.defineProperties(this, {
    message: {
      value: message,
      // By being enumerable, JSON.stringify will include `message` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: true,
      writable: true
    },
    locations: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: _locations || undefined,
      // By being enumerable, JSON.stringify will include `locations` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    path: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: path || undefined,
      // By being enumerable, JSON.stringify will include `path` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    nodes: {
      value: _nodes || undefined
    },
    source: {
      value: _source || undefined
    },
    positions: {
      value: _positions || undefined
    },
    originalError: {
      value: originalError
    },
    extensions: {
      value: extensions || originalError && originalError.extensions
    }
  });

  // Include (non-enumerable) stack trace.
  if (originalError && originalError.stack) {
    Object.defineProperty(this, 'stack', {
      value: originalError.stack,
      writable: true,
      configurable: true
    });
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(this, GraphQLError);
  } else {
    Object.defineProperty(this, 'stack', {
      value: Error().stack,
      writable: true,
      configurable: true
    });
  }
}

GraphQLError.prototype = Object.create(Error.prototype, {
  constructor: { value: GraphQLError },
  name: { value: 'GraphQLError' },
  toString: {
    value: function toString() {
      return (0, _printError.printError)(this);
    }
  }
});

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hasError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservableQuery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_utilities__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__networkStatus__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_Observable__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors_ApolloError__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__(120);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var hasError = function (storeValue, policy) {
    if (policy === void 0) { policy = 'none'; }
    return storeValue &&
        ((storeValue.graphQLErrors &&
            storeValue.graphQLErrors.length > 0 &&
            policy === 'none') ||
            storeValue.networkError);
};
var ObservableQuery = (function (_super) {
    __extends(ObservableQuery, _super);
    function ObservableQuery(_a) {
        var scheduler = _a.scheduler, options = _a.options, _b = _a.shouldSubscribe, shouldSubscribe = _b === void 0 ? true : _b;
        var _this = _super.call(this, function (observer) {
            return _this.onSubscribe(observer);
        }) || this;
        // active state
        _this.isCurrentlyPolling = false;
        _this.isTornDown = false;
        // query information
        _this.options = options;
        _this.variables = options.variables || {};
        _this.queryId = scheduler.queryManager.generateQueryId();
        _this.shouldSubscribe = shouldSubscribe;
        // related classes
        _this.scheduler = scheduler;
        _this.queryManager = scheduler.queryManager;
        // interal data stores
        _this.observers = [];
        _this.subscriptionHandles = [];
        return _this;
    }
    ObservableQuery.prototype.result = function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            var subscription;
            var observer = {
                next: function (result) {
                    resolve(result);
                    // Stop the query within the QueryManager if we can before
                    // this function returns.
                    //
                    // We do this in order to prevent observers piling up within
                    // the QueryManager. Notice that we only fully unsubscribe
                    // from the subscription in a setTimeout(..., 0)  call. This call can
                    // actually be handled by the browser at a much later time. If queries
                    // are fired in the meantime, observers that should have been removed
                    // from the QueryManager will continue to fire, causing an unnecessary
                    // performance hit.
                    if (!that.observers.some(function (obs) { return obs !== observer; })) {
                        that.queryManager.removeQuery(that.queryId);
                    }
                    setTimeout(function () {
                        subscription.unsubscribe();
                    }, 0);
                },
                error: function (error) {
                    reject(error);
                },
            };
            subscription = that.subscribe(observer);
        });
    };
    /**
     * Return the result of the query from the local cache as well as some fetching status
     * `loading` and `networkStatus` allow to know if a request is in flight
     * `partial` lets you know if the result from the local cache is complete or partial
     * @return {result: Object, loading: boolean, networkStatus: number, partial: boolean}
     */
    ObservableQuery.prototype.currentResult = function () {
        if (this.isTornDown) {
            return {
                data: this.lastError ? {} : this.lastResult ? this.lastResult.data : {},
                error: this.lastError,
                loading: false,
                networkStatus: __WEBPACK_IMPORTED_MODULE_1__networkStatus__["a" /* NetworkStatus */].error,
            };
        }
        var queryStoreValue = this.queryManager.queryStore.get(this.queryId);
        if (hasError(queryStoreValue, this.options.errorPolicy)) {
            return {
                data: {},
                loading: false,
                networkStatus: queryStoreValue.networkStatus,
                error: new __WEBPACK_IMPORTED_MODULE_3__errors_ApolloError__["a" /* ApolloError */]({
                    graphQLErrors: queryStoreValue.graphQLErrors,
                    networkError: queryStoreValue.networkError,
                }),
            };
        }
        var _a = this.queryManager.getCurrentQueryResult(this), data = _a.data, partial = _a.partial;
        var queryLoading = !queryStoreValue ||
            queryStoreValue.networkStatus === __WEBPACK_IMPORTED_MODULE_1__networkStatus__["a" /* NetworkStatus */].loading;
        // We need to be careful about the loading state we show to the user, to try
        // and be vaguely in line with what the user would have seen from .subscribe()
        // but to still provide useful information synchronously when the query
        // will not end up hitting the server.
        // See more: https://github.com/apollostack/apollo-client/issues/707
        // Basically: is there a query in flight right now (modolo the next tick)?
        var loading = (this.options.fetchPolicy === 'network-only' && queryLoading) ||
            (partial && this.options.fetchPolicy !== 'cache-only');
        // if there is nothing in the query store, it means this query hasn't fired yet or it has been cleaned up. Therefore the
        // network status is dependent on queryLoading.
        var networkStatus;
        if (queryStoreValue) {
            networkStatus = queryStoreValue.networkStatus;
        }
        else {
            networkStatus = loading ? __WEBPACK_IMPORTED_MODULE_1__networkStatus__["a" /* NetworkStatus */].loading : __WEBPACK_IMPORTED_MODULE_1__networkStatus__["a" /* NetworkStatus */].ready;
        }
        var result = {
            data: data,
            loading: Object(__WEBPACK_IMPORTED_MODULE_1__networkStatus__["b" /* isNetworkRequestInFlight */])(networkStatus),
            networkStatus: networkStatus,
        };
        if (queryStoreValue &&
            queryStoreValue.graphQLErrors &&
            this.options.errorPolicy === 'all') {
            result.errors = queryStoreValue.graphQLErrors;
        }
        if (!partial) {
            var stale = false;
            this.lastResult = __assign({}, result, { stale: stale });
        }
        return __assign({}, result, { partial: partial });
    };
    // Returns the last result that observer.next was called with. This is not the same as
    // currentResult! If you're not sure which you need, then you probably need currentResult.
    ObservableQuery.prototype.getLastResult = function () {
        return this.lastResult;
    };
    ObservableQuery.prototype.getLastError = function () {
        return this.lastError;
    };
    ObservableQuery.prototype.resetLastResults = function () {
        delete this.lastResult;
        delete this.lastError;
        this.isTornDown = false;
    };
    ObservableQuery.prototype.refetch = function (variables) {
        var fetchPolicy = this.options.fetchPolicy;
        // early return if trying to read from cache during refetch
        if (fetchPolicy === 'cache-only') {
            return Promise.reject(new Error('cache-only fetchPolicy option should not be used together with query refetch.'));
        }
        if (!Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["q" /* isEqual */])(this.variables, variables)) {
            // update observable variables
            this.variables = __assign({}, this.variables, variables);
        }
        if (!Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["q" /* isEqual */])(this.options.variables, this.variables)) {
            // Update the existing options with new variables
            this.options.variables = __assign({}, this.options.variables, this.variables);
        }
        // Override fetchPolicy for this call only
        // only network-only and no-cache are safe to use
        var isNetworkFetchPolicy = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
        var combinedOptions = __assign({}, this.options, { fetchPolicy: isNetworkFetchPolicy ? fetchPolicy : 'network-only' });
        return this.queryManager
            .fetchQuery(this.queryId, combinedOptions, __WEBPACK_IMPORTED_MODULE_4__types__["a" /* FetchType */].refetch)
            .then(function (result) { return Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["x" /* maybeDeepFreeze */])(result); });
    };
    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
        var _this = this;
        // early return if no update Query
        if (!fetchMoreOptions.updateQuery) {
            throw new Error('updateQuery option is required. This function defines how to update the query data with the new results.');
        }
        return Promise.resolve()
            .then(function () {
            var qid = _this.queryManager.generateQueryId();
            var combinedOptions;
            if (fetchMoreOptions.query) {
                // fetch a new query
                combinedOptions = fetchMoreOptions;
            }
            else {
                // fetch the same query with a possibly new variables
                combinedOptions = __assign({}, _this.options, fetchMoreOptions, { variables: __assign({}, _this.variables, fetchMoreOptions.variables) });
            }
            combinedOptions.fetchPolicy = 'network-only';
            return _this.queryManager.fetchQuery(qid, combinedOptions, __WEBPACK_IMPORTED_MODULE_4__types__["a" /* FetchType */].normal, _this.queryId);
        })
            .then(function (fetchMoreResult) {
            _this.updateQuery(function (previousResult, _a) {
                var variables = _a.variables;
                return fetchMoreOptions.updateQuery(previousResult, {
                    fetchMoreResult: fetchMoreResult.data,
                    variables: variables,
                });
            });
            return fetchMoreResult;
        });
    };
    // XXX the subscription variables are separate from the query variables.
    // if you want to update subscription variables, right now you have to do that separately,
    // and you can only do it by stopping the subscription and then subscribing again with new variables.
    ObservableQuery.prototype.subscribeToMore = function (options) {
        var _this = this;
        var subscription = this.queryManager
            .startGraphQLSubscription({
            query: options.document,
            variables: options.variables,
        })
            .subscribe({
            next: function (data) {
                if (options.updateQuery) {
                    _this.updateQuery(function (previous, _a) {
                        var variables = _a.variables;
                        return options.updateQuery(previous, {
                            subscriptionData: data,
                            variables: variables,
                        });
                    });
                }
            },
            error: function (err) {
                if (options.onError) {
                    options.onError(err);
                    return;
                }
                console.error('Unhandled GraphQL subscription error', err);
            },
        });
        this.subscriptionHandles.push(subscription);
        return function () {
            var i = _this.subscriptionHandles.indexOf(subscription);
            if (i >= 0) {
                _this.subscriptionHandles.splice(i, 1);
                subscription.unsubscribe();
            }
        };
    };
    // Note: if the query is not active (there are no subscribers), the promise
    // will return null immediately.
    ObservableQuery.prototype.setOptions = function (opts) {
        var oldOptions = this.options;
        this.options = __assign({}, this.options, opts);
        if (opts.pollInterval) {
            this.startPolling(opts.pollInterval);
        }
        else if (opts.pollInterval === 0) {
            this.stopPolling();
        }
        // If fetchPolicy went from cache-only to something else, or from something else to network-only
        var tryFetch = (oldOptions.fetchPolicy !== 'network-only' &&
            opts.fetchPolicy === 'network-only') ||
            (oldOptions.fetchPolicy === 'cache-only' &&
                opts.fetchPolicy !== 'cache-only') ||
            (oldOptions.fetchPolicy === 'standby' &&
                opts.fetchPolicy !== 'standby') ||
            false;
        return this.setVariables(this.options.variables, tryFetch, opts.fetchResults);
    };
    /**
     * Update the variables of this observable query, and fetch the new results
     * if they've changed. If you want to force new results, use `refetch`.
     *
     * Note: if the variables have not changed, the promise will return the old
     * results immediately, and the `next` callback will *not* fire.
     *
     * Note: if the query is not active (there are no subscribers), the promise
     * will return null immediately.
     *
     * @param variables: The new set of variables. If there are missing variables,
     * the previous values of those variables will be used.
     *
     * @param tryFetch: Try and fetch new results even if the variables haven't
     * changed (we may still just hit the store, but if there's nothing in there
     * this will refetch)
     *
     * @param fetchResults: Option to ignore fetching results when updating variables
     *
     */
    ObservableQuery.prototype.setVariables = function (variables, tryFetch, fetchResults) {
        if (tryFetch === void 0) { tryFetch = false; }
        if (fetchResults === void 0) { fetchResults = true; }
        // since setVariables restarts the subscription, we reset the tornDown status
        this.isTornDown = false;
        var newVariables = variables ? variables : this.variables;
        if (Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["q" /* isEqual */])(newVariables, this.variables) && !tryFetch) {
            // If we have no observers, then we don't actually want to make a network
            // request. As soon as someone observes the query, the request will kick
            // off. For now, we just store any changes. (See #1077)
            if (this.observers.length === 0 || !fetchResults) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.result();
        }
        else {
            this.lastVariables = this.variables;
            this.variables = newVariables;
            this.options.variables = newVariables;
            // See comment above
            if (this.observers.length === 0) {
                return new Promise(function (resolve) { return resolve(); });
            }
            // Use the same options as before, but with new variables
            return this.queryManager
                .fetchQuery(this.queryId, __assign({}, this.options, { variables: this.variables }))
                .then(function (result) { return Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["x" /* maybeDeepFreeze */])(result); });
        }
    };
    ObservableQuery.prototype.updateQuery = function (mapFn) {
        var _a = this.queryManager.getQueryWithPreviousResult(this.queryId), previousResult = _a.previousResult, variables = _a.variables, document = _a.document;
        var newResult = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["D" /* tryFunctionOrLogError */])(function () {
            return mapFn(previousResult, { variables: variables });
        });
        if (newResult) {
            this.queryManager.dataStore.markUpdateQueryResult(document, variables, newResult);
            this.queryManager.broadcastQueries();
        }
    };
    ObservableQuery.prototype.stopPolling = function () {
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.options.pollInterval = undefined;
            this.isCurrentlyPolling = false;
        }
    };
    ObservableQuery.prototype.startPolling = function (pollInterval) {
        if (this.options.fetchPolicy === 'cache-first' ||
            this.options.fetchPolicy === 'cache-only') {
            throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
        }
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.options.pollInterval = pollInterval;
        this.isCurrentlyPolling = true;
        this.scheduler.startPollingQuery(this.options, this.queryId);
    };
    ObservableQuery.prototype.onSubscribe = function (observer) {
        var _this = this;
        // Zen Observable has its own error function, in order to log correctly
        // we need to declare a custom error if nothing is passed
        if (observer._subscription &&
            observer._subscription._observer &&
            !observer._subscription._observer.error) {
            observer._subscription._observer.error = function (error) {
                console.error('Unhandled error', error.message, error.stack);
            };
        }
        this.observers.push(observer);
        // Deliver initial result
        if (observer.next && this.lastResult)
            observer.next(this.lastResult);
        if (observer.error && this.lastError)
            observer.error(this.lastError);
        // setup the query if it hasn't been done before
        if (this.observers.length === 1)
            this.setUpQuery();
        return function () {
            _this.observers = _this.observers.filter(function (obs) { return obs !== observer; });
            if (_this.observers.length === 0) {
                _this.tearDownQuery();
            }
        };
    };
    ObservableQuery.prototype.setUpQuery = function () {
        var _this = this;
        if (this.shouldSubscribe) {
            this.queryManager.addObservableQuery(this.queryId, this);
        }
        if (!!this.options.pollInterval) {
            if (this.options.fetchPolicy === 'cache-first' ||
                this.options.fetchPolicy === 'cache-only') {
                throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
            }
            this.isCurrentlyPolling = true;
            this.scheduler.startPollingQuery(this.options, this.queryId);
        }
        var observer = {
            next: function (result) {
                _this.lastResult = result;
                _this.observers.forEach(function (obs) { return obs.next && obs.next(result); });
            },
            error: function (error) {
                _this.lastError = error;
                _this.observers.forEach(function (obs) { return obs.error && obs.error(error); });
            },
        };
        this.queryManager.startQuery(this.queryId, this.options, this.queryManager.queryListenerForObserver(this.queryId, this.options, observer));
    };
    ObservableQuery.prototype.tearDownQuery = function () {
        this.isTornDown = true;
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        // stop all active GraphQL subscriptions
        this.subscriptionHandles.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptionHandles = [];
        this.queryManager.removeObservableQuery(this.queryId);
        this.queryManager.stopQuery(this.queryId);
        this.observers = [];
    };
    return ObservableQuery;
}(__WEBPACK_IMPORTED_MODULE_2__util_Observable__["a" /* Observable */]));

//# sourceMappingURL=ObservableQuery.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isScalarValue */
/* unused harmony export isNumberValue */
/* harmony export (immutable) */ __webpack_exports__["j"] = valueToObjectRepresentation;
/* harmony export (immutable) */ __webpack_exports__["h"] = storeKeyNameFromField;
/* harmony export (immutable) */ __webpack_exports__["b"] = getStoreKeyName;
/* harmony export (immutable) */ __webpack_exports__["a"] = argumentsObjectFromField;
/* harmony export (immutable) */ __webpack_exports__["g"] = resultKeyNameFromField;
/* harmony export (immutable) */ __webpack_exports__["c"] = isField;
/* harmony export (immutable) */ __webpack_exports__["e"] = isInlineFragment;
/* harmony export (immutable) */ __webpack_exports__["d"] = isIdValue;
/* harmony export (immutable) */ __webpack_exports__["i"] = toIdValue;
/* harmony export (immutable) */ __webpack_exports__["f"] = isJsonValue;
/* unused harmony export valueFromNode */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function isScalarValue(value) {
    return ['StringValue', 'BooleanValue', 'EnumValue'].indexOf(value.kind) > -1;
}
function isNumberValue(value) {
    return ['IntValue', 'FloatValue'].indexOf(value.kind) > -1;
}
function isStringValue(value) {
    return value.kind === 'StringValue';
}
function isBooleanValue(value) {
    return value.kind === 'BooleanValue';
}
function isIntValue(value) {
    return value.kind === 'IntValue';
}
function isFloatValue(value) {
    return value.kind === 'FloatValue';
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObjectValue(value) {
    return value.kind === 'ObjectValue';
}
function isListValue(value) {
    return value.kind === 'ListValue';
}
function isEnumValue(value) {
    return value.kind === 'EnumValue';
}
function isNullValue(value) {
    return value.kind === 'NullValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) {
            return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
        });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isNullValue(value)) {
        argObj[name.value] = null;
    }
    else {
        throw new Error("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\" is not supported.\n                    Use variables instead of inline arguments to overcome this limitation.");
    }
}
function storeKeyNameFromField(field, variables) {
    var directivesObj = null;
    if (field.directives) {
        directivesObj = {};
        field.directives.forEach(function (directive) {
            directivesObj[directive.name.value] = {};
            if (directive.arguments) {
                directive.arguments.forEach(function (_a) {
                    var name = _a.name, value = _a.value;
                    return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
                });
            }
        });
    }
    var argObj = null;
    if (field.arguments && field.arguments.length) {
        argObj = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj, name, value, variables);
        });
    }
    return getStoreKeyName(field.name.value, argObj, directivesObj);
}
var KNOWN_DIRECTIVES = [
    'connection',
    'include',
    'skip',
    'client',
    'rest',
    'export',
];
function getStoreKeyName(fieldName, args, directives) {
    if (directives &&
        directives['connection'] &&
        directives['connection']['key']) {
        if (directives['connection']['filter'] &&
            directives['connection']['filter'].length > 0) {
            var filterKeys = directives['connection']['filter']
                ? directives['connection']['filter']
                : [];
            filterKeys.sort();
            var queryArgs_1 = args;
            var filteredArgs_1 = {};
            filterKeys.forEach(function (key) {
                filteredArgs_1[key] = queryArgs_1[key];
            });
            return directives['connection']['key'] + "(" + JSON.stringify(filteredArgs_1) + ")";
        }
        else {
            return directives['connection']['key'];
        }
    }
    var completeFieldName = fieldName;
    if (args) {
        var stringifiedArgs = JSON.stringify(args);
        completeFieldName += "(" + stringifiedArgs + ")";
    }
    if (directives) {
        Object.keys(directives).forEach(function (key) {
            if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
                return;
            if (directives[key] && Object.keys(directives[key]).length) {
                completeFieldName += "@" + key + "(" + JSON.stringify(directives[key]) + ")";
            }
            else {
                completeFieldName += "@" + key;
            }
        });
    }
    return completeFieldName;
}
function argumentsObjectFromField(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return argObj_1;
    }
    return null;
}
function resultKeyNameFromField(field) {
    return field.alias ? field.alias.value : field.name.value;
}
function isField(selection) {
    return selection.kind === 'Field';
}
function isInlineFragment(selection) {
    return selection.kind === 'InlineFragment';
}
function isIdValue(idObject) {
    return idObject && idObject.type === 'id';
}
function toIdValue(idConfig, generated) {
    if (generated === void 0) { generated = false; }
    return __assign({ type: 'id', generated: generated }, (typeof idConfig === 'string'
        ? { id: idConfig, typename: undefined }
        : idConfig));
}
function isJsonValue(jsonObject) {
    return (jsonObject != null &&
        typeof jsonObject === 'object' &&
        jsonObject.type === 'json');
}
function defaultValueFromVariable(node) {
    throw new Error("Variable nodes are not supported by valueFromNode");
}
/**
 * Evaluate a ValueNode and yield its value in its natural JS form.
 */
function valueFromNode(node, onVariable) {
    if (onVariable === void 0) { onVariable = defaultValueFromVariable; }
    switch (node.kind) {
        case 'Variable':
            return onVariable(node);
        case 'NullValue':
            return null;
        case 'IntValue':
            return parseInt(node.value);
        case 'FloatValue':
            return parseFloat(node.value);
        case 'ListValue':
            return node.values.map(function (v) { return valueFromNode(v, onVariable); });
        case 'ObjectValue': {
            var value = {};
            for (var _i = 0, _a = node.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                value[field.name.value] = valueFromNode(field.value, onVariable);
            }
            return value;
        }
        default:
            return node.value;
    }
}
//# sourceMappingURL=storeUtils.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export getEnv */
/* unused harmony export isEnv */
/* harmony export (immutable) */ __webpack_exports__["b"] = isProduction;
/* harmony export (immutable) */ __webpack_exports__["a"] = isDevelopment;
/* harmony export (immutable) */ __webpack_exports__["c"] = isTest;
function getEnv() {
    if (typeof process !== 'undefined' && "dev") {
        return "dev";
    }
    // default environment
    return 'development';
}
function isEnv(env) {
    return getEnv() === env;
}
function isProduction() {
    return isEnv('production') === true;
}
function isDevelopment() {
    return isEnv('development') === true;
}
function isTest() {
    return isEnv('test') === true;
}
//# sourceMappingURL=environment.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(119)))

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__zenObservable__ = __webpack_require__(271);
/* unused harmony namespace reexport */


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__zenObservable__["a" /* Observable */]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isApolloError;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApolloError; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function isApolloError(err) {
    return err.hasOwnProperty('graphQLErrors');
}
// Sets the error message on this error according to the
// the GraphQL and network errors that are present.
// If the error message has already been set through the
// constructor or otherwise, this function is a nop.
var generateErrorMessage = function (err) {
    var message = '';
    // If we have GraphQL errors present, add that to the error message.
    if (Array.isArray(err.graphQLErrors) && err.graphQLErrors.length !== 0) {
        err.graphQLErrors.forEach(function (graphQLError) {
            var errorMessage = graphQLError
                ? graphQLError.message
                : 'Error message not found.';
            message += "GraphQL error: " + errorMessage + "\n";
        });
    }
    if (err.networkError) {
        message += 'Network error: ' + err.networkError.message + '\n';
    }
    // strip newline from the end of the message
    message = message.replace(/\n$/, '');
    return message;
};
var ApolloError = (function (_super) {
    __extends(ApolloError, _super);
    // Constructs an instance of ApolloError given a GraphQLError
    // or a network error. Note that one of these has to be a valid
    // value or the constructed error will be meaningless.
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.graphQLErrors = graphQLErrors || [];
        _this.networkError = networkError || null;
        if (!errorMessage) {
            _this.message = generateErrorMessage(_this);
        }
        else {
            _this.message = errorMessage;
        }
        _this.extraInfo = extraInfo;
        Object.setPrototypeOf(_this, ApolloError.prototype);
        return _this;
    }
    return ApolloError;
}(Error));

//# sourceMappingURL=ApolloError.js.map

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(273),
    baseLodash = __webpack_require__(176);

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

module.exports = LodashWrapper;


/***/ }),

/***/ 175:
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 176:
/***/ (function(module, exports) {

/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

module.exports = baseLodash;


/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(178);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(739);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 179:
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 180:
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(273),
    baseLodash = __webpack_require__(176);

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

module.exports = LazyWrapper;


/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectCache; });
/* harmony export (immutable) */ __webpack_exports__["b"] = defaultNormalizedCacheFactory;
var ObjectCache = /** @class */ (function () {
    function ObjectCache(data) {
        if (data === void 0) { data = Object.create(null); }
        this.data = data;
    }
    ObjectCache.prototype.toObject = function () {
        return this.data;
    };
    ObjectCache.prototype.get = function (dataId) {
        return this.data[dataId];
    };
    ObjectCache.prototype.set = function (dataId, value) {
        this.data[dataId] = value;
    };
    ObjectCache.prototype.delete = function (dataId) {
        this.data[dataId] = undefined;
    };
    ObjectCache.prototype.clear = function () {
        this.data = Object.create(null);
    };
    ObjectCache.prototype.replace = function (newData) {
        this.data = newData || Object.create(null);
    };
    return ObjectCache;
}());

function defaultNormalizedCacheFactory(seed) {
    return new ObjectCache(seed);
}
//# sourceMappingURL=objectCache.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Router__ = __webpack_require__(121);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Router__["a" /* default */]);

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jumbotron_Jumbotron__ = __webpack_require__(800);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__jumbotron_Jumbotron__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigation_NavigationBar__ = __webpack_require__(801);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__navigation_NavigationBar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__backToTop_BackToTop__ = __webpack_require__(807);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__backToTop_BackToTop__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animatedView_AnimatedView__ = __webpack_require__(96);
/* unused harmony reexport AnimatedView */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logoutRoute_LogoutRoute__ = __webpack_require__(299);
/* unused harmony reexport LogoutRoute */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__privateRoute_PrivateRoute__ = __webpack_require__(423);
/* unused harmony reexport PrivateRoute */
//  weak








/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export auth */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode__ = __webpack_require__(818);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);





var TOKEN_KEY = 'token';
var USER_INFO = 'userInfo';

var APP_PERSIST_STORES_TYPES = ['localStorage', 'sessionStorage'];

var parse = JSON.parse;
var stringify = JSON.stringify;

/*
  auth object
  -> store "TOKEN_KEY"
  - default storage is "localStorage"
  - default token key is 'token'
 */
var auth = {
  // /////////////////////////////////////////////////////////////
  // TOKEN
  // /////////////////////////////////////////////////////////////

  /**
   * get token from localstorage
   *
   * @param {'localStorage' | 'sessionStorage'} [fromStorage='localStorage'] specify storage
   * @param {any} [tokenKey=TOKEN_KEY]  optionnal parameter to specify a token key
   * @returns {string} token value
   */
  getToken: function getToken() {
    var fromStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : APP_PERSIST_STORES_TYPES[0];
    var tokenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TOKEN_KEY;

    // localStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
      return localStorage && localStorage.getItem(tokenKey) || null;
    }
    // sessionStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
      return sessionStorage && sessionStorage.getItem(tokenKey) || null;
    }
    // default:
    return null;
  },


  /**
  * set the token value into localstorage (managed by localforage)
  *
  * @param {string} [value=''] token value
  * @param {'localStorage' | 'sessionStorage'} [toStorage='localStorage'] specify storage
  * @param {any} [tokenKey='token'] token key
  * @returns {boolean} success/failure flag
  */
  setToken: function setToken() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var toStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : APP_PERSIST_STORES_TYPES[0];
    var tokenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TOKEN_KEY;

    if (!value || value.length <= 0) {
      return;
    }
    // localStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
      if (localStorage) {
        localStorage.setItem(tokenKey, value);
      }
    }
    // sessionStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
      if (sessionStorage) {
        sessionStorage.setItem(tokenKey, value);
      }
    }
  },


  /**
   * check
   * - if token key contains a valid token value (defined and not an empty value)
   * - if the token expiration date is passed
   *
   *
   * Note: 'isAuthenticated' just checks 'tokenKey' on store (localStorage by default or sessionStorage)
   *
   * You may think: 'ok I just put an empty token key and I have access to protected routes?''
   *    -> answer is:  YES^^
   * BUT
   * -> : your backend will not recognize a wrong token so private data or safe and you protected view could be a bit ugly without any data.
   *
   * => ON CONCLUSION: this aim of 'isAuthenticated'
   *    -> is to help for a better "user experience"  (= better than displaying a view with no data since server did not accept the user).
   *    -> it is not a security purpose (security comes from backend, since frontend is easily hackable => user has access to all your frontend)
   *
   * @param {'localStorage' | 'sessionStorage'} [fromStorage='localStorage'] specify storage
   * @param {any} [tokenKey=TOKEN_KEY] token key
   * @returns {bool} is authenticed response
   */
  isAuthenticated: function isAuthenticated() {
    var fromStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : APP_PERSIST_STORES_TYPES[0];
    var tokenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TOKEN_KEY;

    // localStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
      if (localStorage && localStorage.getItem(tokenKey)) {
        return true;
      } else {
        return false;
      }
    }
    // sessionStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
      if (sessionStorage && sessionStorage.getItem(tokenKey)) {
        return true;
      } else {
        return false;
      }
    }
    // default:
    return false;
  },


  /**
   * delete token
   *
   * @param {any} [tokenKey='token'] token key
   * @returns {bool} success/failure flag
   */
  clearToken: function clearToken() {
    var storage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : APP_PERSIST_STORES_TYPES[0];
    var tokenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TOKEN_KEY;

    // localStorage:
    if (localStorage && localStorage[tokenKey]) {
      localStorage.removeItem(tokenKey);
      return true;
    }
    // sessionStorage:
    if (sessionStorage && sessionStorage[tokenKey]) {
      sessionStorage.removeItem(tokenKey);
      return true;
    }

    return false;
  },


  /**
   * return expiration date from token
   *
   * @param {string} encodedToken - base 64 token received from server and stored in local storage
   * @returns {date | null} returns expiration date or null id expired props not found in decoded token
   */
  getTokenExpirationDate: function getTokenExpirationDate(encodedToken) {
    if (!encodedToken) {
      return new Date(0); // is expired
    }

    var token = __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default()(encodedToken);
    if (!token.exp) {
      return new Date(0); // is expired
    }

    var expirationDate = new Date(token.exp * 1000);
    return expirationDate;
  },


  /**
   * tell is token is expired (compared to now)
   *
   * @param {string} encodedToken - base 64 token received from server and stored in local storage
   * @returns {bool} returns true if expired else false
   */
  isExpiredToken: function isExpiredToken(encodedToken) {
    var expirationDate = this.getTokenExpirationDate(encodedToken);
    var rightNow = __WEBPACK_IMPORTED_MODULE_1_moment___default()();
    var isExpiredToken = __WEBPACK_IMPORTED_MODULE_1_moment___default()(rightNow).isAfter(__WEBPACK_IMPORTED_MODULE_1_moment___default()(expirationDate));

    return isExpiredToken;
  },


  // /////////////////////////////////////////////////////////////
  // USER_INFO
  // /////////////////////////////////////////////////////////////
  /**
   * get user info from localstorage
   *
   * @param {'localStorage' | 'sessionStorage'} [fromStorage='localStorage'] specify storage
   * @param {any} [userInfoKey='userInfo']  optionnal parameter to specify a token key
   * @returns {string} token value
   */
  getUserInfo: function getUserInfo() {
    var fromStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : APP_PERSIST_STORES_TYPES[0];
    var userInfoKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : USER_INFO;

    // localStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
      return localStorage && parse(localStorage.getItem(userInfoKey)) || null;
    }
    // sessionStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
      return sessionStorage && parse(sessionStorage.getItem(userInfoKey)) || null;
    }
    // default:
    return null;
  },


  /**
   * set the userInfo value into localstorage
   *
   * @param {object} [value=''] token value
   * @param {'localStorage' | 'sessionStorage'} [toStorage='localStorage'] specify storage
   * @param {any} [userInfoKey='userInfo'] token key
   * @returns {boolean} success/failure flag
   */
  setUserInfo: function setUserInfo() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var toStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : APP_PERSIST_STORES_TYPES[0];
    var userInfoKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : USER_INFO;

    if (!value || value.length <= 0) {
      return;
    }
    // localStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
      if (localStorage) {
        localStorage.setItem(userInfoKey, stringify(value));
      }
    }
    // sessionStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
      if (sessionStorage) {
        sessionStorage.setItem(userInfoKey, stringify(value));
      }
    }
  },


  /**
   * delete userInfo
   *
   * @param {string} [userInfoKey='userInfo'] token key
   * @returns {bool} success/failure flag
   */
  clearUserInfo: function clearUserInfo() {
    var userInfoKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : USER_INFO;

    // localStorage:
    if (localStorage && localStorage[userInfoKey]) {
      localStorage.removeItem(userInfoKey);
    }
    // sessionStorage:
    if (sessionStorage && sessionStorage[userInfoKey]) {
      sessionStorage.removeItem(userInfoKey);
    }
  },


  // /////////////////////////////////////////////////////////////
  // COMMON
  // /////////////////////////////////////////////////////////////

  /**
   * forget me method: clear all
   * @returns {bool} success/failure flag
   */
  clearAllAppStorage: function clearAllAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }
    if (sessionStorage) {
      sessionStorage.clear();
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (auth);

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(699);

var parse = parser.parse;

// Strip insignificant whitespace
// Note that this could do a lot more, such as reorder fields etc.
function normalize(string) {
  return string.replace(/[\s,]+/g, ' ').trim();
}

// A map docString -> graphql document
var docCache = {};

// A map fragmentName -> [normalized source]
var fragmentSourceMap = {};

function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}

// For testing.
function resetCaches() {
  docCache = {};
  fragmentSourceMap = {};
}

// Take a unstripped parsed document (query/mutation or even fragment), and
// check all fragment definitions, checking for name->source uniqueness.
// We also want to make sure only unique fragments exist in the document.
var printFragmentWarnings = true;
function processFragments(ast) {
  var astFragmentMap = {};
  var definitions = [];

  for (var i = 0; i < ast.definitions.length; i++) {
    var fragmentDefinition = ast.definitions[i];

    if (fragmentDefinition.kind === 'FragmentDefinition') {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);

      // We know something about this fragment
      if (fragmentSourceMap.hasOwnProperty(fragmentName) && !fragmentSourceMap[fragmentName][sourceKey]) {

        // this is a problem because the app developer is trying to register another fragment with
        // the same name as one previously registered. So, we tell them about it.
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\n"
            + "graphql-tag enforces all fragment names across your application to be unique; read more about\n"
            + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }

        fragmentSourceMap[fragmentName][sourceKey] = true;

      } else if (!fragmentSourceMap.hasOwnProperty(fragmentName)) {
        fragmentSourceMap[fragmentName] = {};
        fragmentSourceMap[fragmentName][sourceKey] = true;
      }

      if (!astFragmentMap[sourceKey]) {
        astFragmentMap[sourceKey] = true;
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  }

  ast.definitions = definitions;
  return ast;
}

function disableFragmentWarnings() {
  printFragmentWarnings = false;
}

function stripLoc(doc, removeLocAtThisLevel) {
  var docType = Object.prototype.toString.call(doc);

  if (docType === '[object Array]') {
    return doc.map(function (d) {
      return stripLoc(d, removeLocAtThisLevel);
    });
  }

  if (docType !== '[object Object]') {
    throw new Error('Unexpected input.');
  }

  // We don't want to remove the root loc field so we can use it
  // for fragment substitution (see below)
  if (removeLocAtThisLevel && doc.loc) {
    delete doc.loc;
  }

  // https://github.com/apollographql/graphql-tag/issues/40
  if (doc.loc) {
    delete doc.loc.startToken;
    delete doc.loc.endToken;
  }

  var keys = Object.keys(doc);
  var key;
  var value;
  var valueType;

  for (key in keys) {
    if (keys.hasOwnProperty(key)) {
      value = doc[keys[key]];
      valueType = Object.prototype.toString.call(value);

      if (valueType === '[object Object]' || valueType === '[object Array]') {
        doc[keys[key]] = stripLoc(value, true);
      }
    }
  }

  return doc;
}

var experimentalFragmentVariables = false;
function parseDocument(doc) {
  var cacheKey = normalize(doc);

  if (docCache[cacheKey]) {
    return docCache[cacheKey];
  }

  var parsed = parse(doc, { experimentalFragmentVariables: experimentalFragmentVariables });
  if (!parsed || parsed.kind !== 'Document') {
    throw new Error('Not a valid GraphQL document.');
  }

  // check that all "new" fragments inside the documents are consistent with
  // existing fragments of the same name
  parsed = processFragments(parsed);
  parsed = stripLoc(parsed, false);
  docCache[cacheKey] = parsed;

  return parsed;
}

function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}

function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}

// XXX This should eventually disallow arbitrary string interpolation, like Relay does
function gql(/* arguments */) {
  var args = Array.prototype.slice.call(arguments);

  var literals = args[0];

  // We always get literals[0] and then matching post literals for each arg given
  var result = (typeof(literals) === "string") ? literals : literals[0];

  for (var i = 1; i < args.length; i++) {
    if (args[i] && args[i].kind && args[i].kind === 'Document') {
      result += args[i].loc.source.body;
    } else {
      result += args[i];
    }

    result += literals[i];
  }

  return parseDocument(result);
}

// Support typescript, which isn't as nice as Babel about default exports
gql.default = gql;
gql.resetCaches = resetCaches;
gql.disableFragmentWarnings = disableFragmentWarnings;
gql.enableExperimentalFragmentVariables = enableExperimentalFragmentVariables;
gql.disableExperimentalFragmentVariables = disableExperimentalFragmentVariables;

module.exports = gql;


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

function invariant(condition, message) {
  /* istanbul ignore else */
  if (!condition) {
    throw new Error(message);
  }
}

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GraphQLError = __webpack_require__(168);

Object.defineProperty(exports, 'GraphQLError', {
  enumerable: true,
  get: function get() {
    return _GraphQLError.GraphQLError;
  }
});

var _syntaxError = __webpack_require__(701);

Object.defineProperty(exports, 'syntaxError', {
  enumerable: true,
  get: function get() {
    return _syntaxError.syntaxError;
  }
});

var _locatedError = __webpack_require__(702);

Object.defineProperty(exports, 'locatedError', {
  enumerable: true,
  get: function get() {
    return _locatedError.locatedError;
  }
});

var _printError = __webpack_require__(263);

Object.defineProperty(exports, 'printError', {
  enumerable: true,
  get: function get() {
    return _printError.printError;
  }
});

var _formatError = __webpack_require__(703);

Object.defineProperty(exports, 'formatError', {
  enumerable: true,
  get: function get() {
    return _formatError.formatError;
  }
});

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printError = printError;

var _location = __webpack_require__(264);

/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 */
function printError(error) {
  var printedLocations = [];
  if (error.nodes) {
    error.nodes.forEach(function (node) {
      if (node.loc) {
        printedLocations.push(highlightSourceAtLocation(node.loc.source, (0, _location.getLocation)(node.loc.source, node.loc.start)));
      }
    });
  } else if (error.source && error.locations) {
    var source = error.source;
    error.locations.forEach(function (location) {
      printedLocations.push(highlightSourceAtLocation(source, location));
    });
  }
  return printedLocations.length === 0 ? error.message : [error.message].concat(printedLocations).join('\n\n') + '\n';
}

/**
 * Render a helpful description of the location of the error in the GraphQL
 * Source document.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

function highlightSourceAtLocation(source, location) {
  var line = location.line;
  var lineOffset = source.locationOffset.line - 1;
  var columnOffset = getColumnOffset(source, location);
  var contextLine = line + lineOffset;
  var contextColumn = location.column + columnOffset;
  var prevLineNum = (contextLine - 1).toString();
  var lineNum = contextLine.toString();
  var nextLineNum = (contextLine + 1).toString();
  var padLen = nextLineNum.length;
  var lines = source.body.split(/\r\n|[\n\r]/g);
  lines[0] = whitespace(source.locationOffset.column - 1) + lines[0];
  var outputLines = [source.name + ' (' + contextLine + ':' + contextColumn + ')', line >= 2 && lpad(padLen, prevLineNum) + ': ' + lines[line - 2], lpad(padLen, lineNum) + ': ' + lines[line - 1], whitespace(2 + padLen + contextColumn - 1) + '^', line < lines.length && lpad(padLen, nextLineNum) + ': ' + lines[line]];
  return outputLines.filter(Boolean).join('\n');
}

function getColumnOffset(source, location) {
  return location.line === 1 ? source.locationOffset.column - 1 : 0;
}

function whitespace(len) {
  return Array(len + 1).join(' ');
}

function lpad(len, str) {
  return whitespace(len - str.length) + str;
}

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;


/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match = void 0;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return { line: line, column: column };
}

/**
 * Represents a location in a Source.
 */

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? factory(exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(266)) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'apollo-client'], factory) :
    (factory((global['react-apollo'] = {}),global.React,global.PropTypes,global.apolloClient));
}(this, (function (exports,React,PropTypes,apolloClient) { 'use strict';

    function getProps(element) {
        return element.props || element.attributes;
    }
    function isReactElement(element) {
        return !!element.type;
    }
    function isComponentClass(Comp) {
        return Comp.prototype && (Comp.prototype.render || Comp.prototype.isReactComponent);
    }
    function providesChildContext(instance) {
        return !!instance.getChildContext;
    }
    function walkTree(element, context, visitor) {
        if (Array.isArray(element)) {
            element.forEach(function (item) { return walkTree(item, context, visitor); });
            return;
        }
        if (!element) {
            return;
        }
        if (isReactElement(element)) {
            if (typeof element.type === 'function') {
                var Comp = element.type;
                var props = Object.assign({}, Comp.defaultProps, getProps(element));
                var childContext_1 = context;
                var child = void 0;
                if (isComponentClass(Comp)) {
                    var instance_1 = new Comp(props, context);
                    instance_1.props = instance_1.props || props;
                    instance_1.context = instance_1.context || context;
                    instance_1.state = instance_1.state || null;
                    instance_1.setState = function (newState) {
                        if (typeof newState === 'function') {
                            newState = newState(instance_1.state, instance_1.props, instance_1.context);
                        }
                        instance_1.state = Object.assign({}, instance_1.state, newState);
                    };
                    if (instance_1.componentWillMount) {
                        instance_1.componentWillMount();
                    }
                    if (providesChildContext(instance_1)) {
                        childContext_1 = Object.assign({}, context, instance_1.getChildContext());
                    }
                    if (visitor(element, instance_1, context, childContext_1) === false) {
                        return;
                    }
                    child = instance_1.render();
                }
                else {
                    if (visitor(element, null, context) === false) {
                        return;
                    }
                    child = Comp(props, context);
                }
                if (child) {
                    if (Array.isArray(child)) {
                        child.forEach(function (item) { return walkTree(item, childContext_1, visitor); });
                    }
                    else {
                        walkTree(child, childContext_1, visitor);
                    }
                }
            }
            else {
                if (visitor(element, null, context) === false) {
                    return;
                }
                if (element.props && element.props.children) {
                    React.Children.forEach(element.props.children, function (child) {
                        if (child) {
                            walkTree(child, context, visitor);
                        }
                    });
                }
            }
        }
        else if (typeof element === 'string' || typeof element === 'number') {
            visitor(element, null, context);
        }
    }
    function hasFetchDataFunction(instance) {
        return typeof instance.fetchData === 'function';
    }
    function isPromise(promise) {
        return typeof promise.then === 'function';
    }
    function getPromisesFromTree(_a) {
        var rootElement = _a.rootElement, _b = _a.rootContext, rootContext = _b === void 0 ? {} : _b;
        var promises = [];
        walkTree(rootElement, rootContext, function (_, instance, context, childContext) {
            if (instance && hasFetchDataFunction(instance)) {
                var promise = instance.fetchData();
                if (isPromise(promise)) {
                    promises.push({ promise: promise, context: childContext || context, instance: instance });
                    return false;
                }
            }
        });
        return promises;
    }
    function getDataFromTree(rootElement, rootContext) {
        if (rootContext === void 0) { rootContext = {}; }
        var promises = getPromisesFromTree({ rootElement: rootElement, rootContext: rootContext });
        if (!promises.length) {
            return Promise.resolve();
        }
        var errors = [];
        var mappedPromises = promises.map(function (_a) {
            var promise = _a.promise, context = _a.context, instance = _a.instance;
            return promise
                .then(function (_) { return getDataFromTree(instance.render(), context); })
                .catch(function (e) { return errors.push(e); });
        });
        return Promise.all(mappedPromises).then(function (_) {
            if (errors.length > 0) {
                var error = errors.length === 1
                    ? errors[0]
                    : new Error(errors.length + " errors were thrown when executing your fetchData functions.");
                error.queryErrors = errors;
                throw error;
            }
        });
    }

    var invariant = __webpack_require__(18);
    var ApolloConsumer = function (props, context) {
        invariant(!!context.client, "Could not find \"client\" in the context of ApolloConsumer. Wrap the root component in an <ApolloProvider>");
        return props.children(context.client);
    };
    ApolloConsumer.contextTypes = {
        client: PropTypes.object.isRequired,
    };
    ApolloConsumer.propTypes = {
        children: PropTypes.func.isRequired,
    };

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var invariant$1 = __webpack_require__(18);
    var ApolloProvider = (function (_super) {
        __extends(ApolloProvider, _super);
        function ApolloProvider(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.operations = new Map();
            invariant$1(props.client, 'ApolloClient was not passed a client instance. Make ' +
                'sure you pass in your client via the "client" prop.');
            if (!props.client.__operations_cache__) {
                props.client.__operations_cache__ = _this.operations;
            }
            return _this;
        }
        ApolloProvider.prototype.getChildContext = function () {
            return {
                client: this.props.client,
                operations: this.props.client.__operations_cache__,
            };
        };
        ApolloProvider.prototype.render = function () {
            return this.props.children;
        };
        ApolloProvider.propTypes = {
            client: PropTypes.object.isRequired,
            children: PropTypes.element.isRequired,
        };
        ApolloProvider.childContextTypes = {
            client: PropTypes.object.isRequired,
            operations: PropTypes.object,
        };
        return ApolloProvider;
    }(React.Component));

    var invariant$2 = __webpack_require__(18);
    var DocumentType;
    (function (DocumentType) {
        DocumentType[DocumentType["Query"] = 0] = "Query";
        DocumentType[DocumentType["Mutation"] = 1] = "Mutation";
        DocumentType[DocumentType["Subscription"] = 2] = "Subscription";
    })(DocumentType || (DocumentType = {}));
    var cache = new Map();
    function parser(document) {
        var cached = cache.get(document);
        if (cached)
            return cached;
        var variables, type, name;
        invariant$2(!!document && !!document.kind, "Argument of " + document + " passed to parser was not a valid GraphQL " +
            "DocumentNode. You may need to use 'graphql-tag' or another method " +
            "to convert your operation into a document");
        var fragments = document.definitions.filter(function (x) { return x.kind === 'FragmentDefinition'; });
        var queries = document.definitions.filter(function (x) { return x.kind === 'OperationDefinition' && x.operation === 'query'; });
        var mutations = document.definitions.filter(function (x) { return x.kind === 'OperationDefinition' && x.operation === 'mutation'; });
        var subscriptions = document.definitions.filter(function (x) { return x.kind === 'OperationDefinition' && x.operation === 'subscription'; });
        invariant$2(!fragments.length || (queries.length || mutations.length || subscriptions.length), "Passing only a fragment to 'graphql' is not yet supported. " +
            "You must include a query, subscription or mutation as well");
        invariant$2(queries.length + mutations.length + subscriptions.length <= 1, "react-apollo only supports a query, subscription, or a mutation per HOC. " +
            (document + " had " + queries.length + " queries, " + subscriptions.length + " ") +
            ("subscriptions and " + mutations.length + " mutations. ") +
            "You can use 'compose' to join multiple operation types to a component");
        type = queries.length ? DocumentType.Query : DocumentType.Mutation;
        if (!queries.length && !mutations.length)
            type = DocumentType.Subscription;
        var definitions = queries.length ? queries : mutations.length ? mutations : subscriptions;
        invariant$2(definitions.length === 1, "react-apollo only supports one defintion per HOC. " + document + " had " +
            (definitions.length + " definitions. ") +
            "You can use 'compose' to join multiple operation types to a component");
        var definition = definitions[0];
        variables = definition.variableDefinitions || [];
        if (definition.name && definition.name.kind === 'Name') {
            name = definition.name.value;
        }
        else {
            name = 'data';
        }
        var payload = { name: name, type: type, variables: variables };
        cache.set(document, payload);
        return payload;
    }

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __rest = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };
    var shallowEqual = __webpack_require__(118);
    var invariant$3 = __webpack_require__(18);
    function compact(obj) {
        return Object.keys(obj).reduce(function (acc, key) {
            if (obj[key] !== undefined) {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    }
    function observableQueryFields(observable) {
        var fields = {
            variables: observable.variables,
            refetch: observable.refetch.bind(observable),
            fetchMore: observable.fetchMore.bind(observable),
            updateQuery: observable.updateQuery.bind(observable),
            startPolling: observable.startPolling.bind(observable),
            stopPolling: observable.stopPolling.bind(observable),
            subscribeToMore: observable.subscribeToMore.bind(observable),
        };
        return fields;
    }
    var Query = (function (_super) {
        __extends$1(Query, _super);
        function Query(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.previousData = {};
            _this.startQuerySubscription = function () {
                if (_this.querySubscription)
                    return;
                var current = _this.getQueryResult();
                _this.querySubscription = _this.queryObservable.subscribe({
                    next: function () {
                        if (current && current.networkStatus === 7) {
                            current = undefined;
                            return;
                        }
                        _this.updateCurrentData();
                    },
                    error: function (error) {
                        _this.resubscribeToQuery();
                        if (!error.hasOwnProperty('graphQLErrors'))
                            throw error;
                        _this.updateCurrentData();
                    },
                });
            };
            _this.removeQuerySubscription = function () {
                if (_this.querySubscription) {
                    _this.querySubscription.unsubscribe();
                    delete _this.querySubscription;
                }
            };
            _this.updateCurrentData = function () {
                if (_this.hasMounted)
                    _this.forceUpdate();
            };
            _this.getQueryResult = function () {
                var data = { data: Object.create(null) };
                Object.assign(data, observableQueryFields(_this.queryObservable));
                var currentResult = _this.queryObservable.currentResult();
                var loading = currentResult.loading, networkStatus = currentResult.networkStatus, errors = currentResult.errors;
                var error = currentResult.error;
                if (errors && errors.length > 0) {
                    error = new apolloClient.ApolloError({ graphQLErrors: errors });
                }
                Object.assign(data, { loading: loading, networkStatus: networkStatus, error: error });
                if (loading) {
                    Object.assign(data.data, _this.previousData, currentResult.data);
                }
                else if (error) {
                    Object.assign(data, {
                        data: (_this.queryObservable.getLastResult() || {}).data,
                    });
                }
                else {
                    Object.assign(data.data, currentResult.data);
                    _this.previousData = currentResult.data;
                }
                if (!_this.querySubscription) {
                    var oldRefetch_1 = data.refetch;
                    data.refetch = function (args) {
                        if (_this.querySubscription) {
                            return oldRefetch_1(args);
                        }
                        else {
                            return new Promise(function (r, f) {
                                _this.refetcherQueue = { resolve: r, reject: f, args: args };
                            });
                        }
                    };
                }
                data.client = _this.client;
                return data;
            };
            _this.client = props.client || context.client;
            invariant$3(!!_this.client, "Could not find \"client\" in the context of Query or as passed props. Wrap the root component in an <ApolloProvider>");
            _this.initializeQueryObservable(props);
            return _this;
        }
        Query.prototype.fetchData = function () {
            if (this.props.skip)
                return false;
            var _a = this.props, children = _a.children, ssr = _a.ssr, displayName = _a.displayName, skip = _a.skip, client = _a.client, opts = __rest(_a, ["children", "ssr", "displayName", "skip", "client"]);
            var fetchPolicy = opts.fetchPolicy;
            if (ssr === false)
                return false;
            if (fetchPolicy === 'network-only' || fetchPolicy === 'cache-and-network') {
                fetchPolicy = 'cache-first';
            }
            var observable = this.client.watchQuery(__assign({}, opts, { fetchPolicy: fetchPolicy }));
            var result = this.queryObservable.currentResult();
            return result.loading ? observable.result() : false;
        };
        Query.prototype.componentDidMount = function () {
            this.hasMounted = true;
            if (this.props.skip)
                return;
            this.startQuerySubscription();
            if (this.refetcherQueue) {
                var _a = this.refetcherQueue, args = _a.args, resolve = _a.resolve, reject = _a.reject;
                this.queryObservable.refetch(args)
                    .then(resolve)
                    .catch(reject);
            }
        };
        Query.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
            if (nextProps.skip && !this.props.skip) {
                this.removeQuerySubscription();
                return;
            }
            var client = nextProps.client;
            if (shallowEqual(this.props, nextProps) &&
                (this.client === client || this.client === nextContext.client)) {
                return;
            }
            if (this.client !== client && this.client !== nextContext.client) {
                if (client) {
                    this.client = client;
                }
                else {
                    this.client = nextContext.client;
                }
                this.removeQuerySubscription();
                this.queryObservable = null;
                this.previousData = {};
                this.updateQuery(nextProps);
            }
            if (this.props.query !== nextProps.query) {
                this.removeQuerySubscription();
            }
            this.updateQuery(nextProps);
            if (nextProps.skip)
                return;
            this.startQuerySubscription();
        };
        Query.prototype.componentWillUnmount = function () {
            this.removeQuerySubscription();
            this.hasMounted = false;
        };
        Query.prototype.render = function () {
            var children = this.props.children;
            var queryResult = this.getQueryResult();
            return children(queryResult);
        };
        Query.prototype.extractOptsFromProps = function (props) {
            var variables = props.variables, pollInterval = props.pollInterval, fetchPolicy = props.fetchPolicy, errorPolicy = props.errorPolicy, notifyOnNetworkStatusChange = props.notifyOnNetworkStatusChange, query = props.query, _a = props.displayName, displayName = _a === void 0 ? 'Query' : _a, _b = props.context, context = _b === void 0 ? {} : _b;
            this.operation = parser(query);
            invariant$3(this.operation.type === DocumentType.Query, "The <Query /> component requires a graphql query, but got a " + (this.operation.type === DocumentType.Mutation ? 'mutation' : 'subscription') + ".");
            return compact({
                variables: variables,
                pollInterval: pollInterval,
                query: query,
                fetchPolicy: fetchPolicy,
                errorPolicy: errorPolicy,
                notifyOnNetworkStatusChange: notifyOnNetworkStatusChange,
                metadata: { reactComponent: { displayName: displayName } },
                context: context,
            });
        };
        Query.prototype.initializeQueryObservable = function (props) {
            var opts = this.extractOptsFromProps(props);
            if (this.context.operations) {
                this.context.operations.set(this.operation.name, {
                    query: opts.query,
                    variables: opts.variables,
                });
            }
            this.queryObservable = this.client.watchQuery(opts);
        };
        Query.prototype.updateQuery = function (props) {
            if (!this.queryObservable)
                this.initializeQueryObservable(props);
            this.queryObservable.setOptions(this.extractOptsFromProps(props))
                .catch(function () { return null; });
        };
        Query.prototype.resubscribeToQuery = function () {
            this.removeQuerySubscription();
            var lastError = this.queryObservable.getLastError();
            var lastResult = this.queryObservable.getLastResult();
            this.queryObservable.resetLastResults();
            this.startQuerySubscription();
            Object.assign(this.queryObservable, { lastError: lastError, lastResult: lastResult });
        };
        Query.contextTypes = {
            client: PropTypes.object.isRequired,
            operations: PropTypes.object,
        };
        Query.propTypes = {
            children: PropTypes.func.isRequired,
            fetchPolicy: PropTypes.string,
            notifyOnNetworkStatusChange: PropTypes.bool,
            pollInterval: PropTypes.number,
            query: PropTypes.object.isRequired,
            variables: PropTypes.object,
            ssr: PropTypes.bool,
        };
        return Query;
    }(React.Component));

    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var invariant$4 = __webpack_require__(18);
    var shallowEqual$1 = __webpack_require__(118);
    var initialState = {
        loading: false,
        called: false,
        error: undefined,
        data: undefined,
    };
    var Mutation = (function (_super) {
        __extends$2(Mutation, _super);
        function Mutation(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.runMutation = function (options) {
                if (options === void 0) { options = {}; }
                _this.onStartMutation();
                var mutationId = _this.generateNewMutationId();
                return _this.mutate(options)
                    .then(function (response) {
                    _this.onCompletedMutation(response, mutationId);
                    return response;
                })
                    .catch(function (e) {
                    _this.onMutationError(e, mutationId);
                    if (!_this.props.onError)
                        throw e;
                });
            };
            _this.mutate = function (options) {
                var _a = _this.props, mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, update = _a.update, _b = _a.context, context = _b === void 0 ? {} : _b;
                var refetchQueries = options.refetchQueries || _this.props.refetchQueries;
                if (refetchQueries && refetchQueries.length && Array.isArray(refetchQueries)) {
                    refetchQueries = refetchQueries.map(function (x) {
                        if (typeof x === 'string' && _this.context.operations)
                            return _this.context.operations.get(x) || x;
                        return x;
                    });
                    delete options.refetchQueries;
                }
                return _this.client.mutate(__assign$1({ mutation: mutation,
                    variables: variables,
                    optimisticResponse: optimisticResponse,
                    refetchQueries: refetchQueries,
                    update: update,
                    context: context }, options));
            };
            _this.onStartMutation = function () {
                if (!_this.state.loading && !_this.props.ignoreResults) {
                    _this.setState({
                        loading: true,
                        error: undefined,
                        data: undefined,
                        called: true,
                    });
                }
            };
            _this.onCompletedMutation = function (response, mutationId) {
                if (_this.hasMounted === false) {
                    return;
                }
                var _a = _this.props, onCompleted = _a.onCompleted, ignoreResults = _a.ignoreResults;
                var data = response.data;
                var callOncomplete = function () { return (onCompleted ? onCompleted(data) : null); };
                if (_this.isMostRecentMutation(mutationId) && !ignoreResults) {
                    _this.setState({ loading: false, data: data }, callOncomplete);
                }
                else {
                    callOncomplete();
                }
            };
            _this.onMutationError = function (error, mutationId) {
                if (_this.hasMounted === false) {
                    return;
                }
                var onError = _this.props.onError;
                var callOnError = function () { return (onError ? onError(error) : null); };
                if (_this.isMostRecentMutation(mutationId)) {
                    _this.setState({ loading: false, error: error }, callOnError);
                }
                else {
                    callOnError();
                }
            };
            _this.generateNewMutationId = function () {
                _this.mostRecentMutationId = _this.mostRecentMutationId + 1;
                return _this.mostRecentMutationId;
            };
            _this.isMostRecentMutation = function (mutationId) {
                return _this.mostRecentMutationId === mutationId;
            };
            _this.verifyDocumentIsMutation = function (mutation) {
                var operation = parser(mutation);
                invariant$4(operation.type === DocumentType.Mutation, "The <Mutation /> component requires a graphql mutation, but got a " + (operation.type === DocumentType.Query ? 'query' : 'subscription') + ".");
            };
            _this.verifyContext = function (context) {
                invariant$4(!!context.client, "Could not find \"client\" in the context of Mutation. Wrap the root component in an <ApolloProvider>");
            };
            _this.verifyContext(context);
            _this.client = context.client;
            _this.verifyDocumentIsMutation(props.mutation);
            _this.mostRecentMutationId = 0;
            _this.state = initialState;
            return _this;
        }
        Mutation.prototype.componentDidMount = function () {
            this.hasMounted = true;
        };
        Mutation.prototype.componentWillUnmount = function () {
            this.hasMounted = false;
        };
        Mutation.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
            if (shallowEqual$1(this.props, nextProps) && this.client === nextContext.client) {
                return;
            }
            if (this.props.mutation !== nextProps.mutation) {
                this.verifyDocumentIsMutation(nextProps.mutation);
            }
            if (this.client !== nextContext.client) {
                this.client = nextContext.client;
                this.setState(initialState);
            }
        };
        Mutation.prototype.render = function () {
            var children = this.props.children;
            var _a = this.state, loading = _a.loading, data = _a.data, error = _a.error, called = _a.called;
            var result = {
                called: called,
                loading: loading,
                data: data,
                error: error,
            };
            return children(this.runMutation, result);
        };
        Mutation.contextTypes = {
            client: PropTypes.object.isRequired,
            operations: PropTypes.object,
        };
        Mutation.propTypes = {
            mutation: PropTypes.object.isRequired,
            variables: PropTypes.object,
            optimisticResponse: PropTypes.object,
            refetchQueries: PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.string),
                PropTypes.arrayOf(PropTypes.object),
                PropTypes.func,
            ]),
            update: PropTypes.func,
            children: PropTypes.func.isRequired,
            onCompleted: PropTypes.func,
            onError: PropTypes.func,
        };
        return Mutation;
    }(React.Component));

    var __extends$3 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var shallowEqual$2 = __webpack_require__(118);
    var invariant$5 = __webpack_require__(18);
    var Subscription = (function (_super) {
        __extends$3(Subscription, _super);
        function Subscription(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.initialize = function (props) {
                if (_this.queryObservable)
                    return;
                _this.queryObservable = _this.client.subscribe({
                    query: props.subscription,
                    variables: props.variables,
                });
            };
            _this.startSubscription = function () {
                if (_this.querySubscription)
                    return;
                _this.querySubscription = _this.queryObservable.subscribe({
                    next: _this.updateCurrentData,
                    error: _this.updateError,
                });
            };
            _this.getInitialState = function () { return ({
                loading: true,
                error: undefined,
                data: undefined,
            }); };
            _this.updateCurrentData = function (result) {
                _this.setState({
                    data: result.data,
                    loading: false,
                    error: undefined,
                });
            };
            _this.updateError = function (error) {
                _this.setState({
                    error: error,
                    loading: false,
                });
            };
            _this.endSubscription = function () {
                if (_this.querySubscription) {
                    _this.querySubscription.unsubscribe();
                    delete _this.querySubscription;
                }
            };
            invariant$5(!!context.client, "Could not find \"client\" in the context of Subscription. Wrap the root component in an <ApolloProvider>");
            _this.client = context.client;
            _this.initialize(props);
            _this.state = _this.getInitialState();
            return _this;
        }
        Subscription.prototype.componentDidMount = function () {
            this.startSubscription();
        };
        Subscription.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
            if (shallowEqual$2(this.props.variables, nextProps.variables) &&
                this.client === nextContext.client &&
                this.props.subscription === nextProps.subscription) {
                return;
            }
            var shouldResubscribe = nextProps.shouldResubscribe;
            if (typeof shouldResubscribe === 'function') {
                shouldResubscribe = !!shouldResubscribe(this.props, nextProps);
            }
            var shouldNotResubscribe = shouldResubscribe === false;
            if (this.client !== nextContext.client) {
                this.client = nextContext.client;
            }
            if (!shouldNotResubscribe) {
                this.endSubscription();
                delete this.queryObservable;
                this.initialize(nextProps);
                this.startSubscription();
                this.setState(this.getInitialState());
                return;
            }
            this.initialize(nextProps);
            this.startSubscription();
        };
        Subscription.prototype.componentWillUnmount = function () {
            this.endSubscription();
        };
        Subscription.prototype.render = function () {
            var result = Object.assign({}, this.state, {
                variables: this.props.variables,
            });
            return this.props.children(result);
        };
        Subscription.contextTypes = {
            client: PropTypes.object.isRequired,
        };
        Subscription.propTypes = {
            subscription: PropTypes.object.isRequired,
            variables: PropTypes.object,
            children: PropTypes.func.isRequired,
            shouldResubscribe: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        };
        return Subscription;
    }(React.Component));

    var __extends$4 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var invariant$6 = __webpack_require__(18);
    var defaultMapPropsToOptions = function () { return ({}); };
    var defaultMapPropsToSkip = function () { return false; };
    function getDisplayName(WrappedComponent) {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }
    function calculateVariablesFromProps(operation, props, graphQLDisplayName, wrapperName) {
        var variables = {};
        for (var _i = 0, _a = operation.variables; _i < _a.length; _i++) {
            var _b = _a[_i], variable = _b.variable, type = _b.type;
            if (!variable.name || !variable.name.value)
                continue;
            var variableName = variable.name.value;
            var variableProp = props[variableName];
            if (typeof variableProp !== 'undefined') {
                variables[variableName] = variableProp;
                continue;
            }
            if (type.kind !== 'NonNullType') {
                variables[variableName] = null;
                continue;
            }
            if (operation.type === DocumentType.Mutation)
                return;
            invariant$6(typeof variableProp !== 'undefined', "The operation '" + operation.name + "' wrapping '" + wrapperName + "' " +
                ("is expecting a variable: '" + variable.name.value + "' but it was not found in the props ") +
                ("passed to '" + graphQLDisplayName + "'"));
        }
        return variables;
    }
    var GraphQLBase = (function (_super) {
        __extends$4(GraphQLBase, _super);
        function GraphQLBase(props) {
            var _this = _super.call(this, props) || this;
            _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);
            return _this;
        }
        GraphQLBase.prototype.getWrappedInstance = function () {
            invariant$6(this.withRef, "To access the wrapped instance, you need to specify " + "{ withRef: true } in the options");
            return this.wrappedInstance;
        };
        GraphQLBase.prototype.setWrappedInstance = function (ref) {
            this.wrappedInstance = ref;
        };
        return GraphQLBase;
    }(React.Component));

    var __extends$5 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$2 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __rest$1 = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };
    var hoistNonReactStatics = __webpack_require__(93);
    function query(document, operationOptions) {
        if (operationOptions === void 0) { operationOptions = {}; }
        var operation = parser(document);
        var _a = operationOptions.options, options = _a === void 0 ? defaultMapPropsToOptions : _a, _b = operationOptions.skip, skip = _b === void 0 ? defaultMapPropsToSkip : _b, _c = operationOptions.alias, alias = _c === void 0 ? 'Apollo' : _c;
        var mapPropsToOptions = options;
        if (typeof mapPropsToOptions !== 'function')
            mapPropsToOptions = function () { return options; };
        var mapPropsToSkip = skip;
        if (typeof mapPropsToSkip !== 'function')
            mapPropsToSkip = function () { return skip; };
        var lastResultProps;
        return function (WrappedComponent) {
            var graphQLDisplayName = alias + "(" + getDisplayName(WrappedComponent) + ")";
            var GraphQL = (function (_super) {
                __extends$5(GraphQL, _super);
                function GraphQL() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GraphQL.prototype.render = function () {
                    var _this = this;
                    var props = this.props;
                    var shouldSkip = mapPropsToSkip(props);
                    var opts = shouldSkip ? Object.create(null) : mapPropsToOptions(props);
                    if (!shouldSkip && !opts.variables && operation.variables.length > 0) {
                        opts.variables = calculateVariablesFromProps(operation, props, graphQLDisplayName, getDisplayName(WrappedComponent));
                    }
                    return (React.createElement(Query, __assign$2({}, opts, { displayName: graphQLDisplayName, skip: shouldSkip, query: document, warnUnhandledError: true }), function (_a) {
                        var _ = _a.client, data = _a.data, r = __rest$1(_a, ["client", "data"]);
                        if (operationOptions.withRef) {
                            _this.withRef = true;
                            props = Object.assign({}, props, {
                                ref: _this.setWrappedInstance,
                            });
                        }
                        if (shouldSkip)
                            return React.createElement(WrappedComponent, __assign$2({}, props));
                        var result = Object.assign(r, data || {});
                        var name = operationOptions.name || 'data';
                        var childProps = (_b = {}, _b[name] = result, _b);
                        if (operationOptions.props) {
                            var newResult = (_c = {}, _c[name] = result, _c.ownProps = props, _c);
                            lastResultProps = operationOptions.props(newResult, lastResultProps);
                            childProps = lastResultProps;
                        }
                        return React.createElement(WrappedComponent, __assign$2({}, props, childProps));
                        var _b, _c;
                    }));
                };
                GraphQL.displayName = graphQLDisplayName;
                GraphQL.WrappedComponent = WrappedComponent;
                return GraphQL;
            }(GraphQLBase));
            return hoistNonReactStatics(GraphQL, WrappedComponent, {});
        };
    }

    var __extends$6 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$3 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var hoistNonReactStatics$1 = __webpack_require__(93);
    function mutation(document, operationOptions) {
        if (operationOptions === void 0) { operationOptions = {}; }
        var operation = parser(document);
        var _a = operationOptions.options, options = _a === void 0 ? defaultMapPropsToOptions : _a, _b = operationOptions.alias, alias = _b === void 0 ? 'Apollo' : _b;
        var mapPropsToOptions = options;
        if (typeof mapPropsToOptions !== 'function')
            mapPropsToOptions = function () { return options; };
        return function (WrappedComponent) {
            var graphQLDisplayName = alias + "(" + getDisplayName(WrappedComponent) + ")";
            var GraphQL = (function (_super) {
                __extends$6(GraphQL, _super);
                function GraphQL() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GraphQL.prototype.render = function () {
                    var props = this.props;
                    var opts = mapPropsToOptions(props);
                    if (operationOptions.withRef) {
                        this.withRef = true;
                        props = Object.assign({}, props, {
                            ref: this.setWrappedInstance,
                        });
                    }
                    if (!opts.variables && operation.variables.length > 0) {
                        opts.variables = calculateVariablesFromProps(operation, props, graphQLDisplayName, getDisplayName(WrappedComponent));
                    }
                    return (React.createElement(Mutation, __assign$3({}, opts, { mutation: document, ignoreResults: true }), function (mutate, _result) {
                        var name = operationOptions.name || 'mutate';
                        var childProps = (_a = {}, _a[name] = mutate, _a);
                        if (operationOptions.props) {
                            var newResult = (_b = {}, _b[name] = mutate, _b.ownProps = props, _b);
                            childProps = operationOptions.props(newResult);
                        }
                        return React.createElement(WrappedComponent, __assign$3({}, props, childProps));
                        var _a, _b;
                    }));
                };
                GraphQL.displayName = graphQLDisplayName;
                GraphQL.WrappedComponent = WrappedComponent;
                return GraphQL;
            }(GraphQLBase));
            return hoistNonReactStatics$1(GraphQL, WrappedComponent, {});
        };
    }

    var __extends$7 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$4 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __rest$2 = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };
    var hoistNonReactStatics$2 = __webpack_require__(93);
    function subscribe(document, operationOptions) {
        if (operationOptions === void 0) { operationOptions = {}; }
        var operation = parser(document);
        var _a = operationOptions.options, options = _a === void 0 ? defaultMapPropsToOptions : _a, _b = operationOptions.skip, skip = _b === void 0 ? defaultMapPropsToSkip : _b, _c = operationOptions.alias, alias = _c === void 0 ? 'Apollo' : _c, shouldResubscribe = operationOptions.shouldResubscribe;
        var mapPropsToOptions = options;
        if (typeof mapPropsToOptions !== 'function')
            mapPropsToOptions = function () { return options; };
        var mapPropsToSkip = skip;
        if (typeof mapPropsToSkip !== 'function')
            mapPropsToSkip = function () { return skip; };
        var lastResultProps;
        return function (WrappedComponent) {
            var graphQLDisplayName = alias + "(" + getDisplayName(WrappedComponent) + ")";
            var GraphQL = (function (_super) {
                __extends$7(GraphQL, _super);
                function GraphQL(props) {
                    var _this = _super.call(this, props) || this;
                    _this.state = { resubscribe: false };
                    return _this;
                }
                GraphQL.prototype.componentWillReceiveProps = function (nextProps) {
                    if (!shouldResubscribe)
                        return;
                    this.setState({
                        resubscribe: shouldResubscribe(this.props, nextProps),
                    });
                };
                GraphQL.prototype.render = function () {
                    var _this = this;
                    var props = this.props;
                    var shouldSkip = mapPropsToSkip(props);
                    var opts = shouldSkip ? Object.create(null) : mapPropsToOptions(props);
                    if (!shouldSkip && !opts.variables && operation.variables.length > 0) {
                        opts.variables = calculateVariablesFromProps(operation, props, graphQLDisplayName, getDisplayName(WrappedComponent));
                    }
                    return (React.createElement(Subscription, __assign$4({}, opts, { displayName: graphQLDisplayName, skip: shouldSkip, subscription: document, shouldResubscribe: this.state.resubscribe }), function (_a) {
                        var data = _a.data, r = __rest$2(_a, ["data"]);
                        if (operationOptions.withRef) {
                            _this.withRef = true;
                            props = Object.assign({}, props, {
                                ref: _this.setWrappedInstance,
                            });
                        }
                        if (shouldSkip)
                            return React.createElement(WrappedComponent, __assign$4({}, props));
                        var result = Object.assign(r, data || {});
                        var name = operationOptions.name || 'data';
                        var childProps = (_b = {}, _b[name] = result, _b);
                        if (operationOptions.props) {
                            var newResult = (_c = {}, _c[name] = result, _c.ownProps = props, _c);
                            lastResultProps = operationOptions.props(newResult, lastResultProps);
                            childProps = lastResultProps;
                        }
                        return React.createElement(WrappedComponent, __assign$4({}, props, childProps));
                        var _b, _c;
                    }));
                };
                GraphQL.displayName = graphQLDisplayName;
                GraphQL.WrappedComponent = WrappedComponent;
                return GraphQL;
            }(GraphQLBase));
            return hoistNonReactStatics$2(GraphQL, WrappedComponent, {});
        };
    }

    function graphql(document, operationOptions) {
        if (operationOptions === void 0) { operationOptions = {}; }
        switch (parser(document).type) {
            case DocumentType.Mutation:
                return mutation(document, operationOptions);
            case DocumentType.Subscription:
                return subscribe(document, operationOptions);
            case DocumentType.Query:
            default:
                return query(document, operationOptions);
        }
    }

    var __extends$8 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$5 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var invariant$7 = __webpack_require__(18);
    var hoistNonReactStatics$3 = __webpack_require__(93);
    function getDisplayName$1(WrappedComponent) {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }
    function withApollo(WrappedComponent, operationOptions) {
        if (operationOptions === void 0) { operationOptions = {}; }
        var withDisplayName = "withApollo(" + getDisplayName$1(WrappedComponent) + ")";
        var WithApollo = (function (_super) {
            __extends$8(WithApollo, _super);
            function WithApollo(props) {
                var _this = _super.call(this, props) || this;
                _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);
                return _this;
            }
            WithApollo.prototype.getWrappedInstance = function () {
                invariant$7(operationOptions.withRef, "To access the wrapped instance, you need to specify " + "{ withRef: true } in the options");
                return this.wrappedInstance;
            };
            WithApollo.prototype.setWrappedInstance = function (ref) {
                this.wrappedInstance = ref;
            };
            WithApollo.prototype.render = function () {
                var _this = this;
                return (React.createElement(ApolloConsumer, null, function (client) {
                    var props = Object.assign({}, _this.props, {
                        client: client,
                        ref: operationOptions.withRef ? _this.setWrappedInstance : undefined,
                    });
                    return React.createElement(WrappedComponent, __assign$5({}, props));
                }));
            };
            WithApollo.displayName = withDisplayName;
            WithApollo.WrappedComponent = WrappedComponent;
            return WithApollo;
        }(React.Component));
        return hoistNonReactStatics$3(WithApollo, WrappedComponent, {});
    }

    var compose = __webpack_require__(732);

    exports.compose = compose;
    exports.getDataFromTree = getDataFromTree;
    exports.ApolloConsumer = ApolloConsumer;
    exports.ApolloProvider = ApolloProvider;
    exports.Query = Query;
    exports.Mutation = Mutation;
    exports.Subscription = Subscription;
    exports.graphql = graphql;
    exports.withApollo = withApollo;
    exports.walkTree = walkTree;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-apollo.browser.umd.js.map


/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__, "print")) __webpack_require__.d(__webpack_exports__, "printAST", function() { return __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_ObservableQuery__ = __webpack_require__(169);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableQuery", function() { return __WEBPACK_IMPORTED_MODULE_1__core_ObservableQuery__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__ = __webpack_require__(92);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkStatus", function() { return __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_types__ = __webpack_require__(120);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FetchType", function() { return __WEBPACK_IMPORTED_MODULE_3__core_types__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors_ApolloError__ = __webpack_require__(173);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloError", function() { return __WEBPACK_IMPORTED_MODULE_4__errors_ApolloError__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ApolloClient__ = __webpack_require__(723);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloClient", function() { return __WEBPACK_IMPORTED_MODULE_5__ApolloClient__["a"]; });






// export the client as both default and named

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_5__ApolloClient__["a" /* default */]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = getMutationDefinition;
/* harmony export (immutable) */ __webpack_exports__["a"] = checkDocument;
/* harmony export (immutable) */ __webpack_exports__["g"] = getOperationDefinition;
/* harmony export (immutable) */ __webpack_exports__["h"] = getOperationDefinitionOrDie;
/* harmony export (immutable) */ __webpack_exports__["i"] = getOperationName;
/* harmony export (immutable) */ __webpack_exports__["d"] = getFragmentDefinitions;
/* harmony export (immutable) */ __webpack_exports__["j"] = getQueryDefinition;
/* unused harmony export getFragmentDefinition */
/* harmony export (immutable) */ __webpack_exports__["e"] = getMainDefinition;
/* harmony export (immutable) */ __webpack_exports__["b"] = createFragmentMap;
/* harmony export (immutable) */ __webpack_exports__["c"] = getDefaultValues;
/* unused harmony export variablesInOperation */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_assign__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storeUtils__ = __webpack_require__(170);


function getMutationDefinition(doc) {
    checkDocument(doc);
    var mutationDef = doc.definitions.filter(function (definition) {
        return definition.kind === 'OperationDefinition' &&
            definition.operation === 'mutation';
    })[0];
    if (!mutationDef) {
        throw new Error('Must contain a mutation definition.');
    }
    return mutationDef;
}
// Checks the document for errors and throws an exception if there is an error.
function checkDocument(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    var operations = doc.definitions
        .filter(function (d) { return d.kind !== 'FragmentDefinition'; })
        .map(function (definition) {
        if (definition.kind !== 'OperationDefinition') {
            throw new Error("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
        }
        return definition;
    });
    if (operations.length > 1) {
        throw new Error("Ambiguous GraphQL document: contains " + operations.length + " operations");
    }
}
function getOperationDefinition(doc) {
    checkDocument(doc);
    return doc.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; })[0];
}
function getOperationDefinitionOrDie(document) {
    var def = getOperationDefinition(document);
    if (!def) {
        throw new Error("GraphQL document is missing an operation");
    }
    return def;
}
function getOperationName(doc) {
    return (doc.definitions
        .filter(function (definition) {
        return definition.kind === 'OperationDefinition' && definition.name;
    })
        .map(function (x) { return x.name.value; })[0] || null);
}
// Returns the FragmentDefinitions from a particular document as an array
function getFragmentDefinitions(doc) {
    return doc.definitions.filter(function (definition) { return definition.kind === 'FragmentDefinition'; });
}
function getQueryDefinition(doc) {
    var queryDef = getOperationDefinition(doc);
    if (!queryDef || queryDef.operation !== 'query') {
        throw new Error('Must contain a query definition.');
    }
    return queryDef;
}
function getFragmentDefinition(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    if (doc.definitions.length > 1) {
        throw new Error('Fragment must have exactly one definition.');
    }
    var fragmentDef = doc.definitions[0];
    if (fragmentDef.kind !== 'FragmentDefinition') {
        throw new Error('Must be a fragment definition.');
    }
    return fragmentDef;
}
/**
 * Returns the first operation definition found in this document.
 * If no operation definition is found, the first fragment definition will be returned.
 * If no definitions are found, an error will be thrown.
 */
function getMainDefinition(queryDoc) {
    checkDocument(queryDoc);
    var fragmentDefinition;
    for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === 'OperationDefinition') {
            var operation = definition.operation;
            if (operation === 'query' ||
                operation === 'mutation' ||
                operation === 'subscription') {
                return definition;
            }
        }
        if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
            // we do this because we want to allow multiple fragment definitions
            // to precede an operation definition.
            fragmentDefinition = definition;
        }
    }
    if (fragmentDefinition) {
        return fragmentDefinition;
    }
    throw new Error('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}
// Utility function that takes a list of fragment definitions and makes a hash out of them
// that maps the name of the fragment to the fragment definition.
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getDefaultValues(definition) {
    if (definition &&
        definition.variableDefinitions &&
        definition.variableDefinitions.length) {
        var defaultValues = definition.variableDefinitions
            .filter(function (_a) {
            var defaultValue = _a.defaultValue;
            return defaultValue;
        })
            .map(function (_a) {
            var variable = _a.variable, defaultValue = _a.defaultValue;
            var defaultValueObj = {};
            Object(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["j" /* valueToObjectRepresentation */])(defaultValueObj, variable.name, defaultValue);
            return defaultValueObj;
        });
        return __WEBPACK_IMPORTED_MODULE_0__util_assign__["a" /* assign */].apply(void 0, [{}].concat(defaultValues));
    }
    return {};
}
/**
 * Returns the names of all variables declared by the operation.
 */
function variablesInOperation(operation) {
    var names = new Set();
    if (operation.variableDefinitions) {
        for (var _i = 0, _a = operation.variableDefinitions; _i < _a.length; _i++) {
            var definition = _a[_i];
            names.add(definition.variable.name.value);
        }
    }
    return names;
}
//# sourceMappingURL=getFromAST.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = assign;
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (typeof source === 'undefined' || source === null) {
            return;
        }
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    });
    return target;
}
//# sourceMappingURL=assign.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cloneDeep;
/**
 * Deeply clones a value to create a new instance.
 */
function cloneDeep(value) {
    // If the value is an array, create a new array where every item has been cloned.
    if (Array.isArray(value)) {
        return value.map(function (item) { return cloneDeep(item); });
    }
    // If the value is an object, go through all of the object’s properties and add them to a new
    // object.
    if (value !== null && typeof value === 'object') {
        var nextValue = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                nextValue[key] = cloneDeep(value[key]);
            }
        }
        return nextValue;
    }
    // Otherwise this is some primitive value and it is therefore immutable so we can just return it
    // directly.
    return value;
}
//# sourceMappingURL=cloneDeep.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_link__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(720);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// This simplified polyfill attempts to follow the ECMAScript Observable proposal.
// See https://github.com/zenparsing/es-observable


// rxjs interopt
var Observable = (function (_super) {
    __extends(Observable, _super);
    function Observable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Observable.prototype[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = function () {
        return this;
    };
    return Observable;
}(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["b" /* Observable */]));

//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zen_observable__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zen_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zen_observable__);

var Observable = __WEBPACK_IMPORTED_MODULE_0_zen_observable___default.a;
//# sourceMappingURL=zenObservable.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = validateOperation;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkError; });
/* harmony export (immutable) */ __webpack_exports__["d"] = isTerminating;
/* unused harmony export toPromise */
/* unused harmony export makePromise */
/* unused harmony export fromPromise */
/* harmony export (immutable) */ __webpack_exports__["c"] = fromError;
/* harmony export (immutable) */ __webpack_exports__["e"] = transformOperation;
/* harmony export (immutable) */ __webpack_exports__["b"] = createOperation;
/* unused harmony export getKey */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_utilities__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_zen_observable_ts__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



function validateOperation(operation) {
    var OPERATION_FIELDS = [
        'query',
        'operationName',
        'variables',
        'extensions',
        'context',
    ];
    for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
        var key = _a[_i];
        if (OPERATION_FIELDS.indexOf(key) < 0) {
            throw new Error("illegal argument: " + key);
        }
    }
    return operation;
}
var LinkError = /** @class */ (function (_super) {
    __extends(LinkError, _super);
    function LinkError(message, link) {
        var _this = _super.call(this, message) || this;
        _this.link = link;
        return _this;
    }
    return LinkError;
}(Error));

function isTerminating(link) {
    return link.request.length <= 1;
}
function toPromise(observable) {
    var completed = false;
    return new Promise(function (resolve, reject) {
        observable.subscribe({
            next: function (data) {
                if (completed) {
                    console.warn("Promise Wrapper does not support multiple results from Observable");
                }
                else {
                    completed = true;
                    resolve(data);
                }
            },
            error: reject,
        });
    });
}
// backwards compat
var makePromise = toPromise;
function fromPromise(promise) {
    return new __WEBPACK_IMPORTED_MODULE_1_zen_observable_ts__["a" /* default */](function (observer) {
        promise
            .then(function (value) {
            observer.next(value);
            observer.complete();
        })
            .catch(observer.error.bind(observer));
    });
}
function fromError(errorValue) {
    return new __WEBPACK_IMPORTED_MODULE_1_zen_observable_ts__["a" /* default */](function (observer) {
        observer.error(errorValue);
    });
}
function transformOperation(operation) {
    var transformedOperation = {
        variables: operation.variables || {},
        extensions: operation.extensions || {},
        operationName: operation.operationName,
        query: operation.query,
    };
    // best guess at an operation name
    if (!transformedOperation.operationName) {
        transformedOperation.operationName =
            typeof transformedOperation.query !== 'string'
                ? Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["l" /* getOperationName */])(transformedOperation.query)
                : '';
    }
    return transformedOperation;
}
function createOperation(starting, operation) {
    var context = __assign({}, starting);
    var setContext = function (next) {
        if (typeof next === 'function') {
            context = __assign({}, context, next(context));
        }
        else {
            context = __assign({}, context, next);
        }
    };
    var getContext = function () { return (__assign({}, context)); };
    Object.defineProperty(operation, 'setContext', {
        enumerable: false,
        value: setContext,
    });
    Object.defineProperty(operation, 'getContext', {
        enumerable: false,
        value: getContext,
    });
    Object.defineProperty(operation, 'toKey', {
        enumerable: false,
        value: function () { return getKey(operation); },
    });
    return operation;
}
function getKey(operation) {
    // XXX we're assuming here that variables will be serialized in the same order.
    // that might not always be true
    return Object(__WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__["print"])(operation.query) + "|" + JSON.stringify(operation.variables) + "|" + operation.operationName;
}
//# sourceMappingURL=linkUtils.js.map

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(175);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(177),
    getRawTag = __webpack_require__(742),
    objectToString = __webpack_require__(743);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(750),
    getValue = __webpack_require__(755);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

var metaMap = __webpack_require__(758),
    noop = __webpack_require__(760);

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;


/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

var realNames = __webpack_require__(761);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

module.exports = getFuncName;


/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeuristicFragmentMatcher; });
/* unused harmony export IntrospectionFragmentMatcher */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_utilities__ = __webpack_require__(31);

var haveWarned = false;
/**
 * This fragment matcher is very basic and unable to match union or interface type conditions
 */
var HeuristicFragmentMatcher = /** @class */ (function () {
    function HeuristicFragmentMatcher() {
        // do nothing
    }
    HeuristicFragmentMatcher.prototype.ensureReady = function () {
        return Promise.resolve();
    };
    HeuristicFragmentMatcher.prototype.canBypassInit = function () {
        return true; // we don't need to initialize this fragment matcher.
    };
    HeuristicFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        var obj = context.store.get(idValue.id);
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            if (!haveWarned) {
                console.warn("You're using fragments in your queries, but either don't have the addTypename:\n  true option set in Apollo Client, or you are trying to write a fragment to the store without the __typename.\n   Please turn on the addTypename option and include __typename when writing fragments so that Apollo Client\n   can accurately match fragments.");
                console.warn('Could not find __typename on Fragment ', typeCondition, obj);
                console.warn("DEPRECATION WARNING: using fragments without __typename is unsupported behavior " +
                    "and will be removed in future versions of Apollo client. You should fix this and set addTypename to true now.");
                /* istanbul ignore if */
                if (!Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["w" /* isTest */])()) {
                    // When running tests, we want to print the warning every time
                    haveWarned = true;
                }
            }
            context.returnPartialData = true;
            return true;
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        // XXX here we reach an issue - we don't know if this fragment should match or not. It's either:
        // 1. A fragment on a non-matching concrete type or interface or union
        // 2. A fragment on a matching interface or union
        // If it's 1, we don't want to return anything, if it's 2 we want to match. We can't tell the
        // difference, so we warn the user, but still try to match it (backcompat).
        Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["E" /* warnOnceInDevelopment */])("You are using the simple (heuristic) fragment matcher, but your queries contain union or interface types.\n     Apollo Client will not be able to able to accurately map fragments." +
            "To make this error go away, use the IntrospectionFragmentMatcher as described in the docs: " +
            "https://www.apollographql.com/docs/react/recipes/fragment-matching.html", 'error');
        context.returnPartialData = true;
        return true;
    };
    return HeuristicFragmentMatcher;
}());

var IntrospectionFragmentMatcher = /** @class */ (function () {
    function IntrospectionFragmentMatcher(options) {
        if (options && options.introspectionQueryResultData) {
            this.possibleTypesMap = this.parseIntrospectionResult(options.introspectionQueryResultData);
            this.isReady = true;
        }
        else {
            this.isReady = false;
        }
        this.match = this.match.bind(this);
    }
    IntrospectionFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        if (!this.isReady) {
            // this should basically never happen in proper use.
            throw new Error('FragmentMatcher.match() was called before FragmentMatcher.init()');
        }
        var obj = context.store.get(idValue.id);
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            throw new Error("Cannot match fragment because __typename property is missing: " + JSON.stringify(obj));
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        var implementingTypes = this.possibleTypesMap[typeCondition];
        if (implementingTypes && implementingTypes.indexOf(obj.__typename) > -1) {
            return true;
        }
        return false;
    };
    IntrospectionFragmentMatcher.prototype.parseIntrospectionResult = function (introspectionResultData) {
        var typeMap = {};
        introspectionResultData.__schema.types.forEach(function (type) {
            if (type.kind === 'UNION' || type.kind === 'INTERFACE') {
                typeMap[type.name] = type.possibleTypes.map(function (implementingType) { return implementingType.name; });
            }
        });
        return typeMap;
    };
    return IntrospectionFragmentMatcher;
}());

//# sourceMappingURL=fragmentMatcher.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WriteError */
/* unused harmony export enhanceErrorWithDocument */
/* unused harmony export writeQueryToStore */
/* harmony export (immutable) */ __webpack_exports__["a"] = writeResultToStore;
/* unused harmony export writeSelectionSetToStore */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_utilities__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectCache__ = __webpack_require__(182);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var WriteError = /** @class */ (function (_super) {
    __extends(WriteError, _super);
    function WriteError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'WriteError';
        return _this;
    }
    return WriteError;
}(Error));

function enhanceErrorWithDocument(error, document) {
    // XXX A bit hacky maybe ...
    var enhancedError = new WriteError("Error writing result to store for query:\n " + Object(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"])(document));
    enhancedError.message += '\n' + error.message;
    enhancedError.stack = error.stack;
    return enhancedError;
}
/**
 * Writes the result of a query to the store.
 *
 * @param result The result object returned for the query document.
 *
 * @param query The query document whose result we are writing to the store.
 *
 * @param store The {@link NormalizedCache} used by Apollo for the `data` portion of the store.
 *
 * @param variables A map from the name of a variable to its value. These variables can be
 * referenced by the query document.
 *
 * @param dataIdFromObject A function that returns an object identifier given a particular result
 * object. See the store documentation for details and an example of this function.
 *
 * @param fragmentMap A map from the name of a fragment to its fragment definition. These fragments
 * can be referenced within the query document.
 *
 * @param fragmentMatcherFunction A function to use for matching fragment conditions in GraphQL documents
 */
function writeQueryToStore(_a) {
    var result = _a.result, query = _a.query, _b = _a.storeFactory, storeFactory = _b === void 0 ? __WEBPACK_IMPORTED_MODULE_2__objectCache__["b" /* defaultNormalizedCacheFactory */] : _b, _c = _a.store, store = _c === void 0 ? storeFactory() : _c, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, _d = _a.fragmentMap, fragmentMap = _d === void 0 ? {} : _d, fragmentMatcherFunction = _a.fragmentMatcherFunction;
    var queryDefinition = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["m" /* getQueryDefinition */])(query);
    variables = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["c" /* assign */])({}, Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["e" /* getDefaultValues */])(queryDefinition), variables);
    try {
        return writeSelectionSetToStore({
            dataId: 'ROOT_QUERY',
            result: result,
            selectionSet: queryDefinition.selectionSet,
            context: {
                store: store,
                storeFactory: storeFactory,
                processedData: {},
                variables: variables,
                dataIdFromObject: dataIdFromObject,
                fragmentMap: fragmentMap,
                fragmentMatcherFunction: fragmentMatcherFunction,
            },
        });
    }
    catch (e) {
        throw enhanceErrorWithDocument(e, query);
    }
}
function writeResultToStore(_a) {
    var dataId = _a.dataId, result = _a.result, document = _a.document, _b = _a.storeFactory, storeFactory = _b === void 0 ? __WEBPACK_IMPORTED_MODULE_2__objectCache__["b" /* defaultNormalizedCacheFactory */] : _b, _c = _a.store, store = _c === void 0 ? storeFactory() : _c, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
    // XXX TODO REFACTOR: this is a temporary workaround until query normalization is made to work with documents.
    var operationDefinition = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["k" /* getOperationDefinition */])(document);
    var selectionSet = operationDefinition.selectionSet;
    var fragmentMap = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["d" /* createFragmentMap */])(Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["g" /* getFragmentDefinitions */])(document));
    variables = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["c" /* assign */])({}, Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["e" /* getDefaultValues */])(operationDefinition), variables);
    try {
        return writeSelectionSetToStore({
            result: result,
            dataId: dataId,
            selectionSet: selectionSet,
            context: {
                store: store,
                storeFactory: storeFactory,
                processedData: {},
                variables: variables,
                dataIdFromObject: dataIdFromObject,
                fragmentMap: fragmentMap,
                fragmentMatcherFunction: fragmentMatcherFunction,
            },
        });
    }
    catch (e) {
        throw enhanceErrorWithDocument(e, document);
    }
}
function writeSelectionSetToStore(_a) {
    var result = _a.result, dataId = _a.dataId, selectionSet = _a.selectionSet, context = _a.context;
    var variables = context.variables, store = context.store, fragmentMap = context.fragmentMap;
    selectionSet.selections.forEach(function (selection) {
        var included = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["A" /* shouldInclude */])(selection, variables);
        if (Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["r" /* isField */])(selection)) {
            var resultFieldKey = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["z" /* resultKeyNameFromField */])(selection);
            var value = result[resultFieldKey];
            if (included) {
                if (typeof value !== 'undefined') {
                    writeFieldToStore({
                        dataId: dataId,
                        value: value,
                        field: selection,
                        context: context,
                    });
                }
                else {
                    // if this is a defered field we don't need to throw / warn
                    var isDefered = selection.directives &&
                        selection.directives.length &&
                        selection.directives.some(function (directive) { return directive.name && directive.name.value === 'defer'; });
                    if (!isDefered && context.fragmentMatcherFunction) {
                        // XXX We'd like to throw an error, but for backwards compatibility's sake
                        // we just print a warning for the time being.
                        //throw new WriteError(`Missing field ${resultFieldKey} in ${JSON.stringify(result, null, 2).substring(0, 100)}`);
                        if (!Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["v" /* isProduction */])()) {
                            console.warn("Missing field " + resultFieldKey + " in " + JSON.stringify(result, null, 2).substring(0, 100));
                        }
                    }
                }
            }
        }
        else {
            // This is not a field, so it must be a fragment, either inline or named
            var fragment = void 0;
            if (Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["t" /* isInlineFragment */])(selection)) {
                fragment = selection;
            }
            else {
                // Named fragment
                fragment = (fragmentMap || {})[selection.name.value];
                if (!fragment) {
                    throw new Error("No fragment named " + selection.name.value + ".");
                }
            }
            var matches = true;
            if (context.fragmentMatcherFunction && fragment.typeCondition) {
                // TODO we need to rewrite the fragment matchers for this to work properly and efficiently
                // Right now we have to pretend that we're passing in an idValue and that there's a store
                // on the context.
                var idValue = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["C" /* toIdValue */])({ id: 'self', typename: undefined });
                var fakeContext = {
                    // NOTE: fakeContext always uses ObjectCache
                    // since this is only to ensure the return value of 'matches'
                    store: new __WEBPACK_IMPORTED_MODULE_2__objectCache__["a" /* ObjectCache */]({ self: result }),
                    returnPartialData: false,
                    hasMissingField: false,
                    cacheRedirects: {},
                };
                matches = context.fragmentMatcherFunction(idValue, fragment.typeCondition.name.value, fakeContext);
                if (!Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["v" /* isProduction */])() && fakeContext.returnPartialData) {
                    console.error('WARNING: heuristic fragment matching going on!');
                }
            }
            if (included && matches) {
                writeSelectionSetToStore({
                    result: result,
                    selectionSet: fragment.selectionSet,
                    dataId: dataId,
                    context: context,
                });
            }
        }
    });
    return store;
}
// Checks if the id given is an id that was generated by Apollo
// rather than by dataIdFromObject.
function isGeneratedId(id) {
    return id[0] === '$';
}
function mergeWithGenerated(generatedKey, realKey, cache) {
    var generated = cache.get(generatedKey);
    var real = cache.get(realKey);
    Object.keys(generated).forEach(function (key) {
        var value = generated[key];
        var realValue = real[key];
        if (Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["s" /* isIdValue */])(value) && isGeneratedId(value.id) && Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["s" /* isIdValue */])(realValue)) {
            mergeWithGenerated(value.id, realValue.id, cache);
        }
        cache.delete(generatedKey);
        cache.set(realKey, __assign({}, generated, real));
    });
}
function isDataProcessed(dataId, field, processedData) {
    if (!processedData) {
        return false;
    }
    if (processedData[dataId]) {
        if (processedData[dataId].indexOf(field) >= 0) {
            return true;
        }
        else {
            processedData[dataId].push(field);
        }
    }
    else {
        processedData[dataId] = [field];
    }
    return false;
}
function writeFieldToStore(_a) {
    var field = _a.field, value = _a.value, dataId = _a.dataId, context = _a.context;
    var variables = context.variables, dataIdFromObject = context.dataIdFromObject, store = context.store;
    var storeValue;
    var storeObject;
    var storeFieldName = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["B" /* storeKeyNameFromField */])(field, variables);
    // specifies if we need to merge existing keys in the store
    var shouldMerge = false;
    // If we merge, this will be the generatedKey
    var generatedKey = '';
    // If this is a scalar value...
    if (!field.selectionSet || value === null) {
        storeValue =
            value != null && typeof value === 'object'
                ?
                    // an id.
                    { type: 'json', json: value }
                :
                    value;
    }
    else if (Array.isArray(value)) {
        var generatedId = dataId + "." + storeFieldName;
        storeValue = processArrayValue(value, generatedId, field.selectionSet, context);
    }
    else {
        // It's an object
        var valueDataId = dataId + "." + storeFieldName;
        var generated = true;
        // We only prepend the '$' if the valueDataId isn't already a generated
        // id.
        if (!isGeneratedId(valueDataId)) {
            valueDataId = '$' + valueDataId;
        }
        if (dataIdFromObject) {
            var semanticId = dataIdFromObject(value);
            // We throw an error if the first character of the id is '$. This is
            // because we use that character to designate an Apollo-generated id
            // and we use the distinction between user-desiginated and application-provided
            // ids when managing overwrites.
            if (semanticId && isGeneratedId(semanticId)) {
                throw new Error('IDs returned by dataIdFromObject cannot begin with the "$" character.');
            }
            if (semanticId) {
                valueDataId = semanticId;
                generated = false;
            }
        }
        if (!isDataProcessed(valueDataId, field, context.processedData)) {
            writeSelectionSetToStore({
                dataId: valueDataId,
                result: value,
                selectionSet: field.selectionSet,
                context: context,
            });
        }
        // We take the id and escape it (i.e. wrap it with an enclosing object).
        // This allows us to distinguish IDs from normal scalars.
        var typename = value.__typename;
        storeValue = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["C" /* toIdValue */])({ id: valueDataId, typename: typename }, generated);
        // check if there was a generated id at the location where we're
        // about to place this new id. If there was, we have to merge the
        // data from that id with the data we're about to write in the store.
        storeObject = store.get(dataId);
        var escapedId = storeObject && storeObject[storeFieldName];
        if (escapedId !== storeValue && Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["s" /* isIdValue */])(escapedId)) {
            var hadTypename = escapedId.typename !== undefined;
            var hasTypename = typename !== undefined;
            var typenameChanged = hadTypename && hasTypename && escapedId.typename !== typename;
            // If there is already a real id in the store and the current id we
            // are dealing with is generated, we throw an error.
            // One exception we allow is when the typename has changed, which occurs
            // when schema defines a union, both with and without an ID in the same place.
            // checks if we "lost" the read id
            if (generated && !escapedId.generated && !typenameChanged) {
                throw new Error("Store error: the application attempted to write an object with no provided id" +
                    (" but the store already contains an id of " + escapedId.id + " for this object. The selectionSet") +
                    " that was trying to be written is:\n" +
                    Object(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"])(field));
            }
            // checks if we "lost" the typename
            if (hadTypename && !hasTypename) {
                throw new Error("Store error: the application attempted to write an object with no provided typename" +
                    (" but the store already contains an object with typename of " + escapedId.typename + " for the object of id " + escapedId.id + ". The selectionSet") +
                    " that was trying to be written is:\n" +
                    Object(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"])(field));
            }
            if (escapedId.generated) {
                generatedKey = escapedId.id;
                // we should only merge if it's an object of the same type
                // otherwise, we should delete the generated object
                if (typenameChanged) {
                    store.delete(generatedKey);
                }
                else {
                    shouldMerge = true;
                }
            }
        }
    }
    var newStoreObj = __assign({}, store.get(dataId), (_b = {}, _b[storeFieldName] = storeValue, _b));
    if (shouldMerge) {
        mergeWithGenerated(generatedKey, storeValue.id, store);
    }
    storeObject = store.get(dataId);
    if (!storeObject || storeValue !== storeObject[storeFieldName]) {
        store.set(dataId, newStoreObj);
    }
    var _b;
}
function processArrayValue(value, generatedId, selectionSet, context) {
    return value.map(function (item, index) {
        if (item === null) {
            return null;
        }
        var itemDataId = generatedId + "." + index;
        if (Array.isArray(item)) {
            return processArrayValue(item, itemDataId, selectionSet, context);
        }
        var generated = true;
        if (context.dataIdFromObject) {
            var semanticId = context.dataIdFromObject(item);
            if (semanticId) {
                itemDataId = semanticId;
                generated = false;
            }
        }
        if (!isDataProcessed(itemDataId, selectionSet, context.processedData)) {
            writeSelectionSetToStore({
                dataId: itemDataId,
                result: item,
                selectionSet: selectionSet,
                context: context,
            });
        }
        return Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["C" /* toIdValue */])({ id: itemDataId, typename: item.__typename }, generated);
    });
}
//# sourceMappingURL=writeToStore.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ID_KEY */
/* harmony export (immutable) */ __webpack_exports__["b"] = readQueryFromStore;
/* harmony export (immutable) */ __webpack_exports__["a"] = diffQueryAgainstStore;
/* unused harmony export assertIdValue */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_anywhere__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_utilities__ = __webpack_require__(31);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


/**
 * The key which the cache id for a given value is stored in the result object. This key is private
 * and should not be used by Apollo client users.
 *
 * Uses a symbol if available in the environment.
 *
 * @private
 */
var ID_KEY = typeof Symbol !== 'undefined' ? Symbol('id') : '@@id';
/**
 * Resolves the result of a query solely from the store (i.e. never hits the server).
 *
 * @param {Store} store The {@link NormalizedCache} used by Apollo for the `data` portion of the
 * store.
 *
 * @param {DocumentNode} query The query document to resolve from the data available in the store.
 *
 * @param {Object} [variables] A map from the name of a variable to its value. These variables can
 * be referenced by the query document.
 *
 * @param {any} previousResult The previous result returned by this function for the same query.
 * If nothing in the store changed since that previous result then values from the previous result
 * will be returned to preserve referential equality.
 */
function readQueryFromStore(options) {
    var optsPatch = { returnPartialData: false };
    return diffQueryAgainstStore(__assign({}, options, optsPatch)).result;
}
var readStoreResolver = function (fieldName, idValue, args, context, _a) {
    var resultKey = _a.resultKey, directives = _a.directives;
    assertIdValue(idValue);
    var objId = idValue.id;
    var obj = context.store.get(objId);
    var storeKeyName = fieldName;
    if (args || directives) {
        // We happen to know here that getStoreKeyName returns its first
        // argument unmodified if there are no args or directives, so we can
        // avoid calling the function at all in that case, as a small but
        // important optimization to this frequently executed code.
        storeKeyName = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["n" /* getStoreKeyName */])(storeKeyName, args, directives);
    }
    var fieldValue = void 0;
    if (obj) {
        fieldValue = obj[storeKeyName];
        if (typeof fieldValue === 'undefined' &&
            context.cacheRedirects &&
            (obj.__typename || objId === 'ROOT_QUERY')) {
            var typename = obj.__typename || 'Query';
            // Look for the type in the custom resolver map
            var type = context.cacheRedirects[typename];
            if (type) {
                // Look for the field in the custom resolver map
                var resolver = type[fieldName];
                if (resolver) {
                    fieldValue = resolver(obj, args, {
                        getCacheKey: function (storeObj) {
                            return Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["C" /* toIdValue */])({
                                id: context.dataIdFromObject(storeObj),
                                typename: storeObj.__typename,
                            });
                        },
                    });
                }
            }
        }
    }
    if (typeof fieldValue === 'undefined') {
        if (!context.returnPartialData) {
            throw new Error("Can't find field " + storeKeyName + " on object (" + objId + ") " + JSON.stringify(obj, null, 2) + ".");
        }
        context.hasMissingField = true;
        return fieldValue;
    }
    // if this is an object scalar, it must be a json blob and we have to unescape it
    if (Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["u" /* isJsonValue */])(fieldValue)) {
        // If the JSON blob is the same now as in the previous result, return the previous result to
        // maintain referential equality.
        //
        // `isEqual` will first perform a referential equality check (with `===`) in case the JSON
        // value has not changed in the store, and then a deep equality check if that fails in case a
        // new JSON object was returned by the API but that object may still be the same.
        if (idValue.previousResult &&
            Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["q" /* isEqual */])(idValue.previousResult[resultKey], fieldValue.json)) {
            return idValue.previousResult[resultKey];
        }
        return fieldValue.json;
    }
    // If we had a previous result, try adding that previous result value for this field to our field
    // value. This will create a new value without mutating the old one.
    if (idValue.previousResult) {
        fieldValue = addPreviousResultToIdValues(fieldValue, idValue.previousResult[resultKey]);
    }
    return fieldValue;
};
/**
 * Given a store and a query, return as much of the result as possible and
 * identify if any data was missing from the store.
 * @param  {DocumentNode} query A parsed GraphQL query document
 * @param  {Store} store The Apollo Client store object
 * @param  {any} previousResult The previous result returned by this function for the same query
 * @return {result: Object, complete: [boolean]}
 */
function diffQueryAgainstStore(_a) {
    var store = _a.store, query = _a.query, variables = _a.variables, previousResult = _a.previousResult, _b = _a.returnPartialData, returnPartialData = _b === void 0 ? true : _b, _c = _a.rootId, rootId = _c === void 0 ? 'ROOT_QUERY' : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction, config = _a.config;
    // Throw the right validation error by trying to find a query in the document
    var queryDefinition = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["m" /* getQueryDefinition */])(query);
    variables = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["c" /* assign */])({}, Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["e" /* getDefaultValues */])(queryDefinition), variables);
    var context = {
        // Global settings
        store: store,
        returnPartialData: returnPartialData,
        dataIdFromObject: (config && config.dataIdFromObject) || null,
        cacheRedirects: (config && config.cacheRedirects) || {},
        // Flag set during execution
        hasMissingField: false,
    };
    var rootIdValue = {
        type: 'id',
        id: rootId,
        previousResult: previousResult,
    };
    var result = Object(__WEBPACK_IMPORTED_MODULE_0_graphql_anywhere__["a" /* default */])(readStoreResolver, query, rootIdValue, context, variables, {
        fragmentMatcher: fragmentMatcherFunction,
        resultMapper: resultMapper,
    });
    return {
        result: result,
        complete: !context.hasMissingField,
    };
}
function assertIdValue(idValue) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["s" /* isIdValue */])(idValue)) {
        throw new Error("Encountered a sub-selection on the query, but the store doesn't have an object reference. This should never happen during normal use unless you have custom code that is directly manipulating the store; please file an issue.");
    }
}
/**
 * Adds a previous result value to id values in a nested array. For a single id value and a single
 * previous result then the previous value is added directly.
 *
 * For arrays we put all of the ids from the previous result array in a map and add them to id
 * values with the same id.
 *
 * This function does not mutate. Instead it returns new instances of modified values.
 *
 * @private
 */
function addPreviousResultToIdValues(value, previousResult) {
    // If the value is an `IdValue`, add the previous result to it whether or not that
    // `previousResult` is undefined.
    //
    // If the value is an array, recurse over each item trying to add the `previousResult` for that
    // item.
    if (Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["s" /* isIdValue */])(value)) {
        return __assign({}, value, { previousResult: previousResult });
    }
    else if (Array.isArray(value)) {
        var idToPreviousResult_1 = new Map();
        // If the previous result was an array, we want to build up our map of ids to previous results
        // using the private `ID_KEY` property that is added in `resultMapper`.
        if (Array.isArray(previousResult)) {
            previousResult.forEach(function (item) {
                // item can be null
                if (item && item[ID_KEY]) {
                    idToPreviousResult_1.set(item[ID_KEY], item);
                    // idToPreviousResult[item[ID_KEY]] = item;
                }
            });
        }
        // For every value we want to add the previous result.
        return value.map(function (item, i) {
            // By default the previous result for this item will be in the same array position as this
            // item.
            var itemPreviousResult = previousResult && previousResult[i];
            // If the item is an id value, we should check to see if there is a previous result for this
            // specific id. If there is, that will be the value for `itemPreviousResult`.
            if (Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["s" /* isIdValue */])(item)) {
                itemPreviousResult =
                    idToPreviousResult_1.get(item.id) || itemPreviousResult;
            }
            return addPreviousResultToIdValues(item, itemPreviousResult);
        });
    }
    // Return the value, nothing changed.
    return value;
}
/**
 * Maps a result from `graphql-anywhere` to a final result value.
 *
 * If the result and the previous result from the `idValue` pass a shallow equality test, we just
 * return the `previousResult` to maintain referential equality.
 *
 * We also add a private id property to the result that we can use later on.
 *
 * @private
 */
function resultMapper(resultFields, idValue) {
    // If we had a previous result, we may be able to return that and preserve referential equality
    if (idValue.previousResult) {
        var currentResultKeys_1 = Object.keys(resultFields);
        var sameAsPreviousResult = 
        // Confirm that we have the same keys in both the current result and the previous result.
        Object.keys(idValue.previousResult).every(function (key) { return currentResultKeys_1.indexOf(key) > -1; }) &&
            // Perform a shallow comparison of the result fields with the previous result. If all of
            // the shallow fields are referentially equal to the fields of the previous result we can
            // just return the previous result.
            //
            // While we do a shallow comparison of objects, but we do a deep comparison of arrays.
            currentResultKeys_1.every(function (key) {
                return areNestedArrayItemsStrictlyEqual(resultFields[key], idValue.previousResult[key]);
            });
        if (sameAsPreviousResult) {
            return idValue.previousResult;
        }
    }
    resultFields[ID_KEY] = idValue.id;
    return resultFields;
}
/**
 * Compare all the items to see if they are all referentially equal in two arrays no matter how
 * deeply nested the arrays are.
 *
 * @private
 */
function areNestedArrayItemsStrictlyEqual(a, b) {
    // If `a` and `b` are referentially equal, return true.
    if (a === b) {
        return true;
    }
    // If either `a` or `b` are not an array or not of the same length return false. `a` and `b` are
    // known to not be equal here, we checked above.
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
        return false;
    }
    // Otherwise let us compare all of the array items (which are potentially nested arrays!) to see
    // if they are equal.
    return a.every(function (item, i) { return areNestedArrayItemsStrictlyEqual(item, b[i]); });
}
//# sourceMappingURL=readFromStore.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = graphql;
/* unused harmony export merge */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_utilities__ = __webpack_require__(31);

/* Based on graphql function from graphql-js:
 *
 * graphql(
 *   schema: GraphQLSchema,
 *   requestString: string,
 *   rootValue?: ?any,
 *   contextValue?: ?any,
 *   variableValues?: ?{[key: string]: any},
 *   operationName?: ?string
 * ): Promise<GraphQLResult>
 *
 * The default export as of graphql-anywhere is sync as of 4.0,
 * but below is an exported alternative that is async.
 * In the 5.0 version, this will be the only export again
 * and it will be async
 *
 */
function graphql(resolver, document, rootValue, contextValue, variableValues, execOptions) {
    if (execOptions === void 0) { execOptions = {}; }
    var mainDefinition = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["i" /* getMainDefinition */])(document);
    var fragments = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["g" /* getFragmentDefinitions */])(document);
    var fragmentMap = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["d" /* createFragmentMap */])(fragments);
    var resultMapper = execOptions.resultMapper;
    // Default matcher always matches all fragments
    var fragmentMatcher = execOptions.fragmentMatcher || (function () { return true; });
    var execContext = {
        fragmentMap: fragmentMap,
        contextValue: contextValue,
        variableValues: variableValues,
        resultMapper: resultMapper,
        resolver: resolver,
        fragmentMatcher: fragmentMatcher,
    };
    return executeSelectionSet(mainDefinition.selectionSet, rootValue, execContext);
}
function executeSelectionSet(selectionSet, rootValue, execContext) {
    var fragmentMap = execContext.fragmentMap, contextValue = execContext.contextValue, variables = execContext.variableValues;
    var result = {};
    selectionSet.selections.forEach(function (selection) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["A" /* shouldInclude */])(selection, variables)) {
            // Skip this entirely
            return;
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["r" /* isField */])(selection)) {
            var fieldResult = executeField(selection, rootValue, execContext);
            var resultFieldKey = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["z" /* resultKeyNameFromField */])(selection);
            if (fieldResult !== undefined) {
                if (result[resultFieldKey] === undefined) {
                    result[resultFieldKey] = fieldResult;
                }
                else {
                    merge(result[resultFieldKey], fieldResult);
                }
            }
        }
        else {
            var fragment = void 0;
            if (Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["t" /* isInlineFragment */])(selection)) {
                fragment = selection;
            }
            else {
                // This is a named fragment
                fragment = fragmentMap[selection.name.value];
                if (!fragment) {
                    throw new Error("No fragment named " + selection.name.value);
                }
            }
            var typeCondition = fragment.typeCondition.name.value;
            if (execContext.fragmentMatcher(rootValue, typeCondition, contextValue)) {
                var fragmentResult = executeSelectionSet(fragment.selectionSet, rootValue, execContext);
                merge(result, fragmentResult);
            }
        }
    });
    if (execContext.resultMapper) {
        return execContext.resultMapper(result, rootValue);
    }
    return result;
}
function executeField(field, rootValue, execContext) {
    var variables = execContext.variableValues, contextValue = execContext.contextValue, resolver = execContext.resolver;
    var fieldName = field.name.value;
    var args = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["b" /* argumentsObjectFromField */])(field, variables);
    var info = {
        isLeaf: !field.selectionSet,
        resultKey: Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["z" /* resultKeyNameFromField */])(field),
        directives: Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["f" /* getDirectiveInfoFromField */])(field, variables),
    };
    var result = resolver(fieldName, rootValue, args, contextValue, info);
    // Handle all scalar types here
    if (!field.selectionSet) {
        return result;
    }
    // From here down, the field has a selection set, which means it's trying to
    // query a GraphQLObjectType
    if (result == null) {
        // Basically any field in a GraphQL response can be null, or missing
        return result;
    }
    if (Array.isArray(result)) {
        return executeSubSelectedArray(field, result, execContext);
    }
    // Returned value is an object, and the query has a sub-selection. Recurse.
    return executeSelectionSet(field.selectionSet, result, execContext);
}
function executeSubSelectedArray(field, result, execContext) {
    return result.map(function (item) {
        // null value in array
        if (item === null) {
            return null;
        }
        // This is a nested array, recurse
        if (Array.isArray(item)) {
            return executeSubSelectedArray(field, item, execContext);
        }
        // This is an object, run the selection set on it
        return executeSelectionSet(field.selectionSet, item, execContext);
    });
}
var hasOwn = Object.prototype.hasOwnProperty;
function merge(dest, src) {
    if (src !== null && typeof src === 'object') {
        Object.keys(src).forEach(function (key) {
            var srcVal = src[key];
            if (!hasOwn.call(dest, key)) {
                dest[key] = srcVal;
            }
            else {
                merge(dest[key], srcVal);
            }
        });
    }
}
//# sourceMappingURL=graphql.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RecordingCache */
/* harmony export (immutable) */ __webpack_exports__["a"] = record;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var RecordingCache = /** @class */ (function () {
    function RecordingCache(data) {
        if (data === void 0) { data = {}; }
        this.data = data;
        this.recordedData = {};
    }
    RecordingCache.prototype.record = function (transaction) {
        transaction(this);
        var recordedData = this.recordedData;
        this.recordedData = {};
        return recordedData;
    };
    RecordingCache.prototype.toObject = function () {
        return __assign({}, this.data, this.recordedData);
    };
    RecordingCache.prototype.get = function (dataId) {
        if (this.recordedData.hasOwnProperty(dataId)) {
            // recording always takes precedence:
            return this.recordedData[dataId];
        }
        return this.data[dataId];
    };
    RecordingCache.prototype.set = function (dataId, value) {
        if (this.get(dataId) !== value) {
            this.recordedData[dataId] = value;
        }
    };
    RecordingCache.prototype.delete = function (dataId) {
        this.recordedData[dataId] = undefined;
    };
    RecordingCache.prototype.clear = function () {
        var _this = this;
        Object.keys(this.data).forEach(function (dataId) { return _this.delete(dataId); });
        this.recordedData = {};
    };
    RecordingCache.prototype.replace = function (newData) {
        this.clear();
        this.recordedData = __assign({}, newData);
    };
    return RecordingCache;
}());

function record(startingState, transaction) {
    var recordingCache = new RecordingCache(startingState);
    return recordingCache.record(transaction);
}
//# sourceMappingURL=recordingCache.js.map

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(15);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(18);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(183);

var _PathUtils = __webpack_require__(94);

var _createTransitionManager = __webpack_require__(184);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(285);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils.stripLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  },
  slash: {
    encodePath: _PathUtils.addLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;


  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, _PathUtils.createPath)(location));
  };

  var push = function push(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createHashHistory;

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_invariant__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * The public API for rendering a history-aware <a>.
 */

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();

          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;


          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        replace = _props.replace,
        to = _props.to,
        innerRef = _props.innerRef,
        props = _objectWithoutProperties(_props, ['replace', 'to', 'innerRef']); // eslint-disable-line no-unused-vars

    __WEBPACK_IMPORTED_MODULE_2_invariant___default()(this.context.router, 'You should not use <Link> outside a <Router>');

    var href = this.context.router.history.createHref(typeof to === 'string' ? { pathname: to } : to);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a', _extends({}, props, { onClick: this.handleClick, href: href, ref: innerRef }));
  };

  return Link;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Link.propTypes = {
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  target: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object]).isRequired,
  innerRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func])
};
Link.defaultProps = {
  replace: false
};
Link.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      push: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
      replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
      createHref: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
    }).isRequired
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Route__ = __webpack_require__(186);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Route__["a" /* default */]);

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(this && this[arg] || arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(this, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(this && this[key] || key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth__ = __webpack_require__(194);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak






var LogoutRoute = function (_PureComponent) {
  _inherits(LogoutRoute, _PureComponent);

  function LogoutRoute() {
    _classCallCheck(this, LogoutRoute);

    return _possibleConstructorReturn(this, (LogoutRoute.__proto__ || Object.getPrototypeOf(LogoutRoute)).apply(this, arguments));
  }

  _createClass(LogoutRoute, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* default */].clearAllAppStorage();
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Route */],
        this.props,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Redirect */], { to: { pathname: '/login' } })
      );
    }
  }]);

  return LogoutRoute;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

LogoutRoute.propTypes = {
  // react-router 4:
  match: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["f" /* withRouter */])(LogoutRoute));

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives__ = __webpack_require__(710);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fragments__ = __webpack_require__(711);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__fragments__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getFromAST__ = __webpack_require__(267);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__getFromAST__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__getFromAST__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__getFromAST__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_2__getFromAST__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_2__getFromAST__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_2__getFromAST__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_2__getFromAST__["i"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_2__getFromAST__["j"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transform__ = __webpack_require__(712);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__transform__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_3__transform__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__storeUtils__ = __webpack_require__(170);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_4__storeUtils__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_assign__ = __webpack_require__(268);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__util_assign__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_cloneDeep__ = __webpack_require__(269);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_environment__ = __webpack_require__(171);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_7__util_environment__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_7__util_environment__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_errorHandling__ = __webpack_require__(713);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_8__util_errorHandling__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_8__util_errorHandling__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_isEqual__ = __webpack_require__(714);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_9__util_isEqual__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util_maybeDeepFreeze__ = __webpack_require__(715);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_10__util_maybeDeepFreeze__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__util_warnOnce__ = __webpack_require__(716);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_11__util_warnOnce__["a"]; });












//# sourceMappingURL=index.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth__ = __webpack_require__(194);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak






var PrivateRoute = function (_Component) {
  _inherits(PrivateRoute, _Component);

  function PrivateRoute() {
    _classCallCheck(this, PrivateRoute);

    return _possibleConstructorReturn(this, (PrivateRoute.__proto__ || Object.getPrototypeOf(PrivateRoute)).apply(this, arguments));
  }

  _createClass(PrivateRoute, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          InnerComponent = _props.component,
          rest = _objectWithoutProperties(_props, ['component']);

      var location = this.props.location;


      var isUserAuthenticated = this.isAuthenticated();
      var isTokenExpired = false; // this.isExpired();

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Route */], _extends({}, rest, {
        render: function render(props) {
          return !isTokenExpired && isUserAuthenticated ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(InnerComponent, props) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Redirect */], { to: { pathname: '/login', state: { from: location } } });
        }
      }));
    }
  }, {
    key: 'isAuthenticated',
    value: function isAuthenticated() {
      var checkUserHasId = function checkUserHasId(user) {
        return user && user.id;
      };
      var user = __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* default */].getUserInfo() ? __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* default */].getUserInfo() : null;
      var isAuthenticated = __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* default */].getToken() && checkUserHasId(user) ? true : false;
      return isAuthenticated;
    }
  }, {
    key: 'isExpired',
    value: function isExpired() {
      return __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* default */].isExpiredToken(__WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* default */].getToken());
    }
  }]);

  return PrivateRoute;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

PrivateRoute.propTypes = {
  // react-router 4:
  match: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,

  component: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any.isRequired,
  path: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["f" /* withRouter */])(PrivateRoute));

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(221);
module.exports = __webpack_require__(678);


/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tap_event_plugin__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tap_event_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_tap_event_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_smoothscroll_polyfill__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_smoothscroll_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_smoothscroll_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_graphql_tag__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_graphql_tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_graphql_tag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_apollo__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_apollo_client__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_apollo_cache_inmemory__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_apollo_link_http__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_apollo_link_error__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_apollo_link__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Root__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_animate_css__ = __webpack_require__(996);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_animate_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_animate_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_jquery__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_font_awesome_css_font_awesome_min_css__ = __webpack_require__(997);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_font_awesome_css_font_awesome_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_font_awesome_css_font_awesome_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_bootstrap_dist_css_bootstrap_min_css__ = __webpack_require__(998);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_bootstrap_dist_css_bootstrap_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_bootstrap_dist_css_bootstrap_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_bootstrap_dist_js_bootstrap_min_js__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_bootstrap_dist_js_bootstrap_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_bootstrap_dist_js_bootstrap_min_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__style_index_scss__ = __webpack_require__(999);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__style_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__style_index_scss__);
//  weak







// Apollo Client







///////////////////////////////////////////////////////////////////////////



 // css is not managed by CSSModule


 // import general styles, mixins etc...

// smoothscroll polyfill
__WEBPACK_IMPORTED_MODULE_4_smoothscroll_polyfill___default.a.polyfill();
// force polyfill (even if browser partially implements it)
window.__forceSmoothScrollPolyfill__ = true;

var ELEMENT_TO_BOOTSTRAP = 'root';
var BootstrapedElement = document.getElementById(ELEMENT_TO_BOOTSTRAP);

__WEBPACK_IMPORTED_MODULE_2_react_tap_event_plugin___default()();

var client = new __WEBPACK_IMPORTED_MODULE_7_apollo_client__["ApolloClient"]({
  link: __WEBPACK_IMPORTED_MODULE_11_apollo_link__["a" /* ApolloLink */].from([Object(__WEBPACK_IMPORTED_MODULE_10_apollo_link_error__["a" /* onError */])(function (_ref) {
    var graphQLErrors = _ref.graphQLErrors,
        networkError = _ref.networkError;

    if (graphQLErrors) graphQLErrors.map(function (_ref2) {
      var message = _ref2.message,
          locations = _ref2.locations,
          path = _ref2.path;
      return console.log('[GraphQL error]: Message: ' + message + ', Location: ' + locations + ', Path: ' + path);
    });
    if (networkError) console.log('[Network error]: ' + networkError);
  }), new __WEBPACK_IMPORTED_MODULE_9_apollo_link_http__["a" /* HttpLink */]({
    uri: "http://http://27.78.16.8:8087/graphql",
    credentials: "same-origin"
  })]),
  cache: new __WEBPACK_IMPORTED_MODULE_8_apollo_cache_inmemory__["a" /* InMemoryCache */]()
});

var renderApp = function renderApp(RootComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__["AppContainer"],
    {
      warnings: false
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_6_react_apollo__["ApolloProvider"],
      { client: client },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(RootComponent, null)
    )
  ), BootstrapedElement);
};

renderApp(__WEBPACK_IMPORTED_MODULE_12__Root__["a" /* default */]);

if (false) {
  module.hot.accept('./Root', function () {
    var RootComponent = require('./Root').default;
    renderApp(RootComponent);
  });
}

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link__ = __webpack_require__(717);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__link__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__link__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linkUtils__ = __webpack_require__(272);
/* unused harmony reexport createOperation */
/* unused harmony reexport makePromise */
/* unused harmony reexport toPromise */
/* unused harmony reexport fromPromise */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__linkUtils__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zen_observable_ts__ = __webpack_require__(172);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2_zen_observable_ts__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

/* smoothscroll v0.4.0 - 2018 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  // polyfill
  function polyfill() {
    // aliases
    var w = window;
    var d = document;

    // return if scroll behavior is supported and polyfill is not forced
    if (
      'scrollBehavior' in d.documentElement.style &&
      w.__forceSmoothScrollPolyfill__ !== true
    ) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now =
      w.performance && w.performance.now
        ? w.performance.now.bind(w.performance)
        : Date.now;

    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    function isMicrosoftBrowser(userAgent) {
      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
    }

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (
        firstArg === null ||
        typeof firstArg !== 'object' ||
        firstArg.behavior === undefined ||
        firstArg.behavior === 'auto' ||
        firstArg.behavior === 'instant'
      ) {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions ' +
          firstArg.behavior +
          ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;

      do {
        el = el.parentNode;

        isBody = el === d.body;
      } while (isBody === false && isScrollable(el) === false);

      isBody = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : w.scrollX || w.pageXOffset,
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : w.scrollY || w.pageYOffset
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : w.scrollX || w.pageXOffset,
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : w.scrollY || w.pageYOffset
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined ? arguments[1] : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value could not be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined ? true : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (true) {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }

}());


/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.parseValue = parseValue;
exports.parseType = parseType;
exports.parseConstValue = parseConstValue;
exports.parseTypeReference = parseTypeReference;
exports.parseNamedType = parseNamedType;

var _source = __webpack_require__(700);

var _error = __webpack_require__(262);

var _lexer = __webpack_require__(704);

var _kinds = __webpack_require__(706);

var _directiveLocation = __webpack_require__(707);

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */


/**
 * Configuration options to control parser behavior
 */
function parse(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  if (!(sourceObj instanceof _source.Source)) {
    throw new TypeError('Must provide Source. Received: ' + String(sourceObj));
  }
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  return parseDocument(lexer);
}

/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

function parseValue(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var value = parseValueLiteral(lexer, false);
  expect(lexer, _lexer.TokenKind.EOF);
  return value;
}

/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */
function parseType(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var type = parseTypeReference(lexer);
  expect(lexer, _lexer.TokenKind.EOF);
  return type;
}

/**
 * Converts a name lex token into a name parse node.
 */
function parseName(lexer) {
  var token = expect(lexer, _lexer.TokenKind.NAME);
  return {
    kind: _kinds.Kind.NAME,
    value: token.value,
    loc: loc(lexer, token)
  };
}

// Implements the parsing rules in the Document section.

/**
 * Document : Definition+
 */
function parseDocument(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SOF);
  var definitions = [];
  do {
    definitions.push(parseDefinition(lexer));
  } while (!skip(lexer, _lexer.TokenKind.EOF));

  return {
    kind: _kinds.Kind.DOCUMENT,
    definitions: definitions,
    loc: loc(lexer, start)
  };
}

/**
 * Definition :
 *   - ExecutableDefinition
 *   - TypeSystemDefinition
 */
function parseDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'query':
      case 'mutation':
      case 'subscription':
      case 'fragment':
        return parseExecutableDefinition(lexer);
      case 'schema':
      case 'scalar':
      case 'type':
      case 'interface':
      case 'union':
      case 'enum':
      case 'input':
      case 'extend':
      case 'directive':
        // Note: The schema definition language is an experimental addition.
        return parseTypeSystemDefinition(lexer);
    }
  } else if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return parseExecutableDefinition(lexer);
  } else if (peekDescription(lexer)) {
    // Note: The schema definition language is an experimental addition.
    return parseTypeSystemDefinition(lexer);
  }

  throw unexpected(lexer);
}

/**
 * ExecutableDefinition :
 *   - OperationDefinition
 *   - FragmentDefinition
 */
function parseExecutableDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'query':
      case 'mutation':
      case 'subscription':
        return parseOperationDefinition(lexer);

      case 'fragment':
        return parseFragmentDefinition(lexer);
    }
  } else if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return parseOperationDefinition(lexer);
  }

  throw unexpected(lexer);
}

// Implements the parsing rules in the Operations section.

/**
 * OperationDefinition :
 *  - SelectionSet
 *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
 */
function parseOperationDefinition(lexer) {
  var start = lexer.token;
  if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return {
      kind: _kinds.Kind.OPERATION_DEFINITION,
      operation: 'query',
      name: undefined,
      variableDefinitions: [],
      directives: [],
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start)
    };
  }
  var operation = parseOperationType(lexer);
  var name = void 0;
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    name = parseName(lexer);
  }
  return {
    kind: _kinds.Kind.OPERATION_DEFINITION,
    operation: operation,
    name: name,
    variableDefinitions: parseVariableDefinitions(lexer),
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * OperationType : one of query mutation subscription
 */
function parseOperationType(lexer) {
  var operationToken = expect(lexer, _lexer.TokenKind.NAME);
  switch (operationToken.value) {
    case 'query':
      return 'query';
    case 'mutation':
      return 'mutation';
    case 'subscription':
      return 'subscription';
  }

  throw unexpected(lexer, operationToken);
}

/**
 * VariableDefinitions : ( VariableDefinition+ )
 */
function parseVariableDefinitions(lexer) {
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, parseVariableDefinition, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * VariableDefinition : Variable : Type DefaultValue?
 */
function parseVariableDefinition(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.VARIABLE_DEFINITION,
    variable: parseVariable(lexer),
    type: (expect(lexer, _lexer.TokenKind.COLON), parseTypeReference(lexer)),
    defaultValue: skip(lexer, _lexer.TokenKind.EQUALS) ? parseValueLiteral(lexer, true) : undefined,
    loc: loc(lexer, start)
  };
}

/**
 * Variable : $ Name
 */
function parseVariable(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.DOLLAR);
  return {
    kind: _kinds.Kind.VARIABLE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * SelectionSet : { Selection+ }
 */
function parseSelectionSet(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.SELECTION_SET,
    selections: many(lexer, _lexer.TokenKind.BRACE_L, parseSelection, _lexer.TokenKind.BRACE_R),
    loc: loc(lexer, start)
  };
}

/**
 * Selection :
 *   - Field
 *   - FragmentSpread
 *   - InlineFragment
 */
function parseSelection(lexer) {
  return peek(lexer, _lexer.TokenKind.SPREAD) ? parseFragment(lexer) : parseField(lexer);
}

/**
 * Field : Alias? Name Arguments? Directives? SelectionSet?
 *
 * Alias : Name :
 */
function parseField(lexer) {
  var start = lexer.token;

  var nameOrAlias = parseName(lexer);
  var alias = void 0;
  var name = void 0;
  if (skip(lexer, _lexer.TokenKind.COLON)) {
    alias = nameOrAlias;
    name = parseName(lexer);
  } else {
    name = nameOrAlias;
  }

  return {
    kind: _kinds.Kind.FIELD,
    alias: alias,
    name: name,
    arguments: parseArguments(lexer, false),
    directives: parseDirectives(lexer, false),
    selectionSet: peek(lexer, _lexer.TokenKind.BRACE_L) ? parseSelectionSet(lexer) : undefined,
    loc: loc(lexer, start)
  };
}

/**
 * Arguments[Const] : ( Argument[?Const]+ )
 */
function parseArguments(lexer, isConst) {
  var item = isConst ? parseConstArgument : parseArgument;
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, item, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * Argument[Const] : Name : Value[?Const]
 */
function parseArgument(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.ARGUMENT,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, false)),
    loc: loc(lexer, start)
  };
}

function parseConstArgument(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.ARGUMENT,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseConstValue(lexer)),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Fragments section.

/**
 * Corresponds to both FragmentSpread and InlineFragment in the spec.
 *
 * FragmentSpread : ... FragmentName Directives?
 *
 * InlineFragment : ... TypeCondition? Directives? SelectionSet
 */
function parseFragment(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SPREAD);
  if (peek(lexer, _lexer.TokenKind.NAME) && lexer.token.value !== 'on') {
    return {
      kind: _kinds.Kind.FRAGMENT_SPREAD,
      name: parseFragmentName(lexer),
      directives: parseDirectives(lexer, false),
      loc: loc(lexer, start)
    };
  }
  var typeCondition = void 0;
  if (lexer.token.value === 'on') {
    lexer.advance();
    typeCondition = parseNamedType(lexer);
  }
  return {
    kind: _kinds.Kind.INLINE_FRAGMENT,
    typeCondition: typeCondition,
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * FragmentDefinition :
 *   - fragment FragmentName on TypeCondition Directives? SelectionSet
 *
 * TypeCondition : NamedType
 */
function parseFragmentDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'fragment');
  // Experimental support for defining variables within fragments changes
  // the grammar of FragmentDefinition:
  //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet
  if (lexer.options.experimentalFragmentVariables) {
    return {
      kind: _kinds.Kind.FRAGMENT_DEFINITION,
      name: parseFragmentName(lexer),
      variableDefinitions: parseVariableDefinitions(lexer),
      typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
      directives: parseDirectives(lexer, false),
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start)
    };
  }
  return {
    kind: _kinds.Kind.FRAGMENT_DEFINITION,
    name: parseFragmentName(lexer),
    typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * FragmentName : Name but not `on`
 */
function parseFragmentName(lexer) {
  if (lexer.token.value === 'on') {
    throw unexpected(lexer);
  }
  return parseName(lexer);
}

// Implements the parsing rules in the Values section.

/**
 * Value[Const] :
 *   - [~Const] Variable
 *   - IntValue
 *   - FloatValue
 *   - StringValue
 *   - BooleanValue
 *   - NullValue
 *   - EnumValue
 *   - ListValue[?Const]
 *   - ObjectValue[?Const]
 *
 * BooleanValue : one of `true` `false`
 *
 * NullValue : `null`
 *
 * EnumValue : Name but not `true`, `false` or `null`
 */
function parseValueLiteral(lexer, isConst) {
  var token = lexer.token;
  switch (token.kind) {
    case _lexer.TokenKind.BRACKET_L:
      return parseList(lexer, isConst);
    case _lexer.TokenKind.BRACE_L:
      return parseObject(lexer, isConst);
    case _lexer.TokenKind.INT:
      lexer.advance();
      return {
        kind: _kinds.Kind.INT,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.FLOAT:
      lexer.advance();
      return {
        kind: _kinds.Kind.FLOAT,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.STRING:
    case _lexer.TokenKind.BLOCK_STRING:
      return parseStringLiteral(lexer);
    case _lexer.TokenKind.NAME:
      if (token.value === 'true' || token.value === 'false') {
        lexer.advance();
        return {
          kind: _kinds.Kind.BOOLEAN,
          value: token.value === 'true',
          loc: loc(lexer, token)
        };
      } else if (token.value === 'null') {
        lexer.advance();
        return {
          kind: _kinds.Kind.NULL,
          loc: loc(lexer, token)
        };
      }
      lexer.advance();
      return {
        kind: _kinds.Kind.ENUM,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.DOLLAR:
      if (!isConst) {
        return parseVariable(lexer);
      }
      break;
  }
  throw unexpected(lexer);
}

function parseStringLiteral(lexer) {
  var token = lexer.token;
  lexer.advance();
  return {
    kind: _kinds.Kind.STRING,
    value: token.value,
    block: token.kind === _lexer.TokenKind.BLOCK_STRING,
    loc: loc(lexer, token)
  };
}

function parseConstValue(lexer) {
  return parseValueLiteral(lexer, true);
}

function parseValueValue(lexer) {
  return parseValueLiteral(lexer, false);
}

/**
 * ListValue[Const] :
 *   - [ ]
 *   - [ Value[?Const]+ ]
 */
function parseList(lexer, isConst) {
  var start = lexer.token;
  var item = isConst ? parseConstValue : parseValueValue;
  return {
    kind: _kinds.Kind.LIST,
    values: any(lexer, _lexer.TokenKind.BRACKET_L, item, _lexer.TokenKind.BRACKET_R),
    loc: loc(lexer, start)
  };
}

/**
 * ObjectValue[Const] :
 *   - { }
 *   - { ObjectField[?Const]+ }
 */
function parseObject(lexer, isConst) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.BRACE_L);
  var fields = [];
  while (!skip(lexer, _lexer.TokenKind.BRACE_R)) {
    fields.push(parseObjectField(lexer, isConst));
  }
  return {
    kind: _kinds.Kind.OBJECT,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectField[Const] : Name : Value[?Const]
 */
function parseObjectField(lexer, isConst) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.OBJECT_FIELD,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, isConst)),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Directives section.

/**
 * Directives[Const] : Directive[?Const]+
 */
function parseDirectives(lexer, isConst) {
  var directives = [];
  while (peek(lexer, _lexer.TokenKind.AT)) {
    directives.push(parseDirective(lexer, isConst));
  }
  return directives;
}

/**
 * Directive[Const] : @ Name Arguments[?Const]?
 */
function parseDirective(lexer, isConst) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.AT);
  return {
    kind: _kinds.Kind.DIRECTIVE,
    name: parseName(lexer),
    arguments: parseArguments(lexer, isConst),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Types section.

/**
 * Type :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 */
function parseTypeReference(lexer) {
  var start = lexer.token;
  var type = void 0;
  if (skip(lexer, _lexer.TokenKind.BRACKET_L)) {
    type = parseTypeReference(lexer);
    expect(lexer, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.Kind.LIST_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  } else {
    type = parseNamedType(lexer);
  }
  if (skip(lexer, _lexer.TokenKind.BANG)) {
    return {
      kind: _kinds.Kind.NON_NULL_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  }
  return type;
}

/**
 * NamedType : Name
 */
function parseNamedType(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.NAMED_TYPE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Type Definition section.

/**
 * TypeSystemDefinition :
 *   - SchemaDefinition
 *   - TypeDefinition
 *   - TypeExtension
 *   - DirectiveDefinition
 *
 * TypeDefinition :
 *   - ScalarTypeDefinition
 *   - ObjectTypeDefinition
 *   - InterfaceTypeDefinition
 *   - UnionTypeDefinition
 *   - EnumTypeDefinition
 *   - InputObjectTypeDefinition
 */
function parseTypeSystemDefinition(lexer) {
  // Many definitions begin with a description and require a lookahead.
  var keywordToken = peekDescription(lexer) ? lexer.lookahead() : lexer.token;

  if (keywordToken.kind === _lexer.TokenKind.NAME) {
    switch (keywordToken.value) {
      case 'schema':
        return parseSchemaDefinition(lexer);
      case 'scalar':
        return parseScalarTypeDefinition(lexer);
      case 'type':
        return parseObjectTypeDefinition(lexer);
      case 'interface':
        return parseInterfaceTypeDefinition(lexer);
      case 'union':
        return parseUnionTypeDefinition(lexer);
      case 'enum':
        return parseEnumTypeDefinition(lexer);
      case 'input':
        return parseInputObjectTypeDefinition(lexer);
      case 'extend':
        return parseTypeExtension(lexer);
      case 'directive':
        return parseDirectiveDefinition(lexer);
    }
  }

  throw unexpected(lexer, keywordToken);
}

function peekDescription(lexer) {
  return peek(lexer, _lexer.TokenKind.STRING) || peek(lexer, _lexer.TokenKind.BLOCK_STRING);
}

/**
 * Description : StringValue
 */
function parseDescription(lexer) {
  if (peekDescription(lexer)) {
    return parseStringLiteral(lexer);
  }
}

/**
 * SchemaDefinition : schema Directives[Const]? { OperationTypeDefinition+ }
 */
function parseSchemaDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'schema');
  var directives = parseDirectives(lexer, true);
  var operationTypes = many(lexer, _lexer.TokenKind.BRACE_L, parseOperationTypeDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.Kind.SCHEMA_DEFINITION,
    directives: directives,
    operationTypes: operationTypes,
    loc: loc(lexer, start)
  };
}

/**
 * OperationTypeDefinition : OperationType : NamedType
 */
function parseOperationTypeDefinition(lexer) {
  var start = lexer.token;
  var operation = parseOperationType(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseNamedType(lexer);
  return {
    kind: _kinds.Kind.OPERATION_TYPE_DEFINITION,
    operation: operation,
    type: type,
    loc: loc(lexer, start)
  };
}

/**
 * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
 */
function parseScalarTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'scalar');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  return {
    kind: _kinds.Kind.SCALAR_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectTypeDefinition :
 *   Description?
 *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
 */
function parseObjectTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'type');
  var name = parseName(lexer);
  var interfaces = parseImplementsInterfaces(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseFieldsDefinition(lexer);
  return {
    kind: _kinds.Kind.OBJECT_TYPE_DEFINITION,
    description: description,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * ImplementsInterfaces :
 *   - implements `&`? NamedType
 *   - ImplementsInterfaces & NamedType
 */
function parseImplementsInterfaces(lexer) {
  var types = [];
  if (lexer.token.value === 'implements') {
    lexer.advance();
    // Optional leading ampersand
    skip(lexer, _lexer.TokenKind.AMP);
    do {
      types.push(parseNamedType(lexer));
    } while (skip(lexer, _lexer.TokenKind.AMP) ||
    // Legacy support for the SDL?
    lexer.options.allowLegacySDLImplementsInterfaces && peek(lexer, _lexer.TokenKind.NAME));
  }
  return types;
}

/**
 * FieldsDefinition : { FieldDefinition+ }
 */
function parseFieldsDefinition(lexer) {
  // Legacy support for the SDL?
  if (lexer.options.allowLegacySDLEmptyFields && peek(lexer, _lexer.TokenKind.BRACE_L) && lexer.lookahead().kind === _lexer.TokenKind.BRACE_R) {
    lexer.advance();
    lexer.advance();
    return [];
  }
  return peek(lexer, _lexer.TokenKind.BRACE_L) ? many(lexer, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R) : [];
}

/**
 * FieldDefinition :
 *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
 */
function parseFieldDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var directives = parseDirectives(lexer, true);
  return {
    kind: _kinds.Kind.FIELD_DEFINITION,
    description: description,
    name: name,
    arguments: args,
    type: type,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ArgumentsDefinition : ( InputValueDefinition+ )
 */
function parseArgumentDefs(lexer) {
  if (!peek(lexer, _lexer.TokenKind.PAREN_L)) {
    return [];
  }
  return many(lexer, _lexer.TokenKind.PAREN_L, parseInputValueDef, _lexer.TokenKind.PAREN_R);
}

/**
 * InputValueDefinition :
 *   - Description? Name : Type DefaultValue? Directives[Const]?
 */
function parseInputValueDef(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  var name = parseName(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var defaultValue = void 0;
  if (skip(lexer, _lexer.TokenKind.EQUALS)) {
    defaultValue = parseConstValue(lexer);
  }
  var directives = parseDirectives(lexer, true);
  return {
    kind: _kinds.Kind.INPUT_VALUE_DEFINITION,
    description: description,
    name: name,
    type: type,
    defaultValue: defaultValue,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * InterfaceTypeDefinition :
 *   - Description? interface Name Directives[Const]? FieldsDefinition?
 */
function parseInterfaceTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'interface');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseFieldsDefinition(lexer);
  return {
    kind: _kinds.Kind.INTERFACE_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * UnionTypeDefinition :
 *   - Description? union Name Directives[Const]? UnionMemberTypes?
 */
function parseUnionTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'union');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var types = parseUnionMemberTypes(lexer);
  return {
    kind: _kinds.Kind.UNION_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer, start)
  };
}

/**
 * UnionMemberTypes :
 *   - = `|`? NamedType
 *   - UnionMemberTypes | NamedType
 */
function parseUnionMemberTypes(lexer) {
  var types = [];
  if (skip(lexer, _lexer.TokenKind.EQUALS)) {
    // Optional leading pipe
    skip(lexer, _lexer.TokenKind.PIPE);
    do {
      types.push(parseNamedType(lexer));
    } while (skip(lexer, _lexer.TokenKind.PIPE));
  }
  return types;
}

/**
 * EnumTypeDefinition :
 *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
 */
function parseEnumTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'enum');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var values = parseEnumValuesDefinition(lexer);
  return {
    kind: _kinds.Kind.ENUM_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer, start)
  };
}

/**
 * EnumValuesDefinition : { EnumValueDefinition+ }
 */
function parseEnumValuesDefinition(lexer) {
  return peek(lexer, _lexer.TokenKind.BRACE_L) ? many(lexer, _lexer.TokenKind.BRACE_L, parseEnumValueDefinition, _lexer.TokenKind.BRACE_R) : [];
}

/**
 * EnumValueDefinition : Description? EnumValue Directives[Const]?
 *
 * EnumValue : Name
 */
function parseEnumValueDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  return {
    kind: _kinds.Kind.ENUM_VALUE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * InputObjectTypeDefinition :
 *   - Description? input Name Directives[Const]? InputFieldsDefinition?
 */
function parseInputObjectTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'input');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseInputFieldsDefinition(lexer);
  return {
    kind: _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * InputFieldsDefinition : { InputValueDefinition+ }
 */
function parseInputFieldsDefinition(lexer) {
  return peek(lexer, _lexer.TokenKind.BRACE_L) ? many(lexer, _lexer.TokenKind.BRACE_L, parseInputValueDef, _lexer.TokenKind.BRACE_R) : [];
}

/**
 * TypeExtension :
 *   - ScalarTypeExtension
 *   - ObjectTypeExtension
 *   - InterfaceTypeExtension
 *   - UnionTypeExtension
 *   - EnumTypeExtension
 *   - InputObjectTypeDefinition
 */
function parseTypeExtension(lexer) {
  var keywordToken = lexer.lookahead();

  if (keywordToken.kind === _lexer.TokenKind.NAME) {
    switch (keywordToken.value) {
      case 'scalar':
        return parseScalarTypeExtension(lexer);
      case 'type':
        return parseObjectTypeExtension(lexer);
      case 'interface':
        return parseInterfaceTypeExtension(lexer);
      case 'union':
        return parseUnionTypeExtension(lexer);
      case 'enum':
        return parseEnumTypeExtension(lexer);
      case 'input':
        return parseInputObjectTypeExtension(lexer);
    }
  }

  throw unexpected(lexer, keywordToken);
}

/**
 * ScalarTypeExtension :
 *   - extend scalar Name Directives[Const]
 */
function parseScalarTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'scalar');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  if (directives.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: _kinds.Kind.SCALAR_TYPE_EXTENSION,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectTypeExtension :
 *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
 *  - extend type Name ImplementsInterfaces? Directives[Const]
 *  - extend type Name ImplementsInterfaces
 */
function parseObjectTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'type');
  var name = parseName(lexer);
  var interfaces = parseImplementsInterfaces(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseFieldsDefinition(lexer);
  if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: _kinds.Kind.OBJECT_TYPE_EXTENSION,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * InterfaceTypeExtension :
 *   - extend interface Name Directives[Const]? FieldsDefinition
 *   - extend interface Name Directives[Const]
 */
function parseInterfaceTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'interface');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseFieldsDefinition(lexer);
  if (directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: _kinds.Kind.INTERFACE_TYPE_EXTENSION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * UnionTypeExtension :
 *   - extend union Name Directives[Const]? UnionMemberTypes
 *   - extend union Name Directives[Const]
 */
function parseUnionTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'union');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var types = parseUnionMemberTypes(lexer);
  if (directives.length === 0 && types.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: _kinds.Kind.UNION_TYPE_EXTENSION,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer, start)
  };
}

/**
 * EnumTypeExtension :
 *   - extend enum Name Directives[Const]? EnumValuesDefinition
 *   - extend enum Name Directives[Const]
 */
function parseEnumTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'enum');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var values = parseEnumValuesDefinition(lexer);
  if (directives.length === 0 && values.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: _kinds.Kind.ENUM_TYPE_EXTENSION,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer, start)
  };
}

/**
 * InputObjectTypeExtension :
 *   - extend input Name Directives[Const]? InputFieldsDefinition
 *   - extend input Name Directives[Const]
 */
function parseInputObjectTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'input');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseInputFieldsDefinition(lexer);
  if (directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * DirectiveDefinition :
 *   - Description? directive @ Name ArgumentsDefinition? on DirectiveLocations
 */
function parseDirectiveDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'directive');
  expect(lexer, _lexer.TokenKind.AT);
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expectKeyword(lexer, 'on');
  var locations = parseDirectiveLocations(lexer);
  return {
    kind: _kinds.Kind.DIRECTIVE_DEFINITION,
    description: description,
    name: name,
    arguments: args,
    locations: locations,
    loc: loc(lexer, start)
  };
}

/**
 * DirectiveLocations :
 *   - `|`? DirectiveLocation
 *   - DirectiveLocations | DirectiveLocation
 */
function parseDirectiveLocations(lexer) {
  // Optional leading pipe
  skip(lexer, _lexer.TokenKind.PIPE);
  var locations = [];
  do {
    locations.push(parseDirectiveLocation(lexer));
  } while (skip(lexer, _lexer.TokenKind.PIPE));
  return locations;
}

/*
 * DirectiveLocation :
 *   - ExecutableDirectiveLocation
 *   - TypeSystemDirectiveLocation
 *
 * ExecutableDirectiveLocation : one of
 *   `QUERY`
 *   `MUTATION`
 *   `SUBSCRIPTION`
 *   `FIELD`
 *   `FRAGMENT_DEFINITION`
 *   `FRAGMENT_SPREAD`
 *   `INLINE_FRAGMENT`
 *
 * TypeSystemDirectiveLocation : one of
 *   `SCHEMA`
 *   `SCALAR`
 *   `OBJECT`
 *   `FIELD_DEFINITION`
 *   `ARGUMENT_DEFINITION`
 *   `INTERFACE`
 *   `UNION`
 *   `ENUM`
 *   `ENUM_VALUE`
 *   `INPUT_OBJECT`
 *   `INPUT_FIELD_DEFINITION`
 */
function parseDirectiveLocation(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  if (_directiveLocation.DirectiveLocation.hasOwnProperty(name.value)) {
    return name;
  }
  throw unexpected(lexer, start);
}

// Core parsing utility functions

/**
 * Returns a location object, used to identify the place in
 * the source that created a given parsed object.
 */
function loc(lexer, startToken) {
  if (!lexer.options.noLocation) {
    return new Loc(startToken, lexer.lastToken, lexer.source);
  }
}

function Loc(startToken, endToken, source) {
  this.start = startToken.start;
  this.end = endToken.end;
  this.startToken = startToken;
  this.endToken = endToken;
  this.source = source;
}

// Print a simplified form when appearing in JSON/util.inspect.
Loc.prototype.toJSON = Loc.prototype.inspect = function toJSON() {
  return { start: this.start, end: this.end };
};

/**
 * Determines if the next token is of a given kind
 */
function peek(lexer, kind) {
  return lexer.token.kind === kind;
}

/**
 * If the next token is of the given kind, return true after advancing
 * the lexer. Otherwise, do not change the parser state and return false.
 */
function skip(lexer, kind) {
  var match = lexer.token.kind === kind;
  if (match) {
    lexer.advance();
  }
  return match;
}

/**
 * If the next token is of the given kind, return that token after advancing
 * the lexer. Otherwise, do not change the parser state and throw an error.
 */
function expect(lexer, kind) {
  var token = lexer.token;
  if (token.kind === kind) {
    lexer.advance();
    return token;
  }
  throw (0, _error.syntaxError)(lexer.source, token.start, 'Expected ' + kind + ', found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * If the next token is a keyword with the given value, return that token after
 * advancing the lexer. Otherwise, do not change the parser state and return
 * false.
 */
function expectKeyword(lexer, value) {
  var token = lexer.token;
  if (token.kind === _lexer.TokenKind.NAME && token.value === value) {
    lexer.advance();
    return token;
  }
  throw (0, _error.syntaxError)(lexer.source, token.start, 'Expected "' + value + '", found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Helper function for creating an error when an unexpected lexed token
 * is encountered.
 */
function unexpected(lexer, atToken) {
  var token = atToken || lexer.token;
  return (0, _error.syntaxError)(lexer.source, token.start, 'Unexpected ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Returns a possibly empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function any(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [];
  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}

/**
 * Returns a non-empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function many(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [parseFn(lexer)];
  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}

/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = undefined;

var _invariant = __webpack_require__(261);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                           *
                                                                                                                                                           * This source code is licensed under the MIT license found in the
                                                                                                                                                           * LICENSE file in the root directory of this source tree.
                                                                                                                                                           *
                                                                                                                                                           *  strict
                                                                                                                                                           */

/**
 * A representation of source input to GraphQL.
 * `name` and `locationOffset` are optional. They are useful for clients who
 * store GraphQL documents in source files; for example, if the GraphQL input
 * starts at line 40 in a file named Foo.graphql, it might be useful for name to
 * be "Foo.graphql" and location to be `{ line: 40, column: 0 }`.
 * line and column in locationOffset are 1-indexed
 */
var Source = exports.Source = function Source(body, name, locationOffset) {
  _classCallCheck(this, Source);

  this.body = body;
  this.name = name || 'GraphQL request';
  this.locationOffset = locationOffset || { line: 1, column: 1 };
  !(this.locationOffset.line > 0) ? (0, _invariant2.default)(0, 'line in locationOffset is 1-indexed and must be positive') : void 0;
  !(this.locationOffset.column > 0) ? (0, _invariant2.default)(0, 'column in locationOffset is 1-indexed and must be positive') : void 0;
};

/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syntaxError = syntaxError;

var _GraphQLError = __webpack_require__(168);

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

function syntaxError(source, position, description) {
  return new _GraphQLError.GraphQLError('Syntax Error: ' + description, undefined, source, [position]);
}

/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locatedError = locatedError;

var _GraphQLError = __webpack_require__(168);

/**
 * Given an arbitrary Error, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */
function locatedError(originalError, nodes, path) {
  // Note: this uses a brand-check to support GraphQL errors originating from
  // other contexts.
  // $FlowFixMe(>=0.68.0)
  if (originalError && Array.isArray(originalError.path)) {
    return originalError;
  }

  return new _GraphQLError.GraphQLError(originalError && originalError.message, originalError && originalError.nodes || nodes, originalError && originalError.source, originalError && originalError.positions, path, originalError);
} /**
   * Copyright (c) 2015-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   *  strict
   */

/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   *  strict
                                                                                                                                                                                                                                                                   */

exports.formatError = formatError;

var _invariant = __webpack_require__(261);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 */
function formatError(error) {
  !error ? (0, _invariant2.default)(0, 'Received null or undefined error.') : void 0;
  return _extends({}, error.extensions, {
    message: error.message || 'An unknown error occurred.',
    locations: error.locations,
    path: error.path
  });
}

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenKind = undefined;
exports.createLexer = createLexer;
exports.getTokenDesc = getTokenDesc;

var _error = __webpack_require__(262);

var _blockStringValue = __webpack_require__(705);

var _blockStringValue2 = _interopRequireDefault(_blockStringValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a Source object, this returns a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

function createLexer(source, options) {
  var startOfFileToken = new Tok(TokenKind.SOF, 0, 0, 0, 0, null);
  var lexer = {
    source: source,
    options: options,
    lastToken: startOfFileToken,
    token: startOfFileToken,
    line: 1,
    lineStart: 0,
    advance: advanceLexer,
    lookahead: lookahead
  };
  return lexer;
}

function advanceLexer() {
  this.lastToken = this.token;
  var token = this.token = this.lookahead();
  return token;
}

function lookahead() {
  var token = this.token;
  if (token.kind !== TokenKind.EOF) {
    do {
      // Note: next is only mutable during parsing, so we cast to allow this.
      token = token.next || (token.next = readToken(this, token));
    } while (token.kind === TokenKind.COMMENT);
  }
  return token;
}

/**
 * The return type of createLexer.
 */


/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = exports.TokenKind = Object.freeze({
  SOF: '<SOF>',
  EOF: '<EOF>',
  BANG: '!',
  DOLLAR: '$',
  AMP: '&',
  PAREN_L: '(',
  PAREN_R: ')',
  SPREAD: '...',
  COLON: ':',
  EQUALS: '=',
  AT: '@',
  BRACKET_L: '[',
  BRACKET_R: ']',
  BRACE_L: '{',
  PIPE: '|',
  BRACE_R: '}',
  NAME: 'Name',
  INT: 'Int',
  FLOAT: 'Float',
  STRING: 'String',
  BLOCK_STRING: 'BlockString',
  COMMENT: 'Comment'
});

/**
 * The enum type representing the token kinds values.
 */


/**
 * A helper function to describe a token as a string for debugging
 */
function getTokenDesc(token) {
  var value = token.value;
  return value ? token.kind + ' "' + value + '"' : token.kind;
}

var charCodeAt = String.prototype.charCodeAt;
var slice = String.prototype.slice;

/**
 * Helper function for constructing the Token object.
 */
function Tok(kind, start, end, line, column, prev, value) {
  this.kind = kind;
  this.start = start;
  this.end = end;
  this.line = line;
  this.column = column;
  this.value = value;
  this.prev = prev;
  this.next = null;
}

// Print a simplified form when appearing in JSON/util.inspect.
Tok.prototype.toJSON = Tok.prototype.inspect = function toJSON() {
  return {
    kind: this.kind,
    value: this.value,
    line: this.line,
    column: this.column
  };
};

function printCharCode(code) {
  return (
    // NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? TokenKind.EOF : // Trust JSON for ASCII.
    code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
    '"\\u' + ('00' + code.toString(16).toUpperCase()).slice(-4) + '"'
  );
}

/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace and comments until it finds the next lexable
 * token, then lexes punctuators immediately or calls the appropriate helper
 * function for more complicated tokens.
 */
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;

  var pos = positionAfterWhitespace(body, prev.end, lexer);
  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;

  if (pos >= bodyLength) {
    return new Tok(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
  }

  var code = charCodeAt.call(body, pos);

  // SourceCharacter
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
    throw (0, _error.syntaxError)(source, pos, 'Cannot contain the invalid character ' + printCharCode(code) + '.');
  }

  switch (code) {
    // !
    case 33:
      return new Tok(TokenKind.BANG, pos, pos + 1, line, col, prev);
    // #
    case 35:
      return readComment(source, pos, line, col, prev);
    // $
    case 36:
      return new Tok(TokenKind.DOLLAR, pos, pos + 1, line, col, prev);
    // &
    case 38:
      return new Tok(TokenKind.AMP, pos, pos + 1, line, col, prev);
    // (
    case 40:
      return new Tok(TokenKind.PAREN_L, pos, pos + 1, line, col, prev);
    // )
    case 41:
      return new Tok(TokenKind.PAREN_R, pos, pos + 1, line, col, prev);
    // .
    case 46:
      if (charCodeAt.call(body, pos + 1) === 46 && charCodeAt.call(body, pos + 2) === 46) {
        return new Tok(TokenKind.SPREAD, pos, pos + 3, line, col, prev);
      }
      break;
    // :
    case 58:
      return new Tok(TokenKind.COLON, pos, pos + 1, line, col, prev);
    // =
    case 61:
      return new Tok(TokenKind.EQUALS, pos, pos + 1, line, col, prev);
    // @
    case 64:
      return new Tok(TokenKind.AT, pos, pos + 1, line, col, prev);
    // [
    case 91:
      return new Tok(TokenKind.BRACKET_L, pos, pos + 1, line, col, prev);
    // ]
    case 93:
      return new Tok(TokenKind.BRACKET_R, pos, pos + 1, line, col, prev);
    // {
    case 123:
      return new Tok(TokenKind.BRACE_L, pos, pos + 1, line, col, prev);
    // |
    case 124:
      return new Tok(TokenKind.PIPE, pos, pos + 1, line, col, prev);
    // }
    case 125:
      return new Tok(TokenKind.BRACE_R, pos, pos + 1, line, col, prev);
    // A-Z _ a-z
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 85:
    case 86:
    case 87:
    case 88:
    case 89:
    case 90:
    case 95:
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
      return readName(source, pos, line, col, prev);
    // - 0-9
    case 45:
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return readNumber(source, pos, code, line, col, prev);
    // "
    case 34:
      if (charCodeAt.call(body, pos + 1) === 34 && charCodeAt.call(body, pos + 2) === 34) {
        return readBlockString(source, pos, line, col, prev);
      }
      return readString(source, pos, line, col, prev);
  }

  throw (0, _error.syntaxError)(source, pos, unexpectedCharacterMessage(code));
}

/**
 * Report a message that an unexpected character was encountered.
 */
function unexpectedCharacterMessage(code) {
  if (code === 39) {
    // '
    return "Unexpected single quote character ('), did you mean to use " + 'a double quote (")?';
  }

  return 'Cannot parse the unexpected character ' + printCharCode(code) + '.';
}

/**
 * Reads from body starting at startPosition until it finds a non-whitespace
 * or commented character, then returns the position of that character for
 * lexing.
 */
function positionAfterWhitespace(body, startPosition, lexer) {
  var bodyLength = body.length;
  var position = startPosition;
  while (position < bodyLength) {
    var code = charCodeAt.call(body, position);
    // tab | space | comma | BOM
    if (code === 9 || code === 32 || code === 44 || code === 0xfeff) {
      ++position;
    } else if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (charCodeAt.call(body, position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else {
      break;
    }
  }
  return position;
}

/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code = void 0;
  var position = start;

  do {
    code = charCodeAt.call(body, ++position);
  } while (code !== null && (
  // SourceCharacter but not LineTerminator
  code > 0x001f || code === 0x0009));

  return new Tok(TokenKind.COMMENT, start, position, line, col, prev, slice.call(body, start + 1, position));
}

/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = charCodeAt.call(body, ++position);
  }

  if (code === 48) {
    // 0
    code = charCodeAt.call(body, ++position);
    if (code >= 48 && code <= 57) {
      throw (0, _error.syntaxError)(source, position, 'Invalid number, unexpected digit after 0: ' + printCharCode(code) + '.');
    }
  } else {
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 46) {
    // .
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    if (code === 43 || code === 45) {
      // + -
      code = charCodeAt.call(body, ++position);
    }
    position = readDigits(source, position, code);
  }

  return new Tok(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, slice.call(body, start, position));
}

/**
 * Returns the new position in the source after reading digits.
 */
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = charCodeAt.call(body, ++position);
    } while (code >= 48 && code <= 57); // 0 - 9
    return position;
  }
  throw (0, _error.syntaxError)(source, position, 'Invalid number, expected digit but got: ' + printCharCode(code) + '.');
}

/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null &&
  // not LineTerminator
  code !== 0x000a && code !== 0x000d) {
    // Closing Quote (")
    if (code === 34) {
      value += slice.call(body, chunkStart, position);
      return new Tok(TokenKind.STRING, start, position + 1, line, col, prev, value);
    }

    // SourceCharacter
    if (code < 0x0020 && code !== 0x0009) {
      throw (0, _error.syntaxError)(source, position, 'Invalid character within String: ' + printCharCode(code) + '.');
    }

    ++position;
    if (code === 92) {
      // \
      value += slice.call(body, chunkStart, position - 1);
      code = charCodeAt.call(body, position);
      switch (code) {
        case 34:
          value += '"';
          break;
        case 47:
          value += '/';
          break;
        case 92:
          value += '\\';
          break;
        case 98:
          value += '\b';
          break;
        case 102:
          value += '\f';
          break;
        case 110:
          value += '\n';
          break;
        case 114:
          value += '\r';
          break;
        case 116:
          value += '\t';
          break;
        case 117:
          // u
          var charCode = uniCharCode(charCodeAt.call(body, position + 1), charCodeAt.call(body, position + 2), charCodeAt.call(body, position + 3), charCodeAt.call(body, position + 4));
          if (charCode < 0) {
            throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: ' + ('\\u' + body.slice(position + 1, position + 5) + '.'));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        default:
          throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: \\' + String.fromCharCode(code) + '.');
      }
      ++position;
      chunkStart = position;
    }
  }

  throw (0, _error.syntaxError)(source, position, 'Unterminated string.');
}

/**
 * Reads a block string token from the source file.
 *
 * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
 */
function readBlockString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null) {
    // Closing Triple-Quote (""")
    if (code === 34 && charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34) {
      rawValue += slice.call(body, chunkStart, position);
      return new Tok(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, (0, _blockStringValue2.default)(rawValue));
    }

    // SourceCharacter
    if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
      throw (0, _error.syntaxError)(source, position, 'Invalid character within String: ' + printCharCode(code) + '.');
    }

    // Escape Triple-Quote (\""")
    if (code === 92 && charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34 && charCodeAt.call(body, position + 3) === 34) {
      rawValue += slice.call(body, chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }

  throw (0, _error.syntaxError)(source, position, 'Unterminated string.');
}

/**
 * Converts four hexidecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */
function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}

/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */
function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 // 0-9
  : a >= 65 && a <= 70 ? a - 55 // A-F
  : a >= 97 && a <= 102 ? a - 87 // a-f
  : -1;
}

/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */
function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;
  while (position !== bodyLength && (code = charCodeAt.call(body, position)) !== null && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122) // a-z
  ) {
    ++position;
  }
  return new Tok(TokenKind.NAME, start, position, line, col, prev, slice.call(body, start, position));
}

/***/ }),

/***/ 705:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockStringValue;
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * Coffeescript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 */
function blockStringValue(rawString) {
  // Expand a block string's raw value into independent lines.
  var lines = rawString.split(/\r\n|[\n\r]/g);

  // Remove common indentation from all lines but first.
  var commonIndent = null;
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i];
    var indent = leadingWhitespace(line);
    if (indent < line.length && (commonIndent === null || indent < commonIndent)) {
      commonIndent = indent;
      if (commonIndent === 0) {
        break;
      }
    }
  }

  if (commonIndent) {
    for (var _i = 1; _i < lines.length; _i++) {
      lines[_i] = lines[_i].slice(commonIndent);
    }
  }

  // Remove leading and trailing blank lines.
  while (lines.length > 0 && isBlank(lines[0])) {
    lines.shift();
  }
  while (lines.length > 0 && isBlank(lines[lines.length - 1])) {
    lines.pop();
  }

  // Return a string of the lines joined with U+000A.
  return lines.join('\n');
}

function leadingWhitespace(str) {
  var i = 0;
  while (i < str.length && (str[i] === ' ' || str[i] === '\t')) {
    i++;
  }
  return i;
}

function isBlank(str) {
  return leadingWhitespace(str) === str.length;
}

/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * The set of allowed kind values for AST nodes.
 */
var Kind = exports.Kind = Object.freeze({
  // Name
  NAME: 'Name',

  // Document
  DOCUMENT: 'Document',
  OPERATION_DEFINITION: 'OperationDefinition',
  VARIABLE_DEFINITION: 'VariableDefinition',
  VARIABLE: 'Variable',
  SELECTION_SET: 'SelectionSet',
  FIELD: 'Field',
  ARGUMENT: 'Argument',

  // Fragments
  FRAGMENT_SPREAD: 'FragmentSpread',
  INLINE_FRAGMENT: 'InlineFragment',
  FRAGMENT_DEFINITION: 'FragmentDefinition',

  // Values
  INT: 'IntValue',
  FLOAT: 'FloatValue',
  STRING: 'StringValue',
  BOOLEAN: 'BooleanValue',
  NULL: 'NullValue',
  ENUM: 'EnumValue',
  LIST: 'ListValue',
  OBJECT: 'ObjectValue',
  OBJECT_FIELD: 'ObjectField',

  // Directives
  DIRECTIVE: 'Directive',

  // Types
  NAMED_TYPE: 'NamedType',
  LIST_TYPE: 'ListType',
  NON_NULL_TYPE: 'NonNullType',

  // Type System Definitions
  SCHEMA_DEFINITION: 'SchemaDefinition',
  OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',

  // Type Definitions
  SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
  OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
  FIELD_DEFINITION: 'FieldDefinition',
  INPUT_VALUE_DEFINITION: 'InputValueDefinition',
  INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
  UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
  ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
  ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
  INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',

  // Type Extensions
  SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
  OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
  INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
  UNION_TYPE_EXTENSION: 'UnionTypeExtension',
  ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
  INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension',

  // Directive Definitions
  DIRECTIVE_DEFINITION: 'DirectiveDefinition'
});

/**
 * The enum type representing the possible kind values of AST nodes.
 */

/***/ }),

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * The set of allowed directive location values.
 */
var DirectiveLocation = exports.DirectiveLocation = Object.freeze({
  // Request Definitions
  QUERY: 'QUERY',
  MUTATION: 'MUTATION',
  SUBSCRIPTION: 'SUBSCRIPTION',
  FIELD: 'FIELD',
  FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
  FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
  INLINE_FRAGMENT: 'INLINE_FRAGMENT',
  // Type System Definitions
  SCHEMA: 'SCHEMA',
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  FIELD_DEFINITION: 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  ENUM_VALUE: 'ENUM_VALUE',
  INPUT_OBJECT: 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
});

/**
 * The enum type representing the directive location values.
 */

/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visit = visit;
exports.visitInParallel = visitInParallel;
exports.visitWithTypeInfo = visitWithTypeInfo;
exports.getVisitFn = getVisitFn;


/**
 * A visitor is comprised of visit functions, which are called on each node
 * during the visitor's traversal.
 */


/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

var QueryDocumentKeys = exports.QueryDocumentKeys = {
  Name: [],

  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],

  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name',
  // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],

  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],

  Directive: ['name', 'arguments'],

  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],

  SchemaDefinition: ['directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],

  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],

  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields'],

  DirectiveDefinition: ['description', 'name', 'arguments', 'locations']
};

/**
 * A KeyMap describes each the traversable properties of each kind of node.
 */
var BREAK = exports.BREAK = {};

/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */
function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

  /* eslint-disable no-undef-init */
  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var k in node) {
            if (node.hasOwnProperty(k)) {
              clone[k] = node[k];
            }
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === undefined) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error('Invalid AST Node: ' + JSON.stringify(node));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      stack = { inArray: inArray, index: index, keys: keys, edits: edits, prev: stack };
      inArray = Array.isArray(node);
      keys = inArray ? node : visitorKeys[node.kind] || [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}

function isNode(maybeNode) {
  return Boolean(maybeNode && typeof maybeNode.kind === 'string');
}

/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */
function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);

  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */false);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */true);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}

/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter: function enter(node) {
      typeInfo.enter(node);
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */false);
      if (fn) {
        var result = fn.apply(visitor, arguments);
        if (result !== undefined) {
          typeInfo.leave(node);
          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }
        return result;
      }
    },
    leave: function leave(node) {
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */true);
      var result = void 0;
      if (fn) {
        result = fn.apply(visitor, arguments);
      }
      typeInfo.leave(node);
      return result;
    }
  };
}

/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getDirectiveInfoFromField;
/* harmony export (immutable) */ __webpack_exports__["c"] = shouldInclude;
/* unused harmony export flattenSelections */
/* unused harmony export getDirectiveNames */
/* harmony export (immutable) */ __webpack_exports__["b"] = hasDirectives;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__storeUtils__ = __webpack_require__(170);

function getDirectiveInfoFromField(field, variables) {
    if (field.directives && field.directives.length) {
        var directiveObj_1 = {};
        field.directives.forEach(function (directive) {
            directiveObj_1[directive.name.value] = Object(__WEBPACK_IMPORTED_MODULE_0__storeUtils__["a" /* argumentsObjectFromField */])(directive, variables);
        });
        return directiveObj_1;
    }
    return null;
}
function shouldInclude(selection, variables) {
    if (variables === void 0) { variables = {}; }
    if (!selection.directives) {
        return true;
    }
    var res = true;
    selection.directives.forEach(function (directive) {
        // TODO should move this validation to GraphQL validation once that's implemented.
        if (directive.name.value !== 'skip' && directive.name.value !== 'include') {
            // Just don't worry about directives we don't understand
            return;
        }
        //evaluate the "if" argument and skip (i.e. return undefined) if it evaluates to true.
        var directiveArguments = directive.arguments || [];
        var directiveName = directive.name.value;
        if (directiveArguments.length !== 1) {
            throw new Error("Incorrect number of arguments for the @" + directiveName + " directive.");
        }
        var ifArgument = directiveArguments[0];
        if (!ifArgument.name || ifArgument.name.value !== 'if') {
            throw new Error("Invalid argument for the @" + directiveName + " directive.");
        }
        var ifValue = directiveArguments[0].value;
        var evaledValue = false;
        if (!ifValue || ifValue.kind !== 'BooleanValue') {
            // means it has to be a variable value if this is a valid @skip or @include directive
            if (ifValue.kind !== 'Variable') {
                throw new Error("Argument for the @" + directiveName + " directive must be a variable or a boolean value.");
            }
            else {
                evaledValue = variables[ifValue.name.value];
                if (evaledValue === undefined) {
                    throw new Error("Invalid variable referenced in @" + directiveName + " directive.");
                }
            }
        }
        else {
            evaledValue = ifValue.value;
        }
        if (directiveName === 'skip') {
            evaledValue = !evaledValue;
        }
        if (!evaledValue) {
            res = false;
        }
    });
    return res;
}
function flattenSelections(selection) {
    if (!selection.selectionSet ||
        !(selection.selectionSet.selections.length > 0))
        return [selection];
    return [selection].concat(selection.selectionSet.selections
        .map(function (selectionNode) {
        return [selectionNode].concat(flattenSelections(selectionNode));
    })
        .reduce(function (selections, selected) { return selections.concat(selected); }, []));
}
var added = new Map();
function getDirectiveNames(doc) {
    var cached = added.get(doc);
    if (cached)
        return cached;
    // operation => [names of directives];
    var directives = doc.definitions
        .filter(function (definition) {
        return definition.selectionSet && definition.selectionSet.selections;
    })
        .map(function (x) { return flattenSelections(x); })
        .reduce(function (selections, selected) { return selections.concat(selected); }, [])
        .filter(function (selection) {
        return selection.directives && selection.directives.length > 0;
    })
        .map(function (selection) { return selection.directives; })
        .reduce(function (directives, directive) { return directives.concat(directive); }, [])
        .map(function (directive) { return directive.name.value; });
    added.set(doc, directives);
    return directives;
}
function hasDirectives(names, doc) {
    return getDirectiveNames(doc).some(function (name) { return names.indexOf(name) > -1; });
}
//# sourceMappingURL=directives.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getFragmentQueryDocument;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * Returns a query document which adds a single query operation that only
 * spreads the target fragment inside of it.
 *
 * So for example a document of:
 *
 * ```graphql
 * fragment foo on Foo { a b c }
 * ```
 *
 * Turns into:
 *
 * ```graphql
 * { ...foo }
 *
 * fragment foo on Foo { a b c }
 * ```
 *
 * The target fragment will either be the only fragment in the document, or a
 * fragment specified by the provided `fragmentName`. If there is more then one
 * fragment, but a `fragmentName` was not defined then an error will be thrown.
 */
function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    // Build an array of all our fragment definitions that will be used for
    // validations. We also do some validations on the other definitions in the
    // document while building this list.
    var fragments = [];
    document.definitions.forEach(function (definition) {
        // Throw an error if we encounter an operation definition because we will
        // define our own operation definition later on.
        if (definition.kind === 'OperationDefinition') {
            throw new Error("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " +
                'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        }
        // Add our definition to the fragments array if it is a fragment
        // definition.
        if (definition.kind === 'FragmentDefinition') {
            fragments.push(definition);
        }
    });
    // If the user did not give us a fragment name then let us try to get a
    // name from a single fragment in the definition.
    if (typeof actualFragmentName === 'undefined') {
        if (fragments.length !== 1) {
            throw new Error("Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
        }
        actualFragmentName = fragments[0].name.value;
    }
    // Generate a query document with an operation that simply spreads the
    // fragment inside of it.
    var query = __assign({}, document, { definitions: [
            {
                kind: 'OperationDefinition',
                operation: 'query',
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'FragmentSpread',
                            name: {
                                kind: 'Name',
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ].concat(document.definitions) });
    return query;
}
//# sourceMappingURL=fragments.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export removeDirectivesFromDocument */
/* harmony export (immutable) */ __webpack_exports__["a"] = addTypenameToDocument;
/* harmony export (immutable) */ __webpack_exports__["b"] = removeConnectionDirectiveFromDocument;
/* unused harmony export getDirectivesFromDocument */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_cloneDeep__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getFromAST__ = __webpack_require__(267);


var TYPENAME_FIELD = {
    kind: 'Field',
    name: {
        kind: 'Name',
        value: '__typename',
    },
};
function isNotEmpty(op, fragments) {
    // keep selections that are still valid
    return (op.selectionSet.selections.filter(function (selectionSet) {
        // anything that doesn't match the compound filter is okay
        return !(selectionSet &&
            // look into fragments to verify they should stay
            selectionSet.kind === 'FragmentSpread' &&
            // see if the fragment in the map is valid (recursively)
            !isNotEmpty(fragments[selectionSet.name.value], fragments));
    }).length > 0);
}
function getDirectiveMatcher(directives) {
    return function directiveMatcher(directive) {
        return directives.some(function (dir) {
            if (dir.name && dir.name === directive.name.value)
                return true;
            if (dir.test && dir.test(directive))
                return true;
            return false;
        });
    };
}
function addTypenameToSelectionSet(selectionSet, isRoot) {
    if (isRoot === void 0) { isRoot = false; }
    if (selectionSet.selections) {
        if (!isRoot) {
            var alreadyHasThisField = selectionSet.selections.some(function (selection) {
                return (selection.kind === 'Field' &&
                    selection.name.value === '__typename');
            });
            if (!alreadyHasThisField) {
                selectionSet.selections.push(TYPENAME_FIELD);
            }
        }
        selectionSet.selections.forEach(function (selection) {
            // Must not add __typename if we're inside an introspection query
            if (selection.kind === 'Field') {
                if (selection.name.value.lastIndexOf('__', 0) !== 0 &&
                    selection.selectionSet) {
                    addTypenameToSelectionSet(selection.selectionSet);
                }
            }
            else if (selection.kind === 'InlineFragment') {
                if (selection.selectionSet) {
                    addTypenameToSelectionSet(selection.selectionSet);
                }
            }
        });
    }
}
function removeDirectivesFromSelectionSet(directives, selectionSet) {
    if (!selectionSet.selections)
        return selectionSet;
    // if any of the directives are set to remove this selectionSet, remove it
    var agressiveRemove = directives.some(function (dir) { return dir.remove; });
    selectionSet.selections = selectionSet.selections
        .map(function (selection) {
        if (selection.kind !== 'Field' ||
            !selection ||
            !selection.directives)
            return selection;
        var directiveMatcher = getDirectiveMatcher(directives);
        var remove;
        selection.directives = selection.directives.filter(function (directive) {
            var shouldKeep = !directiveMatcher(directive);
            if (!remove && !shouldKeep && agressiveRemove)
                remove = true;
            return shouldKeep;
        });
        return remove ? null : selection;
    })
        .filter(function (x) { return !!x; });
    selectionSet.selections.forEach(function (selection) {
        if ((selection.kind === 'Field' || selection.kind === 'InlineFragment') &&
            selection.selectionSet) {
            removeDirectivesFromSelectionSet(directives, selection.selectionSet);
        }
    });
    return selectionSet;
}
function removeDirectivesFromDocument(directives, doc) {
    var docClone = Object(__WEBPACK_IMPORTED_MODULE_0__util_cloneDeep__["a" /* cloneDeep */])(doc);
    docClone.definitions.forEach(function (definition) {
        removeDirectivesFromSelectionSet(directives, definition.selectionSet);
    });
    var operation = Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["h" /* getOperationDefinitionOrDie */])(docClone);
    var fragments = Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["b" /* createFragmentMap */])(Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["d" /* getFragmentDefinitions */])(docClone));
    return isNotEmpty(operation, fragments) ? docClone : null;
}
var added = new Map();
function addTypenameToDocument(doc) {
    Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["a" /* checkDocument */])(doc);
    var cached = added.get(doc);
    if (cached)
        return cached;
    var docClone = Object(__WEBPACK_IMPORTED_MODULE_0__util_cloneDeep__["a" /* cloneDeep */])(doc);
    docClone.definitions.forEach(function (definition) {
        var isRoot = definition.kind === 'OperationDefinition';
        addTypenameToSelectionSet(definition.selectionSet, isRoot);
    });
    added.set(doc, docClone);
    return docClone;
}
var connectionRemoveConfig = {
    test: function (directive) {
        var willRemove = directive.name.value === 'connection';
        if (willRemove) {
            if (!directive.arguments ||
                !directive.arguments.some(function (arg) { return arg.name.value === 'key'; })) {
                console.warn('Removing an @connection directive even though it does not have a key. ' +
                    'You may want to use the key parameter to specify a store key.');
            }
        }
        return willRemove;
    },
};
var removed = new Map();
function removeConnectionDirectiveFromDocument(doc) {
    Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["a" /* checkDocument */])(doc);
    var cached = removed.get(doc);
    if (cached)
        return cached;
    var docClone = removeDirectivesFromDocument([connectionRemoveConfig], doc);
    removed.set(doc, docClone);
    return docClone;
}
function hasDirectivesInSelectionSet(directives, selectionSet, nestedCheck) {
    if (nestedCheck === void 0) { nestedCheck = true; }
    if (!(selectionSet && selectionSet.selections)) {
        return false;
    }
    var matchedSelections = selectionSet.selections.filter(function (selection) {
        return hasDirectivesInSelection(directives, selection, nestedCheck);
    });
    return matchedSelections.length > 0;
}
function hasDirectivesInSelection(directives, selection, nestedCheck) {
    if (nestedCheck === void 0) { nestedCheck = true; }
    if (selection.kind !== 'Field' || !selection) {
        return true;
    }
    if (!selection.directives) {
        return false;
    }
    var directiveMatcher = getDirectiveMatcher(directives);
    var matchedDirectives = selection.directives.filter(directiveMatcher);
    return (matchedDirectives.length > 0 ||
        (nestedCheck &&
            hasDirectivesInSelectionSet(directives, selection.selectionSet, nestedCheck)));
}
function getDirectivesFromSelectionSet(directives, selectionSet) {
    selectionSet.selections = selectionSet.selections
        .filter(function (selection) {
        return hasDirectivesInSelection(directives, selection, true);
    })
        .map(function (selection) {
        if (hasDirectivesInSelection(directives, selection, false)) {
            return selection;
        }
        if ((selection.kind === 'Field' || selection.kind === 'InlineFragment') &&
            selection.selectionSet) {
            selection.selectionSet = getDirectivesFromSelectionSet(directives, selection.selectionSet);
        }
        return selection;
    });
    return selectionSet;
}
function getDirectivesFromDocument(directives, doc, includeAllFragments) {
    if (includeAllFragments === void 0) { includeAllFragments = false; }
    Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["a" /* checkDocument */])(doc);
    var docClone = Object(__WEBPACK_IMPORTED_MODULE_0__util_cloneDeep__["a" /* cloneDeep */])(doc);
    docClone.definitions = docClone.definitions.map(function (definition) {
        if ((definition.kind === 'OperationDefinition' ||
            (definition.kind === 'FragmentDefinition' && !includeAllFragments)) &&
            definition.selectionSet) {
            definition.selectionSet = getDirectivesFromSelectionSet(directives, definition.selectionSet);
        }
        return definition;
    });
    var operation = Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["h" /* getOperationDefinitionOrDie */])(docClone);
    var fragments = Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["b" /* createFragmentMap */])(Object(__WEBPACK_IMPORTED_MODULE_1__getFromAST__["d" /* getFragmentDefinitions */])(docClone));
    return isNotEmpty(operation, fragments) ? docClone : null;
}
//# sourceMappingURL=transform.js.map

/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = tryFunctionOrLogError;
/* harmony export (immutable) */ __webpack_exports__["a"] = graphQLResultHasError;
function tryFunctionOrLogError(f) {
    try {
        return f();
    }
    catch (e) {
        if (console.error) {
            console.error(e);
        }
    }
}
function graphQLResultHasError(result) {
    return result.errors && result.errors.length;
}
//# sourceMappingURL=errorHandling.js.map

/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isEqual;
/**
 * Performs a deep equality check on two JavaScript values.
 */
function isEqual(a, b) {
    // If the two values are strictly equal, we are good.
    if (a === b) {
        return true;
    }
    // Dates are equivalent if their time values are equal.
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    // If a and b are both objects, we will compare their properties. This will compare arrays as
    // well.
    if (a != null &&
        typeof a === 'object' &&
        b != null &&
        typeof b === 'object') {
        // Compare all of the keys in `a`. If one of the keys has a different value, or that key does
        // not exist in `b` return false immediately.
        for (var key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
                if (!Object.prototype.hasOwnProperty.call(b, key)) {
                    return false;
                }
                if (!isEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
        // Look through all the keys in `b`. If `b` has a key that `a` does not, return false.
        for (var key in b) {
            if (!Object.prototype.hasOwnProperty.call(a, key)) {
                return false;
            }
        }
        // If we made it this far the objects are equal!
        return true;
    }
    // Otherwise the values are not equal.
    return false;
}
//# sourceMappingURL=isEqual.js.map

/***/ }),

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = maybeDeepFreeze;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(171);

// taken straight from https://github.com/substack/deep-freeze to avoid import hassles with rollup
function deepFreeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o.hasOwnProperty(prop) &&
            o[prop] !== null &&
            (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
            !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });
    return o;
}
function maybeDeepFreeze(obj) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__environment__["a" /* isDevelopment */])() || Object(__WEBPACK_IMPORTED_MODULE_0__environment__["c" /* isTest */])()) {
        // Polyfilled Symbols potentially cause infinite / very deep recursion while deep freezing
        // which is known to crash IE11 (https://github.com/apollographql/apollo-client/issues/3043).
        var symbolIsPolyfilled = typeof Symbol === 'function' && typeof Symbol('') === 'string';
        if (!symbolIsPolyfilled) {
            return deepFreeze(obj);
        }
    }
    return obj;
}
//# sourceMappingURL=maybeDeepFreeze.js.map

/***/ }),

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warnOnceInDevelopment;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(171);

var haveWarned = Object.create({});
/**
 * Print a warning only once in development.
 * In production no warnings are printed.
 * In test all warnings are printed.
 *
 * @param msg The warning message
 * @param type warn or error (will call console.warn or console.error)
 */
function warnOnceInDevelopment(msg, type) {
    if (type === void 0) { type = 'warn'; }
    if (Object(__WEBPACK_IMPORTED_MODULE_0__environment__["b" /* isProduction */])()) {
        return;
    }
    if (!haveWarned[msg]) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__environment__["c" /* isTest */])()) {
            haveWarned[msg] = true;
        }
        switch (type) {
            case 'error':
                console.error(msg);
                break;
            default:
                console.warn(msg);
        }
    }
}
//# sourceMappingURL=warnOnce.js.map

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export empty */
/* unused harmony export from */
/* unused harmony export split */
/* unused harmony export concat */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApolloLink; });
/* harmony export (immutable) */ __webpack_exports__["b"] = execute;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linkUtils__ = __webpack_require__(272);


var passthrough = function (op, forward) { return (forward ? forward(op) : __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of()); };
var toLink = function (handler) {
    return typeof handler === 'function' ? new ApolloLink(handler) : handler;
};
var empty = function () {
    return new ApolloLink(function (op, forward) { return __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of(); });
};
var from = function (links) {
    if (links.length === 0)
        return empty();
    return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
};
var split = function (test, left, right) {
    if (right === void 0) { right = new ApolloLink(passthrough); }
    var leftLink = toLink(left);
    var rightLink = toLink(right);
    if (Object(__WEBPACK_IMPORTED_MODULE_1__linkUtils__["d" /* isTerminating */])(leftLink) && Object(__WEBPACK_IMPORTED_MODULE_1__linkUtils__["d" /* isTerminating */])(rightLink)) {
        return new ApolloLink(function (operation) {
            return test(operation)
                ? leftLink.request(operation) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of()
                : rightLink.request(operation) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of();
        });
    }
    else {
        return new ApolloLink(function (operation, forward) {
            return test(operation)
                ? leftLink.request(operation, forward) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of()
                : rightLink.request(operation, forward) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of();
        });
    }
};
// join two Links together
var concat = function (first, second) {
    var firstLink = toLink(first);
    if (Object(__WEBPACK_IMPORTED_MODULE_1__linkUtils__["d" /* isTerminating */])(firstLink)) {
        console.warn(new __WEBPACK_IMPORTED_MODULE_1__linkUtils__["a" /* LinkError */]("You are calling concat on a terminating link, which will have no effect", firstLink));
        return firstLink;
    }
    var nextLink = toLink(second);
    if (Object(__WEBPACK_IMPORTED_MODULE_1__linkUtils__["d" /* isTerminating */])(nextLink)) {
        return new ApolloLink(function (operation) {
            return firstLink.request(operation, function (op) { return nextLink.request(op) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of(); }) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of();
        });
    }
    else {
        return new ApolloLink(function (operation, forward) {
            return (firstLink.request(operation, function (op) {
                return nextLink.request(op, forward) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of();
            }) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of());
        });
    }
};
var ApolloLink = /** @class */ (function () {
    function ApolloLink(request) {
        if (request)
            this.request = request;
    }
    ApolloLink.prototype.split = function (test, left, right) {
        if (right === void 0) { right = new ApolloLink(passthrough); }
        return this.concat(split(test, left, right));
    };
    ApolloLink.prototype.concat = function (next) {
        return concat(this, next);
    };
    ApolloLink.prototype.request = function (operation, forward) {
        throw new Error('request is not implemented');
    };
    ApolloLink.empty = empty;
    ApolloLink.from = from;
    ApolloLink.split = split;
    ApolloLink.execute = execute;
    return ApolloLink;
}());

function execute(link, operation) {
    return (link.request(Object(__WEBPACK_IMPORTED_MODULE_1__linkUtils__["b" /* createOperation */])(operation.context, Object(__WEBPACK_IMPORTED_MODULE_1__linkUtils__["e" /* transformOperation */])(Object(__WEBPACK_IMPORTED_MODULE_1__linkUtils__["f" /* validateOperation */])(operation)))) || __WEBPACK_IMPORTED_MODULE_0_zen_observable_ts__["a" /* default */].of());
}
//# sourceMappingURL=link.js.map

/***/ }),

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(719).Observable;


/***/ }),

/***/ 719:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// === Symbol Support ===

var hasSymbols = function () {
  return typeof Symbol === 'function';
};
var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};
var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

// === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];

  if (value == null) return undefined;

  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');

  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;
  if (ctor !== undefined) {
    ctor = ctor[getSymbol('species')];
    if (ctor === null) {
      ctor = undefined;
    }
  }
  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;

  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');
      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;
  if (!queue) {
    return;
  }
  subscription._queue = undefined;
  subscription._state = 'ready';
  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';

  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);
    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;
      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;
      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({ type: type, value: value });
    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{ type: type, value: value }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription = function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription);

    // ASSERT: observer is an object
    // ASSERT: subscriber is callable

    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';

    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: 'unsubscribe',
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: 'closed',
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver = function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: 'next',
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: 'error',
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: 'complete',
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: 'closed',
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable = exports.Observable = function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');

    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');

    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: 'subscribe',
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }
      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: 'forEach',
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },

          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: 'map',
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }
            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'filter',
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }
            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'reduce',
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;

      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));

            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'concat',
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);

      return new C(function (observer) {
        var subscription = void 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (sources.length === 0) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources.shift()));
              }
            }
          });
        }

        startNext(_this5);

        return function () {
          if (subscription) {
            subscription = undefined;
            subscription.unsubscribe();
          }
        };
      });
    }
  }, {
    key: 'flatMap',
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });

            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: getSymbol('observable'),
    value: function () {
      return this;
    }
  }], [{
    key: 'from',
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;

      if (x == null) throw new TypeError(x + ' is not an object');

      var method = getMethod(x, getSymbol('observable'));
      if (method) {
        var observable = method.call(x);

        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');

        if (isObservable(observable) && observable.constructor === C) return observable;

        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, getSymbol('iterator'));
        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var item = _step.value;

                  observer.next(item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;
            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }
            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: 'of',
    value: function of() {
      for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;

      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;
          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }
          observer.complete();
        });
      });
    }
  }, {
    key: getSymbol('species'),
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: getSymbol('observable'),
      hostReportError: hostReportError
    },
    configurabe: true
  });
}

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ponyfill_js__ = __webpack_require__(722);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = Object(__WEBPACK_IMPORTED_MODULE_0__ponyfill_js__["a" /* default */])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(56), __webpack_require__(721)(module)))

/***/ }),

/***/ 721:
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_link__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_utilities__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_QueryManager__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_store__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__version__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__version___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__version__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var hasSuggestedDevtools = false;
var supportedDirectives = new __WEBPACK_IMPORTED_MODULE_0_apollo_link__["a" /* ApolloLink */](function (operation, forward) {
    operation.query = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["y" /* removeConnectionDirectiveFromDocument */])(operation.query);
    return forward(operation);
});
/**
 * This is the primary Apollo Client class. It is used to send GraphQL documents (i.e. queries
 * and mutations) to a GraphQL spec-compliant server over a {@link NetworkInterface} instance,
 * receive results from the server and cache the results in a store. It also delivers updates
 * to GraphQL queries through {@link Observable} instances.
 */
var ApolloClient = (function () {
    /**
     * Constructs an instance of {@link ApolloClient}.
     *
     * @param link The {@link ApolloLink} over which GraphQL documents will be resolved into a response.
     *
     * @param cache The initial cache to use in the data store.
     *
     * @param ssrMode Determines whether this is being run in Server Side Rendering (SSR) mode.
     *
     * @param ssrForceFetchDelay Determines the time interval before we force fetch queries for a
     * server side render.
     *
     * @param queryDeduplication If set to false, a query will still be sent to the server even if a query
     * with identical parameters (query, variables, operationName) is already in flight.
     *
     */
    function ApolloClient(options) {
        var _this = this;
        this.defaultOptions = {};
        this.resetStoreCallbacks = [];
        var link = options.link, cache = options.cache, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, connectToDevTools = options.connectToDevTools, _c = options.queryDeduplication, queryDeduplication = _c === void 0 ? true : _c, defaultOptions = options.defaultOptions;
        if (!link || !cache) {
            throw new Error("\n        In order to initialize Apollo Client, you must specify link & cache properties on the config object.\n        This is part of the required upgrade when migrating from Apollo Client 1.0 to Apollo Client 2.0.\n        For more information, please visit:\n          https://www.apollographql.com/docs/react/basics/setup.html\n        to help you get started.\n      ");
        }
        // remove apollo-client supported directives
        this.link = supportedDirectives.concat(link);
        this.cache = cache;
        this.store = new __WEBPACK_IMPORTED_MODULE_3__data_store__["a" /* DataStore */](cache);
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.queryDeduplication = queryDeduplication;
        this.ssrMode = ssrMode;
        this.defaultOptions = defaultOptions || {};
        if (ssrForceFetchDelay) {
            setTimeout(function () { return (_this.disableNetworkFetches = false); }, ssrForceFetchDelay);
        }
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.resetStore = this.resetStore.bind(this);
        this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
        // Attach the client instance to window to let us be found by chrome devtools, but only in
        // development mode
        var defaultConnectToDevTools = !Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["v" /* isProduction */])() &&
            typeof window !== 'undefined' &&
            !window.__APOLLO_CLIENT__;
        if (typeof connectToDevTools === 'undefined'
            ? defaultConnectToDevTools
            : connectToDevTools && typeof window !== 'undefined') {
            window.__APOLLO_CLIENT__ = this;
        }
        /**
         * Suggest installing the devtools for developers who don't have them
         */
        if (!hasSuggestedDevtools && !Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["v" /* isProduction */])()) {
            hasSuggestedDevtools = true;
            if (typeof window !== 'undefined' &&
                window.document &&
                window.top === window.self) {
                // First check if devtools is not installed
                if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                    // Only for Chrome
                    if (window.navigator && window.navigator.userAgent.indexOf('Chrome') > -1) {
                        // tslint:disable-next-line
                        console.debug('Download the Apollo DevTools ' +
                            'for a better development experience: ' +
                            'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
                    }
                }
            }
        }
        this.version = __WEBPACK_IMPORTED_MODULE_4__version__["version"];
    }
    /**
     * This watches the results of the query according to the options specified and
     * returns an {@link ObservableQuery}. We can subscribe to this {@link ObservableQuery} and
     * receive updated results through a GraphQL observer.
     * <p /><p />
     * Note that this method is not an implementation of GraphQL subscriptions. Rather,
     * it uses Apollo's store in order to reactively deliver updates to your query results.
     * <p /><p />
     * For example, suppose you call watchQuery on a GraphQL query that fetches an person's
     * first name and last name and this person has a particular object identifer, provided by
     * dataIdFromObject. Later, a different query fetches that same person's
     * first and last name and his/her first name has now changed. Then, any observers associated
     * with the results of the first query will be updated with a new result object.
     * <p /><p />
     * See [here](https://medium.com/apollo-stack/the-concepts-of-graphql-bc68bd819be3#.3mb0cbcmc) for
     * a description of store reactivity.
     *
     */
    ApolloClient.prototype.watchQuery = function (options) {
        this.initQueryManager();
        if (this.defaultOptions.watchQuery) {
            options = __assign({}, this.defaultOptions.watchQuery, options);
        }
        // XXX Overwriting options is probably not the best way to do this long term...
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = __assign({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.watchQuery(options);
    };
    /**
     * This resolves a single query according to the options specified and returns a
     * {@link Promise} which is either resolved with the resulting data or rejected
     * with an error.
     *
     * @param options An object of type {@link WatchQueryOptions} that allows us to describe
     * how this query should be treated e.g. whether it is a polling query, whether it should hit the
     * server at all or just resolve from the cache, etc.
     */
    ApolloClient.prototype.query = function (options) {
        this.initQueryManager();
        if (this.defaultOptions.query) {
            options = __assign({}, this.defaultOptions.query, options);
        }
        if (options.fetchPolicy === 'cache-and-network') {
            throw new Error('cache-and-network fetchPolicy can only be used with watchQuery');
        }
        // XXX Overwriting options is probably not the best way to do this long term...
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = __assign({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.query(options);
    };
    /**
     * This resolves a single mutation according to the options specified and returns a
     * {@link Promise} which is either resolved with the resulting data or rejected with an
     * error.
     *
     * It takes options as an object with the following keys and values:
     */
    ApolloClient.prototype.mutate = function (options) {
        this.initQueryManager();
        if (this.defaultOptions.mutate) {
            options = __assign({}, this.defaultOptions.mutate, options);
        }
        return this.queryManager.mutate(options);
    };
    /**
     * This subscribes to a graphql subscription according to the options specified and returns an
     * {@link Observable} which either emits received data or an error.
     */
    ApolloClient.prototype.subscribe = function (options) {
        this.initQueryManager();
        return this.queryManager.startGraphQLSubscription(options);
    };
    /**
     * Tries to read some data from the store in the shape of the provided
     * GraphQL query without making a network request. This method will start at
     * the root query. To start at a specific id returned by `dataIdFromObject`
     * use `readFragment`.
     */
    ApolloClient.prototype.readQuery = function (options) {
        return this.initProxy().readQuery(options);
    };
    /**
     * Tries to read some data from the store in the shape of the provided
     * GraphQL fragment without making a network request. This method will read a
     * GraphQL fragment from any arbitrary id that is currently cached, unlike
     * `readQuery` which will only read from the root query.
     *
     * You must pass in a GraphQL document with a single fragment or a document
     * with multiple fragments that represent what you are reading. If you pass
     * in a document with multiple fragments then you must also specify a
     * `fragmentName`.
     */
    ApolloClient.prototype.readFragment = function (options) {
        return this.initProxy().readFragment(options);
    };
    /**
     * Writes some data in the shape of the provided GraphQL query directly to
     * the store. This method will start at the root query. To start at a a
     * specific id returned by `dataIdFromObject` then use `writeFragment`.
     */
    ApolloClient.prototype.writeQuery = function (options) {
        var result = this.initProxy().writeQuery(options);
        this.queryManager.broadcastQueries();
        return result;
    };
    /**
     * Writes some data in the shape of the provided GraphQL fragment directly to
     * the store. This method will write to a GraphQL fragment from any arbitrary
     * id that is currently cached, unlike `writeQuery` which will only write
     * from the root query.
     *
     * You must pass in a GraphQL document with a single fragment or a document
     * with multiple fragments that represent what you are writing. If you pass
     * in a document with multiple fragments then you must also specify a
     * `fragmentName`.
     */
    ApolloClient.prototype.writeFragment = function (options) {
        var result = this.initProxy().writeFragment(options);
        this.queryManager.broadcastQueries();
        return result;
    };
    /**
     * Sugar for writeQuery & writeFragment
     * This method will construct a query from the data object passed in.
     * If no id is supplied, writeData will write the data to the root.
     * If an id is supplied, writeData will write a fragment to the object
     * specified by the id in the store.
     *
     * Since you aren't passing in a query to check the shape of the data,
     * you must pass in an object that conforms to the shape of valid GraphQL data.
     */
    ApolloClient.prototype.writeData = function (options) {
        var result = this.initProxy().writeData(options);
        this.queryManager.broadcastQueries();
        return result;
    };
    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
        this.devToolsHookCb = cb;
    };
    ApolloClient.prototype.__requestRaw = function (payload) {
        return Object(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["c" /* execute */])(this.link, payload);
    };
    /**
     * This initializes the query manager that tracks queries and the cache
     */
    ApolloClient.prototype.initQueryManager = function () {
        var _this = this;
        if (this.queryManager)
            return;
        this.queryManager = new __WEBPACK_IMPORTED_MODULE_2__core_QueryManager__["a" /* QueryManager */]({
            link: this.link,
            store: this.store,
            queryDeduplication: this.queryDeduplication,
            ssrMode: this.ssrMode,
            onBroadcast: function () {
                if (_this.devToolsHookCb) {
                    _this.devToolsHookCb({
                        action: {},
                        state: {
                            queries: _this.queryManager.queryStore.getStore(),
                            mutations: _this.queryManager.mutationStore.getStore(),
                        },
                        dataWithOptimisticResults: _this.cache.extract(true),
                    });
                }
            },
        });
    };
    /**
     * Resets your entire store by clearing out your cache and then re-executing
     * all of your active queries. This makes it so that you may guarantee that
     * there is no data left in your store from a time before you called this
     * method.
     *
     * `resetStore()` is useful when your user just logged out. You’ve removed the
     * user session, and you now want to make sure that any references to data you
     * might have fetched while the user session was active is gone.
     *
     * It is important to remember that `resetStore()` *will* refetch any active
     * queries. This means that any components that might be mounted will execute
     * their queries again using your network interface. If you do not want to
     * re-execute any queries then you should make sure to stop watching any
     * active queries.
     */
    ApolloClient.prototype.resetStore = function () {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            return _this.queryManager
                ? _this.queryManager.clearStore()
                : Promise.resolve(null);
        })
            .then(function () { return Promise.all(_this.resetStoreCallbacks.map(function (fn) { return fn(); })); })
            .then(function () {
            return _this.queryManager
                ? _this.queryManager.reFetchObservableQueries()
                : Promise.resolve(null);
        });
    };
    /**
     * Allows callbacks to be registered that are executed with the store is reset.
     * onResetStore returns an unsubscribe function for removing your registered callbacks.
     */
    ApolloClient.prototype.onResetStore = function (cb) {
        var _this = this;
        this.resetStoreCallbacks.push(cb);
        return function () {
            _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) { return c !== cb; });
        };
    };
    /**
     * Refetches all of your active queries.
     *
     * `reFetchObservableQueries()` is useful if you want to bring the client back to proper state in case of a network outage
     *
     * It is important to remember that `reFetchObservableQueries()` *will* refetch any active
     * queries. This means that any components that might be mounted will execute
     * their queries again using your network interface. If you do not want to
     * re-execute any queries then you should make sure to stop watching any
     * active queries.
     * Takes optional parameter `includeStandby` which will include queries in standby-mode when refetching.
     */
    ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
        return this.queryManager
            ? this.queryManager.reFetchObservableQueries(includeStandby)
            : Promise.resolve(null);
    };
    /**
     * Exposes the cache's complete state, in a serializable format for later restoration.
     */
    ApolloClient.prototype.extract = function (optimistic) {
        return this.initProxy().extract(optimistic);
    };
    /**
     * Replaces existing state in the cache (if any) with the values expressed by
     * `serializedState`.
     *
     * Called when hydrating a cache (server side rendering, or offline storage),
     * and also (potentially) during hot reloads.
     */
    ApolloClient.prototype.restore = function (serializedState) {
        return this.initProxy().restore(serializedState);
    };
    /**
     * Initializes a data proxy for this client instance if one does not already
     * exist and returns either a previously initialized proxy instance or the
     * newly initialized instance.
     */
    ApolloClient.prototype.initProxy = function () {
        if (!this.proxy) {
            this.initQueryManager();
            this.proxy = this.cache;
        }
        return this.proxy;
    };
    return ApolloClient;
}());
/* harmony default export */ __webpack_exports__["a"] = (ApolloClient);
//# sourceMappingURL=ApolloClient.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_link__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_apollo_link_dedup__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_apollo_utilities__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scheduler_scheduler__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__errors_ApolloError__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_Observable__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_mutations__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_queries__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ObservableQuery__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__networkStatus__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__types__ = __webpack_require__(120);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};













var defaultQueryInfo = {
    listeners: [],
    invalidated: false,
    document: null,
    newData: null,
    lastRequestId: null,
    observableQuery: null,
    subscriptions: [],
};
var QueryManager = (function () {
    function QueryManager(_a) {
        var link = _a.link, _b = _a.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, store = _a.store, _c = _a.onBroadcast, onBroadcast = _c === void 0 ? function () { return undefined; } : _c, _d = _a.ssrMode, ssrMode = _d === void 0 ? false : _d;
        this.mutationStore = new __WEBPACK_IMPORTED_MODULE_7__data_mutations__["a" /* MutationStore */]();
        this.queryStore = new __WEBPACK_IMPORTED_MODULE_8__data_queries__["a" /* QueryStore */]();
        // let's not start at zero to avoid pain with bad checks
        this.idCounter = 1;
        // XXX merge with ObservableQuery but that needs to be expanded to support mutations and
        // subscriptions as well
        this.queries = new Map();
        // A map going from a requestId to a promise that has not yet been resolved. We use this to keep
        // track of queries that are inflight and reject them in case some
        // destabalizing action occurs (e.g. reset of the Apollo store).
        this.fetchQueryPromises = new Map();
        // A map going from the name of a query to an observer issued for it by watchQuery. This is
        // generally used to refetches for refetchQueries and to update mutation results through
        // updateQueries.
        this.queryIdsByName = {};
        this.link = link;
        this.deduplicator = __WEBPACK_IMPORTED_MODULE_0_apollo_link__["a" /* ApolloLink */].from([new __WEBPACK_IMPORTED_MODULE_2_apollo_link_dedup__["a" /* DedupLink */](), link]);
        this.queryDeduplication = queryDeduplication;
        this.dataStore = store;
        this.onBroadcast = onBroadcast;
        this.scheduler = new __WEBPACK_IMPORTED_MODULE_4__scheduler_scheduler__["a" /* QueryScheduler */]({ queryManager: this, ssrMode: ssrMode });
    }
    QueryManager.prototype.mutate = function (_a) {
        var _this = this;
        var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueriesByName = _a.updateQueries, _b = _a.refetchQueries, refetchQueries = _b === void 0 ? [] : _b, updateWithProxyFn = _a.update, _c = _a.errorPolicy, errorPolicy = _c === void 0 ? 'none' : _c, fetchPolicy = _a.fetchPolicy, _d = _a.context, context = _d === void 0 ? {} : _d;
        if (!mutation) {
            throw new Error('mutation option is required. You must specify your GraphQL document in the mutation option.');
        }
        if (fetchPolicy && fetchPolicy !== 'no-cache') {
            throw new Error("fetchPolicy for mutations currently only supports the 'no-cache' policy");
        }
        var mutationId = this.generateQueryId();
        var cache = this.dataStore.getCache();
        (mutation = cache.transformDocument(mutation)),
            (variables = Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["c" /* assign */])({}, Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["e" /* getDefaultValues */])(Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["j" /* getMutationDefinition */])(mutation)), variables));
        var mutationString = Object(__WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__["print"])(mutation);
        this.setQuery(mutationId, function () { return ({ document: mutation }); });
        // Create a map of update queries by id to the query instead of by name.
        var generateUpdateQueriesInfo = function () {
            var ret = {};
            if (updateQueriesByName) {
                Object.keys(updateQueriesByName).forEach(function (queryName) {
                    return (_this.queryIdsByName[queryName] || []).forEach(function (queryId) {
                        ret[queryId] = {
                            updater: updateQueriesByName[queryName],
                            query: _this.queryStore.get(queryId),
                        };
                    });
                });
            }
            return ret;
        };
        this.mutationStore.initMutation(mutationId, mutationString, variables);
        this.dataStore.markMutationInit({
            mutationId: mutationId,
            document: mutation,
            variables: variables || {},
            updateQueries: generateUpdateQueriesInfo(),
            update: updateWithProxyFn,
            optimisticResponse: optimisticResponse,
        });
        this.broadcastQueries();
        return new Promise(function (resolve, reject) {
            var storeResult;
            var error;
            var operation = _this.buildOperationForLink(mutation, variables, __assign({}, context, { optimisticResponse: optimisticResponse }));
            Object(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["c" /* execute */])(_this.link, operation).subscribe({
                next: function (result) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["o" /* graphQLResultHasError */])(result) && errorPolicy === 'none') {
                        error = new __WEBPACK_IMPORTED_MODULE_5__errors_ApolloError__["a" /* ApolloError */]({
                            graphQLErrors: result.errors,
                        });
                        return;
                    }
                    _this.mutationStore.markMutationResult(mutationId);
                    if (fetchPolicy !== 'no-cache') {
                        _this.dataStore.markMutationResult({
                            mutationId: mutationId,
                            result: result,
                            document: mutation,
                            variables: variables || {},
                            updateQueries: generateUpdateQueriesInfo(),
                            update: updateWithProxyFn,
                        });
                    }
                    storeResult = result;
                },
                error: function (err) {
                    _this.mutationStore.markMutationError(mutationId, err);
                    _this.dataStore.markMutationComplete({
                        mutationId: mutationId,
                        optimisticResponse: optimisticResponse,
                    });
                    _this.broadcastQueries();
                    _this.setQuery(mutationId, function () { return ({ document: undefined }); });
                    reject(new __WEBPACK_IMPORTED_MODULE_5__errors_ApolloError__["a" /* ApolloError */]({
                        networkError: err,
                    }));
                },
                complete: function () {
                    if (error) {
                        _this.mutationStore.markMutationError(mutationId, error);
                    }
                    _this.dataStore.markMutationComplete({
                        mutationId: mutationId,
                        optimisticResponse: optimisticResponse,
                    });
                    _this.broadcastQueries();
                    if (error) {
                        reject(error);
                        return;
                    }
                    // allow for conditional refetches
                    // XXX do we want to make this the only API one day?
                    if (typeof refetchQueries === 'function')
                        refetchQueries = refetchQueries(storeResult);
                    refetchQueries.forEach(function (refetchQuery) {
                        if (typeof refetchQuery === 'string') {
                            _this.refetchQueryByName(refetchQuery);
                            return;
                        }
                        _this.query({
                            query: refetchQuery.query,
                            variables: refetchQuery.variables,
                            fetchPolicy: 'network-only',
                        });
                    });
                    _this.setQuery(mutationId, function () { return ({ document: undefined }); });
                    if (errorPolicy === 'ignore' &&
                        storeResult &&
                        Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["o" /* graphQLResultHasError */])(storeResult)) {
                        delete storeResult.errors;
                    }
                    resolve(storeResult);
                },
            });
        });
    };
    QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, 
        // This allows us to track if this is a query spawned by a `fetchMore`
        // call for another query. We need this data to compute the `fetchMore`
        // network status for the query this is fetching for.
        fetchMoreForQueryId) {
        var _this = this;
        var _a = options.variables, variables = _a === void 0 ? {} : _a, _b = options.metadata, metadata = _b === void 0 ? null : _b, _c = options.fetchPolicy, fetchPolicy = _c === void 0 ? 'cache-first' : _c;
        var cache = this.dataStore.getCache();
        var query = cache.transformDocument(options.query);
        var storeResult;
        var needToFetch = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
        // If this is not a force fetch, we want to diff the query against the
        // store before we fetch it from the network interface.
        // TODO we hit the cache even if the policy is network-first. This could be unnecessary if the network is up.
        if (fetchType !== __WEBPACK_IMPORTED_MODULE_11__types__["a" /* FetchType */].refetch &&
            fetchPolicy !== 'network-only' &&
            fetchPolicy !== 'no-cache') {
            var _d = this.dataStore.getCache().diff({
                query: query,
                variables: variables,
                returnPartialData: true,
                optimistic: false,
            }), complete = _d.complete, result = _d.result;
            // If we're in here, only fetch if we have missing fields
            needToFetch = !complete || fetchPolicy === 'cache-and-network';
            storeResult = result;
        }
        var shouldFetch = needToFetch && fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby';
        // we need to check to see if this is an operation that uses the @live directive
        if (Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["p" /* hasDirectives */])(['live'], query))
            shouldFetch = true;
        var requestId = this.generateRequestId();
        // set up a watcher to listen to cache updates
        var cancel = this.updateQueryWatch(queryId, query, options);
        // Initialize query in store with unique requestId
        this.setQuery(queryId, function () { return ({
            document: query,
            lastRequestId: requestId,
            invalidated: true,
            cancel: cancel,
        }); });
        this.invalidate(true, fetchMoreForQueryId);
        this.queryStore.initQuery({
            queryId: queryId,
            document: query,
            storePreviousVariables: shouldFetch,
            variables: variables,
            isPoll: fetchType === __WEBPACK_IMPORTED_MODULE_11__types__["a" /* FetchType */].poll,
            isRefetch: fetchType === __WEBPACK_IMPORTED_MODULE_11__types__["a" /* FetchType */].refetch,
            metadata: metadata,
            fetchMoreForQueryId: fetchMoreForQueryId,
        });
        this.broadcastQueries();
        // If there is no part of the query we need to fetch from the server (or,
        // fetchPolicy is cache-only), we just write the store result as the final result.
        var shouldDispatchClientResult = !shouldFetch || fetchPolicy === 'cache-and-network';
        if (shouldDispatchClientResult) {
            this.queryStore.markQueryResultClient(queryId, !shouldFetch);
            this.invalidate(true, queryId, fetchMoreForQueryId);
            this.broadcastQueries();
        }
        if (shouldFetch) {
            var networkResult = this.fetchRequest({
                requestId: requestId,
                queryId: queryId,
                document: query,
                options: options,
                fetchMoreForQueryId: fetchMoreForQueryId,
            }).catch(function (error) {
                // This is for the benefit of `refetch` promises, which currently don't get their errors
                // through the store like watchQuery observers do
                if (Object(__WEBPACK_IMPORTED_MODULE_5__errors_ApolloError__["b" /* isApolloError */])(error)) {
                    throw error;
                }
                else {
                    var lastRequestId = _this.getQuery(queryId).lastRequestId;
                    if (requestId >= (lastRequestId || 1)) {
                        _this.queryStore.markQueryError(queryId, error, fetchMoreForQueryId);
                        _this.invalidate(true, queryId, fetchMoreForQueryId);
                        _this.broadcastQueries();
                    }
                    _this.removeFetchQueryPromise(requestId);
                    throw new __WEBPACK_IMPORTED_MODULE_5__errors_ApolloError__["a" /* ApolloError */]({ networkError: error });
                }
            });
            // we don't return the promise for cache-and-network since it is already
            // returned below from the cache
            if (fetchPolicy !== 'cache-and-network') {
                return networkResult;
            }
            else {
                // however we need to catch the error so it isn't unhandled in case of
                // network error
                networkResult.catch(function () { });
            }
        }
        // If we have no query to send to the server, we should return the result
        // found within the store.
        return Promise.resolve({ data: storeResult });
    };
    // Returns a query listener that will update the given observer based on the
    // results (or lack thereof) for a particular query.
    QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
        var _this = this;
        var previouslyHadError = false;
        return function (queryStoreValue, newData) {
            // we're going to take a look at the data, so the query is no longer invalidated
            _this.invalidate(false, queryId);
            // The query store value can be undefined in the event of a store
            // reset.
            if (!queryStoreValue)
                return;
            var observableQuery = _this.getQuery(queryId).observableQuery;
            var fetchPolicy = observableQuery
                ? observableQuery.options.fetchPolicy
                : options.fetchPolicy;
            // don't watch the store for queries on standby
            if (fetchPolicy === 'standby')
                return;
            var errorPolicy = observableQuery
                ? observableQuery.options.errorPolicy
                : options.errorPolicy;
            var lastResult = observableQuery
                ? observableQuery.getLastResult()
                : null;
            var lastError = observableQuery ? observableQuery.getLastError() : null;
            var shouldNotifyIfLoading = (!newData && queryStoreValue.previousVariables != null) ||
                fetchPolicy === 'cache-only' ||
                fetchPolicy === 'cache-and-network';
            // if this caused by a cache broadcast but the query is still in flight
            // don't notify the observer
            // if (
            //   isCacheBroadcast &&
            //   isNetworkRequestInFlight(queryStoreValue.networkStatus)
            // ) {
            //   shouldNotifyIfLoading = false;
            // }
            var networkStatusChanged = Boolean(lastResult &&
                queryStoreValue.networkStatus !== lastResult.networkStatus);
            var errorStatusChanged = errorPolicy &&
                (lastError && lastError.graphQLErrors) !==
                    queryStoreValue.graphQLErrors &&
                errorPolicy !== 'none';
            if (!Object(__WEBPACK_IMPORTED_MODULE_10__networkStatus__["b" /* isNetworkRequestInFlight */])(queryStoreValue.networkStatus) ||
                (networkStatusChanged && options.notifyOnNetworkStatusChange) ||
                shouldNotifyIfLoading) {
                // If we have either a GraphQL error or a network error, we create
                // an error and tell the observer about it.
                if (((!errorPolicy || errorPolicy === 'none') &&
                    queryStoreValue.graphQLErrors &&
                    queryStoreValue.graphQLErrors.length > 0) ||
                    queryStoreValue.networkError) {
                    var apolloError_1 = new __WEBPACK_IMPORTED_MODULE_5__errors_ApolloError__["a" /* ApolloError */]({
                        graphQLErrors: queryStoreValue.graphQLErrors,
                        networkError: queryStoreValue.networkError,
                    });
                    previouslyHadError = true;
                    if (observer.error) {
                        try {
                            observer.error(apolloError_1);
                        }
                        catch (e) {
                            // Throw error outside this control flow to avoid breaking Apollo's state
                            setTimeout(function () {
                                throw e;
                            }, 0);
                        }
                    }
                    else {
                        // Throw error outside this control flow to avoid breaking Apollo's state
                        setTimeout(function () {
                            throw apolloError_1;
                        }, 0);
                        if (!Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["v" /* isProduction */])()) {
                            /* tslint:disable-next-line */
                            console.info('An unhandled error was thrown because no error handler is registered ' +
                                'for the query ' +
                                Object(__WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__["print"])(queryStoreValue.document));
                        }
                    }
                    return;
                }
                try {
                    var data = void 0;
                    var isMissing = void 0;
                    if (newData) {
                        // clear out the latest new data, since we're now using it
                        _this.setQuery(queryId, function () { return ({ newData: null }); });
                        data = newData.result;
                        isMissing = !newData.complete ? !newData.complete : false;
                    }
                    else {
                        if (lastResult && lastResult.data && !errorStatusChanged) {
                            data = lastResult.data;
                            isMissing = false;
                        }
                        else {
                            var document_1 = _this.getQuery(queryId).document;
                            var readResult = _this.dataStore.getCache().diff({
                                query: document_1,
                                variables: queryStoreValue.previousVariables ||
                                    queryStoreValue.variables,
                                optimistic: true,
                            });
                            data = readResult.result;
                            isMissing = !readResult.complete;
                        }
                    }
                    var resultFromStore = void 0;
                    // If there is some data missing and the user has told us that they
                    // do not tolerate partial data then we want to return the previous
                    // result and mark it as stale.
                    if (isMissing && fetchPolicy !== 'cache-only') {
                        resultFromStore = {
                            data: lastResult && lastResult.data,
                            loading: Object(__WEBPACK_IMPORTED_MODULE_10__networkStatus__["b" /* isNetworkRequestInFlight */])(queryStoreValue.networkStatus),
                            networkStatus: queryStoreValue.networkStatus,
                            stale: true,
                        };
                    }
                    else {
                        resultFromStore = {
                            data: data,
                            loading: Object(__WEBPACK_IMPORTED_MODULE_10__networkStatus__["b" /* isNetworkRequestInFlight */])(queryStoreValue.networkStatus),
                            networkStatus: queryStoreValue.networkStatus,
                            stale: false,
                        };
                    }
                    // if the query wants updates on errors we need to add it to the result
                    if (errorPolicy === 'all' &&
                        queryStoreValue.graphQLErrors &&
                        queryStoreValue.graphQLErrors.length > 0) {
                        resultFromStore.errors = queryStoreValue.graphQLErrors;
                    }
                    if (observer.next) {
                        var isDifferentResult = !(lastResult &&
                            resultFromStore &&
                            lastResult.networkStatus === resultFromStore.networkStatus &&
                            lastResult.stale === resultFromStore.stale &&
                            // We can do a strict equality check here because we include a `previousResult`
                            // with `readQueryFromStore`. So if the results are the same they will be
                            // referentially equal.
                            lastResult.data === resultFromStore.data);
                        if (isDifferentResult || previouslyHadError) {
                            try {
                                observer.next(Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["x" /* maybeDeepFreeze */])(resultFromStore));
                            }
                            catch (e) {
                                // Throw error outside this control flow to avoid breaking Apollo's state
                                setTimeout(function () {
                                    throw e;
                                }, 0);
                            }
                        }
                    }
                    previouslyHadError = false;
                }
                catch (error) {
                    previouslyHadError = true;
                    if (observer.error)
                        observer.error(new __WEBPACK_IMPORTED_MODULE_5__errors_ApolloError__["a" /* ApolloError */]({ networkError: error }));
                    return;
                }
            }
        };
    };
    // The shouldSubscribe option is a temporary fix that tells us whether watchQuery was called
    // directly (i.e. through ApolloClient) or through the query method within QueryManager.
    // Currently, the query method uses watchQuery in order to handle non-network errors correctly
    // but we don't want to keep track observables issued for the query method since those aren't
    // supposed to be refetched in the event of a store reset. Once we unify error handling for
    // network errors and non-network errors, the shouldSubscribe option will go away.
    QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
        if (shouldSubscribe === void 0) { shouldSubscribe = true; }
        if (options.fetchPolicy === 'standby') {
            throw new Error('client.watchQuery cannot be called with fetchPolicy set to "standby"');
        }
        // get errors synchronously
        var queryDefinition = Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["m" /* getQueryDefinition */])(options.query);
        // assign variable default values if supplied
        if (queryDefinition.variableDefinitions &&
            queryDefinition.variableDefinitions.length) {
            var defaultValues = Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["e" /* getDefaultValues */])(queryDefinition);
            options.variables = Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["c" /* assign */])({}, defaultValues, options.variables);
        }
        if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
            options.notifyOnNetworkStatusChange = false;
        }
        var transformedOptions = __assign({}, options);
        return new __WEBPACK_IMPORTED_MODULE_9__ObservableQuery__["a" /* ObservableQuery */]({
            scheduler: this.scheduler,
            options: transformedOptions,
            shouldSubscribe: shouldSubscribe,
        });
    };
    QueryManager.prototype.query = function (options) {
        var _this = this;
        if (!options.query) {
            throw new Error('query option is required. You must specify your GraphQL document in the query option.');
        }
        if (options.query.kind !== 'Document') {
            throw new Error('You must wrap the query string in a "gql" tag.');
        }
        if (options.returnPartialData) {
            throw new Error('returnPartialData option only supported on watchQuery.');
        }
        if (options.pollInterval) {
            throw new Error('pollInterval option only supported on watchQuery.');
        }
        if (typeof options.notifyOnNetworkStatusChange !== 'undefined') {
            throw new Error('Cannot call "query" with "notifyOnNetworkStatusChange" option. Only "watchQuery" has that option.');
        }
        options.notifyOnNetworkStatusChange = false;
        var requestId = this.idCounter;
        return new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, resolve, reject);
            return _this.watchQuery(options, false)
                .result()
                .then(function (result) {
                _this.removeFetchQueryPromise(requestId);
                resolve(result);
            })
                .catch(function (error) {
                _this.removeFetchQueryPromise(requestId);
                reject(error);
            });
        });
    };
    QueryManager.prototype.generateQueryId = function () {
        var queryId = this.idCounter.toString();
        this.idCounter++;
        return queryId;
    };
    QueryManager.prototype.stopQueryInStore = function (queryId) {
        this.queryStore.stopQuery(queryId);
        this.invalidate(true, queryId);
        this.broadcastQueries();
    };
    QueryManager.prototype.addQueryListener = function (queryId, listener) {
        this.setQuery(queryId, function (_a) {
            var _b = _a.listeners, listeners = _b === void 0 ? [] : _b;
            return ({
                listeners: listeners.concat([listener]),
                invalidate: false,
            });
        });
    };
    QueryManager.prototype.updateQueryWatch = function (queryId, document, options) {
        var _this = this;
        var cancel = this.getQuery(queryId).cancel;
        if (cancel)
            cancel();
        var previousResult = function () {
            var previousResult = null;
            var observableQuery = _this.getQuery(queryId).observableQuery;
            if (observableQuery) {
                var lastResult = observableQuery.getLastResult();
                if (lastResult) {
                    previousResult = lastResult.data;
                }
            }
            return previousResult;
        };
        return this.dataStore.getCache().watch({
            query: document,
            variables: options.variables,
            optimistic: true,
            previousResult: previousResult,
            callback: function (newData) {
                _this.setQuery(queryId, function () { return ({ invalidated: true, newData: newData }); });
            },
        });
    };
    // Adds a promise to this.fetchQueryPromises for a given request ID.
    QueryManager.prototype.addFetchQueryPromise = function (requestId, resolve, reject) {
        this.fetchQueryPromises.set(requestId.toString(), {
            resolve: resolve,
            reject: reject,
        });
    };
    // Removes the promise in this.fetchQueryPromises for a particular request ID.
    QueryManager.prototype.removeFetchQueryPromise = function (requestId) {
        this.fetchQueryPromises.delete(requestId.toString());
    };
    // Adds an ObservableQuery to this.observableQueries and to this.observableQueriesByName.
    QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
        this.setQuery(queryId, function () { return ({ observableQuery: observableQuery }); });
        // Insert the ObservableQuery into this.observableQueriesByName if the query has a name
        var queryDef = Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["m" /* getQueryDefinition */])(observableQuery.options.query);
        if (queryDef.name && queryDef.name.value) {
            var queryName = queryDef.name.value;
            // XXX we may we want to warn the user about query name conflicts in the future
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName] || [];
            this.queryIdsByName[queryName].push(observableQuery.queryId);
        }
    };
    QueryManager.prototype.removeObservableQuery = function (queryId) {
        var _a = this.getQuery(queryId), observableQuery = _a.observableQuery, cancel = _a.cancel;
        if (cancel)
            cancel();
        if (!observableQuery)
            return;
        var definition = Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["m" /* getQueryDefinition */])(observableQuery.options.query);
        var queryName = definition.name ? definition.name.value : null;
        this.setQuery(queryId, function () { return ({ observableQuery: null }); });
        if (queryName) {
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName].filter(function (val) {
                return !(observableQuery.queryId === val);
            });
        }
    };
    QueryManager.prototype.clearStore = function () {
        // Before we have sent the reset action to the store,
        // we can no longer rely on the results returned by in-flight
        // requests since these may depend on values that previously existed
        // in the data portion of the store. So, we cancel the promises and observers
        // that we have issued so far and not yet resolved (in the case of
        // queries).
        this.fetchQueryPromises.forEach(function (_a) {
            var reject = _a.reject;
            reject(new Error('Store reset while query was in flight(not completed in link chain)'));
        });
        var resetIds = [];
        this.queries.forEach(function (_a, queryId) {
            var observableQuery = _a.observableQuery;
            if (observableQuery)
                resetIds.push(queryId);
        });
        this.queryStore.reset(resetIds);
        this.mutationStore.reset();
        // begin removing data from the store
        var reset = this.dataStore.reset();
        return reset;
    };
    QueryManager.prototype.resetStore = function () {
        var _this = this;
        // Similarly, we have to have to refetch each of the queries currently being
        // observed. We refetch instead of error'ing on these since the assumption is that
        // resetting the store doesn't eliminate the need for the queries currently being
        // watched. If there is an existing query in flight when the store is reset,
        // the promise for it will be rejected and its results will not be written to the
        // store.
        return this.clearStore().then(function () {
            return _this.reFetchObservableQueries();
        });
    };
    QueryManager.prototype.getObservableQueryPromises = function (includeStandby) {
        var _this = this;
        var observableQueryPromises = [];
        this.queries.forEach(function (_a, queryId) {
            var observableQuery = _a.observableQuery;
            if (!observableQuery)
                return;
            var fetchPolicy = observableQuery.options.fetchPolicy;
            observableQuery.resetLastResults();
            if (fetchPolicy !== 'cache-only' &&
                (includeStandby || fetchPolicy !== 'standby')) {
                observableQueryPromises.push(observableQuery.refetch());
            }
            _this.setQuery(queryId, function () { return ({ newData: null }); });
            _this.invalidate(true, queryId);
        });
        return observableQueryPromises;
    };
    QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
        var observableQueryPromises = this.getObservableQueryPromises(includeStandby);
        this.broadcastQueries();
        return Promise.all(observableQueryPromises);
    };
    QueryManager.prototype.startQuery = function (queryId, options, listener) {
        this.addQueryListener(queryId, listener);
        this.fetchQuery(queryId, options)
            .catch(function () { return undefined; });
        return queryId;
    };
    QueryManager.prototype.startGraphQLSubscription = function (options) {
        var _this = this;
        var query = options.query;
        var cache = this.dataStore.getCache();
        var transformedDoc = cache.transformDocument(query);
        var variables = Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["c" /* assign */])({}, Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["e" /* getDefaultValues */])(Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["k" /* getOperationDefinition */])(query)), options.variables);
        var sub;
        var observers = [];
        return new __WEBPACK_IMPORTED_MODULE_6__util_Observable__["a" /* Observable */](function (observer) {
            observers.push(observer);
            // If this is the first observer, actually initiate the network subscription
            if (observers.length === 1) {
                var handler = {
                    next: function (result) {
                        _this.dataStore.markSubscriptionResult(result, transformedDoc, variables);
                        _this.broadcastQueries();
                        // It's slightly awkward that the data for subscriptions doesn't come from the store.
                        observers.forEach(function (obs) {
                            // XXX I'd prefer a different way to handle errors for subscriptions
                            if (obs.next)
                                obs.next(result);
                        });
                    },
                    error: function (error) {
                        observers.forEach(function (obs) {
                            if (obs.error)
                                obs.error(error);
                        });
                    },
                };
                // TODO: Should subscriptions also accept a `context` option to pass
                // through to links?
                var operation = _this.buildOperationForLink(transformedDoc, variables);
                sub = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["c" /* execute */])(_this.link, operation).subscribe(handler);
            }
            return function () {
                observers = observers.filter(function (obs) { return obs !== observer; });
                // If we removed the last observer, tear down the network subscription
                if (observers.length === 0 && sub) {
                    sub.unsubscribe();
                }
            };
        });
    };
    QueryManager.prototype.stopQuery = function (queryId) {
        this.stopQueryInStore(queryId);
        this.removeQuery(queryId);
    };
    QueryManager.prototype.removeQuery = function (queryId) {
        var subscriptions = this.getQuery(queryId).subscriptions;
        // teardown all links
        subscriptions.forEach(function (x) { return x.unsubscribe(); });
        this.queries.delete(queryId);
    };
    QueryManager.prototype.getCurrentQueryResult = function (observableQuery, optimistic) {
        if (optimistic === void 0) { optimistic = true; }
        var _a = observableQuery.options, variables = _a.variables, query = _a.query;
        var lastResult = observableQuery.getLastResult();
        var newData = this.getQuery(observableQuery.queryId).newData;
        // XXX test this
        if (newData) {
            return Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["x" /* maybeDeepFreeze */])({ data: newData.result, partial: false });
        }
        else {
            try {
                // the query is brand new, so we read from the store to see if anything is there
                var data = this.dataStore.getCache().read({
                    query: query,
                    variables: variables,
                    previousResult: lastResult ? lastResult.data : undefined,
                    optimistic: optimistic,
                });
                return Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["x" /* maybeDeepFreeze */])({ data: data, partial: false });
            }
            catch (e) {
                return Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["x" /* maybeDeepFreeze */])({ data: {}, partial: true });
            }
        }
    };
    QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable) {
        var observableQuery;
        if (typeof queryIdOrObservable === 'string') {
            var foundObserveableQuery = this.getQuery(queryIdOrObservable).observableQuery;
            if (!foundObserveableQuery) {
                throw new Error("ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
            }
            observableQuery = foundObserveableQuery;
        }
        else {
            observableQuery = queryIdOrObservable;
        }
        var _a = observableQuery.options, variables = _a.variables, query = _a.query;
        var data = this.getCurrentQueryResult(observableQuery, false).data;
        return {
            previousResult: data,
            variables: variables,
            document: query,
        };
    };
    QueryManager.prototype.broadcastQueries = function () {
        var _this = this;
        this.onBroadcast();
        this.queries.forEach(function (info, id) {
            if (!info.invalidated || !info.listeners)
                return;
            info.listeners
                .filter(function (x) { return !!x; })
                .forEach(function (listener) {
                listener(_this.queryStore.get(id), info.newData);
            });
        });
    };
    // Takes a request id, query id, a query document and information associated with the query
    // and send it to the network interface. Returns
    // a promise for the result associated with that request.
    QueryManager.prototype.fetchRequest = function (_a) {
        var _this = this;
        var requestId = _a.requestId, queryId = _a.queryId, document = _a.document, options = _a.options, fetchMoreForQueryId = _a.fetchMoreForQueryId;
        var variables = options.variables, context = options.context, _b = options.errorPolicy, errorPolicy = _b === void 0 ? 'none' : _b, fetchPolicy = options.fetchPolicy;
        var operation = this.buildOperationForLink(document, variables, __assign({}, context, { 
            // TODO: Should this be included for all entry points via
            // buildOperationForLink?
            forceFetch: !this.queryDeduplication }));
        var resultFromStore;
        var errorsFromStore;
        return new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, resolve, reject);
            var subscription = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["c" /* execute */])(_this.deduplicator, operation).subscribe({
                next: function (result) {
                    // default the lastRequestId to 1
                    var lastRequestId = _this.getQuery(queryId).lastRequestId;
                    if (requestId >= (lastRequestId || 1)) {
                        if (fetchPolicy !== 'no-cache') {
                            try {
                                _this.dataStore.markQueryResult(result, document, variables, fetchMoreForQueryId, errorPolicy === 'ignore' || errorPolicy === 'all');
                            }
                            catch (e) {
                                reject(e);
                                return;
                            }
                        }
                        else {
                            _this.setQuery(queryId, function () { return ({
                                newData: { result: result.data, complete: true },
                            }); });
                        }
                        _this.queryStore.markQueryResult(queryId, result, fetchMoreForQueryId);
                        _this.invalidate(true, queryId, fetchMoreForQueryId);
                        _this.broadcastQueries();
                    }
                    if (result.errors && errorPolicy === 'none') {
                        reject(new __WEBPACK_IMPORTED_MODULE_5__errors_ApolloError__["a" /* ApolloError */]({
                            graphQLErrors: result.errors,
                        }));
                        return;
                    }
                    else if (errorPolicy === 'all') {
                        errorsFromStore = result.errors;
                    }
                    if (fetchMoreForQueryId || fetchPolicy === 'no-cache') {
                        // We don't write fetchMore results to the store because this would overwrite
                        // the original result in case an @connection directive is used.
                        resultFromStore = result.data;
                    }
                    else {
                        try {
                            // ensure result is combined with data already in store
                            resultFromStore = _this.dataStore.getCache().read({
                                variables: variables,
                                query: document,
                                optimistic: false,
                            });
                            // this will throw an error if there are missing fields in
                            // the results which can happen with errors from the server.
                            // tslint:disable-next-line
                        }
                        catch (e) { }
                    }
                },
                error: function (error) {
                    _this.removeFetchQueryPromise(requestId);
                    _this.setQuery(queryId, function (_a) {
                        var subscriptions = _a.subscriptions;
                        return ({
                            subscriptions: subscriptions.filter(function (x) { return x !== subscription; }),
                        });
                    });
                    reject(error);
                },
                complete: function () {
                    _this.removeFetchQueryPromise(requestId);
                    _this.setQuery(queryId, function (_a) {
                        var subscriptions = _a.subscriptions;
                        return ({
                            subscriptions: subscriptions.filter(function (x) { return x !== subscription; }),
                        });
                    });
                    resolve({
                        data: resultFromStore,
                        errors: errorsFromStore,
                        loading: false,
                        networkStatus: __WEBPACK_IMPORTED_MODULE_10__networkStatus__["a" /* NetworkStatus */].ready,
                        stale: false,
                    });
                },
            });
            _this.setQuery(queryId, function (_a) {
                var subscriptions = _a.subscriptions;
                return ({
                    subscriptions: subscriptions.concat([subscription]),
                });
            });
        });
    };
    // Refetches a query given that query's name. Refetches
    // all ObservableQuery instances associated with the query name.
    QueryManager.prototype.refetchQueryByName = function (queryName) {
        var _this = this;
        var refetchedQueries = this.queryIdsByName[queryName];
        // early return if the query named does not exist (not yet fetched)
        // this used to warn but it may be inteneded behavoir to try and refetch
        // un called queries because they could be on different routes
        if (refetchedQueries === undefined)
            return;
        return Promise.all(refetchedQueries
            .map(function (id) { return _this.getQuery(id).observableQuery; })
            .filter(function (x) { return !!x; })
            .map(function (x) { return x.refetch(); }));
    };
    QueryManager.prototype.generateRequestId = function () {
        var requestId = this.idCounter;
        this.idCounter++;
        return requestId;
    };
    QueryManager.prototype.getQuery = function (queryId) {
        return this.queries.get(queryId) || __assign({}, defaultQueryInfo);
    };
    QueryManager.prototype.setQuery = function (queryId, updater) {
        var prev = this.getQuery(queryId);
        var newInfo = __assign({}, prev, updater(prev));
        this.queries.set(queryId, newInfo);
    };
    QueryManager.prototype.invalidate = function (invalidated, queryId, fetchMoreForQueryId) {
        if (queryId)
            this.setQuery(queryId, function () { return ({ invalidated: invalidated }); });
        if (fetchMoreForQueryId) {
            this.setQuery(fetchMoreForQueryId, function () { return ({ invalidated: invalidated }); });
        }
    };
    QueryManager.prototype.buildOperationForLink = function (document, variables, extraContext) {
        var cache = this.dataStore.getCache();
        return {
            query: cache.transformForLink
                ? cache.transformForLink(document)
                : document,
            variables: variables,
            operationName: Object(__WEBPACK_IMPORTED_MODULE_3_apollo_utilities__["l" /* getOperationName */])(document) || undefined,
            context: __assign({}, extraContext, { cache: cache, 
                // getting an entry's cache key is useful for cacheResolvers & state-link
                getCacheKey: function (obj) {
                    if (cache.config) {
                        // on the link, we just want the id string, not the full id value from toIdValue
                        return cache.config.dataIdFromObject(obj);
                    }
                    else {
                        throw new Error('To use context.getCacheKey, you need to use a cache that has a configurable dataIdFromObject, like apollo-cache-inmemory.');
                    }
                } }),
        };
    };
    return QueryManager;
}());

//# sourceMappingURL=QueryManager.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dedupLink__ = __webpack_require__(726);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__dedupLink__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DedupLink; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_link__ = __webpack_require__(68);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/*
 * Expects context to contain the forceFetch field if no dedup
 */
var DedupLink = /** @class */ (function (_super) {
    __extends(DedupLink, _super);
    function DedupLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inFlightRequestObservables = new Map();
        _this.subscribers = new Map();
        return _this;
    }
    DedupLink.prototype.request = function (operation, forward) {
        var _this = this;
        // sometimes we might not want to deduplicate a request, for example when we want to force fetch it.
        if (operation.getContext().forceFetch) {
            return forward(operation);
        }
        var key = operation.toKey();
        var cleanup = function (key) {
            _this.inFlightRequestObservables.delete(key);
            var prev = _this.subscribers.get(key);
            return prev;
        };
        if (!this.inFlightRequestObservables.get(key)) {
            // this is a new request, i.e. we haven't deduplicated it yet
            // call the next link
            var singleObserver_1 = forward(operation);
            var subscription_1;
            var sharedObserver = new __WEBPACK_IMPORTED_MODULE_0_apollo_link__["b" /* Observable */](function (observer) {
                // this will still be called by each subscriber regardless of
                // deduplication status
                var prev = _this.subscribers.get(key);
                if (!prev)
                    prev = { next: [], error: [], complete: [] };
                _this.subscribers.set(key, {
                    next: prev.next.concat([observer.next.bind(observer)]),
                    error: prev.error.concat([observer.error.bind(observer)]),
                    complete: prev.complete.concat([observer.complete.bind(observer)]),
                });
                if (!subscription_1) {
                    subscription_1 = singleObserver_1.subscribe({
                        next: function (result) {
                            var prev = cleanup(key);
                            _this.subscribers.delete(key);
                            if (prev) {
                                prev.next.forEach(function (next) { return next(result); });
                                prev.complete.forEach(function (complete) { return complete(); });
                            }
                        },
                        error: function (error) {
                            var prev = cleanup(key);
                            _this.subscribers.delete(key);
                            if (prev)
                                prev.error.forEach(function (err) { return err(error); });
                        },
                    });
                }
                return function () {
                    if (subscription_1)
                        subscription_1.unsubscribe();
                    _this.inFlightRequestObservables.delete(key);
                };
            });
            this.inFlightRequestObservables.set(key, sharedObserver);
        }
        // return shared Observable
        return this.inFlightRequestObservables.get(key);
    };
    return DedupLink;
}(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["a" /* ApolloLink */]));

//# sourceMappingURL=dedupLink.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryScheduler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_types__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_ObservableQuery__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__ = __webpack_require__(92);
// The QueryScheduler is supposed to be a mechanism that schedules polling queries such that
// they are clustered into the time slots of the QueryBatcher and are batched together. It
// also makes sure that for a given polling query, if one instance of the query is inflight,
// another instance will not be fired until the query returns or times out. We do this because
// another query fires while one is already in flight, the data will stay in the "loading" state
// even after the first query has returned.
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var QueryScheduler = (function () {
    function QueryScheduler(_a) {
        var queryManager = _a.queryManager, ssrMode = _a.ssrMode;
        // Map going from queryIds to query options that are in flight.
        this.inFlightQueries = {};
        // Map going from query ids to the query options associated with those queries. Contains all of
        // the queries, both in flight and not in flight.
        this.registeredQueries = {};
        // Map going from polling interval with to the query ids that fire on that interval.
        // These query ids are associated with a set of options in the this.registeredQueries.
        this.intervalQueries = {};
        // Map going from polling interval widths to polling timers.
        this.pollingTimers = {};
        this.ssrMode = false;
        this.queryManager = queryManager;
        this.ssrMode = ssrMode || false;
    }
    QueryScheduler.prototype.checkInFlight = function (queryId) {
        var query = this.queryManager.queryStore.get(queryId);
        return (query &&
            query.networkStatus !== __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].ready &&
            query.networkStatus !== __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].error);
    };
    QueryScheduler.prototype.fetchQuery = function (queryId, options, fetchType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queryManager
                .fetchQuery(queryId, options, fetchType)
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    QueryScheduler.prototype.startPollingQuery = function (options, queryId, listener) {
        if (!options.pollInterval) {
            throw new Error('Attempted to start a polling query without a polling interval.');
        }
        // Do not poll in SSR mode
        if (this.ssrMode)
            return queryId;
        this.registeredQueries[queryId] = options;
        if (listener) {
            this.queryManager.addQueryListener(queryId, listener);
        }
        this.addQueryOnInterval(queryId, options);
        return queryId;
    };
    QueryScheduler.prototype.stopPollingQuery = function (queryId) {
        // Remove the query options from one of the registered queries.
        // The polling function will then take care of not firing it anymore.
        delete this.registeredQueries[queryId];
    };
    // Fires the all of the queries on a particular interval. Called on a setInterval.
    QueryScheduler.prototype.fetchQueriesOnInterval = function (interval) {
        var _this = this;
        // XXX this "filter" here is nasty, because it does two things at the same time.
        // 1. remove queries that have stopped polling
        // 2. call fetchQueries for queries that are polling and not in flight.
        // TODO: refactor this to make it cleaner
        this.intervalQueries[interval] = this.intervalQueries[interval].filter(function (queryId) {
            // If queryOptions can't be found from registeredQueries or if it has a
            // different interval, it means that this queryId is no longer registered
            // and should be removed from the list of queries firing on this interval.
            //
            // We don't remove queries from intervalQueries immediately in
            // stopPollingQuery so that we can keep the timer consistent when queries
            // are removed and replaced, and to avoid quadratic behavior when stopping
            // many queries.
            if (!(_this.registeredQueries.hasOwnProperty(queryId) &&
                _this.registeredQueries[queryId].pollInterval === interval)) {
                return false;
            }
            // Don't fire this instance of the polling query is one of the instances is already in
            // flight.
            if (_this.checkInFlight(queryId)) {
                return true;
            }
            var queryOptions = _this.registeredQueries[queryId];
            var pollingOptions = __assign({}, queryOptions);
            pollingOptions.fetchPolicy = 'network-only';
            // don't let unhandled rejections happen
            _this.fetchQuery(queryId, pollingOptions, __WEBPACK_IMPORTED_MODULE_0__core_types__["a" /* FetchType */].poll).catch(function () { });
            return true;
        });
        if (this.intervalQueries[interval].length === 0) {
            clearInterval(this.pollingTimers[interval]);
            delete this.intervalQueries[interval];
        }
    };
    // Adds a query on a particular interval to this.intervalQueries and then fires
    // that query with all the other queries executing on that interval. Note that the query id
    // and query options must have been added to this.registeredQueries before this function is called.
    QueryScheduler.prototype.addQueryOnInterval = function (queryId, queryOptions) {
        var _this = this;
        var interval = queryOptions.pollInterval;
        if (!interval) {
            throw new Error("A poll interval is required to start polling query with id '" + queryId + "'.");
        }
        // If there are other queries on this interval, this query will just fire with those
        // and we don't need to create a new timer.
        if (this.intervalQueries.hasOwnProperty(interval.toString()) &&
            this.intervalQueries[interval].length > 0) {
            this.intervalQueries[interval].push(queryId);
        }
        else {
            this.intervalQueries[interval] = [queryId];
            // set up the timer for the function that will handle this interval
            this.pollingTimers[interval] = setInterval(function () {
                _this.fetchQueriesOnInterval(interval);
            }, interval);
        }
    };
    // Used only for unit testing.
    QueryScheduler.prototype.registerPollingQuery = function (queryOptions) {
        if (!queryOptions.pollInterval) {
            throw new Error('Attempted to register a non-polling query with the scheduler.');
        }
        return new __WEBPACK_IMPORTED_MODULE_1__core_ObservableQuery__["a" /* ObservableQuery */]({
            scheduler: this,
            options: queryOptions,
        });
    };
    return QueryScheduler;
}());

//# sourceMappingURL=scheduler.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MutationStore; });
var MutationStore = (function () {
    function MutationStore() {
        this.store = {};
    }
    MutationStore.prototype.getStore = function () {
        return this.store;
    };
    MutationStore.prototype.get = function (mutationId) {
        return this.store[mutationId];
    };
    MutationStore.prototype.initMutation = function (mutationId, mutationString, variables) {
        this.store[mutationId] = {
            mutationString: mutationString,
            variables: variables || {},
            loading: true,
            error: null,
        };
    };
    MutationStore.prototype.markMutationError = function (mutationId, error) {
        var mutation = this.store[mutationId];
        if (!mutation) {
            return;
        }
        mutation.loading = false;
        mutation.error = error;
    };
    MutationStore.prototype.markMutationResult = function (mutationId) {
        var mutation = this.store[mutationId];
        if (!mutation) {
            return;
        }
        mutation.loading = false;
        mutation.error = null;
    };
    MutationStore.prototype.reset = function () {
        this.store = {};
    };
    return MutationStore;
}());

//# sourceMappingURL=mutations.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryStore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_utilities__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__ = __webpack_require__(92);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var QueryStore = (function () {
    function QueryStore() {
        this.store = {};
    }
    QueryStore.prototype.getStore = function () {
        return this.store;
    };
    QueryStore.prototype.get = function (queryId) {
        return this.store[queryId];
    };
    QueryStore.prototype.initQuery = function (query) {
        var previousQuery = this.store[query.queryId];
        if (previousQuery &&
            previousQuery.document !== query.document &&
            Object(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"])(previousQuery.document) !== Object(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"])(query.document)) {
            // XXX we're throwing an error here to catch bugs where a query gets overwritten by a new one.
            // we should implement a separate action for refetching so that QUERY_INIT may never overwrite
            // an existing query (see also: https://github.com/apollostack/apollo-client/issues/732)
            throw new Error('Internal Error: may not update existing query string in store');
        }
        var isSetVariables = false;
        var previousVariables = null;
        if (query.storePreviousVariables &&
            previousQuery &&
            previousQuery.networkStatus !== __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].loading) {
            if (!Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["q" /* isEqual */])(previousQuery.variables, query.variables)) {
                isSetVariables = true;
                previousVariables = previousQuery.variables;
            }
        }
        // TODO break this out into a separate function
        var networkStatus;
        if (isSetVariables) {
            networkStatus = __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].setVariables;
        }
        else if (query.isPoll) {
            networkStatus = __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].poll;
        }
        else if (query.isRefetch) {
            networkStatus = __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].refetch;
            // TODO: can we determine setVariables here if it's a refetch and the variables have changed?
        }
        else {
            networkStatus = __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].loading;
        }
        var graphQLErrors = [];
        if (previousQuery && previousQuery.graphQLErrors) {
            graphQLErrors = previousQuery.graphQLErrors;
        }
        // XXX right now if QUERY_INIT is fired twice, like in a refetch situation, we just overwrite
        // the store. We probably want a refetch action instead, because I suspect that if you refetch
        // before the initial fetch is done, you'll get an error.
        this.store[query.queryId] = {
            document: query.document,
            variables: query.variables,
            previousVariables: previousVariables,
            networkError: null,
            graphQLErrors: graphQLErrors,
            networkStatus: networkStatus,
            metadata: query.metadata,
        };
        // If the action had a `moreForQueryId` property then we need to set the
        // network status on that query as well to `fetchMore`.
        //
        // We have a complement to this if statement in the query result and query
        // error action branch, but importantly *not* in the client result branch.
        // This is because the implementation of `fetchMore` *always* sets
        // `fetchPolicy` to `network-only` so we would never have a client result.
        if (typeof query.fetchMoreForQueryId === 'string') {
            this.store[query.fetchMoreForQueryId].networkStatus =
                __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].fetchMore;
        }
    };
    QueryStore.prototype.markQueryResult = function (queryId, result, fetchMoreForQueryId) {
        if (!this.store[queryId])
            return;
        this.store[queryId].networkError = null;
        this.store[queryId].graphQLErrors =
            result.errors && result.errors.length ? result.errors : [];
        this.store[queryId].previousVariables = null;
        this.store[queryId].networkStatus = __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].ready;
        // If we have a `fetchMoreForQueryId` then we need to update the network
        // status for that query. See the branch for query initialization for more
        // explanation about this process.
        if (typeof fetchMoreForQueryId === 'string') {
            this.store[fetchMoreForQueryId].networkStatus = __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].ready;
        }
    };
    QueryStore.prototype.markQueryError = function (queryId, error, fetchMoreForQueryId) {
        if (!this.store[queryId])
            return;
        this.store[queryId].networkError = error;
        this.store[queryId].networkStatus = __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].error;
        // If we have a `fetchMoreForQueryId` then we need to update the network
        // status for that query. See the branch for query initialization for more
        // explanation about this process.
        if (typeof fetchMoreForQueryId === 'string') {
            this.markQueryResultClient(fetchMoreForQueryId, true);
        }
    };
    QueryStore.prototype.markQueryResultClient = function (queryId, complete) {
        if (!this.store[queryId])
            return;
        this.store[queryId].networkError = null;
        this.store[queryId].previousVariables = null;
        this.store[queryId].networkStatus = complete
            ? __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].ready
            : __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].loading;
    };
    QueryStore.prototype.stopQuery = function (queryId) {
        delete this.store[queryId];
    };
    QueryStore.prototype.reset = function (observableQueryIds) {
        var _this = this;
        // keep only the queries with query ids that are associated with observables
        this.store = Object.keys(this.store)
            .filter(function (queryId) {
            return observableQueryIds.indexOf(queryId) > -1;
        })
            .reduce(function (res, key) {
            // XXX set loading to true so listeners don't trigger unless they want results with partial data
            res[key] = __assign({}, _this.store[key], { networkStatus: __WEBPACK_IMPORTED_MODULE_2__core_networkStatus__["a" /* NetworkStatus */].loading });
            return res;
        }, {});
    };
    return QueryStore;
}());

//# sourceMappingURL=queries.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataStore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_utilities__ = __webpack_require__(31);

var DataStore = (function () {
    function DataStore(initialCache) {
        this.cache = initialCache;
    }
    DataStore.prototype.getCache = function () {
        return this.cache;
    };
    DataStore.prototype.markQueryResult = function (result, document, variables, fetchMoreForQueryId, ignoreErrors) {
        if (ignoreErrors === void 0) { ignoreErrors = false; }
        var writeWithErrors = !Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["o" /* graphQLResultHasError */])(result);
        if (ignoreErrors && Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["o" /* graphQLResultHasError */])(result) && result.data) {
            writeWithErrors = true;
        }
        if (!fetchMoreForQueryId && writeWithErrors) {
            this.cache.write({
                result: result.data,
                dataId: 'ROOT_QUERY',
                query: document,
                variables: variables,
            });
        }
    };
    DataStore.prototype.markSubscriptionResult = function (result, document, variables) {
        // the subscription interface should handle not sending us results we no longer subscribe to.
        // XXX I don't think we ever send in an object with errors, but we might in the future...
        if (!Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["o" /* graphQLResultHasError */])(result)) {
            this.cache.write({
                result: result.data,
                dataId: 'ROOT_SUBSCRIPTION',
                query: document,
                variables: variables,
            });
        }
    };
    DataStore.prototype.markMutationInit = function (mutation) {
        var _this = this;
        if (mutation.optimisticResponse) {
            var optimistic_1;
            if (typeof mutation.optimisticResponse === 'function') {
                optimistic_1 = mutation.optimisticResponse(mutation.variables);
            }
            else {
                optimistic_1 = mutation.optimisticResponse;
            }
            var changeFn_1 = function () {
                _this.markMutationResult({
                    mutationId: mutation.mutationId,
                    result: { data: optimistic_1 },
                    document: mutation.document,
                    variables: mutation.variables,
                    updateQueries: mutation.updateQueries,
                    update: mutation.update,
                });
            };
            this.cache.recordOptimisticTransaction(function (c) {
                var orig = _this.cache;
                _this.cache = c;
                try {
                    changeFn_1();
                }
                finally {
                    _this.cache = orig;
                }
            }, mutation.mutationId);
        }
    };
    DataStore.prototype.markMutationResult = function (mutation) {
        var _this = this;
        // Incorporate the result from this mutation into the store
        if (!Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["o" /* graphQLResultHasError */])(mutation.result)) {
            var cacheWrites_1 = [];
            cacheWrites_1.push({
                result: mutation.result.data,
                dataId: 'ROOT_MUTATION',
                query: mutation.document,
                variables: mutation.variables,
            });
            if (mutation.updateQueries) {
                Object.keys(mutation.updateQueries)
                    .filter(function (id) { return mutation.updateQueries[id]; })
                    .forEach(function (queryId) {
                    var _a = mutation.updateQueries[queryId], query = _a.query, updater = _a.updater;
                    // Read the current query result from the store.
                    var _b = _this.cache.diff({
                        query: query.document,
                        variables: query.variables,
                        returnPartialData: true,
                        optimistic: false,
                    }), currentQueryResult = _b.result, complete = _b.complete;
                    if (!complete) {
                        return;
                    }
                    // Run our reducer using the current query result and the mutation result.
                    var nextQueryResult = Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["D" /* tryFunctionOrLogError */])(function () {
                        return updater(currentQueryResult, {
                            mutationResult: mutation.result,
                            queryName: Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["l" /* getOperationName */])(query.document) || undefined,
                            queryVariables: query.variables,
                        });
                    });
                    // Write the modified result back into the store if we got a new result.
                    if (nextQueryResult) {
                        cacheWrites_1.push({
                            result: nextQueryResult,
                            dataId: 'ROOT_QUERY',
                            query: query.document,
                            variables: query.variables,
                        });
                    }
                });
            }
            this.cache.performTransaction(function (c) {
                cacheWrites_1.forEach(function (write) { return c.write(write); });
            });
            // If the mutation has some writes associated with it then we need to
            // apply those writes to the store by running this reducer again with a
            // write action.
            var update_1 = mutation.update;
            if (update_1) {
                this.cache.performTransaction(function (c) {
                    Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["D" /* tryFunctionOrLogError */])(function () { return update_1(c, mutation.result); });
                });
            }
        }
    };
    DataStore.prototype.markMutationComplete = function (_a) {
        var mutationId = _a.mutationId, optimisticResponse = _a.optimisticResponse;
        if (!optimisticResponse)
            return;
        this.cache.removeOptimistic(mutationId);
    };
    DataStore.prototype.markUpdateQueryResult = function (document, variables, newResult) {
        this.cache.write({
            result: newResult,
            dataId: 'ROOT_QUERY',
            variables: variables,
            query: document,
        });
    };
    DataStore.prototype.reset = function () {
        return this.cache.reset();
    };
    return DataStore;
}());

//# sourceMappingURL=store.js.map

/***/ }),

/***/ 731:
/***/ (function(module, exports) {

exports.version = "2.3.1"

/***/ }),

/***/ 732:
/***/ (function(module, exports, __webpack_require__) {

var createFlow = __webpack_require__(733);

/**
 * This method is like `_.flow` except that it creates a function that
 * invokes the given functions from right to left.
 *
 * @static
 * @since 3.0.0
 * @memberOf _
 * @category Util
 * @param {...(Function|Function[])} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see _.flow
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flowRight([square, _.add]);
 * addSquare(1, 2);
 * // => 9
 */
var flowRight = createFlow(true);

module.exports = flowRight;


/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

var LodashWrapper = __webpack_require__(174),
    flatRest = __webpack_require__(734),
    getData = __webpack_require__(276),
    getFuncName = __webpack_require__(277),
    isArray = __webpack_require__(180),
    isLaziable = __webpack_require__(762);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
  return flatRest(function(funcs) {
    var length = funcs.length,
        index = length,
        prereq = LodashWrapper.prototype.thru;

    if (fromRight) {
      funcs.reverse();
    }
    while (index--) {
      var func = funcs[index];
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
        var wrapper = new LodashWrapper([], true);
      }
    }
    index = wrapper ? index : length;
    while (++index < length) {
      func = funcs[index];

      var funcName = getFuncName(func),
          data = funcName == 'wrapper' ? getData(func) : undefined;

      if (data && isLaziable(data[0]) &&
            data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
            !data[4].length && data[9] == 1
          ) {
        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
      } else {
        wrapper = (func.length == 1 && isLaziable(func))
          ? wrapper[funcName]()
          : wrapper.thru(func);
      }
    }
    return function() {
      var args = arguments,
          value = args[0];

      if (wrapper && args.length == 1 && isArray(value)) {
        return wrapper.plant(value).value();
      }
      var index = 0,
          result = length ? funcs[index].apply(this, args) : value;

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  });
}

module.exports = createFlow;


/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__(735),
    overRest = __webpack_require__(744),
    setToString = __webpack_require__(746);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(736);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(737),
    isFlattenable = __webpack_require__(738);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ 737:
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ 738:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(177),
    isArguments = __webpack_require__(740),
    isArray = __webpack_require__(180);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ 739:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)))

/***/ }),

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(741),
    isObjectLike = __webpack_require__(179);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ 741:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(274),
    isObjectLike = __webpack_require__(179);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ 742:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(177);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 743:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(745);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ 745:
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(747),
    shortOut = __webpack_require__(757);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ 747:
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(748),
    defineProperty = __webpack_require__(749),
    identity = __webpack_require__(756);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ 748:
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(275);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(751),
    isMasked = __webpack_require__(752),
    isObject = __webpack_require__(175),
    toSource = __webpack_require__(754);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(274),
    isObject = __webpack_require__(175);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(753);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(178);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ 754:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ 755:
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ 756:
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 757:
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

var WeakMap = __webpack_require__(759);

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;


/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(275),
    root = __webpack_require__(178);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ 760:
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ 761:
/***/ (function(module, exports) {

/** Used to lookup unminified function names. */
var realNames = {};

module.exports = realNames;


/***/ }),

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(181),
    getData = __webpack_require__(276),
    getFuncName = __webpack_require__(277),
    lodash = __webpack_require__(763);

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

module.exports = isLaziable;


/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(181),
    LodashWrapper = __webpack_require__(174),
    baseLodash = __webpack_require__(176),
    isArray = __webpack_require__(180),
    isObjectLike = __webpack_require__(179),
    wrapperClone = __webpack_require__(764);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

module.exports = lodash;


/***/ }),

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(181),
    LodashWrapper = __webpack_require__(174),
    copyArray = __webpack_require__(765);

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

module.exports = wrapperClone;


/***/ }),

/***/ 765:
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inMemoryCache__ = __webpack_require__(767);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__inMemoryCache__["a"]; });
/* unused harmony reexport defaultDataIdFromObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__readFromStore__ = __webpack_require__(280);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__writeToStore__ = __webpack_require__(279);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fragmentMatcher__ = __webpack_require__(278);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objectCache__ = __webpack_require__(182);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recordingCache__ = __webpack_require__(282);
/* unused harmony namespace reexport */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultDataIdFromObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InMemoryCache; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_cache__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_utilities__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fragmentMatcher__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__writeToStore__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__readFromStore__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objectCache__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__recordingCache__ = __webpack_require__(282);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};







var defaultConfig = {
    fragmentMatcher: new __WEBPACK_IMPORTED_MODULE_2__fragmentMatcher__["a" /* HeuristicFragmentMatcher */](),
    dataIdFromObject: defaultDataIdFromObject,
    addTypename: true,
    storeFactory: __WEBPACK_IMPORTED_MODULE_5__objectCache__["b" /* defaultNormalizedCacheFactory */],
};
function defaultDataIdFromObject(result) {
    if (result.__typename) {
        if (result.id !== undefined) {
            return result.__typename + ":" + result.id;
        }
        if (result._id !== undefined) {
            return result.__typename + ":" + result._id;
        }
    }
    return null;
}
var InMemoryCache = /** @class */ (function (_super) {
    __extends(InMemoryCache, _super);
    function InMemoryCache(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.optimistic = [];
        _this.watches = [];
        // Set this while in a transaction to prevent broadcasts...
        // don't forget to turn it back on!
        _this.silenceBroadcast = false;
        _this.config = __assign({}, defaultConfig, config);
        // backwards compat
        if (_this.config.customResolvers) {
            console.warn('customResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating customResolvers in the next major version.');
            _this.config.cacheRedirects = _this.config.customResolvers;
        }
        if (_this.config.cacheResolvers) {
            console.warn('cacheResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating cacheResolvers in the next major version.');
            _this.config.cacheRedirects = _this.config.cacheResolvers;
        }
        _this.addTypename = _this.config.addTypename;
        _this.data = _this.config.storeFactory();
        return _this;
    }
    InMemoryCache.prototype.restore = function (data) {
        if (data)
            this.data.replace(data);
        return this;
    };
    InMemoryCache.prototype.extract = function (optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        if (optimistic && this.optimistic.length > 0) {
            var patches = this.optimistic.map(function (opt) { return opt.data; });
            return Object.assign.apply(Object, [{}, this.data.toObject()].concat(patches));
        }
        return this.data.toObject();
    };
    InMemoryCache.prototype.read = function (query) {
        if (query.rootId && this.data.get(query.rootId) === undefined) {
            return null;
        }
        return Object(__WEBPACK_IMPORTED_MODULE_4__readFromStore__["b" /* readQueryFromStore */])({
            store: this.config.storeFactory(this.extract(query.optimistic)),
            query: this.transformDocument(query.query),
            variables: query.variables,
            rootId: query.rootId,
            fragmentMatcherFunction: this.config.fragmentMatcher.match,
            previousResult: query.previousResult,
            config: this.config,
        });
    };
    InMemoryCache.prototype.write = function (write) {
        Object(__WEBPACK_IMPORTED_MODULE_3__writeToStore__["a" /* writeResultToStore */])({
            dataId: write.dataId,
            result: write.result,
            variables: write.variables,
            document: this.transformDocument(write.query),
            store: this.data,
            dataIdFromObject: this.config.dataIdFromObject,
            fragmentMatcherFunction: this.config.fragmentMatcher.match,
        });
        this.broadcastWatches();
    };
    InMemoryCache.prototype.diff = function (query) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__readFromStore__["a" /* diffQueryAgainstStore */])({
            store: this.config.storeFactory(this.extract(query.optimistic)),
            query: this.transformDocument(query.query),
            variables: query.variables,
            returnPartialData: query.returnPartialData,
            previousResult: query.previousResult,
            fragmentMatcherFunction: this.config.fragmentMatcher.match,
            config: this.config,
        });
    };
    InMemoryCache.prototype.watch = function (watch) {
        var _this = this;
        this.watches.push(watch);
        return function () {
            _this.watches = _this.watches.filter(function (c) { return c !== watch; });
        };
    };
    InMemoryCache.prototype.evict = function (query) {
        throw new Error("eviction is not implemented on InMemory Cache");
    };
    InMemoryCache.prototype.reset = function () {
        this.data.clear();
        this.broadcastWatches();
        return Promise.resolve();
    };
    InMemoryCache.prototype.removeOptimistic = function (id) {
        var _this = this;
        // Throw away optimistic changes of that particular mutation
        var toPerform = this.optimistic.filter(function (item) { return item.id !== id; });
        this.optimistic = [];
        // Re-run all of our optimistic data actions on top of one another.
        toPerform.forEach(function (change) {
            _this.recordOptimisticTransaction(change.transaction, change.id);
        });
        this.broadcastWatches();
    };
    InMemoryCache.prototype.performTransaction = function (transaction) {
        // TODO: does this need to be different, or is this okay for an in-memory cache?
        var alreadySilenced = this.silenceBroadcast;
        this.silenceBroadcast = true;
        transaction(this);
        if (!alreadySilenced) {
            // Don't un-silence since this is a nested transaction
            // (for example, a transaction inside an optimistic record)
            this.silenceBroadcast = false;
        }
        this.broadcastWatches();
    };
    InMemoryCache.prototype.recordOptimisticTransaction = function (transaction, id) {
        var _this = this;
        this.silenceBroadcast = true;
        var patch = Object(__WEBPACK_IMPORTED_MODULE_6__recordingCache__["a" /* record */])(this.extract(true), function (recordingCache) {
            // swapping data instance on 'this' is currently necessary
            // because of the current architecture
            var dataCache = _this.data;
            _this.data = recordingCache;
            _this.performTransaction(transaction);
            _this.data = dataCache;
        });
        this.optimistic.push({
            id: id,
            transaction: transaction,
            data: patch,
        });
        this.silenceBroadcast = false;
        this.broadcastWatches();
    };
    InMemoryCache.prototype.transformDocument = function (document) {
        if (this.addTypename)
            return Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["a" /* addTypenameToDocument */])(document);
        return document;
    };
    InMemoryCache.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: options.query,
            variables: options.variables,
            optimistic: optimistic,
        });
    };
    InMemoryCache.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: this.transformDocument(Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["h" /* getFragmentQueryDocument */])(options.fragment, options.fragmentName)),
            variables: options.variables,
            rootId: options.id,
            optimistic: optimistic,
        });
    };
    InMemoryCache.prototype.writeQuery = function (options) {
        this.write({
            dataId: 'ROOT_QUERY',
            result: options.data,
            query: this.transformDocument(options.query),
            variables: options.variables,
        });
    };
    InMemoryCache.prototype.writeFragment = function (options) {
        this.write({
            dataId: options.id,
            result: options.data,
            query: this.transformDocument(Object(__WEBPACK_IMPORTED_MODULE_1_apollo_utilities__["h" /* getFragmentQueryDocument */])(options.fragment, options.fragmentName)),
            variables: options.variables,
        });
    };
    InMemoryCache.prototype.broadcastWatches = function () {
        var _this = this;
        // Skip this when silenced (like inside a transaction)
        if (this.silenceBroadcast)
            return;
        // right now, we invalidate all queries whenever anything changes
        this.watches.forEach(function (c) {
            var newData = _this.diff({
                query: c.query,
                variables: c.variables,
                // TODO: previousResult isn't in the types - this will only work
                // with ObservableQuery which is in a different package
                previousResult: c.previousResult && c.previousResult(),
                optimistic: c.optimistic,
            });
            c.callback(newData);
        });
    };
    return InMemoryCache;
}(__WEBPACK_IMPORTED_MODULE_0_apollo_cache__["a" /* ApolloCache */]));

//# sourceMappingURL=inMemoryCache.js.map

/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache__ = __webpack_require__(769);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__cache__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__(771);
/* unused harmony namespace reexport */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApolloCache; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_utilities__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(770);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var ApolloCache = /** @class */ (function () {
    function ApolloCache() {
    }
    // optional API
    ApolloCache.prototype.transformDocument = function (document) {
        return document;
    };
    // experimental
    ApolloCache.prototype.transformForLink = function (document) {
        return document;
    };
    // DataProxy API
    /**
     *
     * @param options
     * @param optimistic
     */
    ApolloCache.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: options.query,
            variables: options.variables,
            optimistic: optimistic,
        });
    };
    ApolloCache.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["h" /* getFragmentQueryDocument */])(options.fragment, options.fragmentName),
            variables: options.variables,
            rootId: options.id,
            optimistic: optimistic,
        });
    };
    ApolloCache.prototype.writeQuery = function (options) {
        this.write({
            dataId: 'ROOT_QUERY',
            result: options.data,
            query: options.query,
            variables: options.variables,
        });
    };
    ApolloCache.prototype.writeFragment = function (options) {
        this.write({
            dataId: options.id,
            result: options.data,
            variables: options.variables,
            query: Object(__WEBPACK_IMPORTED_MODULE_0_apollo_utilities__["h" /* getFragmentQueryDocument */])(options.fragment, options.fragmentName),
        });
    };
    ApolloCache.prototype.writeData = function (_a) {
        var id = _a.id, data = _a.data;
        if (typeof id !== 'undefined') {
            var typenameResult = null;
            // Since we can't use fragments without having a typename in the store,
            // we need to make sure we have one.
            // To avoid overwriting an existing typename, we need to read it out first
            // and generate a fake one if none exists.
            try {
                typenameResult = this.read({
                    rootId: id,
                    optimistic: false,
                    query: __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* justTypenameQuery */],
                });
            }
            catch (e) {
                // Do nothing, since an error just means no typename exists
            }
            // tslint:disable-next-line
            var __typename = (typenameResult && typenameResult.__typename) || '__ClientData';
            // Add a type here to satisfy the inmemory cache
            var dataToWrite = __assign({ __typename: __typename }, data);
            this.writeFragment({
                id: id,
                fragment: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* fragmentFromPojo */])(dataToWrite, __typename),
                data: dataToWrite,
            });
        }
        else {
            this.writeQuery({ query: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* queryFromPojo */])(data), data: data });
        }
    };
    return ApolloCache;
}());

//# sourceMappingURL=cache.js.map

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;

var _visitor = __webpack_require__(709);

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function print(ast) {
  return (0, _visitor.visit)(ast, { leave: printDocASTReducer });
} /**
   * Copyright (c) 2015-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },

  // Document

  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },

  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet;
    // Anonymous queries with no directives or variable definitions can use
    // the query short form.
    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },


  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue;
    return variable + ': ' + type + wrap(' = ', defaultValue);
  },

  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },

  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },

  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },

  // Fragments

  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },

  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },

  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        variableDefinitions = _ref7.variableDefinitions,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return (
      // Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      'fragment ' + name + wrap('(', join(variableDefinitions, ', '), ')') + ' ' + ('on ' + typeCondition + ' ' + wrap('', join(directives, ' '), ' ')) + selectionSet
    );
  },

  // Value

  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value,
        isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === 'description') : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? 'true' : 'false';
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },

  // Directive

  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },

  // Type

  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },

  // Type System Definitions

  SchemaDefinition: function SchemaDefinition(_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  },

  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },

  ScalarTypeDefinition: addDescription(function (_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  }),

  ObjectTypeDefinition: addDescription(function (_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),

  FieldDefinition: addDescription(function (_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + wrap('(', join(args, ', '), ')') + ': ' + type + wrap(' ', join(directives, ' '));
  }),

  InputValueDefinition: addDescription(function (_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  }),

  InterfaceTypeDefinition: addDescription(function (_ref26) {
    var name = _ref26.name,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, join(directives, ' '), block(fields)], ' ');
  }),

  UnionTypeDefinition: addDescription(function (_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  }),

  EnumTypeDefinition: addDescription(function (_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  }),

  EnumValueDefinition: addDescription(function (_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  }),

  InputObjectTypeDefinition: addDescription(function (_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  }),

  ScalarTypeExtension: function ScalarTypeExtension(_ref31) {
    var name = _ref31.name,
        directives = _ref31.directives;
    return join(['extend scalar', name, join(directives, ' ')], ' ');
  },

  ObjectTypeExtension: function ObjectTypeExtension(_ref32) {
    var name = _ref32.name,
        interfaces = _ref32.interfaces,
        directives = _ref32.directives,
        fields = _ref32.fields;
    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },

  InterfaceTypeExtension: function InterfaceTypeExtension(_ref33) {
    var name = _ref33.name,
        directives = _ref33.directives,
        fields = _ref33.fields;
    return join(['extend interface', name, join(directives, ' '), block(fields)], ' ');
  },

  UnionTypeExtension: function UnionTypeExtension(_ref34) {
    var name = _ref34.name,
        directives = _ref34.directives,
        types = _ref34.types;
    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  },

  EnumTypeExtension: function EnumTypeExtension(_ref35) {
    var name = _ref35.name,
        directives = _ref35.directives,
        values = _ref35.values;
    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
  },

  InputObjectTypeExtension: function InputObjectTypeExtension(_ref36) {
    var name = _ref36.name,
        directives = _ref36.directives,
        fields = _ref36.fields;
    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
  },

  DirectiveDefinition: addDescription(function (_ref37) {
    var name = _ref37.name,
        args = _ref37.arguments,
        locations = _ref37.locations;
    return 'directive @' + name + wrap('(', join(args, ', '), ')') + ' on ' + join(locations, ' | ');
  })
};

function addDescription(cb) {
  return function (node) {
    return join([node.description, cb(node)], '\n');
  };
}

/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */
function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter(function (x) {
    return x;
  }).join(separator || '') : '';
}

/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */
function block(array) {
  return array && array.length !== 0 ? '{\n' + indent(join(array, '\n')) + '\n}' : '';
}

/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */
function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || '') : '';
}

function indent(maybeString) {
  return maybeString && '  ' + maybeString.replace(/\n/g, '\n  ');
}

/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 */
function printBlockString(value, isDescription) {
  var escaped = value.replace(/"""/g, '\\"""');
  return (value[0] === ' ' || value[0] === '\t') && value.indexOf('\n') === -1 ? '"""' + escaped.replace(/"$/, '"\n') + '"""' : '"""\n' + (isDescription ? escaped : indent(escaped)) + '\n"""';
}

/***/ }),

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = queryFromPojo;
/* harmony export (immutable) */ __webpack_exports__["a"] = fragmentFromPojo;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return justTypenameQuery; });
function queryFromPojo(obj) {
    var op = {
        kind: 'OperationDefinition',
        operation: 'query',
        name: {
            kind: 'Name',
            value: 'GeneratedClientQuery',
        },
        selectionSet: selectionSetFromObj(obj),
    };
    var out = {
        kind: 'Document',
        definitions: [op],
    };
    return out;
}
function fragmentFromPojo(obj, typename) {
    var frag = {
        kind: 'FragmentDefinition',
        typeCondition: {
            kind: 'NamedType',
            name: {
                kind: 'Name',
                value: typename || '__FakeType',
            },
        },
        name: {
            kind: 'Name',
            value: 'GeneratedClientQuery',
        },
        selectionSet: selectionSetFromObj(obj),
    };
    var out = {
        kind: 'Document',
        definitions: [frag],
    };
    return out;
}
function selectionSetFromObj(obj) {
    if (typeof obj === 'number' ||
        typeof obj === 'boolean' ||
        typeof obj === 'string' ||
        typeof obj === 'undefined' ||
        obj === null) {
        // No selection set here
        return null;
    }
    if (Array.isArray(obj)) {
        // GraphQL queries don't include arrays
        return selectionSetFromObj(obj[0]);
    }
    // Now we know it's an object
    var selections = [];
    Object.keys(obj).forEach(function (key) {
        var field = {
            kind: 'Field',
            name: {
                kind: 'Name',
                value: key,
            },
        };
        // Recurse
        var nestedSelSet = selectionSetFromObj(obj[key]);
        if (nestedSelSet) {
            field.selectionSet = nestedSelSet;
        }
        selections.push(field);
    });
    var selectionSet = {
        kind: 'SelectionSet',
        selections: selections,
    };
    return selectionSet;
}
var justTypenameQuery = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: null,
            variableDefinitions: null,
            directives: [],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        alias: null,
                        name: {
                            kind: 'Name',
                            value: '__typename',
                        },
                        arguments: [],
                        directives: [],
                        selectionSet: null,
                    },
                ],
            },
        },
    ],
};
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cache__ = __webpack_require__(772);
/* unused harmony namespace reexport */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Cache */
var Cache;
(function (Cache) {
})(Cache || (Cache = {}));
//# sourceMappingURL=Cache.js.map

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities__ = __webpack_require__(774);
/* unused harmony reexport filter */
/* unused harmony reexport check */
/* unused harmony reexport propType */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__graphql__ = __webpack_require__(281);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__graphql__["a" /* graphql */]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export filter */
/* unused harmony export check */
/* unused harmony export propType */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphql__ = __webpack_require__(281);

function filter(doc, data) {
    var resolver = function (fieldName, root, args, context, info) {
        return root[info.resultKey];
    };
    return Object(__WEBPACK_IMPORTED_MODULE_0__graphql__["a" /* graphql */])(resolver, doc, data);
}
// TODO: we should probably make check call propType and then throw,
// rather than the other way round, to avoid constructing stack traces
// for things like oneOf uses in React. At this stage I doubt many people
// are using this like that, but in the future, who knows?
function check(doc, data) {
    var resolver = function (fieldName, root, args, context, info) {
        if (!{}.hasOwnProperty.call(root, info.resultKey)) {
            throw new Error(info.resultKey + " missing on " + root);
        }
        return root[info.resultKey];
    };
    Object(__WEBPACK_IMPORTED_MODULE_0__graphql__["a" /* graphql */])(resolver, doc, data, {}, {}, {
        fragmentMatcher: function () { return false; },
    });
}
// Lifted/adapted from
//   https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js
var ANONYMOUS = '<<anonymous>>';
function PropTypeError(message) {
    this.message = message;
    this.stack = '';
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype;
var reactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context',
};
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
        if (props[propName] == null) {
            var locationName = reactPropTypeLocationNames[location];
            if (isRequired) {
                if (props[propName] === null) {
                    return new PropTypeError("The " + locationName + " `" + propFullName + "` is marked as required " +
                        ("in `" + componentName + "`, but its value is `null`."));
                }
                return new PropTypeError("The " + locationName + " `" + propFullName + "` is marked as required in " +
                    ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
        }
        else {
            return validate(props, propName, componentName, location, propFullName);
        }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
}
function propType(doc) {
    return createChainableTypeChecker(function (props, propName) {
        var prop = props[propName];
        try {
            if (!prop.loading) {
                check(doc, prop);
            }
            return null;
        }
        catch (e) {
            // Need a much better error.
            // Also we aren't checking for extra fields
            return e;
        }
    });
}
//# sourceMappingURL=utilities.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__httpLink__ = __webpack_require__(776);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__httpLink__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createHttpLink */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpLink; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_link__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__ = __webpack_require__(777);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};


var createHttpLink = function (linkOptions) {
    if (linkOptions === void 0) { linkOptions = {}; }
    var _a = linkOptions.uri, uri = _a === void 0 ? '/graphql' : _a, 
    // use default global fetch is nothing passed in
    fetcher = linkOptions.fetch, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, requestOptions = __rest(linkOptions, ["uri", "fetch", "includeExtensions", "useGETForQueries"]);
    // dev warnings to ensure fetch is present
    Object(__WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["a" /* checkFetcher */])(fetcher);
    //fetcher is set here rather than the destructuring to ensure fetch is
    //declared before referencing it. Reference in the destructuring would cause
    //a ReferenceError
    if (!fetcher) {
        fetcher = fetch;
    }
    var linkConfig = {
        http: { includeExtensions: includeExtensions },
        options: requestOptions.fetchOptions,
        credentials: requestOptions.credentials,
        headers: requestOptions.headers,
    };
    return new __WEBPACK_IMPORTED_MODULE_0_apollo_link__["a" /* ApolloLink */](function (operation) {
        var chosenURI = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["f" /* selectURI */])(operation, uri);
        var context = operation.getContext();
        var contextConfig = {
            http: context.http,
            options: context.fetchOptions,
            credentials: context.credentials,
            headers: context.headers,
        };
        //uses fallback, link, and then context to build options
        var _a = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["e" /* selectHttpOptionsAndBody */])(operation, __WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["c" /* fallbackHttpConfig */], linkConfig, contextConfig), options = _a.options, body = _a.body;
        var controller;
        if (!options.signal) {
            var _b = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["b" /* createSignalIfSupported */])(), _controller = _b.controller, signal = _b.signal;
            controller = _controller;
            if (controller)
                options.signal = signal;
        }
        // If requested, set method to GET if there are no mutations.
        var definitionIsMutation = function (d) {
            return d.kind === 'OperationDefinition' && d.operation === 'mutation';
        };
        if (useGETForQueries &&
            !operation.query.definitions.some(definitionIsMutation)) {
            options.method = 'GET';
        }
        if (options.method === 'GET') {
            var _c = rewriteURIForGET(chosenURI, body), newURI = _c.newURI, parseError = _c.parseError;
            if (parseError) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["d" /* fromError */])(parseError);
            }
            chosenURI = newURI;
        }
        else {
            try {
                options.body = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["g" /* serializeFetchParameter */])(body, 'Payload');
            }
            catch (parseError) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["d" /* fromError */])(parseError);
            }
        }
        return new __WEBPACK_IMPORTED_MODULE_0_apollo_link__["b" /* Observable */](function (observer) {
            fetcher(chosenURI, options)
                .then(function (response) {
                operation.setContext({ response: response });
                return response;
            })
                .then(Object(__WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["d" /* parseAndCheckHttpResponse */])(operation))
                .then(function (result) {
                // we have data and can send it to back up the link chain
                observer.next(result);
                observer.complete();
                return result;
            })
                .catch(function (err) {
                // fetch was cancelled so its already been cleaned up in the unsubscribe
                if (err.name === 'AbortError')
                    return;
                // if it is a network error, BUT there is graphql result info
                // fire the next observer before calling error
                // this gives apollo-client (and react-apollo) the `graphqlErrors` and `networErrors`
                // to pass to UI
                // this should only happen if we *also* have data as part of the response key per
                // the spec
                if (err.result && err.result.errors && err.result.data) {
                    // if we dont' call next, the UI can only show networkError because AC didn't
                    // get andy graphqlErrors
                    // this is graphql execution result info (i.e errors and possibly data)
                    // this is because there is no formal spec how errors should translate to
                    // http status codes. So an auth error (401) could have both data
                    // from a public field, errors from a private field, and a status of 401
                    // {
                    //  user { // this will have errors
                    //    firstName
                    //  }
                    //  products { // this is public so will have data
                    //    cost
                    //  }
                    // }
                    //
                    // the result of above *could* look like this:
                    // {
                    //   data: { products: [{ cost: "$10" }] },
                    //   errors: [{
                    //      message: 'your session has timed out',
                    //      path: []
                    //   }]
                    // }
                    // status code of above would be a 401
                    // in the UI you want to show data where you can, errors as data where you can
                    // and use correct http status codes
                    observer.next(err.result);
                }
                observer.error(err);
            });
            return function () {
                // XXX support canceling this request
                // https://developers.google.com/web/updates/2017/09/abortable-fetch
                if (controller)
                    controller.abort();
            };
        });
    });
};
// For GET operations, returns the given URI rewritten with parameters, or a
// parse error.
function rewriteURIForGET(chosenURI, body) {
    // Implement the standard HTTP GET serialization, plus 'extensions'. Note
    // the extra level of JSON serialization!
    var queryParams = [];
    var addQueryParam = function (key, value) {
        queryParams.push(key + "=" + encodeURIComponent(value));
    };
    if ('query' in body) {
        addQueryParam('query', body.query);
    }
    if (body.operationName) {
        addQueryParam('operationName', body.operationName);
    }
    if (body.variables) {
        var serializedVariables = void 0;
        try {
            serializedVariables = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["g" /* serializeFetchParameter */])(body.variables, 'Variables map');
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam('variables', serializedVariables);
    }
    if (body.extensions) {
        var serializedExtensions = void 0;
        try {
            serializedExtensions = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_link_http_common__["g" /* serializeFetchParameter */])(body.extensions, 'Extensions map');
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam('extensions', serializedExtensions);
    }
    // Reconstruct the URI with added query params.
    // XXX This assumes that the URI is well-formed and that it doesn't
    //     already contain any of these query params. We could instead use the
    //     URL API and take a polyfill (whatwg-url@6) for older browsers that
    //     don't support URLSearchParams. Note that some browsers (and
    //     versions of whatwg-url) support URL but not URLSearchParams!
    var fragment = '', preFragment = chosenURI;
    var fragmentStart = chosenURI.indexOf('#');
    if (fragmentStart !== -1) {
        fragment = chosenURI.substr(fragmentStart);
        preFragment = chosenURI.substr(0, fragmentStart);
    }
    var queryParamsPrefix = preFragment.indexOf('?') === -1 ? '?' : '&';
    var newURI = preFragment + queryParamsPrefix + queryParams.join('&') + fragment;
    return { newURI: newURI };
}
var HttpLink = /** @class */ (function (_super) {
    __extends(HttpLink, _super);
    function HttpLink(opts) {
        return _super.call(this, createHttpLink(opts).request) || this;
    }
    return HttpLink;
}(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["a" /* ApolloLink */]));

//# sourceMappingURL=httpLink.js.map

/***/ }),

/***/ 777:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fallbackHttpConfig; });
/* unused harmony export throwServerError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return parseAndCheckHttpResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkFetcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createSignalIfSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return selectHttpOptionsAndBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return serializeFetchParameter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return selectURI; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var defaultHttpOptions = {
    includeQuery: true,
    includeExtensions: false,
};
var defaultHeaders = {
    // headers are case insensitive (https://stackoverflow.com/a/5259004)
    accept: '*/*',
    'content-type': 'application/json',
};
var defaultOptions = {
    method: 'POST',
};
var fallbackHttpConfig = {
    http: defaultHttpOptions,
    headers: defaultHeaders,
    options: defaultOptions,
};
var throwServerError = function (response, result, message) {
    var error = new Error(message);
    error.response = response;
    error.statusCode = response.status;
    error.result = result;
    throw error;
};
//TODO: when conditional types come in ts 2.8, operations should be a generic type that extends Operation | Array<Operation>
var parseAndCheckHttpResponse = function (operations) { return function (response) {
    return (response
        .text()
        .then(function (bodyText) {
        try {
            return JSON.parse(bodyText);
        }
        catch (err) {
            var parseError = err;
            parseError.response = response;
            parseError.statusCode = response.status;
            parseError.bodyText = bodyText;
            return Promise.reject(parseError);
        }
    })
        .then(function (result) {
        if (response.status >= 300) {
            //Network error
            throwServerError(response, result, "Response not successful: Received status code " + response.status);
        }
        //TODO should really error per response in a Batch based on properties
        //    - could be done in a validation link
        if (!Array.isArray(result) &&
            !result.hasOwnProperty('data') &&
            !result.hasOwnProperty('errors')) {
            //Data error
            throwServerError(response, result, "Server response was missing for query '" + (Array.isArray(operations)
                ? operations.map(function (op) { return op.operationName; })
                : operations.operationName) + "'.");
        }
        return result;
    }));
}; };
var checkFetcher = function (fetcher) {
    if (!fetcher && typeof fetch === 'undefined') {
        var library = 'unfetch';
        if (typeof window === 'undefined')
            library = 'node-fetch';
        throw new Error("\nfetch is not found globally and no fetcher passed, to fix pass a fetch for\nyour environment like https://www.npmjs.com/package/" + library + ".\n\nFor example:\nimport fetch from '" + library + "';\nimport { createHttpLink } from 'apollo-link-http';\n\nconst link = createHttpLink({ uri: '/graphql', fetch: fetch });");
    }
};
var createSignalIfSupported = function () {
    if (typeof AbortController === 'undefined')
        return { controller: false, signal: false };
    var controller = new AbortController();
    var signal = controller.signal;
    return { controller: controller, signal: signal };
};
var selectHttpOptionsAndBody = function (operation, fallbackConfig) {
    var configs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
    }
    var options = __assign({}, fallbackConfig.options, { headers: fallbackConfig.headers, credentials: fallbackConfig.credentials });
    var http = fallbackConfig.http;
    /*
     * use the rest of the configs to populate the options
     * configs later in the list will overwrite earlier fields
     */
    configs.forEach(function (config) {
        options = __assign({}, options, config.options, { headers: __assign({}, options.headers, config.headers) });
        if (config.credentials)
            options.credentials = config.credentials;
        http = __assign({}, http, config.http);
    });
    //The body depends on the http options
    var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
    var body = { operationName: operationName, variables: variables };
    if (http.includeExtensions)
        body.extensions = extensions;
    // not sending the query (i.e persisted queries)
    if (http.includeQuery)
        body.query = Object(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"])(query);
    return {
        options: options,
        body: body,
    };
};
var serializeFetchParameter = function (p, label) {
    var serialized;
    try {
        serialized = JSON.stringify(p);
    }
    catch (e) {
        var parseError = new Error("Network request failed. " + label + " is not serializable: " + e.message);
        parseError.parseError = e;
        throw parseError;
    }
    return serialized;
};
//selects "/graphql" by default
var selectURI = function (operation, fallbackURI) {
    var context = operation.getContext();
    var contextURI = context.uri;
    if (contextURI) {
        return contextURI;
    }
    else if (typeof fallbackURI === 'function') {
        return fallbackURI(operation);
    }
    else {
        return fallbackURI || '/graphql';
    }
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onError; });
/* unused harmony export ErrorLink */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_link__ = __webpack_require__(68);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var onError = function (errorHandler) {
    return new __WEBPACK_IMPORTED_MODULE_0_apollo_link__["a" /* ApolloLink */](function (operation, forward) {
        return new __WEBPACK_IMPORTED_MODULE_0_apollo_link__["b" /* Observable */](function (observer) {
            var sub;
            try {
                sub = forward(operation).subscribe({
                    next: function (result) {
                        if (result.errors) {
                            errorHandler({
                                graphQLErrors: result.errors,
                                response: result,
                                operation: operation,
                            });
                        }
                        observer.next(result);
                    },
                    error: function (networkError) {
                        errorHandler({
                            operation: operation,
                            networkError: networkError,
                            //Network errors can return GraphQL errors on for example a 403
                            graphQLErrors: networkError.result && networkError.result.errors,
                        });
                        observer.error(networkError);
                    },
                    complete: observer.complete.bind(observer),
                });
            }
            catch (e) {
                errorHandler({ networkError: e, operation: operation });
                observer.error(e);
            }
            return function () {
                if (sub)
                    sub.unsubscribe();
            };
        });
    });
};
var ErrorLink = /** @class */ (function (_super) {
    __extends(ErrorLink, _super);
    function ErrorLink(errorHandler) {
        var _this = _super.call(this) || this;
        _this.link = onError(errorHandler);
        return _this;
    }
    ErrorLink.prototype.request = function (operation, forward) {
        return this.link.request(operation, forward);
    };
    return ErrorLink;
}(__WEBPACK_IMPORTED_MODULE_0_apollo_link__["a" /* ApolloLink */]));

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_tag__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_graphql_tag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_subscription_example_components__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_subscription_example_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_apollo_subscription_example_components__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history_createHashHistory__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history_createHashHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_history_createHashHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__containers_app_App__ = __webpack_require__(799);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_scrollToTop_ScrollToTop__ = __webpack_require__(831);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_login_Login__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_pageNotFound_PageNotFound__ = __webpack_require__(994);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_logoutRoute_LogoutRoute__ = __webpack_require__(299);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  {\n    getAllUsers{\n      username\n    }\n  }\n"], ["\n  {\n    getAllUsers{\n      username\n    }\n  }\n"]);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//  weak

// #region imports






// #region import createHistory from hashHistory or BrowserHistory:

// import createHistory            from 'history/createBrowserHistory';
// #endregion



 // not connected to redux (no index.js)

// #endregion

// #region flow types

// #endregion

var history = __WEBPACK_IMPORTED_MODULE_5_history_createHashHistory___default()();

var USERS_QUERY = __WEBPACK_IMPORTED_MODULE_1_graphql_tag___default()(_templateObject);

var UsersQuery = function UsersQuery(_ref) {
  var children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_apollo__["Query"],
    { query: USERS_QUERY },
    function (_ref2) {
      var loading = _ref2.loading,
          error = _ref2.error,
          data = _ref2.data;

      if (loading) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { style: { paddingTop: 20 } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_apollo_subscription_example_components__["Spinner"], { show: true })
      );
      if (error) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "p",
        null,
        "Error"
      );

      return children(data.getAllUsers);
    }
  );
};

var Root = function (_Component) {
  _inherits(Root, _Component);

  function Root() {
    _classCallCheck(this, Root);

    return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
  }

  _createClass(Root, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["d" /* Router */],
        { history: history },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["e" /* Switch */],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* Route */], { exact: true, path: "/login", component: __WEBPACK_IMPORTED_MODULE_8__views_login_Login__["a" /* default */] }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            UsersQuery,
            null,
            function (users) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__containers_app_App__["a" /* default */], { users: users });
            }
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__components_logoutRoute_LogoutRoute__["a" /* default */], { path: "/logout" }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* Route */], { component: __WEBPACK_IMPORTED_MODULE_9__views_pageNotFound_PageNotFound__["a" /* default */] })
        )
      );
    }
  }]);

  return Root;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Root);

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__ = __webpack_require__(780);
/* unused harmony reexport BrowserRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HashRouter__ = __webpack_require__(782);
/* unused harmony reexport HashRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Link__ = __webpack_require__(287);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__Link__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__ = __webpack_require__(783);
/* unused harmony reexport MemoryRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NavLink__ = __webpack_require__(785);
/* unused harmony reexport NavLink */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Prompt__ = __webpack_require__(788);
/* unused harmony reexport Prompt */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Redirect__ = __webpack_require__(789);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Route__ = __webpack_require__(289);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__Route__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Router__ = __webpack_require__(185);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__Router__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__StaticRouter__ = __webpack_require__(794);
/* unused harmony reexport StaticRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Switch__ = __webpack_require__(795);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_10__Switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__matchPath__ = __webpack_require__(796);
/* unused harmony reexport matchPath */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__withRouter__ = __webpack_require__(797);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_12__withRouter__["a"]; });



























/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory__ = __webpack_require__(781);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(185);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = function (_React$Component) {
  _inherits(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  BrowserRouter.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!this.props.history, '<BrowserRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { BrowserRouter as Router }`.');
  };

  BrowserRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Router__["a" /* default */], { history: this.history, children: this.props.children });
  };

  return BrowserRouter;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

BrowserRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  forceRefresh: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  keyLength: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node
};


/* unused harmony default export */ var _unused_webpack_default_export = (BrowserRouter);

/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(15);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(18);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(183);

var _PathUtils = __webpack_require__(94);

var _createTransitionManager = __webpack_require__(184);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(285);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = (0, _DOMUtils.supportsHistory)();
  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + (0, _PathUtils.createPath)(location);
  };

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createBrowserHistory;

/***/ }),

/***/ 782:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createHashHistory__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createHashHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_createHashHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(185);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter = function (_React$Component) {
  _inherits(HashRouter, _React$Component);

  function HashRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_3_history_createHashHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  HashRouter.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!this.props.history, '<HashRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { HashRouter as Router }`.');
  };

  HashRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Router__["a" /* default */], { history: this.history, children: this.props.children });
  };

  return HashRouter;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

HashRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  hashType: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOf(['hashbang', 'noslash', 'slash']),
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node
};


/* unused harmony default export */ var _unused_webpack_default_export = (HashRouter);

/***/ }),

/***/ 783:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_MemoryRouter__ = __webpack_require__(288);
// Written in this round about way for babel-transform-imports


/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_MemoryRouter__["a" /* default */]);

/***/ }),

/***/ 785:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Route__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(287);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
var NavLink = function NavLink(_ref) {
  var to = _ref.to,
      exact = _ref.exact,
      strict = _ref.strict,
      location = _ref.location,
      activeClassName = _ref.activeClassName,
      className = _ref.className,
      activeStyle = _ref.activeStyle,
      style = _ref.style,
      getIsActive = _ref.isActive,
      ariaCurrent = _ref.ariaCurrent,
      rest = _objectWithoutProperties(_ref, ['to', 'exact', 'strict', 'location', 'activeClassName', 'className', 'activeStyle', 'style', 'isActive', 'ariaCurrent']);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Route__["a" /* default */], {
    path: (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' ? to.pathname : to,
    exact: exact,
    strict: strict,
    location: location,
    children: function children(_ref2) {
      var location = _ref2.location,
          match = _ref2.match;

      var isActive = !!(getIsActive ? getIsActive(match, location) : match);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], _extends({
        to: to,
        className: isActive ? [className, activeClassName].filter(function (i) {
          return i;
        }).join(' ') : className,
        style: isActive ? _extends({}, style, activeStyle) : style,
        'aria-current': isActive && ariaCurrent
      }, rest));
    }
  });
};

NavLink.propTypes = {
  to: __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */].propTypes.to,
  exact: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  strict: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  activeClassName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  activeStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  isActive: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  ariaCurrent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['page', 'step', 'location', 'true'])
};

NavLink.defaultProps = {
  activeClassName: 'active',
  ariaCurrent: 'true'
};

/* unused harmony default export */ var _unused_webpack_default_export = (NavLink);

/***/ }),

/***/ 788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Prompt__ = __webpack_require__(290);
// Written in this round about way for babel-transform-imports


/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Prompt__["a" /* default */]);

/***/ }),

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Redirect__ = __webpack_require__(291);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Redirect__["a" /* default */]);

/***/ }),

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_StaticRouter__ = __webpack_require__(293);
// Written in this round about way for babel-transform-imports


/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_StaticRouter__["a" /* default */]);

/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Switch__ = __webpack_require__(294);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Switch__["a" /* default */]);

/***/ }),

/***/ 796:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_matchPath__ = __webpack_require__(122);
// Written in this round about way for babel-transform-imports


/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_matchPath__["a" /* default */]);

/***/ }),

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_withRouter__ = __webpack_require__(295);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_withRouter__["a" /* default */]);

/***/ }),

/***/ 798:
/***/ (function(module, exports) {

module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=20)}([function(t,e,n){t.exports=n(36)()},function(t,e,n){"use strict";t.exports=n(39)},function(t,e,n){"use strict";t.exports=function(){}},function(t,e,n){var r;
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var n={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=typeof r;if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r))t.push(i.apply(null,r));else if("object"===o)for(var a in r)n.call(r,a)&&r[a]&&t.push(a)}}return t.join(" ")}void 0!==t&&t.exports?t.exports=i:void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r)}()},function(t,e,n){"use strict";t.exports=function(t,e,n,r,i,o,a,l){if(!t){var s;if(void 0===e)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var p=[n,r,i,o,a,l],c=0;(s=new Error(e.replace(/%s/g,function(){return p[c++]}))).name="Invariant Violation"}throw s.framesToPop=1,s}}},function(t,e,n){"use strict";e.__esModule=!0;e.addLeadingSlash=function(t){return"/"===t.charAt(0)?t:"/"+t},e.stripLeadingSlash=function(t){return"/"===t.charAt(0)?t.substr(1):t};var r=e.hasBasename=function(t,e){return new RegExp("^"+e+"(\\/|\\?|#|$)","i").test(t)};e.stripBasename=function(t,e){return r(t,e)?t.substr(e.length):t},e.stripTrailingSlash=function(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t},e.parsePath=function(t){var e=t||"/",n="",r="",i=e.indexOf("#");-1!==i&&(r=e.substr(i),e=e.substr(0,i));var o=e.indexOf("?");return-1!==o&&(n=e.substr(o),e=e.substr(0,o)),{pathname:e,search:"?"===n?"":n,hash:"#"===r?"":r}},e.createPath=function(t){var e=t.pathname,n=t.search,r=t.hash,i=e||"/";return n&&"?"!==n&&(i+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(i+="#"===r.charAt(0)?r:"#"+r),i}},function(t,e,n){var r,i,o={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===i&&(i=r.apply(this,arguments)),i}),l=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),s=null,p=0,c=[],d=n(30);function u(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=o[r.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(x(r.parts[a],e))}else{var l=[];for(a=0;a<r.parts.length;a++)l.push(x(r.parts[a],e));o[r.id]={id:r.id,refs:1,parts:l}}}}function g(t,e){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=e.base?o[0]+e.base:o[0],l={css:o[1],media:o[2],sourceMap:o[3]};r[a]?r[a].parts.push(l):n.push(r[a]={id:a,parts:[l]})}return n}function m(t,e){var n=l(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),c.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=l(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,i)}}function f(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function h(t){var e=document.createElement("style");return t.attrs.type="text/css",_(e,t.attrs),m(t,e),e}function _(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function x(t,e){var n,r,i,o;if(e.transform&&t.css){if(!(o=e.transform(t.css)))return function(){};t.css=o}if(e.singleton){var a=p++;n=s||(s=h(e)),r=v.bind(null,n,a,!1),i=v.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",_(e,t.attrs),m(t,e),e}(e),r=function(t,e,n){var r=n.css,i=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||o)&&(r=d(r));i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([r],{type:"text/css"}),l=t.href;t.href=URL.createObjectURL(a),l&&URL.revokeObjectURL(l)}.bind(null,n,e),i=function(){f(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),i=function(){f(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=g(t,e);return u(n,e),function(t){for(var r=[],i=0;i<n.length;i++){var a=n[i];(l=o[a.id]).refs--,r.push(l)}t&&u(g(t,e),e);for(i=0;i<r.length;i++){var l;if(0===(l=r[i]).refs){for(var s=0;s<l.parts.length;s++)l.parts[s]();delete o[l.id]}}}};var b,y=(b=[],function(t,e){return b[t]=e,b.filter(Boolean).join("\n")});function v(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),o=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(o).concat([i]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){"use strict";e.__esModule=!0;var r,i=n(2),o=(r=i)&&r.__esModule?r:{default:r};e.default=function(){var t=null,e=[];return{setPrompt:function(e){return(0,o.default)(null==t,"A history supports only one prompt at a time"),t=e,function(){t===e&&(t=null)}},confirmTransitionTo:function(e,n,r,i){if(null!=t){var a="function"==typeof t?t(e,n):t;"string"==typeof a?"function"==typeof r?r(a,i):((0,o.default)(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),i(!0)):i(!1!==a)}else i(!0)},appendListener:function(t){var n=!0,r=function(){n&&t.apply(void 0,arguments)};return e.push(r),function(){n=!1,e=e.filter(function(t){return t!==r})}},notifyListeners:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];e.forEach(function(t){return t.apply(void 0,n)})}}}},function(t,e,n){"use strict";e.__esModule=!0,e.locationsAreEqual=e.createLocation=void 0;var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=l(n(11)),o=l(n(10)),a=n(5);function l(t){return t&&t.__esModule?t:{default:t}}e.createLocation=function(t,e,n,o){var l=void 0;"string"==typeof t?(l=(0,a.parsePath)(t)).state=e:(void 0===(l=r({},t)).pathname&&(l.pathname=""),l.search?"?"!==l.search.charAt(0)&&(l.search="?"+l.search):l.search="",l.hash?"#"!==l.hash.charAt(0)&&(l.hash="#"+l.hash):l.hash="",void 0!==e&&void 0===l.state&&(l.state=e));try{l.pathname=decodeURI(l.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+l.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return n&&(l.key=n),o?l.pathname?"/"!==l.pathname.charAt(0)&&(l.pathname=(0,i.default)(l.pathname,o.pathname)):l.pathname=o.pathname:l.pathname||(l.pathname="/"),l},e.locationsAreEqual=function(t,e){return t.pathname===e.pathname&&t.search===e.search&&t.hash===e.hash&&t.key===e.key&&(0,o.default)(t.state,e.state)}},function(t,e,n){"use strict";n.r(e);var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function t(e,n){if(e===n)return!0;if(null==e||null==n)return!1;if(Array.isArray(e))return Array.isArray(n)&&e.length===n.length&&e.every(function(e,r){return t(e,n[r])});var i=void 0===e?"undefined":r(e);if(i!==(void 0===n?"undefined":r(n)))return!1;if("object"===i){var o=e.valueOf(),a=n.valueOf();if(o!==e||a!==n)return t(o,a);var l=Object.keys(e),s=Object.keys(n);return l.length===s.length&&l.every(function(r){return t(e[r],n[r])})}return!1}},function(t,e,n){"use strict";function r(t){return"/"===t.charAt(0)}function i(t,e){for(var n=e,r=n+1,i=t.length;r<i;n+=1,r+=1)t[n]=t[r];t.pop()}n.r(e),e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=t&&t.split("/")||[],o=e&&e.split("/")||[],a=t&&r(t),l=e&&r(e),s=a||l;if(t&&r(t)?o=n:n.length&&(o.pop(),o=o.concat(n)),!o.length)return"/";var p=void 0;if(o.length){var c=o[o.length-1];p="."===c||".."===c||""===c}else p=!1;for(var d=0,u=o.length;u>=0;u--){var g=o[u];"."===g?i(o,u):".."===g?(i(o,u),d++):d&&(i(o,u),d--)}if(!s)for(;d--;d)o.unshift("..");!s||""===o[0]||o[0]&&r(o[0])||o.unshift("");var m=o.join("/");return p&&"/"!==m.substr(-1)&&(m+="/"),m}},function(t,e,n){"use strict";e.__esModule=!0;e.canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement),e.addEventListener=function(t,e,n){return t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent("on"+e,n)},e.removeEventListener=function(t,e,n){return t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent("on"+e,n)},e.getConfirmation=function(t,e){return e(window.confirm(t))},e.supportsHistory=function(){var t=window.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)},e.supportsPopStateOnHashChange=function(){return-1===window.navigator.userAgent.indexOf("Trident")},e.supportsGoWithoutReloadUsingHash=function(){return-1===window.navigator.userAgent.indexOf("Firefox")},e.isExtraneousPopstateEvent=function(t){return void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS")}},function(t,e,n){"use strict";function r(t){return function(){return t}}var i=function(){};i.thatReturns=r,i.thatReturnsFalse=r(!1),i.thatReturnsTrue=r(!0),i.thatReturnsNull=r(null),i.thatReturnsThis=function(){return this},i.thatReturnsArgument=function(t){return t},t.exports=i},function(t,e,n){(function(t){var n;n=function(){var t=null,e={};o("monochrome",null,[[0,0],[100,0]]),o("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),o("orange",[19,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),o("yellow",[47,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),o("green",[63,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),o("blue",[179,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),o("purple",[258,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),o("pink",[283,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]);var n=function(o){if(void 0!==(o=o||{}).seed&&null!==o.seed&&o.seed===parseInt(o.seed,10))t=o.seed;else if("string"==typeof o.seed)t=function(t){for(var e=0,n=0;n!==t.length&&!(e>=Number.MAX_SAFE_INTEGER);n++)e+=t.charCodeAt(n);return e}(o.seed);else{if(void 0!==o.seed&&null!==o.seed)throw new TypeError("The seed value must be an integer or string");t=null}var s,p,c;if(null!==o.count&&void 0!==o.count){var d=o.count,u=[];for(o.count=null;d>u.length;)t&&o.seed&&(o.seed+=1),u.push(n(o));return o.count=d,u}return s=function(t){var n=i(function(t){if("number"==typeof parseInt(t)){var n=parseInt(t);if(n<360&&n>0)return[n,n]}if("string"==typeof t)if(e[t]){var r=e[t];if(r.hueRange)return r.hueRange}else if(t.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)){var i=function(t){t=3===(t=t.replace(/^#/,"")).length?t.replace(/(.)/g,"$1$1"):t;var e=parseInt(t.substr(0,2),16)/255,n=parseInt(t.substr(2,2),16)/255,r=parseInt(t.substr(4,2),16)/255,i=Math.max(e,n,r),o=i-Math.min(e,n,r),a=i?o/i:0;switch(i){case e:return[(n-r)/o%6*60||0,a,i];case n:return[60*((r-e)/o+2)||0,a,i];case r:return[60*((e-n)/o+4)||0,a,i]}}(t)[0];return[i,i]}return[0,360]}(t.hue));n<0&&(n=360+n);return n}(o),p=function(t,e){if("monochrome"===e.hue)return 0;if("random"===e.luminosity)return i([0,100]);var n=function(t){return r(t).saturationRange}(t),o=n[0],a=n[1];switch(e.luminosity){case"bright":o=55;break;case"dark":o=a-10;break;case"light":a=55}return i([o,a])}(s,o),c=function(t,e,n){var o=function(t,e){for(var n=r(t).lowerBounds,i=0;i<n.length-1;i++){var o=n[i][0],a=n[i][1],l=n[i+1][0],s=n[i+1][1];if(e>=o&&e<=l){var p=(s-a)/(l-o),c=a-p*o;return p*e+c}}return 0}(t,e),a=100;switch(n.luminosity){case"dark":a=o+20;break;case"light":o=(a+o)/2;break;case"random":o=0,a=100}return i([o,a])}(s,p,o),function(t,e){switch(e.format){case"hsvArray":return t;case"hslArray":return l(t);case"hsl":var n=l(t);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var r=l(t),i=e.alpha||Math.random();return"hsla("+r[0]+", "+r[1]+"%, "+r[2]+"%, "+i+")";case"rgbArray":return a(t);case"rgb":var o=a(t);return"rgb("+o.join(", ")+")";case"rgba":var s=a(t),i=e.alpha||Math.random();return"rgba("+s.join(", ")+", "+i+")";default:return function(t){var e=a(t);function n(t){var e=t.toString(16);return 1==e.length?"0"+e:e}return"#"+n(e[0])+n(e[1])+n(e[2])}(t)}}([s,p,c],o)};function r(t){for(var n in t>=334&&t<=360&&(t-=360),e){var r=e[n];if(r.hueRange&&t>=r.hueRange[0]&&t<=r.hueRange[1])return e[n]}return"Color not found"}function i(e){if(null===t)return Math.floor(e[0]+Math.random()*(e[1]+1-e[0]));var n=e[1]||1,r=e[0]||0,i=(t=(9301*t+49297)%233280)/233280;return Math.floor(r+i*(n-r))}function o(t,n,r){var i=r[0][0],o=r[r.length-1][0],a=r[r.length-1][1],l=r[0][1];e[t]={hueRange:n,lowerBounds:r,saturationRange:[i,o],brightnessRange:[a,l]}}function a(t){var e=t[0];0===e&&(e=1),360===e&&(e=359),e/=360;var n=t[1]/100,r=t[2]/100,i=Math.floor(6*e),o=6*e-i,a=r*(1-n),l=r*(1-o*n),s=r*(1-(1-o)*n),p=256,c=256,d=256;switch(i){case 0:p=r,c=s,d=a;break;case 1:p=l,c=r,d=a;break;case 2:p=a,c=r,d=s;break;case 3:p=a,c=l,d=r;break;case 4:p=s,c=a,d=r;break;case 5:p=r,c=a,d=l}var u=[Math.floor(255*p),Math.floor(255*c),Math.floor(255*d)];return u}function l(t){var e=t[0],n=t[1]/100,r=t[2]/100,i=(2-n)*r;return[e,Math.round(n*r/(i<1?i:2-i)*1e4)/100,i/2*100]}return n}(),"object"==typeof t&&t&&t.exports&&(e=t.exports=n),e.randomColor=n}).call(this,n(25)(t))},function(t,e,n){t.exports=function(){"use strict";var t={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},e={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},n=Object.defineProperty,r=Object.getOwnPropertyNames,i=Object.getOwnPropertySymbols,o=Object.getOwnPropertyDescriptor,a=Object.getPrototypeOf,l=a&&a(Object);return function s(p,c,d){if("string"!=typeof c){if(l){var u=a(c);u&&u!==l&&s(p,u,d)}var g=r(c);i&&(g=g.concat(i(c)));for(var m=0;m<g.length;++m){var f=g[m];if(!(t[f]||e[f]||d&&d[f])){var h=o(c,f);try{n(p,f,h)}catch(t){}}}return p}return p}}()},function(t,e,n){var r=n(33);t.exports=g,t.exports.parse=o,t.exports.compile=function(t,e){return l(o(t,e))},t.exports.tokensToFunction=l,t.exports.tokensToRegExp=u;var i=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function o(t,e){for(var n,r=[],o=0,a=0,l="",c=e&&e.delimiter||"/";null!=(n=i.exec(t));){var d=n[0],u=n[1],g=n.index;if(l+=t.slice(a,g),a=g+d.length,u)l+=u[1];else{var m=t[a],f=n[2],h=n[3],_=n[4],x=n[5],b=n[6],y=n[7];l&&(r.push(l),l="");var v=null!=f&&null!=m&&m!==f,C="+"===b||"*"===b,w="?"===b||"*"===b,k=n[2]||c,M=_||x;r.push({name:h||o++,prefix:f||"",delimiter:k,optional:w,repeat:C,partial:v,asterisk:!!y,pattern:M?p(M):y?".*":"[^"+s(k)+"]+?"})}}return a<t.length&&(l+=t.substr(a)),l&&r.push(l),r}function a(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function l(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(n,i){for(var o="",l=n||{},s=(i||{}).pretty?a:encodeURIComponent,p=0;p<t.length;p++){var c=t[p];if("string"!=typeof c){var d,u=l[c.name];if(null==u){if(c.optional){c.partial&&(o+=c.prefix);continue}throw new TypeError('Expected "'+c.name+'" to be defined')}if(r(u)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+JSON.stringify(u)+"`");if(0===u.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var g=0;g<u.length;g++){if(d=s(u[g]),!e[p].test(d))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+JSON.stringify(d)+"`");o+=(0===g?c.prefix:c.delimiter)+d}}else{if(d=c.asterisk?encodeURI(u).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}):s(u),!e[p].test(d))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+d+'"');o+=c.prefix+d}}else o+=c}return o}}function s(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function p(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function c(t,e){return t.keys=e,t}function d(t){return t.sensitive?"":"i"}function u(t,e,n){r(e)||(n=e||n,e=[]);for(var i=(n=n||{}).strict,o=!1!==n.end,a="",l=0;l<t.length;l++){var p=t[l];if("string"==typeof p)a+=s(p);else{var u=s(p.prefix),g="(?:"+p.pattern+")";e.push(p),p.repeat&&(g+="(?:"+u+g+")*"),a+=g=p.optional?p.partial?u+"("+g+")?":"(?:"+u+"("+g+"))?":u+"("+g+")"}}var m=s(n.delimiter||"/"),f=a.slice(-m.length)===m;return i||(a=(f?a.slice(0,-m.length):a)+"(?:"+m+"(?=$))?"),a+=o?"$":i&&f?"":"(?="+m+"|$)",c(new RegExp("^"+a,d(n)),e)}function g(t,e,n){return r(e)||(n=e||n,e=[]),n=n||{},t instanceof RegExp?function(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return c(t,e)}(t,e):r(t)?function(t,e,n){for(var r=[],i=0;i<t.length;i++)r.push(g(t[i],e,n).source);return c(new RegExp("(?:"+r.join("|")+")",d(n)),e)}(t,e,n):function(t,e,n){return u(o(t,n),e,n)}(t,e,n)}},function(t,e,n){"use strict";e.__esModule=!0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=p(n(2)),a=n(5),l=n(9),s=p(n(8));function p(t){return t&&t.__esModule?t:{default:t}}var c=function(t,e,n){return Math.min(Math.max(t,e),n)};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.getUserConfirmation,n=t.initialEntries,p=void 0===n?["/"]:n,d=t.initialIndex,u=void 0===d?0:d,g=t.keyLength,m=void 0===g?6:g,f=(0,s.default)(),h=function(t){i(C,t),C.length=C.entries.length,f.notifyListeners(C.location,C.action)},_=function(){return Math.random().toString(36).substr(2,m)},x=c(u,0,p.length-1),b=p.map(function(t){return"string"==typeof t?(0,l.createLocation)(t,void 0,_()):(0,l.createLocation)(t,void 0,t.key||_())}),y=a.createPath,v=function(t){var n=c(C.index+t,0,C.entries.length-1),r=C.entries[n];f.confirmTransitionTo(r,"POP",e,function(t){t?h({action:"POP",location:r,index:n}):h()})},C={length:b.length,action:"POP",location:b[x],index:x,entries:b,createHref:y,push:function(t,n){(0,o.default)(!("object"===(void 0===t?"undefined":r(t))&&void 0!==t.state&&void 0!==n),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var i=(0,l.createLocation)(t,n,_(),C.location);f.confirmTransitionTo(i,"PUSH",e,function(t){if(t){var e=C.index+1,n=C.entries.slice(0);n.length>e?n.splice(e,n.length-e,i):n.push(i),h({action:"PUSH",location:i,index:e,entries:n})}})},replace:function(t,n){(0,o.default)(!("object"===(void 0===t?"undefined":r(t))&&void 0!==t.state&&void 0!==n),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var i=(0,l.createLocation)(t,n,_(),C.location);f.confirmTransitionTo(i,"REPLACE",e,function(t){t&&(C.entries[C.index]=i,h({action:"REPLACE",location:i}))})},go:v,goBack:function(){return v(-1)},goForward:function(){return v(1)},canGo:function(t){var e=C.index+t;return e>=0&&e<C.entries.length},block:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return f.setPrompt(t)},listen:function(t){return f.appendListener(t)}};return C}},function(t,e,n){"use strict";e.__esModule=!0;var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=c(n(2)),o=c(n(4)),a=n(9),l=n(5),s=c(n(8)),p=n(12);function c(t){return t&&t.__esModule?t:{default:t}}var d={hashbang:{encodePath:function(t){return"!"===t.charAt(0)?t:"!/"+(0,l.stripLeadingSlash)(t)},decodePath:function(t){return"!"===t.charAt(0)?t.substr(1):t}},noslash:{encodePath:l.stripLeadingSlash,decodePath:l.addLeadingSlash},slash:{encodePath:l.addLeadingSlash,decodePath:l.addLeadingSlash}},u=function(){var t=window.location.href,e=t.indexOf("#");return-1===e?"":t.substring(e+1)},g=function(t){var e=window.location.href.indexOf("#");window.location.replace(window.location.href.slice(0,e>=0?e:0)+"#"+t)};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,o.default)(p.canUseDOM,"Hash history needs a DOM");var e=window.history,n=(0,p.supportsGoWithoutReloadUsingHash)(),c=t.getUserConfirmation,m=void 0===c?p.getConfirmation:c,f=t.hashType,h=void 0===f?"slash":f,_=t.basename?(0,l.stripTrailingSlash)((0,l.addLeadingSlash)(t.basename)):"",x=d[h],b=x.encodePath,y=x.decodePath,v=function(){var t=y(u());return(0,i.default)(!_||(0,l.hasBasename)(t,_),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+t+'" to begin with "'+_+'".'),_&&(t=(0,l.stripBasename)(t,_)),(0,a.createLocation)(t)},C=(0,s.default)(),w=function(t){r(q,t),q.length=e.length,C.notifyListeners(q.location,q.action)},k=!1,M=null,L=function(){var t=u(),e=b(t);if(t!==e)g(e);else{var n=v(),r=q.location;if(!k&&(0,a.locationsAreEqual)(r,n))return;if(M===(0,l.createPath)(n))return;M=null,O(n)}},O=function(t){k?(k=!1,w()):C.confirmTransitionTo(t,"POP",m,function(e){e?w({action:"POP",location:t}):j(t)})},j=function(t){var e=q.location,n=T.lastIndexOf((0,l.createPath)(e));-1===n&&(n=0);var r=T.lastIndexOf((0,l.createPath)(t));-1===r&&(r=0);var i=n-r;i&&(k=!0,P(i))},R=u(),E=b(R);R!==E&&g(E);var S=v(),T=[(0,l.createPath)(S)],P=function(t){(0,i.default)(n,"Hash history go(n) causes a full page reload in this browser"),e.go(t)},B=0,N=function(t){1===(B+=t)?(0,p.addEventListener)(window,"hashchange",L):0===B&&(0,p.removeEventListener)(window,"hashchange",L)},z=!1,q={length:e.length,action:"POP",location:S,createHref:function(t){return"#"+b(_+(0,l.createPath)(t))},push:function(t,e){(0,i.default)(void 0===e,"Hash history cannot push state; it is ignored");var n=(0,a.createLocation)(t,void 0,void 0,q.location);C.confirmTransitionTo(n,"PUSH",m,function(t){if(t){var e=(0,l.createPath)(n),r=b(_+e);if(u()!==r){M=e,function(t){window.location.hash=t}(r);var o=T.lastIndexOf((0,l.createPath)(q.location)),a=T.slice(0,-1===o?0:o+1);a.push(e),T=a,w({action:"PUSH",location:n})}else(0,i.default)(!1,"Hash history cannot PUSH the same path; a new entry will not be added to the history stack"),w()}})},replace:function(t,e){(0,i.default)(void 0===e,"Hash history cannot replace state; it is ignored");var n=(0,a.createLocation)(t,void 0,void 0,q.location);C.confirmTransitionTo(n,"REPLACE",m,function(t){if(t){var e=(0,l.createPath)(n),r=b(_+e);u()!==r&&(M=e,g(r));var i=T.indexOf((0,l.createPath)(q.location));-1!==i&&(T[i]=e),w({action:"REPLACE",location:n})}})},go:P,goBack:function(){return P(-1)},goForward:function(){return P(1)},block:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=C.setPrompt(t);return z||(N(1),z=!0),function(){return z&&(z=!1,N(-1)),e()}},listen:function(t){var e=C.appendListener(t);return N(1),function(){N(-1),e()}}};return q}},function(t,e,n){"use strict";e.__esModule=!0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=d(n(2)),a=d(n(4)),l=n(9),s=n(5),p=d(n(8)),c=n(12);function d(t){return t&&t.__esModule?t:{default:t}}var u=function(){try{return window.history.state||{}}catch(t){return{}}};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,a.default)(c.canUseDOM,"Browser history needs a DOM");var e=window.history,n=(0,c.supportsHistory)(),d=!(0,c.supportsPopStateOnHashChange)(),g=t.forceRefresh,m=void 0!==g&&g,f=t.getUserConfirmation,h=void 0===f?c.getConfirmation:f,_=t.keyLength,x=void 0===_?6:_,b=t.basename?(0,s.stripTrailingSlash)((0,s.addLeadingSlash)(t.basename)):"",y=function(t){var e=t||{},n=e.key,r=e.state,i=window.location,a=i.pathname+i.search+i.hash;return(0,o.default)(!b||(0,s.hasBasename)(a,b),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+a+'" to begin with "'+b+'".'),b&&(a=(0,s.stripBasename)(a,b)),(0,l.createLocation)(a,r,n)},v=function(){return Math.random().toString(36).substr(2,x)},C=(0,p.default)(),w=function(t){i(z,t),z.length=e.length,C.notifyListeners(z.location,z.action)},k=function(t){(0,c.isExtraneousPopstateEvent)(t)||O(y(t.state))},M=function(){O(y(u()))},L=!1,O=function(t){L?(L=!1,w()):C.confirmTransitionTo(t,"POP",h,function(e){e?w({action:"POP",location:t}):j(t)})},j=function(t){var e=z.location,n=E.indexOf(e.key);-1===n&&(n=0);var r=E.indexOf(t.key);-1===r&&(r=0);var i=n-r;i&&(L=!0,T(i))},R=y(u()),E=[R.key],S=function(t){return b+(0,s.createPath)(t)},T=function(t){e.go(t)},P=0,B=function(t){1===(P+=t)?((0,c.addEventListener)(window,"popstate",k),d&&(0,c.addEventListener)(window,"hashchange",M)):0===P&&((0,c.removeEventListener)(window,"popstate",k),d&&(0,c.removeEventListener)(window,"hashchange",M))},N=!1,z={length:e.length,action:"POP",location:R,createHref:S,push:function(t,i){(0,o.default)(!("object"===(void 0===t?"undefined":r(t))&&void 0!==t.state&&void 0!==i),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var a=(0,l.createLocation)(t,i,v(),z.location);C.confirmTransitionTo(a,"PUSH",h,function(t){if(t){var r=S(a),i=a.key,l=a.state;if(n)if(e.pushState({key:i,state:l},null,r),m)window.location.href=r;else{var s=E.indexOf(z.location.key),p=E.slice(0,-1===s?0:s+1);p.push(a.key),E=p,w({action:"PUSH",location:a})}else(0,o.default)(void 0===l,"Browser history cannot push state in browsers that do not support HTML5 history"),window.location.href=r}})},replace:function(t,i){(0,o.default)(!("object"===(void 0===t?"undefined":r(t))&&void 0!==t.state&&void 0!==i),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var a=(0,l.createLocation)(t,i,v(),z.location);C.confirmTransitionTo(a,"REPLACE",h,function(t){if(t){var r=S(a),i=a.key,l=a.state;if(n)if(e.replaceState({key:i,state:l},null,r),m)window.location.replace(r);else{var s=E.indexOf(z.location.key);-1!==s&&(E[s]=a.key),w({action:"REPLACE",location:a})}else(0,o.default)(void 0===l,"Browser history cannot replace state in browsers that do not support HTML5 history"),window.location.replace(r)}})},go:T,goBack:function(){return T(-1)},goForward:function(){return T(1)},block:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=C.setPrompt(t);return N||(B(1),N=!0),function(){return N&&(N=!1,B(-1)),e()}},listen:function(t){var e=C.appendListener(t);return B(1),function(){B(-1),e()}}};return z}},function(t,e,n){"use strict";n.r(e);var r=n(1),i=n.n(r),o=n(2),a=n.n(o),l=n(0),s=n.n(l),p=n(19),c=n.n(p),d=n(4),u=n.n(d),g=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};function m(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var f=function(t){function e(){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=m(this,t.call.apply(t,[this].concat(o))),r.state={match:r.computeMatch(r.props.history.location.pathname)},m(r,n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.getChildContext=function(){return{router:g({},this.context.router,{history:this.props.history,route:{location:this.props.history.location,match:this.state.match}})}},e.prototype.computeMatch=function(t){return{path:"/",url:"/",params:{},isExact:"/"===t}},e.prototype.componentWillMount=function(){var t=this,e=this.props,n=e.children,r=e.history;u()(null==n||1===i.a.Children.count(n),"A <Router> may have only one child element"),this.unlisten=r.listen(function(){t.setState({match:t.computeMatch(r.location.pathname)})})},e.prototype.componentWillReceiveProps=function(t){a()(this.props.history===t.history,"You cannot change <Router history>")},e.prototype.componentWillUnmount=function(){this.unlisten()},e.prototype.render=function(){var t=this.props.children;return t?i.a.Children.only(t):null},e}(i.a.Component);f.propTypes={history:s.a.object.isRequired,children:s.a.node},f.contextTypes={router:s.a.object},f.childContextTypes={router:s.a.object.isRequired};var h=f,_=h;function x(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var b=function(t){function e(){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=x(this,t.call.apply(t,[this].concat(o))),r.history=c()(r.props),x(r,n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.componentWillMount=function(){a()(!this.props.history,"<BrowserRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { BrowserRouter as Router }`.")},e.prototype.render=function(){return i.a.createElement(_,{history:this.history,children:this.props.children})},e}(i.a.Component);b.propTypes={basename:s.a.string,forceRefresh:s.a.bool,getUserConfirmation:s.a.func,keyLength:s.a.number,children:s.a.node};var y=b,v=n(18),C=n.n(v);function w(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var k=function(t){function e(){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=w(this,t.call.apply(t,[this].concat(o))),r.history=C()(r.props),w(r,n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.componentWillMount=function(){a()(!this.props.history,"<HashRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { HashRouter as Router }`.")},e.prototype.render=function(){return i.a.createElement(_,{history:this.history,children:this.props.children})},e}(i.a.Component);k.propTypes={basename:s.a.string,getUserConfirmation:s.a.func,hashType:s.a.oneOf(["hashbang","noslash","slash"]),children:s.a.node};var M=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};function L(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var O=function(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)},j=function(t){function e(){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=L(this,t.call.apply(t,[this].concat(o))),r.handleClick=function(t){if(r.props.onClick&&r.props.onClick(t),!t.defaultPrevented&&0===t.button&&!r.props.target&&!O(t)){t.preventDefault();var e=r.context.router.history,n=r.props,i=n.replace,o=n.to;i?e.replace(o):e.push(o)}},L(r,n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.render=function(){var t=this.props,e=(t.replace,t.to),n=t.innerRef,r=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(t,["replace","to","innerRef"]);u()(this.context.router,"You should not use <Link> outside a <Router>");var o=this.context.router.history.createHref("string"==typeof e?{pathname:e}:e);return i.a.createElement("a",M({},r,{onClick:this.handleClick,href:o,ref:n}))},e}(i.a.Component);j.propTypes={onClick:s.a.func,target:s.a.string,replace:s.a.bool,to:s.a.oneOfType([s.a.string,s.a.object]).isRequired,innerRef:s.a.oneOfType([s.a.string,s.a.func])},j.defaultProps={replace:!1},j.contextTypes={router:s.a.shape({history:s.a.shape({push:s.a.func.isRequired,replace:s.a.func.isRequired,createHref:s.a.func.isRequired}).isRequired}).isRequired};var R=j,E=n(17),S=n.n(E);function T(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var P=function(t){function e(){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=T(this,t.call.apply(t,[this].concat(o))),r.history=S()(r.props),T(r,n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.componentWillMount=function(){a()(!this.props.history,"<MemoryRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { MemoryRouter as Router }`.")},e.prototype.render=function(){return i.a.createElement(h,{history:this.history,children:this.props.children})},e}(i.a.Component);P.propTypes={initialEntries:s.a.array,initialIndex:s.a.number,getUserConfirmation:s.a.func,keyLength:s.a.number,children:s.a.node};var B=n(16),N=n.n(B),z={},q=0,F=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"string"==typeof e&&(e={path:e});var n=e,r=n.path,i=void 0===r?"/":r,o=n.exact,a=void 0!==o&&o,l=n.strict,s=void 0!==l&&l,p=n.sensitive,c=function(t,e){var n=""+e.end+e.strict+e.sensitive,r=z[n]||(z[n]={});if(r[t])return r[t];var i=[],o={re:N()(t,i,e),keys:i};return q<1e4&&(r[t]=o,q++),o}(i,{end:a,strict:s,sensitive:void 0!==p&&p}),d=c.re,u=c.keys,g=d.exec(t);if(!g)return null;var m=g[0],f=g.slice(1),h=t===m;return a&&!h?null:{path:i,url:"/"===i&&""===m?"/":m,isExact:h,params:u.reduce(function(t,e,n){return t[e.name]=f[n],t},{})}},A=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};function D(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var I=function(t){return 0===i.a.Children.count(t)},W=function(t){function e(){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=D(this,t.call.apply(t,[this].concat(o))),r.state={match:r.computeMatch(r.props,r.context.router)},D(r,n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.getChildContext=function(){return{router:A({},this.context.router,{route:{location:this.props.location||this.context.router.route.location,match:this.state.match}})}},e.prototype.computeMatch=function(t,e){var n=t.computedMatch,r=t.location,i=t.path,o=t.strict,a=t.exact,l=t.sensitive;if(n)return n;u()(e,"You should not use <Route> or withRouter() outside a <Router>");var s=e.route,p=(r||s.location).pathname;return i?F(p,{path:i,strict:o,exact:a,sensitive:l}):s.match},e.prototype.componentWillMount=function(){a()(!(this.props.component&&this.props.render),"You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"),a()(!(this.props.component&&this.props.children&&!I(this.props.children)),"You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored"),a()(!(this.props.render&&this.props.children&&!I(this.props.children)),"You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored")},e.prototype.componentWillReceiveProps=function(t,e){a()(!(t.location&&!this.props.location),'<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'),a()(!(!t.location&&this.props.location),'<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'),this.setState({match:this.computeMatch(t,e.router)})},e.prototype.render=function(){var t=this.state.match,e=this.props,n=e.children,r=e.component,o=e.render,a=this.context.router,l=a.history,s=a.route,p=a.staticContext,c={match:t,location:this.props.location||s.location,history:l,staticContext:p};return r?t?i.a.createElement(r,c):null:o?t?o(c):null:n?"function"==typeof n?n(c):I(n)?null:i.a.Children.only(n):null},e}(i.a.Component);W.propTypes={computedMatch:s.a.object,path:s.a.string,exact:s.a.bool,strict:s.a.bool,sensitive:s.a.bool,component:s.a.func,render:s.a.func,children:s.a.oneOfType([s.a.func,s.a.node]),location:s.a.object},W.contextTypes={router:s.a.shape({history:s.a.object.isRequired,route:s.a.object.isRequired,staticContext:s.a.object})},W.childContextTypes={router:s.a.object.isRequired};var H=W,Y=H,Z=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var X=function(t){var e=t.to,n=t.exact,r=t.strict,o=t.location,a=t.activeClassName,l=t.className,s=t.activeStyle,p=t.style,c=t.isActive,d=t.ariaCurrent,u=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(t,["to","exact","strict","location","activeClassName","className","activeStyle","style","isActive","ariaCurrent"]);return i.a.createElement(Y,{path:"object"===(void 0===e?"undefined":U(e))?e.pathname:e,exact:n,strict:r,location:o,children:function(t){var n=t.location,r=t.match,o=!!(c?c(r,n):r);return i.a.createElement(R,Z({to:e,className:o?[l,a].filter(function(t){return t}).join(" "):l,style:o?Z({},p,s):p,"aria-current":o&&d},u))}})};X.propTypes={to:R.propTypes.to,exact:s.a.bool,strict:s.a.bool,location:s.a.object,activeClassName:s.a.string,className:s.a.string,activeStyle:s.a.object,style:s.a.object,isActive:s.a.func,ariaCurrent:s.a.oneOf(["page","step","location","true"])},X.defaultProps={activeClassName:"active",ariaCurrent:"true"};var G=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.enable=function(t){this.unblock&&this.unblock(),this.unblock=this.context.router.history.block(t)},e.prototype.disable=function(){this.unblock&&(this.unblock(),this.unblock=null)},e.prototype.componentWillMount=function(){u()(this.context.router,"You should not use <Prompt> outside a <Router>"),this.props.when&&this.enable(this.props.message)},e.prototype.componentWillReceiveProps=function(t){t.when?this.props.when&&this.props.message===t.message||this.enable(t.message):this.disable()},e.prototype.componentWillUnmount=function(){this.disable()},e.prototype.render=function(){return null},e}(i.a.Component);G.propTypes={when:s.a.bool,message:s.a.oneOfType([s.a.func,s.a.string]).isRequired},G.defaultProps={when:!0},G.contextTypes={router:s.a.shape({history:s.a.shape({block:s.a.func.isRequired}).isRequired}).isRequired};var $=n(11),K=n(10),V=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},J=function(t,e,n,r){var i=void 0;"string"==typeof t?(i=function(t){var e=t||"/",n="",r="",i=e.indexOf("#");-1!==i&&(r=e.substr(i),e=e.substr(0,i));var o=e.indexOf("?");return-1!==o&&(n=e.substr(o),e=e.substr(0,o)),{pathname:e,search:"?"===n?"":n,hash:"#"===r?"":r}}(t)).state=e:(void 0===(i=V({},t)).pathname&&(i.pathname=""),i.search?"?"!==i.search.charAt(0)&&(i.search="?"+i.search):i.search="",i.hash?"#"!==i.hash.charAt(0)&&(i.hash="#"+i.hash):i.hash="",void 0!==e&&void 0===i.state&&(i.state=e));try{i.pathname=decodeURI(i.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+i.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return n&&(i.key=n),r?i.pathname?"/"!==i.pathname.charAt(0)&&(i.pathname=Object($.default)(i.pathname,r.pathname)):i.pathname=r.pathname:i.pathname||(i.pathname="/"),i},Q=function(t,e){return t.pathname===e.pathname&&t.search===e.search&&t.hash===e.hash&&t.key===e.key&&Object(K.default)(t.state,e.state)};"undefined"==typeof window||!window.document||window.document.createElement,"function"==typeof Symbol&&Symbol.iterator,Object.assign,Object.assign,"function"==typeof Symbol&&Symbol.iterator,Object.assign;var tt=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.isStatic=function(){return this.context.router&&this.context.router.staticContext},e.prototype.componentWillMount=function(){u()(this.context.router,"You should not use <Redirect> outside a <Router>"),this.isStatic()&&this.perform()},e.prototype.componentDidMount=function(){this.isStatic()||this.perform()},e.prototype.componentDidUpdate=function(t){var e=J(t.to),n=J(this.props.to);Q(e,n)?a()(!1,"You tried to redirect to the same route you're currently on: \""+n.pathname+n.search+'"'):this.perform()},e.prototype.perform=function(){var t=this.context.router.history,e=this.props,n=e.push,r=e.to;n?t.push(r):t.replace(r)},e.prototype.render=function(){return null},e}(i.a.Component);tt.propTypes={push:s.a.bool,from:s.a.string,to:s.a.oneOfType([s.a.string,s.a.object]).isRequired},tt.defaultProps={push:!1},tt.contextTypes={router:s.a.shape({history:s.a.shape({push:s.a.func.isRequired,replace:s.a.func.isRequired}).isRequired,staticContext:s.a.object}).isRequired};var et=n(5),nt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};function rt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var it=function(t,e){return t?nt({},e,{pathname:Object(et.addLeadingSlash)(t)+e.pathname}):e},ot=function(t){return"string"==typeof t?Object(et.parsePath)(t):(n=(e=t).pathname,r=void 0===n?"/":n,i=e.search,o=void 0===i?"":i,a=e.hash,l=void 0===a?"":a,{pathname:r,search:"?"===o?"":o,hash:"#"===l?"":l});var e,n,r,i,o,a,l},at=function(t){return"string"==typeof t?t:Object(et.createPath)(t)},lt=function(t){return function(){u()(!1,"You cannot %s with <StaticRouter>",t)}},st=function(){},pt=function(t){function e(){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=rt(this,t.call.apply(t,[this].concat(o))),r.createHref=function(t){return Object(et.addLeadingSlash)(r.props.basename+at(t))},r.handlePush=function(t){var e=r.props,n=e.basename,i=e.context;i.action="PUSH",i.location=it(n,ot(t)),i.url=at(i.location)},r.handleReplace=function(t){var e=r.props,n=e.basename,i=e.context;i.action="REPLACE",i.location=it(n,ot(t)),i.url=at(i.location)},r.handleListen=function(){return st},r.handleBlock=function(){return st},rt(r,n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.getChildContext=function(){return{router:{staticContext:this.props.context}}},e.prototype.componentWillMount=function(){a()(!this.props.history,"<StaticRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { StaticRouter as Router }`.")},e.prototype.render=function(){var t=this.props,e=t.basename,n=(t.context,t.location),r=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(t,["basename","context","location"]),o={createHref:this.createHref,action:"POP",location:function(t,e){if(!t)return e;var n=Object(et.addLeadingSlash)(t);return 0!==e.pathname.indexOf(n)?e:nt({},e,{pathname:e.pathname.substr(n.length)})}(e,ot(n)),push:this.handlePush,replace:this.handleReplace,go:lt("go"),goBack:lt("goBack"),goForward:lt("goForward"),listen:this.handleListen,block:this.handleBlock};return i.a.createElement(h,nt({},r,{history:o}))},e}(i.a.Component);pt.propTypes={basename:s.a.string,context:s.a.object.isRequired,location:s.a.oneOfType([s.a.string,s.a.object])},pt.defaultProps={basename:"",location:"/"},pt.childContextTypes={router:s.a.object.isRequired};var ct=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.componentWillMount=function(){u()(this.context.router,"You should not use <Switch> outside a <Router>")},e.prototype.componentWillReceiveProps=function(t){a()(!(t.location&&!this.props.location),'<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'),a()(!(!t.location&&this.props.location),'<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.')},e.prototype.render=function(){var t=this.context.router.route,e=this.props.children,n=this.props.location||t.location,r=void 0,o=void 0;return i.a.Children.forEach(e,function(e){if(i.a.isValidElement(e)){var a=e.props,l=a.path,s=a.exact,p=a.strict,c=a.sensitive,d=a.from,u=l||d;null==r&&(o=e,r=u?F(n.pathname,{path:u,exact:s,strict:p,sensitive:c}):t.match)}}),r?i.a.cloneElement(o,{location:n,computedMatch:r}):null},e}(i.a.Component);ct.contextTypes={router:s.a.shape({route:s.a.object.isRequired}).isRequired},ct.propTypes={children:s.a.node,location:s.a.object};var dt=n(15),ut=n.n(dt),gt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};var mt=function(t){var e=function(e){var n=e.wrappedComponentRef,r=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(e,["wrappedComponentRef"]);return i.a.createElement(H,{render:function(e){return i.a.createElement(t,gt({},r,e,{ref:n}))}})};return e.displayName="withRouter("+(t.displayName||t.name)+")",e.WrappedComponent=t,e.propTypes={wrappedComponentRef:s.a.func},ut()(e,t)},ft=(n(32),n(29),function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}());var ht=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.a.Component),ft(e,[{key:"render",value:function(){var t=this.props.noRouter?i.a.Fragment:y;return i.a.createElement(t,null,i.a.createElement("div",{className:"App"},this.props.children))}}]),e}(),_t=n(3),xt=n.n(_t),bt={box:"_0 _3i _42",xsDisplayNone:"_1",xsDisplayFlex:"_2",xsDisplayBlock:"_3",xsDisplayInlineBlock:"_4",smDisplayNone:"_5",smDisplayFlex:"_6",smDisplayBlock:"_7",smDisplayInlineBlock:"_8",mdDisplayNone:"_9",mdDisplayFlex:"_a",mdDisplayBlock:"_b",mdDisplayInlineBlock:"_c",lgDisplayNone:"_d",lgDisplayFlex:"_e",lgDisplayBlock:"_f",lgDisplayInlineBlock:"_g",xsDirectionRow:"_h",xsDirectionColumn:"_i",smDirectionRow:"_j",smDirectionColumn:"_k",mdDirectionRow:"_l",mdDirectionColumn:"_m",lgDirectionRow:"_n",lgDirectionColumn:"_o",xsCol0:"_p",xsCol1:"_q _26",xsCol2:"_r _27",xsCol3:"_s _28",xsCol4:"_t _29",xsCol5:"_u _2a",xsCol6:"_v _2b",xsCol7:"_w _2c",xsCol8:"_x _2d",xsCol9:"_y _2e",xsCol10:"_z _2f",xsCol11:"_10 _2g",xsCol12:"_11 _2h",smCol0:"_12",smCol1:"_13 _2i",smCol2:"_14 _2j",smCol3:"_15 _2k",smCol4:"_16 _2l",smCol5:"_17 _2m",smCol6:"_18 _2n",smCol7:"_19 _2o",smCol8:"_1a _2p",smCol9:"_1b _2q",smCol10:"_1c _2r",smCol11:"_1d _2s",smCol12:"_1e _2t",mdCol0:"_1f",mdCol1:"_1g _2u",mdCol2:"_1h _2v",mdCol3:"_1i _2w",mdCol4:"_1j _2x",mdCol5:"_1k _2y",mdCol6:"_1l _2z",mdCol7:"_1m _30",mdCol8:"_1n _31",mdCol9:"_1o _32",mdCol10:"_1p _33",mdCol11:"_1q _34",mdCol12:"_1r _35",lgCol0:"_1s",lgCol1:"_1t _36",lgCol2:"_1u _37",lgCol3:"_1v _38",lgCol4:"_1w _39",lgCol5:"_1x _3a",lgCol6:"_1y _3b",lgCol7:"_1z _3c",lgCol8:"_20 _3d",lgCol9:"_21 _3e",lgCol10:"_22 _3f",lgCol11:"_23 _3g",lgCol12:"_24 _3h"},yt="_54",vt="_55",Ct="_56",wt="_57",kt="_58",Mt="_59",Lt="_5a",Ot={red:"_5c",redBg:"_5d",white:"_5e",whiteBg:"_5f",lightGray:"_5g",lightGrayBg:"_5h",gray:"_5i",grayBg:"_5j",darkGray:"_5k",darkGrayBg:"_5l",green:"_5m",greenBg:"_5n",pine:"_5o",pineBg:"_5p",olive:"_5q",oliveBg:"_5r",blue:"_5s",blueBg:"_5t",navy:"_5u",navyBg:"_5v",midnight:"_5w",midnightBg:"_5x",purple:"_5y",purpleBg:"_5z",orchid:"_60",orchidBg:"_61",eggplant:"_62",eggplantBg:"_63",maroon:"_64",maroonBg:"_65",watermelon:"_66",watermelonBg:"_67",orange:"_68",orangeBg:"_69",transparentBg:"_6a",lightWashBg:"_6b",darkWashBg:"_6c"},jt={block:"_3k",inline:"_3l",inlineBlock:"_3m",table:"_3n",overflowHidden:"_3o",overflowScroll:"_3p",overflowScrollX:"_3q",overflowScrollY:"_3r",overflowAuto:"_3s",fit:"_3t",relative:"_3u",fixed:"_3v",absolute:"_3w",sticky:"_3x",top0:"_3y",right0:"_3z",bottom0:"_40",left0:"_41",borderBox:"_42","-webkit-box-flex":"_43","-webkit-flex":"_43","-ms-flex":"_43",flex:"_43",smFlex:"_44",mdFlex:"_45",lgFlex:"_46",flexColumn:"_47",flexWrap:"_48",itemsStart:"_49",itemsEnd:"_4a",itemsCenter:"_4b",itemsBaseline:"_4c",itemsStretch:"_4d",selfStart:"_4e",selfEnd:"_4f",selfCenter:"_4g",selfBaseline:"_4h",selfStretch:"_4i",justifyStart:"_4j",justifyEnd:"_4k",justifyCenter:"_4l",justifyBetween:"_4m",justifyAround:"_4n",contentStart:"_4o",contentEnd:"_4p",contentCenter:"_4q",contentBetween:"_4r",contentAround:"_4s",contentStretch:"_4t",flexGrow:"_4u",flexNone:"_4v",orderFirst:"_4w",orderLast:"_4x"},Rt={marginTop1:"_6d",marginRight1:"_6e",marginBottom1:"_6f",marginLeft1:"_6g",marginTopN1:"_6h",marginRightN1:"_6i",marginBottomN1:"_6j",marginLeftN1:"_6k",paddingY1:"_6l",paddingX1:"_6m",marginTop2:"_6n",marginRight2:"_6o",marginBottom2:"_6p",marginLeft2:"_6q",marginTopN2:"_6r",marginRightN2:"_6s",marginBottomN2:"_6t",marginLeftN2:"_6u",paddingY2:"_6v",paddingX2:"_6w",marginTop3:"_6x",marginRight3:"_6y",marginBottom3:"_6z",marginLeft3:"_70",marginTopN3:"_71",marginRightN3:"_72",marginBottomN3:"_73",marginLeftN3:"_74",paddingY3:"_75",paddingX3:"_76",marginTop4:"_77",marginRight4:"_78",marginBottom4:"_79",marginLeft4:"_7a",marginTopN4:"_7b",marginRightN4:"_7c",marginBottomN4:"_7d",marginLeftN4:"_7e",paddingY4:"_7f",paddingX4:"_7g",marginTop5:"_7h",marginRight5:"_7i",marginBottom5:"_7j",marginLeft5:"_7k",marginTopN5:"_7l",marginRightN5:"_7m",marginBottomN5:"_7n",marginLeftN5:"_7o",paddingY5:"_7p",paddingX5:"_7q",marginTop6:"_7r",marginRight6:"_7s",marginBottom6:"_7t",marginLeft6:"_7u",marginTopN6:"_7v",marginRightN6:"_7w",marginBottomN6:"_7x",marginLeftN6:"_7y",paddingY6:"_7z",paddingX6:"_80",marginTop7:"_81",marginRight7:"_82",marginBottom7:"_83",marginLeft7:"_84",marginTopN7:"_85",marginRightN7:"_86",marginBottomN7:"_87",marginLeftN7:"_88",paddingY7:"_89",paddingX7:"_8a",marginTop8:"_8b",marginRight8:"_8c",marginBottom8:"_8d",marginLeft8:"_8e",marginTopN8:"_8f",marginRightN8:"_8g",marginBottomN8:"_8h",marginLeftN8:"_8i",paddingY8:"_8j",paddingX8:"_8k",marginTop9:"_8l",marginRight9:"_8m",marginBottom9:"_8n",marginLeft9:"_8o",marginTopN9:"_8p",marginRightN9:"_8q",marginBottomN9:"_8r",marginLeftN9:"_8s",paddingY9:"_8t",paddingX9:"_8u",marginTop10:"_8v",marginRight10:"_8w",marginBottom10:"_8x",marginLeft10:"_8y",marginTopN10:"_8z",marginRightN10:"_90",marginBottomN10:"_91",marginLeftN10:"_92",paddingY10:"_93",paddingX10:"_94",marginTop11:"_95",marginRight11:"_96",marginBottom11:"_97",marginLeft11:"_98",marginTopN11:"_99",marginRightN11:"_9a",marginBottomN11:"_9b",marginLeftN11:"_9c",paddingY11:"_9d",paddingX11:"_9e",marginTop12:"_9f",marginRight12:"_9g",marginBottom12:"_9h",marginLeft12:"_9i",marginTopN12:"_9j",marginRightN12:"_9k",marginBottomN12:"_9l",marginLeftN12:"_9m",paddingY12:"_9n",paddingX12:"_9o",smMarginTop1:"_9p",smMarginRight1:"_9q",smMarginBottom1:"_9r",smMarginLeft1:"_9s",smMarginTopN1:"_9t",smMarginRightN1:"_9u",smMarginBottomN1:"_9v",smMarginLeftN1:"_9w",smPaddingY1:"_9x",smPaddingX1:"_9y",smMarginTop2:"_9z",smMarginRight2:"_a0",smMarginBottom2:"_a1",smMarginLeft2:"_a2",smMarginTopN2:"_a3",smMarginRightN2:"_a4",smMarginBottomN2:"_a5",smMarginLeftN2:"_a6",smPaddingY2:"_a7",smPaddingX2:"_a8",smMarginTop3:"_a9",smMarginRight3:"_aa",smMarginBottom3:"_ab",smMarginLeft3:"_ac",smMarginTopN3:"_ad",smMarginRightN3:"_ae",smMarginBottomN3:"_af",smMarginLeftN3:"_ag",smPaddingY3:"_ah",smPaddingX3:"_ai",smMarginTop4:"_aj",smMarginRight4:"_ak",smMarginBottom4:"_al",smMarginLeft4:"_am",smMarginTopN4:"_an",smMarginRightN4:"_ao",smMarginBottomN4:"_ap",smMarginLeftN4:"_aq",smPaddingY4:"_ar",smPaddingX4:"_as",smMarginTop5:"_at",smMarginRight5:"_au",smMarginBottom5:"_av",smMarginLeft5:"_aw",smMarginTopN5:"_ax",smMarginRightN5:"_ay",smMarginBottomN5:"_az",smMarginLeftN5:"_b0",smPaddingY5:"_b1",smPaddingX5:"_b2",smMarginTop6:"_b3",smMarginRight6:"_b4",smMarginBottom6:"_b5",smMarginLeft6:"_b6",smMarginTopN6:"_b7",smMarginRightN6:"_b8",smMarginBottomN6:"_b9",smMarginLeftN6:"_ba",smPaddingY6:"_bb",smPaddingX6:"_bc",smMarginTop7:"_bd",smMarginRight7:"_be",smMarginBottom7:"_bf",smMarginLeft7:"_bg",smMarginTopN7:"_bh",smMarginRightN7:"_bi",smMarginBottomN7:"_bj",smMarginLeftN7:"_bk",smPaddingY7:"_bl",smPaddingX7:"_bm",smMarginTop8:"_bn",smMarginRight8:"_bo",smMarginBottom8:"_bp",smMarginLeft8:"_bq",smMarginTopN8:"_br",smMarginRightN8:"_bs",smMarginBottomN8:"_bt",smMarginLeftN8:"_bu",smPaddingY8:"_bv",smPaddingX8:"_bw",smMarginTop9:"_bx",smMarginRight9:"_by",smMarginBottom9:"_bz",smMarginLeft9:"_c0",smMarginTopN9:"_c1",smMarginRightN9:"_c2",smMarginBottomN9:"_c3",smMarginLeftN9:"_c4",smPaddingY9:"_c5",smPaddingX9:"_c6",smMarginTop10:"_c7",smMarginRight10:"_c8",smMarginBottom10:"_c9",smMarginLeft10:"_ca",smMarginTopN10:"_cb",smMarginRightN10:"_cc",smMarginBottomN10:"_cd",smMarginLeftN10:"_ce",smPaddingY10:"_cf",smPaddingX10:"_cg",smMarginTop11:"_ch",smMarginRight11:"_ci",smMarginBottom11:"_cj",smMarginLeft11:"_ck",smMarginTopN11:"_cl",smMarginRightN11:"_cm",smMarginBottomN11:"_cn",smMarginLeftN11:"_co",smPaddingY11:"_cp",smPaddingX11:"_cq",smMarginTop12:"_cr",smMarginRight12:"_cs",smMarginBottom12:"_ct",smMarginLeft12:"_cu",smMarginTopN12:"_cv",smMarginRightN12:"_cw",smMarginBottomN12:"_cx",smMarginLeftN12:"_cy",smPaddingY12:"_cz",smPaddingX12:"_d0",mdMarginTop1:"_d1",mdMarginRight1:"_d2",mdMarginBottom1:"_d3",mdMarginLeft1:"_d4",mdMarginTopN1:"_d5",mdMarginRightN1:"_d6",mdMarginBottomN1:"_d7",mdMarginLeftN1:"_d8",mdPaddingY1:"_d9",mdPaddingX1:"_da",mdMarginTop2:"_db",mdMarginRight2:"_dc",mdMarginBottom2:"_dd",mdMarginLeft2:"_de",mdMarginTopN2:"_df",mdMarginRightN2:"_dg",mdMarginBottomN2:"_dh",mdMarginLeftN2:"_di",mdPaddingY2:"_dj",mdPaddingX2:"_dk",mdMarginTop3:"_dl",mdMarginRight3:"_dm",mdMarginBottom3:"_dn",mdMarginLeft3:"_do",mdMarginTopN3:"_dp",mdMarginRightN3:"_dq",mdMarginBottomN3:"_dr",mdMarginLeftN3:"_ds",mdPaddingY3:"_dt",mdPaddingX3:"_du",mdMarginTop4:"_dv",mdMarginRight4:"_dw",mdMarginBottom4:"_dx",mdMarginLeft4:"_dy",mdMarginTopN4:"_dz",mdMarginRightN4:"_e0",mdMarginBottomN4:"_e1",mdMarginLeftN4:"_e2",mdPaddingY4:"_e3",mdPaddingX4:"_e4",mdMarginTop5:"_e5",mdMarginRight5:"_e6",mdMarginBottom5:"_e7",mdMarginLeft5:"_e8",mdMarginTopN5:"_e9",mdMarginRightN5:"_ea",mdMarginBottomN5:"_eb",mdMarginLeftN5:"_ec",mdPaddingY5:"_ed",mdPaddingX5:"_ee",mdMarginTop6:"_ef",mdMarginRight6:"_eg",mdMarginBottom6:"_eh",mdMarginLeft6:"_ei",mdMarginTopN6:"_ej",mdMarginRightN6:"_ek",mdMarginBottomN6:"_el",mdMarginLeftN6:"_em",mdPaddingY6:"_en",mdPaddingX6:"_eo",mdMarginTop7:"_ep",mdMarginRight7:"_eq",mdMarginBottom7:"_er",mdMarginLeft7:"_es",mdMarginTopN7:"_et",mdMarginRightN7:"_eu",mdMarginBottomN7:"_ev",mdMarginLeftN7:"_ew",mdPaddingY7:"_ex",mdPaddingX7:"_ey",mdMarginTop8:"_ez",mdMarginRight8:"_f0",mdMarginBottom8:"_f1",mdMarginLeft8:"_f2",mdMarginTopN8:"_f3",mdMarginRightN8:"_f4",mdMarginBottomN8:"_f5",mdMarginLeftN8:"_f6",mdPaddingY8:"_f7",mdPaddingX8:"_f8",mdMarginTop9:"_f9",mdMarginRight9:"_fa",mdMarginBottom9:"_fb",mdMarginLeft9:"_fc",mdMarginTopN9:"_fd",mdMarginRightN9:"_fe",mdMarginBottomN9:"_ff",mdMarginLeftN9:"_fg",mdPaddingY9:"_fh",mdPaddingX9:"_fi",mdMarginTop10:"_fj",mdMarginRight10:"_fk",mdMarginBottom10:"_fl",mdMarginLeft10:"_fm",mdMarginTopN10:"_fn",mdMarginRightN10:"_fo",mdMarginBottomN10:"_fp",mdMarginLeftN10:"_fq",mdPaddingY10:"_fr",mdPaddingX10:"_fs",mdMarginTop11:"_ft",mdMarginRight11:"_fu",mdMarginBottom11:"_fv",mdMarginLeft11:"_fw",mdMarginTopN11:"_fx",mdMarginRightN11:"_fy",mdMarginBottomN11:"_fz",mdMarginLeftN11:"_g0",mdPaddingY11:"_g1",mdPaddingX11:"_g2",mdMarginTop12:"_g3",mdMarginRight12:"_g4",mdMarginBottom12:"_g5",mdMarginLeft12:"_g6",mdMarginTopN12:"_g7",mdMarginRightN12:"_g8",mdMarginBottomN12:"_g9",mdMarginLeftN12:"_ga",mdPaddingY12:"_gb",mdPaddingX12:"_gc",lgMarginTop1:"_gd",lgMarginRight1:"_ge",lgMarginBottom1:"_gf",lgMarginLeft1:"_gg",lgMarginTopN1:"_gh",lgMarginRightN1:"_gi",lgMarginBottomN1:"_gj",lgMarginLeftN1:"_gk",lgPaddingY1:"_gl",lgPaddingX1:"_gm",lgMarginTop2:"_gn",lgMarginRight2:"_go",lgMarginBottom2:"_gp",lgMarginLeft2:"_gq",lgMarginTopN2:"_gr",lgMarginRightN2:"_gs",lgMarginBottomN2:"_gt",lgMarginLeftN2:"_gu",lgPaddingY2:"_gv",lgPaddingX2:"_gw",lgMarginTop3:"_gx",lgMarginRight3:"_gy",lgMarginBottom3:"_gz",lgMarginLeft3:"_h0",lgMarginTopN3:"_h1",lgMarginRightN3:"_h2",lgMarginBottomN3:"_h3",lgMarginLeftN3:"_h4",lgPaddingY3:"_h5",lgPaddingX3:"_h6",lgMarginTop4:"_h7",lgMarginRight4:"_h8",lgMarginBottom4:"_h9",lgMarginLeft4:"_ha",lgMarginTopN4:"_hb",lgMarginRightN4:"_hc",lgMarginBottomN4:"_hd",lgMarginLeftN4:"_he",lgPaddingY4:"_hf",lgPaddingX4:"_hg",lgMarginTop5:"_hh",lgMarginRight5:"_hi",lgMarginBottom5:"_hj",lgMarginLeft5:"_hk",lgMarginTopN5:"_hl",lgMarginRightN5:"_hm",lgMarginBottomN5:"_hn",lgMarginLeftN5:"_ho",lgPaddingY5:"_hp",lgPaddingX5:"_hq",lgMarginTop6:"_hr",lgMarginRight6:"_hs",lgMarginBottom6:"_ht",lgMarginLeft6:"_hu",lgMarginTopN6:"_hv",lgMarginRightN6:"_hw",lgMarginBottomN6:"_hx",lgMarginLeftN6:"_hy",lgPaddingY6:"_hz",lgPaddingX6:"_i0",lgMarginTop7:"_i1",lgMarginRight7:"_i2",lgMarginBottom7:"_i3",lgMarginLeft7:"_i4",lgMarginTopN7:"_i5",lgMarginRightN7:"_i6",lgMarginBottomN7:"_i7",lgMarginLeftN7:"_i8",lgPaddingY7:"_i9",lgPaddingX7:"_ia",lgMarginTop8:"_ib",lgMarginRight8:"_ic",lgMarginBottom8:"_id",lgMarginLeft8:"_ie",lgMarginTopN8:"_if",lgMarginRightN8:"_ig",lgMarginBottomN8:"_ih",lgMarginLeftN8:"_ii",lgPaddingY8:"_ij",lgPaddingX8:"_ik",lgMarginTop9:"_il",lgMarginRight9:"_im",lgMarginBottom9:"_in",lgMarginLeft9:"_io",lgMarginTopN9:"_ip",lgMarginRightN9:"_iq",lgMarginBottomN9:"_ir",lgMarginLeftN9:"_is",lgPaddingY9:"_it",lgPaddingX9:"_iu",lgMarginTop10:"_iv",lgMarginRight10:"_iw",lgMarginBottom10:"_ix",lgMarginLeft10:"_iy",lgMarginTopN10:"_iz",lgMarginRightN10:"_j0",lgMarginBottomN10:"_j1",lgMarginLeftN10:"_j2",lgPaddingY10:"_j3",lgPaddingX10:"_j4",lgMarginTop11:"_j5",lgMarginRight11:"_j6",lgMarginBottom11:"_j7",lgMarginLeft11:"_j8",lgMarginTopN11:"_j9",lgMarginRightN11:"_ja",lgMarginBottomN11:"_jb",lgMarginLeftN11:"_jc",lgPaddingY11:"_jd",lgPaddingX11:"_je",lgMarginTop12:"_jf",lgMarginRight12:"_jg",lgMarginBottom12:"_jh",lgMarginLeft12:"_ji",lgMarginTopN12:"_jj",lgMarginRightN12:"_jk",lgMarginBottomN12:"_jl",lgMarginLeftN12:"_jm",lgPaddingY12:"_jn",lgPaddingX12:"_jo"},Et={mlAuto:"_jp",mrAuto:"_jq",m0:"_jr",mt0:"_js",mr0:"_jt",mb0:"_ju",ml0:"_jv",p0:"_jw",px0:"_jx",py0:"_jy",m1:"_jz",mt1:"_k0",mr1:"_k1",mb1:"_k2",ml1:"_k3",mn1:"_k4",mtn1:"_k5",mbn1:"_k6",mln1:"_k7",mrn1:"_k8",mxn1:"_k9",myn1:"_ka",p1:"_kb",px1:"_kc",py1:"_kd",m2:"_ke",mt2:"_kf",mr2:"_kg",mb2:"_kh",ml2:"_ki",mn2:"_kj",mtn2:"_kk",mbn2:"_kl",mln2:"_km",mrn2:"_kn",mxn2:"_ko",myn2:"_kp",p2:"_kq",px2:"_kr",py2:"_ks",m3:"_kt",mt3:"_ku",mr3:"_kv",mb3:"_kw",ml3:"_kx",mn3:"_ky",mtn3:"_kz",mbn3:"_l0",mln3:"_l1",mrn3:"_l2",mxn3:"_l3",myn3:"_l4",p3:"_l5",px3:"_l6",py3:"_l7",m4:"_l8",mt4:"_l9",mr4:"_la",mb4:"_lb",ml4:"_lc",mn4:"_ld",mtn4:"_le",mbn4:"_lf",mln4:"_lg",mrn4:"_lh",mxn4:"_li",myn4:"_lj",p4:"_lk",px4:"_ll",py4:"_lm",m5:"_ln",mt5:"_lo",mr5:"_lp",mb5:"_lq",ml5:"_lr",mn5:"_ls",mtn5:"_lt",mbn5:"_lu",mln5:"_lv",mrn5:"_lw",mxn5:"_lx",myn5:"_ly",p5:"_lz",px5:"_m0",py5:"_m1",m6:"_m2",mt6:"_m3",mr6:"_m4",mb6:"_m5",ml6:"_m6",mn6:"_m7",mtn6:"_m8",mbn6:"_m9",mln6:"_ma",mrn6:"_mb",mxn6:"_mc",myn6:"_md",p6:"_me",px6:"_mf",py6:"_mg"},St="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Tt=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Pt=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Bt=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},Nt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},zt=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},qt=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},Ft=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},At=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)},Dt=function(){return{className:new Set,inlineStyle:{}}},It=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return{className:new Set(e),inlineStyle:{}}},Wt=function(t){return{className:new Set,inlineStyle:t}},Ht=function(t){return t.reduce(function(t,e){var n=t.className,r=t.inlineStyle,i=e.className,o=e.inlineStyle;return{className:new Set([].concat(At(n),At(i))),inlineStyle:Nt({},r,o)}},Dt())},Yt=function(t){return function(e){var n=e.className,r=e.inlineStyle;return{className:new Set(Array.from(n).map(t)),inlineStyle:r}}},Zt=function(t){var e=t.className,n=t.inlineStyle,r={};return e.size>0&&(r.className=Array.from(e).sort().join(" ")),Object.keys(n).length>0&&(r.style=n),r},Ut=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return t?It.apply(void 0,e):Dt()}},Xt=function(t){return function(e){return Object.prototype.hasOwnProperty.call(t,e)?It(t[e]):Dt()}},Gt=function(t){return function(e){return It(""+t+(e<0?"N"+Math.abs(e):e))}},$t=function(t){return function(e){return 0===e?Dt():Gt(t)(e)}},Kt=function(t,e){return function(n){return Yt(function(t){return e[t]})(t(n))}},Vt=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return Ht(e.map(function(e){return e(t)}))}},Jt=Kt($t("marginTop"),Rt),Qt=Kt($t("marginRight"),Rt),te=Kt($t("marginBottom"),Rt),ee=Kt($t("marginLeft"),Rt),ne=Vt(Jt,te,ee,Qt),re=Kt($t("smMarginTop"),Rt),ie=Kt($t("smMarginRight"),Rt),oe=Kt($t("smMarginBottom"),Rt),ae=Kt($t("smMarginLeft"),Rt),le=Vt(re,oe,ae,ie),se=Kt($t("mdMarginTop"),Rt),pe=Kt($t("mdMarginRight"),Rt),ce=Kt($t("mdMarginBottom"),Rt),de=Kt($t("mdMarginLeft"),Rt),ue=Vt(se,ce,de,pe),ge=Kt($t("lgMarginTop"),Rt),me=Kt($t("lgMarginRight"),Rt),fe=Kt($t("lgMarginBottom"),Rt),he=Kt($t("lgMarginLeft"),Rt),_e=Vt(ge,fe,he,me),xe=Kt($t("paddingX"),Rt),be=Kt($t("paddingY"),Rt),ye=Vt(xe,be),ve=Kt($t("smPaddingX"),Rt),Ce=Kt($t("smPaddingY"),Rt),we=Vt(ve,Ce),ke=Kt($t("mdPaddingX"),Rt),Me=Kt($t("mdPaddingY"),Rt),Le=Vt(ke,Me),Oe=Kt($t("lgPaddingX"),Rt),je=Kt($t("lgPaddingY"),Rt),Re=Vt(Oe,je),Ee=function(t){return Yt(function(e){return""+t+e})},Se=function(t){switch(t){case"flex":return It("DisplayFlex","DirectionRow");case"flexColumn":return It("DisplayFlex","DirectionColumn");case"inlineBlock":return It("DisplayInlineBlock");case!1:return It("DisplayNone");default:return It("DisplayBlock")}},Te=Gt("Col"),Pe=function(t){return t<0?"n"+Math.abs(t):t.toString()},Be={xs:function(t){return t?Yt(function(t){return bt[t]})(Ee("xs")(Ht([t.column?Te(t.column):Dt(),void 0!==t.display?Se(t.display):Dt()]))):Dt()},sm:function(t){return t?Yt(function(t){return bt[t]})(Ee("sm")(Ht([t.column?Te(t.column):Dt(),void 0!==t.display?Se(t.display):Dt()]))):Dt()},md:function(t){return t?Yt(function(t){return bt[t]})(Ee("md")(Ht([t.column?Te(t.column):Dt(),void 0!==t.display?Se(t.display):Dt()]))):Dt()},lg:function(t){return t?Yt(function(t){return bt[t]})(Ee("lg")(Ht([t.column?Te(t.column):Dt(),void 0!==t.display?Se(t.display):Dt()]))):Dt()},display:Xt({none:bt.xsDisplayNone,flex:bt.xsDisplayFlex,block:bt.xsDisplayBlock,inlineBlock:bt.xsDisplayInlineBlock}),column:Kt(Gt("xsCol"),bt),direction:Xt({row:bt.xsDirectionRow,column:bt.xsDirectionColumn}),smDisplay:Xt({none:bt.smDisplayNone,flex:bt.smDisplayFlex,block:bt.smDisplayBlock,inlineBlock:bt.smDisplayInlineBlock}),smColumn:Kt(Gt("smCol"),bt),smDirection:Xt({row:bt.smDirectionRow,column:bt.smDirectionColumn}),mdDisplay:Xt({none:bt.mdDisplayNone,flex:bt.mdDisplayFlex,block:bt.mdDisplayBlock,inlineBlock:bt.mdDisplayInlineBlock}),mdColumn:Kt(Gt("mdCol"),bt),mdDirection:Xt({row:bt.mdDirectionRow,column:bt.mdDirectionColumn}),lgDisplay:Xt({none:bt.lgDisplayNone,flex:bt.lgDisplayFlex,block:bt.lgDisplayBlock,inlineBlock:bt.lgDisplayInlineBlock}),lgColumn:Kt(Gt("lgCol"),bt),lgDirection:Xt({row:bt.lgDirectionRow,column:bt.lgDirectionColumn}),alignContent:Xt({start:jt.contentStart,end:jt.contentEnd,center:jt.contentCenter,between:jt.contentBetween,around:jt.contentAround}),alignItems:Xt({start:jt.itemsStart,end:jt.itemsEnd,center:jt.itemsCenter,baseline:jt.itemsBaseline}),alignSelf:Xt({start:jt.selfStart,end:jt.selfEnd,center:jt.selfCenter,baseline:jt.selfBaseline,stretch:jt.selfStretch}),bottom:Ut(jt.bottom0),color:Xt({blue:Ot.blueBg,darkGray:Ot.darkGrayBg,pine:Ot.pineBg,gray:Ot.grayBg,red:Ot.redBg,olive:Ot.oliveBg,lightGray:Ot.lightGrayBg,white:Ot.whiteBg,orange:Ot.orangeBg,green:Ot.greenBg,navy:Ot.navyBg,midnight:Ot.midnightBg,purple:Ot.purpleBg,orchid:Ot.orchidBg,eggplant:Ot.eggplantBg,maroon:Ot.maroonBg,watermelon:Ot.watermelonBg,lightWash:Ot.lightWashBg,darkWash:Ot.darkWashBg}),fit:Ut(jt.fit),flex:Xt({grow:jt.flexGrow,none:jt.flexNone}),height:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return Wt({height:t})}),justifyContent:Xt({end:jt.justifyEnd,center:jt.justifyCenter,between:jt.justifyBetween,around:jt.justifyAround}),left:Ut(jt.left0),deprecatedMargin:function(t){var e=Dt(),n=Dt(),r=Dt(),i=Dt();switch(void 0===t?"undefined":St(t)){case"number":return It(Et["m"+Pe(t)]);case"object":return t.top&&(e=It(Et["mt"+Pe(t.top)])),t.bottom&&(n=It(Et["mb"+Pe(t.bottom)])),t.left&&(r=It("auto"===t.left?Et.mlAuto:Et["ml"+Pe(t.left)])),t.right&&(i=It("auto"===t.right?Et.mrAuto:Et["mr"+Pe(t.right)])),Ht([e,n,r,i]);default:return Dt()}},margin:ne,marginTop:Jt,marginRight:Qt,marginBottom:te,marginLeft:ee,smMargin:le,smMarginTop:re,smMarginRight:ie,smMarginBottom:oe,smMarginLeft:ae,mdMargin:ue,mdMarginTop:se,mdMarginRight:pe,mdMarginBottom:ce,mdMarginLeft:de,lgMargin:_e,lgMarginTop:ge,lgMarginRight:me,lgMarginBottom:fe,lgMarginLeft:he,maxHeight:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return Wt({maxHeight:t})}),maxWidth:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return Wt({maxWidth:t})}),minHeight:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return Wt({minHeight:t})}),minWidth:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return Wt({minWidth:t})}),overflow:Xt({hidden:jt.overflowHidden,scroll:jt.overflowScroll,auto:jt.overflowAuto,scrollX:jt.overflowScrollX,scrollY:jt.overflowScrollY}),deprecatedPadding:function(t){switch(void 0===t?"undefined":St(t)){case"number":return It(Et["p"+t]);case"object":return Ht([t.x?It(Et["px"+t.x]):Dt(),t.y?It(Et["py"+t.y]):Dt()]);default:return Dt()}},padding:ye,paddingX:xe,paddingY:be,smPadding:we,smPaddingX:ve,smPaddingY:Ce,mdPadding:Le,mdPaddingX:ke,mdPaddingY:Me,lgPadding:Re,lgPaddingX:Oe,lgPaddingY:je,position:Xt({absolute:jt.absolute,relative:jt.relative,fixed:jt.fixed}),right:Ut(jt.right0),shape:Xt({circle:yt,pill:vt,rounded:Ct,roundedBottom:Mt,roundedLeft:Lt,roundedRight:kt,roundedTop:wt}),top:Ut(jt.top0),width:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return Wt({width:t})}),wrap:Ut(jt.flexWrap),dangerouslySetInlineStyle:function(t){return t&&t.__style?Wt(t.__style):Dt()}},Ne=function(t,e){return Object.keys(e).reduce(function(n,r){return i=r,t.indexOf(i)>=0?n:Nt({},n,Bt({},r,e[r]));var i},{})};function ze(t){var e=t.children,n=qt(t,["children"]),i=["onClick","className","style"],o=It(bt.box);for(var a in n)if(Object.prototype.hasOwnProperty.call(Be,a)){var l=Be[a],s=n[a];i=i.concat(a),o=Ht([o,l(s)])}return Object(r.createElement)("div",Nt({},Ne(i,n),Zt(o)),e)}var qe=s.a.oneOf([0,1,2,3,4,5,6,7,8,9,10,11,12]),Fe=s.a.oneOf([-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12]),Ae=s.a.oneOf([0,1,2,3,4,5,6,7,8,9,10,11,12]);ze.propTypes={children:s.a.node,dangerouslySetInlineStyle:s.a.exact({__style:s.a.object}),xs:s.a.exact({display:s.a.oneOfType([s.a.bool,s.a.oneOf(["flex","flexColumn","inlineBlock"])]),column:s.a.number}),sm:s.a.exact({display:s.a.oneOfType([s.a.bool,s.a.oneOf(["flex","flexColumn","inlineBlock"])]),column:s.a.number}),md:s.a.exact({display:s.a.oneOfType([s.a.bool,s.a.oneOf(["flex","flexColumn","inlineBlock"])]),column:s.a.number}),lg:s.a.exact({display:s.a.oneOfType([s.a.bool,s.a.oneOf(["flex","flexColumn","inlineBlock"])]),column:s.a.number}),deprecatedMargin:s.a.oneOfType([s.a.number,s.a.shape({top:s.a.number,bottom:s.a.number,left:s.a.oneOfType([s.a.number,s.a.oneOf(["auto"])]),right:s.a.oneOfType([s.a.number,s.a.oneOf(["auto"])])})]),deprecatedPadding:s.a.oneOfType([s.a.number,s.a.shape({x:s.a.number,y:s.a.number})]),display:s.a.oneOf(["none","flex","block","inlineBlock"]),direction:s.a.oneOf(["row","column"]),column:qe,smDisplay:s.a.oneOf(["none","flex","block","inlineBlock"]),smDirection:s.a.oneOf(["row","column"]),smColumn:qe,mdDisplay:s.a.oneOf(["none","flex","block","inlineBlock"]),mdDirection:s.a.oneOf(["row","column"]),mdColumn:qe,lgDisplay:s.a.oneOf(["none","flex","block","inlineBlock"]),lgDirection:s.a.oneOf(["row","column"]),lgColumn:qe,alignContent:s.a.oneOf(["start","end","center","between","around","stretch"]),alignItems:s.a.oneOf(["start","end","center","baseline","stretch"]),alignSelf:s.a.oneOf(["auto","start","end","center","baseline","stretch"]),bottom:s.a.bool,color:s.a.oneOf(["blue","darkGray","darkWash","eggplant","gray","green","lightGray","lightWash","maroon","midnight","navy","olive","orange","orchid","pine","purple","red","transparent","watermelon","white"]),fit:s.a.bool,flex:s.a.oneOf(["grow","shrink","none"]),grow:s.a.bool,height:s.a.oneOfType([s.a.number,s.a.string]),justifyContent:s.a.oneOf(["start","end","center","between","around"]),left:s.a.bool,margin:Fe,marginTop:Fe,marginRight:Fe,marginBottom:Fe,marginLeft:Fe,smMargin:Fe,smMarginTop:Fe,smMarginRight:Fe,smMarginBottom:Fe,smMarginLeft:Fe,mdMargin:Fe,mdMarginTop:Fe,mdMarginRight:Fe,mdMarginBottom:Fe,mdMarginLeft:Fe,lgMargin:Fe,lgMarginTop:Fe,lgMarginRight:Fe,lgMarginBottom:Fe,lgMarginLeft:Fe,maxHeight:s.a.oneOfType([s.a.number,s.a.string]),maxWidth:s.a.oneOfType([s.a.number,s.a.string]),minHeight:s.a.oneOfType([s.a.number,s.a.string]),minWidth:s.a.oneOfType([s.a.number,s.a.string]),overflow:s.a.oneOf(["visible","hidden","scroll","scrollX","scrollY","auto"]),padding:Ae,paddingX:Ae,paddingY:Ae,smPadding:Ae,smPaddingX:Ae,smPaddingY:Ae,mdPadding:Ae,mdPaddingX:Ae,mdPaddingY:Ae,lgPadding:Ae,lgPaddingX:Ae,lgPaddingY:Ae,position:s.a.oneOf(["static","absolute","relative","fixed"]),right:s.a.bool,shape:s.a.oneOf(["square","rounded","pill","circle","roundedTop","roundedBottom","roundedLeft","roundedRight"]),top:s.a.bool,width:s.a.oneOfType([s.a.number,s.a.string]),wrap:s.a.bool};var De={icon:"_mh",iconBlock:"_mi _3k"},Ie={add:"M22.00,10.00 L14.00,10.00 L14.00,2.00 C14.00,0.90 13.10,0.00 12.00,0.00 C10.90,0.00 10.00,0.90 10.00,2.00 L10.00,10.00 L2.00,10.00 C0.90,10.00 0.00,10.90 0.00,12.00 C0.00,13.10 0.90,14.00 2.00,14.00 L10.00,14.00 L10.00,22.00 C10.00,23.10 10.90,24.00 12.00,24.00 C13.10,24.00 14.00,23.10 14.00,22.00 L14.00,14.00 L22.00,14.00 C23.10,14.00 24.00,13.10 24.00,12.00 C24.00,10.90 23.10,10.00 22.00,10.00","add-circle":"M17.75,13.25 L13.25,13.25 L13.25,17.75 C13.25,18.44 12.69,19.00 12.00,19.00 C11.31,19.00 10.75,18.44 10.75,17.75 L10.75,13.25 L6.25,13.25 C5.56,13.25 5.00,12.69 5.00,12.00 C5.00,11.31 5.56,10.75 6.25,10.75 L10.75,10.75 L10.75,6.25 C10.75,5.56 11.31,5.00 12.00,5.00 C12.69,5.00 13.25,5.56 13.25,6.25 L13.25,10.75 L17.75,10.75 C18.44,10.75 19.00,11.31 19.00,12.00 C19.00,12.69 18.44,13.25 17.75,13.25 M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00","add-pin":"M21.50,8.69 C22.99,9.56 24.00,11.15 24.00,13.00 L20.00,13.00 L20.00,20.96 L19.00,23.00 L18.00,20.96 L18.00,13.00 L14.00,13.00 C14.00,11.15 15.01,9.56 16.50,8.69 L16.50,2.93 C15.64,2.71 15.00,1.93 15.00,1.00 L23.00,1.00 C23.00,1.93 22.36,2.71 21.50,2.93 L21.50,8.69 Z M10.25,9.50 C10.94,9.50 11.50,10.06 11.50,10.75 C11.50,11.44 10.94,12.00 10.25,12.00 L7.00,12.00 L7.00,15.25 C7.00,15.94 6.44,16.50 5.75,16.50 C5.06,16.50 4.50,15.94 4.50,15.25 L4.50,12.00 L1.25,12.00 C0.56,12.00 0.00,11.44 0.00,10.75 C0.00,10.06 0.56,9.50 1.25,9.50 L4.50,9.50 L4.50,6.25 C4.50,5.56 5.06,5.00 5.75,5.00 C6.44,5.00 7.00,5.56 7.00,6.25 L7.00,9.50 L10.25,9.50 Z","arrow-back":"M17.28,24.00 C16.71,24.00 16.14,23.78 15.70,23.34 L4.50,12.00 L15.70,0.66 C16.57,-0.22 17.98,-0.22 18.85,0.66 C19.72,1.54 19.72,2.96 18.85,3.84 L10.79,12.00 L18.85,20.16 C19.72,21.04 19.72,22.46 18.85,23.34 C18.41,23.78 17.85,24.00 17.28,24.00","arrow-circle-forward":"M12.94,16.07 C12.45,16.55 11.66,16.55 11.17,16.07 C10.68,15.58 10.68,14.79 11.17,14.30 L12.23,13.23 L8.25,13.23 C7.56,13.23 7.00,12.67 7.00,11.98 C7.00,11.29 7.56,10.73 8.25,10.73 L12.20,10.73 L11.17,9.70 C10.68,9.21 10.68,8.42 11.17,7.93 C11.66,7.45 12.45,7.45 12.94,7.93 L17.00,12.00 L12.94,16.07 Z M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00 L12.00,0.00 Z","arrow-down":"M12.00,19.50 L0.66,8.29 C-0.22,7.43 -0.22,6.02 0.66,5.15 C1.54,4.28 2.96,4.28 3.84,5.15 L12.00,13.21 L20.16,5.15 C21.04,4.28 22.46,4.28 23.34,5.15 C24.22,6.02 24.22,7.43 23.34,8.29 L12.00,19.50 Z","arrow-forward":"M6.72,24.00 C7.29,24.00 7.86,23.78 8.29,23.34 L19.50,12.00 L8.29,0.66 C7.43,-0.22 6.02,-0.22 5.15,0.66 C4.28,1.54 4.28,2.96 5.15,3.84 L13.21,12.00 L5.15,20.16 C4.28,21.04 4.28,22.46 5.15,23.34 C5.58,23.78 6.15,24.00 6.72,24.00","arrow-up":"M21.75,19.50 C21.17,19.50 20.60,19.28 20.16,18.85 L12.00,10.79 L3.84,18.85 C2.96,19.72 1.54,19.72 0.66,18.85 C-0.22,17.98 -0.22,16.57 0.66,15.70 L12.00,4.50 L23.34,15.70 C24.22,16.57 24.22,17.98 23.34,18.85 C22.90,19.28 22.33,19.50 21.75,19.50",bell:"M12.00,24.00 C10.34,24.00 9.00,22.66 9.00,21.00 L15.00,21.00 C15.00,22.66 13.66,24.00 12.00,24.00 Z M19.00,13.17 C20.58,14.69 21.67,16.72 22.00,19.00 L2.00,19.00 C2.33,16.72 3.42,14.69 5.00,13.17 L5.00,7.00 C5.00,3.13 8.13,0.00 12.00,0.00 C15.87,0.00 19.00,3.13 19.00,7.00 L19.00,13.17 Z",camera:"M6.36,4.99 L8.56,2.00 L15.44,2.00 L17.64,4.99 L20.73,4.99 C22.53,4.99 24.00,6.48 24.00,8.32 L24.00,18.67 C24.00,20.51 22.53,22.00 20.73,22.00 L3.27,22.00 C1.47,22.00 0.00,20.51 0.00,18.67 L0.00,8.32 C0.00,6.48 1.47,4.99 3.27,4.99 L6.36,4.99 Z M12.00,7.22 C8.83,7.22 6.26,9.79 6.26,12.96 C6.26,16.13 8.83,18.70 12.00,18.70 C15.17,18.70 17.74,16.13 17.74,12.96 C17.74,9.79 15.17,7.22 12.00,7.22 M12.00,9.95 C13.66,9.95 15.01,11.30 15.01,12.96 C15.01,14.62 13.66,15.97 12.00,15.97 C10.34,15.97 8.99,14.62 8.99,12.96 C8.99,11.30 10.34,9.95 12.00,9.95",cancel:"M15.18,12.00 L22.34,4.84 C23.22,3.96 23.22,2.54 22.34,1.66 C21.46,0.78 20.04,0.78 19.16,1.66 L12.00,8.82 L4.84,1.66 C3.96,0.78 2.54,0.78 1.66,1.66 C0.78,2.54 0.78,3.96 1.66,4.84 L8.82,12.00 L1.66,19.16 C0.78,20.04 0.78,21.46 1.66,22.34 C2.10,22.78 2.67,23.00 3.25,23.00 C3.83,23.00 4.40,22.78 4.84,22.34 L12.00,15.18 L19.16,22.34 C19.60,22.78 20.17,23.00 20.75,23.00 C21.33,23.00 21.90,22.78 22.34,22.34 C23.22,21.46 23.22,20.04 22.34,19.16 L15.18,12.00 Z",check:"M9.17,21.75 L0.73,12.79 C-0.24,11.75 -0.24,10.08 0.73,9.04 C1.71,8.01 3.28,8.01 4.26,9.04 L9.17,14.26 L19.74,3.03 C20.72,1.99 22.29,1.99 23.27,3.03 C24.24,4.06 24.24,5.74 23.27,6.77 L9.17,21.75 Z","check-circle":"M18.88,9.88 L10.22,18.55 L5.10,13.42 C4.61,12.93 4.61,12.14 5.10,11.65 C5.58,11.16 6.38,11.16 6.86,11.65 L10.22,15.01 L17.12,8.12 C17.61,7.63 18.40,7.63 18.88,8.12 C19.37,8.61 19.37,9.40 18.88,9.88 M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00","circle-outline":"M12.00,0.00 C5.40,0.00 0.00,5.40 0.00,12.00 C0.00,18.60 5.40,24.00 12.00,24.00 C18.60,24.00 24.00,18.60 24.00,12.00 C24.00,5.40 18.60,0.00 12.00,0.00 L12.00,0.00 Z M12.00,22.20 C6.45,22.20 1.80,17.70 1.80,12.00 C1.80,6.30 6.30,1.80 12.00,1.80 C17.70,1.80 22.20,6.30 22.20,12.00 C22.20,17.70 17.55,22.20 12.00,22.20 L12.00,22.20 Z",clear:"M15.18,16.95 L12.00,13.77 L8.82,16.95 C8.33,17.44 7.54,17.44 7.05,16.95 C6.56,16.46 6.56,15.67 7.05,15.18 L10.23,12.00 L7.05,8.82 C6.56,8.33 6.56,7.54 7.05,7.05 C7.54,6.56 8.33,6.56 8.82,7.05 L12.00,10.23 L15.18,7.05 C15.67,6.56 16.46,6.56 16.95,7.05 C17.44,7.54 17.44,8.33 16.95,8.82 L13.77,12.00 L16.95,15.18 C17.44,15.67 17.44,16.46 16.95,16.95 C16.46,17.44 15.67,17.44 15.18,16.95 M24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00",clock:"M17.83,17.83 C17.46,18.19 16.98,18.38 16.50,18.38 C16.02,18.38 15.54,18.19 15.17,17.83 L10.13,12.78 L10.13,6.00 C10.13,4.96 10.96,4.13 12.00,4.13 C13.04,4.13 13.88,4.96 13.88,6.00 L13.88,11.22 L17.83,15.17 C18.56,15.91 18.56,17.09 17.83,17.83 M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00",cog:"M12.00,15.95 C9.79,15.95 8.00,14.16 8.00,11.95 C8.00,9.74 9.79,7.95 12.00,7.95 C14.21,7.95 16.00,9.74 16.00,11.95 C16.00,14.16 14.21,15.95 12.00,15.95 L12.00,15.95 Z M12.00,0.50 L2.00,6.25 L2.00,17.75 L12.00,23.50 L22.00,17.75 L22.00,6.25 L12.00,0.50 Z",compass:"M12.87,12.90 C13.36,12.41 13.36,11.62 12.87,11.13 C12.38,10.64 11.59,10.64 11.10,11.13 C10.61,11.62 10.61,12.41 11.10,12.90 C11.59,13.39 12.38,13.39 12.87,12.90 M15.14,14.03 C14.93,14.55 14.52,14.96 14.00,15.16 L5.62,18.38 L8.84,10.00 C9.04,9.48 9.45,9.07 9.97,8.86 L18.58,5.42 L15.14,14.03 Z M20.49,3.51 C15.80,-1.17 8.20,-1.17 3.51,3.51 C-1.17,8.20 -1.17,15.80 3.51,20.49 C8.20,25.17 15.80,25.17 20.49,20.49 C25.17,15.80 25.17,8.20 20.49,3.51 L20.49,3.51 Z",dash:"M20.00,16.00 L4.00,16.00 C1.80,16.00 0.00,14.20 0.00,12.00 C0.00,9.80 1.80,8.00 4.00,8.00 L20.00,8.00 C22.20,8.00 24.00,9.80 24.00,12.00 C24.00,14.20 22.20,16.00 20.00,16.00",edit:"M13.39,6.02 L17.98,10.61 L7.10,21.50 L1.00,23.00 L2.50,16.90 L13.39,6.02 Z M22.05,1.95 C23.32,3.22 23.32,5.28 22.05,6.55 L19.75,8.85 L15.15,4.25 L17.45,1.95 C18.72,0.68 20.78,0.68 22.05,1.95 Z",ellipsis:"M12.00,9.00 C10.34,9.00 9.00,10.34 9.00,12.00 C9.00,13.66 10.34,15.00 12.00,15.00 C13.66,15.00 15.00,13.66 15.00,12.00 C15.00,10.34 13.66,9.00 12.00,9.00 M3.00,9.00 C4.66,9.00 6.00,10.34 6.00,12.00 C6.00,13.66 4.66,15.00 3.00,15.00 C1.34,15.00 0.00,13.66 0.00,12.00 C0.00,10.34 1.34,9.00 3.00,9.00 Z M21.00,9.00 C22.66,9.00 24.00,10.34 24.00,12.00 C24.00,13.66 22.66,15.00 21.00,15.00 C19.34,15.00 18.00,13.66 18.00,12.00 C18.00,10.34 19.34,9.00 21.00,9.00 Z","ellipsis-circle-outline":"M12.00,10.50 C12.90,10.50 13.50,11.10 13.50,12.00 C13.50,12.90 12.90,13.50 12.00,13.50 C11.10,13.50 10.50,12.90 10.50,12.00 C10.50,11.10 11.10,10.50 12.00,10.50 L12.00,10.50 Z M7.50,10.50 C8.40,10.50 9.00,11.10 9.00,12.00 C9.00,12.90 8.40,13.50 7.50,13.50 C6.60,13.50 6.00,12.90 6.00,12.00 C6.00,11.10 6.60,10.50 7.50,10.50 L7.50,10.50 Z M16.50,10.50 C17.40,10.50 18.00,11.10 18.00,12.00 C18.00,12.90 17.40,13.50 16.50,13.50 C15.60,13.50 15.00,12.90 15.00,12.00 C15.00,11.10 15.60,10.50 16.50,10.50 L16.50,10.50 Z M12.00,0.00 C5.40,0.00 0.00,5.40 0.00,12.00 C0.00,18.60 5.40,24.00 12.00,24.00 C18.60,24.00 24.00,18.60 24.00,12.00 C24.00,5.40 18.60,0.00 12.00,0.00 L12.00,0.00 Z M12.00,22.20 C6.45,22.20 1.80,17.70 1.80,12.00 C1.80,6.30 6.30,1.80 12.00,1.80 C17.70,1.80 22.20,6.30 22.20,12.00 C22.20,17.70 17.55,22.20 12.00,22.20 L12.00,22.20 Z",facebook:"M16.63,24.00 L16.63,14.74 L19.73,14.74 C19.89,13.51 20.04,12.32 20.21,11.08 C20.04,11.06 19.89,11.04 19.75,11.04 C18.82,11.03 17.90,11.02 16.97,11.04 C16.68,11.04 16.59,10.95 16.60,10.66 C16.63,9.84 16.60,9.02 16.67,8.20 C16.74,7.49 17.18,7.12 17.91,7.08 C18.59,7.05 19.27,7.05 19.96,7.06 C20.24,7.06 20.34,6.97 20.34,6.68 C20.32,5.80 20.33,4.92 20.33,4.04 C20.33,3.88 20.35,3.72 20.10,3.70 C18.74,3.58 17.38,3.40 16.03,3.75 C14.24,4.20 13.17,5.40 12.91,7.20 C12.75,8.29 12.81,9.41 12.78,10.52 C12.76,11.03 12.77,11.03 12.26,11.03 C11.51,11.03 10.75,11.04 10.00,11.03 C9.71,11.02 9.62,11.12 9.62,11.41 C9.64,12.41 9.63,13.40 9.62,14.40 C9.62,14.65 9.70,14.74 9.96,14.74 C10.78,14.72 11.60,14.74 12.43,14.73 C12.67,14.72 12.78,14.77 12.78,15.05 C12.77,17.93 12.77,20.81 12.78,23.70 C12.78,23.91 12.71,24.00 12.48,24.00 C8.75,23.99 5.02,24.00 1.29,23.99 C0.58,23.99 0.03,23.42 0.01,22.71 C-0.01,22.32 0.00,21.94 0.00,21.56 C0.00,14.88 0.00,8.20 0.00,1.51 C0.00,0.51 0.52,0.00 1.52,0.00 C8.51,-0.00 15.51,-0.00 22.50,0.00 C23.48,0.00 24.00,0.52 24.00,1.50 C24.00,8.50 24.00,15.51 24.00,22.52 C24.00,23.47 23.47,24.00 22.52,24.00 C20.69,24.00 18.86,24.00 17.03,24.00 L16.63,24.00 Z","face-happy":"M16.46,10.88 C15.54,10.88 14.79,10.13 14.79,9.21 C14.79,8.28 15.54,7.53 16.46,7.53 C17.39,7.53 18.14,8.28 18.14,9.21 C18.14,10.13 17.39,10.88 16.46,10.88 M12.02,20.71 C9.08,20.71 6.64,18.75 6.67,15.81 C6.68,13.69 8.39,15.27 12.00,15.26 C15.60,15.25 17.32,13.62 17.32,15.81 C17.33,18.76 14.97,20.71 12.02,20.71 M6.09,9.21 C6.09,8.28 6.84,7.53 7.77,7.53 C8.69,7.53 9.44,8.28 9.44,9.21 C9.44,10.13 8.69,10.88 7.77,10.88 C6.84,10.88 6.09,10.13 6.09,9.21 M24.00,11.99 C23.99,5.37 18.62,0.00 12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.62,24.00 23.99,18.63 24.00,12.01 C24.00,12.01 24.00,12.00 24.00,12.00 C24.00,12.00 24.00,11.99 24.00,11.99","face-sad":"M16.46,10.88 C15.54,10.88 14.79,10.13 14.79,9.21 C14.79,8.28 15.54,7.53 16.46,7.53 C17.39,7.53 18.14,8.28 18.14,9.21 C18.14,10.13 17.39,10.88 16.46,10.88 L16.46,10.88 Z M17.09,17.84 C16.81,18.44 16.09,18.70 15.49,18.42 C15.41,18.38 15.16,18.30 14.75,18.20 C14.01,18.04 13.10,17.93 12.00,17.93 C10.90,17.93 9.99,18.04 9.25,18.20 C8.84,18.30 8.59,18.38 8.51,18.42 C7.91,18.70 7.19,18.44 6.91,17.84 C6.63,17.24 6.89,16.53 7.49,16.25 C7.73,16.14 8.14,15.99 8.72,15.86 C9.63,15.66 10.72,15.53 12.00,15.53 C13.28,15.53 14.37,15.66 15.28,15.86 C15.86,15.99 16.27,16.14 16.51,16.25 C17.11,16.53 17.37,17.24 17.09,17.84 L17.09,17.84 Z M6.09,9.21 C6.09,8.28 6.84,7.53 7.77,7.53 C8.69,7.53 9.44,8.28 9.44,9.21 C9.44,10.13 8.69,10.88 7.77,10.88 C6.84,10.88 6.09,10.13 6.09,9.21 L6.09,9.21 Z M24.00,11.99 C24.00,5.37 18.62,0.00 12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.62,24.00 24.00,18.63 24.00,12.01 L24.00,12.00 L24.00,11.99 Z","face-smiley":"M16.50,11.00 C15.67,11.00 15.00,10.33 15.00,9.50 C15.00,8.67 15.67,8.00 16.50,8.00 C17.33,8.00 18.00,8.67 18.00,9.50 C18.00,10.33 17.33,11.00 16.50,11.00 M16.95,16.95 C15.63,18.27 13.87,19.00 12.00,19.00 C10.13,19.00 8.37,18.27 7.05,16.95 C6.66,16.56 6.66,15.93 7.05,15.54 C7.44,15.15 8.07,15.15 8.47,15.54 C9.41,16.48 10.66,17.00 12.00,17.00 C13.34,17.00 14.59,16.48 15.54,15.54 C15.93,15.14 16.56,15.15 16.95,15.54 C17.34,15.93 17.34,16.56 16.95,16.95 M6.00,9.50 C6.00,8.67 6.67,8.00 7.50,8.00 C8.33,8.00 9.00,8.67 9.00,9.50 C9.00,10.33 8.33,11.00 7.50,11.00 C6.67,11.00 6.00,10.33 6.00,9.50 M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00",filter:"M24.00,3.50 C24.00,2.40 23.10,1.50 22.00,1.50 L2.00,1.50 C0.90,1.50 0.00,2.40 0.00,3.50 C0.00,4.05 0.22,4.55 0.58,4.91 L0.58,4.91 L9.00,13.46 L9.00,22.50 L15.00,20.50 L15.00,13.45 L23.37,4.95 C23.76,4.59 24.00,4.07 24.00,3.50",flag:"M17.00,7.50 L22.00,0.00 L2.00,0.00 L2.00,22.00 C2.00,23.10 2.90,24.00 4.00,24.00 C5.10,24.00 6.00,23.10 6.00,22.00 L6.00,15.00 L22.00,15.00 L17.00,7.50 Z",flashlight:"M18.00,19.00 C18.55,19.00 19.00,18.55 19.00,18.00 L19.00,14.00 L14.00,14.00 L14.00,19.00 L18.00,19.00 Z M18.00,24.00 L14.00,24.00 L14.00,14.00 L24.00,14.00 L24.00,18.00 C24.00,21.31 21.31,24.00 18.00,24.00 L18.00,24.00 Z M6.00,19.00 L10.00,19.00 L10.00,14.00 L5.00,14.00 L5.00,18.00 C5.00,18.55 5.45,19.00 6.00,19.00 L6.00,19.00 Z M6.00,24.00 C2.69,24.00 0.00,21.31 0.00,18.00 L0.00,14.00 L10.00,14.00 L10.00,24.00 L6.00,24.00 Z M18.00,5.00 L14.00,5.00 L14.00,10.00 L19.00,10.00 L19.00,6.00 C19.00,5.45 18.55,5.00 18.00,5.00 L18.00,5.00 Z M18.00,0.00 C21.31,0.00 24.00,2.69 24.00,6.00 L24.00,10.00 L14.00,10.00 L14.00,0.00 L18.00,0.00 Z M6.00,5.00 C5.45,5.00 5.00,5.45 5.00,6.00 L5.00,10.00 L10.00,10.00 L10.00,5.00 L6.00,5.00 Z M6.00,0.00 L10.00,0.00 L10.00,10.00 L0.00,10.00 L0.00,6.00 C0.00,2.69 2.69,0.00 6.00,0.00 L6.00,0.00 Z",globe:"M15.49,20.83 C16.36,18.82 16.86,16.08 16.97,13.25 L21.41,13.25 C20.95,16.71 18.63,19.58 15.49,20.83 L15.49,20.83 Z M2.59,13.25 L7.03,13.25 C7.14,16.08 7.64,18.82 8.52,20.83 C5.37,19.58 3.05,16.71 2.59,13.25 L2.59,13.25 Z M8.52,3.17 C7.64,5.18 7.14,7.92 7.03,10.75 L2.59,10.75 C3.05,7.29 5.37,4.42 8.52,3.17 L8.52,3.17 Z M9.53,10.75 C9.76,5.43 11.40,2.54 12.00,2.50 L12.01,2.50 C12.68,2.56 14.25,5.51 14.47,10.75 L9.53,10.75 Z M12.01,21.50 C12.01,21.50 12.01,21.50 12.00,21.50 C11.40,21.46 9.76,18.57 9.53,13.25 L14.47,13.25 C14.25,18.49 12.68,21.44 12.01,21.50 L12.01,21.50 Z M21.41,10.75 L16.97,10.75 C16.86,7.92 16.36,5.18 15.49,3.17 C18.63,4.42 20.95,7.29 21.41,10.75 L21.41,10.75 Z M24.00,12.00 C24.00,5.39 18.62,0.01 12.01,0.00 C12.01,0.00 12.01,0.00 12.01,0.00 L12.00,0.00 L12.00,0.00 C5.38,0.00 0.00,5.38 0.00,12.00 C0.00,18.62 5.38,24.00 12.00,24.00 L12.00,24.00 L12.01,24.00 C12.01,24.00 12.01,24.00 12.01,24.00 C18.62,24.00 24.00,18.61 24.00,12.00 L24.00,12.00 Z","graph-bar":"M9.50,24.00 L9.50,4.50 C9.50,3.12 10.62,2.00 12.00,2.00 C13.38,2.00 14.50,3.12 14.50,4.50 L14.50,24.00 L9.50,24.00 Z M18.00,10.50 C18.00,9.12 19.12,8.00 20.50,8.00 C21.88,8.00 23.00,9.12 23.00,10.50 L23.00,24.00 L18.00,24.00 L18.00,10.50 Z M1.00,24.00 L1.00,13.50 C1.00,12.12 2.12,11.00 3.50,11.00 C4.88,11.00 6.00,12.12 6.00,13.50 L6.00,24.00 L1.00,24.00 Z",handle:"M3.00,15.00 L21.00,15.00 C21.55,15.00 22.00,15.45 22.00,16.00 C22.00,16.55 21.55,17.00 21.00,17.00 L3.00,17.00 C2.45,17.00 2.00,16.55 2.00,16.00 C2.00,15.45 2.45,15.00 3.00,15.00 Z M3.00,11.00 L21.00,11.00 C21.55,11.00 22.00,11.45 22.00,12.00 C22.00,12.55 21.55,13.00 21.00,13.00 L3.00,13.00 C2.45,13.00 2.00,12.55 2.00,12.00 C2.00,11.45 2.45,11.00 3.00,11.00 Z M3.00,7.00 L21.00,7.00 C21.55,7.00 22.00,7.45 22.00,8.00 C22.00,8.55 21.55,9.00 21.00,9.00 L3.00,9.00 C2.45,9.00 2.00,8.55 2.00,8.00 C2.00,7.45 2.45,7.00 3.00,7.00 Z",heart:"M11.98,22.25 L1.82,11.95 C-0.28,9.83 -0.65,6.40 1.18,4.03 C3.37,1.19 7.44,1.00 9.88,3.47 L11.98,5.61 L13.93,3.63 C16.03,1.50 19.41,1.13 21.75,2.98 C24.55,5.21 24.74,9.33 22.30,11.80 L11.98,22.25 Z","heart-broken":"M11.98,22.25 L1.82,11.95 C-0.28,9.83 -0.65,6.40 1.18,4.03 C3.37,1.19 7.44,1.00 9.88,3.47 L11.98,5.61 L13.93,3.63 C16.03,1.50 19.41,1.13 21.75,2.98 C24.55,5.21 24.74,9.33 22.30,11.80 L11.98,22.25 Z M15.30,9.54 C15.70,9.14 15.70,8.48 15.30,8.08 C14.90,7.68 14.25,7.68 13.85,8.08 L12.00,9.94 L10.15,8.08 C9.75,7.68 9.10,7.68 8.70,8.08 C8.30,8.48 8.30,9.14 8.70,9.54 L10.55,11.40 L8.70,13.26 C8.30,13.66 8.30,14.31 8.70,14.71 C9.10,15.11 9.75,15.12 10.15,14.71 L12.00,12.85 L13.85,14.71 C14.25,15.12 14.90,15.12 15.30,14.71 C15.70,14.31 15.70,13.66 15.30,13.26 L13.45,11.40 L15.30,9.54 Z",knoop:"M15.00,10.50 C14.17,10.50 13.50,9.83 13.50,9.00 C13.50,8.17 14.17,7.50 15.00,7.50 C15.83,7.50 16.50,8.17 16.50,9.00 C16.50,9.83 15.83,10.50 15.00,10.50 M15.00,16.50 C14.17,16.50 13.50,15.83 13.50,15.00 C13.50,14.17 14.17,13.50 15.00,13.50 C15.83,13.50 16.50,14.17 16.50,15.00 C16.50,15.83 15.83,16.50 15.00,16.50 M9.00,10.50 C8.17,10.50 7.50,9.83 7.50,9.00 C7.50,8.17 8.17,7.50 9.00,7.50 C9.83,7.50 10.50,8.17 10.50,9.00 C10.50,9.83 9.83,10.50 9.00,10.50 M9.00,16.50 C8.17,16.50 7.50,15.83 7.50,15.00 C7.50,14.17 8.17,13.50 9.00,13.50 C9.83,13.50 10.50,14.17 10.50,15.00 C10.50,15.83 9.83,16.50 9.00,16.50 M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00",lightbulb:"M20.00,8.00 C20.00,10.23 19.09,12.24 17.61,13.70 L17.63,13.70 C16.64,14.67 16.03,16.01 16.00,17.50 L16.00,17.50 L16.00,19.00 L8.00,19.00 L8.00,17.50 L8.00,17.50 C7.97,16.00 7.35,14.65 6.36,13.67 C4.90,12.22 4.00,10.22 4.00,8.00 C4.00,3.58 7.58,0.00 12.00,0.00 C16.42,0.00 20.00,3.58 20.00,8.00 Z M8.00,22.50 L8.00,21.00 L16.00,21.00 L16.00,22.50 C16.00,23.33 15.33,24.00 14.50,24.00 L9.50,24.00 C8.67,24.00 8.00,23.33 8.00,22.50 Z",link:"M21.00,15.05 C22.10,15.05 23.00,15.95 23.00,17.05 L23.00,21.00 C23.00,22.10 22.10,23.00 21.00,23.00 L3.00,23.00 C1.90,23.00 1.00,22.10 1.00,21.00 L1.00,3.00 C1.00,1.90 1.90,1.00 3.00,1.00 L7.00,1.00 C8.10,1.00 9.00,1.90 9.00,3.00 C9.00,4.11 8.10,5.00 7.00,5.00 L5.00,5.00 L5.00,19.00 L19.00,19.00 L19.00,17.05 C19.00,15.95 19.90,15.05 21.00,15.05 Z M12.00,14.00 C11.49,14.00 10.98,13.80 10.59,13.41 C9.80,12.63 9.80,11.37 10.59,10.59 L16.16,5.00 L14.00,5.01 L14.00,5.01 C12.90,5.01 12.00,4.11 12.00,3.01 C12.00,1.90 12.89,1.01 14.00,1.01 L20.99,1.00 L21.00,1.00 L22.99,1.00 L22.99,3.00 L22.99,3.00 L23.00,10.00 C23.00,11.10 22.11,12.00 21.00,12.00 L21.00,12.00 C19.90,12.00 19.00,11.11 19.00,10.00 L19.00,7.83 L13.41,13.41 C13.02,13.80 12.51,14.00 12.00,14.00 Z",location:"M12.00,4.50 C13.66,4.50 15.00,5.84 15.00,7.50 C15.00,9.16 13.66,10.50 12.00,10.50 C10.34,10.50 9.00,9.16 9.00,7.50 C9.00,5.84 10.34,4.50 12.00,4.50 M19.50,7.50 C19.50,3.36 16.14,0.00 12.00,0.00 C7.86,0.00 4.50,3.36 4.50,7.50 C4.50,8.80 4.86,10.00 5.44,11.06 L5.40,11.06 L12.00,24.00 L18.60,11.06 L18.56,11.06 C19.14,10.00 19.50,8.80 19.50,7.50",lock:"M8.00,10.00 L8.00,7.00 C8.00,4.79 9.79,3.00 12.00,3.00 C14.21,3.00 16.00,4.79 16.00,7.00 L16.00,10.00 L8.00,10.00 Z M19.00,10.02 L19.00,7.00 C19.00,3.14 15.86,0.00 12.00,0.00 C8.14,0.00 5.00,3.14 5.00,7.00 L5.00,10.02 C3.91,11.48 3.25,13.29 3.25,15.25 C3.25,20.08 7.17,24.00 12.00,24.00 C16.83,24.00 20.75,20.08 20.75,15.25 C20.75,13.29 20.09,11.48 19.00,10.02 L19.00,10.02 Z",menu:"M21.50,9.50 C22.88,9.50 24.00,10.63 24.00,12.00 C24.00,13.38 22.88,14.50 21.50,14.50 L2.50,14.50 C1.13,14.50 0.00,13.38 0.00,12.00 C0.00,10.63 1.13,9.50 2.50,9.50 L21.50,9.50 Z M2.50,6.50 C1.13,6.50 0.00,5.38 0.00,4.00 C0.00,2.63 1.13,1.50 2.50,1.50 L21.50,1.50 C22.88,1.50 24.00,2.63 24.00,4.00 C24.00,5.38 22.88,6.50 21.50,6.50 L2.50,6.50 Z M21.50,17.50 C22.88,17.50 24.00,18.63 24.00,20.00 C24.00,21.38 22.88,22.50 21.50,22.50 L2.50,22.50 C1.13,22.50 0.00,21.38 0.00,20.00 C0.00,18.63 1.13,17.50 2.50,17.50 L21.50,17.50 Z",move:"M14.30,18.17 C14.79,17.68 15.58,17.68 16.07,18.17 C16.56,18.66 16.56,19.45 16.07,19.93 L12.00,24.00 L7.93,19.93 C7.45,19.45 7.45,18.66 7.93,18.17 C8.42,17.68 9.21,17.68 9.70,18.17 L10.75,19.21 L10.75,15.25 C10.75,14.56 11.31,14.00 12.00,14.00 C12.69,14.00 13.25,14.56 13.25,15.25 L13.25,19.21 L14.30,18.17 Z M4.79,13.25 L5.83,14.30 C6.32,14.79 6.32,15.58 5.83,16.07 C5.35,16.55 4.55,16.55 4.07,16.07 L0.00,12.00 L4.07,7.93 C4.55,7.45 5.35,7.45 5.83,7.93 C6.32,8.42 6.32,9.21 5.83,9.70 L4.79,10.75 L8.75,10.75 C9.44,10.75 10.00,11.31 10.00,12.00 C10.00,12.69 9.44,13.25 8.75,13.25 L4.79,13.25 Z M19.93,7.93 L24.00,12.00 L19.93,16.07 C19.45,16.55 18.66,16.55 18.17,16.07 C17.68,15.58 17.68,14.79 18.17,14.30 L19.21,13.25 L15.25,13.25 C14.56,13.25 14.00,12.69 14.00,12.00 C14.00,11.31 14.56,10.75 15.25,10.75 L19.21,10.75 L18.17,9.70 C17.68,9.21 17.68,8.42 18.17,7.93 C18.66,7.45 19.45,7.45 19.93,7.93 Z M9.70,5.83 C9.21,6.32 8.42,6.32 7.93,5.83 C7.45,5.34 7.45,4.55 7.93,4.07 L12.00,-0.00 L16.07,4.07 C16.56,4.55 16.56,5.34 16.07,5.83 C15.58,6.32 14.79,6.32 14.30,5.83 L13.25,4.79 L13.25,8.75 C13.25,9.44 12.69,10.00 12.00,10.00 C11.31,10.00 10.75,9.44 10.75,8.75 L10.75,4.79 L9.70,5.83 Z",pause:"M7.00,0.00 C8.65,0.00 10.00,1.35 10.00,3.00 L10.00,21.00 C10.00,22.65 8.65,24.00 7.00,24.00 C5.35,24.00 4.00,22.65 4.00,21.00 L4.00,3.00 C4.00,1.35 5.35,0.00 7.00,0.00 Z M17.00,0.00 C18.65,0.00 20.00,1.35 20.00,3.00 L20.00,21.00 C20.00,22.65 18.65,24.00 17.00,24.00 C15.35,24.00 14.00,22.65 14.00,21.00 L14.00,3.00 C14.00,1.35 15.35,0.00 17.00,0.00 Z",people:"M18.00,14.00 C21.31,14.00 24.00,16.69 24.00,20.00 L24.00,22.00 L0.00,22.00 L0.00,19.50 C0.00,15.36 3.36,12.00 7.50,12.00 C10.22,12.00 12.59,13.45 13.91,15.62 C14.98,14.62 16.42,14.00 18.00,14.00 Z M7.50,11.00 C5.01,11.00 3.00,8.98 3.00,6.50 C3.00,4.01 5.01,2.00 7.50,2.00 C9.98,2.00 12.00,4.01 12.00,6.50 C12.00,8.98 9.98,11.00 7.50,11.00 Z M18.00,13.00 C16.34,13.00 15.00,11.66 15.00,10.00 C15.00,8.34 16.34,7.00 18.00,7.00 C19.66,7.00 21.00,8.34 21.00,10.00 C21.00,11.66 19.66,13.00 18.00,13.00 Z",person:"M12.00,12.00 C6.62,12.00 2.25,16.48 2.25,22.00 L2.25,24.00 L21.75,24.00 L21.75,22.00 C21.75,16.48 17.39,12.00 12.00,12.00 M12.00,10.00 C14.69,10.00 16.88,7.76 16.88,5.00 C16.88,2.24 14.69,0.00 12.00,0.00 C9.31,0.00 7.13,2.24 7.13,5.00 C7.13,7.76 9.31,10.00 12.00,10.00","person-add":"M16.50,11.50 C14.02,11.50 12.00,9.48 12.00,7.00 C12.00,4.51 14.02,2.50 16.50,2.50 C18.98,2.50 21.00,4.51 21.00,7.00 C21.00,9.48 18.98,11.50 16.50,11.50 Z M9.25,12.50 L6.50,12.50 L6.50,15.25 C6.50,15.94 5.94,16.50 5.25,16.50 C4.56,16.50 4.00,15.94 4.00,15.25 L4.00,12.50 L1.25,12.50 C0.56,12.50 0.00,11.94 0.00,11.25 C0.00,10.56 0.56,10.00 1.25,10.00 L4.00,10.00 L4.00,7.25 C4.00,6.56 4.56,6.00 5.25,6.00 C5.94,6.00 6.50,6.56 6.50,7.25 L6.50,10.00 L9.25,10.00 C9.94,10.00 10.50,10.56 10.50,11.25 C10.50,11.94 9.94,12.50 9.25,12.50 Z M16.50,12.50 C20.64,12.50 24.00,15.86 24.00,20.00 L24.00,21.50 L9.00,21.50 L9.00,20.00 C9.00,15.86 12.36,12.50 16.50,12.50 Z",pin:"M18.00,13.50 C18.00,11.28 16.79,9.35 15.00,8.31 L15.00,2.45 C16.14,2.22 17.00,1.21 17.00,0.00 L7.00,0.00 C7.00,1.21 7.86,2.22 9.00,2.45 L9.00,8.31 C7.21,9.35 6.00,11.28 6.00,13.50 L11.00,13.50 L11.00,21.96 L12.00,24.00 L13.00,21.96 L13.00,13.50 L18.00,13.50 Z","pin-hide":"M9.13,6.37 C9.62,6.85 9.62,7.64 9.13,8.13 L6.52,10.75 L9.13,13.37 C9.62,13.85 9.62,14.64 9.13,15.13 C8.65,15.62 7.86,15.62 7.37,15.13 L4.75,12.52 L2.13,15.13 C1.65,15.62 0.85,15.62 0.37,15.13 C-0.12,14.64 -0.12,13.85 0.37,13.37 L2.98,10.75 L0.37,8.13 C-0.12,7.64 -0.12,6.85 0.37,6.37 C0.85,5.88 1.65,5.88 2.13,6.37 L4.75,8.98 L7.37,6.37 C7.86,5.88 8.65,5.88 9.13,6.37 Z M20.50,8.69 C21.99,9.56 23.00,11.15 23.00,13.00 L19.00,13.00 L19.00,20.96 L18.00,23.00 L17.00,20.96 L17.00,13.00 L13.00,13.00 C13.00,11.15 14.01,9.56 15.50,8.69 L15.50,2.93 C14.64,2.71 14.00,1.93 14.00,1.00 L22.00,1.00 C22.00,1.93 21.36,2.71 20.50,2.93 L20.50,8.69 Z",pinterest:"M0.00,12.00 C0.00,17.12 3.21,21.50 7.73,23.22 C7.62,22.28 7.50,20.74 7.75,19.65 C7.97,18.72 9.16,13.71 9.16,13.71 C9.16,13.71 8.80,13.00 8.80,11.94 C8.80,10.28 9.76,9.04 10.96,9.04 C11.98,9.04 12.47,9.80 12.47,10.72 C12.47,11.75 11.82,13.28 11.48,14.70 C11.20,15.89 12.08,16.86 13.25,16.86 C15.37,16.86 17.01,14.62 17.01,11.39 C17.01,8.53 14.95,6.53 12.02,6.53 C8.62,6.53 6.62,9.08 6.62,11.71 C6.62,12.74 7.02,13.84 7.51,14.44 C7.61,14.56 7.62,14.66 7.59,14.78 C7.50,15.16 7.30,15.97 7.26,16.14 C7.21,16.35 7.09,16.40 6.86,16.30 C5.37,15.60 4.44,13.42 4.44,11.67 C4.44,7.90 7.18,4.44 12.33,4.44 C16.48,4.44 19.70,7.39 19.70,11.34 C19.70,15.46 17.10,18.77 13.50,18.77 C12.29,18.77 11.15,18.14 10.76,17.40 C10.76,17.40 10.16,19.68 10.02,20.24 C9.73,21.32 8.95,22.69 8.47,23.47 C9.58,23.82 10.77,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00",play:"M20.62,9.48 L6.63,0.48 C4.63,-0.80 2.00,0.63 2.00,3.00 L2.00,3.06 L2.00,21.00 C2.00,23.37 4.63,24.80 6.63,23.52 L20.62,14.52 C22.46,13.34 22.46,10.66 20.62,9.48","question-mark":"M14.34,21.20 C14.34,22.77 13.15,24.00 11.56,24.00 C9.98,24.00 8.79,22.77 8.79,21.20 C8.79,19.63 9.98,18.40 11.56,18.40 C13.15,18.40 14.34,19.63 14.34,21.20 M11.81,10.32 C13.22,9.09 15.11,8.27 15.11,6.45 C15.11,5.00 13.87,4.09 12.16,4.09 C10.04,4.09 8.64,5.57 8.61,7.52 L3.75,7.52 C3.88,3.30 6.96,0.00 12.34,0.00 C17.20,0.00 20.25,2.52 20.25,6.32 C20.25,8.68 19.16,10.13 17.95,11.10 C16.27,12.43 15.11,12.99 14.46,13.71 C13.96,14.28 13.84,14.75 13.81,15.66 L9.45,15.66 C9.45,13.02 10.10,11.76 11.81,10.32",remove:"M17.75,13.25 L6.25,13.25 C5.56,13.25 5.00,12.69 5.00,12.00 C5.00,11.31 5.56,10.75 6.25,10.75 L17.75,10.75 C18.44,10.75 19.00,11.31 19.00,12.00 C19.00,12.69 18.44,13.25 17.75,13.25 M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00",report:"M7.91,18.89 C9.11,19.60 10.51,20.01 12.00,20.01 C16.42,20.01 20.01,16.42 20.01,12.00 C20.01,10.51 19.60,9.11 18.89,7.91 L7.91,18.89 Z M5.09,16.06 L16.06,5.09 C14.87,4.39 13.48,3.99 12.00,3.99 C7.58,3.99 3.99,7.58 3.99,12.00 C3.99,13.48 4.39,14.87 5.09,16.06 Z M12.00,24.00 C5.37,24.00 0.00,18.63 0.00,12.00 C0.00,5.37 5.37,0.00 12.00,0.00 C18.63,0.00 24.00,5.37 24.00,12.00 C24.00,18.63 18.63,24.00 12.00,24.00 Z",search:"M10.00,16.00 C6.69,16.00 4.00,13.31 4.00,10.00 C4.00,6.69 6.69,4.00 10.00,4.00 C13.31,4.00 16.00,6.69 16.00,10.00 C16.00,13.31 13.31,16.00 10.00,16.00 M23.12,18.88 L18.86,14.62 C19.59,13.24 20.00,11.67 20.00,10.00 C20.00,4.48 15.52,0.00 10.00,0.00 C4.48,0.00 0.00,4.48 0.00,10.00 C0.00,15.52 4.48,20.00 10.00,20.00 C11.67,20.00 13.24,19.59 14.62,18.86 L18.88,23.12 C20.05,24.29 21.95,24.29 23.12,23.12 C24.29,21.95 24.29,20.05 23.12,18.88","shopping-bag":"M9.50,5.00 C9.50,3.62 10.62,2.50 12.00,2.50 C13.38,2.50 14.50,3.62 14.50,5.00 L14.50,7.00 L9.50,7.00 L9.50,5.00 Z M17.00,7.00 L17.00,5.00 C17.00,2.24 14.76,0.00 12.00,0.00 C9.24,0.00 7.00,2.24 7.00,5.00 L7.00,7.00 L2.00,7.00 L2.00,22.00 C2.00,23.10 2.90,24.00 4.00,24.00 L20.00,24.00 C21.10,24.00 22.00,23.10 22.00,22.00 L22.00,7.00 L17.00,7.00 Z",smiley:"M12.03,19.29 L11.97,19.29 C8.49,19.26 7.05,16.98 6.99,16.88 C6.74,16.47 6.85,15.92 7.26,15.66 C7.65,15.39 8.18,15.51 8.43,15.92 C8.49,16.00 9.49,17.50 12.00,17.51 C14.51,17.50 15.52,15.91 15.56,15.84 C15.81,15.43 16.34,15.30 16.74,15.56 C17.13,15.82 17.26,16.36 17.02,16.77 C16.96,16.87 15.52,19.26 12.03,19.29 Z M18.00,9.43 C18.00,10.38 17.23,11.14 16.29,11.14 C15.34,11.14 14.57,10.38 14.57,9.43 C14.57,8.48 15.34,7.71 16.29,7.71 C17.23,7.71 18.00,8.48 18.00,9.43 Z M6.00,9.43 C6.00,8.48 6.77,7.71 7.71,7.71 C8.66,7.71 9.43,8.48 9.43,9.43 C9.43,10.38 8.66,11.14 7.71,11.14 C6.77,11.14 6.00,10.38 6.00,9.43 Z","smiley-outline":"M12.03,19.29 L11.97,19.29 C8.49,19.26 7.05,16.98 6.99,16.88 C6.74,16.47 6.85,15.92 7.26,15.66 C7.65,15.39 8.18,15.51 8.43,15.92 C8.49,16.00 9.49,17.50 12.00,17.51 C14.51,17.50 15.52,15.91 15.56,15.84 C15.81,15.43 16.34,15.30 16.74,15.56 C17.13,15.82 17.26,16.36 17.02,16.77 C16.96,16.87 15.52,19.26 12.03,19.29 Z M18.00,9.43 C18.00,10.38 17.23,11.14 16.29,11.14 C15.34,11.14 14.57,10.38 14.57,9.43 C14.57,8.48 15.34,7.71 16.29,7.71 C17.23,7.71 18.00,8.48 18.00,9.43 Z M6.00,9.43 C6.00,8.48 6.77,7.71 7.71,7.71 C8.66,7.71 9.43,8.48 9.43,9.43 C9.43,10.38 8.66,11.14 7.71,11.14 C6.77,11.14 6.00,10.38 6.00,9.43 Z M12.00,0.00 C5.40,0.00 0.00,5.40 0.00,12.00 C0.00,18.60 5.40,24.00 12.00,24.00 C18.60,24.00 24.00,18.60 24.00,12.00 C24.00,5.40 18.60,0.00 12.00,0.00 L12.00,0.00 Z M12.00,22.20 C6.45,22.20 1.80,17.70 1.80,12.00 C1.80,6.30 6.30,1.80 12.00,1.80 C17.70,1.80 22.20,6.30 22.20,12.00 C22.20,17.70 17.55,22.20 12.00,22.20 L12.00,22.20 Z",send:"M6.00 6.00 L0.00 12.00 L7.67 14.56 L21.00 3.00 L9.44 16.34 L12.00 24.00 L18.00 18.00 L24.00 0.00 ",share:"M21.00,14.00 C22.10,14.00 23.00,14.90 23.00,16.00 L23.00,22.00 C23.00,23.10 22.10,24.00 21.00,24.00 L3.00,24.00 C1.90,24.00 1.00,23.10 1.00,22.00 L1.00,16.00 C1.00,14.90 1.90,14.00 3.00,14.00 C4.10,14.00 5.00,14.90 5.00,16.00 L5.00,20.00 L19.00,20.00 L19.00,16.00 C19.00,14.90 19.90,14.00 21.00,14.00 Z M8.82,8.84 C8.04,9.62 6.77,9.63 5.99,8.84 C5.21,8.06 5.20,6.80 5.98,6.02 L11.99,0.00 L18.01,6.01 C18.79,6.79 18.80,8.06 18.02,8.84 C17.24,9.62 15.97,9.63 15.19,8.84 L13.99,7.65 L13.99,13.83 C13.99,14.93 13.10,15.83 11.99,15.83 C10.89,15.83 9.99,14.93 9.99,13.83 L9.99,7.66 L8.82,8.84 Z",sound:"M20.48,3.51 C22.75,5.78 24.00,8.79 24.00,12.00 C24.00,15.20 22.75,18.22 20.49,20.48 C20.24,20.73 19.92,20.85 19.60,20.85 C19.28,20.85 18.96,20.73 18.72,20.48 C18.23,20.00 18.23,19.21 18.72,18.72 C20.51,16.92 21.50,14.54 21.50,12.00 C21.50,9.46 20.51,7.07 18.71,5.28 C18.23,4.79 18.23,4.00 18.71,3.51 C19.20,3.02 19.99,3.02 20.48,3.51 Z M5.00,7.94 L5.00,7.96 L12.00,1.00 L12.00,23.00 L5.00,16.91 L5.00,16.94 L2.00,16.94 C0.90,16.94 0.00,16.04 0.00,14.94 L0.00,9.94 C0.00,8.83 0.90,7.94 2.00,7.94 L5.00,7.94 Z M16.95,7.05 C18.27,8.37 19.00,10.13 19.00,12.00 C19.00,13.87 18.27,15.63 16.95,16.95 C16.71,17.19 16.39,17.31 16.07,17.31 C15.75,17.31 15.43,17.19 15.18,16.95 C14.69,16.46 14.69,15.67 15.18,15.18 C16.03,14.33 16.50,13.20 16.50,12.00 C16.50,10.80 16.03,9.67 15.18,8.82 C14.69,8.33 14.69,7.54 15.18,7.05 C15.67,6.56 16.46,6.56 16.95,7.05 Z",speech:"M12.00,0.00 C5.85,0.00 0.75,4.94 0.75,11.08 C0.75,13.78 1.65,16.32 3.45,18.27 L2.10,23.51 C1.95,23.81 2.40,24.11 2.70,23.96 L7.95,21.41 C9.30,21.86 10.65,22.16 12.00,22.16 C18.15,22.16 23.25,17.22 23.25,11.08 C23.25,4.94 18.15,0.00 12.00,0.00","speech-ellipsis":"M18.00,12.50 C17.17,12.50 16.50,11.83 16.50,11.00 C16.50,10.17 17.17,9.50 18.00,9.50 C18.83,9.50 19.50,10.17 19.50,11.00 C19.50,11.83 18.83,12.50 18.00,12.50 M12.00,12.50 C11.17,12.50 10.50,11.83 10.50,11.00 C10.50,10.17 11.17,9.50 12.00,9.50 C12.83,9.50 13.50,10.17 13.50,11.00 C13.50,11.83 12.83,12.50 12.00,12.50 M6.00,12.50 C5.17,12.50 4.50,11.83 4.50,11.00 C4.50,10.17 5.17,9.50 6.00,9.50 C6.83,9.50 7.50,10.17 7.50,11.00 C7.50,11.83 6.83,12.50 6.00,12.50 M12.00,0.00 C5.92,0.00 1.00,4.92 1.00,11.00 C1.00,13.65 1.94,16.09 3.50,17.99 L2.00,24.00 L7.34,20.95 C8.75,21.62 10.33,22.00 12.00,22.00 C18.07,22.00 23.00,17.07 23.00,11.00 C23.00,4.92 18.07,0.00 12.00,0.00",tag:"M6.00,8.00 C7.10,8.00 8.00,7.10 8.00,6.00 C8.00,4.90 7.10,4.00 6.00,4.00 C4.90,4.00 4.00,4.90 4.00,6.00 C4.00,7.10 4.90,8.00 6.00,8.00 M13.36,1.80 L22.20,10.64 C23.27,11.70 23.27,13.43 22.20,14.49 L14.49,22.20 C13.43,23.27 11.70,23.27 10.64,22.20 L1.80,13.36 C1.29,12.85 1.00,12.16 1.00,11.44 L1.00,3.73 C1.00,2.22 2.22,1.00 3.73,1.00 L11.44,1.00 C12.16,1.00 12.85,1.29 13.36,1.80"},We=Object.keys(Ie);function He(t){var e=t.accessibilityLabel,n=t.color,i=void 0===n?"gray":n,o=t.icon,a=t.inline,l=t.size,s=void 0===l?16:l,p=xt()(De.icon,Ot[i],Bt({},De.iconBlock,!a)),c=Ie[o],d=""===e||null;return Object(r.createElement)("svg",{className:p,height:s,width:s,viewBox:"0 0 24 24","aria-hidden":d,"aria-label":e,role:"img"},Object(r.createElement)("title",null,e),Object(r.createElement)("path",{d:c}))}He.icons=We,He.propTypes={accessibilityLabel:s.a.string.isRequired,color:s.a.oneOf(["blue","darkGray","eggplant","gray","green","lightGray","maroon","midnight","navy","olive","orange","orchid","pine","purple","red","watermelon","white"]),icon:s.a.oneOf(We).isRequired,inline:s.a.bool,size:s.a.oneOfType([s.a.number,s.a.string])};var Ye={img:"_mj _3k _2h _3w","scaled-img":"_mk _3u",contain:"_ml _mk _3u",cover:"_mm _mk _3u"},Ze=function(t){return"cover"===t||"contain"===t},Ue=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.handleLoad=function(){r.props.onLoad&&r.props.onLoad()},r.handleError=function(){r.props.onError&&r.props.onError()},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentDidMount",value:function(){Ze(this.props.fit)&&this.loadImage()}},{key:"componentDidUpdate",value:function(t){var e=this.props,n=e.fit,r=e.src;Ze(n)&&t.src!==r&&this.loadImage()}},{key:"loadImage",value:function(){if("undefined"!=typeof window){var t=new window.Image;t.onload=this.handleLoad,t.onerror=this.handleError,t.src=this.props.src}}},{key:"render",value:function(){var t=this.props,e=t.alt,n=t.color,i=t.children,o=t.fit,a=t.naturalHeight,l=t.naturalWidth,s=t.sizes,p=t.src,c=t.srcSet,d=Ze(o),u=i?Object(r.createElement)(ze,{position:"absolute",top:!0,left:!0,bottom:!0,right:!0,overflow:"hidden"},i):null;return d?Object(r.createElement)("div",{"aria-label":e,className:Ye[o],style:{backgroundColor:n,backgroundImage:"url('"+p+"')"},role:"img"},u):Object(r.createElement)(ze,{position:"relative",dangerouslySetInlineStyle:{__style:{backgroundColor:n,paddingBottom:a/l*100+"%"}}},Object(r.createElement)("img",{alt:e,className:Ye.img,onError:this.handleError,onLoad:this.handleLoad,sizes:s,src:p,srcSet:c}),u)}}]),e}(r.PureComponent);Ue.propTypes={alt:s.a.string.isRequired,children:s.a.node,color:s.a.string,fit:s.a.oneOf(["contain","cover","none"]),naturalHeight:s.a.number.isRequired,naturalWidth:s.a.number.isRequired,onError:s.a.func,onLoad:s.a.func,sizes:s.a.string,src:s.a.string.isRequired,srcSet:s.a.string},Ue.defaultProps={color:"transparent",fit:"none"};var Xe={Mask:"_mn _3o _3u",square:"_mo _53",rounded:"_mp _56",circle:"_mq _54",wash:"_mr _3w _40 _41 _3z _3y"};function Ge(t){var e=t.children,n=t.shape,i=void 0===n?"square":n,o=t.width,a=t.height,l=t.wash,s=void 0!==l&&l;return Object(r.createElement)("div",{className:xt()(Xe.Mask,Xe[i]),style:{width:o,height:a}},e,s&&Object(r.createElement)("div",{className:Xe.wash}))}Ge.propTypes={children:s.a.node,height:s.a.oneOfType([s.a.number,s.a.string]),shape:s.a.oneOf(["circle","rounded","square"]),width:s.a.oneOfType([s.a.number,s.a.string]),wash:s.a.bool};var $e={antialiased:"_ms",sansSerif:"_mt",letterSpacing:"_mu",leadingShort:"_mv",leadingTall:"_mw",fontWeightNormal:"_mx",fontWeightBold:"_my",fontStyleRegular:"_mz",fontStyleItalic:"_n0",underline:"_n1",noUnderline:"_n2",breakWord:"_n3",truncate:"_n4",alignLeft:"_n5",alignRight:"_n6",alignCenter:"_n7",textJustify:"_n8"};s.a.string.isRequired,s.a.string,s.a.oneOf(["sm","md","lg"]),s.a.bool;var Ke={Text:"_nv _ms _mt _mu",fontSize1:"_nw",fontSize2:"_nx",fontSize3:"_ny",fontSize4:"_nz",fontSize5:"_o0",smFontSize1:"_o1",smFontSize2:"_o2",smFontSize3:"_o3",smFontSize4:"_o4",smFontSize5:"_o5",mdFontSize1:"_o6",mdFontSize2:"_o7",mdFontSize3:"_o8",mdFontSize4:"_o9",mdFontSize5:"_oa",lgFontSize1:"_ob",lgFontSize2:"_oc",lgFontSize3:"_od",lgFontSize4:"_oe",lgFontSize5:"_of"},Ve={xs:1,sm:2,md:3,lg:4,xl:5};function Je(t){var e=t.align,n=void 0===e?"left":e,i=t.bold,o=void 0!==i&&i,a=t.children,l=t.color,s=void 0===l?"darkGray":l,p=t.inline,c=void 0!==p&&p,d=t.italic,u=void 0!==d&&d,g=t.overflow,m=void 0===g?"breakWord":g,f=t.size,h=void 0===f?"md":f,_=t.smSize,x=t.mdSize,b=t.lgSize,y=t.leading,v=void 0===y?"short":y,C=t.truncate,w=void 0!==C&&C,k=t.__dangerouslyIncreaseLineHeight,M=void 0!==k&&k,L=Ve[h],O=Ve[_],j=Ve[x],R=Ve[b],E=xt()(Ke.Text,Ke["fontSize"+L],b&&Ke["lgFontSize"+R],x&&Ke["mdFontSize"+j],_&&Ke["smFontSize"+O],"blue"===s&&Ot.blue,"darkGray"===s&&Ot.darkGray,"eggplant"===s&&Ot.eggplant,"gray"===s&&Ot.gray,"green"===s&&Ot.green,"lightGray"===s&&Ot.lightGray,"maroon"===s&&Ot.maroon,"midnight"===s&&Ot.midnight,"navy"===s&&Ot.navy,"olive"===s&&Ot.olive,"orange"===s&&Ot.orange,"orchid"===s&&Ot.orchid,"pine"===s&&Ot.pine,"purple"===s&&Ot.purple,"red"===s&&Ot.red,"watermelon"===s&&Ot.watermelon,"white"===s&&Ot.white,"short"===v&&$e.leadingShort,("tall"===v||M)&&$e.leadingTall,"center"===n&&$e.alignCenter,"justify"===n&&$e.alignJustify,"left"===n&&$e.alignLeft,"right"===n&&$e.alignRight,"breakWord"===m&&$e.breakWord,u&&$e.fontStyleItalic,!u&&$e.fontStyleNormal,o&&$e.fontWeightBold,!o&&$e.fontWeightNormal,w&&$e.truncate),S=c?"span":"div";return Object(r.createElement)(S,Nt({className:E},w&&"string"==typeof a?{title:a}:null),a)}Je.propTypes={__dangerouslyIncreaseLineHeight:s.a.bool,align:s.a.oneOf(["left","right","center","justify"]),bold:s.a.bool,children:s.a.node,color:s.a.oneOf(["green","pine","olive","blue","navy","midnight","purple","orchid","eggplant","maroon","watermelon","orange","darkGray","gray","lightGray","red","white"]),inline:s.a.bool,italic:s.a.bool,leading:s.a.oneOf(["tall","short"]),lgSize:s.a.oneOf(["xs","sm","md","lg","xl"]),mdSize:s.a.oneOf(["xs","sm","md","lg","xl"]),overflow:s.a.oneOf(["normal","breakWord"]),size:s.a.oneOf(["xs","sm","md","lg","xl"]),smSize:s.a.oneOf(["xs","sm","md","lg","xl"]),truncate:s.a.bool},s.a.bool,s.a.bool,s.a.string,s.a.oneOf(["blue","gray","red","transparent","white"]),s.a.bool,s.a.bool,s.a.string,s.a.func,s.a.oneOf(["sm","md","lg"]),s.a.string.isRequired,s.a.oneOf(["button","submit"]);var Qe="_og _3w _56 _3y _3z _40 _41",tn="_oh";((function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={hovered:!1},r.handleMouseEnter=function(t){var e=r.props.onMouseEnter;r.setState({hovered:!0},e&&function(){return e({event:t})})},r.handleMouseLeave=function(t){var e=r.props.onMouseLeave;r.setState({hovered:!1},e&&function(){return e({event:t})})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"render",value:function(){var t=this.props,e=t.active,n=t.children,i=t.image,o=this.state.hovered,a=xt()(Qe,Bt({},tn,e||null==e&&o));return Object(r.createElement)(ze,{onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,position:"relative"},i&&Object(r.createElement)(ze,{marginBottom:1},i),Object(r.createElement)(ze,null,n),Object(r.createElement)("div",{className:a}))}}]),e})(r.Component)).propTypes={active:s.a.bool,children:s.a.node,image:s.a.node,onMouseEnter:s.a.func,onMouseLeave:s.a.func};var en={check:"_oj _3k _42 _43 _4b _4l",checkEnabled:"_ok _nn",checkDarkGray:"_ol _5l",checkGray:"_om _5j",checkLightGray:"_on _5h",checkWhite:"_oo _5f",checkFocused:"_op _3j",checkSm:"_oq",checkMd:"_or",input:"_os _3w _jr",inputEnabled:"_ot _nn",inputSm:"_ou",inputMd:"_ov"},nn=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={focused:!1},r.handleChange=function(t){var e=t.target.checked;r.props.onChange({event:t,checked:e})},r.handleBlur=function(){return r.setState({focused:!1})},r.handleFocus=function(){return r.setState({focused:!0})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentDidMount",value:function(){this.props.indeterminate&&this.setIndeterminate(!!this.props.indeterminate)}},{key:"componentDidUpdate",value:function(t){t.indeterminate!==this.props.indeterminate&&this.setIndeterminate(!!this.props.indeterminate)}},{key:"setIndeterminate",value:function(t){this.input&&(this.input.indeterminate=t)}},{key:"render",value:function(){var t,e,n=this,i=this.props,o=i.checked,a=i.disabled,l=i.id,s=i.indeterminate,p=i.name,c=i.size;return Object(r.createElement)(ze,{position:"relative"},Object(r.createElement)("input",{checked:o,className:xt()(en.input,(t={},Bt(t,en.inputEnabled,!a),Bt(t,en.indeterminate,s),Bt(t,en.inputSm,"sm"===c),Bt(t,en.inputMd,"md"===c),t)),disabled:a,id:l,name:p,onBlur:this.handleBlur,onChange:this.handleChange,onFocus:this.handleFocus,ref:function(t){n.input=t},type:"checkbox"}),Object(r.createElement)("div",{className:xt()(en.check,a?o||s?en.checkGray:en.checkLightGray:o||s?en.checkDarkGray:en.checkWhite,(e={},Bt(e,en.checkEnabled,!a),Bt(e,en.checkFocused,this.state.focused),Bt(e,en.checkMd,"md"===c),Bt(e,en.checkSm,"sm"===c),e))},(o||s)&&Object(r.createElement)(He,{accessibilityLabel:"",color:"white",icon:s?"dash":"check",size:"sm"===c?8:12})))}}]),e}(r.Component);nn.propTypes={checked:s.a.bool,disabled:s.a.bool,id:s.a.string.isRequired,indeterminate:s.a.bool,name:s.a.string,onChange:s.a.func.isRequired,size:s.a.oneOf(["sm","md"])},nn.defaultProps={checked:!1,disabled:!1,indeterminate:!1,size:"md"};var rn=function(t){function e(){return Tt(this,e),Ft(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return zt(e,t),Pt(e,[{key:"render",value:function(){var t=this.props,e=t.Item,n=t.layout,i=t.viewportTop,o=void 0===i?0:i,a=t.viewportLeft,l=void 0===a?0:a,s=Math.max.apply(Math,At(n.map(function(t){return t.left+t.width}))),p=Math.max.apply(Math,At(n.map(function(t){return t.top+t.height}))),c=this.props,d=c.viewportWidth,u=void 0===d?s:d,g=c.viewportHeight,m=void 0===g?p:g,f=n.reduce(function(t,e,n){return e.top+e.height>o&&e.top<m+o&&e.left<u+l&&e.left+e.width>l&&t.push(Nt({idx:n},e)),t},[]);return Object(r.createElement)("div",{className:jt.relative,style:{width:s,height:p}},f.map(function(t){var n=t.idx,i=qt(t,["idx"]);return Object(r.createElement)("div",{key:n,className:jt.absolute,style:i},Object(r.createElement)(e,{idx:n}))}))}}]),e}(r.PureComponent);rn.propTypes={Item:s.a.any,layout:s.a.arrayOf(s.a.exact({top:s.a.number.isRequired,left:s.a.number.isRequired,width:s.a.number.isRequired,height:s.a.number.isRequired}).isRequired),viewportHeight:s.a.number,viewportLeft:s.a.number,viewportTop:s.a.number,viewportWidth:s.a.number},rn.defaultProps={layout:[],viewportLeft:0,viewportTop:0};s.a.node,s.a.number,s.a.number,s.a.number,s.a.number,s.a.number,s.a.number,s.a.number,s.a.number,s.a.node;var on={divider:"_qd _3k _4z _jr"};function an(){return Object(r.createElement)("hr",{className:on.divider})}function ln(t){var e=void 0;switch(t.direction){case"up":e="M0 0 L12 12 L24 0";break;case"right":e="M24 0 L12 12 L24 24";break;case"down":e="M0 24 L12 12 L24 24";break;case"left":e="M0 0 L12 12 L0 24"}return Object(r.createElement)("svg",{width:"24",height:"24"},Object(r.createElement)("path",{d:e}))}ln.propTypes={direction:s.a.oneOf(["up","right","down","left"])};var sn="_qe _3w",pn="_qf _3w _3k _42 _56",cn="_qg",dn="_qh _43 _3s _56",un="_qi _3w",gn={0:"up",1:"right",2:"down",3:"left"},mn={up:0,right:1,down:2,left:3},fn=24,hn=24,_n=24,xn=8;var bn=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={flyoutOffset:{top:void 0,right:void 0,bottom:void 0,left:void 0},caretOffset:{top:void 0,right:void 0,bottom:void 0,left:void 0},mainDir:null},r.setFlyoutPosition=function(t){var e=t.relativeOffset,n=t.idealDirection,i=t.positionRelativeToAnchor,o=t.triggerRect,a=t.width,l={height:window.innerHeight,width:window.innerWidth,scrollY:i?0:window.scrollY,scrollX:i?0:window.scrollX},s={height:r.flyout?r.flyout.clientHeight:0,width:a},p=function(t,e,n,r){var i=n.top-t.height-hn,o=r.width-t.width-hn-n.right,a=r.height-t.height-hn-n.bottom,l=n.left-t.width-hn;(n.top<xn||r.height-n.bottom<xn)&&(l=0,o=0),(n.left<xn||r.width-n.right<xn)&&(i=0,a=0);var s=[i,o,a,l],p=Math.max.apply(Math,s);return e&&s[mn[e]]>0?e:gn[s.indexOf(p)]}(s,n,o,l),c=function(t,e,n,r){var i=void 0,o=void 0,a=void 0;"right"===e||"left"===e?(i=t.height/2,o=n.top+(n.bottom-n.top)/2,a=r.height):(i=t.width/2,o=n.left+(n.right-n.left)/2,a=r.width);var l=a-o-i-fn;return o-i-fn>0&&l>0?"middle":l>0?"left"===e||"right"===e?"up":"left":"left"===e||"right"===e?"down":"right"}(s,p,o,l),d=function(t,e,n,r,i,o){var a=t.left,l=t.top,s="down"===r?-hn:null,p="left"===r?-hn:null,c=null,d="right"===r?-hn:null;"up"===i?(l=t.top-e.flyout.y,s=e.caret.y):"down"===i?(l=t.top-n.height+o.height+e.flyout.y,c=e.caret.y):"left"===i?(a=t.left-e.flyout.x,d=e.caret.x):"right"===i?(a=t.left-n.width+o.width+e.flyout.x,p=e.caret.x):"middle"===i&&("left"!==r&&"right"!==r||(l=l+o.height/2-n.height/2,s=(n.height-hn)/2),"up"!==r&&"down"!==r||(a=a+o.width/2-n.width/2,d=(n.width-hn)/2));return{flyoutOffset:{top:l,left:a},caretOffset:{top:s,right:p,bottom:c,left:d}}}(function(t,e,n,r,i){var o=hn/2,a=void 0;a="down"===n?i.scrollY+r.bottom+o:"up"===n?i.scrollY+(r.top-e.height-o):i.scrollY+r.top;var l=void 0;return l="left"===n?i.scrollX+(r.left-e.width-o):"right"===n?i.scrollX+r.right+o:i.scrollX+r.left,{top:a-=t.y,left:l-=t.x}}(e,s,p,o,l),function(t,e,n){var r=_n-(e.height-hn)/2,i=_n-(e.width-hn)/2,o=hn,a=hn,l=e.top-r<0||e.bottom+r>n.height,s=e.left-i<0||e.right+i>n.width;return l&&(r=xn-(e.height-hn)/2,o=xn),s&&(i=xn-(e.width-hn)/2,a=xn),{flyout:{x:i,y:r},caret:{x:a,y:o}}}(0,o,l),s,p,c,o),u=d.flyoutOffset,g=d.caretOffset;r.setState({caretOffset:g,flyoutOffset:u,mainDir:p})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentDidMount",value:function(){var t=this;this.setFlyoutPosition(this.props),setTimeout(function(){t.props.shouldFocus&&t.flyout&&t.flyout.focus()}),document.addEventListener("click",this.props.onClick,!0),window.addEventListener("resize",this.props.onResize),window.addEventListener("keydown",this.props.onKeyDown)}},{key:"componentWillReceiveProps",value:function(t){this.setFlyoutPosition(t)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this.props.onClick,!0),window.removeEventListener("resize",this.props.onResize),window.removeEventListener("keydown",this.props.onKeyDown)}},{key:"render",value:function(){var t=this,e=this.props,n=e.bgColor,i=e.children,o=e.width,a=null===this.state.mainDir?"hidden":"visible",l=n+"Bg",s="white"===n?"#efefef":null,p="white"===n?"lightGray":n;return Object(r.createElement)("div",{className:sn,style:Nt({stroke:s,visibility:a},this.state.flyoutOffset)},Object(r.createElement)("div",{className:xt()(Ot[l],Ot[p],cn,pn),ref:function(e){t.flyout=e},tabIndex:-1},Object(r.createElement)("div",{className:xt()(cn,dn),style:{width:o}},i),Object(r.createElement)("div",{className:xt()(Ot[n],un),style:Nt({},this.state.caretOffset)},Object(r.createElement)(ln,{direction:this.state.mainDir}))))}}]),e}(r.Component);bn.propTypes={bgColor:s.a.oneOf(["darkGray","white","orange"]),children:s.a.node,idealDirection:s.a.oneOf(["up","right","down","left"]),onClick:s.a.func.isRequired,onKeyDown:s.a.func.isRequired,onResize:s.a.func.isRequired,relativeOffset:s.a.exact({x:s.a.number,y:s.a.number}),positionRelativeToAnchor:s.a.bool,shouldFocus:s.a.bool,triggerRect:s.a.exact({bottom:s.a.number,height:s.a.number,left:s.a.number,right:s.a.number,top:s.a.number,width:s.a.number}),width:s.a.number};var yn={xs:185,sm:230,md:284,lg:320,xl:375},vn=27,Cn=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={relativeOffset:{x:0,y:0},triggerBoundingRect:{bottom:0,height:0,left:0,right:0,top:0,width:0}},r.handleKeyDown=function(t){t.keyCode===vn&&r.props.onDismiss()},r.handlePageClick=function(t){t.target instanceof Node&&r.props.anchor&&!r.props.anchor.contains(t.target)&&r.contents&&!r.contents.contains(t.target)&&r.props.onDismiss()},r.updateTriggerRect=function(t){var e=t.anchor,n=t.positionRelativeToAnchor,i=void 0,o=void 0;e&&(i=e.getBoundingClientRect(),o={x:n?i.left-e.offsetLeft:0,y:n?i.top-e.offsetTop:0}),r.setState({relativeOffset:o,triggerBoundingRect:i})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentDidMount",value:function(){this.updateTriggerRect(this.props)}},{key:"componentWillReceiveProps",value:function(t){this.updateTriggerRect(t)}},{key:"render",value:function(){var t=this,e=this.props,n=e.anchor,i=e.bgColor,o=e.children,a=e.idealDirection,l=e.positionRelativeToAnchor,s=e.shouldFocus;if(!n)return null;var p=this.props.size?this.props.size:"sm",c="string"==typeof p?yn[p]:p;return Object(r.createElement)(ze,null,Object(r.createElement)("div",{ref:function(e){t.contents=e}},this.contents?Object(r.createElement)(bn,{bgColor:i,idealDirection:a,onClick:this.handlePageClick,onKeyDown:this.handleKeyDown,onResize:this.updateTriggerRect,positionRelativeToAnchor:l,relativeOffset:this.state.relativeOffset,shouldFocus:s,triggerRect:this.state.triggerBoundingRect,width:c},o):null))}}]),e}(r.Component);function wn(t){var e=t.anchor,n=t.id,i=t.idealDirection,o=t.message,a=t.onDismiss,l=t.positionRelativeToAnchor,s=void 0===l||l,p=t.size;return e?Object(r.createElement)(Cn,{anchor:e,bgColor:"orange",idealDirection:i,onDismiss:a,positionRelativeToAnchor:s,size:p},Object(r.createElement)(ze,{padding:3},Object(r.createElement)(Je,{bold:!0,color:"white"},Object(r.createElement)("span",{id:n},o)))):null}Cn.propTypes={anchor:s.a.shape({contains:s.a.func,getBoundingClientRect:s.a.func}),bgColor:s.a.oneOf(["darkGray","white","orange"]),children:s.a.node,idealDirection:s.a.oneOf(["up","right","down","left"]),onDismiss:s.a.func.isRequired,positionRelativeToAnchor:s.a.bool,shouldFocus:s.a.bool,size:s.a.oneOfType([s.a.number,s.a.oneOf(["xs","sm","md","lg","xl"])])},wn.propTypes={anchor:s.a.shape({contains:s.a.func,getBoundingClientRect:s.a.func}),idealDirection:s.a.oneOf(["up","right","down","left"]),message:s.a.string.isRequired,onDismiss:s.a.func.isRequired,positionRelativeToAnchor:s.a.bool,size:s.a.oneOf(["xs","sm","md","lg","xl"])};var kn=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.check=function(){var t=r.props,e=t.containerHeight,n=t.isAtEnd,i=t.isFetching,o=t.fetchMore,a=t.scrollHeight,l=t.scrollTop;n||i||!o||l+3*e>a&&o()},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentDidMount",value:function(){setTimeout(this.check)}},{key:"componentDidUpdate",value:function(){this.check()}},{key:"render",value:function(){return null}}]),e}(r.PureComponent);kn.propTypes={containerHeight:s.a.number.isRequired,isAtEnd:s.a.bool,isFetching:s.a.bool.isRequired,fetchMore:s.a.func,scrollHeight:s.a.number.isRequired,scrollTop:s.a.number.isRequired};var Mn={Masonry:"_qj _3u",Masonry__Item:"_qk _3w",Masonry__Item__Mounted:"_ql"};function Ln(t){return"function"==typeof t?t():t}var On=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.getScrollContainerRef=function(){return r.scrollContainer},r.handleScroll=function(t){r.props.onScroll(t)},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentDidMount",value:function(){var t=Ln(this.props.scrollContainer);t&&this.updateScrollContainer(t)}},{key:"componentWillReceiveProps",value:function(t){var e=Ln(t.scrollContainer);e&&e!==this.scrollContainer&&this.updateScrollContainer(e)}},{key:"componentWillUnmount",value:function(){this.scrollContainer&&this.scrollContainer.removeEventListener("scroll",this.handleScroll)}},{key:"updateScrollContainer",value:function(t){this.scrollContainer&&this.scrollContainer.removeEventListener("scroll",this.handleScroll),this.scrollContainer=t,this.scrollContainer.addEventListener("scroll",this.handleScroll)}},{key:"render",value:function(){return r.Children.only(this.props.children)}}]),e}(r.Component);function jn(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=void 0,r=void 0;return function(){for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];var l=Date.now();n&&l<n+e?(clearTimeout(r),r=setTimeout(function(){n=l,t.apply(void 0,At(o))},e)):(n=l,t.apply(void 0,At(o)))}}On.propTypes={children:s.a.element.isRequired,onScroll:s.a.func.isRequired,scrollContainer:s.a.oneOfType([s.a.object,s.a.func]).isRequired};var Rn=function(){function t(){Tt(this,t),this.map=new WeakMap}return Pt(t,[{key:"get",value:function(t){return this.map.get(t)}},{key:"has",value:function(t){return this.map.has(t)}},{key:"set",value:function(t,e){this.map.set(t,e)}},{key:"reset",value:function(){this.map=new WeakMap}}]),t}();function En(t){return t===window?window.innerHeight:t.clientHeight}function Sn(){return void 0!==window.scrollY?window.scrollY:document.documentElement&&void 0!==document.documentElement.scrollTop?document.documentElement.scrollTop:0}function Tn(t){return t===window?Sn():t.scrollTop-t.getBoundingClientRect().top}function Pn(t){return t===window?Sn():t.scrollTop}var Bn=Symbol("default"),Nn=Symbol("uniformRow"),zn=function(t){return{top:-9999,left:-9999,width:t,height:arguments.length>1&&void 0!==arguments[1]?arguments[1]:1/0}},qn=function(t){return{top:-9999,left:-9999,width:t,height:arguments.length>1&&void 0!==arguments[1]?arguments[1]:1/0}},Fn=function t(){Tt(this,t)},An=300,Dn=.7,In=function(t){function e(t){Tt(this,e);var n=Ft(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.setGridWrapperRef=function(t){n.gridWrapper=t},n.setScrollContainerRef=function(t){n.scrollContainer=t},n.handleResize=function(){n.resizeTimeout&&clearTimeout(n.resizeTimeout),n.resizeTimeout=setTimeout(function(){n.gridWrapper&&n.setState({width:n.gridWrapper.clientWidth})},An)},n.updateScrollPosition=jn(function(){if(n.scrollContainer){var t=n.scrollContainer.getScrollContainerRef();t&&n.setState({scrollTop:Pn(t)})}}),n.fetchMore=function(){var t=n.props.loadItems;t&&"function"==typeof t&&n.setState({isFetching:!0},function(){return t({from:n.props.items.length})})},n.renderMasonryComponent=function(t,e,i){var o=n.props,a=o.comp,l=o.virtualize,s=i.top,p=i.left,c=i.width,d=i.height,u=void 0;if(n.props.scrollContainer){var g=n.containerHeight*Dn,m=n.state.scrollTop-n.containerOffset,f=m-g,h=m+n.containerHeight+g;u=!(i.top+i.height<f||i.top>h)}else u=!0;var _=Object(r.createElement)("div",{key:"item-"+e,className:[Mn.Masonry__Item,Mn.Masonry__Item__Mounted].join(" "),"data-grid-item":!0,style:Nt({top:0,left:0,transform:"translateX("+p+"px) translateY("+s+"px)",WebkitTransform:"translateX("+p+"px) translateY("+s+"px)",width:c,height:d},l||u?{}:{display:"none",transition:"none"})},Object(r.createElement)(a,{data:t,itemIdx:e,isMeasuring:!1}));return l?u&&_||null:_},n.containerHeight=0,n.containerOffset=0,n.state={hasPendingMeasurements:t.items.some(function(e){return!!e&&!t.measurementStore.has(e)}),isFetching:!1,scrollTop:0,width:void 0},n}return zt(e,t),Pt(e,null,[{key:"createMeasurementStore",value:function(){return new Rn}}]),Pt(e,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handleResize);var t=this.gridWrapper?this.gridWrapper.clientWidth:this.state.width;this.measureContainer();var e=this.state.scrollTop;if(null!=this.scrollContainer){var n=this.scrollContainer.getScrollContainerRef();n&&(e=Pn(n))}this.setState({scrollTop:e,width:t})}},{key:"componentWillReceiveProps",value:function(t){for(var e=t.items,n=t.measurementStore,r=e.some(function(t){return!n.has(t)}),i=0;i<e.length;i+=1){if(void 0===this.props.items[i])return void this.setState({hasPendingMeasurements:r,isFetching:!1});if(e[i]!==this.props.items[i]||e.length<this.props.items.length)return void this.setState({hasPendingMeasurements:r,isFetching:!1})}0===e.length&&this.props.items.length>0?this.setState({hasPendingMeasurements:r,isFetching:!1}):r!==this.state.hasPendingMeasurements&&this.setState({hasPendingMeasurements:r})}},{key:"componentDidUpdate",value:function(t,e){var n=this,r=this.props,i=r.items,o=r.measurementStore;clearTimeout(this.measureTimeout),this.measureTimeout=setTimeout(function(){n.measureContainer()}),null!=e.width&&this.state.width!==e.width&&o.reset();var a=i.some(function(t){return!!t&&!o.has(t)});(a||a!==this.state.hasPendingMeasurements||null==e.width)&&(this.insertAnimationFrame=requestAnimationFrame(function(){n.setState({hasPendingMeasurements:a})}))}},{key:"componentWillUnmount",value:function(){this.insertAnimationFrame&&cancelAnimationFrame(this.insertAnimationFrame),clearTimeout(this.measureTimeout),clearTimeout(this.resizeTimeout),window.removeEventListener("resize",this.handleResize)}},{key:"measureContainer",value:function(){if(null!=this.scrollContainer){var t=this.scrollContainer.getScrollContainerRef();if(t){this.containerHeight=En(t);var e=this.gridWrapper;if(e instanceof HTMLElement){var n=Tn(t);this.containerOffset=e.getBoundingClientRect().top+n}}}}},{key:"reflow",value:function(){this.props.measurementStore.reset(),this.measureContainer(),this.forceUpdate()}},{key:"render",value:function(){var t=this,e=this.props,n=e.columnWidth,i=e.comp,o=e.flexible,a=e.gutterWidth,l=e.measurementStore,s=e.items,p=e.minCols,c=this.state,d=c.hasPendingMeasurements,u=c.width,g=void 0;g=o&&null!==u?function(t){var e=t.gutter,n=void 0===e?0:e,r=t.cache,i=t.minCols,o=void 0===i?2:i,a=t.idealColumnWidth,l=void 0===a?240:a,s=t.width;if(null==s)return function(t){return t.map(function(){return{top:1/0,left:1/0,width:1/0,height:1/0}})};var p=Math.floor(s/l),c=Math.max(Math.floor((s-p*n)/l),o),d=Math.floor(s/c);return function(t){var e=new Array(c).fill(0);return t.reduce(function(t,i){var o=t,a=r.get(i),l=void 0;if(null==a)l={top:1/0,left:1/0,width:d,height:1/0};else{var s=function(t){for(var e=0,n=0;n<t.length;n+=1)t[n]<t[e]&&(e=n);return e}(e),p=e[s],c=s*d+n/2;e[s]+=a,l={top:p,left:c,width:d-n,height:a}}return o.push(l),o},[])}}({gutter:a,cache:l,minCols:p,idealColumnWidth:n,width:u}):this.props.layout===Nn||this.props.layout instanceof Fn?function(t){var e=t.cache,n=t.columnWidth,r=void 0===n?236:n,i=t.gutter,o=void 0===i?14:i,a=t.width,l=t.minCols,s=void 0===l?3:l;return function(t){if(null==a)return t.map(function(){return qn(r)});for(var n=r+o,i=Math.max(Math.floor((a+o)/n),s),l=[],p=[],c=0;c<t.length;c+=1){var d=void 0,u=e.get(t[c]);if(null==u)d=qn(r);else{var g=c%i,m=Math.floor(c/i);(0===g||u>p[m])&&(p[m]=u),d={top:m>0?p.slice(0,m).reduce(function(t,e){return t+e+o},0):0,left:g*n,width:r,height:u}}l.push(d)}return l}}({cache:l,columnWidth:n,gutter:a,minCols:p,width:u}):function(t){var e=t.cache,n=t.columnWidth,r=void 0===n?236:n,i=t.gutter,o=void 0===i?14:i,a=t.minCols,l=void 0===a?2:a,s=t.width;return function(t){if(null==s)return t.map(function(){return zn(r)});var n=r+o,i=Math.max(Math.floor((s+o)/n),l),a=new Array(i).fill(0),p=Math.max(Math.floor((s-n*i+o)/2),0);return t.reduce(function(t,i){var l=t,s=e.get(i),c=void 0;if(null==s)c=zn(r);else{var d=s+o,u=function(t){for(var e=0,n=0;n<t.length;n+=1)t[n]<t[e]&&(e=n);return e}(a),g=a[u],m=u*n+p;a[u]+=d,c={top:g,left:m,width:r,height:s}}return l.push(c),l},[])}}({cache:l,columnWidth:n,gutter:a,minCols:p,width:u});var m=void 0;if(null==u&&d)m=Object(r.createElement)("div",{className:Mn.Masonry,style:{height:0,width:"100%"},ref:this.setGridWrapperRef},s.filter(function(t){return t}).map(function(t,e){return Object(r.createElement)("div",{className:"static","data-grid-item":!0,key:e,style:{top:0,left:0,transform:"translateX(0px) translateY(0px)",WebkitTransform:"translateX(0px) translateY(0px)",width:o?void 0:n},ref:function(e){e&&!o&&l.set(t,e.clientHeight)}},Object(r.createElement)(i,{data:t,itemIdx:e,isMeasuring:!1}))}));else if(null==u)m=Object(r.createElement)("div",{style:{width:"100%"},ref:this.setGridWrapperRef});else{var f=s.filter(function(t){return t&&l.has(t)}),h=s.filter(function(t){return t&&!l.has(t)}).slice(0,p),_=g(f),x=g(h),b=Math.max.apply(Math,At(_.map(function(t){return t.top+t.height})));m=Object(r.createElement)("div",{style:{width:"100%"},ref:this.setGridWrapperRef},Object(r.createElement)("div",{className:Mn.Masonry,style:{height:b,width:u}},f.map(function(e,n){return t.renderMasonryComponent(e,n,_[n])})),Object(r.createElement)("div",{className:Mn.Masonry,style:{width:u}},h.map(function(t,e){var n=x[e];return Object(r.createElement)("div",{key:"measuring-"+e,style:Nt({visibility:"hidden",position:"absolute"},n),ref:function(e){e&&l.set(t,e.clientHeight)}},Object(r.createElement)(i,{data:t,itemIdx:e,isMeasuring:!0}))})),this.scrollContainer&&Object(r.createElement)(kn,{containerHeight:this.containerHeight,fetchMore:this.fetchMore,isFetching:this.state.isFetching||this.state.hasPendingMeasurements,scrollHeight:b,scrollTop:this.state.scrollTop}))}return this.props.scrollContainer?Object(r.createElement)(On,{ref:this.setScrollContainerRef,onScroll:this.updateScrollPosition,scrollContainer:this.props.scrollContainer},m):m}}]),e}(r.Component);In.propTypes={columnWidth:s.a.number,comp:s.a.func.isRequired,flexible:s.a.bool,gutterWidth:s.a.number,items:s.a.arrayOf(s.a.shape({})).isRequired,measurementStore:s.a.instanceOf(Rn),loadItems:s.a.func,minCols:s.a.number,scrollContainer:s.a.func,serverRender:s.a.bool,virtualize:s.a.bool},In.defaultProps={columnWidth:236,measurementStore:new Rn,minCols:3,serverRender:!1,layout:Bn,loadItems:function(){},virtualize:!1},(function(t){function e(){return Tt(this,e),Ft(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return zt(e,t),Pt(e,[{key:"render",value:function(){var t=this.props,e=t.anchor,n=t.children,i=t.idealDirection,o=t.positionRelativeToAnchor,a=void 0===o||o,l=t.onDismiss,s=t.size;return e?Object(r.createElement)(Cn,{anchor:e,bgColor:"white",idealDirection:i,onDismiss:l,positionRelativeToAnchor:a,shouldFocus:!0,size:s},n):null}}]),e}(r.PureComponent)).propTypes={anchor:s.a.shape({contains:s.a.func,getBoundingClientRect:s.a.func}),children:s.a.node,idealDirection:s.a.oneOf(["up","right","down","left"]),onDismiss:s.a.func.isRequired,positionRelativeToAnchor:s.a.bool,size:s.a.oneOfType([s.a.number,s.a.oneOf(["xs","sm","md","lg","xl"])])};s.a.arrayOf(s.a.exact({name:s.a.string.isRequired,src:s.a.string})).isRequired,s.a.oneOf(["sm","md","lg"]).isRequired;var Wn={Heading:"_qn _ms _mt _mu _mv",fontSize1:"_qo",fontSize2:"_qp",fontSize3:"_qq",fontSize4:"_qr",fontSize5:"_qs",smFontSize1:"_qt",smFontSize2:"_qu",smFontSize3:"_qv",smFontSize4:"_qw",smFontSize5:"_qx",mdFontSize1:"_qy",mdFontSize2:"_qz",mdFontSize3:"_r0",mdFontSize4:"_r1",mdFontSize5:"_r2",lgFontSize1:"_r3",lgFontSize2:"_r4",lgFontSize3:"_r5",lgFontSize4:"_r6",lgFontSize5:"_r7"},Hn={xs:5,sm:4,md:3,lg:2,xl:1},Yn={xs:1,sm:2,md:3,lg:4,xl:5};function Zn(t){var e=t.accessibilityLevel,n=t.children,i=t.color,o=void 0===i?"darkGray":i,a=t.id,l=void 0===a?null:a,s=t.lgSize,p=t.mdSize,c=t.overflow,d=void 0===c?"breakWord":c,u=t.size,g=void 0===u?"md":u,m=t.smSize,f=t.truncate,h=void 0!==f&&f,_=xt()(Wn.Heading,Wn["fontSize"+Yn[g]],m&&Wn["smFontSize"+Yn[m]],p&&Wn["mdFontSize"+Yn[p]],s&&Wn["lgFontSize"+Yn[s]],Ot[o],"breakWord"===d&&$e.breakWord,h&&$e.truncate),x=e||Hn[g];return Object(r.createElement)("h"+x,Nt({className:_,id:l},h&&"string"==typeof n?{title:n}:null),n)}Zn.propTypes={accessibilityLevel:s.a.oneOf([1,2,3,4,5,6]),children:s.a.node,color:s.a.oneOf(["blue","darkGray","eggplant","gray","green","lightGray","maroon","midnight","navy","olive","orange","orchid","pine","purple","red","watermelon","white"]),id:s.a.string,overflow:s.a.oneOf(["normal","breakWord"]),size:s.a.oneOf(["xs","sm","md","lg","xl"]),smSize:s.a.oneOf(["xs","sm","md","lg","xl"]),mdSize:s.a.oneOf(["xs","sm","md","lg","xl"]),lgSize:s.a.oneOf(["xs","sm","md","lg","xl"]),truncate:s.a.bool};var Un="_r8 _3k _5b _jw _nn",Xn={pog:"_r9 _54 _43 _4b _4l",focused:"_ra _3j",transparent:"_rb _6a",hovered:"_rc",white:"_rd _5f",active:"_re",lightGray:"_rf _5h"},Gn={xs:24,sm:32,md:40,lg:48,xl:56},$n={transparent:"gray",lightGray:"gray",white:"gray"};function Kn(t){var e,n=t.active,i=void 0!==n&&n,o=t.bgColor,a=void 0===o?"transparent":o,l=t.focused,s=void 0!==l&&l,p=t.hovered,c=void 0!==p&&p,d=t.iconColor,u=void 0===d?$n[a]:d,g=t.icon,m=t.size,f=void 0===m?"md":m,h=Gn[f]/2,_={height:Gn[f],width:Gn[f]},x=xt()(Xn.pog,Xn[a],(Bt(e={},Xn.active,i),Bt(e,Xn.focused,s),Bt(e,Xn.hovered,c&&!s&&!i),e));return Object(r.createElement)("div",{className:x,style:_},Object(r.createElement)(ze,{shape:"circle"},Object(r.createElement)(He,{color:u,icon:g,size:h,accessibilityLabel:""})))}Kn.propTypes={active:s.a.bool,bgColor:s.a.oneOf(["transparent","lightGray","white"]),focused:s.a.bool,hovered:s.a.bool,iconColor:s.a.oneOf(["gray","darkGray","red","blue","white"]),icon:s.a.oneOf(Object.keys(Ie)).isRequired,size:s.a.oneOf(Object.keys(Gn))};var Vn=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={active:!1,focused:!1,hovered:!1},r.handleBlur=function(){return r.setState({focused:!1})},r.handleFocus=function(){r.setState({focused:!0})},r.handleMouseDown=function(){r.setState({active:!0})},r.handleMouseEnter=function(){r.setState({hovered:!0})},r.handleMouseLeave=function(){r.setState({active:!1,hovered:!1})},r.handleMouseUp=function(){r.setState({active:!1})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"render",value:function(){var t=this.props,e=t.accessibilityExpanded,n=t.accessibilityHaspopup,i=t.accessibilityLabel,o=t.bgColor,a=t.iconColor,l=t.icon,s=t.size,p=t.onClick,c=this.state,d=c.active,u=c.focused,g=c.hovered;return Object(r.createElement)("button",{"aria-expanded":e,"aria-haspopup":n,"aria-label":i,className:Un,onBlur:this.handleBlur,onClick:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return p&&p({event:t})}),onFocus:this.handleFocus,onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onMouseUp:this.handleMouseUp,type:"button"},Object(r.createElement)(Kn,{active:d,bgColor:o,focused:u,hovered:g,iconColor:a,icon:l,size:s}))}}]),e}(r.Component);Vn.propTypes={accessibilityExpanded:s.a.bool,accessibilityHaspopup:s.a.bool,accessibilityLabel:s.a.string.isRequired,bgColor:s.a.oneOf(["transparent","lightGray","white"]),icon:s.a.oneOf(Object.keys(Ie)).isRequired,iconColor:s.a.oneOf(["gray","darkGray","red","blue","white"]),onClick:s.a.func,size:s.a.oneOf(["xs","sm","md","lg","xl"])};s.a.node,s.a.string.isRequired;s.a.node,s.a.number.isRequired,s.a.number.isRequired,s.a.number.isRequired;var Jn="_rh _n2",Qn="_ri _3i",tr="_rj _3k",er=9;((function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={enableFocusStyles:!0},r.handleClick=function(t){var e=r.props,n=e.href,i=e.onClick;i&&n&&i({event:t})},r.handleMouseDown=function(){var t=r.props,e=t.href;"blank"===t.target&&e&&r.setState({enableFocusStyles:!1})},r.handleKeyUp=function(t){var e=r.props,n=e.href;"blank"===e.target&&t.keyCode===er&&n&&r.setState({enableFocusStyles:!0})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"render",value:function(){var t=this.props,e=t.children,n=t.inline,i=void 0!==n&&n,o=t.target,a=void 0===o?null:o,l=t.href,s="blank"===a?"noopener noreferrer":null,p=a?"_"+a:null;return Object(r.createElement)("a",{className:xt()(Jn,this.state.enableFocusStyles?Qn:"",i?"":tr),href:l,onMouseDown:this.handleMouseDown,onKeyUp:this.handleKeyUp,onClick:this.handleClick,rel:s,target:p},e)}}]),e})(r.Component)).propTypes={children:s.a.node.isRequired,href:s.a.string.isRequired,inline:s.a.bool,onClick:s.a.func,target:s.a.oneOf([null,"self","blank"])};var nr={Masonry:"_rk _3u",Masonry__Item:"_rl _3w",Masonry__Item__Mounted:"_rm"},rr=function(){function t(){Tt(this,t),this.map=new WeakMap}return Pt(t,[{key:"get",value:function(t){return this.map.get(t)}},{key:"has",value:function(t){return this.map.has(t)}},{key:"set",value:function(t,e){this.map.set(t,e)}},{key:"reset",value:function(){this.map=new WeakMap}}]),t}(),ir=Symbol("default"),or=Symbol("uniformRow"),ar=function(t){return{top:-9999,left:-9999,width:t,height:arguments.length>1&&void 0!==arguments[1]?arguments[1]:1/0}},lr=function(t){return{top:-9999,left:-9999,width:t,height:arguments.length>1&&void 0!==arguments[1]?arguments[1]:1/0}},sr=300,pr=.7,cr=function(t){return t!==1/0?t:void 0},dr=function(t){function e(t){Tt(this,e);var n=Ft(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.setGridWrapperRef=function(t){n.gridWrapper=t},n.setScrollContainerRef=function(t){n.scrollContainer=t},n.handleResize=function(){n.resizeTimeout&&clearTimeout(n.resizeTimeout),n.resizeTimeout=setTimeout(function(){n.gridWrapper&&n.setState({width:n.gridWrapper.clientWidth})},sr)},n.updateScrollPosition=jn(function(){if(n.scrollContainer){var t=n.scrollContainer.getScrollContainerRef();t&&n.setState({scrollTop:Pn(t)})}}),n.fetchMore=function(){var t=n.props.loadItems;t&&"function"==typeof t&&n.setState({isFetching:!0},function(){return t({from:n.props.items.length})})},n.renderMasonryComponent=function(t,e,i){var o=n.props,a=o.comp,l=o.virtualize,s=i.top,p=i.left,c=i.width,d=i.height,u=void 0;if(n.props.scrollContainer){var g=n.containerHeight*pr,m=n.state.scrollTop-n.containerOffset,f=m-g,h=m+n.containerHeight+g;u=!(i.top+i.height<f||i.top>h)}else u=!0;var _=Object(r.createElement)("div",{key:"item-"+e,className:[nr.Masonry__Item,nr.Masonry__Item__Mounted].join(" "),"data-grid-item":!0,style:Nt({top:0,left:0,transform:"translateX("+p+"px) translateY("+s+"px)",WebkitTransform:"translateX("+p+"px) translateY("+s+"px)",width:cr(c),height:cr(d)},l||u?{}:{display:"none",transition:"none"})},Object(r.createElement)(a,{data:t,itemIdx:e,isMeasuring:!1}));return l?u&&_||null:_},n.containerHeight=0,n.containerOffset=0,n.state={hasPendingMeasurements:t.items.some(function(e){return!!e&&!t.measurementStore.has(e)}),isFetching:!1,scrollTop:0,width:void 0},n}return zt(e,t),Pt(e,null,[{key:"createMeasurementStore",value:function(){return new rr}}]),Pt(e,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handleResize);var t=this.gridWrapper?this.gridWrapper.clientWidth:this.state.width;this.measureContainer();var e=this.state.scrollTop;if(null!=this.scrollContainer){var n=this.scrollContainer.getScrollContainerRef();n&&(e=Pn(n))}this.setState({scrollTop:e,width:t})}},{key:"componentWillReceiveProps",value:function(t){for(var e=t.items,n=t.measurementStore,r=e.some(function(t){return!n.has(t)}),i=0;i<e.length;i+=1){if(void 0===this.props.items[i])return void this.setState({hasPendingMeasurements:r,isFetching:!1});if(e[i]!==this.props.items[i]||e.length<this.props.items.length)return void this.setState({hasPendingMeasurements:r,isFetching:!1})}0===e.length&&this.props.items.length>0?this.setState({hasPendingMeasurements:r,isFetching:!1}):r!==this.state.hasPendingMeasurements&&this.setState({hasPendingMeasurements:r})}},{key:"componentDidUpdate",value:function(t,e){var n=this,r=this.props,i=r.items,o=r.measurementStore;clearTimeout(this.measureTimeout),this.measureTimeout=setTimeout(function(){n.measureContainer()}),null!=e.width&&this.state.width!==e.width&&o.reset();var a=i.some(function(t){return!!t&&!o.has(t)});(a||a!==this.state.hasPendingMeasurements||null==e.width)&&(this.insertAnimationFrame=requestAnimationFrame(function(){n.setState({hasPendingMeasurements:a})}))}},{key:"componentWillUnmount",value:function(){this.insertAnimationFrame&&cancelAnimationFrame(this.insertAnimationFrame),clearTimeout(this.measureTimeout),clearTimeout(this.resizeTimeout),window.removeEventListener("resize",this.handleResize)}},{key:"measureContainer",value:function(){if(null!=this.scrollContainer){var t=this.scrollContainer.getScrollContainerRef();if(t){this.containerHeight=En(t);var e=this.gridWrapper;if(e instanceof HTMLElement){var n=Tn(t);this.containerOffset=e.getBoundingClientRect().top+n}}}}},{key:"reflow",value:function(){this.props.measurementStore.reset(),this.measureContainer(),this.forceUpdate()}},{key:"render",value:function(){var t=this,e=this.props,n=e.columnWidth,i=e.comp,o=e.flexible,a=e.gutterWidth,l=e.measurementStore,s=e.items,p=e.minCols,c=this.state,d=c.hasPendingMeasurements,u=c.width,g=void 0;g=o&&null!==u?function(t){var e=t.gutter,n=void 0===e?0:e,r=t.cache,i=t.minCols,o=void 0===i?2:i,a=t.idealColumnWidth,l=void 0===a?240:a,s=t.width;if(null==s)return function(t){return t.map(function(){return{top:1/0,left:1/0,width:1/0,height:1/0}})};var p=Math.floor(s/l),c=Math.max(Math.floor((s-p*n)/l),o),d=Math.floor(s/c);return function(t){var e=new Array(c).fill(0);return t.reduce(function(t,i){var o=t,a=r.get(i),l=void 0;if(null==a)l={top:1/0,left:1/0,width:d,height:1/0};else{var s=function(t){for(var e=0,n=0;n<t.length;n+=1)t[n]<t[e]&&(e=n);return e}(e),p=e[s],c=s*d+n/2;e[s]+=a,l={top:p,left:c,width:d-n,height:a}}return o.push(l),o},[])}}({gutter:a,cache:l,minCols:p,idealColumnWidth:n,width:u}):this.props.layout===or||this.props.layout instanceof Fn?function(t){var e=t.cache,n=t.columnWidth,r=void 0===n?236:n,i=t.gutter,o=void 0===i?14:i,a=t.width,l=t.minCols,s=void 0===l?3:l;return function(t){if(null==a)return t.map(function(){return lr(r)});for(var n=r+o,i=Math.max(Math.floor((a+o)/n),s),l=[],p=[],c=0;c<t.length;c+=1){var d=void 0,u=e.get(t[c]);if(null==u)d=lr(r);else{var g=c%i,m=Math.floor(c/i);(0===g||u>p[m])&&(p[m]=u),d={top:m>0?p.slice(0,m).reduce(function(t,e){return t+e+o},0):0,left:g*n,width:r,height:u}}l.push(d)}return l}}({cache:l,columnWidth:n,gutter:a,minCols:p,width:u}):function(t){var e=t.cache,n=t.columnWidth,r=void 0===n?236:n,i=t.gutter,o=void 0===i?14:i,a=t.minCols,l=void 0===a?2:a,s=t.width;return function(t){if(null==s)return t.map(function(){return ar(r)});var n=r+o,i=Math.max(Math.floor((s+o)/n),l),a=new Array(i).fill(0),p=Math.max(Math.floor((s-n*i+o)/2),0);return t.reduce(function(t,i){var l=t,s=e.get(i),c=void 0;if(null==s)c=ar(r);else{var d=s+o,u=function(t){for(var e=0,n=0;n<t.length;n+=1)t[n]<t[e]&&(e=n);return e}(a),g=a[u],m=u*n+p;a[u]+=d,c={top:g,left:m,width:r,height:s}}return l.push(c),l},[])}}({cache:l,columnWidth:n,gutter:a,minCols:p,width:u});var m=void 0;if(null==u&&d)m=Object(r.createElement)("div",{className:nr.Masonry,style:{height:0,width:"100%"},ref:this.setGridWrapperRef},s.filter(function(t){return t}).map(function(t,e){return Object(r.createElement)("div",{className:"static","data-grid-item":!0,key:e,style:{top:0,left:0,transform:"translateX(0px) translateY(0px)",WebkitTransform:"translateX(0px) translateY(0px)",width:o?void 0:cr(n)},ref:function(e){e&&!o&&l.set(t,e.clientHeight)}},Object(r.createElement)(i,{data:t,itemIdx:e,isMeasuring:!1}))}));else if(null==u)m=Object(r.createElement)("div",{style:{width:"100%"},ref:this.setGridWrapperRef});else{var f=s.filter(function(t){return t&&l.has(t)}),h=s.filter(function(t){return t&&!l.has(t)}).slice(0,p),_=g(f),x=g(h),b=Math.max.apply(Math,At(_.map(function(t){return t.top+t.height})));m=Object(r.createElement)("div",{style:{width:"100%"},ref:this.setGridWrapperRef},Object(r.createElement)("div",{className:nr.Masonry,style:{height:b,width:u}},f.map(function(e,n){return t.renderMasonryComponent(e,n,_[n])})),Object(r.createElement)("div",{className:nr.Masonry,style:{width:u}},h.map(function(t,e){var n=x[e];return Object(r.createElement)("div",{key:"measuring-"+e,style:Nt({visibility:"hidden",position:"absolute"},n),ref:function(e){e&&l.set(t,e.clientHeight)}},Object(r.createElement)(i,{data:t,itemIdx:e,isMeasuring:!0}))})),this.scrollContainer&&Object(r.createElement)(kn,{containerHeight:this.containerHeight,fetchMore:this.fetchMore,isFetching:this.state.isFetching||this.state.hasPendingMeasurements,scrollHeight:b,scrollTop:this.state.scrollTop}))}return this.props.scrollContainer?Object(r.createElement)(On,{ref:this.setScrollContainerRef,onScroll:this.updateScrollPosition,scrollContainer:this.props.scrollContainer},m):m}}]),e}(r.Component);dr.propTypes={columnWidth:s.a.number,comp:s.a.func.isRequired,flexible:s.a.bool,gutterWidth:s.a.number,items:s.a.arrayOf(s.a.shape({})).isRequired,measurementStore:s.a.instanceOf(rr),loadItems:s.a.func,minCols:s.a.number,scrollContainer:s.a.func,serverRender:s.a.bool,virtualize:s.a.bool},dr.defaultProps={columnWidth:236,measurementStore:new rr,minCols:3,serverRender:!1,layout:ir,loadItems:function(){},virtualize:!1};var ur="_rn",gr="_ro",mr="_rp",fr={sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 1312px)"},hr="_2h",_r="_np",xr={sm:414,md:544,lg:804},br=27;((function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={breakpoint:"xs",windowHeight:void 0},r.getCurrentBreakpoint=function(){var t="xs";return Object.keys(fr).forEach(function(e){window.matchMedia(fr[e]).matches&&(t=e)}),t},r.handleClose=function(){r.props.onDismiss()},r.handlePageClick=function(t){t.target instanceof Node&&r.container&&r.container.contains(t.target)&&r.modal&&!r.modal.contains(t.target)&&r.handleClose()},r.handleKeyDown=function(t){t.keyCode===br&&r.handleClose()},r.updateBreakpoint=function(){var t=r.getCurrentBreakpoint();t===r.state.breakpoint&&window.innerHeight===r.state.windowHeight||r.setState({breakpoint:t,windowHeight:window.innerHeight})},r.restrictFocus=function(t){t.target instanceof Node&&r.modal&&!r.modal.contains(t.target)&&r.modal.focus()},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handlePageClick),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("resize",this.updateBreakpoint),document.addEventListener("focus",this.restrictFocus,!0),this.priorFocus=document.activeElement,this.updateBreakpoint(),document.body&&(document.body.style.overflow="hidden"),this.modal&&this.modal.focus&&this.modal.focus()}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this.handlePageClick),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("resize",this.updateBreakpoint),document.removeEventListener("focus",this.restrictFocus,!0),document.body&&(document.body.style.overflow=""),this.priorFocus&&this.priorFocus.focus&&this.priorFocus.focus()}},{key:"render",value:function(){var t=this,e=this.props,n=e.accessibilityCloseLabel,i=e.accessibilityModalLabel,o=e.children,a=e.footer,l=e.heading,s=e.role,p=void 0===s?"dialog":s,c=e.size,d=xr[void 0===c?"sm":c],u=[jt.fixed,jt.borderBox,jt.flex,jt.justifyCenter,jt.left0,jt.top0],g="xs"===this.state.breakpoint?xt()(u,jt.itemsEnd,jt.bottom0,hr):xt()(u,jt.itemsCenter,hr,gr),m=[jt.fit,jt.relative],f="xs"===this.state.breakpoint?xt()(m,Ot.whiteBg,Et.m0,jt.selfEnd):xt()(m,Ot.whiteBg,Ct,mr),h=[jt.absolute,jt.left0,jt.top0,_r],_=xt()(h,ur,Ot.darkGrayBg,hr);return Object(r.createElement)("div",{"aria-label":i,className:g,ref:function(e){t.container=e},role:p},Object(r.createElement)("div",{className:_}),Object(r.createElement)("div",{className:f,ref:function(e){t.modal=e},tabIndex:-1,style:{width:d}},Object(r.createElement)(ze,{maxHeight:"90vh",position:"relative",xs:{display:"flexColumn"}},Object(r.createElement)(ze,{fit:!0},"dialog"===p?Object(r.createElement)(ze,{dangerouslySetInlineStyle:{__style:{paddingLeft:50,paddingRight:50}},display:"flex",justifyContent:"center",paddingY:5},Object(r.createElement)(Zn,{size:"xs",accessibilityLevel:1},l)):Object(r.createElement)(ze,{display:"flex",padding:4},Object(r.createElement)(Zn,{size:"lg",accessibilityLevel:1},l)),"dialog"===p&&Object(r.createElement)(ze,{padding:2,position:"absolute",top:!0,right:!0},Object(r.createElement)(Vn,{accessibilityLabel:n,icon:"cancel",onClick:this.handleClose})),"dialog"===p&&Object(r.createElement)(an,null)),Object(r.createElement)(ze,{flex:"grow",overflow:"auto",position:"relative"},o),Object(r.createElement)(ze,{fit:!0},a&&Object(r.createElement)(ze,null,"dialog"===p&&Object(r.createElement)(an,null),Object(r.createElement)(ze,{padding:4},a))))))}}]),e})(r.Component)).propTypes={children:s.a.node,accessibilityCloseLabel:s.a.string.isRequired,footer:s.a.node,heading:s.a.string.isRequired,accessibilityModalLabel:s.a.string.isRequired,onDismiss:s.a.func,role:s.a.oneOf(["alertdialog","dialog"]),size:s.a.oneOf(["sm","md","lg"])};s.a.bool,s.a.number;var yr={RadioButton:"_ru _3k _42 _54 _43 _4b _4l",RadioButtonSm:"_rv",RadioButtonMd:"_rw",RadioButtonIsFocused:"_rx _3j",RadioButtonWhiteBg:"_ry _5f",RadioButtonLightGrayBg:"_rz _5h",Input:"_s0 _3w _jr",InputEnabled:"_s1 _nn",InputSm:"_s2",InputMd:"_s3",Check:"_s4 _54",CheckEnabled:"_s5 _5l",CheckDisabled:"_s6 _5j"},vr=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={focused:!1},r.handleChange=function(t){var e=t.target.checked;r.props.onChange({checked:e,event:t})},r.handleBlur=function(){return r.setState({focused:!1})},r.handleFocus=function(){r.setState({focused:!0})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"render",value:function(){var t,e,n,i=this.props,o=i.checked,a=i.disabled,l=i.id,s=i.name,p=i.size,c=i.value;return Object(r.createElement)("div",{className:xt()(yr.RadioButton,(t={},Bt(t,yr.RadioButtonIsFocused,this.state.focused),Bt(t,yr.RadioButtonSm,"sm"===p),Bt(t,yr.RadioButtonMd,"md"===p),Bt(t,yr.RadioButtonWhiteBg,!a||o),Bt(t,yr.RadioButtonLightGrayBg,a&&!o),t))},Object(r.createElement)("input",{checked:o,className:xt()(yr.Input,(e={},Bt(e,yr.InputEnabled,!a),Bt(e,yr.InputSm,"sm"===p),Bt(e,yr.InputMd,"md"===p),e)),disabled:a,id:l,name:s,onBlur:this.handleBlur,onChange:this.handleChange,onFocus:this.handleFocus,type:"radio",value:c}),o&&Object(r.createElement)("div",{className:xt()(yr.Check,(n={},Bt(n,yr.CheckSm,"sm"===p),Bt(n,yr.CheckMd,"md"===p),Bt(n,yr.CheckEnabled,!a),Bt(n,yr.CheckDisabled,a),n))}))}}]),e}(r.Component);vr.propTypes={checked:s.a.bool,disabled:s.a.bool,id:s.a.string.isRequired,name:s.a.string,onChange:s.a.func.isRequired,value:s.a.string.isRequired,size:s.a.oneOf(["sm","md"])},vr.defaultProps={checked:!1,disabled:!1,size:"md"};var Cr=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={containerHeight:0,scrollHeight:0,scrollTop:0},r.getScrollHeight=function(){var t,e=r.props.container;return e?(t=e)===window&&document.documentElement?document.documentElement.scrollHeight:t.scrollHeight:0},r.updatePosition=jn(function(){r.setState(r.getScrollState())}),Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentDidMount",value:function(){var t=this,e=this.props.container;e&&setTimeout(function(){t.setState(Nt({containerHeight:En(e)},t.getScrollState()))})}},{key:"componentDidUpdate",value:function(){this.updatePosition()}},{key:"getScrollState",value:function(){var t=this.props,e=t.container,n=t.renderHeight;return e?{scrollHeight:(n||this.getScrollHeight)(),scrollTop:Pn(e)}:null}},{key:"render",value:function(){var t=this.state,e=t.containerHeight,n=t.scrollHeight,i=t.scrollTop,o=this.props,a=o.container,l=o.fetchMore,s=o.isAtEnd,p={containerHeight:e,fetchMore:l,isAtEnd:s,isFetching:o.isFetching,scrollHeight:n,scrollTop:i};return!a||s?null:Object(r.createElement)(On,{onScroll:this.updatePosition,scrollContainer:a},Object(r.createElement)(kn,p))}}]),e}(r.PureComponent);Cr.propTypes={container:s.a.shape({addEventListener:s.a.func,removeEventListener:s.a.func}),renderHeight:s.a.func,isAtEnd:s.a.bool,isFetching:s.a.bool,fetchMore:s.a.func},Cr.defaultProps={container:"undefined"!=typeof window?window:null};var wr="_s7 _3i _4y _42 _5k _nv _ms _mt _mu _ny _mv _my _5h _2h",kr="_s8 _5b _nn _76 _75 _3u";((function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={focused:!1,hovered:!1},r.handleChange=function(t){r.props.onChange({value:t.currentTarget.value,syntheticEvent:t})},r.handleClear=function(t){r.props.onChange({value:"",syntheticEvent:t})},r.handleMouseEnter=function(){return r.setState({hovered:!0})},r.handleMouseLeave=function(){return r.setState({hovered:!1})},r.handleFocus=function(t){r.setState({focused:!0}),r.props.onFocus&&r.props.onFocus({value:t.currentTarget.value,syntheticEvent:t})},r.handleBlur=function(t){r.setState({focused:!1}),r.props.onBlur&&r.props.onBlur({event:t})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"render",value:function(){var t=this.props,e=t.accessibilityLabel,n=t.id,i=t.placeholder,o=t.value,a=(this.state.focused||this.state.hovered)&&o&&o.length>0;return Object(r.createElement)(ze,{display:"flex",position:"relative",alignItems:"center",onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onFocus:this.handleFocus,onBlur:this.handleBlur,color:"white"},Object(r.createElement)(ze,{dangerouslySetInlineStyle:{__style:{pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}},position:"absolute",left:!0,paddingX:4},Object(r.createElement)(He,{icon:"search",accessibilityLabel:""})),Object(r.createElement)("input",{"aria-label":e,className:wr,id:n,onChange:this.handleChange,placeholder:i,role:"searchbox",type:"search",value:o}),a&&Object(r.createElement)(ze,{position:"absolute",right:!0,top:!0},Object(r.createElement)("button",{className:kr,onClick:this.handleClear,tabIndex:-1,type:"button"},Object(r.createElement)(He,{icon:"clear",accessibilityLabel:""}))))}}]),e})(r.Component)).propTypes={accessibilityLabel:s.a.string.isRequired,id:s.a.string.isRequired,onBlur:s.a.func,onChange:s.a.func.isRequired,onFocus:s.a.func,placeholder:s.a.string,value:s.a.string};s.a.arrayOf(s.a.node).isRequired,s.a.func.isRequired,s.a.number.isRequired;var Mr="_sf _3i _nv _ms _mt _mu _ny _mv _5k _nn _3u _6a _2h",Lr="_sg",Or="_sh",jr="_si _5k _5f",Rr="_sj _5i _5h",Er=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={focused:!1,errorIsOpen:!1},r.handleOnChange=function(t){t.target instanceof HTMLSelectElement&&r.props.value!==t.target.value&&(r.props.onChange({event:t,value:t.target.value}),r.props.errorMessage&&r.setState({errorIsOpen:!1}))},r.handleBlur=function(){r.props.errorMessage&&r.setState({errorIsOpen:!1})},r.handleFocus=function(){r.props.errorMessage&&r.setState({errorIsOpen:!0})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentWillReceiveProps",value:function(t){t.errorMessage!==this.props.errorMessage&&this.setState({errorIsOpen:!!t.errorMessage})}},{key:"render",value:function(){var t=this,e=this.props,n=e.disabled,i=e.errorMessage,o=e.id,a=e.idealErrorDirection,l=e.name,s=e.options,p=e.placeholder,c=e.value,d=xt()(Mr,n?Rr:jr,i?Or:Lr);return Object(r.createElement)(ze,{color:n?"lightGray":"white",dangerouslySetInlineStyle:{__style:{borderRadius:4}},display:"flex",position:"relative",width:"100%"},Object(r.createElement)(ze,{alignItems:"center",bottom:!0,dangerouslySetInlineStyle:{__style:{paddingRight:14,paddingTop:2}},display:"flex",position:"absolute",right:!0,top:!0},Object(r.createElement)(He,{icon:"arrow-down",size:12,color:n?"gray":"darkGray",accessibilityLabel:""})),Object(r.createElement)("select",{"aria-describedby":i&&this.state.focused?o+"-gestalt-error":null,"aria-invalid":i?"true":"false",className:d,disabled:n,id:o,name:l,onBlur:this.handleBlur,onFocus:this.handleFocus,onChange:this.handleOnChange,ref:function(e){t.select=e},value:c},p&&!c&&Object(r.createElement)("option",{selected:!0,disabled:!0,value:!0,hidden:!0},p),s.map(function(t){return Object(r.createElement)("option",{key:t.value,value:t.value},t.label)})),i&&this.state.errorIsOpen&&Object(r.createElement)(wn,{anchor:this.select,id:o+"-gestalt-error",idealDirection:a,message:i,onDismiss:function(){return t.setState({errorIsOpen:!1})},size:"sm"}))}}]),e}(r.Component);Er.propTypes={disabled:s.a.bool,errorMessage:s.a.string,id:s.a.string.isRequired,idealErrorDirection:s.a.string,name:s.a.string,onChange:s.a.func.isRequired,options:s.a.arrayOf(s.a.exact({label:s.a.string.isRequired,value:s.a.string.isRequired})),placeholder:s.a.string,value:s.a.string},Er.defaultProps={disabled:!1,idealErrorDirection:"right",options:[]};var Sr={icon:"_sk _3k",spin:"_sl"},Tr=40;function Pr(t){var e=t.accessibilityLabel;return t.show?Object(r.createElement)(ze,{xs:{display:"flex"},justifyContent:"around",overflow:"hidden"},Object(r.createElement)("div",{className:Sr.icon},Object(r.createElement)(He,{icon:"knoop",accessibilityLabel:e,size:Tr}))):Object(r.createElement)("div",null)}Pr.propTypes={show:s.a.bool.isRequired,accessibilityLabel:s.a.string.isRequired};var Br="_sm _3k _42 _3u",Nr="_sn _3j",zr="_so _5l",qr="_sp _5j",Fr="_sq _5h",Ar="_sr _5f",Dr="_ss _42 _3w _5f _54",Ir="_st",Wr="_su",Hr="_sv",Yr="_sw",Zr="_sx _3w _2h _jr _5b _jw",Ur="_sy _nn",Xr=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={focused:!1},r.handleBlur=function(){return r.setState({focused:!1})},r.handleChange=function(t){var e=t.target.checked;r.props.onChange({event:t,value:e})},r.handleFocus=function(){r.setState({focused:!0})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"render",value:function(){var t=this.props,e=t.disabled,n=t.id,i=t.name,o=t.switched,a=xt()(Br,Bt({},Nr,this.state.focused),e?o?qr:Fr:o?zr:Ar),l=xt()(Dr,o?Ir:Wr,o&&!e?Hr:Yr),s=xt()(Zr,Bt({},Ur,!e));return Object(r.createElement)("div",{className:a},Object(r.createElement)("input",{checked:o,className:s,disabled:e,id:n,name:i,onBlur:this.handleBlur,onChange:this.handleChange,onFocus:this.handleFocus,type:"checkbox"}),Object(r.createElement)("div",{className:l}))}}]),e}(r.Component);Xr.propTypes={disabled:s.a.bool,id:s.a.string.isRequired,name:s.a.string,onChange:s.a.func.isRequired,switched:s.a.bool},Xr.defaultProps={disabled:!1,switched:!1};var Gr="_sz _43",$r="_t0 _3i _43 _47 undefined _5b _55 _jr _nn",Kr="_t1 _6a _5i",Vr="_t2 _5h _5k";((function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={focusedTabIndex:void 0,hoveredTabIndex:void 0},r.handleTabClick=function(t,e){(0,r.props.onChange)({activeTabIndex:t,event:e})},r.handleTabFocus=function(t){return r.setState({focusedTabIndex:t})},r.handleTabBlur=function(){return r.setState({focusedTabIndex:void 0})},r.handleTabMouseEnter=function(t){return r.setState({hoveredTabIndex:t})},r.handleTabMouseLeave=function(){return r.setState({hoveredTabIndex:void 0})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"render",value:function(){var t=this,e=this.props,n=e.tabs,i=e.activeTabIndex,o=this.state,a=o.focusedTabIndex,l=o.hoveredTabIndex;return Object(r.createElement)("div",{className:Gr,role:"tablist"},n.map(function(e,n){var o,s=e.text,p=e.href,c=n===i,d=n===l,u=n===a,g=xt()($r,(Bt(o={},Kr,!c),Bt(o,Vr,c),o));return Object(r.createElement)("a",{"aria-selected":c,className:g,href:p,key:n,onClick:function(e){return t.handleTabClick(n,e)},onFocus:function(){return t.handleTabFocus(n)},onBlur:t.handleTabBlur,onMouseEnter:function(){return t.handleTabMouseEnter(n)},onMouseLeave:t.handleTabMouseLeave,role:"tab"},Object(r.createElement)(Je,{bold:!0,color:c||d||u?"darkGray":"gray",size:"md"},s))}))}}]),e})(r.Component)).propTypes={activeTabIndex:s.a.number.isRequired,tabs:s.a.arrayOf(s.a.exact({text:s.a.node,href:s.a.string})).isRequired,onChange:s.a.func.isRequired};var Jr="_t3 _3i _42 _nv _ms _mt _mu _ny _mw _2h",Qr="_t4",ti="_t5",ei="_t6 _5k _5f",ni="_t7 _5i _5h",ri=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={focused:!1,errorIsOpen:!1},r.handleChange=function(t){t.target instanceof HTMLTextAreaElement&&(r.props.onChange({event:t,value:t.target.value}),r.props.errorMessage&&r.setState({errorIsOpen:!0}))},r.handleBlur=function(t){r.props.errorMessage&&r.setState({errorIsOpen:!1}),t.target instanceof HTMLTextAreaElement&&r.props.onBlur&&r.props.onBlur({event:t,value:t.target.value})},r.handleFocus=function(t){r.props.errorMessage&&r.setState({errorIsOpen:!0}),t.target instanceof HTMLTextAreaElement&&r.props.onFocus&&r.props.onFocus({event:t,value:t.target.value})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentWillReceiveProps",value:function(t){t.errorMessage!==this.props.errorMessage&&this.setState({errorIsOpen:!!t.errorMessage})}},{key:"render",value:function(){var t=this,e=this.props,n=e.disabled,i=e.errorMessage,o=e.id,a=e.idealErrorDirection,l=e.name,s=e.placeholder,p=e.rows,c=e.value,d=xt()(Jr,n?ni:ei,i?ti:Qr);return Object(r.createElement)("span",null,Object(r.createElement)("textarea",{"aria-describedby":i&&this.state.focused?o+"-gestalt-error":null,"aria-invalid":i?"true":"false",className:d,disabled:n,id:o,name:l,onBlur:this.handleBlur,onChange:this.handleChange,onFocus:this.handleFocus,placeholder:s,ref:function(e){t.textarea=e},rows:p,value:c}),i&&this.state.errorIsOpen?Object(r.createElement)(wn,{anchor:this.textarea,id:o+"-gestalt-error",idealDirection:a,message:i,onDismiss:function(){return t.setState({errorIsOpen:!1})},size:"sm"}):null)}}]),e}(r.Component);ri.propTypes={disabled:s.a.bool,errorMessage:s.a.string,id:s.a.string.isRequired,idealErrorDirection:s.a.string,name:s.a.string,onBlur:s.a.func,onChange:s.a.func.isRequired,onFocus:s.a.func,placeholder:s.a.string,rows:s.a.number,value:s.a.string},ri.defaultProps={disabled:!1,idealErrorDirection:"right",rows:3};var ii="_t8 _3i _42 _nv _ms _mt _mu _ny _mv _2h",oi="_t9",ai="_ta",li="_tb _5k _5f",si="_tc _5i _5h",pi=function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={focused:!1,errorIsOpen:!1},r.handleChange=function(t){t.target instanceof HTMLInputElement&&r.props.onChange({event:t,value:t.target.value})},r.handleBlur=function(t){r.props.errorMessage&&r.setState({errorIsOpen:!1}),t.target instanceof HTMLInputElement&&r.props.onBlur&&r.props.onBlur({event:t,value:t.target.value})},r.handleFocus=function(t){r.props.errorMessage&&r.setState({errorIsOpen:!0}),t.target instanceof HTMLInputElement&&r.props.onFocus&&r.props.onFocus({event:t,value:t.target.value})},Ft(r,n)}return zt(e,t),Pt(e,[{key:"componentWillReceiveProps",value:function(t){t.errorMessage!==this.props.errorMessage&&this.setState({errorIsOpen:!!t.errorMessage})}},{key:"render",value:function(){var t=this,e=this.props,n=e.autoComplete,i=e.disabled,o=e.errorMessage,a=e.hasError,l=e.id,s=e.idealErrorDirection,p=e.name,c=e.placeholder,d=e.type,u=e.value,g=xt()(ii,i?si:li,a||o?ai:oi),m="number"===d?"\\d*":void 0;return Object(r.createElement)("span",null,Object(r.createElement)("input",{"aria-describedby":o&&this.state.focused?l+"-gestalt-error":null,"aria-invalid":o||a?"true":"false",autoComplete:n,className:g,disabled:i,id:l,name:p,onBlur:this.handleBlur,onChange:this.handleChange,onFocus:this.handleFocus,pattern:m,placeholder:c,ref:function(e){t.textfield=e},type:d,value:u}),o&&this.state.errorIsOpen&&Object(r.createElement)(wn,{anchor:this.textfield,id:l+"-gestalt-error",idealDirection:s,message:o,onDismiss:function(){return t.setState({errorIsOpen:!1})},size:"sm"}))}}]),e}(r.Component);pi.propTypes={autoComplete:s.a.oneOf(["current-password","on","off","username"]),disabled:s.a.bool,errorMessage:s.a.string,hasError:s.a.bool,id:s.a.string.isRequired,idealErrorDirection:s.a.string,name:s.a.string,onBlur:s.a.func,onChange:s.a.func.isRequired,onFocus:s.a.func,placeholder:s.a.string,type:s.a.oneOf(["date","email","number","password","text","url"]),value:s.a.string},pi.defaultProps={disabled:!1,hasError:!1,idealErrorDirection:"right",type:"text"},s.a.oneOf(["darkGray","orange"]),s.a.oneOf(["arrow-circle-forward"]),s.a.oneOfType([s.a.string,s.a.arrayOf(s.a.string)]).isRequired,s.a.element,s.a.shape({contains:s.a.func,getBoundingClientRect:s.a.func}),s.a.node,s.a.oneOf(["up","right","down","left"]),s.a.func.isRequired,s.a.bool,s.a.oneOf(["xs","sm","md","lg","xl"]);var ci={touchable:"_td _3i",fullHeight:"_te",fullWidth:"_tf _2h",square:"_tg _53",circle:"_th _54",rounded:"_ti _56",roundedTop:"_tj _57",roundedRight:"_tk _58",roundedBottom:"_tl _59",roundedLeft:"_tm _5a",pill:"_tn _55",pointer:"_to _nn",zoomIn:"_tp _no",zoomOut:"_tq _np",copy:"_tr _nq",move:"_ts _nr",noDrop:"_tt _ns",grab:"_tu _nt",grabbing:"_tv _nu"},di=32,ui=13;((function(t){function e(){var t,n,r;Tt(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ft(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.handleKeyPress=function(t){var e=r.props.onTouch;!e||t.charCode!==di&&t.charCode!==ui||(t.preventDefault(),e({event:t}))},Ft(r,n)}return zt(e,t),Pt(e,[{key:"render",value:function(){var t,e=this.props,n=e.children,i=e.fullWidth,o=void 0===i||i,a=e.fullHeight,l=e.mouseCursor,s=void 0===l?"pointer":l,p=e.onMouseEnter,c=e.onMouseLeave,d=e.onTouch,u=e.shape,g=void 0===u?"square":u,m=xt()(ci.touchable,ci[s],ci[g],(Bt(t={},ci.fullHeight,a),Bt(t,ci.fullWidth,o),t));return Object(r.createElement)("div",{className:m,onClick:function(t){return d&&d({event:t})},onMouseEnter:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return p&&p({event:t})}),onMouseLeave:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return c&&c({event:t})}),onKeyPress:this.handleKeyPress,role:"button",tabIndex:"0"},n)}}]),e})(r.Component)).propTypes={children:s.a.node,fullHeight:s.a.bool,fullWidth:s.a.bool,mouseCursor:s.a.oneOf(["copy","grab","grabbing","move","noDrop","pointer","zoomIn","zoomOut"]),onTouch:s.a.func,onMouseEnter:s.a.func,onMouseLeave:s.a.func,shape:s.a.oneOf(["square","rounded","pill","circle","roundedTop","roundedBottom","roundedLeft","roundedRight"])};n(27);var gi=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var mi=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.a.Component),gi(e,[{key:"render",value:function(){return i.a.createElement("nav",null,i.a.createElement(R,{to:"/"},i.a.createElement("button",null,i.a.createElement(He,{accessibilityLabel:"Home",icon:"pinterest",size:"40",color:"/"===this.props.location.pathname?"red":"gray"}))),i.a.createElement(R,{to:"/upload-pin"},i.a.createElement("button",null,i.a.createElement(He,{accessibilityLabel:"Upload a pin",icon:"add-circle",size:"40",color:"/upload-pin"===this.props.location.pathname?"darkGray":"gray"}))))}}]),e}(),fi=mi=mt(mi),hi=n(14),_i=n.n(hi),xi=(n(24),function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}());var bi=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.a.Component),xi(e,[{key:"componentDidUpdate",value:function(t){var e=t.pins;this.props.pins.length!==e&&this.lastElement&&0!==e.length&&this.lastElement.scrollIntoView({behavior:"smooth"})}},{key:"render",value:function(){var t=this;return this.props.match?i.a.createElement("div",null,0===this.props.pins.length&&i.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",padding:30}},i.a.createElement("div",null,"There are no pins yet."),i.a.createElement(R,{to:"/upload-pin"},"Create the first one")),i.a.createElement("ul",{className:"pins"},this.props.pins.map(function(e,n){return i.a.createElement("li",{className:"pin",key:n,ref:function(e){e&&n===t.props.pins.length-1&&(t.lastElement=e)}},i.a.createElement("a",{href:e.link,target:"_blank"},i.a.createElement("img",{src:e.image,alt:e.title,onError:function(t){var n;t.target.src="http://via.placeholder.com/200x200/"+(n=e.link,_i()({seed:n})).replace("#","")+"?text= +"}}),i.a.createElement("h4",{className:"title"},e.title)))}))):null}}]),e}(),yi=function(t){var e=t.pins,n=void 0===e?[]:e;return i.a.createElement(Y,{exact:!0,path:"/"},function(t){var e=t.match;return i.a.createElement(bi,{pins:n,match:e})})},vi=(n(22),function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}());function Ci(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var wi=function(t){function e(){var t,n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var i=arguments.length,o=Array(i),a=0;a<i;a++)o[a]=arguments[a];return n=r=Ci(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.state={title:"",link:"",image:""},Ci(r,n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.a.Component),vi(e,[{key:"render",value:function(){var t=this;return i.a.createElement("div",{className:"add-pin"},i.a.createElement(Zn,{size:"md"},"Add pin"),i.a.createElement("form",{style:{display:"grid",gridGap:20},onSubmit:function(e){t.setState({title:"",link:"",image:""}),t.props.addPin({title:t.state.title,link:t.state.link,image:t.state.image}),t.props.history.push("/"),e.preventDefault()}},i.a.createElement("input",{className:"input",value:this.state.title,onChange:function(e){return t.setState({title:e.target.value})},placeholder:"Title",type:"text",required:!0,autoFocus:!0}),i.a.createElement("input",{className:"input",value:this.state.link,onChange:function(e){return t.setState({link:e.target.value})},placeholder:"URL",type:"url",required:!0}),i.a.createElement("input",{className:"input",value:this.state.image,onChange:function(e){t.setState({image:e.target.value})},placeholder:"Image URL",type:"url",required:!0}),i.a.createElement("button",{type:"submit"},i.a.createElement(He,{accessibilityLabel:"Home",icon:"pin",color:"white",size:"20"}),"Save")))}}]),e}(),ki=function(t){var e=t.addPin,n=void 0===e?function(){}:e;return i.a.createElement(Y,{path:"/upload-pin",component:function(t){return i.a.createElement(wi,Object.assign({},t,{addPin:n}))}})};n.d(e,"Container",function(){return ht}),n.d(e,"Nav",function(){return fi}),n.d(e,"PinListPage",function(){return yi}),n.d(e,"AddPinPage",function(){return ki}),n.d(e,"Spinner",function(){return Pr})},function(t,e,n){(t.exports=n(7)(!1)).push([t.i,".add-pin button {\n  background-color: #bd081c;\n  cursor: pointer;\n  padding: 11px 14px;\n  border-radius: 4px;\n  font-size: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n}\n\n.add-pin h3 {\n  margin-bottom: 30px;\n}\n\n.add-pin {\n  padding: 1rem;\n  padding-bottom: 64px;\n}\n",""])},function(t,e,n){var r=n(21);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(7)(!1)).push([t.i,".pin img {\n  object-fit: cover;\n  height: 90%;\n  width: 100%;\n  border-radius: 10px;\n  cursor: pointer;\n}\n.pin {\n  display: flex;\n  max-height: 400px;\n}\n.pin a {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.pin .title {\n  font-weight: 700;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 200px;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  margin: 0;\n}\n.pins {\n  display: grid;\n  list-style: none;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  grid-gap: 2.5vmin;\n  padding: 2.5vmin;\n  grid-auto-flow: dense;\n  padding-bottom: 64px;\n}\n",""])},function(t,e,n){var r=n(23);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,i);r.locals&&(t.exports=r.locals)},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){(t.exports=n(7)(!1)).push([t.i,"nav {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  background-color: rgba(255, 255, 255, 0.95);\n  width: 100%;\n  bottom: 0;\n  left: 0;\n}\nnav button {\n  width: 40px;\n  height: 40px;\n  padding: 0;\n  border: none;\n  margin: 12px;\n  background-color: transparent;\n  cursor: pointer;\n}\n.input {\n  border-color: #b5b5b5;\n  border-radius: 4px;\n  border-style: solid;\n  border-width: 1px;\n  max-height: 40px;\n  padding: 10px 14px;\n  font-size: 16px;\n}\n",""])},function(t,e,n){var r=n(26);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(7)(!1)).push([t.i,'@media (min-width: 768px) {\n  .App {\n    padding-left: 100px;\n    padding-right: 100px;\n  }\n}\n/* Font stack: https://gist.github.com/nagelflorian/9dba284f8348358d9c0d8979aa296671 */\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;\n  color: #211922;\n  font-size: 12px;\n}\na {\n  color: #717171;\n  font-weight: bold;\n  font-size: 14px;\n  text-decoration: none;\n}\n',""])},function(t,e,n){var r=n(28);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,i);r.locals&&(t.exports=r.locals)},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i,o=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?t:(i=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")})}},function(t,e,n){(t.exports=n(7)(!1)).push([t.i,'._1{display:none}._2{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._3{display:block}._4{display:inline-block}@media (min-width:576px){._5{display:none}._6{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._7{display:block}._8{display:inline-block}}@media (min-width:768px){._9{display:none}._a{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._b{display:block}._c{display:inline-block}}@media (min-width:1312px){._d{display:none}._e{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._f{display:block}._g{display:inline-block}}._h{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._i{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}@media (min-width:576px){._j{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._k{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}}@media (min-width:768px){._l{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._m{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}}@media (min-width:1312px){._n{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._o{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}}._p{width:0}@media (min-width:576px){._12{width:0}}@media (min-width:768px){._1f{width:0}}@media (min-width:1312px){._1s{width:0}}._mh{fill:currentColor;stroke-width:0;vertical-align:middle}._mj[alt]{color:transparent}._mk{background-position:50%;background-repeat:no-repeat;height:100%;width:100%}._ml{background-size:contain}._mm{background-size:cover}@media (inverted-colors){._mj,._mk{filter:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="1 0" /><feFuncG type="table" tableValues="1 0" /><feFuncB type="table" tableValues="1 0" /></feComponentTransfer></filter></svg>#filter\');-webkit-filter:invert(100%);filter:invert(100%)}}._mn{will-change:transform}._mr{background:rgba(0,0,0,.03);pointer-events:none}._n9{border-radius:4px}._nc{padding:10px 14px}._nd{padding:11px 14px}._ne{padding:14px}._nh{cursor:default}._ni:focus,._ni:hover{background-color:#e2e2e2}._ni:active{background-color:#dadada}._nj:focus,._nj:hover{background-color:#ad081b}._nj:active{background-color:#a3081a}._nk:focus,._nk:hover{background-color:#007cf0}._nk:active{background-color:#0077e6}._nl{border:1px solid #fff}._nl:focus,._nl:hover{background-color:#4f4f4f}._nl:active{background-color:#4d4d4d}._nm:focus,._nm:hover{background-color:#f1f1f1}._nm:active{background-color:#e8e8e8}._og{background:rgba(0,0,0,.064);height:100%;opacity:0;pointer-events:none;width:100%}._oh{-webkit-animation:a .2s cubic-bezier(.31,1,.34,1) forwards;animation:a .2s cubic-bezier(.31,1,.34,1) forwards}@-webkit-keyframes a{to{opacity:1;padding:8px;-webkit-transform:translateY(-8px) translateX(-8px);transform:translateY(-8px) translateX(-8px)}}@keyframes a{to{opacity:1;padding:8px;-webkit-transform:translateY(-8px) translateX(-8px);transform:translateY(-8px) translateX(-8px)}}._oj{border-style:solid;border-width:1px}._ol{border-color:#555}._om,._on,._oo{border-color:#b5b5b5}._oq{border-radius:3px;height:16px;width:16px}._or{border-radius:4px;height:24px;width:24px}._os{-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:0;outline:0}._ou{height:16px;width:16px}._ov{height:24px;width:24px}._ow{display:inline-block;vertical-align:top}._ox{width:0}@media (min-width:576px){._pa{width:0}}@media (min-width:768px){._pn{width:0}}@media (min-width:1312px){._q0{width:0}}._qd{border-bottom:0;border-left:0}._qf{border:1px solid currentColor}._qf:focus{box-shadow:0 3px 6px rgba(0,0,0,.18);outline:none}._qg{max-height:90vh;max-width:90vw;min-height:40px}._qi{fill:currentColor;height:24px;pointer-events:none}._ql{transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s}._qm{background:rgba(0,0,0,.03);pointer-events:none}._qn{margin-bottom:0;margin-top:0}._qo{font-size:24px}._qp{font-size:36px}._qq{font-size:48px}._qr{font-size:64px}._qs{font-size:96px}@media (min-width:576px){._qt{font-size:24px}._qu{font-size:36px}._qv{font-size:48px}._qw{font-size:64px}._qx{font-size:96px}}@media (min-width:768px){._qy{font-size:24px}._qz{font-size:36px}._r0{font-size:48px}._r1{font-size:64px}._r2{font-size:96px}}@media (min-width:1312px){._r3{font-size:24px}._r4{font-size:36px}._r5{font-size:48px}._r6{font-size:64px}._r7{font-size:96px}}._r8{background:transparent}._r8:focus{outline:0}._rb._ra,._rb._rc,._rd._ra,._rd._rc{background-color:rgba(0,0,0,.06)}._rb._re,._rd._re{background-color:rgba(0,0,0,.1)}._rd._ra,._rd._rc{background-color:#f0f0f0}._rd._re{background-color:#e5e5e5}._rf._ra,._rf._rc{background-color:#e2e2e2}._rf._re{background-color:#dadada}._rh{color:inherit;outline:none;text-decoration:none}._rh:focus,._rh:hover{text-decoration:underline}._rk{height:100%;margin:0 auto}._rm{transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s}._rn{opacity:.9;overflow-y:scroll}._rn,._ro{height:100%}._rp{max-height:90%;outline:none}._rq{-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-iteration-count:inherit;animation-iteration-count:inherit;-webkit-animation-name:b;animation-name:b}._rq,._rs{height:100%;width:100%}._rs{-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-iteration-count:inherit;animation-iteration-count:inherit;-webkit-animation-name:c;animation-name:c}@-webkit-keyframes b{0%{opacity:0;-webkit-transform:scale(.6);transform:scale(.6)}18%{opacity:.7;transition-timing-function:linear}45%{opacity:.7}50%{-webkit-transform:scale(.45);transform:scale(.45);transition-timing-function:cubic-bezier(.1,.55,.95,.5)}55%{opacity:.7;-webkit-transform:scale(.6);transform:scale(.6);transition-timing-function:linear}80%{opacity:0;transition-timing-function:ease-in}to{opacity:0;-webkit-transform:scale(.6);transform:scale(.6)}}@keyframes b{0%{opacity:0;-webkit-transform:scale(.6);transform:scale(.6)}18%{opacity:.7;transition-timing-function:linear}45%{opacity:.7}50%{-webkit-transform:scale(.45);transform:scale(.45);transition-timing-function:cubic-bezier(.1,.55,.95,.5)}55%{opacity:.7;-webkit-transform:scale(.6);transform:scale(.6);transition-timing-function:linear}80%{opacity:0;transition-timing-function:ease-in}to{opacity:0;-webkit-transform:scale(.6);transform:scale(.6)}}@-webkit-keyframes c{0%{opacity:0;-webkit-transform:scale(.8);transform:scale(.8)}48%{opacity:0;-webkit-transform:scale(.8);transform:scale(.8)}53%{opacity:.6;transition-timing-function:linear}80%{opacity:0;-webkit-transform:scale(1.2);transform:scale(1.2);transition-timing-function:linear}to{opacity:0;-webkit-transform:scale(.8);transform:scale(.8)}}@keyframes c{0%{opacity:0;-webkit-transform:scale(.8);transform:scale(.8)}48%{opacity:0;-webkit-transform:scale(.8);transform:scale(.8)}53%{opacity:.6;transition-timing-function:linear}80%{opacity:0;-webkit-transform:scale(1.2);transform:scale(1.2);transition-timing-function:linear}to{opacity:0;-webkit-transform:scale(.8);transform:scale(.8)}}._ru{border:1px solid #b5b5b5}._rv{height:16px;padding:2px;width:16px}._rw{height:24px;padding:3px;width:24px}._s0{-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:0;outline:0}._s2{height:16px;width:16px}._s3{height:24px;width:24px}._s4{height:100%;width:100%}._6d{margin-top:4px}._6e{margin-right:4px}._6f{margin-bottom:4px}._6g{margin-left:4px}._6h{margin-top:-4px}._6i{margin-right:-4px}._6j{margin-bottom:-4px}._6k{margin-left:-4px}._6l{padding-bottom:4px;padding-top:4px}._6m{padding-left:4px;padding-right:4px}._6n{margin-top:8px}._6o{margin-right:8px}._6p{margin-bottom:8px}._6q{margin-left:8px}._6r{margin-top:-8px}._6s{margin-right:-8px}._6t{margin-bottom:-8px}._6u{margin-left:-8px}._6v{padding-bottom:8px;padding-top:8px}._6w{padding-left:8px;padding-right:8px}._6x{margin-top:12px}._6y{margin-right:12px}._6z{margin-bottom:12px}._70{margin-left:12px}._71{margin-top:-12px}._72{margin-right:-12px}._73{margin-bottom:-12px}._74{margin-left:-12px}._75{padding-bottom:12px;padding-top:12px}._76{padding-left:12px;padding-right:12px}._77{margin-top:16px}._78{margin-right:16px}._79{margin-bottom:16px}._7a{margin-left:16px}._7b{margin-top:-16px}._7c{margin-right:-16px}._7d{margin-bottom:-16px}._7e{margin-left:-16px}._7f{padding-bottom:16px;padding-top:16px}._7g{padding-left:16px;padding-right:16px}._7h{margin-top:20px}._7i{margin-right:20px}._7j{margin-bottom:20px}._7k{margin-left:20px}._7l{margin-top:-20px}._7m{margin-right:-20px}._7n{margin-bottom:-20px}._7o{margin-left:-20px}._7p{padding-bottom:20px;padding-top:20px}._7q{padding-left:20px;padding-right:20px}._7r{margin-top:24px}._7s{margin-right:24px}._7t{margin-bottom:24px}._7u{margin-left:24px}._7v{margin-top:-24px}._7w{margin-right:-24px}._7x{margin-bottom:-24px}._7y{margin-left:-24px}._7z{padding-bottom:24px;padding-top:24px}._80{padding-left:24px;padding-right:24px}._81{margin-top:28px}._82{margin-right:28px}._83{margin-bottom:28px}._84{margin-left:28px}._85{margin-top:-28px}._86{margin-right:-28px}._87{margin-bottom:-28px}._88{margin-left:-28px}._89{padding-bottom:28px;padding-top:28px}._8a{padding-left:28px;padding-right:28px}._8b{margin-top:32px}._8c{margin-right:32px}._8d{margin-bottom:32px}._8e{margin-left:32px}._8f{margin-top:-32px}._8g{margin-right:-32px}._8h{margin-bottom:-32px}._8i{margin-left:-32px}._8j{padding-bottom:32px;padding-top:32px}._8k{padding-left:32px;padding-right:32px}._8l{margin-top:36px}._8m{margin-right:36px}._8n{margin-bottom:36px}._8o{margin-left:36px}._8p{margin-top:-36px}._8q{margin-right:-36px}._8r{margin-bottom:-36px}._8s{margin-left:-36px}._8t{padding-bottom:36px;padding-top:36px}._8u{padding-left:36px;padding-right:36px}._8v{margin-top:40px}._8w{margin-right:40px}._8x{margin-bottom:40px}._8y{margin-left:40px}._8z{margin-top:-40px}._90{margin-right:-40px}._91{margin-bottom:-40px}._92{margin-left:-40px}._93{padding-bottom:40px;padding-top:40px}._94{padding-left:40px;padding-right:40px}._95{margin-top:44px}._96{margin-right:44px}._97{margin-bottom:44px}._98{margin-left:44px}._99{margin-top:-44px}._9a{margin-right:-44px}._9b{margin-bottom:-44px}._9c{margin-left:-44px}._9d{padding-bottom:44px;padding-top:44px}._9e{padding-left:44px;padding-right:44px}._9f{margin-top:48px}._9g{margin-right:48px}._9h{margin-bottom:48px}._9i{margin-left:48px}._9j{margin-top:-48px}._9k{margin-right:-48px}._9l{margin-bottom:-48px}._9m{margin-left:-48px}._9n{padding-bottom:48px;padding-top:48px}._9o{padding-left:48px;padding-right:48px}@media (min-width:576px){._9p{margin-top:4px}._9q{margin-right:4px}._9r{margin-bottom:4px}._9s{margin-left:4px}._9t{margin-top:-4px}._9u{margin-right:-4px}._9v{margin-bottom:-4px}._9w{margin-left:-4px}._9x{padding-bottom:4px;padding-top:4px}._9y{padding-left:4px;padding-right:4px}._9z{margin-top:8px}._a0{margin-right:8px}._a1{margin-bottom:8px}._a2{margin-left:8px}._a3{margin-top:-8px}._a4{margin-right:-8px}._a5{margin-bottom:-8px}._a6{margin-left:-8px}._a7{padding-bottom:8px;padding-top:8px}._a8{padding-left:8px;padding-right:8px}._a9{margin-top:12px}._aa{margin-right:12px}._ab{margin-bottom:12px}._ac{margin-left:12px}._ad{margin-top:-12px}._ae{margin-right:-12px}._af{margin-bottom:-12px}._ag{margin-left:-12px}._ah{padding-bottom:12px;padding-top:12px}._ai{padding-left:12px;padding-right:12px}._aj{margin-top:16px}._ak{margin-right:16px}._al{margin-bottom:16px}._am{margin-left:16px}._an{margin-top:-16px}._ao{margin-right:-16px}._ap{margin-bottom:-16px}._aq{margin-left:-16px}._ar{padding-bottom:16px;padding-top:16px}._as{padding-left:16px;padding-right:16px}._at{margin-top:20px}._au{margin-right:20px}._av{margin-bottom:20px}._aw{margin-left:20px}._ax{margin-top:-20px}._ay{margin-right:-20px}._az{margin-bottom:-20px}._b0{margin-left:-20px}._b1{padding-bottom:20px;padding-top:20px}._b2{padding-left:20px;padding-right:20px}._b3{margin-top:24px}._b4{margin-right:24px}._b5{margin-bottom:24px}._b6{margin-left:24px}._b7{margin-top:-24px}._b8{margin-right:-24px}._b9{margin-bottom:-24px}._ba{margin-left:-24px}._bb{padding-bottom:24px;padding-top:24px}._bc{padding-left:24px;padding-right:24px}._bd{margin-top:28px}._be{margin-right:28px}._bf{margin-bottom:28px}._bg{margin-left:28px}._bh{margin-top:-28px}._bi{margin-right:-28px}._bj{margin-bottom:-28px}._bk{margin-left:-28px}._bl{padding-bottom:28px;padding-top:28px}._bm{padding-left:28px;padding-right:28px}._bn{margin-top:32px}._bo{margin-right:32px}._bp{margin-bottom:32px}._bq{margin-left:32px}._br{margin-top:-32px}._bs{margin-right:-32px}._bt{margin-bottom:-32px}._bu{margin-left:-32px}._bv{padding-bottom:32px;padding-top:32px}._bw{padding-left:32px;padding-right:32px}._bx{margin-top:36px}._by{margin-right:36px}._bz{margin-bottom:36px}._c0{margin-left:36px}._c1{margin-top:-36px}._c2{margin-right:-36px}._c3{margin-bottom:-36px}._c4{margin-left:-36px}._c5{padding-bottom:36px;padding-top:36px}._c6{padding-left:36px;padding-right:36px}._c7{margin-top:40px}._c8{margin-right:40px}._c9{margin-bottom:40px}._ca{margin-left:40px}._cb{margin-top:-40px}._cc{margin-right:-40px}._cd{margin-bottom:-40px}._ce{margin-left:-40px}._cf{padding-bottom:40px;padding-top:40px}._cg{padding-left:40px;padding-right:40px}._ch{margin-top:44px}._ci{margin-right:44px}._cj{margin-bottom:44px}._ck{margin-left:44px}._cl{margin-top:-44px}._cm{margin-right:-44px}._cn{margin-bottom:-44px}._co{margin-left:-44px}._cp{padding-bottom:44px;padding-top:44px}._cq{padding-left:44px;padding-right:44px}._cr{margin-top:48px}._cs{margin-right:48px}._ct{margin-bottom:48px}._cu{margin-left:48px}._cv{margin-top:-48px}._cw{margin-right:-48px}._cx{margin-bottom:-48px}._cy{margin-left:-48px}._cz{padding-bottom:48px;padding-top:48px}._d0{padding-left:48px;padding-right:48px}}@media (min-width:768px){._d1{margin-top:4px}._d2{margin-right:4px}._d3{margin-bottom:4px}._d4{margin-left:4px}._d5{margin-top:-4px}._d6{margin-right:-4px}._d7{margin-bottom:-4px}._d8{margin-left:-4px}._d9{padding-bottom:4px;padding-top:4px}._da{padding-left:4px;padding-right:4px}._db{margin-top:8px}._dc{margin-right:8px}._dd{margin-bottom:8px}._de{margin-left:8px}._df{margin-top:-8px}._dg{margin-right:-8px}._dh{margin-bottom:-8px}._di{margin-left:-8px}._dj{padding-bottom:8px;padding-top:8px}._dk{padding-left:8px;padding-right:8px}._dl{margin-top:12px}._dm{margin-right:12px}._dn{margin-bottom:12px}._do{margin-left:12px}._dp{margin-top:-12px}._dq{margin-right:-12px}._dr{margin-bottom:-12px}._ds{margin-left:-12px}._dt{padding-bottom:12px;padding-top:12px}._du{padding-left:12px;padding-right:12px}._dv{margin-top:16px}._dw{margin-right:16px}._dx{margin-bottom:16px}._dy{margin-left:16px}._dz{margin-top:-16px}._e0{margin-right:-16px}._e1{margin-bottom:-16px}._e2{margin-left:-16px}._e3{padding-bottom:16px;padding-top:16px}._e4{padding-left:16px;padding-right:16px}._e5{margin-top:20px}._e6{margin-right:20px}._e7{margin-bottom:20px}._e8{margin-left:20px}._e9{margin-top:-20px}._ea{margin-right:-20px}._eb{margin-bottom:-20px}._ec{margin-left:-20px}._ed{padding-bottom:20px;padding-top:20px}._ee{padding-left:20px;padding-right:20px}._ef{margin-top:24px}._eg{margin-right:24px}._eh{margin-bottom:24px}._ei{margin-left:24px}._ej{margin-top:-24px}._ek{margin-right:-24px}._el{margin-bottom:-24px}._em{margin-left:-24px}._en{padding-bottom:24px;padding-top:24px}._eo{padding-left:24px;padding-right:24px}._ep{margin-top:28px}._eq{margin-right:28px}._er{margin-bottom:28px}._es{margin-left:28px}._et{margin-top:-28px}._eu{margin-right:-28px}._ev{margin-bottom:-28px}._ew{margin-left:-28px}._ex{padding-bottom:28px;padding-top:28px}._ey{padding-left:28px;padding-right:28px}._ez{margin-top:32px}._f0{margin-right:32px}._f1{margin-bottom:32px}._f2{margin-left:32px}._f3{margin-top:-32px}._f4{margin-right:-32px}._f5{margin-bottom:-32px}._f6{margin-left:-32px}._f7{padding-bottom:32px;padding-top:32px}._f8{padding-left:32px;padding-right:32px}._f9{margin-top:36px}._fa{margin-right:36px}._fb{margin-bottom:36px}._fc{margin-left:36px}._fd{margin-top:-36px}._fe{margin-right:-36px}._ff{margin-bottom:-36px}._fg{margin-left:-36px}._fh{padding-bottom:36px;padding-top:36px}._fi{padding-left:36px;padding-right:36px}._fj{margin-top:40px}._fk{margin-right:40px}._fl{margin-bottom:40px}._fm{margin-left:40px}._fn{margin-top:-40px}._fo{margin-right:-40px}._fp{margin-bottom:-40px}._fq{margin-left:-40px}._fr{padding-bottom:40px;padding-top:40px}._fs{padding-left:40px;padding-right:40px}._ft{margin-top:44px}._fu{margin-right:44px}._fv{margin-bottom:44px}._fw{margin-left:44px}._fx{margin-top:-44px}._fy{margin-right:-44px}._fz{margin-bottom:-44px}._g0{margin-left:-44px}._g1{padding-bottom:44px;padding-top:44px}._g2{padding-left:44px;padding-right:44px}._g3{margin-top:48px}._g4{margin-right:48px}._g5{margin-bottom:48px}._g6{margin-left:48px}._g7{margin-top:-48px}._g8{margin-right:-48px}._g9{margin-bottom:-48px}._ga{margin-left:-48px}._gb{padding-bottom:48px;padding-top:48px}._gc{padding-left:48px;padding-right:48px}}@media (min-width:1312px){._gd{margin-top:4px}._ge{margin-right:4px}._gf{margin-bottom:4px}._gg{margin-left:4px}._gh{margin-top:-4px}._gi{margin-right:-4px}._gj{margin-bottom:-4px}._gk{margin-left:-4px}._gl{padding-bottom:4px;padding-top:4px}._gm{padding-left:4px;padding-right:4px}._gn{margin-top:8px}._go{margin-right:8px}._gp{margin-bottom:8px}._gq{margin-left:8px}._gr{margin-top:-8px}._gs{margin-right:-8px}._gt{margin-bottom:-8px}._gu{margin-left:-8px}._gv{padding-bottom:8px;padding-top:8px}._gw{padding-left:8px;padding-right:8px}._gx{margin-top:12px}._gy{margin-right:12px}._gz{margin-bottom:12px}._h0{margin-left:12px}._h1{margin-top:-12px}._h2{margin-right:-12px}._h3{margin-bottom:-12px}._h4{margin-left:-12px}._h5{padding-bottom:12px;padding-top:12px}._h6{padding-left:12px;padding-right:12px}._h7{margin-top:16px}._h8{margin-right:16px}._h9{margin-bottom:16px}._ha{margin-left:16px}._hb{margin-top:-16px}._hc{margin-right:-16px}._hd{margin-bottom:-16px}._he{margin-left:-16px}._hf{padding-bottom:16px;padding-top:16px}._hg{padding-left:16px;padding-right:16px}._hh{margin-top:20px}._hi{margin-right:20px}._hj{margin-bottom:20px}._hk{margin-left:20px}._hl{margin-top:-20px}._hm{margin-right:-20px}._hn{margin-bottom:-20px}._ho{margin-left:-20px}._hp{padding-bottom:20px;padding-top:20px}._hq{padding-left:20px;padding-right:20px}._hr{margin-top:24px}._hs{margin-right:24px}._ht{margin-bottom:24px}._hu{margin-left:24px}._hv{margin-top:-24px}._hw{margin-right:-24px}._hx{margin-bottom:-24px}._hy{margin-left:-24px}._hz{padding-bottom:24px;padding-top:24px}._i0{padding-left:24px;padding-right:24px}._i1{margin-top:28px}._i2{margin-right:28px}._i3{margin-bottom:28px}._i4{margin-left:28px}._i5{margin-top:-28px}._i6{margin-right:-28px}._i7{margin-bottom:-28px}._i8{margin-left:-28px}._i9{padding-bottom:28px;padding-top:28px}._ia{padding-left:28px;padding-right:28px}._ib{margin-top:32px}._ic{margin-right:32px}._id{margin-bottom:32px}._ie{margin-left:32px}._if{margin-top:-32px}._ig{margin-right:-32px}._ih{margin-bottom:-32px}._ii{margin-left:-32px}._ij{padding-bottom:32px;padding-top:32px}._ik{padding-left:32px;padding-right:32px}._il{margin-top:36px}._im{margin-right:36px}._in{margin-bottom:36px}._io{margin-left:36px}._ip{margin-top:-36px}._iq{margin-right:-36px}._ir{margin-bottom:-36px}._is{margin-left:-36px}._it{padding-bottom:36px;padding-top:36px}._iu{padding-left:36px;padding-right:36px}._iv{margin-top:40px}._iw{margin-right:40px}._ix{margin-bottom:40px}._iy{margin-left:40px}._iz{margin-top:-40px}._j0{margin-right:-40px}._j1{margin-bottom:-40px}._j2{margin-left:-40px}._j3{padding-bottom:40px;padding-top:40px}._j4{padding-left:40px;padding-right:40px}._j5{margin-top:44px}._j6{margin-right:44px}._j7{margin-bottom:44px}._j8{margin-left:44px}._j9{margin-top:-44px}._ja{margin-right:-44px}._jb{margin-bottom:-44px}._jc{margin-left:-44px}._jd{padding-bottom:44px;padding-top:44px}._je{padding-left:44px;padding-right:44px}._jf{margin-top:48px}._jg{margin-right:48px}._jh{margin-bottom:48px}._ji{margin-left:48px}._jj{margin-top:-48px}._jk{margin-right:-48px}._jl{margin-bottom:-48px}._jm{margin-left:-48px}._jn{padding-bottom:48px;padding-top:48px}._jo{padding-left:48px;padding-right:48px}}._s7{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:4px;padding:10px 32px 10px 48px}._s7::-ms-clear{display:none}._s7::-webkit-input-placeholder{color:#b5b5b5}._s7:-ms-input-placeholder,._s7::-ms-input-placeholder{color:#b5b5b5}.input::-webkit-input-placeholder{color:#b5b5b5}.input:-ms-input-placeholder,.input::-ms-input-placeholder{color:#b5b5b5}._s7::placeholder{color:#b5b5b5}._s7::-webkit-search-cancel-button,._s7::-webkit-search-decoration,._s7::-webkit-search-results-button,._s7::-webkit-search-results-decoration{-webkit-appearance:none;appearance:none}._s7:focus{background-color:#fff}._s8{background-color:transparent;outline:none}._s9{border-radius:4px;padding:2px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}._sa{border-radius:3px;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-negative:1;flex-shrink:1}._sb{padding:9px 14px}._sc{padding:12px 14px}._sa:focus{position:relative}._sd{background:transparent}._sf{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:4px;border-style:solid;border-width:1px;height:40px;padding:0 35px 0 14px}._sf::-ms-expand{display:none}._sg{border-color:#b5b5b5}._sh{border-color:#e3780c}@-webkit-keyframes d{0%{opacity:1;-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{opacity:1;-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes d{0%{opacity:1;-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{opacity:1;-webkit-transform:rotate(1turn);transform:rotate(1turn)}}._sk{-webkit-animation-delay:.3s;animation-delay:.3s;-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:d;animation-name:d;-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}._sm{border-radius:48px;border-style:solid;border-width:1px;height:24px;transition:background-color .25s cubic-bezier(.25,.375,.1,.975),border-color .25s cubic-bezier(.25,.375,.1,.975);width:40px}._so{border-color:#555}._sp,._sq,._sr{border-color:#b5b5b5}._ss{border-style:solid;border-width:1px;height:24px;margin:-1px;transition:left sease .2s;width:24px}._st{right:0}._su{left:0}._sv{border-color:#555}._sw{border-color:#b5b5b5}._sx{height:100%;opacity:0;z-index:1}._jp{margin-left:auto}._jq{margin-right:auto}._jr{margin:0}._js{margin-top:0}._jt{margin-right:0}._ju{margin-bottom:0}._jv{margin-left:0}._jw{padding:0}._jx{padding-left:0;padding-right:0}._jy{padding-bottom:0;padding-top:0}._jz{margin:3px}._k0{margin-top:3px}._k1{margin-right:3px}._k2{margin-bottom:3px}._k3{margin-left:3px}._k4{margin:-3px}._k5{margin-top:-3px}._k6{margin-bottom:-3px}._k7{margin-left:-3px}._k8,._k9{margin-right:-3px}._k9{margin-left:-3px}._ka{margin-bottom:-3px;margin-top:-3px}._kb{padding:3px}._kc{padding-left:3px;padding-right:3px}._kd{padding-bottom:3px;padding-top:3px}._ke{margin:6px}._kf{margin-top:6px}._kg{margin-right:6px}._kh{margin-bottom:6px}._ki{margin-left:6px}._kj{margin:-6px}._kk{margin-top:-6px}._kl{margin-bottom:-6px}._km{margin-left:-6px}._kn,._ko{margin-right:-6px}._ko{margin-left:-6px}._kp{margin-bottom:-6px;margin-top:-6px}._kq{padding:6px}._kr{padding-left:6px;padding-right:6px}._ks{padding-bottom:6px;padding-top:6px}._kt{margin:9px}._ku{margin-top:9px}._kv{margin-right:9px}._kw{margin-bottom:9px}._kx{margin-left:9px}._ky{margin:-9px}._kz{margin-top:-9px}._l0{margin-bottom:-9px}._l1{margin-left:-9px}._l2,._l3{margin-right:-9px}._l3{margin-left:-9px}._l4{margin-bottom:-9px;margin-top:-9px}._l5{padding:9px}._l6{padding-left:9px;padding-right:9px}._l7{padding-bottom:9px;padding-top:9px}._l8{margin:12px}._l9{margin-top:12px}._la{margin-right:12px}._lb{margin-bottom:12px}._lc{margin-left:12px}._ld{margin:-12px}._le{margin-top:-12px}._lf{margin-bottom:-12px}._lg{margin-left:-12px}._lh,._li{margin-right:-12px}._li{margin-left:-12px}._lj{margin-bottom:-12px;margin-top:-12px}._lk{padding:12px}._ll{padding-left:12px;padding-right:12px}._lm{padding-bottom:12px;padding-top:12px}._ln{margin:15px}._lo{margin-top:15px}._lp{margin-right:15px}._lq{margin-bottom:15px}._lr{margin-left:15px}._ls{margin:-15px}._lt{margin-top:-15px}._lu{margin-bottom:-15px}._lv{margin-left:-15px}._lw,._lx{margin-right:-15px}._lx{margin-left:-15px}._ly{margin-bottom:-15px;margin-top:-15px}._lz{padding:15px}._m0{padding-left:15px;padding-right:15px}._m1{padding-bottom:15px;padding-top:15px}._m2{margin:18px}._m3{margin-top:18px}._m4{margin-right:18px}._m5{margin-bottom:18px}._m6{margin-left:18px}._m7{margin:-18px}._m8{margin-top:-18px}._m9{margin-bottom:-18px}._ma{margin-left:-18px}._mb,._mc{margin-right:-18px}._mc{margin-left:-18px}._md{margin-bottom:-18px;margin-top:-18px}._me{padding:18px}._mf{padding-left:18px;padding-right:18px}._mg{padding-bottom:18px;padding-top:18px}@media (min-width:576px){._jz{margin:4px}._k0{margin-top:4px}._k1{margin-right:4px}._k2{margin-bottom:4px}._k3{margin-left:4px}._k4{margin:-4px}._k5{margin-top:-4px}._k6{margin-bottom:-4px}._k7{margin-left:-4px}._k8,._k9{margin-right:-4px}._k9{margin-left:-4px}._ka{margin-bottom:-4px;margin-top:-4px}._kb{padding:4px}._kc{padding-left:4px;padding-right:4px}._kd{padding-bottom:4px;padding-top:4px}._ke{margin:8px}._kf{margin-top:8px}._kg{margin-right:8px}._kh{margin-bottom:8px}._ki{margin-left:8px}._kj{margin:-8px}._kk{margin-top:-8px}._kl{margin-bottom:-8px}._km{margin-left:-8px}._kn,._ko{margin-right:-8px}._ko{margin-left:-8px}._kp{margin-bottom:-8px;margin-top:-8px}._kq{padding:8px}._kr{padding-left:8px;padding-right:8px}._ks{padding-bottom:8px;padding-top:8px}._kt{margin:12px}._ku{margin-top:12px}._kv{margin-right:12px}._kw{margin-bottom:12px}._kx{margin-left:12px}._ky{margin:-12px}._kz{margin-top:-12px}._l0{margin-bottom:-12px}._l1{margin-left:-12px}._l2,._l3{margin-right:-12px}._l3{margin-left:-12px}._l4{margin-bottom:-12px;margin-top:-12px}._l5{padding:12px}._l6{padding-left:12px;padding-right:12px}._l7{padding-bottom:12px;padding-top:12px}._l8{margin:16px}._l9{margin-top:16px}._la{margin-right:16px}._lb{margin-bottom:16px}._lc{margin-left:16px}._ld{margin:-16px}._le{margin-top:-16px}._lf{margin-bottom:-16px}._lg{margin-left:-16px}._lh,._li{margin-right:-16px}._li{margin-left:-16px}._lj{margin-bottom:-16px;margin-top:-16px}._lk{padding:16px}._ll{padding-left:16px;padding-right:16px}._lm{padding-bottom:16px;padding-top:16px}._ln{margin:20px}._lo{margin-top:20px}._lp{margin-right:20px}._lq{margin-bottom:20px}._lr{margin-left:20px}._ls{margin:-20px}._lt{margin-top:-20px}._lu{margin-bottom:-20px}._lv{margin-left:-20px}._lw,._lx{margin-right:-20px}._lx{margin-left:-20px}._ly{margin-bottom:-20px;margin-top:-20px}._lz{padding:20px}._m0{padding-left:20px;padding-right:20px}._m1{padding-bottom:20px;padding-top:20px}._m2{margin:24px}._m3{margin-top:24px}._m4{margin-right:24px}._m5{margin-bottom:24px}._m6{margin-left:24px}._m7{margin:-24px}._m8{margin-top:-24px}._m9{margin-bottom:-24px}._ma{margin-left:-24px}._mb,._mc{margin-right:-24px}._mc{margin-left:-24px}._md{margin-bottom:-24px;margin-top:-24px}._me{padding:24px}._mf{padding-left:24px;padding-right:24px}._mg{padding-bottom:24px;padding-top:24px}}@media (min-width:768px){._jz{margin:6px 8px}._k0{margin-top:6px}._k1{margin-right:8px}._k2{margin-bottom:6px}._k3{margin-left:8px}._k4{margin:-6px -8px}._k5{margin-top:-6px}._k6{margin-bottom:-6px}._k7{margin-left:-8px}._k8,._k9{margin-right:-8px}._k9{margin-left:-8px}._ka{margin-bottom:-6px;margin-top:-6px}._kb{padding:6px 8px}._kc{padding-left:8px;padding-right:8px}._kd{padding-bottom:6px;padding-top:6px}._ke{margin:12px 16px}._kf{margin-top:12px}._kg{margin-right:16px}._kh{margin-bottom:12px}._ki{margin-left:16px}._kj{margin:-12px -16px}._kk{margin-top:-12px}._kl{margin-bottom:-12px}._km{margin-left:-16px}._kn,._ko{margin-right:-16px}._ko{margin-left:-16px}._kp{margin-bottom:-12px;margin-top:-12px}._kq{padding:12px 16px}._kr{padding-left:16px;padding-right:16px}._ks{padding-bottom:12px;padding-top:12px}._kt{margin:18px 24px}._ku{margin-top:18px}._kv{margin-right:24px}._kw{margin-bottom:18px}._kx{margin-left:24px}._ky{margin:-18px -24px}._kz{margin-top:-18px}._l0{margin-bottom:-18px}._l1{margin-left:-24px}._l2,._l3{margin-right:-24px}._l3{margin-left:-24px}._l4{margin-bottom:-18px;margin-top:-18px}._l5{padding:18px 24px}._l6{padding-left:24px;padding-right:24px}._l7{padding-bottom:18px;padding-top:18px}._l8{margin:24px 32px}._l9{margin-top:24px}._la{margin-right:32px}._lb{margin-bottom:24px}._lc{margin-left:32px}._ld{margin:-24px -32px}._le{margin-top:-24px}._lf{margin-bottom:-24px}._lg{margin-left:-32px}._lh,._li{margin-right:-32px}._li{margin-left:-32px}._lj{margin-bottom:-24px;margin-top:-24px}._lk{padding:24px 32px}._ll{padding-left:32px;padding-right:32px}._lm{padding-bottom:24px;padding-top:24px}._ln{margin:30px 40px}._lo{margin-top:30px}._lp{margin-right:40px}._lq{margin-bottom:30px}._lr{margin-left:40px}._ls{margin:-30px -40px}._lt{margin-top:-30px}._lu{margin-bottom:-30px}._lv{margin-left:-40px}._lw,._lx{margin-right:-40px}._lx{margin-left:-40px}._ly{margin-bottom:-30px;margin-top:-30px}._lz{padding:30px 40px}._m0{padding-left:40px;padding-right:40px}._m1{padding-bottom:30px;padding-top:30px}._m2{margin:36px 48px}._m3{margin-top:36px}._m4{margin-right:48px}._m5{margin-bottom:36px}._m6{margin-left:48px}._m7{margin:-36px -48px}._m8{margin-top:-36px}._m9{margin-bottom:-36px}._ma{margin-left:-48px}._mb,._mc{margin-right:-48px}._mc{margin-left:-48px}._md{margin-bottom:-36px;margin-top:-36px}._me{padding:36px 48px}._mf{padding-left:48px;padding-right:48px}._mg{padding-bottom:36px;padding-top:36px}}@media (min-width:1312px){._jz{margin:6px 8px}._k0{margin-top:6px}._k1{margin-right:8px}._k2{margin-bottom:6px}._k3{margin-left:8px}._k4{margin:-6px -8px}._k5{margin-top:-6px}._k6{margin-bottom:-6px}._k7{margin-left:-8px}._k8,._k9{margin-right:-8px}._k9{margin-left:-8px}._ka{margin-bottom:-6px;margin-top:-6px}._kb{padding:6px 8px}._kc{padding-left:8px;padding-right:8px}._kd{padding-bottom:6px;padding-top:6px}._ke{margin:12px 16px}._kf{margin-top:12px}._kg{margin-right:16px}._kh{margin-bottom:12px}._ki{margin-left:16px}._kj{margin:-12px -16px}._kk{margin-top:-12px}._kl{margin-bottom:-12px}._km{margin-left:-16px}._kn,._ko{margin-right:-16px}._ko{margin-left:-16px}._kp{margin-bottom:-12px;margin-top:-12px}._kq{padding:12px 16px}._kr{padding-left:16px;padding-right:16px}._ks{padding-bottom:12px;padding-top:12px}._kt{margin:18px 24px}._ku{margin-top:18px}._kv{margin-right:24px}._kw{margin-bottom:18px}._kx{margin-left:24px}._ky{margin:-18px -24px}._kz{margin-top:-18px}._l0{margin-bottom:-18px}._l1{margin-left:-24px}._l2,._l3{margin-right:-24px}._l3{margin-left:-24px}._l4{margin-bottom:-18px;margin-top:-18px}._l5{padding:18px 24px}._l6{padding-left:24px;padding-right:24px}._l7{padding-bottom:18px;padding-top:18px}._l8{margin:24px 32px}._l9{margin-top:24px}._la{margin-right:32px}._lb{margin-bottom:24px}._lc{margin-left:32px}._ld{margin:-24px -32px}._le{margin-top:-24px}._lf{margin-bottom:-24px}._lg{margin-left:-32px}._lh,._li{margin-right:-32px}._li{margin-left:-32px}._lj{margin-bottom:-24px;margin-top:-24px}._lk{padding:24px 32px}._ll{padding-left:32px;padding-right:32px}._lm{padding-bottom:24px;padding-top:24px}._ln{margin:30px 40px}._lo{margin-top:30px}._lp{margin-right:40px}._lq{margin-bottom:30px}._lr{margin-left:40px}._ls{margin:-30px -40px}._lt{margin-top:-30px}._lu{margin-bottom:-30px}._lv{margin-left:-40px}._lw,._lx{margin-right:-40px}._lx{margin-left:-40px}._ly{margin-bottom:-30px;margin-top:-30px}._lz{padding:30px 40px}._m0{padding-left:40px;padding-right:40px}._m1{padding-bottom:30px;padding-top:30px}._m2{margin:36px 48px}._m3{margin-top:36px}._m4{margin-right:48px}._m5{margin-bottom:36px}._m6{margin-left:48px}._m7{margin:-36px -48px}._m8{margin-top:-36px}._m9{margin-bottom:-36px}._ma{margin-left:-48px}._mb,._mc{margin-right:-48px}._mc{margin-left:-48px}._md{margin-bottom:-36px;margin-top:-36px}._me{padding:36px 48px}._mf{padding-left:48px;padding-right:48px}._mg{padding-bottom:36px;padding-top:36px}}._sz{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}._t0{padding:11px 16px;text-decoration:none}._t0:focus{position:relative}._t0:focus,._t0:hover{text-decoration:underline}._t1:focus,._t1:hover{color:#555}._t3{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:4px;border-style:solid;border-width:1px;padding:10px 14px;resize:none}._t3:focus{background-color:#fff}._t3::-webkit-input-placeholder{color:#b5b5b5}._t3:-ms-input-placeholder,._t3::-ms-input-placeholder{color:#b5b5b5}.textArea::-webkit-input-placeholder{color:#b5b5b5}.textArea:-ms-input-placeholder,.textArea::-ms-input-placeholder{color:#b5b5b5}._t3::placeholder{color:#b5b5b5}._t4{border-color:#b5b5b5}._t5{border-color:#e3780c}._t6{cursor:text}._3k{display:block}._3l{display:inline}._3m{display:inline-block}._3n{display:table}._3o{overflow:hidden}._3p{overflow:scroll}._3q{overflow-x:scroll;overflow-y:hidden}._3r{overflow-x:hidden;overflow-y:scroll}._3s{overflow:auto}._3t{max-width:100%}._3u{position:relative}._3v{position:fixed}._3w{position:absolute}._3x{position:relative;position:-webkit-sticky;position:sticky}._3y{top:0}._3z{right:0}._40{bottom:0}._41{left:0}._42{box-sizing:border-box}._43{display:-webkit-flex;display:-ms-flexbox;display:flex}@media (min-width:576px){._44{display:-webkit-flex;display:-ms-flexbox;display:flex}}@media (min-width:768px){._45{display:-webkit-flex;display:-ms-flexbox;display:flex}}@media (min-width:1312px){._46{display:-webkit-flex;display:-ms-flexbox;display:flex}}._47{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}._48{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}._49{-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}._4a{-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end}._4b{-webkit-align-items:center;-ms-flex-align:center;align-items:center}._4c{-webkit-align-items:baseline;-ms-flex-align:baseline;align-items:baseline}._4d{-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}._4e{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start}._4f{-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}._4g{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}._4h{-webkit-align-self:baseline;-ms-flex-item-align:baseline;align-self:baseline}._4i{-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch}._4j{-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}._4k{-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}._4l{-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}._4m{-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}._4n{-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}._4o{-ms-flex-line-pack:start;align-content:flex-start}._4p{-ms-flex-line-pack:end;align-content:flex-end}._4q{-ms-flex-line-pack:center;align-content:center}._4r{-ms-flex-line-pack:justify;align-content:space-between}._4s{-ms-flex-line-pack:distribute;align-content:space-around}._4t{-ms-flex-line-pack:stretch;align-content:stretch}._4u{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;min-width:0}._4v{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto}._4w{-webkit-order:-1;-ms-flex-order:-1;order:-1}._4x{-webkit-order:99999;-ms-flex-order:99999;order:99999}._ms{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased}._mt{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto Oxygen-Sans,Ubuntu,Cantarell,“Fira Sans”,“Droid Sans”,Helvetica Neue,Helvetica,\\\\30D2\\30E9\\30AE\\30CE\\89D2\\30B4 Pro W3,Hiragino Kaku Gothic Pro,\\\\30E1\\30A4\\30EA\\30AA,Meiryo,"\\FF2D\\FF33    \\FF30\\30B4\\30B7\\30C3\\30AF",Arial,sans-serif}:lang(ja) ._mt{font-family:SF Pro JP,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto Oxygen-Sans,Ubuntu,Cantarell,“Fira Sans”,“Droid Sans”,Helvetica Neue,Helvetica,\\\\30D2\\30E9\\30AE\\30CE\\89D2\\30B4 Pro W3,Hiragino Kaku Gothic Pro,\\\\30E1\\30A4\\30EA\\30AA,Meiryo,"\\FF2D\\FF33    \\FF30\\30B4\\30B7\\30C3\\30AF",Arial,sans-serif;quotes:"\\300C" "\\300D"}._mu{letter-spacing:-.4px}._mv{line-height:1.2}._mw{line-height:1.5}._mx{font-weight:400}._my{font-weight:700}._mz{font-style:normal}._n0{font-style:italic}._n1{text-decoration:underline}._n2{text-decoration:none}._n3{-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;word-wrap:break-word}._n4{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._n5{text-align:left}._n6{text-align:right}._n7{text-align:center}._n8{text-align:justify}._nw{font-size:12px}._nx{font-size:14px}._ny{font-size:16px}._nz{font-size:18px}._o0{font-size:21px}@media (min-width:576px){._o1{font-size:12px}._o2{font-size:14px}._o3{font-size:16px}._o4{font-size:18px}._o5{font-size:21px}}@media (min-width:768px){._o6{font-size:12px}._o7{font-size:14px}._o8{font-size:16px}._o9{font-size:18px}._oa{font-size:21px}}@media (min-width:1312px){._ob{font-size:12px}._oc{font-size:14px}._od{font-size:16px}._oe{font-size:18px}._of{font-size:21px}}._5c{color:#bd081c}._5d{background-color:#bd081c}._5e{color:#fff}._5f{background-color:#fff}._5g{color:#efefef}._5h{background-color:#efefef}._5i{color:#b5b5b5}._5j{background-color:#b5b5b5}._5k{color:#555}._5l{background-color:#555}._5m{color:#0fa573}._5n{background-color:#0fa573}._5o{color:#0a6955}._5p{background-color:#0a6955}._5q{color:#364a4c}._5r{background-color:#364a4c}._5s{color:#0084ff}._5t{background-color:#0084ff}._5u{color:#004b91}._5v{background-color:#004b91}._5w{color:#133a5e}._5x{background-color:#133a5e}._5y{color:#b469eb}._5z{background-color:#b469eb}._60{color:#8046a5}._61{background-color:#8046a5}._62{color:#5b2677}._63{background-color:#5b2677}._64{color:#6e0f3c}._65{background-color:#6e0f3c}._66{color:#f13535}._67{background-color:#f13535}._68{color:#e3780c}._69{background-color:#e3780c}._6a{background-color:transparent}._6b{background-color:#e2e2e2}._6c{background-color:#dadada}._t8{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:4px;border-style:solid;border-width:1px;max-height:40px;padding:10px 14px}._t8::-webkit-input-placeholder{color:#b5b5b5}._t8:-ms-input-placeholder,._t8::-ms-input-placeholder{color:#b5b5b5}.textField::-webkit-input-placeholder{color:#b5b5b5}.textField:-ms-input-placeholder,.textField::-ms-input-placeholder{color:#b5b5b5}._t8::placeholder{color:#b5b5b5}._t8:focus{background-color:#fff}._t9{border-color:#b5b5b5}._ta{border-color:#e3780c}._tb{cursor:text}._3i:focus,._3j{box-shadow:0 0 0 4px rgba(0,132,255,.5);outline:0}._25{vertical-align:top}._26{width:8.33333%}._27{width:16.66667%}._28{width:25%}._29{width:33.33333%}._2a{width:41.66667%}._2b{width:50%}._2c{width:58.33333%}._2d{width:66.66667%}._2e{width:75%}._2f{width:83.33333%}._2g{width:91.66667%}._2h{width:100%}@media (min-width:576px){._2i{width:8.33333%}._2j{width:16.66667%}._2k{width:25%}._2l{width:33.33333%}._2m{width:41.66667%}._2n{width:50%}._2o{width:58.33333%}._2p{width:66.66667%}._2q{width:75%}._2r{width:83.33333%}._2s{width:91.66667%}._2t{width:100%}}@media (min-width:768px){._2u{width:8.33333%}._2v{width:16.66667%}._2w{width:25%}._2x{width:33.33333%}._2y{width:41.66667%}._2z{width:50%}._30{width:58.33333%}._31{width:66.66667%}._32{width:75%}._33{width:83.33333%}._34{width:91.66667%}._35{width:100%}}@media (min-width:1312px){._36{width:8.33333%}._37{width:16.66667%}._38{width:25%}._39{width:33.33333%}._3a{width:41.66667%}._3b{width:50%}._3c{width:58.33333%}._3d{width:66.66667%}._3e{width:75%}._3f{width:83.33333%}._3g{width:91.66667%}._3h{width:100%}}._4y{border:1px solid #efefef}._4z{border-top:1px solid #efefef}._50{border-right:1px solid #efefef}._51{border-bottom:1px solid #efefef}._52{border-left:1px solid #efefef}._53{border-radius:0}._54{border-radius:50%}._55{border-radius:999px}._56{border-radius:8px}._57{border-radius:8px 8px 0 0}._58{border-radius:0 8px 8px 0}._59{border-radius:0 0 8px 8px}._5a{border-radius:8px 0 0 8px}._5b{border:0}._nn{cursor:pointer}._no{cursor:zoom-in}._np{cursor:zoom-out}._nq{cursor:copy}._nr{cursor:move}._ns{cursor:no-drop}._nt{cursor:-webkit-grab;cursor:grab}._nu{cursor:-webkit-grabbing;cursor:grabbing}._te{height:100%}',""])},function(t,e,n){var r=n(31);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,i);r.locals&&(t.exports=r.locals)},function(t,e){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,n){"use strict";var r=function(t){};t.exports=function(t,e,n,i,o,a,l,s){if(r(e),!t){var p;if(void 0===e)p=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,i,o,a,l,s],d=0;(p=new Error(e.replace(/%s/g,function(){return c[d++]}))).name="Invariant Violation"}throw p.framesToPop=1,p}}},function(t,e,n){"use strict";var r=n(13),i=n(35),o=n(34);t.exports=function(){function t(t,e,n,r,a,l){l!==o&&i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e};return n.checkPropTypes=r,n.PropTypes=n,n}},function(t,e,n){"use strict";t.exports={}},function(t,e,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var n,a,l=function(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(t),s=1;s<arguments.length;s++){for(var p in n=Object(arguments[s]))i.call(n,p)&&(l[p]=n[p]);if(r){a=r(n);for(var c=0;c<a.length;c++)o.call(n,a[c])&&(l[a[c]]=n[a[c]])}}return l}},function(t,e,n){"use strict";
/** @license React v16.3.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(38),i=n(37),o=n(13),a="function"==typeof Symbol&&Symbol.for,l=a?Symbol.for("react.element"):60103,s=a?Symbol.for("react.portal"):60106,p=a?Symbol.for("react.fragment"):60107,c=a?Symbol.for("react.strict_mode"):60108,d=a?Symbol.for("react.provider"):60109,u=a?Symbol.for("react.context"):60110,g=a?Symbol.for("react.async_mode"):60111,m=a?Symbol.for("react.forward_ref"):60112,f="function"==typeof Symbol&&Symbol.iterator;function h(t){for(var e=arguments.length-1,n="Minified React error #"+t+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+t,r=0;r<e;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);throw(e=Error(n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.")).name="Invariant Violation",e.framesToPop=1,e}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function x(t,e,n){this.props=t,this.context=e,this.refs=i,this.updater=n||_}function b(){}function y(t,e,n){this.props=t,this.context=e,this.refs=i,this.updater=n||_}x.prototype.isReactComponent={},x.prototype.setState=function(t,e){"object"!=typeof t&&"function"!=typeof t&&null!=t&&h("85"),this.updater.enqueueSetState(this,t,e,"setState")},x.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},b.prototype=x.prototype;var v=y.prototype=new b;v.constructor=y,r(v,x.prototype),v.isPureReactComponent=!0;var C={current:null},w=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function M(t,e,n){var r=void 0,i={},o=null,a=null;if(null!=e)for(r in void 0!==e.ref&&(a=e.ref),void 0!==e.key&&(o=""+e.key),e)w.call(e,r)&&!k.hasOwnProperty(r)&&(i[r]=e[r]);var s=arguments.length-2;if(1===s)i.children=n;else if(1<s){for(var p=Array(s),c=0;c<s;c++)p[c]=arguments[c+2];i.children=p}if(t&&t.defaultProps)for(r in s=t.defaultProps)void 0===i[r]&&(i[r]=s[r]);return{$$typeof:l,type:t,key:o,ref:a,props:i,_owner:C.current}}function L(t){return"object"==typeof t&&null!==t&&t.$$typeof===l}var O=/\/+/g,j=[];function R(t,e,n,r){if(j.length){var i=j.pop();return i.result=t,i.keyPrefix=e,i.func=n,i.context=r,i.count=0,i}return{result:t,keyPrefix:e,func:n,context:r,count:0}}function E(t){t.result=null,t.keyPrefix=null,t.func=null,t.context=null,t.count=0,10>j.length&&j.push(t)}function S(t,e,n,r){var i=typeof t;"undefined"!==i&&"boolean"!==i||(t=null);var o=!1;if(null===t)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case l:case s:o=!0}}if(o)return n(r,t,""===e?"."+T(t,0):e),1;if(o=0,e=""===e?".":e+":",Array.isArray(t))for(var a=0;a<t.length;a++){var p=e+T(i=t[a],a);o+=S(i,p,n,r)}else if(null===t||void 0===t?p=null:p="function"==typeof(p=f&&t[f]||t["@@iterator"])?p:null,"function"==typeof p)for(t=p.call(t),a=0;!(i=t.next()).done;)o+=S(i=i.value,p=e+T(i,a++),n,r);else"object"===i&&h("31","[object Object]"===(n=""+t)?"object with keys {"+Object.keys(t).join(", ")+"}":n,"");return o}function T(t,e){return"object"==typeof t&&null!==t&&null!=t.key?function(t){var e={"=":"=0",":":"=2"};return"$"+(""+t).replace(/[=:]/g,function(t){return e[t]})}(t.key):e.toString(36)}function P(t,e){t.func.call(t.context,e,t.count++)}function B(t,e,n){var r=t.result,i=t.keyPrefix;t=t.func.call(t.context,e,t.count++),Array.isArray(t)?N(t,r,n,o.thatReturnsArgument):null!=t&&(L(t)&&(e=i+(!t.key||e&&e.key===t.key?"":(""+t.key).replace(O,"$&/")+"/")+n,t={$$typeof:l,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}),r.push(t))}function N(t,e,n,r,i){var o="";null!=n&&(o=(""+n).replace(O,"$&/")+"/"),e=R(e,o,r,i),null==t||S(t,"",B,e),E(e)}var z={Children:{map:function(t,e,n){if(null==t)return t;var r=[];return N(t,r,null,e,n),r},forEach:function(t,e,n){if(null==t)return t;e=R(null,null,e,n),null==t||S(t,"",P,e),E(e)},count:function(t){return null==t?0:S(t,"",o.thatReturnsNull,null)},toArray:function(t){var e=[];return N(t,e,null,o.thatReturnsArgument),e},only:function(t){return L(t)||h("143"),t}},createRef:function(){return{current:null}},Component:x,PureComponent:y,createContext:function(t,e){return void 0===e&&(e=null),(t={$$typeof:u,_calculateChangedBits:e,_defaultValue:t,_currentValue:t,_changedBits:0,Provider:null,Consumer:null}).Provider={$$typeof:d,context:t},t.Consumer=t},forwardRef:function(t){return{$$typeof:m,render:t}},Fragment:p,StrictMode:c,unstable_AsyncMode:g,createElement:M,cloneElement:function(t,e,n){var i=void 0,o=r({},t.props),a=t.key,s=t.ref,p=t._owner;if(null!=e){void 0!==e.ref&&(s=e.ref,p=C.current),void 0!==e.key&&(a=""+e.key);var c=void 0;for(i in t.type&&t.type.defaultProps&&(c=t.type.defaultProps),e)w.call(e,i)&&!k.hasOwnProperty(i)&&(o[i]=void 0===e[i]&&void 0!==c?c[i]:e[i])}if(1===(i=arguments.length-2))o.children=n;else if(1<i){c=Array(i);for(var d=0;d<i;d++)c[d]=arguments[d+2];o.children=c}return{$$typeof:l,type:t.type,key:a,ref:s,props:o,_owner:p}},createFactory:function(t){var e=M.bind(null,t);return e.type=t,e},isValidElement:L,version:"16.3.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:C,assign:r}},q=Object.freeze({default:z}),F=q&&z||q;t.exports=F.default?F.default:F}]);

/***/ }),

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_navigation_json__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_navigation_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config_navigation_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_MainRoutes__ = __webpack_require__(824);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_scss__ = __webpack_require__(830);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__app_scss__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak








var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = { navModel: __WEBPACK_IMPORTED_MODULE_3__config_navigation_json___default.a }, _this.handleLeftNavItemClick = function (event, viewName) {
      // something to do here?
    }, _this.handleRightNavItemClick = function (event, viewName) {}
    // something to do here?

    /* eslint-enable no-unused-vars*/
    , _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var navModel = this.state.navModel;

      console.log('App properties: ', this.props);
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { id: 'appContainer' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components__["c" /* NavigationBar */], {
          brand: navModel.brand,
          navModel: navModel,
          handleLeftNavItemClick: this.handleLeftNavItemClick,
          handleRightNavItemClick: this.handleRightNavItemClick
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'container-fluid' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__routes_MainRoutes__["a" /* default */], null)
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components__["a" /* BackToTop */], {
          minScrollY: 40,
          scrollTo: 'appContainer'
        })
      );
    }

    /* eslint-disable no-unused-vars*/

  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_router__["withRouter"])(App));

/***/ }),

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
//  weak




var Jumbotron = function Jumbotron(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'jumbotron' },
    props.children
  );
};

Jumbotron.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
};

/* harmony default export */ __webpack_exports__["a"] = (Jumbotron);

/***/ }),

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__humburger_Humburger__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__leftNav_LeftNav__ = __webpack_require__(803);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rightNav_RightNav__ = __webpack_require__(805);
//  weak







var NavigationBar = function NavigationBar(_ref) {
  var brand = _ref.brand,
      navModel = _ref.navModel,
      handleLeftNavItemClick = _ref.handleLeftNavItemClick,
      handleRightNavItemClick = _ref.handleRightNavItemClick;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'nav',
    { className: 'navbar navbar-default' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'containersCustom' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'navbar-header' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__humburger_Humburger__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { className: 'navbar-brand' },
          brand
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          className: 'collapse navbar-collapse',
          id: 'bs-example-navbar-collapse-1' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'ul',
          { className: 'nav navbar-nav' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__leftNav_LeftNav__["a" /* default */], {
            leftLinks: navModel.leftLinks,
            onLeftNavButtonClick: handleLeftNavItemClick
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'ul',
          { className: 'nav navbar-nav navbar-right' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__rightNav_RightNav__["a" /* default */], {
            rightLinks: navModel.rightLinks,
            onRightNavButtonClick: handleRightNavItemClick
          })
        )
      )
    )
  );
};

NavigationBar.propTypes = {
  brand: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  handleLeftNavItemClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  handleRightNavItemClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  navModel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    leftLinks: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
    })).isRequired,
    rightLinks: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
    })).isRequired
  })
};

NavigationBar.defaultProps = {
  brand: 'brand'
};

/* harmony default export */ __webpack_exports__["a"] = (NavigationBar);

/***/ }),

/***/ 802:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
//  weak



var Humburger = function Humburger() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "button",
    {
      className: "navbar-toggle collapsed",
      type: "button",
      "data-toggle": "collapse",
      "data-target": "#bs-example-navbar-collapse-1" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "span",
      { className: "sr-only" },
      "Toggle navigation"
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "icon-bar" }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "icon-bar" }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "icon-bar" })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Humburger);

/***/ }),

/***/ 803:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leftNavButton_LeftNavButton__ = __webpack_require__(804);
//  weak





var LeftNav = function LeftNav(_ref) {
  var leftLinks = _ref.leftLinks,
      onLeftNavButtonClick = _ref.onLeftNavButtonClick;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'ul',
    { className: 'nav navbar-nav' },
    leftLinks.map(function (aLinkBtn, index) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__leftNavButton_LeftNavButton__["a" /* default */], {
        key: index,
        link: aLinkBtn.link,
        label: aLinkBtn.label,
        viewName: aLinkBtn.view,
        onClick: onLeftNavButtonClick
      });
    })
  );
};

LeftNav.propTypes = {
  leftLinks: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    viewName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })),
  onLeftNavButtonClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (LeftNav);

/***/ }),

/***/ 804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(78);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak





var LeftNavButton = function (_PureComponent) {
  _inherits(LeftNavButton, _PureComponent);

  function LeftNavButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LeftNavButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LeftNavButton.__proto__ || Object.getPrototypeOf(LeftNavButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleLeftNavItemClick = function (event) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          viewName = _this$props.viewName;

      onClick(event, viewName);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LeftNavButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          link = _props.link,
          label = _props.label;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["a" /* Link */],
          {
            to: link,
            onClick: this.handleLeftNavItemClick },
          label
        )
      );
    }
  }]);

  return LeftNavButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

LeftNavButton.propTypes = {
  link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  viewName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};


/* harmony default export */ __webpack_exports__["a"] = (LeftNavButton);

/***/ }),

/***/ 805:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rightNavButton_RightNavButton__ = __webpack_require__(806);
//  weak





var RightNav = function RightNav(_ref) {
  var rightLinks = _ref.rightLinks,
      onRightNavButtonClick = _ref.onRightNavButtonClick;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'ul',
    { className: 'nav navbar-nav navbar-right' },
    rightLinks.map(function (aLinkBtn, index) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__rightNavButton_RightNavButton__["a" /* default */], {
        key: index,
        link: aLinkBtn.link,
        label: aLinkBtn.label,
        viewName: aLinkBtn.view,
        onClick: onRightNavButtonClick
      });
    })
  );
};

RightNav.propTypes = {
  rightLinks: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    viewName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })),
  onRightNavButtonClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (RightNav);

/***/ }),

/***/ 806:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(78);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak





var RightNavButton = function (_PureComponent) {
  _inherits(RightNavButton, _PureComponent);

  function RightNavButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RightNavButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RightNavButton.__proto__ || Object.getPrototypeOf(RightNavButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleRightNavItemClick = function (event) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          viewName = _this$props.viewName;

      onClick(event, viewName);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RightNavButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          link = _props.link,
          label = _props.label;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["a" /* Link */],
          {
            to: link,
            onClick: this.handleRightNavItemClick },
          label
        )
      );
    }
  }]);

  return RightNavButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

RightNavButton.propTypes = {
  link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  viewName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};


/* harmony default export */ __webpack_exports__["a"] = (RightNavButton);

/***/ }),

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backToTopButton_BackToTopButton__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_motion__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_motion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_motion__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-undefined */

// #region imports



// #endregion

// #region flow types

// #endregion

var BackToTop = function (_Component) {
  _inherits(BackToTop, _Component);

  function BackToTop() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BackToTop);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BackToTop.__proto__ || Object.getPrototypeOf(BackToTop)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      windowScrollY: 0,
      showBackButton: false,
      tickingScollObserve: false
    }, _this.handleWindowScroll = function () {
      if (window) {
        var _this$state = _this.state,
            _windowScrollY = _this$state.windowScrollY,
            _tickingScollObserve = _this$state.tickingScollObserve;
        var _minScrollY = _this.props.minScrollY;

        /* eslint-disable no-undefined */

        var currentWindowScrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        /* eslint-enable no-undefined */

        // scroll event fires to often, using window.requestAnimationFrame to limit computations
        if (!_tickingScollObserve) {
          window.requestAnimationFrame(function () {
            if (_windowScrollY !== currentWindowScrollY) {
              var shouldShowBackButton = currentWindowScrollY >= _minScrollY ? true : false;

              _this.setState({
                windowScrollY: currentWindowScrollY,
                showBackButton: shouldShowBackButton
              });
            }
            _this.setState({ tickingScollObserve: false });
          });
        }

        _this.setState({ tickingScollObserve: true });
      }
    }, _this.handlesOnBackButtonClick = function (event) {
      if (event) {
        event.preventDefault();
      }
      var minScrollY = _this.props.minScrollY;
      var windowScrollY = _this.state.windowScrollY;


      if (window && windowScrollY && windowScrollY > minScrollY) {
        // using here smoothscroll-polyfill
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        // smoothScroll.scrollTo(scrollTo, this.scrollDone);
      }
    }, _this.scrollDone = function () {
      var onScrollDone = _this.props.onScrollDone;

      if (onScrollDone) {
        onScrollDone();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BackToTop, [{
    key: 'componentWillMount',


    // #region lifecycle methods
    value: function componentWillMount() {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', this.handleWindowScroll);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', this.handleWindowScroll);
      }
    }
  }, {
    key: 'render',

    // #endregion
    value: function render() {
      var _this2 = this;

      var showBackButton = this.state.showBackButton;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_motion__["Motion"],
        { style: { x: Object(__WEBPACK_IMPORTED_MODULE_2_react_motion__["spring"])(showBackButton ? 0 : 120, __WEBPACK_IMPORTED_MODULE_2_react_motion__["presets"].stiff) } },
        function (_ref2) {
          var x = _ref2.x;
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__backToTopButton_BackToTopButton__["a" /* default */], {
            position: 'bottom-right',
            onClick: _this2.handlesOnBackButtonClick,
            motionStyle: {
              WebkitTransform: 'translate3d(' + x + 'px, 0, 0)',
              transform: 'translate3d(' + x + 'px, 0, 0)'
            }
          });
        }
      );
    }
    // #endregion

    // #region on windows scroll callback

    // #endregion

    // #region on button click (smooth scroll)

  }]);

  return BackToTop;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

BackToTop.defaultProps = {
  minScrollY: 120,
  onScrollDone: function onScrollDone() {}
};


/* harmony default export */ __webpack_exports__["a"] = (BackToTop);

/***/ }),

/***/ 808:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UpIcon__ = __webpack_require__(809);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//  weak






var defaultBackGroundColor = '#4A4A4A';
var sideOffset = '-10px';
var bottomOffset = '40px';
var defaultWidth = '100px';
var defaultZindex = 10;
var defaultOpacity = 0.5;
var defaultStyle = {
  position: 'fixed',
  right: sideOffset,
  left: '',
  bottom: bottomOffset,
  width: defaultWidth,
  zIndex: defaultZindex,
  opacity: defaultOpacity,
  backgroundColor: defaultBackGroundColor
};

var BackToTopButton = function BackToTopButton(_ref) {
  var onClick = _ref.onClick,
      position = _ref.position,
      children = _ref.children,
      motionStyle = _ref.motionStyle;

  var buttonStyle = setPosition(position, _extends({}, motionStyle, defaultStyle));

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'button',
    {
      style: buttonStyle,
      className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()({
        'btn': true
      }),
      onClick: onClick },
    !children && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { style: { marginRight: '10px' } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__UpIcon__["a" /* default */], { color: '#F1F1F1' })
    ),
    !!children && children
  );
};

BackToTopButton.propTypes = {
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['bottom-left', 'bottom-right']),
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  motionStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};

BackToTopButton.defaultProps = {
  position: 'bottom-right'
};

function setPosition() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bottom-right';
  var refStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultStyle;

  var style = _extends({}, refStyle);

  switch (position) {
    case 'bottom-right':
      style.right = sideOffset;
      style.left = '';
      return style;

    case 'bottom-left':
      style.right = '';
      style.left = sideOffset;
      return style;

    default:
      return refStyle;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BackToTopButton);

/***/ }),

/***/ 809:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
//  weak




var UpIcon = function UpIcon(_ref) {
  var color = _ref.color;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'svg',
    {
      width: '24px',
      height: '24px',
      viewBox: '0 0 512 512',
      fill: '' + color },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M256,213.7L256,213.7L256,213.7l174.2,167.2c4.3,4.2,11.4,4.1,15.8-0.2l30.6-29.9c4.4-4.3,4.5-11.3,0.2-15.5L264.1,131.1 c-2.2-2.2-5.2-3.2-8.1-3c-3-0.1-5.9,0.9-8.1,3L35.2,335.3c-4.3,4.2-4.2,11.2,0.2,15.5L66,380.7c4.4,4.3,11.5,4.4,15.8,0.2L256,213.7z' })
  );
};

UpIcon.propTypes = {
  color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

UpIcon.defaultProps = {
  color: '#F1F1F1'
};

/* harmony default export */ __webpack_exports__["a"] = (UpIcon);

/***/ }),

/***/ 817:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"view-enter":"animatedView__view-enter___2BiqB","fadeIn":"animatedView__fadeIn___2Tjl3"};

/***/ }),

/***/ 818:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(819);

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(820);

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),

/***/ 820:
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),

/***/ 823:
/***/ (function(module, exports) {

module.exports = {"brand":"React Bootstrap Starter","leftLinks":[],"rightLinks":[{"label":"Home","link":"/"},{"label":"Protected","link":"/protected","view":"protected","isRouteBtn":true},{"label":"About","link":"/about","view":"about","isRouteBtn":true},{"label":"Disconnect","link":"/login","view":"login","isRouteBtn":true}]}

/***/ }),

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_home_Home__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_about_About__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_protected_Protected__ = __webpack_require__(829);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_privateRoute_PrivateRoute__ = __webpack_require__(423);
//  weak








var MainRoutes = function MainRoutes() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_react_router__["Switch"],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_2__views_home_Home__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: '/about', component: __WEBPACK_IMPORTED_MODULE_3__views_about_About__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_privateRoute_PrivateRoute__["a" /* default */], { path: '/protected', component: __WEBPACK_IMPORTED_MODULE_4__views_protected_Protected__["a" /* default */] })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (MainRoutes);

/***/ }),

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames_bind__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames_bind___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames_bind__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_dom__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_animatedView_AnimatedView__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_scss__ = __webpack_require__(826);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__home_scss__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak









// IMPORTANT: we need to bind classnames to CSSModule generated classes:
var cx = __WEBPACK_IMPORTED_MODULE_3_classnames_bind___default.a.bind(__WEBPACK_IMPORTED_MODULE_6__home_scss___default.a);

var Home = function (_PureComponent) {
  _inherits(Home, _PureComponent);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5__components_animatedView_AnimatedView__["a" /* default */],
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2__components__["b" /* Jumbotron */],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              className: __WEBPACK_IMPORTED_MODULE_6__home_scss___default.a.homeInfo
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              {
                className: __WEBPACK_IMPORTED_MODULE_6__home_scss___default.a.mainTitle
              },
              'ReactJS 16 + Bootstrap'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h2',
              null,
              'with Hot Reload (',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'i',
                null,
                'react-hot-loader 3.1+'
              ),
              ')!!!'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h2',
              null,
              'and React Router v4'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h2',
              null,
              'and webpack 3.x'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h2',
              null,
              'and CSSModule (',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'i',
                { className: __WEBPACK_IMPORTED_MODULE_6__home_scss___default.a.lightNote },
                'so keep using SCSS as you did before but import your class in your components like it were JS files'
              ),
              ')'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              null,
              'Starter'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_4_react_router_dom__["a" /* Link */],
                {
                  className: 'btn btn-success btn-lg',
                  to: '/about' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-info' }),
                '\xA0 go to about'
              )
            )
          )
        )
      );
    }
  }]);

  return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

Home.propTypes = {
  // react-router 4:
  match: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Home);

/***/ }),

/***/ 826:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"homeInfo":"home__homeInfo___a8i4z","mainTitle":"home__mainTitle___3MX--","lightNote":"home__lightNote___3DxFE"};

/***/ }),

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_animatedView_AnimatedView__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__about_scss__ = __webpack_require__(828);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__about_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__about_scss__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak






var About = function (_PureComponent) {
  _inherits(About, _PureComponent);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
  }

  _createClass(About, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_animatedView_AnimatedView__["a" /* default */],
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          null,
          'About'
        )
      );
    }
  }]);

  return About;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

About.propTypes = {
  // react-router 4:
  match: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (About);

/***/ }),

/***/ 828:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_animatedView_AnimatedView__ = __webpack_require__(96);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak





var Protected = function (_PureComponent) {
  _inherits(Protected, _PureComponent);

  function Protected() {
    _classCallCheck(this, Protected);

    return _possibleConstructorReturn(this, (Protected.__proto__ || Object.getPrototypeOf(Protected)).apply(this, arguments));
  }

  _createClass(Protected, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_animatedView_AnimatedView__["a" /* default */],
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          null,
          'Protected view'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h3',
          null,
          'If you can read, it means you are authenticated'
        )
      );
    }
  }]);

  return Protected;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

Protected.propTypes = {
  // react-router 4:
  match: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Protected);

/***/ }),

/***/ 830:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 831:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(124);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak





var ScrollToTop = function (_Component) {
  _inherits(ScrollToTop, _Component);

  function ScrollToTop() {
    _classCallCheck(this, ScrollToTop);

    return _possibleConstructorReturn(this, (ScrollToTop.__proto__ || Object.getPrototypeOf(ScrollToTop)).apply(this, arguments));
  }

  _createClass(ScrollToTop, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (window) {
        var prevLocation = prevProps.location;
        var nextLocation = this.props.location;


        if (prevLocation !== nextLocation) {
          window.scrollTo(0, 0);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return children;
    }
  }]);

  return ScrollToTop;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ScrollToTop.propTypes = {
  // react-router 4:
  match: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,

  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
};


/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_2_react_router__["withRouter"])(ScrollToTop));

/***/ }),

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_scss__ = __webpack_require__(990);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__login_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_appConfig__ = __webpack_require__(991);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_utils_getLocationOrigin__ = __webpack_require__(992);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mock_userInfo_json__ = __webpack_require__(993);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mock_userInfo_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__mock_userInfo_json__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// #region imports









// #endregion

// #region flow types

// #endregion

var Login = function (_PureComponent) {
  _inherits(Login, _PureComponent);

  function Login() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      email: '',
      password: '',
      isLogging: false
    }, _this.disconnectUser = function () {
      __WEBPACK_IMPORTED_MODULE_5__services_auth__["a" /* default */].clearAllAppStorage();
    }, _this.handlesOnEmailChange = function (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      _this.setState({ email: event.target.value.trim() });
    }, _this.handlesOnPasswordChange = function (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      _this.setState({ password: event.target.value.trim() });
    }, _this.handlesOnLogin = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        var history, _this$state, email, password, userLogin, response, _response$data, token, user;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (event) {
                  event.preventDefault();
                }

                history = _this.props.history;
                _this$state = _this.state, email = _this$state.email, password = _this$state.password;
                userLogin = {
                  login: email,
                  password: password
                };
                _context.prev = 4;

                _this.setState({ isLogging: true });
                _context.next = 8;
                return _this.logUser(userLogin);

              case 8:
                response = _context.sent;
                _response$data = response.data, token = _response$data.token, user = _response$data.user;


                __WEBPACK_IMPORTED_MODULE_5__services_auth__["a" /* default */].setToken(token);
                __WEBPACK_IMPORTED_MODULE_5__services_auth__["a" /* default */].setUserInfo(user);
                _this.setState({ isLogging: false });

                history.push({ pathname: '/' }); // back to Home
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](4);

                _this.setState({ isLogging: false });
                /* eslint-disable no-console */
                console.log('login went wrong..., error: ', _context.t0);
                /* eslint-enable no-console */

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[4, 16]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.logUser = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var login = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var __SOME_LOGIN_API__, url, method, headers, options, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                __SOME_LOGIN_API__ = 'login';
                url = Object(__WEBPACK_IMPORTED_MODULE_7__services_utils_getLocationOrigin__["a" /* default */])() + '/' + __SOME_LOGIN_API__;
                method = 'post';
                headers = {};
                options = {
                  credentials: 'same-origin',
                  data: {
                    login: login,
                    password: password
                  }
                };

                if (!__WEBPACK_IMPORTED_MODULE_6__config_appConfig__["a" /* appConfig */].DEV_MODE) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', new Promise(function (resolve) {
                  return setTimeout(resolve({ data: __WEBPACK_IMPORTED_MODULE_8__mock_userInfo_json___default.a }), 3000);
                }));

              case 7:
                _context2.prev = 7;
                _context2.next = 10;
                return __WEBPACK_IMPORTED_MODULE_2_axios___default.a.request(_extends({
                  method: method,
                  url: url,
                  withCredentials: true,
                  headers: _extends({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': '*'
                  }, headers)
                }, options));

              case 10:
                response = _context2.sent;
                return _context2.abrupt('return', Promise.resolve(response));

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](7);
                return _context2.abrupt('return', Promise.reject(_context2.t0));

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[7, 14]]);
      }));

      return function () {
        return _ref3.apply(this, arguments);
      };
    }(), _this.goHome = function (event) {
      if (event) {
        event.preventDefault();
      }
      var history = _this.props.history;

      history.push({ pathname: '/' });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.disconnectUser(); // diconnect user: remove token and user info
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          email = _state.email,
          password = _state.password,
          isLogging = _state.isLogging;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'content' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Row"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Col"],
            {
              md: 4,
              mdOffset: 4,
              xs: 10,
              xsOffset: 1
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'form',
              {
                className: 'form-horizontal',
                noValidate: true
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'fieldset',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'legend',
                  null,
                  'Login'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'form-group' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'label',
                    {
                      htmlFor: 'inputEmail',
                      className: 'col-lg-2 control-label' },
                    'Email'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Col"],
                    { lg: 10 },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      id: 'inputEmail',
                      placeholder: 'Email',
                      value: email,
                      onChange: this.handlesOnEmailChange
                    })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'form-group' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'label',
                    {
                      htmlFor: 'inputPassword',
                      className: 'col-lg-2 control-label' },
                    'Password'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Col"],
                    { lg: 10 },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                      type: 'password',
                      className: 'form-control',
                      id: 'inputPassword',
                      placeholder: 'Password',
                      value: password,
                      onChange: this.handlesOnPasswordChange
                    })
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'form-group' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Col"],
                    {
                      lg: 10,
                      lgOffset: 2
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Button"],
                      {
                        className: 'login-button btn-block',
                        bsStyle: 'primary',
                        disabled: isLogging,
                        onClick: this.handlesOnLogin },
                      isLogging ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        'login in... \xA0',
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
                          className: 'fa fa-spinner fa-pulse fa-fw'
                        })
                      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        'Login'
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Row"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Col"],
            {
              md: 4,
              mdOffset: 4,
              xs: 10,
              xsOffset: 1
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'pull-right' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Button"],
                {
                  bsStyle: 'info',
                  className: 'btn-block',
                  onClick: this.goHome
                },
                'back to home'
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

Login.propTypes = {
  // react-router 4:
  match: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkStatus; });
/* harmony export (immutable) */ __webpack_exports__["b"] = isNetworkRequestInFlight;
/**
 * The current status of a query’s execution in our system.
 */
var NetworkStatus;
(function (NetworkStatus) {
    /**
     * The query has never been run before and the query is now currently running. A query will still
     * have this network status even if a partial data result was returned from the cache, but a
     * query was dispatched anyway.
     */
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    /**
     * If `setVariables` was called and a query was fired because of that then the network status
     * will be `setVariables` until the result of that query comes back.
     */
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    /**
     * Indicates that `fetchMore` was called on this query and that the query created is currently in
     * flight.
     */
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    /**
     * Similar to the `setVariables` network status. It means that `refetch` was called on a query
     * and the refetch request is currently in flight.
     */
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    /**
     * Indicates that a polling query is currently in flight. So for example if you are polling a
     * query every 10 seconds then the network status will switch to `poll` every 10 seconds whenever
     * a poll request has been sent but not resolved.
     */
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    /**
     * No request is in flight for this query, and no errors happened. Everything is OK.
     */
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    /**
     * No request is in flight for this query, but one or more errors were detected.
     */
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
/**
 * Returns true if there is currently a network request in flight according to a given network
 * status.
 */
function isNetworkRequestInFlight(networkStatus) {
    return networkStatus < 7;
}
//# sourceMappingURL=networkStatus.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames_bind__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames_bind___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames_bind__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animatedView_scss__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animatedView_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__animatedView_scss__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak






// IMPORTANT: we need to bind classname to CSSModule generated classes:
var cx = __WEBPACK_IMPORTED_MODULE_2_classnames_bind___default.a.bind(__WEBPACK_IMPORTED_MODULE_3__animatedView_scss___default.a);

var AnimatedView = function (_Component) {
  _inherits(AnimatedView, _Component);

  function AnimatedView() {
    _classCallCheck(this, AnimatedView);

    return _possibleConstructorReturn(this, (AnimatedView.__proto__ || Object.getPrototypeOf(AnimatedView)).apply(this, arguments));
  }

  _createClass(AnimatedView, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          animated = _props.animated,
          children = _props.children;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        {
          className: cx({
            'content': true,
            'view-enter': animated
          }) },
        children
      );
    }
  }]);

  return AnimatedView;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

AnimatedView.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  animated: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};
AnimatedView.defaultProps = {
  animated: true
};


/* harmony default export */ __webpack_exports__["a"] = (AnimatedView);

/***/ }),

/***/ 990:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 991:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appConfig; });
var appConfig = {
  DEV_MODE: true // block fetch
};

/***/ }),

/***/ 992:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getLocationOrigin */
//  weak

var getLocationOrigin = function getLocationOrigin() {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }
  return window.location.origin;
};

/* harmony default export */ __webpack_exports__["a"] = (getLocationOrigin);

/***/ }),

/***/ 993:
/***/ (function(module, exports) {

module.exports = {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkZW1vIiwiaWF0IjoxNTAyMzA3MzU0LCJleHAiOjE3MjMyMzIxNTQsImF1ZCI6ImRlbW8tZGVtbyIsInN1YiI6ImRlbW8iLCJHaXZlbk5hbWUiOiJKb2huIiwiU3VybmFtZSI6IkRvZSIsIkVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJSb2xlIjpbIlN1cGVyIGNvb2wgZGV2IiwibWFnaWMgbWFrZXIiXX0.6FjgLCypaqmRp4tDjg_idVKIzQw16e-z_rjA3R94IqQ","user":{"id":111,"login":"john.doe@fake.mail","firstname":"John","lastname":"Doe","isAdmin":true}}

/***/ }),

/***/ 994:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pageNotFound_scss__ = __webpack_require__(995);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pageNotFound_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__pageNotFound_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_animatedView_AnimatedView__ = __webpack_require__(96);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  weak







var PageNotFound = function (_PureComponent) {
  _inherits(PageNotFound, _PureComponent);

  function PageNotFound() {
    _classCallCheck(this, PageNotFound);

    return _possibleConstructorReturn(this, (PageNotFound.__proto__ || Object.getPrototypeOf(PageNotFound)).apply(this, arguments));
  }

  _createClass(PageNotFound, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4__components_animatedView_AnimatedView__["a" /* default */],
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2__components__["b" /* Jumbotron */],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            null,
            'Sorry this page does not exists...'
          )
        )
      );
    }
  }]);

  return PageNotFound;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

PageNotFound.propTypes = {
  // react-router 4:
  match: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (PageNotFound);

/***/ }),

/***/ 995:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 996:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 997:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 998:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 999:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"containersCustom":"index__containersCustom___4gEbt","invisible":"index__invisible___334e2","view-enter":"index__view-enter___LOafb","fadeIn":"index__fadeIn___yltfA"};

/***/ })

},[476]);
//# sourceMappingURL=app.bundle.js.map