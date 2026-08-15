// ============================================================================
// flow-cloud.js  —  Camada de nuvem (Firebase / Firestore) da FlowTickets.
//
// O QUE FAZ:
//   - Guarda os eventos e a config de WhatsApp num banco central (Firestore),
//     pra que TODO visitante veja o mesmo conteudo (nao mais so no navegador).
//   - Protege a edicao com login (e-mail + senha) no painel admin.
//
// COMO LIGAR:
//   1) Crie o projeto no Firebase (console.firebase.google.com).
//   2) Cole abaixo, em FLOW_FIREBASE_CONFIG, o objeto firebaseConfig que o
//      Firebase te mostrou ao registrar o app Web.
//   Enquanto o apiKey estiver vazio, a nuvem fica DESLIGADA e o site funciona
//   igual a hoje (dados so no navegador). Nada quebra.
// ============================================================================

// >>> COLE AQUI o firebaseConfig do seu projeto (substitua os valores vazios) <<<
var FLOW_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDlkYKVaEkW985u4xrkHsReHCh-HgMYfLc',
  authDomain: 'flowtickets-2608142153.firebaseapp.com',
  projectId: 'flowtickets-2608142153',
  storageBucket: 'flowtickets-2608142153.firebasestorage.app',
  messagingSenderId: '99488729446',
  appId: '1:99488729446:web:01e6f62e7e8ac92e2a60a7'
};

// Onde os dados ficam guardados no Firestore (colecao / documento).
var FLOW_CLOUD_DOC = { colecao: 'flow', doc: 'dados' };

// Versao do SDK do Firebase (compat) carregado sob demanda via CDN.
var FLOW_FB_VER = '10.12.5';

(function (global) {
  'use strict';

  var _iniciado = false;   // Firebase ja inicializado?
  var _initPromise = null; // evita inicializar duas vezes

  // A nuvem esta configurada?
  function ativo() {
    return !!(FLOW_FIREBASE_CONFIG && FLOW_FIREBASE_CONFIG.apiKey);
  }

  // Carrega um <script> externo e resolve quando terminar.
  function carregarScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Falha ao carregar ' + src)); };
      document.head.appendChild(s);
    });
  }

  // Baixa o SDK do Firebase (so quando a nuvem esta ligada) e inicializa o app.
  function init() {
    if (_initPromise) return _initPromise;
    if (!ativo()) return Promise.reject(new Error('Nuvem desligada (sem config).'));

    var base = 'https://www.gstatic.com/firebasejs/' + FLOW_FB_VER + '/';
    _initPromise = carregarScript(base + 'firebase-app-compat.js')
      .then(function () { return carregarScript(base + 'firebase-firestore-compat.js'); })
      .then(function () { return carregarScript(base + 'firebase-auth-compat.js'); })
      .then(function () {
        if (!global.firebase.apps.length) {
          global.firebase.initializeApp(FLOW_FIREBASE_CONFIG);
        }
        _iniciado = true;
      });
    return _initPromise;
  }

  function refDoc() {
    return global.firebase.firestore()
      .collection(FLOW_CLOUD_DOC.colecao).doc(FLOW_CLOUD_DOC.doc);
  }

  // Le { eventos, config } da nuvem. Resolve null se ainda nao existir nada.
  function carregar() {
    return init().then(function () {
      return refDoc().get();
    }).then(function (snap) {
      if (!snap.exists) return null;
      var d = snap.data() || {};
      return {
        eventos: Array.isArray(d.eventos) ? d.eventos : null,
        config: (d.config && typeof d.config === 'object') ? d.config : null
      };
    });
  }

  // Grava eventos + config na nuvem. Exige estar logado (regra de seguranca).
  function salvar(eventos, config) {
    return init().then(function () {
      return refDoc().set({
        eventos: eventos || [],
        config: config || {},
        atualizadoEm: global.firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }

  // ----- Autenticacao do admin -----
  function login(email, senha) {
    return init().then(function () {
      return global.firebase.auth().signInWithEmailAndPassword(email, senha);
    });
  }

  function logout() {
    return init().then(function () {
      return global.firebase.auth().signOut();
    });
  }

  // Chama cb(usuario|null) sempre que o estado de login mudar.
  function onAuth(cb) {
    init().then(function () {
      global.firebase.auth().onAuthStateChanged(function (u) { cb(u || null); });
    }).catch(function () { cb(null); });
  }

  global.FlowCloud = {
    ativo: ativo,
    carregar: carregar,
    salvar: salvar,
    login: login,
    logout: logout,
    onAuth: onAuth
  };
})(window);
