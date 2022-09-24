import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../constant'
import { Movie } from '../typesc'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilValue, useRecoilState } from 'recoil'
import { modalState, movieState } from './../Atoms/modalitem'

interface Props {
  netflixOriginals: Movie[]
}

export const Banner = ({ netflixOriginals }: Props) => {
  const [showModal, setshowModal] = useRecoilState(modalState)
  const [Movie, setMovie] = useState<Movie | null>(null)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  useEffect(() => {
    setMovie(
      netflixOriginals[
        Math.floor(Math.random() * (netflixOriginals?.length - 1))
      ]
    )
  }, [netflixOriginals])
  return (
    <div className="flex flex-col space-y-2 md:justify-end py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12   ">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-50">
        <Image
          src={`${baseUrl}${Movie?.backdrop_path || Movie?.poster_path}`}
          alt="BannerImage"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl transition-all duration-300  font-bold">
        {Movie?.title || Movie?.name || Movie?.original_name}
      </h1>
      <p className="text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-1xl transition-all duration-300  font-bold ">
        {Movie?.overview}
      </p>
      <div className="flex space-x-3 ">
        <button className="bannerBtn bg-white text-black">
          {' '}
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7 " />
          Play
        </button>
        <button
          className="bannerBtn bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(Movie)
            setshowModal(true)
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 ,md:w-8" />
        </button>
      </div>
    </div>
  )
}
