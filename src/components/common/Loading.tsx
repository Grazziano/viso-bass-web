import Layout from '../layouts/Layout';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <Layout>
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    </Layout>
  );
}
