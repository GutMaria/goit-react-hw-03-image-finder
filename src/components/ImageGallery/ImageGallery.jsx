import css from './gallery.module.css'
import ImageGalleryItem from './ImageGalleryItem'

const ImageGallery = ({ items }) => {
  const elements = items.map(({ id, webformatURL, tags }) => <ImageGalleryItem key={id} url={webformatURL} tags={tags} />)
  return <ul className={css.gallery}>
{elements}
</ul>
}

export default ImageGallery;