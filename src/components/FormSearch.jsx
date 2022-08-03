import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FormSearch = () => {
    const [search, setSearch] = useState("")
	const navigate = useNavigate();


	const handleChangeSearch = (e) => {
		setSearch(e.target.value)
	}

	const handleSearch = () => {
        if (search) {
            navigate(`/search/${search}`)
        }
	}

    const handlePress = e => {
		if(e.key === 'Enter') { 
			handleSearch()
		}
	}

    return (
        <div className='flex justify-center mt-4'>
            <input type="search" value={search} onChange={handleChangeSearch} onKeyPress={handlePress} className='w-full h-10 px-4 py-2 border border-gray-300 rounded-lg' placeholder='Cari apa?'/>
            <button onClick={handleSearch} className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'> Cari</button>
        </div>
    )
}

export default FormSearch