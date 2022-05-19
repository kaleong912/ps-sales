import { useRouter } from 'next/router'
import moment from 'moment'; 
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export function Index({game}) {

    const router = useRouter()
    const { id } = router.query

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    console.log(id)
    useEffect(() => {
        if(!router.isReady) return;
        setLoading(true)
        fetch('/api/game/' + id)
            .then((res) => res.json())
            .then((data) => {
            setData(data.data)
            console.log(data)
            setLoading(false)
            })
        }, [router.isReady])

    if (isLoading) return <p className="max-w-2xl mx-auto text-2xl">Loading...</p>
    if (!data) return <p>No data</p>
    return(
        <div className="relative overflow-hidden bg-gray-200">
            <div className="absolute top-0 left-0 w-full h-80">
                <img className="object-cover w-full h-80 bg-white" src={data.CoverArt != '' ? data.CoverArt : '/playstation-studios.jpg'}/>
            </div>

            <div className="relative mt-10 pb-6 mx-auto">
                <div className="container mx-auto px-5 py-24">
                    <div className="relative lg:w-4/5 mx-auto p-6 flex flex-wrap">
                        

                        <div className="relative lg:w-1/2 w-full z-10">
                            <img className="object-cover object-center rounded border border-gray-200" src={data.GameImg != '' ? data.GameImg : data.Img} />

                            <div className="grid grid-col-3 grid-flow-col gap-4 justify-evenly mt-6">
                                { data.Screenshot1 !== '' && <img class=" aspect-square object-cover" src={data.Screenshot1} />}
                                { data.Screenshot2 !== '' && <img class=" aspect-square object-cover" src={data.Screenshot2} />}
                                { data.Screenshot3 !== '' && <img class=" aspect-square object-cover" src={data.Screenshot3} />}
                                { data.Screenshot4 !== '' && <img class=" aspect-square object-cover" src={data.Screenshot4} />}
                            </div>
                        </div>

                        <div className="relative lg:w-1/2 w-full lg:p-10 lg:py-6 mt-6 lg:mt-16 z-10">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{data.Publisher}</h2>
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{data.Developer}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.ProductName}</h1>

                            <a target="_blank" href={data.PSStoreURL}>
                                <button className=" bg-blue-600 text-white font-semibold mt-4 justify-center flex rounded-lg px-4 py-2">Go to Store</button>
                            </a>

                            <div className="py-4">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>

                            <div className="bg-gray-300 border rounded-xl flex flex-row p-3">
                                <div className="grow">
                                    <p className="line-through">{data.formattedBasePrice}</p>
                                    <p className="text-xl text-red-600 font-bold">{data.formattedPlusPrice}</p>
                                </div>
                                <div className="font-semibold text-right">
                                    <p> Last Dicounted At:
                                        
                                    </p>
                                    <p><DayLeft date={data.LastDiscounted} /> Days Ago</p>
                                </div>
                            </div>

                            <h2 className="text-xl title-font text-gray-500 mt-6">Platform</h2>
                            <div className="py-4">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="flex space-x-2">
                                { data.IsPS4 == 1 && <div className="py-1 px-2 bg-blue-600 text-white rounded-xl">PS4</div>}
                                { data.IsPS5 == 1 && <div className="py-1 px-2 bg-blue-600 text-white rounded-xl">PS5</div>}
                            </div>

                            <h2 className="text-xl title-font text-gray-500 mt-6">Genre</h2>
                            <div className="py-4">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="flex space-x-2">
                                { data.GenreRPG == 1 && <div className="text-sm py-1 px-2 bg-white text-purple-600 border border-purple-600 rounded-3xl">RPG</div>}
                                { data.GenreAction == 1 && <div className="text-sm py-1 px-2 bg-whtie text-sky-400 border border-sky-400 rounded-3xl">ACT</div>}
                                { data.GenreAdventure == 1 && <div className="text-sm py-1 px-2 bg-whtie text-sky-600 border border-sky-600 rounded-3xl">ADV</div>}
                                { data.GenreTPS == 1 && <div className="text-sm py-1 px-2 bg-whtie text-indigo-600 border border-indigo-600 rounded-3xl">TPS</div>}
                                { data.GenreFPS == 1 && <div className="text-sm py-1 px-2 bg-whtie text-violet-500 border border-violet-500 rounded-3xl">FPS</div>}
                                { data.GenreMMO == 1 && <div className="text-sm py-1 px-2 bg-whtie text-cyan-700 border border-cyan-700 rounded-3xl">MMO</div>}
                                { data.GenrePlatformer == 1 && <div className="text-sm py-1 px-2 bg-whtie text-fuchsia-900 border border-fuchsia-900 rounded-3xl">PLA</div>}
                                { data.GenreFighting == 1 && <div className="text-sm py-1 px-2 bg-whtie text-cyan-300 border border-cyan-300 rounded-3xl">FTG</div>}
                                { data.GenreSimulation == 1 && <div className="text-sm py-1 px-2 bg-whtie text-teal-300 border border-teal-300 rounded-3xl">SIM</div>}
                                { data.GenreArcade == 1 && <div className="text-sm py-1 px-2 bg-whtie text-violet-400 border border-violet-400 rounded-3xl">ARC</div>}
                                { data.GenreStrategy == 1 && <div className="text-sm py-1 px-2 bg-whtie text-rose-500 border border-rose-500 rounded-3xl">STG</div>}
                                { data.GenreSports == 1 && <div className="text-sm py-1 px-2 bg-whtie text-emerald-700 border border-emerald-700 rounded-3xl">SPT</div>}
                                { data.GenrePuzzle == 1 && <div className="text-sm py-1 px-2 bg-whtie text-lime-600 border border-lime-600 rounded-3xl">PUZ</div>}
                                { data.GenreMusic == 1 && <div className="text-sm py-1 px-2 bg-whtie text-blue-900 border border-blue-900 rounded-3xl">MUS</div>}
                                { data.GenreRacing == 1 && <div className="text-sm py-1 px-2 bg-whtie text-blue-400 border border-blue-400 rounded-3xl">RAC</div>}
                                { data.GenreHorror == 1 && <div className="text-sm py-1 px-2 bg-whtie text-pink-800 border border-pink-800 rounded-3xl">HOR</div>}
                                { data.GenreIntStory == 1 && <div className="text-sm py-1 px-2 bg-whtie text-fuchsia-600 border border-fuchsia-600 rounded-3xl">STY</div>} 
                            </div>

                            <h2 className="text-xl title-font text-gray-500 mt-6">Number of players</h2>
                            <div className="py-4">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-300">
                                <div className="text-center">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">Offline</h2>
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-6">{data.OfflinePlayers}</h1>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">Online</h2>
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-6">{data.OnlinePlayers}</h1>
                                </div>
                            </div>

                            <h2 className="text-xl title-font text-gray-500 mt-6">Description</h2>
                            <div className="py-4">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: data.Desc }}>
                                
                            </div>

                        </div>

                        <div className="absolute inset-0 top-24 border rounded bg-white z-0"></div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export function DayLeft({date}) {
    var given = moment(date, "YYYY-MM-DD HH:mm:ss")
    var current = moment()
    
    return current.diff(given, 'days');
}

export default Index