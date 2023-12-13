<template>
    
    <form  @submit.stop.prevent="submitForm"  >  

        <div>  
            <div class="principal cinzaClaro">
                <p class="card-header text-center" style="font-size: 30px; margin-bottom: 80px; margin-top: 2%;color: blue; font-weight: bold;">Troca de senha</p>
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
                                        disabled 
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
                                                        
                                                        <template #content v-if="v$.usuario.codigo.$error">
                                                            <div v-html="apiListaErros(v$.usuario.codigo.$errors)"></div>
                                                        </template> 
                                                    
                                                        <input type="text" 
                                                            id="usuario"
                                                            class="form-control form-control-sm"
                                                            maxlength="6"
                                                            v-maska  data-maska="######"
                                                            @blur="buscaByChave"
                                                            ref="usuario" 
                                                            :class="{ error: v$.usuario.codigo.$error}" v-model.lazy="v$.usuario.codigo.$model" 
                                                            disabled 
                                                           > 
                                                                                                              
                                                    </Popper>   

                                            </div> 
                                        
                                            <div class="botaoPesquisa">  
                                                <!-- <button type="button" class="btn btn-sm btn-primary bi-search input-group-append" :disabled="itemDesabilitado"></button> -->
                                                <button type="button" class="btn btn-sm btn-primary bi-search input-group-append" data-bs-toggle="modal"
                                                        data-bs-target="#modalPesquisaUsuario" tabindex="-1"  @click="apiFlushPesquisa" disabled >
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


                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="login" class="col-form-label label_cabecalho">Login</label> 
                                        
                            <Popper arrow hover class="dark  " style="margin-bottom:12px;  height:37px;" >
                                
                                <template #content v-if="v$.usuario.login.$error">
                                    <div v-html="apiListaErros(v$.usuario.login.$errors)"></div>
                                </template> 
                            
                                <input type="text"
                                    id="login"
                                    class="form-control form-control-sm    "
                                    style="margin:0px;width:300px;"
                                    maxlength="20"                                        
                                    ref="login"      
                                    disabled                
                                    :class="{ error: v$.usuario.login.$error}" v-model.trim="v$.usuario.login.$model"
                                > 
                        
                            </Popper>   
                        
                        </div>   

                    </div>    <!--  FIM LINHA 0003 -->    

                    <div  class="div-box " style="margin-top:20px">
                          <p>Redefina sua senha</p>
                    </div>                     

 
                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="senha" class="col-form-label label_cabecalho">Senha Atual</label> 
                                        
                            <Popper arrow hover class="dark  " style="margin-bottom:12px;  height:37px;" >
                                
                                <template #content v-if="v$.senhaAtual.$error">
                                    <div v-html="apiListaErros(v$.senhaAtual.$errors)"></div>
                                </template> 
                            
                                <input type="password"
                                    id="senhaAtual"
                                    class="form-control form-control-sm  "
                                    style="margin:0px;width:250px;"
                                    maxlength="20"                                        
                                    ref="senhaAtual"      
                                    :disabled="senhaAtualDisabled"                    
                                    :class="{ error: v$.senhaAtual.$error}" v-model.trim="v$.senhaAtual.$model"
                                > 

                            </Popper>   

                        </div>   

                    </div>    <!--  FIM LINHA 0003 -->    
                              
                          

                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="senha" class="col-form-label label_cabecalho">Nova senha</label> 
                                        
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
                                    :disabled="senhaDisabled"               
                                    :class="{ error: v$.usuario.senha.$error}" v-model.trim="v$.usuario.senha.$model"
                                > 

                            </Popper>   

                        </div>   

                    </div>    <!--  FIM LINHA 0003 -->   


                    <div class="flex-linha">   


                        <div class="row espacoEntreComponentes    "   > 
                            
                            <label for="senha" class="col-form-label label_cabecalho">Confirma nova senha</label> 
                                        
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
                                    :disabled="confirmaSenhaDisabled"                         
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
                    <p v-if="haErros && this.$store.state.tipoDispositivo == 'desktop'" class="mensagem mensagem_erro">
                        {{ mensagemErro }}
                    </p>
                    <p v-if="haSucesso && this.$store.state.tipoDispositivo == 'desktop'"  class="mensagem mensagem_sucesso">
                        {{ mensagemSucesso }}
                    </p>
                </div> 

            <div class="col-3 div_rodape d-flex justify-content-end">
                    
                    <button v-if="senhaAlterada"         type="button"  class="btn btn-sm btn-primary ms-2 me" accesskey="n" @click="navegarParaLogin"><u>N</u>ovo login</button> 
                    <button v-if="senhaAlterada==false"  type="submit" class="btn btn-sm btn-primary ms-2 me" accesskey="s"><u>S</u>alvar</button>
                    

            </div> 

        </div>  


    </form>          
     
