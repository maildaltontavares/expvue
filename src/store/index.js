import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    usuarioSistema: { empresa: '', idfil: '', codigo: '', nome: ''  ,id:'' },
    permissoesUsuario: [],
    permissaoUsuario: {},
    _token: '',
    configuracaoTela:{marginBottomTela:'120px'},
    tipoDispositivo:'',
    pararProcessamento:false,
  } ,
  mutations: {
      setUsuarioEmpresa(state, empresa) {
          state.usuarioSistema.empresa = empresa
      },
      setUsuarioIdfil(state, idfil) {
          state.usuarioSistema.idfil = idfil
      },
      setUsuarioCodigo(state, codigo) {
          state.usuarioSistema.codigo = codigo
      },
      setUsuarioNome(state, nome) {
          state.usuarioSistema.nome = nome
      }  ,
      setUsuarioId(state, id) {
        state.usuarioSistema.id = id
      }  ,     
      setTipoDispositivo(state, tipoDispositivo) {
        state.tipoDispositivo = tipoDispositivo
      } ,
      setConfiguracaoTelaMarginBottomTela(state, marginBottomTela) {
        state.configuracaoTela.marginBottomTela = marginBottomTela
      } ,
      setToken(state, token) {
          state._token = token
      }   ,
      setPararProcessamento(state, pararProcessamento) {
          state.pararProcessamento= pararProcessamento
      }     



  }


})
