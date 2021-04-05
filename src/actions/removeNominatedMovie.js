const removeNominatedMovie = (data) => {
  return {
    type: "REMOVE_NOMINATED_MOVIE",
    data,
  };
};
export default removeNominatedMovie;
