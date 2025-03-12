import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.transactionsService.getTransactionsData(id);
  }

}

