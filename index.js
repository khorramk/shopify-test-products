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
            const section = document.createElement('section');
            section.innerHTML = convertNewDataToHTmlContent(mappedProductData);
    
            document.getElementById('main').appendChild(section);
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

function convertNewDataToHTmlContent(data) {
    let html = '<ul class="products">';
    
    for (const item of data) {
         html += `<li class="product">
                        <a href="${item.link}" class="product_link">
                            <span class="product_type-gender" role="status" aria-label="Gender of customers for product">${item.gender}</span>
                            <img class="product_image" src="${item.imageSrc.src}" width="${item.imageSrc.width}" height="${item.imageSrc.height}" alt="${item.title}" srcset="">
                            <h2 class="product_title">
                                ${item.title}
                            </h2>
                            <dd class="product_description">
                                <dt class="product_description__price-label">Price</dt>
                                <dl class="product_description__price-value">${item.price}</dl>
                            </dd>
                            <span class="shop-now">${item.title}</span>
                        </a>
                    </li>`;
    }

  return html;
}