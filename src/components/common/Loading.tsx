import Layout from '../layouts/Layout';
import { Spinner } from '../ui/spinner';

export default function Loading() {
  return (
    <Layout>
      <div className="flex justify-center py-20">
        <Spinner className="size-8 text-primary" />
      </div>
    </Layout>
  );
}
