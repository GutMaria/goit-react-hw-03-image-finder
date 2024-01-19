import css from './gallery-item.module.css';

const ImageGalleryItem = ({ url, tags }) => {
  return (<li className={css.galleryItem}>
  <img src={url} alt={tags} />
</li>)
}

export default ImageGalleryItem;