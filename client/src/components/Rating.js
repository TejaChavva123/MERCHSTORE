import React from 'react'

const Rating = ({value,num}) => {
  return (
    <div className='rating my-2'>
        <span>
            <i style={{color:"#FFD700"}} className={value>=1 ? 'fas fa-star' : value>=0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        <span>
            <i style={{color:"#FFD700"}} className={value>=2 ? 'fas fa-star' : value>=1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        <span>
            <i style={{color:"#FFD700"}} className={value>=3 ? 'fas fa-star' : value>=2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        <span>
            <i style={{color:"#FFD700"}} className={value>=4 ? 'fas fa-star' : value>=3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        <span>
            <i style={{color:"#FFD700"}} className={value>=5 ? 'fas fa-star' : value>=4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        {/* <span className="mx-2">{num && num}</span> */}
    </div>
  )
}

export default Rating