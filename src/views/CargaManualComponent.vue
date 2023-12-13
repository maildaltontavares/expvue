<template>
    
    <form  @submit.stop.prevent="submitForm" @reset.prevent="resetarForm($event)">  

        <div>  
            <div class="principal cinzaClaro" >
                <p class="card-header text-center" style="font-size: 30px; margin-bottom: 80px; margin-top: 2%;color: blue; font-weight: bold;">Painel de Interfaces - TrackOs</p>
            </div>    
        </div> 


        <div class="flex-container " >    
             <div class="divCentral" style=" height: 950px;">     
                <div class="divForm" >    

                    <div class="flex-linha">   
                        <div class="row col-md-12"  >  
                                <div class=" text-start">

                                    <button   type="button"  
                                    style="width: 300px;height: 60px;font-size: 20px;margin-bottom: 20px;margin-right: 30px;"
                                    @click="exibeModal('lerItem','Confirma leitura dos itens ?',['S','N'],'sucesso'  )"
                                    class="btn btn-sm btn-primary ms-2 me" > Ler Itens do TrackOS </button> 


                                    <button   type="button"  
                                    style="width: 400px;height: 60px;font-size: 20px;margin-bottom: 20px;margin-right: 30px;"
                                    @click="exibeModal('AtlzExpViaTrack','Confirma atualização dos itens ?',['S','N'],'sucesso'  )"
                                    class="btn btn-sm btn-primary ms-2 me" > DE-PARA de Item TrackOS->Santana </button> 

                                    <!--
                                    <button   type="button" disabled  
                                    style="width: 450px;height: 60px;font-size: 20px;margin-bottom: 20px;margin-right: 30px;"
                                    @click="exibeModal('lerItem','Confirma leitura dos itens ?',['S','N'],'sucesso'  )"
                                    class="btn btn-sm btn-primary ms-2 me" > Atualizar TrackOS com novos itens do EXP</button> 
                                    -->

                                    <button   type="button"  
                                    style="width: 400px;height: 60px;font-size: 20px;margin-bottom: 20px;margin-right: 30px;"
                                    @click="exibeModal('atualizaEstoque','Confirma atualização do estoque ?',['S','N'],'sucesso'  )"
                                    class="btn btn-sm btn-primary ms-2 me" > Atualizar Estoque TrackOS - Completo</button> 


                                    <button   type="button"  
                                    style="width: 400px;height: 60px;font-size: 20px;margin-bottom: 20px;margin-right: 30px;"
                                    @click="exibeModal('atualizaEstoquePorData','Confirma atualização do estoque ?',['S','N'],'sucesso'  )"
                                    class="btn btn-sm btn-primary ms-2 me" > Atualizar Estoque TrackOS (D-2)</button>                                     


                                    <button   type="button"  
                                    style="width: 300px;height: 60px;font-size: 20px;margin-bottom: 20px;margin-right: 30px;"
                                    @click="exibeModal('cargaAutoEstoque','Confirma alteração no modo da carga de estoque?',['S','N'],'sucesso'  )"
                                    class="btn btn-sm btn-primary ms-2 me" > {{ this.lbCarga}}</button> 


                                </div>  

                                                            
                        </div> 

                         
                  

                    </div>

                    <div class="flex-linha">   
                        <div  class=" text-start" style="max-height: 350px;overflow: auto;">
                            <p style="color:blue;font-size:20px;">LOG de importação</p> 
                        </div>    
                    </div>  

                    <!--- GRID Listar Itens-->
                    <div class="flex-linha" v-if="exibeGridListar">   
                        <div  style="min-width: 100%;min-height: 600px;max-height: 600px;overflow: auto;border-color: black;border: 1px solid black;padding: 10px">
 

                            <table class="table table-sm table-striped tabela">
                                <thead class="cabecalho " style="background-color:#003366;color: white;">
                                    <tr>
                                        <th class="col-1">Cd. Item</th> 
                                        <th class="col-1 text-start">Descrição</th> 
                                        <th class="col-1 text-start">Id TrackOs</th>  
                                        <th class="col-1 text-start">Saldo Estoque</th> 
                                    </tr>
                                </thead>    
                                <tbody> 
                                    
                                            <tr v-for="it in this.aItemTrackOs" :key="it">  
                                            
                                                <td class="col-2 text-start">
                                                    {{ it.codigoItem }}
                                                </td> 

                                                <td class="col-2 text-start">
                                                    {{ it.nome }}
                                                </td> 
                                                
                                                <td class="col-2 text-start">
                                                    {{ it.idTrack }}
                                                </td>  

                                                <td class="col-2 text-start">
                                                    {{ it.saldoEstoque }}
                                                </td>                                                  

                                                

                                                    
                                            </tr>
                                  

                                </tbody>  
                            </table>   
                         
                        </div>    
                    </div>     
                    <!--- Fim GRID Listar Itens-->  
                    
                    <!--- GRID Atualizar Itens-->
                    <div class="flex-linha" v-if="exibeGridAtlzViaTrack">   
                        <div  style="min-width: 100%;min-height: 600px;max-height: 600px;overflow: auto;border-color: black;border: 1px solid black;padding: 10px">
 

                            <table class="table table-sm table-striped tabela">
                                <thead class="cabecalho " style="background-color:#003366;color: white;">
                                    <tr>
                                        <th class="col-1">#</th> 
                                        <th class="col-1">Cd. Item</th> 
                                        <th class="col-1 text-start">Descrição</th> 
                                        <th class="col-1 text-start">Id TrackOs</th>  
                                        <th class="col-1 text-start">Status</th>  
                                    </tr>
                                </thead>    
                                <tbody> 
                                    
                                            <tr v-for="it in this.aItemAtualizaTrackOs" :key="it">  
                                            
                                                <td class="col-2 text-start">
                                                    {{ it.id }}
                                                </td> 

                                                <td class="col-2 text-start">
                                                    {{ it.codigoItem }}
                                                </td> 

                                                <td class="col-2 text-start">
                                                    {{ it.nome }}
                                                </td> 
                                                
                                                <td class="col-2 text-start">
                                                    {{ it.idTrack }}
                                                </td>  

                                                <td class="col-2 text-start">
                                                    {{ it.msg_processamento }}  
                                                </td>                                                      

                                                    
                                            </tr>
                                  

                                </tbody>  
                            </table>   
                         
                        </div>    
                    </div>     
                    <!--- Fim GRID Atualizar Itens-->  

                
                    <!--- GRID Atualizar Estoque-->
                    <div class="flex-linha" v-if="exibeGridAtlzEstoque">   
                        <div  style="min-width: 100%;min-height: 600px;max-height: 600px;overflow: auto;border-color: black;border: 1px solid black;padding: 10px">
 

                            <table class="table table-sm table-striped tabela">
                                <thead class="cabecalho " style="background-color:#003366;color: white;">
                                    <tr>
                                        <th class="col-1">#</th> 
                                        <th class="col-1 text-start">Item SGS</th> 
                                        <th class="col-1 text-start">Descrição</th>  
                                        <th class="col-1 text-start">Sld Anterior Track</th>   
                                        <th class="col-1 text-start">Estoque</th>   
                                        <th class="col-1 text-start">Saldo TrackOS</th>  
                                        <th class="col-1 text-start">Item TrackOS</th>                                          
                                        <th class="col-1 text-start">Dt. Ult. Movto</th>  
                                        <th class="col-1 text-start">Status</th>  

                                    </tr>
                                </thead>    
                                <tbody> 
                                    
                                            <tr  v-for="(item,it) in this.aAtualizaEstoque" :key="it">  
                                            
                                                <td class="col-2 text-start">
                                                    {{ item.id }}
                                                </td> 

                                                <td class="col-2 text-start">
                                                    {{ item.codigo }}
                                                </td>  

                                                <td>
                                                    <span v-if="(item.msg_processamento=='Atualizado')" class="text-success"><b>{{ item.descricao  }}</b></span>
                                                    <span v-else>{{ item.descricao  }}</span>
                                                </td>    


                                                <td class="col-2 text-start">
                                                    {{ item.qtde_sld_ant_trackOS }}
                                                </td>      

                                                <td class="col-2 text-start">
                                                    {{ item.qtde_disponivel }}
                                                </td>   
                                                
                                                <td class="col-2 text-start">
                                                    {{ item.qtde_sld_trackOS }}
                                                </td>  

                                                <td class="col-2 text-start">
                                                    {{ item.idTrackOS }}
                                                </td>     
                                                
                                                <td class="col-2 text-start">
                                                    {{ item.dtUltAlteracao }}
                                                </td>   

                                                <!--
                                                <td   :class="{'text-danger': item.qtde_sld_ant_trackOS > 0, 'text-success':  item.qtde_sld_ant_trackOS==0 }">                                   
                                                    {{ item.msg_processamento }}
                                                </td>  
                                                -->  
                                                <td>
                                                    <span v-if="(item.msg_processamento=='Atualizado')" class="text-success"><b>{{ item.msg_processamento  }}</b></span>
                                                    <span v-else>{{ item.msg_processamento  }}</span>
                                                </td>                                                                     
                                               
                               

                                                    
                                            </tr>
                                  

                                </tbody>  
                            </table>   
                         
                        </div>    
                    </div>     
                    <!--- Fim GRID Atualizar Estoque--->  


                    <div class="flex-linha">
 

                            <div class="row espacoEntreComponentes    " style="width:380px;"> 
                            
                                    <label class="col-form-label label_cabecalho"  style="font-size:20px;">Total itens a Processar</label> 
                                 
                                        <input type="text" 
                                            class="form-control form-control-sm text-uppercase padraoDesc text-center"                                            
                                            v-model="this.totalItensAProcessar"
                                        > 
                                 
                            
                            </div>   

                            <div class="row espacoEntreComponentes    "    > 
                            
                                <label class="col-form-label label_cabecalho" style="font-size:20px;">Total itens Processados</label> 
                                 
                                 <input type="text" 
                                     class="form-control form-control-sm text-uppercase padraoDesc text-center"                                            
                                     v-model="this.totalItensProcessados"
                                 > 
                           
                            
                            </div>    

                            <div class="row espacoEntreComponentes    "    > 
                            
                                <label class="col-form-label label_cabecalho" style="font-size:20px;">Tipo da Carga</label> 
                                
                                <input type="text" disabled style="font-size:20px;"
                                    class="form-control form-control-sm text-uppercase padraoDesc text-center"                                            
                                    v-model="this.tipoCarga"
                                > 
                        
                            
                            </div>                                
                            
                            

                   </div>    





                </div>
                
            </div>
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


        <div class="row rodape "  >

            <div class="col-9 "  >

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

                <button   type="button"  class="btn btn-sm btn-primary ms-2 me" style="width:150px;min-width: 150px;font-size: 16px;" accesskey="n" @click="exibeModal('pararProcessamento','Deseja parar o processamento?',['S','N'],'sucesso'  )">Parar Processamento</button> 
                <button   type="button"  class="btn btn-sm btn-primary ms-2 me" style="width:150px;min-width: 150px;font-size: 16px;" accesskey="n" @click="exibeModal('limparLog','Deseja limpar o log?',['S','N'],'sucesso'  )">Limpar log</button> 

            </div> 

        </div>   


    </form>   
  
  <SimNao @confirmaAcao="confirmaAcao($event)" :pergunta="simNaoPergunta" :botoes="simNaoBotoes" :tipo="simNaoTipo"></SimNao>   

