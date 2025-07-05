import {create} from 'zustand'
import i18n from '../../i18n'

const useLanguageStore = create((set) => ({
    language: i18n.language,
    setLanguage: (newLanguage) => {
        i18n.changeLanguage(newLanguage)
        set({ language: newLanguage })
    },
}))

export default useLanguageStore
