angular.module('starter')
.controller('CalculatorController', function($scope, calculator, equationRepository) {
  $scope.display = "";
  $scope.clear = function(){
    $scope.display = "";
  };

  $scope.appendToDisplay = function(char){
    $scope.display = $scope.display + char;
  };

  $scope.equals = function(){
    var equation = $scope.display;

    equationRepository.save(equation).then(function() {
        var result = calculator.calculate(equation);
        $scope.display = result;
      }).catch(function(err) {
         console.log('error!', err);
      });
  };
})
.factory('calculator', function(equationRepository) {
    var calculate = function(equation) {
      var parser = new Epsilon.ExpressionParser(equation);
      return parser.evaluate();
    };

    return {
        calculate: calculate
    };
})
.factory('equationRepository', function (pouchDB){
  var database = pouchDB('mylocaldb');
  //database.sync('https://couchdb-396c4f.smileupps.com/codemash/', {live: true});
  return {
      save: function(equation) {
            var doc = { value: equation, author: "Victor" };
            return database.post(doc);
        },
//      all: function() {
//           return database.allDocs({include_docs: true}).then(function(allDocs){
//              return _.pluck(allDocs.rows, 'doc');
//           });
//      }
  };
});
