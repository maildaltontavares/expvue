<template>
    <div >
      <div class="row topoLogin d-flex align-items-center">
        <div class="col-2 d-flex justify-content-start"> 
          <label>EXP</label>
        </div>
        <div class="col-8  justify-content-center">
          <label>Santana Têxtil S/A.</label>
        </div>
      </div>
      <div class="row corpoLogin"  >
          <!--<div class="col-6 offset-3">-->
        <div class="col-6 " :style="{marginLeft:  marginLeftLogin ,
                                    width:tamanhoLogin }"> 


          <div class="card "   >
            <p class="card-header text-center" style="font-size: 20px; color: blue; font-weight: bold;">Login</p>
            <div class="card-body" style="background-color: #E0E0E0;height:270px">
  
              <div class="mb-3 d-flex justify-content-center">
                <Popper arrow hover class="dark">
                  <template #content v-if="v$.idfil.$error">
                    <div v-html="apiListaErros(v$.idfil.$errors)"></div>
                  </template> 

                  <select
                    class="form-select justify-content-center" style="width:330px"
                    :class="{ error: v$.idfil.$error }"
                    v-model.lazy="v$.idfil.$model">
                    <option value="" disabled>--Selecione a empresa</option>
                    <option v-for="e in empresas" :key="e.idfil" :value="e.idfil"   >{{ e.idfil }} - {{ e.nome }}</option>
                  </select>
                </Popper>
              </div>
  
              <div class="mb-3 form-group d-flex justify-content-center">
                <Popper arrow hover class="dark">
                  <template #content v-if="v$.codigo.$error">
                    <div v-html="apiListaErros(v$.codigo.$errors)"></div>
                  </template>
                  <input
                    type="text"
                    id="codigo"
                    class="form-control text-center"
                    :class="{ error: v$.codigo.$error }"
                    placeholder="Código"
                    v-model.lazy="v$.codigo.$model">
                </Popper>
              </div>
  
              <div class="mb-3 d-flex justify-content-center">
                <Popper arrow hover class="dark">
                  <template #content v-if="v$.senha.$error">
                    <div v-html="apiListaErros(v$.senha.$errors)"></div>
                  </template>
                  <input
                    type="password"
                    id="senha"
                    class="form-control text-center"
                    :class="{ error: v$.senha.$error }"
                    placeholder="Senha"
                    v-model.lazy="v$.senha.$model">
                </Popper>
              </div> 


              <div class="mb-3 d-flex justify-content-center">
                <button class="btn btn-primary" @click="populaParametros">Acessar</button>
                <p v-if="erros.length > 0" class="alert alert-danger mt-3" style="line-height: 3px" role="alert">
                  {{ erros }}
                </p>  
              </div>


              <div class="d-flex justify-content-center" style="font-size: 9px;" >
                 <p>Versao 1.00.01</p>
              </div>                

              <div class="col-9" style="margin-left: 8%;">
                    <p v-if="haErros" class="mensagem mensagem_erro">
                        {{ mensagemErro }}
                    </p>
                    <p v-if="haSucesso" class="mensagem mensagem_sucesso">
                        {{ mensagemSucesso }}
                    </p>
              </div>  

            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ApiMixin from '@/mixins/ApiMixin'
  import useValidate from '@vuelidate/core'
  import { required, helpers } from '@vuelidate/validators' 
  
  export default {
    name: 'LoginComponent',
    mixins: [ApiMixin],
    setup: () => (
      { v$: useValidate() }
    ),
    data: () => ({
      idfil: '01',
      codigo: '',
      senha: '',
      erros: '',
      mensagemSucesso: '',
      mensagemErro : '', 
      haErros: false,      
      haSucesso: false,
      tamanhoLogin:'',
      marginLeftLogin:'',
      token:'',
      resultado:'',
      headerReq:{},
      usuarioDAO:[],
      empresas: [
        { "idfil": "01", "nome": "SANTANA HORIZONTE" },
        { "idfil": "03", "nome": "NORTEX" },
        { "idfil": "20", "nome": "NOVA TECELAGEM DO AGRESTE" },
        { "idfil": "05", "nome": "ARGENTINA" },
      ],
    }),
    validations: {
      idfil: { required: helpers.withMessage('Informe a Empresa', required), $lazy: true },
      codigo: { required: helpers.withMessage('Informe o Código do Usuário', required), $lazy: true },
      senha: { required: helpers.withMessage('Informe a Senha do Usuário', required), $lazy: true },
    },
    methods: {

      async populaParametros(){ 
           
           const logou = await this.validaLogin();
 
           if(logou){     

                   this.navegarPara()   
           } 
     },
      async validaLogin() { 
        
        
        //Reseta as permissões ja dadas
        let retorno = false;
        this.$store.state.permissoesUsuario ='';
        let url;


        if(process.env.VUE_APP_TOKEN == 'true') { 
             url = `${process.env.VUE_APP_BASE_URL}/login`;
        }else{
             url = `${process.env.VUE_APP_BASE_URL}/usuariologin/login`;
        }  
        
         

        const isFormCorrect = this.v$.$validate()
        if (isFormCorrect) {
           
           //console.log( url )
           let login = this.codigo.replace(/\s/g, ""); 

 
           this.usuarioDAO =  { 
            "id":0,
            "senha": this.senha,
            "idSistema": process.env.VUE_APP_ID_SISTEMA,
            "login": login,
            "idfil":this.idfil

          } 
          //console.log( this.usuarioDAO)
          //console.log( url)
          

           await this.axios.post(url,this.usuarioDAO
           ,this.apiTokenHeader( {
            'Access-Control-Expose-Headers' : '*' ,
            'Access-Control-Allow-Origin': `${process.env.VUE_APP_BASE_URL}`
           } )
           )
          .then(response => {
 
                //console.log('Login');
                //console.log(response.data);

                this.haErros = false
                this.resultado = response.data;   
        
                this.$store.state.usuarioSistema.empresa =  this.empresas.find( item => item.idfil === this.idfil).nome            
                this.$store.state.usuarioSistema.idfil  = this.idfil;  
                this.$store.state.usuarioSistema.id = this.resultado.idUsuario; 
                this.$store.state.usuarioSistema.codigo = login; 


                //console.log('Login 1111');

                if(process.env.VUE_APP_TOKEN == 'true') { 
                    //console.log('VUE_APP_TOKEN == true')   
                    //console.log(response.headers.authorization )

                    this.$store.state.usuarioSistema.nome = this.resultado.nome;
                    this.token = response.headers.authorization 
                    this.$store.state._token = this.token
                    this.$cookies.set('_token',this.token,{ httpOnly: true} )      
                               
                } else {

                  //console.log('VUE_APP_TOKEN == false')   

                  this.$store.state.usuarioSistema.nome =  this.resultado.fkUsuario.nome;  
                } 

                //console.log('idUsuario');
                //console.log(this.$store.state.usuarioSistema.id )
                //console.log(this.$store.state.usuarioSistema.codigo)
                //console.log(this.$store.state.usuarioSistema.nome)
             
                  
                this.$cookies.set('usuarioSistema',{
                    empresa : this.$store.state.usuarioSistema.empresa,
                    idfil : this.$store.state.usuarioSistema.idfil,
                    codigo : this.$store.state.usuarioSistema.codigo,
                    nome :  this.$store.state.usuarioSistema.nome } 


            ) 
            //console.log('Usuario Sistema: ' , this.$store.state.usuarioSistema)

            retorno = true;
            
          })
          .catch(error => {
               console.log("Erro: ", error.response.data.message); 
               //this.haErros=true;
               //this.erros = error.response.data.message
               this.apiDisplayMensagem("Login ou senha inválido!")  
               retorno = false;
          });



        } else {

          retorno = false;
        }

        return retorno           


      },
      navegarPara() {  
           this.$router.push({name:'home'})
      },
      checkDispositivo() { 
 
           //console.log('login' );           
           //console.log(window.innerWidth );
           //console.log((window.innerWidth-370 ));
           //console.log((window.innerWidth-370 )/2); 

           if(window.innerWidth <= 560){
               this.$store.state.tipoDispositivo= 'mobile';
               this.$store.state.configuracaoTela.marginBottomTela='120px';
               this.tamanhoLogin = '370px'
               this.marginLeftLogin =  ((window.innerWidth-350 )/2)+'px'
               this.$store.state.configuracaoTela.marginBottomTela
           }else if(window.innerWidth <= 790){
               this.$store.state.tipoDispositivo= 'tablet';
               this.$store.state.configuracaoTela.marginBottomTela='120px';
               this.tamanhoLogin = '370px'
               this.marginLeftLogin =  ((window.innerWidth-350 )/2)+'px'
               this.$store.state.configuracaoTela.marginBottomTela
           }           
           else{
               this.$store.state.tipoDispositivo= 'desktop';
               this.$store.state.configuracaoTela.marginBottomTela='60px';
               this.tamanhoLogin = '50%'
               this.marginLeftLogin = '25%'
           }

           //console.log(this.marginLeftLogin ) ;

           
           
      }
      
    },
    created() {
      this.$cookies.remove('usuarioSistema') 
      this.checkDispositivo();
    },
    mounted() {
        this.checkDispositivo();
        //console.log('this.$store.state')
        //console.log(this.$store.state.tipoDispositivo)
        //console.log(this.tamanhoLogin);
        window.addEventListener('resize', this.checkDispositivo);
        
    },    
  }
  </script>
  
  <style scoped>
  
    .topoLogin {
      background-color: #003366;
      margin-left: 10px;
      margin-top: 10px;
      text-align: center;
      font-size: 20px;
      color: white;
      width: 98%;
      height: 50px;
      border-radius: 5px;
    }
  
    .corpoLogin {
      margin-top: 10%;
    }
    .mensagem_erro {
      text-align: center;
      color: white;
      font-weight: bold;
      ;
      padding-top: 5px;
    }
  
    .error {
      border: 3px solid red;
    }
  
  </style>
  










