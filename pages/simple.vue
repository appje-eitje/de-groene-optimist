<template>
  <main class="main-content">

    <h1 class="app-page__heading">Bereken je energiekosten</h1>

    <section class="app-content-block section-situatie">
      <h2 class="app-section__heading">Mijn gegevens</h2>
      <label for="gasJaarVerbruik">Gasverbruik per jaar is kubieke meter (m3)</label>
      <input type="number" step="1" id="gasJaarVerbruik" name="gasJaarVerbruik" v-model.number="gasJaarVerbruik">
      <label for="gasJaarTarief">Prijs van 1 m3 gas (totale leveringsprijs)</label>
      <input type="number" step="0.1" id="gasJaarTarief" name="gasJaarTarief" v-model.number="gasJaarTarief">
      <label for="kWhJaarVerbruik">Stroomverbruik per jaar in kWh</label>
      <input type="number" step="1" id="kWhJaarVerbruik" name="kWhJaarVerbruik" v-model.number="kWhJaarVerbruik">
      <label for="kWhJaarTarief">Prijs van 1 kWh stroom</label>
      <input type="number" step="0.1" id="kWhJaarTarief" name="kWhJaarTarief" v-model.number="kWhJaarTarief">
      <label for="voorschotPerMaand">Het voorschotbedrag per maand in euro</label>
      <input type="number" step="1" id="voorschotPerMaand" name="voorschotPerMaand" v-model.number="voorschotPerMaand">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur delectus esse expedita explicabo in
        minima nesciunt officiis, possimus quae voluptas? Beatae corporis dolorem dolorum nihil sunt! Explicabo maxime
        reprehenderit tempora.</p>

      <h2 class="app-section__heading">Mijn situatie</h2>
      <div class="app-content-block winter-slider">
        <h2 class="app-section__heading">Wat voor winter wordt het</h2>
        <div class="winter-slider__labels">
          <label>
          koud
        </label>
          <label>
            warm
          </label>
        </div>
        <input class="winter-slider__slider" type="range" min="-0.4" max="0.2" step="0.01" v-model.number="scenarioFactor">
      </div>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, facere.</p>
      <label for="">Ik gebruik (ook) stroom om te verwarmen (bijv. warmtepomp of airco)</label><input type="checkbox" v-model="scenarioEffectOpStroom">
      <label for="gasScenarioJaarVerbruik">gasScenarioJaarVerbruik</label>
      <input type="text" id="gasScenarioJaarVerbruik" name="gasScenarioJaarVerbruik" v-model.number="overzicht.gasScenarioJaarVerbruik" disabled>
      <label v-if="scenarioEffectOpStroom" for="kWhScenarioJaarVerbruik">kWhScenarioJaarVerbruik</label>
      <input v-if="scenarioEffectOpStroom" type="text" id="kWhScenarioJaarVerbruik" name="kWhScenarioJaarVerbruik" v-model.number="overzicht.kWhScenarioJaarVerbruik" disabled>
        <p>De gegevens van de overheid zijn ingevuld. Je kunt ze zelf aanpassen. Laad de pagina opnieuw om de gegevens
          te herstellen. </p>
        <label for="gasPlafond">Aantal kubieke meter gas in het gasplafond</label>
        <input type="text" id="gasPlafond" name="gasPlafond" v-model.number="gasPlafond">
        <label for="gasPlafondTarief">gasPlafondTarief</label>
        <input type="text" id="gasPlafondTarief" name="gasPlafondTarief" v-model.number="gasPlafondTarief">
        <label for="kWhPlafond">kWhPlafond</label>
        <input type="text" id="kWhPlafond" name="kWhPlafond" v-model.number="kWhPlafond">
        <label for="kWhPlafondTarief">kWhPlafondTarief</label>
        <input type="text" id="kWhPlafondTarief" name="kWhPlafondTarief" v-model.number="kWhPlafondTarief">
    </section>

    <section class="app-content-block section-kosten">
      <h2 class="app-section__heading">Mijn kosten</h2>
      <label for="gasJaarKosten">gasJaarKosten</label>
      <input type="text" id="gasJaarKosten" name="gasJaarKosten" v-model.number="overzicht.gasJaarKosten" disabled>
      <label for="kWhJaarKosten">kWhJaarKosten</label>
      <input type="text" id="kWhJaarKosten" name="kWhJaarKosten" v-model.number="overzicht.kWhJaarKosten" disabled>
      <label for="jaarKosten">jaarKosten</label>
      <input type="text" id="jaarKosten" name="jaarKosten" v-model.number="overzicht.jaarKosten" disabled>
      <label for="jaarVoorschot">jaarVoorschot</label>
      <input type="text" id="jaarVoorschot" name="jaarVoorschot" v-model.number="overzicht.jaarVoorschot" disabled>
      <label for="jaarVerschil">jaarVerschil</label>
      <input type="text" id="jaarVerschil" name="jaarVerschil" v-model.number="overzicht.jaarVerschil" disabled>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur beatae dolor esse expedita
        iusto mollitia nesciunt quia ut! Accusantium, debitis dolorem harum illo ipsa minus repellat sit totam.</p>
    </section>
    <section class="app-content-block section-verantwoording">
      <h2 class="app-section__heading">Verantwoording en achtergrond</h2>
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
        scenarioFactor, overzicht, scenarioEffectOpStroom
    } = storeToRefs(store)
  
  </script>
  
  <style>

  .app-page__heading {
    font-size: 1.8rem;
    margin-block-end: 0.5em;
  }

  .app-section__heading {
    font-size: 1.6rem;
    font-weight: normal;
    margin-block-end: 0.5em;
  }

  .app-content-block + .app-content-block {
    margin-block-start: 1em;
  }

  .winter-slider {
    display: inline-block;
  }

  .winter-slider h2 {
    font-size: 1.4em;
    font-weight: normal;
  }

  .winter-slider__labels {
    display: flex;
    justify-content: space-around;
  }

  .winter-slider__slider {
    inline-size: 100%;
  }



  .main-content {
    padding: 1rem;

  }

  .section-situatie {
  }

  .section-kosten {
  }

  .section-verantwoording {
  }

  .winter-slider {
  }

  label + input {
    display: block;
  }
  
  </style>
  