import difference from 'lodash/difference'
import slice from 'lodash/slice'
import { TIMES_TO_REPEAT, WORDS_PER_LESSON } from '@/constants'
import { forEach, includes, map } from 'lodash'

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

export const pickWords = (words, wordsLearned = [], count = WORDS_PER_LESSON) => {
    const uniqueWords = difference(words, wordsLearned)
    shuffleArray(uniqueWords)
    return slice(uniqueWords, 0, count)
}

export const buildFailedResults = (data, failed, learned, timesToRepeat = TIMES_TO_REPEAT) => {
    const existingFails = []
    const modifiedData = map(data, (item) => {
        if (includes(learned, item.word)) {
            return { ...item, status: item.status + 1 }
        } else if (includes(failed, item.word)) {
            existingFails.push(item.word)
            return { ...item, status: 0 }
        } else {
            return item
        }
    })
    // console.log(data, modifiedData)
    const newFails = difference(failed, existingFails)
    forEach(newFails, (word) => {
        modifiedData.push({ word, status: 0 })
    })

    return modifiedData
}
