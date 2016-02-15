var RecipeReport = (function () {
  "use strict";
  var standartThaaliCount = 100;
  var sum = function(array, prop) {
      return array.reduce( function(a, b){
          return a + b[prop];
      }, 0);
  };

  var recipeReport = function (data, fromDate, toDate, recipe) {
    this.data = data;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.recipe = recipe;
  };

  recipeReport.prototype.run = function() {
    var d = {};
    d.dateWiseReport = this.getDateWiseReport();
    d.ingredientWiseAverage = this.getIngredientWiseAverage();
    return d;
  };

  recipeReport.prototype.matchCriteria = function(meal) {
    return meal.recipe === this.recipe
      && meal.date<=this.toDate 
      && meal.date>=this.fromDate;
  };

  recipeReport.prototype.getDateWiseReport = function() {
    var report = [];
    for (var i = this.data.length - 1; i >= 0; i--) {
      var meal = this.data[i];
      if(this.matchCriteria(meal)) {
        var cost = sum(meal.ingredients, 'amount');
        report.push({
          date: meal.date,
          noOfThaalis: meal.noOfThaalis,
          //total cost of recipe made on this date
          perThaaliCost: (cost/meal.noOfThaalis) * standartThaaliCount,
          totalCost: cost
        });
      }
    }
    return report;
  };

  recipeReport.prototype.getIngredientWiseAverage = function() {
    var report = {};
    var faulty = {};
    var isFaulty = false;

    for (var i = this.data.length - 1; i >= 0; i--) {
      var meal = this.data[i];
      if(this.matchCriteria(meal)) {
        for (var k = meal.ingredients.length - 1; k >= 0; k--) {
          var ingredient = meal.ingredients[k];
          var name = ingredient.item.toLowerCase();
          report[name] = report[name] || {};
          report[name].qty = report[name].qty || 0;
          report[name].qty+= ingredient.qty;
          if((report[name].unit !== undefined && report[name].unit !== ingredient.unit)) {
            fault[ingredient.item.toLowerCase() + '-' + meal.date] = fault[ingredient.item.toLowerCase() + '-' + meal.date] || 0;
            fault[ingredient.item.toLowerCase() + '-' + meal.date] += 1;
            isFaulty = true;
          }
          report[name].unit = ingredient.unit;

          report[name].amount = report[name].amount || 0;
          report[name].amount += ingredient.amount;

          report[name].count = report[name].count || 0;
          report[name].count++;
        }
      }
    }
    var finalReport = [];
    for (var prop in report) {
      finalReport.push({
        "IngredientName": prop,
        "Quantity": report[prop].qty/report[prop].count,
        "Unit": report[prop].unit,
        "PerUnitCost": report[prop].amount/report[prop].qty,
        "Amount": report[prop].amount/report[prop].count
      });
    }


    if(isFaulty) {
      console.log(faulty);
      //TODO add details for faulty items
      alert('Different units specified for same ingredient on saperate days. Invalid data. Please see what\'s wrong. Or contact maker of this application');
    }

    return finalReport;
  };
  return recipeReport;
})();