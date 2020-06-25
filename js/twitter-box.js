export default class extends HTMLElement {
  constructor() {
    super()
    const url = `https://mozpe-api.vercel.app/api/twitter-user?name=${this.twitter}`;
    fetch(url)
      .then(res => res.json())
      .then(({ profile_image_url_https }) => {
        const twitter = this.twitter;
        const image = profile_image_url_https.replace('_normal', '');
        const box = document.createElement('div');
        box.innerHTML = `
          <small>
            <a href='https://twitter.com/${twitter}'>
              <img src='${image}' />
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
     });
  }

  get twitter() {
    return this.getAttribute('twitter') || '';
  }
}
