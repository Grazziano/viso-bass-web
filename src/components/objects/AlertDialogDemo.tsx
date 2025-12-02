import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { IObject } from '@/types/objects';

interface AlertDialogDemoProps {
  btnText: string;
  obj: IObject;
}

export function AlertDialogDemo({ btnText, obj }: AlertDialogDemoProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{btnText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Informações</AlertDialogTitle>
          <AlertDialogDescription>
            Nome: {obj.obj_name} <br />
            Marca: {obj.obj_brand} <br />
            Modelo: {obj.obj_model} <br />
            Status: {obj.obj_status === 1 ? 'Ativo' : 'Inativo'} <br />
            {/* <ItemDemo name="Funções:" list={obj.obj_function} /> */}
            Funções:{' '}
            {obj.obj_function.map((o) => {
              return o + ' ';
            })}{' '}
            <br />
            Network: {obj.obj_networkMAC} <br />
            Restrições:{' '}
            {obj.obj_restriction.map((o) => {
              return o + ' ';
            })}{' '}
            <br />
            Limitações:{' '}
            {obj.obj_limitation.map((o) => {
              return o + ' ';
            })}{' '}
            <br />
            Criado em: {new Date(obj.createdAt).toLocaleDateString()} <br />
            Atualizado em: {new Date(obj.updatedAt).toLocaleDateString()} <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
