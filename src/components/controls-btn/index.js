import videojs from 'video.js';
const Button = videojs.getComponent('Button');
// const VjsComponent = videojs.getComponent('Component');

export class SettingButton extends Button {
  constructor(player, options) {
    super(player, options);
  }

  buildCSSClass() {
    return `${super.buildCSSClass()} vjs-setting-btn`;
  }
}

