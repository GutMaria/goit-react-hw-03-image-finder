import { Component } from "react";
import Searchbar from './Searchbar/Searchbar'
import { searchPhoto } from '../api/apiServices'
import ImageGallery from './ImageGallery/ImageGallery'
import Loader from './Loader/Loader'


class App extends Component {
  state = {
    search: '',
    gallery: [],
    loading: false,
    error: null,
  }

  addSearch = (search) => {
    this.setState({search})
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({gallery: [], loading: true });
      try {const { data } = await searchPhoto(this.state.search);
            console.log(data);
            this.setState({gallery: data.hits})
      } catch (error) {
        this.setState({ error: error.message })
      }
      finally { this.setState({ loading: false }); }
        
      }
  }


  render() {
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
        {this.state.loading&&<Loader/>}
        <ImageGallery items={this.state.gallery}/>
    </div>
  );
  }
  
};

export default App;