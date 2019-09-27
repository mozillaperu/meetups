import twitterBox from './twitter-box.js';
import eventBox from './event-box.js';
import socialLink from './social-link.js';

customElements.define('twitter-box', twitterBox);
customElements.define('event-box', eventBox);
customElements.define('social-link', socialLink, { extends: 'p' });
