'use client'

import { useMemo, useState } from 'react'
import keys from 'lodash/keys'
import { CATEGORIES } from '@/data'

const STATUS = {
    NOT_STARTED: 'not-started',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
    CANCELLED: 'cancelled',
}

export const Training = ({ data }) => {
    const wordsStore = data.reduce((acc, { category, title, words }) => {
        if (acc[CATEGORIES.ALL] === undefined) {
            acc[CATEGORIES.ALL] = { title: 'Все категории', words: [] }
        }
        acc[category] = { title, words }
        acc[CATEGORIES.ALL].words = acc[CATEGORIES.ALL].words.concat(words)
        return acc
    }, {})
    const [status, setStatus] = useState(STATUS.NOT_STARTED)
    const [category, setCategory] = useState('')

    const onCategoryChange = (newCategory) => () => {
        setCategory(newCategory)
    }

    const categories = useMemo(() => keys(wordsStore), [wordsStore])
    console.log(categories)
    return (
        <div className="hero bg-base-200 h-full shadow-xl rounded">
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
                        <div className="dropdown">
                            <label tabIndex="0" className="btn m-1">
                                Click
                            </label>
                            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">
                                {categories.map((cat, i) => (
                                    <li key={i} onClick={onCategoryChange(cat)}>
                                        <a className="flex justify-between">
                                            {wordsStore[cat].title}
                                            <div className="badge badge-accent badge-outline badge-sm">
                                                {wordsStore[cat].words.length}
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
        </div>
    )
}
