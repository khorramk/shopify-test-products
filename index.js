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
            productGenderType: extractGenderFromTags(product.tags),
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

function convertNewDataToHtmlContent(data) {
    let html = '<ul class="products">';
    
    for (const item of data) {
         html += `<li class="product">
                        <a href="${item.productPageLink}" class="product__link">
                            <span class="product__type-gender" role="status" aria-label="Product gender type">${item.productGenderType}</span>
                            <img class="product__image" src="${item.productImageSrc.src}" width="${item.productImageSrc.width}" height="${item.productImageSrc.height}" alt="${item.title}" srcset="">
                            <h2 class="product__title">
                                ${item.productTitle}
                            </h2>
                            <dd class="product__description">
                                <dt class="product__description___price-label">Price</dt>
                                <dl class="product__description___price-value">${item.productPrice}</dl>
                            </dd>
                            <span class="product__description___action-btn">Shop now</span>
                        </a>
                    </li>`;
    }

  return html;
}

init();