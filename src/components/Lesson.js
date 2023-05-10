'use client'
import { useState } from 'react'
import WORDS from '@/data'
import { SpeakerIcon } from '@/icons'

const words = WORDS[0].words

const LESSON_STATUS = {
    NEW: 'new',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
    CANCELLED: 'cancelled',
}
const WORDS_PER_LESSON = 5

export const Lesson = () => {
    const [status, setStatus] = useState(LESSON_STATUS.NEW)
    const [wordInd, setWordInd] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [failedAnswers, setFailedAnswers] = useState([])

    const onLessonStarted = () => {
        setStatus(LESSON_STATUS.IN_PROGRESS)
        speakWord(words[wordInd])
    }
    const speakWord = (word) => {
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(word))
    }
    const showWord = () => {
        setShowAnswer(true)
    }
    const onCorrect = () => {
        setShowAnswer(false)
        setWordInd((current) => {
            const next = ++current
            if (next > WORDS_PER_LESSON - 1) {
                setStatus(LESSON_STATUS.DONE)
                return 0
            }
            speakWord(words[next])
            return next
        })
    }
    const onFail = () => {
        setFailedAnswers((current) => current.concat(words[wordInd]))
        onCorrect()
    }
    console.log(failedAnswers)
    return (
        <>
            {status === LESSON_STATUS.NEW && (
                <>
                    <div> Стань гуру словарных слов</div>
                    <div> Доступно {words.length} слов</div>
                    <button type="button" onClick={onLessonStarted} className="p-4 border border-slate-200">
                        Начать раунд
                    </button>
                </>
            )}
            {status === LESSON_STATUS.IN_PROGRESS && (
                <>
                    <SpeakerIcon width={48} height={48} className="text-red-500" onClick={() => speakWord(words[wordInd])} />
                    {!showAnswer && (
                        <button type="button" onClick={showWord}>
                            Показать ответ
                        </button>
                    )}
                    {showAnswer && (
                        <>
                            <div>{words[wordInd]}</div>
                            <div className="flex gap-3">
                                <button type="button" onClick={onCorrect}>
                                    Верно
                                </button>
                                <button type="button" onClick={onFail}>
                                    Не верно
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
            {status === LESSON_STATUS.DONE && (
                <>
                    <div>
                        Неверных ответов {failedAnswers.length} из {WORDS_PER_LESSON}
                    </div>
                    <div>{failedAnswers.join(' | ')}</div>
                </>
            )}
        </>
    )
}
