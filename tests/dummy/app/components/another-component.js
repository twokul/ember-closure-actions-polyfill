import Component from '@ember/component';

export default Component.extend({
  buttonText: '',
  classNames: ['another-component'],

  actions: {
    resetText() {
      this.set('buttonText', 'regular text');
    },

    valueResetText() {
      this.set('buttonText', 'value text');
    },

    alternativeResetText() {
      this.set('buttonText', 'alternative regular text');
    }
  }
});
