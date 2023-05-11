import { Training } from '@/components/Training'
import DEFAULT_WORDS from '@/data'

export default function Home() {
    return (
        <main className="bg-base-100 bg-dotted bg-dotted-size h-main-content p-4 md:p-24 flex flex-col items-center justify-center">
            <Training data={DEFAULT_WORDS} />
        </main>
    )
}
