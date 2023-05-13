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
    { id: VARIANTS.NEW, title: 'Изучение новых слов' },
    { id: VARIANTS.MISTAKES, title: 'Исправление ошибок' },
    { id: VARIANTS.REPEAT, title: 'Повторение' },
]

export const Training = ({ data }) => {
    const [status, setStatus] = useState()
    const [variant, setVariant] = useState(VARIANTS.MISTAKES)
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
        console.log(wordsToLearn)
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
                    <div className="rounded-lg overflow-hidden shadow-2xl min-w-[500px]">
                        <div
                            tabIndex="0"
                            className={`collapse collapse-arrow ${variant === VARIANTS.NEW ? 'collapse-open' : 'collapse-close'}`}
                            onClick={() => setVariant(VARIANTS.NEW)}
                        >
                            <div className="collapse-title font-bold bg-base-100">{variantsButtons[0].title}</div>
                            <div className="collapse-content bg-base-100">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={onLessonStarted}
                                    disabled={isEmpty(notStudied)}
                                >
                                    Проверить новые слова
                                </button>
                            </div>
                        </div>
                        <div
                            tabIndex="0"
                            className={`collapse collapse-arrow ${
                                variant === VARIANTS.MISTAKES ? 'collapse-open' : 'collapse-close'
                            }`}
                            onClick={() => setVariant(VARIANTS.MISTAKES)}
                        >
                            <div className="collapse-title font-bold bg-neutral">{variantsButtons[1].title}</div>
                            <div className="collapse-content bg-neutral">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={onLessonStarted}
                                    disabled={isEmpty(storeFailed)}
                                >
                                    Начать работу над ошибками
                                </button>
                            </div>
                        </div>
                        <div
                            tabIndex="0"
                            className={`collapse collapse-arrow ${
                                variant === VARIANTS.REPEAT ? 'collapse-open' : 'collapse-close'
                            }`}
                            onClick={() => setVariant(VARIANTS.REPEAT)}
                        >
                            <div className="collapse-title font-bold bg-base-100">{variantsButtons[2].title}</div>
                            <div className="collapse-content bg-base-100">
                                <button
                                    className="btn  btn-accent btn-sm"
                                    onClick={onLessonStarted}
                                    disabled={isEmpty(storeLearned)}
                                >
                                    Повторить изученное
                                </button>
                            </div>
                        </div>
                    </div>
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
