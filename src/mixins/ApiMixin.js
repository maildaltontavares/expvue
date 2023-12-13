import { mapState } from 'vuex'

export default {

  // Dalton - Alterada
  computed:   {...mapState(['usuarioSistema']) ,
  apiDisplayedDados() { 
    return this.apiPaginate();
  }  
  ,
  // Dalton - Alterada
  apiDisplayedDadosCRUD() {
    //console.log('apiDisplayedDados')
    //console.log(this.resultPesquisa)    
    return this.apiPaginateCRUD();
  }    
},
        
   
  data: () => ({
    dados: {},
    msgProcessamento: '',
    money: {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '',
      precision: 2,
      masked: true /* doesn't work with directive */
    },
    numberInt: {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '',
      precision: 0,
      masked: true /* doesn't work with directive */
    },
        /* DALTON */
    config_3d: {
      thousands: '.',
      decimal: ',',
      precision: 3,
    },
    /* DALTON */
    config_1d: {
      thousands: '.',
      decimal: ',',
      precision: 1,
    },
    config_sd: {
      decimal: '',
      thousands: '',
      prefix: '',
      suffix: '',
      precision: 0,
      masked: true /* doesn't work with directive */
    },
    config: {
      thousands: '.',
      decimal: ',',
      precision: 2,
    },
    configInt: {
      thousands: '.',
      decimal: ',',
      precision: 0,
    },
    nomePesquisa: '',
    itens: [],
    indiceAtual: {},
    resultPesquisa: [],
    page: 1,
    perPage: 13,
    pages: [],
    options: {
      tokens: {
        "#": {
          pattern: /[0-9]/,
        },
        A: {
          pattern: /[a-zA-Z]/,
          transform: (chr) => chr.toUpperCase(),
        },
        a: {
          pattern: /[a-zA-Z]/,
          transform: (chr) => chr.toLowerCase(),
        },
        S: {
          pattern: /[a-zA-Z]/,
        },
        X: {
          pattern: /[0-9A-Za-z]/,
        },
        "!": {
          escape: true,
        },
        "*": {
          repeated: true,
        },
        9: {
          pattern: /[0-9]/,
          repeated: true,
        },
      },
    }, 
  }),

  methods: {
    apiSetPagesCRUD() {  

      //console.log('apiSetPagesCRUd') 

      //console.log(this.resultPesquisaCRUD.length); 


      let numberOfPages = Math.ceil(this.resultPesquisaCRUD.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },


    apiSetPages() {

      this.pages= []
      
      let numberOfPages = Math.ceil(this.resultPesquisa.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
      }


      //console.log('pages')
      //console.log(this.pages)




    },
    apiPaginate() {
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return this.resultPesquisa.slice(from, to);
    },    


    /*

    
    apiSetPages() {  

      ///console.log('apiSetPages')
      //console.log(this.resultPesquisa.length)
      let numberOfPages = Math.ceil(this.resultPesquisa.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    */
    apiPaginateCRUD() {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);       
      return this.resultPesquisaCRUD.slice(from, to);
    },

    /*
    apiPaginate() {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);       
      return this.resultPesquisa.slice(from, to);
    },

    */
    apiAutorizacao(idfil, codigo, senha, rota) {
      console.log('idfil: ', idfil, 'codigo: ', codigo, 'senha: ', senha, 'rota', rota)
      let url = `${process.env.VUE_APP_BASE_URL}/passegeral/login`;
      if (idfil != undefined) {
        this.axios.post(url, {
          "codigo": codigo,
          "senha": senha,
          "idfil": idfil
        }, this.apiTokenHeader({ "Content-Type": "application/json" }))
          .then(response => {
            this.usuarioSistema.idfil = response.data.idfil
            this.usuarioSistema.codigo = response.data.codigo
            this.usuarioSistema.nome = response.data.nome
            this.$router.push('/')
          })
          .catch(error => {
            console.log("Erro: ", error.response.data);
          });
      }
    },
    apiProcessamento() {


      //console.log('this.msgProcessamento')
      //console.log(this.msgProcessamento)


      if (this.msgProcessamento != '') {
          //let tam = 20 - (this.msgProcessamento.length - 11)
          //let x = 1
          let msg = this.msgProcessamento;

          if (msg.length <= 51) {
              msg = "<" + msg + ">";
              this.msgProcessamento = msg;
          } else {
              this.msgProcessamento = "Processando"
          }
          setTimeout(this.apiProcessamento, 1000 / 3);
      }
    },


    apiDisplayMensagem(texto) {
      this.haErros = true
      this.mensagemErro = texto
      setTimeout(() => {
          this.haErros = false
          this.mensagemErro = ''
      }, 3000);
    }, 
    // Dalton
    apiDisplayMensagemSucesso(texto) {
      this.haSucesso = true
      this.mensagemSucesso = texto
      setTimeout(() => {
          this.haSucesso = false
          this.mensagemSucesso = ''
      }, 3000);
    },
  

    // Dalton - Alterada
    async apiPesquisaParam(tipo, id, target) {
     
      let url;
       

/*
      console.log('apiPesquisaParam')
      console.log( id)
      console.log( id.length)
      
*/
 

      if (id.length>0) {
        if(tipo=="classematerial"){
             url = `${process.env.VUE_APP_BASE_URL}/${tipo}/${id}`
        }else if (tipo=="item"  ) {
             id = Number(id);
             url = `${process.env.VUE_APP_BASE_URL}/${tipo}/${this.$store.state.usuarioSistema.idfil}/${id}`
        }else if (tipo=="operador"  ) {          
              this.producaoFiacao.operador = this.producaoFiacao.operador.padStart(5, '0');
              id =  this.producaoFiacao.operador.padStart(5, '0');
              url = `${process.env.VUE_APP_BASE_URL}/${tipo}/${this.$store.state.usuarioSistema.idfil}/codigo/${id}`
        }else if (tipo=="usuarioseg"  ) {          
             url = `${process.env.VUE_APP_BASE_URL}/${tipo}/usuario/${id}`
        }
        
        // console.log('API Pesquisa Param')
         //console.log(url)

        await this.axios.get(url, this.apiTokenHeader())
          .then(response => {

            //console.log('item') 
            //console.log(response.data)

            if (tipo == 'classematerial') {

              if (response.data.nome != null && response.data.nome != ''){
                  target.dsClasse = response.data.nome;   
                }else{
                  target.dsClasse = '';                      
                }   
            
            }else if (tipo == 'item') { 

                if (response.data.material.descricao!= null && response.data.material.descricao != ''){
                  target.dsItem = response.data.material.descricao ;   
                }else{
                  target.dsItem = '';                      
                } 


            } else if (tipo == 'operador') { 
         
                if (response.data.nome != null && response.data.nome != ''){
                  target.dsOperador = response.data.nome;   
                }else{
                  target.dsOperador = '';                      
                }  

            } else if (tipo == 'usuarioseg') { 
         
              if (response.data.nome != null && response.data.nome != ''){
                this.nomeUsuario = response.data.nome;   
              }else{
                this.nomeUsuario = '';                      
              }  
            }   





             
          })
          .catch(error => {

            if (tipo == 'classematerial') {
              target.dsClasse =  error.response.data ;
            }

            if (tipo == 'item') {
              target.dsItem = ' '
            }            

            if (tipo == 'operador') {
              target.dsOperador = ' '
            }   

            
            setTimeout(() => {
              if (tipo == 'classematerial') {
                target.dsClasse = ''
                target.cdClasse = ''
              }

              if (tipo == 'item') {
                target.dsItem= ''
                target.item = ''
              }              



              
            }, 2000);
          })
      }
    },


    apiPesquisa(tipo, id, target) {
      if (id) {
        let url = `${process.env.VUE_APP_BASE_URL}/${tipo}/${id}`
        this.axios.get(url, this.apiTokenHeader())
          .then(response => {
            if (tipo == 'produtos') {
              target.nome = response.data.nome
              target.unidade = response.data.unidade
              target.preco = response.data.preco
              this.calculaTotalPedido()
            }
            if (tipo == 'transportadora') {
              target.dsTransportador = response.data.descricao
            }
            if ((tipo == 'cliente') || (tipo == 'fornecedor')) {
              target.dsFornCli = response.data.descricao
            }
            if (tipo == 'transacao') {
              target.dsTransacao = response.data.descricao
            }
            if (tipo == 'centrodecusto') {
              target.dsCCusto = response.data.descricao
            }
            if (tipo == 'item') {
              target.dsItem = response.data.material.descricao
            }
          })
          .catch(error => {
            if (tipo == 'transportadora') {
              target.dsTransportador = error.response.data
            }
            if ((tipo == 'cliente') || (tipo == 'fornecedor')) {
              target.dsFornCli = error.response.data
            }
            if (tipo == 'transacao') {
              target.dsTransacao = error.response.data
            }
            if (tipo == 'centrodecusto') {
              target.dsCCusto = error.response.data
            }
            if (tipo == 'item') {
              target.dsItem = error.response.data
            }
            setTimeout(() => {
              if (tipo == 'transportadora') {
                target.dsTransportador = ''
                target.cdTransportador = ''
              }
              if ((tipo == 'cliente') || (tipo == 'fornecedor')) {
                target.dsFornCli = ''
                target.cdFornCli = ''
              }
              if (tipo == 'transacao') {
                target.dsTransacao = ''
                target.cdTransacao = ''
              }
              if (tipo == 'centrodecusto') {
                target.dsCCusto = ''
                target.cdCCusto = ''
              }
              if (tipo == 'item') {
                target.dsItem = ''
                target.codigoItem = ''
              }
            }, 2000);
          })
      }
    },
    formatarData(data) {

      // Extrai o dia, mês e ano da data
      let partes = data.split('T')[0].split('-');
      let ano = partes[0];
      let mes = partes[1];
      let dia = partes[2];
    
      // Formata a data no formato "dd/mm/yyyy"
      let dataFormatada = `${dia}/${mes}/${ano}`;
    
      return dataFormatada;

    },

    // Dalton - Alterada
    async apiPesquisaCRUDByFilial(tipo, nomeCampoProcura, procurarPor  ) { 
      /// Devido ao Watch em resultPesquisa nao foi possível aproveitar o metodo  
 

      //console.log('this.apiPesquisaCRUDByFilial')
      //console.log(tipo)
 
      let dtAbertura;
      let dtEncerramento;

      if(tipo=="lote"){  

        this.msgProcessamento = "Processando"
        this.page = 1
        this.apiProcessamento() 

        let url = `${process.env.VUE_APP_BASE_URL}/lotefiacao/pesquisa`;
            
        this.resultPesquisaCRUD = []
        this.pages = []  

        //console.log('this.loteFiacaoParams' );
        //console.log(this.loteFiacaoParams);  

       if  ((this.loteFiacaoParams.lote!=''  )){
          this.loteFiacaoParamsDAO.lote = this.loteFiacaoParams.lote.padStart(10, '0'); 
       } else{
          this.loteFiacaoParamsDAO.lote = '';
       }

       if  ((this.loteFiacaoParams.item!='' && this.loteFiacaoParams.item!='0000000'  )){

          //console.log('item nao é branco')
          //console.log("yy" + this.loteFiacaoParams.item+ 'XX') 
          this.loteFiacaoParamsDAO.item = this.loteFiacaoParams.item.padStart(7, '0'); 
       } else{
          this.loteFiacaoParamsDAO.item = '';
       }
       
       if  ((this.loteFiacaoParams.tipoMaquina=='' && this.loteFiacaoParams.tipoMaquina==null )){ 
            this.loteFiacaoParamsDAO.tipoMaquina = '';
       } else{
            this.loteFiacaoParamsDAO.tipoMaquina = this.loteFiacaoParams.tipoMaquina;
       }    
       
       if  ((this.loteFiacaoParams.dataLoteInicial!='' && this.loteFiacaoParams.dataLoteInicial!=null  )){
          this.loteFiacaoParamsDAO.dataLoteInicial =  this.$moment(this.loteFiacaoParams.dataLoteInicial).format("YYYYMMDD");
       } else{
          this.loteFiacaoParamsDAO.dataLoteInicial = '';
       } 
       
       if  ((this.loteFiacaoParams.dataLoteInicial!='' && this.loteFiacaoParams.dataLoteInicial!=null  )){
        this.loteFiacaoParamsDAO.dataLoteFinal =  this.$moment(this.loteFiacaoParams.dataLoteFinal).format("YYYYMMDD");
       } else{
        this.loteFiacaoParamsDAO.dataLoteFinal = ''; 
       }     

       //console.log(this.loteFiacaoParamsDAO.tipoMaquina)
       //console.log(this.loteFiacaoParams);  

        this.loteFiacaoDAO = 
        {                                
        "idfil"        : this.$store.state.usuarioSistema.idfil,  
        "dataInicial"  : this.loteFiacaoParamsDAO.dataLoteInicial ,     
        "dataFinal"    : this.loteFiacaoParamsDAO.dataLoteFinal ,   
        "tipoMaquina"  : this.loteFiacaoParamsDAO.tipoMaquina 	  ,
        "item"         : this.loteFiacaoParamsDAO.item 	  , 
        "lote"         : this.loteFiacaoParamsDAO.lote 
       } 

        //console.log('this.loteFiacaoDAO') 
        //console.log(this.loteFiacaoDAO) 

        await this.axios.post(
          url,
          JSON.stringify(this.loteFiacaoDAO),
          //{
          //headers: { "Content-Type": "application/json" }
          //}
          
          this.apiTokenHeader({ "Content-Type": "application/json" })
          
          )
          .then(response => {
            
            this.resultPesquisaCRUD = [];
               
            response.data.forEach(element => {

                   if(element.DATA_ABERTURA!=null){
                       dtAbertura = this.formatarData(element.DATA_ABERTURA);
                   }else{
                       dtAbertura = '';
                   }

                   if(element.DATA_ENCERRAMENTO!=null){
                       dtEncerramento = this.formatarData(element.DATA_ENCERRAMENTO);
                   }else{
                       dtEncerramento = '';
                   }     

                   this.resultPesquisaCRUD.push({   

                       nome_tp_maquina: (element.NOME_TP_MAQUINA != null ? element.NOME_TP_MAQUINA : 0) ,
                       cd_tipo_maquina: (element.CD_TIPO_MAQUINA != null ? element.CD_TIPO_MAQUINA : 0) ,
                       lote           : (element.LOTE != null ? element.LOTE : ''),
                       item           : (element.ITEM != null ? element.ITEM : ''),
                       desc_item      : (element.DESC_ITEM != null ? element.DESC_ITEM : ''),
                       qtde_a_prod    : (element.QTDE_A_PROD != null ? element.QTDE_A_PROD : '')  ,
                       data_abertura  : dtAbertura ,
                       data_encerramento: dtEncerramento ,
                       obs: (element.OBS != null ? element.OBS : '') ,
                       obs1: (element.OBS1 != null ? element.OBS1 : ''), 
                       obs2: (element.OBS2 != null ? element.OBS2 : '') 

              }) 
           })    

            this.msgProcessamento = ''

            this.setaPesquisaCRUD(this.resultPesquisaCRUD)
            this.apiSetPagesCRUD() 
 
          }) 
          .catch(error => {
            console.log("Erro: ", error.response.data);
            this.haErros = true
            this.mensagemErro = error.response.data
            this.msgProcessamento = ''
          });          

     
      } else if(tipo=="producao"){    
 

          this.msgProcessamento = "Processando"
          this.page = 1
          this.apiProcessamento()
 

          let dataProdIni ;
          let dataProdFim ;
          //this.producaoFiacao.dataProducao.substring(0,4) + this.producaoFiacao.dataProducao.substring(5,7) + this.producaoFiacao.dataProducao.substring(8,10) 
          //console.log('procurarPor ')  
          //console.log(procurarPor.dataProducaoInicial.length) 

          if(procurarPor.dataProducaoInicial.length==10){
            dataProdIni =  procurarPor.dataProducaoInicial.substring(0,4) + procurarPor.dataProducaoInicial.substring(5,7) + procurarPor.dataProducaoInicial.substring(8,10)  
          }else{
            dataProdIni = ""  
          }

          if(procurarPor.dataProducaoFinal.length==10){
            dataProdFim =  procurarPor.dataProducaoFinal.substring(0,4) + procurarPor.dataProducaoFinal.substring(5,7) + procurarPor.dataProducaoFinal.substring(8,10)  
          }else{
            dataProdFim = ""  
          }          

          //console.log(dataProdIni)  
          //console.log(dataProdFim)  
          
          let url = `${process.env.VUE_APP_BASE_URL}/${tipo}/parametros`; 
              
          this.resultPesquisaCRUD = []
          this.pages = [] 

          this.producaoFiacaoDao =
          {                                
              "idfil"                : this.$store.state.usuarioSistema.idfil,
              "codigoMaquina"        : procurarPor.codigoMaquina  ,             
              "dataProducaoInicial"  : dataProdIni ,      //this.$moment(procurarPor.dataProducaoInicial).format("YYYYMMDD"),
              "dataProducaoFinal"    : dataProdFim ,      //this.$moment(procurarPor.dataProducaoFinal).format("YYYYMMDD"),
              "turno" 	             : procurarPor.turno 	    ,
              "tipoMaquina" 	       : procurarPor.tipoMaquina 	   
          }


          //console.log('this.producaoFiacaoDao')
          //console.log(url)
          //console.log(this.producaoFiacaoDao)

          

          await this.axios.post(
            url,
            JSON.stringify(this.producaoFiacaoDao),
            //{
            //headers: { "Content-Type": "application/json" }
            //}
            this.apiTokenHeader({ "Content-Type": "application/json" })
            )
            .then(response => {
              this.resultPesquisaCRUD = response.data  

              this.msgProcessamento = ''
              //console.log('this.producaoFiacaoDao 222222')
 

              this.setaPesquisaCRUD(this.resultPesquisaCRUD)
              this.apiSetPagesCRUD() 
            }) 
            .catch(error => {
              console.log("Erro pesquisa producao: ", error.response.data);
              this.haErros = true
              this.mensagemErro = error.response.data
              this.msgProcessamento = ''
            });  
 

      }
      else if(tipo=="usuariologin"){   

          this.msgProcessamento = "Processando"
          this.page = 1
          this.apiProcessamento()

          //console.log('this.apiPesquisaCRUDByFilial usulogin222222222222222')
          //console.log(tipo)
          
 
          //this.producaoFiacao.dataProducao.substring(0,4) + this.producaoFiacao.dataProducao.substring(5,7) + this.producaoFiacao.dataProducao.substring(8,10) 
          //console.log('procurarPor ')  
          //console.log(procurarPor.dataProducaoInicial.length) 
 
          
          let url = `${process.env.VUE_APP_BASE_URL}/${tipo}/buscasistemausuario`; 
              
          this.resultPesquisaCRUD = []
          this.pages = [] 

          this.usuarioDAO =
          {                                
        
              "idSistema"    :this.usuarioParams.idSistema ,
              "nomeUsuario"  :this.usuarioParams.nomeUsuario ,      //this.$moment(procurarPor.dataProducaoInicial).format("YYYYMMDD"),
              "login"        :this.usuarioParams.login   ,      //this.$moment(procurarPor.dataProducaoFinal).format("YYYYMMDD"),
              
          } 
 
          //console.log(this.usuarioDAO) 
          //console.log('ZZZZZZZZ') 

          await this.axios.post(
            url,
            JSON.stringify(this.usuarioDAO),
            //{
            //headers: { "Content-Type": "application/json" }
           // }
           this.apiTokenHeader({ "Content-Type": "application/json" })
            
            )
            .then(response => {
              
              this.resultPesquisaCRUD = [];
               
              response.data.forEach(element => {
                     this.resultPesquisaCRUD.push({       

                         id_usu:      (element.ID_USU != null ? element.ID_USU : 0) ,
                         sistema:     (element.SISTEMA != null ? element.SISTEMA : ''),
                         nome_usu:    (element.NOME_USU != null ? element.NOME_USU : ''),
                         desc_sistema:(element.DESC_SISTEMA != null ? element.DESC_SISTEMA : ''),
                         login:       (element.LOGIN != null ? element.LOGIN : '')  ,
                         sigla:       (element.SIGLA != null ? element.SIGLA : '')   

                }) 
             })                
              
              
              //this.resultPesquisaCRUD = response.data  

              this.msgProcessamento = '' 

              this.setaPesquisaCRUD(this.resultPesquisaCRUD)
              this.apiSetPagesCRUD() 
            }) 
            .catch(error => {
              console.log("Erro: ", error.response.data);
              this.haErros = true
              this.mensagemErro = error.response.data
              this.msgProcessamento = ''
            });  


      }
      else if(tipo=="usuarioseg"){   

        this.msgProcessamento = "Processando"
        this.page = 1
        this.apiProcessamento()

        //console.log('this.apiPesquisaCRUDByFilial usuloginXXX')
        //console.log(tipo)  
        
        let url = `${process.env.VUE_APP_BASE_URL}/${tipo}/nome_usu`; 
            
        this.resultPesquisaCRUD = []
        this.pages = [] 

        this.usuarioDAO =
        {                                
      
            "idUsuario"  : null,
            "filial"     :'',      
            "nome"      : procurarPor   , 
            "email": " "    
            
        }  

        //console.log(this.usuarioDAO) 

        await this.axios.post(
          url,
          JSON.stringify(this.usuarioDAO),
          //{
          //headers: { "Content-Type": "application/json" }
         // }
         this.apiTokenHeader({ "Content-Type": "application/json" })
          )
          .then(response => {
            
            this.resultPesquisaCRUD = response.data   
            this.msgProcessamento = ''

            this.setaPesquisaCRUD(this.resultPesquisaCRUD)
            this.apiSetPagesCRUD() 
 
          }) 
          .catch(error => {
            console.log("Erro: ", error.response.data);
            this.haErros = true
            this.mensagemErro = error.response.data
            this.msgProcessamento = ''
          });  


    }else{
            if (this.nomePesquisa) {
              
              let url = `${process.env.VUE_APP_BASE_URL}/${tipo}/filial/${this.$store.state.usuarioSistema.idfil}/${nomeCampoProcura}/${procurarPor}`;
              
              //console.log(url)
              
              this.resultPesquisaCRUD = [] 
              this.pages = []
              await this.axios.get(url,this.apiTokenHeader())
                .then(response => {
                  this.resultPesquisaCRUD = response.data  
                  this.setaPesquisaCRUD(this.resultPesquisaCRUD)
                  this.apiSetPagesCRUD()  
                })
            } else{

              let url = `${process.env.VUE_APP_BASE_URL}/${tipo}/filial/${this.$store.state.usuarioSistema.idfil}`;
              
              //console.log('apiPesquisaCRUDByFilial 11')
              
              this.resultPesquisaCRUD = []
              this.pages = []
              await this.axios.get(url,this.apiTokenHeader())
                .then(response => {
                  this.resultPesquisaCRUD = response.data  
                  this.setaPesquisaCRUD(this.resultPesquisaCRUD)
                  this.apiSetPagesCRUD() 
            }) 
          }
        } 
      //if (this.resultPesquisa) {

        //console.log('SSEETTA')
        //console.log(tipo) 

        //this.setaPesquisaCRUD(this.resultPesquisaCRUD)
        //this.apiSetPagesCRUD()
     
       
    //}
    
  }
    ,


     ////// Alterado Dalton Tavares
     // Dalton - Alterada
    ///// adicionado os parametros pagina,direcao,ordem // revisar de onde vem
    async apiPesquisaNome(tipo, nomeCampoProcura, procurarPor , localizacao) {

      //console.log('this.nomePesquisa')
      //console.log(procurarPor)
      //console.log(this.nomePesquisa)

      if (this.nomePesquisa.length < 3) {
        this.haErros = true
        this.mensagemErro = "Informe um valor de pesquisa com 3 caracteres ou mais!"
        return
      }


      this.msgProcessamento = "Processando"
      this.page = 1
      this.apiProcessamento()


      let url;
      if (this.nomePesquisa) {
        
          if(tipo=="classematerial"){ 
            url = `${process.env.VUE_APP_BASE_URL}/${tipo}/localizacao/${localizacao}/${nomeCampoProcura}/${procurarPor}`
          }else if(tipo=="item" || tipo=="operador"){ 
            url = `${process.env.VUE_APP_BASE_URL}/${tipo}/${this.$store.state.usuarioSistema.idfil}/${nomeCampoProcura}/${procurarPor}` 
          } else if(tipo=="usuarioseg"  ){ 
            url = `${process.env.VUE_APP_BASE_URL}/${tipo}/${nomeCampoProcura}/${procurarPor}` 
        }

          //console.log(url)
          //console.log( this.$store.state._token)
          
          this.resultPesquisa = []
          this.pages = []
          await this.axios.get(url,this.apiTokenHeader())
            .then(response => {

              //console.log('Processou APiNomes')
              this.resultPesquisa = response.data
              this.msgProcessamento = ''

              
              //console.log(this.resultPesquisa )

            })
      } else {
        //this.axios(`http://192.168.60.155:8082/${tipo}?linesPerPage=10&page=${pagina}&direction=${direcao}&orderBy=${ordem}`)
        this.axios(`${process.env.VUE_APP_BASE_URL}/${tipo}/${nomeCampoProcura}/${procurarPor}`,
        this.apiTokenHeader())
          .then(response => response.json())
          .then(response => {
            this.resultPesquisa = response
          })
      }
      if (this.resultPesquisa) {
        //this.setaPesquisa(tipo, this.resultPesquisa)  //  13062023
        this.apiSetPages()
      }
    },
   // Dalton
    async apiTipoMaquina(pTpMaq){

      let url = `${process.env.VUE_APP_BASE_URL}/tipomaquina/filial/${this.$store.state.usuarioSistema.idfil}/tipomaquina/${pTpMaq}`;
              
      //console.log(url)  ;

      await this.axios.get(url,this.apiTokenHeader())
      .then(response => {       

          this.resultado = response.data;   
          this.tpMaquina.nome = this.resultado.nome.trim() ;
          this.tpMaquina.cdClasse = this.resultado.cdClasse ; 

          //console.log('this.tpoMaquina.cdClasse XXXXXXXXX');
          //console.log(this.tpMaquina.cdClasse);          

       })
       .catch(error => { 
           this.mensagemErro =  'Tipo Máquina não existe. Cadastre-a.'; 
           console.log(error.response.data);    
           this.haErros = true 
               
      } )
    },


// DALTON
    async apiLoteFiacao(){

      let url = `${process.env.VUE_APP_BASE_URL}/lotefiacao/buscaLotePorChave`;
      let itemTmp;
    
    
      //console.log(url)  ;
      let retorno = false;

      if  (!(this.producaoFiacao.item==null || this.producaoFiacao.item=='')){
          itemTmp = this.producaoFiacao.item.padStart(7, '0'); 
      }else{
          itemTmp = null;
      }

      if  (!(this.producaoFiacao.loteProducao==null || this.producaoFiacao.loteProducao=='')){
          
          this.producaoFiacao.loteProducao = this.producaoFiacao.loteProducao.padStart(10, '0');

          this.loteFiacao =  
          {    
            idfil:this.$store.state.usuarioSistema.idfil , 
            tipoMaquina:  this.cdTipoMaquina ,   
            item:  itemTmp ,
            idSSM: 0,
            lote:this.producaoFiacao.loteProducao 
          },   

          //console.log('this.loteFiacao XXXX');  
          //console.log(this.loteFiacao);   


          await this.axios.post(
            url,
            JSON.stringify(this.loteFiacao),
            //{
            //headers: { "Content-Type": "application/json" }
            //}
            this.apiTokenHeader({ "Content-Type": "application/json" })
          )
        .then(response => { 
            
              this.resultado = response.data;  

              //console.log('loteFiacao 22222');   
              //console.log(this.resultado);  
              
              if (this.resultado.lote==null || this.resultado.lote ==''){ 
                  //this.mensagemErro =  'Lote não encontrado ou ja esta encerrado.';  
                  //this.haErros = true ; 

                  this.apiDisplayMensagem('Lote não encontrado ou ja esta encerrado.')

                  this.haSucesso = false;   
              }else{
                this.mensagemErro =  '';  
                this.haErros = false                
                retorno = true
              } 
            
          })
          .catch(error => { 
              this.mensagemErro =  'Lote não encontrado ou ja esta encerrado.'; 
              console.log(error.response.data);    
              this.haErros = true 
                  
          } )
      }else{
        retorno = true
      }

      return retorno
    },


// DALTON
    async apiDadosCalcEfic(pItem,pHoraInicio,pHoraFim){

        let url = `${process.env.VUE_APP_BASE_URL}/producao/calcefic`;     
        let retorno = false;        
        //console.log('calcEfic');

        this.producaoFiacaoDao =
        {                                
            "idfil"        : this.$store.state.usuarioSistema.idfil,
            "item"         : pItem ,             
            "horaInicio"   : pHoraInicio,
            "horaFinal"    : pHoraFim	    
        } 

        this.artigoSap = '';
        this.tituloCalcEfic = 0;
        this.tempoDuracao = 0;
        this.classeItem = 0 ; 


        //console.log('POST');
        await this.axios.post(
            url,
            JSON.stringify(this.producaoFiacaoDao),
            //{
            //headers: { "Content-Type": "application/json" }
            //}
            this.apiTokenHeader({ "Content-Type": "application/json" })
        )
        .then(response => { 
            
            this.resultado = response.data;   
          
            this.aResult = [];
            this.resultado.forEach(element => {
                this.aResult.push({       

                     artigoSap:      (element.COD_INTELIGENTE != null ? element.COD_INTELIGENTE : '') ,
                     tituloCalcEfic: (element.TITULO != null ? element.TITULO : ''),
                     tempoDuracao:   (element.TMP_HORAS != null ? element.TMP_HORAS : 0),
                     classeItem:     (element.CDCLASSE != null ? element.CDCLASSE : 0)     

                }) 

            }); 
 
           if (this.aResult[0].artigoSap==null || this.aResult[0].artigoSap=='' ){
                this.artigoSap      = '';
           } else{               
                this.artigoSap      = this.aResult[0].artigoSap;
           }
          
           if (this.aResult[0].tituloCalcEfic==null || this.aResult[0].tituloCalcEfic==''){
                this.tituloCalcEfic = '';       
                if(this.cdTpMaquina=='04' || this.cdTpMaquina=='06' )    {
                    this.producaoFiacao.tituloCadastro=0;
                    this.producaoFiacao.tituloReal=0;
                    this.producaoFiacao.tituloNominal=0;          

                }
  
           } else{
                this.tituloCalcEfic = this.aResult[0].tituloCalcEfic;

                if(this.cdTipoMaquina=='04' || this.cdTipoMaquina=='06' )    {
                    this.producaoFiacao.tituloCadastro=this.aResult[0].tituloCalcEfic;
                    this.producaoFiacao.tituloReal=this.aResult[0].tituloCalcEfic;
                    this.producaoFiacao.tituloNominal=this.aResult[0].tituloCalcEfic;                 
                }
           }            

           if (this.aResult[0].tempoDuracao==null || this.aResult[0].tempoDuracao=='' ){
                  this.tempoDuracao = 0;                
           } else{
                 this.tempoDuracao = this.aResult[0].tempoDuracao;
           }   
 
           if (this.aResult[0].classeItem==null || this.aResult[0].classeItem=='' ){
                 this.classeItem     =  0;                   
          } else{
                this.classeItem     = this.aResult[0].classeItem ;  
          }  


 
          retorno = true; 
 

        
        })
        .catch(error => {
            console.log("Erro: ", error.response.data);
            this.haErros = true
            this.mensagemErro = error.response.data
        });  

        return  retorno
 
    },

    apiAddLeadingZero(event, target) {

      const maxLength = parseInt(event.target.getAttribute("maxlength"))
      //const isNegative = parseInt(event.target.value) < 0
      const tecla = parseInt(event.key)

      if (event.key == 'Backspace') {
          event.target.value = event.target.value.substring(0, event.target.value.length)
      }

      if ("0123456789".indexOf(event.key) != -1) {

          if (event.target.value.length > 1) {
              event.target.value = event.target.value.concat(tecla)
          }

          let newValue = ("0".repeat(maxLength) + Math.abs(event.target.value).toString()).slice(-maxLength);

          event.target.value = newValue

          target = newValue
          
          if(event.key == 'ZZ'){
            console.log(target)
          }

      }

      //console.log("NewValue : ", event.target, "  Target: ", target)

  },
  apiTokenHeader(addHeader) {
    if (process.env.VUE_APP_TOKEN == 'true') {


        //console.log('ApiToken')
        //console.log(this.$store.state._token);
        if (addHeader) {
            if (this.$store.state._token != '') {
                addHeader.Authorization = this.$store.state._token
            }
            //console.log('header 1: ', addHeader)
            return { headers: addHeader }
        } else {
          //console.log('header 2: ', addHeader)
            return { headers: { 'Authorization': this.$store.state._token } }
        }
    } else {
        if (addHeader) {
            //console.log('header 3: ', addHeader)
            return { headers: addHeader }
        }
    }
  },  
  
/*
    apiFlushPesquisa(indice) {

      this.indiceAtual = indice;
      this.resultPesquisa = [];
      //this.nomePesquisa = 'XXXXX';

      //console.log('resultPesquisa FFLLUUSSHH')
      //console.log(this.resultPesquisa);   

    },
  */

    apiFlushPesquisa(indice) {
      this.indiceAtual = indice;
      this.nomePesquisa = '';
      this.resultPesquisa = []
      this.page = 1
      this.pages.length = 0
    },    
  
    apiNumeraID() {
      let q = 1;
      for (q = 0; q < this.itens.length; q++) {
        this.itens[q].id = q + 1;
      }
    },
    apiAdicionaItem(quantidade, obj) {
      let q = 1;
      for (q = 1; q <= quantidade; q++) {
        this.itens.push(Object.assign(obj))
      }
      this.apiNumeraID()
    },
    apiExcluiItem(indice, obj) {
      const ind = this.itens.findIndex(object => {
        return object.id === indice;
      });
      if (ind >= 0) {
        this.itens.splice(ind, 1);
        if (this.itens.length == 0) {
          this.apiAdicionaItem(1, obj);
        }
        this.apiNumeraID()
      }
    },
    apiConverteNumUS(numero) {
      if (numero) {
        numero = (numero.search('[,]') == -1 ? parseFloat(numero) : parseFloat(numero.replace('.', '').replace(',', '.')))
      }
      return numero
    },
    apiConverteNumBR(numero, precisao) {
      if (numero) {
        numero = numero.toFixed(precisao).toString().replace('.', ',')
      }
      return numero
    },
    apiNVL(campo, retorno) {
      if ((typeof campo === undefined) || (campo === null)) {
        return (retorno ? retorno : '')
      } else {
        return campo
      }
    },
    apiDate(campo) {
      if ((typeof campo === undefined) || (campo === null)) {
        return ''
      } else {
        return this.$moment(campo).format("DD/MM/YYYY")
      }
    },
    apiVerificaErro(i, valor, mostrar) {
      let retorno = false
      let listaErros = '<ul>'
      i.errors.forEach(element => {
        if (element.campo == valor) {
          if (mostrar) {
            listaErros = listaErros + '<li>' + element.mensagem + '</li>'
          } else {
            retorno = true
          }

        }
      })
      if (mostrar) {
        if (listaErros != '') {
          retorno = listaErros + '</ul>'
        } else {
          retorno = ''
        }
      }
      return retorno
    },
    apiListaErros(lista) { 
      let listaErros = ''
      lista.forEach(element => {
        listaErros = listaErros + '<li>' + element.$message + '</li>'
        console.log(element.$message )

       })
      if (listaErros) { 
        listaErros = '<ul>' + listaErros + '</ul>'  
      }
      return listaErros
    },
    apiPodeAprovar(gerentes, codigo) {
      let i = 0
      while (i <= 49) {
        let valor = gerentes.substring(i, i + 5)
        if (valor != '00000' && valor == codigo) {
          return true
        }
        i = i + 5
      }
      return false
    },
    getDadosApi(url, queryParams = {}) {

      Object.keys(queryParams).forEach(chave => {
        if (queryParams[chave] == '') {
          delete queryParams[chave]
        }
      })

      const urlQueryParams = new URLSearchParams(queryParams).toString()

      const urlCompleta = urlQueryParams ? `${url} & ${urlQueryParams}` : url

      fetch(urlCompleta)
        .then(response => response.json())
        .then(response => {
          this.dados = response
        })
    },
    apiDesejaSair(){
      const confirmar = window.confirm("Deseja encerrar essa operação?");
      return confirmar;
    } ,
    populaTipoMaquina(){
 /* DALTON */
        this.resultado = ""; 
        this.tipoMaquina = []; 

        // Carrega tipo Maquina
        let url = `${process.env.VUE_APP_BASE_URL}/tipomaquina/filial/01`; 
        
        this.axios.get(url,this.apiTokenHeader())
        .then(response => { 
            this.resultado = response.data;     
            
            this.tipoMaquina = [];
            this.resultado.forEach((tpMaq ) => {      
            
                this.tipoMaquinaTemp.codigo = (tpMaq.codigo != null ? tpMaq.codigo.trim()  : null)  ; 
                this.tipoMaquinaTemp.nome = (tpMaq.nome != null ? tpMaq.nome.trim()  : null)  ;   
                this.tipoMaquina.push({codigo:this.tipoMaquinaTemp.codigo, nome:this.tipoMaquinaTemp.nome }); 

            });   

        })
        .catch(error => {
        console.log("Erro: ", error.response.data);
        this.haErros = true
        });
    },
    /*
      volta() {
 
        this.acao = 'volta';
        this.simNaoPergunta = "Deseja sair deste formulário?"
        this.simNaoBotoes = ['S','N']
        $('#modalSimNao').modal('show')

      }, 
      cancelaEdicao() {
 
        this.acao = 'cancelaEdicao';
        this.simNaoPergunta = "Deseja sair da edição?"
        this.simNaoBotoes = ['S','N']
        $('#modalSimNao').modal('show')

      },
      excluir(){
 
        this.acao = 'excluir';
        this.simNaoPergunta = "Confirma exclusão ?" ;
        this.simNaoBotoes = ['S','N'];            
        $('#modalSimNao').modal('show')  ;

      },
      pesquisar(){ 
 
        this.acao = 'pesquisar';
        this.simNaoPergunta = "Deseja sair deste formulário?"
        this.simNaoBotoes = ['S','N'];            
        $('#modalSimNao').modal('show')  ;

      }  
      ,*/

      exibeModal(acao,pergunta,botoes,tipo){ 
 /* DALTON */
        this.acao = acao;
        this.simNaoPergunta = pergunta;
        this.simNaoBotoes = botoes;            
        this.simNaoTipo = tipo;        
        $('#modalSimNao').modal('show');

      } 



  }, 

  watch: {
    resultPesquisa: { 
      deep: true,
      handler() {
        //console.log('whatchers');
        this.apiSetPages();
      }
    }
  },
}


//, this.apiTokenHeader({ "Content-Type": "application/json" })
/*
,this.apiTokenHeader( {
  'Access-Control-Expose-Headers' : '*' ,
  'Access-Control-Allow-Origin': `${process.env.VUE_APP_BASE_URL}`
 } )


 */