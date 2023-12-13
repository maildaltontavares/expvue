<template>
    
    <form  @submit.stop.prevent="submitForm"  >  

        <div>  
            <div class="principal cinzaClaro">
                <p class="card-header text-center" style="font-size: 30px; margin-bottom: 80px; margin-top: 2%;color: blue; font-weight: bold;">Credenciais do usuário</p>
            </div>    
        </div> 


        <div class="flex-container ">    
             <div class="divCentral">     
                <div class="divForm">   

                    <div class="flex-linha">  
                        
                            <div class="row  espacoEntreComponentes"  >  
                                <div class=" text-start">
                                    <label for="sistema" class="col-form-label  label_cabecalho">Sistema</label>
                                    <select class="form-select  padraoCombo" 
                                        ref="sistema"
                                        :disabled="sistemaDesabilitado"   
                                        @blur="buscaByChave" 
                                        v-model="this.codSistema" 
                                        >
                                        <option value=0 disabled>Selecione o sistema</option>
                                        <option v-for="t in this.sistema" :key="t.id" :value="t.id"> {{ t.sigla }} - {{ t.nome }}</option>       
                                            
                                    </select> 
                                </div> 
                            </div>    
                         
                    </div>     




                    <div class="flex-linha"> 
 

                        <div class="row espacoEntreComponentes"  >  
                            <div class=" text-start">
                                <label for="usuario" class="col-form-label  label_cabecalho">Usuário</label>
                                <div class="input-group"> 

                                    <div class="externoCampoConjugado" > 
                                            <div class="frontCampoConjugado"> 
                                                <!--<input type="text" class="texto21 form-control form-control-sm text-center">   -->

                                                <Popper arrow hover class="dark  ">
                                                        
                                                        <template #content v-if="v$.codUsuario.$error">
                                                            <div v-html="apiListaErros(v$.codUsuario.$errors)"></div>
                                                        </template> 
                                                    
                                                        <input type="text" 
                                                            id="usuario"
                                                            class="form-control form-control-sm"
                                                            maxlength="6"
                                                            v-maska  data-maska="######"
                                                            @blur="buscaByChave"
                                                            ref="usuario" 
                                                            :class="{ error: v$.codUsuario.$error}" v-model.lazy="v$.codUsuario.$model" 
                                                            :disabled="codigoDesabilitado"
                                                           > 
                                                                                                              
                                                    </Popper>   

                                            </div> 
                                        
                                            <div class="botaoPesquisa">  
                                                <!-- <button type="button" class="btn btn-sm btn-primary bi-search input-group-append" :disabled="itemDesabilitado"></button> -->
                                                <button type="button" class="btn btn-sm btn-primary bi-search input-group-append" data-bs-toggle="modal"
                                                        data-bs-target="#modalPesquisaUsuario" tabindex="-1"  @click="apiFlushPesquisa" :disabled="codigoDesabilitado">
                                                </button>


                                            </div>          

                                            <!-- 
                                            <div class="backCampoConjugado">   
                                                <input type="text" class="limitadorMedia form-control form-control-sm text-center" disabled > 
                                            </div>   
                                            -->
                                            <div class=" backCampoConjugado ">   
                                                <Popper arrow hover class="dark limitadorMedia "> 

                                                    <template #content v-if="v$.nomeUsuario.$error">
                                                        <div v-html="apiListaErros(v$.nomeUsuario.$errors)"></div>
                                                    </template> 
                                                
                                                    <input type="text" class="form-control form-control-sm"
                                                        :class="{ error: v$.nomeUsuario.$error }" 
                                                        v-model.lazy="v$.nomeUsuario.$model"
                                                        ref="nomeusuario" disabled>   

                                                </Popper>  
                                            </div>   


                                    </div>  

                                </div>
                            </div> 
                         </div>   

                    </div>    <!--  FIM LINHA 0003 -->    

                    <div  class="div-box " style="margin-top:20px">
                          <p>Informe credenciais</p>
                    </div> 

                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="login" class="col-form-label label_cabecalho">Login</label> 
                                        
                            <Popper arrow hover class="dark  " style="margin-bottom:12px;  height:37px;" >
                                
                                <template #content v-if="v$.usuario.login.$error">
                                    <div v-html="apiListaErros(v$.usuario.login.$errors)"></div>
                                </template> 
                            
                                <input type="text"
                                    id="login"
                                    class="form-control form-control-sm text-lowercase   "                                    
                                    style="margin:0px;width:300px;"  
                                    maxlength="20"                                        
                                    ref="login"      
                                                           
                                    :class="{ error: v$.usuario.login.$error}" v-model.trim="v$.usuario.login.$model"
                                > 
                        
                            </Popper>   
                        
                        </div>   

                    </div>    <!--  FIM LINHA 0003 -->    

 

                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="senha" class="col-form-label label_cabecalho">Senha</label> 
                                        
                            <Popper arrow hover class="dark  " style="margin-bottom:12px;  height:37px;" >
                                
                                <template #content v-if="v$.usuario.senha.$error">
                                    <div v-html="apiListaErros(v$.usuario.senha.$errors)"></div>
                                </template> 
                            
                                <input type="password"
                                    id="senha"
                                    class="form-control form-control-sm  "
                                    style="margin:0px;width:250px;"
                                    maxlength="20"                                        
                                    ref="senha"      
                                                        
                                    :class="{ error: v$.usuario.senha.$error}" v-model.trim="v$.usuario.senha.$model"
                                > 

                            </Popper>   

                        </div>   

                    </div>    <!--  FIM LINHA 0003 -->   


                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="senha" class="col-form-label label_cabecalho">Confirma senha</label> 
                                        
                            <Popper arrow hover class="dark  " style="margin-bottom:12px;  height:37px;" >
                                
                                <template #content v-if="v$.confirmaSenha.$error">
                                    <div v-html="apiListaErros(v$.confirmaSenha.$errors)"></div>
                                </template> 
                            
                                <input type="password"
                                    id="confirmaSenha"
                                    class="form-control form-control-sm  "
                                    style="margin:0px;width:250px;"
                                    maxlength="20"                                        
                                    ref="confirmaSenha"      
                                                        
                                    :class="{ error: v$.confirmaSenha.$error}" v-model.trim="v$.confirmaSenha.$model"
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
                <button   type="button"  class="btn btn-sm btn-primary ms-2 me" accesskey="n" @click="exibeModal('cancelaEdicao','Deseja sair da edição?',['S','N'],'sucesso'  )"><u>N</u>ovo</button> 

                <button v-if="tipoOperacao == 'E' || tipoOperacao  == 'A'  " type="button"  accesskey="e" class="btn btn-sm btn-primary ms-2 me"  @click="exibeModal('excluir','Confirma exclusão ?',['S','N'],'aviso'  )"><u>E</u>xcluir
                </button>              

                <button v-if="(tipoOperacao  == 'I' || tipoOperacao  == 'A'  )" type="submit" class="btn btn-sm btn-primary ms-2 me" accesskey="s"><u>S</u>alvar</button>
                <button type="button" class="btn btn-sm btn-secondary ms-2 me" accesskey="p" @click="exibeModal('pesquisar','Deseja sair deste formulário?',['S','N'] ,'sucesso' )"><u>P</u>esquisar</button>

            </div> 

        </div>  


    </form>          
    
  <PesquisaUsuario @setaPesquisa="setaPesquisa($event)"></PesquisaUsuario>
  <SimNao @confirmaAcao="confirmaAcao($event)" :pergunta="simNaoPergunta" :botoes="simNaoBotoes" :tipo="simNaoTipo"></SimNao>    
