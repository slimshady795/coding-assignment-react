import { Injectable } from '@nestjs/common';
import { Ticket } from '@acme/shared-models';
import { UsersService } from '../users/users.service';

@Injectable()
export class TicketsService {
  /*
   * In-memory storage so data is lost on server restart.
   */
  private storedTickets: Ticket[] = [
    {
      id: 1,
      title: 'Install a monitor arm',
      description: 'Install a monitor arm',
      assigneeId: 1,
      completed: true,
    },
    {
      id: 2,
      title: 'Move the desk to the new location',
      description: 'Move the desk to the new location',
      assigneeId: 2,
      completed: false,
    },
    {
      id: 3,
      title: 'Login',
      description: 'Login',
      assigneeId: 3,
      completed: false,
    },
    {
      id: 4,
      title: 'Sign up',
      description: 'Sign up',
      assigneeId: 4,
      completed: true,
    },
    {
      id: 5,
      title: 'Invite user',
      description: 'Invite user',
      assigneeId: 5,
      completed: true,
    },
  ];

  private nextId = this.storedTickets?.length + 1;

  constructor(private usersService: UsersService) {}

  async tickets(param: {
    assignee?: string;
    status?: string;
  }): Promise<Ticket[]> {
    return this.storedTickets.filter((t) => {
      const isFilterAssignee = (param.assignee || '').includes(
        `${t?.assigneeId}`
      );
      const isFilterStatus = t?.completed === (param.status === 'true');

      if (param?.assignee && param?.status) {
        return isFilterAssignee && isFilterStatus;
      }
      if (param?.assignee) {
        return isFilterAssignee;
      }
      if (param?.status) {
        return isFilterStatus;
      }
      return true;
    });
  }

  async ticket(id: number): Promise<Ticket | null> {
    return this.storedTickets.find((t) => t.id === id) ?? null;
  }

  async newTicket(payload: {
    title: string;
    description: string;
    assigneeId: number;
  }): Promise<Ticket> {
    const newTicket: Ticket = {
      id: this.nextId++,
      title: payload.title,
      description: payload.description,
      assigneeId: payload.assigneeId || null,
      completed: false,
    };

    this.storedTickets.push(newTicket);

    return newTicket;
  }

  async assign(ticketId: number, userId: number): Promise<boolean> {
    const ticket = await this.ticket(ticketId);
    const user = await this.usersService.user(userId);

    if (ticket && user) {
      ticket.assigneeId = +userId;
      return true;
    } else {
      return false;
    }
  }

  async unassign(ticketId: number): Promise<boolean> {
    const ticket = await this.ticket(ticketId);
    if (ticket) {
      ticket.assigneeId = null;
      return true;
    } else {
      return false;
    }
  }

  async complete(ticketId: number, completed: boolean): Promise<boolean> {
    const ticket = await this.ticket(ticketId);
    if (ticket) {
      ticket.completed = completed;
      return true;
    } else {
      return false;
    }
  }
}
