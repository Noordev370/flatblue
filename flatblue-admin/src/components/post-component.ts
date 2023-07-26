import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";

const componentStyles = css`
  :host {
    border: 0.3rem solid var(--text-color, white);
    color: var(--text-color);
    display: block;
    position: relative;
    margin-top: 1em;
    margin-bottom: 2em;
    padding: 0.3rem;
    font-family: var(--san-serf-font);
  }

  div[class="viewer-header"] > div {
    padding: 0.1em;
    border-bottom: 3px solid white;
    font-weight: bold;
  }

  #identity {
    float: left;
  }

  #time {
    float: right;
  }

  .viewer-body {
    padding: 1em 0.5em 0.2em 0.5em;
    font-size: larger;
  }

  button {
    margin: 1rem;
    margin-bottom: 0.1rem;
    padding: 0.3rem;
    font-size: 1rem;
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
      this.classList.remove("accepted");
    } else {
      this.classList.add("accepted");
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
