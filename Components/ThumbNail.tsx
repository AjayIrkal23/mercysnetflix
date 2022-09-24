import Image from 'next/image'
import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { modalState, movieState } from './../Atoms/modalitem'

import { Movie } from '../typesc'

interface Props {
  //   movie: Movie | DocumentData
  movie: Movie
}

const ThumbNail = ({ movie }: Props) => {
  const [showModal, setshowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  return (
    <div
      className="relative h-28 min-w-[200px] md:h-40 md:min-w-[250px] cursor-pointer transition duration-200 ease-out hover:scale-105 "
      onClick={() => {
        setCurrentMovie(movie)
        setshowModal(true)
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        alt="movieimg"
        layout="fill"
        className="object-cover rounded-sm md:rounded"
      />
    </div>
  )
}

export default ThumbNail
