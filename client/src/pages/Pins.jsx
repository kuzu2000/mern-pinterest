import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchPins } from './../features/pinSlice'
import Pin from './Pin'
import AddButton from './AddButton'
import {
  useSearchParams,
} from 'react-router-dom';

const Pins = () => {
  const pins = useSelector(state => state.pins.pins)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const search = searchParams.get('searchQuery') || '';

  // window.onscroll = function () {
  //   if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
  //     setLimit(limit + 10)
  //   }
  // }

  useEffect(() => {
    dispatch(fetchPins(search))
  }, [dispatch, search])

    return (
        <>
        <div className="container">
          {pins?.map((post, i) => {
              return <Pin key={i} post={post}/>
            })}
      </div>
      <AddButton/>
      </>
    )
}

export default Pins
