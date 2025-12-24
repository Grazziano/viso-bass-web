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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/services/api';
import type { IClass } from '@/types/classes';
import { useAuth } from '@/context/useAuth';

interface CreateClassDialogProps {
  // Accept either a created IClass or a lighter object that only contains an `id` (some APIs return `id` instead of `_id`).
  onCreate?: (cls: IClass | { id?: string }) => void;
}

export default function CreateClassDialog({
  onCreate,
}: CreateClassDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [functions, setFunctions] = useState('');
  const [objectsInput, setObjectsInput] = useState('');

  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const reset = () => {
    setName('');
    setFunctions('');
    setObjectsInput('');
    setErrors({});
    setServerErrors([]);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Nome é obrigatório';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setServerErrors([]);

    try {
      const payload = {
        class_name: name.trim(),
        class_function: functions
          ? functions
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        // include objects if provided (server validation may require non-empty array)
        objects: objectsInput
          ? objectsInput
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      };

      const response = await api.post('/class', payload);
      const created: IClass = response.data;
      if (onCreate) onCreate(created);
      setOpen(false);
      reset();
    } catch (err: unknown) {
      // Try to surface validation errors returned by the API
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
        } else {
          messages.push('Erro desconhecido ao criar classe');
        }
      }

      // attach field-level errors if possible (e.g., messages about objects)
      const nextErrors: Record<string, string> = {};
      messages.forEach((m) => {
        const lower = m.toLowerCase();
        if (lower.includes('objects') || lower.includes('object')) {
          nextErrors.objects = m;
        }
      });
      if (Object.keys(nextErrors).length > 0)
        setErrors((p) => ({ ...p, ...nextErrors }));

      setServerErrors(messages);
      console.error('Erro ao criar classe:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {user?.role === 'admin' && (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Nova Classe
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Criar Nova Classe</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha as informações da classe. Separe funções por vírgula para
            criar uma lista.
          </AlertDialogDescription>

          {serverErrors.length > 0 && (
            <div className="mt-3">
              {serverErrors.map((m, i) => (
                <p key={i} className="text-xs text-destructive">
                  {m}
                </p>
              ))}
            </div>
          )}
        </AlertDialogHeader>

        <div className="grid grid-cols-1 gap-3 mt-4">
          <div>
            <Label className="text-xs">Nome da Classe</Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: '' }));
              }}
              aria-invalid={!!errors.name}
            />
            {errors.name ? (
              <p className="text-xs text-destructive mt-1">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <Label className="text-xs">Funções (separadas por vírgula)</Label>
            <Input
              value={functions}
              onChange={(e) => setFunctions(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-xs">
              Objetos (IDs, separadas por vírgula)
            </Label>
            <Input
              value={objectsInput}
              onChange={(e) => setObjectsInput(e.target.value)}
              placeholder="opcional: ex. 606b... , 607c..."
              aria-invalid={!!errors.objects}
            />
            {errors.objects ? (
              <p className="text-xs text-destructive mt-1">{errors.objects}</p>
            ) : null}
          </div>
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
