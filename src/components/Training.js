'use client'

import { useEffect, useMemo, useState } from 'react'

import DEFAULT_WORDS, { CATEGORIES } from '@/data'
import { buildResults, pickByStatusWords, pickWordsByCategory } from '@/utils'
import { TrainingLesson } from '@/components/TrainingLesson'
import useLocalStorage from '@/hooks/useLocalStorage'
import { TrainingStatistics } from '@/components/TrainingStatistics'
import { TrainingLessonResults } from '@/components/TrainingLessonResults'
import { differenceBy, groupBy, isEmpty, map, reduce } from 'lodash'
import filter from 'lodash/filter'

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

const TOTAL_KEY = 'DWTotal'
let NEXT_ID = 0
const CATEGORIES_DB = map(DEFAULT_WORDS, ({ category, title }) => ({ id: category, title }))
const WORDS_DB = reduce(
    DEFAULT_WORDS,
    (acc, { category, words }) => {
        const modifiedWords = map(words, (word, i) => ({ id: NEXT_ID + i, word, cat_id: category }))
        NEXT_ID = NEXT_ID + words.length
        console.log(modifiedWords)
        return acc
    },
    []
)

export const Training = ({ data }) => {
    const store = useMemo(
        () =>
            data.reduce((acc, { category, title, words }) => {
                if (acc[TOTAL_KEY] === undefined) {
                    acc[TOTAL_KEY] = 0
                }
                const wordsObj = map(words, (word, i) => {
                    return { word, category, id: i }
                })
                // console.log(wordsObj)
                acc[category] = { title, words: map(words, (word) => ({ word, category })) }
                // acc[CATEGORIES.ALL].words = acc[CATEGORIES.ALL].words.concat(words)
                return acc
            }, {}),
        [JSON.stringify(data)]
    )
    console.log(CATEGORIES_DB, WORDS_DB)
    const categories = useMemo(() => map(data, (i) => i.category), [data])
    const total = useMemo(() => store[TOTAL_KEY], [store[TOTAL_KEY]])

    const [status, setStatus] = useState()
    const [variant, setVariant] = useState(VARIANTS.NEW)
    const [toLearn, setToLearn] = useState([])
    const [learnedResult, setLearnedResult] = useState([])
    const [failedResult, setFailedResult] = useState([])
    const [storeFailed, setStoreFailed] = useLocalStorage('DWFailedResults', [])
    const [storeLearned, setStoreLearned] = useLocalStorage('DWLearnedResults', [])

    const learnedByCategory = groupBy(storeLearned, 'category')
    const failedByCategory = groupBy(storeFailed, 'category')
    // console.log(learnedByCategory, failedByCategory)

    const notStudiedByCategory = categories.reduce((acc, category) => {
        const excludeLearned = learnedByCategory[category] ?? []
        const excludeFailed = failedByCategory[category] ?? []
        const res = differenceBy(store[category].words, [...excludeLearned, ...excludeFailed], 'word')
        // console.log(res, [...excludeLearned, ...excludeFailed])
        // console.log(excludeFailed, excludeLearned)
        acc[category] = store[category].words
        return acc
    }, {})
    const notStudiedCategories = Object.keys(notStudiedByCategory)
    const [newVariantCategories, setNewVariantCategories] = useState(notStudiedCategories)
    // console.log(notStudiedByCategory)
    useEffect(() => {
        setStatus(STATUS.DEFAULT)
    }, [])

    const onLessonStarted = () => {
        let wordsToLearn = []
        if (variant === VARIANTS.MISTAKES) {
            wordsToLearn = pickByStatusWords(storeFailed)
        }
        if (variant === VARIANTS.REPEAT) {
            wordsToLearn = pickByStatusWords(storeLearned)
        }
        if (variant === VARIANTS.NEW) {
            wordsToLearn = pickWordsByCategory(notStudiedByCategory, newVariantCategories)
        }
        setToLearn(wordsToLearn)
        setStatus(STATUS.IN_PROGRESS)
    }

    const onLessonDone = (learned, failed) => {
        console.log(learned, failed)
        setLearnedResult(learned)
        setFailedResult(failed)
        setStatus(STATUS.DONE)
        const { modifiedLearned, modifiedFailed } = buildResults(storeFailed, storeLearned, failed, learned)
        setStoreLearned(modifiedLearned)
        setStoreFailed(modifiedFailed)
    }
    const onExit = () => {
        setStatus(STATUS.DEFAULT)
    }

    const onCategoryChange = (cat) => (e) => {
        if (e.target.checked) {
            setNewVariantCategories(newVariantCategories.concat(cat))
        } else if (!e.target.checked && newVariantCategories.length > 1) {
            setNewVariantCategories(filter(newVariantCategories, (item) => item !== cat))
        }
    }

    return (
        <>
            {status === STATUS.DEFAULT && (
                <div className="p-8 flex flex-col gap-8 items-center">
                    <TrainingStatistics failed={storeFailed} learned={storeLearned} total={total} />
                    <div className="rounded overflow-hidden shadow-2xl w-full max-w-[700px]">
                        <div
                            tabIndex="0"
                            className={`collapse collapse-arrow ${variant === VARIANTS.NEW ? 'collapse-open' : 'collapse-close'}`}
                            onClick={() => setVariant(VARIANTS.NEW)}
                        >
                            <div className="collapse-title font-bold bg-neutral">{variantsButtons[0].title}</div>
                            <div className="collapse-content bg-neutral">
                                <div className="flex justify-between">
                                    <div className="flex flex-col grow">
                                        {map(notStudiedCategories, (cat, i) => (
                                            <div className="form-control w-full max-w-[300px]" key={i}>
                                                <label className="cursor-pointer label">
                                                    <span className="label-text">
                                                        {store[cat].title}{' '}
                                                        <span className="badge badge-info badge-outline badge-sm">
                                                            {notStudiedByCategory[cat].length}
                                                        </span>
                                                    </span>
                                                    <input
                                                        type="checkbox"
                                                        className="toggle toggle-info"
                                                        onChange={onCategoryChange(cat)}
                                                        checked={newVariantCategories.includes(cat)}
                                                    />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="divider divider-horizontal">O</div>
                                    <button className="btn btn-sm" onClick={onLessonStarted}>
                                        Начать
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            tabIndex="0"
                            className={`collapse collapse-arrow ${
                                variant === VARIANTS.MISTAKES ? 'collapse-open' : 'collapse-close'
                            }`}
                            onClick={() => setVariant(VARIANTS.MISTAKES)}
                        >
                            <div className="collapse-title font-bold bg-base-100">{variantsButtons[1].title}</div>
                            <div className="collapse-content bg-secondary">
                                <button className="btn btn-sm" onClick={onLessonStarted} disabled={isEmpty(storeFailed)}>
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
                            <div className="collapse-content bg-accent">
                                <button className="btn btn-sm" onClick={onLessonStarted} disabled={isEmpty(storeLearned)}>
                                    Повторить изученное
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {status === STATUS.IN_PROGRESS && <TrainingLesson words={toLearn} onComplete={onLessonDone} title="Урок" />}

            {status === STATUS.DONE && (
                <TrainingLessonResults
                    title="Результаты"
                    onStart={onLessonStarted}
                    onExit={onExit}
                    failed={failedResult}
                    learned={learnedResult}
                    total={toLearn.length}
                />
            )}
        </>
    )
}
