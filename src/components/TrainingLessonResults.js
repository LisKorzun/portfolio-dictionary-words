import { smoothTransition } from '@/animation'
import { CheckIcon, CrossIcon } from '@/icons'
import { motion } from 'framer-motion'
import { map } from 'lodash'

export const TrainingLessonResults = ({ title, learned, failed, total, onExit, onStart }) => {
    return (
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
                <div className="stat-title">{title}</div>
            </div>
            <div className="stat bg-primary text-primary-content">
                <div className="stat-title">Пройдено</div>
                <div className="stat-desc">{(learned.length / total) * 100}% верных</div>
                <div className="stat-value">{total}</div>
                <div className="stat-actions">
                    <button className="btn btn-sm  mr-4 mb-4" onClick={onStart}>
                        Тренироваться еще
                    </button>
                </div>
            </div>
            <div className="stat">
                <div className="stat-figure text-accent">
                    <CheckIcon className="inline-block w-8 h-8" />
                </div>
                <div className="stat-value text-accent">{learned.length}</div>
                <div className="stat-title text-primary-content">Верно изучено</div>
                <div className="stat-desc whitespace-normal">{map(learned, (item) => item.word).join(', ')}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <CrossIcon className="inline-block w-8 h-8" />
                </div>
                <div className="stat-value text-secondary">{failed.length}</div>
                <div className="stat-title text-primary-content">Стоит подучить</div>
                <div className="stat-desc whitespace-normal">{map(failed, (item) => item.word).join(', ')}</div>
            </div>
        </motion.div>
    )
}
