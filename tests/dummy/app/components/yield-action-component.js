import Component from '@ember/component';

export default Component.extend({
  buttonText: '',
  classNames: ['yield-action-component'],

  actions: {
    resetText(text) {
      this.$('button').text(text || 'FOOBAR');
    }
  }
});
