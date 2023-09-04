import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { getCommentsByPostID } from "../utils/api";

const componentStyles = css`
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }
  span {
    font-size: larger;
  }
`;

type CommentsData = { owner_name: string; content: string }[];
@customElement("comments-viewer")
export class CommenstViewer extends LitElement {
  static styles = componentStyles;
  post_id = 0;

  private data: "loading" | CommentsData = "loading";
  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  private async _fetchData() {
    const result = await getCommentsByPostID(this.post_id);
    if (result == "error") throw new Error("Error with getting post comments");
    this.data = result;
    this.requestUpdate();
  }
  protected render() {
    if (this.data == "loading") return html`<div>loading</div>`;
    return html` <span>Comments: </span>
      <div class="container">
        ${this.data.map((obj) => {
          return html`<comment-element
            .userName=${obj.owner_name}
            .comment=${obj.content}
          ></comment-element>`;
        })}
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "comments-viewer": CommenstViewer;
  }
}
