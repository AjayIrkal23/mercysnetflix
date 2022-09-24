import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React from 'react'
import { Movie } from '../typesc'
import ThumbNail from './ThumbNail'
import { useRef, useState } from 'react'

interface Props {
  title: string
  movies: Movie[]
}
export const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const HandleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2 md:mb-20">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="relative group md:-ml-2">
        <ChevronLeftIcon
          onClick={() => HandleClick('left')}
          className={`absolute top-0 bottom-0 z-40 m-auto opacity-0 cursor-pointer left-2 h-9 w-9 hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide"
        >
          {movies.map((item, index) => (
            <ThumbNail key={index} movie={item} />
          ))}
        </div>
        <ChevronRightIcon
          onClick={() => HandleClick('Right')}
          className="absolute top-0 bottom-0 z-40 m-auto opacity-0 cursor-pointer right-2 h-9 w-9 hover:scale-125 group-hover:opacity-100 "
        />
      </div>
    </div>
  )
}