</template>

<script> 

   import ApiMixin from '@/mixins/ApiMixin'  
   import { mapState } from 'vuex'    
   import useValidate from '@vuelidate/core'
   import { required, helpers } from '@vuelidate/validators'   
 
 
   import Popper from 'vue3-popper'
   import ApiMixinSEG from '@/mixins/ApiMixinSEG'

    export default { 
    
        name: 'TrocarSenhaComponent',
        setup: () => (
            { v$: useValidate() }
        ),
        components: {   Popper },
        validations: {
            usuario: {
                     
                    //sistema: { required: helpers.withMessage('Informe o sistema', required)} ,  //, $lazy: true 
                    codigo: { required: helpers.withMessage('Informe o usuario', required) } ,
                    login: { required: helpers.withMessage('Informe o login', required) }   ,
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

                    ) }  ,
                },

            senhaAtual: { required: helpers.withMessage('Informe a senha atual', required) }  ,
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
            erros: '',
            mensagemSucesso: '',
            mensagemErro : '', 
            haErros: false,      
            haSucesso: false, 
           
            UsuarioTemp: [], 
            nomeUsuario:'',
            confirmaSenha:'', 
            codSistema:0,
            senhaAtual:"",

            senhaAtualDisabled:false,
            senhaDisabled:false,
            confirmaSenhaDisabled:false,
            
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
            senhaAlterada:false,

            
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
            } 
          
        },  
        methods:{ 

            setaPesquisa(e) {  
             
                this.usuario.codigo=  e.obj.idUsuario;
                this.nomeUsuario=  e.obj.nome; 

            }, 
            navegarParaLogin(){this.$router.push({name:'login'  })}, 
            async submitForm() {   

                    //console.log("submitForm");

                    this.haErros = false
                    this.haSucesso = false  
                    this.mensagemSucesso = ''
                    this.mensagemErro = '' 

                    const isFormCorrect = await this.v$.$validate()   

                    if (isFormCorrect) {
                        let url = `${process.env.VUE_APP_BASE_URL}/usuariologin/trocarsenha`   
 
                                
                        this.usuarioDAO =
                            {
                                "id":        this.usuario.id,                            
                                "idUsuario": this.usuario.codigo ,
                                "idSistema": this.codSistema,
                                "login":     this.usuario.login, 
                                "senha":     this.usuario.senha   ,
                                "senhaAnterior": this.senhaAtual

                            }  

                            console.log(this.usuarioDAO)
                            await this.axios.post(
                                url,
                                JSON.stringify(this.usuarioDAO),
                                this.apiTokenHeader({ "Content-Type": "application/json" })
                            )
                            .then(response => {  
                                
                                console.log(response.data)
                                this.senhaAlterada=true;
                                this.senhaAtualDisabled=true;
                                this.senhaDisabled=true;
                                this.confirmaSenhaDisabled=true;
                                this.apiDisplayMensagemSucesso('Senha alterada com sucesso.' ) 
                            
                            })
                            .catch(error => {     
                                //if(process.env.VUE_APP_TOKEN == 'true')
                                   this.apiDisplayMensagem(error.response.data ) 
                                //else{
                                //    this.apiDisplayMensagem(error.response.data ) 
                                //}   


                            });
                        

                                

                    } else {
                            return
                    }

           },

 
            async populaForm(){   

                    this.resultado = ""; 
                    let retornoPopForm=false; 
                    let url = `${process.env.VUE_APP_BASE_URL}/usuariologin/usuario/${this.usuario.codigo}/sistema/${this.codSistema}`;
 
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

                        this.apiPesquisaParam('usuarioseg', this.usuario.codigo, this.usuario) 
                        retornoPopForm = true;                        

                    })
                    .catch(error => {  
                        
                            console.log("Erro: ", error);
                            //this.mensagemErro = error; 
                            //this.haErros = true ;  
                            this.apiDisplayMensagem(error.response.data ) 
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

                if ((this.usuario.codigo!='' && this.usuario.codigo!=null)  
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


        } ,

        async created(){  

            
            this.populaSistema();  
            this.usuario.codigo = this.usuarioProps;
            this.codSistema = this.sistemaProps;

            const resposta = await this.populaForm();     

            if (!(resposta === true) ){
                console.log('Erro de cadastro BuscaChave' );      
            } 

            if(this.$store.state.usuarioSistema.empresa=="" || this.$store.state.usuarioSistema.empresa==null){
                this.navegarParaLogin();
            }
           

       },
       


   }

   </script>

  