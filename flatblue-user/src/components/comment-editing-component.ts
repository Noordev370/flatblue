import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { addComment } from "../utils/api";

const componentStyles = css`
  :host {
    display: block;
    background-color: var(--ship-cove);
    border: 0.3em solid var(--border-color);
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 300px;
    transform: translate(-50%, -50%);
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input[type="text"] {
    background-color: var(--ship-cove);
  }

  button {
    background-color: var(--mischka);
    min-height: 40px;
    min-width: 80px;
    border: 0.3em solid white;
    margin-right: 1em;
    margin-left: 1em;
  }

  #owner_name {
    min-height: 30px;
  }
  textarea {
    background-color: var(--ship-cove);
    box-sizing: border-box;
    padding: 0.3em;
    resize: none;
    border: none;
    overflow-y: scroll;
    min-height: 6em;
    font-size: 1em;
    font-family: var(--san-serf-font);
  }
`;

@customElement("comment-editor")
export class CommentEditor extends LitElement {
  @property({ type: Number })
  post_id = 0;

  async submitHandler(event: Event) {
    event.preventDefault();
    const form = event.target!;
    const data = new FormData(form as HTMLFormElement);
    console.log(data);
    const result = await addComment(
      this.post_id,
      data.get("owner_name") as string,
      data.get("content") as string
    );
    if (result === "ok") {
      console.log("ok");
      this.dispatchEvent(
        new CustomEvent("closeCommentEditor", { bubbles: true, composed: true })
      );
    } else {
      console.log("error");
    }
  }

  closeHandler() {
    this.dispatchEvent(
      new CustomEvent("closeCommentEditor", { bubbles: true, composed: true })
    );
  }
  render() {
    return html`<div class="container">
      <form @submit=${this.submitHandler}>
        <input
          id="owner_name"
          type="text"
          name="owner_name"
          value="Anonymous"
        />
        <textarea
          name="content"
          placeholder="comment ..."
          dir="auto"
        ></textarea>
        <div>
          <button type="submit" id="submit">submit</button>
          <button id="close" @click=${this.closeHandler}>cancel</button>
        </div>
      </form>
    </div>`;
  }

  static styles = componentStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    "comment-editor": CommentEditor;
  }
}
