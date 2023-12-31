import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getPostByID } from "../utils/api";
import { showLoading } from "../utils/utilities";

const componentStyles = css`
  .viewer-container {
    display: flex;
    flex-direction: column;
  }

  .viewer-header > div {
    color: var(--mischka);
    padding: 0.2em;
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
    padding: 1em 0.5em 0.3em 0.5em;
  }
`;

type Data = {
  gender: string;
  level: string;
  date: string;
  content: string;
};

@customElement("post-main")
export class PostMain extends LitElement {
  @property({ type: Number })
  post_id = 0;

  private data: Data | undefined = undefined;

  connectedCallback(): void {
    super.connectedCallback();
    this._fetchData();
  }
  private async _fetchData() {
    const result = await getPostByID(this.post_id);
    if (result === "error") throw new Error("Error with fetching post data");
    this.data = result;
    this.requestUpdate(); // Rerender beacause first render complete before
    // this.data property update by the fetchData
  }
  render() {
    return html`<div class="viewer-container">
      <div class="viewer-header">
        <div id="identity">
          ${showLoading(this.data?.gender)} : ${showLoading(this.data?.level)}
        </div>
        <div id="time">${showLoading(this.data?.date)}</div>
      </div>
      <div class="viewer-body" dir="auto">
        ${showLoading(this.data?.content)}
      </div>
    </div>`;
  }

  static styles = componentStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    "post-main": PostMain;
  }
}
