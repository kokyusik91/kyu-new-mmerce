import getBillboard from '@/actions/get-billboard';
import Billboard from '@/components/billboard';
import Container from '@/components/ui/container';

export const revalidate = 0;

export default async function HomePage() {
  const billboard = await getBillboard('834c7420-7dc2-43fa-bd02-0a036933ff53');
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
      </div>
    </Container>
  );
}
