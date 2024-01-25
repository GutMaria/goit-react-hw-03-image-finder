import { Component } from "react";
import { createPortal } from "react-dom";
import css from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.close();
    }
  }

  closeModal = (e) => {
    if (e.target === e.currentTarget) {
      this.props.close();
    }
  }

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;