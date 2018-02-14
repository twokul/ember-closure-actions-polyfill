import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-component', 'Integration | Component | simple-component', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{simple-component}}`);

  assert.equal(this.$().text().trim(), '');
});

test('actions with args work', function(assert) {
  assert.expect(2);

  this.actions.resetText = function(text) {
    assert.ok(true);
    assert.equal(text, 'hello');
  };

  this.render(hbs`{{simple-component setText=(action 'resetText' 'hello')}}`);

  this.$('.simple-component').click();
});
