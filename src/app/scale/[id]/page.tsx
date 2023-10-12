'use client';

import Layout from '@/components/Layout';
import MainLayout from '@/components/MainLayout';
import { useParams } from 'next/navigation';

export default function Scale() {
  const params = useParams();
  console.log(params);

  return (
    <Layout
      title="Listagem de Escalas"
      headerTitle="Escalas"
      menuActiveKey="scale">
      <MainLayout />
    </Layout>
  );
}
