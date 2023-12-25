import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LINK from '../assests/config';
export const Book = () => {

    const baseUrl = LINK + 'api/books'
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectCategory, setSelectCategory] = useState("")
    


    useEffect(() => {

        const fetchData = async () => {
            try {

                let url = baseUrl
                if (selectCategory) {
                    url += `?category=${selectCategory}`

                }

                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const jsonData = await response.json()
                setData(jsonData)
                setIsLoading(false)

            } catch (error) {
                console.log(error)
                setError("Error fetching data,please try again later")
                setIsLoading(false)
            }
        }
        fetchData()
    }, [selectCategory])


    return (<>
        <Link to="/createbook">+ Add New Book</Link>
        <h2>Fetch Example</h2>


        <div className='filters'>
            <label>Categories</label>
            <select onChange={(e) => setSelectCategory(e.target.value)}>
                <option value="">All</option>
                <option value="romance">Romance</option>
                <option value="science">Science</option>
                <option value="crime">Crime</option>
                <option value="food">Food</option>
                <option value="adventure">Adventure</option>
                <option value="thriller">Thriller</option>
                <option value="fiction">Fiction</option>
                <option value="other">other</option>
            </select>
        </div>

        {isLoading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <ul className="books">
                {data.map((item) => (
                    <li key={item._id}>
                        <Link to={`/books/${item.slug}`}>
                            <img
                                src={LINK + `uploads/${item.thumbnail}`}
                                alt={item.title}
                            />
                            <h3>{item.title}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        )}


    </>
    )
}
