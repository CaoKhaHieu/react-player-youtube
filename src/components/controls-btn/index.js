import videojs from 'video.js';

const Button = videojs.getComponent('Button');
const VjsComponent = videojs.getComponent('Component');

export class VjsPlaceholder extends VjsComponent {
  constructor(player, options) {
    super(player, options);
    this.addClass('video-js-placeholder');
  }
}

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
    return `${super.buildCSSClass()} vjs-setting-btn vjs-setting-btn-${
      this.toggle ? 'on' : 'off'
    }`;
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

export class MiniPlayerModeButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText('Picture-in-Picture');
  }

  buildCSSClass() {
    return `vjs-mini-btn ${super.buildCSSClass()}`;
  }
}

export class ExpandButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText('Expand');
  }

  buildCSSClass() {
    return `vjs-expand-btn ${super.buildCSSClass()}`;
  }
}

export class CloseButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText('Close');
  }

  buildCSSClass() {
    return `vjs-close-btn ${super.buildCSSClass()}`;
  }
}
