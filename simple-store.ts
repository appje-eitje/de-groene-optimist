
import { defineStore } from 'pinia'

const state = () => ({

    gasPlafond: 1200,
    gasPlafondTarief: 1.5,
    gasJaarVerbruik: 1200,
    gasJaarTarief: 1.5,

    kWhPlafond: 2400,
    kWhPlafondTarief: 0.7,
    kWhJaarVerbruik: 2400,
    kWhJaarTarief: 0.7,

    kWhJaarTerugLeveringToggle: false,
    kWhJaarTeruglevering: 0,
    kWhJaarTerugleververgoeding: 0,

    voorschotPerMaand: 300,

    scenarioFactor: 0,
    scenarioEffectOpStroom: false,
})

const getters = {

    validate: (state) => {
        return {
            negatiefGasVerbruik: state.gasJaarVerbruik < 0,
            negatiefGasTarief: state.gasJaarTarief < 0,
            negatiefkWhVerbruik: state.kWhJaarVerbruik < 0,
            negatiefkWhTarief: state.kWhJaarTarief < 0,
            negatiefkWhTeruglevering: state.kWhJaarTerugLeveringToggle && state.kWhJaarTeruglevering < 0,
            negatiefkWhTerugleververgoeding: state.kWhJaarTerugLeveringToggle && state.kWhJaarTerugleververgoeding < 0,
            negatiefVoorschot: state.voorschotPerMaand < 0 
        }
    },

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
        if (state.kWhJaarTerugLeveringToggle) {
            kWhScenarioJaarVerbruik -= state.kWhJaarTeruglevering
        }

        console.log(kWhScenarioJaarVerbruik)

        if (kWhScenarioJaarVerbruik >= 0) {
            if (state.scenarioEffectOpStroom) {
                kWhScenarioJaarVerbruik -= state.scenarioFactor * state.kWhJaarVerbruik
            }
    
            if (state.kWhPlafond > kWhScenarioJaarVerbruik) {
                kWhJaarKosten += state.kWhPlafondTarief * kWhScenarioJaarVerbruik
            } else {
                kWhJaarKosten += state.kWhPlafondTarief * state.kWhPlafond
                kWhJaarKosten += state.kWhJaarTarief * (kWhScenarioJaarVerbruik - state.kWhPlafond)
            }
        } else {
            kWhJaarKosten = kWhScenarioJaarVerbruik * state.kWhJaarTerugleververgoeding
        }

        // jaar berekeningen

        const jaarKosten = gasJaarKosten + kWhJaarKosten
        const jaarVoorschot = 12 * state.voorschotPerMaand
        const jaarVerschil = jaarKosten - jaarVoorschot

        return {
            gasScenarioJaarVerbruik: Math.floor(gasScenarioJaarVerbruik),
            gasJaarKosten: Math.floor(gasJaarKosten),

            kWhScenarioJaarVerbruik: Math.floor(kWhScenarioJaarVerbruik),
            kWhJaarKosten: Math.floor(kWhJaarKosten),

            jaarKosten: Math.floor(jaarKosten),
            jaarVoorschot: Math.floor(jaarVoorschot),
            jaarVerschil: Math.floor(jaarVerschil)
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