'use strict';

const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-closure-actions-polyfill',

  included() {
    this._super.included.apply(this, arguments);

    this._ensureThisImport();

    let checker = new VersionChecker(this);
    let emberVersion = checker.forEmber();

    if (emberVersion.lt('1.13.0')) {
      this.import('vendor/install-closure-actions-polyfill.js');
    }
  },

  _ensureThisImport() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        var current = this;
        var app;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        var app = this._findHost();
        app.import(asset, options);
      };
    }
  }
};
