'use client'

import { useMemo, useState } from 'react'
import keys from 'lodash/keys'
import filter from 'lodash/filter'
import { motion } from 'framer-motion'
import { smoothTransition } from '@/animation'
import { CATEGORIES } from '@/data'
import { pickWords } from '@/utils'
import { Lesson } from '@/components/Lesson'
import { CheckIcon, CrossIcon } from '@/icons'

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
            acc[CATEGORIES.ALL] = { title: 'Все категории слов', words: [] }
        }
        acc[category] = { title, words }
        acc[CATEGORIES.ALL].words = acc[CATEGORIES.ALL].words.concat(words)
        return acc
    }, {})
    const categories = useMemo(() => filter(keys(store), (c) => c !== category), [store, category])

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
    const onExit = () => {
        setStatus(STATUS.NOT_STARTED)
    }
    console.log(status === STATUS.DONE)
    return (
        <motion.div
            className="h-full w-full rounded-[20px] flex flex-col justify-center"
            initial={{ backgroundColor: 'rgb(42, 48, 60)' }}
            animate={{ backgroundColor: status === STATUS.DONE ? 'transparent' : 'rgb(42, 48, 60)' }}
            transition={{ ...smoothTransition }}
        >
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
            {status === STATUS.IN_PROGRESS && <Lesson words={toLearn} onComplete={onLessonDone} title={store[category].title} />}
            {status === STATUS.DONE && (
                <>
                    <motion.div
                        className="stats stats-vertical shadow-xl w-full max-w-[500px] mx-auto bg-base-200"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        transition={{ ...smoothTransition, delay: 0.1 }}
                    >
                        <div className="stat">
                            <div className="stat-figure text-base-content">
                                <button className="btn btn-square btn-outline" onClick={onExit}>
                                    <CrossIcon className="inline-block w-8 h-8" />
                                </button>
                            </div>
                            <div className="stat-desc">Категория</div>
                            <div className="stat-title">{store[category].title}</div>
                        </div>
                        <div className="stat bg-primary text-primary-content">
                            <div className="stat-title">Всего изучено</div>
                            <div className="stat-desc">{(learned.length / toLearn.length) * 100}% верных</div>
                            <div className="stat-value">{toLearn.length}</div>
                            <div className="stat-actions">
                                <button className="btn btn-sm btn-success mr-4 mb-4" onClick={onLessonStarted}>
                                    Тренироваться еще
                                </button>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-success">
                                <CheckIcon className="inline-block w-8 h-8" />
                            </div>
                            <div className="stat-value text-success">{learned.length}</div>
                            <div className="stat-title">Верно изучено</div>
                            <div className="stat-desc whitespace-normal">{learned.join(', ')}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-error">
                                <CrossIcon className="inline-block w-8 h-8" />
                            </div>
                            <div className="stat-value text-error countdown">{failed.length}</div>
                            <div className="stat-title">Стоит подучить</div>
                            <div className="stat-desc whitespace-normal">{failed.join(', ')}</div>
                        </div>
                    </motion.div>
                </>
            )}
        </motion.div>
    )
}
