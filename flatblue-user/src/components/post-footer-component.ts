import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getCommentsCountByPostID } from "../utils/api";

const componentStyles = css`
  .footer-container {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5em;
  }
  button {
    background-color: var(--mischka);
    width: 40%;
    max-width: 300px;
    border: 0.2em solid var(--border-color);
    border-radius: 10px;
    margin-right: 0.3em;
    margin-left: 0.3em;
    margin-bottom: 0.3em;
    padding: 0.3em;
    font-size: 0.9em;
  }
`;

@customElement("post-footer")
export class PostFooter extends LitElement {
  static styles = componentStyles;
  @property({ type: Number })
  post_id = 0;

  commentsIsShown = false;
  private data: number | "loading" = "loading";
  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  private async _fetchData() {
    const result = await getCommentsCountByPostID(this.post_id);
    if (result == "error")
      throw new Error("Error with getting post comment count");
    this.data = result;
    this.requestUpdate();
  }
  protected render() {
    return html`<div class="footer-container">
      <button @click=${this._showComments}>${this.data} Comments</button>
      <button @click=${this._leaveCommentClickHandler}>Leave Comment</button>
    </div>`;
  }

  private _leaveCommentClickHandler() {
    this.dispatchEvent(
      new CustomEvent("openCommentEditor", {
        composed: true,
        bubbles: true,
        detail: { post_id: this.post_id },
      })
    );
  }

  private _showComments() {
    console.log(this.data, typeof this.data, "here");
    if (this.data === 0) return;
    if (this.commentsIsShown) return;
    this.dispatchEvent(
      new CustomEvent("showComments", {
        bubbles: true,
        composed: true,
        detail: { post_id: this.post_id },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "post-footer": PostFooter;
  }
}
