<template>
    <main class="joep">
      <section>
  
        <h2>Jouw situatie</h2>
  
        <div class="scenario-tabs">
          <h3>Scenario</h3>
          <label>
            Koude winter
          </label>
          <label>
            Gemiddeld
          </label>
          <label>
            Warme winter
          </label>

          <input type="range" min="-1" max="1" step="0.01" v-model.number="scenarioFactor">
        </div>
  
        <h3>Plafond gegevens</h3>

        <label for="gasPlafond">gasPlafond</label>
        <input type="text" id="gasPlafond" name="gasPlafond" v-model.number="gasPlafond">
        <label for="gasPlafondTarief">gasPlafondTarief</label>
        <input type="text" id="gasPlafondTarief" name="gasPlafondTarief" v-model.number="gasPlafondTarief">
        <label for="kWhPlafond">kWhPlafond</label>
        <input type="text" id="kWhPlafond" name="kWhPlafond" v-model.number="kWhPlafond">
        <label for="kWhPlafondTarief">kWhPlafondTarief</label>
        <input type="text" id="kWhPlafondTarief" name="kWhPlafondTarief" v-model.number="kWhPlafondTarief">

        <label for="gasJaarVerbruik">gasJaarVerbruik</label>
        <input type="text" id="gasJaarVerbruik" name="gasJaarVerbruik" v-model.number="gasJaarVerbruik">
        <label for="gasJaarTarief">gasJaarTarief</label>
        <input type="text" id="gasJaarTarief" name="gasJaarTarief" v-model.number="gasJaarTarief">
        <label for="kWhJaarVerbruik">kWhJaarVerbruik</label>
        <input type="text" id="kWhJaarVerbruik" name="kWhJaarVerbruik" v-model.number="kWhJaarVerbruik">
        <label for="kWhJaarTarief">kWhJaarTarief</label>
        <input type="text" id="kWhJaarTarief" name="kWhJaarTarief" v-model.number="kWhJaarTarief">

        <label for="voorschotPerMaand">voorschotPerMaand</label>
        <input type="text" id="voorschotPerMaand" name="voorschotPerMaand" v-model.number="voorschotPerMaand">

    </section>
    <section>

        <label for="gasJaarKosten">gasJaarKosten</label>
        <input type="text" id="gasJaarKosten" name="gasJaarKosten" v-model.number="overzicht.gasJaarKosten" disabled>

        <label for="kWhJaarKosten">kWhJaarKosten</label>
        <input type="text" id="kWhJaarKosten" name="kWhJaarKosten" v-model.number="overzicht.kWhJaarKosten" disabled>

        <label for="jaarKosten">jaarKosten</label>
        <input type="text" id="jaarKosten" name="jaarKosten" v-model.number="overzicht.jaarKosten" disabled>

        <label for="jaarVoorschot">jaarVoorschot</label>
        <input type="text" id="jaarVoorschot" name="jaarVoorschot" v-model.number="overzicht.jaarVoorschot" disabled>
        
      </section>
  
      <section class="verantwoording">
  
        <h2>Verantwoording en achtergrond</h2>
        <ul>
          <li>
            <NuxtLink to="/verantwoording">Verantwoording</NuxtLink>
          </li>
        </ul>
  
      </section>
  
    </main>
  </template>
  
  <script setup>
  
  import { useSimpleComputationStore } from '~~/simple-store'
  import { storeToRefs } from 'pinia';
  
    const store = useSimpleComputationStore()
    const { 
        gasPlafond, gasPlafondTarief, gasJaarVerbruik, 
        gasJaarTarief, kWhPlafond, kWhPlafondTarief, 
        kWhJaarVerbruik, kWhJaarTarief, voorschotPerMaand, 
        scenarioFactor, overzicht 
    } = storeToRefs(store)
  
  </script>
  
  <style>
  
  .joep {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  label + input {
    display: block;
  }
  
  </style>
  