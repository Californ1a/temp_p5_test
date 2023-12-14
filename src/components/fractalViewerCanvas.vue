<script setup>
  import p5 from 'p5';
  import { ref, onMounted } from 'vue'
  //const emit = defineEmits(['getCanvas', 'getContext']);
  const emit = defineEmits(['getp5']);
  const props = defineProps({
    resolutionMulti: Number,
    draw: {
      type: Function,
      default: () => {},
    }
  });

  const width = ref(600);
  const height = ref(600);
  //const canvas = ref(null);
  //const context = ref(null);
  const divCanvas = ref(null);

  //one we have successfully mounted to our element, create out p5 object to define its properties, then pass it to our parent
  onMounted(() => {
    //create a p5 object that will be linked to our canvas to render to
    new p5((sketch) => {
      let x = -300;
      let y = -300;

      sketch.setup = () => {
        sketch.createCanvas(600, 600, sketch.WEBGL).parent(divCanvas.value);
        emit('getp5', sketch);
      };

      sketch.draw = () => {
        if (props.draw && typeof props.draw === 'function') {
          props.draw(sketch);
        }
      };
    });


    //context.value = canvas.value.getContext("2d");
    //emit('getCanvas', canvas.value);
    //emit('getContext', context.value);
  })

  function UpdateCanvas(event){
    //update the resolution of the canvas
    //width.value = 600 * resolutionMulti;
    //height.value = 600 * resolutionMulti;

    //update the shader for the fractal to render
    
  }
</script>

<template>
    <!--<canvas ref="canvas" class="fracView_canvas" :width="width" :height="height"></canvas>-->
    <div ref="divCanvas" class="fracView_canvas"></div>
</template>

<style scoped>
.fracView_canvas{
  margin: 0%;
  padding: 0%;
  border: 1px solid #000000;
  height: 600px;
  width: 600px;
}
</style>
