import difference from 'lodash/difference'
import slice from 'lodash/slice'
import { WORDS_PER_LESSON } from '@/constants'

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
