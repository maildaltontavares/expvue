<template>
 
     

     <div>  
            <div class="principal cinzaClaro">
                <p class="card-header text-center" style="font-size: 30px; margin-bottom: 80px; margin-top: 2%;color: blue; font-weight: bold;">Usuários</p>
            </div>    
    </div>   

    <div class="flex-container ">  

          <div class=" text-start flex-element"> 
          
              <input type="text" id= "PesqTipoMaterial"   @keypress.enter="apiPesquisaCRUDByFilial('usuarioseg','nome',nomePesquisa)" ref="nomePesquisa" class="form-control form-control-sm campoPesquisaMinWidth  text-uppercase" v-model="nomePesquisa" placeholder="Informe o nome do usuário" >
              <button type="button" class="btn btn-primary"    @click="apiPesquisaCRUDByFilial('usuarioseg','nome',nomePesquisa)"><i class="bi bi-search input-group-append"></i></button>                
          
          </div>   

      </div>  
 

    <div class="container-fluid">
      <table class="table table-sm table-striped tabela">
        <thead class="cabecalho " style="background-color:#003366;color: white;">
            <tr>
              <th class="col-1">COD</th>
                <th class="col-4 text-start">NOME</th>
                <th class="col-4 text-start">EMAIL</th>              
                <th class="col-3 text-start">OPER</th>  
                 
            </tr>
        </thead> 

        <tbody>
             <template v-if="apiDisplayedDadosCRUD">
          
              <tr v-for="(i,indice) in apiDisplayedDadosCRUD" :key="indice">  
             
                <td class="col-2 text-start">
                  {{ i.idUsuario}}
                </td> 
     
                <td class="col-2 text-start">
                     {{ i.nome }}
                </td>

                <td class="col-2 text-start">
                     {{ i.email}}
                </td>                

            
                 <th class="col-1">
                   <router-link :to="{ name: 'usuario' , params: { codigoProps : i.idUsuario,operacao:'A'}}">                                        
                       <img src="@/assets/icon_editar.gif" alt="Editar" class="botao EspacoEntreBotoes" height="30">
                    </router-link>  

                   <!--
                   <router-link :to="{ name: 'usuario' , params: { codigoProps : i.idUsuario,operacao:'E'}}">                                        
                       <img src="@/assets/icon_deletar.gif" alt="Excluir" class="botao EspacoEntreBotoes">
                    </router-link>  
                    -->
                </th> 
             
            </tr>
          </template> 

        </tbody> 
          
      </table> 

      
    </div>

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

    <div style="height:80px">   <!--   Libera espaco da barra de botoes no mobile-->
 
    </div>    



    <div class="row msg_rodape" v-if="this.$store.state.tipoDispositivo == 'tablet' ||  this.$store.state.tipoDispositivo== 'mobile'" style="margin-bottom:50px" >

        <div class="col-12">
            <p v-if="haErros" class="mensagem mensagem_erro">
                {{ mensagemErro }}
            </p>
            <p v-if="haSucesso" class="mensagem mensagem_sucesso">
                {{ mensagemSucesso }}
            </p>
        </div>


    </div>         

    <div class="row rodape">  


          <div class="col-9"> 

                <p v-if="msgProcessamento != ''" class=" mensagem mensagem_processando" style="font-size: 16px;">
                    {{ msgProcessamento }}
                </p>  

                <p v-if="haErros && this.$store.state.tipoDispositivo == 'desktop'" class="mensagem mensagem_erro">
                    {{ mensagemErro }}
                </p>
                <p v-if="haSucesso && this.$store.state.tipoDispositivo == 'desktop'"  class="mensagem mensagem_sucesso">
                    {{ mensagemSucesso }}
                </p>


          </div> 



             
            <div class="div_rodape d-flex justify-content-end">
              <button type="button" class="btn btn-sm btn-primary ms-2 me" accesskey="n" @click="NavegarParaInclusao"> <u>N</u>ovo </button>  
            </div>   
    </div>    


  </template> 
  
  <script>

  import ApiMixin from '@/mixins/ApiMixin' 
  import { mapState } from 'vuex'
  export default {
    name: 'UsuarioPesquisaComponent',
    mixins: [ApiMixin],
    data: () => ({
      resultPesquisaCRUD : []  
    
    }),
    computed: mapState(['usuarioSistema']),
    methods: {

      NavegarParaInclusao( ){ 
        this.$router.push({name:'usuario'   , params : { codigoProps :' ' , operacao : 'I' }} ) 
      },
     setaPesquisaCRUD(pCursor) {  
            this.resultPesquisaCRUD = pCursor   

        } ,

        navegarParaLogin(){this.$router.push({name:'login'  })}   
        } , 
    
        async created(){   
       
       console.log('');
  
    }

    ,
  mounted(){ 
     this.$refs.nomePesquisa.focus();     
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

  .barraPesquisa1{
    padding: 10px;
    background-color: rgb(56, 17, 230);
    margin-top: 20px;
    margin-bottom: 20px;
    display: inline;
    

  }

  .flex-container{
     display: flex;
     flex-wrap:wrap;
     flex-direction: row;
     justify-content: center;
     

  }
   .flex-element-topo{ 
    margin-left: 40%;
    display: inline-flex;
    margin-top:10px; 
    justify-content: center;
    
  }

 
  .flex-element{
  
    width:40%;
    display: inline-flex;
    margin-top:15px;
    margin-bottom: 25px;
    justify-self: center;

  }
 


  .EspacoEntreBotoes{
    margin-right: 15px;
  }
 

</style>

  