export default class extends HTMLElement {
  constructor() {
    super()
    const twitter = this.twitter;
    const box = document.createElement('div');
    box.innerHTML = `
      <small>
        <a href='https://twitter.com/${twitter}'>
          <img src='https://twitter.com/${twitter}/profile_image?size=original' />
          <span><i class='fab fa-twitter'></i><span>
          @${twitter}
        </a>
      </small>
      <style>
        img {
          width: 200px;
          border-radius: 50%;
          background: grey;
        }

        a {
          text-decoration: none;
          display: block;
          color: #000;
          padding: 15px;
          font-weight: 700;
        }
      </style>
    `;
   const shadow = this.attachShadow({ mode: 'open' });
   shadow.appendChild(box);
  }

  get twitter() {
    return this.getAttribute('twitter') || '';
  }
}
