import videojs from 'video.js';

const Button = videojs.getComponent('Button');
// const VjsComponent = videojs.getComponent('Component');

export class SettingButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.toggle = false;
    this.onClick = options.onClick;
    this.getClass();
    this.controlText('Settings');
  }

  
  handleClick() {
    this.toggle = !this.toggle;
    this.onClick();
    this.getClass();
  }
  
  getClass() {
    const el = this.contentEl();
    el?.classList?.add(`vjs-setting-btn-${this.toggle ? 'on' : 'off'}`);
    el?.classList?.remove(`vjs-setting-btn-${!this.toggle ? 'on' : 'off'}`);
  }

  buildCSSClass() {
    return `${super.buildCSSClass()} vjs-setting-btn vjs-setting-btn-${this.toggle ? 'on' : 'off'}`;
  }
}

export class PrevButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText('Previous');
  }

  buildCSSClass() {
    return `${super.buildCSSClass()} vjs-prev-btn`;
  }
}

export class NextButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText('Next');
  }

  buildCSSClass() {
    return `${super.buildCSSClass()} vjs-next-btn`;
  }
}

export class TheaterButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText('Theater mode');
  }

  buildCSSClass() {
    return `${super.buildCSSClass()} vjs-theater-btn`;
  }
}
