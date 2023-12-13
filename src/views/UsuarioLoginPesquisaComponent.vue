<template>
    
    <div>  
           <div class="principal cinzaClaro">
               <p class="card-header text-center" style="font-size: 30px; margin-bottom: 80px; margin-top: 2%;color: blue; font-weight: bold;">Credenciais</p>
           </div>    
   </div>    
     
   <div class="flex-linha backPesquisa" style="justify-content: center;width:100%; padding: 10px;"> 
   
                        
        <div class="row    "  style="width:350px;margin-bottom: 5px;margin-right:4%"   > 
            <div class=" text-start">
                <label for="sistema" class="col-form-label  label_cabecalho">Sistema</label>
                <select class="form-select  padraoCombo" 
                    ref="tpusuario"  
                    :disabled="usuarioDesabilitado"   
                    v-model="this.usuarioParams.idSistema" 
                    style="margin:0px;width:350px"    
                    >
                    <option value=0 disabled>Selecione o sistema</option>
                    <option v-for="t in this.sistema" :key="t.id" :value="t.id"> {{ t.sigla }} - {{ t.nome }}</option>       
                        
                </select> 
            </div> 
        </div>   


        <div class="row    "  style="width:280px;margin-bottom: 5px;margin-right:4%"   > 
            <div class=" text-start">                                         
                <label for="nomeUsuario" class="col-form-label label_cabecalho">Nome do usuário</label>              
                <input type="text"
                    id="nomeUsuario"
                    class="form-control form-control-sm  text-center  padraoCombo"
                    style="margin:0px;width:280px"                                                                     
                    ref="nomeUsuario"
                    maxlength="40" 
                
                    v-model.lazy="this.usuarioParams.nomeUsuario" 
                    
                >  
            </div>
        </div>    

        <div class="row    "  style="width:280px;margin-bottom: 5px;margin-right:4%"   > 
            <div class=" text-start">                                         
                <label for="login" class="col-form-label label_cabecalho">Login</label>              
                <input type="text"
                    id="login"
                    class="form-control form-control-sm  text-center  padraoCombo"
                    style="margin:0px;width:280px"                                                                     
                    ref="login"
                    maxlength="40" 
                
                    v-model.lazy="this.usuarioParams.login" 
                    
                >  
            </div>
        </div>            

 

        <div class="row  "   style="margin-right:25px;" >  
                
            <button type="button" class="btn btn-primary"
                style="margin-top: 25px; height:53px;width:145px;"
                @click="pesquisaDados"
                >
                <i class="bi bi-search input-group-append"  >   Pesquisar</i>
           </button>                
            
        </div>   

    </div>
    
     


   <div class="container-fluid">
     <table class="table table-sm table-striped tabela">
       <thead class="cabecalho " style="background-color:#003366;color: white;">
           <tr>
             <th class="col-1">SISTEMA</th> 
               <th class="col-1 text-start">USUARIO</th> 
               <th class="col-1 text-start">LOGIN</th> 
               <th class="col-1 text-start">OPER</th> 
               
                
           </tr>
       </thead>   


       <tbody>
            <template v-if="apiDisplayedDadosCRUD">
         
                <tr v-for="(i,indice) in apiDisplayedDadosCRUD" :key="indice">  
                
                    <td class="col-2 text-start">
                            {{i.sigla}} - {{ i.desc_sistema }}
                    </td> 

                    <td class="col-2 text-start">
                           {{ i.nome_usu }} (id:2{{ i.id_usu }} )
                    </td> 
                    
                    <td class="col-2 text-start">
                            {{ i.login }}
                    </td>                        
 
            
                    <template  v-if="this.sistemaProps=='99'">
                        <th class="col-2">
                            <router-link :to="{name:'usuarioLogin' , params : {sistemaProps :i.sistema , usuarioProps :i.id_usu  , operacao : 'A' }}">                                        
                                <img src="@/assets/icon_editar.gif" alt="Editar" class="botao EspacoEntreBotoes" height="30">
                            </router-link>  

                            <!--
                            <router-link :to="{name:'usuarioLogin' , params : {sistemaProps :i.sistema , usuarioProps :i.id_usu  , operacao : 'E' }}">                                        
                                <img src="@/assets/icon_deletar.gif" alt="Excluir" class="botao EspacoEntreBotoes">
                            </router-link>  
                            -->
                        </th> 
                    </template>    

                          
                </tr>
          </template> 

       </tbody> 
        
    
    </table> 

     
   </div>
 
   <div class="mt-4" v-if="exibePaginador">
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

        <div class="col-3 div_rodape d-flex justify-content-end">
            <button type="button"  class="btn btn-sm btn-primary ms-2 me" style="width:150px;min-width: 150px;" @click="resetaCampos" accesskey="l"><u>L</u>impar pesquisa</button>
            <button type="button" class="btn btn-sm btn-primary ms-2 me" accesskey="n" @click="NavegarParaInclusao"> <u>N</u>ovo </button>  
        </div> 

  </div>     

          
    
   
    
    
