import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Goback = ({link="/dashboard"}) => {
  return (
    <div>
      <Link to={link} >
        <IoArrowBackCircleOutline className='text-3xl' />
      </Link>
    </div>
  );
}

export default Goback