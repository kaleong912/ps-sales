import Link from "next/link"

export function Index({game}) {
    return (
        <div className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img
                src={game.Img}
                alt={game.Name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                    <a href={ '/game/' + game.PPID }>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {game.Name}
                    </a>
                    </h3>
                    <div className="mt-1 text-sm text-white">
                        <span className="bg-black border rounded p-1"><Discount game={game} /></span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900 line-through">{game.formattedBasePrice}</p>
                    <p className="text-sm font-bold bg-yellow-300 rounded border border-yellow-300 text-center p-1">{game.formattedPlusPrice}</p>
                </div>
            
            </div>
        </div>
    )
}

export function Discount({game}) {
    return "-" + (100 - parseFloat(game.PlusPrice) * 100/ parseFloat(game.BasePrice)) + "%"
}

export default Index