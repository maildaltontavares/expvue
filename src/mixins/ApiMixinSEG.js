import { mapState } from 'vuex'

export default { 

  computed:   {...mapState(['usuarioSistema'])},

  data: () => ({
    dados: {},
    nomePesquisa: '',
    itens: [],
    indiceAtual: {},
    resultPesquisa: [],
    page: 1,
    perPage: 13,
    pages: [],
  }),
  methods: {
   
       populaSistema(){
        /* DALTON */
               this.resultado = ""; 
               this.sistema = []; 
       
               // Carrega tipo Maquina
               let url = `${process.env.VUE_APP_BASE_URL}/sistema`; 

               console.log(url);
               
               this.axios.get(url,this.apiTokenHeader())
               .then(response => { 
                   this.resultado = response.data;     

                   console.log(this.resultado );
                   
                   this.sistema = [];
                   this.resultado.forEach((sys ) => {     
 
                   
                       this.sistemaTemp.id = (sys.id != null ? sys.id  : null)  ; 
                       this.sistemaTemp.nome = (sys.nome != null ? sys.nome.trim()  : null)  ;   
                       this.sistemaTemp.sigla = (sys.sigla != null ? sys.sigla  : null)  ; 
                       this.sistemaTemp.tipoLogin = (sys.tipoLogin != null ? sys.tipoLogin.trim()  : null)  ; 
                       this.sistemaTemp.tipoCodificacaoSenha = (sys.tipoCodificacaoSenha != null ? sys.tipoCodificacaoSenha.trim()  : null)  ; 

                       this.sistema.push({
                         id:this.sistemaTemp.id,
                         nome:this.sistemaTemp.nome ,
                         sigla:this.sistemaTemp.sigla,
                         tipoLogin:this.sistemaTemp.tipoLogin,
                         tipoCodificacaoSenha:this.sistemaTemp.tipoCodificacaoSenha
                        }); 
       
                   });   
       
               })
               .catch(error => {
               console.log("Erro: ", error);
               this.haErros = true
               });
           },
    }
}    