'use client';

import axios from 'axios';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Currency from '@/components/ui/Currency';

import useCart from '@/hooks/use-cart';
import { toast } from 'react-hot-toast';

export default function Summary() {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  // 해당 페이지가 리다이렉트 되어, url에 리다이렉트 시키면, 그것을 가져와서 다음 행위를 일으킨다.
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );
    // Post 요청후 응답데이터가 'success' 혹은 'canceled'로 오면 이것을 가지고 url에 리다이렉트 시킨다.
    window.location = response.data.url;
  };

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} className='w-full mt-6'>
        Checkout
      </Button>
    </div>
  );
}
