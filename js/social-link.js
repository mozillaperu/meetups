export default class extends HTMLParagraphElement {
  constructor() {
    super();
    const link = this.getAttribute('link');
    const icon = this.getAttribute('icon');
    this.innerHTML = `
      <a href='https://${link}'>
        <i class='fab fa-${icon}'></i>
        <strong>${link}</strong>
      </a>
    `;

    const iconElem = this.querySelector('i');
    iconElem.setAttribute('style', `
      font-family: 'Font Awesome 5 Brands' !important;
    `);
  }
}
