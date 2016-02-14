$.getJSON('/data/data.json', function(data) {
  var recipeReport = new RecipeReport(data,
    $('#fromDate').val(),
    $('#toDate').val(),
    $('#recipe').val()
    );
  console.log(recipeReport.run());
});