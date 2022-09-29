
import { defineStore } from 'pinia'

const state = () => ({
    gasPlafond: 1200,
    gasPlafondTarief: 1.5,
    gasJaarVerbruik: 0,
    gasJaarTarief: 0,

    kWhPlafond: 2400,
    kWhPlafondTarief: 0.7,
    kWhJaarVerbruik: 0,
    kWhJaarTarief: 0,

    voorschotPerMaand: 0,

    scenarioFactor: 0,
})

const getters = {
    overzicht: (state) => {

        console.log('overzicht')
        
        let gasJaarKosten = 0
        if (state.gasPlafond > state.gasJaarVerbruik) {
            gasJaarKosten += state.gasPlafondTarief * state.gasJaarVerbruik
        } else {
            gasJaarKosten += state.gasPlafondTarief * state.gasPlafond
            gasJaarKosten += state.gasJaarTarief * (state.gasJaarVerbruik - state.gasPlafond)
        }

        let kWhJaarKosten = 0
        if (state.kWhPlafond > state.kWhJaarVerbruik) {
            kWhJaarKosten += state.kWhPlafondTarief * state.kWhJaarVerbruik
        } else {
            kWhJaarKosten += state.kWhPlafondTarief * state.kWhPlafond
            kWhJaarKosten += state.kWhJaarTarief * (state.kWhJaarVerbruik - state.kWhPlafond)
        }

        kWhJaarKosten -= state.scenarioFactor * kWhJaarKosten
        gasJaarKosten -= state.scenarioFactor * kWhJaarKosten

        const jaarKosten = gasJaarKosten + kWhJaarKosten
        const jaarVoorschot = 12 * state.voorschotPerMaand

        return {
            gasJaarKosten,
            kWhJaarKosten,
            jaarKosten,
            jaarVoorschot
        }
    }
}

const actions = {

}

export const useSimpleComputationStore = defineStore('simple-computation-store', {
    state, 
    actions, 
    getters,
})