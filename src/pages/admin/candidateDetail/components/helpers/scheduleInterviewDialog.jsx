import { Input } from "../../../../../ui/input";
import { Label } from "../../../../../ui/label";
import { Textarea } from "../../../../../ui/textarea";
import { Button } from "../../../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../../../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../ui/select";

export function ScheduleInterviewDialog({
  isScheduleDialogOpen,
  setIsScheduleDialogOpen,
  candidateData,
  handleScheduleInterview,
}) {
  return (
    <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agendar Entrevista</DialogTitle>
          <DialogDescription>
            Programa una cita con {candidateData?.candidato?.nombre_completo}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="interview-date">Fecha</Label>
              <Input id="interview-date" type="date" className="rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interview-time">Hora</Label>
              <Input id="interview-time" type="time" className="rounded-xl" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duración</Label>
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Seleccionar duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutos</SelectItem>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="45">45 minutos</SelectItem>
                <SelectItem value="60">1 hora</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="recruiter">Reclutador Asignado</Label>
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Seleccionar reclutador" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maria">María López</SelectItem>
                <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                <SelectItem value="ana">Ana García</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Agregar notas adicionales..."
              className="rounded-xl"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsScheduleDialogOpen(false)}
            className="rounded-xl"
          >
            Cancelar
          </Button>
          <Button
            className="bg-[#44BBA4] hover:bg-[#3aa593] text-white rounded-xl"
            onClick={handleScheduleInterview}
          >
            Guardar Cita
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
