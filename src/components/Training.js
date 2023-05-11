'use client'

import { useEffect, useMemo, useState } from 'react'
import keys from 'lodash/keys'
import filter from 'lodash/filter'

import { CATEGORIES } from '@/data'
import { buildResults, pickByStatusWords, pickWords } from '@/utils'
import { TrainingLesson } from '@/components/TrainingLesson'
import useLocalStorage from '@/hooks/useLocalStorage'
import { TrainingStatistics } from '@/components/TrainingStatistics'
import { TrainingLessonResults } from '@/components/TrainingLessonResults'
import { isEmpty, map } from 'lodash'
import difference from 'lodash/difference'

const STATUS = {
    DEFAULT: 'default',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
    CANCELLED: 'cancelled',
}
const VARIANTS = {
    NEW: 'new',
    MISTAKES: 'mistakes',
    REPEAT: 'repeat',
}
const variantsButtons = [
    { id: VARIANTS.NEW, title: 'Изучение новых' },
    { id: VARIANTS.MISTAKES, title: 'Исправление ошибок' },
    { id: VARIANTS.REPEAT, title: 'Повторение' },
]

export const Training = ({ data }) => {
    const [status, setStatus] = useState()
    const [variant, setVariant] = useState(VARIANTS.NEW)
    const [category, setCategory] = useState(CATEGORIES.DOUBLED)
    const [toLearn, setToLearn] = useState([])
    const [learned, setLearned] = useState([])
    const [failed, setFailed] = useState([])

    const [storeFailed, setStoreFailed] = useLocalStorage('DWFailedResults', [])
    const [storeLearned, setStoreLearned] = useLocalStorage('DWLearnedResults', [])

    const store = data.reduce((acc, { category, title, words }) => {
        if (acc[CATEGORIES.ALL] === undefined) {
            acc[CATEGORIES.ALL] = { title: 'Все категории слов', words: [] }
        }
        acc[category] = { title, words }
        acc[CATEGORIES.ALL].words = acc[CATEGORIES.ALL].words.concat(words)
        return acc
    }, {})
    const categories = useMemo(() => filter(keys(store), (c) => c !== category), [store, category])
    const total = useMemo(() => store[CATEGORIES.ALL].words.length, [store])
    const currentFailed = map(storeFailed, ({ word }) => word)
    const currentLearned = map(storeLearned, ({ word }) => word)
    const notStudied = difference(store[CATEGORIES.ALL].words, [...currentFailed, ...currentLearned])
    console.log(storeLearned, storeFailed)
    useEffect(() => {
        setStatus(STATUS.DEFAULT)
    }, [])

    const onCategoryChange = (newCategory) => () => {
        setCategory(newCategory)
        const elem = document.activeElement
        if (elem) {
            elem?.blur()
        }
    }
    const onLessonStarted = () => {
        let wordsToLearn = []
        if (variant === VARIANTS.MISTAKES) {
            wordsToLearn = pickByStatusWords(storeFailed)
        }
        if (variant === VARIANTS.REPEAT) {
            wordsToLearn = pickByStatusWords(storeLearned)
        }
        if (variant === VARIANTS.NEW) {
            wordsToLearn = pickWords(notStudied)
        }
        setToLearn(wordsToLearn)
        setStatus(STATUS.IN_PROGRESS)
    }

    const onLessonDone = (learned, failed) => {
        setLearned(learned)
        setFailed(failed)
        setStatus(STATUS.DONE)
        const { modifiedLearned, modifiedFailed } = buildResults(storeFailed, storeLearned, failed, learned)
        setStoreLearned(modifiedLearned)
        setStoreFailed(modifiedFailed)
    }
    const onExit = () => {
        setStatus(STATUS.DEFAULT)
    }

    return (
        <>
            {status === STATUS.DEFAULT && (
                <div className="p-8 flex flex-col gap-8 items-center">
                    <TrainingStatistics failed={storeFailed} learned={storeLearned} total={total} />
                    <div className="btn-group btn-group-custom btn-group-vertical md:btn-group-horizontal shadow">
                        {map(variantsButtons, ({ id, title }) => (
                            <button
                                key={id}
                                className={`btn ${variant === id ? 'btn-active' : ''}`}
                                style={{ borderRadius: 0 }}
                                onClick={() => setVariant(id)}
                            >
                                {title}
                            </button>
                        ))}
                    </div>
                    {variant === VARIANTS.MISTAKES && (
                        <button className="btn btn-accent btn-lg mr-2" onClick={onLessonStarted} disabled={isEmpty(storeFailed)}>
                            Начать работу над ошибками
                        </button>
                    )}
                    {variant === VARIANTS.NEW && (
                        <button className="btn btn-accent btn-lg mr-2" onClick={onLessonStarted} disabled={isEmpty(notStudied)}>
                            Проверить новые слова
                        </button>
                    )}
                    {variant === VARIANTS.REPEAT && (
                        <>
                            {/*<div className="dropdown dropdown-right dropdown-end">*/}
                            {/*    <div className="indicator">*/}
                            {/*        <span className="indicator-item badge badge-accent">{store[category].words.length}</span>*/}
                            {/*        <label tabIndex="0" className="btn">*/}
                            {/*            {store[category].title}*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72">*/}
                            {/*        {categories.map((cat, i) => (*/}
                            {/*            <li key={i} onClick={onCategoryChange(cat)}>*/}
                            {/*                <a className="flex justify-between">*/}
                            {/*                    {store[cat].title}*/}
                            {/*                    <div className="badge badge-accent badge-outline badge-sm">*/}
                            {/*                        {store[cat].words.length}*/}
                            {/*                    </div>*/}
                            {/*                </a>*/}
                            {/*            </li>*/}
                            {/*        ))}*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                            <button
                                className="btn btn-accent btn-lg mr-2"
                                onClick={onLessonStarted}
                                disabled={isEmpty(notStudied)}
                            >
                                Повторить изученное
                            </button>
                        </>
                    )}
                </div>
            )}
            {status === STATUS.IN_PROGRESS && (
                <TrainingLesson words={toLearn} onComplete={onLessonDone} title={store[category].title} />
            )}

            {status === STATUS.DONE && (
                <TrainingLessonResults
                    title={store[category].title}
                    onStart={onLessonStarted}
                    onExit={onExit}
                    failed={failed}
                    learned={learned}
                    total={toLearn.length}
                />
            )}
        </>
    )
}
