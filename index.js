//make functions
//fetch products
//convert products data to html contents for the browser

/**
 * This is a inital starter function.
 * 
 * @return void 
 *
 */

function init () {
    fetchProductsFromShopify()
}

function fetchProductsFromShopify () {
    const shopifyUrl = '';
    
    fetch(shopifyUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(response) {
            return mapDataFromProducts(response.products)
        })
        .then(function (mappedProductData) {
            return //TODO - convert to html
        })
        .catch((err) => {
            console.error(err);
        })

    
}

function mapDataFromProducts(products) {
    return products.map(function (product) {
        return {
            productTitle: product.title,
            customerGender: extractGenderFromTags(product.tags),
            productPrice: getPriceFromFirstVariant(product.variants),
            productPageLink: product.handle,
            productImageSrc: findTheCorrectImage(product)
        }
    })
}

function extractGenderFromTags(tags) {
    return tags[0]?.split(' ').find(function (word) {
        return word.includes('mens') || word.includes('woman');
    }) ?? '';
}

function getPriceFromFirstVariant(varaints) {
    return varaints[0].price || 'Price not listed';
}

function findTheCorrectImage(product) {
    return product.images.find(function (image) {
        return image.product_id === product.id;
    });
}