</template>

<script> 

   import ApiMixin from '@/mixins/ApiMixin'  
   import { mapState } from 'vuex'    
   import useValidate from '@vuelidate/core'
   import { required, helpers } from '@vuelidate/validators'   
   import PesquisaUsuario from '@/requires/PesquisaUsuario'
   import SimNao from '@/requires/SimNao.vue'
   import Popper from 'vue3-popper'
   import ApiMixinSEG from '@/mixins/ApiMixinSEG'

    export default { 
    
        name: 'UsuarioLoginComponent',
        setup: () => (
            { v$: useValidate() }
        ),
        components: { PesquisaUsuario, SimNao, Popper },
        validations: {
            usuario: {
                     
                    //sistema: { required: helpers.withMessage('Informe o sistema', required)} ,  //, $lazy: true  
                    login: { required: helpers.withMessage('Informe o login. Mínimo de 5 caracteres e sem espaços.',  

                                function(val) {

                                    if(!val==''){ 

                                        if (val.includes(" "))  {
                                            return false 
                                        }   

                                        if (val.length<5)  {
                                            return false
                                        }else{

                                            return true
                                        }  




                                    }else{
                                    return false
                                    }

                               }   
                    
                    ) }   ,
                    senha: { required: helpers.withMessage('Informe a senha. Mínimo de 6 caracteres e sem espaços.', 
                    
                    
                    function(val) {

                        if(!val==''){ 

                            if (val.includes(" "))  {
                                return false 
                            }  

                           
                            console.log(val.length)

                            if (val.length<6)  {
                                return false
                            }else{

                                return true
                            }  

                        }else{
                        return false
                        }

                    }                      
                    
                    
                    
                    
                    ) }   
                    
            },
            codUsuario:{ required: helpers.withMessage('Informe o usuario', required) } ,
            confirmaSenha: { required: helpers.withMessage('Senha em branco ou senhas não conferem.', 
        

                function(val) {

                    if(!val==''){ 

                        if( val != this.usuario.senha){
                            return false
                        }else{

                            return true
                        }

                    }else{
                    return false
                    }

                }     
        
            )},   
            nomeUsuario: { required: helpers.withMessage('Nome do usuario nao informado', required) }

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
            ehInclusao : false ,
            simNaoTipo: 'sucesso',
            tipoOperacao:'A', 
            UsuarioTemp: [], 
            nomeUsuario:'',
            confirmaSenha:'',
            sistemaDesabilitado:false,
            codigoDesabilitado:false,
            codSistema:0,
            codUsuario:"",
            
            usuario : {    
                 id:0,                            
                 sistema:'' ,
                 codigo:  '',
                 login: '',
                 senha: ''  
            },    


            usuarioInicial: {               
                 id:0,                            
                 sistema:'' ,
                 codigo:  '',
                 login: '',
                 senha: ''  


            },
            usuarioDAO: [],

            
            sistema :[],
            sistemaTemp:{    
                id: 0,
                sigla: '',
                nome: '',
                tipoLogin: '',
                tipoCodificacaoSenha: '' 
            },                

        }),
        computed: {...mapState(['usuarioSistema']) } ,      

        props: {
            sistemaProps : {
            type: String,
            required: true,
            },
            usuarioProps : {
            type: String,
            required: true,
            },            
            operacao: {
            type : String,
            required: true,
            },
        },  
        methods:{ 

            setaPesquisa(e) {  
             
                
                this.codUsuario =  e.obj.idUsuario;
                this.nomeUsuario=  e.obj.nome; 

            },  
            async submitForm() {   

                    //console.log("submitForm");

                    this.haErros = false
                    this.haSucesso = false  
                    this.mensagemSucesso = ''
                    this.mensagemErro = '' 

                    const isFormCorrect = await this.v$.$validate()   

                    if (isFormCorrect) {
                        let url = `${process.env.VUE_APP_BASE_URL}/usuariologin` 

                        if (this.tipoOperacao=="I") {   

                            this.usuarioDAO =
                                {
                                    "id":null,                            
                                    "idUsuario": this.codUsuario,
                                    "idSistema": this.codSistema,
                                    "login":         this.usuario.login, 
                                    "senha":         this.usuario.senha   

                                }  

                                //console.log("submitForm");
                                //console.log(url);
                                //console.log(this.usuarioDAO);




                                await this.axios.post(
                                    url,
                                    JSON.stringify(this.usuarioDAO),
                                    this.apiTokenHeader({ "Content-Type": "application/json" })
                                )
                                .then(response => {
                                     

                                    this.apiDisplayMensagemSucesso('Usuário inserido com sucesso.' ) 
                                    this.usuario.id = JSON.stringify(response.data);  
                                    this.usuarioDAO.id = this.usuario.id;
                                    this.tipoOperacao = 'A'; 
                                    this.configuraCampos('A' )  ;
                                
                                })
                                .catch(error => {
                                    console.log("Erro: ", error.response.data.message);
                                    //this.haErros = true
                                    //this.mensagemErro = error.response.data.message
                                    this.apiDisplayMensagem(error.response.data.message ) 
                                }); 

                        

                        } else {

                                    if (this.tipoOperacao == 'A'   ) { 
                                       
                                        this.usuarioDAO =
                                            {
                                                "id":        this.usuario.id,                            
                                                "idUsuario": this.codUsuario ,
                                                "idSistema": this.codSistema,
                                                "login":     this.usuario.login, 
                                                "senha":     this.usuario.senha   

                                            } 

                                            console.log('AlteraCAO')
                                            console.log(this.usuarioDAO )


                                            console.log("submitForm");
                                            console.log(url);
                                            console.log(this.usuarioDAO);                                            


                                           
                                            await this.axios.put(
                                                url,
                                                JSON.stringify(this.usuarioDAO),
                                                this.apiTokenHeader({ "Content-Type": "application/json" })
                                            )
                                            .then(response => {  
                                                console.log(response.data); 
                                                this.apiDisplayMensagemSucesso('Usuário alterado com sucesso.' ) 

                                            
                                            })
                                            .catch(error => { 
                                                console.log("Erro: ", error.response.data.message);
                                                //this.haErros = true
                                                //this.mensagemErro = error.response.data.message
                                                this.apiDisplayMensagem(error.response.data.message ) 
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
                    this.ehInclusao = true; 
                    this.erros= '';
                    this.mensagemSucesso= '';
                    this. mensagemErro= ''; 
                    this.haErros= false;      
                    this.haSucesso= false;
                    this.tipoOperacao = 'I';  
                    this.confirmaSenha='';
                    this.configuraCampos('I' )  ;
                    this.nomeUsuario='';
                    this.codUsuario='';
                    

                }  

                },
                configuraCampos(oper ){
 
                    if(oper=='I'){

                        this.sistemaDesabilitado=false;
                        this.codigoDesabilitado=false;
                         

                    }else if(oper=='A' || oper=='E'){
                        this.sistemaDesabilitado=true;
                        this.codigoDesabilitado=true;
                    }    
                 
            },
            async populaForm(){   

                    this.resultado = ""; 
                    let retornoPopForm=false;  
                    let url = `${process.env.VUE_APP_BASE_URL}/usuariologin/usuario/${this.codUsuario}/sistema/${this.codSistema}`;
 
                    console.log(url)  

                    await this.axios.get(url,this.apiTokenHeader())
                    .then(response => {        

                        console.log("PopulaForm");
                        this.resultado = response.data;    

                        if (this.resultado.id != null){
                            this.usuario.id = this.resultado.id ;     
                        
                        }else{
                            this.usuario.id  = "" ;                       
                        }   
  
                        if (this.resultado.login != null){
                            this.usuario.login = this.resultado.login.trim() ;     
                        
                        }else{
                            this.usuario.login  = "" ;                       
                        }     

                        if (this.resultado.idSistema != null){
                            this.usuario.sistema = this.resultado.idSistema ;     
                        
                        }else{
                            this.usuario.sistema  = "" ;                       
                        }    

                        if (this.resultado.senha != null){
                            this.usuario.senha = this.resultado.senha ; 
                            this.confirmaSenha = this.resultado.senha ;     
                        
                        }else{
                            this.usuario.senha  = "" ;    
                            this.confirmaSenha = "" ;
                        }  

 

                        console.log('this.resultado popula');
                        console.log(this.resultado);
                        console.log(this.tipoOperacao);

                        if(this.tipoOperacao == 'I' &&  this.resultado!='' ){  
                            this.tipoOperacao = 'A';   
                        }

                        if(this.resultado==''){
                            //this.mensagemErro =  'Registro não existe. Cadastre-o.'; 
                            //this.haErros = true  
                            this.configuraCampos('I' )  ;
                        }else{

                            this.configuraCampos('A' )  ;

                        }
                        this.apiPesquisaParam('usuarioseg', this.codUsuario, this.usuario) 
                        retornoPopForm = true;

                    })
                    .catch(error => {  
                        
                            console.log("Erro: ", error);
                            //this.mensagemErro = error; 
                            //this.haErros = true ;
                            this.apiDisplayMensagem(error ) 
                            retornoPopForm = false;
                    }  
                    ); 
                    return retornoPopForm;

                },

            async buscaByChave(){ 

                this.haErros = false
                this.haSucesso = false  
                this.mensagemSucesso = ''
                this.mensagemErro = ''                

                if ((this.codUsuario!='' && this.codUsuario!=null)  
                && (this.sistema!=null && this.usuario.nome!='') 
                 ){  
                         const resposta = await this.populaForm();     

                        if (!(resposta === true) ){
                            console.log('Erro de cadastro BuscaChave' );      
                        } 



                } else{ 
 
                        this.apiDisplayMensagem("Informe o sistema e o usuário."   )
                        
                      
                }


            }, 

            confirmaAcao(resposta) {

                this.simNaoRetorno = resposta

                console.log('confirmaAcao');
                console.log(this.simNaoRetorno ); 

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
                        this.$router.push( { name: 'usuariologinpesquisa',params : {sistemaProps : '99'}} )
                        console.log('pesquisa');
                    }
                    
                }

            },             

            async exclusao() { 
                
                /// EXCLUSAO ////

                let url = `${process.env.VUE_APP_BASE_URL}/usuariologin/usuario/${this.codUsuario}/sistema/${this.codSistema}` 
                
                
                if (this.tipoOperacao == 'E' && this.simNaoRetorno == 'S') {  
                        /*
                        await this.axios.delete(
                            url,
                            JSON.stringify(this.usuarioDAO),
                            {
                            headers: { "Content-Type": "application/json" }
                            }
                        )
                        */
                        this.axios.delete(url,this.apiTokenHeader() )
                        .then(response => {
                            this.resetarForm();
                            this.apiDisplayMensagemSucesso('Código ' + response.data  + ' excluido com sucesso.'  )
                        })
                        .catch(error => {
                            console.log("Erro: ", error.response.data.message);
                            //this.haErros = true
                            //this.mensagemErro = error.response.data.message
                            this.apiDisplayMensagem(error.response.data.message ) 
                        }); 

                    }


            },            




            navegarParaLogin(){this.$router.push({name:'login'  })},  
        } , 
    
        async created(){   

            if(this.$store.state.usuarioSistema.empresa=="" || this.$store.state.usuarioSistema.empresa==null){
                this.navegarParaLogin();
            }  
            
            this.populaSistema(); 

            if(this.operacao=='A'){
                this.tipoOperacao = 'A' 
            }else if(this.operacao=='I'){
                this.tipoOperacao = 'I'  
            }else if(this.operacao=='E'){ 
                this.tipoOperacao = 'E'  
            }  

            if(this.tipoOperacao == 'A'  || this.tipoOperacao == 'E' ){         
                this.codUsuario = this.usuarioProps;
                this.codSistema = this.sistemaProps;

                const resposta = await this.populaForm();     

                if (!(resposta === true) ){
                    console.log('Erro de cadastro BuscaChave' );      
                } 
            }  

        },
        mounted(){ 
         
                this.codSistema=this.sistemaProps;  
        } ,
                
    watch: {
       
        codUsuario(newValue) {

               if(newValue!="" && newValue!=null ){
                this.buscaByChave() ; 
               }
               


          }
        }


   }

   </script>

  