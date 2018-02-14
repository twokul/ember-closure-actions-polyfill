import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('another-component', 'Integration | Component | another-component', {
  integration: true
});

test('regular actions work', function(assert) {
  assert.expect(1);

  this.render(hbs`{{another-component}}`);

  this.$('.regular-action-button').click();
  assert.equal(this.$('.regular-action-button').text().trim(), 'regular text');
});

test('alternative target actions work', function(assert) {
  assert.expect(1);

  this.set('target', {
    resetText() {
      assert.ok(true);
    }
  });

  this.render(hbs`{{another-component alternativeTarget=target}}`);

  this.$('.alternative-target-action-button').click();
});

test('named actions work', function(assert) {
  assert.expect(1);

  this.set('actionName', 'alternativeResetText');

  this.render(hbs`{{another-component actionName=actionName}}`);

  this.$('.named-action-button').click();
  assert.equal(this.$('.named-action-button').text().trim(), 'alternative regular text');
});

test('nested actions work', function(assert) {
  assert.expect(1);

  this.render(hbs`{{another-component}}`);

  this.$('.nested-action-button').click();
  assert.equal(this.$('.nested-action-button').text().trim(), 'regular text');
});
