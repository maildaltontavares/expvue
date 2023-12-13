<template>
  <router-view/>
</template>

<style>  
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
font-size: 16px;
}

.corpoPrincipal {

margin-bottom: 10%;
overflow-y: auto;
}

.cabecalho_principal {
background-color: #003366;
margin-left: 5px;
color: white; 
width: 99%;
height: 7%;
border-radius: 5px;

}

.cabecalho_principal_sistema {
align-content: center;
font-size: 20px;
margin-top: 8px;
}

.cabecalho_principal_empresa {
align-content: center;
font-size: 16px;
margin-top: 12px;
}

.cabecalho_principal_usuario {
font-size: 16px;
margin-top: 12px;
}

.cabecalho_principal_usuario_nome {
font-size: 16px;
font-size: bold;
margin-top: 13px;
padding-left: 10px;
}


/* DALTON */

.rodape {
 position: fixed;
 bottom: 0;
 background-color: #003366;        
 width: 100%;
 height: 7%;
 /*border-radius: 5px;*/
 margin-left: 0.5px;
  
  
}

/*
.div_rodape {
margin-top: 8px;
margin-bottom: 8px;
}
*/

.div_rodape {
padding: 8px;

}


.inputBold {
font-weight: bold;
}

.dark {
--popper-theme-background-color: #333333;
--popper-theme-background-color-hover: #333333;
--popper-theme-text-color: white;
--popper-theme-border-width: 0px;
--popper-theme-border-radius: 6px;
--popper-theme-padding: 10px;
--popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

.desabilitado {
color: #333333;
}

.desabilitado.hover {
cursor: none;
}

.cabecalhoItens {
background-color: darkblue;
color: white;
font-size: 12px;
font-weight: bold;
}

.itemLegenda {
border-radius: 5px;
}

.error {
border: 3px solid red;
}
.mensagem_erro {
background-color: #DC3545;
}

.mensagem_processando {
margin-top: 10px;
color: white;
font-weight: bold;

}

.mensagem_sucesso {
background-color: #28a745;
}

.label_cabecalho {
font-weight: bold;
}

.botao_superior {
background-color: dimgrey;
border-radius: 5px;
padding-top: 5px;
padding-bottom: 5px;
}

.mensagem {
width: 100%;
border-radius: 5px;
color: white;
font-weight: bold;
height: 29px;
padding-top: 3px;
text-align: center;
margin-left: 30px;
margin-top: 15px;

}

.tabela_cabecalho_linha {
background-color: #003366;
color: white;
}

.EspacoEntreBotoes{
margin-right: 15px;
}

.msg_rodape {
 position: fixed;
 bottom: 0;     
 width: 90%;
 height: 7%;
 border-radius: 5px;
}



</style>
