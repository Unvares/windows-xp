export default class DesktopIcon extends HTMLElement {
  shadowRoot = this.attachShadow({ mode: 'open' });

  name;

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = this.getStyles();

    const iconSrc = this.getAttribute('icon-src') || './assets/images/folder-empty.png';
    const name = this.getAttribute('name') || 'New Folder';
    this.name = name;

    const cell = document.createElement('div');
    cell.classList.add('desktop-icon');

    cell.innerHTML = `
      <img src="${iconSrc}">
      <span class="desktop-icon__name">
        ${name}
      </span>
    `;

    this.shadowRoot.appendChild(cell);
  }

  addEventListeners() {
    this.addEventListener('dblclick', this.handleDoubleClick.bind(this));
  }

  handleDoubleClick() {
    const event = new CustomEvent('iconDoubleClick', {
      detail: { windowTitle: this.name },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  getStyles() {
    return `
      <style>
        .desktop-icon {
          width: 85px;
          height: 75px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
        }

        .desktop-icon img {
          justify-self: flex-start;
          width: 36px;
          height: 36px;
          margin-bottom: 5px;
        }

        .selected .desktop-icon__name {
          background-color: #316AC5;
        }

        .desktop-icon__name {
          color: white;
          text-align: center;
          display: block;
          font-size: 12px;
          line-height: 16px;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
        }
      </style>
    `;
  }
}

customElements.define('desktop-icon', DesktopIcon);
