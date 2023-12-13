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



        async cargaAutomaticaBackend(){

            let url; 
    
            url = `${process.env.VUE_APP_BASE_URL}/estoque/cargaauto/filial/${this.$store.state.usuarioSistema.idfil}`  
        
            await this.axios.get(url,this.apiTokenHeader())
            .then(response => {

                console.log("TrackOS Estoque");
                this.resultado = response.data; 

                console.log(this.resultado.length);
                console.log(this.resultado); 
                
            })
            .catch(error => {  
                
                    console.log("Erro: ", error); 
                    this.msgProcessamento = '' 
                    this.apiDisplayMensagem(error ) 
                    
            });   

        },


        async atualizaEstoqueTrackOS(pTipo){

            let url;
            let retorno;
            let objItem;   
            let idTrack;
            let objItEst;
            let objJson;
            //let objItensProcessados; 
               

            if(pTipo=='full')    {
                url = `${process.env.VUE_APP_BASE_URL}/estoque/filial/${this.$store.state.usuarioSistema.idfil}`  
            }else{ 
                url = `${process.env.VUE_APP_BASE_URL}/estoque/data/filial/${this.$store.state.usuarioSistema.idfil}`  
            }
            
           
            /*    
            const headers = {
                    'Access-Control-Expose-Headers': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${process.env.VUE_APP_TOKEN_TRACKOS}`
                };  
            */   

            this.$store.state.pararProcessamento= false;

            this.msgProcessamento = "Processando"
            this.page = 1
            this.apiProcessamento()                     

            console.log(url)  

            await this.axios.get(url,this.apiTokenHeader())
            .then(response => {

                console.log("TrackOS Estoque");
                this.resultado = response.data; 

                console.log(this.resultado.length);
                console.log(this.resultado); 
                
            })
            .catch(error => {  
                
                    console.log("Erro: ", error); 
                    this.msgProcessamento = '' 
                    this.apiDisplayMensagem(error ) 
                    
            });                 

            this.totalItensAProcessar = this.resultado.length;

            for (let i = 0; i < this.resultado.length; i++) { 


                if(this.$store.state.pararProcessamento){
                    i=this.resultado.length;
                }else
                {

                    this.totalItensProcessados = this.totalItensProcessados  + 1; 
                    idTrack =this.resultado[i].idTrackOS;


                    objItem = {

                        id:this.totalItensProcessados, 
                        codigo : this.resultado[i].codigo ,  
                        descricao : this.resultado[i].nome ,  
                        qtde_disponivel : 0,  
                        idTrackOS : this.resultado[i].idTrackOS  ,
                        qtde_sld_trackOS : 0 ,  
                        msg_processamento: 'Atualizado',
                        dtUltAlteracao: this.resultado[i].dtUltAlteracao  ,

                    } 


                    objItEst      = {  
                        quantity : this.resultado[i].qtde_disponivel,
                        unitCost: 0
                    }  

                    console.log("objItEst");
                    console.log(objItEst);
                                        
                    objJson = JSON.stringify(objItEst)  ;      

                    url = `https://integrations.tractian.com/inventory/${idTrack}` 
                
                    const headers = {
                            'Access-Control-Expose-Headers': '*',
                            'Content-Type': 'application/json',
                            'Authorization': `${process.env.VUE_APP_TOKEN_TRACKOS}`
                        };   
                        
                     await this.axios.put(url ,objJson,{headers})
                        .then(response => {    
                            console.log("TrackOS Estoque");
                            this.resultadoTrack = response.data;   
                            
                            console.log('this.resultadoTrack' ); 
                            console.log(this.resultadoTrack ); 

                            const data = new Date(this.resultado[i].dtUltAlteracao );

                            // Extraia o dia, mês e ano
                            const dia = String(data.getDate()).padStart(2, '0');
                            const mes = String(data.getMonth() + 1).padStart(2, '0'); // Lembrando que o mês começa em 0, então é necessário adicionar 1.
                            const ano = data.getFullYear();
                            
                            // Crie a string de data no formato 'dd/mm/yyyy'
                            const dataFormatada = `${dia}/${mes}/${ano}`;
                            
                            console.log(dataFormatada);


                            objItem = {

                                id:this.totalItensProcessados, 
                                codigo : this.resultado[i].codigo ,  
                                descricao : this.resultado[i].nome ,  
                                qtde_disponivel : this.resultado[i].qtde_disponivel ,  
                                idTrackOS : this.resultado[i].idTrackOS  ,
                                qtde_sld_trackOS : this.resultadoTrack.totalQuantity ,  
                                msg_processamento: 'Atualizado',
                                dtUltAlteracao: dataFormatada ,
        
                            }                             
                            
                            this.aAtualizaEstoque.push(objItem); 




                        })
                        .catch(error => {                          
                            
                            
                            objItem = {

                                id:objItem.id, 
                                codigo : objItem.codigo ,  
                                descricao : objItem.descricao ,  
                                qtde_disponivel : objItem.qtde_disponivel, 
                                idTrackOS : objItem.idTrackOS  ,
                                qtde_sld_trackOS : objItem.qtde_sld_trackOS  ,  
                                msg_processamento: 'ERRO ERRO ERRO' ,
                                dtUltAlteracao: objItem.dtUltAlteracao  ,
        
                            }                             
                            
                            this.aAtualizaEstoque.push(objItem);  

                            console.log("Erro: ", error); 
                            this.msgProcessamento = ''
                            retorno = false; 
                            this.apiDisplayMensagem(error )  
                        });        
                }    

            }   // Fim for
            


            //console.log('this.aItemTrackOs'); 
            //console.log(this.aItemTrackOs); 
            this.msgProcessamento = ''
            retorno = true;
            //this.totalItensProcessados = this.totalItensAProcessar;
                 
            return retorno;  

            
        },

        async AtualizaItensViaTrack(){

            let url;
            let retorno;
            let objItem;   
            let objItensProcessados;

            this.$store.state.pararProcessamento= false;

            this.msgProcessamento = "Processando"
            this.page = 1
            this.apiProcessamento()                
        
            for (let i = 0; i < this.aItemTrackOs.length; i++) {  


                if(this.$store.state.pararProcessamento){

                    console.log('PararProcessamento') 
                    console.log(this.$store.state.pararProcessamento) 

                    i=this.aItemTrackOs.length;

                    console.log(i) 

                }else
                {     
                        console.log(this.aItemTrackOs[i]);
        
                        objItem = {
                            idSGS : this.aItemTrackOs[i].codigoItem ,  
                            idTrackOS : this.aItemTrackOs[i].idTrack,  
                            idfil : this.$store.state.usuarioSistema.idfil
                            
                        } 

                        objItensProcessados = {
                            id:this.totalItensProcessados, 
                            nome : this.aItemTrackOs[i].nome ,  
                            idTrack : this.aItemTrackOs[i].idTrack, 
                            codigoItem : this.aItemTrackOs[i].codigoItem  ,
                            msg_processamento:'Atualizado'
                        }   


                        this.totalItensProcessados = this.totalItensProcessados  + 1;


                        url = `${process.env.VUE_APP_BASE_URL}/item`;

                        console.log(url); 
                        console.log(objItem);

                        await this.axios.put(url,objItem
                            ,this.apiTokenHeader( {
                            'Access-Control-Expose-Headers' : '*' ,
                            'Access-Control-Allow-Origin': `${process.env.VUE_APP_BASE_URL}`
                            } )
                            )
                        .then(response => {    
                            
                                this.haErros = false
                                this.resultado = response.data;  
                                
                                console.log(response.data); 
                                console.log(this.aItemTrackOs);  

                                this.aItemAtualizaTrackOs.push(objItensProcessados);  

                                retorno = true;
                        
                            })
                            .catch(error => { 
                              
                                objItensProcessados = {
                                    id:objItensProcessados.id, 
                                    nome : objItensProcessados.nome,  
                                    idTrack : objItensProcessados.idTrack,  
                                    codigoItem : objItensProcessados.codigoItem  ,
                                    msg_processamento:'ERRO ERRO ERRO'
                                }   
                                
                                this.aItemAtualizaTrackOs.push(objItensProcessados); 

                                console.log("Erro: ", error.response.data.message); 
                                //this.haErros=true;
                                //this.erros = error.response.data.message
                                this.apiDisplayMensagem("Erro ao gravar itens no EXP")  
                                this.msgProcessamento = ''
                                retorno = false;
                            }); 
                } 

            } 
 
            this.msgProcessamento = ''
            return retorno; 

        }
            ,
        async lerItensTrackOS(){

                let url;
                let objItem;  
                let retorno;

                this.aItemTrackOs = [];
                this.aItemTrackOsTmp = [];      

        

                url = `https://integrations.tractian.com/santana/64bd81ffd8d99a001e5bf863/inventory`

                //url = `https://motor-v2.tractian.com/companies/${process.env.VUE_APP_COD_EMPRESA}/inventory?page=&limit=&deleted=false`;
                
                const headers = {
                        'Access-Control-Expose-Headers': '*',
                        'Content-Type': 'application/json',
                        'Authorization': `${process.env.VUE_APP_TOKEN_TRACKOS}`
                    };  

                this.msgProcessamento = "Processando"
                this.page = 1
                this.apiProcessamento()                     

                await this.axios.get(url ,{headers})
                .then(response => {    
                    console.log("TrackOS Itens");
                    this.resultado = response.data; 

                    console.log(this.resultado.data.length);
                    console.log(this.resultado);  

                    this.totalItensAProcessar = this.resultado.data.length;

                    for (let i = 0; i < this.resultado.data.length; i++) { 

                        objItem = {
                            nome          : this.resultado.data[i].name ,  
                            idTrack       : this.resultado.data[i].id,  
                            codigoItem    : this.resultado.data[i].identifierCode  ,
                            saldoEstoque  : this.resultado.data[i].totalQuantity 
                        }   
                        
                        this.aItemTrackOs.push(objItem); 

                    }  
                    //console.log('this.aItemTrackOs'); 
                    //console.log(this.aItemTrackOs); 
                    this.msgProcessamento = ''
                    retorno = true;
                    //this.totalItensProcessados = this.totalItensAProcessar;
                     
                    
                })
                .catch(error => {  
                    
                        console.log("Erro: ", error); 
                        this.msgProcessamento = ''
                        retorno = false;
                                              
                        this.apiDisplayMensagem(error ) 
                        
                }); 
                return retorno; 
        }
            
    }   
}    