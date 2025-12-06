import Title from '@/components/common/Title';
import Layout from '@/components/layouts/Layout';

export default function Friendships() {
  return (
    <Layout>
      <div className="space-y-6">
        <Title
          title="Relações de Amizade (PageRank)"
          subtitle="Analise as relações mais relevantes entre objetos"
        />
      </div>
    </Layout>
  );
}
