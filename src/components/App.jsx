import { Component } from "react";
import Searchbar from './Searchbar/Searchbar'
import { searchPhoto } from '../api/apiServices'
import ImageGallery from './ImageGallery/ImageGallery'
import Loader from './Loader/Loader'
import Button from './Button/Button'


class App extends Component {
  state = {
    search: '',
    gallery: [],
    totalHits: 0,
    loading: false,
    error: null,
    page: 1,
  }

  addSearch = (search) => {
    this.setState({search, page: 1, gallery: []})
  }

  loadMore = () => {
    this.setState(({ page, loading }) => ({ page: page + 1, loading: true }));

  }

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (search && (prevState.search !== search || prevState.page !== page)) {
      this.setState({ loading: true });
      try {
        const { data } = await searchPhoto(search, page);
            this.setState(({gallery, totalHits})=>({gallery: data.hits?.length ? [...gallery, ...data.hits] : gallery, totalHits: data.totalHits || totalHits, }))
      } catch (error) {
        this.setState({ error: error.message })
      }
      finally { this.setState({ loading: false }); }
        
      }
  }


  render() {
    const { gallery, loading, page, totalHits } = this.state;
    return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
        <Searchbar onSubmit={this.addSearch}></Searchbar>
        <ImageGallery items={gallery} />
        {loading&&<Loader/>}
        {Boolean(gallery.length) && page < Math.ceil(totalHits / 12) && <Button onClick={this.loadMore } />}
    </div>
  );
  }
  
};

export default App;