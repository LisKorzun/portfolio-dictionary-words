import { ChartIcon } from '@/icons'
import filter from 'lodash/filter'
import { isEmpty } from 'lodash'

export const TrainingStatistics = ({ failed, learned, total }) => {
    const learnedPercents = ((learned.length / total) * 100).toFixed(0)
    const newFails = filter(failed, ({ status }) => status === 0)
    // const newFailsPercents = ((newFails.length / failed.length) * 100).toFixed(0)
    const passedPercents = (((failed.length + learned.length) / total) * 100).toFixed(0)
    const remaining = total - (failed.length + learned.length)

    return (
        <div className="flex gap-8 justify-center flex-col-reverse md:flex-row">
            <div className="stats shadow-xl">
                <div className="stat text-center">
                    <div className="stat-title">Всего слов</div>
                    <div className="stat-value">{total}</div>
                </div>
            </div>
            <div className="stats shadow-xl">
                <div className="stat">
                    <div className="stat-value text-secondary">{failed.length}</div>
                    <div className="stat-title">Ошибок</div>
                    {!isEmpty(failed) && <div className="stat-desc text-secondary font-bold">{newFails.length} новых</div>}
                </div>
                <div className="stat">
                    <div className="stat-value text-accent">{learned.length}</div>
                    <div className="stat-title">Изучено</div>
                    {!isEmpty(learned) && <div className="stat-desc text-accent font-bold">{learnedPercents}% всех слов</div>}
                </div>
            </div>
            <div className="stats shadow-xl">
                <div className="stat bg-primary">
                    <div className="stat-figure text-primary-content">
                        <ChartIcon className="inline-block w-20 h-20" />
                    </div>
                    <div className="stat-value text-primary-content">{passedPercents}%</div>
                    <div className="stat-title text-primary-content">Пройдено</div>
                    <div className="stat-desc">{remaining} неизученных слов</div>
                </div>
            </div>
        </div>
    )
}
