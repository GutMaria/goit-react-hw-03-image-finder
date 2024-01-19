import { Component } from "react";
import css from './searchbar.module.css'


class Searchbar extends Component {
  state = {
    search:''
  }

  handleChange = ({ target: {name,value} }) => {
    this.setState({[name]: value})

  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
    this.setState({search:''})
  }

  render() {
    const { search } = this.state;

    return (<header className={css.searchbar}>
  <form className={css.SearchForm} onSubmit={this.handleSubmit}>
    <button type="submit" className={css.SearchFormButton}>
      <span className={css.SearchFormButtonLabel}>Search</span>
    </button>

        <input onChange={this.handleChange}
          value={search}
          name="search"
          className={css.input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>)
  }
}

export default Searchbar;

