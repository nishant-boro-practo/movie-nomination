import React, { Component } from "react";
import { connect } from "react-redux";
import setNominatedMovies from "../actions/setNominatedMovies";
import removeNominatedMovie from "../actions/removeNominatedMovie";
import "../styles/style.css";

class MyNominations extends Component {
  deNominateMovie(imdbId) {
    this.props.removeNominatedMovie(imdbId);
  }

  render() {
    return (
      <div className="main">
        <div>
          <h2>My nominated movies</h2>
          {this.props.nominatedMovies &&
          this.props.nominatedMovies.length === 0 ? (
            <h4 className="error-message">No movies nominated!</h4>
          ) : (
            ""
          )}
          {this.props.nominatedMovies &&
            this.props.nominatedMovies.map((data, idx) => {
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
                    <button
                      onClick={this.deNominateMovie.bind(this, data.imdbID)}
                      type="submit"
                    >
                      Remove Movie from Nominations
                    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyNominations);
