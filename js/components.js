customElements.define('event-box',
  class extends HTMLElement {
    constructor() {
      super();
      const template = document
        .getElementById('event-box-template')
        .content;
      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(template.cloneNode(true));
  }
});
