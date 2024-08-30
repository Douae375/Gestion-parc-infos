import { EquipementDTO } from './Equipement-dto.model';  // Adjust the import path as necessary
import { UserDTO } from './User-dto.model';  // Adjust the import path as necessary

export interface TicketDTO {
    id: number;
    type: string;
    date: Date;
    description: string;
    equipement: EquipementDTO;
    user: UserDTO;
    statut: string;
    ticketcount?: number;  // This field seems to be for statistics, so it's optional
}
