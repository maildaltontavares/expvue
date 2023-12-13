<template>
  <!-- Modal Pesquisa Usuario-->
  <div class="modal fade" id="modalPesquisaUsuario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelUsuario" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #003366; color:white; font-weight: bold;">
            <label class="tituloPesquisa fs-5" id="staticBackdropLabelUsuario">Pesquisa de usuarios</label>
        </div>
        <div class="modal-body" >
          <div class="mb-3">
              <div class="col-md-12 input-group">
                  <input type="text" class="form-control form-control-sm" @blur="apiPesquisaNome('usuarioseg','nome',nomePesquisa,1)" v-model.lazy="nomePesquisa" placeholder="Informe o nome do usuario">
                  <button type="button" class="btn btn-primary" @click="apiPesquisaNome('usuarioseg','nome',nomePesquisa,1)"><i class="bi bi-search input-group-append"></i></button>
              </div>
          </div>
          <div class="mb-1" style="height: 60%;  overflow-y: auto;">
            <table class="table table-striped table-bordered table-sm">
              <thead>
                <tr class="cabecalhoPesquisa">
                  <th scope="col" class="text-center" width="10%">Código</th>
                  <th scope="col" class="text-center" width="90%">Descrição</th>
                </tr>
              </thead>
                <tbody class="detalhePesquisa">
                    <template v-if="msgProcessamento == '' && nomePesquisa != '' && resultPesquisa.length == 0">
                        <tr style="height: 200px; vertical-align: middle;">
                        <td colspan="2" class="text-center"><label style="font-weight: bold; font-size: 14px; color:#003366">Pesquisa Sem Resultados</label></td>
                        </tr>
                    </template>
                    <template v-if="msgProcessamento != ''">
                        <tr style="height: 200px; vertical-align: middle;">
                        <td colspan="2" class="mensagem_processando text-center"><label style="font-weight: bold; font-size: 14px; color:#003366">{{ msgProcessamento}}</label></td>
                        </tr>
                    </template>
                    <template v-else>
                    <tr v-for="c in apiDisplayedDados" :key="c">
                        <th scope="row" class="text-center" style="color: blue; cursor: pointer;" @click="setaPesquisa({ tipo: 'usuario',obj: c})" data-bs-dismiss="modal">{{ c.idUsuario }}</th>
                        <td class="text-start">{{ c.nome }}</td>
                    </tr>
                    </template>
                </tbody>
            </table>
            <div class="mt-4">
              <nav aria-label="Page navigation example">
                <ul class="pagination pagination-sm justify-content-center">
                  <li class="page-item">
                    <button type="button" class="page-link" v-if="page != 1" @click="page--"> Anterior </button>
                  </li>
                  <li class="page-item" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber">
                    <button type="button" class="page-link" @click="page = pageNumber"> {{pageNumber}} </button>
                  </li>
                  <li class="page-item">
                    <button type="button" class="page-link" v-if="page < pages.length" @click="page++"> Próxima </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end divBotao">
            <p v-if="haErros" class="mensagem mensagem_erro text-center mt-2">
                {{ mensagemErro }}
            </p>
            <button type="button" id="btnCloseModal" class="btn btn-secondary btn-sm botaoFechar" @click="fecharModal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import ApiMixin from '@/mixins/ApiMixin';

    $('#modalPesquisaUsuario').on('shown', function () {
        alert("aqui");
    })

    export default {
        name: 'PesquisaUsuario',
        mixins: [ApiMixin],
        data: () => ({
            haErros : false,
            mensagemErro: '',
        }),
        methods:{
            setaPesquisa(evento) {
                this.nomePesquisa = ''
                this.resultPesquisa = []
                this.pages = []
                this.$emit('setaPesquisa',evento)
            },
            fecharModal() {
                this.nomePesquisa = ''
                this.resultPesquisa = []
                this.pages = []
                $('#modalPesquisaUsuario').modal('hide');
            },
        },
        watch: {
            haErros(newValue) {
                if(newValue) {
                    this.apiDisplayMensagem('Informe pelo menos um valor para pesquisa')
                }
            }
        }
    }
</script>

<style scoped>

  .tituloPesquisa {
    font-size: 10px;
  }

  .cabecalhoPesquisa {
    font-size: 12px;
    color: white;
    font-weight: bold;
    background-color: #003366;
    border-radius: 5px;
  }
  .detalhePesquisa {
    font-size: 12px;
    height: 300px;
  }

  .divBotao {
    height: 45px;
    background-color: #003366;
    color:white;
    font-weight: bold;
  }

  .botaoFechar {
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 8px;
  }

</style>
