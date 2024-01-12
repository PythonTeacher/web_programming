import React from 'react';

function Movie({ movie }) {
  return (
    <div>
      <b>{movie.title}</b> ({movie.director}, {movie.year})
    </div>
  );
}

function MovieList() {
  const movies = [
    { id: 1, title: '스타워즈', director: '조지 루카스', year: 1977 },
    { id: 2, title: '아바타', director: '제임스 카메론', year: 2009 },
    { id: 3, title: '인터스텔라', director: '크리스토퍼 놀란', year: 2014 },
  ];

  return (
    <>
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </>
  );
}

export default MovieList;
