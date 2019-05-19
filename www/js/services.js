angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Métodos hormonales',
    lastText: 'Métodos combinados que contienen estrógeno y progestágeno y que se pueden administrar como píldoras, inyecciones, anillo vaginal o parche transdérmico. Métodos que contienen solo progestágeno y que se pueden administrar como píldoras, inyecciones, implantes, anillo vaginal o dispositivo intrauterino. Anticoncepción hormonal de emergencia que puede consistir en píldoras de levonorgestrel solo o en píldoras combinadas (Método de Yuzpe).',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Métodos no hormonales reversibles',
    lastText: 'Dispositivos intrauterinos. Anticonceptivos de barrera masculinos (condón) y femeninos (condón, diafragma; espermicidas).Método de la amenorrea de lactancia.Métodos de abstinencia periódica (moco cervical (Billings); calendario; temperatura basal; sintotérmico).',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Métodos no hormonales permanentes:',
    lastText: 'Anticoncepción quirúrgica voluntaria (esterilización) femenina.Anticoncepción quirúrgica voluntaria (esterilización) masculina.',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: '¿Cuáles son las características más importantes de los anticonceptivos?',
    lastText: 'Los métodos anticonceptivos tienen diferentes características en las que hay que fijarse cuando se elija uno de ellos.Esto es necesario para que el método permita alcanzar las metas reproductivas en forma efectiva y segura para la salud y de acuerdo a la situación de vida.',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'SEGURIDAD DE LOS MÉTODOS ANTICONCEPTIVOS',
    lastText: 'La Organización Mundial de la Salud (OMS) con la colaboración de expertos(as) de otras organizaciones y agencias, revisa periódicamente la evidencia científica disponible sobre el efecto que los métodos anticonceptivos puedan tener sobre la salud de las personas que los usan. Basándose en esta evidencia se han formulado recomendaciones que se presentan en los Criterios Médicos de Elegibilidad para el Uso de Anticonceptivos y las Recomendaciones sobre Prácticas Seleccionadas para el Uso de Anticonceptivos.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
