import Component from '@ember/component';

export default Component.extend({
  buttonText: '',
  classNames: ['simple-component'],

  click(text) {
    this.setText(text || 'FOOBAR');
  }
});
