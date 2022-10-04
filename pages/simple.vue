<template>
  <main class="main-content">
    <h1 class="app-page__heading">Joep rekent met je mee</h1>
    <p>Joep is een groene optimist die goed is met cijfers. Hij kan je helpen uit te rekenen of je maandelijkse betaling aan je energieleverancier genoeg is om de kosten te dekken.</p>
    <p>Om Joep aan het werk te zetten heb je gegevens nodig over je gas- en stroomverbruik van vorig jaar. Die vind je op de jaarafrekening van je energieleverancier. Je moet ook weten wat je nu betaalt voor een kubieke meter gas en voor een kilowattuur elektriciteit. Ook die bedragen vind je bij je energieleverancier.</p>
    <div class="sections-container">
      <section class="app-content-block section-gegevens">
        <h2 class="app-section__heading">Mijn gegevens</h2>

        <label for="gasJaarVerbruik">Gasverbruik per jaar in kubieke meter (m3)</label>
        <input type="number" step="1" id="gasJaarVerbruik" name="gasJaarVerbruik" v-model.number="gasJaarVerbruik" :class="{warning: validate.negatiefGasVerbruik}">
        <label for="gasJaarTarief">Prijs van 1 m3 gas (totale leveringsprijs)</label>
        <input type="number" step="0.1" id="gasJaarTarief" name="gasJaarTarief" v-model.number="gasJaarTarief" :class="{warning: validate.negatiefGasTarief}">

        <label for="kWhJaarVerbruik">Elektriciteitsverbruik per jaar in kWh</label>
        <input type="number" step="1" id="kWhJaarVerbruik" name="kWhJaarVerbruik" v-model.number="kWhJaarVerbruik" :class="{warning: validate.negatiefkWhVerbruik}">
        <label for="kWhJaarTarief">Prijs van 1 kWh elektriciteit (totale leveringsprijs)</label>
        <input type="number" step="0.1" id="kWhJaarTarief" name="kWhJaarTarief" v-model.number="kWhJaarTarief" :class="{warning: validate.negatiefkWhTarief}">

        <small class="toelichting">Heb je zonnepanelen? Dan kun je ook invullen hoeveel je hebt teruggeleverd en welke vergoeding je per kilowattuur krijgt.  </small>
        <label for="kWhJaarTerugLeveringToggle">
          <input type="checkbox" id="kWhJaarTerugLeveringToggle" v-model="kWhJaarTerugLeveringToggle">
          Ik heb zonnepanelen
        </label>

        <template v-if="kWhJaarTerugLeveringToggle">
          <label for="kWhJaarTeruglevering">Teruglevering per jaar in kWh</label>
          <input type="number" step="1" id="kWhJaarTeruglevering" name="kWhJaarTeruglevering" v-model.number="kWhJaarTeruglevering" :class="{warning: validate.negatiefkWhTeruglevering}">
          <label for="kWhJaarTerugleververgoeding">Terugleververgoeding</label>
          <input type="number" step="0.1" id="kWhJaarTerugleververgoeding" name="kWhJaarTerugleververgoeding" v-model.number="kWhJaarTerugleververgoeding" :class="{warning: validate.negatiefkWhTerugleververgoeding}">
        </template>

        <h3 class="app-section__heading-sub">Het voorschot</h3>
        <label for="voorschotPerMaand">Welk bedrag betaal je nu per maand?</label>
        <input type="number" step="1" id="voorschotPerMaand" name="voorschotPerMaand" v-model.number="voorschotPerMaand" :class="{warning: validate.negatiefVoorschot}">
      </section>

      <section class="app-content-block section-situatie">
        <h2 class="app-section__heading">Mijn situatie</h2>
        <p>Met de instellingen in dit deel stem je je verwachte gas- en elektriciteitsverbruik af op jouw situatie.</p>
        <div class="app-container winter-slider">
          <h3 class="app-section__heading-sub">Het is kouder/warmer dan gemiddeld</h3>
          <small class="toelichting">Een zeer koude winter kost 30% meer energie. Een warmere winter scheelt 20% energie.</small>
          <div class="winter-slider__labels">
            <label>
              kouder
            </label>
            <label>
              warmer
            </label>
          </div>
          <input class="winter-slider__slider" type="range" min="-0.4" max="0.2" step="0.01" v-model.number="scenarioFactor">
        </div>
        <h3 class="app-section__heading-sub">Je hebt (ook) elektrische verwarming</h3>
        <small class="toelichting">Warmtepompen, airco's en zware elektrische kachels gebruiken veel stroom. Je hebt minder gas nodig, maar gebruikt veel meer elektriciteit.</small>
        <label for="">
        <input type="checkbox" v-model="scenarioEffectOpStroom">
          Ik gebruik (ook) stroom om te verwarmen</label>
        <label for="gasScenarioJaarVerbruik">Bijgesteld gasverbruik</label>
        <input type="text" id="gasScenarioJaarVerbruik" name="gasScenarioJaarVerbruik" v-model.number="overzicht.gasScenarioJaarVerbruik" disabled>
        <label v-if="scenarioEffectOpStroom" for="kWhScenarioJaarVerbruik">Bijgesteld elektriciteitsverbruik</label>
        <input v-if="scenarioEffectOpStroom" type="text" id="kWhScenarioJaarVerbruik" name="kWhScenarioJaarVerbruik" v-model.number="overzicht.kWhScenarioJaarVerbruik" disabled>
      </section>
      <section class="app-content-block section-kosten">
        <h2 class="app-section__heading">Het prijsplafond</h2>
        <small class="toelichting">De gegevens van de overheid zijn al ingevuld, maar je kunt ze aanpassen.</small>
        <label for="gasPlafond">Aantal kubieke meter gas in het prijsplafond</label>
        <input type="text" id="gasPlafond" name="gasPlafond" v-model.number="gasPlafond">
        <label for="gasPlafondTarief">Gastarief in het prijsplafond</label>
        <input type="text" id="gasPlafondTarief" name="gasPlafondTarief" v-model.number="gasPlafondTarief">
        <label for="kWhPlafond">Aantal kilowattuur elektriciteit in het prijsplafond</label>
        <input type="text" id="kWhPlafond" name="kWhPlafond" v-model.number="kWhPlafond">
        <label for="kWhPlafondTarief">Elektriciteitstarief in het prijsplafond</label>
        <input type="text" id="kWhPlafondTarief" name="kWhPlafondTarief" v-model.number="kWhPlafondTarief">
        <button type="button">Herstel het prijsplafond</button>
  <!--    </section>-->

  <!--    <section class="app-content-block section-kosten">-->
        <h2 class="app-section__heading">Mijn jaarlijkse kosten</h2>
        <label for="gasJaarKosten">Kosten voor gas</label>
        <input type="text" id="gasJaarKosten" name="gasJaarKosten" v-model.number="overzicht.gasJaarKosten" disabled>
        <label for="kWhJaarKosten">Kosten voor elektriciteit</label>
        <input type="text" id="kWhJaarKosten" name="kWhJaarKosten" v-model.number="overzicht.kWhJaarKosten" disabled>
        <label for="jaarKosten">Totale kosten</label>
        <input type="text" id="jaarKosten" name="jaarKosten" v-model.number="overzicht.jaarKosten" disabled>
        <label for="jaarVoorschot">Betaald voorschot</label>
        <input type="text" id="jaarVoorschot" name="jaarVoorschot" v-model.number="overzicht.jaarVoorschot" disabled>
        <label for="jaarVerschil">
          <span v-if="overzicht.jaarVerschil < 0">Je hebt waarschijnlijk te veel betaald</span>
          <span v-if="overzicht.jaarVerschil > 0">Je hebt waarschijnlijk te weinig betaald</span>
          <span v-if="overzicht.jaarVerschil === 0">Je voorschot komt waarschijnlijk overeen met je gebruik</span>
        </label>
        <input type="text" id="jaarVerschil" name="jaarVerschil" v-model.number="overzicht.jaarVerschil" disabled>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur beatae dolor esse expedita
          iusto mollitia nesciunt quia ut! Accusantium, debitis dolorem harum illo ipsa minus repellat sit totam.
        </p>
      </section>

      <section class="app-content-block section-verantwoording">
        <h2 class="app-section__heading">Verantwoording en achtergrond</h2>
        <ul>
          <li>
            <NuxtLink to="/verantwoording">Verantwoording</NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
  
  <script setup>
  
  import { useSimpleComputationStore } from '~~/simple-store'
  import { storeToRefs } from 'pinia';
  
    const store = useSimpleComputationStore()
    const { 
        gasPlafond, gasPlafondTarief, gasJaarVerbruik, gasJaarTarief,
        kWhPlafond, kWhPlafondTarief, kWhJaarVerbruik, kWhJaarTarief,
        kWhJaarTeruglevering, kWhJaarTerugleververgoeding, kWhJaarTerugLeveringToggle,
        voorschotPerMaand, 
        scenarioFactor, scenarioEffectOpStroom, 
        overzicht, validate
    } = storeToRefs(store)
  
  </script>
  
  <style src="./simple.vue.scss" lang="scss" scoped>
  </style>
  