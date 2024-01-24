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
    loading: false,
    error: null,
    page: 1,
  }

  addSearch = (search) => {
    this.setState({search, page: 1, gallery: []})
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    console.log(this.state.page)
  }

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (search && (prevState.search !== search || prevState.page !== page)) {
      this.setState({ loading: true });
      try {const { data } = await searchPhoto(search, page);
            console.log(data);
            this.setState(({gallery})=>({gallery: data.hits?.length ? [...gallery, ...data.hits] : gallery}))
      } catch (error) {
        this.setState({ error: error.message })
      }
      finally { this.setState({ loading: false }); }
        
      }
  }


  render() {
    const { gallery, loading } = this.state;
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
        {loading&&<Loader/>}
        <ImageGallery items={gallery} />
        {Boolean(gallery.length) && <Button onClick={this.loadMore } />}
    </div>
  );
  }
  
};

export default App;