'use client';

import { useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PAGE_SIZE = 12;

export default function ProductsPagination({ total, currentPage }) {
  const router = useRouter();
  
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleChange = (event, value) => {
    if (value === 1) {
      router.push('/produk_kami');
    } else {
      router.push(`/produk_kami/${value}`);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Stack spacing={2} className="mt-8">
      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={handleChange}
        color="primary"
        size="large"
      />
    </Stack>
  );
}