<script setup>
  import { ref } from 'vue';
  import { updateDescriptionText } from '../updateDescriptionText.js';
  import FractalCanvas from './fractalViewerCanvas.vue';
  import FractalProperties from './ctrlPanelFracProperties.vue'
  import ctrlPanelGeneral from './ctrlPanelGeneral.vue';
  
  const emit = defineEmits(['descText']);

  const ctrlPanelViews = {
    canvasA: 1,
    canvasB: 2,
    general: 3
  }

  //initialize ctrl panel property view to general
  let ctrlPanelCurrentView = ref(ctrlPanelViews.general);

  //store canvas data
  /*const canvasA = ref(null);
  const contextA = ref(null);
  const canvasB = ref(null);
  const contextB = ref(null);*/
  //store p5 data
  const firstCanvasDraw = ref(null);
  const secondCanvasDraw = ref(null);

  //store general ctrl panel values
  const iteration = ref(null);
  const resolution = ref(null);
  const boundary = ref(null);

  //functions
  function switchCtrlPanelViews(value){
    ctrlPanelCurrentView.value = value;
  }

  function changeCanvasA(fn) {
    firstCanvasDraw.value = fn;
  }

  function changeCanvasB(fn) {
    secondCanvasDraw.value = fn;
  }
</script>

<template>
    <div id="viewFrac_main">
      <table id="viewFrac_table">
        <tr>
          <td class="center-text">Panel A</td>
          <td class="center-text">Panel B</td>
          <td class="center-text">Control Panel</td>
        </tr>
        <tr style="margin-bottom: 0px">
          <td id="viewFrac_statusBarA"></td>
          <td id="viewFrac_statusBarB"></td>
        </tr>
        <tr>
          <td><FractalCanvas :draw="firstCanvasDraw" :resolutionMulti="resolution" id="viewFrac_A"/></td>
          <td><FractalCanvas :draw="secondCanvasDraw" :resolutionMulti="resolution" id="viewFrac_B"/></td>
          <td>
            <table id="viewFrac_ctrlPanel">
              <tr id="viewFrac_ctrlPanelButtonRow">
                <td><input @mouseover="emit('descText', updateDescriptionText('View properties for the fractal to render in panel A'))" @mouseleave="emit('descText', updateDescriptionText(''))" @click="switchCtrlPanelViews(ctrlPanelViews.canvasA)" :class="{viewFrac_ctrlButton_active : ctrlPanelCurrentView == ctrlPanelViews.canvasA}" class="viewFrac_ctrlButton" type="button" value="A" /></td>
                <td><input @mouseover="emit('descText', updateDescriptionText('View properties for the fractal to render in panel B'))" @mouseleave="emit('descText', updateDescriptionText(''))" @click="switchCtrlPanelViews(ctrlPanelViews.canvasB)" :class="{viewFrac_ctrlButton_active : ctrlPanelCurrentView == ctrlPanelViews.canvasB}" class="viewFrac_ctrlButton" type="button" value="B" /></td>
                <td><input @mouseover="emit('descText', updateDescriptionText('View general properties that apply to all panels'))" @mouseleave="emit('descText', updateDescriptionText(''))" @click="switchCtrlPanelViews(ctrlPanelViews.general)" :class="{viewFrac_ctrlButton_active : ctrlPanelCurrentView == ctrlPanelViews.general}" class="viewFrac_ctrlButton" type="button" value="G" /></td>
              </tr>
              <tr id="viewFrac_options">
                <td v-show="ctrlPanelCurrentView === ctrlPanelViews.canvasA"><FractalProperties @descText="emit('descText', $event)" @changeCanvas="changeCanvasA" :iterationNum="iteration" :boundaryNum="boundary" /></td>
                <td v-show="ctrlPanelCurrentView === ctrlPanelViews.canvasB"><FractalProperties @descText="emit('descText', $event)" @changeCanvas="changeCanvasB" :iterationNum="iteration" :boundaryNum="boundary" /></td>
                <td v-show="ctrlPanelCurrentView === ctrlPanelViews.general"><ctrlPanelGeneral @descText="emit('descText', $event)" @iterationNum="(msg) => iteration = msg" @resolutionNum="(msg) => resolution = msg" @boundaryNum="(msg) => boundary = msg" /></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
</template>

<style scoped>
  .center-text{
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
  }

  .viewFrac_ctrlButton{
    min-width: 42px;
    min-height: 42px;
    font-weight: bold;
    font-size: 18px;
    border: none;
  }

  .viewFrac_ctrlButton:hover{
    background-color: #AAAAAA;
    color: #000000;
  }

  .viewFrac_ctrlButton_active{
    background-color: #555555;
    color: #DDDDDD;
  }

  .viewFrac_ctrlButton_active:hover{
    background-color: #333333;
    color: #DDDDDD;
  }

  #viewFrac_main{
    width: 1625px;
    height: 650px;
    position: relative;
    left: -12rem;
  }

  #viewFrac_ctrlPanel{
    font-weight: bold;
	  width: 400px;
    border: 1px solid #000000;
  }

  #viewFrac_ctrlPanelButtonRow{
    float: left;
    width: 100%;
    border-bottom: 1px solid #000000;
  }

  #viewFrac_options{
    height: 550px;
    vertical-align: top;
  }
</style>