import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('../components/card'))

export function Layout({id}) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('api/deal/' + id)
            .then((res) => res.json())
            .then((data) => {
            setData(data)
            setLoading(false)
            })
        }, [])

    if (isLoading) return <p className="max-w-2xl mx-auto text-2xl">Loading...</p>
    if (!data) return <p>No game data</p>

    return (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            
            {data.data.game_discounts.map((game) => (
                <Card game={game} />
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