import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AxiosError } from 'axios';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/services/api';
import type { IEnvironment } from '@/types/enrironment';
import type { IObject } from '@/types/objects';
import { useAuth } from '@/context/useAuth';

interface CreateEnvironmentDialogProps {
  onCreate?: (env: IEnvironment) => void;
}

export default function CreateEnvironmentDialog({
  onCreate,
}: CreateEnvironmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const [objects, setObjects] = useState<IObject[]>([]);
  const [loadingObjects, setLoadingObjects] = useState(false);

  const [objectId, setObjectId] = useState('');
  const [name, setName] = useState('');
  const [adjacency, setAdjacency] = useState('');
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  // Fetch objects when dialog opens
  const handleOpenChange = async (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && objects.length === 0) {
      setLoadingObjects(true);
      try {
        const response = await api.get('/object');
        setObjects(response.data.items || []);
      } catch (error) {
        console.error('Erro ao buscar objetos:', error);
      } finally {
        setLoadingObjects(false);
      }
    }
  };

  const reset = () => {
    setObjectId('');
    setName('');
    setAdjacency('');
    setErrors({});
    setServerErrors([]);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Nome é obrigatório';
    if (!objectId) next.objectId = 'Objeto é obrigatório';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setServerErrors([]);

    try {
      const payload = {
        env_object_i: objectId,
        env_adjacency: adjacency
          ? adjacency
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        env_total_interactions: 0,
        env_total_new: 0,
        env_total_valid: 0,
        objects: [],
      };

      const response = await api.post('/ona-environment', payload);
      const created: IEnvironment = response.data;
      if (onCreate) onCreate(created);
      setOpen(false);
      reset();
    } catch (err: unknown) {
      const messages: string[] = [];
      const axiosError = err as AxiosError;
      const dataUnknown = axiosError?.response?.data as unknown;
      if (dataUnknown && typeof dataUnknown === 'object') {
        const data = dataUnknown as { message?: string | string[] };
        if (Array.isArray(data.message)) {
          messages.push(...data.message);
        } else if (typeof data.message === 'string') {
          messages.push(data.message);
        }
      }
      if (messages.length === 0) {
        if (typeof axiosError?.message === 'string') {
          messages.push(axiosError.message);
        }
      }
      setServerErrors(
        messages.length > 0 ? messages : ['Erro ao criar ambiente']
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        {user?.role === 'admin' && (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Novo Ambiente
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Criar Novo Ambiente ONA</AlertDialogTitle>
          <AlertDialogDescription>
            Crie um novo ambiente ONA associando um objeto existente
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {serverErrors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              {serverErrors.map((err, idx) => (
                <p key={idx} className="text-sm text-red-800">
                  {err}
                </p>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="object-select">
              Objeto <span className="text-red-500">*</span>
            </Label>
            <Select value={objectId} onValueChange={setObjectId}>
              <SelectTrigger
                id="object-select"
                className={errors.objectId ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Selecione um objeto" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {loadingObjects ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      Carregando objetos...
                    </div>
                  ) : objects.length > 0 ? (
                    objects.map((obj) => (
                      <SelectItem key={obj._id} value={obj._id}>
                        {obj.obj_name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">
                      Nenhum objeto disponível
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.objectId && (
              <p className="text-sm text-red-500">{errors.objectId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name-input">
              Nome do Ambiente <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name-input"
              placeholder="Ex: Sala de Servidores"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="adjacency-input">Ambientes Adjacentes</Label>
            <Input
              id="adjacency-input"
              placeholder="Ex: ambiente1, ambiente2, ambiente3"
              value={adjacency}
              onChange={(e) => setAdjacency(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Separe os ambientes adjacentes por vírgula (opcional)
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleSubmit}>
            {loading ? 'Criando...' : 'Criar Ambiente'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
