import { create } from 'zustand';
import {accessibilityNeedsRoute , events} from "../consts/apiRoutes.js"

const useEventStore = create((set) => ({
    events: [],
    isLoading: false,
    error: null,
    selectedEvent: null,

    fetchEvents: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(events); // Замените на ваш реальный API endpoint
            const data = await response.json()


            const _events = await data.data.map(event => {
                const fullNeeds = []
                if (event?.accessibilityNeeds.length){
                    event.accessibilityNeeds.map(async accessibilityNeed => {
                        const response = await fetch(accessibilityNeedsRoute(accessibilityNeed.documentId)); // Замените на ваш реальный API endpoint
                        const data = await response.json()
                        console.log(data.data)
                        fullNeeds.push(data.data)
                    })
                }
                return {...event, accessibilityNeeds: fullNeeds}
            })

            console.log(_events)


            set({ events: _events, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    setSelectedEvent: (event) => set({ selectedEvent: event }),
}));

export default useEventStore;
