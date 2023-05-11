'use client'

import { useMemo, useState } from 'react'
import keys from 'lodash/keys'
import filter from 'lodash/filter'
import { CATEGORIES } from '@/data'
import { pickWords } from '@/utils'
import { SpeakerIcon } from '@/icons'
import { Lesson } from '@/components/Lesson'

const STATUS = {
    NOT_STARTED: 'not-started',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
    CANCELLED: 'cancelled',
}

export const Training = ({ data }) => {
    const [status, setStatus] = useState(STATUS.NOT_STARTED)
    const [category, setCategory] = useState(CATEGORIES.ALL)
    const [toLearn, setToLearn] = useState([])
    const [learned, setLearned] = useState([])
    const [failed, setFailed] = useState([])

    const store = data.reduce((acc, { category, title, words }) => {
        if (acc[CATEGORIES.ALL] === undefined) {
            acc[CATEGORIES.ALL] = { title: 'Все категории', words: [] }
        }
        acc[category] = { title, words }
        acc[CATEGORIES.ALL].words = acc[CATEGORIES.ALL].words.concat(words)
        return acc
    }, {})

    const onCategoryChange = (newCategory) => () => {
        setCategory(newCategory)
        const elem = document.activeElement
        if (elem) {
            elem?.blur()
        }
    }
    const onLessonStarted = () => {
        setStatus(STATUS.IN_PROGRESS)
        const wordsToLearn = pickWords(store[category].words)
        setToLearn(wordsToLearn)
    }
    const onLessonDone = (learned, failed) => {
        setLearned(learned)
        setFailed(failed)
        setStatus(STATUS.DONE)
        console.log(learned, failed)
    }

    const categories = useMemo(() => filter(keys(store), (c) => c !== category), [store, category])
    console.log(categories)
    return (
        <div className="bg-base-200 h-full w-full shadow-2xl rounded-[20px] flex flex-col justify-center">
            {status === STATUS.NOT_STARTED && (
                <div className="hero-content p-8 flex-col gap-8 lg:flex-row">
                    <div>
                        <h1 className="text-3xl lg:text-4xl xl:text-6xl font-extrabold text-base-900 leading-tight">
                            Стань гуру
                            <span className="pl-2 text-transparent bg-clip-text bg-gradient-to-r to-accent from-primary">
                                словарных слов
                            </span>
                        </h1>
                        <p className="text-sm md:text-base py-6">
                            Тренировка слов несколько раз в день приведет к поразительным результатам. Выберите категорию слов или
                            практикуйте все сразу.
                        </p>
                        <button className="btn btn-primary mr-2" onClick={onLessonStarted}>
                            Тренировать
                        </button>
                        <div className="dropdown dropdown-right dropdown-end">
                            <div className="indicator">
                                <span className="indicator-item badge badge-accent">{store[category].words.length}</span>
                                <label tabIndex="0" className="btn">
                                    {store[category].title}
                                </label>
                            </div>
                            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">
                                {categories.map((cat, i) => (
                                    <li key={i} onClick={onCategoryChange(cat)}>
                                        <a className="flex justify-between">
                                            {store[cat].title}
                                            <div className="badge badge-accent badge-outline badge-sm">
                                                {store[cat].words.length}
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <img src="/images/learn-lamp.png" className="hidden lg:block max-w-sm rounded-lg" />
                </div>
            )}
            {status === STATUS.IN_PROGRESS && <Lesson words={toLearn} onComplete={onLessonDone} />}
            {status === STATUS.DONE && (
                <div className="flex flex-col items-center w-full h-full justify-around">
                    <div className="w-full flex flex-col items-center">
                        <div>Итог сессии</div>
                        <div>Верно изучено: {learned.length} слов</div>
                        <div>Стоит подучить: {failed.length} слов</div>
                    </div>
                    <button className="btn btn-primary mr-2" onClick={onLessonStarted}>
                        Тренироваться еще
                    </button>
                </div>
            )}
        </div>
    )
}
