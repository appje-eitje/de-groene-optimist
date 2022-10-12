<template>
  <main class="main-content">
    <h1 class="app-page__heading">Energiekosten in 2023</h1>
    <p>Krijg een indicatie van je kosten voor gas en elektriciteit met het <NuxtLink to="artikelen/2022-10-12-prijsplafond-verantwoording">prijsplafond</NuxtLink>.</p>
    <p>Vul in hoeveel gas en stroom je <strong>per jaar</strong> verbruikt.
      Heb je zonnepanelen?
      Dan kun je een negatief getal invoeren en je terugleververgoeding toevoegen.
      Geef ook aan of je een (hybride) warmtepomp hebt,
      want dan is het wintereffect veel sterker op stroom.</p>
    <p>De prijzen voor gas en stroom boven het prijsplafond komen van het CBS. Vervang die door de prijzen die je daadwerkelijk betaalt.</p>
    <section class="app-content-block">
      <h2 class="app-page__subheading">Indicatie van je energiekosten met het prijsplafond</h2>
      <h3 class="app-section__heading">Je verbruik</h3>
      <div class="input-group">
        <label for="gasJaarVerbruik">Gasverbruik in m<sup>3</sup></label>
        <input type="number" step="1" id="gasJaarVerbruik" name="gasJaarVerbruik" v-model.number="gasJaarVerbruik" :class="{warning: validate.negatiefGasVerbruik}">
      </div>
      <div class="input-group">
        <label for="kWhJaarVerbruik">Elektriciteitsverbruik in kWh</label>
        <input
          type="number"
          step="1"
          id="kWhJaarVerbruik"
          name="kWhJaarVerbruik"
          :disabled="kWhJaarTerugLeveringToggle"
          v-model.number="kWhJaarVerbruik"
        >
      </div>
      <div class="input-group__container">
        <div class="input-group __checkbox">
          <input
              type="checkbox"
              id="kWhJaarTerugLeveringToggle"
              v-model="kWhJaarTerugLeveringToggle"
          >
          <label for="kWhJaarTerugLeveringToggle">Ik lever elektriciteit terug</label>
        </div>
        <div v-show="kWhJaarTerugLeveringToggle">
          <div class="input-group">
            <label for="kWhJaarTeruglevering">Teruglevering per jaar in kWh</label>
            <input
                ref="teruglevering"
                type="number"
                step="1"
                id="kWhJaarTeruglevering"
                name="kWhJaarTeruglevering"
                v-model.number="kWhJaarTeruglevering"
                :class="{ warning: validate.negatiefkWhTeruglevering }">
          </div>
          <div class="input-group">
            <label for="kWhJaarTerugleververgoeding">Terugleververgoeding</label>
            <input
                type="number"
                step="0.1"
                id="kWhJaarTerugleververgoeding"
                name="kWhJaarTerugleververgoeding"
                v-model.number="kWhJaarTerugleververgoeding"
                :class="{warning: validate.negatiefkWhTerugleververgoeding}">
          </div>
        </div>
      </div>
      <h3 class="app-section__heading">Je kosten</h3>
      <div class="input-group">
        <label for="gasJaarTarief">Gasprijs (totale prijs)</label>
        <input type="number" step="0.1" id="gasJaarTarief" name="gasJaarTarief" v-model.number="gasJaarTarief" :class="{warning: validate.negatiefGasTarief}">
      </div>
      <div class="input-group">
        <label for="kWhJaarTarief">Elektriciteitprijs (totale prijs)</label>
        <input type="number" step="0.1" id="kWhJaarTarief" name="kWhJaarTarief" v-model.number="kWhJaarTarief" :class="{warning: validate.negatiefkWhTarief}">
      </div>
      <h3 class="app-section__heading">Verwarmen met stroom</h3>
      <div class="input-group__container __single">
        <div class="input-group __checkbox">
          <input
            type="checkbox"
            id="scenarioEffectOpStroomToggle"
            v-model="scenarioEffectOpStroom"
          >
          <label for="scenarioEffectOpStroomToggle">Ik heb een (hybride) warmtepomp</label>
        </div>
      </div>
      <h3 class="app-section__heading">Invloed van de winter <button @click.prevent="scenarioFactor=0">reset</button></h3>
      <div class="winter-slider">
        <div class="winter-slider__labels">
          <label>
            kouder
          </label>
          <label>
            warmer
          </label>
        </div>
        <input class="winter-slider__slider" ref="slider" type="range" min="-0.3" max="0.2" step="0.01" v-model.number="scenarioFactor">
      </div>
      <div class="app-content-block __result">
        <p>Je geschatte kosten in 2023 met het prijsplafond zijn voor gas <strong>&euro;&nbsp;{{ overzicht.gasJaarKosten }}</strong> en
          voor elektriciteit <strong>&euro;&nbsp;{{ overzicht.kWhJaarKosten }}</strong>. Per maand is dat voor gas <strong>&euro;&nbsp;{{
              overzicht.gasMaandKosten
            }}</strong> en voor elektriciteit <strong>&euro;&nbsp;{{ overzicht.kWhMaandKosten }}</strong>.
        </p>
        <ul>
          <li><strong>Kosten per jaar: &euro;&nbsp;{{ overzicht.jaarKosten }}</strong></li>
          <li><strong>Kosten per maand: &euro;&nbsp;{{ overzicht.maandKosten }}</strong></li>
        </ul>
      </div>

      <div class="app-content-block __result">
        <p>
          Een zeer koude winter verhoogt het energieverbruik met 30%.
          De kans op een zeer koude winter is klein, maar de gevolgen kunnen groot zijn.
          Een milde winter scheelt verwarmingskosten.
          De invloed daarvan is kleiner: maximaal 20% van de verwarmingskosten.</p>
      </div>
    </section>
  </main>
</template>

<script setup>

import { useSimpleComputationStore } from '~~/simple-store'
import { storeToRefs } from 'pinia'
import {nextTick, ref, watch} from 'vue'

const store = useSimpleComputationStore()
const {
    gasPlafond, gasPlafondTarief, gasJaarVerbruik, gasJaarTarief,
    kWhPlafond, kWhPlafondTarief, kWhJaarVerbruik, kWhJaarTarief,
    kWhJaarTeruglevering, kWhJaarTerugleververgoeding, kWhJaarTerugLeveringToggle,
    voorschotPerMaand,
    scenarioFactor, scenarioEffectOpStroom,
    overzicht, validate
} = storeToRefs(store)

const teruglevering = ref(null)

watch(kWhJaarTerugLeveringToggle, (value) => {
  if (value) {
    kWhJaarVerbruik.value = 0
  }
})

// watch(scenarioEffectOpStroom, (value) => {
//   if (value) {
//     scenarioEffectOpStroom.value = true
//   }
// })

watch(kWhJaarVerbruik, (value) => {
  if (value < 0) {
    kWhJaarTerugLeveringToggle.value = true
    kWhJaarTeruglevering.value = value * -1
  }
    nextTick(() => {
      teruglevering.value.focus();
    })
});

</script>

<style src="./simple.vue.scss" lang="scss" scoped>
</style>
