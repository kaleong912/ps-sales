import dynamic from "next/dynamic";
import moment from "moment";

const CardList = dynamic(() => import('../components/card-list'))

export function Index ({sale}) {
    return(
        <div  className="w-full flex flex-col">
            <div className="relative w-full h-80">
                <img src={sale.ImgURL} className="object-cover h-80 w-full"/>
                <DayLeft date={sale.SaleEnd} />

            </div>

            <div className="relative overflow-hidden mt-12">
                <div className="max-w-7xl mx-auto text-center lg:text-5xl sm:text-3xl p-4">
                    <DealTitle sale={sale} />
                </div>

            </div>

            <CardList id={sale.ID} />


            
        </div>
    )
}

export function DayLeft({date}) {
    var given = moment(date, "YYYY-MM-DD HH:mm:ss")
    var current = moment()

    var diff = moment(given).unix() - moment(current).unix();
    var duration = moment.duration(diff, 'seconds')
    return(
        <div className="absolute left-0 right-0 bottom-16 w-full grid grid-cols-1 justify-items-center">
            <div className="relative max-w-xs flex flex-row justify-center space-x-4 content-center bg-gray-800/50  rounded-t-lg px-8 pt-8">
                <div className="w-16 h-16 bg-white rounded border border-white text-2xl flex justify-center items-center">{duration.days()}</div>
                <div className="w-16 h-16 bg-white rounded border border-white text-2xl flex justify-center items-center">{duration.hours()}</div>
                <div className="w-16 h-16 bg-white rounded border border-white text-2xl flex justify-center items-center">{duration.minutes()}</div>
            </div>
            <div className="relative max-w-xs flex flex-row justify-center space-x-4 content-center bg-gray-800/50 text-white rounded-b-lg px-8">
                <div className="w-16 h-16 text-lg flex justify-center items-center">Days</div>
                <div className="w-16 h-16 text-lg flex justify-center items-center">Hours</div>
                <div className="w-16 h-16 text-lg flex justify-center items-center">Mins</div>
            </div>
        </div>
    )
}

export function DealTitle({sale}) {
    return sale.SaleName +" : "+ sale.NumGames + " results"
}

Index.getInitialProps = async (ctx) => {

    const res = await fetch( host + '/api/deal' + sale.lD )
    const json = await res.json()
    return {
        props: {
            games : json.data
        }
    }
}

export default Index