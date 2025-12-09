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
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface AlertDialogDemoProps {
  btnText: string;
  obj: IObject;
}

export function AlertDialogDemo({ btnText, obj }: AlertDialogDemoProps) {
  const formatDate = (value?: string) => {
    if (!value) return '-';
    try {
      return new Date(value).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
    } catch {
      return value;
    }
  };

  const renderChips = (items?: string[]) => {
    if (!Array.isArray(items) || items.length === 0)
      return <span className="text-muted-foreground">-</span>;
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <Badge key={i} variant="outline" className="text-xs">
            {it}
          </Badge>
        ))}
      </div>
    );
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{btnText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-2xl max-h-[70vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Informações do Objeto</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-xs">Nome</Label>
                <div className="font-medium">{obj.obj_name || '-'}</div>
              </div>

              <div>
                <Label className="text-xs">Marca</Label>
                <div className="font-medium">{obj.obj_brand || '-'}</div>
              </div>

              <div>
                <Label className="text-xs">Modelo</Label>
                <div className="font-medium">{obj.obj_model || '-'}</div>
              </div>

              <div>
                <Label className="text-xs">Status</Label>
                <div className="mt-1">
                  <Badge
                    variant={obj.obj_status === 1 ? 'default' : 'outline'}
                    className={
                      obj.obj_status === 1
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {obj.obj_status === 1 ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label className="text-xs">Funções</Label>
                <div className="mt-1">{renderChips(obj.obj_function)}</div>
              </div>

              <div>
                <Label className="text-xs">Network</Label>
                <div className="font-medium">{obj.obj_networkMAC || '-'}</div>
              </div>

              <div>
                <Label className="text-xs">Criado em</Label>
                <div className="font-medium">{formatDate(obj.createdAt)}</div>
              </div>

              <div>
                <Label className="text-xs">Atualizado em</Label>
                <div className="font-medium">{formatDate(obj.updatedAt)}</div>
              </div>

              <div className="sm:col-span-2">
                <Label className="text-xs">Restrições</Label>
                <div className="mt-1">{renderChips(obj.obj_restriction)}</div>
              </div>

              <div className="sm:col-span-2">
                <Label className="text-xs">Limitações</Label>
                <div className="mt-1">{renderChips(obj.obj_limitation)}</div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-500 hover:bg-blue-600 text-white">
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
