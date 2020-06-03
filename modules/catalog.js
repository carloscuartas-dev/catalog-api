const fs = require('fs');

function readCatalogSync() {
  const file = './data/catalog.json';

  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file);
    const catalog = JSON.parse(content);
    return catalog;
  }
  return undefined;
}

exports.findItems = function(categoryId) {
  console.log('Returning all items for categoryId: ' + categoryId);
  const catalog = readCatalogSync();
  if (catalog) {
    const items = [];
    for (let index in catalog.catalog) {
      if (catalog.catalog[index].categoryId === categoryId) {
        const category = catalog.catalog[index];
          for (let itemIndex in category.items) {
            items.push(category.items[itemIndex]);
          }
      }
    }
    return items;
  }
  return undefined;
}

exports.findItem = function(categoryId, itemId) {
  console.log('Looking for item with id' + itemId);
  const catalog = readCatalogSync();
  if (catalog) {
    for (let index in catalog.catalog) {
      if (catalog.catalog[index].categoryId === categoryId) {
        const category = catalog.catalog[index];
        for (let itemIndex in category.items) {
          if (category.items[itemIndex].itemId === itemId) {
            return category.items[itemIndex];
          }
        }
      }
    }
  }
  return undefined;
}

exports.findCategoryies = function() {
  console.log('Returning all categories');
  const catalog = readCatalogSync();
  if (catalog) {
    const categories = [];
    for (var index in catalog.catalog) {
      const category = {};
      category["categoryId"] = catalog.catalog[index].categoryId;
      category["categoryName"] = catalog.catalog[index].categoryName;
      categories.push(category);
    }
    return categories;
  }
  return [];
}

