import { Component } from "react";
import { createPortal } from "react-dom";
import css from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

  componentDidMount() {
        document.addEventListener("keydown", this.closeModal);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModal);
    }
  
  closeModal = ({ target, currentTarget, code }) => {
        if(target === currentTarget || code === "Escape") {
            this.props.closeModal()
        }
    }

  render() {
    const { largeImageURL, tags, closeModal } = this.props;
    return createPortal((<div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
    <img src={largeImageURL} alt={tags} />
  </div>
</div>),modalRoot)
  }
}
export default Modal;