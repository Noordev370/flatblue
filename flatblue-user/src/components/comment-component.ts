import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

const componentStyels = css`
  :host {
    background-color: var(--ship-cove);
    color: black;
    border: 0.2em solid var(--border-color);
    border-radius: 15px;
    padding-left: 0.5em;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
  }
  .header {
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .header::first-letter {
    text-transform: uppercase;
  }
`;

@customElement("comment-element")
export class CommentElement extends LitElement {
  static styles = componentStyels;
  userName = "";
  comment = "";

  protected render() {
    return html`<div class="container">
      <div class="header" dir="auto">${this.userName}</div>
      <div class="main" dir="auto">${this.comment}</div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "comment-element": CommentElement;
  }
}
