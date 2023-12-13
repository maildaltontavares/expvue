<template>
    
    <form  @submit.stop.prevent="submitForm" @reset.prevent="resetarForm($event)">  

        <div>  
            <div class="principal cinzaClaro">
                <p class="card-header text-center" style="font-size: 30px; margin-bottom: 80px; margin-top: 2%;color: blue; font-weight: bold;">Usuários</p>
            </div>    
        </div> 


        <div class="flex-container ">    
             <div class="divCentral">     
                <div class="divForm">    


                    <div class="row col-md-12"  >  
                            <div class=" text-start">
                                <label for="codigoUsuario" class="col-form-label  label_cabecalho">Código</label>
                                <div class="input-group">
                                    <div class="col-md-1">
                                        <input   id="codigoUsuario" 
                                        ref="codigoUsuario"  
                                        @blur="buscaByChave"
                                        :disabled="usuarioCodigoDesabilitado"        
                                        class="form-control form-control-sm text-center" v-model ="usuario.codigo"  >  
                                    </div> 
                                </div>
                            </div> 
                    </div> 

                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="nome" class="col-form-label label_cabecalho">Nome</label> 
                                        
                            <Popper arrow hover class="dark  " style="margin-bottom:12px;  height:37px;" >
                                
                                <template #content v-if="v$.usuario.nome.$error">
                                    <div v-html="apiListaErros(v$.usuario.nome.$errors)"></div>
                                </template> 
                            
                                <input type="text"
                                    id="nome"
                                    class="form-control form-control-sm  "
                                    style="margin:0px;"
                                    maxlength="80"                                        
                                    ref="nome"      
                                                        
                                    :class="{ error: v$.usuario.nome.$error}" v-model.trim="v$.usuario.nome.$model"
                                > 

                            </Popper>   

                        </div>   

                    </div>    <!--  FIM LINHA 0003 -->   


                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="nome" class="col-form-label label_cabecalho">E-mail</label> 
                                        
                            <Popper arrow hover class="dark  " style="margin-bottom:12px;  height:37px;" >
                                
                                <template #content v-if="v$.usuario.email.$error">
                                    <div v-html="apiListaErros(v$.usuario.email.$errors)"></div>
                                </template> 
                            
                                <input type="email"
                                    id="email"
                                    class="form-control form-control-sm  "
                                    style="margin:0px;"
                                    maxlength="100"                                        
                                    ref="email"      
                                                        
                                    :class="{ error: v$.usuario.email.$error}" v-model.trim="v$.usuario.email.$model"
                                > 

                            </Popper>   

                        </div>   

                    </div>    <!--  FIM LINHA 0003 -->   

  
                    
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
                <p v-if="haErros && this.$store.state.tipoDispositivo == 'desktop'" class="mensagem mensagem_erro">
                    {{ mensagemErro }}
                </p>
                <p v-if="haSucesso && this.$store.state.tipoDispositivo == 'desktop'"  class="mensagem mensagem_sucesso">
                    {{ mensagemSucesso }}
                </p>
            </div> 

            <div class="col-3 div_rodape d-flex justify-content-end">

                <button   type="button"  class="btn btn-sm btn-primary ms-2 me" accesskey="n" @click="exibeModal('cancelaEdicao','Deseja sair da edição?',['S','N'],'sucesso'  )"><u>N</u>ovo</button> 

                <button v-if="tipoOperacao == 'E' || tipoOperacao  == 'A'  " type="button"  accesskey="e" class="btn btn-sm btn-primary ms-2 me"  @click="exibeModal('excluir','Confirma exclusão ?',['S','N'],'aviso'  )"><u>E</u>xcluir
                </button>              

                <button v-if="(tipoOperacao  == 'I' || tipoOperacao  == 'A'  )" type="submit" class="btn btn-sm btn-primary ms-2 me" accesskey="s"><u>S</u>alvar</button>
                <button type="button" class="btn btn-sm btn-secondary ms-2 me" accesskey="p" @click="exibeModal('pesquisar','Deseja sair deste formulário?',['S','N'] ,'sucesso' )"><u>P</u>esquisar</button>

            </div> 

        </div>   


    </form>   
  
  <SimNao @confirmaAcao="confirmaAcao($event)" :pergunta="simNaoPergunta" :botoes="simNaoBotoes" :tipo="simNaoTipo"></SimNao>   

</template>

