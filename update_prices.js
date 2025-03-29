const fs = require('fs');
const path = process.argv[2]; // Path to the file

fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  // Replace all prices in euros with pesos mexicanos
  let updatedData = data
    .replace(/price: '€40',/g, "price: '$800',")
    .replace(/price: '€55',/g, "price: '$1,100',")
    .replace(/price: '€35',/g, "price: '$700',")
    .replace(/price: '€45',/g, "price: '$900',")
    .replace(/price: '€60',/g, "price: '$1,200',")
    .replace(/price: '€38',/g, "price: '$760',")
    .replace(/price: '€95',/g, "price: '$1,900',");
  
  fs.writeFile(path, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('All prices updated successfully!');
  });
});
