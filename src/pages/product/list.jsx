import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';
import { useGetProducts } from '~/actions/product';

import { ProductShopView } from '~/sections/product/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product shop - ${CONFIG.site.name}` };

export default function Page() {
    const { products, productsLoading } = useGetProducts();

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ProductShopView products={products} loading={productsLoading} />
        </>
    );
}
