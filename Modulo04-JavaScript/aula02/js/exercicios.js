//Exercicio 1
function seriesInvalidas(series) {
  const invalidas = [];
  invalidas.push('Séries inválidas: ');
  series.map(item => {
    if(item.anoEstreia > new Date().getFullYear()) 
      invalidas.push(item.titulo + ' - ');
    
    for(prop of Object.values(item)) {
      if(typeof prop === 'undefined' || prop === null) 
        invalidas.push(item.titulo + ' - ');
    }
  });
  return invalidas.join('').substring(0, invalidas.join('').length - 2);
}

console.log(seriesInvalidas(series));

//Exercicio 2
function filtrarSeriesPorAno(series, ano) {
  return series.filter(item => {
    return item.anoEstreia >= ano ? item : '';
  }); 
}

console.log(filtrarSeriesPorAno(series, 2017));