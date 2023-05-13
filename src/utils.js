import difference from 'lodash/difference'
import slice from 'lodash/slice'
import { TIMES_TO_REPEAT, WORDS_PER_LESSON } from '@/constants'
import { differenceBy, forEach, includes, map, sortBy } from 'lodash'
import filter from 'lodash/filter'

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

export const pickWords = (words, wordsToExclude = [], count = WORDS_PER_LESSON) => {
    const uniqueWords = difference(words, wordsToExclude)
    shuffleArray(uniqueWords)
    return slice(uniqueWords, 0, count)
}
export const pickWordsByCategory = (words, categories, count = WORDS_PER_LESSON) => {
    const pickedWords = categories.reduce((acc, cat) => {
        return acc.concat(words[cat])
    }, [])
    shuffleArray(pickedWords)
    return slice(pickedWords, 0, count)
}

export const pickByStatusWords = (words, count = WORDS_PER_LESSON) => {
    const sortedWords = sortBy(words, ['status'])
    console.log(sortedWords)
    const toLearn = slice(sortedWords, 0, count)
    return map(toLearn, ({ word }) => word)
}

export const buildResults = (storeFailed, storeLearned, failed, learned, timesToRepeat = TIMES_TO_REPEAT) => {
    const failsToExclude = []
    const learnsToExclude = []
    const modifiedFailed = map(storeFailed, (item) => {
        if (includes(learned, item.word)) {
            learnsToExclude.push(item.word)
            return { ...item, status: item.status + 1 }
        } else if (includes(failed, item.word)) {
            failsToExclude.push(item.word)
            return { ...item, status: 0 }
        } else {
            return item
        }
    })
    const failsToAdd = difference(failed, failsToExclude)
    const learnsToAdd = difference(learned, learnsToExclude)
    const filteredFailed = filter(modifiedFailed, ({ status, word }) => {
        const notLearned = status < timesToRepeat
        if (!notLearned) {
            learnsToAdd.push(word)
        }
        return notLearned
    })
    forEach(failsToAdd, (word) => {
        filteredFailed.push({ ...word, status: 0 })
    })
    const filteredLearned = filter(storeLearned, ({ word }) => !includes(failed, word))
    const existingLearned = []
    const modifiedLearned = map(filteredLearned, (item) => {
        if (includes(learnsToAdd, item.word)) {
            existingLearned.push(item.word)
            return { ...item, status: item.status + 1 }
        } else {
            return item
        }
    })
    forEach(differenceBy(learnsToAdd, existingLearned, 'word'), (word) => {
        modifiedLearned.push({ ...word, status: 0 })
    })
    return { modifiedLearned, modifiedFailed: filteredFailed }
}
