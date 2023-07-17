import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getCommentsCountByPostID } from "../api";

const componentStyles = css`
  .footer-container {
    display: flex;
    justify-content: space-around;
    color: inherit;
    margin-top: 1rem;
  }
  button {
    width: 40%;
    max-width: 300px;
    max-height: 50px;
    border: 0.3rem solid white;
    border-radius: 10px;
    margin-bottom: 0.3rem;
    padding: 0.5rem;
    background-color: var(--mischka);
    font-size: 1em;
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
