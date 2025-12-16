import { useState } from 'react';
import { Plus } from 'lucide-react';
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/services/api';
import type { IObject } from '@/types/objects';

interface CreateObjectDialogProps {
  onCreate?: (obj: IObject) => void;
}

export default function CreateObjectDialog({
  onCreate,
}: CreateObjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [networkMAC, setNetworkMAC] = useState('');
  const [status, setStatus] = useState<number>(1);
  const [functions, setFunctions] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [limitations, setLimitations] = useState('');
  const [qualification, setQualification] = useState<number>(0);

  const reset = () => {
    setName('');
    setBrand('');
    setModel('');
    setNetworkMAC('');
    setStatus(1);
    setFunctions('');
    setRestrictions('');
    setLimitations('');
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        obj_name: name,
        obj_brand: brand,
        obj_model: model,
        obj_networkMAC: networkMAC,
        obj_status: status,
        obj_function: functions
          ? functions.split(',').map((s) => s.trim())
          : [],
        obj_restriction: restrictions
          ? restrictions.split(',').map((s) => s.trim())
          : [],
        obj_limitation: limitations
          ? limitations.split(',').map((s) => s.trim())
          : [],
        // minimal defaults for other fields
        obj_access: 0,
        obj_location: 0,
        // obj_owner: '',
        obj_qualification: qualification,
      } as Partial<IObject>;

      const response = await api.post('/object', payload);

      const created: IObject = response.data;

      if (onCreate) onCreate(created);
      setOpen(false);
      reset();
    } catch (error) {
      console.error('Erro ao criar objeto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Novo Objeto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Criar Novo Objeto</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha as informações básicas do objeto. Campos separados por
            vírgula serão transformados em listas.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div>
            <Label className="text-xs">Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Marca</Label>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Modelo</Label>
            <Input value={model} onChange={(e) => setModel(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Network (MAC)</Label>
            <Input
              value={networkMAC}
              onChange={(e) => setNetworkMAC(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-xs">Qualificação</Label>
            <Input
              value={qualification}
              type="number"
              onChange={(e) => setQualification(e.target.valueAsNumber)}
            />
          </div>

          <div>
            <Label className="text-xs">Status (1 = Ativo, 0 = Inativo)</Label>
            <Select
              value={String(status)}
              onValueChange={(e) => setStatus(Number(e || 0))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status (Ativo, Inativo)</SelectLabel>
                  <SelectItem value="1">Ativo</SelectItem>
                  <SelectItem value="0">Inativo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <Label className="text-xs">Funções (separadas por vírgula)</Label>
            <Input
              value={functions}
              onChange={(e) => setFunctions(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <Label className="text-xs">
              Restrições (separadas por vírgula)
            </Label>
            <Input
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <Label className="text-xs">
              Limitações (separadas por vírgula)
            </Label>
            <Input
              value={limitations}
              onChange={(e) => setLimitations(e.target.value)}
            />
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
