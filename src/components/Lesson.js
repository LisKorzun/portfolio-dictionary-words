import { SpeakerIcon } from '@/icons'
import { useCallback, useEffect, useState } from 'react'

export const Lesson = ({ words, onComplete, onCancel }) => {
    const [showAnswer, setShowAnswer] = useState(false)
    const [wordInd, setWordInd] = useState(0)
    const [failedAnswers, setFailedAnswers] = useState([])
    const [learnedAnswers, setLearnedAnswers] = useState([])

    useEffect(() => {
        speakWord(words[wordInd])
    }, [words])

    const speakWord = (word) => {
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(word))
    }
    const showWord = () => {
        setShowAnswer(true)
    }
    const proceedNext = () => {
        setShowAnswer(false)
        setWordInd((current) => {
            const next = ++current
            speakWord(words[next])
            return next
        })
    }
    const onCorrect = () => {
        if (wordInd === words.length - 1) {
            onComplete(learnedAnswers.concat(words[wordInd]), failedAnswers)
            return
        }
        setLearnedAnswers((current) => current.concat(words[wordInd]))
        proceedNext()
    }
    const onFail = () => {
        if (wordInd === words.length - 1) {
            onComplete(learnedAnswers, failedAnswers.concat(words[wordInd]))
            return
        }
        setFailedAnswers((current) => current.concat(words[wordInd]))
        proceedNext()
    }

    const downHandler = ({ key }) => {
        if (key === ' ') {
            speakWord(words[wordInd])
        }
    }
    useEffect(() => {
        window.addEventListener('keyup', downHandler)
        return () => {
            window.removeEventListener('keyup', downHandler)
        }
    }, [words, wordInd])

    return (
        <>
            <div className="h-2/3 w-full flex flex-col justify-around items-center">
                <button className="btn btn-lg btn-square text-white btn-primary shadow-inner">
                    <SpeakerIcon width={48} height={48} onClick={() => speakWord(words[wordInd])} />
                </button>
                <div className="h-12 flex items-center font-bold text-white text-4xl">{showAnswer ? words[wordInd] : ''}</div>
            </div>
            <div className="h-1/3 flex items-center justify-center w-full">
                {!showAnswer && (
                    <button type="button" className="btn btn-primary" onClick={showWord}>
                        Показать ответ
                    </button>
                )}
                {showAnswer && (
                    <>
                        <div className="btn-group btn-group-horizontal">
                            <button className="btn btn-success w-[120px]" onClick={onCorrect}>
                                Верно
                            </button>
                            <button className="btn btn-error w-[120px]" onClick={onFail}>
                                Не верно
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
