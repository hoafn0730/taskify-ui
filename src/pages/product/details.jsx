import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { CONFIG } from '~/configs/config-global';
import { useGetProduct } from '~/actions/product';

import { ProductShopDetailsView } from '~/sections/product/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product details - ${CONFIG.site.name}` };

export default function Page() {
    const { id = '' } = useParams();

    const { product, productLoading, productError } = useGetProduct(id);

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ProductShopDetailsView product={product} loading={productLoading} error={productError} />
        </>
    );
}
