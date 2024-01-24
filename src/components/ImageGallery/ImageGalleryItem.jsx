import { Component } from 'react';
import css from './gallery-item.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component{
  state = {
    isModalOpen: false
  }

  showModal = () => {
    this.setState({isModalOpen: true})
   }
  
  closeModal = () => {
     this.setState({ isModalOpen: false });
  }

  render() {
    const { url, tags, largeImageURL } = this.props;
    const { isModalOpen } = this.state;
    const { showModal, closeModal } = this;

    return (<>
      <li className={css.galleryItem} onClick={showModal}>
      <img src={url} alt={tags} />
    </li> 
      {isModalOpen && <Modal largeImageURL={largeImageURL} tags={tags} closeModal={closeModal}/>}
      </>)
  }
}



export default ImageGalleryItem;