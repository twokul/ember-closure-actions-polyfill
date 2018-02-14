import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('yield-action-component', 'Integration | Component | yield-action-component', {
  integration: true
});

test('yielding actions work', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#yield-action-component as |c|}}
      <button class="yield-action-button" click={{action c.changeText 'hello'}}></button>
    {{/yield-action-component}}
  `);

  this.$('.yield-action-button').click();

  assert.equal(this.$('.yield-action-button').text().trim(), 'hello');
});
