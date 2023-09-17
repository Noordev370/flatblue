import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";

const componentStyles = css`
  :host {
    border: 0.2em solid var(--text-color, white);
    color: currentColor;
    display: block;
    position: relative;
    padding: 0.3em;
    font-family: var(--sans-font);
  }

  .viewer {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  .viewer-header > div {
    padding: 0.1em;
    border-bottom: 0.2em solid var(--border-color);
    font-weight: bold;
  }

  #identity {
    float: left;
  }

  #time {
    float: right;
  }

  .viewer-body {
    padding: 0.5em 0.1em 0.1em 0.1em;
    font-size: 1.2em;
  }

  .footer > button {
    margin: 1em;
    margin-bottom: 0.2em;
    padding: 0.3em;
    font-size: 1em;
    min-width: 80px;
  }
`;

type Data = {
  id: number;
  level: string;
  gender: string;
  date: string;
  content: string;
};

@customElement("post-element")
export class PostElement extends LitElement {
  static styles = componentStyles;
  postID = 0;
  data: Data | undefined = undefined;
  @state()
  accepted: boolean = false;

  clickHandler() {
    if (this.accepted) {
      this.setAttribute("data-state", "rejected");
    } else {
      this.setAttribute("data-state", "accepted");
    }
    this.accepted = !this.accepted;
  }
  render() {
    return html`
    <div class="container">
      <div class="viewer">
        <div class="viewer-header">
          <div id="identity">
            ${this.data?.gender} : ${this.data?.level}
          </div>
          <div id="time">${this.data?.date}</div>
        </div>
        <div class="viewer-body">${this.data?.content}</div>
      </div>
      </div>
      <div class="footer">
        <button @click=${this.clickHandler}>${
      this.accepted ? html`reject` : html`accept`
    }</button>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "post-element": PostElement;
  }
}
