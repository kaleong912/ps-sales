import React, {  useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { HalfMalf } from "react-spinner-animated";
import 'react-spinner-animated/dist/index.css'

import debounce from 'lodash.debounce';

const Card = dynamic(() => import('../components/card'))

export function Layout({id}) {
    const [data, setData] = useState([])
    const [filterText, setFilterText] = useState('')
    const [isLoading, setLoading] = useState(false)

    const clickPoint = useRef();
    const handleFocus = () => {
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };

    let filteredData = data

    if (filterText !== "") {
        filteredData = data.filter((item) => {
            return item.Name.toLowerCase().includes(filterText.toLowerCase());
        });
    }

    const doSearch = evt => {
        let text = evt.target.value
        setFilterText(text)
    }

    const throttleSearch = useMemo( () => debounce(doSearch, 300), [])




    useEffect(() => {
        setLoading(true)
        fetch('api/deal/' + id)
            .then((res) => res.json())
            .then((data) => {
            data.data.game_discounts != null && setData(data.data.game_discounts)
            setLoading(false)
            })
        }, [])

    if (isLoading) return <div className='max-w-2xl mx-auto'><HalfMalf text={"Loading..."} bgColor={"#FFFFFF"} 
    center={false} width={"150px"} height={"150px"}/></div>
    if (data == null) return <div></div>

    return (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            
            <div className="items-center flex justify-end" >
                <div className="relative">
                    <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input
                        type="search"
                        className="block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                        placeholder="Search Here..."
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={throttleSearch}
                    />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            
            {filteredData.sort((a, b) => parseInt(a.PPID) > parseInt(b.PPID) ? -1 : 1).map((game) => (
                <Card key={game.PPID} game={game} />
            ))}
            </div>
        </div>
    )
}

export async function getStaticProps() {

    return {
        props: {
            sale: '',
        }
    }
}

export default Layout