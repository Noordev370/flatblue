import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

const componentStyels = css`
  :host {
    border: 0.3rem solid white;
    border-radius: 15px;
    padding-left: 1rem;
    padding-top: 0.5rem;
    background-color: var(--ship-cove);
    color: black;
  }
  .header {
    font-weight: bold;
    margin-bottom: 0.5rem;
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
