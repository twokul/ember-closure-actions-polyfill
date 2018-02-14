/* globals Ember, require */

(function() {
  var _Ember;

  if (typeof Ember !== 'undefined') {
    _Ember = Ember;
  } else {
    _Ember = require('ember').default;
  }

  var utils = Ember.__loader.require('ember-metal/utils');
  var run = Ember.__loader.require('ember-metal/run_loop');
  var streams__utils = Ember.__loader.require('ember-views/streams/utils');
  var system__utils = Ember.__loader.require('ember-views/system/utils');
  var ActionManager = Ember.__loader.require('ember-views/system/action_manager');
  var ember_metal__streams__utils = Ember.__loader.require('ember-metal/streams/utils');

  function actionArgs(parameters, actionName) {
    var ret, i, l;

    if (actionName === undefined) {
      ret = new Array(parameters.length);
      for (i = 0, l = parameters.length; i < l; i++) {
        ret[i] = streams__utils.readUnwrappedModel(parameters[i]);
      }
    } else {
      ret = new Array(parameters.length + 1);
      ret[0] = actionName;
      for (i = 0, l = parameters.length; i < l; i++) {
        ret[i + 1] = streams__utils.readUnwrappedModel(parameters[i]);
      }
    }

    return ret;
  }

  var ActionHelper = {};

  ActionHelper.registeredActions = ActionManager['default'].registeredActions;

  var keys = ["alt", "shift", "meta", "ctrl"];

  var POINTER_EVENT_TYPE_REGEX = /^click|mouse|touch/;

  var isAllowedEvent = function (event, allowedKeys) {
    if (typeof allowedKeys === "undefined") {
      if (POINTER_EVENT_TYPE_REGEX.test(event.type)) {
        return system__utils.isSimpleClick(event);
      } else {
        allowedKeys = '';
      }
    }

    if (allowedKeys.indexOf("any") >= 0) {
      return true;
    }

    for (var i = 0, l = keys.length; i < l; i++) {
      if (event[keys[i] + "Key"] && allowedKeys.indexOf(keys[i]) === -1) {
        return false;
      }
    }

    return true;
  };

  ActionHelper.registerAction = function (actionNameOrStream, options, allowedKeys) {
    var actionId = utils.uuid();
    var eventName = options.eventName;
    var parameters = options.parameters;

    ActionManager['default'].registeredActions[actionId] = {
      eventName: eventName,
      handler: function (event) {
        if (!isAllowedEvent(event, allowedKeys)) {
          return true;
        }

        if (options.preventDefault !== false) {
          event.preventDefault();
        }

        if (options.bubbles === false) {
          event.stopPropagation();
        }

        var target = options.target.value();

        var actionName;

        if (ember_metal__streams__utils.isStream(actionNameOrStream)) {
          actionName = actionNameOrStream.value();

          Ember['default'].assert("You specified a quoteless path to the {{action}} helper " + "which did not resolve to an action name (a string). " + "Perhaps you meant to use a quoted actionName? (e.g. {{action 'save'}}).", typeof actionName === 'string');
        } else {
          actionName = actionNameOrStream;
        }

        run['default'](function runRegisteredAction() {
          if (target.send) {
            target.send.apply(target, actionArgs(parameters, actionName));
          } else {
            Ember['default'].assert("The action '" + actionName + "' did not exist on " + target, typeof target[actionName] === 'function');
            target[actionName].apply(target, actionArgs(parameters));
          }
        });
      }
    };

    options.view.on('willClearRender', function () {
      delete ActionManager['default'].registeredActions[actionId];
    });

    return actionId;
  };

  function closureAction(actionNameOrStream, parameters, target, hash) {
    return function(params) {
      var actionName;

      if (ember_metal__streams__utils.isStream(actionNameOrStream)) {
        actionName = actionNameOrStream.value();

        if (typeof actionName === 'function') {
          //
        } else {
          _Ember.assert("You specified a quoteless path to the {{action}} helper " + "which did not resolve to an action name (a string). " + "Perhaps you meant to use a quoted actionName? (e.g. {{action 'save'}}).", typeof actionName === 'string');
        }
      } else {
        actionName = actionNameOrStream;
      }

      run['default'](function runRegisteredAction() {
        if (typeof actionName === 'function') {
          actionName.apply(target, parameters);
        } else {
          var args = actionArgs(parameters.concat(params), actionName);
          if (target.send) {
            target.send.apply(target, args);
          } else {
            _Ember.assert("The action '" + actionName + "' did not exist on " + target, typeof target[actionName] === 'function');
            target[actionName].apply(target, args);
          }
        }
      });
    };
  }

  _Ember.HTMLBars._registerHelper('hash', function(params, hash) {
    return hash;
  });

  _Ember.HTMLBars._registerHelper('action', function(params, hash, options, env) {
    var view = env.data.view;
    var target;

    if (!hash.target) {
      target = view.getStream('controller');
    } else if (ember_metal__streams__utils.isStream(hash.target)) {
      target = hash.target;
    } else {
      target = view.getStream(hash.target);
    }

    var actionOptions = {
      eventName: hash.on || 'click',
      parameters: params.slice(1),
      view: view,
      bubbles: hash.bubbles,
      preventDefault: hash.preventDefault,
      target: target,
      withKeyCode: hash.withKeyCode
    };

    var actionName = params[0];
    var actionId = ActionHelper.registerAction(actionName, actionOptions, hash.allowedKeys);
    if (options.element) {
      env.dom.setAttribute(options.element, 'data-ember-action', actionId);
      return true;
    }
    return closureAction(actionName, actionOptions.parameters, target.value(), hash);
  });
})();
