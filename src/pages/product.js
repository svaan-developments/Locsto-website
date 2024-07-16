import React from 'react'
import logo from '../assets/logo.svg'
import downArrow from '../assets/downArrow.svg'
import rightArrow from '../assets/rightArrow.svg'
import search from '../assets/search.svg';
import filter from '../assets/filter.svg';

const product = () => {
  return (
    <>
    <div>
        <header className="h-[94px] xl:px-24 pt-4 bg-primary heightMobile">
          <div className="xl:flex xl:justify-between items-center">
            <div className="flex xl:gap-16 items-center logoLocation">
              <img src={logo} />
              <div className='flex items-baseline gap-2'>
                <div className='text-white text-base font-medium'>Location</div>
                <img src={downArrow}></img>
                </div>
            </div>
            <div className="search-container-product">
            <input
              type="text"
              className="search-input"
              placeholder="Search here"
            />
            <img src={search} />
          </div>
            <div>
              <button className="flex justify-center items-center w-[134px] h-[54px] bg-white gap-2 rounded-[100px] loginMobile">
                <a className="text-base font-semibold uppercase">Login</a>
                <img src={rightArrow} />
              </button>
            </div>
          </div>
        </header>
        </div>
    </>
  )
}

export default product