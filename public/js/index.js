$(function(){
  $('#goButton').click(function(){
    $.getJSON('/data/data.json', function(data) {
      var recipeReport = new RecipeReport(data,
        $('#fromDate').val(),
        $('#toDate').val(),
        $('#recipe').val()
        );
      var output = recipeReport.run();

      //$('#avgTable').parent().removeClass("hidden");
      $('#avgTable').dataTable({
        "aaData": output.ingredientWiseAverage,
        "aoColumns": [{"mDataProp": "IngredientName"},
                      {"mDataProp": "Quantity"},
                      {"mDataProp": "Unit"},
                      {"mDataProp": "PerUnitCost"},
                      {"mDataProp": "Amount"}
                    ],
        bFilter: false, 
        bInfo: false,
        paging: false
      }).removeClass("hidden");

      //$('#costOfRecipeDatewise').parent().removeClass("hidden");
      $('#costOfRecipeDatewise').dataTable({
        "aaData": output.dateWiseReport,
        "aoColumns": [{"mDataProp": "date"}, 
                      {"mDataProp": "noOfThaalis"}, 
                      {"mDataProp": "perThaaliCost"}, 
                      {"mDataProp": "totalCost"}],
        bFilter: false, 
        bInfo: false,
        paging: false
      }).removeClass("hidden");
    });
  });
});