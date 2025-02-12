export default class DesktopTaskbar extends HTMLElement {
  shadowRoot = this.attachShadow({ mode: 'open' });

  constructor() {
    super();
    this.render();
    this.addEventListeners();
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  render() {
    this.shadowRoot.innerHTML = this.getStyles() + this.getTemplate();
  }

  addEventListeners() {}

  updateTime() {
    const timeElement = this.shadowRoot.querySelector('.time');
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit' };
    const timeString = now.toLocaleTimeString([], options);
    timeElement.textContent = timeString;
  }

  getStyles() {
    return `
    <style>
      * {
        box-sizing: border-box;
        user-select: none;
      }

      .taskbar {
        flex-shrink: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: stretch;
        color: white;
        background: linear-gradient(to bottom, #245EDC 0%, #3f8cf3 9%, #245EDC 18%, #245EDC 92%, #1941A5 100%) center/cover no-repeat;
        width: 100%;
        height: 32px;
      }

      .start-button {
        font-size: 20px;
        line-height: 22px;
        font-weight: bold;
        font-style: italic;
        background: radial-gradient(circle, #5eac56 0%, #3c873c 100%) center/cover no-repeat;
        box-shadow: -13px 0 10px -10px #30522d inset, 0 11px 4px -8px #94d88d inset;
        padding: 2px 25px 6px 10px;
        text-shadow: 1px 1px 3px #222;
        border-radius: 0px 8px 8px 0px;
        margin-right: 16px;
        cursor: pointer;
        flex-shrink: 0;
      }

      .start-button img {
        height: 20px;
        filter: drop-shadow(1px 1px 1px #222);
        transform: translateY(4px);
      }

      .opened-tabs {
        display: flex;
        gap: 0px;
        flex-flow: row nowrap;
        flex: 1 1;
        overflow: hidden;
      }

      .open-tab {
        width: 182px;
        height: 26px;
        margin: 3px 0;
        background-color: #1e94f0;
        border: 1px solid #0067ba;
        border-radius: 4px;
        font-size: 12px;
        line-height: 12px;
        padding: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: break-word;
        cursor: pointer;
        box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.05);
        background-image: linear-gradient(
          160deg,
          rgba(255, 255, 255, 0.4) 0%,
          rgba(148, 187, 233, 0) 12%
        );
      }

      .open-tab:active {
        background-color: #0063b6;
        border-color: #004d9a;
        background-image: none;
        box-shadow: inset 2px 2px 0px 0px rgba(0, 0, 0, 0.2);
      }

      .time {
        height: 100%;
        font-size: 12px;
        line-height: 12px;
        background:
          linear-gradient(to right, #1290E9 0%, #19B9F3 2%, #1290E9 3%, transparent 3%, transparent 100%) left/cover no-repeat,
          linear-gradient(to bottom, #1290E9 0%, #19B9F3 9%, #1290E9 18%, #1290E9 92%, #1941A5 100%) center/cover no-repeat;
        box-shadow: 8px 0px 4px -5px #19B9F3 inset;
        padding: 9px 15px 9px 25px;
        border-left: 1px solid #092E51;
        text-shadow: 1px 1px 2px #222;
        cursor: pointer;
        text-transform: uppercase;
        flex-shrink: 0;
      }
    </style>
      `;
  }

  getTemplate() {
    return `
      <div class="taskbar">
        <div class="start-button">
          <img src="./assets/icons/logo.svg">
          <span>start</span>
        </div>

        <div class="opened-tabs">
          <div class="open-tab">
            Documents
          </div>
          <div class="open-tab">
            My Computer
          </div>
          <div class="open-tab">
            My Network
          </div>
          <div class="open-tab readme active">
            ReadME.txt
          </div>
        </div>

        <div class="time" />
      </div>
      `;
  }
}

customElements.define('desktop-taskbar', DesktopTaskbar);
