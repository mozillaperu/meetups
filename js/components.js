import twitterBox from './twitter-box.js';

customElements.define('twitter-box', twitterBox);

customElements.define('event-box',
  class extends HTMLElement {
    constructor() {
      super();
      const template = document
        .getElementById('event-box-template')
        .content;
      const shadow = this.attachShadow({mode: 'open'});
      shadow.appendChild(template.cloneNode(true));

      const style = document.createElement('style');
      style.textContent = `
        .event-rsvp {
          text-decoration: none;
          text-transform: uppercase;
          background: black;
          color: white;
          padding: 1rem;
          border-radius: 40px;
          font-family: Open Sans Semibold;
          margin: 10px;
          display: inline-block;
        }
      `;

      shadow.appendChild(style);
    }
  }
);