</template>

<script> 

import ApiMixin from '@/mixins/ApiMixin' 
 import { mapState } from 'vuex'
import ApiMixinSEG from '@/mixins/ApiMixinSEG';

 export default {
        
        name: 'UsuarioLoginPesquisaComponent',
        mixins: [ApiMixin,ApiMixinSEG],


        props: {
             
            sistemaProps: {
            type : String,
            required: true,
            },            
        },  

        
        data: () => ({ 
            erros: '',
            mensagemSucesso: '',
            mensagemErro : '', 
            haErros: false,      
            haSucesso: false,    
            exibePaginador:false,        
            resultPesquisaCRUD : [] ,
            resultadoPesquisa:[], 
            usuarioParams: { 
                idSistema:0   ,
                nomeUsuario:'',
                login:'' 

            },            
            usuario: [], 
            usuarioDao:{
                idSistema:0   ,
                nomeUsuario:'',
                login:''  
                
            },
            usuarioTemp: {    
                 codigo:'' ,
                 nome:  '' , 
            }, 

            usuarioDesabilitado:false ,
            sistema :[],
            sistemaTemp:{    
                id: 0,
                sigla: '',
                nome: '',
                tipoLogin: '',
                tipoCodificacaoSenha: '' 
            }  
          
        }),
        computed: mapState(['usuarioSistema']),
        methods: { 
            NavegarParaInclusao( ){ 
                this.$router.push({name:'usuarioLogin' , params : {sistemaProps : '2' , usuarioProps: '0',operacao : 'I' }} )  
            },
            setaPesquisaCRUD(pCursor) {  

                  console.log('setaPesquisaCRUD') 
                  console.log(pCursor   ) 
                  this.resultPesquisaCRUD = pCursor     
                  
                      
            } ,
            resetaCampos() {  

                //console.log('Resetar');
                 
                this.usuarioParams.idSistema = 0 ;
                this.usuarioParams.nomeUsuario = '' ;
                this.usuarioParams.login = '' ; 

                this.resultPesquisaCRUD = [];
                this.exibePaginador = false;
                    

            }  ,   
             
              
        pesquisaDados(){    

            console.log('pesquisaDados')
            console.log(this.usuarioParams )

            let periodoPreenchido = true; 

            if (   (this.usuarioParams.idSistema == null || this.usuarioParams.idSistema == "" )
                && (this.usuarioParams.nomeUsuario == null || this.usuarioParams.nomeUsuario == "" )
                && (this.usuarioParams.login == null || this.usuarioParams.login == "" )
            ){
                this.apiDisplayMensagem('Informe pelo menos um parametro.')
                periodoPreenchido  = false;
             }    

            if(periodoPreenchido) {
                this.haErros = false
                this.exibePaginador = true;
                this.apiPesquisaCRUDByFilial('usuariologin','nomeUsuario',  this.usuarioParams )
            }
            
        },
        navegarParaLogin(){this.$router.push({name:'login'  })},  
        } , 
        async created(){   

            if(this.$store.state.usuarioSistema.empresa=="" || this.$store.state.usuarioSistema.empresa==null){
                this.navegarParaLogin();
            } 
           
            this.populaSistema(); 
            this.resetaCampos(); 

       }, 
        
        mounted(){ 
 
            this.resetaCampos();  
            
            if(this.sistemaProps!="99"){
                this.usuario.idSistema= this.sistemaProps; 
                //this.usuarioDesabilitado = true;
                
            }else{
               // this.usuarioDesabilitado = false;
            }           

            
            
                    
               
        } 
 
 }
   </script>

<style scoped>

.botaoPesquisa {
     background-image:url("@/assets/icon_pesquisa.gif");
     
 
}

.backPesquisa{
    background-color: lightgrey ;
}

 .tituloPesquisa {
   font-size: 10px;
 }
 
  

</style>

 
 