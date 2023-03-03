import React from 'react'

export default function SearchImput(props) {
    const {handleSearchValue} = props;
   
    const handleSearchImput = (e) => {
        e.preventDefault();
        handleSearchValue(e.target.value)
    }

  return (
    <div>
        <input type="text" name="search" placeholder="search here" onChange={handleSearchImput}/>
    </div>    
  )
}
