import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  create(@Body() createDebtDto: CreateDebtDto) {
    console.log(createDebtDto);
    return this.debtsService.create(createDebtDto);
  }

  @Get('byUserId/:userId/type/:type')
  findByUser(@Param('userId') userId: string , @Param('type') type: string) {
    return this.debtsService.findByUserId(userId, type);
  }

  @Get()
  findAll() {
    return this.debtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtsService.update(+id, updateDebtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtsService.remove(id);
  }
}
