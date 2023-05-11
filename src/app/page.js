import { Training } from '@/components/Training'
import DEFAULT_WORDS from '@/data'

export default function Home() {
    return (
        <main className="h-screen w-screen pb-16 lg:pb-20 flex flex-col items-center justify-center">
            <Training data={DEFAULT_WORDS} />
            {/*<div className="hero-content p-8 flex-col gap-8 lg:flex-row">*/}
            {/*    <div>*/}
            {/*        <h1 className="text-3xl lg:text-4xl xl:text-6xl font-extrabold text-base-900 leading-tight">*/}
            {/*            Стань гуру*/}
            {/*            <span className="pl-2 text-transparent bg-clip-text bg-gradient-to-r to-accent from-primary">*/}
            {/*                    словарных слов*/}
            {/*                </span>*/}
            {/*        </h1>*/}
            {/*        <p className="text-sm md:text-base py-6">*/}
            {/*            Тренировка слов несколько раз в день приведет к поразительным результатам. Выберите категорию слов или*/}
            {/*            практикуйте все сразу.*/}
            {/*        </p>*/}
            {/*        <button className="btn btn-primary mr-2" onClick={onLessonStarted}>*/}
            {/*            Тренировать*/}
            {/*        </button>*/}
            {/*        <div className="dropdown dropdown-right dropdown-end">*/}
            {/*            <div className="indicator">*/}
            {/*                <span className="indicator-item badge badge-accent">{store[category].words.length}</span>*/}
            {/*                <label tabIndex="0" className="btn">*/}
            {/*                    {store[category].title}*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">*/}
            {/*                {categories.map((cat, i) => (*/}
            {/*                    <li key={i} onClick={onCategoryChange(cat)}>*/}
            {/*                        <a className="flex justify-between">*/}
            {/*                            {store[cat].title}*/}
            {/*                            <div className="badge badge-accent badge-outline badge-sm">*/}
            {/*                                {store[cat].words.length}*/}
            {/*                            </div>*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                ))}*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <img src="/images/learn-lamp.png" className="hidden lg:block max-w-sm rounded-lg" />*/}
            {/*</div>*/}
        </main>
    )
}
