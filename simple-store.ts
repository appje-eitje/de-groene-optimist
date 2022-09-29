
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
    scenarioEffectOpStroom: false
})

const getters = {
    overzicht: (state) => {
        
        // gas berekeningen

        let gasJaarKosten = 0
        let gasScenarioJaarVerbruik = state.gasJaarVerbruik - (state.scenarioFactor * state.gasJaarVerbruik)
        if (state.gasPlafond > gasScenarioJaarVerbruik) {
            gasJaarKosten += state.gasPlafondTarief * gasScenarioJaarVerbruik
        } else {
            gasJaarKosten += state.gasPlafondTarief * state.gasPlafond
            gasJaarKosten += state.gasJaarTarief * (gasScenarioJaarVerbruik - state.gasPlafond)
        }

        // kWh berekeningen

        let kWhJaarKosten = 0
        let kWhScenarioJaarVerbruik = state.kWhJaarVerbruik 
        if (state.scenarioEffectOpStroom) {
            kWhScenarioJaarVerbruik -= state.scenarioFactor * state.kWhJaarVerbruik
        }

        if (state.kWhPlafond > kWhScenarioJaarVerbruik) {
            kWhJaarKosten += state.kWhPlafondTarief * kWhScenarioJaarVerbruik
        } else {
            kWhJaarKosten += state.kWhPlafondTarief * state.kWhPlafond
            kWhJaarKosten += state.kWhJaarTarief * (kWhScenarioJaarVerbruik - state.kWhPlafond)
        }

        // jaar berekeningen

        const jaarKosten = gasJaarKosten + kWhJaarKosten
        const jaarVoorschot = 12 * state.voorschotPerMaand
        const jaarVerschil = jaarKosten - jaarVoorschot

        return {
            gasScenarioJaarVerbruik,
            gasJaarKosten,

            kWhScenarioJaarVerbruik,
            kWhJaarKosten,

            jaarKosten,
            jaarVoorschot,
            jaarVerschil
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