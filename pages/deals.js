import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { host } from "../config"
import styles from '../styles/Home.module.css'

const Deal = dynamic(() => import('../components/deal'))

function Layout({sales}){
    return (
        <div >
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="w-full flex flex-col block">
                
                {sales.map((sale) => (
                    <Deal key="sale.ID" sale={sale} />
                ))}

                
            </main>
            <footer className={styles.footer}>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                Powered by{' '}
                <span className={styles.logo}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
                </a>
            </footer>
        </div>
    )
}

export function DealTitle({sale}) {
    return sale.SaleName +" : "+ sale.NumGames + " results"
}

export async function getStaticProps() {

    const res = await fetch( host + '/api/deals' )
    const json = await res.json()

    return {
        props: {
            sales : json.data.sales
        }
    }
}

export default Layout