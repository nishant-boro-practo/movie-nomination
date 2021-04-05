import React, { Component } from "react";
import { connect } from "react-redux";
import setNominatedMovies from "../actions/setNominatedMovies";
import removeNominatedMovie from "../actions/removeNominatedMovie";
import "../styles/style.css";

let timerId = "";
let alertTimer = "";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      noMovies: false,
      movieNominated: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  debounceFunction(func, delay, e) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, [e]), delay);
  }

  handleInputChange(e) {
    if (e.target.value !== "") {
      this.debounceFunction(this.searchMovies, 200, e);
    }
  }

  searchMovies(e) {
    const url = `/search-movie/?title=${e.target.value}`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          this.setState({ noMovies: true, searchResults: [] });
        } else {
          this.setState({ searchResults: data.Search, noMovies: false });
        }
      });
  }

  nominateMovie(idx) {
    this.setState({ movieNominated: true });
    this.props.setNominatedMovies(this.state.searchResults[idx]);
    clearTimeout(alertTimer);
    alertTimer = setTimeout(
      () => this.setState({ movieNominated: false }),
      2000
    );
  }

  deNominateMovie(idx) {
    this.props.removeNominatedMovie(this.state.searchResults[idx].imdbID);
  }

  render() {
    const checkIfMovieNominated = (imdbId) => {
      for (let item of this.props.nominatedMovies) {
        if (item.imdbID === imdbId) {
          return true;
        }
      }

      return false;
    };

    return (
      <div className="main">
        <h2>Search:</h2>
        <input
          onChange={this.handleInputChange}
          type="text"
          placeholder="Search for a movie"
        />

        <div
          class={
            this.state.movieNominated === true
              ? "success-message"
              : "alert-hidden"
          }
        >
          Your movie has been successfully nominated!
        </div>

        {this.state.searchResults && this.state.searchResults.length !== 0 ? (
          <h2>Results:</h2>
        ) : (
          ""
        )}

        {this.state.noMovies ? (
          <h4 className="error-message">No movies found!</h4>
        ) : (
          ""
        )}

        <div>
          {this.state.searchResults &&
            this.state.searchResults.map((data, idx) => {
              return (
                <div key={idx} className="card">
                  <div>
                    <img src={data.Poster} width="250px" height="300px"></img>
                  </div>
                  <div className="card-details">
                    <div>
                      <h3>{data.Title}</h3>
                    </div>
                    <div>
                      <h3>{data.Year}</h3>
                    </div>

                    {checkIfMovieNominated(data.imdbID) ? (
                      <button
                        onClick={this.deNominateMovie.bind(this, idx)}
                        type="submit"
                      >
                        Remove Movie from Nominations
                      </button>
                    ) : (
                      <button
                        onClick={this.nominateMovie.bind(this, idx)}
                        type="submit"
                      >
                        Nominate Movie
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nominatedMovies: state.nominatedMovies,
  };
};

const mapDispatchToProps = {
  setNominatedMovies: setNominatedMovies,
  removeNominatedMovie: removeNominatedMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
