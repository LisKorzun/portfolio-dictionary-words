import { SpeakerIcon } from '@/icons'
import { useEffect, useState } from 'react'

export const TrainingLesson = ({ title, words, onComplete, onCancel }) => {
    const [showAnswer, setShowAnswer] = useState(false)
    const [wordInd, setWordInd] = useState(0)
    const [failedAnswers, setFailedAnswers] = useState([])
    const [learnedAnswers, setLearnedAnswers] = useState([])

    useEffect(() => {
        speakWord(words[wordInd].word)
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
            speakWord(words[next].word)
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
        if (key >= 'a' && key <= 'z') {
            speakWord(words[wordInd])
        }
        if (key === ' ') {
            showWord()
        }
        if (key >= '1' && key <= '3' && showAnswer) {
            onFail()
        }
        if (key >= '6' && key <= '9' && showAnswer) {
            onCorrect()
        }
    }
    useEffect(() => {
        window.addEventListener('keyup', downHandler)
        return () => {
            window.removeEventListener('keyup', downHandler)
        }
    }, [words, wordInd, showAnswer])

    return (
        <div className="p-4 md:p-10 lg:p-24 h-full w-full max-w-[1300px]  flex flex-col justify-center">
            <div className="bg-base-100 h-full w-full  rounded-[20px] flex flex-col justify-center shadow-2xl">
                <div className="stats shadow text-center rounded-none">
                    <div className="stat">
                        <div className="stat-desc">Не верных</div>
                        <div className="stat-value text-secondary countdown mx-auto">
                            <span style={{ '--value': failedAnswers.length }}></span>
                        </div>
                    </div>
                    <div className="stat hidden md:block">
                        <div className="stat-title">{title}</div>
                        <div className="stat-desc">
                            {wordInd + 1} из {words.length}
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-desc">Верных</div>
                        <div className="stat-value text-accent countdown mx-auto">
                            <span style={{ '--value': learnedAnswers.length }}></span>
                        </div>
                    </div>
                </div>
                <progress className="progress progress-primary w-full" value={wordInd} max={words.length}></progress>
                <div className="h-2/4 w-full flex flex-col justify-around items-center">
                    <button className="btn btn-lg btn-square text-white btn-primary shadow-inner">
                        <SpeakerIcon width={48} height={48} onClick={() => speakWord(words[wordInd].word)} />
                    </button>
                    <div className="h-12 flex items-center font-bold text-white text-4xl">
                        {showAnswer ? words[wordInd].word : ''}
                    </div>
                </div>
                <div className="h-1/4 flex items-center justify-center w-full">
                    {!showAnswer && (
                        <button type="button" className="btn btn-primary" onClick={showWord}>
                            Показать ответ
                        </button>
                    )}
                    {showAnswer && (
                        <>
                            <div className="btn-group btn-group-horizontal">
                                <button className="btn btn-secondary w-[120px]" onClick={onFail}>
                                    Не верно
                                </button>
                                <button className="btn btn-accent w-[120px]" onClick={onCorrect}>
                                    Верно
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
