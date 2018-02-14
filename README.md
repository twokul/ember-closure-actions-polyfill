ember-closure-actions-polyfill
==============================================================================

It's pretty hacky. Use at your own risk.

Provides a polyfill for the [Closure
Actions](https://emberjs.com/blog/2015/06/12/ember-1-13-0-released.html#toc_closure-actions)
feature added in Ember 1.13.

Installation
------------------------------------------------------------------------------

```
ember install ember-closure-actions-polyfill
```


Usage
------------------------------------------------------------------------------

```javascript
// app/controllers/index.js

import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    setName(name) {
      model.set('name', name);
    }
  }
});
```

```hbs
{{!-- app/templates/index.hbs --}}
{{my-component submit=(action 'setName')}}
```

```javascript
import Component from '@ember/component';

export default Component.extend({
  click() {
    this.submit(this.get('name'));
  }
});
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-closure-actions-polyfill`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