<script> 

   import ApiMixin from '@/mixins/ApiMixin'  
   import { mapState } from 'vuex'    
   import useValidate from '@vuelidate/core'
   import { required, helpers } from '@vuelidate/validators'   

   import SimNao from '@/requires/SimNao.vue'
   import Popper from 'vue3-popper'
   import ApiMixinSEG from '@/mixins/ApiMixinSEG'

    export default {


            //   components: {    Popper },
        name: 'UsuarioComponent',
        setup: () => (
            { v$: useValidate() }
        ),
        components: {  SimNao, Popper },
        validations: {
            usuario: { 
                    
                    ///codigo: { required: helpers.withMessage('Informe o usuario', required) } , 
                    nome: { required: helpers.withMessage('Informe a nome', required) } ,  
                    email: { required: helpers.withMessage('Informe o email', required)}  

            } 

        },   
        props: {  
            codigoProps : {
            type: String,
            required: true,
            },                   
            operacao: {
            type : String,
            required: true,
            },
        },          
       mixins: [ApiMixin,ApiMixinSEG],
 
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
            tipoOperacao:'A', 
            UsuarioTemp: [],  
            
            usuario : {    
                 codigo:  '',
                 nome: ''  ,
                 filial: '',
                 email : ''
                 
            },    

            usuarioInicial : {    
                 codigo:  '',
                 nome: ''  ,
                 filial: '',
                 email : ''
                 
            },  
            usuarioCodigoDesabilitado:false              
            
                            

        }),
        computed: {...mapState(['usuarioSistema']) } ,      

  
        methods:{ 
          
            async submitForm() {   

                    //console.log("submitForm");

                    this.haErros = false
                    this.haSucesso = false  
                    this.mensagemSucesso = ''
                    this.mensagemErro = '' 

                    const isFormCorrect = await this.v$.$validate()     

                    if (isFormCorrect) {
                        let url = `${process.env.VUE_APP_BASE_URL}/usuarioseg` 

                        if (this.tipoOperacao=="I") {   

                            this.usuarioDAO =
                                {
                                    "idUsuario":null,                            
                                    "filial": '',
                                    "nome": this.usuario.nome,
                                    "email": this.usuario.email  

                                }   
                                await this.axios.post(
                                    url,
                                    JSON.stringify(this.usuarioDAO),
                                    this.apiTokenHeader({ "Content-Type": "application/json" })
                                )
                                .then(response => {

                                    this.apiDisplayMensagemSucesso('Código ' + response.data  + ' inserido com sucesso.' ) 
                                    this.usuario.codigo= JSON.stringify(response.data);   
                                    this.tipoOperacao = 'A'; 
                                    this.configuraCampos('A' )  ;
                                
                                })
                                .catch(error => {
                                    console.log("Erro: ", error.response.data);
                                    //this.haErros = true
                                    //this.mensagemErro = error.response.data
                                    this.apiDisplayMensagem(error.response.data ) 
                                });  

                        } else {

                                    if (this.tipoOperacao == 'A'   ) { 
                                       
                                            this.usuarioDAO =
                                            {
                                                "idUsuario": this.usuario.codigo,                          
                                                "filial": '',
                                                "nome": this.usuario.nome,
                                                "email": this.usuario.email  

                                            }   

                                            //console.log(this.usuarioDAO);
                                           
                                            await this.axios.put(
                                                url,
                                                JSON.stringify(this.usuarioDAO),
                                                this.apiTokenHeader({ "Content-Type": "application/json" })
                                            )
                                            .then(response => {  
                                             
                                                this.apiDisplayMensagemSucesso('Código ' + response.data  + ' alterado com sucesso.' ) 

                                            
                                            })
                                            .catch(error => { 
                                                console.log("Erro: ", error.response.data);
                                                //this.haErros = true
                                                //this.mensagemErro = error.response.data
                                                this.apiDisplayMensagem(error.response.data ) 
                                            });
                                    }  

                                }

                    } else {
                            return
                    }
 
            },
            resetarForm(){

                //console.log('')  

                if(this.simNaoRetorno == 'S'){

                    this.usuario = Object.assign({},this.usuarioInicial); 
                    this.v$.$reset(); 
                    this.erros= '';
                    this.mensagemSucesso= '';
                    this.mensagemErro= ''; 
                    this.haErros= false;      
                    this.haSucesso= false;
                    this.tipoOperacao = 'I';    
                    this.configuraCampos('I' )  ; 
                    this.usuario.codigo='';
                    this.$refs.codigoUsuario.focus();  
                    

                }  

            },
            configuraCampos(oper ){
 
                if(oper=='I'){ 
                    this.usuarioCodigoDesabilitado=false; 
                    this.$refs.codigoUsuario.focus();   

                }else if(oper=='A' || oper=='E'){
                    this.usuarioCodigoDesabilitado=true;
                    this.$refs.nome.focus();   
                }    

            },
            async populaForm(){   

                
                console.log("PopulaForm"); 
                
                this.resultado = ""; 
                let retornoPopForm=false;   
                let url = `${process.env.VUE_APP_BASE_URL}/usuarioseg/usuario/${this.usuario.codigo}`;

                
                console.log(url)  
                 if (this.usuario.codigo  !='' && this.usuario.codigo!=null && this.usuario.codigo  !=' '    )  {
              
                    await this.axios.get(url,this.apiTokenHeader())
                    .then(response => {        

                        //console.log("PopulaForm");
                        this.resultado = response.data;     
                        this.usuario.idfil = ''; 

                        if (this.resultado.nome != null){
                            this.usuario.nome = this.resultado.nome ;     
                        
                        }else{
                            this.usuario.nome  = "" ;                       
                        }    

                        if (this.resultado.email != null){
                            this.usuario.email = this.resultado.email ;     
                        
                        }else{
                            this.usuario.email  = "" ;                       
                        }    

                        console.log('this.resultado popula');
                        console.log(this.resultado);
                        //console.log(this.tipoOperacao);

                        if(this.tipoOperacao == 'I' &&  this.resultado!='' ){  
                            this.tipoOperacao = 'A';   
                            this.configuraCampos('A' )  ;
                        }

                        if(this.resultado==''){
                            //this.mensagemErro =  'Registro não existe. Cadastre-o.'; 
                            //this.haErros = true  
                            this.configuraCampos('I' )  ;
                           
                            this.apiDisplayMensagem('Código não encontrado. Para inserir novo usuario deixe o campo código vazio.')
                            this.usuario.codigo = ''
                           
                            this.$refs.codigoUsuario.focus();  
                            
                            
                            
                        }else{

                            this.configuraCampos('A' )  ;
                            this.$refs.nome.focus();  

                        }

                        retornoPopForm = true;
                
                    })
                    .catch(error => {  
                        
                            console.log("Erro: ", error);
                            this.mensagemErro = error; 
                            this.haErros = true ;
                            retornoPopForm = false;
                    }  
                    ); 
               }

              return retornoPopForm;

            },
            
            async buscaByChave(){ 


                    console.log("buscaByChave");


                    this.haErros = false
                    this.haSucesso = false  
                    this.mensagemSucesso = ''
                    this.mensagemErro = ''                
 
                    if (this.usuario.codigo!='' && this.usuario.codigo!=null && this.usuario.codigo!=' ' )
                    {   
                            const resposta = await this.populaForm();     

                            if (!(resposta === true) ){
                                ///this.apiDisplayMensagem("Para novo usuário deixe o campo código em branco."   )  
                                console.log('Erro de cadastro BuscaChave' );      
                            }   
                    
                    } 

                     

            },   

            confirmaAcao(resposta) {

                this.simNaoRetorno = resposta 

                if(resposta == 'O'){ 
                    console.log(this.simNaoRetorno ); 
                }


                if(this.simNaoRetorno == 'S') {
                    if(this.acao == 'excluir'){
                        this.tipoOperacao = 'E';
                        this.exclusao();
                    }else if(this.acao == 'cancelaEdicao')
                    {
                        this.resetarForm();
                    }
                    else if(this.acao == 'pesquisar')
                    {
                        this.$router.push( { name: 'usuariopesquisa' } )
                     
                    }
                    
                }

            },               

            async exclusao() { 

                    /// EXCLUSAO ////

                    let url = `${process.env.VUE_APP_BASE_URL}/usuarioseg/usuario/${this.usuario.codigo}`  

                    if (this.tipoOperacao == 'E' && this.simNaoRetorno == 'S') {  

                            //await this.axios.delete(
                            //    url,
                            //    JSON.stringify(this.usuarioDAO),
                            //    this.apiTokenHeader({ "Content-Type": "application/json" })
                            //)
                            this.axios.delete(url,this.apiTokenHeader() )
                            .then(response => {
                                this.resetarForm();
                                this.apiDisplayMensagemSucesso('Código ' + response.data  + ' excluido com sucesso.'  )
                            })
                            .catch(error => {
                                console.log("Erro: ", error.response.data);
                                //this.haErros = true
                               // this.mensagemErro = error.response.data
                                this.apiDisplayMensagem(error.response.data ) 
                            }); 

                    }


            },

        navegarParaLogin(){this.$router.push({name:'login'  })}   
        } , 

        async created(){    

                if(this.$store.state.usuarioSistema.empresa=="" || this.$store.state.usuarioSistema.empresa==null){
                    this.navegarParaLogin();
                } 

                if(this.operacao=='A'){
                    this.tipoOperacao = 'A' 
                }else if(this.operacao=='I'){
                    this.tipoOperacao = 'I'  
                }else if(this.operacao=='E'){
                    this.tipoOperacao = 'E'  
                }  

                //console.log("created");
                //console.log(this.operacao);

                if(this.tipoOperacao == 'A'  || this.tipoOperacao == 'E' ){         
                    this.usuario.codigo=this.codigoProps;  

                    const resposta = await this.populaForm();     

                    if (!(resposta === true) ){
                        console.log('Erro de cadastro BuscaChave' );      
                    } 
               }  

                },
        mounted(){ 

            this.usuario.codigo=this.codigoProps; 
            if(this.tipoOperacao == 'A'  || this.tipoOperacao == 'E' ){  
                this.$refs.nome.focus();   
            } else{ 
                this.$refs.codigoUsuario.focus();   
            }  

            
        } ,


   }

   </script>

  