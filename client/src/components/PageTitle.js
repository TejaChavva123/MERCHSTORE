import React from 'react'
import {Helmet} from "react-helmet";
const PageTitle = ({title}) => {
  return (
    <div>
        <Helmet>
        <title>{title}</title>
        </Helmet>
      
    </div>
  )
}

PageTitle.defaultProps = {
    title: "Welcome to MERCHSTORE"
}

export default PageTitle
