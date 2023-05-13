import { ChartIcon } from '@/icons'
import filter from 'lodash/filter'
import { isEmpty } from 'lodash'
import { TIMES_TO_REPEAT } from '@/constants'

export const TrainingStatistics = ({ failed, learned, total }) => {
    const newFails = filter(failed, ({ status }) => status === 0)
    const almostLearned = filter(failed, ({ status }) => status === TIMES_TO_REPEAT - 1)
    const failsPercents = ((failed.length / (failed.length + learned.length)) * 100).toFixed(0)
    const learnedPercents = ((learned.length / total) * 100).toFixed(0)
    const remaining = total - (failed.length + learned.length)

    return (
        <div className="flex gap-8 justify-center flex-col md:flex-row">
            <div className="stats shadow-xl">
                <div className="stat">
                    <div className="stat-title">Всего слов</div>
                    <div className="stat-value text-primary-content">{total}</div>
                    <div className="stat-desc text-primary font-bold">{remaining} неизученных слов</div>
                </div>
            </div>
            <div className="stats shadow-xl">
                <div className="stat">
                    <div className="stat-figure font-bold flex flex-col justify-around h-full items-end">
                        <div
                            className=" radial-progress bg-secondary text-secondary-content border-4 border-secondary"
                            style={{ '--value': failsPercents }}
                        >
                            {failsPercents}%
                        </div>
                    </div>
                    <div className="stat-value text-secondary">{failed.length}</div>
                    <div className="stat-title">Ошибок</div>
                    <div className="stat-desc text-secondary font-bold">
                        <span className="mr-4">➘ {newFails.length} новых</span>
                        {!isEmpty(almostLearned) && <span>➚ {almostLearned.length} почти</span>}
                    </div>
                </div>
            </div>
            <div className="stats shadow-xl">
                <div className="stat">
                    <div className="stat-figure font-bold">
                        <div
                            className=" radial-progress bg-accent text-accent-content border-4 border-accent"
                            style={{ '--value': learnedPercents }}
                        >
                            {learnedPercents}%
                        </div>
                    </div>
                    <div className="stat-value text-accent">{learned.length}</div>
                    <div className="stat-title">Изучено</div>
                    <div className="stat-desc text-accent font-bold">добавить фильтры</div>
                </div>
            </div>
        </div>
    )
}
