<template>
  <!-- Modal Sim ou Não-->
  <div class="modal" id="modalSimNao" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelSimNao" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-center" :class="tipo">
            <label class="tituloPergunta" id="staticBackdropLabelSimNao">{{ pergunta }}</label>
        </div>
        <div class="modal-body d-flex justify-content-around">
          <button type="button" v-if="botoes.includes('S')" class="btn btn-primary btn-md ms-3" @click="confirmaAcao('S')" data-bs-dismiss="modal"><label class="tituloPergunta">Sim</label></button>
          <button type="button" v-if="botoes.includes('N')" class="btn btn-secondary btn-md me-3" @click="confirmaAcao('N')" data-bs-dismiss="modal"><label class="tituloPergunta">Não</label></button>
          <button type="button" v-if="botoes.includes('C')" class="btn btn-secondary btn-md me-3" @click="confirmaAcao('C')" data-bs-dismiss="modal"><label class="tituloPergunta">Cancela</label></button>
          <button type="button" v-if="botoes.includes('O')" class="btn btn-secondary btn-md me-3" @click="confirmaAcao('O')" data-bs-dismiss="modal"><label class="tituloPergunta">OK</label></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SimNao',
    props: {
      pergunta : {
        type: String,
        required: true,
      },
      botoes : {
        type: Array,        // S-SIM / N-NÂO / O-OK / C-CANCEL
        required: true,
      },
      tipo : {
        type: String,        // sucesso / aviso / erro
        required: true,
      },
    },
    methods: {
      confirmaAcao(resposta) {
        this.$emit('confirmaAcao',resposta)
      },
    },
  }
</script>

<style scoped>

    .tituloPergunta {
        font-size: 14px;
    }

    .sucesso {
        background-color: #003366;
        color:white;
        font-weight: bold;
    }
    .aviso {
        background-color: #CCCC00;
        color:white;
        font-weight: bold;
    }
    .erro {
        background-color: #CC0000;
        color:white;
        font-weight: bold;
    }

</style>
