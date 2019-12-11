export default class extends HTMLElement {
  constructor() {
    super();
    const icon = this.getAttribute('icon');
    const link = this.getAttribute('link');
    const name = this.getAttribute('name') || link || '';
    const url = this.getAttribute('url') || link || '#';
    this.innerHTML = `
      <a href='${url}'>
        <i class='fab fa-${icon}'></i>
        <strong>
          ${name}
        </strong>
      </a>
    `;

    const iconElem = this.querySelector('i');
    iconElem.setAttribute('style', `
      font-family: 'Font Awesome 5 Brands' !important;
    `);
  }
}
