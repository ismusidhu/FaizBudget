$(function(){
  $('#goButton').click(function(){
    $.getJSON('/data/data.json', function(data) {
      var recipeReport = new RecipeReport(data,
        $('#fromDate').val(),
        $('#toDate').val(),
        $('#recipe').val()
        );
      var output = recipeReport.run();
      $('#avgTable').dataTable({
        "aaData": output.ingredientWiseAverage,
        "aoColumns": [{"mDataProp": "IngredientName"}, 
                      {"mDataProp": "Quantity"}, 
                      {"mDataProp": "Unit"}, 
                      {"mDataProp": "Amount"}, 
                      {"mDataProp": "PerUnitCost"}],
        bFilter: false, 
        bInfo: false,
        paging: false
      }).toggleClass("hidden");
    });
  });
});