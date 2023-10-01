import getBillboard from '@/actions/get-billboard';
import Billboard from '@/components/billboard';
import Container from '@/components/ui/container';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/ProductList';

export const revalidate = 0;

export default async function HomePage() {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard('834c7420-7dc2-43fa-bd02-0a036933ff53');
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
      </div>
      <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
        <ProductList title='Featured Products' items={products} />
      </div>
    </Container>
  );
}
