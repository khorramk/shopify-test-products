function init () {
    fetchProductsFromShopify()
}

function fetchProductsFromShopify () {
    //add store url on the below variable
    const shopifyUrl = '';// here
    
    fetch(shopifyUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(response) {
            return mapDataFromProducts(response.products)
        })
        .then(function (mappedProductData) {
            const section = document.createElement('section');
            section.innerHTML = convertNewDataToHtmlContent(mappedProductData);
    
            document.getElementById('main').appendChild(section);
        })
        .catch((err) => {
            console.error(err);
            document.getElementById('main').innerHTML = '<h1 class="error-message">Failed to get products. Please contact us.</h1>'
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
                            <img class="product__image" src="${item.productImageSrc.src}" width="${item.productImageSrc.width}" height="${item.productImageSrc.height}" alt="${item.productTitle}" srcset="">
                            <h2 class="product__title">
                                ${item.productTitle}
                            </h2>
                            <dd class="product__description">
                                <dt class="product__description___price-label">Price</dt>
                                <dl class="product__description___price-value">$${item.productPrice}</dl>
                            </dd>
                            <div class="product__description___action-btn">
                            <span class="product__description___action-btn__label">Shop now</span>
                            <span class="product__description___action-btn__icon">
                                <svg  width="29" height="10" viewBox="0 0 29 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.9414 9.17744V9.48471H20.0687L20.1587 9.39471L19.9414 9.17744ZM28.4582 0.967875C28.4582 0.798175 28.3207 0.660607 28.151 0.660607L25.3856 0.660607C25.2159 0.660607 25.0783 0.798175 25.0783 0.967874C25.0783 1.13757 25.2159 1.27514 25.3856 1.27514L27.8437 1.27514V3.73328C27.8437 3.90298 27.9813 4.04055 28.151 4.04055C28.3207 4.04055 28.4582 3.90298 28.4582 3.73328V0.967875ZM0.309875 9.48471H19.9414V8.87018H0.309875V9.48471ZM20.1587 9.39471L28.3682 1.18515L27.9337 0.750603L19.7241 8.96017L20.1587 9.39471Z" fill="#333333"/>
                                </svg>
                            </span>
                            </div>
                        </a>
                    </li>`;
    }

  return html;
}

init();