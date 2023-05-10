import Head from 'next/head'
import { Montserrat } from 'next/font/google'

import './globals.css'
import { FooterNav } from '@/components/FooterNav'

const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'] })

export const metadata = {
    title: 'Гуру словарных слов',
    description: 'Стань гуру словарных слов',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="dark">
            <Head>
                <title>{metadata.title}</title>
                <meta property="og:title" content={metadata.title} />
            </Head>
            <body className={montserrat.className}>
                {children}
                <FooterNav />
            </body>
        </html>
    )
}
