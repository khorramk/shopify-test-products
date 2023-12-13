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
    
    fetch(shopifyUrl).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.products
    }).catch(function (err) {
        console.error(err.message);
    })

    
}