</template>

<script> 

   import ApiMixin from '@/mixins/ApiMixin' 
   import ApiMixinExp from '@/mixins/ApiMixinsExp'   
   import { mapState } from 'vuex'   
   import SimNao from '@/requires/SimNao.vue' 

    export default { 

        name: 'CargaManualComponent',
       
        components: {  SimNao},
          
        
       mixins: [ApiMixin,ApiMixinExp],
 
        data: () => ({
            
            resultado : "",             
            simNaoPergunta: '',
            simNaoBotoes: [],
            simNaoRetorno: '',
            erros: '',
            mensagemSucesso: '',
            mensagemErro : '', 
            haErros: false,      
            haSucesso: false, 
            simNaoTipo: 'sucesso',
            aItemTrackOs:[], 
            itemTrackOsTmp:{    
                nome: 0,
                idTrack: '',
                codigoItem: '' 
              
            },     
            aItemAtualizaTrackOs:[], 
            aAtualizaEstoque:[],
            exibeGridListar:true,        
            exibeGridAtlzViaTrack:false,
            exibeGridAtlzEstoque:false,
            
            totalItensProcessados:0,
            totalItensAProcessar :0,
            cont:0,
            tipoCarga:'Manual',
            lbCarga:'Acionar carga de estoque automatica'
         


        }),
        computed: {...mapState(['usuarioSistema']) } ,      

  
        methods:{ 
          
            
            async confirmaAcao(resposta) { 

                this.simNaoRetorno = resposta 

                if(resposta == 'O'){ 
                    console.log(this.simNaoRetorno ); 
                }


                if(this.simNaoRetorno == 'S') {
                     
                    this.totalItensProcessados = 0;
                    this.totalItensAProcessar =0;


                    if(this.acao == 'cargaAuto')
                    {   
                        this.limparLog();

                        this.exibeGridListar=true;       
                        this.exibeGridAtlzViaTrack=false;        
                        this.exibeGridAtlzEstoque=false;       
                        
                        this.lbCarga='Acionar carga de estoque automatica'
                        this.tipoCarga = 'Manual';
                        clearInterval(this.timer);
                        this.limparLog();                        

                        const leu = await this.cargaAutomaticaBackend();
 
                        if(leu){ 
                            console.log('OK')
                        }

                    }                    
                    

                    if(this.acao == 'lerItem')
                    {   
                        this.limparLog();

                        this.exibeGridListar=true;       
                        this.exibeGridAtlzViaTrack=false;        
                        this.exibeGridAtlzEstoque=false;       
                        
                        this.lbCarga='Acionar carga de estoque automatica'
                        this.tipoCarga = 'Manual';
                        clearInterval(this.timer);
                        this.limparLog();                        

                        const leu = await this.lerItensTrackOS();
 
                        if(leu){ 
                            console.log('OK')
                        }

                    }
                    
                    if(this.acao == 'AtlzExpViaTrack')
                    {   

                        this.exibeGridListar=false;       
                        this.exibeGridAtlzViaTrack=true;  
                        this.exibeGridAtlzEstoque=false;    


                        this.lbCarga='Acionar carga de estoque automatica'                        
                        this.tipoCarga = 'Manual';
                        clearInterval(this.timer);
                        this.limparLog();                        

                        console.log('AtlzExpViaTrack')
                        this.limparLog();
                        const leu = await this.lerItensTrackOS();

                        console.log(leu)
 
                        if(leu){     
                            const atualiza = await this.AtualizaItensViaTrack();

                            if(atualiza)
                            {
                                console.log('OK')  
                            }
                        }    

                    }
                    
                    if(this.acao == 'atualizaEstoque')
                    {   
 

                        this.lbCarga='Acionar carga de estoque automatica'
                        this.tipoCarga = 'Manual';
                        clearInterval(this.timer);
                        this.limparLog();
                        this.acionaEstoque('full') ;
                    }
                    
                    if(this.acao == 'cargaAutoEstoque'){

                        if(this.tipoCarga=='Manual'){
                            this.lbCarga='Cancela carga estoque automatica'
                            
                            this.tipoCarga = 'Automatica';
                            this.iniciarTimer()
                        }else{

                            this.lbCarga='Acionar carga de estoque automatica'
                            this.tipoCarga = 'Manual';
                            this.limparLog();
                            clearInterval(this.timer);                            

                        }
                        
                    
                    }  


                    if(this.acao == 'atualizaEstoquePorData')
                    {    

                        this.lbCarga='Acionar carga de estoque automatica'
                        this.tipoCarga = 'Manual';
                        clearInterval(this.timer);
                        this.limparLog();
                        this.acionaEstoque('PorData') ;
                    }
/*                    
                    if(this.acao == 'cargaAutoEstoque'){

                        if(this.tipoCarga=='Manual'){
                            this.lbCarga='Cancela carga estoque automatica' 
                            this.tipoCarga = 'Automatica';
                            this.iniciarTimer()
                        }else{

                            this.lbCarga='Acionar carga de estoque automatica'
                            this.tipoCarga = 'Manual';
                            this.limparLog();
                            clearInterval(this.timer);                            

                        } 
                    
                    }   
*/                    
                    if(this.acao == 'pararProcessamento')
                    { 
                        console.log('pararProcessamento')
                        this.$store.state.pararProcessamento= true;
                        this.lbCarga='Acionar carga de estoque automatica'
                        this.tipoCarga = 'Manual';     
                        clearInterval(this.timer);                   
                        this.limparLog();

                    } 
                    
                    if(this.acao == 'limparLog')
                    { 
                        this.$store.state.pararProcessamento= true;
                        this.lbCarga='Acionar carga de estoque automatica'
                        this.tipoCarga = 'Manual';     
                        clearInterval(this.timer);                   
                        this.limparLog();
                        
                    }
                    
                    
                    }

                }
              ,   
            
              async acionaEstoque(pTipo) {

                this.exibeGridListar=false;       
                this.exibeGridAtlzViaTrack=false;  
                this.exibeGridAtlzEstoque=true;    

                this.aAtualizaEstoque=[];

                console.log('AtlzEstoque')
                this.limparLog();
                const atlzEstoque = await this.atualizaEstoqueTrackOS(pTipo);

                //console.log(atlzEstoque)

               if(atlzEstoque){                                 
                    console.log('OK')                              
                } 

                return 'ok'


            }  ,
            limparLog(){
 
                this.aItemTrackOs=[]; 
                this.aItemAtualizaTrackOs=[];
                this.aAtualizaEstoque=[];
                this.totalItensProcessados = 0;
                this.totalItensAProcessar = 0;
                //this.tipoCarga = 'Manual';
                //clearInterval(this.timer);

            }
            ,
            navegarParaLogin(){this.$router.push({name:'login'  })}   ,
            
            iniciarTimer() {
                 this.tipoCarga = 'Automatica';
                 this.lbCarga='Cancela carga estoque automatica'
                 this.acionaEstoque('PorData') ; // Executa imediatamente a primeira vez
                 this.timer = setInterval(this.acionaEstoque,  30 * 60 * 1000); // A cada 5 minutos (5 * 60 * 1000 milissegundos)
            },

          
        } , 
        beforeUnmount() {
            console.log('Sair Painel Interface') 
            clearInterval(this.timer); // Limpa o intervalo quando o componente está prestes a ser destruído
        }
            


   }

   </script>s

<style scoped>

    .text-danger {
    color: red; /* Define a cor vermelha para valores negativos */
    }

    .text-success {
    color: green; /* Define a cor verde para valores não negativos */
    } 

</style>

  